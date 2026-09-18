import Logo from "@/components/shared/Logo";
import { RAPOR_SERH, raporAdresi, raporTarihi, type Rapor } from "@/lib/rapor";

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
      <header className="rap-bas">
        <span className="rap-logo">
          <Logo height={20} />
        </span>
        <span className="rap-arac">{rapor.arac}</span>
        <span className="rap-tarih">{tarih}</span>
      </header>

      <h1 className="rap-h1">{rapor.baslik}</h1>
      {rapor.ozet && <p className="rap-ozet">{rapor.ozet}</p>}

      {rapor.bloklar.map((b, i) => {
        if (b.tip === "kunye") {
          return (
            <section key={i} className="rap-blok">
              {b.baslik && <h2>{b.baslik}</h2>}
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
              <h2>{b.baslik}</h2>
              <p className="rap-sonuc-d">{b.deger}</p>
              {b.alt && <p className="rap-sonuc-a">{b.alt}</p>}
            </section>
          );
        }
        if (b.tip === "liste") {
          return (
            <section key={i} className="rap-blok">
              <h2>{b.baslik}</h2>
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
              <h2>{b.baslik}</h2>
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
