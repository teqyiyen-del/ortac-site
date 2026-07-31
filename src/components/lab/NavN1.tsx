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
   N1 — "ÜLKE ÖNCE" megabar        · REVİZYON: kapalı çubuk dört klasik başlık

   NEREDEN GELDİK
   Bu adayın ilk hâlinde üç ülke doğrudan menü çubuğundaydı: kapalı çubukta
   "Dubai · İngiltere · KKTC" yazıyordu, "Hizmetler" diye bir başlık yoktu.
   Tez şuydu — sitenin geri kalanı baştan sona "önce ülkeye karar ver" diyor
   (hero ülke seçtiriyor, uygunluk testi ülke öneriyor, fiyat ülkeye göre
   değişiyor, hatta hizmetin var olup olmadığı bile ülkeye bağlı), o hâlde menü
   de aynı ekseni kullansın.

   Müşteri tezi beğendi, kapalı çubuğun görünüşünü beğenmedi: çubukta üç özel
   ad görmek yerine dört kategori görmek istiyor —
   Hizmetler · Araçlar · Kaynaklar · Kurumsal.

   BU REVİZYON NEYİ DEĞİŞTİRDİ, NEYİ DEĞİŞTİRMEDİ
   Değişen: çubuğun kapalı hâlindeki kelimeler. Değişmeyen: ülke ekseni.
   Ülke rayı silinmedi, bir kat aşağı indi — artık "Hizmetler" panelinin ilk
   satırı. Panel açıldığında ilk gördüğünüz şey hâlâ üç ülkelik ray, altında da
   seçili ülkenin brifingi ve o ülkede gerçekten yürüttüğümüz hizmetler.

   Bunu tercih etmemin sebebi, alternatifin fikri gerçekten öldürecek olması:
   "Hizmetler" başlığı altına ülkeden bağımsız beş hizmet koysaydık, ülke
   panelin içinde bir filtreye düşerdi ve menü "önce hizmet, sonra ülke" demeye
   başlardı. Şimdi ise hiyerarşi aynen korunuyor — Hizmetler → hangi ülke? →
   o ülkenin hizmetleri. Ziyaretçi bir hizmet adına tıklamadan önce mutlaka bir
   ülkenin içinden geçiyor. Kaybettiğimiz tek şey bir tıklama; kazandığımız şey
   müşterinin istediği tanıdık çubuk.

   Rayın ülkeleri tek bir kutuda toplaması yine bilinçli: bunlar birbirinin
   alternatifi, sıralı adım değil. Sekme kalıbı (tablist) bunu erişilebilirlik
   katmanında da söylüyor.

   YOKLUK GÖRÜNÜR
   Ülke-önce bir menünün klasik zaafı, bir hizmetin bir ülkede OLMAMASININ
   sessiz kalması: satır yoktur, ziyaretçi de yokluğu fark etmez. Bu revizyonda
   hizmet ızgarası ülkelerin BİRLEŞİMİ üzerinden basılıyor; seçili ülkede
   karşılığı olmayan kart kesik çizgili ve tıklanamaz olarak yerinde duruyor.
   İngiltere'ye geçtiğinizde "Vize ve oturum" kaybolmuyor, "İngiltere için
   yürütmüyoruz" diyor. Birleşim de, hangi ülkede hangisinin olduğu da
   servicesFor()'dan türüyor — elle yazılmış tek bir liste yok, bir hizmet bir
   ülkede açıldığında kart kendiliğinden canlanıyor.

   NEDEN RAKAM YOK
   Menüde fiyat yok: fiyat hizmet sayfasında yaşıyor. Ama ülke KARARI için
   gerekli üç şey panelde var — yapı, tipik süre aralığı ve kimler için uygun.
   Hepsi brand.ts FACTS'ten okunuyor. Süre "tipik aralık" olarak etiketleniyor;
   STANCE_LIMITS kesin süre taahhüdünü yasaklıyor. Her ülkenin dürüst sınırı da
   panelde, gizlenmeden duruyor.

   YAYINDA OLMAYAN ADRESLER
   Hiçbir yerde "bu sayfa var mı" diye karar vermiyoruz. Bütün bağlantılar
   SmartLink; sönükleştirme ve "yakında" rozeti lib/routes.ts'in işi. Bu yüzden
   Kurumsal panelinin üç kartı şu an sönük — bu bir eksiklik değil, sitenin
   gerçek durumu. Panelin boş görünmemesi için yanına yayında olan bir şey
   koyduk: ana sayfadaki duruş bölümü (/#durus), üstelik başlıkları brand.ts'in
   STANCE_LIMITS dizisinden okuyarak.

   ERİŞİLEBİLİRLİK (süs değil, kısıt)
   - Tetikleyiciler <button aria-expanded/aria-controls>, <a> değil.
   - Hover panelin tek açılma yolu DEĞİL: tıklama, Enter/Space, ArrowDown.
   - ArrowLeft/ArrowRight dört başlık arasında dolaşır; panel açıksa odaklanılan
     başlığın paneli açılır (menubar hissi, ARIA menubar semantiği olmadan —
     bunlar menü öğesi değil, açılır bölüm düğmeleri).
   - Panel içindeki ülke rayı gerçek bir sekme grubu: roving tabindex, ok
     tuşlarıyla otomatik seçim, aria-selected/aria-controls. Ülke değiştirmek
     için fare gerekmiyor.
   - ArrowDown ile açılan Hizmetler panelinde odak doğrudan SEÇİLİ ülke
     sekmesine iniyor ([data-pfocus]) — yani klavye kullanıcısının da ilk durağı
     ülke seçimi oluyor. Tez klavyede de aynı.
   - Escape kapatır ve odağı tetikleyiciye geri verir.
   - Odak header dışına çıkarsa panel kendiliğinden kapanır. Odak tuzağı yok:
     panel DOM'da menü ile sağ blok arasında durduğu için Tab'lamaya devam edip
     CTA'ya çıkılıyor.
   - Ülke sekmeleri hover ile DEĞİŞMİYOR. Ray panelin üst kenarında, yani
     "Hizmetler" başlığından panele inen imlecin geçiş güzergâhında; hover ile
     seçseydik ziyaretçi hedefine giderken istemeden ülke değiştirirdi.

   MOBİL
   Mega panel mobilde açılamaz. Karşılığı çarşafın en üstünde: "Hizmetler"
   başlığı, altında üç ülkelik segment (rol=tablist) ve seçilen ülkenin hizmet
   listesi. Yani mobilde de önce ülke seçiliyor ve masaüstüyle aynı adlandırma
   kullanılıyor. Sadece ikincil bölümler (Araçlar/Kaynaklar/Kurumsal) akordeon.
   ========================================================================= */

/* Ülke başlığının altındaki tek satır. Nerede olduğunu söyler, iddia etmez. */
const COUNTRY_LINE: Record<CountrySlug, string> = {
  dubai: "Birleşik Arap Emirlikleri · ofisimiz burada",
  ingiltere: "Birleşik Krallık · Companies House",
  kktc: "Kuzey Kıbrıs · Türkiye'ye en yakın",
};

/* Hizmet ikonları slug'a bağlı, ülkeye değil: aynı iş üç ülkede aynı ikonla
   çıksın ki ray üstünde ülke değiştirirken göz aynı yerde aynı şeyi bulsun. */
const SVC_ICON: Record<ServiceSlug, LucideIcon> = {
  "sirket-kurulusu": Building2,
  muhasebe: CalendarCheck,
  "banka-hesabi": Landmark,
  "oturum-vize": IdCard,
  uyum: ShieldCheck,
};

/* Service.line tam bir cümle ("Lisans sınıfının seçilmesi, isim onayı, tescil
   ve kuruluş evrakının teslimi.") — menüde bu uzunluk kartı iki kat büyütüyor
   ve göz taramayı bırakıyor. Menü için dört-beş kelimelik karşılıklar. İçerik
   uydurulmuyor: hepsi services.ts'teki includes/duration alanlarının kısaltması.
   Ülkeye göre gerçekten değişen satırlar aşağıdaki override tablosunda. */
const SVC_HINT: Record<ServiceSlug, string> = {
  "sirket-kurulusu": "İsim onayı, tescil ve kuruluş evrakı",
  muhasebe: "Defter, beyan ve dönemsel raporlama",
  "banka-hesabi": "Hesap başvurusu ve tahsilat kanalları",
  "oturum-vize": "Vize, sağlık kontrolü ve kimlik kartı",
  uyum: "Politika dosyası ve bildirim takvimi",
};

const SVC_HINT_LOCAL: Partial<Record<string, string>> = {
  "dubai:banka-hesabi": "Wio · Mashreq NeoBiz başvurusu",
  "dubai:uyum": "goAML kaydı ve bildirim yükümlülükleri",
  "ingiltere:banka-hesabi": "Wise · Payoneer · onay oranı düşük",
  "ingiltere:uyum": "PSC kaydı ve AML politikası",
  "kktc:banka-hesabi": "Yerel banka · imza için yerinde bulunma",
};

const hintFor = (c: CountrySlug, s: ServiceSlug) => SVC_HINT_LOCAL[`${c}:${s}`] ?? SVC_HINT[s];

/* Üç ülkenin hizmet listelerinin BİRLEŞİMİ, ilk görülme sırasıyla.
   Izgara her ülkede aynı sırada aynı sayıda hücre basıyor; ülke değişince
   düzen zıplamıyor ve eksik olan hizmet boşluk bırakmak yerine kendini
   söylüyor. Elle yazılmış liste yok — bir hizmet bir ülkede açıldığında bu
   dizi de, kartın canlanması da kendiliğinden oluyor. */
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
type Tile = { label: string; href: string; hint: string; icon: LucideIcon };

/* Araçlar bölümünün yayında olan ve en çok iş gören aracı. Panelde ızgaradan
   ayrı, koyu bir kart olarak duruyor: diğer üçünün ikisi henüz yayında değil,
   bölüm tamamen sönük görünmesin. Mobil listede de aynı nesne kullanılıyor. */
const TOOL_LEAD: Tile = {
  label: "Uygunluk testi",
  href: "/uygunluk-testi",
  hint: "6 soru · ülke önerisi ve gerekçesi",
  icon: SlidersHorizontal,
};

const TOOLS: Tile[] = [
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

/* SWAP:NAV_FEATURED — menü kendi başına bir keşif yüzeyi. Buradaki tarih ve
   sayfa sayısı temsilî; gerçek içerik geldiğinde yalnızca bu blok değişir.
   Yayında olan kart başta: sönük kartla karşılamak kötü bir açılış. */
const FEATURED = [
  {
    tag: "En çok indirilen",
    title: "Dubai kuruluş rehberi",
    meta: "32 sayfa · PDF",
    href: "/kaynaklar",
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
   "hakkımızda" sayfası değil, ne söz VERMEDİĞİ — ve o metin zaten sitede.
   Mobil listede de aynı nesne kullanılıyor. */
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
/* Kapalı çubukta görünen dört kelime. Ülke artık burada değil, Hizmetler
   panelinin ilk satırında. */
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
  araclar: [TOOL_LEAD, ...TOOLS],
  kaynaklar: RESOURCES,
  kurumsal: [...CORPORATE, CORP_LEAD],
};

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------- parça */
function TileLink({ t, onGo }: { t: Tile; onGo: () => void }) {
  return (
    <SmartLink href={t.href} className="n1-tile" onClick={onGo}>
      <span className="n1-tile-ic" aria-hidden="true">
        <t.icon size={17} strokeWidth={1.9} />
      </span>
      <span className="n1-tile-tx">
        <b>{t.label}</b>
        <em>{t.hint}</em>
      </span>
    </SmartLink>
  );
}

/* ------------------------------------------------------- HİZMETLER paneli */
/* N1'in kalbi. Üstte ülke rayı (sekme grubu), altında seçili ülkenin brifingi
   ve hizmet ızgarası. Ülke değişince yalnızca alt blok yenileniyor; ray ve
   odak yerinde kalıyor, yani ok tuşlarıyla üç ülkeyi tarayıp karşılaştırmak
   mümkün. */
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

  /* Sekme kalıbının standart davranışı: ok tuşu odağı da seçimi de taşır.
     Üç seçenek için doğru olan bu — ziyaretçi Enter'a basmadan üç ülkenin
     brifingini sırayla okuyabiliyor. */
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
    <div className="n1-svcp">
      {/* Ülke ekseni. Çubuktan indi ama hiyerarşinin tepesinde kaldı: panelin
          ilk satırı, ilk odak durağı ve alttaki her şeyin belirleyicisi. */}
      <div className="n1-axis">
        <span className="n1-axis-tag" id="n1-axis-lbl">
          Önce ülke
        </span>
        <div className="n1-rail" role="tablist" aria-labelledby="n1-axis-lbl">
          {COUNTRY_ORDER.map((k) => (
            <button
              key={k}
              type="button"
              role="tab"
              id={`n1-tab-${k}`}
              ref={(el) => {
                tabs.current[k] = el;
              }}
              className="n1-ctry"
              aria-selected={c === k}
              aria-controls="n1-cty-panel"
              tabIndex={c === k ? 0 : -1}
              data-on={c === k}
              data-here={here === k}
              data-pfocus={c === k ? "" : undefined}
              onClick={() => onPick(k)}
              onKeyDown={onTabKey}
            >
              {c === k && (
                <motion.span
                  layoutId="n1-rail-pill"
                  className="n1-ctry-pill"
                  aria-hidden="true"
                  transition={reduce ? { duration: 0 } : { duration: 0.26, ease: EASE }}
                />
              )}
              <span className="n1-ctry-flag" aria-hidden="true">
                <Flag country={k} />
              </span>
              <span className="n1-ctry-n">{COUNTRY_NAME[k]}</span>
              {here === k && <span className="n1-sr"> (şu an bu ülkedesiniz)</span>}
            </button>
          ))}
        </div>
        <span className="n1-axis-note">Hizmet listesi seçtiğiniz ülkeye göre değişiyor</span>
      </div>

      <div className="n1-cty-wrap" id="n1-cty-panel" role="tabpanel" aria-labelledby={`n1-tab-${c}`}>
        <motion.div
          key={c}
          className="n1-cty"
          initial={reduce ? false : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.18, ease: EASE }}
        >
          <div className="n1-id">
            <span className="n1-id-flag" aria-hidden="true">
              <Flag country={c} />
            </span>
            <p className="n1-id-name">{COUNTRY_NAME[c]}</p>
            <p className="n1-id-line">{COUNTRY_LINE[c]}</p>

            <dl className="n1-id-facts">
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

            {/* Dürüst sınır menüde de görünüyor. Ziyaretçiyi eleyen bilgi,
                tıklamadan sonra değil tıklamadan önce durmalı. */}
            <p className="n1-id-lim">
              <TriangleAlert size={14} strokeWidth={2.1} aria-hidden="true" />
              {f.limit}
            </p>

            <SmartLink href={`/${c}`} className="n1-id-go" onClick={onGo}>
              {COUNTRY_NAME[c]} ülke sayfası
              <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
            </SmartLink>
          </div>

          <div className="n1-svc">
            <p className="n1-svc-h">{COUNTRY_NAME[c]} için yürüttüğümüz hizmetler</p>
            <div className="n1-grid" data-cols={2}>
              {SERVICE_UNIVERSE.map((u) => {
                const s = own.get(u.slug);
                const Icon = SVC_ICON[u.slug];

                /* Yokluk sessiz kalmıyor. Kart yerinde duruyor, kesik çizgili
                   ve tıklanamaz; hangi ülkede yürütmediğimizi söylüyor. */
                if (!s) {
                  return (
                    <span key={u.slug} className="n1-tile" data-dead="">
                      <span className="n1-tile-ic" aria-hidden="true">
                        <Icon size={17} strokeWidth={1.9} />
                      </span>
                      <span className="n1-tile-tx">
                        <b>{u.title}</b>
                        <em>{COUNTRY_NAME[c]} için yürütmüyoruz</em>
                      </span>
                    </span>
                  );
                }

                return (
                  <SmartLink
                    key={u.slug}
                    href={`/${c}/${u.slug}`}
                    className="n1-tile"
                    onClick={onGo}
                  >
                    <span className="n1-tile-ic" aria-hidden="true">
                      <Icon size={17} strokeWidth={1.9} />
                    </span>
                    <span className="n1-tile-tx">
                      <b>{s.title}</b>
                      <em>{hintFor(c, s.slug)}</em>
                    </span>
                  </SmartLink>
                );
              })}
            </div>

            {/* Ülke-önce bir menünün ödemesi gereken bedel: karar veremeyene
                çıkış. İki bağlantı da yayında. */}
            <div className="n1-foot">
              <span className="n1-foot-q">
                <Compass size={15} strokeWidth={2} aria-hidden="true" />
                Hangi ülke size uyuyor, emin değil misiniz?
              </span>
              <span className="n1-foot-a">
                <SmartLink href="/ulkeler" className="n1-foot-l" onClick={onGo}>
                  Üçünü yan yana görün
                </SmartLink>
                <SmartLink href="/uygunluk-testi" className="n1-foot-l" data-strong="" onClick={onGo}>
                  Uygunluk testi
                  <ArrowRight size={14} strokeWidth={2.2} aria-hidden="true" />
                </SmartLink>
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ------------------------------------------------- ARAÇLAR / KAYNAKLAR / KURUMSAL */
function TailPanel({ k, onGo }: { k: TopKey; onGo: () => void }) {
  if (k === "araclar") {
    return (
      <div className="n1-tail n1-tail-split">
        <div>
          <p className="n1-svc-h">Karar vermeden önce çalıştırabileceğiniz araçlar</p>
          <div className="n1-grid" data-cols={1}>
            {TOOLS.map((t) => (
              <TileLink key={t.label} t={t} onGo={onGo} />
            ))}
          </div>
          <p className="n1-note">
            Araçların çıktısı bir ön değerlendirmedir, teklif değildir. Sonucu birlikte
            gözden geçiriyoruz.
          </p>
        </div>
        <div className="n1-feat">
          <SmartLink href={TOOL_LEAD.href} className="n1-feat-c" onClick={onGo}>
            <span className="n1-feat-tag">Emin değilseniz</span>
            <span className="n1-feat-t">{TOOL_LEAD.label}</span>
            <span className="n1-feat-m">{TOOL_LEAD.hint}</span>
          </SmartLink>
        </div>
      </div>
    );
  }

  if (k === "kaynaklar") {
    return (
      <div className="n1-tail n1-tail-split">
        <div>
          <p className="n1-svc-h">Okumalık ve indirilebilir kaynaklar</p>
          <div className="n1-grid" data-cols={1}>
            {RESOURCES.map((t) => (
              <TileLink key={t.label} t={t} onGo={onGo} />
            ))}
          </div>
        </div>
        <div className="n1-feat">
          {FEATURED.map((f) => (
            <SmartLink key={f.title} href={f.href} className="n1-feat-c" onClick={onGo}>
              <span className="n1-feat-tag">{f.tag}</span>
              <span className="n1-feat-t">{f.title}</span>
              <span className="n1-feat-m">{f.meta}</span>
            </SmartLink>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="n1-tail n1-tail-split">
      <div>
        <p className="n1-svc-h">Kurumsal</p>
        <div className="n1-grid" data-cols={1}>
          {CORPORATE.map((t) => (
            <TileLink key={t.label} t={t} onGo={onGo} />
          ))}
        </div>
        <p className="n1-note">
          <span className="n1-note-k">Resmî iş ortaklarımız</span>
          {OFFICIAL}
        </p>
      </div>

      {/* Yukarıdaki üç sayfa henüz yayında değil ve SmartLink bunu saklamıyor.
          Panelin tamamen sönük kalmaması için yanında sitenin en kurumsal
          metni duruyor: başlıklar brand.ts STANCE_LIMITS'ten okunuyor. */}
      <div className="n1-feat">
        <SmartLink href={CORP_LEAD.href} className="n1-stance" onClick={onGo}>
          <span className="n1-stance-h">
            <Scale size={15} strokeWidth={2} aria-hidden="true" />
            {CORP_LEAD.label}
          </span>
          <span className="n1-stance-l">
            {STANCE_LIMITS.map((s) => (
              <span key={s.title}>{s.title}</span>
            ))}
          </span>
          <span className="n1-stance-go">
            Tamamını okuyun
            <ArrowRight size={14} strokeWidth={2.2} aria-hidden="true" />
          </span>
        </SmartLink>
      </div>
    </div>
  );
}

/* ==================================================================== navbar */
export default function NavN1() {
  const lenis = useLenis();
  const pathname = usePathname();
  const reduce = useReducedMotion() ?? false;

  /* hangi ülkedeyiz — panelin açılış ülkesi ve "buradasınız" işareti için */
  const seg = pathname?.split("/")[1] ?? "";
  const here = (COUNTRY_ORDER as string[]).includes(seg) ? (seg as CountrySlug) : null;

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<TopKey | null>(null);
  /* Hizmetler panelinin seçili ülkesi. Bulunduğunuz ülke varsa menü orada
     açılıyor: sitenin geri kalanı "önce ülke" diyorsa menü de kullanıcının
     zaten verdiği kararı hatırlamalı. */
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
     kolay olurdu ama panel hover ile de açılabildiği için, çubuğun üstünden
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

  /* Adres değişince her şey kapanır ve ülke seçimi yeni sayfaya uyar.
     SmartLink tıklamaları zaten kapatıyor; bu, tarayıcının geri/ileri tuşları
     için emniyet kemeri. Effect değil render sırasında düzeltme (React'in
     "prop değişince state'i ayarla" kalıbı) — effect kullanmak bir kare
     boyunca açık panelin yeni sayfanın üstünde asılı kalmasına yol açıyordu. */
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
     panelinde bu öğe SEÇİLİ ÜLKE SEKMESİ ([data-pfocus]) — yani klavye
     kullanıcısının da ilk durağı ülke seçimi oluyor, tıpkı farede olduğu gibi.
     Diğer panellerde ilk bağlantıya düşüyor. */
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
      className="n1"
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
      <div className="container-o n1-bar">
        <SmartLink href="/" aria-label="Ortac Global" className="n1-logo" onClick={closeAll}>
          <Logo height={24} />
        </SmartLink>

        <nav className="n1-nav" aria-label="Ana menü">
          {TOP.map((k) => {
            /* Ülke rayı çubuktan indi ama "buradasınız" bilgisi kaybolmasın:
               bir ülke sayfasındaysanız Hizmetler başlığı küçük bir noktayla
               işaretleniyor ve ekran okuyucuya hangi ülke olduğu söyleniyor.
               Bu, müşterinin istediği dört kelimeyi bozmadan verilebilecek tek
               "buradasınız" sinyali. */
            const marked = k === "hizmetler" && here !== null;
            return (
              <button
                key={k}
                type="button"
                ref={(el) => {
                  triggers.current[k] = el;
                }}
                className="n1-top"
                data-on={open === k}
                data-here={marked}
                aria-expanded={open === k}
                aria-controls={open === k ? "n1-mega" : undefined}
                onClick={() => toggle(k)}
                onKeyDown={(e) => onTriggerKey(e, k)}
                onPointerEnter={(e) => hoverOpen(e, k)}
                onPointerLeave={() => {
                  if (suppress.current === k) suppress.current = null;
                }}
              >
                {TOP_LABEL[k]}
                {marked && here && (
                  <span className="n1-sr"> — şu an {COUNTRY_NAME[here]} sayfasındasınız</span>
                )}
                <ChevronDown className="n1-chev" size={13} strokeWidth={2.4} aria-hidden="true" />
              </button>
            );
          })}
        </nav>

        {/* Panel DOM'da menü ile sağ blok arasında: klavyeyle panelden çıkan
            odak doğal olarak CTA'ya düşüyor, sayfanın başına dönmüyor. */}
        <AnimatePresence>
          {open !== null && (
            <motion.div
              id="n1-mega"
              ref={panelRef}
              className="n1-panel"
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

        <div className="n1-right">
          <span className="n1-lang" role="group" aria-label="Dil">
            <button type="button" data-on="" aria-pressed="true">
              TR
            </button>
            <button type="button" aria-pressed="false" aria-disabled="true" title="Yakında">
              EN
            </button>
          </span>
          <SmartLink href="/panel" className="n1-ghost">
            Panel
          </SmartLink>
          <SmartLink href="/basla" className="n1-cta" onClick={() => gtm("nav_cta_click")}>
            Kurulumu Başlat
            <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
          </SmartLink>
        </div>

        <button
          type="button"
          ref={burgerRef}
          className="n1-burger"
          aria-label={sheet ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={sheet}
          aria-controls={sheet ? "n1-sheet" : undefined}
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
            id="n1-sheet"
            className="n1-sheet"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: reduce ? 0.01 : 0.26, ease: EASE }}
          >
            <div className="n1-sheet-in">
              {/* Masaüstüyle aynı adlandırma: orada "Hizmetler" başlığı ülke
                  rayını açıyor, burada aynı başlık ülke segmentinin üstünde
                  duruyor. Mobilde akordeona sokmuyoruz — çarşafın en çok
                  kullanılan bölümü bu, kapalı başlamasın. */}
              <p className="n1-sheet-lbl" id="n1-seg-lbl">
                Hizmetler <span>· önce ülke seçin</span>
              </p>

              {/* Sekme kalıbı: yalnızca seçili sekme Tab sırasında, ok tuşları
                  aralarında geziyor. */}
              <div className="n1-seg" role="tablist" aria-labelledby="n1-seg-lbl">
                {COUNTRY_ORDER.map((c) => (
                  <button
                    key={c}
                    type="button"
                    role="tab"
                    id={`n1-seg-${c}`}
                    ref={(el) => {
                      segs.current[c] = el;
                    }}
                    aria-selected={sheetCountry === c}
                    aria-controls="n1-seg-panel"
                    tabIndex={sheetCountry === c ? 0 : -1}
                    className="n1-seg-b"
                    onClick={() => setSheetCountry(c)}
                    onKeyDown={(e) => onSegKey(e, c)}
                  >
                    <span className="n1-seg-flag" aria-hidden="true">
                      <Flag country={c} />
                    </span>
                    {COUNTRY_NAME[c]}
                  </button>
                ))}
              </div>

              <div
                className="n1-seg-panel"
                id="n1-seg-panel"
                role="tabpanel"
                aria-labelledby={`n1-seg-${sheetCountry}`}
              >
                <SmartLink href={`/${sheetCountry}`} className="n1-m-country" onClick={closeAll}>
                  <span>
                    <b>{COUNTRY_NAME[sheetCountry]} ülke sayfası</b>
                    <em>{FACTS[sheetCountry].structure}</em>
                  </span>
                  <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
                </SmartLink>

                {/* Masaüstündeki ızgarayla aynı kural: liste birleşim üzerinden
                    basılıyor, o ülkede olmayan hizmet satırı kayboluyor değil
                    "yürütmüyoruz" diyor. */}
                {SERVICE_UNIVERSE.map((u) => {
                  const s = sheetOwn.get(u.slug);
                  const Icon = SVC_ICON[u.slug];
                  if (!s) {
                    return (
                      <span key={u.slug} className="n1-m-row" data-dead="">
                        <span className="n1-m-ic" aria-hidden="true">
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
                      className="n1-m-row"
                      onClick={closeAll}
                    >
                      <span className="n1-m-ic" aria-hidden="true">
                        <Icon size={16} strokeWidth={2} />
                      </span>
                      {s.title}
                    </SmartLink>
                  );
                })}

                <p className="n1-m-lim">
                  <TriangleAlert size={13} strokeWidth={2.1} aria-hidden="true" />
                  {FACTS[sheetCountry].limit}
                </p>
              </div>

              <SmartLink href="/uygunluk-testi" className="n1-m-unsure" onClick={closeAll}>
                <Compass size={15} strokeWidth={2} aria-hidden="true" />
                Emin değilim, bana uygun olanı bulun
                <ArrowRight size={14} strokeWidth={2.2} aria-hidden="true" />
              </SmartLink>

              <div className="n1-m-acc">
                {TAIL.map((k) => {
                  const items = TAIL_ITEMS[k];
                  const on = sheetSec === k;
                  return (
                    <div key={k} className="n1-m-sec">
                      <button
                        type="button"
                        className="n1-m-top"
                        aria-expanded={on}
                        aria-controls={on ? `n1-m-${k}` : undefined}
                        onClick={() => setSheetSec(on ? null : k)}
                      >
                        {TOP_LABEL[k]}
                        <ChevronDown
                          size={17}
                          strokeWidth={2}
                          aria-hidden="true"
                          style={{
                            transform: on ? "rotate(180deg)" : "none",
                            transition: reduce
                              ? "none"
                              : "transform 200ms var(--ease-out-soft)",
                          }}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {on && (
                          <motion.div
                            id={`n1-m-${k}`}
                            initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                            animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                            transition={{ duration: reduce ? 0.01 : 0.22, ease: EASE }}
                            style={{ overflow: "hidden" }}
                          >
                            <div className="n1-m-body">
                              {items.map((t) => (
                                <SmartLink
                                  key={t.label}
                                  href={t.href}
                                  className="n1-m-row"
                                  onClick={closeAll}
                                >
                                  <span className="n1-m-ic" aria-hidden="true">
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

              <div className="n1-m-cta">
                <SmartLink href="/basla" className="n1-cta n1-cta-full" onClick={closeAll}>
                  Kurulumu Başlat
                  <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
                </SmartLink>
                <SmartLink href="/panel" className="n1-ghost n1-ghost-full" onClick={closeAll}>
                  Panel
                </SmartLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Perde: hem odağı panele toplar hem de dışarı tıklamayı tek yerde
          çözer. Klavye için görünmez (aria-hidden, odaklanamaz). */}
      <AnimatePresence>
        {(open !== null || sheet) && (
          <motion.div
            className="n1-scrim"
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
