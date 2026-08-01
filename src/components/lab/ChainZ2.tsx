"use client";

import { motion, useReducedMotion } from "motion/react";
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
   ZİNCİR · aday Z2 — "zaman ekseni"
   ============================================================================
   MÜŞTERİNİN ŞİKÂYETİ. Anlatım beğenildi, tasarım "kalanla çok bağımsız"
   bulundu. Teşhis: canlı bölüm (home/Chain.tsx) bir GANTT ÇİZELGESİ. Sitede
   başka hiçbir yerde nicel bir eksen, ölçülü çubuk ya da doku kodu yok — ve
   orada aynı anda beş doku çalışıyor (dolu, incelen, sık tarama, seyrek
   tarama, bir de kalıcı akış). Üstüne bölümün bir NESNESİ yok: her bölümde bir
   panel/kart varken burada beyazın üstünde çizgili satırlar duruyor. Yani
   bölüm sayfaya yapıştırılmış bir infografik gibi okunuyor.

   BU ADAYIN FİKRİ. Aynı argümanı ölçerek değil, ZAMANDA anlatmak. Beş halka
   bir liste değil, aşağı akan tek bir sıra: kuruluşla başlıyor, şirket
   yaşadıkça sürüyor. Dil sitenin kendi ailesinden — CountryProcess'in dikey
   rayı (nokta + iplik) ve CountryAfter'ın çerçeveli çizelgesi.

   Zamanın üç işareti var ve üçü de yeni bir görsel kod GETİRMİYOR:
   · YÜZEY   — panel iki bölgeye ayrılıyor. Üstte beyaz: tek seferlik olan.
               Altta kâğıt: süresiz devam eden. Aradaki tek çizgi kuruluş anı.
   · İPLİK   — birinci bölgenin ipliği ayrılmış bir uçla BİTİYOR (kuruluş
               biter), ikincisinin ipliği son noktadan sonra da sürüyor ve
               panelin kenarına varmadan eriyor.
   · ÇİZİM   — iplik görünüşte yukarıdan aşağı çiziliyor, satırlar o çizimin
               geçtiği sırayla beliriyor. Sıra = zaman.

   BİLGİ AYNEN KORUNDU. Beş halkanın adı ve cümlesi CHAIN'den (lib/brand.ts)
   okunuyor, elle yazılmıyor. Eksenin iki etiketi ("Tek seferlik", "Süresiz
   devam eden"), beş ritim sözcüğü ve kapanış notu canlı bölümdeki metinlerin
   birebir aynısı. Hiçbir yeni rakam, tarih ya da ay numarası eklenmedi:
   takvim niceliksel olsaydı kesin süre taahhüdü okuması doğardı
   (brand.ts STANCE_LIMITS), o yüzden eksen niteliksel.

   ÖZET ÖNDE, DETAY BİR TIK ÖTEDE. Satırların açılan içeriği yok; her satır
   kendi hizmet sayfasına giden bir bağlantı. Bölüm ana sayfada duruyor,
   kalabalık etmiyor.

   Bütün kurallar src/app/css/lab-z2.css içinde, `.z2-` ad alanında. Canlı
   bölümün `.lc-`/`.ch5-` kümesiyle tek bir seçici paylaşmıyor. */

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEW = { once: true, margin: "0px 0px -15% 0px" } as const;

/** halkanın zaman ekseninde durduğu yer: biten mi, süren mi */
type Phase = "once" | "open";

const META: Record<
  string,
  { Icon: LucideIcon; href: string; cadence: string; phase: Phase }
> = {
  kurulus: { Icon: Building2, href: "/dubai", cadence: "Bir kez", phase: "once" },
  banka: {
    Icon: Landmark,
    href: "/dubai/banka-hesabi",
    cadence: "Açılış ve takip",
    phase: "open",
  },
  muhasebe: {
    Icon: CalendarCheck,
    href: "/dubai/muhasebe",
    cadence: "Dönemsel",
    phase: "open",
  },
  uyum: { Icon: ShieldCheck, href: "/dubai/uyum", cadence: "Sürekli", phase: "open" },
  oturum: {
    Icon: IdCard,
    href: "/dubai/oturum-vize",
    cadence: "Yenilemeli",
    phase: "open",
  },
};

/* CHAIN sırası akışın kendisi, o yüzden bölgelere ayırma işi sırayı okuyarak
   yapılıyor. flatMap: META'da karşılığı olmayan bir anahtar eklenirse bölüm
   çökmüyor, o satır düşüyor. */
const ROWS = CHAIN.flatMap((c) => {
  const m = META[c.key];
  return m ? [{ ...c, ...m }] : [];
});

/* Eksenin iki durağı. Etiketler canlı bölümün yatay ekseninden birebir
   geliyor; tek değişen yön. */
const ZONES: { phase: Phase; title: string }[] = [
  { phase: "once", title: "Tek seferlik" },
  { phase: "open", title: "Süresiz devam eden" },
];

export default function ChainZ2() {
  const reduce = useReducedMotion();
  /* Hareket azaltmada SÜRE sıfırlanıyor, render edilen şey değişmiyor.
     `initial`'ı koşullu yazsaydık sunucuda medya sorgusu olmadığı için HTML
     ile hidrasyon farklı dönüşümlerle başlardı. */
  const t = (s: number) => (reduce ? 0 : s);

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

        <div className="z2-wrap">
          <div className="z2-panel">
            {ZONES.map((z) => {
              const items = ROWS.filter((r) => r.phase === z.phase);
              if (items.length === 0) return null;
              const open = z.phase === "open";

              return (
                <div className="z2-zone" data-zone={z.phase} key={z.phase}>
                  <motion.p
                    className="z2-zone-t"
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={VIEW}
                    transition={{
                      duration: t(0.45),
                      delay: t(open ? 0.36 : 0.05),
                      ease: EASE,
                    }}
                  >
                    <span className="z2-zone-tick" aria-hidden="true" />
                    {z.title}
                  </motion.p>

                  <div className="z2-rail">
                    {/* Dış kutu maskeyi ve geometriyi taşıyor, iç kutu
                        çiziliyor: maske ölçeklenen elemanın üstünde olsaydı
                        dolum boyunca birlikte sıkışırdı. */}
                    <span className="z2-thread" aria-hidden="true">
                      <motion.span
                        className="z2-thread-fill"
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={VIEW}
                        transition={{
                          duration: t(open ? 0.8 : 0.28),
                          delay: t(open ? 0.42 : 0.22),
                          ease: EASE,
                        }}
                      />
                    </span>

                    <ol className="z2-list">
                      {items.map((r, k) => (
                        <motion.li
                          key={r.key}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={VIEW}
                          transition={{
                            duration: t(0.5),
                            /* satırlar ipliğin geçtiği sırada beliriyor */
                            delay: t(open ? 0.44 + k * 0.11 : 0.12),
                            ease: EASE,
                          }}
                        >
                          <SmartLink href={r.href} className="z2-row">
                            <span className="z2-dot" aria-hidden="true">
                              <r.Icon size={16} strokeWidth={1.9} />
                            </span>
                            <span className="z2-t">
                              {r.label}
                              <ArrowUpRight
                                className="z2-arrow"
                                size={15}
                                strokeWidth={2.1}
                                aria-hidden="true"
                              />
                            </span>
                            <span className="z2-l">{r.line}</span>
                            {/* "Bir kez" bir tık daha mürekkep alıyor: ayrı
                                duran tek ritim o, ve bölümün argümanı da o. */}
                            <span className="z2-cad" data-once={!open || undefined}>
                              {r.cadence}
                            </span>
                          </SmartLink>
                        </motion.li>
                      ))}
                    </ol>
                  </div>

                  {/* Zincirin ucu kapanmıyor: son noktadan sonra iplik kesikli
                      devam edip panelin kenarına varmadan eriyor. */}
                  {open && (
                    <motion.div
                      className="z2-tail"
                      aria-hidden="true"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={VIEW}
                      transition={{ duration: t(0.6), delay: t(1.2) }}
                    >
                      <span className="z2-tail-line" />
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <FadeUp delay={0.4}>
          <p className="z2-note">
            Kategorideki firmaların çoğu ilk halkada bitiyor. Ceza da, sorun da sonrasında
            çıkıyor.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
