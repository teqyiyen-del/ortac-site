import {
  BadgeCheck,
  CalendarDays,
  FileText,
  Info,
  ListChecks,
  ListOrdered,
  MessageSquareText,
  Percent,
  type LucideIcon,
} from "lucide-react";
import Logo from "@/components/shared/Logo";
import { Flag } from "@/components/shared/CountryPicker";
import { RAPOR_SERH, raporAdresi, raporTarihi, type Rapor, type RaporIkon } from "@/lib/rapor";

/* 18.09.2026 · ÖLÇÜLÜ SÜS. Burak üç tasarım adayını gördükten sonra: "senin
   önceki daha iyiymiş … biraz icon ve ülke bayrağı ile süsleyebilirsin
   aslında derdim oydu … ama bokunu çıkartma." Düzen değişmedi; eklenen iki
   şey: blok başlığının yanında 14 px ikon ve ülke sıralamasında bayrak.
   Kural: ikon YALNIZ blok başlığında (gövdede, satırlarda, altbilgide yok). */
const IKON: Record<RaporIkon, LucideIcon> = {
  siralama: ListOrdered,
  cevap: MessageSquareText,
  sonuc: BadgeCheck,
  liste: ListChecks,
  takvim: CalendarDays,
  hesap: Percent,
  belge: FileText,
  uyari: Info,
};

/* Blok başlığı: ikon varsa solunda. */
function BlokBaslik({ ikon, children }: { ikon?: RaporIkon; children: React.ReactNode }) {
  const Ikon = ikon ? IKON[ikon] : null;
  return (
    <h2>
      {Ikon && (
        <span className="rap-ikon" aria-hidden="true">
          <Ikon size={14} strokeWidth={2} />
        </span>
      )}
      {children}
    </h2>
  );
}

/* ============================================================================
   RAPOR BELGESİ — bütün araç çıktılarının tek şablonu
   Model: lib/rapor.ts · CSS: css/rapor.css (.rap-)

   18.09.2026 · ilk kullanan /uygunluk-testi.

   EKRANDA GÖRÜNMÜYOR, YAZDIRMADA GÖRÜNÜYOR. Belge sayfanın içinde duruyor
   ama `display: none`; yazdırma kipinde sayfadaki her şey gizlenip yalnız bu
   düğüm basılıyor (css/rapor.css · @media print). Gerekçe: ayrı bir pencere
   ya da sunucu turu olmadan, "PDF olarak kaydet" ile indirilebilen bir belge
   çıkıyor. Aynı yol satış akışı demosunda ölçülmüştü (tek sayfa A4).

   ŞABLON TEK: kapak bandı (logo + araç adı + tarih), başlık, özet cümlesi,
   bloklar, altbilgi (tarih + adres + şerh). Araçlar yalnız `Rapor` modelini
   dolduruyor; buraya araç adı yazılmıyor.

   BASILI RENK: gövde siyah beyaz üstünde. Marka mavisi yalnız kapak
   şeridinde ve blok başlıklarının çizgisinde; yazıcıda renk tasarrufu olan
   kullanıcıda da belge okunur kalıyor (griye düşüyor). */
export default function RaporBelge({ rapor }: { rapor: Rapor }) {
  const tarih = raporTarihi();
  return (
    <article className="rap-belge" aria-hidden="true">
      {/* Başlık teklif belgesinin diliyle (css/rapor.css · "başlık" notu):
          solda logo, sağda sağa yaslı künye. Logo 20 → 26 px: tek satırlık
          şeritte etiket gibi duruyordu, künye bloğunun karşısında belgenin
          sahibi gibi durması gerekiyor. */}
      <header className="rap-bas">
        <span className="rap-logo">
          <Logo height={26} />
        </span>
        <span className="rap-kim">
          <span className="rap-arac">{rapor.arac}</span>
          <span className="rap-tarih">
            Tarih <b>{tarih}</b>
          </span>
        </span>
      </header>

      <h1 className="rap-h1">{rapor.baslik}</h1>
      {rapor.ozet && <p className="rap-ozet">{rapor.ozet}</p>}

      {rapor.bloklar.map((b, i) => {
        if (b.tip === "kunye") {
          return (
            <section key={i} className="rap-blok">
              {b.baslik && <BlokBaslik ikon={b.ikon}>{b.baslik}</BlokBaslik>}
              <dl className="rap-kunye">
                {b.satirlar.map((r) => (
                  <div key={r.k}>
                    <dt>{r.k}</dt>
                    <dd>{r.v}</dd>
                  </div>
                ))}
              </dl>
            </section>
          );
        }
        if (b.tip === "sonuc") {
          return (
            <section key={i} className="rap-blok rap-sonuc">
              <BlokBaslik ikon={b.ikon}>{b.baslik}</BlokBaslik>
              <p className="rap-sonuc-d">{b.deger}</p>
              {b.alt && <p className="rap-sonuc-a">{b.alt}</p>}
            </section>
          );
        }
        if (b.tip === "liste") {
          return (
            <section key={i} className="rap-blok">
              <BlokBaslik ikon={b.ikon}>{b.baslik}</BlokBaslik>
              <ul className="rap-liste">
                {b.maddeler.map((m) => (
                  <li key={m.t}>
                    <b>{m.t}</b>
                    {m.d && <span>{m.d}</span>}
                  </li>
                ))}
              </ul>
            </section>
          );
        }
        if (b.tip === "tablo") {
          return (
            <section key={i} className="rap-blok">
              <BlokBaslik ikon={b.ikon}>{b.baslik}</BlokBaslik>
              <table className="rap-tablo">
                <thead>
                  <tr>
                    {b.basliklar.map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {b.satirlar.map((satir) => (
                    <tr key={satir.join("·")}>
                      {satir.map((h, j) => (
                        <td key={j}>{h}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          );
        }
        if (b.tip === "sira") {
          return (
            <section key={i} className="rap-blok">
              <BlokBaslik ikon={b.ikon}>{b.baslik}</BlokBaslik>
              <ol className="rap-sira">
                {b.satirlar.map((x, j) => (
                  <li key={x.ad} data-ilk={j === 0 ? "" : undefined}>
                    <span className="rap-sira-n">{j + 1}</span>
                    {x.ulke && (
                      <span className="rap-bayrak" aria-hidden="true">
                        <Flag country={x.ulke} />
                      </span>
                    )}
                    <span className="rap-sira-ad">{x.ad}</span>
                    <span className="rap-sira-d">{x.deger}</span>
                  </li>
                ))}
              </ol>
            </section>
          );
        }
        return (
          <p key={i} className="rap-not">
            {b.metin}
          </p>
        );
      })}

      <footer className="rap-alt">
        <p className="rap-alt-1">
          Bu belge {tarih} itibarıyla hazırlanmıştır · {raporAdresi(rapor.yol)}
        </p>
        {rapor.kaynak && <p className="rap-alt-2">Kaynak: {rapor.kaynak}</p>}
        <p className="rap-alt-2">{RAPOR_SERH}</p>
      </footer>
    </article>
  );
}
