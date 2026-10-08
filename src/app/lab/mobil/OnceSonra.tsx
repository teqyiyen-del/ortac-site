"use client";

/* ÖNCE / SONRA · iki çerçeve, birlikte kayıyor (08.10.2026)
   Burak: "çok kasıyor böyle bakarken. Ekranı ikiye bölüp before after'lı bir
   şey açıyordu, ikisini de kaydırdıkça aynı kayıyordu."
   İlk hâl on öneriyi alt alta, yirmi çerçeveyle basıyordu (yirmi sayfa birden
   yükleniyordu). Şimdi aynı anda TEK öneri: solda bugünkü sayfa, sağda aynı
   sayfa ?mobil=yeni ile. Bir taraf kaç piksel kayarsa öteki de o kadar
   kayıyor (iki sayfa aynı kaynaktan, çerçevenin penceresine erişilebiliyor). */

import { useEffect, useRef, useState } from "react";

const ONERI: { ad: string; yol: string; git: string }[] = [
  { ad: "Hizmetler", yol: "/", git: ".hx-grid" },
  { ad: "Sektörler", yol: "/", git: ".skf-grid" },
  { ad: "Neden Ortac", yol: "/", git: ".bn" },
  { ad: "Serbest bölgeler", yol: "/dubai", git: ".dbe-bolgeler" },
  { ad: "Avantajlar", yol: "/dubai", git: ".advx" },
  { ad: "Dubai fiyat", yol: "/dubai", git: ".dfy-uc" },
  { ad: "KKTC ödeme", yol: "/kktc", git: ".cod" },
  { ad: "İngiltere ödeme", yol: "/ingiltere", git: ".cos-kutular" },
  { ad: "Blog", yol: "/blog", git: ".bh-list" },
  { ad: "Hakkımızda", yol: "/hakkimizda", git: ".ab-dy" },
];

export default function OnceSonra() {
  const [i, setI] = useState(0);
  const sol = useRef<HTMLIFrameElement>(null);
  const sag = useRef<HTMLIFrameElement>(null);
  const o = ONERI[i];
  const q = `git=${encodeURIComponent(o.git)}`;

  useEffect(() => {
    const cerceve = [sol.current, sag.current];
    const son = [0, 0];
    let kilit = -1;
    const temizle: (() => void)[] = [];
    const bagla = (k: number) => {
      const w = cerceve[k]?.contentWindow;
      const oteki = cerceve[1 - k]?.contentWindow;
      if (!w || !oteki) return;
      son[k] = w.scrollY;
      const dinle = () => {
        const fark = w.scrollY - son[k];
        son[k] = w.scrollY;
        /* öteki tarafın bizim yüzümüzden kaymasını geri yansıtma */
        if (kilit === k) {
          kilit = -1;
          return;
        }
        if (fark === 0) return;
        kilit = 1 - k;
        oteki.scrollBy(0, fark);
      };
      w.addEventListener("scroll", dinle, { passive: true });
      temizle.push(() => w.removeEventListener("scroll", dinle));
    };
    const yuklendi = [false, false];
    const hazir = (k: number) => () => {
      yuklendi[k] = true;
      /* sayfalar kendi bölümüne indikten sonra bağla (MobilDeneme · 700 ms) */
      if (yuklendi[0] && yuklendi[1]) window.setTimeout(() => [0, 1].forEach(bagla), 1200);
    };
    const h0 = hazir(0);
    const h1 = hazir(1);
    cerceve[0]?.addEventListener("load", h0);
    cerceve[1]?.addEventListener("load", h1);
    return () => {
      cerceve[0]?.removeEventListener("load", h0);
      cerceve[1]?.removeEventListener("load", h1);
      temizle.forEach((f) => f());
    };
  }, [i]);

  return (
    <main className="lmb">
      <div className="lmb-ust" role="group" aria-label="Öneri seç">
        {ONERI.map((x, k) => (
          <button key={x.ad} type="button" data-on={k === i ? "" : undefined} aria-pressed={k === i} onClick={() => setI(k)}>
            {x.ad}
          </button>
        ))}
      </div>
      <div className="lmb-ikili">
        <figure>
          <figcaption>
            Önce <span>· bugünkü hâl</span>
          </figcaption>
          <iframe key={`o${i}`} ref={sol} title={`${o.ad} önce`} src={`${o.yol}?${q}`} />
        </figure>
        <figure>
          <figcaption data-yeni="">
            Sonra <span>· öneri</span>
          </figcaption>
          <iframe key={`s${i}`} ref={sag} title={`${o.ad} sonra`} src={`${o.yol}?mobil=yeni&${q}`} />
        </figure>
      </div>
    </main>
  );
}
