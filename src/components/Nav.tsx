"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Building2,
  CalendarCheck,
  CalendarClock,
  CalendarRange,
  Calculator,
  ChevronDown,
  Compass,
  FileDown,
  Handshake,
  IdCard,
  Landmark,
  ListChecks,
  Mail,
  Newspaper,
  Percent,
  Receipt,
  Scale,
  Scale3d,
  ShieldCheck,
  Ship,
  SlidersHorizontal,
  Sparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import Logo from "@/components/shared/Logo";
import SmartLink from "@/components/shared/SmartLink";
import { Flag } from "@/components/shared/CountryPicker";
import { useLenis } from "@/components/Providers";
import { gtm } from "@/lib/gtm";
import { COUNTRY_NAME, COUNTRY_ORDER, FACTS, type CountrySlug } from "@/lib/brand";
import { servicesFor, serviceHref, type Service, type ServiceSlug } from "@/lib/services";
import { LIVE_TOOLS, NAV_TOOLS, type ToolId } from "@/lib/tools/catalog";
import { OFFICE_ORDER } from "@/lib/offices";
/* Kaynaklar panelindeki "son yazı" kartı için: künye elle yazılmıyor,
   yazının kendi kaydından okunuyor (bkz. RESOURCES bloğunun altı). */
import { blogHref, formatDate, sortedPosts } from "@/lib/blog";

/* ============================================================================
   CANLI NAVBAR — "KOYU ÜLKE KARTI, AÇIK ŞERİT"        (stil: app/css/nav.css)

   NEREDEN GELDİ
   /lab/navbar'da onaylanan N8 adayının canlı kopyası. Aday
   components/lab/NavN8.tsx'te .n8- önekiyle DURUYOR ve durmaya devam ediyor:
   lab sayfası yayında ve adaylar orada karşılaştırma kaydı olarak duruyor.
   Yani bu dosya adayın taşınması değil, KOPYALANMASI.

   Kopyanın tek şartı ad alanının ayrılması: iki stil dosyası da globals.css'e
   import ediliyor, sınıf adları paylaşılsaydı lab'da denenen her ölçü canlı
   çubuğu sessizce değiştirirdi. Bu işaretleme onv- ("Ortac NAV") önekini
   kullanıyor, adayda .n8- kalıyor — gerekçenin uzunu app/css/nav.css'in
   başında.

   BİR ÖNCEKİ CANLI SÜRÜMDEN GERİ ALINAN İKİ ŞEY
   Canlıdaki önceki kopyaya (N1) bir tur önce iki müdahale yapılmıştı; müşteri
   ikisini de geri istedi. Aday zaten müdahale öncesi davranışta olduğu için
   olduğu gibi kopyalamak ikisini birden geri aldı:

     1. Menü açılınca çubuk yine renk değiştiriyor. Bunu yapan tek satır
        aşağıda, render'dan hemen önce: solid = scrolled || open !== null ||
        sheet. Ara sürümde ortadaki sebep çıkarılmıştı.
     2. Çubukla panel arasındaki birleştirme çözümü kalktı. O çözüm ağırlıkla
        CSS tarafındaydı (yapışık panel, kare üst köşeler, açık başlığın
        altındaki dil); bileşendeki karşılığı panelin giriş hareketiydi —
        "üst kenardan açılma" (scaleY) yerine yeniden y ekseninde kısa bir
        kayma var, çünkü panel artık çubuğa yapışık değil ve kayarken çubuğun
        üstüne binmiyor.

   MENÜNÜN TEZİ — önce ülke
   Kapalı çubukta dört klasik başlık var: Hizmetler · Araçlar · Kaynaklar ·
   Kurumsal. Ülke ekseni çubuktan indi ama hiyerarşinin tepesinde kaldı:
   Hizmetler panelinin İLK satırı üç ülkelik bir sekme rayı, altındaki her şey
   o seçime bağlı. Ziyaretçi bir hizmet adına tıklamadan önce mutlaka bir
   ülkenin içinden geçiyor — sitenin geri kalanı da aynı eksende çalışıyor
   (hero ülke seçtiriyor, uygunluk testi ülke öneriyor, fiyat ülkeye göre
   değişiyor, hatta hizmetin var olup olmadığı bile ülkeye bağlı).

   KOYU NEREDE — tek bir yerde, ve orası seçili ülkenin kartı
   Aday turunun uzun tartışması tek cümlede bitmişti: "üst şeridi siyah
   yapmışsın, orayı demiyordum; SOLDAKİ ÜLKE KARTININ ARKASINI diyordum."
   Bunun karşılığı iki karar:

     1. ÜST ŞERİT AÇIK. Bant paper zeminli, rayın kendisi beyaz, seçili ülkenin
        hapı mavi. Geometri korundu (tek satır, 34px, yuvarlak bayrak jetonu,
        kayan hap); yalnızca renk açık tarafta.

     2. KOYU, SOLDAKİ KÜNYE KARTININ ARKASINDA. Bayrak, ülke adı, üç künye
        satırı ve ülke sayfası bağlantısı opak #111111 bir kartın üstünde.
        Panelin geri kalanı — hizmet kartları, araçlar, kaynaklar, kurumsal —
        açık düzeninde; tek bir koyu yüzey daha yok.

   ÖLÇÜ MESELESİ — daha eski bir şikâyet tekrarlamasın
   "Sağdaki koyu blok kaba duruyor" teşhisi renk değil ALAN × YER idi: önceki
   levha 320px genişliğinde, panel boyunca tam yükseklikteydi ve panel alanının
   yaklaşık dörtte birini kaplıyordu. Koyu kart üç yerden kısıldı: panelin
   "hangi ülke size uyuyor" eteği hizmet sütunundan çıkarılıp gövdenin altına
   tam genişlikte bir satır olarak taşındı, künye başlığı dikey yerine yatay
   dizildi, sütun 320px yerine 280px oldu. Ölçüldü: koyu kart panelin ALANININ
   %14,3'ü. Sayıların tamamı ve neden 280px olduğu nav.css'in başında.

   ---------------------------------------------------------------------------
   YAPININ DEĞİŞMEZLERİ
   · Hizmet listesi elle yazılmıyor, servicesFor()'dan türüyor; kartın alt
     satırı da öyle (bkz. hintOf).
   · Izgara üç ülkenin BİRLEŞİMİ üzerinden basılıyor: o ülkede yürütmediğimiz
     hizmet kesik çizgili ve tıklanamaz olarak yerinde duruyor. Ülke-önce bir
     menünün klasik zaafı yokluğun sessiz kalmasıdır; burada İngiltere'ye geçen
     ziyaretçi "vize yok" cümlesini görüyor, boşluğu fark etmesi beklenmiyor.
   · FACTS[c].limit'ten gelen ünlemli uyarı satırı yok — ne masaüstünde ne
     mobilde. Menü bir çekince okuma yüzeyi değil.
   · Bütün bağlantılar SmartLink; yayında olmayan adres sönük ve tıklanamaz,
     "yakında" rozeti üretilmiyor. Menünün şu an büyük bölümünün sönük çıkması
     KASITLI: dolaşım lib/routes.ts'te bilerek daraltılmış durumda.

   ERİŞİLEBİLİRLİK (süs değil, kısıt)
   - Tetikleyiciler <button aria-expanded/aria-controls>, <a> değil.
   - Hover tek açılma yolu DEĞİL: tıklama, Enter/Space, ArrowDown.
   - ArrowLeft/ArrowRight dört başlık arasında dolaşır; panel açıksa
     odaklanılan başlığın paneli açılır.
   - Ülke rayı gerçek bir sekme grubu: roving tabindex, ok tuşuyla otomatik
     seçim, aria-selected/aria-controls.
   - ArrowDown ile açılan Hizmetler panelinde odak doğrudan SEÇİLİ ÜLKE
     sekmesine iniyor ([data-pfocus]).
   - Escape kapatır, odağı tetikleyiciye geri verir. Odak tuzağı yok: panel
     DOM'da menü ile sağ blok arasında, Tab'lamaya devam edip CTA'ya çıkılıyor.
   - Ülke sekmeleri hover ile DEĞİŞMİYOR: ray, başlıktan panele inen imlecin
     güzergâhında; hover ile seçseydik ziyaretçi hedefine giderken istemeden
     ülke değiştirirdi.

   MOBİL
   Mega panel mobilde açılmıyor. Karşılığı çarşafın tepesinde: aynı açık şerit,
   aynı üç ülkelik ray, aynı mavi seçim hapı; tek fark rayın hap yerine üç eşit
   paya bölünmesi. Koyu burada da ülke kartının arkasında — çarşaftaki tek koyu
   yüzey "… ülke sayfası" satırı. Böylece "koyu neredeyse SEÇİLİ ÜLKE KARTI
   oradadır" cümlesi iki kırılımda da aynı.
   ========================================================================= */

/* Ülke başlığının altındaki tek satır. Nerede olduğunu söyler, iddia etmez.

   "TEK satır" burada bir üslup tercihi değil ölçü kısıtı: koyu künye kartında
   bu metne 207px düşüyor ve ikinci satıra taşan her ülke kartı 15px uzatıyor —
   uzayan kart panelin yüksekliğini açık ızgaradan alıp koyu tarafa devrediyor
   (bkz. app/css/nav.css'teki ölçü notu). En uzunu İngiltere: 11,5px'te 190px,
   yani bütçe dolmuş sayılır.

   Dubai'nin satırı bu yüzden önceki sürümdeki "· ofisimiz burada" kuyruğunu
   bıraktı;
   iki satıra taşıyordu. Bilgi kaybolmuyor, ülke sayfasında ve Hakkımızda'da
   duruyor — menüde satırın asıl işi zaten "Dubai neresi" sorusuna cevap
   vermek. */
const COUNTRY_LINE: Record<CountrySlug, string> = {
  dubai: "Birleşik Arap Emirlikleri",
  ingiltere: "Birleşik Krallık · Companies House",
  kktc: "Kuzey Kıbrıs · Türkiye'ye en yakın",
};

/* İkon slug'a bağlı, ülkeye değil: aynı iş üç ülkede aynı ikonla çıksın ki ray
   üstünde ülke değiştirirken göz aynı yerde aynı şeyi bulsun. */
const SVC_ICON: Record<ServiceSlug, LucideIcon> = {
  "sirket-kurulusu": Building2,
  muhasebe: CalendarCheck,
  "banka-hesabi": Landmark,
  "oturum-vize": IdCard,
  uyum: ShieldCheck,
};

/* Kartın alt satırı. service.line tam bir cümle ("Lisans sınıfının seçilmesi,
   isim onayı, tescil ve kuruluş evrakının teslimi.") — menüde bu uzunluk kartı
   iki katına çıkarıyor ve göz taramayı bırakıyor. Onun yerine kapsamın ilk
   kalemini alıyoruz: hem kısa, hem gerçek, hem ülkeye göre kendiliğinden
   değişiyor (Dubai "Serbest bölge ticaret lisansı", İngiltere "Companies House
   tescili").

   Tek istisna muhasebe: ilk kalem "Defter tutma", iki kelime, başlığı tekrar
   etmekten öteye geçmiyor. 18 karakterin altındaki kalemler ikinciyle
   birleştiriliyor → "Defter tutma · KDV beyanı". Eşiği sabitlemek yerine elle
   yazılmış bir tablo tutmak da mümkündü; tercih etmedim, çünkü o tablo
   services.ts değişince sessizce yanlışa düşen ikinci bir doğruluk kaynağı
   olurdu. */
function hintOf(s: Service): string {
  const first = s.includes[0];
  if (!first) return s.duration;
  if (first.length >= 18 || !s.includes[1]) return first;
  return `${first} · ${s.includes[1]}`;
}

/* Üç ülkenin hizmet listelerinin BİRLEŞİMİ, ilk görülme sırasıyla. Izgara her
   ülkede aynı sırada aynı sayıda hücre basıyor; ülke değişince düzen
   zıplamıyor ve eksik hizmet boşluk bırakmak yerine kendini söylüyor. Elle
   yazılmış liste yok — bir hizmet bir ülkede açıldığında bu dizi de, kartın
   canlanması da kendiliğinden oluyor. */
const SERVICE_UNIVERSE: { slug: ServiceSlug; title: string }[] = (() => {
  const out: { slug: ServiceSlug; title: string }[] = [];
  for (const c of COUNTRY_ORDER) {
    for (const s of servicesFor(c)) {
      if (!out.some((x) => x.slug === s.slug)) out.push({ slug: s.slug, title: s.title });
    }
  }
  return out;
})();

/* ------------------------------------------------------------ ikincil menü */
type Tile = { label: string; href: string; hint: string; icon: LucideIcon };

/* ============================================================ ARAÇLAR PANELİ
   Panel bu turda yeniden kuruldu. Eski hâli tek sırada dört karttı — müşterinin
   beğendiği düzen oydu ve KART DÜZENİ AYNEN DURUYOR; değişen şey kaç sıra
   olduğu ve sıraların neye göre ayrıldığı.

   NEDEN İKİ SIRA
   Müşterinin bu turdaki yönü net: "aramadan trafik çekebilecek araçlardan
   bahsediyorum biraz daha ağırlıklı." Belgenin huni haritasında (s.4) o iş
   vergi hesaplayıcılarına düşüyor — huninin TEPESİ, yani sürekli organik
   trafik çeken aile. Paneldeki dört kartın hiçbiri o aileden değildi. Üst sıra
   artık tamamen hesaplayıcılardan oluşuyor ve panelin ilk okunan satırı o.

   NEDEN ÜLKE SEKMESİ YOK
   Hizmetler paneli ülke sekmesiyle açılıyor ama araçlarda aynısını yapmadık.
   Gerekçenin uzunu lib/tools/catalog.ts'in başında; kısası: hizmette ülke
   zorunlu ön koşul (İngiltere'de vize hizmeti YOK, liste ülkesiz kurulamıyor),
   araçta değil — belge listesi üç ülkeyi BİRLİKTE göstermek için var, isim
   üretecinin ülkeyle ilgisi yok, ülkeye bağlı olanların ülkesi de zaten kart
   başlığında yazıyor. Ülke sekmesi bu panelde hücrelerin yarısını boşaltır.

   LİSTE ELLE YAZILMIYOR
   Kartlar lib/tools/catalog.ts'ten geliyor (NAV_TOOLS). Menüde karşılığı
   olmayan bir araç listelemek için önce kayıt defterine yalan yazmak gerekiyor
   — bu panel bir tur önce tam olarak o yüzden iki ölü bağlantı taşıyordu
   (/araclar/maliyet-hesaplayici ve /araclar/odeme-altyapisi; ikisi de yazılmamış
   sayfalardı ve app/[...yapim] yakalayıcısını 200 ile gösteriyorlardı).

   SÖNÜK KARTLAR KASITLI VE SAYILI
   Üst sıradaki iki hesaplayıcı henüz yazılmadı, SmartLink onları sönük ve
   tıklanamaz basıyor. Müşteri bu davranışı bu tur açıkça istedi ("navbardaki
   gidilmeyen yerler yine soluk olsun"). Sayı iki ile sınırlı: kalan planlanan
   araçlar menüde değil, /araclar dizininde. Menü bir dolaşım yüzeyi, yol
   haritası değil. Kartın alt satırı da "yakında" demiyor, NEYİ beklediğini
   yazıyor ("oran teyidi bekliyor") — sönüklük böylece bilgi taşıyor.

   BU TURDA KARTLARIN ADRESİ DEĞİŞTİ — ama bu dosyada tek bir adres yazılı
   değil. Araçlar tek sayfadaki çapalardan (/araclar#bae-kdv) kendi
   sayfalarına taşındı (/araclar/bae-kdv); panel bunu kayıt defterinden
   aldığı için hiçbir satırı düzeltmek gerekmedi.

   PANELDEKİ SON ELLE YAZILMIŞ KART DA GİTTİ. Uygunluk testi defterde değildi
   ve burada elle basılıyordu; artık defterin bir kalemi (sabit adresi
   `ownHref` ile orada duruyor). Yani bu dosyada araçlara dair yazılı kalan
   tek şey İKON eşlemesi. */
const TOOL_ICON: Record<ToolId, LucideIcon> = {
  "bae-kurumlar-vergisi": Percent,
  "bae-kdv": Receipt,
  "ingiltere-kurumlar-vergisi": Calculator,
  "kktc-serbest-liman": Ship,
  "uygunluk-testi": SlidersHorizontal,
  "isim-ureteci": Sparkles,
  "free-zone-mainland": Scale3d,
  "golden-visa-uygunluk": IdCard,
  "non-resident-uygunluk": SlidersHorizontal,
  "belge-listesi": ListChecks,
  "yukumluluk-takvimi": CalendarRange,
  "oturum-sayaci": CalendarClock,
};

const tileOf = (id: ToolId): Tile => {
  const t = NAV_TOOLS.find((x) => x.id === id)!;
  return { label: t.title, href: t.href, hint: t.meta, icon: TOOL_ICON[t.id] };
};

/* Üst sıra — huninin tepesi. */
const CALC_TILES: Tile[] = NAV_TOOLS.filter((t) => t.family === "hesaplayici").map((t) =>
  tileOf(t.id),
);

/* Alt sıra — karar araçları ve kuruluş sonrası. Sırası da defterden: uygunluk
   testi karar ailesinin başında duruyor ve panelin en çok kullanılan çıkışı. */
const USE_TILES: Tile[] = NAV_TOOLS.filter((t) => t.family !== "hesaplayici").map((t) =>
  tileOf(t.id),
);

/* Mobil çarşaf akordeonu düz bir liste istiyor: iki sıra art arda + sayfanın
   kendisi. Masaüstündeki başlıklar orada yok, çünkü akordeonun kendisi zaten
   bir başlığın altında açılıyor. Kartın alt satırındaki sayı da elle
   yazılmıyor — defter büyüdüğünde menü kendiliğinden doğru kalıyor. */
const TOOLS: Tile[] = [
  ...CALC_TILES,
  ...USE_TILES,
  { label: "Ülke karşılaştırma", href: "/ulkeler", hint: "Üç ülke yan yana", icon: Scale3d },
  {
    label: "Tüm araçlar",
    href: "/araclar",
    hint: `${LIVE_TOOLS.length} araç, her biri kendi sayfasında`,
    icon: Wrench,
  },
];

/* KAYNAKLAR — dört tür, dört kart. Bu turda "kaynaklar" tek yığın olmaktan
   çıktı; panel de onu izliyor. Eski üç kartın ikisi yanlıştı: "Ülke
   rehberleri" /kaynaklar'a gidiyordu (kendi sayfası yokmuş gibi), "Blog ve
   mevzuat" iki ayrı türü tek karta sıkıştırıyordu ve E-kitaplar
   /kaynaklar/e-kitaplar diye HİÇ OLMAYAN bir adrese bakıyordu — o adres
   app/[...yapim] yakalayıcısına düşüp 200 döndüğü için ölü olduğu
   görünmüyordu. Doğrusu /e-kitaplar. */
const RESOURCES: Tile[] = [
  { label: "Blog", href: "/blog", hint: "Konuyu açan yazılar, kaynağıyla", icon: BookOpen },
  {
    label: "Ülke rehberleri",
    href: "/blog/rehberler",
    hint: "Dubai, İngiltere, KKTC · adım adım yol",
    icon: Compass,
  },
  { label: "Gelişmeler", href: "/gelismeler", hint: "Neyin ne zaman değiştiği", icon: Scale },
  { label: "E-kitaplar", href: "/e-kitaplar", hint: "İndirilebilir uzun içerik", icon: FileDown },
];

/* Sağ sütun — İKİ KART, tasarım aynen duruyor.

   Değişen yalnızca İÇERİK. Eskiden `SWAP:NAV_FEATURED` altında iki UYDURMA
   kart vardı: "En çok indirilen · Dubai kuruluş rehberi · 32 sayfa" (böyle bir
   dosya yok, public/ altında tek PDF bile yok) ve "En güncel · Kurumlar
   vergisi beyan takvimi · Temmuz 2026" (teyitsiz tarih). İkisi de menüyü bir
   keşif yüzeyi yapmak için konmuştu ama keşfettirdikleri şey gerçek değildi.

   Bir kez bu blok tamamen kaldırıldı ve müşteri haklı olarak uyardı: istenen
   içeriğin düzeltilmesiydi, sağ sütunun boşaltılması değil. Yani slotlar
   duruyor, doldukları şey artık doğrulanabilir:
     · İlki sitedeki GERÇEK yazı ve elle yazılmıyor — sortedPosts() en yeniyi
       veriyor, künyesi de yazının kendi alanlarından. Yazı sayısı değişince
       kart kendiliğinden doğru kalıyor.
     · İkincisi bu turda açılan bölüm. "Yeni" sıfatı bir iddia değil olgu:
       /rehberler bu turda yazıldı.
   İkisi de var olan sayfalara gidiyor; yakalayıcıya düşen adres yok. */
const LATEST_POST = sortedPosts()[0];

const FEATURED = [
  ...(LATEST_POST
    ? [
        {
          tag: "Son yazı",
          title: LATEST_POST.title,
          meta: formatDate(LATEST_POST.publishedAt),
          href: blogHref(LATEST_POST.slug),
        },
      ]
    : []),
  {
    tag: "Yeni bölüm",
    title: "Ülke rehberleri",
    meta: "Dubai · İngiltere · KKTC",
    href: "/blog/rehberler",
  },
];

/* ========================================================== KURUMSAL PANELİ
   İLETİŞİM BU LİSTEDEN ÇIKTI — küçüldüğü için değil, büyüdüğü için.

   Müşterinin cümlesi: "iletişim sayfasına giden yolu kurumsalın içinde
   tutuyorsun ya pek göz önünde kalmıyor ama ayrı da ayırmanı istemiyorum çok
   kalabalık olur, o yüzden kurumsalın içinde iletişime özel büyük alan ayır."

   Yani çubuğa beşinci bir başlık eklenmiyor; İletişim panelin İÇİNDE büyüyor.
   Aşağıdaki CorporatePanel bunu kendi kartında basıyor (.onv-ct).

   Bunun işlevsel tarafı da var: bu listede kalan adreslerin HEPSİ hâlâ
   dolaşıma kapalı ve sönük çıkıyor (lib/routes.ts) — bu turda eklenen ikisi
   dahil. /iletisim ise açık, yani panelin TEK canlı çıkışı oydu ve kartların
   en sonunda, en görünmez yerinde duruyordu. */
/* İKİ KART DAHA — ve ikisi de müşterinin kendi teşhisinden geliyor:
   "navbardaki kurumsal sekmesinin içi çok boş hissettirdi 2 tane şey var diye,
   aslında ona bir de basında biz diye bir kısım gelcek + kariyer diye bir şey
   gelcek insanlar iş başvurusu yapmak ister diye."

   SIRA BİLEREK BÖYLE. Izgara iki sütunlu, yani bu dizi 2×2 basılıyor: üst
   satırda ESKİDEN VAR OLAN ikisi (Hakkımızda · İş ortaklığı), alt satırda yeni
   ikisi. Yeni kartları araya sokmak, müşterinin iki tur önce onayladığı üst
   satırın yerini değiştirirdi; ızgaraya alttan eklemek panelin okuma sırasını
   hiç bozmuyor.

   Alt satırlar bugün YOK OLAN şeyi vaat etmiyor. /basinda-biz'in kaydı ve
   /kariyer'in ilanı bugün boş (lib/press.ts, lib/careers.ts) — o yüzden alt
   satırlarda "haberlerimiz" ya da "açık pozisyonlarımız" yazmıyor; kartın
   söylediği şey sayfada GERÇEKTEN olan şey. */
const CORPORATE: Tile[] = [
  { label: "Hakkımızda", href: "/hakkimizda", hint: "Ofis, lisans ve ekip", icon: Building2 },
  {
    label: "İş ortaklığı",
    href: "/is-ortakligi",
    hint: "Danışman ve acente kanalı",
    icon: Handshake,
  },
  {
    label: "Basında biz",
    href: "/basinda-biz",
    hint: "Basın kaydı ve medya iletişimi",
    icon: Newspaper,
  },
  { label: "Kariyer", href: "/kariyer", hint: "Açık pozisyonlar ve başvuru", icon: Briefcase },
];

/* ------------------------------------------- RESMÎ ORTAK ŞERİDİ KALKTI (.onv-ptn)
   Kurumsal panelinin sol sütununda, kartların altında bir "Resmî iş
   ortaklarımız" bandı duruyordu: beş ortağın sönük logosu, brand.ts'teki
   `group === "resmi"` filtresinden geliyordu. Müşteri bu turda kaldırılmasını
   istedi ("kurumsaldaki resmi iş ortaklarımız kısmınıda kaldırabilirsin gerek
   yok").

   NEDEN ŞERİT BURADA GEREKSİZDİ. Bandın tek işi sol sütunun altındaki boşluğu
   kapatmaktı; bu turda kartlar tam genişlikte şeritlere döndüğü için o boşluk
   zaten kalmadı. Yani şerit kaldırılınca panelde açık kalan bir yer yok.

   İDDİA KAYBOLMUYOR. Aynı ortaklar iki yerde yazılı kalıyor: ana sayfadaki
   HeroPartners şeridi ve /hakkimizda. brand.ts · PARTNERS ile lib/brands.ts'e
   dokunulmadı; buradan giden yalnızca navbardaki KULLANIM.

   BİRLİKTE GİDENLER. Şeridin kendisi aria-hidden'dı ve karşılığı tek cümlelik
   görünmez bir özet vardı (OFFICIAL_LINE); ikisi de bu blokla birlikte gitti.
   Bileşende artık BrandChip, brandKeyForName ve PARTNERS içe aktarılmıyor,
   nav.css'te .onv-ptn* kuralı kalmadı. Geride ölü seçici ya da kullanılmayan
   içe aktarma yok. */

/* ------------------------------------------------------------------ anahtar */
const TOP = ["hizmetler", "araclar", "kaynaklar", "kurumsal"] as const;
type TopKey = (typeof TOP)[number];

const TOP_LABEL: Record<TopKey, string> = {
  hizmetler: "Hizmetler",
  araclar: "Araçlar",
  kaynaklar: "Kaynaklar",
  kurumsal: "Kurumsal",
};

/* mobil akordeonlar: Hizmetler hariç hepsi — Hizmetler çarşafın tepesinde,
   ülke şeridiyle birlikte açık duruyor */
const TAIL: TopKey[] = ["araclar", "kaynaklar", "kurumsal"];

/* Mobil akordeonlar. Kurumsal'da İletişim yeniden listeye giriyor: çarşafta
   masaüstünün büyük kartı yok (iki sütun yok, panel yok), o yüzden orada
   İletişim'in "büyük alanı" listenin BAŞI oluyor. Duruş satırı burada da yok.

   Basında biz ve Kariyer buraya ELLE yazılmıyor: liste CORPORATE'i yayıyor,
   yani masaüstü ızgarasına giren her kart çarşafta da kendiliğinden çıkıyor.
   Menünün iki kırılımının ayrışması bu depoda bir kez yaşandı; tek kaynak
   tutmak onu tekrar mümkün kılmıyor.

   Ortak şeridi çarşafa GİRMİYOR ve bu bir eksiklik değil: telefonda o bant beş
   yongayı iki-üç satıra kırıyor ve akordeonun içinde, hiçbir yere gitmeyen bir
   blok olarak duruyordu. İddia kaybolmuyor — aynı ortaklar /hakkimizda'da
   rolleriyle birlikte yazılı. */
const TAIL_ITEMS: Record<string, Tile[]> = {
  araclar: TOOLS,
  kaynaklar: RESOURCES,
  kurumsal: [
    { label: "İletişim", href: "/iletisim", hint: "Üç ofis, tek muhatap", icon: Mail },
    ...CORPORATE,
  ],
};

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------- parça */
/* Eski navbar'ın .nv2-card kalıbı, aday turu üzerinden buraya geldi: çerçeveli
   beyaz kart + çerçeveli kare ikon kutusu; hover'da ikisi birden maviye
   dönüyor ve kart 1px kalkıyor. Açık zeminde kartı ayakta tutan şey dolgu
   değil çerçeve. */
/* aria-label AÇIKÇA YAZILIYOR, ve gerekçesi ölçüldü: erişilebilirlik ağacı
   okunduğunda bu bağlantılar ADSIZ çıkıyordu. Ad iki kat iç içe duruyor
   (<span> içinde <b> ve <em>) ve bu depoda aynı sorun bir kez daha yaşandı:
   görsel olarak gizli bir <span> ağaçta hiç görünmemiş, çözümü aria-label
   olmuştu. Etiket, adın içerikten türeyen hâliyle birebir aynı ("Blog, Konuyu
   açan yazılar, kaynağıyla"), yani hiçbir bilgi eksilmiyor; yalnızca ada
   tahmine değil yazıya bağlı hâle geliyor.

   Tek kolonda alt satır sağa kaçıyor ama SIRA değişmiyor: aria-label DOM
   sırasını değil metni sabitliyor, yani şerit hangi düzende basılırsa
   basılsın duyulan cümle aynı. */
function CardLink({ t, onGo }: { t: Tile; onGo: () => void }) {
  return (
    <SmartLink
      href={t.href}
      className="onv-card"
      aria-label={`${t.label}, ${t.hint}`}
      onClick={onGo}
    >
      <span className="onv-ic" aria-hidden="true">
        <t.icon size={18} strokeWidth={1.9} />
      </span>
      <span className="onv-card-tx">
        <b>{t.label}</b>
        <em>{t.hint}</em>
      </span>
    </SmartLink>
  );
}

/* ------------------------------------------------------- HİZMETLER paneli */
/* Panelin üç katı var: üstte AÇIK ülke şeridi, ortada iki sütun (solda koyu
   künye kartı, sağda hizmet ızgarası), altta tam genişlikte etek. Ülke
   değişince yalnızca orta kat yenileniyor; şerit ve odak yerinde kalıyor,
   yani ok tuşlarıyla üç ülkeyi tarayıp karşılaştırmak mümkün. */
function ServicesPanel({
  c,
  here,
  reduce,
  onPick,
  onGo,
}: {
  c: CountrySlug;
  here: CountrySlug | null;
  reduce: boolean;
  onPick: (c: CountrySlug) => void;
  onGo: () => void;
}) {
  const tabs = useRef<Partial<Record<CountrySlug, HTMLButtonElement | null>>>({});
  const f = FACTS[c];
  const own = new Map(servicesFor(c).map((s) => [s.slug, s]));

  /* Sekme kalıbının standart davranışı: ok tuşu odağı da seçimi de taşır. Üç
     seçenek için doğru olan bu — ziyaretçi Enter'a basmadan üç ülkenin
     künyesini sırayla okuyabiliyor. */
  const onTabKey = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const k = e.key;
    if (k !== "ArrowRight" && k !== "ArrowLeft" && k !== "Home" && k !== "End") return;
    e.preventDefault();
    const i = COUNTRY_ORDER.indexOf(c);
    const n =
      k === "Home"
        ? COUNTRY_ORDER[0]
        : k === "End"
          ? COUNTRY_ORDER[COUNTRY_ORDER.length - 1]
          : COUNTRY_ORDER[
              (i + (k === "ArrowRight" ? 1 : COUNTRY_ORDER.length - 1)) % COUNTRY_ORDER.length
            ];
    onPick(n);
    tabs.current[n]?.focus();
  };

  return (
    <div className="onv-svcp">
      {/* AÇIK ÜLKE ŞERİDİ — N7'nin geri alınan kararı.
          Biçim aynen duruyor (tek satır, hap rayı, yuvarlak bayrak jetonu,
          layoutId ile kayan seçim hapı); değişen yalnızca renk. N7 bu bandı
          gece zeminine oturtmuştu, müşteri "orayı demiyordum" dedi. Şimdi
          bant paper, ray beyaz, seçili hap mavi — yani N1'in ilk hâli.
          Koyu tek bir yere ayrıldı ve orası aşağıdaki künye kartı. */}
      <div className="onv-axis">
        {/* "ÖNCE ÜLKE" ETİKETİ EKRANDAN KALKTI (müşteri: "sitede caps lockla
            yazan bazı gereksiz yazılar var onları kaldır … önce ülke").
            Üç bayraklı hap rayı zaten "bir ülke seçin" diyor; etiket aynı
            şeyi ikinci kez söylüyordu.

            AMA ERİŞİLEBİLİRLİK AĞACINDA KALIYOR. Etiket bir `id` taşıyordu ve
            rayın `role="tablist"` adı ondan geliyordu (`aria-labelledby`);
            düğümü silip bırakmak sekme listesini ADSIZ yapardı. Görsel olarak
            gizli bir <span> de çözüm değil (tuzak G: ağaca çıkmayabiliyor),
            o yüzden ad doğrudan `aria-label` ile veriliyor. */}
        <div className="onv-rail" role="tablist" aria-label="Önce ülke">
          {COUNTRY_ORDER.map((k) => (
            <button
              key={k}
              type="button"
              role="tab"
              id={`onv-tab-${k}`}
              ref={(el) => {
                tabs.current[k] = el;
              }}
              className="onv-ctry"
              aria-selected={c === k}
              aria-controls="onv-cty-panel"
              tabIndex={c === k ? 0 : -1}
              data-here={here === k}
              data-pfocus={c === k ? "" : undefined}
              onClick={() => onPick(k)}
              onKeyDown={onTabKey}
            >
              {/* Seçim mavi bir hap; layoutId ile üç sekme arasında kayıyor.
                  Kayma hareketi "seçim değişti" diyor, üç ayrı yanıp sönen
                  kutudan daha sakin. Renk seçimi bilinçli: şerit artık açık
                  olduğu için beyaz hap (N7'nin çözümü) görünmez olurdu;
                  mavi hem markanın seçim rengi hem de aşağıdaki koyu kartla
                  yarışmıyor. */}
              {c === k && (
                <motion.span
                  layoutId="onv-rail-pill"
                  className="onv-ctry-pill"
                  aria-hidden="true"
                  transition={reduce ? { duration: 0 } : { duration: 0.26, ease: EASE }}
                />
              )}
              <span className="onv-ctry-flag" aria-hidden="true">
                <Flag country={k} />
              </span>
              <span className="onv-ctry-n">{COUNTRY_NAME[k]}</span>
              {here === k && <span className="onv-sr"> (şu an bu ülkedesiniz)</span>}
            </button>
          ))}
        </div>

        <span className="onv-axis-note">Aşağıdaki her şey seçtiğiniz ülkeye göre değişiyor</span>
      </div>

      <div className="onv-body" id="onv-cty-panel" role="tabpanel" aria-labelledby={`onv-tab-${c}`}>
        <motion.div
          key={c}
          className="onv-cty"
          initial={reduce ? false : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.18, ease: EASE }}
        >
          {/* KOYU KÜNYE KARTI — müşterinin işaret ettiği yer.
              "Solda dubai kartı var, orda kısaca anlatıyor" dediği blok bu;
              "arkası siyahtı ya, o hoştu" cümlesi de bunun için söylenmişti.
              Zemin N1'in .n1-id'sinden: opak #111111, alfa yok.

              Ama N1'in ÖLÇÜSÜNDEN değil. Orada kart 320px genişlikte ve
              panel boyunca tam yükseklikteydi; bir tur önce "kaba duruyor"
              denen şey o kütleydi. Burada sütun 280px, başlık yatay (jeton +
              ad yan yana, N1'de alt alta) ve panelin eteği bu sütunun
              hizasından çıkarıldı — üçü birlikte koyu alanı panelin
              %14,3'üne indiriyor (ölçüm: 280 × 240,6 px / 1136 × 414,6 px).

              Ünlemli sınır satırı burada DEĞİL: menü bir çekince okuma yeri
              değil, geçiş yeri. Bilgi ülke sayfasında ve karşılaştırma
              tablosunda duruyor. */}
          <div className="onv-brief">
            <div className="onv-brief-top">
              <span className="onv-brief-flag" aria-hidden="true">
                <Flag country={c} />
              </span>
              <span className="onv-brief-tx">
                <b>{COUNTRY_NAME[c]}</b>
                <em>{COUNTRY_LINE[c]}</em>
              </span>
            </div>

            <dl className="onv-facts">
              <div>
                <dt>Yapı</dt>
                <dd>{f.structure}</dd>
              </div>
              <div>
                {/* "Tipik" kelimesi zorunlu: STANCE_LIMITS kesin süre
                    taahhüdünü yasaklıyor, etiket de bunu söylemeli. */}
                <dt>Tipik süre</dt>
                <dd>{f.days}</dd>
              </div>
              <div>
                <dt>Kimler için</dt>
                <dd>{f.forWhom}</dd>
              </div>
            </dl>

            {/* Koyu kartın tek eylemi, beyaz dolgulu. Kartın içinde kalıyor
                çünkü dışarı alsaydık koyu kart sağdaki ızgaradan kısa kalır
                ve sütunun altında ne yapacağını bilmediğimiz bir boşluk
                açılırdı; içeride margin-top:auto ile dibe yapışıyor. */}
            <SmartLink href={`/${c}`} className="onv-brief-go" onClick={onGo}>
              {COUNTRY_NAME[c]} ülke sayfası
              <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
            </SmartLink>
          </div>

          {/* ÜST ETİKET SİLİNDİ (müşteri: "dubai için yürüttüğümüz
              hizmetler"). Kartların kendisi zaten hizmet adları ve hangi
              ülkeden bahsedildiğini bir satır yukarıdaki açık ülke şeridi
              söylüyor; etiket üçüncü kez aynı şeyi söylüyordu.

              Bölümün TEK adı oydu, o yüzden ad `role="group"` + `aria-label`
              ile duruyor: rolsüz bir <div>'e yazılan `aria-label` ağaca
              çıkmaz, bu depoda üç kez yaşandı (tuzak G). */}
          <div className="onv-svc" role="group" aria-label={`${COUNTRY_NAME[c]} için yürüttüğümüz hizmetler`}>
            <div className="onv-grid" data-cols={2}>
              {SERVICE_UNIVERSE.map((u) => {
                const s = own.get(u.slug);
                const Icon = SVC_ICON[u.slug];

                /* Yokluk sessiz kalmıyor. Kart yerinde duruyor, kesik çizgili
                   ve tıklanamaz; hangi ülkede yürütmediğimizi söylüyor.
                   Kaybolan bilgi okunmuyor: İngiltere'ye geçen ziyaretçi
                   "vize yok" cümlesini görmeli, boşluğu fark etmesi
                   beklenmemeli. */
                if (!s) {
                  return (
                    <span key={u.slug} className="onv-card" data-dead="">
                      <span className="onv-ic" aria-hidden="true">
                        <Icon size={18} strokeWidth={1.9} />
                      </span>
                      <span className="onv-card-tx">
                        <b>{u.title}</b>
                        <em>{COUNTRY_NAME[c]} için yürütmüyoruz</em>
                      </span>
                    </span>
                  );
                }

                /* Adres elle kurulmuyor: serviceHref() ne diyorsa o. Fark
                   görünür — şirket kuruluşunun ayrı bir sayfası yok, ülke
                   sayfasının kendisi o hizmetin sayfası. `/${c}/${slug}`
                   yazsaydık kart, yönlendirmeye düşen ve dolaşıma kapalı olan
                   bir adrese bakacaktı; yani yayında olan tek hizmet menüde
                   sönük görünecekti. */
                return (
                  <SmartLink
                    key={u.slug}
                    href={serviceHref(c, u.slug)}
                    className="onv-card"
                    onClick={onGo}
                  >
                    <span className="onv-ic" aria-hidden="true">
                      <Icon size={18} strokeWidth={1.9} />
                    </span>
                    <span className="onv-card-tx">
                      <b>{s.title}</b>
                      <em>{hintOf(s)}</em>
                    </span>
                  </SmartLink>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* PANEL ETEĞİ — N7'de hizmet sütununun içindeydi, buraya taşındı.
            İki gerekçe, ikisi de bağımsız olarak yeterli:
            (1) Ölçü: sağdaki sütun kısaldığı için, ona hizalanan koyu kart da
                ~50px kısalıyor. Koyu alanı düşüren en büyük tek hamle bu.
            (2) Anlam: "hangi ülke size uyuyor" sorusu hizmet ızgarasının
                değil, ülke seçtiren panelin tamamının eteği. Zaten ülkeden
                bağımsız — ülke değişince yeniden animasyona girmesi de
                gereksizdi, artık keyed bloğun dışında.
            N1'de sağdaki buton siyah dolguluydu; koyu artık künye kartının
            işi olduğu için burada mavi-100 — aynı vurgu, bağırmadan. */}
        <div className="onv-foot">
          <span className="onv-foot-q">
            <Compass size={15} strokeWidth={2} aria-hidden="true" />
            Hangi ülke size uyuyor, emin değil misiniz?
          </span>
          <span className="onv-foot-a">
            <SmartLink href="/ulkeler" className="onv-foot-l" onClick={onGo}>
              Üçünü yan yana görün
            </SmartLink>
            <SmartLink href="/uygunluk-testi" className="onv-foot-l" data-strong="" onClick={onGo}>
              Uygunluk testi
              <ArrowRight size={14} strokeWidth={2.2} aria-hidden="true" />
            </SmartLink>
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------- ARAÇLAR / KAYNAKLAR / KURUMSAL */
/* Üçü de N4'ten olduğu gibi: tek koyu yüzey yok, ağırlığı çerçeve ve boşluk
   taşıyor. Koyu künye kartı bu panellerde YOK — koyu, seçili ülkenin işareti;
   ülkesi olmayan panelde bulunması rengi anlamsızlaştırırdı. */
function TailPanel({ k, onGo }: { k: TopKey; onGo: () => void }) {
  /* ARAÇLAR — eski navbar'ın en beğenilen düzeni: tek sırada dört kart, panel
     genişliğinde. Bölünmüş kolon ve öne çıkan koyu kart yok; dört araç eşit
     ağırlıkta ve hangisinin yayında olduğunu sönüklük söylüyor. */
  if (k === "araclar") {
    return (
      <div className="onv-tail">
        {/* Üst sıra ÖNCE, çünkü panelin ilk okunan satırı bu ve müşterinin bu
            turdaki ağırlık tercihi burada duruyor: arama trafiği çeken
            hesaplayıcılar.

            BU İKİ BAŞLIK SİLİNMEDİ, KISALDI VE VERSALDEN ÇIKTI. Paneldeki
            sekiz kart iki ayrı kümede (dört hesaplayıcı + dört karar/sonrası
            aracı) ve iki kümeyi birbirinden ayıran tek şey bu iki satır;
            silinseler sekiz kart tek ve ayrımsız bir yığın olurdu. Yani
            müşterinin iki şikâyetinden yalnızca ikincisi geçerli burada:
            versal kalktı ("çok fazla ai hissettiriyor"), ad kaldı.
            "· doğrudan bir sayı" kuyruğu ise gerçekten kelime kalabalığıydı,
            onu ikinci başlıkla simetri kurmak için attık. */}
        <p className="onv-h">Hesaplayıcılar</p>
        <div className="onv-grid" data-cols={4}>
          {CALC_TILES.map((t) => (
            <CardLink key={t.label} t={t} onGo={onGo} />
          ))}
        </div>

        <p className="onv-h" style={{ paddingTop: 16 }}>
          Karar araçları ve kuruluş sonrası
        </p>
        <div className="onv-grid" data-cols={4}>
          {USE_TILES.map((t) => (
            <CardLink key={t.label} t={t} onGo={onGo} />
          ))}
        </div>

        {/* Etek, Hizmetler panelindeki kalıbın aynısı: solda bölümün çekincesi,
            sağda iki çıkış. Ülke karşılaştırma buraya indi — bir araç değil bir
            KIYAS ve kendi sayfası var; kart olarak dururken hesaplayıcılarla
            aynı ağırlıkta okunuyordu. */}
        <div className="onv-foot">
          <span className="onv-foot-q">
            Araçların çıktısı bir ön değerlendirmedir, teklif değildir.
          </span>
          <span className="onv-foot-a">
            <SmartLink href="/ulkeler" className="onv-foot-l" onClick={onGo}>
              Ülke karşılaştırma
            </SmartLink>
            <SmartLink href="/araclar" className="onv-foot-l" data-strong="" onClick={onGo}>
              Tüm araçlar
              <ArrowRight size={14} strokeWidth={2.2} aria-hidden="true" />
            </SmartLink>
          </span>
        </div>
      </div>
    );
  }

  /* KAYNAKLAR — eski navbar'daki gibi: solda liste, sağda öne çıkan kartlar.
     Öne çıkanlar orada da açık zeminliydi (paper + çerçeve, hover'da mavi);
     aday turunda bir ara koyulaştırılmıştı, geri alındı, öyle kalıyor. Koyu
     bu bileşende tek bir işe ayrılmış durumda: seçili ülkenin künyesi. */
  if (k === "kaynaklar") {
    return (
      <div className="onv-tail onv-split">
        {/* ÜST ETİKET SİLİNDİ (müşteri tek tek saydı: "Okumalık ve
            indirilebilir kaynaklar"). Panelin adı zaten menüdeki "Kaynaklar"
            düğmesi; dört şeridin her biri de ne olduğunu kendi başlığında
            söylüyor. Ad `role="group"` + `aria-label` ile ağaçta kalıyor. */}
        <div role="group" aria-label="Okumalık ve indirilebilir kaynaklar">
          {/* TEK KOLON, TAM GENİŞLİK: müşterinin bu turdaki açık isteği
              ("navbarda kaynaklar ve kurumsal kısmındaki butonları alt alta
              sırala ve genişliklerini fulleyebilirsin").

              BU KARAR BİR TUR ÖNCE TERS YÖNDEYDİ, ve neden döndüğü yazılmalı:
              o turda data-cols={1} reddedilmişti çünkü Hizmetler ve Araçlar
              ızgara kartı kullanırken bu iki panel şeride dönünce menüde iki
              ayrı kart dili oluyordu. Müşteri farkın kendisini istiyor; o
              yüzden şerit "gerilmiş ızgara kartı" gibi DEĞİL, kendi kalıbı
              gibi duruyor: nav.css'te data-cols="1" kartın metnini tek satıra
              diziyor (başlık solda, alt satır sağda). Ayrım böylece kaza değil
              tercih olarak okunuyor. Hizmetler ve Araçlar panellerine
              dokunulmadı.

              ÖLÇÜ: sol sütun 1fr, yani 1440px'te 716px; dört şerit de o
              genişliğin tamamını kaplıyor. Sağdaki 360px'lik "Öne çıkanlar"
              sütunu yerinde. */}
          <div className="onv-grid" data-cols={1}>
            {RESOURCES.map((t) => (
              <CardLink key={t.label} t={t} onGo={onGo} />
            ))}
          </div>
        </div>
        {/* "ÖNE ÇIKANLAR" DA SİLİNDİ — müşterinin listesinde yoktu, karar bu
            turda verildi ve gerekçesi iki tane.
            (1) HİZA: sol sütunun etiketi müşterinin isteğiyle kalktı; sağdaki
                kalsaydı iki sütun 24px kaymış başlardı ve komşu Kurumsal
                paneli (iki etiketi de kalkan panel) ile aynı iskelet
                olmaktan çıkardı.
            (2) TEKRAR: üç kartın her biri zaten kendi rozetini taşıyor
                (.onv-feat-tag) ve kartlar sol sütundaki şeritlerden apayrı
                bir kalıpta; "öne çıkan" oldukları biçimden okunuyor.
            Ad yine ağaçta duruyor. */}
        <div role="group" aria-label="Öne çıkanlar">
          <div className="onv-feat">
            {FEATURED.map((f) => (
              /* Sol sütundaki şeritlerle aynı gerekçe: üç ayrı <span>'a
                 bölünmüş ad ağaçta görünmüyordu, aria-label yazıya bağlıyor.
                 Duyulan cümle ekrandakiyle aynı sırada: rozet, başlık, künye. */
              <SmartLink
                key={f.title}
                href={f.href}
                className="onv-feat-c"
                aria-label={`${f.tag}: ${f.title}, ${f.meta}`}
                onClick={onGo}
              >
                <span className="onv-feat-tag">{f.tag}</span>
                <span className="onv-feat-t">{f.title}</span>
                <span className="onv-feat-m">{f.meta}</span>
              </SmartLink>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* KURUMSAL — panelin ağırlığı bu turda İLETİŞİM'e geçti.
     Eskiden buranın sağ sütununda "Söz vermediklerimiz" duruyordu ve neden
     durduğu kendi yorumunda yazılıydı: "panelin tamamen sönük kalmaması için".
     Yani dolguydu. Müşteri iki şeyi birden söyledi — o metnin sitede tekrar
     edip durmasından rahatsız olduğunu ve İletişim'in göz önünde olmasını
     istediğini. İkisi tek hamlede çözülüyor: duruş bloğu paneli terk etti,
     yerine büyük iletişim kartı geldi.
     STANCE_LIMITS verisi silinmedi, yalnızca MENÜDEN çıktı; ana sayfadaki
     Duruş bölümünde ve onu kullanan öteki dosyalarda aynen duruyor.

     KART DURUŞ BLOĞUNUN YERİNE GEÇİYOR — panelin düzeni DEĞİŞMİYOR.
     Bu bir kez yanlış yapıldı ve müşteri haklı olarak uyardı: ilk denemede
     sütunlar takas edilmiş, iletişim kartı geniş sol sütuna (1fr) konmuş,
     Kurumsal kartları 360px'lik sağ sütuna itilmişti. İstenen o değildi —
     "öncekinde neler yapmıyoruz gibi bir şey vardı tam olarak aynı boyutta
     onun yerine bir iletişim kartı koyacaktın."
     Yani solda Kurumsal kartları (eskiden neredeyse), sağda 360px'lik dikey
     kart (eskiden duruş bloğunun tam yeri). Panelin iskeletine dokunulmuyor.

     KART ARTIK KOYU ZEMİNLİ, ve bu bilinçli bir kural değişikliği.
     Önceki turlarda kart açık zeminliydi ve gerekçesi şuydu: "koyu bu menüde
     tek bir işe ayrılmış durumda, o iş SEÇİLİ ÜLKE". Müşteri bu turda kuralı
     kendisi esnetti ("kurumsalın içindeki iletişim kartınında arkasını siyah
     yap dikkat çeksin"). Yani menüde artık iki koyu yüzey var ve ikisi farklı
     iş yapıyor: Hizmetler panelinde koyu SEÇİLİ ÜLKEYİ işaret ediyor,
     Kurumsal panelinde koyu TEK CANLI ÇIKIŞI işaret ediyor. İkisi hiçbir
     zaman aynı panelde görünmüyor, o yüzden çakışmıyorlar.
     Renk ölçüsü .onv-brief ile aynı: opak #111111, alfa yok. */
  return (
    <div className="onv-tail onv-split">
      {/* "KURUMSAL" ETİKETİ SİLİNDİ (müşteri tek tek saydı). Paneli açan
          düğmenin adı zaten "Kurumsal"; etiket, açtığınız kapının adını
          kapının içinde bir kez daha yazıyordu. Ad ağaçta duruyor. */}
      <div role="group" aria-label="Kurumsal">
        {/* Ölçü ve gerekçe Kaynaklar paneliyle aynı, orada yazılı. Değişen tek
            şey hücre sayısı: dört kart alt alta dört şerit. Resmî ortak
            şeridi bu sütundan kalktığı için altta boşluk kalmıyor, şeritler
            sütunu kendileri dolduruyor. */}
        <div className="onv-grid" data-cols={1}>
          {CORPORATE.map((t) => (
            <CardLink key={t.label} t={t} onGo={onGo} />
          ))}
        </div>
      </div>

      {/* "BİZE ULAŞIN" ETİKETİ SİLİNDİ (müşteri tek tek saydı). Kartın kendi
          başlığı "İletişim", gövdesi "Ne sorduğunuzu anlatın…" ve altında üç
          ofis şeridi var; etiket dördüncü kez aynı şeyi söylüyordu. Sütuna
          ayrıca `aria-label` KONMADI: içindeki tek düğüm zaten adı olan bir
          bağlantı (aşağıdaki aria-label), boş bir grup adı eklemek ekran
          okuyucuda aynı cümleyi iki kez okuturdu. */}
      <div>
        {/* aria-label burada yalnızca "adsız kalmasın" diye değil, KISALTMAK
            için de var. İçerikten türeyen ad kartın tamamını okuyordu: başlık,
            üç satırlık paragraf, üç ofis adı ve buton metni tek bir bağlantı
            adı olarak arka arkaya duyuluyordu. Kartın işi tek bir şey söylemek;
            duyulan cümle de o. Görünen metnin hiçbiri silinmiyor, ekranda
            aynen duruyor. */}
        <SmartLink
          href="/iletisim"
          className="onv-ct"
          aria-label="İletişim: üç ülkede ofis, tek muhatap"
          onClick={onGo}
        >
          <span className="onv-ct-top">
            <span className="onv-ct-ic" aria-hidden="true">
              <Mail size={20} strokeWidth={1.9} />
            </span>
            <span className="onv-ct-tx">
              <b>İletişim</b>
              <em>
                Üç ülkede ofis, tek muhatap. Ne sorduğunuzu anlatın, hangi ülkede olduğunuz fark
                etmeden aynı ekip cevaplasın.
              </em>
            </span>
          </span>

          {/* Üç ofis şeridi. Sayfanın kendisi de bu omurga üzerine kurulu
              (app/iletisim). Adres ve telefon BASILMIYOR: lib/offices.ts'te
              üçü de boş (SWAP:OFFICE_*) ve uydurulmuş bir numara, arayan ilk
              kişide biten bir yalan. Doğrulanmış olan tek şey ofislerin hangi
              ülkelerde olduğu — yazılan da o. */}
          <span className="onv-ct-of">
            {OFFICE_ORDER.map((c) => (
              <span key={c} className="onv-ct-of-i">
                <span className="onv-ct-of-f" aria-hidden="true">
                  <Flag country={c} />
                </span>
                {COUNTRY_NAME[c]}
              </span>
            ))}
          </span>

          <span className="onv-ct-go">
            İletişim sayfasına gidin
            <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
          </span>
        </SmartLink>
      </div>
    </div>
  );
}

/* ==================================================================== navbar */
export default function Nav() {
  const lenis = useLenis();
  const pathname = usePathname();
  const reduce = useReducedMotion() ?? false;

  /* hangi ülkedeyiz — panelin açılış ülkesi ve "buradasınız" işareti için */
  const seg = pathname?.split("/")[1] ?? "";
  const here = (COUNTRY_ORDER as string[]).includes(seg) ? (seg as CountrySlug) : null;

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<TopKey | null>(null);
  /* Hizmetler panelinin seçili ülkesi. Bulunduğunuz ülke varsa menü orada
     açılıyor: sitenin geri kalanı "önce ülke" diyorsa menü de kullanıcının
     zaten verdiği kararı hatırlamalı. */
  const [panelCountry, setPanelCountry] = useState<CountrySlug>(here ?? "dubai");
  const [sheet, setSheet] = useState(false);
  const [sheetCountry, setSheetCountry] = useState<CountrySlug>(here ?? "dubai");
  const [sheetSec, setSheetSec] = useState<TopKey | null>(null);

  const triggers = useRef<Partial<Record<TopKey, HTMLButtonElement | null>>>({});
  const segs = useRef<Partial<Record<CountrySlug, HTMLButtonElement | null>>>({});
  const panelRef = useRef<HTMLDivElement | null>(null);
  const burgerRef = useRef<HTMLButtonElement | null>(null);
  const hoverT = useRef<number | null>(null);
  const ticking = useRef(false);
  /* Tıklayarak kapatılan başlığın, imleç hâlâ üstündeyken hover ile hemen geri
     açılmasını engelliyor. İmleç başlıktan ayrılınca serbest kalıyor. */
  const suppress = useRef<TopKey | null>(null);
  const wantPanelFocus = useRef(false);

  /* ---------------------------------------------------------------- scroll */
  useEffect(() => {
    const update = () => {
      ticking.current = false;
      setScrolled(window.scrollY > 8);
    };
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(update);
    };
    update();
    if (lenis) {
      lenis.on("scroll", onScroll);
      return () => lenis.off("scroll", onScroll);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lenis]);

  /* mobil çarşaf açıkken arka plan kaymasın */
  useEffect(() => {
    if (!lenis) return;
    if (sheet) lenis.stop();
    else lenis.start();
  }, [sheet, lenis]);

  /* Masaüstü panelde kaydırmayı KİLİTLEMİYORUZ, kapatıyoruz. Kilitlemek daha
     kolay olurdu ama panel hover ile de açılabildiği için, çubuğun üstünden
     geçen imleç sayfayı kilitlemiş olurdu — kullanıcı istemediği bir menü
     yüzünden sayfayı kaydıramaz hâle gelirdi. Tekerlek/dokunma hareketi
     "başka bir şeye bakıyorum" demektir; menü çekiliyor. */
  useEffect(() => {
    if (open === null) return;
    const shut = () => setOpen(null);
    window.addEventListener("wheel", shut, { passive: true });
    window.addEventListener("touchmove", shut, { passive: true });
    return () => {
      window.removeEventListener("wheel", shut);
      window.removeEventListener("touchmove", shut);
    };
  }, [open]);

  /* Adres değişince her şey kapanır ve ülke seçimi yeni sayfaya uyar.
     SmartLink tıklamaları zaten kapatıyor; bu, tarayıcının geri/ileri tuşları
     için emniyet kemeri. Effect değil render sırasında düzeltme (React'in
     "prop değişince state'i ayarla" kalıbı) — effect kullanmak bir kare
     boyunca açık panelin yeni sayfanın üstünde asılı kalmasına yol açıyor. */
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(null);
    setSheet(false);
    if (here) {
      setPanelCountry(here);
      setSheetCountry(here);
    }
  }

  /* ------------------------------------------------------------- klavye */
  const closeToTrigger = useCallback((k: TopKey) => {
    setOpen(null);
    triggers.current[k]?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (open) {
        closeToTrigger(open);
      } else if (sheet) {
        setSheet(false);
        burgerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, sheet, closeToTrigger]);

  /* ArrowDown ile açılan panelde odak ilk anlamlı öğeye iner. Hizmetler
     panelinde bu öğe SEÇİLİ ÜLKE SEKMESİ ([data-pfocus]) — yani klavye
     kullanıcısının da ilk durağı ülke seçimi oluyor, tıpkı farede olduğu gibi.
     Diğer panellerde ilk bağlantıya düşüyor. */
  useEffect(() => {
    if (!open || !wantPanelFocus.current) return;
    wantPanelFocus.current = false;
    const root = panelRef.current;
    if (!root) return;
    const el =
      root.querySelector<HTMLElement>("[data-pfocus]") ??
      root.querySelector<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
    el?.focus();
  }, [open]);

  const onTriggerKey = (e: React.KeyboardEvent<HTMLButtonElement>, k: TopKey) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === "Home" || e.key === "End") {
      e.preventDefault();
      const i = TOP.indexOf(k);
      const next =
        e.key === "Home"
          ? TOP[0]
          : e.key === "End"
            ? TOP[TOP.length - 1]
            : TOP[(i + (e.key === "ArrowRight" ? 1 : TOP.length - 1)) % TOP.length];
      triggers.current[next]?.focus();
      if (open) setOpen(next);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      wantPanelFocus.current = true;
      setOpen(k);
    }
  };

  /* --------------------------------------------------------------- hover */
  const clearT = () => {
    if (hoverT.current !== null) {
      window.clearTimeout(hoverT.current);
      hoverT.current = null;
    }
  };

  /* Hover bir kısayol, tek yol değil. Dokunmatikte hiç çalışmıyor (pointerType
     kontrolü) — orada tıklama var. */
  const hoverOpen = (e: React.PointerEvent, k: TopKey) => {
    if (e.pointerType !== "mouse") return;
    if (suppress.current === k) return;
    clearT();
    const delay = open ? 0 : 90;
    hoverT.current = window.setTimeout(() => setOpen(k), delay);
  };

  const toggle = (k: TopKey) => {
    clearT();
    if (open === k) {
      suppress.current = k;
      setOpen(null);
    } else {
      suppress.current = null;
      setOpen(k);
    }
  };

  /* Odak header'dan tamamen çıkarsa panel kapanır. Odak tuzağı yok: panel
     içinden Tab ile sağdaki CTA'ya geçilebiliyor, oradan da sayfaya. */
  const onHeaderBlur = (e: React.FocusEvent<HTMLElement>) => {
    if (!open) return;
    const next = e.relatedTarget as Node | null;
    if (next && e.currentTarget.contains(next)) return;
    setOpen(null);
  };

  const closeAll = () => {
    clearT();
    setOpen(null);
    setSheet(false);
  };

  /* --------------------------------------------------- mobil şerit (sekme) */
  const onSegKey = (e: React.KeyboardEvent<HTMLButtonElement>, c: CountrySlug) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const i = COUNTRY_ORDER.indexOf(c);
    const n =
      COUNTRY_ORDER[
        (i + (e.key === "ArrowRight" ? 1 : COUNTRY_ORDER.length - 1)) % COUNTRY_ORDER.length
      ];
    setSheetCountry(n);
    segs.current[n]?.focus();
  };

  const solid = scrolled || open !== null || sheet;
  const sheetOwn = new Map(servicesFor(sheetCountry).map((s) => [s.slug, s]));

  return (
    <motion.header
      className="onv"
      data-solid={solid}
      data-open={open !== null}
      data-sheet={sheet}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduce ? 0 : 0.35 }}
      onBlur={onHeaderBlur}
      onPointerEnter={clearT}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse") return;
        clearT();
        const root = e.currentTarget;
        hoverT.current = window.setTimeout(() => {
          /* Fare ile klavye aynı anda kullanılıyorsa imlecin çubuktan çıkması
             paneli kapatmamalı: odak hâlâ panelin içindeyse orada bir şey
             okunuyor demektir. */
          if (root.contains(document.activeElement)) return;
          setOpen(null);
        }, 160);
      }}
    >
      <div className="container-o onv-bar">
        <SmartLink href="/" aria-label="Ortac Global" className="onv-logo" onClick={closeAll}>
          <Logo height={24} />
        </SmartLink>

        <nav className="onv-nav" aria-label="Ana menü">
          {TOP.map((k) => {
            /* Ülke adları çubukta değil (müşteri dört kategori istedi), ama
               "buradasınız" bilgisi kaybolmasın: bir ülke sayfasındaysanız
               Hizmetler başlığının yanında o ülkenin küçük bayrağı beliriyor.
               N4'ün buluşu; N1'in nötr mavi noktasından daha çok şey söylüyor,
               üstelik menünün ekseninin ülke olduğunu çubuk kapalıyken de
               anlatıyor. Hangi ülke olduğunu ekran okuyucuya .onv-sr yazıyor. */
            const marked = k === "hizmetler" && here !== null;
            return (
              <button
                key={k}
                type="button"
                ref={(el) => {
                  triggers.current[k] = el;
                }}
                className="onv-top"
                data-on={open === k}
                aria-expanded={open === k}
                aria-controls={open === k ? "onv-mega" : undefined}
                onClick={() => toggle(k)}
                onKeyDown={(e) => onTriggerKey(e, k)}
                onPointerEnter={(e) => hoverOpen(e, k)}
                onPointerLeave={() => {
                  if (suppress.current === k) suppress.current = null;
                }}
              >
                {TOP_LABEL[k]}
                {marked && here && (
                  <>
                    <span className="onv-top-flag" aria-hidden="true">
                      <Flag country={here} />
                    </span>
                    <span className="onv-sr">, şu an {COUNTRY_NAME[here]} sayfasındasınız</span>
                  </>
                )}
                <ChevronDown className="onv-chev" size={13} strokeWidth={2.4} aria-hidden="true" />
              </button>
            );
          })}
        </nav>

        {/* Panel DOM'da menü ile sağ blok arasında: klavyeyle panelden çıkan
            odak doğal olarak CTA'ya düşüyor, sayfanın başına dönmüyor. */}
        <AnimatePresence>
          {open !== null && (
            <motion.div
              id="onv-mega"
              ref={panelRef}
              className="onv-panel"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: reduce ? 0.01 : 0.24, ease: EASE }}
            >
              <motion.div
                key={open}
                initial={reduce ? false : { opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduce ? 0 : 0.22, ease: EASE }}
              >
                {open === "hizmetler" ? (
                  <ServicesPanel
                    c={panelCountry}
                    here={here}
                    reduce={reduce}
                    onPick={setPanelCountry}
                    onGo={closeAll}
                  />
                ) : (
                  <TailPanel k={open} onGo={closeAll} />
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="onv-right">
          <span className="onv-lang" role="group" aria-label="Dil">
            <button type="button" data-on="" aria-pressed="true">
              TR
            </button>
            <button type="button" aria-pressed="false" aria-disabled="true" title="Yakında">
              EN
            </button>
          </span>
          <SmartLink href="/panel" className="onv-ghost">
            Panel
          </SmartLink>
          <SmartLink href="/basla" className="onv-cta" onClick={() => gtm("nav_cta_click")}>
            Kurulumu Başlat
            <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
          </SmartLink>
        </div>

        <button
          type="button"
          ref={burgerRef}
          className="onv-burger"
          aria-label={sheet ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={sheet}
          aria-controls={sheet ? "onv-sheet" : undefined}
          onClick={() => setSheet((v) => !v)}
        >
          <span data-b="1" />
          <span data-b="2" />
          <span data-b="3" />
        </button>
      </div>

      {/* ------------------------------------------------------ mobil çarşaf */}
      <AnimatePresence>
        {sheet && (
          <motion.div
            id="onv-sheet"
            className="onv-sheet"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: reduce ? 0.01 : 0.26, ease: EASE }}
          >
            <div className="onv-sheet-in">
              {/* Masaüstündeki AÇIK şeridin mobil ikizi: aynı paper zemin,
                  aynı üç ülke, aynı mavi seçim hapı. Mega panel mobilde
                  açılmıyor ama "önce ülke" fikri aynen duruyor ve akordeona
                  sokulmuyor — çarşafın en çok kullanılan bölümü bu.
                  Tek fark rayın hap dizisi yerine üç eşit paya bölünmesi:
                  telefon genişliğinde satır içi diziliş sağa taşıyordu. */}
              <div className="onv-axis onv-axis-m">
                <span className="onv-axis-tag" id="onv-seg-lbl">
                  Hizmetler · önce ülke
                </span>

                <div className="onv-rail onv-rail-m" role="tablist" aria-labelledby="onv-seg-lbl">
                  {COUNTRY_ORDER.map((c) => (
                    <button
                      key={c}
                      type="button"
                      role="tab"
                      id={`onv-seg-${c}`}
                      ref={(el) => {
                        segs.current[c] = el;
                      }}
                      aria-selected={sheetCountry === c}
                      aria-controls="onv-seg-panel"
                      tabIndex={sheetCountry === c ? 0 : -1}
                      className="onv-ctry"
                      data-here={here === c}
                      onClick={() => setSheetCountry(c)}
                      onKeyDown={(e) => onSegKey(e, c)}
                    >
                      {sheetCountry === c && (
                        <motion.span
                          layoutId="onv-seg-pill"
                          className="onv-ctry-pill"
                          aria-hidden="true"
                          transition={reduce ? { duration: 0 } : { duration: 0.26, ease: EASE }}
                        />
                      )}
                      <span className="onv-ctry-flag" aria-hidden="true">
                        <Flag country={c} />
                      </span>
                      <span className="onv-ctry-n">{COUNTRY_NAME[c]}</span>
                      {here === c && <span className="onv-sr"> (şu an bu ülkedesiniz)</span>}
                    </button>
                  ))}
                </div>
              </div>

              <div
                className="onv-seg-panel"
                id="onv-seg-panel"
                role="tabpanel"
                aria-labelledby={`onv-seg-${sheetCountry}`}
              >
                {/* Masaüstündeki koyu künye kartının mobil karşılığı. Çarşafta
                    iki sütun yok, o yüzden kart tek satıra iniyor — ama koyu
                    olan yine SEÇİLİ ÜLKE KARTI, yani kural iki kırılımda da
                    aynı. Çarşaftaki tek koyu yüzey bu satır. */}
                <SmartLink href={`/${sheetCountry}`} className="onv-m-country" onClick={closeAll}>
                  <span>
                    <b>{COUNTRY_NAME[sheetCountry]} ülke sayfası</b>
                    <em>{FACTS[sheetCountry].structure}</em>
                  </span>
                  <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
                </SmartLink>

                {/* Masaüstündeki ızgarayla aynı kural: liste birleşim üzerinden
                    basılıyor, o ülkede olmayan hizmet satırı kaybolmuyor,
                    "yürütmüyoruz" diyor. Adres yine serviceHref()'ten.
                    Mobil sınır uyarısı da masaüstündeki gibi kaldırıldı. */}
                {SERVICE_UNIVERSE.map((u) => {
                  const s = sheetOwn.get(u.slug);
                  const Icon = SVC_ICON[u.slug];
                  if (!s) {
                    return (
                      <span key={u.slug} className="onv-m-row" data-dead="">
                        <span className="onv-m-ic" aria-hidden="true">
                          <Icon size={16} strokeWidth={2} />
                        </span>
                        {u.title}
                        <em>{COUNTRY_NAME[sheetCountry]} için yok</em>
                      </span>
                    );
                  }
                  return (
                    <SmartLink
                      key={u.slug}
                      href={serviceHref(sheetCountry, u.slug)}
                      className="onv-m-row"
                      onClick={closeAll}
                    >
                      <span className="onv-m-ic" aria-hidden="true">
                        <Icon size={16} strokeWidth={2} />
                      </span>
                      {s.title}
                    </SmartLink>
                  );
                })}
              </div>

              <SmartLink href="/uygunluk-testi" className="onv-m-unsure" onClick={closeAll}>
                <Compass size={15} strokeWidth={2} aria-hidden="true" />
                Emin değilim, bana uygun olanı bulun
                <ArrowRight size={14} strokeWidth={2.2} aria-hidden="true" />
              </SmartLink>

              <div className="onv-m-acc">
                {TAIL.map((k) => {
                  const items = TAIL_ITEMS[k];
                  const on = sheetSec === k;
                  return (
                    <div key={k} className="onv-m-sec">
                      <button
                        type="button"
                        className="onv-m-top"
                        aria-expanded={on}
                        aria-controls={on ? `onv-m-${k}` : undefined}
                        onClick={() => setSheetSec(on ? null : k)}
                      >
                        {TOP_LABEL[k]}
                        <ChevronDown
                          size={17}
                          strokeWidth={2}
                          aria-hidden="true"
                          style={{
                            transform: on ? "rotate(180deg)" : "none",
                            transition: reduce ? "none" : "transform 200ms var(--ease-out-soft)",
                          }}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {on && (
                          <motion.div
                            id={`onv-m-${k}`}
                            initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                            animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                            transition={{ duration: reduce ? 0.01 : 0.22, ease: EASE }}
                            style={{ overflow: "hidden" }}
                          >
                            <div className="onv-m-body">
                              {items.map((t) => (
                                <SmartLink
                                  key={t.label}
                                  href={t.href}
                                  className="onv-m-row"
                                  onClick={closeAll}
                                >
                                  <span className="onv-m-ic" aria-hidden="true">
                                    <t.icon size={16} strokeWidth={2} />
                                  </span>
                                  {t.label}
                                </SmartLink>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              <div className="onv-m-cta">
                <SmartLink href="/basla" className="onv-cta onv-cta-full" onClick={closeAll}>
                  Kurulumu Başlat
                  <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
                </SmartLink>
                <SmartLink href="/panel" className="onv-ghost onv-ghost-full" onClick={closeAll}>
                  Panel
                </SmartLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Perde: hem odağı panele toplar hem de dışarı tıklamayı tek yerde
          çözer. Klavye için görünmez (aria-hidden, odaklanamaz). */}
      <AnimatePresence>
        {(open !== null || sheet) && (
          <motion.div
            className="onv-scrim"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.22 }}
            onClick={closeAll}
          />
        )}
      </AnimatePresence>
    </motion.header>
  );
}
