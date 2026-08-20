import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  CalendarCheck,
  ChartColumn,
  Check,
  FileStack,
  Info,
  Landmark,
  MapPin,
  Receipt,
  Stamp,
  Wallet,
  X,
  type LucideIcon,
} from "lucide-react";

import Nav from "@/components/Nav";
import PageHero from "@/components/shared/PageHero";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import SmartLink from "@/components/shared/SmartLink";
import AskCta from "@/components/shared/AskCta";
import CountryFaq from "@/components/CountryFaq";
import FinalCta from "@/components/FinalCta";
import AccountingHeroCard from "@/components/services/AccountingHeroCard";
import AccountingHandover from "@/components/services/AccountingHandover";
import AccountingCalendar from "@/components/services/AccountingCalendar";
import { PHOTO } from "@/lib/media";

import {
  ACC_EXCLUDES,
  ACC_PRICE_FOOTNOTE,
  ACCOUNTING_DUBAI as C,
  accountingItems,
  type AccIcon,
} from "@/lib/accountingDubai";
import { INCLUSION_LABEL, RHYTHM_LABEL } from "@/lib/afterSetup";

/* ============================================================================
   DUBAİ MUHASEBE HİZMETİ — /dubai/muhasebe

   ---------------------------------------------------------------------------
   SON TUR: TAKAS BLOĞU GERİ ALINDI (#kapsam · takas bloğu)

   Müşteri: "muhsaebe takas bölümü olmamış kral. ben sadece text yazmaktan uzak
   duralım derken sen konuyu texte boğmuşsun. odak svg görsel ve animasyonlarda
   olcak ama texti de koymalıyızki açıklayıcı olsun mantık o. aslında şu attığım
   görseldeki iyi ama işte ben dedim ki bunu nasıl biraz daha hareketlendiririz."

   TALİMAT HATASI. Bir önceki turda müşteri "sadece görsel yapmak yerine
   placeholder doldurursun" derken ÇİZİME METİN GİRSİN demişti; brief bunu
   "listeleri sahnenin içine göm" diye okudu ve bölüm metne boğuldu.

   NE GİTTİ: "TEZGÂH" sahnesi (AccountingHandover'ın bir önceki hâli, .svsg- ·
   897 satır CSS). Aşağıdaki iki tur da geri alındı: sahne panelin başına giren
   "GEÇİT", sonra paneli yutan "TEZGÂH".

   NE GELDİ: iki tur önceki takas paneli, git geçmişinden. İki sütun (.svm-swap,
   CSS 6. bölüm), arada "belge → defter → çıktı" bağı (.svs-conn, CSS 15.
   bölüm). Bağ eskiden bir istemci bileşeniydi (motion/react); şimdi aynı
   geometri sunucuda basılıyor ve statik.

   NE GELMEDİ: "Bu çıktılar ne işe yarıyor?" açılırı. O blok ayrı bir kararla
   kaldırılmıştı ve altı açıklama cümlesi veri dosyasından da silinmişti; geri
   getirmek altı cümleyi yeniden yazmak olurdu.

   NE ÖLÇÜLDÜ (1440 px):
                              ÖNCE     SONRA
     bloğun metni               220      220 kr   (birebir aynı dokuz kalem)
     erişilebilirlik ağacı      9/9      9/9      (liste öğesi olarak)
     bloğun genişliği         1.136    1.136 px   (x=144.5, başlıkla aynı)
     bloğun yüksekliği          320      155.5 px
     bloktaki animasyon          23       26      (18.1 s periyot)
     `reduce` altında             0        0

   HAREKET SONRADAN GELDİ VE LABDAN GELDİ. Müşteri /lab/muhasebe-takas'taki
   üçüncü adayı seçti ("aynen sevkiyat olanı yapabilirsin") ve diziyi tarif
   etti: sol panelin konturu yanıyor, enerji yola çıkıyor, ortadaki bağdan
   geçiyor, sağdaki panel aydınlanıyor. 18.1 saniyede bir, 4.79 saniye süren
   bir devir; turun %73.5'i hâlâ müşterinin beğendiği duruş karesi.
   Hareketin mekanizması bu sayfaya değil PAYLAŞILAN BİR KALIBA yazıldı
   (src/app/css/aktarim.css · .akt-), çünkü müşterinin ikinci cümlesi şuydu:
   "sitedeki bir çok yerde bu enerji geçişi mantığındaki animasyonu
   kullanabiliriz bir şeyleri ordan oraya taşıma hissi vereceksek."

   ---------------------------------------------------------------------------
   ÖNCEKİ TUR: HERO'NUN SAĞINDAKİ SAHNE KART OLDU

   Müşteri: "muhasebe herosunun kartı yapmışsın güzel olmuş … ondan sonra
   yayına alabilirsin." Yayına alınan şey /lab/muhasebe-hero'nun dördüncü
   adayıydı (MhSahne · .mhs-): dört bölme — Defter · Beyan · Rapor · Arşiv —
   kendi çerçevesi olan koyu bir panelin içinde, kart 4,1 saniyede bir kendi
   çeviriyor, bir çubuğa basılınca kalıcı duruyor.

   NE GİTTİ: AccountingHeroScene (.svma- · "kapanan mali sayfa") hero'dan
   çıktı; bir tur boyunca yalnızca lab kıyası için duruyordu ve o rota da
   müşteri isteğiyle kaldırılınca ("muhasebe hero sahnesini komple kaldır")
   bileşen ve CSS'i SİLİNDİ. Neden gittiğinin ölçümü mezar taşında duruyor
   (svc-muhasebe.css · 16b): kımıldayan alan tuvalin binde ikisi, iki olay
   arasında 4,8 saniye boşluk.

   NE GELDİ: components/services/AccountingHeroCard.tsx + svc-muhasebe.css ·
   16. bölüm (.svmk-). Ad alanı labdakinden ayrı tutulmuştu, çünkü iki dosya da
   aynı globals.css'e giriyordu ve lab SONRA basılıyordu; lab tarafı (rota,
   MhSahne.tsx, lab-mhs.css) artık silindi, .svmk- tek sürüm.

   METİN: kartın dört alt satırı accountingDubai.ts'ten OKUNUYOR
   (scope.phases[1..4].line), elle kopyalanmıyor. Yeni bir rakam, oran, tarih
   ya da kalem adı üretilmedi.

   ---------------------------------------------------------------------------
   DAHA ÖNCEKİ TUR: TAKAS BLOĞUNA SAHNE GİRDİ, PANELİN ORTA SÜTUNU ÇIKTI

   Müşteri: "aday 1 i de sayfanın içinde bir yerde kullanırız çünkü güzel
   anlatıyor konuyu hoşuma gitti." Aday /lab/muhasebe-hero'daki "Geçit"
   idi (MhGecit · .mhg-): solda gönderdiğiniz dağınık kağıtlar, sağda size
   dönen klasör, arada tek yönlü ok. O lab rotası bu turda silindi.

   NEREYE KONDU: 3. bölümün (#kapsam) takas bloğunun BAŞINA — h3 ile panelin
   arasına. (SONRAKİ İKİ TURDA GERİ ALINDI; bugün orada yalnızca panel var.) Sebep, çizimin kaynağının zaten o blok olması: soldaki üç belge
   exchange.you'nun üç kalemi, sağdaki klasör exchange.usTitle, tek yönlü ok da
   bloğun kendi gerekçesi ("bu bir iş birliği değil bir devir"). Sahne yeni bir
   iddia getirmiyor; blok neyi SAYIYORSA onu gösteriyor. Sıra artık şu: h3
   soruyu soruyor → sahne fiili gösteriyor → panel isimleri sayıyor.

   NE ÇIKTI: panelin orta sütunundaki ExchangeLink (.svs-conn) — 96 piksellik
   "üç besleme → defter → çıkış oku" çizimi. Aynı cümleyi anlatıyordu ve yeni
   sahnenin 24 piksel altında duruyordu. (BU KARAR DA GERİ ALINDI: sahne
   silinince bağ panelin orta sütununa döndü.)

   NE ÖLÇÜLDÜ (Chrome, 1440, bütün açılırlar KAPALI):

                              ÖNCE     SONRA
     görünür metin            6.866    6.866 kr   (DEĞİŞMEDİ)
     <main> yüksekliği        7.987    8.406 px

   Metnin sabit kalması sahnenin tanımı: labdaki iki ad ("sizden gelen" · "size
   dönen") canlı kopyaya ALINMADI, çünkü onlar tam olarak panelin iki sütun
   başlığı ve panel sahnenin hemen altında duruyor. Sahne çiziyor, yazmıyor.

   Yükseklik +%5,2 ve karşılığı tek şey: sayfanın ana bölümünde artık bir
   sahne var. Sahnenin kendi ölçüsü ve palet tablosu svc-muhasebe.css ·
   15. bölümde; renk kademeleri labın gece paletinden DEVRALINMADI, beyaz
   zemine göre yeniden ölçüldü.

   LAB TARAFI SİLİNDİ: müşteri /lab/muhasebe-hero'yu komple kaldırttı, yani
   MhGecit.tsx ve lab-mhg.css artık yok. Canlı kopya en baştan ayrı dosyada ve
   ayrı ad alanındaydı, o yüzden silme bu sayfada hiçbir şeyi oynatmadı.

   ---------------------------------------------------------------------------
   DAHA ÖNCE: BEŞ DÜZELTME — HERO, DÖRT KUTU, ŞERİT, GİDEN BÖLÜM, GELEN BÖLÜM

   Müşterinin cümleleri ve buradaki karşılıkları:

   1) "muhasebe sayfasında heronun sağdaki kart çok yüzeysel ve hiçbişi
      anlatmıyor. dubai sayfasındaki çok daha iyiydi."
      → SAHNE BAŞTAN YAZILDI. Eski çizim soyuttu (bölünmüş bir zaman ekseni +
        boş plakalar), yani tanınabilir tek bir nesnesi yoktu. Yenisi
        muhasebenin ÜRETTİĞİ şeyi çiziyor: kapanan bir mali sayfa (kalem
        satırları, tutar sütunu, alt toplam, toplam ve toplamın altındaki ÇİFT
        ÇİZGİ) ve yanında aynı defterden çıkan rapor kartı. Ölçüt olarak
        gösterilen kart (HeroDubaiCards · .dhs-) KOPYALANMADI: o beş sahneli,
        metinli, düğmeli bir anlatım; bu tek sahneli ve sessiz bir çizim.
        (O sahne sonradan hero'dan çıktı ve silindi — bkz. yukarıdaki
        "ÖNCEKİ TUR" notu.)

   2) "bu işi kim yürütüyor kısmı çok kısa kalmış ve altında ekstra açılır
      panel vermişsin, onun yerine direkt 4 kutuda her şeyi verebilirsin."
      → AÇILIR PANEL GİTTİ, DÖRT KUTU DOLDU. Dört açıklama artık kutuların
        içinde; ızgaranın altındaki ayrı "Müşteri paneli: …" şerhi de üçüncü
        kutunun cümlesine girdi. Bölümde artık tek bir açılır kalem yok ve
        kaybolan tek cümle de yok.
      → "sağ tarafta genel dubai görseli yerine biraz daha muhasebeyle alakalı
        bir görsel olsun." Fotoğraf PHOTO.dubai (Dubai silueti) → PHOTO.accounting
        (masada belge üzerinde çalışan el). İkisi de lib/media.ts'te zaten
        kayıtlı; yeni bir kaynak eklenmedi.

   3) "neyi kapsamıyor kısmına bu kadar ayrı yer ayırmak yerine tek bir şerit
      yapıp onu akordiyon şekilde açıp verebilirsin."
      → BEŞ AYRI AÇILIR SATIR → TEK ŞERİT. İçerik kısalmadı: beş maddenin beşi
        de gerekçesiyle birlikte şeridin içinde ve teklifteki hariç kalemler de
        orada. Eskiden gerekçeye ulaşmak için ikinci bir tık gerekiyordu, artık
        şerit bir kez açılıyor ve hepsi geliyor.

   4) "bu çıktılar ne işe yarıyor kısmına da gerek yok."
      → TAKAS PANELİNİN ALTINDAKİ AÇILIR BLOK SİLİNDİ. Altı çıktının adı
        duruyor; giden şey altı açıklama cümlesi (accountingDubai.ts ·
        exchange.outputs). O turda içerik eksilten tek yer burasıydı.
        (Panelin kendisi de sonraki bir turda gitti — altı ad bugün takas
        sahnesinin klasöründe duruyor, aynı kelimelerle.)

   5) "bide bu kısma muhasebe yönetiminin önemi ve faydaları fln gibi bir kısım
      da lazım, şu an biraz o taraf eksik gibi hissettirdi."
      → YENİ BÖLÜM: #fayda, takvim ile fiyat arasında. Dört satır; her satırda
        başlık SONUÇ, alt satır MEKANİZMA. Dördünün de dayanağı sayfanın kendi
        metni ve tek tek accountingDubai.ts · gains bloğunda yazılı. Tasarruf
        oranı, ceza tutarı, hız yüzdesi, denetim istatistiği veya müşteri
        sayısı YOK — hiçbiri doğrulanmadı.

   Ayrıca bir OLGU DÜZELTMESİ: firmanın üç ülkede de kendi ofisi var ve hepsini
   kendisi yürütüyor. Sayfadaki ve yorumlardaki "kendi ofisimizin olduğu tek
   yer Dubai" imâsı kalktı. Dubai ofisinden söz etmek doğru — burası bir Dubai
   sayfası; yanlış olan başka ülkelerde olmadığı imâsıydı.

   ÖLÇÜM (Chrome, sabit genişlikli aynı-köken iframe, bütün açılırlar KAPALI —
   yani sayfayı ilk açanın taraması gereken hâl):

                              ÖNCE     SONRA
     <main> yüksekliği 1440   7.864    8.070 px   (+%2,6)
     görünür metin            6.074    6.704 kr   (+%10)
     bölüm sayısı                 6         7
     açılır kalem                22        17

   Yükseklik neredeyse yerinde durdu çünkü giden iki blok ölçüldü ve yeni bölüm
   onların yerine geçti: "neyi kapsamıyor" ızgarası 274 → 68 piksel (şerit
   kapalıyken 48), silinen çıktı açılırı 68 piksel, yeni #fayda bölümü 480
   piksel. Dört kutuya inen açıklamalar YÜKSEKLİĞE HİÇ MAL OLMADI (ölçüldü: 0
   piksel) — bölümün boyunu zaten sağdaki fotoğraf + alıntı sütunu belirliyordu,
   kutular var olan boşluğu doldurdu.

   Görünür metnin +%10 artması bu turun kaçınılmaz sonucu: müşterinin beş
   isteğinden ikisi (dört kutunun dolması ve yeni bölüm) tanımı gereği YÜZEYE
   metin ekliyor. Dengelemek için başka bir yerden içerik atılmadı; onun yerine
   yüzeye çıkan on iki cümlenin hepsi kısaltıldı (aynı iddia, daha az kelime —
   toplam 129 karakter). Silinen tek içerik müşterinin açıkça istediği çıktı
   açıklamaları.

   ---------------------------------------------------------------------------
   ÖNCEKİ TUR: ŞERİT, SSS, HERO'NUN İKİ SÜTUNA AYRILMASI

   1) RENKLİ KENAR ŞERİDİ GİTTİ. Fiyat satırlarının sol kenarındaki 3 piksellik
      renk kodlu çubuk (mavi / kehribar) kaldırıldı. Bilgi kaybolmadı: aynı
      ayrımı satırın kendi rozeti YAZIYLA söylüyor ("İlk yıl toplamında" /
      "Gerekli ise") ve rozetin renkleri de [data-inc] ile ayrışmaya devam
      ediyor. YASAK HÂLÂ GEÇERLİ: kartların sol/üst kenarına renk kodlu ince
      çubuk konmuyor. Ayrıntı svc-muhasebe.css · 12. bölüm.

   2) SSS ARTIK ÜLKE SAYFASININ BİLEŞENİ. Buradaki altı <details> yerine
      components/CountryFaq.tsx basılıyor — ülke sayfalarının kullandığının
      ta kendisi. İçerik değişmedi, FAQPage JSON-LD'si aynı listeden üretilmeye
      devam ediyor.

   3) HERO İKİ SÜTUNLU. PageHero'ya opt-in `art` propu eklendi (propsuz her
      çağrı bugünkü kompakt çıktının birebir aynısı). Sağdaki çizim bu turda
      yenilendi — bkz. yukarıdaki 1. madde.

   ---------------------------------------------------------------------------
   DAHA ÖNCEKİ TUR: BOŞALAN YERE GÖRSEL

   Müşteri: "bilgiler çok güzel ama okutmuyor… ne bir görsellik var adam
   akıllı ne bir animasyon ne bir hareket. şuan katalog gibi duruyor."

   Bir önceki tur görünür metni 8.444'ten 5.657 karaktere indirdi ve doğruydu;
   ama boşalan yere hiçbir şey konmadığı için sayfa altı bölüm boyunca TEK bir
   dokuya indi: kenarlıklı satır. Bu tur o dokuyu kırıyor ve METNE HİÇ
   DOKUNMUYOR — ölçüm sonrası da 5.657.

   Beş müdahale, hepsi "kaldırılsa hangi bilgi kaybolur" sınavından geçti:

     · süreç rayı (.svs-step)        → beş kutu bir SIRA mı, menü mü?
     · takas bağı (ExchangeLink)     → iki listenin arasındaki DEFTER
                                       (iki tur silik kaldı, son turda geri
                                       geldi — bugün sunucuda ve statik)
     · yıl şeridi (YearStrip)        → yılın YÖNÜ, dama tahtası değil
     · fotoğraf (.svm-who-bg)        → sayfanın tek gerçek karesi; artık
                                       "kim yürütüyor" bandının KOMŞUSU değil
                                       ZEMİNİ (bkz. bölümün yorumu). Eski kap
                                       .svs-photo, tek okuyucusu olan lab
                                       karşılaştırmasıyla birlikte silindi.
     · fiyat şeridi (.svm-prow)      → rozetin söylediği satır boyunca
     · kapanış izi (.svs-startstep)  → üç adım paralel değil, sıralı

   Sahnelerin JS tarafı components/services/AccountingVisuals.tsx'te ve
   gerekçeleri orada tek tek yazılı. Aynı anda tek sahne oynuyor.

   ---------------------------------------------------------------------------
   DAHA ÖNCEKİ TUR: "ANLATMICAZ, GÖSTERİCEZ"

   Müşterinin cümlesi: "hukuk makalesi okur gibi bir sürü yazı okumasını
   istemiyorum." Bir önceki tur bölüm sayısını dokuzdan altıya indirmişti ama
   metnin BİÇİMİ paragraf olarak kalmıştı. Ölçüm (Chrome, sayfadaki bütün
   açılırlar KAPALI — yani sayfayı ilk açanın taraması gereken metin):

                        ÖNCE     SONRA
     yükseklik 1440px   8.657    7.127 px   (−%18)
     yükseklik  375px  11.831    9.817 px   (−%17)
     görünür metin      8.444    5.445 kr   (−%36)
     TOPLAM metin      13.335   12.594 kr   (−%6 · içerik yerinde duruyor)
     <p>                   66       53
     açılır kalem          22       29
     ikon / kutu           36       84      (46 ikon + 38 takvim kutusu)
     <li>                  16       38

   Görünür metin %36 düşerken toplam metnin yalnızca %6 düşmesi bu turun
   tanımı: metin silinmedi, açılır bölümlere indi.

   Değişen şey içerik değil, içeriğin biçimi. Aynı bilgi duruyor — bir iddia,
   bir oran, bir tutar, bir süre silinmedi — ama artık cümle olarak değil YAPI
   olarak duruyor:

     · dört cevap cümlesi (≈420 kr) → dört künye satırı (≈140 kr)
     · beş aşamalık süreç metni     → beş açılır satır, yüzeyde yalnızca başlık
     · altı çıktı kartı             → TAKAS: sizden gelen → size dönen. O turda
                                      iki sütunlu bir panel olmuştu; iki tur
                                      boyunca yerini bir sahne aldı ve son turda
                                      panele geri dönüldü.
     · beş sınır paragrafı (≈900kr) → beş "×" satırı, gerekçe tıklamada
     · 520px'lik SVG takvim         → 12 sütunlu CSS ızgarası, telefonda tam
     · altı fiyat kartı             → altı satırlık fiyat listesi
     · kapanış paragrafı            → üç adımlı "nasıl başlanıyor" şeridi

   ---------------------------------------------------------------------------
   NE GİZLENMEZ — bu turun tek sert kuralı

   Bir rakamı, bir oranı veya bir iddiayı NİTELEYEN şerh <details> arkasına
   konmuyor. Açık kalanlar: fiyat satırındaki "başlangıç" sıfatı ve "+ KDV",
   kalem notları, vergi satırlarının altındaki "otomatik muafiyet yok", sınır
   başlıklarının kendisi, ACC_TAX_NOTE ve "toplam yok" satırı.

   Tıklamanın arkasına giden şey yalnızca AÇIKLAMA — nitelik değil, ayrıntı.

   ---------------------------------------------------------------------------
   BÖLÜMLER (yedi — eski altısının id'leri aynen duruyor, #fayda yeni)

     1 · #ozet               → dört künye satırı        (açılış)
     2 · #ortac-perspektifi  → KİM                      (destek)
          └─ zemin fotoğrafı + perde · solda beyan ve imza, sağda üç şart
     3 · #kapsam             → NE                       (ANA BÖLÜM)
          ├─ süreç · beş açılır satır
          ├─ takas · sizden gelen → size dönen
          └─ #sinirlar · TEK ŞERİT, akordiyon
     4 · #takvim             → NE ZAMAN                 (destek)
          ├─ #neden · kuruluşta açılan üç kayıt
          ├─ gece kart · üç kayıt yan yana + on iki ayın rayı
          └─ #vergi-cercevesi
     5 · #fayda              → NE DEĞİŞİYOR             (destek · YENİ)
     6 · #fiyat              → NE KADAR                 (tek koyu bölüm)
     7 · #sss                → kalan sorular
          ├─ #sonra · ilgili sayfalar
          └─ nasıl başlanıyor · üç adım

   #fayda'nın yeri tesadüf değil: kapsam ve takvim "ne alıyorsunuz"u anlatıp
   bitiriyor, fiyat bölümü "ne ödüyorsunuz"u soruyor. Aradaki tek soru "bu
   düzen bana ne yapıyor" ve bölüm tam oraya düşüyor. Zemin sırası da bozulmadı
   (paper → white → night): takvim paper, fayda white, fiyat koyu.

   SİLİNEN BÖLÜM: takas panelinin altındaki "Bu çıktılar ne işe yarıyor?"
   açılır bloğu. Müşteri gerek olmadığını söyledi; blokla birlikte altı çıktının
   açıklama cümleleri de gitti (accountingDubai.ts · exchange.outputs). Bloğun
   kendi id'si yoktu, yani kırılan bir bağlantı yok.

   ---------------------------------------------------------------------------
   TAKVİM BÖLÜMÜ ARTIK AYRI BİR BİLEŞEN

   Gövde components/services/AccountingCalendar.tsx'e taşındı (lab MT16, ad
   alanı .kmt-). Bu dosyada kalan tek şey bölümün kabuğu ve başlığı.
   ESKİ DERS DURUYOR: buradaki görsel 640 birimlik bir SVG'ydi ve silinme
   sebebi tasarım değil MOBİLDİ (520 pikselin altında kendi kabında yatay
   kayıyordu). Yerine gelen 12 sütunlu ızgara da, onun yerine gelen ray da
   375 pikselde tam görünüyor; yeni bileşen kendine genişlik dayatmıyor.

   Eski hâli 640 birimlik bir SVG'ydi (AccountingScenes · YearRhythmScene) ve
   silinme sebebi tasarım değil MOBİL: çizim 520 pikselin altında okunmadığı
   için kendi kabında yatay kayıyordu, yani telefondaki ziyaretçinin
   keşfetmesi gereken gizli bir kaydırma vardı. Sayfanın en önemli görselinin
   bulunması bir keşfe bağlı olamaz. O bileşen ve CSS'teki .svmv- bloğu
   silindi; o ad geri gelmiyor.

   Yerine 12 sütunlu bir CSS ızgarası geldi: 375 pikselde de tam görünüyor ve
   dolu kutular afterSetup.ts'ten okunuyor (yearLanes). Dolu kutu "bu ayda iş
   var", boş kutu "bu ayda o kalem doğmuyor" — kutuların anlamı lejantta
   GÖSTERİLİYOR, yazılmıyor.

   IZGARA AYNEN DURUYOR. Son turda değişen tek şey kutuların ne zaman
   göründüğü: dizim AccountingVisuals · YearStrip'e taşındı ve kutular ocaktan
   aralığa doğru sırayla doluyor. Sınıflar, ölçüler ve 12 sütun aynı; sahne
   kendine yeni bir genişlik dayatmıyor, yani silinen SVG'nin hatası geri
   gelmiyor (320 pikselde de ölçüldü, yatay kaydırma yok).

   ---------------------------------------------------------------------------
   ROTA: NEDEN BU DOSYA DİNAMİK ROTAYI YENİYOR

   /dubai/[hizmet] dinamik rotası zaten var ve dört hizmeti tek bir şablondan
   basıyor. App Router'da STATİK SEGMENT DİNAMİĞİ YENER: bu dosya var olduğu
   sürece /dubai/muhasebe buraya düşüyor, diğer üç hizmet dinamik rotadan
   çalışmaya devam ediyor.

   Bunun bir sonucu var ve bilerek kabul edildi: dinamik şablon muhasebe için
   services.ts'ten "aylık 175 USD" basıyordu (PRICING.dubai.annual / 12), bu
   sayfa ise müşterinin imzalı hizmet belgesindeki 350 USD'yi basıyor. Çelişki
   yeni değil (bkz. lib/accountingDubai.ts · SWAP:ACC_PRICING ve
   lib/afterSetup.ts · SWAP:AFTER_PRICING). pricing.ts'e dokunulmadı: hangi
   rakamın geçerli olduğu müşterinin kararı.

   ---------------------------------------------------------------------------
   BU DOSYADA TEK BİR CÜMLE YOK

   Ekranda görünen her kelime lib/accountingDubai.ts'te; rakamlar da oradan
   değil, onun okuduğu kaynaklardan (afterSetup.ts, countryContent.ts,
   services.ts) geliyor. Şablon yalnızca diziyor.

   ---------------------------------------------------------------------------
   SEO — metin AZALMADI, YER DEĞİŞTİRDİ

   Müşteri "opacity ile gizli metin gömeriz" dedi; yapılmadı. Kapalı <details>
   içeriği Google tarafından normal biçimde indeksleniyor ve gizleme sayılmaz;
   opaklığı sıfırlanmış metin ise Google'ın spam politikalarında adı geçen bir
   teknik. Yani doğru çözüm zaten müşterinin istediği görsel sonucu veriyor.

   Bozulmadan duranlar: tek h1 (PageHero), bölüm başına bir h2, blok başına
   bir h3, bütün id'ler ve üç düğümlü JSON-LD (BreadcrumbList, Service,
   FAQPage). Hiçbirinde sayfada yazmayan bir şey yok.

   SSS BİLEŞENİ DEĞİŞİNCE NE OLDU — ölçüldü, çünkü akla ilk gelen risk buydu.
   CountryFaq yalnızca SEÇİLİ cevabı DOM'a basıyor (ötekiler kapalı bir
   <details> içinde bile durmuyor). Buna rağmen altı cevabın altısı da
   sunulan HTML'de duruyor: hem FAQPage JSON-LD'sinde hem de bileşene giden
   `items` propunun sunucu yükünde. Yani işaretlemenin arkasında sayfada
   olmayan bir cevap yok — ülke sayfalarında zaten bu düzen çalışıyor.
   ========================================================================= */

/* Kanonik adres mutlak: layout.tsx'te metadataBase yok, göreli bir kanonik
   geliştirme sunucusunun adresine çözülürdü. */
const SITE = "https://ortacglobal.com";
const PAGE_URL = `${SITE}/dubai/muhasebe`;

export const generateMetadata = (): Metadata => ({
  title: C.seo.title,
  description: C.seo.description,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "article",
    locale: "tr_TR",
    siteName: "Ortac Global",
    url: PAGE_URL,
    title: C.seo.title,
    description: C.seo.description,
  },
});

/* İçerik dosyası ikon adını string taşıyor (orada gerekçesi yazılı); eşleme
   burada. Mühür ile tik arasındaki fark kasıtlı: lisans bir onay değil,
   bir yetki — Authority.tsx'te de aynı ayrım aynı ikonla yapılıyor. */
const ICON: Record<AccIcon, LucideIcon> = {
  book: BookOpen,
  receipt: Receipt,
  chart: ChartColumn,
  wallet: Wallet,
  stamp: Stamp,
  bank: Landmark,
  files: FileStack,
  calendar: CalendarCheck,
  pin: MapPin,
  info: Info,
};

const nf = new Intl.NumberFormat("tr-TR");

/* --------------------------------------------------------------- yardımcı */

/** "başlangıç 350 USD + KDV" — biçim CountryAfter ile birebir aynı. */
function priceText(p: { usd: number; plusVat: boolean; qualifier?: string }) {
  return `${p.qualifier ? `${p.qualifier} ` : ""}${nf.format(p.usd)} USD${p.plusVat ? " + KDV" : ""}`;
}

export default function DubaiAccountingPage() {
  const items = accountingItems();


  /* "Bu işi kim yürütüyor?" bandının hiyerarşisi VERİDEN geliyor: ilk madde
     beyan, kalanlar şart. Elle sabitlenmiş bir dize yok — accountingDubai.ts ·
     ortac.facts'in sırası değişirse ekrandaki asıl cevap da kendiliğinden
     değişiyor. */
  const [mainFact, ...restFacts] = C.ortac.facts;
  const MainFactIcon = ICON[mainFact.icon];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana sayfa", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "Dubai", item: `${SITE}/dubai` },
          { "@type": "ListItem", position: 3, name: "Muhasebe", item: PAGE_URL },
        ],
      },
      {
        /* offers/price BİLEREK yok: kalemlerin yarısı koşullu ve "başlangıç"
           nitelikli. Yapılandırılmış veride tek bir fiyat göstermek, sayfada
           özenle kurulan koşulluluğu düz bir rakama indirgerdi. */
        "@type": "Service",
        name: "Dubai'de şirket muhasebesi, KDV ve vergi beyan hizmeti",
        serviceType: "Muhasebe ve vergi uyumu",
        url: PAGE_URL,
        provider: { "@type": "Organization", name: "Ortac Global", url: SITE },
        areaServed: { "@type": "Place", name: "Dubai" },
        description: C.seo.description,
      },
      {
        "@type": "FAQPage",
        mainEntity: C.faq.items.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
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

        {/* Hero artık iki sütunlu: müşteri "şirket kuruluşundaki gibi olsun,
            sağda svg animasyon dursun" dedi.

            `country` HÂLÂ VERİLMİYOR ve verilmeyecek: o dal ülke hero'sunu
            basıyor, yani sağda kuruluş kartını ve FACTS'ten okunan güven
            satırlarını. Bu sayfanın konusu kuruluş değil. Bunun yerine
            PageHero'ya opt-in bir `art` propu eklendi; propsuz her çağrı
            bugünkü kompakt çıktının birebir aynısını üretmeye devam ediyor
            (gerekçe PageHero.tsx'te, propun kendi belgesinde).

            BU TURDA SAĞDAKİ SAHNE KARTA DÖNDÜ. Müşteri: "muhasebe herosunun
            kartı yapmışsın güzel olmuş … ondan sonra yayına alabilirsin."
            Yayına alınan şey /lab/muhasebe-hero'nun dördüncü adayı: dört
            bölme (Defter · Beyan · Rapor · Arşiv), kart 4,1 saniyede bir kendi
            çeviriyor, bir çubuğa basılınca kalıcı duruyor, ve her bölmenin
            ekranda kaldığı sürece süren kendi döngüsü var.

            ESKİ SAHNE (AccountingHeroScene · .svma-) HERO'DAN ÇIKTI ve bir tur
            sonra SİLİNDİ: tek okuyucusu /lab/muhasebe-hero'daki "taban" bloğuydu
            ve müşteri o rotayı kaldırttı. Neden gittiğinin ölçümü
            svc-muhasebe.css · 16b'deki mezar taşında: kımıldayan alan tuvalin
            binde ikisi, iki olay arasında 4,8 saniye boşluk — hareket vardı ama
            görünmüyordu.

            Kart kendi kabını, ölçüsünü ve telefonda gizlenmeyi kendi taşıyor
            (.svmk · svc-muhasebe.css · 16. bölüm). Ad alanı labdakinden
            (.mhs-) ayrı tutulmuştu; lab tarafı silindiği için bugün tek sürüm.

            BUTON VE İKİ SATIR ÖNCEKİ TURDAN. Müşteri: "muhasebe herosuna da
            dubai sayfasındaki gibi buton ve altına 2 tane öne çıkan şey
            koysana iconla."

            `country` HÂLÂ VERİLMİYOR — o dal FACTS[country] okumaya devam
            ediyor ve bu sayfa bir ülke sayfası değil. Buton ve satırlar
            PageHero'nun `art` dalına eklenen iki opt-in propla geliyor
            (`cta` · `trust`); ikisinin de içeriği bu sayfanın kendi dosyasında
            (accountingDubai.ts · hero), hangi cümlenin neden seçildiği orada
            madde madde yazılı.

            İKON BURADA ÇİZİLİYOR, ADIYLA DEĞİL BİLEŞENİYLE GEÇMİYOR: PageHero
            istemci bileşeni, bu sayfa sunucu bileşeni — lucide bileşeninin
            kendisi sınırı geçemez, çizilmiş düğüm geçer. Sayfanın zaten bir
            ICON eşlemesi var, ikinci bir kayıt açılmadı. Ölçü ülke
            hero'sundakiyle aynı (15 · 2). */}
        <PageHero
          crumb={C.hero.crumb}
          title={C.hero.title}
          accent={C.hero.accent}
          lead={C.hero.lead}
          art={<AccountingHeroCard />}
          cta={C.hero.cta}
          trust={C.hero.trust.map((t) => {
            const Icon = ICON[t.icon];
            return {
              icon: <Icon size={15} strokeWidth={2} aria-hidden="true" />,
              line: t.line,
            };
          })}
        />

        {/* ========================================================== 1 · ÖZET

            Dört soru, dört karşılık, dört bağlantı — ve sıraları aşağıdaki
            bölümlerin sırasıyla aynı.

            KART DEĞİL KÜNYE: eski hâlde her kart tam bir cümle taşıyordu ve
            dördü birden sayfanın başında ikinci bir metin duvarı kuruyordu.
            Şimdi etiket + üç-dört kelime. Cevabın kendisi zaten bağlantının
            indiği bölümde. */}
        <section
          id={C.summary.id}
          className="sec-pad svm-tight"
          style={{ background: "var(--white)" }}
        >
          <div className="container-o">
            <div className="sec-head">
              <SplitWords
                as="h2"
                text={C.summary.heading}
                accent={C.summary.accent}
                className="h2"
                style={{ color: "var(--text-900)" }}
              />
            </div>

            {/* Düz <a>: hedef aynı sayfada, SmartLink rota bileşeni. */}
            <div className="svm-answers">
              {C.summary.answers.map((a, i) => {
                const Icon = ICON[a.icon];
                return (
                  <FadeUp key={a.k} delay={0.06 + i * 0.05}>
                    <a href={`#${a.to}`} className="svm-answer">
                      <span className="svm-answer-ic" aria-hidden="true">
                        <Icon size={16} strokeWidth={2.1} />
                      </span>
                      <span className="svm-answer-k">{a.k}</span>
                      <b className="svm-answer-v">{a.v}</b>
                      <ArrowRight
                        className="svm-answer-go"
                        size={15}
                        strokeWidth={2.1}
                        aria-hidden="true"
                      />
                    </a>
                  </FadeUp>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================================================ 2 · KİM

            BEYAN + ZEMİN. Müşteri bir önceki hâli reddetti: "muhasebe
            sayfasında ss attığım kısımı tam sevemedim ya." Karşılığında dört
            aday /lab/muhasebe-ekip'te yan yana duruyordu; seçilen K4 ("k4 ü
            live alabilirsin") bu bölüm.

            GİDEN DÜZEN: solda dört eşit kutu (.svm-fact ızgarası), sağda
            fotoğraf (.svs-photo) ve altında alıntı (.svm-quote) — üçünün de
            CSS'i /lab/muhasebe-ekip kapanınca silindi. Ölçülen üç
            kusuru vardı — dört kutu da aynı ikon kabını, aynı puntoyu ve aynı
            kenarlığı kullandığı için hiçbiri birinci değildi; kutular satır
            içinde aynı boya gerildiğinden kısa metinli olanın altında görünür
            bir delik kalıyordu; sağ sütun kendi içinde ikiye bölündüğü için
            bölüm dört değil altı kutu okunuyordu.

            GELEN DÜZEN: fotoğraf artık bölümün komşusu değil ZEMİNİ — kare
            bandın tamamının arkasında, üstünde sabit koyu bir perde. Perdenin
            üstünde iki sütun var: solda ilk madde BEYAN olarak (başlığı bandın
            tek büyük tipografisi, 32 piksele kadar), sağda kalan üç madde saç
            teli çizgilerle ayrılmış satırlar hâlinde. Altı kutu tek bloka
            iniyor, dört maddenin dördü de eksiksiz duruyor.

            SIRA VERİDEN: `const [mainFact, ...restFacts]` yukarıda, bileşenin
            başında. Hangi maddenin beyan olacağı burada yazmıyor.

            ALINTININ İŞİ DEĞİŞTİ, METNİ DEĞİŞMEDİ. Cümle Dubai'nin rekabet
            gücünden söz ediyor, yani "kim yürütüyor?" sorusunun cevabı değil;
            bu yüzden bölümün başlığı olmaktan çıkıp beyanın İMZASI oldu — aynı
            bloğun dibinde, saç teli bir çizginin altında, 13,5 piksel.
            figure/blockquote/figcaption yapısı korundu: cümle hâlâ "Murat
            Ortaç şunu söyledi" diyor, "Murat Ortaç bu işi yürütüyor" demiyor.

            AÇILIR KALEM YOK, bir önceki turda olduğu gibi: dört maddenin
            dördü de yüzeyde. Panelin adı üçüncü maddenin cümlesinde duruyor
            (accountingDubai.ts · ortac.facts, ACC_PANEL'den okunuyor).

            FOTOĞRAF — bilinen sınır: perdenin altında kare bir sahne olarak
            değil, düzensiz bir ışık olarak okunuyor. Perdeyi açmak kareyi
            gerçekten fotoğraf yapar ama perdenin üstündeki yazının kontrast
            tablosu düşer; bugünkü denge korunuyor, müşterinin kendi çekimi
            gelince yeniden bakılacak (lib/media.ts · SWAP:STOCK_PHOTOS).

            alt boş, gerekçe bir önceki turdakiyle aynı: kare bir olgu
            taşımıyor, dört madde taşıyor. unoptimized: next.config.ts'te
            remotePatterns tanımlı değil, iyileştirici dış alan adını
            reddederdi. */}
        <section
          id={C.ortac.id}
          className="sec-pad svm-tight"
          style={{ background: "var(--paper)" }}
        >
          <div className="container-o">
            <div className="sec-head">
              <SplitWords
                as="h2"
                text={C.ortac.heading}
                accent={C.ortac.accent}
                className="h2"
                style={{ color: "var(--text-900)" }}
              />
            </div>

            {/* Bandın tamamı TEK FadeUp: parçalar ayrı ayrı belirseydi zemin
                fotoğrafı ile üstündeki iki sütun farklı anlarda açılır ve
                "tek blok" fikri ilk saniyede bozulurdu. */}
            <FadeUp delay={0.04}>
              <div className="svm-who">
                <div className="svm-who-bg" aria-hidden="true">
                  <Image
                    src={PHOTO.accounting}
                    alt=""
                    fill
                    sizes="(min-width: 1240px) 1136px, 100vw"
                    unoptimized
                  />
                  <span className="svm-who-scrim" />
                </div>

                <div className="svm-who-in">
                  {/* ---- beyan ---- */}
                  <div className="svm-who-lead">
                    {/* İkon kutusuz: koyu zeminde ikona ayrı bir kap açmak
                        beyanı yeniden bir karta çevirirdi. Ölçüldü — %8 beyaz
                        yıkamalı bir kabın içinde --blue-500 perdenin en açık
                        noktasında 3,2:1'e iniyor, kapsız 4,1:1 kalıyor. */}
                    <span className="svm-who-lead-ic" aria-hidden="true">
                      <MainFactIcon size={26} strokeWidth={1.8} />
                    </span>
                    <b className="svm-who-lead-t">{mainFact.title}</b>
                    <p className="svm-who-lead-l">{mainFact.line}</p>

                    {/* Alıntı beyanın imzası: aynı bloğun içinde, çizginin
                        altında. CSS'te margin-top: auto — sağdaki üç şart
                        sütunu beyandan uzun kalırsa artan yükseklik başlıkla
                        cümlenin arasına değil imzanın üstüne düşüyor. */}
                    <figure className="svm-who-sign">
                      <blockquote>{C.ortac.quote.text}</blockquote>
                      <figcaption>
                        <b>{C.ortac.quote.who}</b>
                        <span>{C.ortac.quote.role}</span>
                      </figcaption>
                    </figure>
                  </div>

                  {/* ---- üç şart ----
                      Kutu değil satır: her satırın üstünden bir saç teli
                      geçiyor, kendi kenarlığı ve zemini yok. Kutu olmayınca
                      satırların farklı boylarda olması görünmüyor; giden 2×2
                      ızgarada aynı fark kısa kutunun altında delik açıyordu. */}
                  <ul className="svm-who-rest">
                    {restFacts.map((f) => {
                      const Icon = ICON[f.icon];
                      return (
                        <li className="svm-who-r" key={f.title}>
                          <span className="svm-who-r-ic" aria-hidden="true">
                            <Icon size={16} strokeWidth={2.1} />
                          </span>
                          <b>{f.title}</b>
                          <span className="svm-who-r-l">{f.line}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ===================================================== 3 · ANA BÖLÜM

            Üç katman, üç ayrı görsel biçim. Aynı biçimde çizilselerdi
            ziyaretçi aralarındaki farkı okumak zorunda kalırdı:

              · süreç  → numaralı ray, açılır satırlar
              · takas  → iki sütun ve bir ok
              · sınır  → çarpı işaretli satırlar */}
        <section id={C.scope.id} className="sec-pad svm-main" style={{ background: "var(--white)" }}>
          <div className="container-o">
            <div className="sec-head">
              <SplitWords
                as="h2"
                text={C.scope.heading}
                accent={C.scope.accent}
                className="h2"
                style={{ color: "var(--text-900)" }}
              />
              <FadeUp delay={0.2}>
                <p className="sec-lead">{C.scope.lead}</p>
              </FadeUp>
            </div>

            {/* SÜREÇ — native <details>: JavaScript yok, klavye ve ekran
                okuyucu davranışı tarayıcıdan geliyor, bölüm sunucu tarafında
                kalabiliyor. Sayfadaki bütün açılır kalemler aynı kalıbı
                kullanıyor — ziyaretçi tek bir açma hareketi öğreniyor.

                Yüzeyde yalnızca başlık var ve bu bilgi kaybı değil: beş başlık
                üst üste okunduğunda süreç zaten okunuyor. */}
            {/* .svs-step: kutunun solundaki ray. Beş aşama beş ayrı kutu
                olarak duruyordu ve aralarındaki tek ilişki sıra numarasıydı —
                yani ilişki okunmadan görünmüyordu. Ray hareketi FadeUp'tan
                alıyor: satırlar sırayla açıldığı için zincir de yukarıdan
                aşağı çiziliyor, yeni bir zamanlayıcı yok. */}
            <div className="svm-flow">
              {C.scope.phases.map((p, i) => (
                <FadeUp key={p.title} className="svs-step" delay={0.06 + i * 0.04}>
                  <details className="svm-more svm-fstep">
                    <summary>
                      <span className="svm-fstep-n" aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <b>{p.title}</b>
                      <span className="svm-more-x" aria-hidden="true" />
                    </summary>
                    <div className="svm-fstep-d">
                      <p>{p.line}</p>
                      <p>{p.detail}</p>
                    </div>
                  </details>
                </FadeUp>
              ))}
            </div>

            {/* TAKAS — sayfanın en görsel parçası ve iki soruyu birden
                kapatıyor: "benden ne isteniyor" ve "karşılığında ne alıyorum".
                İkisi de eskiden metnin içine gömülüydü.

                Ok tek yönlü ve bu kasıtlı: bu bir iş birliği değil bir devir.
                Belge sizde, defter bizde, çıktı yine sizde. */}
            {/* Bloğun kendi girişi yok ve olmayacak: sahnedeki iki sütun
                başlığı ("Sizden gelen" / "Size dönen") zaten girişin
                söyleyeceği her şeyi söylüyor. Bir cümle eklemek göstermek
                yerine anlatmak olurdu. */}
            <FadeUp delay={0.1}>
              <h3 className="svm-sub">{C.exchange.title}</h3>
            </FadeUp>

            {/* TAKAS PANELİ — GERİ ALINDI.

                Müşteri: "muhsaebe takas bölümü olmamış kral. ben sadece text
                yazmaktan uzak duralım derken sen konuyu texte boğmuşsun. odak
                svg görsel ve animasyonlarda olcak ama texti de koymalıyızki
                açıklayıcı olsun mantık o. aslında şu attığım görseldeki iyi."

                "Şu attığım görsel" bu panelin ta kendisi: iki liste, solda üç
                ikonlu kalem, sağda altı ikonlu kalem mavi zeminde, aralarında
                "belge → defter → çıktı" bağı. İki tur boyunca yerine sahne
                konmuştu; ikinci turda sahne paneli tamamen yuttu ve dokuz kalem
                çizimin içine girdi. Sonuç bölümün görünür metnini 7.210
                karaktere çıkardı — istenen dengenin tersi.

                DENGE: görsel önde, metin AÇIKLAYICI olarak yanında. Panel bunu
                zaten yapıyordu; ikonlu satır bir liste değil bir künye, çizim de
                iki listenin arasında duran cümle.

                Silinen ad alanı (.svsg-) CSS'ten kaldırıldı; 6. ve 15. bölümdeki
                notlar neyin neden gittiğini anlatıyor. Kaybolan içerik yok:
                dokuz kalem ve iki başlık birebir aynı kelimelerle panelde.

                Sunucu bileşeni ve saf CSS: tarayıcıya bu bloktan tek satır JS
                inmiyor, useReducedMotion'a hiç dokunulmuyor. Hareket labdaki
                denemeden geldi ("aynen sevkiyat olanı yapabilirsin") ve
                mekanizması paylaşılan kalıpta: src/app/css/aktarim.css.
                Bu blok yalnızca sırayı ve renkleri veriyor; `reduce` kapısı
                kalıbın içinde ve altında sıfır animasyon kalıyor. */}
            <FadeUp delay={0.14} className="svm-blockgap">
              <AccountingHandover />
            </FadeUp>

            {/* BURADA BİR AÇILIR BLOK VARDI VE SİLİNDİ: "Bu çıktılar ne işe
                yarıyor?" — altı çıktının birer cümlelik açıklaması. Müşteri
                gerek olmadığını söyledi. Çıktıların adı panelde duruyor, giden
                şey altı açıklama cümlesi; ölü kalmasın diye veri tarafından da
                kaldırıldılar (accountingDubai.ts · exchange.outputs artık
                AccChip[], yani ikon + etiket).

                SINIRLAR — ARTIK TEK ŞERİT. Müşteri: "neyi kapsamıyor kısmına
                bu kadar ayrı yer ayırmak yerine tek bir şerit yapıp onu
                akordiyon şekilde açıp verebilirsin."

                Eskiden beş madde iki sütunlu bir ızgarada beş ayrı <details>
                olarak duruyordu; kapalıyken bile üç satır yer kaplıyordu ve
                gerekçeye ulaşmak için beş ayrı tık gerekiyordu.

                İÇERİK KISALMADI VE KISALMAYACAK: bu bölüm sayfanın dürüstlük
                yükünü taşıyor — kapsam dışı kalemleri saymak, müşterinin
                sonradan sürpriz yaşamamasını sağlıyor. Beş maddenin beşi de
                GEREKÇESİYLE BİRLİKTE şeridin içinde, teklifteki hariç kalem
                rozetleri de orada. Değişen tek şey kapalı hâlde kapladığı yer.

                Başlık şeridin DIŞINDA kaldı: #sinirlar bir bölüm id'si ve
                sayfa içi bağlantı hedefi, ayrıca belge ağacındaki h3 yerini
                koruyor. Şeridin özet satırı da bölümün kendi giriş cümlesi —
                yeni bir kelime yazılmadı; yanındaki sayı items.length'ten
                geliyor, elle yazılmıyor. */}
            <FadeUp delay={0.1}>
              <h3 id={C.limits.id} className="svm-sub">
                {C.limits.title}
              </h3>
            </FadeUp>

            <FadeUp delay={0.14} className="svm-blockgap">
              <details className="svm-more svm-drop svm-exc">
                <summary>
                  <span className="svm-exc-s">
                    {C.limits.lead}
                    <em>{C.limits.items.length} kalem</em>
                  </span>
                  <span className="svm-more-x" aria-hidden="true" />
                </summary>

                <ul className="svm-exc-list">
                  {C.limits.items.map((l) => (
                    <li key={l.title}>
                      <span className="svm-exc-x" aria-hidden="true">
                        <X size={13} strokeWidth={2.6} />
                      </span>
                      <span>
                        <b>{l.title}:</b> {l.line}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* services.ts'teki hariç listesi — aynı bilginin teklifte
                    hangi sözcüklerle geçtiği. Rozet biçiminde: iki liste
                    birbirini doğruluyor, tekrar etmiyor. Şeridin içine girdi
                    çünkü niteldiği şey şeridin kendisi. */}
                {ACC_EXCLUDES.length > 0 && (
                  <p className="svm-note svm-note-top">
                    Teklifte hariç kalem olarak yazılanlar:{" "}
                    {ACC_EXCLUDES.map((e) => (
                      <span className="svm-tag" key={e}>
                        {e}
                      </span>
                    ))}
                  </p>
                )}
              </details>
            </FadeUp>
          </div>
        </section>

        {/* ======================================================= 4 · TAKVİM

            "Ne zaman" sorusunun tamamı tek bölümde: kuruluşta ne açılıyor
            (#neden), yıl içinde ne tekrar ediyor (şerit) ve bunların dayandığı
            çerçeve (#vergi-cercevesi). */}
        <section
          id={C.calendar.id}
          className="sec-pad svm-tight"
          style={{ background: "var(--paper)" }}
        >
          <div className="container-o">
            <div className="sec-head">
              <SplitWords
                as="h2"
                text={C.calendar.heading}
                accent={C.calendar.accent}
                className="h2"
                style={{ color: "var(--text-900)" }}
              />
              <FadeUp delay={0.2}>
                <p className="sec-lead">{C.calendar.lead}</p>
              </FadeUp>
            </div>

            {/* BÖLÜM GÖVDESİ ARTIK KENDİ BİLEŞENİNDE.
                Seçilen lab adayı MT16 canlıya alındı (/lab/muhasebe-takvim).
                Buradaki 122 satır components/services/AccountingCalendar.tsx
                içine taşındı ve üç şey DEĞİŞTİ, hepsi müşterinin isteği:

                  · "12 / 12 ay" rakam çifti YOK. "başlık ve açıklama kalsın"
                    dedi; cevabı artık tek başına alttaki cümle taşıyor ve o
                    cümle veriden kuruluyor, elle yazılmıyor.
                  · "Üç ritim tam olarak ne demek?" kapısı YOK. Ölçüldü: üç
                    <li>, 213 karakter, üçü de yukarıdaki şeridin kelimeye
                    çevrilmiş hâliydi — bilgi kaybı sıfır, kaybolan tekrar.
                  · Vergi çerçevesi kapıdan ÇIKTI ve ikon kareli künye tahtası
                    oldu ("neye göre tutuluyor kısmınıda daha iconlu fln güzel
                    bi şekilde yapalım pek dikkat çekici durmuyor").

                #neden ve #vergi-cercevesi ÇAPALARI KORUNDU: bileşende ikisi
                de <h3 id=…> olarak duruyor, sayfanın kendi bölüm haritası ve
                iç bağlantılar onlara gidiyor. */}
            <AccountingCalendar />
          </div>
        </section>

        {/* ======================================================== 5 · FAYDA

            YENİ BÖLÜM. Müşteri: "bide bu kısma muhasebe yönetiminin önemi ve
            faydaları fln gibi bir kısım da lazım, şu an biraz o taraf eksik
            gibi hissettirdi."

            YERİ: kapsam ve takvim "ne alıyorsunuz"u anlatıp bitiriyor, hemen
            aşağıdaki fiyat bölümü "ne ödüyorsunuz"u soruyor. Aradaki tek soru
            "bu düzen bana ne yapıyor" — bölüm tam oraya düşüyor.

            NE YAZMIYOR: tasarruf oranı, tasarruf tutarı, ceza tutarı, "%X daha
            hızlı", denetim istatistiği, müşteri sayısı, sektör ortalaması.
            Hiçbiri doğrulanmadı ve bir tanesi bile yazılsa sayfanın geri
            kalanının dürüstlüğü de tartışmalı hâle gelirdi.

            NE YAZIYOR: dört satır ve her satırda başlık SONUÇ, alt satır
            MEKANİZMA. Mekanizma olmadan sonuç bir vaat olurdu; mekanizmayla
            birlikte doğrulanabilir bir cümle oluyor. Dördünün de dayanağı
            sayfanın kendi metni ve accountingDubai.ts · gains bloğunda satır
            satır yazılı.

            BİÇİM KART DEĞİL SATIR — bilerek. Sayfada zaten dört kart ızgarası
            var (özet, kim, ilgili sayfalar, nasıl başlanıyor); beşinci bir
            kart ızgarası bu bölümü onlardan ayırt edilemez yapardı. Çizgiyle
            ayrılmış satır dokusu sayfada bir kez daha geçiyor (vergi çerçevesi)
            ve orada da anlamı aynı: "bunlar tek tek okunan künye satırları,
            birbiriyle karşılaştırılan kartlar değil." */}
        <section
          id={C.gains.id}
          className="sec-pad svm-tight"
          style={{ background: "var(--white)" }}
        >
          <div className="container-o">
            <div className="sec-head">
              <SplitWords
                as="h2"
                text={C.gains.heading}
                accent={C.gains.accent}
                className="h2"
                style={{ color: "var(--text-900)" }}
              />
              <FadeUp delay={0.2}>
                <p className="sec-lead">{C.gains.lead}</p>
              </FadeUp>
            </div>

            <div className="svm-gains">
              {C.gains.items.map((g, i) => {
                const Icon = ICON[g.icon];
                return (
                  <FadeUp key={g.title} delay={0.06 + i * 0.05}>
                    <div className="svm-gain">
                      <span className="svm-gain-ic" aria-hidden="true">
                        <Icon size={15} strokeWidth={2.1} />
                      </span>
                      <b>{g.title}</b>
                      <span>{g.line}</span>
                    </div>
                  </FadeUp>
                );
              })}
            </div>
          </div>
        </section>

        {/* ======================================================== 6 · FİYAT

            Sayfanın TEK koyu bölümü; koyuluk dekor değil işaret: para burada.

            ALTI KART DEĞİL ALTI SATIR. Kart düzeni her kalemi eşit ağırlıkta
            bir nesne yapıyordu ve tutar kartın içinde kayboluyordu. Listede
            göz tek sütunda aşağı iniyor ve tutarlar alt alta hizalı duruyor —
            fiyat listesi zaten böyle okunur.

            AÇIK KALANLARIN HEPSİ TUTARI NİTELİYOR: rozet (herkeste doğuyor
            mu), ritim, tutar, "başlangıç" sıfatı ve kalemin kendi notu.
            Tıklamanın arkasında yalnızca kalemin ne olduğu ve kapsamı var. */}
        <section id={C.price.id} className="sec-pad svm-tight sec-night">
          <div className="container-o">
            <div className="sec-head sec-head-dark">
              <SplitWords
                as="h2"
                text={C.price.heading}
                accent={C.price.accent}
                className="h2"
                style={{ color: "#ffffff" }}
              />
              <FadeUp delay={0.2}>
                {C.price.lead ? (
                  <p className="sec-lead sec-lead-dark">{C.price.lead}</p>
                ) : null}
              </FadeUp>
            </div>

            <div className="svm-plist">
              {items.map((it, i) => (
                <FadeUp key={it.id} delay={0.06 + i * 0.04}>
                  <details className="svm-more svm-more-dark svm-prow" data-inc={it.inclusion}>
                    <summary>
                      <span className="svm-prow-t">
                        <b>{it.title}</b>
                        <span className="svm-prow-tags">
                          <em className="svm-badge">{INCLUSION_LABEL[it.inclusion].short}</em>
                          <em className="svm-rhythm">{RHYTHM_LABEL[it.rhythm]}</em>
                        </span>
                      </span>
                      <span className="svm-prow-v data">
                        {priceText(it.price)}
                        <i>{it.price.unit}</i>
                      </span>
                      <span className="svm-more-x" aria-hidden="true" />
                    </summary>

                    <div className="svm-prow-d">
                      {it.en && <p className="svm-prow-en">{it.en}</p>}
                      {it.line && <p>{it.line}</p>}
                      {it.scope && it.scope.length > 0 && (
                        <ul>
                          {it.scope.map((s) => (
                            <li key={s}>{s}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </details>
                </FadeUp>
              ))}
            </div>

            {/* Kalem notları listenin ALTINDA değil, kalemin yanında dursun
                istenirdi ama <summary> içine üçüncü bir satır girince satır
                yüksekliği iki katına çıkıyor ve liste liste olmaktan çıkıyor.
                Bu yüzden notlar kendi bloklarında, kalemin adıyla birlikte:
                hangi tutarı nitelediği kayboluyor değil, yanına yazılıyor. */}
            {items.some((it) => it.note) && (
              <FadeUp delay={0.3}>
                <ul className="svm-pnotes">
                  {items
                    .filter((it) => it.note)
                    .map((it) => (
                      <li key={it.id}>
                        <b>{it.title}:</b> {it.note}
                      </li>
                    ))}
                </ul>
              </FadeUp>
            )}

            <FadeUp delay={0.34}>
              <div className="svm-price-foot">
                <p>{C.price.noTotal}</p>
                {/* Özet satırı tutarın iki niteliğini kapalıyken de basıyor
                    (USD, KDV hariç); tamamı tek tıkla açılıyor. */}
                <details className="svm-more svm-more-dark">
                  <summary>
                    {C.price.termsTitle}
                    <span className="svm-more-x" aria-hidden="true" />
                  </summary>
                  <p>{ACC_PRICE_FOOTNOTE}</p>
                </details>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ================================================ 7 · SSS + KAPANIŞ

            SSS ARTIK ÜLKE SAYFASIYLA AYNI BİLEŞEN. Burada altı <details>
            vardı ve ülke sayfaları CountryFaq kullanıyordu (solda soru
            listesi, sağda açılan tek panel); müşteri iki sayfayı yan yana
            görüp farkı sordu. Aynı işi yapan iki SSS tasarımını yaşatmanın
            gerekçesi yoktu.

            CountryFaq'a DOKUNULMADI: ülke sayfalarında çalışıyor ve props'u
            {items} olarak kalmak zorunda. Uyarlanan taraf veri oldu —
            accountingDubai.ts'teki AccFaq artık countryContent'teki Faq
            tipinin kendisi, yani iki taraf derleme zamanında birbirine bağlı.

            İÇERİK DEĞİŞMEDİ, SUNUM DEĞİŞTİ: altı sorunun altısı da aynı ve
            FAQPage JSON-LD'si hâlâ AYNI listeden üretiliyor (yukarıda). Tek
            fark, cevapların DOM'a nasıl geldiği: bileşen yalnızca seçili
            cevabı basıyor, diğer beşi işaretlemede ve sunucu yükünde duruyor
            (ayrıntı dosya başlığındaki SEO notunda). Ülke sayfalarında zaten
            bu düzen çalışıyor.

            Kapanış iki blok: nereye gidilir (#sonra) ve nasıl başlanır. */}
        <section id={C.faq.id} className="sec-pad svm-tight" style={{ background: "var(--white)" }}>
          <div className="container-o">
            <div className="sec-head">
              <SplitWords
                as="h2"
                text={C.faq.heading}
                accent={C.faq.accent}
                className="h2"
                style={{ color: "var(--text-900)" }}
              />
            </div>

            <CountryFaq items={C.faq.items} />

            {/* SmartLink: kardeş hizmet sayfaları şu an dolaşıma kapalı ve
                sönük çıkıyorlar. Ölü tıklama olmuyor, yol haritası görünür
                kalıyor; sayfalar açıldığında hiçbir şeye dokunmadan
                canlanacaklar (lib/routes.ts). */}
            <FadeUp delay={0.1}>
              <h3 id={C.close.id} className="svm-sub">
                {C.close.title}
              </h3>
            </FadeUp>
            <div className="svm-links svm-blockgap">
              {C.close.links.map((l, i) => (
                <FadeUp key={l.href} delay={0.06 + i * 0.04}>
                  <SmartLink href={l.href} className="svm-link">
                    <b>{l.label}</b>
                    <span>{l.line}</span>
                    <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                  </SmartLink>
                </FadeUp>
              ))}
            </div>

            {/* NASIL BAŞLANIYOR — kapanış artık bir paragraf değil üç adım.
                Ziyaretçinin son sorusu "peki ne yapmam gerekiyor" ve cevabı
                eskiden kutunun içinde tek cümleydi.

                Üçüncü adımda süre yok ve olmayacak: firma kesin süre taahhüdü
                vermiyor (brand.ts · STANCE_LIMITS). */}
            <FadeUp delay={0.1}>
              <h3 className="svm-sub">{C.start.title}</h3>
            </FadeUp>

            {/* .svs-startstep: kutuları birbirine bağlayan iz. Tik ikonu tek
                başına "yapıldı" diyor, "sonra" demiyor — bağ olmadan üç adım
                sıralı bir yol değil, üç paralel özellik gibi okunuyordu. */}
            <div className="svm-start svm-blockgap">
              {C.start.steps.map((s, i) => (
                <FadeUp key={s.title} className="svs-startstep" delay={0.08 + i * 0.05}>
                  <div className="svm-start-s">
                    <span className="svm-start-n" aria-hidden="true">
                      <Check size={14} strokeWidth={2.6} />
                    </span>
                    <b>{s.title}</b>
                    <span>{s.line}</span>
                  </div>
                </FadeUp>
              ))}
            </div>

            <FadeUp delay={0.26}>
              <div className="svm-close">
                <AskCta label={C.start.askLabel} />
              </div>
            </FadeUp>
          </div>
        </section>

        <FinalCta />
      </main>
    </>
  );
}
