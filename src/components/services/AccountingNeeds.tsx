"use client";

import { useId, useState } from "react";
import { Check, CircleDashed, Minus } from "lucide-react";
import AskCta from "@/components/shared/AskCta";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import SmartLink from "@/components/shared/SmartLink";
import { gtm } from "@/lib/gtm";
import { BASLANGIC, ihtiyac, SORULAR, type Cevap, type Hukum } from "@/lib/muhasebeIhtiyac";
import { altHizmetHrefByKalem } from "@/lib/muhasebeAltHizmet";

/* ============================================================================
   "BANA HANGİ HİZMETLER GEREKİYOR?" — /dubai/muhasebe · #ihtiyac
   Kurallar ve üç hâlin kaydı lib/muhasebeIhtiyac.ts'te; burada yalnız dizim.

   15.09.2026 · marketing listesi, madde 9. Yer: fiyat listesinin hemen üstü.

   ÜÇÜNCÜ HÂL, AYNI GÜN. İlk hâlin YAN YANA düzeni geri geldi (solda sorular,
   sağda gri sonuç paneli); ikinci hâlin altlı üstlü bandı ve kutuları gitti.
   Burak: "altlı üstlü değil önceki gibi yan yana formatta yap sadece biraz
   sadeleştir … her başlığın altında uzun uzun açıklama yazacağına sadece
   basınca içeriği gözüksün yeterdi."
     · Soru seçenekleri ikinci hâlin kısa hâli (9 hap, alt satır yok).
     · Sonuç satırı KAPALI gelir: rozet · kalemin adı · tutar · "+". Açılınca
       gerekçe cümlesi ve alt sayfaya bağlantı. <details>: klavyede Enter ile
       açılıyor, JS kapalıyken de çalışıyor; sayfanın öteki açılırlarıyla
       (K1, fiyat satırları) aynı "+" işareti.
     · Tek çıkış AskCta, panelin dibinde.

   ERİŞİLEBİLİRLİK: soru başına <fieldset> + <legend>, gerçek radio (ok
   tuşlarıyla geziliyor); sonuç sayısı aria-live="polite". */

const HUKUM_ETIKET: Record<Hukum, string> = {
  gerekli: "Gerekli",
  bagli: "Duruma bağlı",
  gerekmiyor: "Gerekmiyor",
};

const HUKUM_IKON = { gerekli: Check, bagli: CircleDashed, gerekmiyor: Minus } as const;

type Anahtar = keyof Cevap;
const SIRA: Anahtar[] = ["bolge", "durum", "ciro", "kdv"];

const nf = new Intl.NumberFormat("tr-TR");

export default function AccountingNeeds() {
  const [c, setC] = useState<Cevap>(BASLANGIC);
  const kok = useId();
  const satirlar = ihtiyac(c);
  const gerekli = satirlar.filter((s) => s.hukum === "gerekli").length;
  const bagli = satirlar.filter((s) => s.hukum === "bagli").length;

  const sec = (k: Anahtar, v: string) => {
    setC((o) => ({ ...o, [k]: v }) as Cevap);
    gtm("needs_select", { question: k, answer: v });
  };

  const sorgu = new URLSearchParams({ hizmet: "muhasebe", ...c }).toString();

  return (
    <section id="ihtiyac" className="sec-pad svm-sec" aria-labelledby={`${kok}-t`}>
      <div className="container-o">
        <div className="sec-head">
          <SplitWords
            as="h2"
            id={`${kok}-t`}
            text="Bana hangi hizmetler gerekiyor?"
            accent="hangi hizmetler gerekiyor?"
            className="h2"
          />
          <FadeUp delay={0.2}>
            <p className="sec-lead">Dört seçim, altı kalem. Ön liste; kesin kapsamı teklifte netleştiriyoruz.</p>
          </FadeUp>
        </div>

        <FadeUp delay={0.1}>
          <div className="svm-ih-kart">
            <form className="svm-ih-form" onSubmit={(e) => e.preventDefault()}>
              {SIRA.map((k) => (
                <fieldset key={k} className="svm-ih-soru">
                  <legend>{SORULAR[k].soru}</legend>
                  <div className="svm-ih-sec">
                    {SORULAR[k].secenekler.map((o) => (
                      <label key={o.id}>
                        <input
                          type="radio"
                          name={`${kok}-${k}`}
                          value={o.id}
                          checked={c[k] === o.id}
                          onChange={() => sec(k, o.id)}
                        />
                        <span>{o.etiket}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              ))}
            </form>

            <div className="svm-ih-sonuc">
              <p className="svm-ih-ozet" aria-live="polite">
                <b className="data">{gerekli}</b> kalem gerekli
                {bagli > 0 && (
                  <>
                    {" · "}
                    <b className="data">{bagli}</b> duruma bağlı
                  </>
                )}
              </p>
              <ul className="svm-ih-liste">
                {satirlar.map((s) => {
                  const Ikon = HUKUM_IKON[s.hukum];
                  const href = altHizmetHrefByKalem(s.kalem.id);
                  return (
                    <li key={s.kalem.id} data-hukum={s.hukum}>
                      <details className="svm-ih-satir">
                        <summary>
                          <span className="svm-ih-rozet">
                            <Ikon size={13} strokeWidth={2.4} aria-hidden="true" />
                            {HUKUM_ETIKET[s.hukum]}
                          </span>
                          <span className="svm-ih-ad">{s.kalem.title}</span>
                          <span className="svm-ih-tutar data">{nf.format(s.kalem.price.usd)} USD</span>
                          <span className="svm-more-x" aria-hidden="true" />
                        </summary>
                        <div className="svm-ih-acik">
                          <p>
                            {s.kosul && <b>{s.kosul}: </b>}
                            {s.neden}
                          </p>
                          {href && <SmartLink href={href}>Ayrıntılı bilgi</SmartLink>}
                        </div>
                      </details>
                    </li>
                  );
                })}
              </ul>
              <AskCta label="Bu listeyle teklif isteyin" href={`/basla?${sorgu}`} />
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
