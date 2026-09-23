"use client";

import { useState } from "react";

import { RENK_GRUPLAR } from "./renk";
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
        <p className="lds-kicker">
          Tasarım sistemi · 1 / 6 · canlı deneme: /ingiltere
        </p>
        <h1 className="lds-h1">Tipografi önerisi</h1>
        <p className="lds-lead">
          Tek aile Poppins. Solda önerilen stil, altında bugün sitede ölçülen
          karşılıkları ve nerede kullanıldıkları. Onaylarsan bunlar token olur
          ve bütün site bunlara oturur.
        </p>
        <div className="lds-anahtar" role="group" aria-label="Boyut">
          <button
            type="button"
            aria-pressed={!tel}
            onClick={() => setTel(false)}
          >
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
            Dört kalınlık: 400 metin; 500 düğme, çip, etiket, gezinme; 600 kart
            başlığı ve rakam; 700 sayfa ve bölüm başlığı. 650, 550 ve 800
            kalkıyor. Harf aralığı büyük başlıkta sıkı: h1 −%3, h2 −%2,5, h3 ve
            rakam −%2, h4 −%1, 18 ve altı 0, etiket +%2.
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
            Hero kartlarının, sahnelerin, SVG kutuların içindeki yazılar
            hiyerarşiye girmiyor; onlar çizimin parçası. Yalnız aynı
            basamaklardan seçiyorlar: {SAHNE_BASAMAK.join(" · ")}. Bugün
            ölçülen: 30 · 13 · 12,5 · 12 · 11,5 · 11 · 10,5 · 10 · 9,5.
          </p>
        </section>

        <h2 className="lds-blok" id="renk">
          Renk önerisi{" "}
          <small>
            2 / 6 · canlı deneme: /ingiltere · önce/sonra: /karsilastir
          </small>
        </h2>
        {RENK_GRUPLAR.map((g) => (
          <section key={g.baslik} className="lds-panel">
            <h2 className="lds-panel-t">{g.baslik}</h2>
            <p className="lds-panel-s">{g.aciklama}</p>
            <ul className="lds-renkler">
              {g.satirlar.map((r) => (
                <li key={r.token} className="lds-renk">
                  <span
                    className="lds-ornek-kutu"
                    data-koyu={r.koyu ? "" : undefined}
                    style={
                      r.yazi ? { color: r.deger } : { background: r.deger }
                    }
                  >
                    {r.yazi ? "Aa" : null}
                  </span>
                  <span className="lds-renk-ad">
                    <b>{r.token}</b>
                    <code>{r.deger}</code>
                  </span>
                  <span className="lds-renk-rol">
                    {r.rol}
                    {r.simdi && (
                      <small>
                        <b>Yerine geçtiği</b> {r.simdi}
                      </small>
                    )}
                  </span>
                  {r.kontrast && (
                    <span className="lds-kontrast">{r.kontrast}</span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
        <section className="lds-panel">
          <h2 className="lds-panel-t">Mavi düğme · karar</h2>
          <p className="lds-panel-s">
            Bugünkü mavide kalıyor (beyaz yazı 4,0:1). Koyulaştırma önerisi
            reddedildi; marka düğmesi kontrast kuralının bilinçli istisnası.
          </p>
          <div className="lds-dugmeler">
            <span style={{ background: "#307fe2" }}>Kurulumu Başlat</span>
          </div>
        </section>

        <h2 className="lds-blok" id="bosluk">
          Boşluk önerisi{" "}
          <small>
            3 / 6 · canlı deneme: /ingiltere · önce/sonra: /karsilastir
          </small>
        </h2>
        <section className="lds-panel">
          <h2 className="lds-panel-t">Ölçek</h2>
          <p className="lds-panel-s">
            4 px tabanlı. Bugün İngiltere sayfasında bile aralıkta 12, kart iç
            boşluğunda 11 farklı değer var (3, 9, 10, 11, 14, 18, 22, 26, 30, 34
            …). Hepsi bu basamaklara oturuyor.
          </p>
          <div className="lds-olcek">
            {[4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 112].map((n) => (
              <span key={n}>
                <i style={{ width: n, height: n }} />
                {n}
              </span>
            ))}
          </div>
        </section>
        <section className="lds-panel">
          <h2 className="lds-panel-t">Roller</h2>
          <ul className="lds-roller">
            {[
              ["8", "satır içi", "ikon ile yazı, çip sırası", "9 · 10 · 8"],
              [
                "12",
                "öğe",
                "başlık → açıklama, liste satırları, kart içi",
                "10 · 11 · 14",
              ],
              ["16", "kartlar arası", "kart ızgarası", "12 · 18"],
              [
                "24",
                "blok",
                "bölüm içinde iki blok, iki büyük kart arası",
                "20 · 28 · 32",
              ],
              [
                "48 / 32",
                "başlık → içerik",
                "bölüm başlığından içeriğe (telefon 32)",
                "48 (telefonda da 48)",
              ],
              [
                "112 · 112 · 80 · 64",
                "bölüm",
                "bölüm dikey boşluğu: masaüstü · laptop · tablet · telefon",
                "112 · 72",
              ],
              [
                "16 · 24 · 32",
                "kart iç boşluğu S · M · L",
                "satır kartı · standart kart · büyük panel (telefonda 16 · 20 · 24)",
                "14/16 · 16/18 · 20 · 22 · 26/28 · 30 · 34/36",
              ],
            ].map(([d, ad, rol, simdi]) => (
              <li key={ad}>
                <b>{d}</b>
                <span>
                  {ad}
                  <small>{rol}</small>
                </span>
                <em>
                  <strong>Yerine geçtiği</strong> {simdi}
                </em>
              </li>
            ))}
          </ul>
        </section>

        <h2 className="lds-blok" id="sekil">
          Şekil, bileşen, etkileşim{" "}
          <small>
            4-6 / 6 · canlı deneme: /ingiltere · önce/sonra: /karsilastir
          </small>
        </h2>
        <section className="lds-panel">
          <h2 className="lds-panel-t">Yarıçap</h2>
          <p className="lds-panel-s">
            Aynen kalıyor, yükseklik kuralıyla. Yeni yalnız 4 (küçük parça).
          </p>
          <div className="lds-kutular">
            {[
              ["4", 4],
              ["8", 8],
              ["12", 12],
              ["18", 18],
              ["28", 28],
              ["hap", 999],
            ].map(([ad, r]) => (
              <span key={ad}>
                <i style={{ borderRadius: r as number }} />
                {ad}
              </span>
            ))}
          </div>
        </section>
        <section className="lds-panel">
          <h2 className="lds-panel-t">Gölge</h2>
          <p className="lds-panel-s">
            64 farklı gölge üçe iniyor. Kart varsayılan gölgesiz.
          </p>
          <div className="lds-golgeler">
            <span
              style={{
                boxShadow:
                  "0 1px 2px rgba(0,0,0,.05), 0 8px 24px rgba(0,0,0,.06)",
              }}
            >
              shadow-card
            </span>
            <span
              style={{
                boxShadow:
                  "0 2px 4px rgba(0,0,0,.06), 0 16px 40px rgba(0,0,0,.1)",
              }}
            >
              shadow-float
            </span>
            <span style={{ boxShadow: "0 0 0 1px rgba(8,8,8,.12)" }}>ring</span>
          </div>
        </section>
        <section className="lds-panel">
          <h2 className="lds-panel-t">Düğme · ikon</h2>
          <p className="lds-panel-s">
            Düğme iki boy (52 · 40; bugün 5 yükseklik). İkon üç boy (16 · 20 ·
            24; bugün 11), çizgi 2 (bugün 10 kalınlık).
          </p>
          <div className="lds-bilesen">
            <span className="lds-btn" data-b="l">
              Kurulumu Başlat
            </span>
            <span className="lds-btn" data-b="s">
              Sayfayı aç
            </span>
            <span className="lds-btn" data-b="l" data-v="line">
              Fiyatları Gör
            </span>
            {[16, 20, 24].map((n) => (
              <span key={n} className="lds-ikon">
                <svg
                  width={n}
                  height={n}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                {n}
              </span>
            ))}
          </div>
        </section>
        <section className="lds-panel">
          <h2 className="lds-panel-t">Geçiş süresi</h2>
          <p className="lds-panel-s">
            15 süre üçe iniyor. Kutuların üstüne gelin.
          </p>
          <div className="lds-sureler">
            {[
              ["160 ms", "renk, zemin, kenar", "160ms"],
              ["240 ms", "açılma, kayma", "240ms"],
              ["480 ms", "bölüm açılışı", "480ms"],
            ].map(([ad, rol, d]) => (
              <span key={ad} style={{ transitionDuration: d }}>
                <b>{ad}</b>
                {rol}
              </span>
            ))}
          </div>
        </section>

        <section className="lds-panel">
          <h2 className="lds-panel-t">Basamaklar</h2>
          <p className="lds-panel-s">
            Mantık: 12&apos;den 20&apos;ye +2, 20&apos;den 32&apos;ye +4,
            32&apos;den 48&apos;e +8, sonra +16. Adım her iki basamakta ikiye
            katlanıyor; aynı işi gören iki boy arasında fark hep gözle seçilecek
            kadar (14/15 gibi ikili oluşmuyor). Hepsi kullanılmak zorunda değil;
            renkli olanlar kullanılıyor.
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
