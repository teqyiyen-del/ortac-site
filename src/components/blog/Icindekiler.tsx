"use client";

/* İÇİNDEKİLER (09.10.2026)
   Burak: "içindekiler çok karışık, kalabalık, okunmuyor; daha küçük
   yazabilirsin." Bir tur Piktram'ın blogundaki numaralı daireli, kesik
   çizgili kalıp kopyalandı; Burak: "aynısını niye çaldın, Ortac'ın öyle bir
   tarzı yok." Geri alındı. Şimdi sitenin kendi dili: kutusuz düz liste, mavi
   iki haneli numara (01, 02 …; sitede adım numaraları hep böyle), 14 px
   yazı, okunan bölüm koyu. Kopyala düğmesi de kalktı.

   Etkin bölüm IntersectionObserver ile; betik çalışmazsa liste yine tam. */
import { useEffect, useState } from "react";

export default function Icindekiler({ maddeler }: { maddeler: { id: string; text: string }[] }) {
  const [etkin, setEtkin] = useState<string | null>(null);

  useEffect(() => {
    const basliklar = maddeler
      .map((m) => document.getElementById(m.id))
      .filter((x): x is HTMLElement => x !== null);
    if (basliklar.length === 0) return;
    const io = new IntersectionObserver(
      (kayitlar) => {
        for (const k of kayitlar) if (k.isIntersecting) setEtkin(k.target.id);
      },
      { rootMargin: "-15% 0px -70% 0px" },
    );
    basliklar.forEach((b) => io.observe(b));
    return () => io.disconnect();
  }, [maddeler]);

  return (
    <nav className="bp-toc" aria-label="İçindekiler">
      <p className="bp-toc-h">İçindekiler</p>
      <ol>
        {maddeler.map((m, i) => (
          <li key={m.id} data-etkin={etkin === m.id ? "" : undefined}>
            <a href={`#${m.id}`} aria-current={etkin === m.id ? "location" : undefined}>
              <span className="bp-toc-n" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              {m.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
