import type { Metadata } from "next";
import { Desen, FadeUpKarsilastirma, type DesenTip } from "@/components/lab/BolumBasi";

/* /lab/bolum-basi — bölüm açılışı için üç alternatif desen.
   Adaylar ve gerekçeleri: src/components/lab/BolumBasi.tsx + css/lab-bbasi.css.
   Canlı sayfalara bağlı değil, dizine girmiyor. */

export const metadata: Metadata = {
  title: "Bölüm açılışı · aday desenler | Ortac Global",
  robots: { index: false, follow: false },
};

/* Her adayın altında sitenin AYNI üç bölümü basılıyor: Dubai muhasebe
   "karşılık" bölümü, hakkımızda "dayanak" bölümü, ülke sayfası "evrak"
   bölümü. Üçü de kendi veri dosyasından okunuyor. */
const ADAYLAR: { tip: DesenTip; id: string; ad: string; kunye: string }[] = [
  {
    tip: "bugun",
    id: "bugün",
    ad: "Bugünkü açılış",
    kunye:
      "51 bölümün 46'sı birebir bu iskelet: başlık kelime kelime giriyor, son kelimeler mavi, altında tek satır.",
  },
  {
    tip: "a",
    id: "Desen A",
    ad: "Eşik",
    kunye:
      "Başlık solda, alt satır sağ sütunda ve alt kenarları hizalı; açılış dikey yığın yerine yatay bir bant.",
  },
  {
    tip: "b",
    id: "Desen B",
    ad: "Sessiz",
    kunye:
      "Mavi kuyruk yok, giriş satırı yok. Alt satır silinmiyor, bölümün sonuna iniyor ve okunanı niteliyor.",
  },
  {
    tip: "c",
    id: "Desen C",
    ad: "Künye",
    kunye:
      "Başlığın üstünde numara ve bölümün kendi çapa adı. Yer künyeden okunduğu için başlıkta vurgu gerekmiyor.",
  },
];

export default function BolumBasiLab() {
  return (
    <main>
      {ADAYLAR.map((a) => (
        <div key={a.tip}>
          <div className="bbs-kunye">
            <span>{a.id}</span>
            <h2>{a.ad}</h2>
            <p>{a.kunye}</p>
          </div>
          <Desen tip={a.tip} />
          <hr style={{ margin: 0, border: 0, borderTop: "1px solid var(--border)" }} />
        </div>
      ))}

      <div className="bbs-kunye">
        <span>FadeUp</span>
        <h2>Bir bölümde kaç tane</h2>
        <p>
          Solda bugünkü kullanım: dört kart, dört FadeUp, kademeli. Sağda öneri: ızgaranın kendisi
          tek FadeUp. Düğme girişi yeniden oynatıyor.
        </p>
      </div>
      <FadeUpKarsilastirma />
    </main>
  );
}
