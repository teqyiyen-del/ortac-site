import { FACTS } from "@/lib/brand";
import { COUNTRY_CONTENT } from "@/lib/countryContent";
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

   BU TURDA NE OLDU. Soru sayısı beşten dokuza çıktı (müşterinin isteği:
   "gerçek bir anket gibi hissettirsin"). ESKİ BEŞ SORUNUN AĞIRLIKLARINA
   DOKUNULMADI, tek istisna `vize` sorusuna eklenen üçüncü seçenek. Dört yeni
   soru geldi ve her yeni ağırlığın gerekçesi kendi `why` alanında, dayandığı
   dosya parantez içinde yazılı. Gerekçesi olmayan ağırlık gözden geçirilemez.

   YENİ SORULARIN SONUCA ETKİSİ ÖLÇÜLDÜ, docs/uygunluk-testi-teyit.md'de.
   Kısası: dört yeni sorunun dördü de sitenin "küresel erişim" iddialarından
   türüyor (tahsilat matrisi, platform kabulü, banka erişimi, kuruluş süresi)
   ve sitenin kendi metinlerinde KKTC bu üç başlıkta da sıfır alıyor. Yani
   anketi derinleştirmek KKTC'nin açığını KAPATMIYOR, büyütüyor. Bu bir
   uygulama hatası değil, sitenin içeriğinin söylediği şey; ama tam olarak bu
   yüzden teyit gerekiyor (teyit belgesi · A2).

   Gözden geçirirken bakılacak üç şey:
     1. Bir seçeneğin puanı doğru ülkeye mi gidiyor?
     2. Puanların BÜYÜKLÜĞÜ doğru mu? 3 ile 1 arasındaki fark, o seçeneğin
        gerçekten üç kat daha belirleyici olduğunu söylüyor.
     3. Sıfır alan ülke gerçekten elenmeli mi? Yazılmayan ağırlık 0 demek.

   ---------------------------------------------------------------------------
   TESTİN NE OLDUĞU

   Kısa liste aracı, danışmanlık değil. Sonuç ekranı bunu saklamıyor: ikinci
   sırayı ve aradaki farkı gösteriyor, fark küçükse söylüyor, tek bir cevabın
   sıralamayı çevirebileceği durumda bunu da yazıyor (bkz. scoreFit).
   ========================================================================= */

/** Puanlamaya giren ülkeler ve BERABERLİK SIRASI — aşağıdaki nota bakın. */
export const FIT_COUNTRIES: readonly Country[] = ["dubai", "ingiltere", "kktc"];

/** Bir seçeneğin dağıttığı puanlar. Yazılmayan ülke 0 alır. */
export type FitWeights = Partial<Record<Country, number>>;

export type FitOption = {
  id: string;
  label: string;
  /** Ziyaretçiye gösterilen ipucu. YALNIZCA depoda doğrulanmış olgu. */
  hint?: string;
  weights: FitWeights;
  /** SWAP:FIT_WEIGHTS — ağırlığın gerekçesi. Gözden geçirme bu satırdan yürür. */
  why: string;
};

/* BÖLÜMLER — anketin üç perdesi.
   Soru sayısı dokuza çıkınca düz bir liste "ne kadar kaldı" sorusunu
   cevaplayamaz hâle geldi: dokuz eşit ağırlıklı adım, bitmeyen bir form gibi
   okunuyor. Bölüm başlığı ziyaretçiye NEREDE olduğunu söylüyor ve her bölüm
   kendi içinde bir cümle kuruyor. Ekranın sol şeridi bu diziden basılıyor. */
export type FitPartId = "is" | "erisim" | "kisit";

export type FitPart = {
  id: FitPartId;
  title: string;
  /** Bölümün tek satırlık konusu. Sol şeritte ve mobil başlıkta çıkıyor. */
  line: string;
};

export const FIT_PARTS: readonly FitPart[] = [
  { id: "is", title: "İşiniz", line: "Kime satıyorsunuz, ne satıyorsunuz, parayı nasıl alıyorsunuz." },
  { id: "erisim", title: "Erişim", line: "Şirketin dünyaya bağlandığı yer: platform, banka, seyahat." },
  { id: "kisit", title: "Kısıtlar", line: "Bütçe, takvim ve vize. Cevabı en çok daraltan bölüm." },
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
  options: FitOption[];
};

/* ============================================================ SORULAR ======
   Dokuz soru, üç bölüm. Beşten dokuza çıkarken tek kural vardı: SORU SİTEDE
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
    options: [
      {
        id: "avrupa",
        /* "Avrupa / İngiltere" idi. Eğik çizgi "veya" gibi okunuyordu, oysa
           kastedilen ikisi birden. */
        label: "Avrupa ve İngiltere",
        weights: { ingiltere: 3, dubai: 1 },
        why: "Ltd yapısı AB müşterisinde ve platformlarda kabul gördüğü için pay İngiltere'de (countryContent · İngiltere fitTable); Dubai bu profilde çalışıyor ama ek sürtünme yarattığı için 1'de kalıyor.",
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
    options: [
      {
        id: "yazilim",
        label: "Yazılım ve dijital hizmet",
        weights: { dubai: 2, ingiltere: 2 },
        why: "Dijital hizmette belirleyici olan tahsilat; Stripe ve PayPal iki ülkede de çalıştığı için (brand.ts · PAY_MATRIX) pay eşit bölünüyor.",
      },
      {
        id: "eticaret",
        /* Eğik çizgi gitti; iki kalem de aynı kutuda kalıyor çünkü ikisini de
           belirleyen şey kartla tahsilat ve lojistik. */
        label: "E-ticaret veya fiziksel ürün",
        weights: { dubai: 3, kktc: 1 },
        why: "Kartla tahsilat ve lojistik tarafı Dubai'de sorunsuz kuruluyor (countryContent · Dubai fitTable); KKTC bölgesel ticarette çalışıyor ama Stripe desteklemediği için 1'de kalıyor.",
      },
      {
        id: "danismanlik",
        label: "Danışmanlık",
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
    options: [
      {
        id: "kart",
        label: "Kartla, site veya uygulama üzerinden",
        hint: "Stripe, PayPal, wamo",
        weights: { dubai: 3, ingiltere: 3 },
        why: "Stripe ve PayPal iki ülkede de çalışıyor, KKTC'de çalışmıyor (brand.ts · PAY_MATRIX · Tahsilat); KKTC sayfası bunu “Ana kısıt bu” diye yazdığı için payı yok.",
      },
      {
        id: "havale",
        label: "Havale ve fatura ile",
        hint: "Hesaptan hesaba, kart yok",
        weights: { kktc: 2 },
        why: "Ayrımı KKTC sayfası birebir yapıyor: kart tahsilatı ana kanal değilse “bölgesel ticaret ve hizmet işlerinde maliyet avantajı gerçek” (countryContent · KKTC faq). Dubai ve İngiltere bu cevapta ayrıca öne çıkmıyor, çünkü yerel banka üçünde de var (brand.ts · PAY_MATRIX).",
      },
      {
        id: "belirsiz",
        label: "Henüz netleşmedi",
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
    options: [
      {
        id: "evet",
        label: "Evet, satışın önemli bölümü oradan gelecek",
        weights: { ingiltere: 3, dubai: 2 },
        why: "Ltd yapısı Avrupa'daki müşteri ve platformlarda sorunsuz kabul görüyor (countryContent · İngiltere pros); aynı satış KKTC'de “hesap açılışında sık sık reddedilirsiniz” diye işaretli ve sayfa oradan Dubai'ye yolluyor (countryContent · KKTC fitTable), Dubai payını buradan alıyor.",
      },
      {
        id: "hayir",
        label: "Hayır, doğrudan satıyorum",
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
    options: [
      {
        id: "kurumsal",
        label: "Bankada kurumsal hesap",
        hint: "Wio Business, Mashreq NeoBiz",
        weights: { dubai: 3 },
        why: "Wio ve Mashreq NeoBiz yalnızca BAE sütununda çalışıyor (brand.ts · PAY_MATRIX · Banka hesabı) ve Dubai sayfası banka tarafını açık avantaj sayıyor (countryContent · Dubai pros); İngiltere'de geleneksel bankada yerleşik olmayan ortağın onay oranı düşük (countryContent · İngiltere clarify). KKTC'de yerel banka var (brand.ts · PAY_MATRIX) ama açılış yerinde imza istiyor (countryContent · KKTC watchouts) ve o şartı `ziyaret` sorusu zaten ölçüyor; aynı olguyu iki kez saymamak için burada puan verilmiyor.",
      },
      {
        id: "odeme",
        label: "Ödeme kuruluşu hesabı yeterli",
        hint: "Wise, Payoneer",
        weights: { ingiltere: 3, dubai: 2 },
        why: "İngiltere sayfası pratikte ödeme kuruluşu hesabıyla başlandığını yazıyor (countryContent · İngiltere clarify); Wise ve Payoneer iki ülkede de çalışıyor, KKTC'de çalışmıyor (brand.ts · PAY_MATRIX · Ödeme kuruluşu).",
      },
      {
        id: "yerel",
        label: "Yerel bankada hesap yeter",
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
    options: [
      {
        id: "gidebilirim",
        label: "Evet, bir kez gidebilirim",
        hint: "Banka ve vize tarafını açar.",
        weights: { dubai: 3, kktc: 2 },
        why: "Dubai'de banka imzası ve vize için bir kez gelmek şart (countryContent · Dubai fitTable); KKTC'de de hesap açılışında yerinde imza isteniyor (countryContent · KKTC steps), bu yüzden ikisi de puan alıyor, Dubai daha fazlasını.",
      },
      {
        id: "uzaktan",
        label: "Hayır, her şey uzaktan olmalı",
        hint: "Kuruluşun tamamı uzaktan tamamlanan tek seçenek İngiltere.",
        weights: { ingiltere: 4 },
        why: "Hiçbir aşamasında gitmeyi gerektirmeyen tek ülke İngiltere (countryContent · İngiltere pros: “Ziyaret şartı yok”); cevap diğer ikisini fiilen elediği için ağırlık testteki en yüksek değer.",
      },
    ],
  },

  /* ---------------------------------------------------- BÖLÜM 3 · KISITLAR */
  {
    id: "butce",
    part: "kisit",
    short: "Bütçe",
    q: "Kuruluş bütçeniz nasıl?",
    /* Rakam YOK: brand.ts'teki fiyatlar SWAP:PRICES ile temsilî işaretli.
       Sıralama ise countryContent'te düz cümleyle yazılı ve doğrulanmış. */
    help: "Sıralama sabit: İngiltere en düşük, KKTC ortada, Dubai en yüksek kuruluş maliyetinde.",
    why: "Maliyet sıralaması üç ülkede de yazılı bir olgu, o yüzden puan doğrudan o sıralamayı izliyor. Band 1-3.",
    options: [
      {
        id: "dusuk",
        label: "Mümkün olan en düşük",
        weights: { ingiltere: 3, kktc: 2 },
        why: "Tescil ve adres kalemleri Dubai'nin çok altında olduğu için pay İngiltere'de (countryContent · İngiltere pros); KKTC ikinci sırada geliyor.",
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
    options: [
      {
        id: "hayir",
        label: "Hayır, sadece şirket",
        weights: { ingiltere: 2, kktc: 1 },
        why: "Vize gerekmiyorsa İngiltere'nin tek gerçek kısıtı (oturum hakkı vermemesi, brand.ts · FACTS.limit) ortadan kalkıyor; KKTC de bu durumda elenmiyor.",
      },
      {
        id: "kendim",
        label: "Evet, kendim için",
        weights: { dubai: 3, kktc: 1 },
        why: "Ortak vizesi ve Emirates ID süreç içinde alınıyor (countryContent · Dubai fitTable); KKTC'de şirket oturum başvurusunda dayanak oluşturabiliyor ama sonucu garanti etmiyor (countryContent · KKTC faq), o yüzden 1.",
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
        weights: { dubai: 4 },
        why: "Ortak ve çalışan vizesi Dubai sürecinin içinde (countryContent · Dubai pros) ve geniş vize kotası mainland yapısıyla alınıyor (countryContent · Dubai structures); İngiltere'de şirket oturum hakkı vermiyor (brand.ts · FACTS.limit), KKTC'de de şirket sahipliği oturum doğurmuyor (countryContent · KKTC clarify).",
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
};

export const emptyFitAnswers = (): (number | null)[] => FIT_QUESTIONS.map(() => null);

/** Ham toplamlar, FIT_COUNTRIES SIRASINDA (sıralanmamış).
 *  Test sürerken ekranda duran canlı sayaç bunu kullanıyor: sıralanmış bir
 *  liste her cevapta yer değiştirir ve ziyaretçiye yarısı gelmemiş bir
 *  hüküm gösterir. Sıra sabit, yalnızca çubukların boyu değişiyor. */
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
     hâlâ aynı mı diye bakılıyor. Dokuz soru × en çok dört seçenek, yani en
     kötü ihtimalle yirmi yedi yeniden toplama; ölçüsü belli, önbelleğe gerek
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
