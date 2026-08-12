import Link from "next/link";

import AnketSahne from "@/components/lab/AnketSahne";
import AnketMelez from "@/components/lab/AnketMelez";
import AnketAkis from "@/components/lab/AnketAkis";

/* ============================================================================
   /lab/anket — uygunluk testine tasarım alternatifleri

   Bu turun isteği: "aday 2 ile şuan live da olanın bi karmasını denesene."
   Aday 2 (DEFTER) yerini MELEZ'e bıraktı; git'te duruyor. SAHNE ve AKIŞ
   dokunulmadan kaldı.

   SAYFA METİN DÖKMÜYOR (müşteri: "ben sadece örnekleri görmek istiyorum").
   Teşhis tablosu, kıyas tablosu, tavsiye ve elenen aday gerekçeleri bu turda
   silindi; ölçümlerin yeri artık rapor ve commit mesajı. Ekranda kalan: aday
   adı, bir satır künye, adayın kendisi.

   Üçü de dokuz sorunun tamamını gerçekten yürütüyor: soru metinleri, ipuçları
   ve puanlar fitTest.ts'ten, ülke adları ve bayraklar CountryPicker'dan, sonuç
   scoreFit'ten. Sonuç ekranı üçünde de kısaltılmış; bu turda sorulan soru
   "sonuç raporu nasıl olmalı" değil, "anket nasıl doldurulmalı".
   ========================================================================= */

export const metadata = {
  title: "Uygunluk anketi · tasarım alternatifleri | Ortac Global",
  robots: { index: false, follow: false },
};

const ADAYLAR = [
  {
    id: "sahne",
    no: "Aday 1",
    ad: "SAHNE",
    kunye: "Tek soru, tam sahne: ray yok, puan paneli yok, ekranda yalnız soru var.",
  },
  {
    id: "melez",
    no: "Aday 2 · yeni",
    ad: "MELEZ",
    kunye:
      "Defter ile canlının karması: canlının üç perdesi, dokuz soruluk haritası ve puan seviyesi, defterin gece paneline taşındı.",
  },
  {
    id: "akis",
    no: "Aday 3",
    ad: "AKIŞ",
    kunye: "Tek sütun: cevaplanan soru kendi cevabına katlanıp listede kendi yerinde kalıyor.",
  },
] as const;

function Kunye({ i }: { i: 0 | 1 | 2 }) {
  const a = ADAYLAR[i];
  return (
    <div className="container-o">
      <p className="ankx-aday-e">
        {a.no}
        <span className="ankx-aday-n">{a.ad}</span>
      </p>
      <p className="ankx-aday-k">{a.kunye}</p>
    </div>
  );
}

export default function LabAnketPage() {
  return (
    <main className="ankx-page">
      <section className="ankx-intro">
        <div className="container-o">
          <h1 className="h2 ankx-title">Uygunluk anketi · tasarım alternatifleri</h1>
          <p className="ankx-lead">
            Üç aday, üçü de dokuz sorunun tamamını yürütüyor. Yan yana koyup karşılaştırmak için{" "}
            <Link className="ankx-link" href="/araclar/uygunluk-testi">
              canlı testi ayrı sekmede açın
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="ankx-aday" id="sahne">
        <Kunye i={0} />
        <div className="container-o ankx-demo">
          <AnketSahne />
        </div>
      </section>

      <section className="ankx-aday" id="melez">
        <Kunye i={1} />
        <div className="container-o ankx-demo">
          <AnketMelez />
        </div>
      </section>

      <section className="ankx-aday" id="akis">
        <Kunye i={2} />
        <div className="container-o ankx-demo">
          <AnketAkis />
        </div>
      </section>
    </main>
  );
}
