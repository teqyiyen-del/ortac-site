import type { Metadata } from "next";
import Link from "next/link";

/* LAB · /lab/mobil-nav — telefon menüsü adayları (25.09.2026).
   Dört telefon çerçevesi yan yana: bugünkü menü ve üç aday. Çerçevenin içi
   gerçek sayfa (iframe, 390 px genişlik): menünün medya sorguları çerçevenin
   genişliğine göre çalışıyor, yani masaüstünde de telefondaki hâl görünüyor.
   Künye aynı zamanda tam ekran bağlantısı: telefondan açan çerçeve yerine
   adayın kendi sayfasına geçiyor. Adayların gerekçesi
   components/lab/MobilNavAdaylari.tsx'in başında. */
export const metadata: Metadata = { title: "Mobil menü · adaylar | Ortac Global" };

const CERCEVELER = [
  { ad: "Bugün", kunye: "canlıdaki menü", src: "/" },
  { ad: "N1 · Çubukta düğme", kunye: "Başlat hep üstte; menü dört sekme, kaydırmadan sığar", src: "/lab/mobil-nav/n1" },
  { ad: "N2 · Alttan menü", kunye: "başparmağın yettiği yerde açılır; çubuk aşağı kaydırınca saklanır", src: "/lab/mobil-nav/n2" },
  { ad: "N3 · Alt sekme çubuğu", kunye: "uygulama gibi: beş sekme altta, Başlat ortada", src: "/lab/mobil-nav/n3" },
];

export default function LabMobilNav() {
  return (
    <main className="lmn-lab">
      {CERCEVELER.map((c) => (
        <figure key={c.src} className="lmn-lab-aday">
          <Link href={c.src} className="lmn-lab-kunye">
            {c.ad}
            <span>{c.kunye}</span>
          </Link>
          <div className="lmn-lab-tel">
            <iframe src={c.src} title={c.ad} loading="lazy" />
          </div>
        </figure>
      ))}
    </main>
  );
}
