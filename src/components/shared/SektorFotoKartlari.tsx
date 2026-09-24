import Image from "next/image";
import {
  ArrowRight,
  Boxes,
  Building2,
  ChartCandlestick,
  Code2,
  Stethoscope,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SmartLink from "@/components/shared/SmartLink";
import { sectorPhoto } from "@/lib/media";
import { sectorHref } from "@/lib/sectors";

/* Sektör kartları · fotoğraflı (25.09.2026). Ad alanı .skf- (css/sektor-foto.css).

   İlk Hakkımızda'da yapıldı; Burak: "hangi sektörlerle çalışıyoruzu böyle
   görselli yapmasın, çok hoşuma gitti. Bunun aynısını ana sayfaya da
   taşıyabiliriz. Ana sayfada şu an SVG görsellerle var ya, onu siktir et,
   direkt buradakini taşı." İki sayfa artık aynı kartı basıyor; yalnız
   cümleler farklı (ana sayfa "bu sektörde ne kuruluyor", Hakkımızda
   "kurgunun düğümü nerede"), o yüzden cümle çağıran yerden geliyor.

   Kalıp nav'daki ülke kartı: zeminde sektörün fotoğrafı, alttan karartma,
   ad ve cümle kartın dibinde beyaz, ikon kuyusu sol üstte cam. Kare her
   sektörün kendi sayfasındaki kare (media.ts · SECTOR_PHOTO, gözle
   doğrulandı), yani kart ile açılan sayfa aynı görüntüyle buluşuyor. Dekor,
   alt="". */

const ICON: Record<string, LucideIcon> = {
  "e-ticaret": Boxes,
  "yazilim-ve-teknoloji": Code2,
  danismanlik: UserRound,
  gayrimenkul: Building2,
  "finans-ve-yatirim": ChartCandlestick,
  "saglik-ve-medikal": Stethoscope,
};

export type SektorKart = { slug: string; label: string; line: string };

export default function SektorFotoKartlari({ items }: { items: SektorKart[] }) {
  return (
    <div className="skf-grid">
      {items.map((s, i) => {
        const Icon = ICON[s.slug];
        return (
          <FadeUp key={s.slug} delay={0.12 + i * 0.045}>
            <SmartLink href={sectorHref(s.slug)} className="skf" aria-label={`${s.label}, detayları gör`}>
              <span className="skf-foto" aria-hidden="true">
                <Image
                  src={sectorPhoto(s.slug).work}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 380px, (min-width: 720px) 50vw, 100vw"
                  unoptimized
                />
              </span>
              <span className="skf-perde" aria-hidden="true" />
              <span className="skf-ic" aria-hidden="true">
                {Icon && <Icon size={16} strokeWidth={1.9} />}
              </span>
              <span className="skf-b">
                <b className="skf-t">{s.label}</b>
                <span className="skf-l">{s.line}</span>
              </span>
              <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
            </SmartLink>
          </FadeUp>
        );
      })}
    </div>
  );
}
