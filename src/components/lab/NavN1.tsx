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
import { COUNTRY_NAME, COUNTRY_ORDER, FACTS, PARTNERS, type CountrySlug } from "@/lib/brand";
import { servicesFor, type ServiceSlug } from "@/lib/services";

/* ============================================================================
   N1 — "ÜLKE ÖNCE" megabar

   TEZ
   Mevcut navbar'da menünün birinci ekseni hizmet: ziyaretçi önce "Hizmetler"
   diye soyut bir başlığa giriyor, ülkeyi orada, panelin sol sütunundaki
   seçiciden buluyor. Oysa sitenin geri kalanı baştan sona "önce ülkeye karar
   ver" diyor — hero ülke seçtiriyor, uygunluk testi ülke öneriyor, fiyat
   ülkeye göre değişiyor, hatta hizmetlerin hangisinin var olduğu bile ülkeye
   bağlı (İngiltere'de oturum/vize yok). Menü bu mimariyi tekrarlamak yerine
   üstüne bir soyutlama katmanı koyuyordu.

   Bu alternatif o katmanı kaldırıyor. Üç ülke menü çubuğunun kendisinde, tek
   bir gruplanmış rayda yan yana duruyor. Ziyaretçi ülkeyi çubukta seçiyor,
   mega panel de o ülkenin brifingi oluyor: kimlik + gerçekler + o ülkede
   gerçekten yürüttüğümüz hizmetler. "Hizmetler" diye bir üst başlık yok,
   çünkü ülkeden bağımsız bir hizmet listesi zaten yok.

   Rayın üç ülkeyi tek bir kutunun içinde toplaması bilinçli: bunlar birbirinin
   alternatifi, sıralı adım değil. Aynı kutu içinde bir seçim yapılıyor izlenimi
   veriyor, üç ayrı menü başlığı gibi durmuyorlar.

   NEDEN RAKAM YOK
   Mevcut navbar'ın "menüde rakam yok" kararına uyuyoruz: fiyat hizmet
   sayfasında yaşıyor. Ama ülke KARARI için gerekli olan üç şey panelde var —
   yapı (limited mi serbest bölge mi), tipik süre aralığı ve kimler için uygun.
   Bunların hepsi brand.ts FACTS'ten okunuyor, elle yazılmıyor. Süre "tipik
   aralık" olarak etiketleniyor; STANCE_LIMITS kesin süre taahhüdünü yasaklıyor.
   Her ülkenin dürüst sınırı da panelde, gizlenmeden duruyor — menüden gelen
   ziyaretçi "vize için BAE'ye gelmek gerekiyor" cümlesini tıklamadan önce
   görüyor. Bir menünün yapabileceği en iyi eleme bu.

   ERİŞİLEBİLİRLİK (süs değil, kısıt)
   - Tetikleyiciler <button aria-expanded/aria-controls>, <a> değil. Panel
     açan şey bağlantı değildir; ülke sayfasının bağlantısı panelin İÇİNDE,
     hem de panelin ilk odaklanabilir öğesi olarak duruyor.
   - Hover panelin tek açılma yolu DEĞİL: tıklama, Enter/Space, ArrowDown.
   - ArrowLeft/ArrowRight tetikleyiciler arasında dolaşır; panel açıksa
     odaklanılan başlığın paneli açılır (menubar hissi, ARIA menubar semantiği
     olmadan — bunlar menü öğesi değil, açılır bölüm düğmeleri).
   - Escape kapatır ve odağı tetikleyiciye geri verir.
   - Odak başlıktan çıkıp header dışına giderse panel kendiliğinden kapanır.
     Odak tuzağı yok: panel içinden Tab'lamaya devam edip sağdaki CTA'ya
     çıkılıyor, çünkü panel DOM'da menü ile sağ blok arasında duruyor.
   - Panel açıkken sayfanın üstüne perde geliyor; perde tıklanınca kapanıyor.
     Perde aria-hidden ve odaklanamaz, yani klavye kullanıcısı için yok.

   MOBİL
   Mega panel mobilde açılamaz. Aynı fikri koruyan karşılığı: çarşafın en
   üstünde üç ülkelik segment (rol=tablist) duruyor, altındaki hizmet listesi
   seçilen ülkeye göre değişiyor. Yani mobilde de önce ülke seçiliyor; iç içe
   akordeon yığını yok. Sadece ikincil bölümler (Araçlar/Kaynaklar/Kurumsal)
   akordeon.
   ========================================================================= */

/* Ülke başlığının altındaki tek satır. Nerede olduğunu söyler, iddia etmez —
   mevcut navbar'dan devralınan doğru bir karar. */
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

/* ------------------------------------------------------------ ikincil menü */
type Tile = { label: string; href: string; hint: string; icon: LucideIcon };

const TOOLS: Tile[] = [
  {
    label: "Uygunluk testi",
    href: "/uygunluk-testi",
    hint: "6 soruda ülke önerisi",
    icon: SlidersHorizontal,
  },
  {
    label: "Ülke karşılaştırma",
    href: "/ulkeler",
    hint: "Üç ülke yan yana",
    icon: Scale3d,
  },
  {
    label: "Maliyet hesaplayıcı",
    href: "/araclar/maliyet-hesaplayici",
    hint: "Paket ve ek hizmet tutarı",
    icon: Calculator,
  },
  {
    label: "Ödeme altyapısı matrisi",
    href: "/araclar/odeme-altyapisi",
    hint: "Hangi kanal nerede çalışıyor",
    icon: Landmark,
  },
];

const RESOURCES: Tile[] = [
  { label: "Ülke rehberleri", href: "/kaynaklar", hint: "Dubai, İngiltere, KKTC", icon: BookOpen },
  { label: "Mevzuat takvimi", href: "/blog", hint: "Güncellemeler ve tarihler", icon: Scale },
  { label: "E-kitaplar", href: "/kaynaklar/e-kitaplar", hint: "Ücretsiz PDF rehberler", icon: FileDown },
];

/* SWAP:NAV_FEATURED — menü kendi başına bir keşif yüzeyi. Buradaki tarih ve
   sayfa sayısı temsilî; gerçek içerik geldiğinde yalnızca bu blok değişir. */
const FEATURED = [
  { tag: "En güncel", title: "Kurumlar vergisi beyan takvimi", meta: "Temmuz 2026", href: "/blog" },
  { tag: "En çok indirilen", title: "Dubai kuruluş rehberi", meta: "32 sayfa · PDF", href: "/kaynaklar" },
];

const CORPORATE: Tile[] = [
  { label: "Hakkımızda", href: "/hakkimizda", hint: "Ofis, lisans ve ekip", icon: Building2 },
  { label: "İş ortaklığı", href: "/is-ortakligi", hint: "Mali müşavir ve danışman kanalı", icon: Handshake },
  { label: "Şirketini taşı", href: "/sirket-tasima", hint: "Mevcut şirketi Ortac'a alın", icon: ShieldCheck },
  { label: "İletişim", href: "/iletisim", hint: "Dubai ofis ve destek", icon: Landmark },
];

/* Ortaklık iddiası elle yazılmıyor: brand.ts'teki resmî grup ne diyorsa o. */
const OFFICIAL = PARTNERS.filter((p) => p.group === "resmi")
  .map((p) => p.name)
  .join(" · ");

/* ------------------------------------------------------------------ anahtar */
const TAIL = ["araclar", "kaynaklar", "kurumsal"] as const;
type TailKey = (typeof TAIL)[number];
type PanelKey = CountrySlug | TailKey;

const TAIL_LABEL: Record<TailKey, string> = {
  araclar: "Araçlar",
  kaynaklar: "Kaynaklar",
  kurumsal: "Kurumsal",
};

const ORDER: PanelKey[] = [...COUNTRY_ORDER, ...TAIL];
const isCountry = (k: PanelKey): k is CountrySlug =>
  (COUNTRY_ORDER as string[]).includes(k as string);

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

/* Ülke paneli. Hizmet listesi servicesFor()'dan geliyor — İngiltere'de
   oturum/vize satırının olmaması bir "if" değil, verinin doğal sonucu. */
function CountryPanel({ c, onGo }: { c: CountrySlug; onGo: () => void }) {
  const f = FACTS[c];
  const list = servicesFor(c);

  return (
    <div className="n1-cty">
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

        {/* Dürüst sınır menüde de görünüyor. Ziyaretçiyi eleyen bilgi, tıklamadan
            sonra değil tıklamadan önce durmalı. */}
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
          {list.map((s) => {
            const Icon = SVC_ICON[s.slug];
            return (
              <SmartLink key={s.slug} href={`/${c}/${s.slug}`} className="n1-tile" onClick={onGo}>
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

        {/* Ülke-önce bir menünün ödemesi gereken bedel: karar veremeyene çıkış.
            İki bağlantı da yayında, ikisi de kararı kolaylaştırmaya çalışıyor. */}
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
    </div>
  );
}

function TailPanel({ k, onGo }: { k: TailKey; onGo: () => void }) {
  if (k === "araclar") {
    return (
      <div className="n1-tail">
        <p className="n1-svc-h">Karar vermeden önce çalıştırabileceğiniz araçlar</p>
        <div className="n1-grid" data-cols={4}>
          {TOOLS.map((t) => (
            <TileLink key={t.label} t={t} onGo={onGo} />
          ))}
        </div>
        <p className="n1-note">
          Araçların çıktısı bir ön değerlendirmedir, teklif değildir. Sonucu birlikte
          gözden geçiriyoruz.
        </p>
      </div>
    );
  }

  if (k === "kaynaklar") {
    return (
      <div className="n1-tail n1-tail-split">
        <div>
          <p className="n1-svc-h">Kaynaklar</p>
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
    <div className="n1-tail">
      <p className="n1-svc-h">Kurumsal</p>
      <div className="n1-grid" data-cols={4}>
        {CORPORATE.map((t) => (
          <TileLink key={t.label} t={t} onGo={onGo} />
        ))}
      </div>
      <p className="n1-note">
        <span className="n1-note-k">Resmî iş ortaklarımız</span>
        {OFFICIAL}
      </p>
    </div>
  );
}

/* ==================================================================== navbar */
export default function NavN1() {
  const lenis = useLenis();
  const pathname = usePathname();
  const reduce = useReducedMotion() ?? false;

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<PanelKey | null>(null);
  const [sheet, setSheet] = useState(false);
  const [sheetCountry, setSheetCountry] = useState<CountrySlug>("dubai");
  const [sheetSec, setSheetSec] = useState<TailKey | null>(null);

  const triggers = useRef<Partial<Record<PanelKey, HTMLButtonElement | null>>>({});
  const segs = useRef<Partial<Record<CountrySlug, HTMLButtonElement | null>>>({});
  const panelRef = useRef<HTMLDivElement | null>(null);
  const burgerRef = useRef<HTMLButtonElement | null>(null);
  const hoverT = useRef<number | null>(null);
  const ticking = useRef(false);
  /* Tıklayarak kapatılan başlığın imleç hâlâ üstündeyken hover ile hemen geri
     açılmasını engelliyor. İmleç başlıktan ayrılınca serbest kalıyor. */
  const suppress = useRef<PanelKey | null>(null);
  const wantPanelFocus = useRef(false);

  /* hangi ülkedeyiz — ray üstünde "buradasınız" işareti için */
  const seg = pathname?.split("/")[1] ?? "";
  const here = (COUNTRY_ORDER as string[]).includes(seg) ? (seg as CountrySlug) : null;

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

  /* Adres değişince her şey kapanır. SmartLink tıklamaları zaten kapatıyor;
     bu, tarayıcının geri/ileri tuşları için emniyet kemeri. Effect değil
     render sırasında düzeltme (React'in "prop değişince state'i ayarla"
     kalıbı) — effect kullanmak bir kare boyunca açık panelin yeni sayfanın
     üstünde asılı kalmasına yol açıyordu. */
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(null);
    setSheet(false);
  }

  /* ------------------------------------------------------------- klavye */
  const closeToTrigger = useCallback((k: PanelKey) => {
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

  /* ArrowDown ile açılan panelde odak ilk bağlantıya iner. Ülke panellerinde
     bu bağlantı "… ülke sayfası" — yani klavye kullanıcısının ilk durağı da
     ülkenin kendisi oluyor. */
  useEffect(() => {
    if (!open || !wantPanelFocus.current) return;
    wantPanelFocus.current = false;
    const el = panelRef.current?.querySelector<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    el?.focus();
  }, [open]);

  const onTriggerKey = (e: React.KeyboardEvent<HTMLButtonElement>, k: PanelKey) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === "Home" || e.key === "End") {
      e.preventDefault();
      const i = ORDER.indexOf(k);
      const next =
        e.key === "Home"
          ? ORDER[0]
          : e.key === "End"
            ? ORDER[ORDER.length - 1]
            : ORDER[(i + (e.key === "ArrowRight" ? 1 : ORDER.length - 1)) % ORDER.length];
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
  const hoverOpen = (e: React.PointerEvent, k: PanelKey) => {
    if (e.pointerType !== "mouse") return;
    if (suppress.current === k) return;
    clearT();
    const delay = open ? 0 : 90;
    hoverT.current = window.setTimeout(() => setOpen(k), delay);
  };

  const toggle = (k: PanelKey) => {
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
      COUNTRY_ORDER[(i + (e.key === "ArrowRight" ? 1 : COUNTRY_ORDER.length - 1)) % COUNTRY_ORDER.length];
    setSheetCountry(n);
    segs.current[n]?.focus();
  };

  const solid = scrolled || open !== null || sheet;
  const sheetList = servicesFor(sheetCountry);

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
          {/* Üç ülke tek bir kutunun içinde: birbirinin alternatifi oldukları
              görsel olarak da söyleniyor. */}
          <div className="n1-rail" role="group" aria-label="Ülke seçin">
            <span className="n1-rail-tag" aria-hidden="true">
              Ülke
            </span>
            {COUNTRY_ORDER.map((c) => (
              <button
                key={c}
                type="button"
                ref={(el) => {
                  triggers.current[c] = el;
                }}
                className="n1-ctry"
                data-on={open === c}
                data-here={here === c}
                aria-expanded={open === c}
                aria-controls={open === c ? "n1-mega" : undefined}
                aria-current={here === c ? "page" : undefined}
                onClick={() => toggle(c)}
                onKeyDown={(e) => onTriggerKey(e, c)}
                onPointerEnter={(e) => hoverOpen(e, c)}
                onPointerLeave={() => {
                  if (suppress.current === c) suppress.current = null;
                }}
              >
                {open === c && (
                  <motion.span
                    layoutId="n1-rail-pill"
                    className="n1-ctry-pill"
                    aria-hidden="true"
                    transition={reduce ? { duration: 0 } : { duration: 0.28, ease: EASE }}
                  />
                )}
                <span className="n1-ctry-flag" aria-hidden="true">
                  <Flag country={c} />
                </span>
                <span className="n1-ctry-n">{COUNTRY_NAME[c]}</span>
                <ChevronDown className="n1-chev" size={13} strokeWidth={2.4} aria-hidden="true" />
              </button>
            ))}
          </div>

          <span className="n1-div" aria-hidden="true" />

          {TAIL.map((k) => (
            <button
              key={k}
              type="button"
              ref={(el) => {
                triggers.current[k] = el;
              }}
              className="n1-top"
              data-on={open === k}
              aria-expanded={open === k}
              aria-controls={open === k ? "n1-mega" : undefined}
              onClick={() => toggle(k)}
              onKeyDown={(e) => onTriggerKey(e, k)}
              onPointerEnter={(e) => hoverOpen(e, k)}
              onPointerLeave={() => {
                if (suppress.current === k) suppress.current = null;
              }}
            >
              {TAIL_LABEL[k]}
              <ChevronDown className="n1-chev" size={13} strokeWidth={2.4} aria-hidden="true" />
            </button>
          ))}
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
                {isCountry(open) ? (
                  <CountryPanel c={open} onGo={closeAll} />
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
              <p className="n1-sheet-lbl" id="n1-seg-lbl">
                Önce ülke seçin
              </p>

              {/* Masaüstündeki rayın mobil karşılığı. Sekme kalıbı: yalnızca
                  seçili sekme Tab sırasında, ok tuşları aralarında geziyor. */}
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

                {sheetList.map((s) => {
                  const Icon = SVC_ICON[s.slug];
                  return (
                    <SmartLink
                      key={s.slug}
                      href={`/${sheetCountry}/${s.slug}`}
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
                  const items = k === "araclar" ? TOOLS : k === "kaynaklar" ? RESOURCES : CORPORATE;
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
                        {TAIL_LABEL[k]}
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
