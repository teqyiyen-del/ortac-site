import type { Metadata } from "next";
import BlogIndexPage from "@/app/blog/page";
import AcikBaslik, { type AcikTip } from "@/components/lab/AcikBaslik";

/* LAB · /lab/acik-baslik (07.10.2026). Blog, iletişim, araçlar gibi
   sayfaların kısa siyah başlığı için açık zeminli üç seçenek, alt alta;
   en altta gerçek blog sayfası (kendi siyah başlığı bu sayfada CSS ile
   gizli). Gerekçe ve seçeneklerin tarifi components/lab/AcikBaslik.tsx. */
export const metadata: Metadata = { title: "Açık başlık · üç seçenek (blog) | Ortac Global" };

const ADAY: { k: AcikTip; ad: string; kunye: string }[] = [
  { k: "b1", ad: "B1 · Yalın", kunye: "yalnız yazı; sağ taraf boş" },
  { k: "b2", ad: "B2 · Ortalı", kunye: "başlık ortada, altında bölüm bağlantıları" },
  { k: "b3", ad: "B3 · İçindekiler", kunye: "solda başlık, sağda \"Bu sayfada\" kutusu" },
];
const BAGLANTI = [
  { ad: "Ülke rehberleri", href: "/blog/kategori/ulke-rehberi" },
  { ad: "Maliyet ve vergi", href: "/blog/kategori/maliyet-ve-vergi" },
  { ad: "Kuruluş sonrası", href: "/blog/kategori/kurulus-sonrasi" },
];

export default function LabAcikBaslik() {
  return (
    <div className="abk-sayfa">
      {ADAY.map(({ k, ad, kunye }, i) => (
        <div key={k}>
          {i > 0 && (
            <div className="lhz-lab-ad">
              <div className="container-o">
                <a href="#">
                  {ad}
                  <span>{kunye}</span>
                </a>
              </div>
            </div>
          )}
          <AcikBaslik
            tip={k}
            iz="Blog"
            baslik="Blog yazıları ve ülke rehberleri."
            vurgu="ülke rehberleri."
            lead="Maliyet kalemi, vergi kaydı, banka görüşmesi, yıl sonu kapanışı: her yazı bir konuyu açıyor."
            baglantilar={BAGLANTI}
          />
        </div>
      ))}
      <BlogIndexPage />
    </div>
  );
}
