"use client";

import { useEffect, useRef, useState } from "react";
import Logo from "@/components/shared/Logo";
import { RAPOR_SERH, raporAdresi, raporTarihi, type Rapor } from "@/lib/rapor";

/* ============================================================================
   /lab/rapor · ARAÇ ÇIKTISININ TASARIM ADAYLARI
   CSS: css/lab-rapor.css (.lrp-)

   18.09.2026 · Burak: "raporun tasarımı çok dosya gibi kokuyor ya sarmadı. şu
   bizim yeni funnel kurmuştuk ta sonunda teklif veriyordu ya ordaki bile daha
   iyi duruyordu … bana 3 tane tasarım oluştur bence göreyim."

   İlk hâl (components/rapor/RaporBelge.tsx) bir "çıktı" gibiydi: ince çizgiler,
   küçük punto, form hissi. Üç aday da AYNI VERİYİ (lib/rapor.ts · Rapor)
   basıyor, değişen yalnız tipografi ve düzen:

     R1 · TEKLİF DİLİ   satış akışının teklif belgesinin dili: solda logo,
                        sağda künye, geniş başlık, gri sonuç kutusu, tablo.
     R2 · GECE KAPAK    üstte tam genişlik gece bant (logo + araç + tarih),
                        altında beyaz gövde; sonuç büyük ve mavi.
     R3 · EDİTORYAL     iki sütun: solda dar künye sütunu (tarih, adres,
                        kaynak), sağda geniş içerik; çok büyük başlık, az
                        çizgi.

   EKRANDA A4 ÖLÇÜSÜNDE: her aday 210×297 mm'lik gerçek bir sayfa; kap
   genişliğine göre ölçekleniyor (ResizeObserver). Yazdırma bu turda yok —
   önce hangi tasarımın seçileceği belli olacak, sonra o tasarım canlı
   şablona (RaporBelge) geçecek.
   ========================================================================= */

function A4({ children }: { children: React.ReactNode }) {
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
    <div ref={kap} className="lrp-kap" style={{ height: yukseklik }}>
      <div ref={sayfa} className="lrp-a4" style={{ "--lrp-olcek": olcek } as React.CSSProperties}>
        {children}
      </div>
    </div>
  );
}

/* Blokların ortak çizimi; üç adayda da aynı veri, farklı kabuk. */
function Bloklar({ r }: { r: Rapor }) {
  return (
    <>
      {r.bloklar.map((b, i) => {
        if (b.tip === "kunye") {
          return (
            <section key={i} className="lrp-blok">
              {b.baslik && <h2>{b.baslik}</h2>}
              <dl className="lrp-kunye">
                {b.satirlar.map((x) => (
                  <div key={x.k}>
                    <dt>{x.k}</dt>
                    <dd>{x.v}</dd>
                  </div>
                ))}
              </dl>
            </section>
          );
        }
        if (b.tip === "sonuc") {
          return (
            <section key={i} className="lrp-blok lrp-sonuc">
              <p className="lrp-sonuc-k">{b.baslik}</p>
              <p className="lrp-sonuc-d">{b.deger}</p>
              {b.alt && <p className="lrp-sonuc-a">{b.alt}</p>}
            </section>
          );
        }
        if (b.tip === "liste") {
          return (
            <section key={i} className="lrp-blok">
              <h2>{b.baslik}</h2>
              <ul className="lrp-liste">
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
            <section key={i} className="lrp-blok">
              <h2>{b.baslik}</h2>
              <table className="lrp-tablo">
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
            <section key={i} className="lrp-blok">
              <h2>{b.baslik}</h2>
              <ul className="lrp-liste">
                {b.satirlar.map((x) => (
                  <li key={x.ad}>
                    <b>{x.ad}</b>
                    <span>{x.deger}</span>
                  </li>
                ))}
              </ul>
            </section>
          );
        }
        return (
          <p key={i} className="lrp-not">
            {b.metin}
          </p>
        );
      })}
    </>
  );
}

/* ============================================================= R1 · TEKLİF */
export function RaporR1({ rapor }: { rapor: Rapor }) {
  const tarih = raporTarihi();
  return (
    <A4>
      <article className="lrp-belge" data-tur="r1">
        <header className="lrp-r1-bas">
          <span className="lrp-r1-logo">
            <Logo height={26} />
          </span>
          <div className="lrp-r1-kunye">
            <p className="lrp-r1-tur">{rapor.arac}</p>
            <p>
              <span>Tarih</span> {tarih}
            </p>
            <p>
              <span>Adres</span> {raporAdresi(rapor.yol)}
            </p>
          </div>
        </header>

        <h1 className="lrp-r1-h1">{rapor.baslik}</h1>
        {rapor.ozet && <p className="lrp-r1-ozet">{rapor.ozet}</p>}

        <Bloklar r={rapor} />

        <footer className="lrp-alt">
          <p>{RAPOR_SERH}</p>
          {rapor.kaynak && <p>{rapor.kaynak}</p>}
        </footer>
      </article>
    </A4>
  );
}

/* ========================================================= R2 · GECE KAPAK */
export function RaporR2({ rapor }: { rapor: Rapor }) {
  const tarih = raporTarihi();
  return (
    <A4>
      <article className="lrp-belge" data-tur="r2">
        <header className="lrp-r2-bas">
          <span className="lrp-r2-logo">
            <Logo height={24} />
          </span>
          <span className="lrp-r2-arac">{rapor.arac}</span>
          <span className="lrp-r2-tarih">{tarih}</span>
        </header>

        <div className="lrp-r2-govde">
          <h1 className="lrp-r2-h1">{rapor.baslik}</h1>
          {rapor.ozet && <p className="lrp-r2-ozet">{rapor.ozet}</p>}
          <Bloklar r={rapor} />
        </div>

        <footer className="lrp-alt" data-gri="">
          <p>
            Bu belge {tarih} itibarıyla hazırlanmıştır · {raporAdresi(rapor.yol)}
          </p>
          <p>{RAPOR_SERH}</p>
        </footer>
      </article>
    </A4>
  );
}

/* ========================================================= R3 · EDİTORYAL */
export function RaporR3({ rapor }: { rapor: Rapor }) {
  const tarih = raporTarihi();
  return (
    <A4>
      <article className="lrp-belge" data-tur="r3">
        <div className="lrp-r3-yan">
          <span className="lrp-r3-logo">
            <Logo height={22} />
          </span>
          <dl>
            <div>
              <dt>Araç</dt>
              <dd>{rapor.arac}</dd>
            </div>
            <div>
              <dt>Tarih</dt>
              <dd>{tarih}</dd>
            </div>
            <div>
              <dt>Adres</dt>
              <dd>{raporAdresi(rapor.yol)}</dd>
            </div>
            {rapor.kaynak && (
              <div>
                <dt>Kaynak</dt>
                <dd>{rapor.kaynak}</dd>
              </div>
            )}
          </dl>
          <p className="lrp-r3-serh">{RAPOR_SERH}</p>
        </div>

        <div className="lrp-r3-govde">
          <h1 className="lrp-r3-h1">{rapor.baslik}</h1>
          {rapor.ozet && <p className="lrp-r3-ozet">{rapor.ozet}</p>}
          <Bloklar r={rapor} />
        </div>
      </article>
    </A4>
  );
}
