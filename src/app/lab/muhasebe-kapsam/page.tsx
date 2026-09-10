import type { Metadata } from "next";

import { KapsamK1, KapsamK2, KapsamK3 } from "@/components/lab/KapsamAdaylar";

/* /lab/muhasebe-kapsam — "Ne yapıyoruz, ne yapmıyoruz" bölümüne üç aday.
   Verinin nereden geldiği ve eşlemelerin gerekçesi
   components/lab/KapsamAdaylar.tsx'in başında. Canlı sayfaya dokunulmadı. */

export const metadata: Metadata = {
  title: "Kapsam bölümü · üç aday | Ortac Global",
  robots: { index: false, follow: false },
};

const ADAYLAR = [
  {
    id: "K1",
    ad: "Kalem kalem",
    Bolum: KapsamK1,
    fark: "Beş aşamanın beşi de kendi akordiyonu; açılınca o kalemin kapsamı ve sınırı yan yana.",
  },
  {
    id: "K2",
    ad: "İki kademe",
    Bolum: KapsamK2,
    fark: "Yüzeyde beş sessiz karo, altında tek kapı; arkasında beş aşamayı alt alta kıyaslayan çizelge.",
  },
  {
    id: "K3",
    ad: "Tek sahne",
    Bolum: KapsamK3,
    fark: "Solda kalem listesi, sağda seçilenin ayrıntısı; ekranda hep tek kalem duruyor.",
  },
];

export default function LabMuhasebeKapsamPage() {
  return (
    <main>
      <div className="lmh-kunye lkp-kunye">
        <span>Aday K1 · K2 · K3</span>
        <h1>Kapsam bölümü</h1>
        <p>
          &ldquo;ne yapıyoruz ne yapmıyoruz kısmı çok arada kalmış gibi duruyor bide 4 madde az gibi
          ama bunların hepsini böyle vermekte sıkıntı, şuan sitedeki bilgi olarak daha dolu ama o da
          çok karışık ve icon cart curt yok ya biraz sıkıntı. buraya çeşit denemeni isteyeceğim.
          genel olarak görünen kısımda sade gözüken ama meraklısının üstüne tıkayıp akordiyonla fln
          daha çok şey görebileceği bir mantık kullanabilirz.&rdquo;
        </p>
      </div>

      {ADAYLAR.map(({ id, ad, Bolum, fark }) => (
        <div key={id}>
          <div className="container-o lkp-aday">
            <span className="lkp-aday-k">
              {id} · {ad}
            </span>
            <p className="lkp-aday-n">{fark}</p>
          </div>
          <Bolum />
        </div>
      ))}
    </main>
  );
}
