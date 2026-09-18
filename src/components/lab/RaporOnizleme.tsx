"use client";

import { useEffect, useRef, useState } from "react";
import RaporBelge from "@/components/rapor/RaporBelge";
import type { Rapor } from "@/lib/rapor";

/* ============================================================================
   /lab/rapor-araclar · TEK BİR RAPORUN A4 ÖNİZLEMESİ
   CSS: css/lab-rapor-arac.css (.lra-)

   Kâğıt GERÇEK ÖLÇÜDE kuruluyor (210 mm) ve kabına sığacak kadar
   küçültülüyor. Sebep: PDF'i belirleyen şey milimetre, ekran pikseli değil.
   Sayfayı ekran genişliğine göre kurup "yaklaşık" göstermek, satır
   kırılmalarını ve sayfa doluluğunu yalan söylerdi — bu tur tam olarak o iki
   şeye bakıyor.

   `transform: scale` düzeni etkilemediği için kabın yüksekliği elle
   veriliyor; ResizeObserver hem kabı hem kâğıdı izliyor, çünkü kâğıdın boyu
   içeriğe göre değişiyor (kısa raporlar daha kısa). */
export default function RaporOnizleme({ rapor }: { rapor: Rapor }) {
  const kap = useRef<HTMLDivElement>(null);
  const sayfa = useRef<HTMLDivElement>(null);
  const [olcek, setOlcek] = useState(1);
  const [yukseklik, setYukseklik] = useState<number | undefined>(undefined);

  useEffect(() => {
    const k = kap.current;
    const s = sayfa.current;
    if (!k || !s) return;
    const olc = () => {
      const o = Math.min(1, k.clientWidth / s.offsetWidth);
      setOlcek(o);
      setYukseklik(s.offsetHeight * o);
    };
    const ro = new ResizeObserver(olc);
    ro.observe(k);
    ro.observe(s);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={kap} className="lra-kap" style={{ height: yukseklik }}>
      <div
        ref={sayfa}
        className="lra-a4"
        style={{ "--lra-olcek": olcek } as React.CSSProperties}
      >
        <RaporBelge rapor={rapor} />
      </div>
    </div>
  );
}
