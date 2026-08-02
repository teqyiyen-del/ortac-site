import { Info } from "lucide-react";
import type { ToolEntry } from "@/lib/tools/catalog";

/* Üç aracın ortak kabuğu.
 *
 * Neden ortak: her araç iki cümle söylemek zorunda — ne olduğu ve NE OLMADIĞI.
 * İkincisini bileşenlerin kendi insafına bırakırsak biri unutur; kabuk zorunlu
 * kılıyor, metin de kayıt defterinden (lib/tools/catalog.ts) geliyor, yani
 * gözden geçiren kişi üç aracın sınırını tek dosyada okuyabiliyor.
 *
 * Bilerek sunucu bileşeni: içine gelen araç istemcide çalışıyor, kabuk
 * çalışmıyor. Başlık ve dipnot statik HTML olarak basılıyor.
 *
 * Başlıkta SplitWords yok. Sayfada üç etkileşimli panel var ve üçünün de
 * başlığını kelime kelime uçurmak, formların üstünde gereksiz hareket
 * yaratıyordu; vurgu aynı, hareket yok.
 */
export default function ToolShell({
  tool,
  index,
  children,
}: {
  tool: ToolEntry;
  /** ekrandaki sıra numarası — sayfanın başındaki dizinle aynı numara */
  index: number;
  children: React.ReactNode;
}) {
  const [head, tail] = tool.title.endsWith(tool.accent)
    ? [tool.title.slice(0, -tool.accent.length), tool.accent]
    : [tool.title, ""];

  return (
    <section id={tool.id} className="tl-sec" data-alt={index % 2 === 0 ? "" : undefined}>
      <div className="container-o">
        <div className="tl-head">
          <span className="tl-kicker">
            <span className="tl-kicker-n">{String(index + 1).padStart(2, "0")}</span>
            {tool.meta}
          </span>
          <h2 className="h2 tl-title">
            {head}
            {tail && <span className="text-accent">{tail}</span>}
          </h2>
          <p className="tl-lead">{tool.is}</p>
        </div>

        <div className="tl-card">{children}</div>

        <p className="tl-foot">
          <Info size={16} strokeWidth={2.1} aria-hidden="true" />
          <span>
            <b>Ne değil:</b> {tool.isNot}
          </span>
        </p>
      </div>
    </section>
  );
}
