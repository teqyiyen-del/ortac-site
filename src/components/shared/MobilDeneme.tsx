"use client";

/* MOBİL DENEME İŞARETİ (08.10.2026)
   Telefon elden geçirmesinin tamamı (css/mobil-deneme.css, mobil/Mini,
   lib/mobilKisa) YALNIZ html[data-mobil="yeni"] altında çalışıyor. Bu
   bileşen o işareti koyuyor; işaret yokken site bugünkü hâliyle aynı.

   NASIL AÇILIR
     · /lab/mobil: iki çerçeve yan yana (biri işaretsiz, biri ?mobil=yeni).
     · Telefonda gezerek bakmak için: herhangi bir adrese ?mobil=yeni ekle.
       İşaret o sekmede HATIRLANIYOR (sessionStorage), yani bağlantılara
       tıklayıp gezdikçe düzen açık kalıyor. Alttaki küçük etiketten ya da
       ?mobil=eski ile kapanıyor. Çerçeve içinde (lab) hatırlama yok: iki
       çerçeve aynı sekmeyi paylaşıyor, "önce" tarafı da açılırdı.

   ?git=<seçici>: sayfanın ilgili bölüme inmesi için (yalnız ilk açılışta).

   ONAYLANAN KISIM canlıya şöyle geçer: css'teki kuralın başındaki
   html[data-mobil="yeni"] silinir, kısa yazılar bileşenlere taşınır. Hepsi
   karara bağlanınca bu bileşen, css dosyası ve lab sayfası silinir. */

import "@/app/css/mobil-deneme.css";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MOBIL_KISA, MOBIL_KISA_SECICI } from "@/lib/mobilKisa";

const ANAHTAR = "ortac-mobil";

function kisalt() {
  if (!window.matchMedia("(max-width: 767px)").matches) return;
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

export default function MobilDeneme() {
  const yol = usePathname();
  const [acik, setAcik] = useState(false);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const p = q.get("mobil");
    const ust = window.top === window;
    let yeni = p === "yeni";
    try {
      if (ust) {
        if (p === "yeni") window.sessionStorage.setItem(ANAHTAR, "yeni");
        if (p === "eski") window.sessionStorage.removeItem(ANAHTAR);
        if (!p) yeni = window.sessionStorage.getItem(ANAHTAR) === "yeni";
      }
    } catch {
      /* saklama kapalı: yalnız adresteki işaret geçerli */
    }
    if (yeni) document.documentElement.dataset.mobil = "yeni";
    else delete document.documentElement.dataset.mobil;
    // etiket yalnız en üst pencerede (lab çerçevelerinde değil); işaret adresten okunuyor
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAcik(yeni && ust);
    if (!yeni) return;
    /* telefon yazıları: sayfa değişince yeniden; geç beliren kutular için bir kez daha */
    kisalt();
    const t1 = window.setTimeout(kisalt, 600);
    return () => window.clearTimeout(t1);
  }, [yol]);

  useEffect(() => {
    const git = new URLSearchParams(window.location.search).get("git");
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

  if (!acik) return null;
  return (
    <button
      type="button"
      className="md-rozet"
      onClick={() => {
        try {
          window.sessionStorage.removeItem(ANAHTAR);
        } catch {
          /* saklama kapalı */
        }
        const u = new URL(window.location.href);
        u.searchParams.delete("mobil");
        window.location.replace(u.toString());
      }}
    >
      Telefon denemesi açık · kapat
    </button>
  );
}

/* Blog listesi için "daha fazla göster". Düğme yalnız deneme işareti açıkken
   ve telefonda görünüyor (css). */
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
