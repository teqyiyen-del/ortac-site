import type { Metadata } from "next";
import {
  HeroCardA,
  HeroCardB,
  HeroCardC,
} from "@/components/shared/HeroDubaiCards";

/* Dubai hero kartı — üç aday yan yana.
 *
 * GEÇİCİ SAYFA, SİLİNECEK. Kart seçimi yapılınca:
 *   1. kazanan varyant HeroDubaiCards.tsx'in sonundaki DubaiHeroCard'a
 *      bağlanır (tek satır),
 *   2. kaybeden iki bileşen silinir,
 *   3. bu dizin (src/app/hero-lab/) silinir,
 *   4. hero.css'teki .phda- / .phdb- / .phdc- ve .phlab- bloklarından
 *      yalnızca kazananınki kalır.
 * Aynı liste HeroDubaiCards.tsx'in başında da duruyor — hangi dosya önce
 * açılırsa açılsın not görünsün diye.
 *
 * hero-beyaz/page.tsx ile aynı mantık: karşılaştırma için var, yayına açık
 * değil, o yüzden dizine eklenmiyor. Kartlar burada gerçek hero zemininde
 * (.ph, yani --night) duruyor — beyaz bir sayfada bakılırsa kontrast kararı
 * yanlış verilir.
 *
 * VARYANT LİSTESİ NEDEN BURADA: HeroDubaiCards "use client" modülü. Sunucu
 * bileşeni oradan düz veri (dizi, nesne) import edemiyor — Next o export'ları
 * istemci referansına çeviriyor ve dizi sunucuda .map'lenemiyor. Bileşen
 * referansları sorunsuz geçiyor, o yüzden buraya yalnızca bileşenler import
 * ediliyor, metinler burada duruyor.
 *
 * Kartlar 768px altında gizli (.phx-col), telefonda hero zaten metinle
 * taşınıyor. Değerlendirme masaüstünde yapılmalı.
 */
export const metadata: Metadata = {
  title: "Hero · Dubai kartı adayları",
  robots: { index: false, follow: false },
};

const VARIANTS = [
  {
    id: "A",
    title: "Elinizde ne kalıyor",
    idea:
      "Süreci değil sonucu gösterir: kurulumun ürettiği üç somut çıktı sırayla beyaza dönerek öne çıkar, her birinin altında o çıktının şartı yazılıdır.",
    Card: HeroCardA,
  },
  {
    id: "B",
    title: "Lisans bir halka",
    idea:
      "Eski sahnenin beğenilen iskeleti, ama konuşan hâli: üstte lisans düğümü, altta üç beyaz kutu ve her kutuda o halkanın somut karşılığı.",
    Card: HeroCardB,
  },
  {
    id: "C",
    title: "Sıra",
    idea:
      "Yatay ray üstünde ilerleyen tek beyaz işaretçi Dubai'de işlerin hangi sırayla olduğunu anlatır; ray kuruluş ile kuruluş sonrasını ayırır.",
    Card: HeroCardC,
  },
];

export default function HeroLabPage() {
  return (
    <main className="ph phlab-page">
      <h1 className="ph-title" style={{ marginTop: 0 }}>
        Dubai hero kartı — <span>üç aday</span>
      </h1>
      <p className="ph-lead">
        Üçü de aynı kısıtlarla yazıldı: kart koyu, beyaz yalnızca aksan, en fazla
        sekiz kısa satır, kesin gün sayısı ve banka onayı vaadi yok. Sol sütun
        (başlık, butonlar, güven satırları) üçünde de aynı kalıyor, burada
        gösterilmiyor.
      </p>

      <div className="phlab">
        {VARIANTS.map(({ id, title, idea, Card }) => (
          <section key={id} className="phlab-item">
            <header className="phlab-h">
              <span className="phlab-tag">Varyant {id}</span>
              <b>{title}</b>
              <p>{idea}</p>
            </header>
            <Card />
          </section>
        ))}
      </div>
    </main>
  );
}
