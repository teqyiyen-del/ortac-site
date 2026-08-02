"use client";

import { useEffect, useId, useState } from "react";
import { Check, Copy, RefreshCw } from "lucide-react";
import { TONES, generateNames, normalizeKeyword, type NameTone } from "@/lib/tools/names";

/* ============================================================================
   ŞİRKET İSMİ ÜRETECİ
   ============================================================================

   Kuralın tamamı lib/tools/names.ts'te; burada yalnızca arayüz var. Bu ayrımın
   sebebi listelerin gözden geçirilebilir olması: müşteri kelime listelerine tek
   dosyada bakıp ekleyip çıkarabiliyor, bileşeni açmasına gerek yok.

   ÜÇ TASARIM KARARI

   1) "MÜSAİT" KELİMESİ HİÇBİR YERDE GEÇMİYOR. Tescil müsaitliğini kontrol
      edemiyoruz; edemediğimiz bir şeyi ima eden tek kelime bile aracı yalan
      söyler hâle getirir. Ekranda ne olduğu ve ne olmadığı ayrı ayrı yazıyor.

   2) İLK ÜÇ ADAY AYRI. Çünkü kuruluşta istenen şey tam olarak bu:
      countryContent.dubai.docs "Üç şirket adı alternatifi, tercih sırasıyla"
      diyor. Araç dokuz aday üretiyor ama çıktısı o üçlü — kopyalanan metin de
      numaralı ve doğrudan bize gönderilebilecek biçimde.

   3) "BAŞKA ÖNERİLER" RASTGELE DEĞİL. Tur sayacı listelerde kaydırıyor; aynı
      girdi aynı turda her zaman aynı sonucu veriyor. Rastgelelik olsaydı sunucu
      ile tarayıcının ilk render'ı ayrışır, React hidrasyon uyarısı verirdi.
   ========================================================================= */

export default function NameForge() {
  const uid = useId();
  const [keyword, setKeyword] = useState("");
  const [tone, setTone] = useState<NameTone>("kurumsal");
  const [round, setRound] = useState(0);
  const [copied, setCopied] = useState<"idle" | "ok" | "fail">("idle");
  const [fallback, setFallback] = useState("");

  useEffect(() => {
    if (copied !== "ok") return;
    const t = setTimeout(() => setCopied("idle"), 2500);
    return () => clearTimeout(t);
  }, [copied]);

  const clean = normalizeKeyword(keyword);
  const names = generateNames(keyword, tone, round);
  const top3 = names.slice(0, 3);

  const buildText = () => {
    if (top3.length === 0) return "";
    return [
      "Ortac Global — şirket adı alternatifleri (tercih sırasıyla)",
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

  /* Kelime ya da üslup değişince tur sıfırlanıyor: yeni bir kelimeye "yedinci
     tur" ile başlamak, ziyaretçinin görmediği altı turu atlamak demek. */
  const onKeyword = (v: string) => {
    setKeyword(v);
    setRound(0);
  };
  const onTone = (t: NameTone) => {
    setTone(t);
    setRound(0);
  };

  return (
    <div className="tl-app">
      <div className="tl-form">
        <div className="tl-field">
          <label className="tl-label" htmlFor={`${uid}-kw`}>
            Anahtar kelime <span className="tl-label-x">(markanız, adınız, işiniz)</span>
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

        <fieldset className="tl-fs">
          <legend className="tl-legend">Üslup</legend>
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
      </div>

      <div className="tl-out" role="status" aria-live="polite">
        {names.length === 0 ? (
          <p className="tl-out-empty">
            {clean.length === 0
              ? "Bir anahtar kelime yazın; dokuz aday çıkacak, ilk üçü tercih sırasıyla ayrılacak."
              : "En az iki harf gerekiyor."}
          </p>
        ) : (
          <>
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
              . Aşağıda {names.length} adayın tamamı var.
            </span>
          </>
        )}
      </div>

      {names.length > 0 && (
        <>
          <ol className="tl-names">
            {names.map((n, i) => (
              <li key={n} className="tl-name" data-top={i < 3 ? "" : undefined}>
                <span className="tl-name-n">{String(i + 1).padStart(2, "0")}</span>
                <span className="tl-name-t">{n}</span>
                {i < 3 && <span className="tl-name-b">tercih {i + 1}</span>}
              </li>
            ))}
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
            <button type="button" className="tl-ghost" onClick={() => setRound((r) => r + 1)}>
              <RefreshCw size={16} strokeWidth={2.1} aria-hidden="true" />
              Başka öneriler
            </button>
            <span className="tl-actions-s" role="status" aria-live="polite">
              {copied === "ok" && "Alternatifler panoya kopyalandı."}
              {copied === "fail" && "Pano kullanılamadı; metin aşağıda, elle kopyalayabilirsiniz."}
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
        aynı adayları veriyor. Tüzel kişilik eki (Ltd, FZ-LLC vb.) bilerek eklenmiyor — ekin doğru
        yazımı seçtiğiniz yapıya ve otoriteye göre değişiyor, tescil sırasında biz ekliyoruz.
      </p>
      <p className="tl-warn">
        Bu liste bir <b>müsaitlik sorgusu değil</b>. Bir adın alınabilir olup olmadığını yalnızca
        ilgili tescil otoritesi söyler; benzerlik kontrolü ve kısıtlı kelime listesi ayrı bir
        aşamadır ve onu sizin adınıza biz yürütüyoruz.
      </p>
    </div>
  );
}
