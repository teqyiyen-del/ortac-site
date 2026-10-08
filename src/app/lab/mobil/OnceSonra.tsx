"use client";

/* ÖNCE / SONRA · iki çerçeve, birlikte kayıyor (08.10.2026)
   Burak: "ekranı ikiye bölüp before after'lı bir şey açıyordu, ikisini de
   kaydırdıkça aynı kayıyordu." Solda bugünkü sayfa, sağda aynı sayfa
   ?mobil=yeni ile (css/mobil-deneme.css, mobil/Mini, lib/mobilKisa).

   ÜÇÜNCÜ TUR: seçici artık BÖLÜM değil SAYFA (telefon elden geçirmesi bütün
   sayfayı değiştiriyor). İki taraf artık aynı boyda değil (yeni hâl kısa),
   o yüzden eşleme piksel piksel değil BAŞLIK BAŞLIK: bir tarafta hangi
   bölüm başlığının yüzde kaçındaysanız öteki taraf aynı başlığın aynı
   yüzdesine gidiyor. İki sayfada bölüm başlıkları (h2) aynı ve aynı sırada. */

import { useEffect, useRef, useState } from "react";

const SAYFA: { ad: string; yol: string }[] = [
  { ad: "Ana sayfa", yol: "/" },
  { ad: "Dubai", yol: "/dubai" },
  { ad: "KKTC", yol: "/kktc" },
  { ad: "İngiltere", yol: "/ingiltere" },
  { ad: "Dubai muhasebe", yol: "/dubai/muhasebe" },
  { ad: "Dubai banka", yol: "/dubai/banka-hesabi" },
  { ad: "Dubai vize", yol: "/dubai/oturum-vize" },
  { ad: "Dubai vergi", yol: "/dubai/vergi" },
  { ad: "KKTC muhasebe", yol: "/kktc/muhasebe" },
  { ad: "Hakkımızda", yol: "/hakkimizda" },
  { ad: "İletişim", yol: "/iletisim" },
  { ad: "Ülkeler", yol: "/ulkeler" },
  { ad: "Sektör", yol: "/sektorler/e-ticaret" },
  { ad: "Araçlar", yol: "/araclar" },
  { ad: "Blog", yol: "/blog" },
  { ad: "İş ortaklığı", yol: "/is-ortakligi" },
];

/* sayfanın çapaları: en üst, her bölüm başlığı, en alt */
function capalar(w: Window): number[] {
  const d = w.document;
  const ust = [...d.querySelectorAll<HTMLElement>("main h2")]
    .filter((h) => h.offsetParent !== null)
    .map((h) => h.getBoundingClientRect().top + w.scrollY - 90);
  const son = Math.max(0, d.documentElement.scrollHeight - w.innerHeight);
  const temiz = ust.filter((y, i) => y > 0 && y < son && (i === 0 || y > ust[i - 1]));
  return [0, ...temiz, son];
}

export default function OnceSonra() {
  const [i, setI] = useState(0);
  const [boy, setBoy] = useState<[number, number] | null>(null);
  const sol = useRef<HTMLIFrameElement>(null);
  const sag = useRef<HTMLIFrameElement>(null);
  const o = SAYFA[i];

  useEffect(() => {
    const cerceve = [sol.current, sag.current];
    const beklenen = [-1, -1];
    const temizle: (() => void)[] = [];
    let zaman = 0;
    const bagla = (k: number) => {
      const w = cerceve[k]?.contentWindow;
      const oteki = cerceve[1 - k]?.contentWindow;
      if (!w || !oteki) return;
      const dinle = () => {
        /* öteki tarafın bizim yüzümüzden kaymasını geri yansıtma */
        if (beklenen[k] >= 0 && Math.abs(w.scrollY - beklenen[k]) < 3) return;
        beklenen[k] = -1;
        const a = capalar(w);
        const b = capalar(oteki);
        if (a.length !== b.length) {
          /* başlık sayısı tutmuyorsa (beklenmez) oranla eşle */
          const hedef = (w.scrollY / Math.max(1, a[a.length - 1])) * b[b.length - 1];
          beklenen[1 - k] = hedef;
          oteki.scrollTo(0, hedef);
          return;
        }
        let n = 0;
        while (n < a.length - 2 && w.scrollY >= a[n + 1]) n++;
        const pay = (w.scrollY - a[n]) / Math.max(1, a[n + 1] - a[n]);
        const hedef = Math.round(b[n] + Math.min(1, Math.max(0, pay)) * (b[n + 1] - b[n]));
        beklenen[1 - k] = hedef;
        oteki.scrollTo(0, hedef);
      };
      w.addEventListener("scroll", dinle, { passive: true });
      temizle.push(() => w.removeEventListener("scroll", dinle));
    };
    const yuklendi = [false, false];
    const hazir = (k: number) => () => {
      yuklendi[k] = true;
      if (!(yuklendi[0] && yuklendi[1])) return;
      zaman = window.setTimeout(() => {
        [0, 1].forEach(bagla);
        const h = cerceve.map((c) => c?.contentDocument?.documentElement.scrollHeight ?? 0);
        setBoy([h[0], h[1]]);
      }, 1500);
    };
    const h0 = hazir(0);
    const h1 = hazir(1);
    cerceve[0]?.addEventListener("load", h0);
    cerceve[1]?.addEventListener("load", h1);
    /* Çerçeveler sunucudan gelen HTML'de: yayında sayfa, React bu etkiyi
       çalıştırmadan ÖNCE yüklenmiş olabiliyor ve "load" bir daha gelmiyor
       (yayında eşleme çalışmıyordu, geliştirme sunucusunda çalışıyordu).
       Zaten yüklenmiş çerçeve elle "hazır" sayılıyor. */
    cerceve.forEach((c, k) => {
      try {
        const d = c?.contentDocument;
        if (d && d.readyState === "complete" && c?.contentWindow?.location.href !== "about:blank") hazir(k)();
      } catch {
        /* erişilemiyorsa load olayını bekle */
      }
    });
    return () => {
      window.clearTimeout(zaman);
      cerceve[0]?.removeEventListener("load", h0);
      cerceve[1]?.removeEventListener("load", h1);
      temizle.forEach((f) => f());
    };
  }, [i]);

  const ekran = (px: number) => (px / 812).toFixed(1).replace(".", ",");

  return (
    <main className="lmb">
      <div className="lmb-ust" role="group" aria-label="Sayfa seç">
        {SAYFA.map((x, k) => (
          <button
            key={x.yol}
            type="button"
            data-on={k === i ? "" : undefined}
            aria-pressed={k === i}
            onClick={() => {
              setBoy(null);
              setI(k);
            }}
          >
            {x.ad}
          </button>
        ))}
      </div>
      <div className="lmb-ikili">
        <figure>
          <figcaption>
            Önce <span>· eski düzen{boy ? ` · ${ekran(boy[0])} ekran` : ""}</span>
          </figcaption>
          <iframe key={`o${i}`} ref={sol} title={`${o.ad} önce`} src={`${o.yol}?mobil=eski`} />
        </figure>
        <figure>
          <figcaption data-yeni="">
            Sonra <span>· canlıdaki düzen{boy ? ` · ${ekran(boy[1])} ekran` : ""}</span>
          </figcaption>
          <iframe key={`s${i}`} ref={sag} title={`${o.ad} sonra`} src={`${o.yol}?mobil=yeni`} />
        </figure>
      </div>
    </main>
  );
}
