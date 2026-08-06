import { BadgeCheck } from "lucide-react";
import { PARTNERS } from "@/lib/brand";
import { brandKeyForName } from "@/lib/brands";
import { BrandChip } from "@/components/shared/BrandMark";

/* §1 — hero'nun altındaki ortak şeridi. Tek kesintisiz sıra, grup başlığı yok:
   şeridi "resmî ortaklıklar" ve "kullandığımız altyapı" diye ikiye bölmek,
   yalnızca göz ucuyla bakılacak bir banda iki etiket ve bir ayraç sokuyordu.
   Şerit hiçbir şeyi ortaklık diye iddia da etmiyor, çünkü artık üstünde hiç
   etiket yok; roller ülke ve hizmet sayfalarında duruyor.

   ÖNCEKİ TURDA DEĞİŞEN — neden lucide ikonları gitti
   Her ad için BadgeCheck / Landmark / CreditCard basılıyordu: yani ekranda
   Stripe'ın yanında jenerik bir kart ikonu duruyordu. Bu, "Stripe ile tahsilat"
   iddiasını soyut bırakıyor — ziyaretçi tanıdığı işareti görmeden cümleye
   ikinci bir kanıt bulmuyor.

   BU TURDA DEĞİŞEN — dokuz addan YEDİSİ artık tam logo
   Müşteri lockup'ları gönderdi (lib/brands.ts). Kademeyi seçen kod BURADA
   DEĞİL ve bir satırı bile değişmedi: kayıt defterinde `wordmark` varsa
   BrandChip markanın kendi lockup'ını basıyor (plakasız ve adsız — ad zaten
   logonun içinde), yoksa plaka + işaret + ad düzeni sürüyor. Bu dosyada
   değişen tek SAYI aşağıdaki PASSES, ve o da bir sonuç: lockup'lar daha dar
   olduğu için bir geçişin eni düştü ve döngü bir geçiş daha istedi.

   Şeritte bugün plakalı düzende kalan TEK ad var:

     Wise — zip'te yoktu; elde yalnızca simge, plakasıyla çıkıyor

   İkinciydi ve çıktı: müşteri panelinin markası kayıt defterinde hiç yoktu ve
   lucide ikonuyla akıyordu. O ad bu turda siteden tamamen kalktı, yani şeritte
   artık ikonla çıkan hiçbir marka yok. Plaka Wise için bir okunaklılık kararı
   olarak duruyor: fıstık yeşili kendi zemini olmadan beyaz şeritte
   kayboluyor. (Zeminin kendi hikâyesi ticker.css'in başındaki teşhiste.)

   İKİ KADEME AYNI SATIRDA — ölçüldü, 25.2px'e karşı 30px
   Lockup yongası MARK×0.7 gövde + iki katı pencere = 25.2px, plakalı yonga
   MARK+12 = 30px. Fark 4.8px ve şerit `align-items: center` olduğu için
   ortadan hizalanıyor; ekranda tek bir satır ritmi görünüyor. Sayıyı
   eşitlemek için BrandChip'e `optical` geçilebilirdi ama geçilmedi: o sabit
   nav şeridinin 42px'lik yonga hesabını da tutuyor ve iki vitrinde birden
   ayarlanan bir sayı olmaması daha güvenli. */

/* İşaret ölçüsü. Plaka BrandChip'in kendi hesabı: işaret + 6px iç boşluk. Aynı
   sayıyı burada da tutuyoruz ki markası olmayan adın lucide plakası milimetre
   milimetre BrandChip'inkiyle örtüşsün.

   18, tablo satırındaki 16'dan bir tık büyük. Gerekçe baş harfli markalardı
   (16'da "IF" akan şeritte okunmuyordu) ve o sorun bu turda kendiliğinden
   kalktı: şeritte artık tek bir monogram kalmadı. Sayı yine de 18 kalıyor,
   çünkü artık BAŞKA bir işi var — lockup'ın gövde yüksekliğini o veriyor
   (18 × 0.7 = 12.6px) ve şeridin bütün ritmi bu sayıya bağlı. */
const MARK = 18;
const PLATE = MARK + 12;

/* BURADA BİR İKON EŞLEMESİ VARDI (FALLBACK_ICON) ve tek satırı müşteri
   panelinin markasıydı: kayıt defterinde vektörü olmadığı için şeritte lucide
   ikonuyla akıyordu. O ad siteden tamamen çıktı (brand.ts · PARTNERS'taki
   gerekçe), eşlemede eşlenecek bir şey kalmadı. Şeritteki her ad artık kayıt
   defterinde: aşağıdaki BadgeCheck yalnızca bir güvenlik ağı — markası
   olmayan yeni bir ad girerse plaka boş kalmasın diye. */

/* Şeride PARTNERS dışından BİR ad giriyor: Wise. Yeni bir iddia değil —
   brand.ts'teki PAY_MATRIX'in "Ödeme kuruluşu" grubunda ve ülke metinlerinde
   zaten adı geçen bir kanal; şerit sadece onu görünür kılıyor. Kart şemaları
   (Visa, Mastercard) kayıt defterinde olsa da BURAYA GİRMİYOR: onlar bizim
   çalıştığımız kurumlar değil, kartın kendisi.

   PAYONEER BURADAN ÇIKTI, ŞERİTTEN DEĞİL. Bu turda PARTNERS'a girdiği için
   listede zaten var; iki yerde birden durursa şeritte AYNI LOGO İKİ KEZ
   akıyordu — sessiz bir hata, çünkü ne tip denetimi ne de derleme görür,
   yalnızca ekranda tekrar olarak fark edilir. EXTRA artık tanımı gereği
   "PARTNERS'ta OLMAYAN ama sitede geçen ad" demek; bir gün Wise de PARTNERS'a
   girerse bu dizi boşalır ve satır ölür.

   Emirates NBD, Binance ve Meydan FZ bu turda PARTNERS'a girdi, dolayısıyla
   şeritte de görünüyorlar — ama şerit hiçbir şeyi ortaklık diye iddia etmiyor
   (üstünde etiket yok, roller ülke ve hizmet sayfalarında). Şerit sonsuz
   döndüğü için sıra "sonda kalmak" anlamına gelmiyor; her ad döngünün bir
   yerinde ortada. */
const EXTRA = ["Wise"];
const NAMES = [...PARTNERS.map((p) => p.name), ...EXTRA];

/* Bir "yarı" ekranın en genişinden geniş olmalı, yoksa -50%'lik sıçramada
   döngüde bir boşluk yürüyor. Ölçüm .tkr-set'in offsetWidth'i.

   DÖRT DEĞİL ÜÇ — ve sebebi listenin büyümesi. Geçen tur dokuz ad vardı, bir
   geçiş 1440px'te 981px tutuyordu ve üç geçiş (2.944px) 3440px'lik ultra-geniş
   monitörü kapatmadığı için dördüncü geçiş eklenmişti. Bu turda liste dokuzdan
   ON DÖRDE çıktı (PARTNERS'a altı ad girdi, EXTRA'dan Payoneer düştü); bir
   geçiş tarayıcıda yeniden ölçüldü ve 1.474px oldu. Artık üç geçiş 4.423px
   ediyor, yani 3440px'in 983px üstünde — dördüncüsü 5.897px'e çıkarıp hiçbir
   ekranın görmediği 2.457px'i boşuna DOM'a basardı. (Dar ekranda yonga dolgusu
   24→16px düşüyor ve geçiş kısalıyor; ama 3440px'lik bir ekran o kırılıma hiç
   girmiyor, kritik hâl zaten geniş ekran.)

   BU TURDA LİSTE KISALDI: 14 → 13. Müşteri panelinin markası çıktı (gerekçe
   yukarıda, FALLBACK_ICON'un yerinde). Yeniden ölçüldü, tahmin edilmedi:
   1440px'te bir geçiş 1.474px'ten 1.321px'e indi, üç geçişlik yarı 3.963px.
   3440px'lik ultra-geniş ekranda görünür alan 3.425px, yani yarı hâlâ 538px
   FAZLA — döngüde boşluk yok, PASSES 3 kalıyor. İkiye düşürmek 2.642px verirdi
   ve 3440px'te açık bir boşluk yürürdü.

   HIZ BUNUN SONUCU, ayrı bir ayar değil: yarı daraldıkça aynı süre şeridi
   yavaşlatıyor. Tur süresi ticker.css'te 68sn'den 61sn'ye indi ki şerit
   ~65px/sn'de kalsın (3.963 ÷ 61 ≈ 65). Bu ikisi birlikte değişir.

   Listeye ad eklenirse ya da bir markanın kademesi değişirse bu sayı YENİDEN
   ÖLÇÜLMELİ; tahminle değiştirilmemeli. */
const PASSES = 3;
const HALF = Array.from({ length: PASSES }, () => NAMES).flat();

function Mark({ name }: { name: string }) {
  const key = brandKeyForName(name);
  if (key) return <BrandChip brand={key} size={MARK} />;

  /* Kayıt defterinde yok: eski ikon davranışı sürüyor, ama BrandChip'in
     kabuğunu ödünç alarak — böylece şeritte "plakalı" ve "plakasız" iki ayrı
     ritim oluşmuyor. .bm- paylaşılan bir tasarım ad alanı (.btn gibi), kopyasını
     çıkarmak iki yerde bakım demek olurdu. */
  const Icon = BadgeCheck;
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
