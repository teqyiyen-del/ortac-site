import NavIstemci from "@/components/NavIstemci";
import { sortedPosts } from "@/lib/blog";

/* Menünün SUNUCU kabuğu (25.09.2026 · optimizasyon turu).

   Menünün kendisi tarayıcıda çalışıyor (components/NavIstemci). Kaynaklar
   panelindeki "Son yazı" kartı en yeni blog yazısını gösteriyor; bunu
   tarayıcıda hesaplamak blog.ts'i on beş yazının gövdesiyle birlikte her
   sayfanın paketine sokuyordu. Hesap burada, sunucuda yapılıyor ve menüye
   yalnız başlık, tarih ve adres geçiyor.

   Çağıran 28 sayfa değişmedi: hepsi hâlâ `import Nav from "@/components/Nav"`. */
export default function Nav() {
  const p = sortedPosts()[0];
  return <NavIstemci sonYazi={p ? { title: p.title, publishedAt: p.publishedAt, slug: p.slug } : null} />;
}
