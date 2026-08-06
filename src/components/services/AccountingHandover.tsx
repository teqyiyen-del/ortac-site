import {
  BookOpen,
  CalendarCheck,
  ChartColumn,
  FileStack,
  Info,
  Landmark,
  MapPin,
  Receipt,
  Stamp,
  Wallet,
  type LucideIcon,
} from "lucide-react";

import { ACCOUNTING_DUBAI as C, type AccIcon } from "@/lib/accountingDubai";

/* ============================================================================
   TAKAS PANELİ — /dubai/muhasebe · #kapsam · "Siz ne veriyorsunuz, biz ne
   veriyoruz?"
   CSS: src/app/css/svc-muhasebe.css · 6. bölüm (.svm-swap-) ve 15. bölüm
   (.svs-conn-)

   ============================================================================
   BU TUR BİR GERİ ALMA. NEDEN GERİ ALINDI
   ============================================================================

   Müşteri: "muhsaebe takas bölümü olmamış kral. ben sadece text yazmaktan uzak
   duralım derken sen konuyu texte boğmuşsun. odak svg görsel ve animasyonlarda
   olcak ama texti de koymalıyızki açıklayıcı olsun mantık o. aslında şu attığım
   görseldeki iyi ama işte ben dedim ki bunu nasıl biraz daha hareketlendiririz."

   TALİMAT HATASI, TASARIM HATASI DEĞİL. Müşteri bir önceki turda "sadece görsel
   yapmak yerine placeholder doldurursun" derken ÇİZİME METİN GİRSİN demişti;
   brief bunu "listeleri sahnenin içine göm" diye okudu. Sonuç ölçüldü: çizim
   küçüldü, dokuz kalem sahnenin içinde dokuz HTML satırına döndü, bölümün
   görünür metni 7.210 karaktere çıktı ve bölüm bir çizim olmaktan çıkıp bir
   liste oldu. İstenen denge şuydu: GÖRSEL ÖNDE, METİN AÇIKLAYICI OLARAK YANINDA.

   Bu dosya bu turda üçüncü kez baştan yazıldı. Sıra:

     1 · TAKAS PANELİ + BAĞ  → müşterinin beğendiği hâl (commit 510f687)
     2 · "GEÇİT"             → panelin ÜSTÜNE bir sahne girdi, bağ silindi
     3 · "TEZGÂH"            → panel de silindi, dokuz kalem sahnenin içine
     4 · TAKAS PANELİ + BAĞ  → BURASI: 1'e dönüldü

   Geri alınan şey bir çizim değil bir YAKLAŞIM: iki tur boyunca bölüme hep bir
   NESNE eklendi (sahne, kanal, uçan belge, klasör) ve her seferinde bölüm
   ağırlaştı. Panelin cümlesi tek satır: belge sizde, defter bizde, çıktı yine
   sizde. Panel bunu iki liste ve aralarındaki bir çizimle söylüyor.

   ---------------------------------------------------------------------------
   NE GERİ GELDİ, NE GELMEDİ
   ---------------------------------------------------------------------------

   GELDİ:
     · iki sütunlu panel (.svm-swap) — solda üç, sağda altı ikonlu kalem
     · sağ sütun --blue-100 zeminde: asıl cevap o taraf, soldaki üç kalem
       zaten sizde
     · aradaki bağ (.svs-conn) — "belge → defter → çıktı"

   GELMEDİ, ve bu bir unutma değil:
     · "Bu çıktılar ne işe yarıyor?" açılırı. O blok bu turdan ÖNCE, ayrı bir
       müşteri kararıyla kaldırılmıştı ("gerek olmadığını söyledi") ve altı
       çıktının açıklama cümleleri o turda veri dosyasından da silindi
       (accountingDubai.ts · exchange.outputs artık AccChip[], yani ikon +
       etiket). Geri getirmek altı cümleyi YENİDEN YAZMAK olurdu; bu sayfada
       uydurma metin yazılmıyor ve veri dosyası bu tur salt okunur.

   ---------------------------------------------------------------------------
   GENİŞLİK — ÖNCEKİ TURUN DÜZELTMESİ KORUNDU
   ---------------------------------------------------------------------------

   Müşteri: "şuanki neden genişlik olarak full değilde ortada kalmış gibi
   duruyor." O hata silinen sahnenin kabındaydı (.svsg-wrap · max-width 896px)
   ve düzeltmesi "sınırı bir katman aşağı indirmek" olmuştu.

   Panel o sınırı hiç taşımıyor: .svm-swap çıplak bir ızgara, kendi genişliğini
   bölümden alıyor. 1440 pikselte ölçüldü — panel 1136 px, sol kenarı x=145,
   yani başlık (.svm-sub) ve üstündeki süreç rayı (.svm-flow) ile aynı pikselde
   başlıyor. Düzeltme korunmakla kalmadı, yapısal hâle geldi: daraltacak bir
   kural yok.

   ---------------------------------------------------------------------------
   HAREKET — TUR KAPANDI, "SEVKİYAT" CANLIDA
   ---------------------------------------------------------------------------

   Müşteri: "aynen sevkiyat olanı yapabilirsin en azından biraz hareket katmış
   olur. soldaki kutu önce line olarak yanar ordan bi enerji gelir ota kısma
   aktarılır içinden geçer ve size dönen kısmını aydınlatır."

   Labdaki üçüncü aday seçildi ve müşterinin tarif ettiği diziye göre yeniden
   kuruldu. Labda parlayan yalnızca BAĞDI; müşteri iki PANELİN de dizinin
   parçası olmasını istedi. Zincir beş durak:

     sol panelin konturu → besleme çizgileri → defter → çıkış oku → sağ panel

   BU DOSYADA HİÇBİR KEYFRAME YOK. Hareket paylaşılan bir kalıptan geliyor
   (src/app/css/aktarim.css · ad alanı .akt-) ve bu bileşenin markup'ında o
   kalıptan gelen tek şey iki sınıf: kapta `akt`, her durakta `akt-durak`.
   Hangi durak ne zaman ve hangi renge yanacağı svc-muhasebe.css'te değer
   olarak yazılı, mekanizma olarak değil. Gerekçe müşterinin ikinci cümlesi:
   "sitedeki bir çok yerde bu enerji geçişi mantığındaki animasyonu
   kullanabiliriz bir şeyleri ordan oraya taşıma hissi vereceksek."

   HAREKET NESNE EKLEMİYOR. DOM'a tek bir yeni öğe girmedi: uçan bir belge,
   kayan bir nokta, bir kıvılcım kabı yok. Zaten orada olan şeyler sırayla
   yanıyor. Bu, bölümün dört tur boyunca tekrarladığı hatanın (bölüme bir nesne
   daha eklemek) tam tersi.

   SUNUCU BİLEŞENİ KARARI BOZULMADI: tarayıcıya buradan tek satır JS inmiyor,
   hareket saf CSS. useReducedMotion bu depoda beş ayrı kalıpta hidrasyon
   hatası çıkardı ve kullanılmadı; `reduce` kapısı kalıbın kendi içinde.
   `reduce` altında sıfır animasyon kalıyor ve duruş karesi müşterinin
   beğendiği statik hâlin BİREBİR aynısı — çünkü ortada silinecek bir nesne
   yok, yalnızca çalışmayan bir renk döngüsü var.

   Bağın eski canlı sürümü motion/react ile ekrana girdiğinde bir kez
   çiziliyordu (AccountingVisuals · ExchangeLink, "use client"). O sürüm geri
   getirilmedi: aynı cümle burada JS'siz söyleniyor ve bir kez değil sürekli.
   ========================================================================= */

/* İçerik dosyası ikon adını string taşıyor (gerekçesi orada yazılı); eşleme
   burada. Sayfanın kendi ICON tablosuyla aynı eşleme — bileşen kendi başına
   ayakta dursun diye kopyalandı, page.tsx'ten dışa açmak sayfayı bileşenin
   bağımlılığı yapardı. Tam kayıt (Partial değil): veri dosyasına yeni bir ikon
   adı girerse burası derlemede patlasın, ekranda sessizce boş kalmasın. */
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

/* ============================================================================
   BAĞ — "belge → defter → çıktı"

   TEK GEOMETRİ, İKİ YÖN. Panel geniş ekranda üç sütun (sizden gelen · bağ ·
   size dönen), 880'in altında alt alta. Bağın yönü de değişmek zorunda:
   masaüstünde sağa, telefonda aşağı.

   Eski çözüm CSS'ti — kap 90 derece döndürülüyordu. Tek bir ok için işe
   yarıyordu ama bir defter çizimini döndürmek defteri YAN YATIRIR; üstelik
   döndürülen kabın layout kutusu dönmediği için 140 piksellik çizim dar
   ekranda 140 piksellik boş bir satır bırakırdı.

   Şimdi aynı gövde iki kez basılıyor, hangisinin görüneceğine CSS karar
   veriyor (.svs-conn-h / .svs-conn-v). Dikey olan gövdeyi bir <g> içinde
   döndürüyor; ikinci bir çizim BAKIMI yok. Döndürme matematiği: 96×140'lık
   gövde (48,70) etrafında 90° dönünce [-22..118] × [22..118] kutusuna düşüyor,
   translate(22,-22) onu 140×96'ya oturtuyor.

   NEDEN OK DEĞİL DE DEFTER: düz bir ok yalnızca YÖN söyler. Bu bölümün
   anlattığı şey bir aktarım değil bir DÖNÜŞÜM — belgeler bir deftere giriyor,
   çıktılar o defterden doğuyor.

   Ekran okuyucuya kapalı: çizimin söylediği her şeyi iki sütun başlığı ve iki
   liste zaten kelimeyle söylüyor.
   ========================================================================= */

/* Üç besleme: fatura, gider belgesi, banka ekstresi — soldaki listenin üç
   kalemi. Sayı burada uydurulmuyor, listeyle aynı.

   Açıklık (34..106) rastgele değil: soldaki üç satırın gerçek yayılımına yakın
   dursun diye seçildi, yoksa çizgiler listeye değil boşluğa bakardı. */
const FEEDS = [
  "M0 34 C 16 34 14 70 30 70",
  "M0 70 H30",
  "M0 106 C 16 106 14 70 30 70",
];

/* Defterin satırları. Üç satır ve boyları eşit değil: eşit olsalardı bir tablo
   gibi okunurdu, oysa bu bir defter sayfası. */
const RULES = ["M37 61 H59", "M37 70 H55", "M37 79 H59"];

/* Dikey hâlde dış <g> gövdeyi (48,70) etrafında 90 derece çeviriyor. Akış
   çizgileri için doğru — aşağı akmaları gerekiyor — ama defter için değil:
   döndürülmüş bir defterin satırları dikey çubuklara dönüyor ve kutu bir defter
   sayfası olmaktan çıkıp bir cihaza benziyor. Bu yüzden defter AYNI MERKEZ
   etrafında geri çevriliyor; iki dönüş birbirini tam olarak götürüyor, yani
   ikinci bir geometri yazmadan defter iki yönde de dik duruyor. */
const UPRIGHT = "rotate(-90 48 70)";

function ConnBody({ vertical }: { vertical?: boolean }) {
  return (
    <>
      {FEEDS.map((d) => (
        <path key={d} d={d} className="svs-conn-feed akt-durak" />
      ))}

      <g transform={vertical ? UPRIGHT : undefined}>
        <rect
          x="30"
          y="52"
          width="36"
          height="36"
          rx="9"
          className="svs-conn-box akt-durak"
        />
        {RULES.map((d) => (
          <path key={d} d={d} className="svs-conn-rule akt-durak" />
        ))}
      </g>

      {/* Tek çıkış, tek yön: bu bir iş birliği değil bir devir. */}
      <path d="M66 70 H86" className="svs-conn-out akt-durak" />
      <path d="M84 64.5 L92 70 L84 75.5 Z" className="svs-conn-head akt-durak" />
    </>
  );
}

/* İki yön de DOM'da duruyor ve ikisi de aria-hidden. Görünmeyeni CSS
   `display: none` ile kapatıyor, yani ekranda tek çizim var. */
function ExchangeLink() {
  return (
    <>
      <svg
        className="svs-conn svs-conn-h"
        viewBox="0 0 96 140"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <ConnBody />
      </svg>

      <svg
        className="svs-conn svs-conn-v"
        viewBox="0 0 140 96"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <g transform="translate(22,-22) rotate(90 48 70)">
          <ConnBody vertical />
        </g>
      </svg>
    </>
  );
}

/* ========================================================================= */

export default function AccountingHandover() {
  return (
    /* `akt` yalnızca bir kapsam etiketi: fare panelin üstündeyken tur dursun
       (kalıp: css/aktarim.css). Ölçüye, ızgaraya, genişliğe dokunmuyor. */
    <div className="svm-swap akt">
      {/* Panelin kendi girişi yok ve olmayacak: iki sütun başlığı ("Sizden
          gelen" / "Size dönen") zaten girişin söyleyeceği her şeyi söylüyor.
          Bir cümle eklemek göstermek yerine anlatmak olurdu. */}
      {/* Listenin adı aria-labelledby ile DEĞİL aria-label ile veriliyor ve bu
          bir tercih değil bir zorunluluk: bileşen aynı anda birden çok yerde
          basılabiliyor (canlı bölüm + /lab/muhasebe-takas'taki taban bloğu, ve
          lab bir karşılaştırma sayfası olduğu için sayı yine artabilir). Sabit
          bir id her kopyada tekrar ederdi; sunucu bileşeni olduğu için useId de
          kullanılamıyor. Ad iki yerde de aynı kaynaktan okunduğu için ayrışma
          riski yok. */}
      <div className="svm-swap-col akt-durak">
        <span className="svm-swap-k">{C.exchange.youTitle}</span>
        <ul aria-label={C.exchange.youTitle}>
          {C.exchange.you.map((y) => {
            const Icon = ICON[y.icon];
            return (
              <li key={y.label}>
                <span className="svm-swap-ic akt-durak" aria-hidden="true">
                  <Icon size={15} strokeWidth={2} />
                </span>
                {y.label}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="svm-swap-arrow" aria-hidden="true">
        <ExchangeLink />
      </div>

      <div className="svm-swap-col svm-swap-out akt-durak">
        <span className="svm-swap-k">{C.exchange.usTitle}</span>
        <ul aria-label={C.exchange.usTitle}>
          {C.exchange.outputs.map((o) => {
            const Icon = ICON[o.icon];
            return (
              <li key={o.label}>
                <span className="svm-swap-ic akt-durak" aria-hidden="true">
                  <Icon size={15} strokeWidth={2} />
                </span>
                {o.label}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
