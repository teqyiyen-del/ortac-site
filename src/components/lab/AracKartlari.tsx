import Image from "next/image";
import { ArrowRight } from "lucide-react";
import SmartLink from "@/components/shared/SmartLink";
import { FAMILY_LABEL, FAMILY_ORDER, toolsOf } from "@/lib/tools/catalog";
import { TOOL_ICON } from "@/lib/tools/ikonlar";
import { TOOL_PHOTO } from "@/lib/media";

/* LAB · /lab/araclar · araç dizininde fotoğraf (25.09.2026). Burak: "araçlar
   sayfasına foto deneyebilirsin." Aynı veri (catalog · toolsOf), aynı
   gruplar (Hesaplayıcılar · Karar araçları), iki biçim:
     A1  fotoğraflı kart: fotoğraf tam kart, alttan karartma, yazı beyaz
         (Hakkımızda / ana sayfa sektör kartlarının kalıbı)
     A2  üstte fotoğraf: kartın üst bandı fotoğraf, altı bugünkü beyaz gövde
   Kareler media.ts · TOOL_PHOTO (her araca ayrı, gözle doğrulanmış). Sınıflar
   .lar- (css/lab-araclar.css). */

export default function AracKartlari({ bicim }: { bicim: "a1" | "a2" }) {
  return (
    <div className="lar" data-bicim={bicim}>
      {FAMILY_ORDER.map((f) => {
        const items = toolsOf(f).filter((t) => t.status === "live");
        if (items.length === 0) return null;
        return (
          <div key={f} className="lar-grup">
            <h2 className="lar-grup-h">{FAMILY_LABEL[f].head}</h2>
            <ul className="lar-ix">
              {items.map((t) => {
                const Ikon = TOOL_ICON[t.id];
                const foto = TOOL_PHOTO[t.id];
                return (
                  <li key={t.id}>
                    <SmartLink href={t.href} className="lar-k">
                      {foto && (
                        <span className="lar-foto" aria-hidden="true">
                          <Image src={foto} alt="" fill sizes="(min-width: 1024px) 380px, 100vw" unoptimized />
                        </span>
                      )}
                      <span className="lar-perde" aria-hidden="true" />
                      <span className="lar-ic" aria-hidden="true">
                        <Ikon size={18} strokeWidth={1.9} />
                      </span>
                      <span className="lar-g">
                        <span className="lar-t">{t.title}</span>
                        <span className="lar-m">{t.meta}</span>
                        <span className="lar-go">
                          Aracı açın
                          <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                        </span>
                      </span>
                    </SmartLink>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
