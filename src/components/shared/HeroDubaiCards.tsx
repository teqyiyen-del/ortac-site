"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  BadgeCheck,
  FileBadge,
  IdCard,
  Landmark,
  Waypoints,
  type LucideIcon,
} from "lucide-react";
import HeroSceneCard from "@/components/shared/HeroSceneCard";
import { CHAIN, COUNTRY_SERVICES } from "@/lib/brand";

/* ============================================================================
   DUBAI HERO KARTI

   CANLIDA OLAN: DubaiStageCard — "sahne, beyaz çizim". Dosyanın sonundaki
   DubaiHeroCard onu gösteriyor, PageHero de yalnızca o adı tanıyor.
   Kart /lab/hero'daki H12 adayının canlıya alınmış hâli; müşteri "h12'yi
   siteye taşıyabilirsin şimdilik, sonra üzerine biraz daha kafa patlatırız"
   dedi. Yani yerleşti ama bitmedi.

   ADAY KOPYASI DURUYOR: src/components/lab/HeroH12.tsx + lab-h12.css, sınıf
   öneki .h12-. Silinmedi, çünkü /lab/hero H12'yi H10 ve H11 ile yan yana
   göstermeye devam ediyor. Buradaki canlı kopya ayrı bir ad alanı kullanıyor
   (.dhs-, hero.css); iki dosya aynı sınıf adını taşısaydı lab-h12.css
   globals.css'te hero.css'ten SONRA import edildiği için lab'da yapılan her
   deneme sessizce canlı karta da geçerdi. Gerekçenin tamamı hero.css'teki
   .dhs- bloğunun başında.

   İKİ TARAFI BİRDEN DEĞİŞTİRME KURALI: canlı kart ile aday kopya artık iki
   ayrı dosya. Birinde yapılan düzeltme ötekine kendiliğinden geçmiyor; hangi
   kopyanın değişmesi gerektiğine önce karar verin. Canlıda görünen bu dosya.

   ---------------------------------------------------------------- A / B / C
   Altta duran HeroCardA / HeroCardB / HeroCardC bir önceki turun adayları.
   ARTIK CANLIDA DEĞİLLER ama SİLİNMEDİLER: /hero-lab sayfası (src/app/
   hero-lab/page.tsx) üçünü de import edip yan yana gösteriyor, yani silmek o
   sayfayı kırar. Temizlik yapılacaksa sıra şu:
     1. src/app/hero-lab/ dizini silinir,
     2. HeroCardA / HeroCardB / HeroCardC ve yalnızca onların kullandığı
        yardımcılar (Lite, DubaiBackdrop, HeroPanel, A_ITEMS, B_WIRES, B_FACT,
        B_KEYS, C_PHASES, C_SPLIT) silinir — CHAIN / COUNTRY_SERVICES /
        BadgeCheck / FileBadge / IdCard / Landmark / LucideIcon importları da
        o zaman gereksiz kalıyor,
     3. hero.css'teki .phd- / .phda- / .phdb- / .phdc- / .phlab- blokları ve
        artık kimsenin kullanmadığı .phx-col + .phx-bg + .phx-sky-* + .phx-hz
        + .phx-lite (Dubai silueti) silinir. DİKKAT: .phx-grid, .phx-copy,
        .phx-lead, .phx-cta, .phx-trust ÜÇ ÜLKEDE DE kullanılıyor, onlar
        kalır.
   Aynı liste hero-lab/page.tsx'in başında da duruyor.

   ORTAK KISITLAR (dört kart da uyar)
   - Kart KOYU. Zemin --night / --night-2 / --night-3 ailesi, opak hex.
     Neredeyse siyah yüzeyde alfa üç farklı tonu aynı griye çeviriyor.
   - Beyaz yalnızca aksan. Canlı kartta bu kural "beyaz yüzey değil,
     mürekkeptir" biçimini aldı: beyaz yalnızca çizimin dış hattında.
   - Metin az: toplam 6-8 kısa satır. Açıklama cümlesi yok, etiket var.
   - Somut. Ziyaretçi üç saniyede bir bilgi edinmeli; süs diyagram değil.
   - STANCE_LIMITS: kesin gün sayısı yok, fiyat yok, banka onayı vaadi yok.
     Dört kartta da bankanın geçtiği yerde kararın bankada olduğu yazılı.

   Döngülerin tamamı CSS'te (hero.css). motion yalnızca girişi yapıyor;
   prefers-reduced-motion sonsuz döngüyü CSS tarafında da kapatıyor.
   ========================================================================= */

const EASE = [0.22, 1, 0.36, 1] as const;

/* Dubai silueti — eski CountryScene'in şehir katmanları. Kart koyu olduğu için
   siluet artık kartın arkasında değil, kartla aynı ailede: panel zemini,
   kartın altından yalnızca çatı hattı görünüyor. */
function Lite({ x, y, w, h, d }: { x: number; y: number; w: number; h: number; d: number }) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx="1"
      className="phx-lite"
      style={{ animationDelay: `${d}s` }}
    />
  );
}

/* preserveAspectRatio="xMidYMax slice": siluet viewBox'ın alt şeridinde
   (y 330..440) duruyor, kırpma üstten olmalı ki çatı hattı hep görünsün. */
function DubaiBackdrop() {
  return (
    <svg
      className="phx-bg"
      viewBox="0 0 560 440"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="phxGlow" cx="52%" cy="26%" r="74%">
          <stop offset="0%" stopColor="#14293f" />
          <stop offset="100%" stopColor="#0a0a0a" />
        </radialGradient>
        <pattern id="phxDots" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="1.2" cy="1.2" r="1.2" fill="#1b1b1b" />
        </pattern>
      </defs>
      <rect width="560" height="440" fill="url(#phxGlow)" />
      <rect width="560" height="440" fill="url(#phxDots)" />

      <g className="phx-sky-a">
        <rect x="10" y="388" width="30" height="52" rx="2" />
        <rect x="46" y="366" width="22" height="74" rx="2" />
        <path d="M74 440 V360 L92 348 L92 440 Z" />
        <rect x="110" y="382" width="26" height="58" rx="2" />
        <rect x="342" y="368" width="24" height="72" rx="2" />
        <path d="M374 440 V362 L390 352 L390 440 Z" />
        <rect x="466" y="386" width="28" height="54" rx="2" />
        <rect x="502" y="398" width="24" height="42" rx="2" />
      </g>
      <g className="phx-sky-b">
        <rect x="142" y="386" width="34" height="54" rx="2" />
        <path d="M182 440 V376 L196 364 L210 376 V440 Z" />
        <rect x="216" y="394" width="18" height="46" rx="2" />
        <rect x="330" y="386" width="30" height="54" rx="2" />
        <path d="M404 440 V386 L420 374 L436 386 V440 Z" />
        <path d="M486 440 V370 C486 370 498 388 510 408 L510 440 Z" />
        <path d="M486 370 L486 354 L505 386 Z" />
      </g>
      <g className="phx-sky-c">
        <path d="M200 440 V394 L214 386 L214 440 Z" />
        <rect x="232" y="402" width="26" height="38" rx="2" />
        <path d="M264 440 V384 L280 384 L280 440 Z" />
        <path d="M280 440 V354 L292 354 L292 440 Z" />
        <path d="M292 440 V372 L306 372 L306 440 Z" />
        <path d="M306 440 V396 L320 396 L320 440 Z" />
        <path d="M280 354 L286 336 L292 354 Z" />
        <rect x="284.5" y="330" width="3" height="8" rx="1.5" />
        <rect x="326" y="398" width="22" height="42" rx="2" />
        <Lite x={270} y={404} w={3} h={6} d={0} />
        <Lite x={284} y={378} w={3} h={6} d={0.7} />
        <Lite x={297} y={398} w={3} h={6} d={1.4} />
        <Lite x={240} y={416} w={3} h={5} d={2.1} />
        <Lite x={334} y={412} w={3} h={5} d={1} />
        <Lite x={496} y={418} w={3} h={5} d={1.8} />
      </g>
      <rect x="0" y="352" width="560" height="1" className="phx-hz" />
    </svg>
  );
}

/** panel + siluet + kart — üç varyant da bunun içine giriyor.
 *  reduced'ı prop olarak almıyor, kendisi okuyor: varyantlar böylece
 *  props'suz bileşen oluyor ve /hero-lab (sunucu bileşeni) onları doğrudan
 *  render edebiliyor. Sonsuz döngüler zaten CSS'te, burada kısalan yalnızca
 *  giriş; işaretleme iki durumda da aynı çıkıyor. */
function HeroPanel({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion() ?? false;
  const t = (v: number) => (reduced ? 0 : v);
  return (
    <div className="phx-col">
      <DubaiBackdrop />
      <motion.div
        className="phd-wrap"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: t(0.7), delay: t(0.2), ease: EASE }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ============================================================================
   VARYANT A — "Elinizde ne kalıyor"
   Süreci değil sonucu anlatıyor: kurulum üç somut çıktı üretiyor. Üç koyu
   kutu sırayla beyaza dönüyor, yani beyaz o anda öne çıkan tek çıktı.
   Her çıktının altındaki mikro satır o çıktının şartını söylüyor — sıraladığımız
   üç şeyin üçü de aynı garantide değil ve bunu kartın kendisi yazıyor.
   ========================================================================= */

const A_ITEMS: { icon: LucideIcon; label: string; meta: string }[] = [
  { icon: FileBadge, label: "Ticaret lisansı", meta: "IFZA serbest bölge" },
  /* biyometri şartı FACTS.dubai.limit ile aynı cümle — hero'nun sol
     sütununda da yazıyor, burada da: iki yerde de aynı kısıt */
  { icon: IdCard, label: "Emirates ID", meta: "Biyometri BAE'de" },
  /* "Onay bankanın": STANCE_LIMITS'in birinci maddesi. Kutu çıktıyı
     gösteriyor ama garantiyi vermiyor. */
  { icon: Landmark, label: "Kurumsal hesap", meta: "Onay bankanın" },
];

export function HeroCardA() {
  return (
    <HeroPanel>
      <div className="phd phda">
        <span className="phd-k">Kurulumun üç çıktısı</span>
        <div className="phda-row">
          {A_ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="phda-t" style={{ "--i": i } as React.CSSProperties}>
                <span className="phda-ico">
                  <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <b>{item.label}</b>
                <i>{item.meta}</i>
              </div>
            );
          })}
        </div>
      </div>
    </HeroPanel>
  );
}

/* ============================================================================
   VARYANT B — "Lisans bir halka"
   Eski sahnenin beğenilen iskeleti (üstte lisans düğümü, altta üç beyaz kutu),
   ama artık bir şey söylüyor: her kutuda o halkanın somut karşılığı yazılı.
   Teller sırayla maviye boyanıyor, kutu da o anda kalkıyor — hangi halkanın
   sırası geldiği tek bakışta okunuyor.
   ========================================================================= */

/* üç dal, viewBox 0 0 300 40 · orta düğüm x=150, kutular x=50/150/250.
   pathLength="1" sayesinde stroke-dashoffset üç telde de aynı ölçekte
   çalışıyor — teller farklı uzunlukta olduğu halde aynı hızda doluyorlar. */
const B_WIRES = [
  "M150 0 V12 Q150 19 143 19 H57 Q50 19 50 26 V40",
  "M150 0 V40",
  "M150 0 V12 Q150 19 157 19 H243 Q250 19 250 26 V40",
];

/* Etiketler CHAIN'den (lib/brand.ts). Alt satırdaki karşılıklar burada yazılı,
   çünkü COUNTRY_SERVICES.meta bu üçünde fiyat birimi tutuyor ("aylık",
   "kişi başı") — o da işin ne olduğu hakkında hiçbir şey söylemiyor.
   Bankanınki tek istisna, orada meta gerçekten kurum adı. */
const B_FACT: Record<string, string> = {
  banka: COUNTRY_SERVICES.dubai.find((s) => s.key === "banka-hesabi")?.meta ?? "Wio · Mashreq",
  muhasebe: "Kurumlar + KDV",
  oturum: "Emirates ID",
};
const B_KEYS = ["banka", "muhasebe", "oturum"] as const;

export function HeroCardB() {
  const byKey = Object.fromEntries(CHAIN.map((c) => [c.key, c]));

  return (
    <HeroPanel>
      <div className="phd phdb">
        {/* IFZA rozetinin metni PARTNERS'ta (lib/brand.ts) "resmî iş ortağı"
            olarak tanımlı; burada yalnızca kısaltması duruyor */}
        <div className="phdb-node">
          <span className="phdb-node-ic">
            <FileBadge size={18} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <b>Serbest bölge ticaret lisansı</b>
          <span className="phdb-chip">
            <BadgeCheck size={12} strokeWidth={2.2} aria-hidden="true" />
            IFZA
          </span>
        </div>

        <svg
          className="phdb-wires"
          viewBox="0 0 300 40"
          aria-hidden="true"
          focusable="false"
        >
          {B_WIRES.map((d) => (
            <path key={d} d={d} pathLength="1" className="phdb-w" />
          ))}
          {B_WIRES.map((d, i) => (
            <path
              key={`f${d}`}
              d={d}
              pathLength="1"
              className="phdb-wf"
              style={{ "--i": i } as React.CSSProperties}
            />
          ))}
        </svg>

        <div className="phdb-row">
          {B_KEYS.map((key, i) => (
            <div key={key} className="phdb-b" style={{ "--i": i } as React.CSSProperties}>
              <b>{byKey[key]?.label}</b>
              <i>{B_FACT[key]}</i>
            </div>
          ))}
        </div>
      </div>
    </HeroPanel>
  );
}

/* ============================================================================
   VARYANT C — "Sıra"
   Yatay bir ray ve üstünde ilerleyen tek beyaz işaretçi. Anlattığı şey işlem
   sırası: Dubai'de isim onayı lisanstan, lisans tescilden, tescil de banka
   başvurusundan önce gelir — ziyaretçinin en sık yanlış bildiği şey bu.
   Ray ikiye bölünmüş: soldaki üç adım kuruluşun kendisi, sağdaki ikisi
   kuruluş bittikten sonra başlayan ayrı iş. Gün sayısı yok, yalnızca sıra.
   ========================================================================= */

const C_PHASES = ["İsim onayı", "Lisans", "Tescil", "Banka başvurusu", "Emirates ID"];
/* ayrım üçüncü ile dördüncü adımın arasında: %50 ile %75'in ortası */
const C_SPLIT = 62.5;

export function HeroCardC() {
  return (
    <HeroPanel>
      <div className="phd phdc">
        <div className="phdc-axis" aria-hidden="true">
          <span>Kuruluş</span>
          <span>Kuruluştan sonra</span>
        </div>

        <div className="phdc-rail">
          <span className="phdc-line" aria-hidden="true" />
          <span
            className="phdc-split"
            style={{ left: `${C_SPLIT}%` }}
            aria-hidden="true"
          />
          <span className="phdc-mark" aria-hidden="true" />
          {C_PHASES.map((label, i) => (
            <span
              key={label}
              className="phdc-tick"
              style={
                {
                  "--i": i,
                  left: `${(i / (C_PHASES.length - 1)) * 100}%`,
                } as React.CSSProperties
              }
            >
              <b aria-hidden="true" />
              <em>{label}</em>
            </span>
          ))}
        </div>
      </div>
    </HeroPanel>
  );
}

/* ============================================================================
   CANLI KART — "SAHNE, BEYAZ ÇİZİM" (lab'daki H12)

   Sabit koyu bir sahne çerçevesi var; aşama değiştikçe içindeki nesne komple
   değişiyor. Altında aşamanın tek kelimelik adı, yanında işi kimin yaptığını
   söyleyen rozet, en altta beş segmentlik şerit. Şerit hem ilerlemeyi
   gösteriyor hem kumanda: ziyaretçi bir aşamaya basınca kart orada duruyor.

   -------------------------------------------------------- İSKELET ORTAKLAŞTI
   Kartın ÖLÇÜSÜ VE DAVRANIŞI bu dosyadan çıktı: sahne kutusu, ad kutusu,
   şerit, künye, dolgular, paylar, geçişler, duraklatma mantığı, geri sarma,
   erişilebilir ad ve hidrasyon kuralı artık sitenin tek hero kartı
   iskeletinde — components/shared/HeroSceneCard.tsx + hero.css · .hkc-.
   Muhasebe kartı (/dubai/muhasebe) aynı iskeleti kullanıyor ve iki kart artık
   BİREBİR AYNI ölçüde. Bu dosyada kalan: beş çizim, beş kelime, beş satır,
   rozetler, süreler ve künye cümlesi.

   BU TURDA DEĞİŞEN İKİ ÖLÇÜ (ikisi de standarttan geliyor, gerekçeleri orada):
     · şerit 26 → 44px. 26px dokunma hedefi eşiğinin altındaydı; hata
       muhasebede değil BURADAYDI.
     · ad kutusu 64 → 86px, künye 32.5 → 50px (iki satırlık rezerv). Kart
       604 → 644px; sahne kutusu buna karşılık 379.5'te SABİTLENDİ, artık
       alt katmanlardan artan yer değil.
   Çizimler, metinler ve renkler DEĞİŞMEDİ.

   ----------------------------------------------------------- BEYAZ = ÇİZGİ
   Kartın tek renk kuralı: BEYAZ YÜZEY DEĞİL, MÜREKKEPTİR. Beyaz yalnızca
   nesnenin dış hattına harcanıyor; gövde dolguları koyu, iç işaretler gri
   kademede, olay mavi. Kart "aydınlatılmış kağıt" değil, "siyah kağıda beyaz
   kalemle çizim". Bunun neden böyle olduğu (paleti topluca beyaza çevirmek
   maviyi kadrajın en sönük öğesine düşürüyor, beyaz üstüne beyaz kontur
   görünmüyor, kart bir önceki turda reddedilen beyaz lekeye dönüyor) ve
   ölçümle nasıl doğrulandığı hero.css'teki .dhs- bloğunun başında.

   HİÇBİR ÇİZİM KENDİ RENGİNİ BİLMİYOR — bütün boyalar hero.css'ten geliyor.
   Sınıfların anlamı:
     .dhs-sur / -sur-f       ön plandaki nesne · BEYAZ kontur
     .dhs-sur-q              ikincil düzlem    · gri kontur
     .dhs-sur-b              en uzak düzlem    · sönük kontur
     .dhs-ink…dim / rule     iç işaretler      · ASLA beyaz
     .dhs-solid / -2         katı açık yüzey   · yalnızca mühür
     .dhs-far / -2           uzak kütle        · yalnızca banka cephesi
     .dhs-act / act2 / well  olay              · mavi
     .dhs-paper              döngünün tek dolu beyazı · yalnızca lisans izi

   ---------------------------------------------------------------- SINIRLAR
   - Gün sayısı, tarih, fiyat yok. Kartın verdiği tek şey SIRA.
   - Lisans satırı takvimin bizde olmadığını söylüyor (STANCE_LIMITS 2), banka
     satırı kararın bankada olduğunu (STANCE_LIMITS 1). Banka sahnesinde onay
     işareti yok, bekleyen üç nokta var.
   - Kimlik aşaması FACTS.dubai.limit ile aynı gerçek: bir kez BAE'de.
   - Çizimlerde harf, uydurma numara, sahte resmî amblem yok — hepsi siluet.
     Beyaz çizimde bu kural daha da kritik: okunur görünen beyaz bir belge,
     üstünde sahte bir numara olsaydı koyu gri hâlinden çok daha fazla "gerçek
     belge" gibi durur ve yalan olurdu.
   - <768px'te kart gizli; mobilde hero'yu metin taşıyor.
   ========================================================================= */

/* Bir aşamanın ekranda kalma süresi ve son aşamanınki. Sonuncusu daha uzun,
   çünkü ardından başa dönülüyor: dönüşün okunması için sahnenin oturması
   gerekiyor. Muhasebe kartının beklemesinden (4.1 s) ayrı seçildi — aynı
   sayfada iki kart aynı ritimde nefes alırsa göz ikisini tek bir mekanizma
   sanıyor. Süreler PROP: ortak katsızlık disiplini iskelete taşınmadı, çünkü
   ortak bir bekleme süresi tam olarak o disiplini bozardı. */
const DWELL = 3800;
const LAST = 4800;

type Who = "siz" | "ortac" | "otorite";

/** Kartın kendi aşama tipi. HeroSceneItem'dan tek farkı `who`: burada işi kimin
 *  yaptığı VERİDEN geliyor, rozete ortak bileşene girerken çevriliyor. */
type Stage = {
  key: string;
  /** sahnenin tek kelimelik adı — kartın değişen ana metni */
  word: string;
  /** aşamanın içeriği ya da şartı; tek kısa satır, cümle bütçesinin tamamı */
  meta: string;
  who: Who;
  art: React.ReactNode;
};

/* 1 · KARAR — üç seçenekli bir liste ve üstünde gezinen seçim.
   BEYAZ: üç satırın konturu ve seçim düğmelerinin halkası; liste bu sahnenin
   nesnesi, o yüzden hattı en parlak bant.
   GRİ: üstteki soru çubuğu ve satır içindeki etiketler. Etiketler kasten
   sessiz — çizimdeki en kalabalık öğe onlar, bir kademe yukarı çekilseler
   çizim gri bir metin bloğuna dönerdi.
   MAVİ: seçilen satırın tamamı. Buradaki karar zordu: iki beyaz konturlu boş
   satırın yanına mavi bir KONTUR koymak yetmezdi, beyazdan sönük kalıp
   "seçilmemiş" gibi okunurdu. O yüzden seçim DOLU bir kütle — boşun yanındaki
   dolu, parlağın yanındaki sönükten daha güçlü bir işaret. */
function StageArtKarar() {
  const rows = [66, 152, 238];
  const bars = [196, 158, 216];
  return (
    <svg className="hkc-art" viewBox="0 0 440 340" aria-hidden="true" focusable="false">
      {/* Sorunun kendisi. Sahnenin tek .dhs-ink'i: belge başlığı rolündeki
          çubuk sahne başına bir tane, yoksa "en parlak dolu şey" ayrımı
          dağılıyor. */}
      <rect className="dhs-ink" x="30" y="26" width="150" height="11" rx="5.5" />
      {rows.map((y, i) => (
        <g key={y}>
          <rect className="dhs-sur" x="30" y={y} width="380" height="68" rx="16" />
          <circle className="dhs-ring" cx="64" cy={y + 34} r="13" />
          <rect className="dhs-dim" x="94" y={y + 29} width={bars[i]} height="10" rx="5" />
        </g>
      ))}
      {/* Seçim ayrı bir katman ve alttaki satırı TAMAMEN örtüyor: hangi satıra
          kaydığı önemsiz, satırların genişlik farkı görünmüyor. Duran hâli
          ortadaki satır — bir seçim yapılmış olarak kalıyor. */}
      <g className="dhs-pick">
        <rect className="dhs-well" x="30" y="66" width="380" height="68" rx="16" />
        <circle className="dhs-act" cx="64" cy="100" r="13" />
        <circle className="dhs-punch" cx="64" cy="100" r="4.6" />
        <rect className="dhs-act2" x="94" y="95" width="196" height="10" rx="5" />
      </g>
    </svg>
  );
}

/* 2 · TESCİL — yelpaze gibi açılmış bir dosya, önündeki sayfada imza
   çiziliyor.
   BEYAZ: yalnızca öndeki sayfanın konturu, ve bir tık kalın. Arkadaki iki
   kağıt gri kademede: derinliği DOLGU değil KONTUR taşıyor. Kazancı somut —
   dolgu farkı koyu zeminde 4-5 birim oynayabiliyor ve zar zor görünüyordu,
   kontur farkı (#5e5e5e / #9e9e9e / #ffffff) tartışmasız.
   MAVİ: ayraç ve imza; ikisi aynı eylemin parçası — "işlem gören sayfa" ve "o
   sayfaya atılan imza". */
function StageArtTescil() {
  return (
    <svg className="hkc-art" viewBox="0 0 440 340" aria-hidden="true" focusable="false">
      <g transform="rotate(-10 187 180)">
        <rect className="dhs-sur-b" x="76" y="48" width="222" height="264" rx="15" />
      </g>
      <g transform="rotate(-4.5 217 175)">
        <rect className="dhs-sur-q" x="104" y="40" width="226" height="270" rx="15" />
      </g>
      <g transform="rotate(1.5 246 171)">
        <rect className="dhs-sur-f" x="130" y="30" width="232" height="282" rx="15" />
        <rect className="dhs-act" x="318" y="18" width="15" height="46" rx="4" />
        <rect className="dhs-ink" x="158" y="64" width="112" height="13" rx="6.5" />
        <rect className="dhs-dim" x="158" y="100" width="162" height="9" rx="4.5" />
        <rect className="dhs-dim" x="158" y="122" width="136" height="9" rx="4.5" />
        <rect className="dhs-dim" x="158" y="144" width="148" height="9" rx="4.5" />
        {/* Çizgi önce, imza sonra: boş bir imza satırı "burada bir imza
            bekleniyor" diyor, imza gelince nereye atıldığı belli oluyor. */}
        <rect className="dhs-rule" x="158" y="264" width="158" height="2" rx="1" />
        <path
          className="dhs-sign"
          d="M160 254 c11 -24 20 11 31 -7 c9 -15 18 15 29 0 c9 -13 18 11 26 -2 c7 -11 15 7 24 -2"
        />
      </g>
    </svg>
  );
}

/* 3 · LİSANS — inen mühür ve bıraktığı iz. Döngünün en parlak sahnesi ve
   bunun bilerek böyle olması gerekiyor: beş sahne aynı parlaklıkta olsaydı
   hiçbiri bir şey söylemezdi.
   BEYAZ DOLU: yalnızca iz. Kartın tamamında saf beyazla dolu tek şekil bu.
   Ticaret lisansı bu sürecin gerçek çıktısı ve onu düzenleyen taraf biz
   değiliz; doluluk o "dışarıdan gelen onay"ın işareti.
   GRİ KONTUR: büyük panel bilerek ikincil düzlemde. Beyaz konturlu olsaydı
   376×252 birimlik bir beyaz çerçeve, içindeki 132×58'lik dolu izin tekliğini
   yutardı — sahnenin öznesi panel değil, izin kendisi.
   MAVİ: kalkan. Soyut; gerçek bir kurumun amblemi değil. */
function StageArtLisans() {
  return (
    <svg className="hkc-art" viewBox="0 0 440 340" aria-hidden="true" focusable="false">
      <rect className="dhs-sur-q" x="32" y="44" width="376" height="252" rx="20" />
      <rect className="dhs-well-soft" x="62" y="74" width="48" height="48" rx="13" />
      <path
        className="dhs-act"
        d="M86 84.56 l13.44 5.28 v10.56 c0 7.68 -5.76 12.96 -13.44 15.36 c-7.68 -2.4 -13.44 -7.68 -13.44 -15.36 v-10.56 Z"
      />
      <rect className="dhs-ink" x="126" y="88" width="124" height="14" rx="7" />
      <rect className="dhs-dim" x="62" y="152" width="180" height="9" rx="4.5" />
      <rect className="dhs-dim" x="62" y="178" width="136" height="9" rx="4.5" />
      <rect className="dhs-dim" x="62" y="204" width="160" height="9" rx="4.5" />
      <rect className="dhs-dim" x="62" y="230" width="104" height="9" rx="4.5" />

      {/* İz hafif eğik: elle basılmış bir mühür hiçbir zaman tam düz olmuyor,
          ve o küçük eğrilik çizimi "grafik" olmaktan çıkarıp nesne yapıyor.
          Üst kenarı (y=196) mührün en aşağıdaki hâliyle birebir hizalı. */}
      <g className="dhs-print" transform="rotate(-3 310 225)">
        <rect className="dhs-paper" x="244" y="196" width="132" height="58" rx="11" />
        <rect className="dhs-paper-ink" x="264" y="214" width="70" height="10" rx="5" />
        <rect className="dhs-paper-dim" x="264" y="232" width="48" height="8" rx="4" />
      </g>
      {/* Tokmak, boyun, taban, keçe. Taban tokmaktan belirgin şekilde geniş
          olmak zorunda, yoksa şekil mühür değil halter gibi okunuyor. */}
      <g className="dhs-stamp">
        <rect className="dhs-solid" x="282" y="60" width="56" height="24" rx="12" />
        <rect className="dhs-ink3" x="298" y="84" width="24" height="24" />
        <rect className="dhs-solid-2" x="244" y="108" width="132" height="32" rx="7" />
        <rect className="dhs-ink3" x="250" y="140" width="120" height="7" rx="3" />
      </g>
    </svg>
  );
}

/* 4 · KİMLİK — parmak izi plakası, üstünden geçen tarama ve arkada kimlik
   kartı. Beyaz çizim kararının en çok kazandırdığı sahne bu: siyah zeminde
   beyaz bir parmak izi, kartın tamamındaki en akılda kalıcı kare.
   BEYAZ: plakanın konturu ve sırtlar. Sırtlar saf beyaz değil, bir ton kısık:
   3.4 birimlik bir çizgi 1.5 birimlik konturun iki katından fazla alan
   kaplıyor ve saf beyazda parlayıp üstünden geçen mavi taramayı yutuyor.
   MAVİ: yalnızca tarama. Parmak izi NESNE, tarama OLAY — sahnede tek mavi
   kaldığı için hangisinin "şu an olan şey" olduğu sorulmuyor.
   Sırtların uçları içe kıvrılıyor; kıvrılmasaydı şekil parmak izi değil bir
   dizi kemer gibi okunurdu. Beyaz çizgide bu daha kritik: kısık gri bir şekli
   göz "parmak izi olmalı" diye tamamlıyordu, beyaz bir şekli gördüğü gibi
   okuyor. */
function StageArtKimlik() {
  return (
    <svg className="hkc-art" viewBox="0 0 440 340" aria-hidden="true" focusable="false">
      <defs>
        {/* Kırpma yolunun kimliği lab kopyasındakinden (h12Plate) ayrı: aynı
            id iki kez DOM'a girerse tarayıcı ilkine bağlanır ve ikinci kartın
            tarama çizgisi yanlış yerde kırpılır. İki kart bugün ayrı
            sayfalarda ama /lab/hero yarın canlı kartı da gösterebilir. */}
        <clipPath id="dhsPlate">
          <rect x="30" y="58" width="204" height="224" rx="28" />
        </clipPath>
      </defs>
      <rect className="dhs-sur" x="30" y="58" width="204" height="224" rx="28" />
      <g className="dhs-ridge" fill="none" strokeLinecap="round" strokeWidth="3.4">
        <path d="M74 246 C52 224 46 190 50 158 C58 106 92 76 132 76 C172 76 206 106 214 158 C218 190 212 224 190 246" />
        <path d="M88 250 C72 228 66 196 70 168 C78 122 100 96 132 96 C164 96 186 122 194 168 C198 196 192 228 176 250" />
        <path d="M102 248 C92 226 88 200 92 176 C100 140 112 118 132 118 C152 118 164 140 172 176 C176 200 172 226 162 248" />
        <path d="M114 242 C108 222 106 200 110 182 C116 154 122 140 132 140" />
        <path d="M140 141 C150 148 156 164 160 184 C164 204 162 224 156 240" />
        <path d="M124 218 C120 200 122 178 132 172 C142 178 146 196 144 212" />
      </g>
      {/* Tarama çizgisi kırpma yolunun içinde: plakanın yuvarlak köşelerinden
          taşmıyor, yani ışık gerçekten camın üstünde geziyor gibi duruyor. */}
      <g clipPath="url(#dhsPlate)">
        <rect className="dhs-scan" x="30" y="70" width="204" height="5" />
      </g>

      <rect className="dhs-sur-q" x="254" y="104" width="160" height="124" rx="15" />
      {/* Fotoğraf bloğu koyu, üstündeki figür açık — açık mürekkep bandına
          geçince figürü bloktan AÇIK yapmak bedava bir okunurluk. */}
      <rect className="dhs-dim" x="272" y="122" width="46" height="62" rx="8" />
      <circle className="dhs-ink2" cx="295" cy="143" r="10" />
      <path className="dhs-ink2" d="M278 176 c0 -11 8 -17 17 -17 c9 0 17 6 17 17 Z" />
      <rect className="dhs-ink2" x="330" y="128" width="62" height="10" rx="5" />
      <rect className="dhs-dim" x="330" y="149" width="50" height="7" rx="3.5" />
      <rect className="dhs-dim" x="330" y="164" width="40" height="7" rx="3.5" />
      <rect className="dhs-dim" x="272" y="198" width="124" height="8" rx="4" />
    </svg>
  );
}

/* 5 · BANKA — dosya kuruma doğru kayıyor ve orada duruyor.
   BEYAZ: yalnızca dosyanın konturu. Sahnenin öznesi bizim hazırladığımız
   dosya; kurum onun gittiği yer.
   EN KOYU KÜTLE: cephe. Bu sahnenin en çok düşünülen kararı — cephe 16.700
   birimlik bir alan, açık mürekkep bandına alınsaydı kadrajın yarısı gri bir
   bina olur, göz önce oraya giderdi ve "kararı banka veriyor" cümlesi çizimde
   "banka her şeydir"e dönerdi.
   MAVİ: dosyadaki tek satır — bizim tamamladığımız kısım. Yeşil tik ya da
   onay işareti OLAMAZ; onaylanan hiçbir şey yok, tamamlanan yalnızca hazırlık.
   Bekleyen üç nokta bunu bir kez daha söylüyor: bekleme işareti, onay işareti
   değil. */
function StageArtBanka() {
  return (
    <svg className="hkc-art" viewBox="0 0 440 340" aria-hidden="true" focusable="false">
      <path className="dhs-far" d="M248 112 L334 64 L420 112 Z" />
      <rect className="dhs-far" x="248" y="112" width="172" height="14" rx="3" />
      <rect className="dhs-far2" x="264" y="134" width="26" height="94" rx="3" />
      <rect className="dhs-far2" x="326" y="134" width="26" height="94" rx="3" />
      <rect className="dhs-far2" x="388" y="134" width="26" height="94" rx="3" />
      <rect className="dhs-far" x="240" y="228" width="188" height="15" rx="4" />

      <g className="dhs-slide">
        <rect className="dhs-sur-f" x="28" y="88" width="180" height="142" rx="15" />
        <rect className="dhs-ink" x="50" y="112" width="90" height="13" rx="6.5" />
        <rect className="dhs-dim" x="50" y="140" width="114" height="9" rx="4.5" />
        <rect className="dhs-dim" x="50" y="162" width="86" height="9" rx="4.5" />
        <rect className="dhs-act" x="50" y="186" width="66" height="9" rx="4.5" />
      </g>

      <g className="dhs-wait">
        <rect className="dhs-sur-q" x="28" y="250" width="112" height="34" rx="17" />
        <circle className="dhs-ink2" cx="56" cy="267" r="5.5" />
        <circle className="dhs-ink2" cx="84" cy="267" r="5.5" />
        <circle className="dhs-ink2" cx="112" cy="267" r="5.5" />
      </g>
    </svg>
  );
}

/* Beş aşama, countryContent.dubai.steps'teki yedi adımın sıkıştırılmış hâli;
   ilk üç adım tek aşamada toplandı, çünkü üçü de aynı görüşmede kapanıyor.
   Kartın işi adımların tamamını saymak değil, SIRAyı göstermek — tamamı
   sayfanın aşağısındaki süreç bölümünde zaten var ve alt satır oraya
   yolluyor. */
const STAGES: Stage[] = [
  {
    key: "karar",
    word: "Karar",
    meta: "Ad, faaliyet ve kuruluş tipi birlikte belirleniyor.",
    who: "siz",
    art: <StageArtKarar />,
  },
  {
    key: "tescil",
    word: "Tescil",
    meta: "Ana sözleşme, başvuru ve ekleri hazırlanıyor.",
    who: "ortac",
    art: <StageArtTescil />,
  },
  {
    key: "lisans",
    word: "Lisans",
    /* STANCE_LIMITS 2'nin cümleyle söylenen yarısı: takvim bizde değil. */
    meta: "Ticaret lisansını otorite düzenliyor, takvim onlarda.",
    who: "otorite",
    art: <StageArtLisans />,
  },
  {
    key: "kimlik",
    word: "Kimlik",
    /* FACTS.dubai.limit ile aynı gerçek, uyarı tonu olmadan. */
    meta: "Biyometri ve Emirates ID; bu aşama için bir kez BAE'de.",
    who: "siz",
    art: <StageArtKimlik />,
  },
  {
    key: "banka",
    word: "Banka",
    /* STANCE_LIMITS 1 birebir. "Hesap açılıyor" DEĞİL. */
    meta: "Başvuru dosyasını biz hazırlıyoruz, kararı banka veriyor.",
    who: "ortac",
    art: <StageArtBanka />,
  },
];

const WHO_LABEL: Record<Who, string> = {
  siz: "Siz",
  ortac: "Ortac",
  otorite: "Otorite",
};

/* Kartın kendi aşama listesi ortak bileşenin beklediği biçime burada
   çevriliyor. Tek gerçek dönüşüm rozet: MAVİ = siz, GRİ = siz değilsiniz —
   yani "ortac" ile "otorite" ziyaretçi açısından aynı kategoride ve rozet iki
   tonlu kalıyor. Kelime yine WHO_LABEL'dan, yani ekranda hiçbir şey değişmedi. */
const SCENES = STAGES.map((s) => ({
  key: s.key,
  word: s.word,
  meta: s.meta,
  art: s.art,
  badge: { label: WHO_LABEL[s.who], tone: s.who === "siz" ? ("you" as const) : ("muted" as const) },
}));

function DubaiStageCard() {
  /* İSKELET ARTIK ORTAK. Sahne kutusu, ad kutusu, şerit, künye, ölçüler,
     geçişler, duraklatma mantığı, geri sarma, erişilebilir ad ve hidrasyon
     kuralı HeroSceneCard'da; burada kalan tek şey bu sayfaya ait olan.

     `ordered` VE `rewind` AÇIK: bu kartın anlattığı şey SIRA. Şerit
     "bitti / şimdi / sıradaki" diye boyanıyor ve beşinciden birinciye dönüş
     şerit sönükken yapılıyor — dolu segmentlerin tek tek boşalması "geri adım"
     diye okunurdu. İkisi de opsiyonel: muhasebe kartı ikisini de kullanmıyor,
     çünkü orada dört iş aynı anda yürüyor.

     `stepLabel` "Karar aşaması" üretiyor: burada beş şey bir sürecin adımları,
     düğmenin adı da bunu söylüyor. */
  return (
    <HeroSceneCard
      ns="dhs"
      scenes={SCENES}
      dwell={DWELL}
      lastDwell={LAST}
      ordered
      rewind
      railLabel="Kuruluş aşamaları"
      stepLabel={(s) => `${s.word} aşaması`}
      foot={{
        icon: <Waypoints size={14} strokeWidth={2} aria-hidden="true" />,
        line: "Beş aşama, gerçekleşme sırasıyla. Adımların tamamı aşağıda.",
      }}
    />
  );
}

/* PageHero'nun Dubai hero'sunda gösterdiği kart.
   SEÇİM BURADA: PageHero yalnızca bu adı biliyor, kartı değiştirmek isteyen
   tek satırı değiştiriyor. Şu an sahne kartı — müşteri lab'da H12'yi görüp
   "siteye taşıyabilirsin şimdilik" dedi.

   Kart .phx-col'un (Dubai silueti + panel) İÇİNDE DEĞİL, sağ sütunun kendisi.
   İki sebep: müşteri kartı lab'da tam olarak böyle, kendi başına duran bir
   panel olarak onayladı; ve kart zaten kendi çerçevesini taşıyor. Onu ikinci
   bir panelin içine koymak 644px'lik bir kartın etrafına 20px'lik ince bir
   çerçeve bırakırdı, siluet de o kadar dar bir şeritte okunmazdı. HeroPanel
   ve siluet duruyor, çünkü /hero-lab'daki A/B/C onları kullanıyor.

   İNGİLTERE VE KKTC HENÜZ BU KARTI KULLANMIYOR: PageHero o iki ülkede eski
   vektör sahneyi (CountryScene) basmaya devam ediyor. Kart oraya geçtiğinde
   yapılacak tek şey PageHero'daki `dubai` koşulunu kaldırmak ve her ülke için
   beş çizim üretmek; ÖLÇÜ TARAFINDA HİÇBİR ŞEY YAPILMAYACAK. */
export const DubaiHeroCard = DubaiStageCard;
