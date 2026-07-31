"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, ChevronDown, TriangleAlert, X } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import SmartLink from "@/components/shared/SmartLink";
import { Flag } from "@/components/shared/CountryPicker";
import { COUNTRY_PHOTO } from "@/lib/media";
import {
  COUNTRY_NAME,
  COUNTRY_ORDER,
  FACTS,
  PAY_MATRIX,
  type CountrySlug,
} from "@/lib/brand";

/* ============================================================================
   ADAY C8 — CANLI BÖLÜMÜN SADE HÂLİ

   Bu bir "yeni fikir" değil. Canlıdaki ThreeCountries'in ta kendisi: aynı üç
   sütunlu tek panel, aynı fotoğraflı kapalı sütun, aynı yerinde açılma. Değişen
   tek şey içeriğin miktarı. Müşterinin cümlesi netti — "şu anda sitede olanın
   çok daha sade bir hâli" — yani iskelet korunacak, yük atılacak.

   İSKELETTEN NE KORUNDU (bilerek, birebir)

   · Üç ayrı kart değil, saç teli çizgilerle üçe bölünmüş TEK panel.
   · Kapalı sütun = ülke fotoğrafı + koyulaştırma; açılınca fotoğraf eriyor ve
     sütun beyaza oturuyor. Bu bölümün kimliği bu; C5'te fotoğrafı atmıştım ve
     müşteri haklı olarak "konudan saptın" dedi.
   · Açık sütun genişliyor (flex-grow), kapalılar daralıyor. Kıyas hissini
     ayakta tutan şey bu: açık ülke büyürken diğer ikisi ekrandan çıkmıyor.
   · Kapalı sütunun tamamı düğme (.c8-head::after hit alanını yayıyor), açılım
     yerinde, başka sayfaya gitmek yok.
   · popLayout: kapanan gövde çıkış animasyonu boyunca akıştan çıkıyor. Canlıda
     bunun sebebi yazılıydı ve hâlâ geçerli — iki gövde bir an üst üste biniyor,
     ikisini birden taşıyacak kadar uzun bir satır istemiyoruz.

   CANLI PANELDEN NE KESİLDİ — SATIR SATIR, HER BİRİ İÇİN GEREKÇE

   1) GÖRÜNÜM ANAHTARI ("Ülke ülke" / "Yan yana kıyas") ve arkasındaki 7 satır ×
      3 sütunluk TABLO. En büyük kesik ve en kolay karar: tablo, kartların
      söylediğinin ikinci bir kopyası. Aynı FACTS, aynı PAY_MATRIX, ikinci bir
      düzende. Ziyaretçi ikisini birden okumuyor; birini seçiyor, diğeri boşuna
      duruyor. Kıyas ihtiyacı ortadan kalkmadı — kapalı rayın kendisi kıyas
      (aşağıda, "kıyas nerede kaldı"). Anahtar da tabloyla birlikte gitti: iki
      görünüm kalmayınca aralarında geçilecek bir şey de yok.

   2) EDGE + MINI ÇİFTİ → TEK CÜMLE. Canlıda ülke başına iki ayrı metin vardı:
      kapalıyken MINI ("Vize, banka, esnek yapı"), açılınca 29 piksellik EDGE
      ("Oturum vizesi çıkabilen tek ülke."). İkisi aynı şeyi söylüyordu, üstelik
      MINI açılışta display:none ile saklanıyordu. Altı elle yazılmış metin
      yerine üç tane kaldı; cümle her iki durumda da aynı yerde duruyor, sadece
      açılınca büyüyüp ayırt edici kısmı maviye dönüyor. Bir metnin yerinde
      büyümesi, yerine başka bir metnin gelmesinden hem sade hem dürüst.

   3) "NEDEN?" İKON RAYI (ülke başına üç etiket, toplam dokuz). Tamamen gitti.
      İki sebep: (a) hiçbiri brand.ts'ten gelmiyordu, dokuzu da elle yazılmış
      iddiaydı; (b) söyledikleri şey zaten forWhom ve structure alanlarının
      içinde — "Companies House kaydı" ile "Limited · Companies House" yan yana
      durunca ikincisi birincisini gereksiz kılıyor.

   4) "UYGUN" YEŞİL ÇİP LİSTESİ → DÜZ METİN. forWhom aynı kaynaktan okunuyor,
      sadece virgülünden bölünüp dört yeşil hapa dönüştürülmüyor. Çip, bir şeyin
      var/yok olduğunu göstermek için iyi bir biçim; burada söylenen şey bir
      hedef kitle, yani var/yok değil. Dört nesne yerine bir cümle.

   5) DÖRT KANALLI TAHSİLAT ŞERİDİ (Stripe · PayPal · Wise · Yerel banka,
      renkli hap olarak) → İKİ KANALLI TEK SATIR, hem de panelin içinde değil
      sütunun sabit alt şeridinde. Wise ve Yerel banka düştü çünkü ikisi de
      "kartla tahsilat" sorusunun cevabı değil; biri ödeme kuruluşu, diğeri
      banka. O ayrım tek satırlık bir hücrede anlatılamaz, banka sayfalarının
      işi. Kalan iki ad kararı gerçekten değiştiren eksen: Dubai/İngiltere'de
      var, KKTC'de yok.

   6) SOLİD MAVİ CTA ("Dubai'de kuruluş" düğmesi) → sessiz metin bağlantısı.
      Bölümün işi satmak değil, ülke seçtirmek. Üç panelde üç mavi düğme, sade
      bir bölümün içindeki en gürültülü nesne olurdu.

   7) ALTTAKİ İKİ ÖDEME DİPNOTU (.uk2-notes). Gitti. İkisi de PriceSummary'de,
      HomeFaq'te ve /{ülke}/banka-hesabi sayfalarında tam hâliyle duruyor; bu
      bölümde üçüncü kez okunmalarının bir sebebi yok.
      DİKKAT — o blok id="odeme-altyapisi" taşıyor ve lib/routes.ts bu çapayı
      canlı sayıyor (FinalCta ve footer oraya bağlanıyor). Bu aday seçilirse
      çapanın yeni bir eve ihtiyacı var; burası o metni barındırmadığı için
      id'yi de sahiplenmiyor.

   8) "ÜÇ ÜLKEYİ KARŞILAŞTIRIN" ÇIKIŞI. Gitti. Kıyas artık bölümün kendisinde;
      kıyas için başka bir sayfaya davet etmek bu turun ana kuralına aykırı.

   9) YARDIMCI KATMAN. State / groupState / MARK_TEXT / STATE_WORD / BrandName /
      cap / PAY_ROWS / TABLE_ROWS hepsi tabloyla ve çiplerle birlikte gitti.
      Geriye PAY_MATRIX'ten tek bir türetme kaldı (cardsOf). Marka glifleri de
      düştü: kanal başına işaret + logo + ad üç nesne demekti, iki tane yetiyor.

   NE KESİLMEDİ, KESİLEMEZDİ

   FACTS[c].limit. Panelin üçüncü ve son satırı, amber üçgeniyle. Canlı bölümde
   bu uyarı karttan çıkarılmıştı ve yalnızca tabloda kalmıştı — tabloyu atınca
   kısıt bölümden tamamen düşecekti. Geri geldi, ama kutu olarak değil, diğer
   iki satırla aynı biçimde: kısıt bir uyarı afişi değil, ülkenin bir özelliği.

   KIYAS NEREDE KALDI

   Kapalı rayın kendisinde. Üç sütunun altında AYNI HİZADA duran tek bir eksen
   var (kartla tahsilat) ve o eksen elle yazılmıyor, PAY_MATRIX'ten okunuyor.
   Şerit her iki durumda da görünür — açılan sütunda da kaybolmuyor — çünkü
   açılınca bilgi kaybetmek, sadeleştirme değil eksiltmedir. Göz üç sütunu alt
   kenardan tarayınca KKTC'nin iki çarpısını görüyor: tablo kurmadan tablo
   etkisi.

   NEDEN HEPSİ KAPALI BAŞLIYOR

   Canlı bölüm Dubai açık başlıyor. Bu, üç ülkeyi eşit sunmuyor ve bölümün en
   kısa hâlini hiç göstermiyor. Burada hiçbiri açık değil; kapalı hâl de boş
   değil (bayrak, ad, ayırt eden cümle, kıyas ekseni). Ayrıca panel yükseklikleri
   öyle ayarlandı ki bir sütun açılınca ray neredeyse hiç uzamıyor — sayfa
   zıplamıyor, açmak "bir yeri şişirmek" gibi hissettirmiyor.

   İSTANBUL: bu bölümde geçmiyor. KKTC'nin yakınlık argümanı yalnızca kendi
   cümlesinde ve referans noktası vermeden duruyor.
   ========================================================================= */

const EASE = [0.22, 1, 0.36, 1] as const;

/* Ülke başına TEK metin, iki durumda da aynı yerde. Üçe bölünmüş olmasının tek
   sebebi vurgu: panel açılınca "hot" parçası markanın mavisine dönüyor, kapalı
   fotoğrafın üstünde ise tamamı beyaz kalıyor (mavi, koyulaştırılmış bir
   fotoğrafın üstünde okunmuyor).

   Metinler canlı bölümün EDGE kaydından geliyor, çünkü onlar zaten elenmiş
   cümleler: söz vermiyorlar (Dubai'de "çıkabilen", "çıkar" değil — vize kararı
   konsolosluğun), rakam ve süre içermiyorlar (ikisi de fiyat bölümünün işi) ve
   üçünde de doğru olan bir şeyi tekrar etmiyorlar. */
const LINE: Record<CountrySlug, { a: string; hot: string; b: string }> = {
  dubai: { a: "Oturum vizesi ", hot: "çıkabilen tek ülke", b: "." },
  ingiltere: { a: "Baştan sona ", hot: "uzaktan kuruluş", b: "." },
  kktc: { a: "", hot: "Türkiye'ye en yakın", b: " seçenek." },
};

/* Kıyas ekseni. Elle yazılmıyor: PAY_MATRIX'in "Tahsilat" grubundaki iki kartlı
   kanal okunuyor, matris değişirse üç sütun birden değişir. Neden bu eksen:
   üç ülkeyi gerçekten ikiye ayıran tek veri bu (Dubai/İngiltere var, KKTC yok).
   Üçünde de aynı çıkan bir eksen kıyas hissi vermez, sadece yer kaplar. */
const CARD_ROWS =
  PAY_MATRIX.find((g) => g.title === "Tahsilat")?.rows.filter(
    (r) => r.name === "Stripe" || r.name === "PayPal",
  ) ?? [];

function cardsOf(c: CountrySlug) {
  return CARD_ROWS.map((r) => ({ name: r.name, on: r.cells[c] === "yes" }));
}

export default function CountriesC8() {
  /* null gerçek bir durum: açık sütun kendi fotoğrafına geri kapanıyor. */
  const [open, setOpen] = useState<CountrySlug | null>(null);
  const reduce = useReducedMotion();

  const toggle = (c: CountrySlug) => setOpen((prev) => (prev === c ? null : c));
  /* Tek yerden süre: reduce açıkken 0 verince motion aynı düzeni animasyonsuz
     kuruyor, AnimatePresence'i sökmek gerekmiyor. */
  const dur = reduce ? 0 : 0.4;

  return (
    <section className="sec-pad" style={{ background: "var(--paper)" }}>
      <div className="container-o">
        <div className="sec-head">
          {/* Başlık canlıdan aynen: bu turun konusu başlık değil, içerik yükü. */}
          <SplitWords
            as="h2"
            text="Hizmet verdiğimiz bölgeler."
            accent="bölgeler."
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.2}>
            {/* Canlı satır "Kanallar ve sınırlar kartlarda." diyordu; kart diye
                bir şey kalmadı, sütun var. İkinci yarı artık mekaniği söylüyor:
                bu cümle olmadan kapalı ray "hepsi bu mu?" diye okunuyor. */}
            <p className="sec-lead">
              Üç ülkede kuruluş, banka ve muhasebe. Ayrıntı için ülkeyi açın.
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.16} className="c8-view">
          <div className="c8-rail">
            {COUNTRY_ORDER.map((c) => {
              const on = open === c;
              return (
                <article key={c} className="c8-panel" data-on={on}>
                  {/* Kapalı sütunun zemini: fotoğraf + aşağı doğru koyulaşan
                      perde. Perde olmadan beyaz tipografi bazı karelerde
                      okunmuyor; opaklığı aşağıda en yüksek çünkü kıyas şeridi
                      orada duruyor. Açılınca katman eriyip hafifçe büyüyor. */}
                  <motion.span
                    className="c8-media"
                    aria-hidden="true"
                    initial={false}
                    animate={{ opacity: on ? 0 : 1, scale: on && !reduce ? 1.05 : 1 }}
                    transition={{ duration: dur, ease: EASE }}
                  >
                    <span
                      className="c8-photo"
                      style={{ backgroundImage: `url(${COUNTRY_PHOTO[c]})` }}
                    />
                    <span className="c8-scrim" />
                  </motion.span>

                  {/* Tek düğme, tek aria-expanded. Sütunun tamamı tıklanabilir
                      (CSS'teki ::after), yani hedef ikon değil ülkenin kendisi. */}
                  <button
                    type="button"
                    className="c8-head"
                    aria-expanded={on}
                    /* Gövde kapalıyken DOM'da yok; var olmayan bir id'ye işaret
                       eden bağ erişilebilirlik denetiminde kırık referans. */
                    aria-controls={on ? `c8-body-${c}` : undefined}
                    onClick={() => toggle(c)}
                  >
                    <span className="c8-flag" aria-hidden="true">
                      <Flag country={c} />
                    </span>
                    <span className="c8-id">
                      <span className="c8-name">{COUNTRY_NAME[c]}</span>
                      <span className="c8-line">
                        {LINE[c].a}
                        <b>{LINE[c].hot}</b>
                        {LINE[c].b}
                      </span>
                    </span>
                    <span className="c8-chev" aria-hidden="true">
                      <ChevronDown size={18} strokeWidth={2.2} />
                    </span>
                  </button>

                  <AnimatePresence initial={false} mode="popLayout">
                    {on && (
                      <motion.div
                        key="body"
                        id={`c8-body-${c}`}
                        className="c8-body"
                        role="group"
                        aria-label={`${COUNTRY_NAME[c]} özeti`}
                        initial={{ opacity: 0, y: reduce ? 0 : 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{
                          opacity: 0,
                          y: reduce ? 0 : 5,
                          transition: { duration: reduce ? 0 : 0.18, ease: EASE },
                        }}
                        transition={{
                          duration: reduce ? 0 : 0.36,
                          ease: EASE,
                          delay: reduce ? 0 : 0.08,
                        }}
                      >
                        {/* Üç satır, üçü de brand.ts'ten. Etiket-değer ızgarası
                            olması kasıtlı: alt alta üç blok yerine hizalı üç
                            satır, hem yarı yükseklik hem de "künye" hissi. */}
                        <dl className="c8-facts">
                          <div>
                            <dt>Uygun</dt>
                            <dd>{FACTS[c].forWhom}</dd>
                          </div>
                          <div>
                            <dt>Yapı</dt>
                            <dd>{FACTS[c].structure}</dd>
                          </div>
                          <div>
                            <dt>Kısıt</dt>
                            {/* Dürüst kısıt kutu değil satır. Amber yalnızca
                                ikonda: metni de zeminini de boyamak, bölümün
                                tek uyarısını bir reklam bloğuna çeviriyordu. */}
                            <dd className="c8-limit">
                              <TriangleAlert size={15} strokeWidth={2.1} aria-hidden="true" />
                              <span>{FACTS[c].limit}</span>
                            </dd>
                          </div>
                        </dl>

                        {/* Bölümün tek çıkışı ve yalnızca açık panelde var.
                            Kapalı rayda hiç bağlantı yok: sıra önce oku, sonra
                            istersen git. */}
                        <SmartLink href={`/${c}`} className="c8-door">
                          {COUNTRY_NAME[c]} sayfasında tamamı
                          <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                        </SmartLink>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Kıyas şeridi. Canlıdaki .uk2-tail açılınca gizleniyordu;
                      burada her iki durumda da duruyor ve margin-top:auto ile
                      sütunun dibine yapışıyor. Üç şerit aynı hizada olunca göz
                      alt kenarı tarayarak kıyas yapıyor. */}
                  <div className="c8-foot">
                    <span className="c8-foot-k">Kartla tahsilat</span>
                    <ul>
                      {cardsOf(c).map((k) => (
                        <li key={k.name} data-v={k.on ? "yes" : "no"}>
                          {k.on ? (
                            <Check size={14} strokeWidth={2.4} aria-hidden="true" />
                          ) : (
                            <X size={14} strokeWidth={2.4} aria-hidden="true" />
                          )}
                          {k.name}
                          {/* renk ve ikon tek başına taşımasın diye */}
                          <span className="sr-only">
                            {k.on ? " çalışıyor" : " çalışmıyor"}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
