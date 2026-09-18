"use client";

import { useId, useState } from "react";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  ChartColumn,
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
  /* BOŞ BAŞLIYOR: hiçbir seçenek seçili değil. Sağdaki liste ancak dördü de
     dolunca hüküm veriyor (öncesinde kalemler "—" ile duruyor), yani ekranda
     hiçbir zaman "sizde bunlar doğuyor" diyen yanlış bir liste olmuyor. */
  const [c, setC] = useState<Partial<Cevap>>({});
  const [adim, setAdim] = useState(0);
  const kok = useId();
  const tamam = SIRA.every((k) => c[k]);
  const k = SIRA[adim];
  const soru = SORULAR[k];
  const satirlar = ihtiyac(tamam ? (c as Cevap) : BASLANGIC);
  const gerekli = satirlar.filter((s) => s.hukum === "gerekli").length;
  const bagli = satirlar.filter((s) => s.hukum === "bagli").length;

  const sec = (anahtar: Anahtar, v: string) => {
    setC((x) => ({ ...x, [anahtar]: v }));
    gtm("needs_select", { question: anahtar, answer: v });
    if (anahtar === k && adim < SIRA.length - 1) setAdim(adim + 1);
  };

  const sorgu = new URLSearchParams({ hizmet: "muhasebe", ...(c as Record<string, string>) }).toString();

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
            <p className="sec-lead">Dört soru, altı kalem. Ön liste; kesin kapsamı teklifte netleştiriyoruz.</p>
          </FadeUp>
        </div>

        <FadeUp delay={0.1}>
          <div className="svm-ih-kart">
            <div className="svm-ih-sol">
              {tamam ? (
                /* ÖZET · dört cevap tamamlanınca. Artık soru değil CEVAP
                   ekranı: okur ne dediğini görüyor ve tek dokunuşla
                   değiştiriyor (labdaki I3'ün ayar satırları). */
                <>
                  <p className="svm-ih-sayac data">Özet · değiştirebilirsiniz</p>
                  <ul className="svm-ih-satirlar">
                    {SIRA.map((x) => (
                      <li key={x}>
                        <span className="svm-ih-etiket">{SORULAR[x].soru}</span>
                        <span className="svm-ih-segment">
                          {SORULAR[x].secenekler.map((o) => (
                            <label key={o.id} data-on={c[x] === o.id ? "" : undefined}>
                              <input
                                type="radio"
                                name={`${kok}-ozet-${x}`}
                                value={o.id}
                                checked={c[x] === o.id}
                                onChange={() => sec(x, o.id)}
                              />
                              {o.etiket}
                            </label>
                          ))}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className="svm-ih-bastan"
                    onClick={() => {
                      setC({});
                      setAdim(0);
                    }}
                  >
                    <RotateCcw size={14} strokeWidth={2} aria-hidden="true" />
                    Baştan başla
                  </button>
                </>
              ) : (
                <>
                  <p className="svm-ih-sayac data">
                    {adim + 1} / {SIRA.length}
                  </p>
                  <p className="svm-ih-soru">{soru.soru}</p>
                  <div className="svm-ih-buyuk">
                    {soru.secenekler.map((o) => {
                      const OIkon = IHTIYAC_IKON[o.ikon];
                      return (
                        <label key={o.id} data-on={c[k] === o.id ? "" : undefined}>
                          <input
                            type="radio"
                            name={`${kok}-${k}`}
                            value={o.id}
                            checked={c[k] === o.id}
                            onChange={() => sec(k, o.id)}
                          />
                          <span className="svm-ih-buyuk-d" aria-hidden="true">
                            <OIkon size={20} strokeWidth={1.9} />
                          </span>
                          <span className="svm-ih-buyuk-t">{o.etiket}</span>
                        </label>
                      );
                    })}
                  </div>
                  <div className="svm-ih-gezin">
                    <button
                      type="button"
                      onClick={() => setAdim(Math.max(0, adim - 1))}
                      disabled={adim === 0}
                    >
                      <ArrowLeft size={15} strokeWidth={2.1} aria-hidden="true" />
                      Geri
                    </button>
                    <span className="svm-ih-nokta" aria-hidden="true">
                      {SIRA.map((x, i) => (
                        <i key={x} data-on={i <= adim ? "" : undefined} />
                      ))}
                    </span>
                    <button
                      type="button"
                      onClick={() => setAdim(Math.min(SIRA.length - 1, adim + 1))}
                      disabled={adim === SIRA.length - 1 || !c[k]}
                    >
                      İleri
                      <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                    </button>
                  </div>
                </>
              )}
            </div>

            <div className="svm-ih-sonuc">
              <p className="svm-ih-ozet" aria-live="polite">
                {tamam ? (
                  <>
                    <b className="data">{gerekli}</b> kalem gerekli
                    {bagli > 0 && (
                      <>
                        {" · "}
                        <b className="data">{bagli}</b> duruma bağlı
                      </>
                    )}
                  </>
                ) : (
                  "Dört soruyu cevaplayın, liste burada çıksın"
                )}
              </p>
              <ul className="svm-ih-liste">
                {satirlar.map((s) => {
                  const href = altHizmetHrefByKalem(s.kalem.id);
                  /* Dört cevap tamamlanmadan hüküm YOK: satır duruyor (liste
                     yerinden oynamıyor) ama rozet "—" ve açılır kapalı. */
                  if (!tamam) {
                    return (
                      <li key={s.kalem.id} data-hukum="bekliyor">
                        <p className="svm-ih-bekle">
                          <span className="svm-ih-ad">{s.kalem.title}</span>
                          <span className="svm-ih-rozet">—</span>
                          <span className="svm-ih-tutar data">{nf.format(s.kalem.price.usd)} USD</span>
                        </p>
                      </li>
                    );
                  }
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
              {tamam && <AskCta label="Bu listeyle teklif isteyin" href={`/basla?${sorgu}`} />}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
