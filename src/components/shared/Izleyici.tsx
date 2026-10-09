"use client";

/* İZLEYİCİ (08.10.2026) · ne topladığı ve neyi toplamadığı lib/izleme.ts'in
   başında. Bu bileşen yalnız dinleyicileri bağlıyor; ekrana bir şey basmıyor. */

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { izBaslat, izGonder, izle } from "@/lib/izleme";

export default function Izleyici() {
  const yol = usePathname();

  /* sayfa görüntüleme: ilk açılış ve her istemci geçişi */
  useEffect(() => {
    izBaslat();
    const q = new URLSearchParams(window.location.search);
    const veri: Record<string, string | number> = { en: window.innerWidth, dil: navigator.language.slice(0, 5) };
    /* kaynak yalnız dışarıdan gelişte ve sorgusu atılarak */
    try {
      const r = document.referrer && new URL(document.referrer);
      if (r && r.host !== window.location.host) veri.ref = (r.host + r.pathname).slice(0, 120);
    } catch {
      /* bozuk referrer: yok say */
    }
    for (const k of ["utm_source", "utm_medium", "utm_campaign"]) {
      const v = q.get(k);
      if (v) veri[k.slice(4)] = v.slice(0, 60);
    }
    izle("g", veri);

    /* süre ve derinlik: sayfadan çıkarken tek kayıt */
    const t0 = Date.now();
    let dip = window.scrollY + window.innerHeight;
    const kaydir = () => {
      const y = window.scrollY + window.innerHeight;
      if (y > dip) dip = y;
    };
    /* Çıkış iki yoldan geliyor: site içi geçiş (etki temizlenir) ve sekmenin
       kapanması ya da tam sayfa yükleme (temizlik ÇALIŞMAZ; ilk denemede bu
       kayıt hiç yazılmıyordu). İkisi de aynı işlevi çağırıyor, kayıt bir kez.
       ponytail: sekme arka plana alınıp geri gelinirse süre ilk gizlenmede
       kesiliyor; görünür süreyi toplamak gerekirse sayaç buraya eklenir. */
    let yazildi = false;
    const cik = () => {
      if (yazildi) return;
      yazildi = true;
      const boy = document.documentElement.scrollHeight || 1;
      izle("c", { sure: Date.now() - t0, derinlik: Math.min(100, Math.round((dip / boy) * 100)) });
    };
    const kapan = () => {
      cik();
      izGonder();
    };
    const gizlen = () => {
      if (document.visibilityState === "hidden") kapan();
    };
    window.addEventListener("scroll", kaydir, { passive: true });
    document.addEventListener("visibilitychange", gizlen);
    window.addEventListener("pagehide", kapan);
    return () => {
      window.removeEventListener("scroll", kaydir);
      document.removeEventListener("visibilitychange", gizlen);
      window.removeEventListener("pagehide", kapan);
      cik();
    };
  }, [yol]);

  useEffect(() => {
    /* tıklama: yer (ısı haritası) ve basılan şeyin ne olduğu. Form alanına
       tıklamada etiket alınmıyor: değer oradan sızabilir. */
    const tikla = (e: MouseEvent) => {
      const h = e.target instanceof Element ? e.target : null;
      if (!h) return;
      const d = h.closest("a, button, [role=button], summary");
      const veri: Record<string, string | number> = {
        x: Math.round((e.pageX / document.documentElement.scrollWidth) * 1000),
        yy: Math.round(e.pageY),
        en: window.innerWidth,
        s: (d ?? h).tagName.toLowerCase() + ((d ?? h).id ? "#" + (d ?? h).id : ""),
      };
      if (d && !d.closest("form")) veri.etiket = (d.getAttribute("aria-label") || d.textContent || "").trim().slice(0, 48);
      izle("t", veri);
      /* iletişim bağlantıları adıyla da yazılıyor (09.10.2026): sitede on beş
         gtm() olayı var ama WhatsApp, e-posta ve telefon bağlantılarının hiçbiri
         işaretli değildi. Numara ve adres alınmıyor, yalnız türü. */
      const adres = d instanceof HTMLAnchorElement ? d.href : "";
      const kanal = /wa\.me|whatsapp/i.test(adres) ? "whatsapp" : adres.startsWith("mailto:") ? "eposta" : adres.startsWith("tel:") ? "telefon" : "";
      if (kanal) izle("o", { ad: "iletisim_tik", kanal });
    };
    /* form gönderimi: hangi form olduğu (id ya da sınıfı), alanların HİÇBİRİ değil.
       Beş formun (iletişim, kariyer, iş ortaklığı, açılış sayfası, isim sorgu)
       hiçbirinde gtm() çağrısı yoktu. */
    const gonder = (e: SubmitEvent) => {
      const f = e.target instanceof HTMLFormElement ? e.target : null;
      if (f) izle("o", { ad: "form_gonder", form: (f.id || f.getAttribute("name") || f.className.split(" ")[0] || "adsiz").slice(0, 40) });
    };
    document.addEventListener("submit", gonder, { capture: true });
    document.addEventListener("click", tikla, { capture: true, passive: true });
    return () => {
      document.removeEventListener("click", tikla, { capture: true });
      document.removeEventListener("submit", gonder, { capture: true });
    };
  }, []);

  return null;
}
