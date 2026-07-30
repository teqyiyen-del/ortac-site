import { BadgeCheck, LayoutDashboard, type LucideIcon } from "lucide-react";
import { PARTNERS } from "@/lib/brand";
import { brandKeyForName } from "@/lib/brands";
import { BrandChip } from "@/components/shared/BrandMark";

/* §1 — hero'nun altındaki ortak şeridi. Tek kesintisiz sıra, grup başlığı yok:
   şeridi "resmî ortaklıklar" ve "kullandığımız altyapı" diye ikiye bölmek,
   yalnızca göz ucuyla bakılacak bir banda iki etiket ve bir ayraç sokuyordu.
   Şerit hiçbir şeyi ortaklık diye iddia da etmiyor, çünkü artık üstünde hiç
   etiket yok; roller ülke ve hizmet sayfalarında duruyor.

   BU TURDA DEĞİŞEN — neden lucide ikonları gitti
   Her ad için BadgeCheck / Landmark / CreditCard basılıyordu: yani ekranda
   Stripe'ın yanında jenerik bir kart ikonu duruyordu. Bu, "Stripe ile tahsilat"
   iddiasını soyut bırakıyor — ziyaretçi tanıdığı işareti görmeden cümleye
   ikinci bir kanıt bulmuyor. Oysa src/lib/brands.ts kayıt defterinde Stripe,
   PayPal, Wise ve Payoneer gerçek vektörleriyle; Wio, Mashreq, IFZA ve Wam ise
   resmî SVG'leri gelene kadar baş harfle duruyor. BrandChip ikisini de aynı
   geometride basıyor (beyaz plaka + işaret + ad), o yüzden logosu olan ve
   olmayan ad şeritte aynı ritmi tutuyor.

   Plakanın kendisi bir okunaklılık kararı: PayPal'ın laciverti, Visa'nın moru
   ve Revolut'un neredeyse siyahı kendi zemini olmadan kayboluyor. Plaka opak
   beyaz olduğu için şerit ileride hangi yüzeye taşınırsa taşınsın işaretler
   ayakta kalıyor. (Zeminin kendi hikâyesi ticker.css'in başındaki teşhiste.) */

/* İşaret ölçüsü. Plaka BrandChip'in kendi hesabı: işaret + 6px iç boşluk. Aynı
   sayıyı burada da tutuyoruz ki markası olmayan adın lucide plakası milimetre
   milimetre BrandChip'inkiyle örtüşsün.

   18, tablo satırındaki 16'dan bir tık büyük. Sebebi baş harfli markalar:
   BrandChip monogramı işaretin 0.52'si kadar basıyor, 16'da bu 8.3px'e düşüyor
   ve akan bir şeritte "IF" okunmadan geçiyor. Ekranda ölçtüm, 18 bunu 9.4px'e
   çıkarıyor — şerit iki piksel uzuyor, karşılığında baş harfler duruyor. */
const MARK = 18;
const PLATE = MARK + 12;

/* Kayıt defterinde karşılığı OLMAYAN adlar için ikon. Bugün buraya yalnızca
   TaxDome düşüyor; markası eklendiği gün satır kendiliğinden ölür, çağrı yeri
   değişmez. Eşleşmeyen her ad BadgeCheck alır. */
const FALLBACK_ICON: Record<string, LucideIcon> = {
  TaxDome: LayoutDashboard,
};

/* Şeride PARTNERS dışından iki ad daha giriyor: Wise ve Payoneer. Yeni bir
   iddia değil — ikisi de brand.ts'teki PAY_MATRIX'in "Ödeme kuruluşu" grubunda
   ve ülke metinlerinde zaten adı geçen kanallar; şerit sadece bunları görünür
   kılıyor. Kart şemaları (Visa, Mastercard) kayıt defterinde olsa da BURAYA
   GİRMİYOR: onlar bizim çalıştığımız kurumlar değil, kartın kendisi. Şerit
   sonsuz döndüğü için sıra "sonda kalmak" anlamına gelmiyor; her ad döngünün
   bir yerinde ortada. */
const EXTRA = ["Wise", "Payoneer"];
const NAMES = [...PARTNERS.map((p) => p.name), ...EXTRA];

/* Bir "yarı" ekranın en genişinden geniş olmalı, yoksa -50%'lik sıçramada
   döngüde bir boşluk yürüyor. Tarayıcıda ölçtüm: dokuz ad bir geçişte ~1.310px
   tutuyor, üç geçiş ~3.930px — 3440px'lik ultra-geniş monitörü de kapatıyor.
   Ada dokunulursa (veya isim uzarsa) bu sayı yeniden ölçülmeli. */
const PASSES = 3;
const HALF = Array.from({ length: PASSES }, () => NAMES).flat();

function Mark({ name }: { name: string }) {
  const key = brandKeyForName(name);
  if (key) return <BrandChip brand={key} size={MARK} />;

  /* Kayıt defterinde yok: eski ikon davranışı sürüyor, ama BrandChip'in
     kabuğunu ödünç alarak — böylece şeritte "plakalı" ve "plakasız" iki ayrı
     ritim oluşmuyor. .bm- paylaşılan bir tasarım ad alanı (.btn gibi), kopyasını
     çıkarmak iki yerde bakım demek olurdu. */
  const Icon = FALLBACK_ICON[name] ?? BadgeCheck;
  return (
    <span className="bm-chip">
      <span className="bm-chip-plate" style={{ width: PLATE, height: PLATE }}>
        <Icon size={MARK - 1} strokeWidth={1.9} className="tkr-ic" />
      </span>
      <span className="bm-chip-n">{name}</span>
    </span>
  );
}

export default function HeroPartners() {
  return (
    <div className="tkr">
      <div className="tkr-vp">
        {/* Şerit, listenin iki kopyası: -50% kaydırınca birebir aynı kareye
            oturuyor ve sarma görünmüyor. data-echo, ilk geçiş dışındaki her
            yongayı işaretliyor — hareket kapalıyken (prefers-reduced-motion)
            CSS bu tekrarları gizleyip geriye markadan birer tane bırakıyor. */}
        <div className="tkr-track" aria-hidden="true">
          {[0, 1].map((half) => (
            <ul key={half} className="tkr-set">
              {HALF.map((name, i) => (
                <li
                  key={`${half}-${i}`}
                  className="tkr-item"
                  data-echo={half > 0 || i >= NAMES.length ? "" : undefined}
                >
                  <Mark name={name} />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      {/* şeridin tamamı aria-hidden; ekran okuyucu listeyi bir kez, düz cümle
          olarak alıyor */}
      <p className="sr-only">
        Çalıştığımız kurumlar ve kullandığımız altyapı: {NAMES.join(", ")}.
      </p>
    </div>
  );
}
