import Link from "next/link";
import { isLive } from "@/lib/routes";

/* Link'in yerine geçen tek bileşen.
 *
 * Adres yayındaysa aynen <Link>. Değilse bağlantı hiç kurulmuyor: aynı
 * işaretleme <span> olarak çıkıyor, sönük ve tıklanamaz, yanında "yakında"
 * rozetiyle (CSS, [data-soon]). Böylece menü yapısı olduğu gibi duruyor —
 * müşteri yol haritasını görüyor — ama hiçbir tıklama "yapım aşamasında"
 * kartına düşmüyor.
 *
 * Karar burada verilmiyor, lib/routes.ts'te. Bir sayfa yayına girdiğinde bu
 * dosyaya dokunmak gerekmiyor.
 *
 * Props <a>'nınkilerle birebir: çağrı yerlerinde <Link> ile <SmartLink>
 * arasında geçiş yapmak için hiçbir uyarlama gerekmiyor (Nav'daki
 * onMouseEnter / onFocus / data-on gibi alanlar dahil).
 */

type Props = Omit<React.ComponentPropsWithoutRef<"a">, "href"> & { href: string };

export default function SmartLink({ href, children, ...rest }: Props) {
  if (isLive(href)) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }

  /* <a>'ya özgü alanlar (target, rel, download) bu projede kullanılmıyor;
     kalanların hepsi <span>'de de geçerli. */
  const spanProps = rest as React.ComponentPropsWithoutRef<"span">;

  return (
    <span {...spanProps} data-soon="" aria-disabled="true" title="Bu sayfa yakında yayında">
      {children}
    </span>
  );
}
