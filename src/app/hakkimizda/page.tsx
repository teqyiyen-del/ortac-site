import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  Boxes,
  Building2,
  ChartCandlestick,
  Code2,
  Compass,
  Handshake,
  History,
  Languages,
  LayoutDashboard,
  Mail,
  MapPin,
  Phone,
  Quote as QuoteMark,
  Stamp,
  Stethoscope,
  Target,
  TriangleAlert,
  UserRound,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import Nav from "@/components/Nav";
import FinalCta from "@/components/FinalCta";
import PageHero from "@/components/shared/PageHero";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import SmartLink from "@/components/shared/SmartLink";
import AskCta from "@/components/shared/AskCta";
import { BrandChip } from "@/components/shared/BrandMark";
import { Flag } from "@/components/shared/CountryPicker";
import { brandKeyForName } from "@/lib/brands";
import { CHAIN, COUNTRY_NAME, PARTNERS, STANCE_LIMITS } from "@/lib/brand";
import { COUNTRY_PHOTO, TEAM_PHOTO } from "@/lib/media";
import { sectorHref } from "@/lib/sectors";
import {
  BASIS,
  CONTACT,
  FOR_WHOM,
  HERO,
  HOW,
  IDENTITY,
  OPENING,
  QUOTE,
  SEO,
  WHERE,
  partnerTypes,
  structureOf,
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
   Sayfa bir kurumsal broşür değil, bir kayıt zinciri:

     0  hero          kırıntı + h1 + tek cümle, FOTOĞRAFSIZ
     1  kim olduğumuz ekip fotoğrafı + iki paragraf + vizyon/misyon
     2  neredeyiz     üç ülke, üç kart, üç çıkış               #nerede
     3  (alıntı)      Murat Ortaç
     4  neye dayanarak  dört olgu + TEK ortak listesi (türe göre)
     5  nasıl         beş halkalı ray + üç ilke + taahhüt sınırları  #nasil
     6  kimler için   altı sektör                              #sektorler
     7  künye         sicil kaydı, sayfanın dipnotu
     8  temas         tek çıkış

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
   beyaz(açılış) → gece(ülkeler) → mavi(alıntı) → beyaz(dayanak) → gece(nasıl)
   → beyaz(sektörler) → gri(künye + temas). Son iki bölüm BİLEREK aynı gri
   zeminde: künye ile iletişim tek bir kapanış alanı, sayfanın dipnotu. Onun
   dışında hiçbir yerde iki bölüm aynı zeminle arka arkaya gelmiyor.

   ------------------------------------------------------------ SUNUCU BİLEŞENİ
   Sayfa "use client" DEĞİL ve öyle kalmalı: generateMetadata ve JSON-LD
   sunucu tarafında üretiliyor. Sayfadaki hareketin neredeyse tamamını FadeUp
   ve SplitWords taşıyor; ikisi de istemci bileşeni ve MotionConfig
   reducedMotion="user" altında çalışıyor (Providers.tsx).

   İSTEMCİYE İNEN BAŞKA BİR ŞEY YOK. Sayaç (CountUp.tsx) bentoyla birlikte
   canlıdan kalktı; 1. bölümdeki fotoğraf da next/image, yani istemci mantığı
   değil. Aşağıdaki BENTO · KÜNYE bloğunda hâlâ sayaçtan söz eden satırlar
   var: orası silinen bentonun kayıt defteri, canlıda karşılığı yok.

   ------------------------------------------------------ BU TURDA NE DEĞİŞTİ
   TEK İŞ, VE BİR GERİ ALMA.

     · FOTOĞRAF    "hakkımızdada heroda görsel kullanmayı beğenemedim ya, kim
                   olduğumuz kısmına geri çekelim."
                   Kare hero'dan 1. bölüme geri indi ve hero PageHero'nun
                   KOMPAKT dalına döndü (`art` da `country` de verilmiyor).
                   Fotoğrafla birlikte ölçüleri de geri geldi: 4/3 oran, açık
                   zemin teli, .ab-open- ad alanı. `priority` KALKTI, kare
                   artık LCP adayı değil.
                   İTİRAZ YALNIZ GÖRSELE: geçen turun ikinci işi olan lead
                   kısaltması (247 → 109 karakter) yerinde duruyor, müşteri
                   ona değinmedi.

   AÇIK KALAN SORU CANLIDA DEĞİL LABDA. Müşterinin ikinci cümlesi ("herodan
   vizyon misyon kısmının sonuna kadar olan yeri çok daha dikkat çekici ve
   etkileyici bir şeye dönüştürmek lazım", "vizyon misyon kısımları çok sönük
   kalmış") bir geri alma değil yeni bir tasarım işi ve /lab/hakkimizda-giris
   turunda duruyor. Bu dosya o karar gelene kadar bilinen sağlam hâlinde.

   ------------------------------------------------ ÖNCEKİ TURDAN GELEN KARARLAR
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
                   dizildi ve TaxDome bu sayfadan tamamen çıktı (4. bölüm).
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

   SÜREKLİ HAREKET · BU TURDA ÖLÇÜLDÜ, 1440'ta getAnimations() beş tane sayıyor
   ve BİRİ bu sayfanın kendi CSS'inden:

     abRailRun   7,5 s   5. bölümün zincir rayındaki ışık   ← bu dosyanın tek bütçesi
     phgDrift   60,0 s   PageHero'nun ızgara zemini         ┐ paylaşılan bileşen,
     phgBreathe 26,0 s   PageHero'nun glow zemini           │ sitedeki her sayfada
     ft2Drift   42,0 s   FinalCta'nın ızgara zemini         │ aynı, bu dosyanın
     ft2Breathe 20,0 s   FinalCta'nın glow zemini           ┘ bütçesine girmiyor

   BU LİSTE BİR TUR ÖNCEKİNDEN KISA ve sebebi bento: kutucuklar canlıdan
   kalkınca abGeoLive (3 bayrak), abSecLive (6 sektör ikonu) ve abBentoRun
   (bento rayı) da gitti — 11 sonsuz animasyondan 1'e indi. Yorum o turda
   güncellenmemişti, bu turda ölçülerek düzeltildi.

   BU TUR DA SIFIR YENİ SÜREKLİ HAREKET EKLEDİ. Fotoğraf yer değiştirdi,
   listedeki beş satır aynen duruyor: kare her iki yerde de statik, kabında
   animasyon yok, yalnızca FadeUp'ın bir kerelik girişi var.

   Kalan tek hareket kuralı sağlıyor: saf CSS, yalnızca background-position
   üzerinde, her karede JS yok, sekme arkaya alındığında tarayıcı durduruyor
   ve prefers-reduced-motion: reduce altında hiç başlamıyor (tanım yalnızca
   no-preference içinde, duraklatılmış animasyon bile kalmıyor).

   Math.random() yok, her karede JS yok.
   ========================================================================= */

const SITE = "https://ortacglobal.com";
const PATH = "/hakkimizda";

/* about.ts ikonu string taşıyor (bkz. oradaki gerekçe: dosya React'ten
   bağımsız kalsın). Metin ile görselin buluştuğu tek yer burası. */
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

/* Sektör ikonları ana sayfadaki kartlarla AYNI: aynı sektörün iki sayfada iki
   farklı glifle çıkması, ziyaretçinin kurduğu görsel eşlemeyi bozuyor. */
const SECTOR_ICONS: Record<string, LucideIcon> = {
  "e-ticaret": Boxes,
  "yazilim-ve-teknoloji": Code2,
  danismanlik: UserRound,
  gayrimenkul: Building2,
  "finans-ve-yatirim": ChartCandlestick,
  "saglik-ve-medikal": Stethoscope,
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
  return (
    <li className="abk-b">
      {key ? <BrandChip brand={key} optical={15} /> : <b className="abk-n">{name}</b>}
    </li>
  );
}

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

        {/* ================= 1 · KİM OLDUĞUMUZ =================
            Bölüm üç parçadan kuruluyor:

              a) fotoğraf + başlık + iki paragraf — firmanın ne yaptığı
              b) vizyon ve misyon — AÇIK iki kart, firmanın kendi ifadesi
              c) kartların künyesi

            ------------------------------------- BU TURDA FOTOĞRAF GERİ GELDİ
            Kare bir tur boyunca hero'daydı. Müşteri onu geri çekti ("kim
            olduğumuz kısmına geri çekelim") ve ızgara geldiği yere döndü:
            solda fotoğraf, sağda başlık + tanıtım + iki paragraf.

            KÖRLEMESİNE GERİ ALMA DEĞİL. Fotoğraf giderken ızgara "başlık |
            iki paragraf" olmuştu ve başlık kendi hücresindeydi (.ab-open-head).
            Kare dönünce o hücre kapanıyor: iki sütunlu bir ızgarada üçüncü
            hücreye yer yok ve başlığı fotoğrafın altına atmak bölümün girişini
            ikiye bölerdi. Başlık + lead + iki paragraf tek sütunda, kare
            karşısında — 028ce2d ÖNCESİNDEKİ düzenin aynısı.

            FOTOĞRAF IZGARADA İLK ve bu tek satırlık tercih bütün bölümün
            şartı: 980'in altında ızgara tek sütuna iniyor ve kaynak sırası
            ekran sırası oluyor. Kareyi ikinci hücreye koyup dar ekranda
            `order` ile öne almak da mümkündü ama o zaman ekran okuyucudaki
            sıra ile gözün gördüğü sıra ayrışırdı. Müşterinin ilk kuralı da
            ("bir kısım olsun ve görselle açılsın") her genişlikte geçerli
            kalıyor.

            NE GERİ GELMEDİ: hero'nun uzun lead'i. Müşteri kısaltmaya itiraz
            etmedi, yalnız görsele etti (gerekçe PageHero çağrısında). */}
        <section className="sec-pad">
          <div className="container-o">
            <div className="ab-open">
              {/* <figure> + <figcaption>: künye satırı karenin PARÇASI, yanına
                  konmuş bağımsız bir not değil — ekran okuyucu ikisini
                  birlikte okuyor ve "bu kare temsilî" bilgisi görselden
                  kopmuyor.

                  FadeUp ızgara hücresi oluyor (className), <figure>'ı
                  sarmalamak için fazladan bir kap eklenmiyor. */}
              <FadeUp className="ab-open-figw" y={20}>
                <figure className="ab-open-fig">
                  {/* alt="" ve DEKORATİF. Bu kare "işte ekibimiz" demiyor ve
                      diyemez: media.ts'teki adres bir Unsplash yer tutucusu.
                      Ülke kartlarındaki fotoğraflarda da aynı kalıp kullanıldı
                      (bkz. 2. bölüm · WHERE.photoNote).

                      unoptimized: next.config.ts'te remotePatterns tanımlı
                      değil, sitedeki bütün uzak görseller böyle basılıyor.

                      `priority` BU TURDA KALKTI: kare artık ekranın en üstünde
                      değil, hero'nun altında. LCP adayı hero'nun h1'i; kareyi
                      öncelikli indirmek o başlığın önüne geçerdi. */}
                  <span className="ab-open-ph">
                    <Image
                      src={TEAM_PHOTO}
                      alt=""
                      fill
                      sizes="(min-width: 980px) 48vw, 100vw"
                      className="ab-open-img"
                      unoptimized
                    />
                  </span>
                  {/* KÜNYE SATIRI SİLİNDİ (müşteri isteği, gerekçe
                      about.ts · HERO). <figure> künyesiz kaldı: kare alt="" ile
                      dekoratif olduğu için ekran okuyucuda bilgi kaybı yok,
                      geriye adsız bir figure grubu kalıyor. Bölüm yeniden
                      çizilirken <figure> düz bir kaba dönmeli. */}
                </figure>
              </FadeUp>

              <div className="ab-open-body">
                <SplitWords
                  as="h2"
                  text={OPENING.heading}
                  accent={OPENING.accent}
                  className="h2"
                  style={{ color: "var(--text-900)" }}
                />
                <FadeUp delay={0.18}>
                  <p className="ab-open-lead">{OPENING.lead}</p>
                </FadeUp>
                {/* Paragraflar sırayla düşüyor. İçerik about.ts'te ve orada
                    her cümlenin sayfadaki karşılığı yazılı — buraya yeni bir
                    olgu girmedi. */}
                {OPENING.body.map((p, i) => (
                  <FadeUp key={p.slice(0, 24)} delay={0.26 + i * 0.08}>
                    <p className="ab-open-p">{p}</p>
                  </FadeUp>
                ))}
              </div>
            </div>

            {/* ---- VİZYON VE MİSYON · AÇIKTA ----
                Bir tur önce kapalı bir <details> arkasındaydılar ve müşteri
                sayfayı okuyup "vizyon misyon hiç yazmıyor" dedi. Metin
                oradaydı; görünmüyordu. Tek harfi değişmeden açığa çıktılar.

                İki kart, künye kartıyla aynı dilde (beyaz kâğıt, kuyulu ikon)
                ama kasıtlı olarak DAHA GENİŞ punto: bu bölümün iki paragrafı
                sayfadaki en "insan" metin ve bir tablo satırı gibi değil, bir
                beyan gibi okunmalı. */}
            <div className="ab-vm">
              {[
                { s: OPENING.vision, Icon: Compass },
                { s: OPENING.mission, Icon: Target },
              ].map(({ s, Icon }, i) => (
                <FadeUp key={s.t} delay={0.12 + i * 0.08}>
                  <article className="ab-vm-card">
                    <span className="ab-vm-ic" aria-hidden="true">
                      <Icon size={18} strokeWidth={1.9} />
                    </span>
                    <h3>{s.t}</h3>
                    <p>{s.s}</p>
                  </article>
                </FadeUp>
              ))}
            </div>

            {/* KARTLARIN KÜNYESİ SİLİNDİ (müşteri isteği, gerekçe
                about.ts · OPENING). Vizyon ve misyon metinleri hâlâ firmanın
                kendi resmî ifadesi; bunu ekranda söyleyen satır kalktı,
                kuralın tek yeri artık about.ts'teki yorum. */}

            {/* ---- BENTO KALDIRILDI · CANLIDAN, LABDAN DEĞİL ----
                Müşteri: "hakkımızda kısmındaki bentoya gerek kalmadığını
                düşündüm. yine labda kalsın da livedan kaldır, zaten direkt
                konuya giriyoruz gerek yok."

                Dört karo (ülke · sektör · dayanak · zincir) dört sayıyı
                sayıyordu ve dördünün de kaynağı sayfanın ALTINDAKİ bölümler:
                üç ülke 2. bölümde fotoğrafıyla, dayanaklar 4. bölümde
                açıklamasıyla, zincir 5. bölümde, sektörler 6. bölümde.
                Yani bento bir dizindi ve çapaları bir tur önce yine müşteri
                isteğiyle kaldırılmıştı; dizin olmayan bir dizin kaldı.

                DÖRT BİLEŞEN DE SİLİNDİ (BentoWhere · BentoSectors ·
                BentoBasis · BentoChain). Çağrılmayan bir bileşeni "belki geri
                gelir" diye tutmak ölü kod demek ve bu turun kuralı tam tersi.
                Kayıp yok: turun kazananı labda kendi dosyasında duruyor
                (components/lab/AboutBentoKunye.tsx + css/lab-hb7.css) ve
                canlıya bir kez oradan taşındı, gerekirse yine oradan taşınır.
                .ab-kn- CSS ailesi de bu turda hakkimizda.css'ten kalktı. */}
          </div>
        </section>

        {/* ================= 2 · ÜÇ ÜLKE =================
            Üç eşit kart. Eşitlik burada biçimsel değil, bölümün tezi: üç ayrı
            ülke değil, üç ülkeden geçen tek zincir.

            BU TURDA GERÇEKTEN EŞİTLENDİLER: Dubai'nin "Kendi ofisimiz" rozeti
            ve ona bağlı koyu mavi kart varyantı kaldırıldı. Rozetin dayanağı
            "kendi ofisimizin olduğu tek yer" iddiasıydı ve müşteri onu yanlış
            olarak işaretledi — üç ülkede de firmanın kendi ofisi var ve
            üçünü de kendisi yürütüyor. O bilgi artık bölümün lead'inde, üçü
            için birden (about.ts · WHERE.lead).

            Sıra batıdan doğuya. Coğrafi bir iddia taşımıyor, yalnızca keyfî
            olmamasını sağlıyor. */}
        <section className="sec-pad sec-night ab-anchor" id="nerede">
          <div className="container-o">
            <div className="sec-head sec-head-dark">
              <SplitWords
                as="h2"
                text={WHERE.heading}
                accent={WHERE.accent}
                className="h2"
                style={{ color: "#ffffff" }}
              />
              <FadeUp delay={0.2}>
                <p className="sec-lead sec-lead-dark">{WHERE.lead}</p>
              </FadeUp>
            </div>

            <div className="ab-geo">
              {WHERE.countries.map((c, i) => (
                <FadeUp key={c.slug} delay={0.12 + i * 0.07}>
                  {/* Ülke sayfasına çıkış SmartLink ile: İngiltere ve KKTC şu an
                      dolaşıma kapalı, o yüzden sönük ve tıklanamaz çıkıyorlar.
                      Kart yine de basılıyor — üç ülkeden birini gizlemek,
                      sayfanın "üç ülke" iddiasını görselde doğru,
                      metinde eksik bırakırdı. */}
                  <SmartLink href={c.href} className="ab-cn">
                    {/* Fotoğraf şeridi — sayfanın tek gerçek görseli.
                        Kaynağı lib/media.ts · COUNTRY_PHOTO, yani sitenin geri
                        kalanıyla aynı havuz; buraya yeni bir adres yazılmadı.

                        alt BOŞ ve şerit aria-hidden: fotoğraf bilgi taşımıyor,
                        atmosfer taşıyor. Ülkenin adı bir satır altında zaten
                        yazıyor; ekran okuyucuya "Dubai silueti" diye ikinci kez
                        okutmak tekrar olurdu.

                        Griye çekilip karartılıyor (CSS · .ab-cn-img). İki
                        sebep: gece zemininde tam renkli üç kare bölümü afişe
                        çeviriyordu, ve sönük bir stok karesi "bizim çekimimiz"
                        iddiasından görsel olarak da uzak duruyor. Renk yalnızca
                        AÇILABİLEN kartta, imleç üstüne gelince geliyor.

                        unoptimized: next.config.ts'te remotePatterns tanımlı
                        değil, sitedeki diğer uzak görseller de (HomeBlog) aynı
                        şekilde basılıyor. */}
                    <span className="ab-cn-ph" aria-hidden="true">
                      <Image
                        src={COUNTRY_PHOTO[c.slug]}
                        alt=""
                        fill
                        sizes="(min-width: 900px) 33vw, 100vw"
                        className="ab-cn-img"
                        unoptimized
                      />
                    </span>

                    <span className="ab-cn-head">
                      <span className="ab-cn-flag" aria-hidden="true">
                        <Flag country={c.slug} />
                      </span>
                      <b className="ab-cn-name">{COUNTRY_NAME[c.slug]}</b>
                    </span>

                    {/* Yapı künyesi brand.ts · FACTS'ten okunuyor; about.ts'e
                        kopyalanmadı ki iki yerde iki farklı yapı yazma ihtimali
                        hiç doğmasın. */}
                    <span className="ab-cn-st">{structureOf(c.slug)}</span>
                    <span className="ab-cn-line">{c.line}</span>
                    <span className="ab-cn-go">
                      Ülke sayfası
                      <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                    </span>
                  </SmartLink>
                </FadeUp>
              ))}
            </div>

            {/* Fotoğrafların künyesi. Sayfanın tek "şerh" satırı ve bilerek
                küçük: bir iddia değil, iddianın reddi. Bölüm "üç ülkede de
                kendi ofisimiz var" diyor ve kartların üstünde birer şehir
                karesi duruyor; elimizde firmanın kendi çekimi yok ve stok bir
                kareyi kendi ofisi gibi göstermek bu sayfanın baştan sona
                reddettiği şey olurdu. */}
            <FadeUp delay={0.36}>
              {/* Değeri boş olan satır basılmıyor. Müşteri stok görsel
                  künyelerini kaldırttı (19-20.08.2026); alan about.ts'te duruyor,
                  kendi çekimleri geldiğinde oradan doldurulacak. */}
              {WHERE.photoNote ? <p className="ab-geo-note">{WHERE.photoNote}</p> : null}
            </FadeUp>
          </div>
        </section>

        {/* ================= 3 · ALINTI =================
            Kısa bir gri bant, kendi bölümü değil bir nefes: sec-pad yerine
            kendi dar dolgusu var. Koyu ile beyazın arasında duruyor ve sayfanın
            tek "insan sesi" anı.

            Künye satırında yayın adı ve tarih YOK çünkü elimizde doğrulanmış
            hâli yok (about.ts · SWAP:QUOTE_SOURCE). Boş kaldığı sürece
            basılmıyor; uydurulmuş bir kaynak, alıntının kendisini de şüpheli
            hâle getirirdi. */}
        <section className="ab-quote-sec">
          <div className="container-o">
            <FadeUp>
              <figure className="ab-quote">
                {/* Tırnak 26 → 38 ve alfası kalktı. Bant sayfanın tek insan
                    sesi ama gri zeminde gri bir tırnakla iki bölümün arasında
                    kayboluyordu; şimdi bandın kendisi de mavi kâğıda basılıyor
                    (CSS · .ab-quote-sec). Metin bir harf bile değişmedi,
                    yalnızca puntosu ve zemini değişti. */}
                <QuoteMark className="ab-quote-m" size={38} strokeWidth={1.6} aria-hidden="true" />
                <blockquote>{QUOTE.text}</blockquote>
                <figcaption>
                  <b>{QUOTE.who}</b>
                  <span>{QUOTE.role}</span>
                  {QUOTE.source && <span>{QUOTE.source}</span>}
                </figcaption>
              </figure>
            </FadeUp>
          </div>
        </section>

        {/* ================= 4 · NEYE DAYANARAK ================= */}
        <section className="sec-pad">
          <div className="container-o">
            <div className="sec-head">
              <SplitWords
                as="h2"
                text={BASIS.heading}
                accent={BASIS.accent}
                className="h2"
                style={{ color: "var(--text-900)" }}
              />
              <FadeUp delay={0.2}>
                {BASIS.lead ? <p className="sec-lead">{BASIS.lead}</p> : null}
              </FadeUp>
            </div>

            <div className="ab-basis">
              {BASIS.cards.map((c, i) => {
                const Icon = ICONS[c.icon];
                return (
                  <FadeUp key={c.t} delay={0.12 + i * 0.05}>
                    <article className="ab-bcard">
                      <span className="ab-bic" aria-hidden="true">
                        <Icon size={17} strokeWidth={1.9} />
                      </span>
                      <h3>{c.t}</h3>
                      <p>{c.s}</p>
                    </article>
                  </FadeUp>
                );
              })}
            </div>

          </div>
        </section>

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

            Zemin --paper: iki beyaz bölüm arka arkaya gelince ayrıldıkları
            görünmüyordu; sayfanın kendi ritmi zaten beyaz/gece/kâğıt sırasıyla
            gidiyor.

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
        <section className="sec-pad" style={{ background: "var(--paper)" }}>
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

                          {/* SUNUM DEFTER'DEN GELDİ (lab · AboutSayfaA · .haa-kl).
                  Müşteri: "Defterden: birlikte çalıştığımız kurumlar kısmını
                  live da olanla swapla."

                  NE DEĞİŞTİ: "etiket solda sabit sütunda, logolar sağda"
                  satırları kalktı, yerine tür başına bir SÜTUN geldi. Altı tür
                  var (about.ts · PARTNER_TYPE_ORDER), yani üç sütunda tam iki
                  satır. Kazanç iki tane: liste aşağı doğru altı adım uzamıyor,
                  ve 180 piksellik sabit etiket sütunu ortadan kalktığı için
                  onun dar ekranda düşmesini onaran ayrı kırılım kuralı da
                  gereksizleşti (silindi).

                  LAB ÖNEKİ TAŞINMADI. .haa- adları lab-hsayfa-a.css'te ve o
                  dosya globals.css'te hakkimizda.css'ten SONRA okunuyor (220
                  satır > 87); aynı adı kullanmak labdaki bir düzenlemenin
                  canlıyı sessizce değiştirmesi demekti. Canlı ad alanı .abk-
                  (about · kurumlar), depoda başka hiçbir yerde geçmiyor.

                  MARKUP DEFTER'DEN DAHA SIKI: Defter logoları çıplak <span>
                  diziyor, burada <ul>/<li> korunuyor. Bu gerçekten bir liste ve
                  canlı sürüm zaten öyle basıyordu; görsel çıktı birebir aynı,
                  değişen yalnızca erişilebilirlik ağacındaki sayı bilgisi.

                  <dl> duruyor: her sütun bir TÜR ve o türün kurumları, yani
                  etiket/değer ilişkisi gerçek. FadeUp'ın <div>'i dt/dd'yi
                  taşıyan doğrudan çocuk oluyor; araya ikinci bir kap koymak
                  işaretlemeyi bozardı. */}
              <dl className="abk-l">
                {partnerGroups.map((g, i) => (
                  <FadeUp className="abk-g" key={g.type} delay={0.36 + i * 0.05} y={12}>
                    <dt className="abk-t">{g.type}</dt>
                    <dd className="abk-d">
                      <ul className="abk-marks">
                        {g.names.map((n) => (
                          <PartnerMark key={n} name={n} />
                        ))}
                      </ul>
                    </dd>
                  </FadeUp>
                ))}
              </dl>
          </div>
        </section>

        {/* ================= 5 · NASIL ÇALIŞIYORUZ ================= */}
        <section className="sec-pad sec-night ab-anchor" id="nasil">
          <div className="container-o">
            <div className="sec-head sec-head-dark">
              <SplitWords
                as="h2"
                text={HOW.heading}
                accent={HOW.accent}
                className="h2"
                style={{ color: "#ffffff" }}
              />
              <FadeUp delay={0.2}>
                <p className="sec-lead sec-lead-dark">{HOW.lead}</p>
              </FadeUp>
            </div>

            {/* Zincir brand.ts · CHAIN'den geliyor — ana sayfadaki Chain
                bölümüyle aynı beş halka, aynı sırada. Burada ikon değil sıra
                numarası var: bu bölümde anlatılan şey halkaların NE olduğu
                değil, PEŞ PEŞE geldiği. Beş halkanın üstünden geçen kesintisiz
                ray da bunu söylüyor — cümle kurmadan. */}
            <FadeUp delay={0.12}>
              <ol className="ab-chain">
                {CHAIN.map((s, i) => (
                  <li className="ab-step" key={s.key}>
                    <span className="ab-step-n" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <b className="ab-step-t">{s.label}</b>
                    <span className="ab-step-l">{s.line}</span>
                  </li>
                ))}
              </ol>
            </FadeUp>

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

            {/* STANCE_LIMITS aynen brand.ts'ten. Metni burada yeniden yazmak,
                firma politikasının iki farklı sürümünü üretmek olurdu. Blok
                AÇIKTA duruyor, <details> içinde değil: taahhüt etmediğimiz şeyi
                bir tıklamanın arkasına saklamak, tam olarak bu üç maddenin
                engellemeye çalıştığı davranış olurdu. */}
            <FadeUp delay={0.3}>
              <div className="ab-limits">
                <div className="ab-limits-h">
                  <span className="ab-limits-ic" aria-hidden="true">
                    <TriangleAlert size={16} strokeWidth={2.1} />
                  </span>
                  <div>
                    <h3>{HOW.limits.t}</h3>
                    <p>{HOW.limits.s}</p>
                  </div>
                </div>
                <ul className="ab-limits-l">
                  {STANCE_LIMITS.map((l) => (
                    <li key={l.title}>
                      <b>{l.title}</b>
                      <span>{l.line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
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

            <div className="ab-sectors">
              {FOR_WHOM.sectors.map((s, i) => {
                const Icon = SECTOR_ICONS[s.slug];
                return (
                  <FadeUp key={s.slug} delay={0.12 + i * 0.045}>
                    {/* Altı adresin beşi şu an dolaşıma kapalı ve SmartLink
                        onları sönük basıyor. Kapalı olanı listeden çıkarmak
                        daha "temiz" görünürdü ama sayfa o zaman altı değil bir
                        sektörde çalıştığımızı söylerdi. */}
                    <SmartLink
                      href={sectorHref(s.slug)}
                      className="ab-sec"
                      aria-label={`${s.label}, detayları gör`}
                    >
                      <span className="ab-sec-ic" aria-hidden="true">
                        {Icon && <Icon size={16} strokeWidth={1.9} />}
                      </span>
                      <span className="ab-sec-b">
                        <b className="ab-sec-t">{s.label}</b>
                        <span className="ab-sec-l">{s.line}</span>
                      </span>
                      <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                    </SmartLink>
                  </FadeUp>
                );
              })}
            </div>
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
                {/* h2 ama punto küçük ve versal: başlık burada bir bölüm
                    açılışı değil, kutunun ne olduğunu söyleyen üst etiket.
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

            Zemin bir öncekiyle AYNI (gri): künye ile temas tek bir kapanış
            alanı. Sayfanın geri kalanında iki bölüm hiçbir yerde aynı zeminle
            arka arkaya gelmiyor, bu bilinçli tek istisna. */}
        <section className="sec-pad" style={{ background: "var(--paper)" }}>
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
