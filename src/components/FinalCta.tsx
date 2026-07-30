"use client";

import { usePathname } from "next/navigation";
import { Ft2Cta, Ft2Directory, FT2_COLS } from "@/components/Footer";
import { useLenis } from "@/components/Providers";

/* The sub-page closing block: the same hero-language CTA as the home footer,
   plus the same site index. Only the tools column differs — on a sub-page it
   is worth pointing back at the home-page anchors. */
const SUB_COLS: typeof FT2_COLS = FT2_COLS.map((col) =>
  col.head === "Araçlar"
    ? {
        head: col.head,
        links: [
          { label: "Uygunluk testi", href: "/uygunluk-testi" },
          { label: "Maliyet hesaplayıcı", href: "/fiyatlar" },
          { label: "Ödeme altyapısı", href: "/#odeme-altyapisi" },
          { label: "Ülke karşılaştırma", href: "/#ulkeler" },
          { label: "Tüm araçlar", href: "/araclar" },
        ],
      }
    : col,
);

export default function FinalCta() {
  const lenis = useLenis();
  const pathname = usePathname();

  /* Only hijack a "/#foo" click when we are already on the home page. The
     footer renders on every route, and the sub-pages carry none of these
     anchors — preventDefault there turned the link into a dead click. */
  const onHashClick = (href: string) => (e: React.MouseEvent) => {
    if (!href.startsWith("/#") || pathname !== "/") return;
    e.preventDefault();
    const hash = href.slice(1);
    if (lenis) lenis.scrollTo(hash, { duration: 1.1 });
    else document.querySelector(hash)?.scrollIntoView();
  };

  return (
    <footer className="ft2">
      <Ft2Cta placement="final" />
      <Ft2Directory cols={SUB_COLS} hashClick={onHashClick} />
    </footer>
  );
}
