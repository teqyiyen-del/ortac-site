"use client";

import { useId, useState } from "react";
import {
  Activity,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  ChartColumn,
  Check,
  CircleOff,
  MapPin,
  Receipt,
  SignalHigh,
  SignalLow,
  SignalMedium,
  Sparkles,
  Store,
  type LucideIcon,
} from "lucide-react";
import AskCta from "@/components/shared/AskCta";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import SmartLink from "@/components/shared/SmartLink";
import { gtm } from "@/lib/gtm";
import {
  BASLANGIC,
  ihtiyac,
  SORULAR,
  type Cevap,
  type Hukum,
  type IhtiyacIkon,
} from "@/lib/muhasebeIhtiyac";
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

   DÖRDÜNCÜ HÂL (17.09.2026). Burak: "daha okey ama biraz iconlarla fln
   destekleyebilirsin özellikle soldaki seçenekler kısmını daha form kafasında
   yap hatta bizim ülke uygunluk testindeki tasarımdan esinlenebilirsin
   butonlar fln için."
     · SOL: hap düğmeler gitti. Her soru uygunluk testinin sorusu gibi
       ikon dairesi + başlık; seçenekler onun seçenek kutusu gibi (FitTest ·
       .uyg-opt): çerçeveli satır, solda ikon diski, sağda onay dairesi,
       seçilince --blue-700 çerçeve + --blue-100 zemin + disk --blue-900.
       İki seçenekli sorularda kutular yan yana, ciro üç seçenekle alt alta.
       Ölçüler uygunluk testinin bir tık küçüğü: panel 1/2 genişlikte ve
       dört soru tek ekranda kalmalı (disk 44 → 34, dolgu 13/14 → 10/12).
     · SAĞ: her satırın başında kalemin ikonu (34 px kare). Rozet adın
       yanına, tutar sağa geçti.
   BEŞİNCİ HÂL (18.09.2026). Burak: "bu sefer aşırı kalabalık olmuş gibi
   hissettiriyor gözüm seçemiyor her yerde icon var." Dördüncü hâlde ekranda
   dört yerde ikon vardı: soru başlığı, seçenek diski, hüküm rozeti, sonuç
   satırının kalem ikonu. İKİSİ KALDI ve ikisi de SOLDA: soru başlığı ile
   seçenek diski, yani "form" hissini kuran yer. Sağ panelde hiç ikon yok;
   hüküm artık yalnız kelime (renk + kelime, renk tek başına bilgi taşımıyor)
   ve boş onay dairesi yalnız SEÇİLİ kutuda çiziliyor.

   Ad alanı yine .svm-ih-; .uyg- sınıfları KULLANILMADI: fittest.css'in
   giriş hareketleri ve deftere aktarım kuralları o sınıflara bağlı ve bu
   bölümde istenmiyor.

   ERİŞİLEBİLİRLİK: soru başına <fieldset> + <legend>, gerçek radio (ok
   tuşlarıyla geziliyor); sonuç sayısı aria-live="polite". */

/* Dışa açık: /lab/muhasebe-ihtiyac adayları aynı eşlemeyi kullanıyor,
   ikinci bir kopya çıkmasın diye. */
export const IHTIYAC_IKON: Record<IhtiyacIkon, LucideIcon> = {
  konum: MapPin,
  serbest: Building2,
  mainland: Store,
  durum: Activity,
  yeni: Sparkles,
  faaliyette: BriefcaseBusiness,
  ciro: ChartColumn,
  ciroAlt: SignalLow,
  ciroOrta: SignalMedium,
  ciroUst: SignalHigh,
  kdv: Receipt,
  kdvYok: CircleOff,
  kdvVar: BadgeCheck,
};

const HUKUM_ETIKET: Record<Hukum, string> = {
  gerekli: "Gerekli",
  bagli: "Duruma bağlı",
  gerekmiyor: "Gerekmiyor",
};

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
              {SIRA.map((k) => {
                const soru = SORULAR[k];
                const SoruIkon = IHTIYAC_IKON[soru.ikon];
                return (
                  <fieldset
                    key={k}
                    className="svm-ih-soru"
                    data-cok={soru.secenekler.length > 2 ? "" : undefined}
                  >
                    <legend>
                      <span className="svm-ih-soru-i" aria-hidden="true">
                        <SoruIkon size={16} strokeWidth={2} />
                      </span>
                      {soru.soru}
                    </legend>
                    <div className="svm-ih-sec">
                      {soru.secenekler.map((o) => {
                        const OIkon = IHTIYAC_IKON[o.ikon];
                        const on = c[k] === o.id;
                        return (
                          <label key={o.id} className="svm-ih-opt" data-on={on ? "" : undefined}>
                            <input
                              type="radio"
                              name={`${kok}-${k}`}
                              value={o.id}
                              checked={on}
                              onChange={() => sec(k, o.id)}
                            />
                            <span className="svm-ih-opt-d" aria-hidden="true">
                              <OIkon size={17} strokeWidth={1.9} />
                            </span>
                            <span className="svm-ih-opt-t">{o.etiket}</span>
                            <span className="svm-ih-opt-m" aria-hidden="true">
                              <Check size={12} strokeWidth={3} />
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>
                );
              })}
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
                  const href = altHizmetHrefByKalem(s.kalem.id);
                  return (
                    <li key={s.kalem.id} data-hukum={s.hukum}>
                      <details className="svm-ih-satir">
                        <summary>
                          <span className="svm-ih-ad">{s.kalem.title}</span>
                          <span className="svm-ih-rozet">{HUKUM_ETIKET[s.hukum]}</span>
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
