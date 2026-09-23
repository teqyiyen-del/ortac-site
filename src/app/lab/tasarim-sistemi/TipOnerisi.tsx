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
        <p className="lds-kicker">Tasarım sistemi · 1 / 6 · canlı deneme: /ingiltere</p>
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
            Dört kalınlık: 400 metin; 500 düğme, çip, etiket, gezinme; 600 kart başlığı ve rakam;
            700 sayfa ve bölüm başlığı. 650, 550 ve 800 kalkıyor. Harf aralığı büyük başlıkta sıkı:
            h1 −%3, h2 −%2,5, h3 ve rakam −%2, h4 −%1, 18 ve altı 0, etiket +%2.
          </p>
          <div className="lds-agirlik">
            {[400, 500, 600, 700].map((w) => (
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
            Mantık: 12'den 20'ye +2, 20'den 32'ye +4, 32'den 48'e +8, sonra +16. Adım her iki
            basamakta ikiye katlanıyor; aynı işi gören iki boy arasında fark hep gözle seçilecek
            kadar (14/15 gibi ikili oluşmuyor). Hepsi kullanılmak zorunda değil; renkli olanlar
            kullanılıyor.
          </p>
          <div className="lds-basamak">
            {[12, 14, 16, 18, 20, 24, 28, 32, 40, 48, 64].map((n) => (
              <span key={n} data-ek={n === 28 ? "" : undefined}>
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
