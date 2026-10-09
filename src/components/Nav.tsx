import NavIstemci from "@/components/NavIstemci";
import { CATEGORY, publishedPosts } from "@/lib/blog";

/* Menünün SUNUCU kabuğu (25.09.2026 · optimizasyon turu).

   Menünün kendisi tarayıcıda çalışıyor (components/NavIstemci). Kaynaklar
   panelindeki "Son yazı" kartı en yeni blog yazısını gösteriyor; bunu
   tarayıcıda hesaplamak blog.ts'i on beş yazının gövdesiyle birlikte her
   sayfanın paketine sokuyordu. Hesap burada, sunucuda yapılıyor ve menüye
   yalnız kartın bastığı dört alan geçiyor.

   09.10.2026 · KART BÜYÜDÜ, GEÇEN ALANLAR DEĞİŞTİ. Burak: "Oraya sadece son
   blog yazısını büyük bir şekilde koy, yine aynı mantıkta; başlık yazsın,
   kategori yazsın." Kart artık Hizmetler panelindeki ülke kartının kalıbında:
   zeminde yazının kapağı, üstünde kategori ve başlık. O yüzden tarih gitti
   (kartta basılmıyor), kapak ve kategori ADI geldi. Kategori adı burada
   çözülüyor çünkü CATEGORY blog.ts'te duruyor ve o dosya tarayıcıya girmemeli.

   sortedPosts() → publishedPosts(): menünün en büyük kartı bir yer tutucuya
   ("Örnek" yazı) düşmesin. Bugün ikisinin ilk kaydı aynı; fark, gerçek
   yazıdan yeni tarihli bir yer tutucu eklendiği gün ortaya çıkar.

   Çağıran 28 sayfa değişmedi: hepsi hâlâ `import Nav from "@/components/Nav"`. */
export default function Nav() {
  const p = publishedPosts()[0];
  return (
    <NavIstemci
      sonYazi={
        p
          ? { title: p.title, category: CATEGORY[p.category].label, cover: p.cover, slug: p.slug }
          : null
      }
    />
  );
}
