"use client";

/* İÇİNDEKİLER · "Bu yazıda" (09.10.2026, dördüncü tur)
   Burak: "içindekiler kısmı bizde çok karışık, kalabalık, okunmuyor; belki
   daha küçük yazabilirsin" ve Piktram'ın blogundaki kalıbı örnek gösterdi:
   numaralı daireler, aralarında kesik çizgi, okunan bölüm dolu daire.
   Kutu ve zemin kalktı; yazı 14 px, satırlar tek tek ayrışıyor.

   Etkin bölüm IntersectionObserver ile: ekranın üst üçte birine giren son
   başlık. Betik çalışmazsa liste yine tam ve tıklanır (yalnız vurgu olmaz).
   "Bağlantıyı kopyala" sayfanın adresini panoya yazar. */
import { useEffect, useState } from "react";
import { Check, Link2 } from "lucide-react";

export default function Icindekiler({ maddeler }: { maddeler: { id: string; text: string }[] }) {
  const [etkin, setEtkin] = useState<string | null>(null);
  const [kopya, setKopya] = useState(false);

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
    <nav className="bp-toc" aria-label="Bu yazıda">
      <p className="bp-toc-h">Bu yazıda</p>
      <ol>
        {maddeler.map((m, i) => (
          <li key={m.id} data-etkin={etkin === m.id ? "" : undefined}>
            <a href={`#${m.id}`} aria-current={etkin === m.id ? "location" : undefined}>
              <span className="bp-toc-n" aria-hidden="true">
                {i + 1}
              </span>
              {m.text}
            </a>
          </li>
        ))}
      </ol>
      <button
        type="button"
        className="bp-toc-kopya"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(window.location.href.split("#")[0]);
            setKopya(true);
            window.setTimeout(() => setKopya(false), 2500);
          } catch {
            /* pano kapalı: düğme sessiz kalır */
          }
        }}
      >
        {kopya ? <Check size={16} strokeWidth={2.4} aria-hidden="true" /> : <Link2 size={16} strokeWidth={2.2} aria-hidden="true" />}
        {kopya ? "Kopyalandı" : "Bağlantıyı kopyala"}
      </button>
    </nav>
  );
}
