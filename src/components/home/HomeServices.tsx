"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowRight, ChevronDown, Globe } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import SmartLink from "@/components/shared/SmartLink";
import { Flag } from "@/components/shared/CountryPicker";
import {
  SceneAccounting,
  SceneBanking,
  SceneCompliance,
  SceneFormation,
  SceneVisa,
} from "@/components/home/ServiceScenes";
import { CHAIN } from "@/lib/brand";
import { COUNTRY_SLUGS, serviceHref, servicesFor, type ServiceSlug } from "@/lib/services";
import { COUNTRY_LABELS, type Country } from "@/lib/store";

/* Verdiğimiz hizmetler.
 *
 * Bu tur iki şikâyet düzeltildi.
 *
 * 1. Kalabalık. Her kartın altında "ÜLKE SEÇİN" etiketi ve altında bayraklı
 *    rozetler duruyordu: beş kart, on dört rozet, on dört bayrak. Bölüm bir
 *    hizmet listesi gibi değil, bir bayrak duvarı gibi okunuyordu. Kartın
 *    çıkışı artık tek satır — "Ülkeye özel hizmeti görün" — ve ülkeler o
 *    satırın üstünden açılan küçük bir panelde. Özet önde, detay istendiğinde.
 *
 *    Ülke listesi hâlâ elle yazılmıyor: countriesFor() servicesFor() üzerinden
 *    türüyor. Vize yalnızca Dubai ve KKTC'de olduğu için o kartta iki satır
 *    çıkıyor; bir hizmet bir ülkede açılıp kapandığında burası kendiliğinden
 *    düzeliyor.
 *
 * 2. Dengesizlik. Koyu sahne panelleri kart genişliğine göre boy değiştiriyordu
 *    (aynı satırdaki Kuruluş 306,75px iken Banka & Ödeme 280,21px). Sahnenin
 *    yüksekliği artık CSS'te sabit; ayrıntı hero.css'in sonundaki blokta.
 *
 * Kural aynı: hiçbir sahne banka kararı, otorite kararı veya kesin süre ima
 * edemez.
 */

/* CHAIN sırası akışın kendisi; kart boyutu o sırayı bozmadan ritim veriyor.
   7+5 üstte, 4+4+4 altta — bento hiçbir zaman delikle kapanmıyor. */
const CARDS: {
  key: string;
  slug: ServiceSlug;
  span: 7 | 5 | 4;
  Scene: () => React.ReactElement;
}[] = [
  { key: "kurulus", slug: "sirket-kurulusu", span: 7, Scene: SceneFormation },
  { key: "banka", slug: "banka-hesabi", span: 5, Scene: SceneBanking },
  { key: "muhasebe", slug: "muhasebe", span: 4, Scene: SceneAccounting },
  { key: "uyum", slug: "uyum", span: 4, Scene: SceneCompliance },
  { key: "oturum", slug: "oturum-vize", span: 4, Scene: SceneVisa },
];

const byKey = Object.fromEntries(CHAIN.map((c) => [c.key, c]));

/** hizmetin gerçekten verildiği ülkeler — tek kaynak servicesFor() */
const countriesFor = (slug: ServiceSlug): Country[] =>
  COUNTRY_SLUGS.filter((c) => servicesFor(c).some((s) => s.slug === slug));

/** "Yalnızca Dubai ve KKTC" — üç ülkede de varsa satır hiç yazılmıyor */
function scopeNote(list: Country[]): string | null {
  if (list.length >= COUNTRY_SLUGS.length) return null;
  const names = list.map((c) => COUNTRY_LABELS[c]);
  const joined =
    names.length > 1 ? `${names.slice(0, -1).join(", ")} ve ${names.at(-1)}` : names[0];
  return `Yalnızca ${joined}`;
}

const EASE = [0.22, 1, 0.36, 1] as const;

/* Panelin kendisi ve içindeki satırlar ayrı varyant kümesi: panel açılırken
   satırlar sırayla "fırlıyor" (staggerChildren), kapanırken ters sırayla
   toplanıyor. reduce açıksa mesafe ve süre sıfır — durum değişimi anında
   oluyor, hiçbir şey kaymıyor. */
const popVariants = (reduce: boolean): Variants => ({
  closed: {
    opacity: 0,
    y: reduce ? 0 : 8,
    scale: reduce ? 1 : 0.97,
    transition: {
      duration: reduce ? 0 : 0.16,
      ease: EASE,
      staggerChildren: reduce ? 0 : 0.03,
      staggerDirection: -1,
    },
  },
  open: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: reduce ? 0 : 0.26,
      ease: EASE,
      staggerChildren: reduce ? 0 : 0.05,
      delayChildren: reduce ? 0 : 0.04,
    },
  },
});

const rowVariants = (reduce: boolean): Variants => ({
  closed: { opacity: 0, y: reduce ? 0 : 10, transition: { duration: reduce ? 0 : 0.14 } },
  open: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.3, ease: EASE } },
});

/** odak klavyeden mi geldi? (:focus-visible eski tarayıcıda yoksa evet sayılır) */
function isKeyboardFocus(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  try {
    return target.matches(":focus-visible");
  } catch {
    return true;
  }
}

/* Kartın çıkışı.
 *
 * Neden bu mekanizma: müşteri "mouse üstüne gelince fırlasın" dedi, ama salt
 * :hover ile açılan bir menü klavyeye ve dokunmatiğe kapalıdır. O yüzden
 * görünürlük CSS'te değil React durumunda; üç girdi de aynı duruma yazıyor:
 *   • fare   — pointerenter açıyor, pointerleave kapatıyor (yalnızca
 *              pointerType === "mouse"). Aynı satırdaki tıklama kapatmıyor,
 *              yalnızca açık tutuyor: imleç gelince zaten açılan paneli
 *              kullanıcının kendi tıklaması yok etmemeli.
 *   • klavye — sekmeyle gelen odak (:focus-visible) açıyor, Escape kapatıp
 *              odağı butona geri veriyor, odak dışarı çıkınca kapanıyor.
 *   • dokunuş— tek dokunuş aç/kapa. Dokunmatikte tarayıcı önce pointerenter,
 *              sonra odak, sonra click üretir; hover ve odak yolları filtreli
 *              olmasa üçü birbirini iptal eder ve panel hiç açılmazdı.
 *              Dışarı dokunuş belge düzeyindeki dinleyiciyle kapatıyor.
 *
 * Panel DOM'dan çıkmıyor, `inert` ile devre dışı bırakılıyor: kapalıyken ne
 * sekmeyle gezilebiliyor ne de ekran okuyucuya görünüyor, ama sunucudan gelen
 * HTML'de ülke bağlantıları duruyor (iç bağlantı yapısı ve JS'siz erişim
 * korunuyor). Kalıp "disclosure": role="menu" yazmıyoruz, çünkü menü rolü ok
 * tuşlarıyla gezinme sözü verir; buradakiler sıradan bağlantılar, sekmeyle
 * geziliyor ve odak tuzağı yok. */
function CountryOut({
  label,
  slug,
  list,
}: {
  label: string;
  slug: ServiceSlug;
  list: Country[];
}) {
  const reduce = useReducedMotion() ?? false;
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const popRef = useRef<HTMLDivElement>(null);
  /* Escape sonrası odağı butona geri veriyoruz; o odak olayı paneli yeniden
     açmasın diye tek seferlik bayrak. */
  const skipFocusOpen = useRef(false);
  /* Tıklamayı üreten aygıtı click anında bilemiyoruz; pointerdown'da not
     ediyoruz. Gerekçesi aşağıda, onClick'te. */
  const pointerKind = useRef("");
  const panelId = useId();
  const note = scopeNote(list);

  /* Dokunmatikte fare terk etme olayı yok: açık paneli kapatan tek şey dışarı
     dokunuş. Dinleyici yalnızca panel açıkken bağlanıyor. */
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  return (
    <div
      ref={wrapRef}
      className="hxq"
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setOpen(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse") return;
        /* Odak PANELİN İÇİNDEyse fare çekilse de kapatmıyoruz: kapatmak,
           kullanıcının odağını görünmez bir bağlantıda bırakmak olurdu.
           Ölçüt bilerek "panel", "sarmalayıcı" değil — tıklamadan sonra odak
           butonda kalıyor ve o durumda fare çekilince panel kapanmalı. */
        if (popRef.current?.contains(document.activeElement)) return;
        setOpen(false);
      }}
      onFocus={(e) => {
        if (skipFocusOpen.current) {
          skipFocusOpen.current = false;
          return;
        }
        /* Yalnızca klavyeden gelen odak açar. Dokunmatikte (Android) butona
           dokunmak önce odak veriyor, hemen ardından click geliyor: ikisi de
           açıp kapatsa panel hiç açılmazdı. :focus-visible tam olarak bu ayrımı
           yapıyor — fare/dokunuşla gelen odakta yanlış, sekmeyle gelende doğru.
           Fare ve dokunuş zaten pointerenter ve click ile karşılanıyor. */
        if (!isKeyboardFocus(e.target)) return;
        setOpen(true);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key !== "Escape" || !open) return;
        e.stopPropagation();
        if (popRef.current?.contains(document.activeElement)) {
          skipFocusOpen.current = true;
          btnRef.current?.focus();
        }
        setOpen(false);
      }}
    >
      <div className="hxq-anchor">
        <button
          ref={btnRef}
          type="button"
          className="hxq-btn"
          aria-expanded={open}
          aria-controls={panelId}
          /* Sayfada aynı metinli beş buton var; erişilebilir ad hangi hizmet
             olduğunu söylüyor. Görünen metin adın içinde geçiyor (WCAG 2.5.3). */
          aria-label={`Ülkeye özel hizmeti görün: ${label}`}
          onPointerDown={(e) => {
            pointerKind.current = e.pointerType;
          }}
          onClick={(e) => {
            /* Fare için tıklama "aç"tır, "aç/kapa" değil: imleç butona gelince
               panel zaten açılmış oluyor, aynı tıklama onu kapatsaydı kullanıcı
               açılan paneli kendi tıklamasıyla yok etmiş gibi hissederdi.
               Fare kullanıcısı paneli imleci çekerek kapatıyor.
               Klavye (detail === 0, Enter/Space) ve dokunuş aç/kapa yapıyor —
               orada tıklamadan başka kapatma yolu yok. */
            const fromMouse = e.detail > 0 && pointerKind.current === "mouse";
            setOpen((v) => (fromMouse ? true : !v));
          }}
        >
          <Globe size={16} strokeWidth={2} className="hxq-ic" aria-hidden="true" />
          <span>Ülkeye özel hizmeti görün</span>
          <ChevronDown size={16} strokeWidth={2.2} className="hxq-caret" aria-hidden="true" />
        </button>

        <motion.div
          ref={popRef}
          id={panelId}
          className="hxq-pop"
          inert={!open}
          initial={false}
          animate={open ? "open" : "closed"}
          variants={popVariants(reduce)}
        >
          {note && <p className="hxq-note">{note}</p>}
          <ul className="hxq-list">
            {list.map((country) => (
              <motion.li key={country} variants={rowVariants(reduce)}>
                <SmartLink
                  href={serviceHref(country, slug)}
                  className="hxq-go"
                  aria-label={`${COUNTRY_LABELS[country]}, ${label}`}
                >
                  <span className="hxq-f" aria-hidden="true">
                    <Flag country={country} />
                  </span>
                  <b>{COUNTRY_LABELS[country]}</b>
                  <ArrowRight size={15} strokeWidth={2.2} className="hxq-arw" aria-hidden="true" />
                </SmartLink>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

export default function HomeServices() {
  return (
    <section id="hizmetler" className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="sec-head">
          <SplitWords
            as="h2"
            text="Verdiğimiz hizmetler."
            accent="hizmetler."
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.2}>
            <p className="sec-lead">
              Kuruluş bir halka; zincirin tamamı bizde. Kapsam ve fiyat ülkeye göre
              değiştiği için, her hizmette hangi ülkeye bakacağınızı siz seçiyorsunuz.
            </p>
          </FadeUp>
        </div>

        <div className="hx-grid">
          {CARDS.map((c, i) => {
            const meta = byKey[c.key];
            return (
              <FadeUp
                key={c.key}
                delay={0.12 + i * 0.06}
                y={18}
                className={`hx-cell hx-c${c.span}`}
              >
                <article className="hx-card">
                  <div className="hx-stage" aria-hidden="true">
                    <c.Scene />
                  </div>

                  <div className="hx-body">
                    <h3 className="hx-t">{meta.label}</h3>
                    <p className="hx-l">{meta.line}</p>
                  </div>

                  <CountryOut label={meta.label} slug={c.slug} list={countriesFor(c.slug)} />
                </article>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
