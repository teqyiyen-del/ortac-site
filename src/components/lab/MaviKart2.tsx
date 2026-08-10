"use client";

import { COUNTRY_ORDER, FACTS } from "@/lib/brand";
import { extraFor, type Need } from "@/components/lab/fiyatKart";
import { KartActs, KartHead, KartLines, KartTot } from "@/components/lab/MaviKartParca";

/* ============================================================================
   LAB · ADAY 2 · "MAVİ PLAKA" · ad alanı .mk2-

   FİKİR. Kart koyu kalıyor (siteyle aynı gece yüzeyi, --night-2), mavi olan
   yalnızca rakamın oturduğu plaka. Müşterinin cümlesini en dar okuyan aday:
   mavi olan şey FİYATIN KENDİSİ, kartın tamamı değil.

   KONTRAST BURADA RAHAT. Plaka --blue-800 (#2468c4) ve üstündeki beyaz 5.45:1,
   yani normal punto bile geçiyor. Küçük metnin çoğu zaten koyu gövdede
   (#111 üstünde 6:1 ve üzeri). Üç aday içinde tasarımı kontrast yüzünden en az
   bükülmüş olanı.

   NEYİ FEDA EDİYOR. En az "mavi kart" olan aday bu. Müşteri kartın kendisinin
   mavi olmasını kastettiyse bu cevap eksik kalır. Buna karşılık bölümün gece
   kimliği bozulmuyor: siyah bölümde üç koyu kart ve üç mavi plaka, canlı hâle
   en yakın duran düzen.

   HAREKET. Plakanın içinde yatay olarak sürüklenen yumuşak bir ışık, 19.1 s.
   Işık KOYULAŞTIRIYOR (--blue-900 tonunda), açmıyor: açan bir ışık beyaz
   metnin arkasındaki zemini aydınlatır ve en kötü kare kontrast eşiğinin
   altına inebilirdi. Koyulaşan ışıkta en kötü kare duruş karesinin ta
   kendisi, yani ölçülen 5.45:1 tur boyunca geçerli.
   ========================================================================= */

export default function MaviKart2({ picked }: { picked: Need[] }) {
  return (
    <div className="mkx-cols">
      {COUNTRY_ORDER.map((c) => {
        const extra = extraFor(picked, c);
        return (
          <div key={c} className="mkx-card mk2-card">
            <div className="mk2-plate">
              <span className="mk2-isik" aria-hidden="true" />
              <div className="mk2-plate-in">
                <KartHead c={c} />
                <KartTot total={FACTS[c].from + extra} extra={extra} />
              </div>
            </div>

            {/* Not plakanın DIŞINDA ve bu bir ölçüm kararı: 12.5px sönük beyaz
                metin --blue-800 üstünde 2.83:1 veriyordu (eşik 4.5:1). Koyu
                gövdede aynı renk 6.38:1. Metni okunur yapmanın yolu onu
                aydınlatmak değil, doğru zemine koymak. */}
            <div className="mk2-body">
              <p className="mkx-tot-note">
                {extra > 0 ? "Seçtiklerinizle tahmini toplam" : "Kuruluş başlangıç tutarı"}
              </p>
              <KartLines c={c} picked={picked} />
              <KartActs c={c} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
