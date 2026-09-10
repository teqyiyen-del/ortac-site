import { CalendarCheck, ChartColumn, Landmark, Stamp } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import { FaydaBas, KISA } from "@/components/lab/FaydaTur2";
import { ACCOUNTING_DUBAI } from "@/lib/accountingDubai";

/* /dubai/muhasebe · #fayda — BİRİNCİ TURDAN GERİYE KALAN TEK ADAY: F3 · Tek defter
   Biçim: src/app/css/lab-fayda.css · .fyt-

   F1 (Bento · .fyb-) ve F2 (Sahne · .fys-) İKİNCİ TURDA SİLİNDİ. Müşteri
   ikisini de seçmedi ve F3'ü işaret etti: "labda yaptığın kısımdan f3 ü biraz
   beğendim mesela ama sağdakilerin her birinde soldaki şey de değişebilir."
   F3 burada BAŞLANGIÇ NOKTASI olarak duruyor: ikinci turun üç adayı
   (FaydaTur2.tsx) neyin üstüne kurulduğunu göstersin diye.

   Başlık bloğu ve dört kısa cümle bu dosyada DEĞİL, FaydaTur2.tsx'te ve
   oradan okunuyor — dört aday da aynı metni bassın, ikinci bir kopya
   doğmasın. */

const G = ACCOUNTING_DUBAI.gains;

const IC = [CalendarCheck, ChartColumn, Landmark, Stamp] as const;

/* ============================================================================
   F3 · TEK DEFTER — tek büyük sahne + dört kısa satır

   Bölümün giriş cümlesi zaten bunu söylüyor: "Dördü de bir vaat değil, kaydın
   ay ay tutulmasının doğrudan sonucu." Yani dört kalem birbirinin EŞİ DEĞİL,
   AYNI SEBEBİN sonucu: sebep tek ve büyük, sonuçlar ondan dallanıyor.

   Hareket sitenin PAYLAŞILAN kalıbıyla (aktarim.css · .akt / .akt-durak):
   defter yanıyor, ışık dört dala sırayla geçiyor. Değerler lab-fayda.css'te.
   ========================================================================== */

/* dalların bitiş yükseklikleri ve ikonları — dört kalemle aynı sırada */
const DAL = [
  { y: 62, sinif: "fyt-b1" },
  { y: 122, sinif: "fyt-b2" },
  { y: 182, sinif: "fyt-b3" },
  { y: 242, sinif: "fyt-b4" },
] as const;

function DefterSahne() {
  return (
    <svg
      viewBox="0 0 340 300"
      className="fyt-svg akt fyt-akt"
      focusable="false"
      aria-hidden="true"
    >
      {/* defter — tek sebep */}
      <rect
        x="16"
        y="42"
        width="100"
        height="216"
        rx="16"
        className="svx-box akt-durak fyt-defter"
      />
      {Array.from({ length: 8 }, (_, i) => (
        <rect
          key={i}
          x="32"
          y={62 + i * 24}
          width={i % 2 === 0 ? 68 : 54}
          height="7"
          rx="3.5"
          className="svx-bar"
        />
      ))}
      {/* kaydın ay ay tutulması: defterin üstünden inen okuma çizgisi */}
      <rect x="24" y="54" width="84" height="2" rx="1" fill="#5c9eeb" className="fyt-tarama" />

      {DAL.map(({ y, sinif }) => (
        <path
          key={y}
          d={`M116 150 C 156 150, 166 ${y}, 206 ${y}`}
          fill="none"
          className={`svx-line akt-durak fyt-hat ${sinif}`}
        />
      ))}

      {DAL.map(({ y, sinif }, i) => {
        const Icon = IC[i];
        return (
          <g key={y}>
            <rect
              x="206"
              y={y - 24}
              width="118"
              height="48"
              rx="14"
              className={`svx-box akt-durak fyt-nod ${sinif}`}
            />
            <Icon
              x={222}
              y={y - 11}
              width={22}
              height={22}
              strokeWidth={1.9}
              className="svx-ic-b"
            />
            <rect x="256" y={y - 3} width="52" height="6" rx="3" className="svx-bar" />
          </g>
        );
      })}
    </svg>
  );
}

export function FaydaDefter() {
  return (
    <section className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <FaydaBas />
        <div className="fyt">
          <FadeUp className="fyt-card" delay={0.06}>
            <div className="fyt-stage" aria-hidden="true">
              <DefterSahne />
            </div>
          </FadeUp>

          <div className="fyt-list">
            {G.items.map((g, i) => {
              const Icon = IC[i];
              return (
                <FadeUp key={g.title} delay={0.12 + i * 0.05}>
                  <div className="fyt-row">
                    <span className="fyt-ic" aria-hidden="true">
                      <Icon size={15} strokeWidth={2.1} />
                    </span>
                    <h3 className="fyt-t">{g.title}</h3>
                    <p className="fyt-p">{KISA[i]}</p>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
