"use client";

import { COUNTRY_ORDER, FACTS } from "@/lib/brand";
import { extraFor, type Need } from "@/components/lab/fiyatKart";
import { KartActs, KartHead, KartLines, KartTot } from "@/components/lab/MaviKartParca";

/* ============================================================================
   LAB · ADAY 1 · "TAM MAVİ KART" · ad alanı .mk1-

   FİKİR. Kartın tamamı mavi. Müşterinin cümlesinin ("fiyatlar mavi cardların
   üzerinden olabilir") en doğrudan okuması: mavi olan şey kartın kendisi,
   fiyat da onun üstünde.

   RENK BİR TERCİH DEĞİL, ÖLÇÜMÜN SONUCU. Marka mavisi --blue-700 (#307fe2)
   üstüne beyaz metin 3.99:1 veriyor; normal punto eşiği 4.5:1, yani kalem
   etiketleri düşüyordu. Kart --blue-900'e (#1b56a8) indirildi ve beyaz
   7.13:1'e çıktı. Bedeli açık: bu artık markanın mavisi değil, koyu tonu.

   NEYİ FEDA EDİYOR. Canlı hâlde rakam doğrudan siyahın üstünde duruyor ve
   bölümün tamamı "rakam" diye okunuyor (bölümün kendi notu: "no cards — the
   figure carries the block"). Kart geldiğinde rakam bir kutuya giriyor, yani
   ağırlık merkezi rakamdan kutuya kayıyor. Üç adayın bu bedeli en çok ödeyeni
   bu.

   HAREKET. Kartın üst kenarında git gel eden 2 piksellik bir ışık, 17.9 s.
   Ülke bölümündeki mekikle aynı dil — iki bölüm birbirinin akrabası gibi
   okunsun diye. Işık hiçbir metnin arkasında olmadığı için beyaz olabiliyor.
   ========================================================================= */

export default function MaviKart1({ picked }: { picked: Need[] }) {
  return (
    <div className="mkx-cols">
      {COUNTRY_ORDER.map((c) => {
        const extra = extraFor(picked, c);
        return (
          <div key={c} className="mkx-card mk1-card">
            <span className="mk1-isik" aria-hidden="true" />
            <KartHead c={c} />
            <KartTot total={FACTS[c].from + extra} extra={extra} />
            <p className="mkx-tot-note">
              {extra > 0 ? "Seçtiklerinizle tahmini toplam" : "Kuruluş başlangıç tutarı"}
            </p>
            <KartLines c={c} picked={picked} />
            <KartActs c={c} />
          </div>
        );
      })}
    </div>
  );
}
