import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";

/* Hero'nun beyaz zeminli alternatifi.
 *
 * Bu sayfa mevcut hero'yu hiçbir şekilde değiştirmez. Aynı <Hero /> bileşeni,
 * yalnızca .hero-light sarmalayıcısının içinde: renk kararlarının tamamı CSS'te,
 * bileşen dosyalarında tek satır değişiklik yok. Karar hangi yönde verilirse
 * verilsin, diğer sürüm bozulmadan duruyor.
 *
 * Küre de dahil her şey aynı geometriyle çalışır - k, kırpma ve etiket konumu
 * siyah sürümle birebir aynı; değişen sadece hangi tarafın ışık olduğu.
 *
 * Yayına açık bir sayfa değil: karşılaştırma için var, o yüzden dizine
 * eklenmiyor. */
export const metadata: Metadata = {
  title: "Hero · beyaz alternatif",
  robots: { index: false, follow: false },
};

export default function HeroBeyazPage() {
  return (
    <div className="hero-light">
      <Nav />
      <Hero />
    </div>
  );
}
