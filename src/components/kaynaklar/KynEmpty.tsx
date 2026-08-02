import SmartLink from "@/components/shared/SmartLink";
import { ArrowRight, Inbox } from "lucide-react";
import type { KindMeta } from "@/lib/resources";

/* ============================================================================
   BOŞ DURUM — sitedeki tek tasarım
   ============================================================================

   KARAR: bir türün KENDİ SAYFASI boşsa bölüm gizlenmiyor, dürüst boş durum
   basılıyor. Gizlemek burada yanlış olurdu çünkü ziyaretçi o sayfaya "burada
   e-kitap var" diyen bir bağlantıya tıklayarak geliyor; karşısına hiçbir şey
   çıkmayan bir sayfa "site bozuk" demek. Boş durum üç şeyi birden söylüyor:
   (1) şu an yok, (2) buraya ne zaman ve hangi kuralla kayıt girecek,
   (3) bu arada nereye gidilir.

   Kuralın öteki yarısı: bir türün önizlemesi BAŞKA bir sayfanın içinde
   duruyorsa (hub'daki kapılar, ilgili içerik şeridi) boşken hiç basılmıyor.
   Dört kapılı bir hub'da iki kapının "burası boş" demesi, bölümü dört kez
   boş ilan etmek olurdu; kapı duruyor, yalnızca önizleme satırları düşüyor.

   Sahte kart basmak ise hiçbir yerde seçenek değil: tıklanınca bir yere
   gitmeyen ya da olmayan bir mevzuatı duyuran kart, boş bir sayfadan çok
   daha pahalı.
   ========================================================================= */

export default function KynEmpty({
  meta,
  exits,
}: {
  meta: KindMeta;
  /** boşken gidilecek gerçek yerler; hepsi SmartLink'ten geçiyor */
  exits: { label: string; href: string; line: string }[];
}) {
  return (
    <div className="kyn-empty">
      <span className="kyn-empty-ic" aria-hidden="true">
        <Inbox size={20} strokeWidth={1.8} />
      </span>

      <h2 className="kyn-empty-t">{meta.emptyTitle}</h2>
      <p className="kyn-empty-l">{meta.emptyLine}</p>

      {exits.length > 0 && (
        <>
          <p className="kyn-empty-k">Bu arada</p>
          <div className="kyn-empty-x">
            {exits.map((x) => (
              <SmartLink key={x.href} href={x.href} className="kyn-exit">
                <span>
                  <b>{x.label}</b>
                  <em>{x.line}</em>
                </span>
                <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
              </SmartLink>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
