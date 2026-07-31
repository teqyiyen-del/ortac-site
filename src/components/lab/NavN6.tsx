"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  BookOpen,
  Building2,
  Calculator,
  CalendarCheck,
  ChevronDown,
  Compass,
  FileDown,
  Handshake,
  IdCard,
  Landmark,
  Mail,
  Scale,
  Scale3d,
  ShieldCheck,
  SlidersHorizontal,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";

import Logo from "@/components/shared/Logo";
import SmartLink from "@/components/shared/SmartLink";
import { Flag } from "@/components/shared/CountryPicker";
import { useLenis } from "@/components/Providers";
import { gtm } from "@/lib/gtm";
import {
  COUNTRY_NAME,
  COUNTRY_ORDER,
  FACTS,
  PARTNERS,
  STANCE_LIMITS,
  type CountrySlug,
} from "@/lib/brand";
import { servicesFor, type ServiceSlug } from "@/lib/services";

/* ============================================================================
   N6 — "KART IZGARASI" (pano)              · N1'in üzerine yapılan varyasyon

   TEK CÜMLE
   N1'in ülke-önce tezini aynen tutar, ama paneli iki sütuna bölmez: üç ülke ve
   o ülkenin hizmetleri TEK bir kart ızgarasının satırlarıdır — menü bir pano
   gibi okunur, panelde tek bir koyu yüzey yoktur.

   ---------------------------------------------------------------------------
   1) NEYİ AYNEN TUTUYORUM (müşteri "n1'i bozma" dedi)
   - Menünün birinci ekseni ülke. "Hizmetler" panelinin ilk satırı üç ülkelik
     ray, altında seçili ülkenin brifingi.
   - Kapalı çubuk dört klasik başlık: Hizmetler · Araçlar · Kaynaklar · Kurumsal.
   - Yokluk görünür: hizmet ızgarası üç ülkenin BİRLEŞİMİ üzerinden basılıyor,
     o ülkede yürütmediğimiz hizmet kaybolmuyor, kesik çizgili ve tıklanamaz
     olarak yerinde kalıp gerekçesini söylüyor. İngiltere'de vize böyle görünür.
     Birleşim de, hangi ülkede hangisinin olduğu da servicesFor()'dan türüyor.
   - Klavye makinesi: tetikleyiciler button + aria-expanded/aria-controls, ok
     tuşları, ArrowDown ile panele iniş, Escape, odak dışarı çıkınca kapanma.
     Bunlar N1'de doğru çalışıyordu, yeniden icat etmek için sebep yok.

   ---------------------------------------------------------------------------
   2) "SAĞDAKİ SİYAH KISIMLAR KABA DURUYOR" — TEŞHİS

   Müşterinin şikâyet ettiği şey karanlık olmaları değil, koyunun burada YANLIŞ
   İŞ için kullanılmış olması. N1'de dört ayrı yerde koyu yüzey vardı:
   Araçlar/Kaynaklar panellerinin sağındaki #111111 kartlar (.n1-feat-c),
   Kurumsal panelinin sağındaki duruş kartı (.n1-stance), Hizmetler panelinin
   ayağındaki siyah "Uygunluk testi" hapı (.n1-foot-l[data-strong]) ve soldaki
   koyu kimlik sütunu (.n1-id). Dördünün de aynı üç hatası var:

   a) ORAN. Panel, sayfanın üstüne düşen GEÇİCİ ve HAFİF bir katman olmak
      zorunda. 360px genişliğinde, panel boyu kadar yüksek bir #111 levha o
      katmanın en büyük ve en ağır kütlesi hâline geliyor. Göz menüye değil
      levhaya iniyor; menü, yanında duran dekorun gölgesinde kalıyor.
   b) KONTRAST SIÇRAMASI. Panelin geri kalanının kelime dağarcığı "beyaz kart +
      #e6e6e6 saç teli". #111 ile #fff arasında ara ton yok: kenar katmanlı
      değil, damgalanmış görünüyor. Kaba duran şey tam olarak bu — yumuşak bir
      hiyerarşinin ortasındaki sert kesim.
   c) HİYERARŞİ TERSLİĞİ. Panelin en koyu, yani en ağır öğesi en önemsiz öğeydi
      (bir tanıtım kartı). Ağırlık ile önem birbirini tutmayınca göz her açılışta
      önce yanlış yere gidiyor. Canlı navbar bunu yapmıyor: onun öne çıkan
      kartları --paper zeminli, saç teli çerçeveli, mavi etiketli — yani
      panelin geri kalanıyla AYNI dille konuşuyor, sadece bir ton yukarıda.

   ÇÖZÜM: panelde hiç koyu yüzey yok. Vurgu artık üç şeyle taşınıyor:
     · mavi sistem (--blue-100 dolgu + --blue-600 çerçeve + mavi etiket),
     · ızgaradaki YER ve GENİŞLİK (bir kart satırın tamamını kaplıyorsa önemli),
     · sıra (ilk satır ülke, ikinci satır brifing, üçüncü satır hizmetler).
   Siyah hâlâ sitede var ama ait olduğu yerde: koyu hero'nun üstündeki saydam
   çubuk. Orası bir "blok" değil, sayfanın kendi zemini.

   Yan kazanç: panelin içinde koyu yüzey kalmayınca globals'ın mavi odak halkası
   panelin her yerinde doğru renk oluyor; N1'de koyu kartlar için ayrıca beyaz
   halka tanımlamak gerekiyordu.

   ---------------------------------------------------------------------------
   3) N1'DEN FARK — PANO

   N1'in Hizmetler paneli iki sütundu: solda 320px koyu kimlik sütunu, sağda
   hizmetler. Bu düzenin bedeli, ülkenin hizmetlerden AYRI bir nesne gibi
   görünmesiydi; oysa menünün tezi tam tersi, hizmet ülkenin içinden çıkıyor.

   N6'da panel tek bir ızgara. Üç ülke kartı, brifing şeridi ve altı hizmet
   hücresi AYNI üç sütunlu raya oturuyor:

     ┌──────────┬──────────┬──────────┐   1. satır: ülke ekseni (sekme kartları)
     │  Dubai▾  │ İngiltere│   KKTC   │      seçili olan mavi, altında ok
     ├──────────┴──────────┴──────────┤
     │  brifing şeridi (üç sütun boyu) │   2. satır: yapı · süre · kimler için
     ├──────────┬──────────┬──────────┤      + dürüst sınır + ülke sayfası
     │ kuruluş  │ muhasebe │  banka   │   3-4. satır: hizmetler + "emin değilim"
     │  vize    │  uyum    │ emin dğl │
     └──────────┴──────────┴──────────┘

   Ülke brifingi bir SÜTUN değil bir SATIR: eksen hâlâ en üstte ve hâlâ her
   şeyin belirleyicisi, ama artık ızgaranın dışına taşmıyor. Seçili ülke
   ızgaranın içinde vurgulanıyor ve altındaki küçük mavi ok, şeridin hangi
   karta ait olduğunu tek bakışta söylüyor (ok layoutId ile kayıyor: seçim
   değişti demenin en sessiz yolu).

   Kart dili doğrudan canlı navbar'dan alındı — müşterinin beğendiği düzen o:
   beyaz kart, 1px saç teli çerçeve, çerçeveli kare ikon kutusu, hover'da
   çerçeve maviye dönüyor ve ikon kutusu maviyle doluyor. Araçlar bölümü de
   canlıdaki gibi tek satır dört kart; farkı, yayında olan tek aracın koyu bir
   kartla değil mavi bir kartla işaretlenmesi.

   Panelin zemini beyaz değil --paper. Sebebi teknik: kart dili "beyaz kart +
   çerçeve" ise, kartların üstünde durduğu yüzey beyaz olamaz — beyaz üstünde
   beyaz kart nesne gibi görünmez, sadece çizgi olur. Paper zemin kartları
   gerçekten kart yapıyor ve panele aradığımız "pano" hissini veriyor.

   ---------------------------------------------------------------------------
   4) ÖLÇÜLÜ TERCİHLER
   - Ülke kartları hover ile DEĞİŞMİYOR, tıklama/klavye istiyor. Canlı navbar
     hover ile değiştiriyor ama orada ülke seçici SOL sütunda; burada birinci
     satırda, yani "Hizmetler" başlığından bir hizmet kartına inen imlecin tam
     güzergâhında. Hover ile seçseydik ziyaretçi hedefine giderken istemeden
     ülke değiştirirdi. Bilerek ödenen bir tıklama.
   - Menüde fiyat yok; fiyat hizmet sayfasında yaşıyor. Ülke KARARI için gereken
     üç şey (yapı, tipik süre aralığı, kimler için) brifing şeridinde ve hepsi
     brand.ts FACTS'ten okunuyor. Süre "tipik" olarak etiketleniyor — STANCE
     kesin süre taahhüdünü yasaklıyor. Ülkenin dürüst sınırı da şeritte, çünkü
     ziyaretçiyi eleyen bilgi tıklamadan SONRA değil ÖNCE okunmalı.
   - Yayında olmayan adres kararı burada verilmiyor; hepsi SmartLink. Rozet de
     basılmıyor — girdi yalnızca sönük ve tıklanamaz oluyor.
   - Mobilde mega panel yok ama pano fikri duruyor: ülke segmenti + aynı kart
     ızgarası (dar ekranda tek, 430px üstünde iki sütun). İkincil bölümlerin
     akordeon gövdeleri de kart ızgarası — masaüstüyle aynı dil.
   ========================================================================= */

/* Ülke kartının ikinci satırı. Nerede olduğunu söyler, iddia etmez. */
const COUNTRY_LINE: Record<CountrySlug, string> = {
  dubai: "Birleşik Arap Emirlikleri · ofisimiz burada",
  ingiltere: "Birleşik Krallık · Companies House",
  kktc: "Kuzey Kıbrıs · Türkiye'ye en yakın",
};

/* İkon slug'a bağlı, ülkeye değil: ülke değiştirirken göz ızgarada aynı yerde
   aynı şeyi bulsun, satırlar zıplamasın. */
const SVC_ICON: Record<ServiceSlug, LucideIcon> = {
  "sirket-kurulusu": Building2,
  muhasebe: CalendarCheck,
  "banka-hesabi": Landmark,
  "oturum-vize": IdCard,
  uyum: ShieldCheck,
};

/* Service.line tam bir cümle; menüde kartı iki katına çıkarıyor ve göz taramayı
   bırakıyor. Bunlar aynı içeriğin dört-beş kelimelik menü karşılıkları —
   uydurma değil, services.ts'teki includes/duration alanlarının kısaltması. */
const SVC_HINT: Record<ServiceSlug, string> = {
  "sirket-kurulusu": "İsim onayı, tescil ve kuruluş evrakı",
  muhasebe: "Defter, beyan ve dönemsel raporlama",
  "banka-hesabi": "Hesap başvurusu ve tahsilat kanalları",
  "oturum-vize": "Vize, sağlık kontrolü ve kimlik kartı",
  uyum: "Politika dosyası ve bildirim takvimi",
};

/* Ülkeye göre gerçekten değişen satırlar. Genel ipucu yerine bunu göstermek,
   ızgaranın "ülke değişti" demesini sağlayan ikinci sinyal. */
const SVC_HINT_LOCAL: Partial<Record<string, string>> = {
  "dubai:banka-hesabi": "Wio · Mashreq NeoBiz başvurusu",
  "dubai:uyum": "goAML kaydı ve bildirim yükümlülükleri",
  "ingiltere:banka-hesabi": "Wise · Payoneer · onay oranı düşük",
  "ingiltere:uyum": "PSC kaydı ve AML politikası",
  "kktc:banka-hesabi": "Yerel banka · imza için yerinde bulunma",
};

const hintFor = (c: CountrySlug, s: ServiceSlug) => SVC_HINT_LOCAL[`${c}:${s}`] ?? SVC_HINT[s];

/* Üç ülkenin hizmet listelerinin BİRLEŞİMİ, ilk görülme sırasıyla. Izgara her
   ülkede aynı sırada aynı sayıda hücre basıyor: ülke değişince düzen zıplamıyor
   ve eksik hizmet boşluk bırakmak yerine kendini söylüyor. Elle yazılmış liste
   yok — bir hizmet bir ülkede açıldığında hücre kendiliğinden canlanıyor. */
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
/* accent: N1'de bu iş koyu bir kartla yapılıyordu. Artık bir bayrak: aynı kart,
   mavi dolgu. Vurgu tonla değil renkle taşınıyor, kütle büyümüyor. */
type Tile = { label: string; href: string; hint: string; icon: LucideIcon; accent?: boolean };

/* Canlı navbar'ın Araçlar bölümü tek satır dört karttı ve müşterinin beğendiği
   düzen buydu. Aynen o: dört kart, dört sütun. Yayında olan tek araç (uygunluk
   testi) mavi kart; kalanların bir kısmı henüz yayında değil ve SmartLink bunu
   sönüklükle söylüyor — bölüm tamamen sönük görünmesin diye ayrı bir tanıtım
   bloğuna gerek kalmıyor. */
const TOOLS: Tile[] = [
  {
    label: "Uygunluk testi",
    href: "/uygunluk-testi",
    hint: "6 soru · ülke önerisi ve gerekçesi",
    icon: SlidersHorizontal,
    accent: true,
  },
  { label: "Ülke karşılaştırma", href: "/ulkeler", hint: "Üç ülke yan yana", icon: Scale3d },
  {
    /* Matris ana sayfada gerçekten var; ayrı bir /araclar sayfası uydurmak
       yerine yayında olan çapaya bağlanıyor. */
    label: "Ödeme altyapısı matrisi",
    href: "/#odeme-altyapisi",
    hint: "Hangi kanal nerede çalışıyor",
    icon: Landmark,
  },
  {
    label: "Maliyet hesaplayıcı",
    href: "/araclar/maliyet-hesaplayici",
    hint: "Paket ve ek hizmet tutarı",
    icon: Calculator,
  },
];

const RESOURCES: Tile[] = [
  { label: "Ülke rehberleri", href: "/kaynaklar", hint: "Dubai, İngiltere, KKTC", icon: BookOpen },
  { label: "Blog ve mevzuat", href: "/blog", hint: "Güncellemeler ve tarihler", icon: Scale },
  {
    label: "E-kitaplar",
    href: "/kaynaklar/e-kitaplar",
    hint: "Ücretsiz PDF rehberler",
    icon: FileDown,
  },
];

/* SWAP:NAV_FEATURED — menü kendi başına bir keşif yüzeyi. Tarih ve sayfa sayısı
   temsilî; gerçek içerik geldiğinde yalnızca bu blok değişir. Üç tane olması
   ızgara kararı: üst satırda üç kaynak kartı var, alt satır da üç olunca pano
   kapanıyor. */
const FEATURED = [
  {
    tag: "En çok indirilen",
    title: "Dubai kuruluş rehberi",
    meta: "32 sayfa · PDF",
    href: "/kaynaklar",
  },
  {
    tag: "En çok kullanılan",
    title: "Uygunluk testi",
    meta: "6 soru · 2 dk",
    href: "/uygunluk-testi",
  },
  { tag: "En güncel", title: "Kurumlar vergisi beyan takvimi", meta: "Temmuz 2026", href: "/blog" },
];

const CORPORATE: Tile[] = [
  { label: "Hakkımızda", href: "/hakkimizda", hint: "Ofis, lisans ve ekip", icon: Building2 },
  { label: "İletişim", href: "/iletisim", hint: "Dubai ofisi ve destek hattı", icon: Mail },
  {
    label: "İş ortaklığı",
    href: "/is-ortakligi",
    hint: "Danışman ve acente kanalı",
    icon: Handshake,
  },
];

/* Kurumsalın üç kartı da henüz yayında değil. Panelin tamamen sönük kalmaması
   için yanına sitenin gerçekten var olan en kurumsal metni konuyor: bir firmayı
   en iyi anlatan şey "hakkımızda" değil, ne söz VERMEDİĞİ. N1'de bu kart koyuydu
   ve şikâyet edilen bloklardan biriydi; burada ızgaranın tamamını kaplayan
   beyaz bir kart — ağırlığı renkten değil genişlikten alıyor. */
const CORP_LEAD: Tile = {
  label: "Duruşumuz",
  href: "/#durus",
  hint: "Ne söz vermiyoruz",
  icon: Scale,
};

/* Ortaklık iddiası elle yazılmıyor: brand.ts'teki resmî grup ne diyorsa o. */
const OFFICIAL = PARTNERS.filter((p) => p.group === "resmi")
  .map((p) => p.name)
  .join(" · ");

/* ------------------------------------------------------------------ anahtar */
const TOP = ["hizmetler", "araclar", "kaynaklar", "kurumsal"] as const;
type TopKey = (typeof TOP)[number];

const TOP_LABEL: Record<TopKey, string> = {
  hizmetler: "Hizmetler",
  araclar: "Araçlar",
  kaynaklar: "Kaynaklar",
  kurumsal: "Kurumsal",
};

/* mobil akordeonlar: Hizmetler hariç hepsi — Hizmetler çarşafın tepesinde ülke
   segmentiyle birlikte açık duruyor, çünkü çarşafın en çok kullanılan bölümü o */
const TAIL: TopKey[] = ["araclar", "kaynaklar", "kurumsal"];

const TAIL_ITEMS: Record<string, Tile[]> = {
  araclar: TOOLS,
  kaynaklar: RESOURCES,
  kurumsal: [...CORPORATE, CORP_LEAD],
};

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------- parça */
/* Panonun tek yapı taşı. Canlı navbar'ın .nv2-card düzeni: çerçeveli kare ikon
   kutusu + iki satır metin. Masaüstünde de mobilde de aynı bileşen kullanılıyor
   ki iki yüzeyde iki ayrı dil olmasın. */
function Card({ t, onGo }: { t: Tile; onGo: () => void }) {
  return (
    <SmartLink
      href={t.href}
      className="n6-card"
      data-accent={t.accent ? "" : undefined}
      onClick={onGo}
    >
      <span className="n6-ic" aria-hidden="true">
        <t.icon size={18} strokeWidth={1.9} />
      </span>
      <span className="n6-tx">
        <b>{t.label}</b>
        <em>{t.hint}</em>
      </span>
    </SmartLink>
  );
}

/* --------------------------------------------------------- HİZMETLER panosu */
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
     brifingini sırayla okuyup karşılaştırabiliyor. */
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
    <div className="n6-board">
      <p className="n6-lbl" id="n6-rail-lbl">
        Önce ülke <span>· hizmet listesi seçiminize göre değişiyor</span>
      </p>

      {/* Panonun birinci satırı. Alttaki hizmet ızgarasıyla AYNI üç sütuna
          oturuyor; iki ayrı grid ama aynı ray, o yüzden tek bir tablo gibi
          okunuyor. Ayrı grid olmalarının sebebi erişilebilirlik: tablist ile
          tabpanel farklı kaplar olmak zorunda, display:contents ile tek gride
          zorlamak bazı tarayıcılarda rolü erişilebilirlik ağacından düşürüyor. */}
      <div className="n6-rail" role="tablist" aria-labelledby="n6-rail-lbl">
        {COUNTRY_ORDER.map((k, i) => (
          <button
            key={k}
            type="button"
            role="tab"
            id={`n6-tab-${k}`}
            /* Sütun elle veriliyor. Sebebi ızgaranın yerleştirme sırası: aşağıdaki
               ok KESİN konumlu bir hücre (satır 1, seçili sütun) ve grid kesin
               konumluları otomatiklerden ÖNCE yerleştiriyor; kartlar otomatik
               kalsaydı okun kapattığı hücreyi atlar, ray bir sütun kayardı. */
            style={{ gridColumn: i + 1 }}
            ref={(el) => {
              tabs.current[k] = el;
            }}
            className="n6-ctry"
            aria-selected={c === k}
            aria-controls="n6-cty-panel"
            tabIndex={c === k ? 0 : -1}
            data-here={here === k}
            data-pfocus={c === k ? "" : undefined}
            onClick={() => onPick(k)}
            onKeyDown={onTabKey}
          >
            <span className="n6-flag" aria-hidden="true">
              <Flag country={k} />
            </span>
            <span className="n6-tx">
              <b>{COUNTRY_NAME[k]}</b>
              <em>{COUNTRY_LINE[k]}</em>
            </span>
            {here === k && <span className="n6-sr"> (şu an bu ülkedesiniz)</span>}
          </button>
        ))}

        {/* Şeridin hangi karta ait olduğunu söyleyen tek işaret. layoutId ile
            kartlar arasında kayıyor: üç kutunun sırayla yanıp sönmesinden daha
            sakin bir "seçim değişti" ifadesi.
            Kartın İÇİNDE değil, rayın kendi ızgarasında bir hücre: <button>
            Firefox'ta içeriğini kırpıyor, kartın altına taşan bir ok orada
            görünmezdi. Seçili sütuna gridColumn ile oturuyor, negatif alt
            marjıyla kartın altından çıkıyor. aria-hidden olduğu için tablist'in
            sahiplendiği öğeler yine yalnızca üç sekme. */}
        <motion.span
          layoutId="n6-caret"
          className="n6-caret"
          aria-hidden="true"
          style={{ gridColumn: COUNTRY_ORDER.indexOf(c) + 1 }}
          transition={reduce ? { duration: 0 } : { duration: 0.26, ease: EASE }}
        >
          <span className="n6-caret-d" />
        </motion.span>
      </div>

      <div
        className="n6-body"
        id="n6-cty-panel"
        role="tabpanel"
        aria-labelledby={`n6-tab-${c}`}
      >
        <motion.div
          key={c}
          className="n6-bodyin"
          initial={reduce ? false : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.18, ease: EASE }}
        >
          {/* Panonun ikinci satırı: brifing. Sütun değil şerit — üç sütunun
              tamamını kaplıyor, yani ızgaranın dışına çıkmıyor ama ızgaradaki
              en geniş nesne olarak "bu satır önemli" diyor. */}
          <div className="n6-strip">
            <div className="n6-strip-main">
              <p className="n6-strip-h">
                <span className="n6-flag n6-flag-sm" aria-hidden="true">
                  <Flag country={c} />
                </span>
                {COUNTRY_NAME[c]}
              </p>

              <dl className="n6-facts">
                <div>
                  <dt>Yapı</dt>
                  <dd>{f.structure}</dd>
                </div>
                <div>
                  <dt>Tipik süre</dt>
                  <dd>{f.days}</dd>
                </div>
                <div>
                  <dt>Kimler için</dt>
                  <dd>{f.forWhom}</dd>
                </div>
              </dl>

              {/* Ülkenin dürüst sınırı menüde de duruyor: ziyaretçiyi eleyen
                  bilgi tıklamadan sonra değil, tıklamadan önce okunmalı. */}
              <p className="n6-limit">
                <TriangleAlert size={14} strokeWidth={2.1} aria-hidden="true" />
                {f.limit}
              </p>
            </div>

            <SmartLink href={`/${c}`} className="n6-strip-go" onClick={onGo}>
              {COUNTRY_NAME[c]} ülke sayfası
              <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
            </SmartLink>
          </div>

          <p className="n6-lbl n6-lbl-row">
            <span>{COUNTRY_NAME[c]} için yürüttüğümüz hizmetler</span>
            <SmartLink href="/ulkeler" className="n6-lbl-l" onClick={onGo}>
              Üç ülkeyi yan yana karşılaştırın
              <ArrowRight size={13} strokeWidth={2.2} aria-hidden="true" />
            </SmartLink>
          </p>

          {/* Panonun üçüncü ve dördüncü satırı. Beş hizmet + bir çıkış hücresi =
              altı hücre, üç sütunda tam iki satır. Izgaranın kapanması tesadüf
              değil: karar veremeyene çıkış zaten borçluyduk, onu panonun boş
              kalan hücresine koymak hem borcu ödüyor hem düzeni tamamlıyor. */}
          <div className="n6-grid">
            {SERVICE_UNIVERSE.map((u) => {
              const s = own.get(u.slug);
              const Icon = SVC_ICON[u.slug];

              /* Yokluk sessiz kalmıyor. Hücre yerinde duruyor, kesik çizgili ve
                 tıklanamaz; hangi ülkede yürütmediğimizi söylüyor. */
              if (!s) {
                return (
                  <span key={u.slug} className="n6-card" data-dead="">
                    <span className="n6-ic" aria-hidden="true">
                      <Icon size={18} strokeWidth={1.9} />
                    </span>
                    <span className="n6-tx">
                      <b>{u.title}</b>
                      <em>{COUNTRY_NAME[c]} için yürütmüyoruz</em>
                    </span>
                  </span>
                );
              }

              return (
                <SmartLink key={u.slug} href={`/${c}/${u.slug}`} className="n6-card" onClick={onGo}>
                  <span className="n6-ic" aria-hidden="true">
                    <Icon size={18} strokeWidth={1.9} />
                  </span>
                  <span className="n6-tx">
                    <b>{s.title}</b>
                    <em>{hintFor(c, s.slug)}</em>
                  </span>
                </SmartLink>
              );
            })}

            <SmartLink href="/uygunluk-testi" className="n6-card" data-accent="" onClick={onGo}>
              <span className="n6-ic" aria-hidden="true">
                <Compass size={18} strokeWidth={1.9} />
              </span>
              <span className="n6-tx">
                <b>Hangi ülke size uyuyor?</b>
                <em>6 soruda öneri ve gerekçesi</em>
              </span>
            </SmartLink>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* --------------------------------- ARAÇLAR / KAYNAKLAR / KURUMSAL panoları */
function TailPanel({ k, onGo }: { k: TopKey; onGo: () => void }) {
  if (k === "araclar") {
    return (
      <div className="n6-board">
        <p className="n6-lbl">Karar vermeden önce çalıştırabileceğiniz araçlar</p>
        {/* Canlı navbar'daki düzenin birebir karşılığı: tek satır, dört kart. */}
        <div className="n6-grid" data-cols="4">
          {TOOLS.map((t) => (
            <Card key={t.label} t={t} onGo={onGo} />
          ))}
        </div>
        <p className="n6-note">
          Araçların çıktısı bir ön değerlendirmedir, teklif değildir. Sonucu birlikte gözden
          geçiriyoruz.
        </p>
      </div>
    );
  }

  if (k === "kaynaklar") {
    return (
      <div className="n6-board">
        <p className="n6-lbl">Okumalık ve indirilebilir kaynaklar</p>
        <div className="n6-grid">
          {RESOURCES.map((t) => (
            <Card key={t.label} t={t} onGo={onGo} />
          ))}
        </div>
        {/* N1'de bu üç kart koyuydu ve sağ sütunda duruyordu. Aynı bilgi, aynı
            ızgarada, bir satır aşağıda: mavi etiket taşımaları onları zaten
            ayırıyor, ayrıca siyah olmalarına gerek yok. */}
        <p className="n6-lbl">Öne çıkanlar</p>
        <div className="n6-grid">
          {FEATURED.map((f) => (
            <SmartLink key={f.title} href={f.href} className="n6-feat" onClick={onGo}>
              <span className="n6-feat-tag">{f.tag}</span>
              <span className="n6-feat-t">{f.title}</span>
              <span className="n6-feat-m">{f.meta}</span>
            </SmartLink>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="n6-board">
      <p className="n6-lbl">Kurumsal</p>
      <div className="n6-grid">
        {CORPORATE.map((t) => (
          <Card key={t.label} t={t} onGo={onGo} />
        ))}
      </div>

      {/* Üç sütunun tamamını kaplayan tek kart. Başlıklar brand.ts
          STANCE_LIMITS'ten okunuyor; üç madde panonun üç sütununa oturuyor. */}
      <SmartLink href={CORP_LEAD.href} className="n6-stance" onClick={onGo}>
        <span className="n6-stance-h">
          <Scale size={16} strokeWidth={2} aria-hidden="true" />
          {CORP_LEAD.label}
          <em>{CORP_LEAD.hint}</em>
        </span>
        <span className="n6-stance-l">
          {STANCE_LIMITS.map((s) => (
            <span key={s.title}>{s.title}</span>
          ))}
        </span>
        <span className="n6-stance-go">
          Tamamını okuyun
          <ArrowRight size={14} strokeWidth={2.2} aria-hidden="true" />
        </span>
      </SmartLink>

      <p className="n6-note">
        <span className="n6-note-k">Resmî iş ortaklarımız</span>
        {OFFICIAL}
      </p>
    </div>
  );
}

/* ==================================================================== navbar */
export default function NavN6() {
  const lenis = useLenis();
  const pathname = usePathname();
  const reduce = useReducedMotion() ?? false;

  /* hangi ülkedeyiz — panonun açılış ülkesi ve "buradasınız" işareti için */
  const seg = pathname?.split("/")[1] ?? "";
  const here = (COUNTRY_ORDER as string[]).includes(seg) ? (seg as CountrySlug) : null;

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<TopKey | null>(null);
  /* Panonun seçili ülkesi. Bulunduğunuz ülke varsa menü orada açılıyor: sitenin
     geri kalanı "önce ülke" diyorsa menü de kullanıcının zaten verdiği kararı
     hatırlamalı. */
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

  /* Masaüstü panoda kaydırmayı KİLİTLEMİYORUZ, kapatıyoruz. Kilitlemek daha
     kolay olurdu ama pano hover ile de açılabildiği için, çubuğun üstünden
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

  /* Adres değişince her şey kapanır ve ülke seçimi yeni sayfaya uyar. SmartLink
     tıklamaları zaten kapatıyor; bu, tarayıcının geri/ileri tuşları için emniyet
     kemeri. Effect değil render sırasında düzeltme (React'in "prop değişince
     state ayarla" kalıbı) — effect kullanmak bir kare boyunca açık panonun yeni
     sayfanın üstünde asılı kalmasına yol açıyor. */
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

  /* ArrowDown ile açılan panoda odak ilk anlamlı öğeye iner. Hizmetler panosunda
     bu öğe SEÇİLİ ÜLKE KARTI ([data-pfocus]) — klavye kullanıcısının da ilk
     durağı ülke seçimi oluyor, tıpkı farede olduğu gibi. Diğer panolarda ilk
     bağlantıya düşüyor. */
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

  /* Odak header'dan tamamen çıkarsa pano kapanır. Odak tuzağı yok: pano içinden
     Tab ile sağdaki CTA'ya geçilebiliyor, oradan da sayfaya. */
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

  /* --------------------------------------------------- mobil segment (tab) */
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
      className="n6"
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
             panoyu kapatmamalı: odak hâlâ içerideyse orada bir şey okunuyor. */
          if (root.contains(document.activeElement)) return;
          setOpen(null);
        }, 160);
      }}
    >
      <div className="container-o n6-bar">
        <SmartLink href="/" aria-label="Ortac Global" className="n6-logo" onClick={closeAll}>
          <Logo height={24} />
        </SmartLink>

        <nav className="n6-nav" aria-label="Ana menü">
          {TOP.map((k) => {
            /* Ülke rayı çubukta değil panoda, ama "buradasınız" bilgisi
               kaybolmasın: bir ülke sayfasındaysanız Hizmetler başlığı küçük bir
               noktayla işaretleniyor ve ekran okuyucuya hangi ülke olduğu
               söyleniyor. Dört kelimeyi bozmadan verilebilecek tek sinyal bu. */
            const marked = k === "hizmetler" && here !== null;
            return (
              <button
                key={k}
                type="button"
                ref={(el) => {
                  triggers.current[k] = el;
                }}
                className="n6-top"
                data-on={open === k}
                data-here={marked}
                aria-expanded={open === k}
                aria-controls={open === k ? "n6-mega" : undefined}
                onClick={() => toggle(k)}
                onKeyDown={(e) => onTriggerKey(e, k)}
                onPointerEnter={(e) => hoverOpen(e, k)}
                onPointerLeave={() => {
                  if (suppress.current === k) suppress.current = null;
                }}
              >
                {TOP_LABEL[k]}
                {marked && here && (
                  <span className="n6-sr"> — şu an {COUNTRY_NAME[here]} sayfasındasınız</span>
                )}
                <ChevronDown className="n6-chev" size={13} strokeWidth={2.4} aria-hidden="true" />
              </button>
            );
          })}
        </nav>

        {/* Pano DOM'da menü ile sağ blok arasında: klavyeyle panodan çıkan odak
            doğal olarak CTA'ya düşüyor, sayfanın başına dönmüyor. */}
        <AnimatePresence>
          {open !== null && (
            <motion.div
              id="n6-mega"
              ref={panelRef}
              className="n6-panel"
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

        <div className="n6-right">
          <span className="n6-lang" role="group" aria-label="Dil">
            <button type="button" data-on="" aria-pressed="true">
              TR
            </button>
            <button type="button" aria-pressed="false" aria-disabled="true" title="Yakında">
              EN
            </button>
          </span>
          <SmartLink href="/panel" className="n6-ghost">
            Panel
          </SmartLink>
          <SmartLink href="/basla" className="n6-cta" onClick={() => gtm("nav_cta_click")}>
            Kurulumu Başlat
            <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
          </SmartLink>
        </div>

        <button
          type="button"
          ref={burgerRef}
          className="n6-burger"
          aria-label={sheet ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={sheet}
          aria-controls={sheet ? "n6-sheet" : undefined}
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
            id="n6-sheet"
            className="n6-sheet"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: reduce ? 0.01 : 0.26, ease: EASE }}
          >
            <div className="n6-sheet-in">
              {/* Masaüstüyle aynı adlandırma ve aynı sıra: önce ülke, sonra
                  hizmet. Mobilde akordeona sokmuyoruz — çarşafın en çok
                  kullanılan bölümü bu, kapalı başlamasın. */}
              <p className="n6-lbl" id="n6-seg-lbl">
                Hizmetler <span>· önce ülke seçin</span>
              </p>

              <div className="n6-seg" role="tablist" aria-labelledby="n6-seg-lbl">
                {COUNTRY_ORDER.map((c) => (
                  <button
                    key={c}
                    type="button"
                    role="tab"
                    id={`n6-seg-${c}`}
                    ref={(el) => {
                      segs.current[c] = el;
                    }}
                    aria-selected={sheetCountry === c}
                    aria-controls="n6-seg-panel"
                    tabIndex={sheetCountry === c ? 0 : -1}
                    className="n6-seg-b"
                    onClick={() => setSheetCountry(c)}
                    onKeyDown={(e) => onSegKey(e, c)}
                  >
                    <span className="n6-flag n6-flag-sm" aria-hidden="true">
                      <Flag country={c} />
                    </span>
                    {COUNTRY_NAME[c]}
                  </button>
                ))}
              </div>

              <div
                className="n6-seg-panel"
                id="n6-seg-panel"
                role="tabpanel"
                aria-labelledby={`n6-seg-${sheetCountry}`}
              >
                <SmartLink href={`/${sheetCountry}`} className="n6-m-country" onClick={closeAll}>
                  <span className="n6-tx">
                    <b>{COUNTRY_NAME[sheetCountry]} ülke sayfası</b>
                    <em>
                      {FACTS[sheetCountry].structure} · {FACTS[sheetCountry].days}
                    </em>
                  </span>
                  <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
                </SmartLink>

                {/* Masaüstündeki ızgarayla aynı kural ve aynı kart: liste
                    birleşim üzerinden basılıyor, o ülkede olmayan hizmet
                    kaybolmuyor, "yürütmüyoruz" diyor. */}
                <div className="n6-m-grid">
                  {SERVICE_UNIVERSE.map((u) => {
                    const s = sheetOwn.get(u.slug);
                    const Icon = SVC_ICON[u.slug];
                    if (!s) {
                      return (
                        <span key={u.slug} className="n6-card" data-dead="">
                          <span className="n6-ic" aria-hidden="true">
                            <Icon size={17} strokeWidth={1.9} />
                          </span>
                          <span className="n6-tx">
                            <b>{u.title}</b>
                            <em>{COUNTRY_NAME[sheetCountry]} için yok</em>
                          </span>
                        </span>
                      );
                    }
                    return (
                      <SmartLink
                        key={u.slug}
                        href={`/${sheetCountry}/${u.slug}`}
                        className="n6-card"
                        onClick={closeAll}
                      >
                        <span className="n6-ic" aria-hidden="true">
                          <Icon size={17} strokeWidth={1.9} />
                        </span>
                        <span className="n6-tx">
                          <b>{s.title}</b>
                          <em>{hintFor(sheetCountry, s.slug)}</em>
                        </span>
                      </SmartLink>
                    );
                  })}

                  <SmartLink
                    href="/uygunluk-testi"
                    className="n6-card"
                    data-accent=""
                    onClick={closeAll}
                  >
                    <span className="n6-ic" aria-hidden="true">
                      <Compass size={17} strokeWidth={1.9} />
                    </span>
                    <span className="n6-tx">
                      <b>Hangi ülke size uyuyor?</b>
                      <em>6 soruda öneri ve gerekçesi</em>
                    </span>
                  </SmartLink>
                </div>

                <p className="n6-limit n6-limit-m">
                  <TriangleAlert size={13} strokeWidth={2.1} aria-hidden="true" />
                  {FACTS[sheetCountry].limit}
                </p>
              </div>

              <div className="n6-m-acc">
                {TAIL.map((k) => {
                  const items = TAIL_ITEMS[k];
                  const on = sheetSec === k;
                  return (
                    <div key={k} className="n6-m-sec">
                      <button
                        type="button"
                        className="n6-m-top"
                        aria-expanded={on}
                        aria-controls={on ? `n6-m-${k}` : undefined}
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
                            id={`n6-m-${k}`}
                            initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                            animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                            transition={{ duration: reduce ? 0.01 : 0.22, ease: EASE }}
                            style={{ overflow: "hidden" }}
                          >
                            <div className="n6-m-grid n6-m-grid-acc">
                              {items.map((t) => (
                                <Card key={t.label} t={t} onGo={closeAll} />
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              <div className="n6-m-cta">
                <SmartLink href="/basla" className="n6-cta n6-cta-full" onClick={closeAll}>
                  Kurulumu Başlat
                  <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
                </SmartLink>
                <SmartLink href="/panel" className="n6-ghost n6-ghost-full" onClick={closeAll}>
                  Panel
                </SmartLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Perde: hem odağı panoya toplar hem dışarı tıklamayı tek yerde çözer.
          Klavye için görünmez (aria-hidden, odaklanamaz). */}
      <AnimatePresence>
        {(open !== null || sheet) && (
          <motion.div
            className="n6-scrim"
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
