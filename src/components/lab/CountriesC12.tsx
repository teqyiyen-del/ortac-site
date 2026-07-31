"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react";
import {
  ArrowRight,
  Briefcase,
  Building2,
  Check,
  ChevronDown,
  Cpu,
  Globe,
  IdCard,
  KeyRound,
  Landmark,
  Laptop,
  MapPin,
  PiggyBank,
  ShoppingBag,
  TriangleAlert,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import SmartLink from "@/components/shared/SmartLink";
import { Flag } from "@/components/shared/CountryPicker";
import { BrandGlyph } from "@/components/shared/BrandMark";
import { brandKeyForName, type BrandKey } from "@/lib/brands";
import { COUNTRY_PHOTO } from "@/lib/media";
import {
  COUNTRY_NAME,
  COUNTRY_ORDER,
  FACTS,
  PAY_MATRIX,
  type CountrySlug,
} from "@/lib/brand";

/* ============================================================================
   ADAY C12 — C8'in aynısı, PANELİ DEĞİŞTİRİLMİŞ

   Müşteri iki adayı da beğendi ama ikisinde de aynı şeyi söyledi: "açılır
   pencere açılınca çok fazla yazıyla karşılaşıyoruz — biraz daha icondur bir
   şeylerdir ekle ki daha okunaklı bir yapı olsun, şu an aşırı donuk
   hissettiriyor."

   Bu dosya C8'in birebir kopyası olarak başladı. Kapalı hâlin TEK bir pikseli
   değişmedi: aynı fotoğraflı sütun, aynı bayrak, aynı tek cümle, aynı çevron,
   aynı "Kartla tahsilat" alt şeridi. Değişen yalnızca panelin içi — çünkü
   müşterinin şikâyeti de yalnızca orası. İskeleti beğenilmiş bir bölümü
   iskeletinden tutup sallamak, verilen geri bildirimi yanlış okumak olurdu.

   C8'İN PANELİ NEDEN DONUK

   C8'in paneli üç satırlık bir etiket-değer ızgarasıydı: "Uygun / Yapı /
   Kısıt". Teknik olarak kısa (üç satır), ama gözle bakıldığında üç gri metin
   bloğu. Tek görsel işaret amber üçgendi. Sorun metnin MİKTARI değil, metnin
   YALNIZ olması: 45 karakterlik bir cümle, yanında hiçbir işaret yokken de 45
   karakter okunuyor. Ekranda ayırt edilecek nesne olmayınca göz baştan sona
   okumak zorunda kalıyor — "donuk" dedikleri şey bu.

   C12'NİN CEVABI: METNİ KISALTMAK DEĞİL, METNİ NESNEYE ÇEVİRMEK

   Panelin taşıdığı bilgi neredeyse aynı kaldı; taşıma biçimi değişti. Dört
   nesne türü var ve her biri farklı bir tonda, yani ne olduğu renginden
   anlaşılıyor:

     · MAVİ KARO  → ülkenin bir özelliği (kim için uygun)
     · GRİ KARO   → sınıflandırma, iddia değil (hukuki yapı)
     · BEYAZ PLAKA → gerçek marka işareti (banka ve ödeme kanalları)
     · AMBER KARO → dürüst kısıt

   Aynı geometri (26 piksel, aynı köşe yarıçapı), dört ton. Ziyaretçi bir
   satırın ne söylediğini okumadan önce ne TÜRDE bir şey söylediğini biliyor.

   SATIR SATIR: NE KALDI, NE GİRDİ, NE ÇIKTI

   1) "Uygun" (FACTS[c].forWhom) — C8'de tek bir düz cümleydi
      ("E-ticaret, teknoloji, danışmanlık, oturum isteyen"). Artık virgülünden
      bölünüp her kalem KENDİ İKONUYLA ayrı bir satır. Kelime sayısı aynı, ama
      dört ayrı nesne dört ayrı işaretle geliyor: e-ticaret bir alışveriş
      çantası, teknoloji bir çip, oturum isteyen bir kimlik kartı. İkon burada
      süs değil; ziyaretçi kendi işini metni okumadan, sembolden tanıyor.
      İkonlar anahtar kelimeye göre eşleşiyor (fitIcon), tek tek ülkeye
      yazılmıyor — brand.ts'teki metin değişirse eşleşme kendiliğinden
      çalışıyor, eşleşmezse "hedef kitle" anlamına gelen Users ikonuna
      düşüyor. Soyut madde imi hiçbir durumda çıkmıyor.

   2) "Yapı" (FACTS[c].structure) — aynı cümle, ama artık gri karolu kendi
      satırı. Gri olmasının sebebi: bu bir fayda değil, bir sınıflandırma.
      Mavi olsaydı yukarıdaki dört kalemin beşincisi gibi okunurdu.

   3) YENİ: "Banka" ve "Ödeme kuruluşu" — panelin görsel merkezi. C8'de
      panelde hiç kanal bilgisi yoktu (yalnızca alt şeritte iki ad, düz metin).
      Burada PAY_MATRIX'in iki grubu gerçek marka işaretleriyle geliyor:
      BrandGlyph, beyaz plakanın içinde. Neden bu iki grup ve neden tahsilat
      değil: tahsilat zaten alt şeritte duruyor ve o şerit kapalı sütunda da
      görünüyor — panelde ikinci kez basmak tekrar olurdu.

      Bu blok aynı zamanda sitenin en sık tekrarladığı uyarıyı CÜMLE
      KURMADAN söylüyor. Canlı bölümde altta bir dipnot vardı: "Ödeme kuruluşu
      hesabı, banka hesabı değildir." Burada Wise ve Payoneer, Wio ve
      Mashreq'in ALTINDA ve BAŞKA BİR BAŞLIK ile duruyor. İki başlık, iki
      grup — ayrım görsel, dipnot gerekmiyor.

      Çalışmayan kanal gizlenmiyor: KKTC'de Wise ve Payoneer plakası duruyor
      ama gri, yanında kırmızı çarpı ve ekran okuyucu için "çalışmıyor". Boş
      bir hücre "bilmiyoruz" demek; gri bir logo "denendi, olmuyor" demek.
      "none" hücreleri (o ülkede hiç sunulmayan kanallar) ise basılmıyor —
      İngiltere'de gri bir Wio logosu, reddedilmiş gibi okunurdu.

   4) Dürüst kısıt (FACTS[c].limit) — DURUYOR, kaldırılmadı, kırpılmadı.
      Amber karosuyla panelin kapanış satırı. Yeri kasıtlı olarak en altta:
      panel bir uyarıyla açılsaydı üstündeki her şey onun gölgesinde okunurdu.

   5) Kapı bağlantısı — duruyor, ama artık kısıtla aynı satırda, sağ uçta.
      Tek başına bir satır işgal etmesi için bir sebep yoktu ve o satır
      panelin boyunu 24 piksel uzatıyordu.

   NE ÇIKTI: hiçbir bilgi. C8'in panelinde olup burada olmayan tek şey,
   etiket-değer ızgarasının kendisi.

   DÜZEN: PANEL AÇILINCA İKİ KOLONA GİRİYOR

   C8 açık sütunun genişliğini kullanmıyordu — 620 piksellik bir sütunda tek
   sıra hâlinde üç satır vardı, sağ yarısı boştu. Burada gövde iki kolon:
   solda şirket (kim için + yapı), sağda para (banka + ödeme). Bu, eklenen
   nesnelere rağmen panelin boyunu tek kolona göre yaklaşık 130 piksel kısa
   tutuyor. Dar ekranda tek kolona iniyor.

   Açık sütunun flex-grow'u 2.2'den 2.5'e çıktı (canlıdaki değer). C8'de 2.2
   yeterliydi çünkü gövde üç satırdı; iki kolonlu bir gövde biraz daha nefes
   istiyor ve 2.5 hâlâ diğer iki sütunu ekranda tutuyor.

   HAREKET: KADEMELİ AMA ÖLÇÜLÜ

   C8'de panel tek parça hâlinde beliriyordu — bir blok gelip oturuyor,
   bitiyor. "Donuk" hissinin ikinci kaynağı buydu. Burada panel dört adımda
   kuruluyor (kim için → yapı → kanallar → kısıt), her adım 7 piksel aşağıdan,
   50 ms arayla; kim için kalemleri kendi içinde 40 ms arayla. Toplam 0,5
   saniye — bir şeyin oluştuğunu görmeye yetiyor, beklemeye sebep olmuyor.
   useReducedMotion açıkken hem gecikme hem kayma sıfırlanıyor: aynı düzen,
   animasyonsuz, tek karede.

   DEĞİŞMEYENLER: başlık, giriş cümlesi, bölüm zemini, kapalı sütun, alt şerit,
   popLayout'lu çıkış, hepsi kapalı başlaması. Ve C8'in devraldığı borç
   duruyor: bu bölüm #odeme-altyapisi çapasını taşımıyor, kazanan aday canlıya
   taşınırken o çapaya yeni bir ev bulmak gerekiyor (routes.ts onu canlı
   sayıyor).
   ========================================================================= */

const EASE = [0.22, 1, 0.36, 1] as const;

/* Ülke başına TEK metin, iki durumda da aynı yerde. C8'den aynen alındı —
   kapalı hâl değişmiyor. */
const LINE: Record<CountrySlug, { a: string; hot: string; b: string }> = {
  dubai: { a: "Oturum vizesi ", hot: "çıkabilen tek ülke", b: "." },
  ingiltere: { a: "Baştan sona ", hot: "uzaktan kuruluş", b: "." },
  kktc: { a: "", hot: "Türkiye'ye en yakın", b: " seçenek." },
};

/* Alt şeridin kıyas ekseni — C8'den aynen. */
const CARD_ROWS =
  PAY_MATRIX.find((g) => g.title === "Tahsilat")?.rows.filter(
    (r) => r.name === "Stripe" || r.name === "PayPal",
  ) ?? [];

function cardsOf(c: CountrySlug) {
  return CARD_ROWS.map((r) => ({ name: r.name, on: r.cells[c] === "yes" }));
}

/* ---------------------------------------------------- "Uygun" ikonları ---- */
/* Eşleşme anahtar kelimeyle yapılıyor, ülkeye göre elle yazılmıyor. Sebebi
   bakım: FACTS[c].forWhom tek kaynak ve bir gün "gayrimenkul SPV" yerine
   "gayrimenkul yatırımı" yazılırsa liste sessizce ikonsuz kalmasın. Sıra
   önemli — ilk eşleşen kazanıyor, o yüzden dar anlamlı kelimeler üstte.

   Fallback bilerek bir madde imi ya da nokta değil: Users, yani "hedef
   kitle". Eşleşmeyen bir kalem de bir kitleyi tarif ediyor; soyut bir işaret
   basmak, ikon eklemenin amacını boşa çıkarırdı. */
const FIT_ICONS: { k: string; i: LucideIcon }[] = [
  { k: "ticaret", i: ShoppingBag },
  { k: "teknoloji", i: Cpu },
  { k: "danış", i: Briefcase },
  { k: "oturum", i: IdCard },
  { k: "freelance", i: Laptop },
  { k: "gayrimenkul", i: KeyRound },
  { k: "pazar", i: Globe },
  { k: "yakın", i: MapPin },
  { k: "maliyet", i: PiggyBank },
];

function fitIcon(t: string): LucideIcon {
  const s = t.toLocaleLowerCase("tr-TR");
  return FIT_ICONS.find((f) => s.includes(f.k))?.i ?? Users;
}

/* forWhom cümlenin ortasından geliyor, yani kalemlerin ilki hariç hepsi küçük
   harfle başlıyor. Ayrı satır olunca her biri kendi başına bir ifade; Türkçe
   büyütme locale istiyor (i → İ). */
function cap(s: string) {
  return s.charAt(0).toLocaleUpperCase("tr-TR") + s.slice(1);
}

/* ------------------------------------------------------ kanal okuması ----- */
type Chan = { name: string; key: BrandKey | null; on: boolean };

/* Bir gruptaki, o ülkede ANLAMLI olan kanallar. "none" elenıyor: o hücre
   "bu ülkede sunmuyoruz" demek, "denendi olmadı" demek değil — gri bir plaka
   olarak basılsa ikincisi gibi okunurdu. Kalanlar "yes" ve "no": ikisi de
   ekranda duruyor, biri renkli biri gri. */
function chansOf(title: string, c: CountrySlug): Chan[] {
  return (PAY_MATRIX.find((g) => g.title === title)?.rows ?? [])
    .filter((r) => r.cells[c] !== "none")
    .map((r) => ({
      name: r.name,
      key: brandKeyForName(r.name),
      on: r.cells[c] === "yes",
    }));
}

/* ------------------------------------------------------------ hareket ----- */
/* Variants dışarıda değil bir fabrikada, çünkü mesafe ve süre reduce'a bağlı.
   reduce açıkken "hidden" ile "show" aynı hedefi taşıyor ve süre sıfır — yani
   AnimatePresence ve kademe yapısı yerinde kalıyor, hareket kalmıyor. */
function stepV(reduce: boolean): Variants {
  return {
    hidden: { opacity: 0, y: reduce ? 0 : 7 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.34, ease: EASE } },
  };
}

/* Yalnızca sıralama taşıyan kap: kendi görünümünü değiştirmiyor, çocuklarını
   sırayla salıyor. */
function groupV(reduce: boolean, stagger: number): Variants {
  return {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : stagger } },
  };
}

export default function CountriesC12() {
  /* null gerçek bir durum: açık sütun kendi fotoğrafına geri kapanıyor. */
  const [open, setOpen] = useState<CountrySlug | null>(null);
  const reduce = useReducedMotion() ?? false;

  const toggle = (c: CountrySlug) => setOpen((prev) => (prev === c ? null : c));
  const dur = reduce ? 0 : 0.4;
  const step = stepV(reduce);

  return (
    <section className="sec-pad" style={{ background: "var(--paper)" }}>
      <div className="container-o">
        <div className="sec-head">
          <SplitWords
            as="h2"
            text="Hizmet verdiğimiz bölgeler."
            accent="bölgeler."
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.2}>
            <p className="sec-lead">
              Üç ülkede kuruluş, banka ve muhasebe. Ayrıntı için ülkeyi açın.
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.16} className="c12-view">
          <div className="c12-rail">
            {COUNTRY_ORDER.map((c) => {
              const on = open === c;
              const banks = chansOf("Banka hesabı", c);
              const psps = chansOf("Ödeme kuruluşu", c);

              return (
                <article key={c} className="c12-panel" data-on={on}>
                  {/* Kapalı sütunun zemini — C8 ile birebir aynı. */}
                  <motion.span
                    className="c12-media"
                    aria-hidden="true"
                    initial={false}
                    animate={{ opacity: on ? 0 : 1, scale: on && !reduce ? 1.05 : 1 }}
                    transition={{ duration: dur, ease: EASE }}
                  >
                    <span
                      className="c12-photo"
                      style={{ backgroundImage: `url(${COUNTRY_PHOTO[c]})` }}
                    />
                    <span className="c12-scrim" />
                  </motion.span>

                  <button
                    type="button"
                    className="c12-head"
                    aria-expanded={on}
                    aria-controls={on ? `c12-body-${c}` : undefined}
                    onClick={() => toggle(c)}
                  >
                    <span className="c12-flag" aria-hidden="true">
                      <Flag country={c} />
                    </span>
                    <span className="c12-id">
                      <span className="c12-name">{COUNTRY_NAME[c]}</span>
                      <span className="c12-line">
                        {LINE[c].a}
                        <b>{LINE[c].hot}</b>
                        {LINE[c].b}
                      </span>
                    </span>
                    <span className="c12-chev" aria-hidden="true">
                      <ChevronDown size={18} strokeWidth={2.2} />
                    </span>
                  </button>

                  <AnimatePresence initial={false} mode="popLayout">
                    {on && (
                      /* Gövde artık bir kap değil bir sıralayıcı: kendi
                         görünümü yok, çocuklarını 50 ms arayla salıyor.
                         Çıkışta ise tek parça sönüyor — kapanırken kademe
                         istemiyoruz, kapanış bir gösteri değil. */
                      <motion.div
                        key="body"
                        id={`c12-body-${c}`}
                        className="c12-body"
                        role="group"
                        aria-label={`${COUNTRY_NAME[c]} özeti`}
                        variants={{
                          ...groupV(reduce, 0.05),
                          out: {
                            opacity: 0,
                            y: reduce ? 0 : 5,
                            transition: { duration: reduce ? 0 : 0.18, ease: EASE },
                          },
                        }}
                        initial="hidden"
                        animate="show"
                        exit="out"
                        transition={{ delayChildren: reduce ? 0 : 0.08 }}
                      >
                        <div className="c12-cols">
                          {/* ---- sol kolon: şirket ---- */}
                          <div className="c12-col">
                            <motion.div className="c12-blk" variants={step}>
                              <span className="c12-k">Uygun</span>
                              {/* Kalemler kendi içinde de kademeli: dört satır
                                  aynı anda gelirse blok yine "tek nesne" gibi
                                  düşüyor, sırayla gelince liste olduğu
                                  anlaşılıyor. */}
                              <motion.ul
                                className="c12-list"
                                variants={groupV(reduce, 0.04)}
                              >
                                {FACTS[c].forWhom.split(", ").map((t) => {
                                  const Icon = fitIcon(t);
                                  return (
                                    <motion.li key={t} className="c12-item" variants={step}>
                                      <span className="c12-ic" aria-hidden="true">
                                        <Icon size={14} strokeWidth={2} />
                                      </span>
                                      {cap(t)}
                                    </motion.li>
                                  );
                                })}
                              </motion.ul>
                            </motion.div>

                            <motion.div className="c12-blk" variants={step}>
                              <span className="c12-k">Yapı</span>
                              <ul className="c12-list">
                                <li className="c12-item">
                                  <span className="c12-ic c12-ic-flat" aria-hidden="true">
                                    <Building2 size={14} strokeWidth={2} />
                                  </span>
                                  {FACTS[c].structure}
                                </li>
                              </ul>
                            </motion.div>
                          </div>

                          {/* ---- sağ kolon: para ----
                              İki grup alt alta ve ayrı başlıklı. Bu sıralama
                              tek başına "ödeme kuruluşu banka değildir"
                              cümlesinin işini görüyor; o cümlenin tam hâli
                              banka sayfalarında duruyor. */}
                          <div className="c12-col">
                            <motion.div className="c12-blk" variants={step}>
                              <span className="c12-k">Banka</span>
                              <ul className="c12-list">
                                {banks.map((b) => (
                                  <ChanItem key={b.name} chan={b} />
                                ))}
                              </ul>
                            </motion.div>

                            <motion.div className="c12-blk" variants={step}>
                              <span className="c12-k">Ödeme kuruluşu</span>
                              <ul className="c12-list">
                                {psps.map((b) => (
                                  <ChanItem key={b.name} chan={b} />
                                ))}
                              </ul>
                            </motion.div>
                          </div>
                        </div>

                        {/* Kapanış satırı: dürüst kısıt solda, kapı sağda.
                            İkisi aynı satırda çünkü ikisi de "panel bitti"
                            demek — biri sınırı söylüyor, diğeri devamının
                            nerede olduğunu. */}
                        <motion.div className="c12-close" variants={step}>
                          <p className="c12-limit">
                            <span className="c12-ic c12-ic-warn" aria-hidden="true">
                              <TriangleAlert size={14} strokeWidth={2.1} />
                            </span>
                            <span>{FACTS[c].limit}</span>
                          </p>
                          <SmartLink href={`/${c}`} className="c12-door">
                            {COUNTRY_NAME[c]} sayfası
                            <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                          </SmartLink>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Kıyas şeridi — C8 ile birebir aynı, iki durumda da
                      görünür, sütunun dibine yapışık. */}
                  <div className="c12-foot">
                    <span className="c12-foot-k">Kartla tahsilat</span>
                    <ul>
                      {cardsOf(c).map((k) => (
                        <li key={k.name} data-v={k.on ? "yes" : "no"}>
                          {k.on ? (
                            <Check size={14} strokeWidth={2.4} aria-hidden="true" />
                          ) : (
                            <X size={14} strokeWidth={2.4} aria-hidden="true" />
                          )}
                          {k.name}
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

/* Tek kanal satırı. Marka işareti beyaz plakanın içinde: BrandMark'ın kendi
   notu da bunu söylüyor — PayPal'ın laciverti ve Stripe'ın moru renkli bir
   zeminde kayboluyor, gerçek ödeme rozetleri hep beyaz plaka üstünde durur.
   Resmî vektörü olmayan kanal ("Yerel banka") uydurma logo yerine bir sicil
   binası ikonu alıyor; Wio ve Mashreq'inki ise BrandGlyph'in kendi monogram
   yedeği (SWAP:BRAND_ASSET), yani resmî SVG geldiğinde burası değişmiyor. */
function ChanItem({ chan }: { chan: Chan }) {
  return (
    <li className="c12-item c12-chan" data-v={chan.on ? "yes" : "no"}>
      <span className="c12-plate" aria-hidden="true">
        {chan.key ? (
          <BrandGlyph brand={chan.key} size={16} />
        ) : (
          <Landmark size={15} strokeWidth={2} />
        )}
      </span>
      <span className="c12-chan-n">{chan.name}</span>
      {/* Çalışmayan kanal gizlenmiyor, işaretleniyor: gri logo + çarpı. Renk
          tek başına taşımasın diye durum ekran okuyucuya da yazılıyor. */}
      {!chan.on && <X size={13} strokeWidth={2.6} className="c12-off" aria-hidden="true" />}
      <span className="sr-only">{chan.on ? " çalışıyor" : " çalışmıyor"}</span>
    </li>
  );
}
