"use client";

import { useEffect, useId, useState } from "react";
import { Check, Copy, Globe, RefreshCw, Sparkles } from "lucide-react";
import {
  SECTORS,
  SECTOR_BY_KEY,
  TONES,
  generateNames,
  normalizeKeyword,
  toDomainLabel,
  turSayisi,
  type NameTone,
  type SectorKey,
} from "@/lib/tools/names";
import { alanAdiSorgula, type AlanSonuc } from "@/lib/tools/alanadi";

/* ============================================================================
   ŞİRKET İSMİ ÜRETECİ
   ============================================================================

   Kuralın tamamı lib/tools/names.ts'te; burada yalnızca arayüz var. Bu ayrımın
   sebebi listelerin gözden geçirilebilir olması: müşteri kelime listelerine tek
   dosyada bakıp ekleyip çıkarabiliyor, bileşeni açmasına gerek yok.

   ---------------------------------------------------------------------------
   BU TURDA DEĞİŞEN İKİ ŞEY

   1) SONUÇ ARTIK KENDİLİĞİNDEN ÇIKMIYOR. Müşteri: "anahtar kelimeyi yazdığımız
      an altta bişiler önermesin, biz oluştur diyelim."

      Teknik karşılığı şu: adaylar canlı girdilerden DEĞİL, `uretim` adlı
      dondurulmuş bir anlık görüntüden hesaplanıyor. Düğmeye basılınca o an
      seçili olan kelime/sektör/üslup üçlüsü `uretim`e kopyalanıyor; liste
      yalnızca onu okuyor. Girdilerden biri sonradan değişirse `uretim`
      sıfırlanıyor ve liste kayboluyor — çünkü ekranda "Atlas Labs" yazarken
      sektörü lojistiğe çevirmiş biri, artık üretilmemiş bir listeye bakıyor
      olurdu. Eski liste sessizce durmaktansa gitmesi doğru.

   2) AŞAMA AŞAMA. Müşteri: "anahtar kelime, sektör, üslup, vb."
      Adımlar sırayla AÇILIYOR: sektör kelime geçerli olmadan, üslup sektör
      seçilmeden, düğme de üslup seçilmeden görünmüyor.

      SEKTÖRÜN VARSAYILANI YOK ve bu bilinçli. Varsayılan koysaydık ikinci
      adım hiç "yapılmamış" olmazdı, yani aşama diye bir şey kalmazdı.
      "Henüz belli değil" ayrı bir seçenek olarak duruyor: sektörünü
      bilmeyen kişi de bir SEÇİM yapıyor, adım atlamıyor.

   ÜÇÜ DEĞİŞMEDİ

   1) "MÜSAİT" KELİMESİ HİÇBİR YERDE GEÇMİYOR. Tescil müsaitliğini kontrol
      edemiyoruz; edemediğimiz bir şeyi ima eden tek kelime bile aracı yalan
      söyler hâle getirir. Alan adı sorgusu bunu DEĞİŞTİRMİYOR: o sorgu alan
      adı kütüğünü söylüyor, tescil otoritesini değil. İkisi ayrı şey ve
      ekranda ayrı ayrı yazıyor.

   2) İLK ÜÇ ADAY AYRI. Çünkü kuruluşta istenen şey tam olarak bu:
      countryContent.dubai.docs "Üç şirket adı alternatifi, tercih sırasıyla"
      diyor.

   3) "BAŞKA ÖNERİLER" RASTGELE DEĞİL. Tur sayacı listelerde kaydırıyor; aynı
      girdi aynı turda her zaman aynı sonucu veriyor. Rastgelelik olsaydı sunucu
      ile tarayıcının ilk render'ı ayrışır, React hidrasyon uyarısı verirdi.
   ========================================================================= */

/** Düğmeye basıldığı andaki girdiler. Liste yalnızca bunu okuyor. */
type Uretim = { keyword: string; sector: SectorKey; tone: NameTone; round: number };

const DURUM_METNI: Record<AlanSonuc["durum"], string> = {
  kayitli: "kayıtlı",
  bos: "boş görünüyor",
  sorulamadi: "sorulamadı",
};

export default function NameForge() {
  const uid = useId();
  const [keyword, setKeyword] = useState("");
  const [sector, setSector] = useState<SectorKey | null>(null);
  const [tone, setTone] = useState<NameTone | null>(null);
  const [uretim, setUretim] = useState<Uretim | null>(null);
  const [copied, setCopied] = useState<"idle" | "ok" | "fail">("idle");
  const [fallback, setFallback] = useState("");
  /* Alan adı sonuçları, etiket (atlaslabs) → sonuç ya da "yükleniyor". Aday
     listesi yenilenince temizleniyor: eski adın sonucu yeni adın yanında
     durmasın. */
  const [alan, setAlan] = useState<Record<string, AlanSonuc[] | "yukleniyor">>({});

  useEffect(() => {
    if (copied !== "ok") return;
    const t = setTimeout(() => setCopied("idle"), 2500);
    return () => clearTimeout(t);
  }, [copied]);

  const clean = normalizeKeyword(keyword);
  const kelimeHazir = clean.length >= 2;
  const hazir = kelimeHazir && sector !== null && tone !== null;

  const names = uretim
    ? generateNames(uretim.keyword, uretim.sector, uretim.tone, uretim.round)
    : [];
  const top3 = names.slice(0, 3);
  /* Havuz bitti mi: son turdaysak "Başka öneriler" hiç basılmıyor (gerekçe
     lib/tools/names.ts · turSayisi). */
  const sonTur = uretim ? uretim.round + 1 >= turSayisi(uretim.sector, uretim.tone) : false;

  /* Girdilerden biri değişince üretilmiş liste düşüyor (bkz. karar 1). */
  const sifirla = () => {
    setUretim(null);
    setAlan({});
  };
  const onKeyword = (v: string) => {
    setKeyword(v);
    sifirla();
  };
  const onSector = (s: SectorKey) => {
    setSector(s);
    sifirla();
  };
  const onTone = (t: NameTone) => {
    setTone(t);
    sifirla();
  };

  const uret = () => {
    if (!hazir) return;
    setAlan({});
    setUretim({ keyword: clean, sector, tone, round: 0 });
  };
  const yeniTur = () => {
    setAlan({});
    setUretim((u) => (u ? { ...u, round: u.round + 1 } : u));
  };

  const sorgula = async (isim: string) => {
    const etiket = toDomainLabel(isim);
    if (!etiket || alan[etiket]) return;
    setAlan((a) => ({ ...a, [etiket]: "yukleniyor" }));
    const sonuc = await alanAdiSorgula(etiket);
    setAlan((a) => ({ ...a, [etiket]: sonuc }));
  };

  const buildText = () => {
    if (top3.length === 0 || !uretim) return "";
    return [
      "Ortac Global · şirket adı alternatifleri (tercih sırasıyla)",
      `Sektör: ${SECTOR_BY_KEY[uretim.sector].label}`,
      "",
      ...top3.map((n, i) => `${i + 1}. ${n}`),
      "",
      "Yedek adaylar: " + names.slice(3).join(", "),
      "",
      "Not: Bu liste bir müsaitlik sorgusu değildir. Adların tescil edilebilirliği,",
      "benzerlik kontrolü ve kısıtlı kelime listesi ilgili otoritede ayrıca kontrol edilir.",
    ].join("\n");
  };

  const onCopy = async () => {
    const text = buildText();
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied("ok");
      setFallback("");
    } catch {
      setCopied("fail");
      setFallback(text);
    }
  };

  return (
    <div className="tl-app">
      {/* data-akis: form tek sütuna iniyor, adımlar yan yana değil alt alta.
          Gerekçe araclar.css · .tl-form[data-akis="asamali"]. */}
      <div className="tl-form" data-akis="asamali">
        {/* ---------------------------------------------------- 1 · KELİME */}
        <div className="tl-field">
          <label className="tl-label" htmlFor={`${uid}-kw`}>
            1 · Anahtar kelime <span className="tl-label-x">(markanız, adınız, işiniz)</span>
          </label>
          <input
            id={`${uid}-kw`}
            className="tl-input"
            type="text"
            autoComplete="off"
            placeholder="atlas"
            value={keyword}
            onChange={(e) => onKeyword(e.target.value)}
            aria-describedby={`${uid}-help`}
          />
          <p id={`${uid}-help`} className="tl-help">
            Tek kelime yeter. Boşluk, rakam ve noktalama düşüyor; en az iki harf gerekiyor.
          </p>
        </div>

        {/* ---------------------------------------------------- 2 · SEKTÖR */}
        {kelimeHazir && (
          <fieldset className="tl-fs">
            <legend className="tl-legend">2 · Sektör</legend>
            <div className="tl-radios" data-cols="4">
              {SECTORS.map((s) => (
                <label
                  key={s.key}
                  className="tl-radio"
                  data-on={s.key === sector ? "" : undefined}
                >
                  <input
                    type="radio"
                    name={`${uid}-sector`}
                    checked={s.key === sector}
                    onChange={() => onSector(s.key)}
                  />
                  <span className="tl-radio-t">{s.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {/* ----------------------------------------------------- 3 · ÜSLUP */}
        {kelimeHazir && sector !== null && (
          <fieldset className="tl-fs">
            <legend className="tl-legend">3 · Üslup</legend>
            <div className="tl-radios" data-cols="3">
              {TONES.map((t) => (
                <label key={t.key} className="tl-radio" data-on={t.key === tone ? "" : undefined}>
                  <input
                    type="radio"
                    name={`${uid}-tone`}
                    checked={t.key === tone}
                    onChange={() => onTone(t.key)}
                  />
                  <span className="tl-radio-t">{t.label}</span>
                  <span className="tl-radio-h">{t.hint}</span>
                </label>
              ))}
            </div>
          </fieldset>
        )}
      </div>

      {/* Üretim düğmesi. Üç adım tamamlanmadan hiç basılmıyor: devre dışı bir
          düğme göstermek "neyi eksik bıraktım" sorusunu doğuruyor, oysa
          eksik adım zaten ekranda açık duruyor. */}
      {hazir && !uretim && (
        <div className="tl-actions">
          <button type="button" className="tl-copy" onClick={uret}>
            <Sparkles size={16} strokeWidth={2.1} aria-hidden="true" />
            Adayları oluştur
          </button>
        </div>
      )}

      {names.length > 0 && uretim && (
        <>
          <div className="tl-out" role="status" aria-live="polite">
            <span className="tl-out-k">Tercih sırasıyla ilk üç aday</span>
            <strong className="tl-big">{top3[0]}</strong>
            <span className="tl-sub">
              Ardından <b>{top3[1]}</b>
              {top3[2] && (
                <>
                  {" "}
                  ve <b>{top3[2]}</b>
                </>
              )}
              . {SECTOR_BY_KEY[uretim.sector].label} · aşağıda {names.length} adayın tamamı var.
            </span>
          </div>

          <ol className="tl-names">
            {names.map((n, i) => {
              const etiket = toDomainLabel(n);
              const durum = alan[etiket];
              return (
                <li key={n} className="tl-name" data-top={i < 3 ? "" : undefined}>
                  <div className="tl-name-h">
                    <span className="tl-name-n">{String(i + 1).padStart(2, "0")}</span>
                    <span className="tl-name-t">{n}</span>
                    {i < 3 && <span className="tl-name-b">tercih {i + 1}</span>}
                  </div>

                  {durum === undefined ? (
                    <button
                      type="button"
                      className="tl-name-dbtn"
                      onClick={() => sorgula(n)}
                      aria-label={`${n} için alan adını sorgula`}
                    >
                      <Globe size={13} strokeWidth={2.1} aria-hidden="true" />
                      Alan adını sorgula
                    </button>
                  ) : durum === "yukleniyor" ? (
                    <p className="tl-name-d" role="status">
                      {etiket} sorgulanıyor…
                    </p>
                  ) : (
                    <ul className="tl-name-d">
                      {durum.map((r) => (
                        <li key={r.uzanti} data-durum={r.durum}>
                          <b>
                            {etiket}.{r.uzanti}
                          </b>{" "}
                          {DURUM_METNI[r.durum]}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ol>

          <div className="tl-actions">
            <button type="button" className="tl-copy" onClick={onCopy}>
              {copied === "ok" ? (
                <Check size={16} strokeWidth={2.4} aria-hidden="true" />
              ) : (
                <Copy size={16} strokeWidth={2.1} aria-hidden="true" />
              )}
              {copied === "ok" ? "Kopyalandı" : "Üç alternatifi kopyala"}
            </button>
            {!sonTur && (
              <button type="button" className="tl-ghost" onClick={yeniTur}>
                <RefreshCw size={16} strokeWidth={2.1} aria-hidden="true" />
                Başka öneriler
              </button>
            )}
            <span className="tl-actions-s" role="status" aria-live="polite">
              {copied === "ok" && "Alternatifler panoya kopyalandı."}
              {copied === "fail" && "Pano kullanılamadı; metin aşağıda, elle kopyalayabilirsiniz."}
              {copied === "idle" &&
                sonTur &&
                "Bu sektör ve üslupta havuz bitti; başka aday için sektörü ya da üslubu değiştirin."}
            </span>
          </div>

          {copied === "fail" && (
            <label className="tl-fallback">
              <span className="sr-only">Kopyalanacak metin</span>
              <textarea readOnly rows={9} value={fallback} />
            </label>
          )}
        </>
      )}

      <p className="tl-note">
        Araç yapay zekâ kullanmıyor: sabit kelime listelerini birleştiriyor, aynı girdi her zaman
        aynı adayları veriyor. Tüzel kişilik eki (Ltd, FZ-LLC vb.) bilerek eklenmiyor: ekin doğru
        yazımı seçtiğiniz yapıya ve otoriteye göre değişiyor, tescil sırasında biz ekliyoruz.
      </p>
      <p className="tl-note">
        <b>Alan adı sorgusu sitedeki tek dış sorgudur.</b> Yalnızca siz bir adayın yanındaki
        düğmeye bastığınızda çalışıyor ve o anda alan adının kendisi (örneğin
        &quot;atlaslabs.com&quot;) alan adı kütüğüne, RDAP üzerinden gönderiliyor. Bize hiçbir şey
        gelmiyor. Sorgulanan uzantılar .com, .net, .org ve .co.uk; .ae ve .com.tr bu protokolde
        cevap vermediği için listeye hiç alınmadı.
      </p>
      <p className="tl-warn">
        Bu liste bir <b>müsaitlik sorgusu değil</b>. Bir adın alınabilir olup olmadığını yalnızca
        ilgili tescil otoritesi söyler; benzerlik kontrolü ve kısıtlı kelime listesi ayrı bir
        aşamadır ve onu sizin adınıza biz yürütüyoruz. Alan adının boş görünmesi de o adın şirket
        adı olarak onaylanacağı anlamına gelmiyor: ikisi ayrı kütük, ayrı kural.
      </p>
    </div>
  );
}
