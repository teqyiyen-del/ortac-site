"use client";

/* ============================================================================
   ADAY C2 — "hizmet verdiğimiz bölgeler", tek soruya indirilmiş hâli.

   NEDEN BU TASARIM
   Mevcut bölüm (home/ThreeCountries.tsx) ana sayfada 1200px'i aşıyor: üç
   açılır panel, "Uygun / Neden?" çip listeleri, dört kanallı tahsilat şeridi,
   iki uyarı notu ve bir de "yan yana kıyas" tablosu. Hepsi doğru bilgi, ama
   hepsi ana sayfada. Detaylı kıyas zaten /ulkeler'de ve üç ülke sayfasında
   duruyor; bu bölümün tek işi ziyaretçiyi doğru ülkeye yollamak.

   Bu yüzden burada karşılaştırma yok. Bir soru var.

   Ziyaretçi kıyas tablosunu okumak istemiyor; kendi durumunu tanımak istiyor.
   "Önceliğiniz hangisi?" tek tıkla bunu yapıyor: dört mercekten birini seçince
   üç ülkeden biri (bazen ikisi) öne çıkıyor ve altta TEK CÜMLELİK bir teşhis
   beliriyor. Tablo okumak yerine kendini tanıyor.

   DÜRÜST KISIT (FACTS[c].limit) NEREDE
   Kalıcı amber şerit olarak üç kartın altında değil. Her merceğin teşhis
   cümlesinin ikinci satırında, YALNIZCA o ülke tavsiye edildiği anda.
   Gerekçe: kısıt bir gürültü değil, bir kayıt. Ziyaretçi henüz hiçbir şey
   seçmemişken "BAE'ye gelmek gerekiyor" cümlesini okumasının kimseye faydası
   yok; ama "sizin için Dubai" dendiği saniyede okumasının var. Kısıt böylece
   hem korunuyor hem de tam ihtiyaç anına taşınıyor. Metinler elle yazılmıyor,
   FACTS[c].limit'ten okunuyor — kaynak değişirse burası kendiliğinden değişir.

   TAŞINIRKEN DİKKAT (bu bölüm kazanırsa)
   1. Eski bölümde section'ın id'si "ulkeler" idi ve lib/routes.ts'teki
      HOME_ANCHORS bu çapayı canlı sayıyor. Burada bilerek id verilmedi:
      aday bileşenler karşılaştırma sayfasında yan yana duracak, üç bileşen
      aynı id'yi taşıyamaz. Kazanan ana sayfaya girerken id="ulkeler" geri
      konmalı.
   2. Eski bölümün dibindeki iki ödeme notu ("ödeme kuruluşu banka değildir",
      "hesabı banka açar") burada YOK — ülke kararının değil ödeme bölümünün
      konusu. Ama o bloğun id'si "odeme-altyapisi" idi ve FinalCta ile footer
      oraya bağlanıyor. Bu bölüm eskisinin yerine geçerse o çapaya ve o iki
      cümleye ayrı bir ev bulunmalı (para bölümü en doğal adresi).
   ========================================================================= */

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUpRight, Check, TriangleAlert } from "lucide-react";

import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import SmartLink from "@/components/shared/SmartLink";
import { Flag } from "@/components/shared/CountryPicker";
import {
  COUNTRY_NAME,
  COUNTRY_ORDER,
  FACTS,
  PAY_MATRIX,
  type CountrySlug,
} from "@/lib/brand";

/* projedeki tek yumuşama eğrisi (--ease-out-quint'in JS karşılığı) */
const EASE = [0.22, 1, 0.36, 1] as const;

/* Türkçe bulunma hâli tek tek yazılıyor. Bugünkü üç ad tesadüfen aynı eki
   alıyor ("-de") ama kural bu değil: ünlü uyumu ve sert ünsüz benzeşmesi
   yüzünden dördüncü bir ad pekâlâ "-ta" isteyebilir, üstelik "KKTC" bir
   kısaltma ve okunuşundan ek türetmek gerekiyor. Ek üreten bir yardımcı,
   listeye yeni ülke girdiği gün sessizce yanlış yazardı; sabit eşleme yanlış
   yazamaz, olsa olsa eksik kalır — ve eksik kalırsa derlemede görünür. */
const LOC: Record<CountrySlug, string> = {
  dubai: "Dubai'de",
  ingiltere: "İngiltere'de",
  kktc: "KKTC'de",
};

/* Kartın tek satırı. Ülkenin tamamını değil, o ülkeyi diğer ikisinden ayıran
   şeyi söylüyor — üçü de dört kelime, üçü de aynı gramerde, böylece göz üç
   satırı yan yana tarayıp karşılaştırabiliyor. "Çıkabilen" kasıtlı: vize
   taahhüdü verilmiyor, olabilirliği söyleniyor. */
const EDGE: Record<CountrySlug, string> = {
  dubai: "Oturum çıkabilen tek ülke",
  ingiltere: "Baştan sona uzaktan kuruluş",
  kktc: "Türkçe süreç, yakın konum",
};

/* --------------------------------------------------------- PAY_MATRIX'ten */
/* Kartla tahsilat merceği elle yazılmıyor. "Stripe ve PayPal hangi ülkede
   çalışıyor" sorusunun cevabı tek kaynakta (brand.ts) duruyor; burada sadece
   okunuyor. KKTC'nin ✗'leri yarın değişirse bu bölümdeki cümle de değişir,
   kimsenin bu dosyayı açması gerekmez. */
const PAY_ROWS = PAY_MATRIX.flatMap((g) => g.rows);
const CARD_CHANNELS = ["Stripe", "PayPal"];

function cardWorks(c: CountrySlug): boolean {
  return CARD_CHANNELS.every(
    (n) => PAY_ROWS.find((r) => r.name === n)?.cells[c] === "yes",
  );
}

const CARD_YES = COUNTRY_ORDER.filter(cardWorks);
const CARD_NO = COUNTRY_ORDER.filter((c) => !cardWorks(c));

/** "A", "A ve B", "A, B ve C" — üç ülkelik listeler için yeterli */
function joinTr(items: string[]): string {
  if (items.length < 2) return items[0] ?? "";
  return `${items.slice(0, -1).join(", ")} ve ${items[items.length - 1]}`;
}

/* ------------------------------------------------------------- mercekler */
/* Dört mercek, üç ülke. Dağılım kasıtlı olarak dengeli değil, dürüst:
   Dubai 2, İngiltere 2, KKTC 1 kez öne çıkıyor. KKTC gerçekten dar bir
   seçenek ve bunu bir çip sayısıyla saklamak, bölümü ilk cümlesinde
   güvenilmez yapardı.

   "Kartla tahsilat" merceği tek ülke değil iki ülke gösteriyor. Bu bir kusur
   değil, bölümün en değerli anı: ziyaretçi burada bölümün kendisine bir ülke
   satmadığını, gerçekten eleme yaptığını görüyor. Bir sonraki mercekte
   verilen tek ülkelik cevaba da bu yüzden inanıyor.

   lead: teşhisin yargısı, kalın ülke adından sonra gelen yarım cümle.
   but:  aynı nefeste söylenen dürüst kayıt. Üçü FACTS[c].limit'ten geliyor,
         dördüncüsü PAY_MATRIX'ten türüyor. Elle yazılan tek şey bağlaçlar. */
type Lens = {
  key: string;
  chip: string;
  picks: CountrySlug[];
  lead: string;
  but: string;
};

const LENS_DEFS: Lens[] = [
  {
    key: "oturum",
    chip: "Oturum / vize",
    picks: ["dubai"],
    lead: "oturum vizesi çıkabilen tek ülke.",
    but: `${FACTS.dubai.limit}.`,
  },
  {
    key: "tahsilat",
    chip: "Kartla tahsilat",
    picks: CARD_YES,
    /* "ikisinde de" yazılmadı: cümle CARD_YES'ten türüyor ve o liste
       matriste bir hücre değişince bire ya da üçe düşebilir. Sayı ima
       etmeyen bir yargı, veriyle birlikte doğru kalıyor. */
    lead: "kartla tahsilat kanalları açık.",
    but: CARD_NO.length
      ? `${joinTr(CARD_NO.map((c) => LOC[c]))} ${joinTr(CARD_CHANNELS)} çalışmıyor.`
      : "",
  },
  {
    key: "avrupa",
    chip: "Avrupa pazarı",
    picks: ["ingiltere"],
    lead: "Companies House kaydı Avrupa'da tanınıyor.",
    but: `${FACTS.ingiltere.limit}.`,
  },
  {
    key: "yakinlik",
    chip: "Türkiye'ye yakınlık",
    picks: ["kktc"],
    lead: "süreç tamamen Türkçe, aynı saat dilimi.",
    but: `${FACTS.kktc.limit}.`,
  },
];

/* Merceğin işaret ettiği ülke kalmadıysa çip hiç basılmıyor. Bugün böyle bir
   durum yok — matrise dokunulduğu gün doğabilir, ve cevabı olmayan bir soru
   sormaktansa soruyu hiç sormamak doğru davranış. */
const LENSES = LENS_DEFS.filter((l) => l.picks.length > 0);

export default function CountriesC2() {
  /* pick: ziyaretçinin işaretlediği mercek. peek: yalnızca fareyle üstünden
     geçtiği mercek.
     İkisi ayrı duruyor çünkü ikisi farklı şeyi sürüyor. peek sadece üstteki
     üç kutuyu boyuyor — bedava bir önizleme, yükseklik değişmiyor. Teşhis
     şeridini ise yalnızca pick açıyor: fare çipler üzerinden geçerken şerit
     açılıp kapansa sayfa zıplardı. Ve pick varken peek görmezden geliniyor
     (pick ?? peek), yoksa kutular bir merceği, alttaki cümle başka bir
     merceği gösterir; bu, tasarımın söyleyebileceği en kötü yalan olurdu. */
  const [pick, setPick] = useState<string | null>(null);
  const [peek, setPeek] = useState<string | null>(null);
  const reduce = useReducedMotion();

  /* Soru metnini gruba bağlayan id. Sabit bir dize yazılabilirdi ama bu dosya
     bir aday: karşılaştırma sayfasında başka adaylarla, hatta kendisinin ikinci
     bir kopyasıyla yan yana durabilir. useId her örneğe kendi id'sini veriyor,
     böylece aria-labelledby hep doğru düğümü gösteriyor. */
  const qid = useId();

  const lensOf = (k: string | null) => LENSES.find((l) => l.key === k) ?? null;
  const shelfLens = lensOf(pick ?? peek);
  const out = lensOf(pick);

  const choose = (key: string) => setPick((p) => (p === key ? null : key));

  return (
    <section className="csor sec-pad" style={{ background: "var(--paper)" }}>
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
              Üçünde de kuruluş, banka ve muhasebe yürütüyoruz. Size uygun
              olanı tek soruyla daraltalım.
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.16} className="csor-ask">
          <span className="csor-q" id={qid}>
            Önceliğiniz hangisi?
          </span>
          <div className="csor-opts" role="group" aria-labelledby={qid}>
            {LENSES.map((l) => (
              <button
                key={l.key}
                type="button"
                className="csor-opt"
                aria-pressed={pick === l.key}
                onClick={() => choose(l.key)}
                onMouseEnter={() => setPeek(l.key)}
                onMouseLeave={() => setPeek(null)}
                onFocus={() => setPeek(l.key)}
                onBlur={() => setPeek(null)}
              >
                {l.chip}
              </button>
            ))}
          </div>
        </FadeUp>

        {/* Üç kutu her zaman burada ve her zaman okunur. Hiçbir şeye
            tıklamayan ziyaretçi de üç ülkeyi, ayırt edici birer satırla ve
            üç ayrı çıkışla görüyor — soru bir kapı değil, bir kısayol. */}
        <FadeUp delay={0.22} className="csor-shelf">
          {COUNTRY_ORDER.map((c) => {
            const state = shelfLens
              ? shelfLens.picks.includes(c)
                ? "on"
                : "off"
              : undefined;
            return (
              <SmartLink
                key={c}
                href={`/${c}`}
                className="csor-cell"
                data-pick={state}
              >
                <span className="csor-top">
                  <span className="csor-flag" aria-hidden="true">
                    <Flag country={c} />
                  </span>
                  <span className="csor-name">{COUNTRY_NAME[c]}</span>
                </span>
                <span className="csor-line">{EDGE[c]}</span>

                {/* Ok ile onay işareti aynı 18px'lik yuvada üst üste duruyor
                    ve yalnızca opaklıkları değişiyor. Biri gösterilip diğeri
                    DOM'dan çıkarılsaydı kutunun içi her seçimde yeniden
                    akardı; burada tek piksel bile kımıldamıyor. */}
                <span className="csor-slot" aria-hidden="true">
                  <ArrowUpRight className="csor-i-arrow" size={18} strokeWidth={2} />
                  <Check className="csor-i-check" size={18} strokeWidth={2.6} />
                </span>
                {state === "on" && (
                  <span className="sr-only"> — bu öncelikte öne çıkıyor</span>
                )}
              </SmartLink>
            );
          })}
        </FadeUp>

        {/* TEŞHİS ŞERİDİ — bölümün tek "detay talep üzerine" katmanı.
            Kapalıyken hiç yer kaplamıyor; hiçbir şeye basmayan ziyaretçi bu
            satırı hiç görmüyor.

            Yükseklik neden motion ile, saf CSS ile değil:
            Önce grid-template-rows 0fr→1fr numarasıyla yazıldı — CSS'le
            "auto"ya animasyon yapmanın bilinen yolu. İki sebeple bırakıldı.
            Birincisi o numara yüksekliği bir grid satırının fr çözümüne
            emanet ediyor; bu bölümde şerit açıkken mercek değiştirilecek,
            yani içerik yerinde büyüyüp küçülecek ve o yolun her tarayıcıda
            aynı davrandığına güvenmek için elimde bir gerekçe yok. İkincisi
            ve asıl olanı: proje zaten motion kullanıyor, ölçülmüş davranışı
            burada doğru — animasyon bitince eleman üstünde height:auto
            kalıyor (donmuş bir piksel değeri değil), bu yüzden mercek
            değişince satır kendiliğinden yeni içeriğe oturuyor. Dört merceğin
            dördü de, dar ekran dahil, kırpılmadan ölçüldü.

            aria-live sarmalayıcıda, motion.div'in kendisinde değil: canlı
            bölge kalıcı olmalı, içine giren metin duyurulur. Bölge her seçimde
            DOM'a girip çıksaydı ekran okuyucu çoğu duyuruyu kaçırırdı. */}
        <div className="csor-outwrap" role="status" aria-live="polite">
          <AnimatePresence initial={false}>
            {out && (
              <motion.div
                key="out"
                className="csor-outrow"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.34, ease: EASE }}
              >
                <div className="csor-out">
                  <div>
                    <p className="csor-say">
                      <b>{joinTr(out.picks.map((c) => COUNTRY_NAME[c]))}</b>
                      {" — "}
                      {out.lead}
                    </p>
                    {out.but && (
                      <p className="csor-but">
                        <TriangleAlert size={14} strokeWidth={2.2} aria-hidden="true" />
                        {out.but}
                      </p>
                    )}
                  </div>

                  {/* Tek ülkelik cevapta dolu düğme: bir sonraki adım belli.
                      İki ülkelik cevapta ikisi de çerçeveli, çünkü bölüm orada
                      tavsiye etmiyor, eliyor — birini doldurup diğerini boş
                      bırakmak olmayan bir tercihi ima ederdi. */}
                  <div className="csor-go">
                    {out.picks.map((c) => (
                      <SmartLink
                        key={c}
                        href={`/${c}`}
                        className={`btn btn-sm ${
                          out.picks.length === 1 ? "btn-solid" : "btn-line"
                        }`}
                      >
                        {LOC[c]} kuruluş
                        <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                      </SmartLink>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sorunun hiçbir cevabı kendine uymayan ziyaretçinin çıkışı. Detaylı
            kıyas burada tekrar edilmiyor, adresi veriliyor. */}
        <FadeUp delay={0.28}>
          <SmartLink href="/ulkeler" className="link-arrow csor-more">
            Üç ülkeyi yan yana karşılaştırın
            <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
          </SmartLink>
        </FadeUp>
      </div>
    </section>
  );
}
