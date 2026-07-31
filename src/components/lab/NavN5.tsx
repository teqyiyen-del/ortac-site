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
   N5 — "KOYU AMA İNCE"                       (stil: src/app/css/lab-n5.css)

   N1'İN NESİ KALIYOR
   Menünün birinci ekseni yine ülke. Kapalı çubukta dört klasik başlık var
   (Hizmetler · Araçlar · Kaynaklar · Kurumsal), "Hizmetler" panelinin ilk
   satırı yine üç ülkelik ray, rayın altında yine seçili ülkenin brifingi ve o
   ülkede gerçekten yürüttüğümüz hizmetler. Hizmet listesi yine servicesFor()
   birleşiminden türüyor, yani İngiltere'de vizenin OLMADIĞI görünüyor. Tez
   aynı: ziyaretçi bir hizmet adına tıklamadan önce bir ülkenin içinden geçiyor.

   TEŞHİS — "sağdaki siyah bloklar kaba duruyor" neden kaba duruyor
   Önce kabaca ölçtüm, çünkü "kaba" bir his ve hislerin altında hep bir sayı
   var. N1'in panelinde koyu yüzey şu kadar yer kaplıyor:
     · Hizmetler paneli — .n1-id kimlik sütunu ≈ 320 × 340 px = 108.800 px²,
       panelin iç alanı ≈ 1136 × 380 = 431.680 px² → panelin %25'i.
     · Kurumsal paneli — .n1-stance ≈ 360 × 215 = 77.400 px², panel ≈ 340.800
       → %23.
   Yani panelin dörtte biri saf #111111.

   Suçlu KONTRAST DEĞİL: #111111'in beyaz üstündeki kontrastı 18.9:1, yani
   sayfadaki normal gövde metniyle birebir aynı. Bir paragraf bu kontrastta
   kaba durmuyor. Üç şey birlikte kabalaştırıyor:

     1. ALAN. Kontrast sabit kalsa bile algılanan ağırlık alanla çarpılıyor.
        Bir cümlelik siyah "mürekkep"tir; panelin dörtte biri kadar siyah
        "ikinci bir arka plan"dır. Üstelik bu ikinci arka plan panelin İKİNCİL
        sütununda duruyordu — yani en az önemli içerik en ağır görünüyordu,
        görsel hiyerarşi bilgi hiyerarşisinin tersine dönüyordu.
     2. TON MERDİVENİNİN ORTASI YOK. Panelin değer basamakları şöyle: beyaz
        (%100) → paper %96 → hairline %90 → blue-100 %95… ve sonra bir anda
        %7. Aradaki bütün basamaklar boş. Göz bu sıçramayı "levhaya konmuş bir
        kart" diye değil, "levhada açılmış bir delik" diye okuyor.
     3. KENAR ÇİZİLMEMİŞ. .n1-feat-c ve .n1-stance kenarlıksız: 12px yarıçaplı
        siyah dikdörtgen doğrudan beyaza dayanıyor, arada tek bir hairline yok.
        Canlı navbar'ın .nv2-feat-card'ı tam tersi — dolgusu --paper, kenarı
        1px --border. Müşterinin "şu anki site bile daha güzel" demesinin
        teknik karşılığı bu: orada kartın kenarı ÇİZİLİ, burada değil.

   ÇÖZÜM — gece bir yüzey değil, bir İŞARET
   Koyuyu atmıyorum; ülke brifingine kimliği o veriyor. Ama artık üç boyda
   çıkıyor ve dördüncü bir boy yok:
     · 3px ray  — kartın baş kenarında, "bu panelin devam yolu bu" işareti
     · 42px jeton — bayrağın ve öncü kartın ikonunun arkasındaki küçük alan
     · 38px hap  — panelin tek birincil eylemi (ülke sayfası)
   Kural sayıyla: hiçbir gece yüzeyi 42px'i geçmiyor ve panelin toplam gece
   alanı ≈ 13.800 px², yani %3.4. N1'de %25'ti. Kütle sekizde bire indi, koyu
   kayboldu mu — hayır, hâlâ ilk görülen şey.

   Kalan bütün yüzeyler canlı navbar'ın kart düzenini alıyor: beyaz/paper
   dolgu, 1px --border kenar, 40px çerçeveli ikon kutusu, hover'da mavi kenar +
   yumuşak mavi gölge + 1px kalkma (.nv2-card'ın birebir oranları). Böylece ton
   merdiveninin ortası doluyor ve delik hissi kayboluyor.

   N1'DEN ÜÇÜNCÜ FARK — geometri
   N1'in Hizmetler paneli iki sütundu: solda koyu kimlik, sağda hizmetler.
   Koyu sütun kalkınca o geometriyi tutmanın sebebi de kalmıyor. N5 üç yatay
   kata geçiyor: ray → tek satırlık ülke brifingi → tam genişlikte hizmet
   ızgarası. Kazanç somut: hizmet kartları 320px'lik sütunu geri alıyor ve
   müşterinin beğendiği canlı düzenin 3'lü kart ritmi Hizmetler'de de mümkün
   oluyor. Araçlar ise doğrudan canlı navbar'daki hâliyle: dört kart, yan yana,
   tam genişlik.

   YAYINDA OLMAYAN ADRESLER
   Karar bu dosyada verilmiyor; her bağlantı SmartLink. Yayında olmayan girdi
   sönük (opacity .52) ve tıklanamaz oluyor, rozet basılmıyor. Bu yüzden
   Kurumsal'ın üç kartı ve hesaplayıcı şu an sönük — eksiklik değil, sitenin
   gerçek durumu.

   ERİŞİLEBİLİRLİK
   - Tetikleyiciler <button aria-expanded/aria-controls>.
   - Hover tek yol değil: tıklama, Enter/Space, ArrowDown da açıyor; dokunmatik
     pointer'da hover hiç çalışmıyor.
   - Ülke rayı gerçek sekme grubu: roving tabindex, ok tuşlarıyla seçim,
     aria-selected/aria-controls.
   - ArrowDown ile açılan Hizmetler panelinde odak seçili ülke sekmesine iniyor.
   - Escape kapatıyor ve odağı tetikleyiciye geri veriyor; odak header'dan
     çıkarsa panel kendiliğinden kapanıyor. Odak tuzağı yok.
   ========================================================================= */

/* Ülke başlığının altındaki tek satır. Nerede olduğunu söyler, iddia etmez. */
const COUNTRY_LINE: Record<CountrySlug, string> = {
  dubai: "Birleşik Arap Emirlikleri · ofisimiz burada",
  ingiltere: "Birleşik Krallık · Companies House",
  kktc: "Kuzey Kıbrıs · Türkiye'ye en yakın",
};

/* İkon slug'a bağlı, ülkeye değil: ray üstünde ülke değiştirirken göz aynı
   yerde aynı şeyi bulsun. */
const SVC_ICON: Record<ServiceSlug, LucideIcon> = {
  "sirket-kurulusu": Building2,
  muhasebe: CalendarCheck,
  "banka-hesabi": Landmark,
  "oturum-vize": IdCard,
  uyum: ShieldCheck,
};

/* services.ts'teki Service.line tam bir cümle; menüde kartı iki katına
   çıkarıyor ve göz taramayı bırakıyor. Menü için dört-beş kelimelik karşılık.
   İçerik uydurulmuyor: hepsi includes/duration alanlarının kısaltması. */
const SVC_HINT: Record<ServiceSlug, string> = {
  "sirket-kurulusu": "İsim onayı, tescil ve kuruluş evrakı",
  muhasebe: "Defter, beyan ve dönemsel raporlama",
  "banka-hesabi": "Hesap başvurusu ve tahsilat kanalları",
  "oturum-vize": "Vize, sağlık kontrolü ve kimlik kartı",
  uyum: "Politika dosyası ve bildirim takvimi",
};

/* Ülkeye göre gerçekten değişen satırlar. */
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
   ve o ülkede olmayan hizmet boşluk bırakmak yerine kendini söylüyor. Elle
   yazılmış liste yok — bir hizmet bir ülkede açıldığında kart kendiliğinden
   canlanıyor. */
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
/* lead: panelin "buradan devam et" kartı. Gece işareti (3px ray + koyu ikon
   jetonu) yalnızca bu karta düşüyor — panel başına bir tane. */
type Tile = { label: string; href: string; hint: string; icon: LucideIcon; lead?: true };

/* Canlı navbar'ın Araçlar bölümü dört karttı ve müşterinin beğendiği düzen
   buydu; dördü de burada, aynı sırayla. Hesaplayıcı henüz yayında değil —
   SmartLink onu kendiliğinden sönükleştiriyor, biz karar vermiyoruz. */
const TOOLS: Tile[] = [
  {
    label: "Uygunluk testi",
    href: "/uygunluk-testi",
    hint: "6 soru · ülke önerisi ve gerekçesi",
    icon: SlidersHorizontal,
    lead: true,
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
  {
    label: "Ülke rehberleri",
    href: "/kaynaklar",
    hint: "Dubai, İngiltere, KKTC",
    icon: BookOpen,
    lead: true,
  },
  { label: "Blog ve mevzuat", href: "/blog", hint: "Güncellemeler ve tarihler", icon: Scale },
  {
    label: "E-kitaplar",
    href: "/kaynaklar/e-kitaplar",
    hint: "Ücretsiz PDF rehberler",
    icon: FileDown,
  },
];

/* SWAP:NAV_FEATURED — menü kendi başına bir keşif yüzeyi. Tarih ve sayfa sayısı
   temsilî; gerçek içerik geldiğinde yalnızca bu blok değişir. Yayında olan kart
   başta: sönük bir kartla karşılamak kötü bir açılış. */
const FEATURED: { tag: string; title: string; meta: string; href: string; lead?: true }[] = [
  {
    tag: "En çok indirilen",
    title: "Dubai kuruluş rehberi",
    meta: "32 sayfa · PDF",
    href: "/kaynaklar",
    lead: true,
  },
  { tag: "En güncel", title: "Kurumlar vergisi beyan takvimi", meta: "Temmuz 2026", href: "/blog" },
];

const CORPORATE: Tile[] = [
  { label: "Hakkımızda", href: "/hakkimizda", hint: "Ofis, lisans ve ekip", icon: Building2 },
  {
    label: "İş ortaklığı",
    href: "/is-ortakligi",
    hint: "Danışman ve acente kanalı",
    icon: Handshake,
  },
  { label: "İletişim", href: "/iletisim", hint: "Dubai ofisi ve destek hattı", icon: Mail },
];

/* Kurumsal panelinin yayında olan tarafı. Bir firmayı en iyi anlatan şey
   "hakkımızda" sayfası değil, ne söz VERMEDİĞİ — ve o metin zaten sitede. */
const CORP_LEAD: Tile = {
  label: "Duruşumuz",
  href: "/#durus",
  hint: "Ne söz vermiyoruz",
  icon: Scale,
  lead: true,
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

/* mobil akordeonlar: Hizmetler hariç hepsi (Hizmetler çarşafın tepesinde,
   ülke segmentiyle birlikte açık duruyor) */
const TAIL: TopKey[] = ["araclar", "kaynaklar", "kurumsal"];

const TAIL_ITEMS: Record<string, Tile[]> = {
  araclar: TOOLS,
  kaynaklar: RESOURCES,
  kurumsal: [...CORPORATE, CORP_LEAD],
};

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------- parça */
/* Canlı navbar'ın .nv2-card'ının bu ad alanındaki karşılığı: çerçeveli beyaz
   kart, 40px çerçeveli ikon kutusu, hover'da mavi. Tek eklenti data-lead —
   panelin öncü kartına 3px gece rayı ve koyu ikon jetonu veriyor. */
function CardLink({ t, onGo }: { t: Tile; onGo: () => void }) {
  return (
    <SmartLink href={t.href} className="n5-card" data-lead={t.lead} onClick={onGo}>
      <span className="n5-ic" aria-hidden="true">
        <t.icon size={18} strokeWidth={1.9} />
      </span>
      <span className="n5-tx">
        <b>{t.label}</b>
        <em>{t.hint}</em>
      </span>
    </SmartLink>
  );
}

/* ------------------------------------------------------- HİZMETLER paneli */
/* Üç yatay kat: ray → brifing → ızgara. N1'de brifing solda koyu bir sütundu;
   burada tam genişlikte açık bir şerit ve koyu yalnızca bayrağın jetonunda,
   kartın baş kenarındaki 3px rayda ve tek birincil hapta kalıyor. */
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
     seçenek için doğrusu bu — ziyaretçi Enter'a basmadan üç ülkenin brifingini
     sırayla okuyup karşılaştırabiliyor. */
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
    <div className="n5-svcp">
      {/* Ülke ekseni. Çubuktan indi ama hiyerarşinin tepesinde: panelin ilk
          satırı, ilk odak durağı ve alttaki her şeyin belirleyicisi. */}
      <div className="n5-axis">
        <span className="n5-axis-tag" id="n5-axis-lbl">
          Önce ülke
        </span>
        <div className="n5-rail" role="tablist" aria-labelledby="n5-axis-lbl">
          {COUNTRY_ORDER.map((k) => (
            <button
              key={k}
              type="button"
              role="tab"
              id={`n5-tab-${k}`}
              ref={(el) => {
                tabs.current[k] = el;
              }}
              className="n5-ctry"
              aria-selected={c === k}
              aria-controls="n5-cty-panel"
              tabIndex={c === k ? 0 : -1}
              data-on={c === k}
              data-here={here === k}
              data-pfocus={c === k ? "" : undefined}
              onClick={() => onPick(k)}
              onKeyDown={onTabKey}
            >
              {c === k && (
                <motion.span
                  layoutId="n5-rail-pill"
                  className="n5-ctry-pill"
                  aria-hidden="true"
                  transition={reduce ? { duration: 0 } : { duration: 0.26, ease: EASE }}
                />
              )}
              <span className="n5-ctry-flag" aria-hidden="true">
                <Flag country={k} />
              </span>
              <span className="n5-ctry-n">{COUNTRY_NAME[k]}</span>
              {here === k && <span className="n5-sr"> (şu an bu ülkedesiniz)</span>}
            </button>
          ))}
        </div>
        <span className="n5-axis-note">Hizmet listesi seçtiğiniz ülkeye göre değişiyor</span>
      </div>

      <div className="n5-cty-wrap" id="n5-cty-panel" role="tabpanel" aria-labelledby={`n5-tab-${c}`}>
        <motion.div
          key={c}
          initial={reduce ? false : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.18, ease: EASE }}
        >
          {/* BRİFİNG ŞERİDİ — N1'de bu, panelin dörtte birini kaplayan koyu bir
              sütundu. Burada açık bir kart; gece yalnızca üç yerde:
              baş kenardaki 3px ray, bayrağın 42px jetonu, ülke sayfası hapı. */}
          <div className="n5-brief" data-lead="">
            <div className="n5-brief-id">
              <span className="n5-brief-flag" aria-hidden="true">
                <span>
                  <Flag country={c} />
                </span>
              </span>
              <p className="n5-brief-name">{COUNTRY_NAME[c]}</p>
              <p className="n5-brief-line">{COUNTRY_LINE[c]}</p>
              <SmartLink href={`/${c}`} className="n5-brief-go" onClick={onGo}>
                {COUNTRY_NAME[c]} ülke sayfası
                <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
              </SmartLink>
            </div>

            <div className="n5-brief-body">
              {/* Menüde fiyat yok — fiyat hizmet sayfasında yaşıyor. Ama ülke
                  KARARI için gereken üç şey burada, hepsi brand.ts FACTS'ten.
                  Süre "tipik aralık" olarak etiketli: STANCE_LIMITS kesin süre
                  taahhüdünü yasaklıyor. */}
              <dl className="n5-brief-facts">
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

              {/* Dürüst sınır menüde de duruyor: ziyaretçiyi eleyen bilgi
                  tıklamadan sonra değil, tıklamadan önce okunmalı. */}
              <p className="n5-brief-lim">
                <TriangleAlert size={14} strokeWidth={2.1} aria-hidden="true" />
                {f.limit}
              </p>
            </div>
          </div>

          <p className="n5-h">{COUNTRY_NAME[c]} için yürüttüğümüz hizmetler</p>

          {/* Koyu sütun kalkınca serbest kalan 320px buraya geldi: kartlar geniş
              ekranda üçlü ritme çıkıyor — canlı navbar'ın Araçlar ızgarasıyla
              aynı kart, aynı oranlar. */}
          <div className="n5-grid" data-cols={3}>
            {SERVICE_UNIVERSE.map((u) => {
              const s = own.get(u.slug);
              const Icon = SVC_ICON[u.slug];

              /* Yokluk sessiz kalmıyor. Kart yerinde duruyor, kesik çizgili ve
                 tıklanamaz; hangi ülkede yürütmediğimizi söylüyor. Bu bir
                 "yakında" değil, bir sınır: söz vermiyoruz, bugünkü durumu
                 söylüyoruz. */
              if (!s) {
                return (
                  <span key={u.slug} className="n5-card" data-dead="">
                    <span className="n5-ic" aria-hidden="true">
                      <Icon size={18} strokeWidth={1.9} />
                    </span>
                    <span className="n5-tx">
                      <b>{u.title}</b>
                      <em>{COUNTRY_NAME[c]} için yürütmüyoruz</em>
                    </span>
                  </span>
                );
              }

              return (
                <SmartLink key={u.slug} href={`/${c}/${u.slug}`} className="n5-card" onClick={onGo}>
                  <span className="n5-ic" aria-hidden="true">
                    <Icon size={18} strokeWidth={1.9} />
                  </span>
                  <span className="n5-tx">
                    <b>{s.title}</b>
                    <em>{hintFor(c, s.slug)}</em>
                  </span>
                </SmartLink>
              );
            })}
          </div>

          {/* Ülke-önce bir menünün ödemesi gereken bedel: karar veremeyene
              çıkış. İki bağlantı da yayında. */}
          <div className="n5-foot">
            <span className="n5-foot-q">
              <Compass size={15} strokeWidth={2} aria-hidden="true" />
              Hangi ülke size uyuyor, emin değil misiniz?
            </span>
            <span className="n5-foot-a">
              <SmartLink href="/ulkeler" className="n5-foot-l" onClick={onGo}>
                Üçünü yan yana görün
              </SmartLink>
              <SmartLink href="/uygunluk-testi" className="n5-foot-l" data-accent="" onClick={onGo}>
                Uygunluk testi
                <ArrowRight size={14} strokeWidth={2.2} aria-hidden="true" />
              </SmartLink>
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ------------------------------------------- ARAÇLAR / KAYNAKLAR / KURUMSAL */
function TailPanel({ k, onGo }: { k: TopKey; onGo: () => void }) {
  /* ARAÇLAR — müşterinin adıyla andığı bölüm. Canlı navbar'daki hâli: dört kart
     yan yana, tam genişlik, sağda koyu blok yok. Aynen o. Tek fark, yayında
     olan aracın 3px gece rayı taşıması: dördü de eşit görünürse "hangisi
     çalışıyor" sorusu ancak sönüklüğe bakılarak cevaplanıyordu. */
  if (k === "araclar") {
    return (
      <div className="n5-tail">
        <p className="n5-h">Karar vermeden önce çalıştırabileceğiniz araçlar</p>
        <div className="n5-grid" data-cols={4}>
          {TOOLS.map((t) => (
            <CardLink key={t.label} t={t} onGo={onGo} />
          ))}
        </div>
        <p className="n5-note">
          Araçların çıktısı bir ön değerlendirmedir, teklif değildir. Sonucu birlikte gözden
          geçiriyoruz.
        </p>
      </div>
    );
  }

  if (k === "kaynaklar") {
    return (
      <div className="n5-tail n5-split">
        <div>
          <p className="n5-h">Okumalık ve indirilebilir kaynaklar</p>
          <div className="n5-grid" data-cols={1}>
            {RESOURCES.map((t) => (
              <CardLink key={t.label} t={t} onGo={onGo} />
            ))}
          </div>
        </div>
        {/* N1'de bu sütun iki koyu bloktu ve "kaba" şikâyetinin merkeziydi.
            Şimdi canlı navbar'ın .nv2-feat-card'ı gibi: --paper dolgu, çizili
            kenar, hover'da blue-100. Gece yalnızca öncü kartın 3px rayında. */}
        <div className="n5-feat">
          {FEATURED.map((f) => (
            <SmartLink
              key={f.title}
              href={f.href}
              className="n5-feat-c"
              data-lead={f.lead}
              onClick={onGo}
            >
              <span className="n5-feat-tag">{f.tag}</span>
              <span className="n5-feat-t">{f.title}</span>
              <span className="n5-feat-m">{f.meta}</span>
            </SmartLink>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="n5-tail n5-split">
      <div>
        <p className="n5-h">Kurumsal</p>
        <div className="n5-grid" data-cols={1}>
          {CORPORATE.map((t) => (
            <CardLink key={t.label} t={t} onGo={onGo} />
          ))}
        </div>
        <p className="n5-note">
          <span className="n5-note-k">Resmî iş ortaklarımız</span>
          {OFFICIAL}
        </p>
      </div>

      {/* Yukarıdaki üç sayfa henüz yayında değil ve SmartLink bunu saklamıyor.
          Panelin tamamen sönük kalmaması için yanında sitenin en kurumsal metni
          duruyor: başlıklar brand.ts STANCE_LIMITS'ten okunuyor. */}
      <div className="n5-feat">
        <SmartLink href={CORP_LEAD.href} className="n5-stance" data-lead="" onClick={onGo}>
          <span className="n5-stance-h">
            <span className="n5-ic n5-ic-sm" aria-hidden="true">
              <Scale size={16} strokeWidth={2} />
            </span>
            {CORP_LEAD.label}
          </span>
          <span className="n5-stance-l">
            {STANCE_LIMITS.map((s) => (
              <span key={s.title}>{s.title}</span>
            ))}
          </span>
          <span className="n5-stance-go">
            Tamamını okuyun
            <ArrowRight size={14} strokeWidth={2.2} aria-hidden="true" />
          </span>
        </SmartLink>
      </div>
    </div>
  );
}

/* ==================================================================== navbar */
export default function NavN5() {
  const lenis = useLenis();
  const pathname = usePathname();
  const reduce = useReducedMotion() ?? false;

  /* hangi ülkedeyiz — panelin açılış ülkesi ve "buradasınız" işareti için */
  const seg = pathname?.split("/")[1] ?? "";
  const here = (COUNTRY_ORDER as string[]).includes(seg) ? (seg as CountrySlug) : null;

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<TopKey | null>(null);
  /* Bulunduğunuz ülke varsa menü orada açılıyor: sitenin geri kalanı "önce
     ülke" diyorsa menü de kullanıcının zaten verdiği kararı hatırlamalı. */
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
  /* Tıklayarak kapatılan başlığın imleç hâlâ üstündeyken hover ile hemen geri
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

  /* Masaüstü panelde kaydırmayı KİLİTLEMİYORUZ, kapatıyoruz. Kilitlemek daha
     kolay olurdu ama panel hover ile de açılabildiği için çubuğun üstünden
     geçen imleç sayfayı kilitlemiş olurdu. Tekerlek/dokunma hareketi "başka bir
     şeye bakıyorum" demektir; menü çekiliyor. */
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
     state'i ayarla" kalıbı) — effect kullanmak bir kare boyunca açık panelin
     yeni sayfanın üstünde asılı kalmasına yol açıyor. */
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

  /* ArrowDown ile açılan panelde odak ilk anlamlı öğeye iner. Hizmetler
     panelinde bu öğe SEÇİLİ ÜLKE SEKMESİ ([data-pfocus]) — klavye kullanıcısının
     da ilk durağı ülke seçimi oluyor, tıpkı farede olduğu gibi. */
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

  /* Hover bir kısayol, tek yol değil. Dokunmatikte hiç çalışmıyor. */
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

  /* Odak header'dan tamamen çıkarsa panel kapanır. Odak tuzağı yok: panel
     içinden Tab ile sağdaki CTA'ya geçilebiliyor, oradan da sayfaya. */
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
      className="n5"
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
             paneli kapatmamalı: odak hâlâ panelin içindeyse orada bir şey
             okunuyor demektir. */
          if (root.contains(document.activeElement)) return;
          setOpen(null);
        }, 160);
      }}
    >
      <div className="container-o n5-bar">
        <SmartLink href="/" aria-label="Ortac Global" className="n5-logo" onClick={closeAll}>
          <Logo height={24} />
        </SmartLink>

        <nav className="n5-nav" aria-label="Ana menü">
          {TOP.map((k) => {
            /* Ülke rayı çubuktan indi ama "buradasınız" bilgisi kaybolmasın:
               bir ülke sayfasındaysanız Hizmetler başlığı küçük bir noktayla
               işaretleniyor, hangi ülke olduğunu ekran okuyucuya .n5-sr
               söylüyor. */
            const marked = k === "hizmetler" && here !== null;
            return (
              <button
                key={k}
                type="button"
                ref={(el) => {
                  triggers.current[k] = el;
                }}
                className="n5-top"
                data-on={open === k}
                data-here={marked}
                aria-expanded={open === k}
                aria-controls={open === k ? "n5-mega" : undefined}
                onClick={() => toggle(k)}
                onKeyDown={(e) => onTriggerKey(e, k)}
                onPointerEnter={(e) => hoverOpen(e, k)}
                onPointerLeave={() => {
                  if (suppress.current === k) suppress.current = null;
                }}
              >
                {TOP_LABEL[k]}
                {marked && here && (
                  <span className="n5-sr"> — şu an {COUNTRY_NAME[here]} sayfasındasınız</span>
                )}
                <ChevronDown className="n5-chev" size={13} strokeWidth={2.4} aria-hidden="true" />
              </button>
            );
          })}
        </nav>

        {/* Panel DOM'da menü ile sağ blok arasında: klavyeyle panelden çıkan
            odak doğal olarak CTA'ya düşüyor, sayfanın başına dönmüyor. */}
        <AnimatePresence>
          {open !== null && (
            <motion.div
              id="n5-mega"
              ref={panelRef}
              className="n5-panel"
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

        <div className="n5-right">
          <span className="n5-lang" role="group" aria-label="Dil">
            <button type="button" data-on="" aria-pressed="true">
              TR
            </button>
            <button type="button" aria-pressed="false" aria-disabled="true" title="Yakında">
              EN
            </button>
          </span>
          <SmartLink href="/panel" className="n5-ghost">
            Panel
          </SmartLink>
          <SmartLink href="/basla" className="n5-cta" onClick={() => gtm("nav_cta_click")}>
            Kurulumu Başlat
            <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
          </SmartLink>
        </div>

        <button
          type="button"
          ref={burgerRef}
          className="n5-burger"
          aria-label={sheet ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={sheet}
          aria-controls={sheet ? "n5-sheet" : undefined}
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
            id="n5-sheet"
            className="n5-sheet"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: reduce ? 0.01 : 0.26, ease: EASE }}
          >
            <div className="n5-sheet-in">
              {/* Masaüstüyle aynı adlandırma: orada "Hizmetler" başlığı ülke
                  rayını açıyor, burada aynı başlık ülke segmentinin üstünde
                  duruyor. Çarşafın en çok kullanılan bölümü bu; akordeona
                  sokmuyoruz, kapalı başlamasın. */}
              <p className="n5-sheet-lbl" id="n5-seg-lbl">
                Hizmetler <span>· önce ülke seçin</span>
              </p>

              <div className="n5-seg" role="tablist" aria-labelledby="n5-seg-lbl">
                {COUNTRY_ORDER.map((c) => (
                  <button
                    key={c}
                    type="button"
                    role="tab"
                    id={`n5-seg-${c}`}
                    ref={(el) => {
                      segs.current[c] = el;
                    }}
                    aria-selected={sheetCountry === c}
                    aria-controls="n5-seg-panel"
                    tabIndex={sheetCountry === c ? 0 : -1}
                    className="n5-seg-b"
                    onClick={() => setSheetCountry(c)}
                    onKeyDown={(e) => onSegKey(e, c)}
                  >
                    <span className="n5-seg-flag" aria-hidden="true">
                      <Flag country={c} />
                    </span>
                    {COUNTRY_NAME[c]}
                  </button>
                ))}
              </div>

              <div
                className="n5-seg-panel"
                id="n5-seg-panel"
                role="tabpanel"
                aria-labelledby={`n5-seg-${sheetCountry}`}
              >
                {/* Masaüstündeki brifing şeridinin mobil karşılığı ve aynı
                    kural: açık kart, gece yalnızca rayda ve bayrak jetonunda. */}
                <SmartLink
                  href={`/${sheetCountry}`}
                  className="n5-m-country"
                  data-lead=""
                  onClick={closeAll}
                >
                  <span className="n5-brief-flag" aria-hidden="true">
                    <span>
                      <Flag country={sheetCountry} />
                    </span>
                  </span>
                  <span className="n5-m-country-tx">
                    <b>{COUNTRY_NAME[sheetCountry]} ülke sayfası</b>
                    <em>{FACTS[sheetCountry].structure}</em>
                  </span>
                  <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
                </SmartLink>

                {/* Masaüstündeki ızgarayla aynı kural: liste birleşim üzerinden
                    basılıyor, o ülkede olmayan hizmet kaybolmuyor. */}
                {SERVICE_UNIVERSE.map((u) => {
                  const s = sheetOwn.get(u.slug);
                  const Icon = SVC_ICON[u.slug];
                  if (!s) {
                    return (
                      <span key={u.slug} className="n5-m-row" data-dead="">
                        <span className="n5-m-ic" aria-hidden="true">
                          <Icon size={16} strokeWidth={2} />
                        </span>
                        {u.title}
                        <em>{COUNTRY_NAME[sheetCountry]} için yok</em>
                      </span>
                    );
                  }
                  return (
                    <SmartLink
                      key={u.slug}
                      href={`/${sheetCountry}/${u.slug}`}
                      className="n5-m-row"
                      onClick={closeAll}
                    >
                      <span className="n5-m-ic" aria-hidden="true">
                        <Icon size={16} strokeWidth={2} />
                      </span>
                      {s.title}
                    </SmartLink>
                  );
                })}

                <p className="n5-m-lim">
                  <TriangleAlert size={13} strokeWidth={2.1} aria-hidden="true" />
                  {FACTS[sheetCountry].limit}
                </p>
              </div>

              <SmartLink href="/uygunluk-testi" className="n5-m-unsure" onClick={closeAll}>
                <Compass size={15} strokeWidth={2} aria-hidden="true" />
                Emin değilim, bana uygun olanı bulun
                <ArrowRight size={14} strokeWidth={2.2} aria-hidden="true" />
              </SmartLink>

              <div className="n5-m-acc">
                {TAIL.map((k) => {
                  const items = TAIL_ITEMS[k];
                  const on = sheetSec === k;
                  return (
                    <div key={k} className="n5-m-sec">
                      <button
                        type="button"
                        className="n5-m-top"
                        aria-expanded={on}
                        aria-controls={on ? `n5-m-${k}` : undefined}
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
                            id={`n5-m-${k}`}
                            initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                            animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                            transition={{ duration: reduce ? 0.01 : 0.22, ease: EASE }}
                            style={{ overflow: "hidden" }}
                          >
                            <div className="n5-m-body">
                              {items.map((t) => (
                                <SmartLink
                                  key={t.label}
                                  href={t.href}
                                  className="n5-m-row"
                                  onClick={closeAll}
                                >
                                  <span className="n5-m-ic" aria-hidden="true">
                                    <t.icon size={16} strokeWidth={2} />
                                  </span>
                                  {t.label}
                                </SmartLink>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              <div className="n5-m-cta">
                <SmartLink href="/basla" className="n5-cta n5-cta-full" onClick={closeAll}>
                  Kurulumu Başlat
                  <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
                </SmartLink>
                <SmartLink href="/panel" className="n5-ghost n5-ghost-full" onClick={closeAll}>
                  Panel
                </SmartLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Perde: hem odağı panele toplar hem de dışarı tıklamayı tek yerde çözer.
          Klavye için görünmez (aria-hidden, odaklanamaz). */}
      <AnimatePresence>
        {(open !== null || sheet) && (
          <motion.div
            className="n5-scrim"
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
