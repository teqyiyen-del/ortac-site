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
   neden öne çıktığını anlamak için beş ayrı diziyi kafada toplamak gerekiyordu.
   Ağırlık bir uygulama detayı değil, testin verdiği CEVABIN kendisi — o yüzden
   artık tek bir dosyada, her satırın yanında NEDEN öyle olduğu yazılı hâlde.

   ---------------------------------------------------------------------------
   SWAP:FIT_WEIGHTS — KARAR NOKTASI, KUSUR DEĞİL

   Aşağıdaki ağırlıkların hiçbiri firma tarafından teyit edilmedi. Bu işaret
   duruyor ve TEYİT GELENE KADAR DURACAK, çünkü ağırlıklar hangi ülkenin
   önerileceğini belirliyor: test yayına alınırsa site, kimsenin onaylamadığı
   bir mantıkla ziyaretçiye ülke söylemiş olur.

   Bu turda ağırlıkların DEĞERİ değişmedi — bileşendeki hâlleriyle birebir
   aynılar. Değişen tek şey görünürlükleri: her seçeneğin `why` alanı o
   ağırlığın gerekçesini tek cümlede söylüyor ve gerekçenin dayandığı yer
   (countryContent.ts / brand.ts) parantez içinde yazıyor. Gerekçesi olmayan
   ağırlık gözden geçirilemez.

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

export type FitQuestion = {
  id: string;
  /** Soru cümlesi. Ekranda <legend> olarak basılıyor. */
  q: string;
  /** Sorunun altındaki tek satır. Yine yalnızca doğrulanmış olgu. */
  help?: string;
  /** Sorunun neden sorulduğu — ağırlık bandının gerekçesi. */
  why: string;
  options: FitOption[];
};

/* ============================================================ SORULAR ======
   Beş soru. Kısa olması işe yarıyor: uzayan test bitmiyor, bitmeyen test
   kimseyi bir ülkeye götürmüyor. Bu turda soru SAYISI değişmedi; değişen
   soruların ve seçeneklerin YAZILIŞI oldu (her birinin yanında not var). */

export const FIT_QUESTIONS: readonly FitQuestion[] = [
  {
    id: "musteri",
    /* Değişmedi: soru zaten netti ve testin en ayırt edici sorusu bu. */
    q: "Müşterileriniz ağırlıklı olarak nerede?",
    help: "Ağırlıklı olan tek bölgeyi işaretleyin; gerçekten dağınıksa son kutu.",
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
        /* "Karışık / global" idi; "tek bir bölge yok" ne demek istendiğini
           söylüyor ve önceki üç kutuyla karışmıyor. */
        label: "Karışık — tek bir bölge yok",
        weights: { dubai: 2, ingiltere: 2 },
        why: "Tek bölge yoksa ayırt edici olan tahsilat genişliği; Stripe, PayPal ve Wise Dubai ile İngiltere'de çalışıyor, KKTC'de çalışmıyor (brand.ts · PAY_MATRIX) — bu yüzden ikisi eşit, KKTC sıfır.",
      },
    ],
  },
  {
    id: "is",
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
        /* YENİ SEÇENEK — AĞIRLIK TAŞIMIYOR (hepsi 0).
           Sebep: üç kutu gayrimenkul, turizm, sağlık ve finansı kapsamıyordu
           (karşılaştırın: store.ts · ACTIVITY_LABELS altı kalem sayıyor).
           O işlerdeki ziyaretçi bugün mecburen yanlış bir kutu işaretliyor ve
           testin bu sorudan çıkan puanı YANLIŞ oluyor. Sıfır ağırlıklı bir
           kutu ise "bu soru sizi ayırmıyor" demenin dürüst yolu: sonuç kalan
           dört sorudan çıkıyor.
           Hiçbir ülkeyi öne çıkarmadığı için mevcut ağırlık mantığına
           dokunmuyor. Ağırlık verilmesi isteniyorsa karar firmanın. */
        id: "diger",
        label: "Başka bir alan",
        hint: "Gayrimenkul, turizm, sağlık, finans…",
        weights: {},
        why: "Bilerek sıfır: bu dört alan için üç ülkeyi ayıran doğrulanmış bir kural elimizde yok, uydurulmuş bir ağırlık da yanlış ülkeyi öne çıkarır.",
      },
    ],
  },
  {
    id: "ziyaret",
    /* "Kuruluş için yurt dışına gidebilir misiniz?" idi ve YANLIŞTI: Dubai'de
       tescil uzaktan tamamlanabiliyor, seyahat gerektiren adımlar vize
       biyometrisi ile banka imzası. Soru artık gerçekten sorulan şeyi soruyor. */
    q: "Süreç için bir kez yurt dışına gidebilir misiniz?",
    help: "Tescil çoğu yerde uzaktan yürüyor; seyahat isteyen adımlar banka imzası ve vize biyometrisi.",
    why: "Bu, tek cevabıyla bir ülkeyi tamamen eleyebilen tek soru — o yüzden testin en yüksek tek ağırlığı (4) burada.",
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
  {
    id: "butce",
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
    id: "vize",
    /* "Oturum vizesi gerekiyor mu?" idi; kimin için sorulduğu belirsizdi. */
    q: "Kendiniz için oturum vizesi de istiyor musunuz?",
    help: "Şirket kurmak İngiltere'de oturum hakkı vermiyor.",
    why: "Vize ihtiyacı varsa seçenek daralıyor; yoksa daralmıyor — asimetrik bir soru olduğu için band düşük tutuldu (1-3).",
    options: [
      {
        id: "evet",
        label: "Evet, kendim için",
        weights: { dubai: 3, kktc: 1 },
        why: "Ortak vizesi ve Emirates ID süreç içinde alınıyor (countryContent · Dubai fitTable); KKTC'de karşılığı var ama Dubai kadar net değil, o yüzden 1.",
      },
      {
        id: "hayir",
        label: "Hayır, sadece şirket",
        weights: { ingiltere: 2, kktc: 1 },
        why: "Vize gerekmiyorsa İngiltere'nin tek gerçek kısıtı (oturum hakkı vermemesi, brand.ts · FACTS.limit) ortadan kalkıyor; KKTC de bu durumda elenmiyor.",
      },
    ],
  },
];

export const FIT_TOTAL = FIT_QUESTIONS.length;

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

function totalsOf(answers: FitAnswers): FitStanding[] {
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
  return totalsOf(answers).sort((a, b) => b.pts - a.pts);
}

export function scoreFit(answers: FitAnswers): FitResult {
  const standings = rank(answers);
  const top = standings[0].country;
  const gap = standings[0].pts - standings[1].pts;

  /* "Tek bir cevabınızı değiştirseniz sıra değişebilirdi" cümlesi tahmin
     değil, hesap: her soruda her alternatif seçenek tek tek denenip birinci
     hâlâ aynı mı diye bakılıyor. Beş soru × en çok dört seçenek = elli altı
     toplama; ölçüsü belli, önbelleğe gerek yok. */
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
    /* Üçlü beraberlik teorik değil: örneğin "Avrupa · başka bir alan · bir kez
       gidebilirim · orta bütçe · vize gerekmiyor" cevapları 5-5-5 veriyor.
       Sonuç ekranının bunu "Dubai öne çıkıyor" diye geçiştirmemesi için
       kaç ülkenin eşit olduğu ayrıca sayılıyor. */
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
