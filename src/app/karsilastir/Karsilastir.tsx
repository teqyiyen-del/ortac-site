"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* Önce / sonra. Tek iframe (tıkla, anında değişsin) ya da yan yana iki
   iframe (kaydırma eş). Sayfa kendi doğal genişliğinde (1440 ya da 390)
   yükleniyor ve sütuna sığacak kadar küçültülüyor: yarım ekrana 720 px'lik
   bir iframe koymak siteyi tablet düzenine sokardı, karşılaştırma bozulurdu. */

type Hal = "once" | "sonra";
const HAL_AD: Record<Hal, string> = { once: "Önce", sonra: "Sonra" };
const SAYFALAR = [
  ["/ingiltere", "İngiltere"],
  ["/kktc", "KKTC"],
] as const;

function uygula(f: HTMLIFrameElement | null, hal: Hal) {
  const m = f?.contentDocument?.querySelector("main");
  if (!m) return;
  if (hal === "once") m.removeAttribute("data-ds");
  else m.setAttribute("data-ds", "v2");
}

function Cerceve({
  src,
  hal,
  gen,
  onRef,
}: {
  src: string;
  hal: Hal;
  gen: number;
  onRef?: (f: HTMLIFrameElement | null) => void;
}) {
  const kutu = useRef<HTMLDivElement>(null);
  const cer = useRef<HTMLIFrameElement>(null);
  const [olcek, setOlcek] = useState(1);
  const [boy, setBoy] = useState(800);

  useEffect(() => {
    const el = kutu.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth;
      const s = Math.min(1, w / gen);
      setOlcek(s);
      setBoy(el.clientHeight / s);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [gen]);

  useEffect(() => uygula(cer.current, hal), [hal]);

  return (
    <div ref={kutu} className="kps-kutu">
      <iframe
        ref={(f) => {
          cer.current = f;
          onRef?.(f);
        }}
        src={src}
        title={HAL_AD[hal]}
        onLoad={() => {
          uygula(cer.current, hal);
          /* sayfa sonradan içerik yüklüyor; bir kez daha */
          window.setTimeout(() => uygula(cer.current, hal), 800);
        }}
        style={{
          width: gen,
          height: boy,
          transform: `scale(${olcek})`,
        }}
      />
      <span className="kps-rozet" data-hal={hal}>
        {HAL_AD[hal]}
      </span>
    </div>
  );
}

export default function Karsilastir() {
  const [duzen, setDuzen] = useState<"tek" | "yan">("tek");
  const [hal, setHal] = useState<Hal>("sonra");
  const [gen, setGen] = useState(1440);
  const [sayfa, setSayfa] = useState<string>(SAYFALAR[0][0]);
  const sol = useRef<HTMLIFrameElement | null>(null);
  const sagF = useRef<HTMLIFrameElement | null>(null);

  /* 1 · 2 tuşlarıyla geçiş: gözün farkı yakalaması için en hızlı yol */
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === "1") setHal("once");
      if (e.key === "2") setHal("sonra");
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);

  /* yan yana: soldaki kaydırılınca sağdaki aynı orana gelsin */
  const esle = useCallback(() => {
    const a = sol.current?.contentWindow;
    const b = sagF.current?.contentWindow;
    if (!a || !b) return;
    const ha = a.document.documentElement.scrollHeight - a.innerHeight;
    const hb = b.document.documentElement.scrollHeight - b.innerHeight;
    if (ha > 0) b.scrollTo(0, (a.scrollY / ha) * hb);
  }, []);
  useEffect(() => {
    if (duzen !== "yan") return;
    let w: Window | null = null;
    const bagla = () => {
      w = sol.current?.contentWindow ?? null;
      w?.addEventListener("scroll", esle);
    };
    const t = window.setInterval(() => {
      if (sol.current?.contentDocument?.readyState === "complete") {
        bagla();
        window.clearInterval(t);
      }
    }, 300);
    return () => {
      window.clearInterval(t);
      w?.removeEventListener("scroll", esle);
    };
  }, [duzen, esle, sayfa, gen]);

  const secenek = <T extends string>(
    deger: T,
    set: (v: T) => void,
    liste: readonly (readonly [T, string])[],
    ad: string,
  ) => (
    <div className="kps-grup" role="group" aria-label={ad}>
      {liste.map(([v, l]) => (
        <button key={v} type="button" aria-pressed={deger === v} onClick={() => set(v)}>
          {l}
        </button>
      ))}
    </div>
  );

  return (
    <div className="kps">
      <div className="kps-bar">
        {secenek(sayfa, setSayfa, SAYFALAR, "Sayfa")}
        {secenek(
          duzen,
          setDuzen,
          [
            ["tek", "Tek ekran"],
            ["yan", "Yan yana"],
          ] as const,
          "Düzen",
        )}
        {secenek(
          String(gen),
          (v) => setGen(Number(v)),
          [
            ["1440", "Masaüstü"],
            ["1280", "Laptop"],
            ["900", "Tablet"],
            ["390", "Telefon"],
          ] as const,
          "Cihaz",
        )}
        {duzen === "tek"
          ? secenek(
              hal,
              setHal,
              [
                ["once", "1 · Önce"],
                ["sonra", "2 · Sonra"],
              ] as const,
              "Hâl",
            )
          : null}
      </div>

      {duzen === "tek" ? (
        <div className="kps-alan" data-gen={gen}>
          <Cerceve key={`${sayfa}-${gen}`} src={sayfa} hal={hal} gen={gen} />
        </div>
      ) : (
        <div className="kps-alan" data-gen={gen}>
          <Cerceve
            key={`l-${sayfa}-${gen}`}
            src={sayfa}
            hal="once"
            gen={gen}
            onRef={(f) => {
              sol.current = f;
            }}
          />
          <Cerceve
            key={`r-${sayfa}-${gen}`}
            src={sayfa}
            hal="sonra"
            gen={gen}
            onRef={(f) => {
              sagF.current = f;
            }}
          />
        </div>
      )}
    </div>
  );
}
