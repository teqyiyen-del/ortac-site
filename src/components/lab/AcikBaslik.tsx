/* LAB · AÇIK BAŞLIK · /lab/acik-baslik (07.10.2026)
   Burak: "blog falan taraflarını siyahtan çekip nasıl bir şey yapabiliriz
   ki? Bir tane örnek göster." Blog, iletişim, araçlar, kaynaklar gibi
   sayfaların kısa siyah başlığının (PageHero · kompakt dal) açık zeminli
   örneği. Tek örnek, blog sayfasının üstünde.

   Dil foto girişle aynı aile (FotoGiris): kırık beyaz zemin, koyu başlık,
   mavi vurgu; ama KISA: bu sayfalarda başlığın altı hemen içerik. Sağda
   küçük bir fotoğraf karosu (süs) ve üstünde tek cam etiket. Onaylanırsa
   PageHero'nun kompakt dalına taşınır. Ad alanı .abk- (css/lab-acik-baslik.css). */

import { ChevronRight } from "lucide-react";
import SmartLink from "@/components/shared/SmartLink";
import "@/app/css/lab-acik-baslik.css";

/* 07.10.2026 (2) · FOTOĞRAFSIZ. İlk örnekte sağda küçük bir fotoğraf vardı;
   Burak: "görsel olmasına gerek yok, zaten aşağıda görseller varken biraz
   saçma duruyor. Daha farklı bir yöntem deneyebilirsin." Şimdi yalnız yazı:
   solda başlık ve tek cümle, sağda sayfanın künyesi (üç küçük kutu: o
   sayfada ne var). Künye sayfadan sayfaya değişir; yoksa sağ taraf boş
   kalmaz, başlık tam genişliğe yayılır. */
export default function AcikBaslik({
  iz,
  baslik,
  vurgu,
  lead,
  kunye,
}: {
  iz: string;
  baslik: string;
  vurgu?: string;
  lead: string;
  kunye?: { deger: string; ad: string }[];
}) {
  const [bas, kuyruk] = vurgu && baslik.endsWith(vurgu) ? [baslik.slice(0, -vurgu.length), vurgu] : [baslik, ""];
  return (
    <section className="abk">
      <div className="container-o abk-grid" data-kunye={kunye ? "" : undefined}>
        <div>
          <nav className="abk-iz" aria-label="Sayfa yolu">
            <SmartLink href="/">Ana sayfa</SmartLink>
            <ChevronRight size={14} strokeWidth={2} aria-hidden="true" />
            <span>{iz}</span>
          </nav>
          <h1 className="abk-h1">
            {bas}
            {kuyruk && <span>{kuyruk}</span>}
          </h1>
          <p className="abk-lead">{lead}</p>
        </div>
        {kunye && (
          <dl className="abk-kunye">
            {kunye.map((k) => (
              <div key={k.ad}>
                <dt>{k.ad}</dt>
                <dd>{k.deger}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
