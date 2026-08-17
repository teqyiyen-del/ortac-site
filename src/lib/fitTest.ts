import { AFTER_SETUP } from "@/lib/afterSetup";
import { FACTS } from "@/lib/brand";
import { COUNTRY_CONTENT } from "@/lib/countryContent";
/* pricing.ts SALT OKUNUR (depo kuralı 1). Buradan yalnızca okuyoruz: dördüncü
   perdenin eşikleri o dosyadaki yıllık kalemlerden türüyor ve rakamı ikinci kez
   yazmak, fiyat teyidi geldiğinde testin sessizce eskimesi demekti. */
import { PRICING } from "@/lib/pricing";
import type { Country } from "@/lib/store";

/* ============================================================================
   UYGUNLUK TESTİ — SORULAR VE PUANLAMA
   Bileşen: src/components/FitTest.tsx · CSS: src/app/css/fittest.css (.ft-)

   ---------------------------------------------------------------------------
   NEDEN BU DOSYA VAR

   Sorular ve ağırlıklar bileşenin içinde, JSX'in üstünde duruyordu. Orada
   gözden geçirilemiyorlardı: ağırlığı okumak için React bilmek, hangi ülkenin
   neden öne çıktığını anlamak için ayrı ayrı dizileri kafada toplamak
   gerekiyordu. Ağırlık bir uygulama detayı değil, testin verdiği CEVABIN
   kendisi — o yüzden artık tek bir dosyada, her satırın yanında NEDEN öyle
   olduğu yazılı hâlde.

   ---------------------------------------------------------------------------
   SWAP:FIT_WEIGHTS — KARAR NOKTASI, KUSUR DEĞİL

   Aşağıdaki ağırlıkların hiçbiri firma tarafından teyit edilmedi. Bu işaret
   duruyor ve TEYİT GELENE KADAR DURACAK, çünkü ağırlıklar hangi ülkenin
   önerileceğini belirliyor: test yayına alınırsa site, kimsenin onaylamadığı
   bir mantıkla ziyaretçiye ülke söylemiş olur.

   ÖNCEKİ TURDA NE OLDU. Soru sayısı beşten dokuza çıktı (müşterinin isteği:
   "gerçek bir anket gibi hissettirsin"). ESKİ BEŞ SORUNUN AĞIRLIKLARINA
   DOKUNULMADI, tek istisna `vize` sorusuna eklenen üçüncü seçenek. Dört yeni
   soru geldi ve her yeni ağırlığın gerekçesi kendi `why` alanında, dayandığı
   dosya parantez içinde yazılı. Gerekçesi olmayan ağırlık gözden geçirilemez.

   O turun ölçümü docs/uygunluk-testi-teyit.md'de duruyor. Kısası: dört yeni
   sorunun dördü de sitenin "küresel erişim" iddialarından türüyor (tahsilat
   matrisi, platform kabulü, banka erişimi, kuruluş süresi) ve sitenin kendi
   metinlerinde KKTC bu üç başlıkta da sıfır alıyor. Yani anketi derinleştirmek
   KKTC'nin açığını KAPATMIYOR, büyütüyor. Bu bir uygulama hatası değil,
   sitenin içeriğinin söylediği şey; ama tam olarak bu yüzden teyit gerekiyor
   (teyit belgesi · A2).

   ---------------------------------------------------------------------------
   BU TURDA NE OLDU · MÜŞTERİ PUANLAMAYI AÇIKÇA DEĞİŞTİRDİ

   Üç ayrı istek geldi ve üçü de bu dosyayı ilgilendiriyor:

   1. DÖRDÜNCÜ PERDE · KAZANÇ. "kazanca göre de yönlendirme yapalım dedi murat
      abi." İki soru eklendi (`kazanc`, `gider`) ve perde sayısı üçten dörde
      çıktı. EŞİKLER UYDURULMADI: hepsi repodaki gerçek maliyet dosyalarından
      hesaplanıyor (aşağıda FIT_YIL1 / FIT_YILLIK ve KAZANÇ EŞİKLERİ bloğu).
      Soru metinlerindeki rakamlar da elle yazılmıyor, o hesaptan basılıyor;
      fiyat teyidi geldiğinde sorular kendiliğinden güncelleniyor.

   2. NEGATİF PUAN. "mesela stripe fln kktc de yok ya, birisi o seçeneği
      seçtiğinde 0 puan yerine - de verebiliriz." Artık verilebiliyor, ama
      SERBESTÇE DEĞİL: negatif yalnızca sitenin kendisi o ülkenin O PROFİLDE
      DÜŞTÜĞÜNÜ söylüyorsa yazılıyor. Kuralın tamamı ve kabul edilen üç kaynak
      aşağıda, NEGATİF PUAN KURALI başlığında.

   3. DÖRDÜNCÜ SONUÇ · "HENÜZ ERKEN". Kazanç en alt bandın altındaysa test bir
      ülke önermiyor, dürüstçe "bu iş henüz bunu kaldırmıyor" diyor. Kapı tek
      bir cevaba bağlı (fitErken) ve eşiği yine hesaptan geliyor.

   Gözden geçirirken bakılacak dört şey:
     1. Bir seçeneğin puanı doğru ülkeye mi gidiyor?
     2. Puanların BÜYÜKLÜĞÜ doğru mu? 3 ile 1 arasındaki fark, o seçeneğin
        gerçekten üç kat daha belirleyici olduğunu söylüyor.
     3. Sıfır alan ülke gerçekten elenmeli mi? Yazılmayan ağırlık 0 demek.
     4. Negatif alan ülke için sitede gerçekten bir "hayır" satırı var mı?
        Yoksa o negatif silinmeli, sıfıra değil kaynağa bakılarak.

   ---------------------------------------------------------------------------
   TESTİN NE OLDUĞU

   Kısa liste aracı, danışmanlık değil. Sonuç ekranı bunu saklamıyor: ikinci
   sırayı ve aradaki farkı gösteriyor, fark küçükse söylüyor, tek bir cevabın
   sıralamayı çevirebileceği durumda bunu da yazıyor (bkz. scoreFit).
   ========================================================================= */

/** Puanlamaya giren ülkeler ve BERABERLİK SIRASI — aşağıdaki nota bakın. */
export const FIT_COUNTRIES: readonly Country[] = ["dubai", "ingiltere", "kktc"];

/* ============================================================ İKON ANAHTARI =
   Anahtar burada, lucide bileşeni FitTest.tsx'teki FIT_ICONS haritasında. İkisi
   ayrı çünkü bu dosya JSX taşımıyor; ayrıca hangi sorunun hangi kavramla
   gösterildiği bir İÇERİK kararı ve gerekçesiyle birlikte metnin yanında
   durması gerekiyor.

   İKİ KURAL — ikisi de bu turda ölçülen bir riski kapatıyor:

   1. ŞIKKA BAYRAK YOK. Bir şık gerçekten bir ülkeyi işaret ediyor olsa bile
      oraya bayrak koymak, o şıkkın hangi ülkeye puan verdiğini ziyaretçiye
      ilk bakışta söylerdi. Q1'in dört şıkkı da yer adı ("Avrupa ve İngiltere",
      "Körfez ve Orta Doğu", "Türkiye", "Karışık") ve üçü doğrudan bir ülkeye
      puan yazıyor; bayrak orada süs değil CEVAP ANAHTARI olurdu. Üstelik
      "Türkiye" şıkkı KKTC'ye puan veriyor ve elimizdeki tek uygun görsel KKTC
      bayrağı — iki ayrı ülkeyi aynı bayrakla göstermek olgusal olarak da
      yanlış olurdu. Bayrak yalnızca ÜLKENİN KENDİSİ konuşulduğunda kullanılıyor:
      sonuç tablosunda, ilk iki kartında ve sinyal panelindeki "puanlanan üç
      ülke" satırında.

   2. ŞIK İKONU YALNIZCA ŞIKLAR AYRI BİR MEKANİZMA/ARAÇ ADLANDIRIYORSA.
      Şıklar birbirinden yalnızca DERECE ile ayrılıyorsa (bütçe bandı, takvim
      bandı) ikon eklemek üç kutuya üç rastgele glif dağıtmak olurdu; orada
      anlamı sorunun ikonu taşıyor. Yer adı sayan Q1 de aynı sebeple ikonsuz
      (bkz. kural 1).

   Soru ikonu kendi şıklarının ikonlarından FARKLI seçildi: aynı glif hem
   başlıkta hem kutuda dururken kutu "başlığın tekrarı" gibi okunuyor. Farklı
   sorularda aynı glifin tekrar kullanılması ise bilerek serbest — ikon dili
   sitede tek olsun diye (örn. `wallet` hem bütçe sorusunda hem ödeme kuruluşu
   şıkkında).

   3. BU TURDA YENİ ANAHTAR EKLENMEDİ, VE BU BİR TERCİH DEĞİL BİR KISIT.
      Dördüncü perde üç yeni glif isterdi (kazanç perdesi, kazanç sorusu, gider
      sorusu). Eklenmedi çünkü bu birlik yalnızca burada tanımlı değil:
      src/components/lab/anketIkon.tsx `Record<FitIcon, LucideIcon>` tutuyor ve
      o dosya bilerek böyle yazılmış ("yeni bir ikon anahtarı eklenirse BURASI
      DERLEME HATASI VERİR"). Dosya bu turda başka bir ajanın alanında, yani
      yeni anahtar bütün depoyu derlenmez hâle getirirdi.
      Mevcut anahtarlardan seçildi ve üçü de kural 2'ye uyuyor:
        perde "Kazanç"  → `cash`     (banknot; perde işareti, soru ikonu değil)
        soru `kazanc`   → `receipt`  (gelir fişi; `kanal` sorusuyla aynı glif,
                                      kural gereği serbest, ikisi de para girişi)
        soru `gider`    → `wallet`   (`butce` ile aynı aile: biri tek seferlik,
                                      öteki her yıl tekrar eden aynı kese)
      Yeni glif isteniyorsa fitTest.ts ile anketIkon.tsx AYNI turda güncellenmeli. */
export type FitIcon =
  /* soru başlıkları */
  | "pin"
  | "layers"
  | "receipt"
  | "panels"
  | "landmark"
  | "plane"
  | "wallet"
  | "calendar"
  | "stamp"
  /* şıklar */
  | "code"
  | "package"
  | "handshake"
  | "help"
  | "card"
  | "cash"
  | "store"
  | "user"
  | "userx"
  | "users"
  | "building"
  | "id"
  | "finger"
  | "laptop"
  /* bölümler */
  | "briefcase"
  | "globe"
  | "sliders";

/* ==================================================== NEGATİF PUAN KURALI ===
   MÜŞTERİNİN İSTEĞİ: "bazı seçenekler - puan yazabilir. mesela stripe fln kktc
   de yok ya, birisi o seçeneği seçtiğinde 0 puan yerine - de verebiliriz yani,
   çünkü o önemli bir etken."

   İstek haklı ve testin eski hâlindeki gerçek bir kusuru kapatıyor: sıfır iki
   ayrı şeyi aynı anda söylüyordu. "Bu cevap o ülkeyi ayırmıyor" (kanal ·
   belirsiz) ile "o ülke bu cevapta DÜŞÜYOR" (KKTC · kartla tahsilat) ekranda
   aynı görünüyordu, oysa ikincisi sitenin sayfasında "Ana kısıt bu" diye
   yazılı. Artık üç hâl var: eksi, sıfır, artı.

   AMA NEGATİF SERBEST DEĞİL. Eksi puan bir ülkeyi eleyen en güçlü araç; kaynağı
   olmayan bir eksi, kaynağı olmayan bir artıdan daha zararlı. Kural şu:

     BİR SEÇENEK BİR ÜLKEYE ANCAK SİTENİN KENDİSİ O ÜLKENİN O PROFİLDE
     DÜŞTÜĞÜNÜ SÖYLÜYORSA EKSİ YAZAR.

   "Söylüyor" sayılan üç kaynak var; üçü de makine tarafından okunabilir, yani
   iddia bir yorum değil bir satır:

     K1  countryContent · fitTable satırı  ok: false
         (sayfanın kendisi "şu profildeyseniz burayı önermiyoruz" diyor,
          çoğunda bir de `alt` ile nereye yolladığı yazılı)
     K2  brand.ts · PAY_MATRIX hücresi "no"
         (✗ = DESTEKLENMİYOR. "none" ile karıştırılmayacak: o "ilgisiz" demek
          ve eksi yazdırmaz. Örn. Wio Business İngiltere'de "none", yani orada
          böyle bir ürün yok; Stripe KKTC'de "no", yani var ama çalışmıyor.)
     K3  brand.ts · FACTS[ülke].limit
         (ülkenin yayımlanmış tek dürüst kısıtı; sitede her sayfada geçiyor)

   BÜYÜKLÜK. Varsayılan −2. −3 yalnızca kaynak birden fazlaysa VE sitenin dili
   kesinse ("Ana kısıt bu", "vekâletle yürümüyor") yazılıyor. −4 hiç yok:
   testteki 4'ler iki eleyici artıya ayrılmış durumda (teyit belgesi · A3) ve
   negatif tarafta aynı şiddet, tek cevapla ülke silmek olurdu.

   YAZILMAYAN NEGATİFLER DE BİR KARAR. İki tanesi özellikle:
     · `ziyaret · uzaktan` KKTC'ye eksi YAZMIYOR. KKTC'de de yerinde imza
       isteniyor (countryContent · KKTC watchouts + steps) ama bu bir watchout,
       fitTable'da ok:false satırı değil ve tescil vekâletle yürüyor. K1/K2/K3'e
       girmiyor, o yüzden 0 kaldı.
     · `musteri · avrupa` Dubai'ye eksi YAZMIYOR, oysa Dubai fitTable'ında
       "Yalnızca AB'ye fatura kesen → ok:false" satırı var. Şıkkın metni
       "ağırlıklı olarak", fitTable satırı "yalnızca"; ikisi aynı şey değil.
       Şık bölünürse o zaman yazılır. Teyit belgesi · B3 zaten bunu soruyor.
   ========================================================================= */

/** Bir seçeneğin dağıttığı puanlar. Yazılmayan ülke 0 alır.
 *  NEGATİF DEĞER GEÇERLİ (bu turda geldi) ama yukarıdaki kurala tabi. */
export type FitWeights = Partial<Record<Country, number>>;

export type FitOption = {
  id: string;
  label: string;
  /** Ziyaretçiye gösterilen ipucu. YALNIZCA depoda doğrulanmış olgu. */
  hint?: string;
  weights: FitWeights;
  /** SWAP:FIT_WEIGHTS — ağırlığın gerekçesi. Gözden geçirme bu satırdan yürür. */
  why: string;
  /** Süs değil, şıkkın adlandırdığı ARAÇ. Yokluğu da bir karar (bkz. İKON
   *  ANAHTARI · kural 2): derece ya da yer sayan şıklarda ikon yok. */
  icon?: FitIcon;
};

/* BÖLÜMLER — anketin üç perdesi.
   Soru sayısı dokuza çıkınca düz bir liste "ne kadar kaldı" sorusunu
   cevaplayamaz hâle geldi: dokuz eşit ağırlıklı adım, bitmeyen bir form gibi
   okunuyor. Bölüm başlığı ziyaretçiye NEREDE olduğunu söylüyor ve her bölüm
   kendi içinde bir cümle kuruyor. Ekranın sol şeridi bu diziden basılıyor. */
export type FitPartId = "is" | "erisim" | "kazanc" | "kisit";

export type FitPart = {
  id: FitPartId;
  title: string;
  /** Bölümün tek satırlık konusu.
   *  VERİ DURUYOR, EKRANDA DEĞİL. Müşteri bu turda sol raydan kaldırttı
   *  ("başlıkların altında yer alan kısa açıklamalara gerek yok"), yani
   *  .ft-part-l artık basılmıyor. Alan SİLİNMEDİ: üç cümle de doğrulanmış
   *  ve bölümün ne sorduğunu tek satırda anlatan tek metin; silinirse
   *  yeniden yazılması gerekir ve o yazım gözden geçirilmemiş olur. */
  line: string;
  /** Şeritteki bölüm işareti. Dar ekranda üç kutuda tek görünen şey bu ikon
   *  ve bölüm adı; ikon orada dekorasyon değil, kutuyu okunur tutan parça. */
  icon: FitIcon;
};

/* PERDE SIRASI = SORU SIRASI. `fitPartOf` bölüm numarasını bu dizinin
   sırasından, kalemleri ise FIT_QUESTIONS'ın sırasından okuyor; ikisi
   ayrışırsa ekranda "Bölüm 4" derken hâlâ üçüncü perdenin soruları çıkar.
   Yeni soru eklerken İKİ DİZİ BİRDEN aynı sırada tutulacak. */
export const FIT_PARTS: readonly FitPart[] = [
  { id: "is", title: "İşiniz", line: "Kime satıyorsunuz, ne satıyorsunuz, parayı nasıl alıyorsunuz.", icon: "briefcase" },
  { id: "erisim", title: "Erişim", line: "Şirketin dünyaya bağlandığı yer: platform, banka, seyahat.", icon: "globe" },
  /* DÖRDÜNCÜ PERDE, BU TURDA GELDİ ve üçüncü sıraya kondu, sona değil.
     Sebep: `kazanc` ile `butce` aynı konunun iki yarısı (bugün ne kazanıyorsun,
     kuruluşa ne ayırabiliyorsun) ve arada iki perde olması ziyaretçiye aynı
     şeyi iki kez soruyormuş gibi geliyordu. Anket yine "Kısıtlar" ile bitiyor,
     yani eski kapanış korundu.
     İKON `cash`, yeni anahtar DEĞİL: gerekçe İKON ANAHTARI · kural 3. */
  { id: "kazanc", title: "Kazanç", line: "İşin bugünkü büyüklüğü ve yılda ne kadar sabit gidere dayandığı.", icon: "cash" },
  /* "Cevabı en çok daraltan bölüm" cümlesi BU TURDA DÜŞTÜ ve yerine konu
     yazıldı: artık cevabı en çok daraltan perde bu değil, Kazanç. Kazanç en alt
     bandındayken test hiçbir ülkeyi önermiyor (fitErken). */
  { id: "kisit", title: "Kısıtlar", line: "Kuruluş bütçesi, takvim ve oturum vizesi.", icon: "sliders" },
];

export type FitQuestion = {
  id: string;
  part: FitPartId;
  /** Sol şeritteki kısa ad. Soru cümlesinin iki kelimelik hâli. */
  short: string;
  /** Soru cümlesi. Ekranda <legend> olarak basılıyor. */
  q: string;
  /** Sorunun altındaki tek satır. Yine yalnızca doğrulanmış olgu. */
  help?: string;
  /** Sorunun neden sorulduğu — ağırlık bandının gerekçesi. */
  why: string;
  /** Soru başlığındaki ikon. Sorunun KONUSUNU gösteriyor, cevabını değil. */
  icon: FitIcon;
  options: FitOption[];
};

/* ================================================== KAZANÇ EŞİKLERİ ========
   DÖRDÜNCÜ PERDENİN İKİ SORUSU BURADAN BESLENİYOR. Ekrandaki hiçbir rakam elle
   yazılmadı: hepsi repodaki maliyet dosyalarından hesaplanıyor ve fiyat teyidi
   geldiğinde sorular kendiliğinden güncelleniyor.

   ---------------------------------------------------------------------------
   ADIM 1 · ÜÇ ÜLKENİN GERÇEK RAKAMI NEREDE YAZILI

   İLK YIL TOPLAMI = kuruluş + ilk yılın tekrar eden kalemi.
     Dubai       3.900 (brand.ts · FACTS.dubai.from) + 2.100 (PRICING) = 6.000
     İngiltere   1.200 (FACTS.ingiltere.from)        +   700 (PRICING) = 1.900
     KKTC        2.400 (FACTS.kktc.from)             +   900 (PRICING) = 3.300

   HER YIL TEKRAR EDEN = PRICING[ülke].annual, yani 2.100 · 700 · 900.

   ÜÇ ÜLKE İÇİN AYNI CETVEL, VE BU BİR ÖLÇÜM KARARI. İlk yazımda Dubai'nin
   yıllık yükü afterSetup.ts'ten alınmıştı (9.420: muhasebe + yıl sonu beyanı +
   lisans yenileme) çünkü orası müşterinin KENDİ BELGESİ. Ölçüm o kurgunun
   yanlış olduğunu gösterdi: afterSetup.ts yalnızca Dubai için dolu
   (SWAP:AFTER_SETUP), yani Dubai'nin sepeti muhasebe + beyan + lisans, öteki
   ikisinin sepeti tek satırlık "yıllık muhasebe". Farklı sepetleri
   karşılaştırmak bir bulgu değil bir ölçüm hatası ve sonucu da ölçüldü:
   o kurguyla test Dubai'yi kombinasyonların %27,5'inde birinci gösteriyordu,
   ortak cetvelle %40 civarında. Aradaki fark eksik veriden geliyordu.

   Rakam yine de kaybolmadı: FIT_DUBAI_BELGE aşağıda duruyor ve teyit
   belgesinde bu tercihin sayısal karşılığı yazılı. İngiltere ile KKTC'nin
   afterSetup verisi geldiğinde ortak cetvel o veriye taşınacak.

   İKİ UYARI DAHA, İKİSİ DE ÇÖZÜLMEDİ VE ÇÖZÜLMESİ BİZİM İŞİMİZ DEĞİL:
     a) FACTS.from ile PRICING.base aynı şeyi söylemiyor (İngiltere 1.200'e
        karşı 900, KKTC 2.400'e karşı 1.800). SİTEDE YAYIMLANAN rakam FACTS,
        o yüzden eşik ondan türüyor. İkisi de SWAP:PRICES işaretli.
     b) afterSetup.ts kendi başında bir çelişki bildiriyor (SWAP:AFTER_PRICING:
        350 × 12 = 4.200 ile PRICING.dubai.annual = 2.100 aynı hizmet).
        Bu test PRICING tarafını kullanıyor; hangisinin doğru olduğu müşterinin
        kararı ve karar geldiğinde eşikler kendiliğinden kayacak.

   ---------------------------------------------------------------------------
   ADIM 2 · MALİYETİ KAZANCA ÇEVİREN TEK SERBEST SAYI

   Eşikler maliyetten türüyor ama bir oran olmadan maliyet kazanca çevrilemez.
   O oran repoda YOK, yani testteki tek uydurulabilir sayı bu; uydurmak yerine
   tek başına işaretlendi:

     SWAP:FIT_KAZANC_ORAN = 1/10
     "Bir yapının ilk yıl maliyeti, işin yıllık net kazancının onda birini
      geçiyorsa o yapı o iş için henüz erken."

   Neden onda bir: kuruluş bir gider kalemi, işin kendisi değil. Onda birin
   üstünde bu kalem işletmenin en büyük sabit gideri hâline geliyor ve
   karşılığında sitenin vaat ettiği hiçbir şey (tanınırlık, tahsilat, oturum)
   otomatik gelmiyor. Rakam MURAT ABİYE SORULACAK; değişirse dört bandın da
   sınırı kendiliğinden kayıyor, soru metni dâhil.

   Eşik = ilk yıl maliyeti × 10, sonra bine yukarı yuvarlanıyor:
     İngiltere  1.900 × 10 = 19.000
     KKTC       3.300 × 10 = 33.000
     Dubai      6.000 × 10 = 60.000

   ---------------------------------------------------------------------------
   ADIM 3 · PUAN, BANTLARDAN MEKANİK ÇIKIYOR

   Her band için her ülkeye tek kural uygulanıyor, elle puan yazılmıyor:
     eşik ≤ bandın ALT ucu            → +2   (bu ölçek o yapıyı rahat taşıyor)
     bandın içinde                     →  0   (sınırda; ne öne çıkar ne düşer)
     bandın ÜST ucunu geçiyor          → −2   (bu ölçek o yapıyı taşımıyor)
     bir SONRAKİ bandın da üstünde     → −3   (bir bant değil, iki bant uzakta)
   En üst bandda üç ülke de +2 alırdı; eşit puan sıralamayı değiştirmediği için
   orası bilerek boş bırakıldı (aynı şeyin dürüst hâli: "bu ölçekte kazanç üç
   ülkeyi ayırmıyor").
   ========================================================================= */

/** Bine YUKARI yuvarlama. Bandlar "yuvarlak" değil DOĞRU olsun diye bu kadar:
 *  19.000 hesabın kendisi, 20.000 bizim güzelleştirmemiz olurdu ve ziyaretçiye
 *  söylediğimiz sayı hesabın söylediği sayıdan uzaklaşırdı. Yukarı yuvarlanıyor
 *  çünkü aşağı yuvarlamak eşiği gerçek maliyetin ALTINA indirir ve o zaman
 *  "bu ölçek bu yapıyı taşıyor" derken hesap taşımadığını söylüyor olur. */
const bineYuvarla = (n: number): number => Math.ceil(n / 1000) * 1000;

/** 19000 → "19.000". Intl KULLANILMIYOR: sunucu ile tarayıcının ICU'su
 *  ayrışırsa metin hidrasyonda değişir ve bu depoda hidrasyon farkı zaten bir
 *  tuzak (tuzak A). Bu biçimlendirme her ortamda aynı sonucu veriyor. */
const bin = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/** Her yıl tekrar eden kalem, USD. ÜÇÜ DE AYNI ALANDAN (PRICING.annual);
 *  gerekçesi ADIM 1'deki "üç ülke için aynı cetvel" notu. */
export const FIT_YILLIK: Record<Country, number> = {
  dubai: PRICING.dubai.annual,
  ingiltere: PRICING.ingiltere.annual,
  kktc: PRICING.kktc.annual,
};

/** Kuruluş + ilk yılın tekrar eden kalemi, USD. Kuruluş tarafı sitede
 *  yayımlanan rakam (FACTS.from), PRICING.base değil (ADIM 1 · uyarı a). */
export const FIT_YIL1: Record<Country, number> = {
  dubai: FACTS.dubai.from + FIT_YILLIK.dubai,
  ingiltere: FACTS.ingiltere.from + FIT_YILLIK.ingiltere,
  kktc: FACTS.kktc.from + FIT_YILLIK.kktc,
};

/** SWAP:AFTER_PRICING'in SAYISAL KARŞILIĞI, hesaba GİRMİYOR ama duruyor.
 *  Müşterinin kendi belgesine göre Dubai'nin ilk yılı 9.820 USD (kurumlar
 *  vergisi kaydı 400 + 12 × 350 muhasebe + 420 yıl sonu + 4.800 lisans
 *  yenileme) ve tekrar eden kısmı 9.420. PRICING.dubai.annual ise 2.100 diyor.
 *  Belge teyit edilirse Dubai'nin kazanç eşiği 60.000'den 140.000'e çıkıyor ve
 *  ölçüm bunun sonucunu veriyor: testin Dubai önerme oranı %40'tan %27,5'e
 *  düşüyor. Yani bu çelişki artık soyut değil, fiyatı belli. */
export const FIT_DUBAI_BELGE = {
  ilkYil: (AFTER_SETUP.dubai?.firstYear.lines ?? []).reduce((s, l) => s + l.usd, 0),
  yillik:
    (AFTER_SETUP.dubai?.firstYear.lines ?? []).reduce((s, l) => s + l.usd, 0) -
    (AFTER_SETUP.dubai?.firstYear.lines.find((l) => l.id === "kurumlar-vergisi-kaydi")?.usd ?? 0),
};

/** SWAP:FIT_KAZANC_ORAN — testteki tek uydurulabilir sayı, tek başına burada. */
export const FIT_KAZANC_ORAN = 10;

/** Kazanç bandlarının sınırları, küçükten büyüğe. Üç sınır = dört band. */
export const FIT_KAZANC_ESIK: number[] = Array.from(
  new Set(FIT_COUNTRIES.map((c) => bineYuvarla(FIT_YIL1[c] * FIT_KAZANC_ORAN))),
).sort((a, b) => a - b);

/** Gider bandlarının sınırları. Burada oran YOK: sınırlar doğrudan ülkelerin
 *  kendi yıllık rakamları, çünkü soru zaten "yıllık gidere ne kadar
 *  dayanırsınız" diye soruyor.
 *  İNGİLTERE (700) İLE KKTC (900) AYNI SINIRA DÜŞÜYOR, ikisi de bine
 *  yuvarlanınca 1.000. Bu bir kayıp değil, olgunun kendisi: yıllık gider
 *  tarafında o iki ülke birbirinden ayrışmıyor ve aradaki 200 doları band
 *  sınırı yapmak, ziyaretçiye cevaplayamayacağı bir soru sormak olurdu.
 *  Tekrarlanan sınır ayıklanıyor, yani üç ülke iki sınır ve üç band üretiyor. */
export const FIT_GIDER_ESIK: number[] = Array.from(
  new Set(FIT_COUNTRIES.map((c) => bineYuvarla(FIT_YILLIK[c]))),
).sort((a, b) => a - b);

/** Ülke başına eşik: kazançta ilk yıl maliyeti × oran, giderde yıllık kalem.
 *  İkisi de bandların sınırlarıyla AYNI yuvarlamadan geçiyor, yoksa "eşik tam
 *  bandın alt ucunda" karşılaştırması yuvarlama hatasına takılırdı. */
const KAZANC_ULKE: Record<Country, number> = Object.fromEntries(
  FIT_COUNTRIES.map((c) => [c, bineYuvarla(FIT_YIL1[c] * FIT_KAZANC_ORAN)]),
) as Record<Country, number>;
const GIDER_ULKE: Record<Country, number> = Object.fromEntries(
  FIT_COUNTRIES.map((c) => [c, bineYuvarla(FIT_YILLIK[c])]),
) as Record<Country, number>;

/** ADIM 3'teki kuralın kodu. `esikler` küçükten büyüğe sınırlar, `bant` kaçıncı
 *  bandda olduğumuz (0 = en alt). Elle puan yazılmıyor, bu fonksiyon yazıyor. */
function bantAgirlik(
  esikler: number[],
  ulkeEsik: Record<Country, number>,
  bant: number,
): FitWeights {
  const alt = bant === 0 ? 0 : esikler[bant - 1];
  const ust = bant < esikler.length ? esikler[bant] : Infinity;
  const sonraki = bant + 1 < esikler.length ? esikler[bant + 1] : Infinity;

  const ham = FIT_COUNTRIES.map((c) => {
    const t = ulkeEsik[c];
    if (t <= alt) return { c, n: 2 };
    if (t <= ust) return { c, n: 0 };
    return { c, n: t > sonraki ? -3 : -2 };
  });

  /* Üçü de +2 ise sıralamaya hiçbir şey katmıyor: boş dönüyor ki ekranda
     "bu cevap puan getirmedi" yazsın, üç eşit pul değil. */
  if (ham.every((x) => x.n === 2)) return {};

  const w: FitWeights = {};
  for (const x of ham) if (x.n !== 0) w[x.c] = x.n;
  return w;
}

/** Bandın ekranda yazan aralığı. */
function bantEtiket(esikler: number[], bant: number, birim: string): string {
  if (bant === 0) return `${bin(esikler[0])} ${birim} ve altı`;
  if (bant >= esikler.length) return `${bin(esikler[esikler.length - 1])} ${birim} üzeri`;
  return `${bin(esikler[bant - 1])} ile ${bin(esikler[bant])} ${birim} arası`;
}

/* ============================================================ SORULAR ======
   On bir soru, dört bölüm. Beşten dokuza, dokuzdan on bire çıkarken tek kural
   hiç değişmedi: SORU SİTEDE
   KARŞILIĞI OLAN BİR ŞEY SORACAK. Yani cevabı puanlanabiliyorsa soruluyor,
   puanlanamıyorsa hiç sorulmuyor — ziyaretçiye kullanamayacağımız bir şey
   sormak, anketi uzatıp sonucu iyileştirmeyen tek hamle. */

export const FIT_QUESTIONS: readonly FitQuestion[] = [
  /* ------------------------------------------------------- BÖLÜM 1 · İŞİNİZ */
  {
    id: "musteri",
    part: "is",
    short: "Müşteri konumu",
    /* Değişmedi: soru zaten netti ve testin en ayırt edici sorusu bu. */
    q: "Müşterileriniz ağırlıklı olarak nerede?",
    help: "Ağırlıklı olan tek yeri işaretleyin; gerçekten dağınıksa son kutu.",
    why: "Faturayı kime kestiğiniz hem tahsilat kanalını hem şirketin karşı tarafta tanınırlığını belirliyor; testin en yüksek ayırt ediciliği burada, o yüzden band 1-3.",
    /* Dört şık da yer adı → hiçbirinde ikon YOK (İKON ANAHTARI · kural 1 ve 2).
       Bayrak konsaydı soru bir eşleştirme bilmecesine dönerdi: "Körfez"in
       yanındaki BAE bayrağı, o şıkkın Dubai'ye 3 puan yazdığını söylerdi. */
    icon: "pin",
    options: [
      {
        id: "avrupa",
        /* "Avrupa / İngiltere" idi. Eğik çizgi "veya" gibi okunuyordu, oysa
           kastedilen ikisi birden. */
        label: "Avrupa ve İngiltere",
        /* NEGATİF · KKTC −2 (bu turda geldi). Kaynak K1 ve K3: fitTable "AB
           pazarına fatura kesen → ok:false, tanınırlık dar, alt: ingiltere" ve
           FACTS.kktc.limit "AB üyesi değil". Tek kaynak değil ama sitenin dili
           kesin değil ("bazı platformlar"), o yüzden −3 değil −2. */
        weights: { ingiltere: 3, dubai: 1, kktc: -2 },
        why: "Ltd yapısı AB müşterisinde ve platformlarda kabul gördüğü için pay İngiltere'de (countryContent · İngiltere fitTable); Dubai bu profilde çalışıyor ama ek sürtünme yarattığı için 1'de kalıyor. KKTC eksi alıyor çünkü sayfası bu profili açıkça reddediyor: “AB pazarına fatura kesiyorsanız → tanınırlık dar; bazı platformlar kabul etmiyor” (countryContent · KKTC fitTable, alt: İngiltere) ve yayımlanmış kısıtı “AB üyesi değil” (brand.ts · FACTS.kktc.limit).",
      },
      {
        id: "korfez",
        label: "Körfez ve Orta Doğu",
        weights: { dubai: 3 },
        why: "Yerel şirket, yerel müşteride güven ve ödeme kolaylığı sağlıyor (countryContent · Dubai fitTable); diğer iki ülkenin bu bölgede karşılığı olmadığı için puan paylaşılmıyor.",
      },
      {
        id: "turkiye",
        label: "Türkiye",
        weights: { kktc: 3, ingiltere: 1 },
        why: "Aynı dil, aynı saat dilimi ve bir günlük yol KKTC'nin en güçlü tarafı (countryContent · KKTC fitTable); İngiltere Ltd Türkiye'den de yürütülebildiği için düşük bir pay alıyor.",
      },
      {
        id: "karisik",
        /* "Karışık / global" idi; "tek bir yer yok" ne demek istendiğini
           söylüyor ve önceki üç kutuyla karışmıyor. */
        label: "Karışık (tek bir yer yok)",
        weights: { dubai: 2, ingiltere: 2 },
        why: "Tek bir yer yoksa ayırt edici olan tahsilat genişliği; Stripe, PayPal ve Wise Dubai ile İngiltere'de çalışıyor, KKTC'de çalışmıyor (brand.ts · PAY_MATRIX), bu yüzden ikisi eşit, KKTC sıfır.",
      },
    ],
  },
  {
    id: "is",
    part: "is",
    short: "Faaliyet",
    /* "Ne satıyorsunuz?" idi. Aynı soru, ama "iş modeli" demeden ne sorulduğu
       daha açık. */
    q: "Ne satıyorsunuz?",
    help: "Ağırlıklı gelirinizin geldiği işi işaretleyin.",
    why: "Faaliyet, tahsilat kanalını ve lisans tarafını değiştiriyor; ülke sayfalarının uygunluk tabloları da bu kırılımı kullanıyor. Band 1-3.",
    /* Dört şık dört ayrı İŞ TÜRÜ adlandırıyor, yani ikon ayırt edici. */
    icon: "layers",
    options: [
      {
        id: "yazilim",
        label: "Yazılım ve dijital hizmet",
        icon: "code",
        weights: { dubai: 2, ingiltere: 2 },
        why: "Dijital hizmette belirleyici olan tahsilat; Stripe ve PayPal iki ülkede de çalıştığı için (brand.ts · PAY_MATRIX) pay eşit bölünüyor.",
      },
      {
        id: "eticaret",
        /* Eğik çizgi gitti; iki kalem de aynı kutuda kalıyor çünkü ikisini de
           belirleyen şey kartla tahsilat ve lojistik. */
        label: "E-ticaret veya fiziksel ürün",
        icon: "package",
        weights: { dubai: 3, kktc: 1 },
        why: "Kartla tahsilat ve lojistik tarafı Dubai'de sorunsuz kuruluyor (countryContent · Dubai fitTable); KKTC bölgesel ticarette çalışıyor ama Stripe desteklemediği için 1'de kalıyor.",
      },
      {
        id: "danismanlik",
        label: "Danışmanlık",
        icon: "handshake",
        weights: { ingiltere: 2, kktc: 2 },
        why: "Fatura ve sözleşme tarafının en oturmuş olduğu pazar İngiltere (countryContent · İngiltere fitTable); KKTC bölgesel hizmette aynı payı alıyor, Dubai bu profilde ayrıca öne çıkmıyor.",
      },
      {
        /* SEÇENEK AĞIRLIK TAŞIMIYOR (hepsi 0).
           Sebep: üç kutu gayrimenkul, turizm, sağlık ve finansı kapsamıyordu
           (karşılaştırın: store.ts · ACTIVITY_LABELS altı kalem sayıyor).
           O işlerdeki ziyaretçi mecburen yanlış bir kutu işaretliyor ve testin
           bu sorudan çıkan puanı YANLIŞ oluyor. Sıfır ağırlıklı bir kutu ise
           "bu soru sizi ayırmıyor" demenin dürüst yolu: sonuç kalan
           sorulardan çıkıyor. */
        id: "diger",
        label: "Başka bir alan",
        hint: "Gayrimenkul, turizm, sağlık, finans…",
        /* `help` YALNIZCA "belirsiz" anlamındaki iki şıkta: burada ve
           `kanal · belirsiz`. Diğer üç sıfır ağırlıklı şık (platform·hayır,
           banka·yerel, sure·esnek) belirsiz değil NET cevap; onlara soru
           işareti koymak cevabı "bilmiyorum" diye yanlış etiketlerdi. */
        icon: "help",
        weights: {},
        why: "Bilerek sıfır: bu dört alan için üç ülkeyi ayıran doğrulanmış bir kural elimizde yok, uydurulmuş bir ağırlık da yanlış ülkeyi öne çıkarır.",
      },
    ],
  },
  {
    /* ······································· YENİ SORU · SWAP:FIT_WEIGHTS
       NEDEN BU SORU. Test beş soruyken tahsilatı hiç sormuyordu, oysa üç ülke
       arasındaki EN SERT ayrım orada: brand.ts'teki PAY_MATRIX "Tahsilat"
       grubunda Stripe ve PayPal iki ülkede ✓, KKTC'de ✗. KKTC'nin kendi
       sayfası da bunu "Ana kısıt bu" diye yazıyor. Ziyaretçiye sorulmayan ama
       kararı belirleyen bir olgu, testin göremediği bir kör noktaydı.

       ÜÇ SORU AYNI ŞEYİ SORMUYOR. `kanal` müşterinin size NASIL ÖDEDİĞİNİ
       soruyor (PAY_MATRIX · Tahsilat grubu), `banka` şirketin parasının NEREDE
       DURDUĞUNU (PAY_MATRIX · Banka hesabı ve Ödeme kuruluşu grupları).
       Matrisin kendisi bu üçünü ayrı gruplara bölmüş; biz de öyle bölüyoruz.
       Yine de ikisi PRATİKTE korelasyonlu, teyit belgesinde bu not düşüldü. */
    id: "kanal",
    part: "is",
    short: "Tahsilat kanalı",
    q: "Parayı nasıl tahsil edeceksiniz?",
    help: "Kartla tahsilat kanalları ülkeye göre değişiyor: Stripe ve PayPal KKTC şirketiyle çalışmıyor.",
    why: "Olgusal karşılığı en net soru: hangi sağlayıcının hangi ülkede çalıştığı brand.ts'teki matriste hücre hücre yazılı. Band 2-3.",
    /* Soru ikonu `receipt`, şık ikonu `card` — ikisi de para tarafı ama aynı
       glif değil; başlık "tahsilat", kutu "kart" diyor. */
    icon: "receipt",
    options: [
      {
        id: "kart",
        label: "Kartla, site veya uygulama üzerinden",
        hint: "Stripe, PayPal, wamo",
        icon: "card",
        /* NEGATİF · KKTC −3. MÜŞTERİNİN KENDİ ÖRNEĞİ bu şık: "stripe fln kktc
           de yok ya, birisi o seçeneği seçtiğinde 0 puan yerine - de
           verebiliriz yani, çünkü o önemli bir etken."
           Üç kaynak birden var (K1 + K2 iki hücre) ve sitenin dili kesin
           ("Ana kısıt bu", faq'ta düz "Hayır."), yani −3. Testteki en güçlü
           negatif bu ve öyle olması gerekiyor: kart tahsilatı ana kanalsa KKTC
           bir tercih değil, kapalı bir kapı. */
        weights: { dubai: 3, ingiltere: 3, kktc: -3 },
        why: "Stripe ve PayPal iki ülkede de çalışıyor, KKTC'de çalışmıyor (brand.ts · PAY_MATRIX · Tahsilat, iki hücre de ✗); KKTC sayfası bunu “Ana kısıt bu” diye yazıyor (countryContent · KKTC watchouts), fitTable'da “Stripe ile kart tahsilatı → ok:false, alt: Dubai” satırı var ve faq düz “Hayır” diyip Dubai ya da İngiltere'ye yolluyor. Üç kaynak ve kesin dil olduğu için negatifin üst ucu.",
      },
      {
        id: "havale",
        label: "Havale ve fatura ile",
        hint: "Hesaptan hesaba, kart yok",
        icon: "cash",
        weights: { kktc: 2 },
        why: "Ayrımı KKTC sayfası birebir yapıyor: kart tahsilatı ana kanal değilse “bölgesel ticaret ve hizmet işlerinde maliyet avantajı gerçek” (countryContent · KKTC faq). Dubai ve İngiltere bu cevapta ayrıca öne çıkmıyor, çünkü yerel banka üçünde de var (brand.ts · PAY_MATRIX).",
      },
      {
        id: "belirsiz",
        label: "Henüz netleşmedi",
        icon: "help",
        weights: {},
        why: "Bilerek sıfır: kanal belli değilken bir ülkeyi öne çıkarmak, kanal netleşince geri alınacak bir tercih olur.",
      },
    ],
  },

  /* ------------------------------------------------------ BÖLÜM 2 · ERİŞİM */
  {
    /* ······································· YENİ SORU · SWAP:FIT_WEIGHTS
       NEDEN BU SORU. Platform kabulü bir tercih değil bir KAPI: platform
       şirketi kabul etmiyorsa o ülke o iş için kapalı, puan tartışması bile
       başlamıyor. Sitede üç ayrı yerde yazılı (countryContent · KKTC
       watchouts "Bazı yurt dışı platformlar KKTC şirketini kabul etmiyor",
       KKTC fitTable "Global platformda satış → hesap açılışında sık sık
       reddedilirsiniz", İngiltere pros "platformlarda sorunsuz kabul görür")
       ama test bunu hiç sormuyordu.

       `kanal` İLE AYNI ŞEY DEĞİL: kart tahsilatı ödeme sağlayıcısının şirketi
       kabul etmesi, platform satışı pazar yerinin şirketi kabul etmesi. KKTC
       sayfası ikisini iki AYRI watchout maddesi olarak yazıyor. */
    id: "platform",
    part: "erisim",
    short: "Platform satışı",
    q: "Global platformlarda satış yapacak mısınız?",
    help: "Pazar yeri, uygulama mağazası, freelance platformu. Hepsi şirketin tescilli olduğu ülkeye bakıyor.",
    why: "Kabul edilmemek puanla değil kapıyla ilgili bir sonuç doğuruyor, o yüzden band yüksek tutuldu: 2-3.",
    /* `panels` (liste sayfası) başlıkta, `store` (pazar yeri) şıkta: soru
       "platform" diyor, şık "orada satacağım" diyor. */
    icon: "panels",
    options: [
      {
        id: "evet",
        label: "Evet, satışın önemli bölümü oradan gelecek",
        icon: "store",
        /* NEGATİF · KKTC −2. Kaynak K1: fitTable "Global platformda satış →
           ok:false, hesap açılışında sık sık reddedilirsiniz, alt: dubai".
           −3 DEĞİL: watchout "BAZI yurt dışı platformlar kabul etmiyor" diyor,
           yani kapı tamamen kapalı değil. `kanal · kart` ile arasındaki fark
           tam olarak bu tek kelime. */
        weights: { ingiltere: 3, dubai: 2, kktc: -2 },
        why: "Ltd yapısı Avrupa'daki müşteri ve platformlarda sorunsuz kabul görüyor (countryContent · İngiltere pros); aynı satış KKTC'de “hesap açılışında sık sık reddedilirsiniz” diye işaretli ve sayfa oradan Dubai'ye yolluyor (countryContent · KKTC fitTable), Dubai payını buradan alıyor. KKTC eksi alıyor çünkü aynı sayfa bunu bir kısıt olarak da yazıyor (“Bazı yurt dışı platformlar KKTC şirketini kabul etmiyor”); “bazı” dediği için −3 değil −2.",
      },
      {
        id: "hayir",
        label: "Hayır, doğrudan satıyorum",
        /* Sıfır ağırlıklı ama NET bir cevap, o yüzden `help` değil `user`:
           aracı yok, satış doğrudan müşteriye. */
        icon: "user",
        weights: {},
        why: "Bilerek sıfır: doğrudan satışta platform kabulü hiç devreye girmiyor, yani bu cevap üç ülkeyi birbirinden ayırmıyor.",
      },
    ],
  },
  {
    /* ······································· YENİ SORU · SWAP:FIT_WEIGHTS
       NEDEN BU SORU. Sitenin en çok tekrarladığı uyarı bu: "Tescil kolay,
       banka değil" (countryContent · İngiltere clarify). Kuruluşun kolay
       olduğu ülkede hesap zor, hesabın kolay olduğu ülkede kuruluş pahalı.
       Test bunu sormadan üç ülkeyi puanlıyordu.

       SORU BİR AYRIMI DA ÖĞRETİYOR: banka ile ödeme kuruluşu aynı şey değil.
       PAY_MATRIX'in kendi grup ipucu bunu yazıyor ("Banka değil; farklı lisans
       ve koruma rejimi") ve ziyaretçilerin çoğu bu ayrımı bilmiyor. */
    id: "banka",
    part: "erisim",
    short: "Banka ihtiyacı",
    q: "Banka tarafında ne lazım?",
    help: "Banka ile ödeme kuruluşu aynı şey değil: farklı lisans, farklı koruma rejimi.",
    why: "Üç ülkenin en net ayrıştığı yer burası; hangi kurumun hangi ülkede çalıştığı matriste satır satır yazılı. Band 2-3.",
    /* Başlık `landmark` (banka kurumu), şıklar üç ayrı kurum tipi:
       `building` banka binası · `wallet` ödeme kuruluşu · `pin` yerel banka. */
    icon: "landmark",
    options: [
      {
        id: "kurumsal",
        label: "Bankada kurumsal hesap",
        hint: "Wio Business, Mashreq NeoBiz",
        icon: "building",
        weights: { dubai: 3 },
        why: "Wio ve Mashreq NeoBiz yalnızca BAE sütununda çalışıyor (brand.ts · PAY_MATRIX · Banka hesabı) ve Dubai sayfası banka tarafını açık avantaj sayıyor (countryContent · Dubai pros); İngiltere'de geleneksel bankada yerleşik olmayan ortağın onay oranı düşük (countryContent · İngiltere clarify). KKTC'de yerel banka var (brand.ts · PAY_MATRIX) ama açılış yerinde imza istiyor (countryContent · KKTC watchouts) ve o şartı `ziyaret` sorusu zaten ölçüyor; aynı olguyu iki kez saymamak için burada puan verilmiyor.",
      },
      {
        id: "odeme",
        label: "Ödeme kuruluşu hesabı yeterli",
        hint: "Wise, Payoneer",
        icon: "wallet",
        /* NEGATİF · KKTC −2. Kaynak K2, iki hücre: PAY_MATRIX · Ödeme kuruluşu
           grubunda Wise ✗ ve Payoneer ✗. fitTable'da bu profil için ayrı bir
           ok:false satırı YOK, o yüzden −3 değil −2: matris "çalışmıyor" diyor
           ama sayfa "buraya gelmeyin" demiyor. */
        weights: { ingiltere: 3, dubai: 2, kktc: -2 },
        why: "İngiltere sayfası pratikte ödeme kuruluşu hesabıyla başlandığını yazıyor (countryContent · İngiltere clarify); Wise ve Payoneer iki ülkede de çalışıyor, KKTC'de ikisi de ✗ (brand.ts · PAY_MATRIX · Ödeme kuruluşu). İki hücre birden desteklenmediği için KKTC burada sıfır değil eksi alıyor; sayfa düzeyinde ayrıca bir ret satırı olmadığı için büyüklük −2'de tutuldu.",
      },
      {
        id: "yerel",
        label: "Yerel bankada hesap yeter",
        icon: "pin",
        weights: {},
        why: "Bilerek sıfır: yerel banka üç ülkede de var (brand.ts · PAY_MATRIX), yani bu cevap hiçbirini elemiyor ve hiçbirini öne çıkarmıyor.",
      },
    ],
  },
  {
    id: "ziyaret",
    part: "erisim",
    short: "Seyahat",
    /* "Kuruluş için yurt dışına gidebilir misiniz?" idi ve YANLIŞTI: Dubai'de
       tescil uzaktan tamamlanabiliyor, seyahat gerektiren adımlar vize
       biyometrisi ile banka imzası. Soru artık gerçekten sorulan şeyi soruyor. */
    q: "Süreç için bir kez yurt dışına gidebilir misiniz?",
    help: "Tescil çoğu yerde uzaktan yürüyor; seyahat isteyen adımlar banka imzası ve vize biyometrisi.",
    why: "Bu, tek cevabıyla bir ülkeyi tamamen eleyebilen sorulardan biri, o yüzden testin en yüksek tek ağırlığı (4) burada.",
    /* `finger` (biyometri) rastgele bir seyahat gliften değil, sorunun kendi
       yardım satırından geliyor: "seyahat isteyen adımlar banka imzası ve
       vize biyometrisi". Karşı şık `laptop`: gitmeden, uzaktan. */
    icon: "plane",
    options: [
      {
        id: "gidebilirim",
        label: "Evet, bir kez gidebilirim",
        hint: "Banka ve vize tarafını açar.",
        icon: "finger",
        weights: { dubai: 3, kktc: 2 },
        why: "Dubai'de banka imzası ve vize için bir kez gelmek şart (countryContent · Dubai fitTable); KKTC'de de hesap açılışında yerinde imza isteniyor (countryContent · KKTC steps), bu yüzden ikisi de puan alıyor, Dubai daha fazlasını.",
      },
      {
        id: "uzaktan",
        label: "Hayır, her şey uzaktan olmalı",
        hint: "Kuruluşun tamamı uzaktan tamamlanan tek seçenek İngiltere.",
        icon: "laptop",
        /* NEGATİF · Dubai −3. Üç kaynak: K1 fitTable "Hiç seyahat edemeyecek
           olan → ok:false, alt: ingiltere", K3 FACTS.dubai.limit "Vize ve
           biyometri için BAE'ye gelmek gerekiyor", ve clarify'ın kesin dili
           "bu adım vekâletle yürümüyor". Kesin dil + üç kaynak = −3.
           KKTC'YE EKSİ YAZILMADI, gerekçesi NEGATİF PUAN KURALI bloğunda:
           yerinde imza bir watchout, fitTable satırı değil, ve tescil vekâletle
           yürüyor. */
        weights: { ingiltere: 4, dubai: -3 },
        why: "Hiçbir aşamasında gitmeyi gerektirmeyen tek ülke İngiltere (countryContent · İngiltere pros: “Ziyaret şartı yok”); cevap diğer ikisini fiilen elediği için ağırlık testteki en yüksek değer. Dubai eksi alıyor çünkü sayfası bu profili doğrudan reddediyor (“Hiç seyahat edemeyecekseniz → banka imzası ve vize için bir kez gelmek şart”, alt: İngiltere), yayımlanmış kısıtı da aynı şeyi söylüyor (FACTS.dubai.limit) ve clarify “bu adım vekâletle yürümüyor” diyor.",
      },
    ],
  },

  /* ------------------------------------------------------ BÖLÜM 3 · KAZANÇ
     BU PERDE BU TURDA GELDİ. Müşterinin sözü: "4. bir katagori ekleyip kazanç
     durumuyla ilgili bir kaç soru da sorabiliriz çünkü kazanca göre de
     yönlendirme yapalım dedi murat abi."

     İKİ SORU, İKİSİ DE AYNI KAYNAKTAN AMA AYNI ŞEYİ SORMUYOR. `kazanc` işin
     BUGÜNKÜ büyüklüğünü soruyor ve eşiği ilk yıl toplam maliyetinden çıkıyor;
     `gider` her yıl tekrar eden yükü soruyor ve eşiği yıllık kalemlerden.
     Ayrımın sitede karşılığı var ve site onu yüksek sesle söylüyor:
     "Kuruluş yalnızca ilk adım" (afterSetup.ts · lead). Kuruluşu kaldırabilen
     bir iş yıllık yükü kaldıramayabiliyor; testin bugüne kadar hiç sormadığı
     tek şey buydu.

     `butce` İLE FARKI: `butce` bir kereye mahsus kuruluş bütçesini soruyor,
     `gider` her yıl tekrarlayanı. Yine de ikisi pratikte korelasyonlu; teyit
     belgesine ayrı madde olarak yazıldı (B0-e). */
  {
    id: "kazanc",
    part: "kazanc",
    short: "Yıllık kazanç",
    q: "Bu iş bugün yılda ne kadar net kazandırıyor?",
    /* Yardım satırı iki şeyi netleştiriyor: ciro değil kâr, ve neden USD.
       Kur uydurmuyoruz: sitedeki bütün kuruluş ve yıllık kalemler zaten USD. */
    help: "Ciro değil, elde kalan. Rakamlar USD çünkü kuruluş ve yıllık maliyetler de USD.",
    why: "Testin bugüne kadar hiç sormadığı şey: işin ölçeği. Bandların sınırı uydurulmadı, üç ülkenin ilk yıl maliyetinden hesaplanıyor (bkz. KAZANÇ EŞİKLERİ). En alt band ayrıca sonucu değiştiriyor: orada test bir ülke önermiyor. Band 2, çünkü bu bir uygunluk değil taşıyabilirlik sorusu; eleyici 4'ler seyahat ve ekip vizesinde kalıyor.",
    /* `receipt`, yeni anahtar değil: İKON ANAHTARI · kural 3.
       ŞIK İKONU YOK: dört şık aynı ölçeğin dört derecesi (kural 2). */
    icon: "receipt",
    options: [
      {
        /* EN ALT BAND AYNI ZAMANDA KAPI. `fitErken` bu şıkka bakıyor ve sonuç
           ekranı ülke önermek yerine "henüz erken" diyor. Kimliği sabit:
           id değişirse kapı sessizce açılır. */
        id: "cok-dusuk",
        label: bantEtiket(FIT_KAZANC_ESIK, 0, "USD"),
        hint: "Bu bandda test bir ülke önermiyor.",
        weights: bantAgirlik(FIT_KAZANC_ESIK, KAZANC_ULKE, 0),
        why: `Bu bandda en ucuz yapı olan İngiltere bile (ilk yıl ${bin(FIT_YIL1.ingiltere)} USD) kazancın onda birini geçiyor; KKTC ${bin(FIT_YIL1.kktc)} ve Dubai ${bin(FIT_YIL1.dubai)} USD ile bir ve iki band uzakta, o yüzden −2 ve −3. Puanlar elle yazılmadı, bantAgirlik hesaplıyor.`,
      },
      {
        id: "dusuk",
        label: bantEtiket(FIT_KAZANC_ESIK, 1, "USD"),
        weights: bantAgirlik(FIT_KAZANC_ESIK, KAZANC_ULKE, 1),
        why: `İngiltere'nin eşiği (${bin(FIT_KAZANC_ESIK[0])} USD) bu bandın altında kaldığı için +2; KKTC'nin eşiği bandın içinde, yani sınırda ve sıfır; Dubai hâlâ bir band uzakta.`,
      },
      {
        id: "orta",
        label: bantEtiket(FIT_KAZANC_ESIK, 2, "USD"),
        weights: bantAgirlik(FIT_KAZANC_ESIK, KAZANC_ULKE, 2),
        why: `İngiltere ve KKTC'nin eşiği bu bandın altında kaldı, ikisi de +2; Dubai'nin eşiği (${bin(FIT_KAZANC_ESIK[2])} USD) bandın içinde, yani sınırda ve sıfır.`,
      },
      {
        id: "yuksek",
        label: bantEtiket(FIT_KAZANC_ESIK, 3, "USD"),
        weights: bantAgirlik(FIT_KAZANC_ESIK, KAZANC_ULKE, 3),
        why: "Bu ölçekte üçünün de eşiği geride kalıyor, yani kazanç hiçbirini elemiyor. Üç eşit artı sıralamaya hiçbir şey katmadığı için bilerek sıfır: kural bantAgirlik'te yazılı.",
      },
    ],
  },
  {
    id: "gider",
    part: "kazanc",
    short: "Yıllık gider",
    q: "Şirketin yıllık sabit giderine ne kadar ayırabilirsiniz?",
    /* Sıralamayı söylüyor ama rakamı vermiyor; `butce` sorusunun yardım satırı
       da aynı kalıpta ("Sıralama sabit: İngiltere en düşük…"). Bant sınırları
       zaten şıkların üstünde yazılı, yani ipucu cevap anahtarı olmuyor. */
    help: "Kuruluş bedeli değil, her yıl tekrar eden muhasebe ve beyan yükü. Bu kalem ülkeye göre kat kat değişiyor.",
    why: "Site bu ayrımı en yüksek sesle söylüyor: “Kuruluş yalnızca ilk adım” (afterSetup.ts · lead). Bantların sınırı üç ülkenin kendi yıllık kalemi (PRICING.annual), oran bile kullanılmıyor. Band 2-3.",
    /* `wallet`, `butce` ile aynı glif ve bu bilerek: aynı kesenin iki hâli,
       biri tek seferlik biri her yıl (İKON ANAHTARI · kural 3). */
    icon: "wallet",
    options: [
      {
        id: "dar",
        label: bantEtiket(FIT_GIDER_ESIK, 0, "USD"),
        weights: bantAgirlik(FIT_GIDER_ESIK, GIDER_ULKE, 0),
        why: `İngiltere ${bin(FIT_YILLIK.ingiltere)} ve KKTC ${bin(FIT_YILLIK.kktc)} USD ile bandın içinde kalıyor, yani sınırda ve sıfır; Dubai'nin yıllık kalemi ${bin(FIT_YILLIK.dubai)} USD (PRICING) ve bandın üstünde, o yüzden eksi. Belge teyit edilirse (FIT_DUBAI_BELGE, ${bin(FIT_DUBAI_BELGE.yillik)} USD) bu eksi derinleşir.`,
      },
      {
        id: "orta",
        label: bantEtiket(FIT_GIDER_ESIK, 1, "USD"),
        weights: bantAgirlik(FIT_GIDER_ESIK, GIDER_ULKE, 1),
        why: "İngiltere ve KKTC'nin yıllık kalemi bandın altında kaldı, ikisi de +2; Dubai bandın içinde, yani sınırda ve sıfır.",
      },
      {
        id: "genis",
        label: bantEtiket(FIT_GIDER_ESIK, 2, "USD"),
        weights: bantAgirlik(FIT_GIDER_ESIK, GIDER_ULKE, 2),
        why: "Bu bandda üçünün de yıllık yükü karşılanıyor, yani cevap kimseyi öne çıkarmıyor. Bilerek sıfır.",
      },
    ],
  },

  /* ---------------------------------------------------- BÖLÜM 4 · KISITLAR */
  {
    id: "butce",
    part: "kisit",
    short: "Bütçe",
    q: "Kuruluş bütçeniz nasıl?",
    /* Rakam YOK: brand.ts'teki fiyatlar SWAP:PRICES ile temsilî işaretli.
       Sıralama ise countryContent'te düz cümleyle yazılı ve doğrulanmış. */
    help: "Sıralama sabit: İngiltere en düşük, KKTC ortada, Dubai en yüksek kuruluş maliyetinde.",
    why: "Maliyet sıralaması üç ülkede de yazılı bir olgu, o yüzden puan doğrudan o sıralamayı izliyor. Band 1-3.",
    /* ŞIK İKONU YOK: üç şık aynı şeyin (bütçe) üç DERECESİ. Üç ayrı glif
       bulmak, aralarında olmayan bir tür farkı uydurmak olurdu; anlamı
       başlıktaki `wallet` taşıyor, dereceyi metin söylüyor. */
    icon: "wallet",
    options: [
      {
        id: "dusuk",
        label: "Mümkün olan en düşük",
        /* NEGATİF · Dubai −2. Kaynak K1: fitTable "Kuruluş bütçesi dar olan →
           ok:false, üç ülkenin en yüksek kuruluş ve yenileme maliyeti burada,
           alt: ingiltere", ayrıca watchouts "En yüksek kuruluş maliyeti".
           K3 (FACTS.limit) bu profili söylemiyor, o yüzden −3 değil −2. */
        weights: { ingiltere: 3, kktc: 2, dubai: -2 },
        why: "Tescil ve adres kalemleri Dubai'nin çok altında olduğu için pay İngiltere'de (countryContent · İngiltere pros); KKTC ikinci sırada geliyor. Dubai eksi alıyor çünkü sayfası bu profili reddediyor: “Bütçeniz darsa → üç ülkenin en yüksek kuruluş ve yenileme maliyeti burada” (fitTable, alt: İngiltere) ve aynı sayfa bunu bir watchout olarak da yazıyor.",
      },
      {
        id: "orta",
        label: "Orta",
        weights: { kktc: 2, dubai: 1 },
        why: "KKTC Dubai'nin belirgin altında, orta bütçeyle kurulabiliyor (countryContent · KKTC pros); Dubai bu bantta zorlanarak giriyor, o yüzden 1.",
      },
      {
        id: "esnek",
        label: "Doğru kurgu için esnek",
        weights: { dubai: 3 },
        why: "Üç ülkenin en yüksek kuruluş ve yenileme maliyeti Dubai'de (countryContent · Dubai watchouts); bütçe kısıt değilse bu kalem eleyici olmaktan çıkıyor.",
      },
    ],
  },
  {
    /* ······································· YENİ SORU · SWAP:FIT_WEIGHTS
       NEDEN BU SORU. Kuruluş süresi üç ülke için de YAYIMLANMIŞ bir olgu
       (brand.ts · FACTS.days) ve sitenin her yerinde aynı rakamla geçiyor;
       ziyaretçinin de en sık sorduğu şeylerden biri. Bütçe sorusuyla aynı
       kalıp: yayımlanmış bir sıralama var, puan o sıralamayı izliyor.

       DİKKAT — TAAHHÜT DEĞİL. STANCE_LIMITS "Kesin süre taahhüdü vermiyoruz"
       diyor. O yüzden hem yardım satırı hem seçenek metni "tipik" diyor ve
       hiçbir yerde "şu kadar günde kurarız" cümlesi kurulmuyor. */
    id: "sure",
    part: "kisit",
    short: "Takvim",
    q: "Şirketin ne kadar sürede kurulmuş olması gerekiyor?",
    help: "Sitedeki tipik süreler: İngiltere 3-7 gün, KKTC 5-10 gün, Dubai 7-14 gün. Kesin süre taahhüdü verilmiyor.",
    why: "Süre sıralaması üç ülkede de yayımlanmış bir olgu; puan doğrudan o sıralamayı izliyor. Band 1-3.",
    /* Bütçe sorusuyla aynı gerekçe: iki şık aynı şeyin (takvim) iki derecesi,
       o yüzden şık ikonu yok. */
    icon: "calendar",
    options: [
      {
        id: "hizli",
        label: "En kısa sürede, günler içinde",
        weights: { ingiltere: 3, kktc: 1 },
        why: "Tipik aralıklar İngiltere 3-7, KKTC 5-10, Dubai 7-14 gün (brand.ts · FACTS.days); puan doğrudan bu sıralama, KKTC ortada olduğu için 1, Dubai en uzun aralıkla sıfır alıyor.",
      },
      {
        id: "esnek",
        label: "Takvim benim için belirleyici değil",
        weights: {},
        why: "Bilerek sıfır: süre kriter değilse üç ülkenin tipik aralığı da kabul edilebilir (brand.ts · FACTS.days), yani bu cevap kimseyi öne çıkarmıyor.",
      },
    ],
  },
  {
    id: "vize",
    part: "kisit",
    short: "Oturum vizesi",
    /* "Oturum vizesi gerekiyor mu?" idi; kimin için sorulduğu belirsizdi.
       ÜÇÜNCÜ SEÇENEK BU TURDA EKLENDİ (aşağıda gerekçesi). */
    q: "Oturum vizesi de istiyor musunuz?",
    help: "Şirket kurmak İngiltere'de de KKTC'de de oturum hakkı vermiyor.",
    why: "Vize ihtiyacı varsa seçenek daralıyor; yoksa daralmıyor. Asimetrik bir soru olduğu için düşük uç 1'de tutuldu, ekip cevabı ise fiilen eleyici.",
    /* Üç şık tek bir ölçekte artıyor (kimse → ben → ben ve ekip) ve ikonlar da
       aynı aileden: `userx` → `id` → `users`. Derece sorusu olmasına rağmen
       ikon konuldu çünkü artan şey bir sayı değil KİMLİK SAYISI; glif ailesi
       bunu bir bakışta gösteriyor. */
    icon: "stamp",
    options: [
      {
        id: "hayir",
        label: "Hayır, sadece şirket",
        icon: "userx",
        weights: { ingiltere: 2, kktc: 1 },
        why: "Vize gerekmiyorsa İngiltere'nin tek gerçek kısıtı (oturum hakkı vermemesi, brand.ts · FACTS.limit) ortadan kalkıyor; KKTC de bu durumda elenmiyor.",
      },
      {
        id: "kendim",
        label: "Evet, kendim için",
        icon: "id",
        /* NEGATİF · İngiltere −2. Üç kaynak: K1 fitTable "Oturum vizesi isteyen
           → ok:false, alt: dubai", K3 FACTS.ingiltere.limit "Şirket kurmak
           oturum hakkı vermiyor", ve clarify aynı cümleyi başlık yapıyor.
           −3 değil −2 çünkü bir sonraki şık (`ekip`) aynı reddin daha ağır
           hâli ve iki şık aynı büyüklüğü taşırsa aradaki fark kaybolurdu. */
        weights: { dubai: 3, kktc: 1, ingiltere: -2 },
        why: "Ortak vizesi ve Emirates ID süreç içinde alınıyor (countryContent · Dubai fitTable); KKTC'de şirket oturum başvurusunda dayanak oluşturabiliyor ama sonucu garanti etmiyor (countryContent · KKTC faq), o yüzden 1. İngiltere eksi alıyor: sayfası bu profili açıkça reddediyor (“Oturum vizesi istiyorsanız → şirket kuruluşu oturum hakkı vermiyor”, alt: Dubai) ve aynı cümle yayımlanmış kısıtı (FACTS.ingiltere.limit).",
      },
      {
        /* YENİ SEÇENEK · SWAP:FIT_WEIGHTS
           İki seçenek bir işletmecinin gerçek sorusunu karşılamıyordu: kendisi
           için vize ile EKİBİ için vize aynı şey değil. Sitede yalnızca Dubai
           çalışan vizesinden söz ediyor ve geniş kotayı mainland yapısına
           bağlıyor; diğer iki ülkenin bu satırda hiçbir karşılığı yok.
           Ağırlık 4 çünkü cevap iki ülkeyi birden eliyor — testte ikinci
           eleyici ağırlık bu, teyit belgesine ayrıca yazıldı (A3). */
        id: "ekip",
        label: "Evet, kendim ve ekibim için",
        icon: "users",
        /* NEGATİF · İngiltere −3. `kendim` ile aynı üç kaynak, bir kademe
           yukarı: burada reddedilen şey iki kişilik değil ekip ölçeğinde ve
           Dubai bu şıkta testin en yüksek artısını (4) alıyor.
           KKTC 0 KALDI. Sitede KKTC çalışan vizesine dair TEK SATIR yok;
           clarify yalnızca şirket sahipliğinin oturum doğurmadığını söylüyor ve
           o K1/K2/K3'e girmiyor. Kaynağı olmayan eksi yazılmıyor. */
        weights: { dubai: 4, ingiltere: -3 },
        why: "Ortak ve çalışan vizesi Dubai sürecinin içinde (countryContent · Dubai pros) ve geniş vize kotası mainland yapısıyla alınıyor (countryContent · Dubai structures); İngiltere'de şirket oturum hakkı vermiyor (brand.ts · FACTS.limit) ve sayfası bu profili fitTable'da ok:false ile reddedip Dubai'ye yolluyor, o yüzden eksinin üst ucu. KKTC'de şirket sahipliği oturum doğurmuyor (countryContent · KKTC clarify) ama sitede çalışan vizesine dair hiçbir satır olmadığı için eksi değil sıfır.",
      },
    ],
  },
];

export const FIT_TOTAL = FIT_QUESTIONS.length;

/** Bir bölümdeki soruların FIT_QUESTIONS içindeki sıraları. Sol şerit ve
 *  ilerleme başlığı bunu okuyor; iki yerde ayrı ayrı filtrelemek, soru
 *  eklendiğinde birinin unutulması demekti. */
export const FIT_PART_INDEXES: Record<FitPartId, number[]> = FIT_PARTS.reduce(
  (acc, p) => {
    acc[p.id] = FIT_QUESTIONS.map((q, i) => (q.part === p.id ? i : -1)).filter((i) => i >= 0);
    return acc;
  },
  {} as Record<FitPartId, number[]>,
);

/** Soru sırası → bölümün sırası. Şeritte "şu an hangi bölümdeyiz" için. */
export function fitPartOf(index: number): { part: FitPart; order: number } {
  const id = FIT_QUESTIONS[Math.min(Math.max(index, 0), FIT_TOTAL - 1)].part;
  const order = FIT_PARTS.findIndex((p) => p.id === id);
  return { part: FIT_PARTS[order], order };
}

/* ========================================================== PUANLAMA ======= */

/** null = henüz cevaplanmadı. Dizinin uzunluğu FIT_QUESTIONS ile aynı. */
export type FitAnswers = readonly (number | null)[];

export type FitStanding = { country: Country; pts: number };

export type FitResult = {
  /** puana göre azalan; beraberlikte FIT_COUNTRIES sırası korunuyor */
  standings: FitStanding[];
  top: Country;
  runnerUp: Country;
  /** birinci ile ikinci arasındaki puan farkı */
  gap: number;
  /** fark sıfır: test bu cevaplarla birinciyle ikinciyi ayıramıyor */
  tie: boolean;
  /** en yüksek puanı kaç ülke paylaşıyor (2 veya 3 ise beraberlik) */
  tieCount: number;
  /** tek bir cevabı değiştirmek birinciyi değiştirir miydi */
  flippable: boolean;
  /** çubukların ölçeği — en yüksek puan (en az 1) */
  max: number;
  /** kazanç en alt bandda: test bir ülke önermiyor (bkz. fitErken) */
  early: boolean;
};

export const emptyFitAnswers = (): (number | null)[] => FIT_QUESTIONS.map(() => null);

/** Ham toplamlar, FIT_COUNTRIES SIRASINDA (sıralanmamış).
 *  Sonuç ekranı, fitSpread ve test sürerkenki puan paneli bunu okuyor. */
export function fitTotals(answers: FitAnswers): FitStanding[] {
  return FIT_COUNTRIES.map((country) => {
    let pts = 0;
    for (let qi = 0; qi < FIT_QUESTIONS.length; qi++) {
      const a = answers[qi];
      if (a === null || a === undefined) continue;
      pts += FIT_QUESTIONS[qi].options[a]?.weights[country] ?? 0;
    }
    return { country, pts };
  });
}

/* ==================================================== ÇUBUKLARIN ÖLÇEĞİ =====
   ÖNCEKİ TURDA GERİ GELDİ. Müşteri: "alt kısmındaki ülkelerin sürekli puan
   kazandığı sistemi geri getirebiliriz ya o dursun." Panel ülke adını, puanı
   ve çubuğu yine gösteriyor (kararın tamamı FitTest.tsx · Signal).

   ---------------------------------------------------------------------------
   BU TURDA · NEGATİF PUAN ÖLÇEĞİ KIRIYORDU, İKİ YÖNLÜ ÇUBUĞA GEÇİLDİ

   Eski çubuk `puan / FIT_CEIL` ile çiziliyordu ve ölçek sıfırdan başlıyordu.
   Negatif puan girince bu doğrudan bozuluyor: toplam eksiye düşen ülkede
   `puan / FIT_CEIL` negatif bir genişlik üretiyor, CSS onu 0'a kırpıyor ve
   çubuk yalan söylemeye başlıyor. Üç yol denendi:

     (a) SIFIRDA KIRPMA — reddedildi. −1 ile −6 ekranda aynı görünür ve puan
         DÜŞERKEN çubuk hiç oynamaz. Bu, kaldırdığımız F1 hatasının aynası:
         "sürekli puan kazanıyor" diyen bir panelde çubuğun kaybı göstermemesi.
     (b) TABAN KAYDIRMA — reddedildi. Payda (tavan − taban) olsaydı hiç cevap
         verilmemişken bile üç çubuk dolu başlardı, yani ziyaretçi tek soru
         cevaplamadan üç ülkeye puan verilmiş görürdü. Ayrıca F1'e verilen
         cevabın kendisi "ölçek sıfırdan başlar" idi.
     (c) İKİ YÖNLÜ ÇUBUK — seçildi. Rayın içinde SABİT bir sıfır çizgisi var;
         artı puan sağa, eksi puan sola doluyor. Piksel/puan iki yönde de aynı,
         yani "1 puan her yerde aynı uzunluk" sözü bozulmuyor ve eksi bir kayıp
         olarak GÖRÜNÜYOR.

   Rayın toplam açıklığı FIT_FLOOR ile FIT_CEIL arası; sıfır çizgisi
   FIT_ZERO oranında duruyor. Üçü de aşağıda hesaplanıyor, elle yazılmıyor.

   PAYDA DEĞİŞTİ, ÇÜNKÜ ESKİ PAYDA ÖLÇÜMLE ÇÜRÜDÜ (aşağıdaki F1).
   Eski çubuk `puan / o anki en yüksek puan` ile çiziliyordu. İki ayrı kusuru
   vardı ve ikisi de sayıyla gösterildi:

     1. AYNI 1 PUAN HER YERDE FARKLI UZUNLUKTAYDI. 1400 px'de ölçülen ray
        499,7 px. Payda "o anki en yüksek puan" olunca 1 puanlık fark
        2'ye 1'de 249,8 px, 9'a 8'de 55,5 px görünüyordu: aynı olgu için
        4,5 kat fark. Sabit paydayla 1 puan HER ZAMAN 499,7/26 = 19,2 px;
        ekranda doğrulandı, 9 puan ile 10 puanın dolgu farkı 19,05 px.
        (Bu üç sayı önce 485 / 242 / 18,7 yazılmıştı; ölçüm yeniden
        alınınca tutmadı, ray gerçekte 499,7 px çıkıyor.)
     2. ÇUBUK, PUAN ARTMADAN GERİ GİDEBİLİYORDU. Dubai 3 · İngiltere 1 iken
        Dubai çubuğu %100'dü; İngiltere 4'e çıkınca Dubai'nin puanı hiç
        değişmediği hâlde çubuğu %75'e DÜŞÜYORDU. "Sürekli puan kazanıyor"
        diyen bir panelde çubuğun geri gitmesi doğrudan yanlış bilgi.

   Sabit payda ikisini de kapatıyor: çubuk yalnızca puan arttıkça uzuyor ve
   1 puan her zaman aynı piksel. Karşılığı, hiçbir çubuğun asla tam dolmaması;
   kabul edildi, çünkü dolu bir çubuk zaten "birinci" demenin gizli hâliydi. */

/** Çubuk ölçeğinin üst ucu: TEK BİR ÜLKENİN toplayabileceği en yüksek puan.
 *  Payda üçünde de aynı olmalı (ülke başına ayrı ölçek satırları
 *  karşılaştırılamaz hâle getirirdi), o yüzden en yükseği alınıyor. Elle
 *  yazılmıyor, ağırlık değişince kendiliğinden güncelleniyor. */
export const FIT_CEIL: number = Math.max(
  ...FIT_COUNTRIES.map((c) =>
    FIT_QUESTIONS.reduce((sum, q) => sum + Math.max(...q.options.map((o) => o.weights[c] ?? 0)), 0),
  ),
);

/** Ölçeğin alt ucu: bir ülkenin düşebileceği EN DÜŞÜK toplam (negatif ya da 0).
 *  Aynı gerekçeyle üç satırda da aynı, yani en derini alınıyor. */
export const FIT_FLOOR: number = Math.min(
  0,
  ...FIT_COUNTRIES.map((c) =>
    FIT_QUESTIONS.reduce((sum, q) => sum + Math.min(...q.options.map((o) => o.weights[c] ?? 0)), 0),
  ),
);

/** Rayın toplam açıklığı, puan cinsinden. Piksel/puan bundan çıkıyor. */
export const FIT_SPAN: number = FIT_CEIL - FIT_FLOOR;

/** Sıfır çizgisinin raydaki yeri, 0..1. CSS'e oran olarak gidiyor. */
export const FIT_ZERO: number = -FIT_FLOOR / FIT_SPAN;

/** Bir puanın raydaki payı, 0..1 (işaretli). Çubuk bunun mutlak değeri kadar
 *  uzuyor, yönünü işareti veriyor. TEK YERDEN okunuyor ki panel ile sonuç
 *  ekranı aynı ölçeği paylaşsın ve "eşit puan eşit piksel" iki ekranda da
 *  geçerli kalsın. */
export const fitBarPay = (pts: number): number => pts / FIT_SPAN;

/* ============================================ TEST SÜRERKEN NE GÖSTERİLİYOR =
   MÜŞTERİNİN SORUSU (geçen tur): "altta şuan hangi ülkeye daha yakınsın gibi
   bir kısım koymak zekice ama doğru mu olur emin olamadım, sadece sonda
   göstermek mi daha mantıklı?"

   O TURUN CEVABI paneli kimliksizleştirmekti; ölçümler aşağıda DURUYOR çünkü
   hâlâ geçerli olgular. BU TURDA MÜŞTERİ PANELİ GERİ İSTEDİ ve bunu bilerek
   istedi ("murat abi istemezse kaldırırız"). Ölçümler bir yasak değil bir
   fiyat listesi: hangi kusuru geri aldığımız aşağıda tek tek yazılı, biri
   hariç. F2 bir TERCİH DEĞİL HATAYDI ve geri gelmedi (F2'nin altına bakın).

   ÖLÇÜM 1 · "sıralamıyoruz" iddiası boştu.
   Eski panel üç ülkeyi sabit sırada tutuyor ve "burada bir birinci ilan
   edilmiyor" yazıyordu, ama çubuklar lideri ele veriyordu. 1400 px'de ölçüldü
   (iframe içi, getBoundingClientRect):
     · Q1'de "Türkiye" işaretlenince KKTC çubuğu 520,1 px (tam dolu),
       İngiltere 167,7 px, Dubai 0 px. Aradaki fark 352,4 PİKSEL.
     · Beş cevapta Dubai 9 / İngiltere 8 iken 515,3 px'e karşı 444,2 px,
       yani TEK PUANLIK fark 71,1 piksel olarak okunuyordu.
   Göz iki çubuk arasındaki 1-2 piksellik farkı zaten ayırt ediyor; 71 piksel
   onun kırk katı. Yani panel her cevapta bir birinci ilan ediyordu.

   ÖLÇÜM 1b (F2) · üstelik yanlış birinciyi ilan ediyordu.
   Çubuk kabı satır ızgarasının minmax(0,1fr) sütunu ve ülke adı sütunu auto:
   "İngiltere" kelimesi "Dubai"den 15,4 px geniş olduğu için İngiltere'nin RAY
   GENİŞLİĞİ 15,5 px dar. TAM BERABERLİKTE üç ayrı ölçümde (2-2, 4-4, 7-7)
   Dubai'nin çubuğu İngiltere'ninkinden 15,5 px UZUN çıktı. Puanlar eşitken
   çubuk Dubai'yi önde gösteriyordu ve bu 10.368 kombinasyonun %7,3'ünde
   (ilk cevaptan sonra %25,0'inde) gerçekleşen bir durum.

   F2 GERİ GELMEDİ. Panel dönerken tek kural buydu: eşit puan eşit piksel.
   Sebep bir tercih değil bir yerleşim kazasıydı — her satır KENDİ ızgarası
   olduğu için ad sütunu satırdan satıra farklı genişlikte oturuyor ve 1fr'lik
   çubuk rayı ondan artan yeri alıyordu. Yeni panelde satırlar ARTIK KENDİ
   IZGARALARI DEĞİL: liste tek bir ızgara, satırlar `grid-template-columns:
   subgrid` ile onun sütunlarını paylaşıyor. Ad sütunu üç satırda da
   "İngiltere" genişliğinde, puan sütunu üç satırda da en uzun pulun
   genişliğinde, yani ray üçünde de aynı. Ölçüldü (fittest.css · TALLY):
   aynı üç beraberlikte fark 15,5 / 15,4 / 15,5 px yerine 0,00 / 0,00 / 0,00.

   HATANIN BÜYÜKLÜĞÜ SONDA DEĞİL YOLDA. Panel test SÜRERKEN ekranda, yani
   önemli olan ara durumlardaki beraberlik oranı. Tepede beraberlik, k cevap
   verilmişken (10.368 kombinasyonun tamamı üzerinden sayıldı):
     k=1 %25,0 · k=2 %18,8 · k=3 %16,7 · k=4 %14,6 · k=5 %12,8
     k=6 %9,0 · k=7 %8,7 · k=8 %7,9 · k=9 %7,3
   Yani F2 en çok, panelin en çok bakıldığı yerde — ilk cevaplarda — yanlış
   söylüyordu. Geri getirilmemesinin sebebi bu.

   ÖLÇÜM 2 · erken lider yanıltıyor.
   Her kombinasyon için "k cevaptan sonra önde görünen ülke, nihai birinci mi":
     k=1 %48,7 · k=2 %54,4 · k=3 %56,0 · k=4 %59,0 · k=5 %64,9
     k=6 %77,1 · k=7 %82,5 · k=8 %79,5
   Yani anketin ilk yarısında görünen lider yazı-turadan iyi değil. Ayrıca
   kombinasyonların yalnızca %27,5'inde lider ilk cevaptan sona kadar hiç
   değişmiyor: %72,5'inde ziyaretçi en az bir kez "önde olan" ülkenin
   değiştiğini görüyordu.

   ÖLÇÜM 3 · sızan şey Dubai eğilimi değil, KKTC yanılgısı.
   İlk cevaptan sonra görünen lider dağılımı ile nihai dağılım:
     Dubai      %50,0 → %54,4   (fark küçük, eğilim zaten baştan görünüyor)
     İngiltere  %25,0 → %43,3
     KKTC       %25,0 → %2,3    ← ON BİR KAT abartı
   Erken panelin asıl zararı Dubai'yi sızdırmak değil: ziyaretçilerin dörtte
   birine ilk soruda KKTC'yi lider gösterip sonunda %2,3'e düşürmek. "Test
   bana KKTC dedi sonra geri aldı" cümlesi buradan çıkıyordu.

   BU TURUN NOTU · YUKARIDAKİ ÜÇ ÖLÇÜM 9 SORULUK EVRENDE ALINDI (10.368
   kombinasyon) VE TARİHÎ KAYIT OLARAK DURUYOR. Dördüncü perde ve negatif puanla
   birlikte evren 124.416'ya çıktı; nihai dağılım yeniden ölçüldü:
     Dubai %54,4 → %33,9 · İngiltere %43,3 → %62,0 · KKTC %2,3 → %4,1
   ÖLÇÜM 3'ün taşıdığı uyarı DEĞİŞMEDİ, hatta yönü tersine döndü: ilk cevapta
   panel hâlâ dörtte bir ihtimalle KKTC'yi lider gösteriyor ve KKTC nihai
   dağılımda %4,1'de kalıyor, yani abartı on bir kattan altı kata indi ama
   sürüyor. F3/F4'e verilen cevap (uyarıyı ekrana yazmak) aynen geçerli.

   F3 VE F4 GERİ GELDİ, AMA SESSİZ DEĞİL. Panel yine bir lider gösteriyor,
   yani "ilk cevaptaki lider nihai birinciyi %48,7 tutturuyor" ve "KKTC ilk
   cevapta %25 lider görünüp %2,3'e düşüyor" olguları yeniden geçerli. İkisi
   de ekranda YAZILI: seviye cümlesi kalan soruların sıralamayı çevirip
   çeviremeyeceğini söylüyor, panelin altındaki not da ilk cevaplarda öne
   geçen ülkenin sonda çoğu zaman değiştiğini yazıyor. Ölçümü gizlemek yerine
   ziyaretçiye söylemek, müşterinin isteğini yerine getirmenin dürüst yolu.

   ELENEN SEÇENEK (geçen tur) · "hiçbir şey gösterme, sadece sonda".
   Müşterinin ikinci şıkkı. O turda da elenmişti: panelin taşıdığı tek yanlış
   bilgi KİMLİKTİ; hareketin ve geri bildirimin kendisi doğru çalışıyordu.
   Kimliği atınca geriye kalan sinyal ölçülebilir biçimde canlı: ardışık iki
   cevap arasında ayrışma seviyesi %46,5 oranında değişiyor, cevabın puan
   dağıtıp dağıtmadığı %77,3 oranında değişiyor, sayaç ise her cevapta
   değişiyor. O sinyal panelde DURUYOR; puan tablosu onun üstüne eklendi.

   SEVİYENİN NEYİ ÖLÇTÜĞÜ · İLK TANIM DENENDİ VE ATILDI.
   Önce "fark / en yüksek puan" oranı denenmişti. Ölçüm elettirdi: ilk cevaptan
   sonra o oran kombinasyonların %75'inde 0,40'ın üstünde çıkıyor, yani ekrandaki
   üç kademe DOKUZ SORUNUN BİRİNCİSİNDE dolup sonra geri iniyordu. "Bir cevapla
   iş bitti" demenin gösterge hâli; kaldırdığımız hükmü başka bir kılıkta geri
   getiriyordu (geri gidiş oranı ölçüldü, adımların %14,3'ü).

   Yerine geçen tanım kalan soruları da hesaba katıyor:
     gap = birinci − ikinci
     R   = CEVAPLANMAMIŞ soruların iki ülke arasındaki farkı en çok ne kadar
           oynatabileceğinin toplamı (soru başına D, aşağıda)
     r   = gap / (gap + R)
   Yani gösterge "önde olan ne kadar önde" değil, "KALAN SORULAR BU FARKI HÂLÂ
   ÇEVİREBİLİR Mİ" diyor. Ölçülen davranışı doğru: ortalama r, k=1'de 0,062'den
   k=8'de 0,435'e monoton yükseliyor ve adımların yalnızca %7,3'ü geriye
   gidiyor. Seviye ardışık iki cevap arasında %37,4 oranında değişiyor.

   Dağılım BU TURDA YENİDEN ÖLÇÜLDÜ (124.416 kombinasyon, k = cevap sayısı;
   parantez içindekiler eski 9 soruluk evrenin sayıları):
     k | eşit(L0)      | kilitli(L3)   | ort r
     1 |  %25,0 (25,0) |  %0,0  (0,0)  | 0,035 (0,062)
     4 |  %14,6 (14,6) |  %0,0  (0,0)  | 0,058 (0,098)
     6 |   %5,9  (9,0) |  %0,0  (0,5)  | 0,172 (0,236)
     8 |   %6,3  (7,9) |  %1,8 (39,7)  | 0,247 (0,435)
    10 |   %4,7    (—) | %40,0    (—)  | 0,427 (—)
   İKİ ŞEY DEĞİŞTİ VE İKİSİ DE BEKLENEN YÖNDE. Ortalama r her k'da düştü,
   çünkü kalan soruların toplam salınımı (R) 29'dan 52'ye çıktı: aynı fark artık
   daha az "kesin" sayılıyor. Kilitlenme de geriye kaydı, k=8'de %39,7 iken %1,8.
   Yani seviye göstergesi artık daha geç ve daha temkinli doluyor; on birinci
   cevaba kadar "kalan sorular çevirebilir" demeye devam ediyor ve bu doğru.

   L3 (kilitli) bilerek MATEMATİKSEL bir hâl, eşik değil: gap > R ise kalan
   soruların hepsi en aleyhte cevaplansa bile sıra dönmüyor. Testin sonuç
   ekranındaki `flippable` cümlesiyle aynı hesap, yarı yolda söylenmiş hâli. */

/** Her sorunun İKİ ÜLKE ARASINDAKİ FARKI en çok ne kadar oynatabileceği.
 *  Ölçülen değerler bu turda değişti çünkü negatif puan salınımı büyütüyor:
 *  bir şık bir ülkeye +3, ötekine −3 veriyorsa aradaki farkı 6 oynatıyor.
 *    eski (9 soru, negatifsiz)  3·3·3·3·3·4·3·3·4          toplam 29
 *    yeni (11 soru, negatifli)  5·3·6·5·5·7·4·2·5·3·7      toplam 52
 *  Elle yazılmıyor, ağırlık değişince kendiliğinden güncelleniyor. */
const FIT_SWING: readonly number[] = FIT_QUESTIONS.map((q) =>
  Math.max(
    ...q.options.map((o) => {
      const w = FIT_COUNTRIES.map((c) => o.weights[c] ?? 0);
      return Math.max(...w) - Math.min(...w);
    }),
  ),
);

export type FitSpread = {
  /** 0 = ayrım yok · 1 = çok dar · 2 = belirgin ama dönebilir · 3 = kilitli */
  level: 0 | 1 | 2 | 3;
  /** gap / (gap + R). Ekranda YAZILMIYOR, seviyeyi o üretiyor. */
  ratio: number;
};

/** Cevapların üç ülkeyi ne kadar ayırdığı ve kalan soruların bunu çevirip
 *  çeviremeyeceği. KİMLİK TAŞIMIYOR: hangi ülkenin önde olduğu bu değerden
 *  çıkarılamaz. */
export function fitSpread(answers: FitAnswers): FitSpread {
  const pts = fitTotals(answers)
    .map((t) => t.pts)
    .sort((a, b) => b - a);
  const gap = pts[0] - pts[1];

  let rest = 0;
  for (let qi = 0; qi < FIT_QUESTIONS.length; qi++) {
    const a = answers[qi];
    if (a === null || a === undefined) rest += FIT_SWING[qi];
  }

  const ratio = gap + rest === 0 ? 1 : gap / (gap + rest);
  const level = gap === 0 ? 0 : gap > rest ? 3 : ratio < 0.25 ? 1 : 2;
  return { level, ratio };
}

/** Tek bir cevabın tabloyu NE KADAR OYNATTIĞI (kime gittiği değil).
 *
 *  TOPLAM DEĞİL MUTLAK TOPLAM, VE BU BU TURDA DEĞİŞTİ. Eskiden ağırlıkların
 *  düz toplamıydı; negatif puan girince o hesap yalan söylemeye başladı:
 *  `kanal · kart` (+3 +3 −3) düz toplamda 3, ama `ziyaret · uzaktan` (+4 −3)
 *  düz toplamda 1 ve teorik olarak bir şık toplamda tam 0 verip "bu cevap puan
 *  getirmedi" yazdırabilirdi, oysa üç ülkenin puanı da değişmiş olurdu.
 *  İmza korundu (lab'daki iki aday da bu fonksiyonu çağırıyor); değişen tek şey
 *  sıfırın artık gerçekten "hiçbir şey olmadı" demesi. */
export function fitAnswerWeight(qi: number, oi: number | null): number {
  if (oi === null || oi === undefined) return -1;
  const w = FIT_QUESTIONS[qi]?.options[oi]?.weights;
  if (!w) return -1;
  return FIT_COUNTRIES.reduce((sum, c) => sum + Math.abs(w[c] ?? 0), 0);
}

/** Aynı cevabın YÖNÜ. Panel artık üç değil dört cümle kuruyor, çünkü negatif
 *  puanla birlikte "puan getirdi" ile "bir ülkeyi geriye itti" ayrı iki olay.
 *  Bunu fitAnswerWeight'in dönüş değerinden çıkarmak mümkün değil, o yüzden
 *  ayrı fonksiyon; eski imzayı bozmamanın da yolu buydu. */
export type FitAnswerEffect = "cevapsiz" | "notr" | "arti" | "eksi";

export function fitAnswerEffect(qi: number, oi: number | null): FitAnswerEffect {
  if (oi === null || oi === undefined) return "cevapsiz";
  const w = FIT_QUESTIONS[qi]?.options[oi]?.weights;
  if (!w) return "cevapsiz";
  const vals = FIT_COUNTRIES.map((c) => w[c] ?? 0);
  if (vals.some((n) => n < 0)) return "eksi";
  if (vals.some((n) => n !== 0)) return "arti";
  return "notr";
}

/* ============================================ DÖRDÜNCÜ SONUÇ · "HENÜZ ERKEN" =
   MÜŞTERİNİN SÖZÜ: "kazanç konusunda gerçekten çok düşükse ve bize uygun
   olmayan firmalar fln varsa onlara direkt testin sonunda dürüst bir şekilde
   'sen henüz hazır değilsin türkiyede kal' diyebiliriz, samimi bir tavsiye
   tonunda."

   KAPI TEK BİR CEVABA BAĞLI, BİLEŞİK BİR SKORA DEĞİL. Üç sebep:
     1. Eşiğin kendisi bir hesap (KAZANÇ EŞİKLERİ · adım 2) ve o hesap tek bir
        sayıyla ilgili: yıllık net kazanç. Araya başka cevaplar karıştırmak,
        savunulabilir tek sayıyı savunulamaz bir formüle çevirirdi.
     2. Ziyaretçi HANGİ cevabın bu sonucu doğurduğunu görebilmeli. Sonuç
        ekranındaki döküm o satırı gösteriyor ve tek tıkla değiştirilebiliyor.
     3. Geri alınabilir olmalı. Bileşik bir eşikte ziyaretçi neyi değiştirirse
        sonucun döneceğini bilemez.

   NEDEN EN ALT BAND VE BAŞKA BİR ŞEY DEĞİL: o bandda üçünün EN UCUZU bile
   (İngiltere, ilk yıl 1.900 USD) kazancın onda birini geçiyor ve karşılığında
   sitenin kendi sayfası bir vergi avantajı da vaat etmiyor ("Vergi avantajı
   için gelen yanlış adreste", countryContent · İngiltere clarify). Yani bu
   bandda "kurma" demek bir satış kaybı değil, doğru cevap. */

/** Kazanç sorusunun FIT_QUESTIONS içindeki sırası. Id'den bulunuyor: soru
 *  eklenince sıra kayar ve elle yazılmış bir indeks sessizce yanlış soruya
 *  bakmaya başlar. */
export const FIT_KAZANC_QI: number = FIT_QUESTIONS.findIndex((q) => q.id === "kazanc");

/** Kapıyı açan şıkkın sırası. Yine id'den; şık eklenirse kaymasın diye. */
export const FIT_ERKEN_OI: number = FIT_QUESTIONS[FIT_KAZANC_QI].options.findIndex(
  (o) => o.id === "cok-dusuk",
);

/** Kazanç en alt bandda mı. Cevap verilmemişse false: cevaplanmamış bir soru
 *  hüküm doğurmaz. */
export function fitErken(answers: FitAnswers): boolean {
  return answers[FIT_KAZANC_QI] === FIT_ERKEN_OI;
}

/** "Henüz erken" ekranının dayandığı iki sayı, tek yerden. Ekranda basılıyor;
 *  ikisi de hesaptan geliyor, elle yazılmıyor. */
export const FIT_ERKEN_ESIK = FIT_KAZANC_ESIK[0];
export const FIT_ERKEN_UCUZ: { country: Country; yil1: number } = FIT_COUNTRIES.map((c) => ({
  country: c,
  yil1: FIT_YIL1[c],
})).sort((a, b) => a.yil1 - b.yil1)[0];

/* BERABERLİK — sessiz bir tercih, bilerek açıkta bırakıldı.
   Array.prototype.sort kararlı olduğu için eşit puanda FIT_COUNTRIES sırası
   korunuyor, yani beraberliği hep Dubai kazanıyor. Bu davranış bileşenin eski
   hâlinde de vardı ve DEĞİŞTİRİLMEDİ; tek fark artık gizlenmiyor — `tie`
   alanı sonuç ekranında "tam eşit" cümlesini kurduruyor, böylece sıralama
   bir hüküm gibi okunmuyor. Farklı bir beraberlik kuralı isteniyorsa
   (örneğin en pahalıyı değil en ucuzu öne almak) karar firmanın. */
function rank(answers: FitAnswers): FitStanding[] {
  return fitTotals(answers).sort((a, b) => b.pts - a.pts);
}

export function scoreFit(answers: FitAnswers): FitResult {
  const standings = rank(answers);
  const top = standings[0].country;
  const gap = standings[0].pts - standings[1].pts;

  /* "Tek bir cevabınızı değiştirseniz sıra değişebilirdi" cümlesi tahmin
     değil, hesap: her soruda her alternatif seçenek tek tek denenip birinci
     hâlâ aynı mı diye bakılıyor. On bir soru × en çok dört seçenek, yani en
     kötü ihtimalle yirmi iki yeniden toplama; ölçüsü belli, önbelleğe gerek
     yok. */
  let flippable = false;
  outer: for (let qi = 0; qi < FIT_QUESTIONS.length; qi++) {
    for (let oi = 0; oi < FIT_QUESTIONS[qi].options.length; oi++) {
      if (answers[qi] === oi) continue;
      const trial = answers.slice();
      trial[qi] = oi;
      if (rank(trial)[0].country !== top) {
        flippable = true;
        break outer;
      }
    }
  }

  return {
    standings,
    top,
    runnerUp: standings[1].country,
    gap,
    tie: gap === 0,
    /* Üçlü beraberlik teorik değil, gerçekten çıkıyor. Sonuç ekranının bunu
       "Dubai öne çıkıyor" diye geçiştirmemesi için kaç ülkenin eşit olduğu
       ayrıca sayılıyor. */
    tieCount: standings.filter((s) => s.pts === standings[0].pts).length,
    flippable,
    max: Math.max(1, standings[0].pts),
    early: fitErken(answers),
  };
}

/* ============================================== SONUCUN ÜLKE CÜMLESİ ======
   Sonuç ekranındaki ülke anlatımı BURADA YAZILMIYOR. Ülke sayfalarının giriş
   cümlesi (countryContent.intro) ve o ülkenin dürüst kısıtı (brand.ts ·
   FACTS.limit) aynen kullanılıyor. Sebebi tek: aynı iddianın iki yerde iki
   farklı cümleyle durması, birini güncelleyip ötekini unutmanın kısa yolu —
   ve test o zaman ülke sayfasının söylemediği bir şey söylemeye başlar.
   Her intro zaten iki taraflı: bir cümle avantaj, bir cümle karşılığı. */
export function fitBlurb(c: Country): { intro: string; limit: string } {
  return { intro: COUNTRY_CONTENT[c].intro, limit: FACTS[c].limit };
}
