/* ============================================================================
   TEL · bir cümlenin telefon sürümü (09.10.2026, telefon düzeni canlıya alınırken)

   Telefon düzeninde giriş ve bölüm cümleleri kısa sürümleriyle basılıyor
   (sözlük: lib/mobilKisa; anahtar cümlenin başı). Deneme aşamasında bu,
   sayfa yüklendikten SONRA tarayıcıda yazı değiştirilerek yapılıyordu
   (shared/MobilDeneme · kisalt): ziyaretçi önce uzun cümleyi görüyor, bir an
   sonra kısası geliyor ve sayfa zıplıyordu; canlıya alınacak yöntem değildi.

   Şimdi iki sürüm de SUNUCUDA basılıyor, hangisinin görüneceğini CSS seçiyor
   (css/mobil-deneme.css · .m-uzun / .m-kisa): zıplama yok, tarayıcıda yazıya
   dokunan kod yok. Sözlükte karşılığı olmayan cümle olduğu gibi çıkıyor,
   yani bir yeri sarmak her zaman güvenli.

     <p className="sec-lead"><Tel>{lead}</Tel></p>

   Kanca yok: sunucu bileşeninde de istemci bileşeninde de kullanılır.
   İçinde başka öğe (<b>, <a> …) olan cümlelere dokunmaz.
   ========================================================================== */
import { Children, type ReactNode } from "react";
import { MOBIL_KISA } from "@/lib/mobilKisa";

export default function Tel({ children }: { children: ReactNode }) {
  const parcalar = Children.toArray(children);
  if (parcalar.length === 0 || !parcalar.every((p) => typeof p === "string" || typeof p === "number")) {
    return <>{children}</>;
  }
  const metin = parcalar.join("").replace(/\s+/g, " ").trim();
  const es = MOBIL_KISA.find(([bas]) => metin.startsWith(bas));
  if (!es || es[1] === metin) return <>{children}</>;
  return (
    <>
      <span className="m-uzun">{children}</span>
      <span className="m-kisa">{es[1]}</span>
    </>
  );
}
