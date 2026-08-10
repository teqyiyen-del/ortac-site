"use client";

import { COUNTRY_ORDER, COUNTRY_NAME, FACTS } from "@/lib/brand";
import { Flag } from "@/components/shared/CountryPicker";
import { extraFor, type Need } from "@/components/lab/fiyatKart";
import { KartActs, KartLines, KartTot } from "@/components/lab/MaviKartParca";

/* ============================================================================
   LAB · ADAY 3 · "MAVİ KABUK" · ad alanı .mk3-

   FİKİR. Kart MARKA MAVİSİNDE — --blue-700 (#307fe2), üç aday içinde markanın
   kendi rengini büyük yüzeyde kullanan tek aday. Kabuğun üstünde yalnızca
   ülke adı ve rakam duruyor; kalem listesinin tamamı beyaz bir panele iniyor.

   NEDEN BÖYLE BÖLÜNDÜ — ÖLÇÜM ZORUNLU KILDI. #307fe2 üstünde beyaz metnin
   kontrastı 3.99:1. Bu sayı büyük yazı için yeterli (eşik 3:1) ama normal
   punto için değil (eşik 4.5:1) ve beyazdan daha açık bir renk yok, yani
   marka mavisinin üstünde 14 punto bir etiketi okunur yapmanın HİÇBİR YOLU
   yok. İki seçenek vardı: maviyi koyulaştırmak (.mk1 ve .mk2 bunu yapıyor)
   ya da küçük metni maviden çıkarmak. Bu aday ikincisini seçiyor.

   Kabukta duran iki şeyin ikisi de "büyük yazı" tanımına giriyor: ad 22px/700
   (18.66px kalın eşiğini geçiyor) ve rakam 36-50px/700. Bu iki puntonun
   düşürülmesi kartı erişilebilirlikten düşürür — dokunulmayacak.

   Süre (FACTS[c].days) kabukta DEĞİL panelde: 13 punto ve marka mavisinde
   hiçbir opaklıkta eşiği geçmiyor.

   NEYİ FEDA EDİYOR. İki yüzey iki dolgu demek: kart üçünün en uzunu. Beyaz
   panel ayrıca bölümün gece zeminini kırıyor — siyah bir bölümde üç beyaz
   dikdörtgen, canlı hâlin sessizliğinden en uzak duran öneri bu.

   HAREKET. Kabuğun üstünde DİKEY inip çıkan yumuşak bir ışık, 21.1 s. Yatay
   olsaydı .mk1 ile aynı hareket olurdu; üç adayın hareketi de birbirinden
   ayrılmalı ki müşteri hangisine baktığını hareketten de anlasın. Işık
   koyulaştırıyor, yani en kötü kare duruş karesinin ta kendisi.
   ========================================================================= */

export default function MaviKart3({ picked }: { picked: Need[] }) {
  return (
    <div className="mkx-cols">
      {COUNTRY_ORDER.map((c) => {
        const extra = extraFor(picked, c);
        return (
          <div key={c} className="mkx-card mk3-card">
            <span className="mk3-isik" aria-hidden="true" />

            <div className="mk3-shell">
              <div className="mkx-head">
                {/* Flag TUZAĞI: çıplak <svg viewBox="0 0 60 40">. Kap 26x18'de
                    sabit, svg yüzde yüze kilitli. */}
                <span className="mkx-flag" aria-hidden="true">
                  <Flag country={c} />
                </span>
                <h3 className="mk3-name">{COUNTRY_NAME[c]}</h3>
              </div>
              <KartTot
                total={FACTS[c].from + extra}
                extra={extra}
                deltaClass="mk3-delta"
              />
            </div>

            <div className="mk3-panel">
              {/* Süre burada, kabukta değil: 13 punto marka mavisinde hiçbir
                  opaklıkta 4.5:1'i geçmiyor. Beyaz panelde --text-600 ile
                  7:1. */}
              <div className="mk3-noterow">
                <p className="mkx-tot-note">
                  {extra > 0 ? "Seçtiklerinizle tahmini toplam" : "Kuruluş başlangıç tutarı"}
                </p>
                <span className="mkx-days">{FACTS[c].days}</span>
              </div>
              <KartLines c={c} picked={picked} />
              <KartActs c={c} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
