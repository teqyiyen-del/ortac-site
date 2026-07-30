import {
  BadgeCheck,
  Check,
  CreditCard,
  IdCard,
  Landmark,
  MapPin,
  MonitorSmartphone,
  Percent,
  Wallet,
  Zap,
  type LucideIcon,
} from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import ProSchema from "@/components/country/ProSchema";
import type { Pro } from "@/lib/countryContent";

/* Ülke avantajları — bento.
 *
 * Revizyon, üç değişiklik:
 *
 * 1. "Karşılığında" hücresi çıktı. Avantaj ızgarasının içinde duran bir uyarı
 *    listesi, bölümü iki başlı bırakıyordu: başlık "avantajları" diyor, en
 *    büyük hücrelerden biri tam tersini sayıyordu. Kalemler silinmedi
 *    (countryContent.watchouts duruyor), bu ızgaradan çıktı.
 *
 * 2. Dev hücre çıktı. Eski düzende ilk avantaj 7 sütun + 2 satırdı; Dubai'de
 *    bu "%0 kurumlar vergisi" kartına denk geliyordu ve ekranın yarısını tek
 *    başına kaplıyordu. Üstelik en şarta bağlı iddia en büyük yüzeyi alıyordu.
 *    Artık satırlar 5+7 ve 7+5 diye dönüşümlü kapanıyor: ritim var, şişkinlik
 *    yok, hiçbir kart diğerinden iki kat büyük değil.
 *
 * 3. Çizimler hareket ediyor. ProSchema'nın vektörleri aynı; akış çizgileri,
 *    nokta ve çubuklar artık kartın içinde sürekli düşük genlikli bir döngüde
 *    (CSS, .advx-fig altında). Bileşen sunucuda kalabilsin diye hareket
 *    JS değil CSS; prefers-reduced-motion hepsini durduruyor.
 */

const PRO_ICON: Record<string, LucideIcon> = {
  percent: Percent,
  bank: Landmark,
  id: IdCard,
  pin: MapPin,
  remote: MonitorSmartphone,
  wallet: Wallet,
  badge: BadgeCheck,
  card: CreditCard,
  zap: Zap,
};

const POSSESSIVE: Record<string, string> = {
  Dubai: "Dubai'nin",
  İngiltere: "İngiltere'nin",
  KKTC: "KKTC'nin",
};

/* Onikilik ızgara, dönüşümlü satırlar. Çift sayıda kart 5+7 / 7+5 olarak
   kapanıyor; üç kalırsa 4+4+4, bir kalırsa tam satır. Böylece ızgara hiçbir
   zaman delikle bitmiyor ve tek bir kart öne çıkmıyor. */
function spansFor(total: number): number[] {
  if (total <= 1) return [12];
  if (total === 3) return [4, 4, 4];

  const out: number[] = [];
  let left = total;
  let flip = false;
  while (left > 0) {
    if (left === 1) {
      out.push(12);
      left = 0;
    } else if (left === 3) {
      out.push(4, 4, 4);
      left = 0;
    } else {
      out.push(flip ? 7 : 5, flip ? 5 : 7);
      flip = !flip;
      left -= 2;
    }
  }
  return out;
}

/** yerleşim kararı: geniş kart yan yana okur, dar kart yukarıdan aşağı */
const rankFor = (span: number) => (span >= 7 ? "wide" : span === 4 ? "sm" : "mid");

export default function CountryPros({ name, pros }: { name: string; pros: Pro[] }) {
  const spans = spansFor(pros.length);
  const heading = `${POSSESSIVE[name] ?? `${name}'nin`} avantajları`;

  return (
    <section className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="sec-head">
          <SplitWords
            as="h2"
            text={heading}
            accent="avantajları"
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.2}>
            <p className="sec-lead">
              Bunlar ülkenin kendi sağladıkları. Şarta bağlı olan her madde şart
              rozetiyle işaretli.
            </p>
          </FadeUp>
        </div>

        <div className="advx">
          {pros.map((x, i) => {
            const span = spans[i] ?? 12;
            const rank = rankFor(span);
            const Icon = (x.icon && PRO_ICON[x.icon]) || Check;
            /* Koşul taşıyan iddia, koşulu kart başında da gösterir. Metnin
               kendisinden okunuyor (yıldızlı başlık ya da "şart" geçen cümle),
               ikon anahtarından değil: aynı ikonu kullanan koşulsuz bir
               avantaja rozet kaymasın. */
            const conditional = x.title.includes("*") || /şart/i.test(x.line);
            return (
              <FadeUp
                key={x.title}
                delay={0.12 + i * 0.07}
                y={18}
                className={`advx-cell advx-c${span}`}
              >
                <article className="advx-card" data-rank={rank}>
                  <div className="advx-body">
                    <div className="advx-head">
                      <span className="advx-ic" aria-hidden="true">
                        <Icon size={18} strokeWidth={2.1} />
                      </span>
                      {conditional && <span className="advx-chip">şarta bağlı</span>}
                    </div>
                    <h3 className="advx-t">{x.title}</h3>
                    <p className="advx-p">{x.line}</p>
                  </div>
                  {/* çizim üstündeki iddiayı tekrar eder, kendi başına bilgi
                      taşımaz — ekran okuyucuya görünmüyor */}
                  <figure className="advx-fig" aria-hidden="true">
                    <ProSchema kind={x.icon} brands={x.brands} />
                  </figure>
                </article>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
