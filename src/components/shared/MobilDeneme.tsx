"use client";

/* MOBİL DENEME İŞARETİ (08.10.2026)
   Burak: "önerilerinin hepsi için before after hazırla." Telefonda uzun kalan
   dokuz bölümün yeni hâli css/mobil-deneme.css'te ve YALNIZ
   html[data-mobil="yeni"] altında çalışıyor. Bu bileşen adreste ?mobil=yeni
   varsa o işareti koyuyor; işaret yokken site bugünkü hâliyle aynı.
   /lab/mobil iki çerçeveyi yan yana basıyor: biri işaretsiz, biri işaretli.

   ?git=<seçici>: çerçevenin ilgili bölüme inmesi için (bölümlerin çoğunun
   id'si yok; id eklemek yerine seçiciyle iniliyor).

   ONAYLANAN ÖNERİ canlıya şöyle geçer: css'teki kuralın başındaki
   html[data-mobil="yeni"] silinir. Hepsi karara bağlanınca bu bileşen, css
   dosyası ve lab sayfası silinir. */

import "@/app/css/mobil-deneme.css";
import { useEffect } from "react";
import { MOBIL_KISA, MOBIL_KISA_SECICI } from "@/lib/mobilKisa";

export default function MobilDeneme() {
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const yeni = q.get("mobil") === "yeni";
    if (yeni) document.documentElement.dataset.mobil = "yeni";
    /* telefon yazıları (lib/mobilKisa.ts): yalnız işaret açıkken ve telefonda */
    if (yeni && window.matchMedia("(max-width: 767px)").matches) {
      const bos = (x: string) => x.replace(/\s+/g, " ").trim();
      document.querySelectorAll<HTMLElement>(MOBIL_KISA_SECICI).forEach((el) => {
        if (el.children.length > 0 || el.dataset.uzun) return;
        const metin = bos(el.textContent ?? "");
        const es = MOBIL_KISA.find(([bas]) => metin.startsWith(bas));
        if (!es || es[1] === metin) return;
        el.dataset.uzun = metin;
        el.textContent = es[1];
      });
    }
    const git = q.get("git");
    if (!git) return;
    const t = window.setTimeout(() => {
      try {
        const el = document.querySelector(git);
        (el?.closest("section") ?? el)?.scrollIntoView();
      } catch {
        /* bozuk seçici: sayfa başta kalır */
      }
    }, 700);
    return () => window.clearTimeout(t);
  }, []);
  return null;
}

/* Blog listesi için "daha fazla göster" (öneri 8). Düğme yalnız deneme
   işareti açıkken ve telefonda görünüyor (css). */
export function BlogDahaFazla() {
  return (
    <button
      type="button"
      className="md-daha"
      onClick={() => {
        document.documentElement.dataset.blogTum = "";
      }}
    >
      Daha fazla göster
    </button>
  );
}
