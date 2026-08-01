"use client";

import { useId } from "react";
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
import SplitWords from "@/components/shared/SplitWords";
import SmartLink from "@/components/shared/SmartLink";
import { CHAIN } from "@/lib/brand";

/* ============================================================================
   ZİNCİR · aday Z1 — "bölüm gibi davranan" hâli
   ============================================================================
   Müşteri anlatımı beğendi, tasarımı "kalan ile çok bağımsız" buldu. Teşhis:
   canlı bölüm (home/Chain.tsx) bir BÖLÜM değil, bir GANTT ÇİZELGESİ. Sitenin
   hiçbir yerinde ikinci bir örneği yok — beş yatay çubuk, çubuk dokusuyla
   kodlanmış anlam (düz / sık tırtıklı / seyrek tırtıklı), üstünde bir eksen
   satırı ("Tek seferlik" · "Süresiz devam eden") ve çubukların içinde sürekli
   akan bir CSS animasyonu. Site kart, ray ve satır konuşuyor; o blok gösterge
   paneli konuşuyor. Üstelik akan çubuklar sayfadaki TEK bitmeyen hareket:
   ziyaretçi kaydırmayı bıraktığında bile o bölüm oynamaya devam ediyor, göz
   oraya takılıyor ve blok kendini sayfadan koparıyor.

   Bu adayın tek fikri: ÇİZELGEYİ AT, ARGÜMANI TUT. Aynı beş halka, aynı
   cümleler, aynı ritim ("Bir kez", "Sürekli"…), ama sitenin standart bölüm
   kalıbında — sec-head başlık, --paper bir kuyu, içinde satırlar, tek mavi
   aksan. Zincir fikri çizelgeden çıkıp sol oluğa taşınıyor: her satırın hizasında
   bir halka, halkalar arasında ince bir bağ, ilk halka siyah (tek seferlik olan),
   son satırdan sonra zincir BİTMİYOR — sönerek devam ediyor. Yani bölümün
   başlığı ("zincir devam ediyor") artık bir çubuk maskesiyle değil, çizginin
   kendisiyle söyleniyor.

   NE DEĞİŞMEDİ — BİLGİ. Beş halkanın adı ve cümlesi CHAIN'den geliyor, elle
   yazılmıyor. Ritim kelimeleri, ikonlar ve bağlantı adresleri canlı bölümdeki
   META tablosunun aynısı (aşağıda). Eksenin iki kelimesi silinmedi, iki grubun
   başlığı oldu. Alttaki not birebir duruyor.

   Ad alanı `.z1-`, kuralları src/app/css/lab-z1.css. Canlı bölümün `.lc-` seti
   ile tek bir seçici paylaşmıyor: bu dosya orayı değiştiremez, orası burayı.
   ========================================================================= */

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEW = { once: true, margin: "0px 0px -15% 0px" } as const;

/* Canlı bölümdeki META ile aynı üç alan: ikon, adres, ritim. Kopya olması
   bilerek — aday dosyası "müşteriye ne gösterdik"in kaydı ve canlı dosyaya
   dokunmuyor. Buradaki tek fark `once`: canlı sürümde bu bilgi çubuğun
   dokusunu (kind) seçiyordu, burada satırın hangi gruba düştüğünü seçiyor.
   Grup ayrımı elle yazılmıyor, bu alandan türüyor. */
type Meta = { Icon: LucideIcon; href: string; cadence: string; once?: true };

const META: Record<string, Meta> = {
  kurulus: { Icon: Building2, href: "/dubai", cadence: "Bir kez", once: true },
  banka: { Icon: Landmark, href: "/dubai/banka-hesabi", cadence: "Açılış ve takip" },
  muhasebe: { Icon: CalendarCheck, href: "/dubai/muhasebe", cadence: "Dönemsel" },
  uyum: { Icon: ShieldCheck, href: "/dubai/uyum", cadence: "Sürekli" },
  oturum: { Icon: IdCard, href: "/dubai/oturum-vize", cadence: "Yenilemeli" },
};

type Ring = {
  key: string;
  label: string;
  line: string;
  /** zincirin tamamındaki sırası — hem halkanın yönü hem kademe gecikmesi */
  n: number;
  /** halkanın yönü: gerçek zincirde her halka bir öncekine dik durur */
  o: "v" | "h";
} & Meta;

/* CHAIN sırası korunuyor; META'da karşılığı olmayan bir anahtar satırı
   düşürüyor, sayfayı düşürmüyor (iki liste tip olarak bağlı değil). */
const RINGS: Ring[] = CHAIN.flatMap((c, i) => {
  const meta = META[c.key];
  if (!meta) return [];
  return [{ ...c, ...meta, n: i, o: i % 2 === 0 ? "v" : "h" }];
});

const ONCE = RINGS.filter((r) => r.once);
const GOING = RINGS.filter((r) => !r.once);

/* Satır sitenin sıradan bağlantı satırı: ikon + ad + tek gri cümle, sağda
   ritim, üstüne gelince mavi ve ok. Yeni bir nesne yok — canlı bölümde de
   aynı satır vardı, altındaki çubuk yoktu.

   `reduce` prop olarak geçiyor çünkü kanca değeri bölümün gövdesinde okunuyor
   ve iki grup aynı değeri paylaşmak zorunda. Hareket azaltmada süre ve gecikme
   sıfırlanıyor, `initial` DÜŞÜRÜLMÜYOR: sunucuda medya sorgusu yok, koşullu
   bir initial sunucunun bastığı HTML ile hidrasyonu ayırırdı. */
function ChainRow({ r, reduce }: { r: Ring; reduce: boolean }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEW}
      transition={{
        duration: reduce ? 0 : 0.5,
        delay: reduce ? 0 : 0.08 + r.n * 0.07,
        ease: EASE,
      }}
    >
      <SmartLink
        href={r.href}
        className="z1-row"
        data-o={r.o}
        data-first={r.n === 0 || undefined}
      >
        {/* Zincirin kendisi tamamen boş bir hücre: çizgi ve halka CSS'ten
            geliyor, ekran okuyucuya hiçbir şey söylemiyor. Anlamın tamamı
            zaten yazıda — sağdaki ritim kelimesi ve grubun başlığı. */}
        <span className="z1-mk" aria-hidden="true">
          <i className="z1-ring" />
        </span>

        <span className="z1-txt">
          <span className="z1-t">
            <r.Icon className="z1-ic" size={17} strokeWidth={1.9} aria-hidden="true" />
            {r.label}
            <ArrowUpRight className="z1-arw" size={15} strokeWidth={2.1} aria-hidden="true" />
          </span>
          <span className="z1-l">{r.line}</span>
        </span>

        <span className="z1-cad" data-once={r.once || undefined}>
          {r.cadence}
        </span>
      </SmartLink>
    </motion.li>
  );
}

export default function ChainZ1() {
  const reduce = useReducedMotion() ?? false;
  /* Grup başlıkları listelere ad veriyor (aria-labelledby): "Süresiz devam
     eden" dört satırın ortak niteliği ve ekran okuyucuda o dört satırdan önce
     bir kez duyulmalı, her satıra kopyalanmamalı. */
  const capOnce = useId();
  const capGoing = useId();

  const capMotion = (delay: number) => ({
    initial: { opacity: 0, y: 8 },
    whileInView: { opacity: 1, y: 0 },
    viewport: VIEW,
    transition: { duration: reduce ? 0 : 0.45, delay: reduce ? 0 : delay, ease: EASE },
  });

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

        {/* Bölümün gövdesi tek bir --paper kuyu. Zemin beyaz olduğu için kuyu
            bölümü sayfadan koparmadan bir nesne hâline getiriyor; satırlar
            üstüne gelince beyaza kalkıyor (sitede panel içi kartların yaptığı
            şey). Çizelgenin yaptığı "bu blok başka bir şey" etkisini, sitenin
            kendi malzemesiyle ve yalnızca bir tık yapıyor. */}
        <div className="z1-rail">
          <motion.p className="z1-cap" data-g="a" id={capOnce} {...capMotion(0.04)}>
            <span className="z1-mk" aria-hidden="true" />
            <span className="z1-cap-t">Tek seferlik</span>
          </motion.p>

          <ul className="z1-list" aria-labelledby={capOnce}>
            {ONCE.map((r) => (
              <ChainRow key={r.key} r={r} reduce={reduce} />
            ))}
          </ul>

          {/* Eksenin ikinci kelimesi. Canlı bölümde çubukların üstünde bir
              cetvel etiketiydi ve okunması için çubuk dokusunu çözmek
              gerekiyordu; burada dört satırın başlığı, yani doğrudan bilgi. */}
          <motion.p className="z1-cap" data-g="b" id={capGoing} {...capMotion(0.14)}>
            <span className="z1-mk" aria-hidden="true" />
            <span className="z1-cap-t">Süresiz devam eden</span>
          </motion.p>

          <ul className="z1-list" aria-labelledby={capGoing}>
            {GOING.map((r) => (
              <ChainRow key={r.key} r={r} reduce={reduce} />
            ))}
          </ul>

          {/* Kuyunun son satırı: zincir burada bitmiyor, sönerek çıkıyor ve
              tam yanında bölümün asıl cümlesi duruyor. Not ayrı bir blok
              olarak aşağı alınabilirdi ama o zaman sönen çizgi hiçbir yere
              varmayan bir süs olurdu; burada cümleye varıyor. */}
          <div className="z1-tail">
            <span className="z1-mk" aria-hidden="true" />
            <motion.p
              className="z1-note"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEW}
              transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : 0.42, ease: EASE }}
            >
              Kategorideki firmaların çoğu ilk halkada bitiyor. Ceza da, sorun da
              sonrasında çıkıyor.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
