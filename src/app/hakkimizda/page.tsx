import type { Metadata } from "next";
import Image from "next/image";
import {
  Building2,
  Calculator,
  Compass,
  CreditCard,
  Handshake,
  History,
  Landmark,
  Languages,
  LayoutDashboard,
  Mail,
  MapPin,
  Phone,
  Stamp,
  Target,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import Nav from "@/components/Nav";
import FinalCta from "@/components/FinalCta";
import PageHero from "@/components/shared/PageHero";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import AskCta from "@/components/shared/AskCta";
import DayanakBento from "@/components/about/DayanakBento";
import { BrandChip } from "@/components/shared/BrandMark";
import { brandKeyForName } from "@/lib/brands";
import { PARTNERS } from "@/lib/brand";
import { TEAM_PHOTO } from "@/lib/media";
import SektorFotoKartlari from "@/components/shared/SektorFotoKartlari";
import {
  BASIS,
  CONTACT,
  FOR_WHOM,
  HERO,
  HOW,
  IDENTITY,
  OPENING,
  SEO,
  partnerTypes,
  type AboutIcon,
  type ContactKind,
} from "@/lib/about";

/* ============================================================================
   HAKKIMIZDA — /hakkimizda

   Bu dosyada tek bir cümle yok. Sayfada görünen her kelime lib/about.ts'te ya
   da lib/brand.ts'te duruyor; şablon yalnızca onu diziyor. Sebebi onaydan
   geliyor: firma hakkındaki iddiaları müşteri ve muhasebeci tek dosyadan
   okuyup onaylayabilsin, kimse doğrulama yapmak için React okumak zorunda
   kalmasın.

   ------------------------------------------------------ NEDEN BAŞTAN YAZILDI
   Önceki sürüm ekranda çöküyordu ve sebebi tek bir şeydi: bu sayfanın CSS'i
   hiç yazılmamıştı (hakkimizda.css tek satırlık bir yer tutucuydu). Flag
   bileşeni width/height taşımayan çıplak bir <svg> döndürüyor — kabı
   ölçülmediğinde bayrak kabına yayılıyor ve ekranı kaplıyor. Aynı sebeple
   metinler de biçimsiz akıyordu.

   Bu turda hem CSS yazıldı hem sayfa yeniden kurgulandı. En büyük kurgu
   değişikliği: ÜÇ ÜLKE KÜRESİ KALDIRILDI. Mutlak konumlu bayrak işaretleriyle
   dolu bir tel kafes küre, sayfaya hiçbir bilgi eklemeden bütün kırılganlığı
   üstlenen parçaydı — ve kırıldığı yer tam olarak orasıydı. Yerine aynı üç
   ülkeyi taşıyan ama ölçüsü sabit üç kart geldi.

   ---------------------------------------------- MÜŞTERİNİN İKİ KURALI, BURADA
   1) "Her section özet versin, detay tıklamayla ya da başka sayfada açılsın."
      Ülke kartları ülke sayfasına, sektör kartları sektör sayfasına çıkıyor.

      DİKKAT — bu kuralın İKİ istisnası var ve ikisi de müşterinin kendi geri
      bildiriminden çıktı:

        · Vizyon ve misyon bir tur boyunca <details> içinde kapalı bekledi,
          müşteri sayfayı okudu ve "vizyon misyon hiç yazmıyor" dedi. Kapalı
          duran şey görülmüyor. Artık açıkta. Aynısı taahhüt sınırları için de
          geçerli (bkz. 5. bölüm).
        · Açılıştaki üç kutucuk bir tur boyunca sayfanın İÇİNDEKİLER TABLOSUYDU
          — her rakam kendi bölümüne inen bir çapaydı. Müşteri o işi iptal
          etti: "bir yere yönlendiren bir tarzı fln olmasın aşağı fln
          göndermesin ya sadece sayı verelim." Artık bağlantı değiller.

   2) "Anlatmayacağız, göstereceğiz." Sayfada iki paragraflık tek bir düz
      metin var (açılış) ve o da müşterinin talebi. Geri kalan her bilgi bir
      yapıya bağlı: künye bir tabloya, ülke bir bayrak diskine, hizmet sırası
      numaralı bir raya, ortaklar gerçek marka işaretlerine, sektörler kartlara.

   ------------------------------------------------------------------- AKIŞ
   Sayfa bir kurumsal broşür değil, bir kayıt zinciri. Ekran sırası = kaynak
   sırası:

     0   hero           kırıntı + h1 + tek cümle, FOTOĞRAFSIZ
     1   kim olduğumuz  afiş (fotoğraf + tek cümle + paragraf) + vizyon/misyon
     1B  neye dayanarak BENTO: beş karo, her birinde bir sahne  (gece)
     4B  kurumlar       TEK ortak listesi (türe göre)
     5   işi kim yürütüyor  üç ilke                              #nasil
     6   kimler için    altı sektör                              #sektorler
     7   künye          sicil kaydı, sayfanın dipnotu
     8   temas          tek çıkış

   4 NUMARASI BOŞ ve bilerek: dört dayanak kartı (eski 4. bölüm) 11.09.2026'da
   sayfadan çıktı, yerini 1B aldı (önce levha, 21.09'dan beri bento). 3
   de boş: alıntı bandı 19.09'da kalktı. Numaralar yeniden verilmedi,
   çünkü about.ts ile hakkimizda.css bölümlere numarayla atıf yapıyor ("7.
   bölüm", "5. bölümün rayı" …) ve yeniden numaralamak onların hepsini
   sessizce yanlış bırakırdı. "4B" öneki de aynı sebeple doğmuştu.

   ---------------------------------------------------- AÇILIŞ NEDEN DEĞİŞTİ
   1. bölüm iki tur önce KÜNYE TABLOSUYDU. Müşteri reddetti: "firma künyesi
   kısmına gerek yok hakkımızda bölümünde... bir kısım olsun ve görselle
   açılsın, oraya bi ekip fotosu bulur koyarsın." İki iş birden çıktı:

     · Açılış görselle açılıyor (media.ts · TEAM_PHOTO — yer tutucu, müşteri
       kendi çekimiyle değiştirecek) ve yanında firmanın ne yaptığını düz
       cümleyle söyleyen iki paragraf var. Sayfada daha önce böyle bir metin
       hiç yoktu.
     · Vizyon ve misyon aynı bölümde, AÇIK iki kart olarak duruyor.

   FOTOĞRAF BİR TUR HERO'DAYDI, BU TURDA GERİ İNDİ. Müşteri kareyi hero'da
   görmek istemedi: "hakkımızdada heroda görsel kullanmayı beğenemedim ya,
   kim olduğumuz kısmına geri çekelim." Yani yukarıdaki iki madde yeniden
   birebir geçerli — bölüm görselle açılıyor, vizyon ve misyon aynı bölümde
   açık duruyor. Hero kompakt başlık bloğuna döndü ve fotoğrafsız kaldı;
   gerekçe PageHero çağrısında.

   Künye silinmedi, 7. bölüme indi: veri doğrulanmış ve /basinda-biz aynı
   satırların dördünü basıyor. Gerekçenin tamamı about.ts · IDENTITY başında.

   -------------------------------------------------------------- ZEMİN RİTMİ
   gece(hero) → beyaz(açılış) → beyaz(dayanak levhası) → gece(ülkeler) →
   mavi→kâğıt(alıntı) → beyaz(kurumlar) → gece(nasıl) → beyaz(sektörler) →
   gri(künye + temas) → gece(FinalCta). 11.09.2026'da 1440'ta ölçüldü.

   AYNI ZEMİNLE ARKA ARKAYA İKİ YER VAR, İKİSİ DE BİLEREK:
     · künye + temas (gri): tek bir kapanış alanı, sayfanın dipnotu.
     · açılış + dayanak levhası (beyaz): açılışın son paragrafı ("Bunun
       arkasında üç somut dayanak var …") bir KÖPRÜ ve levha o dayanakları
       sayıyor; aynı zemin ikisini tek okuma birimi yapıyor. Müşteri bu hâli
       lab'de (/lab/hakkimizda-levha) gördü ve onayladı; lab'in levha zemini
       de beyazdı (lab-habyon.css · .hyn-sec).

   KURUMLAR BU TURDA KÂĞITTAN BEYAZA DÖNDÜ — gerekçe 4B'nin notunda. Kısaca:
   dayanak kartları aradan çıkınca alıntı bandının kâğıda sönen gradyanı
   doğrudan kâğıt zeminli kurumlara açılıyordu ve iki bölüm arasında hiçbir
   sınır kalmıyordu (ölçüldü: bandın son satırı ile kurumların ilk satırı
   aynı #f5f5f5).

   ------------------------------------------------------------ SUNUCU BİLEŞENİ
   Sayfa "use client" DEĞİL ve öyle kalmalı: generateMetadata ve JSON-LD
   sunucu tarafında üretiliyor. Sayfadaki hareketin neredeyse tamamını FadeUp
   ve SplitWords taşıyor; ikisi de istemci bileşeni ve MotionConfig
   reducedMotion="user" altında çalışıyor (Providers.tsx).

   İSTEMCİYE İNEN BAŞKA BİR ŞEY YOK. Sayaç (CountUp.tsx) bentoyla birlikte
   canlıdan kalktı; 1. bölümdeki fotoğraf da next/image, yani istemci mantığı
   değil. Aşağıdaki BENTO · KÜNYE bloğunda hâlâ sayaçtan söz eden satırlar
   var: orası silinen bentonun kayıt defteri, canlıda karşılığı yok.

   ------------------------------------------ BU TURDA NE DEĞİŞTİ · 11.09.2026
   LEVHA CANLIDA. Müşteri: "muhasebe ve hakkımızda sayfalarını live
   alabilirsin kral." Onaylanan hâl /lab/hakkimizda-levha'daydı ve sırasını
   müşteri kendisi tarif etmişti: "şimdilik şu bizim kim olduğumuz kısmı
   görseliyle dursun, neye dayanarak çalışıyoruzu da onun altına koy, üstüne
   değil."

     · 1B EKLENDİ   Levha'nın dayanak levhası "Kim olduğumuz"un hemen altında
                    (beş satır: 3 ülke · 5 halkalı zincir · 30 yıllık kurumsal
                    geçmiş · IFZA · Murat Ortaç). Satır verisi about.ts ·
                    LEVHA'da, sayılar dizilerden. Lab'deki CSS `order` +
                    `display: contents` düzeni CANLIYA GELMEDİ: burada ekran
                    sırası gerçek kaynak sırası.
     · 4 ÇIKTI      dört dayanak kartı. Levha'nın levhası o bölümün ta
                    kendisiydi (aynı h2, dört kartın üçünün cümlesi birebir);
                    ikisi birden basılsa sayfa aynı başlığı ve üç cümleyi iki
                    kez okuturdu. Veri (about.ts · BASIS.cards) SİLİNMEDİ.
     · 4B ZEMİNİ    kâğıttan beyaza (gerekçe 4B'nin notunda).
     · LEAD YOK     Levha bölümünde lead basılmıyor: aday lab'de oraya
                    OPENING.body[1]'i ("Bunun arkasında üç somut dayanak
                    var …") koyuyordu ve o cümle hemen üstteki bölümün son
                    paragrafı. Bir kez basılıyor, köprü olarak.

   HERO VE "KİM OLDUĞUMUZ" DOKUNULMADI (fotoğrafıyla, tek harfi değişmeden).
   Açılışın "dikkat çekici değil" sorusu (eski /lab/hakkimizda-giris) Levha
   turuyla cevaplandı: müşteri girişin kendisini değil, altına eklenen
   levhayı seçti.

   ------------------------------------------------ ÖNCEKİ TURDAN GELEN KARARLAR
     · FOTOĞRAF    "hakkımızdada heroda görsel kullanmayı beğenemedim ya, kim
                   olduğumuz kısmına geri çekelim."
                   Kare hero'dan 1. bölüme geri indi ve hero PageHero'nun
                   KOMPAKT dalına döndü (`art` da `country` de verilmiyor).
                   Fotoğrafla birlikte ölçüleri de geri geldi: 4/3 oran, açık
                   zemin teli, .ab-open- ad alanı. (`priority` o turda
                   kalkmıştı; 18.09.2026'da ölçümle geri geldi — kare iki
                   genişlikte de LCP ögesi çıkıyor.)
                   İTİRAZ YALNIZ GÖRSELE: geçen turun ikinci işi olan lead
                   kısaltması (247 → 109 karakter) yerinde duruyor, müşteri
                   ona değinmedi.
     · BENTO       "şu ülke sektör vb kısmını daha güzel bir şey yapabiliriz
                   ya çok saçma geldi gözüme, logo vb girebilir işin içine
                   yani elini korkak alıştırma."
                   Üç kutucuğun sağındaki üç SOYUT ÇİZİM kalktı (küre, beş
                   oval, altı karo — dosyası SummaryArt.tsx da silindi).
                   Yerine kutucuğun SAYDIĞI ŞEYİN KENDİSİ geldi: üç gerçek
                   bayrak, altı gerçek sektör ikonu, zincirin beş gerçek adımı.
                   Izgara da eşit üç sütun olmaktan çıktı, gerçek bir bentoya
                   döndü (1. bölüm).
     · ORTAKLAR    "2 başlıkta ayırmamıza gerek yok... aslında hepsiyle bir iş
                   yapıyoruz." İki kutu ("Resmî iş ortaklıkları" ve
                   "Kullandığımız altyapı") tek listede birleşti, TÜRE göre
                   dizildi ve TaxDome bu sayfadan tamamen çıktı (bugün 4B).
     · KÜNYE       "firma künyesi kısmı da kötü bu arada beğenmedim daha güzel
                   bişi çoz." Gazete künyesi düzeni bir sicil kaydına döndü:
                   ticari isim bloğun kendi başlığı boyunda, kalan alanlar
                   çizgilerle ayrılmış bir kayıt listesi (7. bölüm).

   DURAN şeyler: ülke kartlarındaki fotoğraf şeritleri, alıntının mavi kâğıdı,
   zincir rayındaki ışık, sektör kartlarının hover'ı, açık duran vizyon/misyon
   kartları. (Bento ve onunla birlikte sayaç canlıdan kalktı; kazanan aday
   labda kendi dosyasında duruyor.)

   ----------------------------------------------------------- HAREKET BÜTÇESİ
   Giriş hareketleri: hepsi FadeUp / SplitWords, hepsi whileInView + once.

   SÜREKLİ HAREKET · 11.09.2026'DA ÖLÇÜLDÜ. 1440'ta document.getAnimations()
   26 sonsuz animasyon sayıyor; ALTISI bu sayfanın kendi CSS'inden:

     abRailRun    7,5 s ×1   5. bölümün zincir rayındaki ışık   ┐ bu dosyanın
     aktKenar    29,3 s ×5   1B levhasının beş ayracı           ┘ bütçesi

   21.09.2026 NOTU: iki satır da artık yok. Zincir rayı 19.09'da, levha
   21.09'da kalktı (yerine gelen bento sürekli hareket taşımıyor, yalnız
   FadeUp girişi). Bu dosyanın kendi sonsuz animasyonu SIFIR; aşağıdaki
   periyot notları kayıt olarak duruyor.
     PageHero     4 döngü    phgBreathe 26 · phyKay 44,017 ·     ┐ paylaşılan
                             phyKayan1 33,013 · phyKayan2 118,033│ bileşenler,
     FinalCta    16 döngü    kcta-* (24,251 · 34,483 · 40,361 ·  │ bu dosyanın
                             74,959 · 96,769 · 131,129)          ┘ bütçesine girmiyor

   390 · 768 · 1024'te 25: ray 1080'in altında dikey listeye dönüyor ve
   ışığı `display: none` (hakkimizda.css), yani abRailRun düşüyor.

   LEVHA BEŞ YENİ ANİMASYON EKLEDİ ama YENİ PERİYOT eklemedi: 29,3 s lab'deki
   onaylı değer ve sitede tek kopyası o lab dosyasıydı (lab-habyon.css; ana
   oturum silince burası tek kalıyor). Sayfadaki öteki on bir periyodun
   hiçbiri 29.300 ms'nin katı ya da böleni değil (getAnimations ile).
   Mekanizma paylaşılan aktarım kalıbı (aktarim.css), ayrıntı
   hakkimizda.css · HAREKET · LEVHA.

   Bu dosyadan gelen her döngü kuralı sağlıyor: saf CSS, yalnızca
   background-position (ray) ya da border-color (levha) üzerinde, her karede JS
   yok, sekme arkaya alındığında tarayıcı durduruyor ve prefers-reduced-motion:
   reduce altında hiç başlamıyor (tanımlar yalnızca no-preference içinde;
   reduce emülasyonunda levhadan getAnimations() SIFIR döndü, beş satır nötr
   ayraçla duruyor).

   Math.random() yok, her karede JS yok.
   ========================================================================= */

const SITE = "https://ortacglobal.com";
const PATH = "/hakkimizda";

/* about.ts ikonu string taşıyor (bkz. oradaki gerekçe: dosya React'ten
   bağımsız kalsın). Metin ile görselin buluştuğu tek yer burası.

   BUGÜN EKRANDA OKUNAN ÜÇÜ: team · language · panel (5. bölümün ilkeleri).
   stamp · handshake · office · history dört dayanak kartınındı ve kartlar
   11.09.2026'da sayfadan çıktı (yerini ikonsuz Levha aldı). Eşleme yine de
   tam kalıyor: tip Record<AboutIcon> bütün anahtarları istiyor ve kartların
   ikon alanı veride duruyor (about.ts · BASIS.cards, silinmesi yasak);
   dört satırı atmak için AboutIcon tipini daraltmak o veriye dokunmak
   demekti. */
const ICONS: Record<AboutIcon, LucideIcon> = {
  stamp: Stamp,
  handshake: Handshake,
  office: Building2,
  history: History,
  team: UsersRound,
  language: Languages,
  panel: LayoutDashboard,
};

const CONTACT_ICONS: Record<ContactKind, LucideIcon> = {
  phone: Phone,
  mail: Mail,
  address: MapPin,
};

export function generateMetadata(): Metadata {
  /* Kanonik mutlak yazılıyor: layout.tsx'te metadataBase tanımlı değil ve
     göreli bir kanonik geliştirme sunucusunun adresine çözülürdü. */
  return {
    title: SEO.title,
    description: SEO.description,
    alternates: { canonical: `${SITE}${PATH}` },
    openGraph: {
      type: "profile",
      locale: "tr_TR",
      siteName: "Ortac Global",
      url: `${SITE}${PATH}`,
      title: SEO.title,
      description: SEO.description,
    },
  };
}

/* ------------------------------------------------------------ ortak parçalar */

/* Tek bir kurum. Marka kayıt defterinde karşılığı olan TAM LOGOSUYLA çıkıyor
   (bugün on ikisinin on ikisi de öyle), olmayan düz adıyla. Renk ya da işaret
   UYDURULMUYOR: yanlış bir logo, logosuzluktan daha kötü.

   ROL METNİ YOK ve bu bilinçli. Satırın türünü bir üstteki grup başlığı zaten
   söylüyor, ikinci kez yazmak tekrar olurdu; asıl sebep ise IFZA: onun rolü
   veride "Serbest bölge · resmî iş ortağı" ve o son yarısı burada basılsaydı
   müşterinin kaldırdığı ayrım (kiminle resmî ilişkimiz var) listeye geri
   sızardı. Gerekçenin tamamı about.ts · partnerTypes başında. */
function PartnerMark({ name }: { name: string }) {
  const key = brandKeyForName(name);
  /* Logo BEYAZ BİR PLAKADA ve 15'ten 22'ye büyüdü (22.09.2026). Burak:
     "logoların kendileri de küçük gözüküyorlar." Plaka bentodaki IFZA
     plakasının dili; yanına ad yazılmıyor, ad logonun içinde. Kayıt
     defterinde karşılığı olmayan bir ad gelirse düz metinle çıkıyor, uydurma
     bir işaretle değil. */
  return (
    <li className="ab-ku-p">
      {key ? <BrandChip brand={key} optical={22} /> : <b className="ab-ku-n">{name}</b>}
    </li>
  );
}

/* Kategori karolarının ikonu. Tür adı about.ts · PARTNER_TYPE_ORDER'dan;
   listede olmayan bir tür gelirse genel bir ikonla basılıyor, patlamıyor. */
const PARTNER_TYPE_ICON: Record<string, LucideIcon> = {
  "Serbest bölge": Building2,
  Banka: Landmark,
  "Ödeme altyapısı": CreditCard,
  "Muhasebe yazılımı": Calculator,
};

/* ------------------------------------------------------------ BENTO · KÜNYE
   Bu blok bir lab turunun kazananı: /lab/hakkimizda-bento sayfasında
   "Aday 7 · Künye" diye numaralanan düzen. Numara ekrandan OKUNARAK
   doğrulandı — ilk iki turun altı adayı sayfada "ex" işaretli (Karo · Beyan ·
   Yerinde · Akış · Oyma · Mühür), üçüncü tur Künye · Sütun · Levha ve künye
   7 numara. Müşterinin cümlesi birebir: "hakkımızda bentosu için aday 7 olur
   ama ülke olanı anasayfadaki ülke kartındaki görsel gibi bir şey
   yapabilirsin. bide 4 dayanak kısmı şuan bir şey anlatmıyor ya anlaşılmıyor
   yani onu daha açıklayıcı yapabiliriz."

   ------------------------------------------------------------- AD ALANI
   Labdaki karşılığı .hb7- ve o önek canlıya GİRMİYOR: lab-hb7.css ile
   hakkimizda.css aynı globals.css'e giriyor, aynı adlar kullanılsaydı labdaki
   bir deneme canlı sayfayı değiştirebilirdi. Canlıdaki ad alanı .ab-kn-
   ("künye"). Ondan önceki .ab-b* / .ab-bo* ailesinin tamamı bu turda silindi;
   .ab-bento / .ab-bento-w ise ADI DOĞRU olduğu için kaldı, içeriği değişti.

   ------------------------------------------------------- BU TURDA NE DEĞİŞTİ
   KÜRE GERİ ALINDI. Bir tur önce müşteri ülke karosunun ana sayfadaki tel kafes
   küre gibi olmasını istemişti; küre kuruldu, karo iki satır boyu bir kuleye
   çıktı, müşteri gördü ve vazgeçti. Cümlesi birebir:

     "şu ülke şeyini böyle yapma ya vazgeçtim diğerleriyle uyumsuz oldu böyle."

   Gerekçe tek kelime: UYUMSUZ. Ve ölçülebilir bir şikâyet. 1440'ta kürenin
   olduğu hâlde dört karonun taşıdığı mürekkep (boyanan piksellerin karo alanına
   oranı × alan) şöyleydi:

     ülke 122.600  ·  dayanak 55.600  ·  sektör 48.600  ·  zincir 13.000

   Yani ülke karosu, yanındaki karonun DOKUZ katı mürekkep taşıyordu ve dört
   karonun en büyüğüydü (163.958 px², en küçüğün 1,59 katı). Bento dört karolu
   bir ızgara; diğer üç karo düz, sakin levhalar. Küre onların yanında yabancı
   duruyordu. Bu turun işi tek: karoyu küre ÖNCESİNE, bayrak + ülke adı hâline
   döndürmek ve dört karoyu ölçerek dengelemek.

   BAYRAK + AD HÂLİ İKİ KAYNAKTAN BİRLEŞTİ (ayrıntı BentoWhere'de): labdaki
   Künye adayının satır düzeni (.hb7-ulke) ve canlıdaki yuvarlak disk
   (e08b3a7 · .ab-kn-disk). Beyaz halka ALINMADI — gerekçe ölçüde.

   IZGARA YENİDEN DENGELENDİ. Kule kalkınca 2. satırın solunda iki sütunluk bir
   boşluk kalıyordu. Sektör ve dayanağın İÇERİĞİNE dokunulmadı (geçen turun iki
   düzeltmesi duruyor), yalnızca sütun genişlikleri değişti. Ölçüler ve elenen
   düzenler hakkimizda.css · IZGARA.

   ------------------------------------------------------------ NE DEĞİŞMEDİ
   Üç kutucuk yerine DÖRT KARO, iki koyu iki açık, koyular köşegende, eşit
   olmayan hücreler. Etiket var, paragraf yok. Sayaçlar sunucu markup'ında.
   DOM sırası = ekran sırası.

   ETİKET VAR, PARAGRAF YOK. Bandı üç tur belirledi: 1.187 - 1.625 karakterlik
   adaylar "fazla bilgi", 0 - 4 karakterlik adaylar "bomboş" diye reddedildi.
   Karo bir şeyin NE olduğunu söylüyor, NE İŞE YARADIĞINI söylemiyor; o
   cümleler sayfanın kendi bölümlerinde tek tek duruyor.

   ------------------------------------------------------- SAYILAR VE SAYAÇ
   Rakamlar ELLE YAZILMIYOR: her karo map ettiği dizinin uzunluğunu basıyor,
   yani rakam ile nesne aynı satırdan geliyor ve sessizce ayrılamıyorlar. Eski
   `COUNTS` sözlüğü bu yüzden kaldırıldı — ikinci bir kaynak, ayrılabilecek
   ikinci bir sayı demekti.

   Sayaç (CountUp) markup'a SON RAKAMI basıyor; sıfırlama yalnızca kutu henüz
   görünmezken yapılıyor. JS kapalıyken dört karoda da doğru rakam duruyor.

   -------------------------------------------------------- SUNUCU BİLEŞENİ
   Dördü de sunucu bileşeni ve öyle kalmalı. Hareketin tamamı CSS: bu depoda
   useReducedMotion ile render edilen ağacı değiştirmek beş ayrı kalıpta
   hidrasyon hatası çıkardı.
   ========================================================================= */

/* Karoların künye isimleri about.ts · SUMMARY'den okunuyor ki bir gün
   "sektör" başka bir kelimeye dönerse iki yerde değişmesi gerekmesin.

/* 1 · ÜLKE — koyu, dar karo. KÜRE GERİ ALINDI.

   ================== MÜŞTERİNİN BU TURDAKİ CÜMLESİ BU KARODA ================
   "şu ülke şeyini böyle yapma ya vazgeçtim diğerleriyle uyumsuz oldu böyle."

   Geçen turun kürelisi neydi: karo iki satır boyu bir kule (368 × 445,5), içinde
   318 × 349,5'lik bir gece sahne, sahnenin içinde 436 piksellik bir tel kafes
   küre, kürenin üstünde üç beyaz hap. Bento dört karolu bir ızgara ve diğer üç
   karo düz, sakin levha; kürenin derinliği ve ölçeği onların yanında yabancı
   duruyordu. Ölçüsü sayfanın başındaki notta: küre karosu 122.600 mürekkep
   pikseli taşıyordu, yanındaki zincir karosu 13.000.

   -------------------------------------------- HANGİ İKİ KAYNAK BİRLEŞTİRİLDİ
   Karo küreden ÖNCEKİ hâline dönüyor: bayrak + ülke adı, alt alta. O hâlin iki
   kaynağı var ve ikisi de müşterinin beğendiği turlardan:

     LABDAKİ KÜNYE ADAYI  (lab/AboutBentoKunye.tsx · .hb7-ulke)
       satır düzeni: üç satır, bayrak solda ad sağda, 13 piksel aralık.
       Bayrağı 34 × 24'lük YUVARLATILMIŞ DİKDÖRTGEN.
     CANLI HÂL          (git show e08b3a7 · .ab-kn-disk)
       aynı satır düzeni, ama bayrağı 44 piksellik YUVARLAK DİSK; çevresinde
       3 piksellik beyaz halka ve hover'da beyaz halkanın dışına mavi çember.

   ALINAN: labın satır düzeni + canlının YUVARLAK diski (44 piksel).
   Yuvarlak seçildi çünkü sitenin kendi görsel dilinde bayrak zaten yuvarlak
   duruyor (ana sayfa .uk3-disc 56 px, ülke seçici, küredeki hapın içindeki
   22 px disk). Dikdörtgen bayrak bu sayfada başka hiçbir yerde yok.

   ALINMAYAN: BEYAZ HALKA. Gerekçesi ölçü, tercih değil. Halka e08b3a7'de ana
   sayfanın beyaz kartındaki "oyulmuş disk" etkisini taklit ediyordu; gece
   karoda taklit edilecek bir şey yok, geriye bentonun en parlak lekesi kalıyor
   (üç disk × ~443 px² saf beyaz, metin dışında bentodaki tek #ffffff yüzey).
   Halka kalkınca diskin malzemesi dayanak levhasınınkiyle AYNI oluyor: gece
   zeminde --night-line kenarlıklı bir nesne, kenarlığını aktarım dalgası
   boyuyor. Karoların ortak dili bu turda tam olarak bu.

   BAYRAK TUZAĞI: `Flag` width/height taşımayan çıplak bir
   <svg viewBox="0 0 60 40"> döndürüyor ve kabı ölçülmezse 300 × 150'ye
   açılıyor — bu sayfa bir kez tam bu yüzden çöktü. .ab-kn-disk'in ölçü
   satırları silinemez.

   FOTOĞRAF KULLANILMADI: ana sayfadaki ülke fotoğrafı (.ctry-photo ·
   COUNTRY_PHOTO) bu sayfanın 2. bölümünde zaten kart şeridi olarak basılıyor.

/* 2 · SEKTÖR — açık, dar karo. GEÇEN TUR KÜÇÜLDÜ, BU TURDA DOKUNULMADI.

   Müşteri: "sektör boxunun alanını küçült fln bişi yap." Karo bentonun en
   büyüğüydü (1440'ta 752 × 260 = 195.520 piksel kare) ve altı çipi iki satırda
   taşıyordu. Şimdi 368 × 280,6 = 103.261 piksel kare, yani alanın %47'si gitti
   ve çipler 2 × 3 diziliyor. 1440'ta ölçülen yeni sıra: ülke 163.944 · zincir
   111.973 · sektör 103.261 · dayanak 103.261.

   ALTI ÇİPİN ALTISI DA EKRANDA. "+2 daha" gibi bir kısaltma yapılmadı: karonun
   bastığı rakam 6 diyorsa altısı da görünmek zorunda, yoksa rakam ile nesne
   ayrışır.

   Markup DEĞİŞMEDİ, yalnızca sütun sayısı ve çipin ölçüleri değişti — ayrıntı
   hakkimizda.css · 3 · SEKTÖR ÇİPLERİ.

/* 3 · DAYANAK — koyu, dar karo. 2 × 2 MÜHÜR IZGARASI GEÇEN TUR GERİ GELDİ
   ve bu turda hiç açılmadı; ölçüsü de yeri de aynı kaldı.

   ================= BU KARO İKİ TURDUR AYNI SORUYU SORUYOR ==================
   Turların kaydı:

     lab (Aday 7)  2 × 2 dört ADSIZ mühür, karo aria-hidden       8 karakter
     geçen tur     dört SATIR, her satırda ikon + tam başlık     108 karakter
     müşteri       "şu ss attığım iyiydi ... sadece dayanak kısmında icon var
                    sadece diye ne oldukları anlaşılmıyor, gerekirse üstlerine
                    gelince gözüksün ya da başka bir şey bul"

   Yani müşteri LAB HÂLİNE dönülmesini istiyor ama aynı sorunun (ikon tek
   başına ne olduğunu söylemiyor) başka bir yoldan çözülmesini bekliyor. Satır
   çözümü elendi: geçen turda denendi ve "olmamış tam" cevabını aldı.

   ----------------------------------------------- İKİ ÇÖZÜM KURULDU, BİRİ SEÇİLDİ

   ÇÖZÜM A · "Künyeli mühür" — SEÇİLEN. Izgara 2 × 2 kalıyor (labdaki geometri),
   mühür kare bir levhaya dönüyor ve levhanın içinde ikonun ALTINDA dayanağın
   kendi başlığı 10,5 piksellik iki satır hâlinde duruyor. Anlam her cihazda,
   her an, tıklamadan ve beklemeden orada.

   ÇÖZÜM B · "Döner künye" — ELENDİ. Mühürler labdaki gibi tamamen adsız
   kalıyor, altlarında tek satırlık bir künye şeridi dört başlığı sırayla
   gösteriyor ve o an gösterilen başlığın mührü yanıyor. Dokunmatikte de
   çalışıyor (hiçbir etkileşim gerektirmiyor), dört başlık da DOM'da gerçek
   metin.

   B GERÇEKTEN KURULDU VE ÖLÇÜLDÜ, kâğıt üstünde elenmedi: canlı ağaç üstünde
   birebir kuruldu (başlıklar gizlendi, levha labdaki 46 piksellik kuyuya
   indirildi, altına şerit eklendi) ve 1440'ta iki çözüm yan yana ölçüldü —

     karo            A 368 × 280,6   B 368 × 266,5
     levha           A 154 × 87,3    B 154 × 46
     o anki metin    A 103 karakter  B 25 karakter
     içeriğe pay     A %75,1         B %65,6   (B'de 91,6 px ölü alan)

   B'nin kazandırdığı yer 14 piksel, kaybettirdiği 78 karakter. Karo o hâliyle
   müşterinin "bomboş bişi yapmışsın" dediği banda geri iniyor. Üstüne iki
   bağımsız sebep daha:

     1) METNİN SÖNÜP YANMASI BU DEPODA YASAK. Kural aktarim.css'in
        sözleşmesinde yazılı ("Metnin sönüp yanması bu depoda yasak; kontrast
        en kötü karede bile eşiğin altına inmeyecek") ve döner künye tam olarak
        bunu yapıyor.
     2) `reduce` altında dönme duruyor ve geriye ya tek başlık kalıyor (üç
        dayanak görünmez olur, bilgi kaybı) ya da dördü birden basılmak zorunda
        — yani B'nin duruş karesi zaten A'nın kendisi. İki tasarımdan biri
        diğerinin geri düşüşüyse, o biri fazladır.

   HOVER TEK BAŞINA NEDEN ÇÖZÜM DEĞİL: dokunmatik cihazda hover yok, klavyede
   yok, ekran okuyucuda yok. Müşterinin önerisi ("üstlerine gelince gözüksün")
   masaüstü faresi olan ziyaretçiyi çözüyor, kalanını çözmüyor. Bu yüzden
   hover'a yalnızca VURGU bindi (levha kalkıyor, başlık tam beyaza çıkıyor);
   bilginin kendisi hover'a bağlı değil.

   -------------------------------------------------------- NEDEN "SATIR" DEĞİL
   Aynı metin, bambaşka bir kompozisyon. Satır çözümünde dört tane 320 piksel
   genişliğinde şerit vardı ve karo bir listeye benziyordu; burada dört kare
   levha var, ikon büyüdü (16 → 21 piksel) ve merkeze geçti, başlık ikonun
   altında 10,5 piksele ve iki satıra indi. Karo bir liste değil bir mühür
   levhası; okunacak metin hâlâ orada ama artık kompozisyonun konusu değil.

   METİN UYDURULMADI, BASIS.cards[].t OLDUĞU GİBİ BASILIYOR. Kısaltılmadı:
   "Kendi muhasebe lisansımız" → "lisans" gibi bir indirgeme yeni bir ifade
   üretmek olurdu ve aynı iddia sayfada iki farklı kelimeyle çıkardı. Açıklama
   satırı (`s`) burada yok — en kısası 74, en uzunu 127 karakter; dördü bloğu
   1. turun reddedilen bandına ("fazla bilgi") geri çıkarırdı.

   ERİŞİLEBİLİRLİK: karo ARTIK aria-hidden DEĞİL. Labdaki hâlinde bütün ızgara
   erişilebilirlik ağacının dışındaydı, yani dört dayanak ekran okuyucuda HİÇ
   yoktu. Şimdi <ul> gerçek bir liste, dört <b> gerçek metin; aria-hidden
   yalnızca glifte.

/* 4 · ZİNCİR — açık, TAM GENİŞLİKTE alt şerit. BU TURDA SIRASI DEĞİŞTİ:
   ikinci karoydu, dördüncü oldu. Gerekçe ve ölçü hakkimizda.css · IZGARA.
   Beş halka bir rayın üstünde ve her halkanın ADI var. Karo bu turda 752'den
   1136'ya çıktı, yani rayın iki gerekçesi de güçlendi: dalga en uzun yolu
   burada alıyor ve beş ada düşen yer 141 pikselden 213 piksele çıktı.

/* ------------------------------------------------------------------- sayfa */

export default function AboutPage() {
  const identityRows = IDENTITY.rows.filter((r) => r.value);
  const channels = CONTACT.channels.filter((c) => c.value);

  /* Ortak listesi TEK ve TÜRE göre dizili. İki ayrı kutu (resmî / altyapı)
     bu turda kalktı; `group` alanı veride duruyor ama ekranda görünmüyor.
     Kararın gerekçesi about.ts · partnerTypes başında. */
  const partnerGroups = partnerTypes(PARTNERS);

  /* TİCARİ İSMİ AYIRAN HESAP SİLİNDİ (identityName · identityRest). Bir tur
     boyunca ilk satır bloğun başında büyük basılıyor, kalanlar kayıt listesine
     giriyordu. Müşteri labdaki Cephe adayının künyesini istedi ("cehphe
     versiyonundanda künyeyi alabiliriz box halinde ya iyi durabilir") ve orada
     bütün satırlar aynı listede, eşit biçimde duruyor; hiyerarşiyi kutunun
     kendisi ve ikonlu başlığı taşıyor.

     `identityRows` FİLTRESİ YERİNDE ve öyle kalmalı: değeri boş olan satır
     (SWAP:FOUNDED, SWAP:LICENCE_NO …) hiç basılmıyor. "Kuruluş yılı: yok"
     yazan bir satır, bilginin yokluğunu bilgi gibi gösterirdi. */

  /* SAYILAR BURADA DEĞİL. Bir tur boyunca burada `COUNTS` diye bir sözlük
     duruyordu ve bentonun üç rakamını o taşıyordu. Künye turunda kaldırıldı:
     her karo artık map ettiği dizinin uzunluğunu kendisi basıyor (yukarıda,
     BENTO · KÜNYE), yani rakam ile nesne tek bir satırdan geliyor. İkinci bir
     kaynak, sessizce ayrılabilecek ikinci bir sayı demekti. */

  /* JSON-LD — YALNIZCA sayfada zaten yazan, doğrulanmış alanlar.
     Bilerek YOK: foundingDate, numberOfEmployees, address, telephone, email,
     aggregateRating, review. Hiçbirinin doğrulanmış karşılığı elimizde yok ve
     yapısal veride uydurma alan, sayfadaki uydurma cümleden daha ağır bir
     hata: arama motoruna makine tarafından okunabilir bir iddia veriyor.

     @id veriliyor çünkü layout.tsx sitenin her sayfasında asgari bir
     Organization düğümü basıyor; ikisi aynı kurumu anlatıyor ve aynı url'i
     gösteriyor. Bu sayfa o düğümün tam hâli. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana sayfa", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: HERO.crumb, item: `${SITE}${PATH}` },
        ],
      },
      {
        "@type": "Organization",
        "@id": `${SITE}/#organization`,
        name: "Ortac Global",
        alternateName: "Ortac International Accounting",
        legalName: "Ortac Accounting Services LLC",
        url: SITE,
        description: SEO.description,
        areaServed: [
          { "@type": "Place", name: "Dubai" },
          { "@type": "Place", name: "Birleşik Krallık" },
          { "@type": "Place", name: "KKTC" },
        ],
        knowsAbout: [
          "Şirket kuruluşu",
          "Vergi danışmanlığı",
          "Muhasebe",
          "Denetim",
          "Banka hesabı açılışı",
          "Uyum ve AML",
        ],
        employee: {
          "@type": "Person",
          name: "Murat Ortaç",
          jobTitle: "Managing Partner",
        },
      },
      {
        "@type": "AboutPage",
        name: SEO.title,
        url: `${SITE}${PATH}`,
        about: { "@id": `${SITE}/#organization` },
      },
    ],
  };

  return (
    <>
      <Nav />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* ------------------------------------------- HERO · FOTOĞRAFSIZ
            Müşteri geçen turun hero'sunu geri aldı: "hakkımızdada heroda
            görsel kullanmayı beğenemedim ya, kim olduğumuz kısmına geri
            çekelim."

            İTİRAZ GÖRSELE, METNE DEĞİL. Geçen tur burada iki iş birden
            yapılmıştı: fotoğraf 1. bölümden hero'ya taşındı VE lead 247
            karakterden 109'a indi. Müşteri yalnız birincisini reddetti,
            ikincisine hiç değinmedi — o yüzden lead uzatılmıyor. Hero
            fotoğrafsız ve kısa kalıyor; düşen cümle ("Bu sayfada firmayla
            ilgili yalnızca doğrulanabilir olanı yazıyoruz…") sayfanın kendi
            içindekiler tablosuydu ve içeriği zaten üç yerde daha duruyor
            (about.ts · HERO'daki gerekçe).

            ================= HANGİ DALA DÖNÜLDÜ: `art` YOK, `country` YOK ===
            PageHero'nun üç dalı var (bileşenin kendi belgesinde):

              country var          → iki sütunlu hero + O ÜLKENİN sahnesi
              country yok, art var → iki sütunlu hero + sayfanın verdiği sahne
              country yok, art yok → KOMPAKT BAŞLIK BLOĞU  ← buraya dönüldü

            Kompakt dalın SAĞ SÜTUNU YOK: iki sütunlu ızgarayı (.ph-split)
            hiç basmıyor, kırıntı + h1 + lead tek sütun hâlinde akıyor. Yani
            fotoğraf gidince boşalan bir hücre kalmıyor, hücrenin kendisi
            kalkıyor — "boş sütun" sorunu bu dalda oluşmuyor.

            ÜÇÜNCÜ DAL (`art`) NEDEN DOLDURULMADI. Sağ sütunu ayakta tutup
            yerine bir ÇİZİM koymak mümkündü; iki sebeple yapılmadı:

              · Müşterinin cümlesi "görsel kullanmayı beğenemedim" ve o cümle
                hero'nun sağına konacak bir çizimi de kapsıyor. Fotoğrafı
                çizimle değiştirmek itirazın harfine uyup ruhuna uymazdı.
              · Sitede bu dalın bugünkü dört kullanıcısının (/dubai,
                /ingiltere, /kktc, /dubai/muhasebe) sağına koyduğu şey TEK
                ÜLKENİN sahnesi. Bu sayfanın tezi üç ülkenin eşit olduğu
                (2. bölümün tamamı bunun üstüne kurulu), yani hazır sahne
                kullanılamıyordu ve yenisi yeni bir görsel dil demekti.

            İkinci soru (şerit nasıl daha etkileyici olur) canlıda değil
            /lab/hakkimizda-giris'te açık; bu çağrı o turun cevabını
            beklemeden sayfayı bilinen sağlam hâline döndürüyor.

            YAN ETKİ · IZGARA ZEMİNİ KENDİLİĞİNDEN DOĞRU TİPE DÜŞÜYOR.
            pagehero-grid.css kalibrasyonu "sağda bir şey var mı" sorusuna
            .ph-split sınıfı üzerinden bakıyor; kompakt dal onu basmadığı için
            hero yeniden TİP A değerlerini alıyor (--phg-glow-dim 0.72 vb.).
            O dosyanın kompakt sayfa listesinde /hakkimizda zaten yazılı —
            geçen tur güncellenmemişti, bu turda satır yeniden doğru oldu. */}
        <PageHero crumb={HERO.crumb} title={HERO.title} accent={HERO.accent} lead={HERO.lead} />

        {/* ================= 1 · KİM OLDUĞUMUZ · AFİŞ =================
            22.09.2026 · /lab/hakkimizda-kim'in K1'i, müşterinin tarifiyle:
            "Orada kim olduğumuz başlığını atmayalım, zaten sitenin en
            üstünde yazıyor olacak Hero'da. Oraya 'üç ülkede çalışan tek bir
            ekip' başlığını biraz daha büyüterek yazarsın, sol aşağı
            çekersin … vizyon ve misyon … birine siyah birine mavi … birini
            sola birini sağa koy geç."

            BÖLÜMÜN <h2>'Sİ ARTIK LEAD CÜMLESİ (OPENING.lead). "Kim
            olduğumuz" (OPENING.heading) ekrana basılmıyor; hero "Ortac Global
            kimdir?" diyor ve iki başlık art arda aynı soruyu soruyordu.

            İKİNCİ PARAGRAF BASILMIYOR (OPENING.body[1], "Bunun arkasında üç
            somut dayanak var …"). Bir köprüydü ve köprünün öbür ucu değişti:
            hemen altındaki bento BEŞ dayanak gösteriyor, cümle üç sayıyordu.
            Metin about.ts'te duruyor.

            FOTOĞRAF YER TUTUCU (media.ts · TEAM_PHOTO, SWAP): müşteri kendi
            ekip çekimini koyacak. alt="" ve dekoratif; sayfanın en büyük
            görseli ve ilk ekranın hemen altında, o yüzden `priority`.
            `unoptimized`: Unsplash izinli bir görsel alanı değil.

            Vizyon ve misyon <ul> > <li>: iki eş öge. Adları <h3>, metinleri
            firmanın resmî ifadesi (yeniden yazılmıyor). Karo renkleri ve
            "metin dipte" kararı hakkimizda.css · 1'de. */}
        <section className="sec-pad">
          <div className="container-o">
            <FadeUp y={20}>
              <div className="ab-kim-afis">
                <Image
                  src={TEAM_PHOTO}
                  alt=""
                  fill
                  sizes="(min-width: 1200px) 1136px, 100vw"
                  className="ab-kim-img"
                  priority
                  unoptimized
                />
                <span className="ab-kim-perde" aria-hidden="true" />
                <div className="ab-kim-m">
                  <h2 className="ab-kim-t">{OPENING.lead}</h2>
                  <p className="ab-kim-p">{OPENING.body[0]}</p>
                </div>
              </div>
            </FadeUp>

            <ul className="ab-kim-vm">
              {[
                { s: OPENING.vision, Icon: Compass, ton: "gece" },
                { s: OPENING.mission, Icon: Target, ton: "mavi" },
              ].map(({ s, Icon, ton }, i) => (
                /* Renk işareti <li>'de: FadeUp yalnız className geçiriyor,
                   data-* özniteliğini kendi <div>'ine basmıyor. */
                <li key={s.t} data-ton={ton}>
                  <FadeUp className="ab-kim-k" delay={0.12 + i * 0.08}>
                    <span className="ab-kim-ic" aria-hidden="true">
                      <Icon size={18} strokeWidth={1.9} />
                    </span>
                    <h3>{s.t}</h3>
                    <p>{s.s}</p>
                  </FadeUp>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ================= 1B · NEYE DAYANARAK · BENTO =================
            21.09.2026 · LEVHA GİTTİ, BENTO GELDİ. Bölüm 11.09'dan beri beş
            eşit satırlık bir raydı; /lab/hakkimizda-levha'da dört geçiş sürdü
            ve müşteri dördüncüsünün N2 adayını seçti: "n2 okey … düzeltirsen
            bundan olur." Bileşen, gerekçe ve sahnelerin kaynağı
            components/about/DayanakBento.tsx'te; ölçüler hakkimizda.css · 1B.

            LEVHANIN SIRA KARARI DURUYOR: müşteri "neye dayanarak
            çalışıyoruzu kim olduğumuzun altına koy, üstüne değil" demişti.
            Ekran sırası = kaynak sırası; lab'deki CSS `order` düzeni hiç
            canlıya gelmedi.

            LEAD YOK: OPENING.body[1] ("Bunun arkasında üç somut dayanak var
            …") hemen üstteki bölümün son paragrafı ve buraya bir köprü; iki
            kez basılsa aynı cümle arka arkaya okunurdu. BASIS.lead de boş.

            ZEMİN GECE (.ab-dy-sec, 22.09.2026). Bir gün kırık beyazdı; Burak:
            "neye dayanarak çalışıyoruz kısmını siyah bg üzerine geçirebiliriz
            belki bu senaryoda." Beyaz karolar gece zeminde sayfanın merkezi
            oluyor ve 2. bölüm kalktığından beri gövdede koyu bölüm yoktu.
            Gerekçe ve ölçüler hakkimizda.css · 1B. */}
        <section className="sec-pad ab-dy-sec">
          <div className="container-o">
            <div className="sec-head">
              <SplitWords
                as="h2"
                text={BASIS.heading}
                accent={BASIS.accent}
                className="h2"
                style={{ color: "#ffffff" }}
              />
            </div>
            <DayanakBento />
          </div>
        </section>

        {/* ============== 2 · ÜÇ ÜLKE · KALDIRILDI (21.09.2026) ==============
            Burak: "bence artık bu kısıma gerek yok ya sanki, bento baya bişi
            anlatıyor zaten." Haklı ve ölçülebilir: bölümün üç iddiası da artık
            bir üstteki bentoda duruyor —
              · "üçünde de kendi ofisimiz"  → ofis karosu (başlık + harita)
              · yapı (Limited · serbest bölge) → ülke sayfalarında zaten var
              · "IFZA ile doğrudan"          → IFZA karosu
            Bölüm üç kart, üç fotoğraf ve üç "Ülke sayfası" çıkışıydı; çıkışlar
            menüde ve footer'da da var.
            RİTİM: sayfanın gövdesindeki tek gece yüzey buydu. Artık hero ile
            kapanış bandı arasında koyu alan yok; bento kırık beyaz, geri
            kalanı beyaz.
            #nerede çapası da gitti: sitede ona bağlanan bir bağlantı yok
            (grep). Veri (about.ts · WHERE) silinmedi — CountryIntro.tsx
            photoNote'undan söz ediyor ve ülke satırları başka yerde
            gerekebilir. CSS'i (.ab-geo · .ab-cn-* · .ab-geo-note)
            hakkimizda.css'ten kalktı. */}

        {/* ============== 3 · ALINTI · KALDIRILDI (19.09.2026) ==============
            Burak: "hakkımızda kısmındaki alıntıyı kaldır ya, gerek yok, o
            dubai odağında kaldı biraz."

            Ölçülen çelişki de buydu ve bir tur önce not edilmişti: alıntının
            tamamı Dubai'den söz ediyordu ("Dünya ticaret yollarının kesişim
            noktasında yer alan Dubai…"), oysa hemen üstündeki bölümün yazılı
            tezi "üç eşit kart, eşitlik burada biçimsel değil bölümün tezi".
            Sayfa bir ekranda üç ülkeyi eşitleyip bir sonrakinde birini öne
            çıkarıyordu.

            İkinci kazanç: band bir gün önce geceye çevrilmişti ve sayfada iki
            gece yüzey arka arkaya geliyordu ("üst üste siyahlar çok yakın
            oldu"). Band gidince ülke bölümü ile "nasıl çalışıyoruz" arasında
            beyaz kurumlar bölümü kalıyor, yani ritim kendiliğinden düzeliyor.

            Metin about.ts · QUOTE'ta duruyor, silinmedi: bir insanın sözü ve
            üç ülkeyi kapsayan bir cümleyle değiştirilirse geri gelebilir. */}

        {/* ============ 4 · NEYE DAYANARAK · KALDIRILDI (11.09.2026) ============
            Dört kart (ikon + başlık + cümle, .ab-basis / .ab-bcard) burada
            duruyordu. Yerini 1B'deki Levha aldı ve yanına değil YERİNE: aynı
            h2, dört kartın üçünün cümlesi birebir. İkisi birden basılsa sayfa
            aynı başlığı iki kez okuturdu. Ekrandan düşen tek olgu OFİS kartı
            ("Üç ülkede de kendi ofisimiz"): bilgisi Levha'nın ilk satırında ve
            2. bölümün lead'inde yaşıyor. Veri silinmedi (about.ts · BASIS).
            CSS'i de hakkimizda.css'ten kalktı. */}

        {/* ============== 4B · BİRLİKTE ÇALIŞTIĞIMIZ KURUMLAR ==============

            KENDİ BÖLÜMÜ OLDU (20.08.2026). Müşteri: "birlikte çalıştığımız
            kurumlar kısmını neye dayanarak çalışıyoruz kısmının içine almışsın
            ya bence ayır ayrı bir başlık altında olsun. küçük başlık değil de
            normal bir section gibi yani."

            Bir tur boyunca BASIS bölümünün içinde, dört kartın altında bir h3
            olarak duruyordu; yani "neye dayanarak çalışıyoruz" sorusunun beşinci
            maddesi gibi okunuyordu. Oysa dayanaklar firmanın KENDİ nitelikleri
            (lisans, ortaklık, ofis, geçmiş), kurumlar ise KARŞI TARAF. İki ayrı
            iddia, artık iki ayrı bölüm.

            ================ ZEMİN KÂĞITTAN BEYAZA DÖNDÜ (11.09.2026) =========
            20.08.2026'dan beri --paper'dı ve gerekçesi yazılıydı: "iki beyaz
            bölüm arka arkaya gelince ayrıldıkları görünmüyordu" — o iki beyaz
            bölüm dayanak kartları ile bu bölümdü. Kartlar sayfadan çıktı (4),
            gerekçenin öncülü kalmadı.

            Asıl sebep ÖLÇÜ. Yeni sırada bu bölüm doğrudan alıntı bandının
            altına geliyor ve bandın gradyanı kâğıda sönüyor (hakkimizda.css ·
            .ab-quote-sec: --blue-100 → #f2f7fe → --paper). 1440'ta ölçüldü:
            bandın son satırı rgb(245,245,245), bu bölümün ilk satırı
            rgb(245,245,245) — iki bölüm arasında TEK PİKSELLİK bir sınır bile
            yoktu. Ekranda bu şöyle okunuyordu: alıntı kurumlar bölümünün
            başlığıymış gibi, altında 188 piksellik (76 + 112) boş kâğıt, sonra
            h2. Oysa bant "kendi bölümü değil bir nefes" diye kurulmuştu ve
            gradyanın yazılı işi "bir sonraki BEYAZ bölüme çizgi çekmeden
            bağlanmak"tı.

            EN KÜÇÜK DÜZELTME seçildi: bu satırdaki tek satır içi stil kalktı,
            bölüm gövdenin beyazına düştü. Böylece alıntıdan sonraki geçiş,
            dayanak kartları dururken nasılsa BİREBİR o (bant kâğıda söner,
            beyaz bölüm başlar). Elenenler:
              · bandın gradyanını beyaza söndürmek — onaylı bandı değiştirirdi
                ve kâğıt zemin kurumlara yine çıplak bir sınırla açılırdı;
              · levhayı alıntıyla kurumların arasına geri koymak — müşterinin
                tarif ettiği sıraya aykırı ("onun altına koy").
            Kontrast yalnız ARTIYOR (ölçüldü, kâğıt → beyaz): tür adı
            --blue-900 6,54 → 7,14:1 · logo mürekkebi #3d3d3d 9,96 → 10,86:1
            · lead #5c5c5c 6,13 → 6,69:1. hakkimizda.css'teki oranlar zaten
            beyaz üstünde yazılmıştı; bu bölüm artık gerçekten beyaz.

---- KURUMLAR · TEK LİSTE, TÜRE GÖRE ----
                BURASI BİR TUR ÖNCE İKİ AYRI KUTUYDU: "Resmî iş ortaklıkları"
                ve "Kullandığımız altyapı". Müşteri o ayrımı kaldırdı:
                "2 başlıkta ayırmamıza gerek yok... bazılarıyla özel
                anlaşmalarımız var ama onu belirtmek gibi bir amacımız yok
                yani aslında hepsiyle bir iş yapıyoruz."

                VERİ DEĞİŞMEDİ, SUNUM DEĞİŞTİ. brand.ts · PARTNERS'taki `group`
                alanı yerinde duruyor ve nav şeridi hâlâ yalnızca "resmi"
                grubunu basıyor — o iddia doğrulanmış ve doğru yerde. Bu
                sayfada ise ilişkinin derecesi hiç görünmüyor.

                YERİNE TÜR GELDİ: serbest bölge, banka, ödeme kuruluşu,
                tahsilat, borsa, muhasebe yazılımı. Kurumun türü kamuya açık
                bir olgu ve bizim onunla ilişkimiz hakkında tek kelime
                söylemiyor; yani müşterinin kaldırmak istediği ayrımı ekrandan
                çıkarırken listeyi okunur kılan ayrımı koruyor. Gruplama ve
                sıra about.ts · partnerTypes'ta, gerekçesiyle birlikte.

                Satırlar ROL METNİ TAŞIMIYOR, yalnızca marka logosu (bkz.
                PartnerMark). TaxDome bu listede yok: rolü ("Müşteri paneli")
                gruplamada eleniyor, veriden silinmiyor. */}
        <section className="sec-pad">
          <div className="container-o">
            <div className="sec-head">
              <SplitWords
                as="h2"
                text={BASIS.partners.t}
                accent={BASIS.partners.accent}
                className="h2"
                style={{ color: "var(--text-900)" }}
              />
              <FadeUp delay={0.2}>
                <p className="sec-lead">{BASIS.partners.s}</p>
              </FadeUp>
            </div>

                          {/* Eski sunum (Defter · <dl> sütunları, saç teli ayraçları) 22.09.2026'da
                  kategori karolarına döndü; gerekçe hemen aşağıda ve
                  hakkimizda.css · 4B'de. */}
              {/* 22.09.2026 · SAÇ TELİ LİSTESİ KATEGORİ KAROLARINA DÖNDÜ.
                  Burak: "bu tasarım dilinde sırıtan bir kısım var, o da
                  birlikte çalıştığımız kurumlar yeri. Çok küçük gözüküyorlar,
                  özellikle başlıkları, logoların kendileri de … kategorize
                  etmek mantıklı, çünkü hepsini bir araya koyunca sanki
                  hepsiyle bir partnerliğimiz varmış gibi oluyor."
                  KAYAN ŞERİT DEĞİL, KARO: şerit akarken kategoriler birbirine
                  karışıyor — tam kaçınılmak istenen "hepsi ortağımız"
                  görüntüsü. Karolar bentonun dilinde; genişliği LOGO
                  SAYISINDAN: iki logolu tür dar (2 sütun), üç-dört logolu tür
                  geniş (4 sütun). Bugünkü veriyle 2+4 / 4+2, delik yok ve her
                  karoda logolar tek satır. */}
              <ul className="ab-ku">
                {partnerGroups.map((g, i) => {
                  const Ikon = PARTNER_TYPE_ICON[g.type] ?? Building2;
                  return (
                    <li key={g.type} data-genis={g.names.length > 2 ? "" : undefined}>
                      <FadeUp className="ab-ku-k" delay={0.2 + i * 0.06} y={12}>
                        <div className="ab-ku-bas">
                          <span className="ab-ku-ic" aria-hidden="true">
                            <Ikon size={18} strokeWidth={1.9} />
                          </span>
                          <h3>{g.type}</h3>
                        </div>
                        <ul
                          className="ab-ku-l"
                          style={{ "--ab-ku-n": g.names.length } as React.CSSProperties}
                        >
                          {g.names.map((n) => (
                            <PartnerMark key={n} name={n} />
                          ))}
                        </ul>
                      </FadeUp>
                    </li>
                  );
                })}
              </ul>
          </div>
        </section>

        {/* ================= 5 · NASIL ÇALIŞIYORUZ ================= */}
        {/* 21.09.2026 · BÖLÜM GECEDEN BEYAZA GEÇTİ. Burak: "bu sayfada üst üste
            siyahlar çok yakın oldu ya, ülkeleri beyaza çek ya da kuruluş bitiş
            değil zincirin ilk halkası kısmını."

            İKİSİNDEN BU SEÇİLDİ. Ölçülen ritim: gece hero (416) · beyaz (1888)
            · GECE ülkeler (755) · beyaz kurumlar (585) · GECE nasıl (767) ·
            beyaz (1210) · gece kapanış. İki koyu blok arasında tek bir 585
            px'lik beyaz şerit kalıyordu, yani sayfa ortasında neredeyse
            kesintisiz bir koyu alan okunuyordu.
            Ülkeler bölümü koyu KALIYOR çünkü koyu olmasının bir sebebi var:
            içinde üç ülke fotoğrafı ve harita var, gece yüzey onların çerçevesi
            (aynı kalıp ana sayfada da öyle). Bu bölüm ise tamamen yazı — üç
            ilke kartı ve taahhüt şerhi. Koyu olmasının içerikten gelen bir
            gerekçesi yoktu, yalnız ritim için koyuydu ve ritmi artık bozuyordu.
            Yeni ritim: gece · beyaz · GECE · beyaz · gece kapanış. */}
        <section className="sec-pad ab-anchor" id="nasil">
          <div className="container-o">
            <div className="sec-head">
              <SplitWords as="h2" text={HOW.heading} accent={HOW.accent} className="h2" />
              <FadeUp delay={0.2}>
                <p className="sec-lead">{HOW.lead}</p>
              </FadeUp>
            </div>

            {/* ZİNCİR RAYI BURADAYDI, KALDIRILDI (19.09.2026).
                Burak: "mal mal bir sürü şey anlatacağımıza veya hizmet
                anlatacağımıza sadece kendimizden bahsetsek olmaz mı? mesela
                kuruluş bitiş değil kısmına ne gerek var amk ya? tamam taşeron
                değil kendi kadromuz ve türkçe muhattap gibi şeyleri entegre
                edelim, bunlar mantıken hakkımızdaya dahil oluyor."

                Beş halkalı ray HİZMETİ anlatıyordu ve aynı beş halka ana
                sayfada zaten kendi bölümünde duruyor. Bu sayfanın işi firmayı
                anlatmak. Kalan iki blok (üç ilke ve "neyi taahhüt
                etmiyoruz") tam olarak Burak'ın saydığı türden: kim yürütüyor,
                muhatap kim, neyi söz vermiyoruz. */}

            <div className="ab-princ">
              {HOW.principles.map((p, i) => {
                const Icon = ICONS[p.icon];
                return (
                  <FadeUp key={p.t} delay={0.2 + i * 0.06}>
                    <article className="ab-pcard">
                      <span className="ab-pic" aria-hidden="true">
                        <Icon size={17} strokeWidth={1.9} />
                      </span>
                      <h3>{p.t}</h3>
                      <p>{p.s}</p>
                    </article>
                  </FadeUp>
                );
              })}
            </div>

            {/* "NEYİ TAAHHÜT ETMİYORUZ" KALKTI (22.09.2026). Burak: "işi kim
                yürütüyor kısmında da neyi taahhüt etmiyoruz kısmına çok gerek
                yok ya, o çok bizlik olmuyor." Bölüm artık yalnız firmayı
                anlatıyor: kim yürütüyor. Aynı üç madde (brand.ts ·
                STANCE_LIMITS) sitenin başka yerlerinde yerinde duruyor;
                veri silinmedi. */}
          </div>
        </section>

        {/* ================= 6 · SEKTÖRLER ================= */}
        <section className="sec-pad ab-anchor" id="sektorler">
          <div className="container-o">
            <div className="sec-head">
              <SplitWords
                as="h2"
                text={FOR_WHOM.heading}
                accent={FOR_WHOM.accent}
                className="h2"
                style={{ color: "var(--text-900)" }}
              />
              <FadeUp delay={0.2}>
                <p className="sec-lead">{FOR_WHOM.lead}</p>
              </FadeUp>
            </div>

            {/* 25.09.2026 · fotoğraflı kartlar; ana sayfayla ortak bileşen
                (gerekçe SektorFotoKartlari'nda). Cümleler bu sayfanın kendi
                "kurgunun düğümü" cümleleri (about.ts · FOR_WHOM). */}
            <SektorFotoKartlari items={FOR_WHOM.sectors} />
          </div>
        </section>

        {/* ================= 7 · KÜNYE · sicil kaydı =================
            SAYFANIN AÇILIŞIYDI, ŞİMDİ DİPNOTU. Müşterinin ilk itirazı künyenin
            varlığına değil, sayfayı onunla açmamızaydı: "firma künyesi kısmına
            gerek yok... başka bir şeyle giriş açalım, ama künye değil."

            Silinmedi çünkü veri doğrulanmış ve satırların dördü /basinda-biz'de
            de basılıyor. Daha önemlisi: tüzel kişiliğini hakkımızda sayfasında
            hiç yazmayan bir firma, sitenin kendi vaadini ("yalnızca
            doğrulanabilir olanı yazıyoruz") kendi sayfasında bozmuş olurdu.

            ------------------------------------- İKİNCİ KEZ YENİDEN ÇİZİLDİ
            Bir tur önce beyaz kutu, mavi antet şeridi ve filigran mühür
            kalkmış, yerine bir "gazete künyesi" düzeni gelmişti: üstte saç
            teli, solda başlık, sağda satırlar iki sütun. Müşteri onu da
            beğenmedi ("firma künyesi kısmı da kötü bu arada beğenmedim daha
            güzel bişi çoz") ve itiraz yine YER için değil GÖRÜNTÜ için.

            O düzenin sorunu şuydu: dört satır iki sütuna serpiştirilince blok
            bir şey SÖYLEMİYORDU, yalnızca veri döküyordu. Hiyerarşi yoktu,
            göz nereye bakacağını bilmiyordu.

            ------------------------------------------- ÜÇÜNCÜ DÜZEN · KUTU
            Araya bir "sicil kaydı" düzeni girdi (büyük ticari isim + altında
            çizgili kayıt listesi + bir şerh cümlesi) ve o da geçici çıktı.
            Müşteri labdaki Cephe adayını gösterdi: "cehphe versiyonundanda
            künyeyi alabiliriz box halinde ya iyi durabilir."

            CEPHE'NİN KÜNYESİ NE: gece panelinde bir KUTU. Üstte ikonlu tek
            satır başlık, altında etiket/değer satırları, satır aralarında koyu
            saç teli. Ticari isim ayrıcalıklı değil, o da bir satır — bloktaki
            hiyerarşiyi kutunun kendisi taşıyor, tek bir satırı büyüterek
            kurulmuyor. Sunum sitenin kendi görsel dilinden (beyaz/gri kâğıt
            üstünde gece paneli, `.hx-stage`), yeni bir dil icat edilmedi.

            LAB ÖNEKİ TAŞINMADI. .hac- adları lab-hsayfa-c.css'te ve o dosya
            globals.css'te hakkimizda.css'ten SONRA okunuyor (222 satır > 87);
            aynı adı kullanmak labdaki bir düzenlemenin canlıyı sessizce
            değiştirmesi demekti. Canlı ad alanı .abn- (about · künye).

            İKİ ŞEY BİLEREK CEPHE'DEN FARKLI:
              · Başlık <p> değil <h2>. Cephe'de künye bir yan sütun, burada
                bölümün tamamı; belge yapısında başlık kalmalı. Punto ve
                görüntü aynı, değişen yalnızca etiket.
              · "Ülkeler" satırı BASILIYOR. Cephe onu ayrıca eliyor çünkü o
                sayfa coğrafyayla açılıyor ve bilgi iki kez geçiyordu; burada
                öyle bir tekrar yok, yalnızca boş değer filtresi çalışıyor.

            ŞERH CÜMLESİ (IDENTITY.lead) EKRANDAN KALKTI. Cephe'de yok, ve bu
            turun kuralı da onu destekliyor: müşteri ekrandaki metinlerin "not
            gibi" durmasından şikâyetçi. Cümlenin söylediği şey ("doğrulanmış
            karşılığı olmayan alan hiç basılmıyor") sayfanın kendisi hakkında
            bir dipnottu, kurumun bilgisi değil. Veride duruyor, silinmedi.

            TAXDOME BU TURDA ÇIKTI. "Müşteri paneli · TaxDome" satırı silindi
            (about.ts · IDENTITY): müşteri o adın sayfada geçmesini istemedi.
            /basinda-biz zaten yalnızca dört satırı seçiyordu ve bu onlardan
            biri değildi, orada hiçbir şey değişmiyor.

            Boş değerli satırlar hiç basılmıyor (about.ts'teki SWAP notları):
            "Kuruluş yılı: yok" yazan bir satır, bilginin yokluğunu bilgi gibi
            gösterirdi. */}
        <section className="ab-colo-sec">
          <div className="container-o">
            <FadeUp y={18}>
              <div className="abn-box">
                {/* h2 ama punto küçük: başlık burada bir bölüm açılışı
                    değil, kutunun ne olduğunu söyleyen üst etiket. Versal bu
                    turda kalktı, punto ve ağırlık aynı kaldı.
                    İkon Cephe'den (Building2, 15px, strokeWidth 1.9) ve
                    aria-hidden — bilgiyi metin taşıyor, ikon taşımıyor. */}
                <h2 className="abn-h">
                  <Building2 size={15} strokeWidth={1.9} aria-hidden="true" />
                  {IDENTITY.heading}
                </h2>

                {/* Satırlar SIRAYLA beliriyor: hepsi birden basıldığında bir
                    veri dökümü gibi okunuyor. Tek tek düştüklerinde künye
                    dizilir gibi okunuyor; bilgi aynı, sırası görünür.

                    FadeUp'ın kendisi `.abn-row` oluyor, satırı SARMIYOR:
                    <dl> içine ancak dt/dd taşıyan doğrudan <div> girebiliyor,
                    araya ikinci bir kap koymak işaretlemeyi bozardı.

                    identityRows: değeri boş olan satır hiç basılmıyor. */}
                <dl className="abn-l">
                  {identityRows.map((r, i) => (
                    <FadeUp
                      className="abn-row"
                      key={r.label}
                      delay={0.1 + i * 0.06}
                      y={10}
                      duration={0.5}
                    >
                      <dt>{r.label}</dt>
                      <dd>{r.value}</dd>
                    </FadeUp>
                  ))}
                </dl>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ================= 8 · TEMAS =================
            Kanal listesi şu an boş (about.ts · SWAP:CONTACT_*) ve o yüzden
            hiç basılmıyor; geriye sitenin tek gerçek soru kanalı kalıyor.
            "Mali müşavire danışın" kalıbı emekli — sorusu olan AskCta ile
            doğrudan bize soruyor.

            Zemin bir öncekiyle AYNI: künye ile temas tek bir kapanış alanı.
            Sayfada bilinçli iki istisnadan biri; ötekisi açılış + dayanak
            levhası, gerekçesi dosya başında · ZEMİN RİTMİ.

            19.09.2026 · İKİSİ DE KÂĞITTAN BEYAZA DÖNDÜ ve zemin kararı satır
            içi stilden bir SINIFA taşındı (.ab-kapanis). İki yerden okunan
            zemin bir kez sessizce yanlış kalmıştı (4B, 11.09). Sayfadaki renk
            değişimi dokuzdan beşe indi. */}
        <section className="sec-pad ab-kapanis">
          <div className="container-o">
            <FadeUp>
              <div className="ab-close">
                <div className="ab-close-t">
                  <h2>{CONTACT.heading}</h2>
                  <p>{CONTACT.lead}</p>
                  {channels.length > 0 && (
                    <ul className="ab-chan">
                      {channels.map((c) => {
                        const Icon = CONTACT_ICONS[c.kind];
                        return (
                          <li key={c.kind}>
                            <Icon size={15} strokeWidth={2} aria-hidden="true" />
                            {c.href ? <a href={c.href}>{c.value}</a> : <span>{c.value}</span>}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
                <AskCta label={CONTACT.ctaLabel} />
              </div>
            </FadeUp>
          </div>
        </section>

        <FinalCta />
      </main>
    </>
  );
}
