"use client";

import { useId, useState } from "react";
import { ArrowRight, Check, CircleDashed, Minus } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import SmartLink from "@/components/shared/SmartLink";
import { gtm } from "@/lib/gtm";
import {
  BASLANGIC,
  CIRO_BANTLARI,
  ihtiyac,
  SORULAR,
  takvimNotu,
  usdKarsilik,
  type Cevap,
  type Hukum,
} from "@/lib/muhasebeIhtiyac";
import { altHizmetHrefByKalem } from "@/lib/muhasebeAltHizmet";

/* ============================================================================
   "BANA HANGİ HİZMETLER GEREKİYOR?" — /dubai/muhasebe · #ihtiyac
   Kurallar ve dayanakları lib/muhasebeIhtiyac.ts'te; burada yalnız dizim.

   15.09.2026 · marketing listesi, madde 9. Yer: fiyat listesinin HEMEN ÜSTÜ.
   Seçici altı kalemi işaretliyor, bir alttaki bölüm aynı altı kalemin
   bedelini yazıyor; ziyaretçi "bende hangileri doğuyor" sorusunun cevabını
   fiyatı görmeden önce alıyor. Fiyat bölümünün kendi düğmesi de zaten bu
   soruyu soruyordu ("Hangi kalemler bende doğuyor?").

   SONUÇ HER SEÇİMDE ANINDA değişiyor, "Hesapla" düğmesi yok: dört soru ve
   varsayılan cevaplar dolu, yani liste ilk açılışta da anlamlı. Varsayılan
   bilerek en sık gelen okur: serbest bölgede yeni kurulan şirket.

   ERİŞİLEBİLİRLİK: her soru bir <fieldset> + <legend>, seçenekler gerçek
   radio (klavye ok tuşlarıyla geziliyor). Sonuç listesi aria-live="polite":
   seçim değişince ekran okuyucu yeni listeyi bir kez okuyor.

   LEAD: düğme /basla'ya gidiyor ve seçimleri sorgu parametresi olarak
   taşıyor (bugün kimse okumuyor; /basla'nın parametre bloğu hazır bekliyor).
   Formun kendisi (marketing madde 1-2) Murat onayında açık. */

const HUKUM_ETIKET: Record<Hukum, string> = {
  gerekli: "Gerekli",
  bagli: "Duruma bağlı",
  gerekmiyor: "Gerekmiyor",
};

const HUKUM_IKON = {
  gerekli: Check,
  bagli: CircleDashed,
  gerekmiyor: Minus,
} as const;

const nf = new Intl.NumberFormat("tr-TR");

export default function AccountingNeeds() {
  const [c, setC] = useState<Cevap>(BASLANGIC);
  const kok = useId();
  const satirlar = ihtiyac(c);
  const gerekli = satirlar.filter((s) => s.hukum === "gerekli").length;
  const bagli = satirlar.filter((s) => s.hukum === "bagli").length;

  const sec = <K extends keyof Cevap>(k: K, v: Cevap[K]) => {
    setC((o) => ({ ...o, [k]: v }));
    gtm("needs_select", { question: k, answer: String(v) });
  };

  const sorgu = new URLSearchParams({
    hizmet: "muhasebe",
    bolge: c.bolge,
    durum: c.durum,
    ciro: c.ciro,
    kdv: c.kdv,
  }).toString();

  const secenek = <K extends "bolge" | "durum" | "kdv">(k: K) => (
    <fieldset className="svm-ih-soru">
      <legend>{SORULAR[k].soru}</legend>
      <div className="svm-ih-sec">
        {SORULAR[k].secenekler.map((o) => (
          <label key={o.id}>
            <input
              type="radio"
              name={`${kok}-${k}`}
              value={o.id}
              checked={c[k] === o.id}
              onChange={() => sec(k, o.id as Cevap[K])}
            />
            <span>{o.etiket}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );

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
            <p className="sec-lead">
              Dört seçim yapın, altı kalemden hangilerinin sizde doğduğunu görün. Ön liste; kesin kapsamı
              teklifte netleştiriyoruz.
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.1}>
          <div className="svm-ih-kart">
            <form className="svm-ih-form" onSubmit={(e) => e.preventDefault()}>
              {secenek("bolge")}
              {secenek("durum")}
              <fieldset className="svm-ih-soru">
                <legend>{SORULAR.ciro.soru}</legend>
                <div className="svm-ih-sec svm-ih-sec-ciro">
                  {CIRO_BANTLARI.map((b) => (
                    <label key={b.id}>
                      <input
                        type="radio"
                        name={`${kok}-ciro`}
                        value={b.id}
                        checked={c.ciro === b.id}
                        onChange={() => sec("ciro", b.id)}
                      />
                      <span>
                        {b.etiket}
                        {b.ustAed && b.id !== "c5" && <small>üst sınır {usdKarsilik(b.ustAed)}</small>}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
              {secenek("kdv")}
            </form>

            <div className="svm-ih-sonuc">
              <p className="svm-ih-ozet" aria-live="polite">
                <b className="data">{gerekli}</b> kalem gerekli
                {bagli > 0 && (
                  <>
                    {" · "}
                    <b className="data">{bagli}</b> kalem duruma bağlı
                  </>
                )}
              </p>
              <ul className="svm-ih-liste">
                {satirlar.map((s) => {
                  const Ikon = HUKUM_IKON[s.hukum];
                  const href = altHizmetHrefByKalem(s.kalem.id);
                  return (
                    <li key={s.kalem.id} data-hukum={s.hukum}>
                      <span className="svm-ih-rozet">
                        <Ikon size={13} strokeWidth={2.4} aria-hidden="true" />
                        {HUKUM_ETIKET[s.hukum]}
                      </span>
                      <span className="svm-ih-ad">
                        {href ? <SmartLink href={href}>{s.kalem.title}</SmartLink> : s.kalem.title}
                      </span>
                      <span className="svm-ih-tutar data">
                        {s.kalem.price.qualifier === "başlangıç" ? "başl. " : ""}
                        {nf.format(s.kalem.price.usd)} USD
                      </span>
                      <span className="svm-ih-neden">{s.neden}</span>
                    </li>
                  );
                })}
              </ul>
              <p className="svm-ih-not">{takvimNotu(c)}</p>
              {c.durum !== "yeni" && (
                <p className="svm-ih-not">
                  {c.durum === "degistir"
                    ? "Muhasebeci değişikliğinde devir adımları aşağıda, "
                    : "Aksayan dönemlerin toparlanması teklifte ayrıca yazılıyor; adımlar "}
                  <a href="#gecis">geçiş bölümünde</a>.
                </p>
              )}
              <SmartLink
                href={`/basla?${sorgu}`}
                className="btn btn-primary svm-ih-cta"
                onClick={() => gtm("cta_start_click", { placement: "needs_finder" })}
              >
                Bu listeyle teklif isteyin
                <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
              </SmartLink>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
