"use client";

import { useState } from "react";
import MaviKart1 from "@/components/lab/MaviKart1";
import MaviKart2 from "@/components/lab/MaviKart2";
import MaviKart3 from "@/components/lab/MaviKart3";
import { NEEDS, type NeedKey } from "@/components/lab/fiyatKart";

/* ============================================================================
   LAB · mavi kart turu — SEÇİCİ VE ÜÇ ADAY

   SEÇİCİ NEDEN TEK VE NEDEN ÜSTTE. Canlı bölümde ihtiyaç seçici bölümün
   içinde, üç sütunun üstünde duruyor. Labda üç aday var ve her birine ayrı
   seçici konsaydı müşteri aynı kalemi üç kez açmak zorunda kalır, üç kartı
   aynı durumda görmek için de bunu unutmaması gerekirdi. Tek seçici üçünü
   birden sürüyor: bir kaleme basıldığında üç tasarımın da nasıl uzadığı,
   rakamların nasıl döndüğü aynı anda görünüyor.

   DURUM BURADA, KARTLARDA DEĞİL. Üç aday saf sunum: seçili kalemleri prop
   olarak alıyorlar, kendi durumları yok. Böylece bir aday seçilip canlıya
   alındığında taşınacak şey yalnızca kartın kendisi oluyor.

   Künyeler (n1 · n2 · n3) sunucuda basılıp prop olarak geliyor: lab sayfasının
   düzyazısı sayfada kalsın, bu dosya yalnızca durumu taşısın.
   ========================================================================= */

export default function MaviKartLab({
  n1,
  n2,
  n3,
}: {
  n1: React.ReactNode;
  n2: React.ReactNode;
  n3: React.ReactNode;
}) {
  const [on, setOn] = useState<Record<NeedKey, boolean>>({
    banka: false,
    muhasebe: false,
    vize: false,
  });

  const toggle = (k: NeedKey) => setOn((s) => ({ ...s, [k]: !s[k] }));
  const picked = NEEDS.filter((n) => on[n.key]);

  return (
    <>
      <section className="sec-pad sec-night" style={{ paddingBlock: 40 }}>
        <div className="container-o">
          <div className="mkx-needs">
            <span className="mkx-needs-q">Kuruluşa ek olarak:</span>
            <div className="mkx-chips">
              {NEEDS.map((n) => {
                const Icon = n.icon;
                return (
                  <button
                    key={n.key}
                    type="button"
                    className="mkx-chip"
                    data-on={on[n.key]}
                    aria-pressed={on[n.key]}
                    onClick={() => toggle(n.key)}
                  >
                    <Icon size={16} strokeWidth={2.1} />
                    {n.chip}
                  </button>
                );
              })}
            </div>
          </div>
          {/* Rakamlar sayfa kaymadan değişiyor: ekran okuyucuya bir kez
              duyuruluyor, üç kart için üç kez değil. Canlı bölümde de aynı
              satır var ve orada da tek. */}
          <p className="sr-only" aria-live="polite">
            {picked.length
              ? `Seçili kalemler: ${picked.map((n) => n.chip).join(", ")}`
              : "Ek kalem seçili değil"}
          </p>
        </div>
      </section>

      {n1}
      <section className="sec-pad sec-night" style={{ paddingBlock: 44 }}>
        <div className="container-o">
          <MaviKart1 picked={picked} />
        </div>
      </section>

      {n2}
      <section className="sec-pad sec-night" style={{ paddingBlock: 44 }}>
        <div className="container-o">
          <MaviKart2 picked={picked} />
        </div>
      </section>

      {n3}
      <section className="sec-pad sec-night" style={{ paddingBlock: 44 }}>
        <div className="container-o">
          <MaviKart3 picked={picked} />
        </div>
      </section>
    </>
  );
}
