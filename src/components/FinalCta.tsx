"use client";

import { usePathname } from "next/navigation";
import { Ft2Cta, Ft2Directory, FT2_COLS } from "@/components/Footer";
import { useLenis } from "@/components/Providers";
import { TOOL_BY_ID } from "@/lib/tools/catalog";

/* The sub-page closing block: the same hero-language CTA as the home footer,
   plus the same site index. Only the tools column differs — on a sub-page it
   is worth pointing back at the home-page anchors. */
const SUB_COLS: typeof FT2_COLS = FT2_COLS.map((col) =>
  col.head === "Araçlar"
    ? {
        head: col.head,
        links: [
          { label: "Uygunluk testi", href: "/uygunluk-testi" },
          /* "Maliyet hesaplayıcı → /fiyatlar" bu turda ÇIKTI. /fiyatlar diye
             bir sayfa hiç yazılmamıştı; adres app/[...yapim] yakalayıcısına
             düşüyor ve "yapım aşamasında" kartını 200 ile basıyordu, yani
             sütunun beş satırından biri sessizce ölüydü. Hesaplayıcı kayıp
             değil: ülke sayfalarının fiyat bölümünde çalışıyor. */
          /* İkisi de bu turda /ulkeler'e döndü. Sebep: kıyas ana sayfadan
             oraya taşındı, ana sayfada yalnızca dört ölçütlük özeti kaldı.
             Üstelik FinalCta /ulkeler'in KENDİ altında da basılıyor, yani
             eski hâlinde sayfa ziyaretçiyi kendi konusunun özetine geri
             gönderiyordu. */
          { label: "Ödeme altyapısı", href: "/ulkeler#para-ve-tahsilat" },
          { label: "Ülke karşılaştırma", href: "/ulkeler" },
          /* Araçların kendisi artık gerçek bir sayfada. Sütun beş satırda
             kalıyor (öteki footer sütunlarıyla aynı boy), o yüzden üç aracın
             üçü değil yalnızca öne çıkanı buraya giriyor; adresi de elle
             değil kayıt defterinden (lib/tools/catalog.ts). */
          {
            label: TOOL_BY_ID["yukumluluk-takvimi"].title,
            href: TOOL_BY_ID["yukumluluk-takvimi"].href,
          },
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
