/* LAB · AÇIK BAŞLIK · /lab/acik-baslik (07.10.2026)
   Burak: "blog falan taraflarını siyahtan çekip nasıl bir şey yapabiliriz
   ki? Bir tane örnek göster." Blog, iletişim, araçlar, kaynaklar gibi
   sayfaların kısa siyah başlığının (PageHero · kompakt dal) açık zeminli
   örneği. Tek örnek, blog sayfasının üstünde.

   Dil foto girişle aynı aile (FotoGiris): kırık beyaz zemin, koyu başlık,
   mavi vurgu; ama KISA: bu sayfalarda başlığın altı hemen içerik. Sağda
   küçük bir fotoğraf karosu (süs) ve üstünde tek cam etiket. Onaylanırsa
   PageHero'nun kompakt dalına taşınır. Ad alanı .abk- (css/lab-acik-baslik.css). */

import { ArrowRight, ChevronRight } from "lucide-react";
import SmartLink from "@/components/shared/SmartLink";
import "@/app/css/lab-acik-baslik.css";

/* 07.10.2026 (3) · ÜÇ SEÇENEK, FOTOĞRAFSIZ VE SAYISIZ. Fotoğraflı ilk örnek
   ("aşağıda görseller varken saçma duruyor") ve sayılı künye ("sayısal veri
   koymak istemiyorum, birkaç seçenek düşünsene") elendi.
     b1  Yalın: yalnız yazı, solda; sağ taraf boş
     b2  Ortalı: başlık ve cümle ortada, altında sayfanın bölümlerine giden
         küçük bağlantılar
     b3  İçindekiler: solda başlık, sağda beyaz kutuda "Bu sayfada" listesi */
export type AcikTip = "b1" | "b2" | "b3";

export default function AcikBaslik({
  tip,
  iz,
  baslik,
  vurgu,
  lead,
  baglantilar,
}: {
  tip: AcikTip;
  iz: string;
  baslik: string;
  vurgu?: string;
  lead: string;
  /** b2 ve b3: sayfanın bölümleri */
  baglantilar: { ad: string; href: string }[];
}) {
  const [bas, kuyruk] = vurgu && baslik.endsWith(vurgu) ? [baslik.slice(0, -vurgu.length), vurgu] : [baslik, ""];
  return (
    <section className="abk" data-tip={tip}>
      <div className="container-o abk-grid">
        <div className="abk-yazi">
          <nav className="abk-iz" aria-label="Sayfa yolu">
            <SmartLink href="/">Ana sayfa</SmartLink>
            <ChevronRight size={14} strokeWidth={2} aria-hidden="true" />
            <span>{iz}</span>
          </nav>
          <h2 className="abk-h1">
            {bas}
            {kuyruk && <span>{kuyruk}</span>}
          </h2>
          <p className="abk-lead">{lead}</p>
          {tip === "b2" && (
            <div className="abk-cipler">
              {baglantilar.map((b) => (
                <SmartLink key={b.ad} href={b.href} className="abk-cip">
                  {b.ad}
                </SmartLink>
              ))}
            </div>
          )}
        </div>
        {tip === "b3" && (
          <nav className="abk-icinde" aria-label="Bu sayfada">
            <span className="abk-icinde-k">Bu sayfada</span>
            {baglantilar.map((b) => (
              <SmartLink key={b.ad} href={b.href} className="abk-icinde-s">
                {b.ad}
                <ArrowRight size={15} strokeWidth={2} aria-hidden="true" />
              </SmartLink>
            ))}
          </nav>
        )}
      </div>
    </section>
  );
}
