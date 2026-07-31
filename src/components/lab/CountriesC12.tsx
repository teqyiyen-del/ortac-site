"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react";
import {
  ArrowRight,
  Briefcase,
  Building2,
  Check,
  ChevronDown,
  Cpu,
  Globe,
  IdCard,
  KeyRound,
  Landmark,
  Laptop,
  MapPin,
  PiggyBank,
  ShoppingBag,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import SmartLink from "@/components/shared/SmartLink";
import { Flag } from "@/components/shared/CountryPicker";
import { BrandGlyph } from "@/components/shared/BrandMark";
import { brandKeyForName, type BrandKey } from "@/lib/brands";
import { COUNTRY_PHOTO } from "@/lib/media";
import { COUNTRY_NAME, FACTS, PAY_MATRIX, type CountrySlug } from "@/lib/brand";

/* ============================================================================
   ADAY C12 — C8'in aynısı, PANELİ DEĞİŞTİRİLMİŞ

   Müşteri iki adayı da beğendi ama ikisinde de aynı şeyi söyledi: "açılır
   pencere açılınca çok fazla yazıyla karşılaşıyoruz — biraz daha icondur bir
   şeylerdir ekle ki daha okunaklı bir yapı olsun, şu an aşırı donuk
   hissettiriyor."

   Bu dosya C8'in birebir kopyası olarak başladı. Kapalı hâlin TEK bir pikseli
   değişmedi: aynı fotoğraflı sütun, aynı bayrak, aynı tek cümle, aynı çevron,
   aynı "Kartla tahsilat" alt şeridi. Değişen yalnızca panelin içi — çünkü
   müşterinin şikâyeti de yalnızca orası. İskeleti beğenilmiş bir bölümü
   iskeletinden tutup sallamak, verilen geri bildirimi yanlış okumak olurdu.

   C8'İN PANELİ NEDEN DONUK

   C8'in paneli üç satırlık bir etiket-değer ızgarasıydı: "Uygun / Yapı /
   Kısıt". Teknik olarak kısa (üç satır), ama gözle bakıldığında üç gri metin
   bloğu. Tek görsel işaret amber üçgendi. Sorun metnin MİKTARI değil, metnin
   YALNIZ olması: 45 karakterlik bir cümle, yanında hiçbir işaret yokken de 45
   karakter okunuyor. Ekranda ayırt edilecek nesne olmayınca göz baştan sona
   okumak zorunda kalıyor — "donuk" dedikleri şey bu.

   C12'NİN CEVABI: METNİ KISALTMAK DEĞİL, METNİ NESNEYE ÇEVİRMEK

   Panelin taşıdığı bilgi neredeyse aynı kaldı; taşıma biçimi değişti. Üç
   nesne türü var ve her biri farklı bir tonda, yani ne olduğu renginden
   anlaşılıyor:

     · MAVİ KARO  → ülkenin bir özelliği (kim için uygun)
     · GRİ KARO   → sınıflandırma, iddia değil (hukuki yapı)
     · BEYAZ PLAKA → gerçek marka işareti (banka ve ödeme kanalları)

   Aynı geometri (26 piksel, aynı köşe yarıçapı), üç ton. Ziyaretçi bir
   satırın ne söylediğini okumadan önce ne TÜRDE bir şey söylediğini biliyor.
   (Bu turdan önce dördüncü bir ton daha vardı — dürüst kısıtın amber karosu.
   Aşağıda 4. madde neden gittiğini anlatıyor.)

   SATIR SATIR: NE KALDI, NE GİRDİ, NE ÇIKTI

   1) "Uygun" (FACTS[c].forWhom) — C8'de tek bir düz cümleydi
      ("E-ticaret, teknoloji, danışmanlık, oturum isteyen"). Artık virgülünden
      bölünüp her kalem KENDİ İKONUYLA ayrı bir satır. Kelime sayısı aynı, ama
      dört ayrı nesne dört ayrı işaretle geliyor: e-ticaret bir alışveriş
      çantası, teknoloji bir çip, oturum isteyen bir kimlik kartı. İkon burada
      süs değil; ziyaretçi kendi işini metni okumadan, sembolden tanıyor.
      İkonlar anahtar kelimeye göre eşleşiyor (fitIcon), tek tek ülkeye
      yazılmıyor — brand.ts'teki metin değişirse eşleşme kendiliğinden
      çalışıyor, eşleşmezse "hedef kitle" anlamına gelen Users ikonuna
      düşüyor. Soyut madde imi hiçbir durumda çıkmıyor.

   2) "Yapı" (FACTS[c].structure) — aynı cümle, ama artık gri karolu kendi
      satırı. Gri olmasının sebebi: bu bir fayda değil, bir sınıflandırma.
      Mavi olsaydı yukarıdaki dört kalemin beşincisi gibi okunurdu.

   3) YENİ: "Banka" ve "Ödeme kuruluşu" — panelin görsel merkezi. C8'de
      panelde hiç kanal bilgisi yoktu (yalnızca alt şeritte iki ad, düz metin).
      Burada PAY_MATRIX'in iki grubu gerçek marka işaretleriyle geliyor:
      BrandGlyph, beyaz plakanın içinde. Neden bu iki grup ve neden tahsilat
      değil: tahsilat zaten alt şeritte duruyor ve o şerit kapalı sütunda da
      görünüyor — panelde ikinci kez basmak tekrar olurdu.

      Bu blok aynı zamanda sitenin en sık tekrarladığı uyarıyı CÜMLE
      KURMADAN söylüyor. Canlı bölümde altta bir dipnot vardı: "Ödeme kuruluşu
      hesabı, banka hesabı değildir." Burada Wise ve Payoneer, Wio ve
      Mashreq'in ALTINDA ve BAŞKA BİR BAŞLIK ile duruyor. İki başlık, iki
      grup — ayrım görsel, dipnot gerekmiyor.

      Çalışmayan kanal gizlenmiyor: KKTC'de Wise ve Payoneer plakası duruyor
      ama gri, yanında kırmızı çarpı ve ekran okuyucu için "çalışmıyor". Boş
      bir hücre "bilmiyoruz" demek; gri bir logo "denendi, olmuyor" demek.
      "none" hücreleri (o ülkede hiç sunulmayan kanallar) ise basılmıyor —
      İngiltere'de gri bir Wio logosu, reddedilmiş gibi okunurdu.

   4) Dürüst kısıt (FACTS[c].limit) — BU TURDA BÖLÜMDEN ÇIKTI.
      Panelin en altında amber karolu bir kapanış satırıydı; artık yok.
      Gerekçe müşterinin kendi cümlesi: "ülkelerin hepsine dürüst kısıt
      yazmışsın, aşırı dikkat çekiyor." Haklı olduğu nokta şu — üç sütunun
      üçünde de aynı yerde, aynı biçimde, aynı renkte duran bir uyarı, uyarı
      olmaktan çıkıp desen oluyor. Göz üçüncüsünde artık okumuyor, "burada
      hep bir çekince var" diye kodluyor. Bölüm bir menü; menüde her satırın
      altına bir çekince asmak dürüstlük değil, gürültü.

      SİLİNMEDİ — YALNIZCA BURADAN ÇIKTI. Cümle tek kaynaktan basılmaya devam
      ediyor ve sitede üç yerde okunuyor:

        src/lib/brand.ts               → FACTS[c].limit — KAYNAK, silinmedi ve
                                         silinmeyecek
        src/components/shared/PageHero.tsx:431
                                       → { icon: Info, line: FACTS[country].limit }
                                         /dubai, /ingiltere, /kktc hero'sundaki
                                         güven satırlarından biri, tam bu cümle
        src/lib/sectors.ts:247/290/330 → sektör sayfalarının ülke bloklarında,
                                         cümlenin devamıyla birlikte

      Yani ziyaretçi kısıtı kaybetmiyor: o ülkeye karar vermeye başladığı ilk
      ekranda, üstünkörü bir menüde değil ilgilendiği yerde görüyor.
      brand.ts'teki alanın bu bölümde kullanılmıyor olması onu ölü alan
      yapmıyor — üç ayrı tüketicisi var.

      Amber ton da kısıtla birlikte gitti. Panelde artık üç ton var; CSS'teki
      .c12-ic-warn kuralı da kaldırıldı. Kullanılmayan bir ton dosyada
      bırakılsaydı bir sonraki turda "boşta duruyor, bir yere koyalım" diye
      geri gelirdi ve ton sistemi anlamını yitirirdi.

   5) Kapı bağlantısı — duruyor. Kısıt gidince kapanış satırında yalnız kaldı;
      sağ uçta, ince bir çizginin altında. Kendi başına bir satır olması
      sorun değil çünkü o satır zaten vardı (kısıtla paylaşıyordu) ve panelin
      boyunu uzatmıyor.

   NE ÇIKTI: C8'in panelinde olup burada olmayan tek yapı, etiket-değer
   ızgarasının kendisi. Bilgi olarak çıkan tek şey dürüst kısıt — o da
   silinerek değil, ait olduğu yere bırakılarak.

   DÜZEN: PANEL AÇILINCA İKİ KOLONA GİRİYOR

   C8 açık sütunun genişliğini kullanmıyordu — 620 piksellik bir sütunda tek
   sıra hâlinde üç satır vardı, sağ yarısı boştu. Burada gövde iki kolon:
   solda şirket (kim için + yapı), sağda para (banka + ödeme). Bu, eklenen
   nesnelere rağmen panelin boyunu tek kolona göre yaklaşık 130 piksel kısa
   tutuyor. Dar ekranda tek kolona iniyor.

   Açık sütunun flex-grow'u 2.2'den 2.5'e çıktı (canlıdaki değer). C8'de 2.2
   yeterliydi çünkü gövde üç satırdı; iki kolonlu bir gövde biraz daha nefes
   istiyor ve 2.5 hâlâ diğer iki sütunu ekranda tutuyor.

   HAREKET: KADEMELİ AMA ÖLÇÜLÜ

   C8'de panel tek parça hâlinde beliriyordu — bir blok gelip oturuyor,
   bitiyor. "Donuk" hissinin ikinci kaynağı buydu. Burada panel üç adımda
   kuruluyor (kim için → yapı → kanallar), her adım 7 piksel aşağıdan, 50 ms
   arayla; kim için kalemleri kendi içinde 40 ms arayla. useReducedMotion
   açıkken hem gecikme hem kayma sıfırlanıyor: aynı düzen, animasyonsuz, tek
   karede.

   ============================================================================
   DÜZELTME — AÇILIŞ / KAPANIŞ ANİMASYONU (bu turun asıl işi)

   Müşteri: "bir ülkeye tıklayınca açılıp kapanırken falan biraz bozulmalar
   oluyor, çok düzgün değil gibi, animasyonda bi sıkıntı var."

   Sorun süre değildi, o yüzden hiçbir süre körlemesine değiştirilmedi. Bölüm
   tarayıcıda kare kare ölçüldü (1440 px viewport, ray 1136 px) ve beş ayrı
   kusur çıktı. Sırayla:

   TEŞHİS 1 — RAYIN BOYUNU KİMSE ANİME ETMİYORDU.
     Kapalı ray 356 px, Dubai açıkken 514 px. Ama tıklamadan sonraki İLK
     KAREDE ray 548 px oluyordu: 192 piksel, tek karede, hiçbir geçiş yok.
     Sebep tek cümleyle şu — panelin ENİ CSS'te animeliydi (flex-grow 480 ms),
     ZEMİNİ CSS'te animeliydi (420 ms), gövdenin OPAKLIĞI motion'da animeliydi
     (340 ms); BOY hiçbir yerde animeli değildi. Ray boyu "en uzun sütunun
     içeriği kadar" hesaplanıyor, içerik de tek karede DOM'a giriyor. Sonuç:
     bölümün altındaki her şey bir karede 192 px aşağı kayıyordu. Görülen
     "bozulma"nın büyük kısmı buydu.

   TEŞHİS 2 — GÖVDE, SÜTUN HÂLÂ DARKEN ÖLÇÜLÜYORDU.
     Gövde t=0'da DOM'a giriyor ama sütun o anda daha 377 px (üçte bir);
     nihai 629 px'e 480 ms'de varıyor. Dar sütunda metin daha çok sarıyor:
     gövde 328 px olarak doğup 277 px'e iniyor. Yani ray önce 548'e fırlıyor,
     sonra 514'e geri düşüyor — 34 piksellik bir salınım, üstelik metin tam
     opaklıkta gözün önünde yeniden dizilirken. O salınımın 47 pikseli tek bir
     öğeden geliyordu: dürüst kısıt satırı (46ch'lik cümle, dar sütunda üç
     satıra sarıyordu). Yukarıdaki 4. madde onu zaten kaldırdı; müşterinin iki
     ayrı isteği burada birbirini besledi.

   TEŞHİS 3 — mode="popLayout" KAPANIŞTA ALT ŞERİDİ FIRLATIYORDU.
     popLayout, çıkan öğeyi ilk karede position:absolute yapar; amacı
     "kardeşler yeni düzene hemen otursun"dur. Buradaki kardeş, margin-top:auto
     ile sütunun dibine yapışan .c12-foot. Ölçüm: şerit tek karede 162 px
     yukarı zıplıyor, 277 px'lik gövde ise hâlâ tam opak, artık kısalmış
     sütunun üzerinde asılı kalıyor ve overflow:clip onu şeridin hizasından
     kesiyor. 180 ms boyunca ekranda üst üste binmiş iki katman vardı.

   TEŞHİS 4 — İÇERİK GİTTİKTEN SONRA PANEL 300 ms DAHA KAPANIYORDU.
     Çıkış animasyonu 180 ms, flex-grow geçişi 480 ms. Gövde 180 ms'de yok
     oluyor, boş beyaz sütun 300 ms daha daralmaya devam ediyordu. Tıklamanın
     "bitmemesi" hissi buradan geliyor.

   TEŞHİS 5 — HER ÜLKENİN AÇIK BOYU FARKLIYDI.
     514 / 482 / 450 px. Dubai açıkken KKTC'ye tıklamak, bölüm hiç kapanmadan
     rayı 64 px kısaltıyordu — üstelik Teşhis 3 yüzünden iki panel aynı anda
     hareket ederken.

   ÇÖZÜM — TEK SAAT, ÖNCEDEN İLAN EDİLMİŞ GEOMETRİ

   Kural şu: düzeni taşıyan hiçbir ölçü çalışma anında "keşfedilmiyor". Hepsi
   baştan yazılı ve hepsi aynı saatte hareket ediyor — 420 ms, --ease-out-soft.

     a) Rayın boyu artık bir CSS değeri, içeriğin sonucu değil: kapalı 356 px,
        açık --c12-open-h. Ray bir data-open taşıyor ve min-height geçişli.
        192 pikselik sıçrama böylece tamamen kalktı (Teşhis 1).
        Sayı üç ülke için ORTAK ve en uzun olana (Dubai) göre ölçüldü. Bunun
        bedeli KKTC açıkken biraz fazla boşluk; kazancı, Dubai'den KKTC'ye
        geçerken rayın HİÇ kıpırdamaması (Teşhis 5). Fazla boşluk gövdeyle alt
        şerit arasına gidiyor, çünkü üç şerit zaten margin-top:auto ile aynı
        hizada duruyor ve o hiza korunuyor — yani boşluk göze bir hizasızlık
        olarak değil, nefes olarak görünüyor.
        min-height, height değil: hesap bir gün tutmazsa (yazı tipi yedeği,
        tarayıcı yakınlaştırması, metnin uzaması) ray içeriği kesmek yerine
        uzuyor. Bozulsa bile okunur bozuluyor.

     b) Gövdenin boyu da animeli, ama ÖLÇÜMLE DEĞİL. Sarmalayıcı .c12-sleeve
        bir grid ve tek satırı 0fr'den 1fr'ye gidiyor. Bunun klasik
        height:auto animasyonuna göre tek ama belirleyici üstünlüğü şu:
        height:auto, hedefi mount anında ÖLÇER — o an sütun hâlâ dar, yani
        yanlış bir hedefe animasyon yapar ve sonunda gerçek boya zıplar. Bu,
        Teşhis 2'nin motion tarafında yeniden üretilmiş hâli olurdu. 0fr→1fr
        ise oransal: sütun genişledikçe hedef kendiliğinden güncelleniyor,
        ölçüm yok, zıplama yok.
        Ray boyu ile gövde boyu aynı eğri ve aynı süreyle gittiği için içerik
        hiçbir anda rayın ilan ettiği boyu aşmıyor. Kaba hesap: ray 356+156p,
        içerik (başlık + gövde + şerit) 215+271p; p'nin her değerinde içerik
        altta kalıyor, yani min-height hep bağlayıcı, ray hep pürüzsüz.
        Dar ekranda (ray dikey yığılıyken) min-height devrede değil; orada
        akordeonun tamamını bu 0fr→1fr taşıyor. Tek mekanizma, iki düzen.

     c) mode="popLayout" kaldırıldı. Çıkan gövde akışta kalıyor ve yerini
        boyunu 0fr'ye çekerek bırakıyor; alt şerit fırlamak yerine rayla
        birlikte düzgün yükseliyor (Teşhis 3).

     d) Kapanış artık açılışla aynı süreyi tutuyor: opaklık 150 ms'de siliniyor,
        gövde 260 ms'de kapanıyor, geometri 420 ms'de bitiyor. Boş sütunun tek
        başına daraldığı kuyruk kalmadı (Teşhis 4). flex-grow de 480'den
        420'ye çekildi — tek saat olsun diye, "daha hızlı olsun" diye değil.

     e) İçerik, geometri büyük ölçüde oturduktan SONRA geliyor: kalemlerin
        kademesi 180 ms gecikmeyle başlıyor. Ölçülen genişlik eğrisine göre o
        anda sütun nihai eninin ~%82'sini almış oluyor; kalan 47 pikselde metin
        artık yeniden dizilmiyor. Yani yeniden dizilme büsbütün yok olmadı,
        görünmez opaklıkta oluyor — ki zaten kısıt satırı gidince toplam
        yeniden dizilme 51 pikselden 10 piksele düşmüştü.

     f) Sadece DÜZENİ taşıyanlar tek saatte: rayın boyu, sütunun eni, gövdenin
        boyu, başlıktaki punto büyümesi. Renk geçişleri ve çevronun dönmesi
        kendi (daha kısa) hızlarında kaldı — onlar düzeni kıpırdatmıyor,
        aynı saate bağlanınca ağır hissettiriyorlardı.

   useReducedMotion açıkken: motion tarafında süreler ve kaymalar sıfır,
   0fr→1fr tek karede oluyor; CSS tarafında .c12-rail ve .c12-panel geçişleri
   kapalı, yani ray da tek karede yeni boyuna geçiyor. Aynı düzen, hareketsiz.

   ÖNCE / SONRA (1440 px viewport, ray 1136 px, tarayıcıda ölçüldü)

     kapalı ray                    356 → 356   (değişmedi, kapalı hâl korundu)
     Dubai açık                    514 → 528
     İngiltere açık                482 → 528
     KKTC açık                     450 → 528
     açılışta ilk kare sıçraması   192 px → 0
     açılışta salınım (aşma)        34 px → 0
     kapanışta şeridin zıplaması   162 px → 0
     ülke değiştirirken ray oynar  64 px → 0
     açılış / kapanış süresi       ~480 / ~480 ms → 420 / 420 ms

   Üç ülkenin de 528'e çıkması, ortak boy kararının doğrudan sonucu; açık
   panel eskisine göre 14-78 px daha yüksek duruyor. En dar masaüstünde
   (960 px) gerçek ihtiyaç 521 px'e kadar çıktığı için sayı oradan seçildi,
   ayrıntısı lab-c12.css'te --c12-open-h'in yanında.

   ============================================================================
   SIRA — İNGİLTERE · DUBAI · KKTC

   Müşteri: "bide dubai ortada olsun, kıbrıs sağa geçsin."

   COUNTRY_ORDER (brand.ts) dubai · ingiltere · kktc olarak DURUYOR ve öyle
   kalmalı: orası sitenin geneli için tek kaynak, bir bölümün yerleşim tercihi
   için değiştirilecek yer değil. Bu ray kendi sırasını yerelde tutuyor
   (RAIL_ORDER) — değişen yalnızca bu bölümün dizilişi.

   Sıra artık coğrafi değil; aslına bakılırsa hiç coğrafi değildi, fiyat
   sırasıydı. Yeni gerekçe yerleşimin kendisi: üç bölmeli bir rayda ORTADAKİ
   bölme bakışın ilk düştüğü yer — iki yandan eşit uzaklıkta ve açıldığında
   iki komşusunu birden yanına alarak ekranın merkezinde kalıyor; kenardaki
   bir bölme açıldığında ise ağırlık bir yana kayıyor. Dubai bölümün önde
   tuttuğu teklif (tek başına oturum argümanı olan ülke, üstelik ülke sayfası
   şu an dolaşıma açık olan tek ülke), o yüzden merkez ona ait.
   İngiltere sola: en ucuz ve baştan sona uzaktan yürüyen seçenek, soldan sağa
   okuyan göz için doğru giriş. KKTC sağa: yakınlık argümanı bölümün kapanışı,
   ve müşterinin istediği yer de burası.

   DEĞİŞMEYENLER: başlık, giriş cümlesi, bölüm zemini, kapalı sütunun görünümü,
   alt şerit, hepsinin kapalı başlaması. Ve C8'in devraldığı borç duruyor: bu
   bölüm #odeme-altyapisi çapasını taşımıyor, kazanan aday canlıya taşınırken
   o çapaya yeni bir ev bulmak gerekiyor (routes.ts onu canlı sayıyor).
   ========================================================================= */

/* İçerik hareketlerinin eğrisi (opaklık, 7 pikselik kayma). Düzeni
   kıpırdatmıyorlar, o yüzden kendi eğrileri olabilir. */
const EASE = [0.22, 1, 0.36, 1] as const;

/* DÜZENİN eğrisi ve süresi. Bu ikisi CSS'te de birebir yazılı
   (--ease-out-soft = cubic-bezier(0.33, 1, 0.68, 1), 420ms): sütunun eni ve
   rayın boyu CSS geçişiyle, gövdenin boyu motion ile taşınıyor. Aynı sayının
   iki dosyada durması hoş değil ama alternatifi yok — CSS bir JS sabitini
   okuyamıyor. Biri değişirse diğeri de değişmeli, yoksa panel ile içindeki
   gövde farklı hızlarda büyür ve Teşhis 2'nin bir benzeri geri gelir. */
const EASE_SOFT = [0.33, 1, 0.68, 1] as const;
const GEO = 0.42;

/* Bu bölümün kendi sırası. brand.ts'teki COUNTRY_ORDER'a dokunulmadı; oradaki
   sıra sitenin geri kalanının sırası. Gerekçe dosya başındaki SIRA bölümünde:
   üç bölmeli rayda orta bölme bakışın düştüğü yer, Dubai orada duruyor. */
const RAIL_ORDER: CountrySlug[] = ["ingiltere", "dubai", "kktc"];

/* Ülke başına TEK metin, iki durumda da aynı yerde. C8'den aynen alındı —
   kapalı hâl değişmiyor. */
const LINE: Record<CountrySlug, { a: string; hot: string; b: string }> = {
  dubai: { a: "Oturum vizesi ", hot: "çıkabilen tek ülke", b: "." },
  ingiltere: { a: "Baştan sona ", hot: "uzaktan kuruluş", b: "." },
  kktc: { a: "", hot: "Türkiye'ye en yakın", b: " seçenek." },
};

/* Alt şeridin kıyas ekseni — C8'den aynen. */
const CARD_ROWS =
  PAY_MATRIX.find((g) => g.title === "Tahsilat")?.rows.filter(
    (r) => r.name === "Stripe" || r.name === "PayPal",
  ) ?? [];

function cardsOf(c: CountrySlug) {
  return CARD_ROWS.map((r) => ({ name: r.name, on: r.cells[c] === "yes" }));
}

/* ---------------------------------------------------- "Uygun" ikonları ---- */
/* Eşleşme anahtar kelimeyle yapılıyor, ülkeye göre elle yazılmıyor. Sebebi
   bakım: FACTS[c].forWhom tek kaynak ve bir gün "gayrimenkul SPV" yerine
   "gayrimenkul yatırımı" yazılırsa liste sessizce ikonsuz kalmasın. Sıra
   önemli — ilk eşleşen kazanıyor, o yüzden dar anlamlı kelimeler üstte.

   Fallback bilerek bir madde imi ya da nokta değil: Users, yani "hedef
   kitle". Eşleşmeyen bir kalem de bir kitleyi tarif ediyor; soyut bir işaret
   basmak, ikon eklemenin amacını boşa çıkarırdı. */
const FIT_ICONS: { k: string; i: LucideIcon }[] = [
  { k: "ticaret", i: ShoppingBag },
  { k: "teknoloji", i: Cpu },
  { k: "danış", i: Briefcase },
  { k: "oturum", i: IdCard },
  { k: "freelance", i: Laptop },
  { k: "gayrimenkul", i: KeyRound },
  { k: "pazar", i: Globe },
  { k: "yakın", i: MapPin },
  { k: "maliyet", i: PiggyBank },
];

function fitIcon(t: string): LucideIcon {
  const s = t.toLocaleLowerCase("tr-TR");
  return FIT_ICONS.find((f) => s.includes(f.k))?.i ?? Users;
}

/* forWhom cümlenin ortasından geliyor, yani kalemlerin ilki hariç hepsi küçük
   harfle başlıyor. Ayrı satır olunca her biri kendi başına bir ifade; Türkçe
   büyütme locale istiyor (i → İ). */
function cap(s: string) {
  return s.charAt(0).toLocaleUpperCase("tr-TR") + s.slice(1);
}

/* ------------------------------------------------------ kanal okuması ----- */
type Chan = { name: string; key: BrandKey | null; on: boolean };

/* Bir gruptaki, o ülkede ANLAMLI olan kanallar. "none" elenıyor: o hücre
   "bu ülkede sunmuyoruz" demek, "denendi olmadı" demek değil — gri bir plaka
   olarak basılsa ikincisi gibi okunurdu. Kalanlar "yes" ve "no": ikisi de
   ekranda duruyor, biri renkli biri gri. */
function chansOf(title: string, c: CountrySlug): Chan[] {
  return (PAY_MATRIX.find((g) => g.title === title)?.rows ?? [])
    .filter((r) => r.cells[c] !== "none")
    .map((r) => ({
      name: r.name,
      key: brandKeyForName(r.name),
      on: r.cells[c] === "yes",
    }));
}

/* ------------------------------------------------------------ hareket ----- */
/* Variants dışarıda değil bir fabrikada, çünkü mesafe ve süre reduce'a bağlı.
   reduce açıkken "hidden" ile "show" aynı hedefi taşıyor ve süre sıfır — yani
   AnimatePresence ve kademe yapısı yerinde kalıyor, hareket kalmıyor. */
function stepV(reduce: boolean): Variants {
  return {
    hidden: { opacity: 0, y: reduce ? 0 : 7 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.34, ease: EASE } },
  };
}

/* Yalnızca sıralama taşıyan kap: kendi görünümünü değiştirmiyor, çocuklarını
   sırayla salıyor. Gecikme de burada, ayrı bir transition prop'unda değil —
   varyantın kendi transition'ı prop'takini geçersiz kılıyor, ikiye bölünürse
   delayChildren sessizce düşer. */
function groupV(reduce: boolean, stagger: number, delay = 0): Variants {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : stagger,
        delayChildren: reduce ? 0 : delay,
      },
    },
  };
}

/* Gövdeyi saran grid'in varyantları — panelin BOYUNU taşıyan şey bu.
   grid-template-rows 0fr → 1fr, çünkü bu oransal bir hedef: sütun genişlerken
   içeriğin gerçek boyu değişse bile animasyon yanlış bir sayıya doğru gitmiyor.
   height:auto animasyonu bunu yapamaz, hedefini mount anında ölçer.

   Giriş: yalnızca boy açılıyor, opaklık 1'de duruyor — kalemlerin görünürlüğü
   kendi kademelerinde. Çıkış: opaklık önce ve hızlı siliniyor (150 ms), boy
   arkadan kapanıyor (260 ms). Sıra bilinçli — gövdenin kapanışı kimse
   izlemesin, yalnızca yerini bıraksın. Unmount 260 ms'de oluyor ve ray o anda
   hâlâ içeriğin üstünde bir min-height taşıyor, yani bir sıçrama penceresi
   açılmıyor. */
function sleeveV(reduce: boolean): Variants {
  return {
    hidden: { opacity: 1, gridTemplateRows: "0fr" },
    show: {
      opacity: 1,
      gridTemplateRows: "1fr",
      transition: { duration: reduce ? 0 : GEO, ease: EASE_SOFT },
    },
    out: {
      opacity: 0,
      gridTemplateRows: "0fr",
      transition: {
        opacity: { duration: reduce ? 0 : 0.15, ease: EASE },
        gridTemplateRows: { duration: reduce ? 0 : 0.26, ease: EASE_SOFT },
      },
    },
  };
}

export default function CountriesC12() {
  /* null gerçek bir durum: açık sütun kendi fotoğrafına geri kapanıyor. */
  const [open, setOpen] = useState<CountrySlug | null>(null);
  const reduce = useReducedMotion() ?? false;

  const toggle = (c: CountrySlug) => setOpen((prev) => (prev === c ? null : c));
  /* Fotoğrafın sönmesi de düzenin saatinde: sütun genişlerken zemin ondan
     bağımsız bir hızda değişirse iki ayrı hareket gibi okunuyor. */
  const dur = reduce ? 0 : GEO;
  const step = stepV(reduce);

  return (
    <section className="sec-pad" style={{ background: "var(--paper)" }}>
      <div className="container-o">
        <div className="sec-head">
          <SplitWords
            as="h2"
            text="Hizmet verdiğimiz bölgeler."
            accent="bölgeler."
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.2}>
            <p className="sec-lead">
              Üç ülkede kuruluş, banka ve muhasebe. Ayrıntı için ülkeyi açın.
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.16} className="c12-view">
          {/* data-open rayın BOYUNU açıyor. Hangi ülkenin açık olduğu değil,
              bir şeyin açık olup olmadığı önemli: üç ülkenin açık boyu ortak
              olduğu için ülke değiştirmek rayı hiç kıpırdatmıyor. */}
          <div className="c12-rail" data-open={open !== null}>
            {RAIL_ORDER.map((c) => {
              const on = open === c;
              const banks = chansOf("Banka hesabı", c);
              const psps = chansOf("Ödeme kuruluşu", c);

              return (
                <article key={c} className="c12-panel" data-on={on}>
                  {/* Kapalı sütunun zemini — C8 ile birebir aynı. */}
                  <motion.span
                    className="c12-media"
                    aria-hidden="true"
                    initial={false}
                    animate={{ opacity: on ? 0 : 1, scale: on && !reduce ? 1.05 : 1 }}
                    transition={{ duration: dur, ease: EASE }}
                  >
                    <span
                      className="c12-photo"
                      style={{ backgroundImage: `url(${COUNTRY_PHOTO[c]})` }}
                    />
                    <span className="c12-scrim" />
                  </motion.span>

                  <button
                    type="button"
                    className="c12-head"
                    aria-expanded={on}
                    aria-controls={on ? `c12-body-${c}` : undefined}
                    onClick={() => toggle(c)}
                  >
                    <span className="c12-flag" aria-hidden="true">
                      <Flag country={c} />
                    </span>
                    <span className="c12-id">
                      <span className="c12-name">{COUNTRY_NAME[c]}</span>
                      <span className="c12-line">
                        {LINE[c].a}
                        <b>{LINE[c].hot}</b>
                        {LINE[c].b}
                      </span>
                    </span>
                    <span className="c12-chev" aria-hidden="true">
                      <ChevronDown size={18} strokeWidth={2.2} />
                    </span>
                  </button>

                  {/* mode="popLayout" YOK — bilerek. Çıkan gövdeyi ilk karede
                      akıştan koparıyor, alt şerit de 162 px yukarı fırlıyordu
                      (dosya başı, Teşhis 3). Varsayılan "sync" ile gövde akışta
                      kalıyor ve yerini boyunu kapatarak bırakıyor. */}
                  <AnimatePresence initial={false}>
                    {on && (
                      /* İki katman, iki iş:
                         · .c12-sleeve → BOY. Grid satırı 0fr↔1fr; panelin
                           yüksekliğini taşıyan tek şey bu.
                         · .c12-body   → SIRALAMA. Kendi görünümü yok, yalnızca
                           çocuklarını kademeli salıyor.
                         Ayrı olmalarının sebebi: 0fr numarası kapsayıcının
                         grid, çocuğun overflow:hidden olmasını istiyor;
                         gövdenin dolgusu da o çocuğun içinde kalmalı, yoksa
                         kapanırken dolgu kadar bir kalıntı yükseklik kalır. */
                      <motion.div
                        key="body"
                        className="c12-sleeve"
                        variants={sleeveV(reduce)}
                        initial="hidden"
                        animate="show"
                        exit="out"
                      >
                        <motion.div
                          id={`c12-body-${c}`}
                          className="c12-body"
                          role="group"
                          aria-label={`${COUNTRY_NAME[c]} özeti`}
                          /* 180 ms gecikme: sütun o anda nihai eninin ~%82'sini
                             almış oluyor, kalan yeniden dizilme görünmez
                             opaklıkta kalıyor. Çıkışta "out" varyantı yok —
                             kalemler kendi başlarına sönmüyor, sarmalayıcı tek
                             parça hâlinde siliyor. Kapanış bir gösteri değil. */
                          variants={groupV(reduce, 0.05, 0.18)}
                        >
                          <div className="c12-cols">
                            {/* ---- sol kolon: şirket ---- */}
                            <div className="c12-col">
                              <motion.div className="c12-blk" variants={step}>
                                <span className="c12-k">Uygun</span>
                                {/* Kalemler kendi içinde de kademeli: dört satır
                                    aynı anda gelirse blok yine "tek nesne" gibi
                                    düşüyor, sırayla gelince liste olduğu
                                    anlaşılıyor. */}
                                <motion.ul
                                  className="c12-list"
                                  variants={groupV(reduce, 0.04)}
                                >
                                  {FACTS[c].forWhom.split(", ").map((t) => {
                                    const Icon = fitIcon(t);
                                    return (
                                      <motion.li
                                        key={t}
                                        className="c12-item"
                                        variants={step}
                                      >
                                        <span className="c12-ic" aria-hidden="true">
                                          <Icon size={14} strokeWidth={2} />
                                        </span>
                                        {cap(t)}
                                      </motion.li>
                                    );
                                  })}
                                </motion.ul>
                              </motion.div>

                              <motion.div className="c12-blk" variants={step}>
                                <span className="c12-k">Yapı</span>
                                <ul className="c12-list">
                                  <li className="c12-item">
                                    <span
                                      className="c12-ic c12-ic-flat"
                                      aria-hidden="true"
                                    >
                                      <Building2 size={14} strokeWidth={2} />
                                    </span>
                                    {FACTS[c].structure}
                                  </li>
                                </ul>
                              </motion.div>
                            </div>

                            {/* ---- sağ kolon: para ----
                                İki grup alt alta ve ayrı başlıklı. Bu sıralama
                                tek başına "ödeme kuruluşu banka değildir"
                                cümlesinin işini görüyor; o cümlenin tam hâli
                                banka sayfalarında duruyor. */}
                            <div className="c12-col">
                              <motion.div className="c12-blk" variants={step}>
                                <span className="c12-k">Banka</span>
                                <ul className="c12-list">
                                  {banks.map((b) => (
                                    <ChanItem key={b.name} chan={b} />
                                  ))}
                                </ul>
                              </motion.div>

                              <motion.div className="c12-blk" variants={step}>
                                <span className="c12-k">Ödeme kuruluşu</span>
                                <ul className="c12-list">
                                  {psps.map((b) => (
                                    <ChanItem key={b.name} chan={b} />
                                  ))}
                                </ul>
                              </motion.div>
                            </div>
                          </div>

                          {/* Kapanış satırı. Eskiden burada solda dürüst kısıt,
                              sağda kapı vardı; kısıt bu turda bölümden çıktı
                              (dosya başı, 4. madde) ve kapı satırda yalnız
                              kaldı. Satırın kendisi duruyor çünkü işi kısıtı
                              taşımak değildi: ince çizgi "panel bitti" diyor,
                              kapı da devamının nerede olduğunu. Sağa yaslı,
                              çünkü göz bir bölmeden sağ alt köşeden çıkıyor. */}
                          <motion.div className="c12-close" variants={step}>
                            <SmartLink href={`/${c}`} className="c12-door">
                              {COUNTRY_NAME[c]} sayfası
                              <ArrowRight
                                size={15}
                                strokeWidth={2.1}
                                aria-hidden="true"
                              />
                            </SmartLink>
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Kıyas şeridi — C8 ile birebir aynı, iki durumda da
                      görünür, sütunun dibine yapışık. */}
                  <div className="c12-foot">
                    <span className="c12-foot-k">Kartla tahsilat</span>
                    <ul>
                      {cardsOf(c).map((k) => (
                        <li key={k.name} data-v={k.on ? "yes" : "no"}>
                          {k.on ? (
                            <Check size={14} strokeWidth={2.4} aria-hidden="true" />
                          ) : (
                            <X size={14} strokeWidth={2.4} aria-hidden="true" />
                          )}
                          {k.name}
                          <span className="sr-only">
                            {k.on ? " çalışıyor" : " çalışmıyor"}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* Tek kanal satırı. Marka işareti beyaz plakanın içinde: BrandMark'ın kendi
   notu da bunu söylüyor — PayPal'ın laciverti ve Stripe'ın moru renkli bir
   zeminde kayboluyor, gerçek ödeme rozetleri hep beyaz plaka üstünde durur.
   Resmî vektörü olmayan kanal ("Yerel banka") uydurma logo yerine bir sicil
   binası ikonu alıyor; Wio ve Mashreq'inki ise BrandGlyph'in kendi monogram
   yedeği (SWAP:BRAND_ASSET), yani resmî SVG geldiğinde burası değişmiyor. */
function ChanItem({ chan }: { chan: Chan }) {
  return (
    <li className="c12-item c12-chan" data-v={chan.on ? "yes" : "no"}>
      <span className="c12-plate" aria-hidden="true">
        {chan.key ? (
          <BrandGlyph brand={chan.key} size={16} />
        ) : (
          <Landmark size={15} strokeWidth={2} />
        )}
      </span>
      <span className="c12-chan-n">{chan.name}</span>
      {/* Çalışmayan kanal gizlenmiyor, işaretleniyor: gri logo + çarpı. Renk
          tek başına taşımasın diye durum ekran okuyucuya da yazılıyor. */}
      {!chan.on && <X size={13} strokeWidth={2.6} className="c12-off" aria-hidden="true" />}
      <span className="sr-only">{chan.on ? " çalışıyor" : " çalışmıyor"}</span>
    </li>
  );
}
