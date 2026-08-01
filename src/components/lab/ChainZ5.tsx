"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import {
  ArrowUpRight,
  Building2,
  CalendarCheck,
  IdCard,
  Landmark,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SmartLink from "@/components/shared/SmartLink";
import SplitWords from "@/components/shared/SplitWords";
import { CHAIN } from "@/lib/brand";

/* ============================================================================
   ZİNCİR · aday Z5 — "tekrar eden nesne"     (CSS: src/app/css/lab-z5.css)
   ============================================================================

   MÜŞTERİNİN İKİ AYRI SÖZÜ, İKİSİ DE GEÇERLİ

   1) "ne zamanda bir olduğunu görselleştirerek gösteriyorduk ya, şu anki
      sitede olan mantık iyiydi" — yani canlı bölümün FİKRİ doğru: her halkanın
      ne sıklıkta tekrarlandığı GÖRÜNÜYOR.
   2) "işte o şekilde görselleştirmeyi beğenmedi demek ki" — yani biçim yanlış.
      Canlı bölümde sıklık çubuğun DOKUSUNA kodlanmış (düz / sık tırtıklı /
      seyrek tırtıklı / incelen). Doku bir kod: okumak için önce lejantı
      çözmek, sonra iki çubuğun tırtık aralığını gözle kıyaslamak gerekiyor.
   3) İlk üç aday sıklığı yazıya çevirdi ("Dönemsel", "Yenilemeli") ve
      görselleştirmeyi tümden düşürdü — "şimdi yaptığında sadece ne zamanda bir
      olduğu sadece yazı olarak yazıyor".

   Yani hedef tek cümle: SIKLIK YİNE GÖRSEL OLSUN, AMA LEJANT GEREKTİRMESİN.

   BU ADAYIN FİKRİ — sıklık bir eksende değil, NESNENİN KENDİSİNDE.
   Her halka bir "iş kartı". İş bir kez oluyorsa tek kart. Tekrarlanıyorsa aynı
   kart üst üste biniyor: deste kaç yapraksa iş o kadar kez tekrarlanıyor.
   Okumak için kod çözmek yok, SAYMAK var — kalın deste sık iş, tek yaprak tek
   seferlik iş. Bu, evdeki emsalin (country/CountryAfter.tsx) 12 aylık ritim
   şeridiyle aynı okuma seviyesi: orada da sıklık "sayılabilir bir miktar"
   olarak duruyor, aylık iş 12 kare, yıllık iş 1 kare.

   Sürekli olan iş bu dilin dışında kalmıyor, tam tersine dilin ucu oluyor:
   ara vermeyen işin destesinde SAÇ TELİ YOK — yapraklar birleşip tek bir kütle
   hâline geliyor. "O kadar sık ki arası kalmamış" demenin görsel hâli.

   ---------------------------------------------------------------------------
   SIKLIK VERİSİ NEREDEN GELİYOR — uydurulmadı, canlı bölümden ÖLÇÜLDÜ

   CHAIN (lib/brand.ts) sıklık taşımıyor; canlı bölüm taşıyor. home/Chain.tsx
   her halkaya bir `kind` veriyor, karşılıkları globals.css'te çiziliyor:

     kurulus  · "once"   → tek, siyah, kısa çubuk; hiç tekrar yok
     banka    · "taper"  → çubuk tam güçte başlıyor, %26'ya inip sönüyor
     muhasebe · "period" → 24px'de bir tırtık  (17px dolu / 7px boşluk)
     uyum     · "solid"  → hiç boşluk yok, kesintisiz dolu
     oturum   · "renew"  → 64px'de bir tırtık  (54px dolu / 10px boşluk)

   İki tırtıklı satırın oranı buradan çıkıyor: 64 / 24 = 8 / 3. Destelerdeki
   yaprak sayısı bu oranı BİREBİR koruyor — muhasebe 8, oturum 3. Yaprak sayısı
   ekranda rakamla yazılmıyor ve bir takvim birimine bağlanmıyor: canlı çubuk da
   bir takvim vaadi vermiyordu, yalnızca "şu bundan çok daha sık" diyordu
   (kesin süre taahhüdü yok — brand.ts STANCE_LIMITS).

   "solid" ve "taper" sayılabilir değil, o yüzden deste olarak da sayılmıyor:
   ikisi de saç telsiz, tek kütle. Uyum kütlesi mavide kalıyor (hiç bitmiyor),
   banka kütlesi kâğıda doğru eriyor (açılış bir kez, sonrası takip) — canlıdaki
   `solid` ve `taper` maskelerinin aynısı, yalnız yatay çubukta değil destede.

   Halkaların adı, cümlesi ve ritim sözcükleri değişmedi: ad ve cümle CHAIN'den,
   ritim sözcükleri ("Bir kez", "Açılış ve takip", "Dönemsel", "Sürekli",
   "Yenilemeli") canlı bölümün `cadence` alanlarından birebir kopya.

   ---------------------------------------------------------------------------
   BİÇİM SİTENİN DİLİNDE
   sec-pad + container-o + sec-head/SplitWords kalıbı; beş beyaz kart, kenarlık
   ve --shadow-card ile; tek mavi aksan (--blue-700) ve tek siyah (tek seferlik
   olan). Ad alanı `.z5-` — canlı bölümün `.lc-`/`.ch5-` kümesiyle ve öteki
   adaylarla tek bir seçici paylaşmıyor.
   ========================================================================= */

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEW = { once: true, margin: "0px 0px -15% 0px" } as const;

/** Destenin biçimi. Sayılar yukarıdaki ölçümden geliyor, süs değil. */
type Deck = {
  /** yaprak sayısı, ön yüz dahil */
  n: number;
  /** yaprak başına sağa kayma (px) */
  dx: number;
  /** yaprak başına yukarı kayma (px) */
  dy: number;
  /** yapraklar arasında beyaz saç teli — yani deste sayılabilir mi */
  seam: boolean;
};

const META: Record<
  string,
  { Icon: LucideIcon; href: string; cadence: string; deck: Deck }
> = {
  /* tek yaprak: tekrar yok */
  kurulus: {
    Icon: Building2,
    href: "/dubai",
    cadence: "Bir kez",
    deck: { n: 1, dx: 0, dy: 0, seam: false },
  },
  /* canlıdaki `taper`: bir kez tam güçte, sonrası incelen takip. Yaprak sayısı
     yüksek ve adım küçük — amaç saydırmak değil, kesintisiz bir kütle kurup
     kâğıda doğru eritmek. */
  banka: {
    Icon: Landmark,
    href: "/dubai/banka-hesabi",
    cadence: "Açılış ve takip",
    deck: { n: 16, dx: 1.5, dy: 3, seam: false },
  },
  /* canlıdaki `period` (24px'de bir tırtık) → 8 yaprak, saç telli */
  muhasebe: {
    Icon: CalendarCheck,
    href: "/dubai/muhasebe",
    cadence: "Dönemsel",
    deck: { n: 8, dx: 3.4, dy: 7, seam: true },
  },
  /* canlıdaki `solid`: boşluk yok. Deste en kalın olan ve tek saç teli
     taşımayan — "arası kalmamış" görsel olarak burada. */
  uyum: {
    Icon: ShieldCheck,
    href: "/dubai/uyum",
    cadence: "Sürekli",
    deck: { n: 18, dx: 1.6, dy: 3.1, seam: false },
  },
  /* canlıdaki `renew` (64px'de bir tırtık) → 3 yaprak. 8'e 3, ölçülen oran. */
  oturum: {
    Icon: IdCard,
    href: "/dubai/oturum-vize",
    cadence: "Yenilemeli",
    deck: { n: 3, dx: 3.4, dy: 7, seam: true },
  },
};

/* CHAIN sırası bölümün kendi anlatısı. flatMap: META'da karşılığı olmayan bir
   anahtar eklenirse bölüm çökmüyor, yalnızca o kart düşüyor. */
const CARDS = CHAIN.flatMap((c) => {
  const m = META[c.key];
  return m ? [{ ...c, ...m }] : [];
});

/** Bir destenin arka yapraklarını hazırlar: konum, renk oranı ve sıra gecikmesi. */
function sheets(deck: Deck, cardIndex: number) {
  const step = deck.seam ? 0.075 : 0.02;
  return Array.from({ length: Math.max(0, deck.n - 1) }, (_, j) => {
    const k = j + 1; // 1 = ön yüzün hemen arkası
    return {
      k,
      x: deck.dx * k,
      y: -deck.dy * k,
      /* renk oranı: 0 ön yüz tonu, 1 en arka ton. Karışım CSS'te
         color-mix ile yapılıyor ki tonlar token'lardan çıksın. */
      t: k / (deck.n - 1),
      d: 0.12 + cardIndex * 0.09 + (k - 1) * step,
    };
  });
}

export default function ChainZ5() {
  const reduce = useReducedMotion();
  /* Hareket azaltmada SÜRE sıfırlanıyor, render edilen şey değişmiyor.
     `initial`'ı koşullu yazsaydık sunucuda medya sorgusu olmadığı için HTML
     ile hidrasyon farklı durumlarla başlardı (aynı gerekçe home/Chain.tsx'te
     de yazılı). */
  const t = (s: number) => (reduce ? 0 : s);

  const cardV: Variants = {
    out: { opacity: 0, y: 16 },
    in: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: t(0.55), delay: t(i * 0.09), ease: EASE },
    }),
  };

  /* Yapraklar ön yüzün TAM ÜSTÜNDE başlıyor (x:0, y:0) ve sırayla yerine
     kayıyor. Yani açılış hareketi bölümün cümlesinin kendisi: aynı iş, yine,
     yine. Süs değil — hareket bittiğinde kalan şey zaten okunan şey. */
  const sheetV: Variants = {
    out: { opacity: 0, x: 0, y: 0, scale: 0.94 },
    in: (c: { x: number; y: number; d: number }) => ({
      opacity: 1,
      x: c.x,
      y: c.y,
      scale: 1,
      transition: { duration: t(0.42), delay: t(c.d), ease: EASE },
    }),
  };

  return (
    <section className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="sec-head">
          <SplitWords
            as="h2"
            text="Kuruluş bir halka, zincir devam ediyor."
            accent="zincir devam ediyor."
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.2}>
            <p className="sec-lead">Şirket kurulduktan sonra başlayan iş burada.</p>
          </FadeUp>
        </div>

        <div className="z5-wrap">
          {/* Tek satırlık okuma yönü. Lejant değil — renk/doku kodu çözdürmüyor,
              yalnızca kalınlığın hangi yöne arttığını söylüyor. Aynı ölçüde bir
              satır country/CountryAfter.tsx'in 12 aylık şeridinin de üstünde
              duruyor ("dolu kare, o ay iş çıktığı anlamına geliyor"). */}
          <FadeUp delay={0.26}>
            <p className="z5-key">
              Deste kalınlaştıkça iş daha sık tekrarlanıyor; hiç ara vermeyenin
              destesinde yaprak arası kalmıyor.
            </p>
          </FadeUp>

          {/* Tek görünürlük gözlemcisi listede: kartlar ve yapraklar varyantı
              buradan miras alıyor, yoksa elli küsur ayrı gözlemci kurulurdu. */}
          <motion.ol
            className="z5-grid"
            initial="out"
            whileInView="in"
            viewport={VIEW}
          >
            {CARDS.map((c, i) => {
              const once = c.deck.n === 1;
              /* Arka yapraklar ters sırada basılıyor: DOM'da sonra gelen üstte
                 kalsın, yani en arkadaki yaprak en altta boyansın. Gecikme
                 sırası ise düz (önden arkaya) — sayım öyle okunuyor. */
              const back = sheets(c.deck, i).reverse();

              return (
                <motion.li
                  key={c.key}
                  className="z5-item"
                  variants={cardV}
                  custom={i}
                >
                  <SmartLink
                    href={c.href}
                    className="z5-card"
                    data-kind={c.key}
                    data-once={once || undefined}
                  >
                    <span
                      className="z5-deck"
                      data-seam={c.deck.seam || undefined}
                      aria-hidden="true"
                    >
                      {back.map((s) => (
                        <motion.span
                          key={s.k}
                          className="z5-sheet"
                          style={{ "--k": s.t } as React.CSSProperties}
                          variants={sheetV}
                          custom={s}
                        />
                      ))}
                      {/* Ön yüz işin kendisi: ikon burada, yani çoğalan şey
                          soyut bir dikdörtgen değil, o iş. */}
                      <span className="z5-face">
                        <c.Icon size={19} strokeWidth={1.9} aria-hidden="true" />
                      </span>
                    </span>

                    {/* Ritim sözcüğü destenin hemen altında: görsel ve sözcük
                        yan yana okunuyor, biri ötekinin lejantı olmadan. */}
                    <span className="z5-cad" data-once={once || undefined}>
                      {c.cadence}
                    </span>

                    <span className="z5-t">
                      {c.label}
                      <ArrowUpRight
                        className="z5-arrow"
                        size={15}
                        strokeWidth={2.1}
                        aria-hidden="true"
                      />
                    </span>
                    <span className="z5-l">{c.line}</span>
                  </SmartLink>
                </motion.li>
              );
            })}
          </motion.ol>
        </div>

        <FadeUp delay={0.4}>
          <p className="z5-note">
            Kategorideki firmaların çoğu ilk halkada bitiyor. Ceza da, sorun da
            sonrasında çıkıyor.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
