"use client";

/* EKRAN DIŞINDA ANİMASYON DURUR (08.10.2026 · telefon hızı)
   Sitede yüze yakın sürekli CSS döngüsü var (yapı haritası 21, avantaj
   çizimleri 16, sektör sahnesi 8, alt bilgide 12 taşıyıcı ve yıldızlar …) ve
   hiçbiri görünürlüğe bağlı değildi: ziyaretçi sayfanın tepesindeyken en
   alttaki sahneler de dönüyordu. Hareket politikası (docs/tuzaklar.md) hareketi
   ekrandayken istiyor; ekranda olmayanın dönmesi yalnız işlemci ve pil.

   Tek gözlemci, tek öznitelik, tek CSS kuralı (globals.css · [data-ekran-disi]):
   bölüm ekrandan çıkınca öznitelik konur, içindeki bütün CSS animasyonları
   duraklar; 200 px kala geri başlar, kaldığı yerden. Keyframe'lere, sürelere,
   bileşenlere dokunulmadı.

   KAPSAMADIĞI: Motion'ın JS ile sürdürdüğü döngüler (repeat: Infinity) ve SMIL.
   Onlar bileşenin kendi useInView kapısını ister (HeroAkis'teki gibi). */

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function EkranDisiDurdur() {
  const yol = usePathname();
  useEffect(() => {
    const gozcu = new IntersectionObserver(
      (kayitlar) => {
        for (const k of kayitlar) k.target.toggleAttribute("data-ekran-disi", !k.isIntersecting);
      },
      { rootMargin: "200px 0px" },
    );
    /* bölümler ve alt bilgi; iç içe bölümde içteki de ayrıca izleniyor */
    const hedefler = document.querySelectorAll("main section, footer");
    hedefler.forEach((h) => gozcu.observe(h));
    return () => {
      gozcu.disconnect();
      hedefler.forEach((h) => h.removeAttribute("data-ekran-disi"));
    };
  }, [yol]);
  return null;
}
