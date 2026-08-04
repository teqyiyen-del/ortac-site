import { FlaskConical } from "lucide-react";

/* ============================================================================
   YER TUTUCU UYARISI — sayfanın başındaki tek panel
   ============================================================================

   NEDEN VAR
   Müşteri tasarımı görebilmek için yer tutucuya açıkça izin verdi ("şimdilik
   bok bırakmamak adına placeholder bir şeylerde yazmanı istiyorum ama"). Ama
   site müşteriye gösterilirken odada başkaları da oluyor ve bir ziyaretçi
   uydurma bir mevzuat kaydını gerçek sanarsa bedelini firma öder.

   İşareti yalnızca kartın üstüne koymak yetmiyor: sayfaya giren kişi önce
   listenin BÜTÜNÜNE bakıyor. Bu panel bütünü tek cümlede söylüyor, kart
   şeritleri de tek tek tekrar ediyor. İkisi birlikte, biri değil.

   NEDEN KESİKLİ ÇERÇEVE
   Sitedeki boş durum panelinin (.kyn-empty) kalıbıyla aynı: dolu bir panel
   "bir şey var" diye okunuyor, kesik çizgi "yerini ayırdık, henüz dolmadı"
   diyor — metni okumadan önce.

   Bir tür yayına ilk gerçek kaydını aldığında bu panel KALKMIYOR; yer tutucu
   listede durdukça duruyor. Yer tutucular temizlendiğinde çağıran sayfa onu
   basmayı bırakıyor (koşul sayfada, burada değil).
   ========================================================================= */

export default function KynDraftNote({
  title,
  lines,
}: {
  title: string;
  /** iki cümleyi geçmeyen açıklama satırları */
  lines: string[];
}) {
  return (
    <aside className="kyn-note-seed">
      <p className="kyn-note-seed-h">
        <FlaskConical size={15} strokeWidth={2} aria-hidden="true" />
        {title}
      </p>
      {lines.map((l) => (
        <p key={l} className="kyn-note-seed-l">
          {l}
        </p>
      ))}
    </aside>
  );
}
