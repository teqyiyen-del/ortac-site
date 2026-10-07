import type { Metadata } from "next";
import BlogIndexPage from "@/app/blog/page";
import AcikBaslik from "@/components/lab/AcikBaslik";
import { BLOG_POSTS as POSTS } from "@/lib/blog";

/* LAB · /lab/acik-baslik (07.10.2026). Kısa siyah sayfa başlığının açık
   zeminli örneği, gerçek blog sayfasının üstünde. Canlı koda dokunulmadı:
   blog sayfası olduğu gibi basılıyor, kendi siyah başlığı bu sayfada CSS
   ile gizli (css/lab-acik-baslik.css). Gerekçe components/lab/AcikBaslik.tsx. */
export const metadata: Metadata = { title: "Açık başlık · örnek (blog) | Ortac Global" };

export default function LabAcikBaslik() {
  return (
    <div className="abk-sayfa">
      <AcikBaslik
        iz="Blog"
        baslik="Blog yazıları ve ülke rehberleri."
        vurgu="ülke rehberleri."
        lead="Maliyet kalemi, vergi kaydı, banka görüşmesi, yıl sonu kapanışı: her yazı bir konuyu açıyor."
        kunye={[
          { deger: String(POSTS.length), ad: "yazı" },
          { deger: String(new Set(POSTS.map((p) => p.category)).size), ad: "kategori" },
          { deger: "3", ad: "ülke" },
        ]}
      />
      <BlogIndexPage />
    </div>
  );
}
