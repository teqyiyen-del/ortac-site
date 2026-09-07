import Link from "next/link";
import { isLive } from "@/lib/routes";

/* Link'in yerine geçen tek bileşen.
 *
 * Adres yayındaysa aynen <Link>. Değilse bağlantı hiç kurulmuyor: aynı
 * işaretleme <span> olarak çıkıyor — sönük ve tıklanamaz (CSS, [data-soon]).
 * Böylece menü yapısı olduğu gibi duruyor — izleyen yol haritasını görüyor —
 * ama hiçbir tıklama "yapım aşamasında" kartına düşmüyor.
 *
 * Bir tur boyunca her girdinin yanına "yakında" rozeti de basılıyordu; kalktı.
 * Menüde yan yana dört, footer dizininde on beş rozet olunca işaret bilgi
 * olmaktan çıkıp gürültü oluyordu. Aynı şeyi sönüklük zaten söylüyor.
 *
 * ---------------------------------------------------------------------------
 * AÇIKLAMA ARTIK `title`'A GÜVENMİYOR
 *
 * Bir tur boyunca bu dosyanın tek açıklaması `title="Bu sayfa yakında
 * yayında"` idi ve globals.css bunun yanında aynı ögeye `pointer-events: none`
 * veriyordu. İkisi birbirini iptal ediyor: işaretçi olayı hiç doğmadığı için
 * öge imleç altında "designated" sayılmıyor ve yerel ipucu ASLA açılmıyor.
 * globals.css'teki not da bu yüzden yanlıştı ("ekran okuyucu ve tooltip
 * sönüklükten bağımsız olarak yakında diyor"); düzeltildi.
 *
 * Yerine METİN kondu: görsel olarak gizli, ekran okuyucunun okuduğu bir ek.
 * Neden ek metin, `aria-label` değil: rolsüz bir <span>'de aria niteliklerinin
 * yayımlanmadığı bu depoda üç kez görüldü (docs/tuzaklar.md · tuzak G), ama
 * METİN İÇERİĞİ role bakılmaksızın okuma sırasına giriyor. `.sr-only` mutlak
 * konumlu olduğu için esnek kaplarda fazladan bir öge ya da boşluk da
 * yaratmıyor.
 *
 * `title` SİLİNMEDİ: maliyeti sıfır ve pointer-events kısıtı bir gün
 * gevşerse açıklama kendiliğinden görünür hâle geliyor. Bugün görünmediği
 * yukarıda yazılı; onu görünür kılmanın iki yolu da bu turda ELENDİ, gerekçe
 * globals.css'teki [data-soon] bloğunda.
 *
 * Karar burada verilmiyor, lib/routes.ts'te. Bir sayfa yayına girdiğinde bu
 * dosyaya dokunmak gerekmiyor.
 *
 * Props <a>'nınkilerle birebir: çağrı yerlerinde <Link> ile <SmartLink>
 * arasında geçiş yapmak için hiçbir uyarlama gerekmiyor (Nav'daki
 * onMouseEnter / onFocus / data-on gibi alanlar dahil).
 */

type Props = Omit<React.ComponentPropsWithoutRef<"a">, "href"> & { href: string };

/** Sönük girdinin tek açıklaması. İki yerde birden kullanılıyor (title ve
 *  ekran okuyucu metni), o yüzden tek yerde yazılı. */
const SOON = "Bu sayfa yakında yayında";

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
    <span {...spanProps} data-soon="" aria-disabled="true" title={SOON}>
      {children}
      {/* Virgülle başlıyor: ekran okuyucu girdinin adının ardına ekliyor,
          "Blog, bu sayfa yakında yayında" diye okunuyor. Ekranda hiçbir yer
          kaplamıyor. */}
      <span className="sr-only">, {SOON.toLocaleLowerCase("tr")}</span>
    </span>
  );
}
