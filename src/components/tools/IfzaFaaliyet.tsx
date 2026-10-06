"use client";

/* ============================================================================
   IFZA FAALİYET KODU BULUCU · TABAN (06.10.2026)
   ============================================================================
   Veri ve arama lib/tools/ifza.ts'te (gerekçe ve sınırlar orada). Arayüz
   İngiltere SIC kodu bulucunun kalıbı (SicBulucu.tsx): aynı tezgâh, aynı
   bant, aynı satır kabuğu ve aynı sınıflar (.ta-sic-); yalnız bu araca özgü
   üç parça için küçük bir ek stil var (css/araclar-ifza.css · .ta-ifz-):
   açıklama satırı, lisans türü çipi, ek onay uyarısı.

   TABAN NE YAPIYOR, NE YAPMIYOR
     · yapıyor: Türkçe ya da İngilizce yazılan işi 827 faaliyette arıyor,
       kodu kopyalatıyor, hangi faaliyetin ek kurum onayı istediğini
       (amber = şart) ve onayın lisanstan önce mi sonra mı alındığını yazıyor.
     · yapmıyor: seçilen kodları biriktirme (SIC'teki dört yuva), rapor
       indirme, yapay zekâ ile anlam eşleştirme. Üçü de bu tabanın üstüne
       eklenebilir; ilk ikisinin kalıbı SicBulucu'da hazır.

   Veri `import()` ile ayrı parça geliyor (sıkıştırılmış ~76 KB); ilk karede
   sonuç yok, yalnız yönerge var. <select> yok. Hareket CSS'te. */

import { useEffect, useId, useState, type CSSProperties } from "react";
import { Check, Copy, Info, ListChecks, Plus, Search, ShieldCheck, TriangleAlert } from "lucide-react";
import AskCta from "@/components/shared/AskCta";
import { Bant, Dip, GirdiSatiri, Kaynak, Kural, Sayac, Tezgah, Yardim } from "@/components/tools/ToolShell";
import type { IfzaMotor } from "@/lib/tools/ifza";
import "@/app/css/araclar-ifza.css";

const SAYFA = 20;
const BASAMAK_EN = 10;
const IFZA_SAYFA = "https://activities.ifza.com";
/* lib/tools/ifza.ts · IFZA_SIK ile aynı liste; o dosya ayrı parça olduğu için
   ilk karede okunamıyor, çipler burada duruyor. */
const SIK = ["yazılım", "e-ticaret", "danışmanlık", "genel ticaret", "pazarlama", "lojistik", "gıda", "holding"];

export default function IfzaFaaliyet() {
  const uid = useId();
  const [sorgu, setSorgu] = useState("");
  const [motor, setMotor] = useState<IfzaMotor | null>(null);
  const [hata, setHata] = useState(false);
  const [goster, setGoster] = useState(SAYFA);
  const [kopya, setKopya] = useState<{ kod: string; ok: boolean } | null>(null);

  useEffect(() => {
    let iptal = false;
    import("@/lib/tools/ifza")
      .then((m) => {
        if (!iptal) setMotor(m.IFZA);
      })
      .catch(() => {
        if (!iptal) setHata(true);
      });
    return () => {
      iptal = true;
    };
  }, []);

  useEffect(() => {
    if (!kopya?.ok) return;
    const t = setTimeout(() => setKopya(null), 2500);
    return () => clearTimeout(t);
  }, [kopya]);

  const ara = (v: string) => {
    setSorgu(v);
    setGoster(SAYFA);
  };
  const kopyala = async (kod: string) => {
    try {
      await navigator.clipboard.writeText(kod);
      setKopya({ kod, ok: true });
    } catch {
      setKopya({ kod, ok: false });
    }
  };

  const sonuc = motor && sorgu.trim() ? motor.ara(sorgu) : null;
  const satirlar = sonuc?.satirlar ?? [];
  const kalan = Math.max(0, satirlar.length - goster);
  const sayilabilir = sonuc !== null && (sonuc.kip === "metin" || sonuc.kip === "kod");
  const bulundu = satirlar.length > 0;
  const bulunamadi = sayilabilir && !bulundu;

  const altCumle = !sorgu.trim()
    ? "Şirketin ne iş yapacağını yazın ya da sık arananlardan birini seçin."
    : hata
      ? "Faaliyet listesi yüklenemedi. Sayfayı yenileyip tekrar deneyin; olmazsa IFZA'nın kendi listesine bakabilirsiniz."
      : !motor || !sonuc
        ? "Faaliyet listesi yükleniyor…"
        : sonuc.kip === "kisa"
          ? "En az iki harf ya da kodun ilk rakamlarını yazın."
          : bulunamadi
            ? sonuc.kip === "kod"
              ? "Yazdığınız rakamlarla başlayan bir faaliyet kodu listede yok."
              : "Eşleşme çıkmadı. İşinizi başka bir kelimeyle ya da İngilizce yazmayı deneyin; isterseniz bize sorun."
            : sonuc.kip === "kod"
              ? "Kodu yazdığınız rakamlarla başlayan faaliyetler."
              : sonuc.terimler.length > 0
                ? `IFZA listesinde şu kelimelerle arandı: ${sonuc.terimler.slice(0, 5).join(", ")}. Adında geçenler başta.`
                : "IFZA'nın İngilizce faaliyet adı ve açıklamasında yazdığınız kelimeler geçenler.";
  const duyuru = sayilabilir ? `${satirlar.length} faaliyet bulundu. ${altCumle}` : altCumle;

  return (
    <>
      <Tezgah
        kicker={
          <>
            <Info size={15} strokeWidth={2.1} aria-hidden="true" />
            IFZA faaliyet listesinde arama
          </>
        }
      >
        <GirdiSatiri>
          <label className="ta-etiket" htmlFor={`${uid}-q`}>
            <span className="ta-no" aria-hidden="true">
              01
            </span>
            <span>
              Şirketiniz ne iş yapacak?
              <span className="ta-etiket-x ta-sic-ek">{" (Türkçe, İngilizce ya da kod)"}</span>
            </span>
          </label>
          <div className="ta-kutu">
            <span className="ta-kutu-i" aria-hidden="true">
              <Search size={18} strokeWidth={1.9} />
            </span>
            <input
              id={`${uid}-q`}
              className="ta-girdi-b ta-sic-girdi"
              type="search"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              enterKeyHint="search"
              placeholder="yazılım danışmanlığı"
              value={sorgu}
              onChange={(e) => ara(e.target.value)}
              aria-describedby={`${uid}-yardim`}
            />
          </div>
        </GirdiSatiri>

        <div className="ta-hazir" role="group" aria-labelledby={`${uid}-hz`}>
          <span id={`${uid}-hz`} className="ta-hazir-k">
            Sık aranan iş türleri
          </span>
          {SIK.map((q) => (
            <button
              key={q}
              type="button"
              className="ta-hazir-b ta-sic-cip"
              data-on={sorgu === q ? "" : undefined}
              aria-pressed={sorgu === q}
              onClick={() => ara(q)}
            >
              {q}
            </button>
          ))}
        </div>

        <Yardim id={`${uid}-yardim`}>
          Faaliyet adları ve açıklamaları IFZA&apos;nın İngilizce yazımı. Türkçe kelimeler küçük bir çeviri yardımıyla
          eşleniyor.
        </Yardim>

        <Bant
          ikon={<ListChecks size={14} strokeWidth={1.9} aria-hidden="true" />}
          kicker={sorgu.trim() ? `“${sorgu.trim()}” için eşleşen faaliyet` : "Eşleşen faaliyet"}
          alt={altCumle}
          duyuru={duyuru}
        >
          {sayilabilir ? (
            <>
              <Sayac deger={satirlar.length} />
              <span className="ta-bant-c">faaliyet</span>
            </>
          ) : (
            <span className="ta-bant-bos">—</span>
          )}
        </Bant>
      </Tezgah>

      {(bulundu || bulunamadi || hata) && (
        <div className="ta-satirlar ta-sic-panel">
          {bulundu && (
            <ul className="ta-sic-liste" aria-label="Eşleşen IFZA faaliyetleri">
              {satirlar.slice(0, goster).map((s, i) => {
                const bu = kopya?.kod === s.kod ? kopya : null;
                return (
                  <li
                    key={s.kod}
                    className="ta-sic-satir"
                    style={{ "--ta-sic-i": Math.min(i % SAYFA, BASAMAK_EN) } as CSSProperties}
                  >
                    <div className="ta-sic-kk">
                      <span className="ta-sic-kod">{s.kod}</span>
                      <button
                        type="button"
                        className="ta-sic-b"
                        onClick={() => kopyala(s.kod)}
                        aria-label={
                          bu
                            ? bu.ok
                              ? `${s.kod} kopyalandı`
                              : `${s.kod} kopyalanamadı, pano kapalı`
                            : `${s.kod} kodunu kopyala`
                        }
                      >
                        {bu?.ok ? (
                          <Check size={13} strokeWidth={2.4} aria-hidden="true" />
                        ) : (
                          <Copy size={13} strokeWidth={2.1} aria-hidden="true" />
                        )}
                        {bu ? (bu.ok ? "Kopyalandı" : "Pano kapalı") : "Kopyala"}
                      </button>
                    </div>
                    <div className="ta-sic-govde">
                      <span className="ta-sic-tanim">{s.ad}</span>
                      {s.aciklama && <span className="ta-ifz-ac">{s.aciklama}</span>}
                      <span className="ta-ifz-cipler">
                        <span className="ta-ifz-tur">{s.tur === "P" ? "Profesyonel lisans" : "Ticari lisans"}</span>
                        {s.onay.length > 0 && (
                          <span className="ta-ifz-onay">
                            <TriangleAlert size={14} strokeWidth={2} aria-hidden="true" />
                            <span>
                              Ek onay gerekir: {s.onay.join(", ")}
                              {s.onayZamani === "B"
                                ? " · lisanstan önce"
                                : s.onayZamani === "A"
                                  ? " · lisanstan sonra"
                                  : ""}
                            </span>
                          </span>
                        )}
                      </span>
                      {s.not && <span className="ta-ifz-ac">{s.not}</span>}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          {kalan > 0 && (
            <div className="ta-sic-alt">
              <button type="button" className="ta-sic-daha" onClick={() => setGoster((g) => g + SAYFA)}>
                <Plus size={14} strokeWidth={2.2} aria-hidden="true" />
                Sonraki {Math.min(SAYFA, kalan)} faaliyeti göster
              </button>
              <span className="ta-sic-alt-s">{kalan} faaliyet daha var.</span>
            </div>
          )}

          {(bulunamadi || hata) && (
            <div className="ta-sic-alt">
              <Kaynak href={IFZA_SAYFA} dis="IFZA faaliyet listesi, yeni sekmede açılır">
                IFZA faaliyet listesi
              </Kaynak>
              {!hata && <Kaynak href="/iletisim">Bize sorun</Kaynak>}
            </div>
          )}
        </div>
      )}

      <Kural
        ikon={<ShieldCheck size={18} strokeWidth={1.9} />}
        baslik="Liste nereden · IFZA"
        kaynak={
          <Kaynak href={IFZA_SAYFA} dis="IFZA faaliyet listesi, yeni sekmede açılır">
            activities.ifza.com
          </Kaynak>
        }
      >
        {motor
          ? `IFZA'nın yayımladığı ${motor.toplam} faaliyet, ${motor.cekim.split("-").reverse().join(".")} tarihli arşivimizden. `
          : "IFZA'nın yayımladığı faaliyet listesi, kendi arşivimizden. "}
        Bir lisansa birden fazla faaliyet yazılabiliyor; hangilerinin birlikte alınabildiğini kuruluş öncesi
        birlikte netleştiriyoruz.
      </Kural>

      <Dip>
        <AskCta />
      </Dip>
    </>
  );
}
