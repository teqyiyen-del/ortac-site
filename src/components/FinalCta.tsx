"use client";

import { usePathname } from "next/navigation";
import { Ft2Cta, Ft2Directory } from "@/components/Footer";
import { useLenis } from "@/components/Providers";

/* The sub-page closing block: the same hero-language CTA as the home footer,
   plus the same site index.

   ARAÇLAR SÜTUNU ARTIK AYRI DEĞİL — VE BU BİR SADELEŞTİRME.
   Bu dosya bir tur boyunca Araçlar sütununu kendi içinde yeniden kuruyordu.
   Gerekçesi vardı: araçların gerçek sayfası yoktu, alt sayfalarda ana sayfanın
   çapalarına geri göndermek gerekiyordu. Artık her aracın kendi adresi var,
   yani footer'ın sütunu ile buradaki sütunun farklı olması için hiçbir sebep
   kalmadı — ve iki ayrı liste, iki ayrı yerde eskime riski demekti.

   Sütunun kendisi Footer.tsx'te ve kayıt defterinden besleniyor
   (lib/tools/catalog.ts). Burada yalnızca aynı dizin basılıyor. */

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
      <Ft2Directory hashClick={onHashClick} />
    </footer>
  );
}
