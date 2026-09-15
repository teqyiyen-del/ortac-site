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
   Kurallar lib/muhasebeIhtiyac.ts'te; burada yalnız dizim.

   15.09.2026 · marketing listesi, madde 9. Yer: fiyat listesinin hemen üstü.

   İKİNCİ HÂL, AYNI GÜN. Burak: "daha sadeleştirmen lazım … sayfanın geri
   kalanına uygun şekilde." İlk hâl iki panelli bir kart, 13 seçenekli dört
   soru ve altı gerekçe cümlesiydi (bölüm 1.163 px). Şimdi:
     · SORULAR TEK BANTTA, yan yana dört grup, grup başına 2-3 kısa hap.
     · SONUÇ ALTI KUTU, artılarımız karolarının ızgarası (1 → 2 → 3 sütun):
       hüküm + kalemin adı, "duruma bağlı"da dört kelimelik koşul. Kutunun
       tamamı kalemin alt sayfasına bağlantı; gerekçe orada.
     · Tek çıkış AskCta, sayfanın SSS altındaki soru çıkışıyla aynı bileşen.
   Sonuç her seçimde anında değişiyor; varsayılan en sık okur (serbest
   bölgede yeni kurulan, ciro 375 bin – 50 milyon AED).

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

export default function AccountingNeeds() {
  const [c, setC] = useState<Cevap>(BASLANGIC);
  const kok = useId();
  const satirlar = ihtiyac(c);
  const gerekli = satirlar.filter((s) => s.hukum === "gerekli").length;

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

        <FadeUp delay={0.08}>
          <form className="svm-ih-bant" onSubmit={(e) => e.preventDefault()}>
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
        </FadeUp>

        <p className="svm-ih-ozet" aria-live="polite">
          Sizde <b className="data">{gerekli}</b> kalem kesin doğuyor
        </p>
        <ul className="svm-ih-kutu">
          {satirlar.map((s, i) => {
            const Ikon = HUKUM_IKON[s.hukum];
            const href = altHizmetHrefByKalem(s.kalem.id);
            const ic = (
              <>
                <span className="svm-ih-rozet">
                  <Ikon size={13} strokeWidth={2.4} aria-hidden="true" />
                  {HUKUM_ETIKET[s.hukum]}
                  {s.kosul && <i> · {s.kosul}</i>}
                </span>
                <b>{s.kalem.title}</b>
              </>
            );
            return (
              <li key={s.kalem.id} data-hukum={s.hukum}>
                <FadeUp className="svm-ih-kutu-in" delay={0.04 + i * 0.03}>
                  {href ? (
                    <SmartLink href={href} className="svm-ih-a">
                      {ic}
                    </SmartLink>
                  ) : (
                    <span className="svm-ih-a">{ic}</span>
                  )}
                </FadeUp>
              </li>
            );
          })}
        </ul>

        <FadeUp delay={0.2}>
          <p className="svm-sss-cta">
            <AskCta label="Bu listeyle teklif isteyin" href={`/basla?${sorgu}`} />
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
