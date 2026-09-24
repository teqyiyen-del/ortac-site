"use client";

import SmartLink from "@/components/shared/SmartLink";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { SETUP_SCENES } from "@/components/scenes/SetupScenes";
import SplitWords from "@/components/shared/SplitWords";
import FadeUp from "@/components/shared/FadeUp";
import SurecP3, { type SurecAdim } from "@/components/shared/SurecP3";
import { COUNTRY_NAME, COUNTRY_ORDER } from "@/lib/brand";

/* 25.09.2026 · BÖLÜM P3'E GEÇTİ (components/shared/SurecP3, ülke
   sayfalarıyla aynı kalıp). Solda alt alta beş satırlık ray ve sağdaki kartın
   başlığı ("Kuruluş dosyası · Sizden bir kez evrak, gerisi bizde · 3/5")
   kalktı; solda o anki adım + çubuklar ve sayılar, sağda yalnız çizim.
   Burak: "sağdaki SVG kartı sadece görsel bırakalım … bunu her sayfaya
   entegre edeceğiz." Aşağıdaki eski notlar sahnelerin kuralları için duruyor.

   ESKİ NOT · The five steps are the same in all three countries — only the wording inside
   the panel and the registering authority change, and the country picker under
   the rail is what switches them.

   The section does not pin. It is one normal-height block with two drivers: a
   timer that walks the steps while the block is on screen, and the rail itself,
   where every step is a button. A click (or keyboard activation) hands control
   to the visitor and stops the timer for a while.

   The right-hand card is an interface again, not a drawing. The illustrated
   round (stacked sheets, a seal, a bank building) read as decoration: it said
   nothing the rail did not already say. What the panel shows now is the tool
   doing the step — a form being filled, a name being queried, a file being
   sent — because that is the thing a visitor cannot picture on their own.

   Two rules the mock cannot break:
   1. nothing in it may imply a bank decision, an authority decision or a fixed
      duration. Every status is either work we did ("dosyada", "gönderildi",
      "teslim edildi") or work that is still open ("incelemede", "sorgulanıyor",
      "sürüyor"). The word "onaylandı" appears nowhere.
   2. it is drawn in opaque colour. White at 5% inside a white line at 20% over
      near-black gives a handful of greys that all look the same, so nothing can
      be foreground. The panel stays black, and the interface on it is a real
      light surface with ink on it. */

/* the rail is the same five rows in every country, so it never reflows.
   23.09.2026 · Burak: "üç ülkede de 5 adım ifadesini beğenmedim … genel
   olarak aynı mantıkla ilerliyorlar ama farklı bir söylem … Ortac'ın bu
   süreçte nasıl çalıştığını ve müşteriyle ilişkisini düşünebiliriz. Aşamalar
   doğru." Aşamalar aynı kaldı; alt satır artık işin kimde olduğunu söylüyor
   (sizden / birlikte / bizde), bölümün cümlesi de "aynı beş adım" yerine
   çalışma biçimini anlatıyor. */
const STEPS: SurecAdim[] = [
  {
    title: "Evrak toplama",
    short: "Pasaport ve adres belgesini bir kez veriyorsunuz.",
    who: "siz",
    aria: "1. adım: Evrak toplama. Sizden: pasaport ve adres belgesi.",
  },
  {
    title: "İsim onayı",
    short: "Adı siz seçiyorsunuz, uygunluk kontrolünü biz yapıyoruz.",
    who: "birlikte",
    aria: "2. adım: İsim onayı. Birlikte: adı siz seçiyorsunuz, kontrolü biz.",
  },
  {
    title: "Tescil ve lisans",
    short: "Başvuruyu biz hazırlıyoruz, kurum sürecini biz takip ediyoruz.",
    who: "ortac",
    aria: "3. adım: Tescil ve lisans. Bizde: başvuru ve kurum takibi.",
  },
  {
    title: "Banka başvurusu",
    short: "Banka dosyasını biz hazırlayıp takip ediyoruz; hesap kararı bankanın.",
    who: "ortac",
    aria: "4. adım: Banka başvurusu. Bizde: dosya hazırlığı ve takip.",
  },
  {
    title: "Vergi kaydı ve teslim",
    short: "Vergi kaydı yapılıyor, bütün belgeler size teslim ediliyor.",
    who: "ortac",
    aria: "5. adım: Vergi kaydı ve teslim. Bizde: belgeler size teslim.",
  },
];

export default function ProcessScroll() {
  const pickerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [pickerOpen, setPickerOpen] = useState(false);

  /* the picker opens on hover and on focus, so it also has to close on a tap
     somewhere else — otherwise a touch visitor is left holding it open */
  useEffect(() => {
    if (!pickerOpen) return;
    const onDown = (e: PointerEvent) => {
      const el = pickerRef.current;
      if (el && !el.contains(e.target as Node)) setPickerOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [pickerOpen]);

  return (
    <SurecP3
      background="var(--paper)"
      head={
        <div className="sec-head">
          <SplitWords
            as="h2"
            text="Kuruluşta nasıl çalışıyoruz."
            accent="nasıl çalışıyoruz."
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.2}>
            {/* 23.09.2026: "üç ülkede de aynı beş adım" kalktı (Burak
                beğenmedi), yerine çalışma biçimi. */}
            <p className="sec-lead">
              Kurum ve süre ülkeye göre değişiyor, çalışma biçimimiz değişmiyor: evrakı bir kez
              veriyorsunuz, gerisini biz yürütüyoruz.
            </p>
          </FadeUp>
        </div>
      }
      steps={STEPS}
      scenes={SETUP_SCENES}
      sizer={SETUP_SCENES}
      foot={
        <>
          {/* the one line that has to stay: the panel walks to "teslim
              edildi" on its own, so the non-guarantee is said in words */}
          <p className="srp-note">
            Kurum ve banka kararları ilgili kuruluşlara aittir; sonuç ve süre garanti edilmez.
          </p>
          {/* Ülke seçici artık paneli yeniden yazmıyor.
              It used to rewrite the panel in place, which loaded this section
              with five screens per country for a difference the visitor had not
              asked to see yet. What it is for is simpler: the three country
              pages each carry their own process section, so this points at them.
              Hover opens it, click and keyboard do the same, and each option is
              a real link - not a control that pretends to be one. */}
          <div
            ref={pickerRef}
            className="pr5-ctry"
            data-on={pickerOpen ? "true" : "false"}
            onMouseEnter={() => setPickerOpen(true)}
            onMouseLeave={() => setPickerOpen(false)}
          >
            <button
              type="button"
              className="pr5-ctry-btn"
              aria-expanded={pickerOpen}
              aria-haspopup="true"
              onClick={() => setPickerOpen((v) => !v)}
              onFocus={() => setPickerOpen(true)}
            >
              <span className="pr5-ctry-lbl">Ülkeye özel süreci gör</span>
              <ChevronDown
                size={15}
                strokeWidth={2.2}
                className="pr5-ctry-caret"
                aria-hidden="true"
              />
            </button>

            <AnimatePresence initial={false}>
              {pickerOpen && (
                <motion.div
                  className="pr5-ctry-menu"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduced ? 0 : -4 }}
                  transition={{ duration: reduced ? 0 : 0.16, ease: [0.22, 1, 0.36, 1] }}
                >
                  {COUNTRY_ORDER.map((c) => (
                    <SmartLink
                      key={c}
                      href={`/${c}#surec`}
                      className="pr5-ctry-opt"
                      onClick={() => setPickerOpen(false)}
                    >
                      {COUNTRY_NAME[c]}
                    </SmartLink>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </>
      }
    />
  );
}
