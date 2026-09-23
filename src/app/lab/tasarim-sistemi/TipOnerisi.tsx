"use client";

import { useState } from "react";

import { SAHNE_BASAMAK, TIP_GRUPLAR } from "./tip";

/* Tipografi önerisi: Burak'ın gönderdiği örnekteki düzen (solda ad, ortada
   örnek, sağda ölçü), her satırın altında "şu an" ve "nerede". Örnek metin
   önerilen stille gerçekten basılıyor (satır içi stil: lab sayfası, öneri
   token'a dönüşmeden önce). Telefon düğmesi örnekleri mobil boya çekiyor. */
export default function TipOnerisi() {
  const [tel, setTel] = useState(false);
  const fmt = (n: number) => String(n).replace(".", ",");
  return (
    <main className="lds">
      <div className="lds-wrap">
        <p className="lds-kicker">Tasarım sistemi · 1 / 6</p>
        <h1 className="lds-h1">Tipografi önerisi</h1>
        <p className="lds-lead">
          Tek aile Poppins. Solda önerilen stil, altında bugün sitede ölçülen karşılıkları ve
          nerede kullanıldıkları. Onaylarsan bunlar token olur ve bütün site bunlara oturur.
        </p>
        <div className="lds-anahtar" role="group" aria-label="Boyut">
          <button type="button" aria-pressed={!tel} onClick={() => setTel(false)}>
            Bilgisayar
          </button>
          <button type="button" aria-pressed={tel} onClick={() => setTel(true)}>
            Telefon
          </button>
        </div>

        {TIP_GRUPLAR.map((g) => (
          <section key={g.baslik} className="lds-panel">
            <h2 className="lds-panel-t">{g.baslik}</h2>
            <p className="lds-panel-s">{g.aciklama}</p>
            <ul className="lds-satirlar">
              {g.satirlar.map((s) => {
                const px = tel ? s.m : s.d;
                return (
                  <li key={s.ad} className="lds-satir">
                    <span className="lds-ad">{s.ad}</span>
                    <div className="lds-ornek-k">
                      <p
                        className="lds-ornek"
                        style={{
                          fontSize: px,
                          fontWeight: s.fw,
                          lineHeight: s.lh,
                          letterSpacing: s.ls,
                        }}
                      >
                        {s.ornek}
                      </p>
                      <p className="lds-simdi">
                        <b>Şu an</b> {s.simdi}
                      </p>
                      <p className="lds-nerede">
                        <b>Nerede</b> {s.nerede}
                      </p>
                      {s.not && <p className="lds-not">{s.not}</p>}
                    </div>
                    <span className="lds-olcu">
                      {fmt(s.d)}
                      {s.m !== s.d && <em> / {fmt(s.m)}</em>}
                      <small>
                        {s.fw} · {fmt(s.lh)} · {s.ls === "0" ? "0" : s.ls}
                      </small>
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}

        <section className="lds-panel">
          <h2 className="lds-panel-t">Kalınlık ve harf aralığı</h2>
          <p className="lds-panel-s">
            Üç kalınlık: 400 metin, 600 kart başlığı · düğme · etiket, 700 büyük başlık ve rakam.
            Bugünkü 500 (127 yer), 650 (23), 550 ve 800 bunlara dağılıyor. Harf aralığı boyla
            azalıyor: 32 ve üstü −0,02em, 20–24 −0,01em, 16 ve altı 0, etiket +0,02em.
          </p>
          <div className="lds-agirlik">
            {[400, 600, 700].map((w) => (
              <span key={w} style={{ fontWeight: w }}>
                Aa <small>{w}</small>
              </span>
            ))}
          </div>
        </section>

        <section className="lds-panel">
          <h2 className="lds-panel-t">İllüstrasyon metni</h2>
          <p className="lds-panel-s">
            Hero kartlarının, sahnelerin, SVG kutuların içindeki yazılar hiyerarşiye girmiyor; onlar
            çizimin parçası. Yalnız aynı basamaklardan seçiyorlar:{" "}
            {SAHNE_BASAMAK.join(" · ")}. Bugün ölçülen: 30 · 13 · 12,5 · 12 · 11,5 · 11 · 10,5 ·
            10 · 9,5.
          </p>
        </section>

        <section className="lds-panel">
          <h2 className="lds-panel-t">Basamaklar</h2>
          <p className="lds-panel-s">
            Önerinin kullandığı boylar, senin listenle yan yana. Fazladan yalnız 18 (giriş
            cümlesi); telefonda 36, 32, 28, 24, 22.
          </p>
          <div className="lds-basamak">
            {[11, 12, 13, 14, 15, 16, 18, 20, 24, 32, 48, 64].map((n) => (
              <span key={n} data-ek={n === 18 ? "" : undefined}>
                <i style={{ fontSize: Math.min(n, 48) }}>Aa</i>
                {n}
              </span>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
