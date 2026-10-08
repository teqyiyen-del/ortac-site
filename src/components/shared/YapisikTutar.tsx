"use client";

/* ============================================================================
   YAPIŞIK TUTAR · telefonda fiyat formunun altına yapışan şerit (08.10.2026)
   Burak: "bu kadar şeyi seçerken bir yandan fiyatı da görebilse iyi olurdu."

   Telefonda tutar paneli (.ip-out) formun (.ip-form) altında kalıyor: bölge,
   yıl, vize ve ek hizmet seçilirken tutar ekranda değil. Bu şerit formun son
   çocuğu; boyu sıfır, `position: sticky; bottom` ile ekranın altında duruyor
   ve yalnız tutarı gösteriyor. Dokununca özet paneline iniyor.

   NE ZAMAN GÖRÜNÜR: form ekrana iyice girdikten sonra (üstü ekranın altından
   200 px yukarıda) ve özet paneli henüz görünmüyorken. Özet göründüğü an
   kayboluyor; aynı tutar iki kez üst üste durmuyor ve şerit formun son
   kartının üstüne binmiyor.

   Kullanım: .ip > .ip-form içinde SON çocuk. Masaüstünde ve deneme düzeni
   kapalıyken görünmez (css/mobil-deneme.css: varsayılan `display: none`).
   ========================================================================== */
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function YapisikTutar({ tutar, etiket = "Tahmini tutar" }: { tutar: React.ReactNode; etiket?: string }) {
  const kok = useRef<HTMLDivElement>(null);
  const [acik, setAcik] = useState(false);

  useEffect(() => {
    const ip = kok.current?.closest(".ip");
    const form = ip?.querySelector(".ip-form");
    const ozet = ip?.querySelector(".ip-out");
    if (!form || !ozet) return;
    let formda = false;
    let ozette = false;
    const yaz = () => setAcik(formda && !ozette);
    const ioForm = new IntersectionObserver(
      ([e]) => {
        formda = e.isIntersecting;
        yaz();
      },
      { rootMargin: "0px 0px -200px 0px" },
    );
    /* alt pay +56: özet ekrana girmeden hemen önce (şeridin yapışmayı
       bırakacağı an) kapanıyor */
    const ioOzet = new IntersectionObserver(
      ([e]) => {
        ozette = e.isIntersecting;
        yaz();
      },
      { rootMargin: "0px 0px 56px 0px" },
    );
    ioForm.observe(form);
    ioOzet.observe(ozet);
    return () => {
      ioForm.disconnect();
      ioOzet.disconnect();
    };
  }, []);

  const git = () => {
    const ozet = kok.current?.closest(".ip")?.querySelector(".ip-out");
    const sakin = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    ozet?.scrollIntoView({ behavior: sakin ? "auto" : "smooth", block: "start" });
  };

  return (
    <div ref={kok} className="ip-yapisik" data-acik={acik || undefined}>
      <button type="button" onClick={git} tabIndex={acik ? 0 : -1} aria-label={`${etiket}, özete in`}>
        <span className="ip-yapisik-k">{etiket}</span>
        <b className="ip-yapisik-t">{tutar}</b>
        <ChevronDown size={18} strokeWidth={2.2} aria-hidden="true" />
      </button>
    </div>
  );
}
