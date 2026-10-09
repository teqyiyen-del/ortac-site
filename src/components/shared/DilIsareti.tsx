"use client";

/* <html lang> DÜZELTİCİ (10.10.2026 · app/en/layout.tsx; gerekçe ve sınır orada).
   İngilizce ağaç açılınca belge dilini "en" yapıyor, ağaçtan çıkılınca
   (site içi geçişle Türkçe sayfaya dönüş) "tr"ye geri alıyor.

   Kök layout'un bastığı "İçeriğe geç" bağlantısı da burada İngilizceye
   dönüyor: o bağlantı kök layout'ta ve hangi dilde olduğunu bilemiyor. İkisi
   de aynı geçici çözümün parçası; iki kök layout'a geçilince bu dosya silinir. */
import { useEffect } from "react";

export default function DilIsareti() {
  useEffect(() => {
    const kok = document.documentElement;
    const onceki = kok.lang;
    kok.lang = "en";
    const gec = document.querySelector<HTMLAnchorElement>("a.icerige-gec");
    const oncekiYazi = gec?.textContent ?? null;
    if (gec) gec.textContent = "Skip to content";
    return () => {
      kok.lang = onceki || "tr";
      if (gec && oncekiYazi !== null) gec.textContent = oncekiYazi;
    };
  }, []);
  return null;
}
