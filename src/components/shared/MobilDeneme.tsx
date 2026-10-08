"use client";

/* TELEFON DÜZENİ ANAHTARI (09.10.2026 · deneme canlıya alındı)

   Telefon elden geçirmesi (css/mobil-deneme.css, mobil/Mini, mobil/Tel,
   lib/mobilKisa) html[data-mobil="yeni"] altında çalışıyor. 08.10'da altı tur
   boyunca bu işaret yalnız ?mobil=yeni ile açılıyordu (deneme). 09.10 gecesi,
   teslim öncesi turda CANLIYA ALINDI: işaret artık sunucuda basılıyor
   (app/layout.tsx · <html data-mobil="yeni">), yani telefondaki herkes yeni
   düzeni ilk boyamadan itibaren görüyor; tarayıcıda yazı değiştiren kod da
   kalktı (kısa cümleler mobil/Tel ile sunucuda basılıyor).

   GERİ DÖNÜŞ TEK SATIR: layout.tsx'teki data-mobil özniteliği silinirse site
   08.10 öncesindeki telefon düzenine döner (kurallar o işarete bağlı).

   ESKİ DÜZENE BAKMAK: herhangi bir adrese ?mobil=eski eklenir. Seçim o
   pencerede hatırlanır (window.name; /lab/mobil'in "önce" çerçevesi de böyle
   çalışıyor, iki çerçeve ayrı pencere olduğu için birbirini etkilemiyor).
   Alttaki etiketten ya da ?mobil=yeni ile yeni düzene dönülür.

   ?git=<seçici>: sayfanın ilgili bölüme inmesi için (yalnız ilk açılışta). */

import "@/app/css/mobil-deneme.css";
import { useEffect, useState } from "react";

const ESKI = "ortac-mobil-eski";

export default function MobilDeneme() {
  const [eski, setEski] = useState(false);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("mobil");
    if (p === "eski") window.name = ESKI;
    if (p === "yeni" && window.name === ESKI) window.name = "";
    const e = window.name === ESKI;
    if (e) delete document.documentElement.dataset.mobil;
    else document.documentElement.dataset.mobil = "yeni";
    // etiket yalnız en üst pencerede (lab çerçevelerinde değil)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEski(e && window.top === window);
  }, []);

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

  if (!eski) return null;
  return (
    <button
      type="button"
      className="md-rozet"
      onClick={() => {
        window.name = "";
        const u = new URL(window.location.href);
        u.searchParams.delete("mobil");
        window.location.replace(u.toString());
      }}
    >
      Eski telefon düzeni · yeniye dön
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
