"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Ban,
  Building2,
  Calculator,
  CalendarCheck,
  ChevronDown,
  ChevronRight,
  FileDown,
  Handshake,
  IdCard,
  Landmark,
  Layers,
  Scale,
  Scale3d,
  ShieldCheck,
  SlidersHorizontal,
  type LucideIcon,
} from "lucide-react";
import Logo from "@/components/shared/Logo";
import SmartLink from "@/components/shared/SmartLink";
import { Flag } from "@/components/shared/CountryPicker";
import { useLenis } from "@/components/Providers";
import { COUNTRY_NAME, FACTS, type CountrySlug } from "@/lib/brand";
import {
  COUNTRY_SLUGS,
  servicesFor,
  type Service,
  type ServiceSlug,
} from "@/lib/services";

/* ============================================================================
   ADAY N2 — "HİZMET ÖNCE" MEGABAR

   TEK CÜMLE: Menünün birinci ekseni ülke değil hizmet; ziyaretçi "muhasebe"
   der, panel o hizmeti hangi ülkelerde yürüttüğümüzü ve her ülkedeki kısa
   farkı yan yana gösterir.

   ---------------------------------------------------------------------------
   NEDEN EKSENİ TERS ÇEVİRDİM

   Canlı Nav.tsx'te "Hizmetler" panelinin sol sütunu bir ülke seçicisi. Yani
   soru sırası şu: önce nerede, sonra ne. Bu, ülkesini çoktan seçmiş ziyaretçi
   için doğru; ama sitenin trafiğinin önemli bir kısmı ülkeyi bilmiyor —
   "muhasebemi kim tutacak", "hesabı kim açacak" diye geliyor. Onlar için
   ülke-önce menü fazladan bir karar dayatıyor: cevabını bilmedikleri bir soruyu
   (hangi ülke?) cevaplamadan aradıkları hizmete ulaşamıyorlar.

   Ekseni çevirince üç şey birden kazanılıyor:

   1) Hizmeti arayan için yol kısalıyor. Tek sekme, sonra hedef sayfa.
   2) Ülke bilmeyen, hizmetin var olduğunu görüyor. "Uyum" diye bir şey
      yaptığımızı ülke seçmeden öğreniyor.
   3) EN ÖNEMLİSİ — YOKLUK GÖRÜNÜR OLUYOR. Ülke-önce menüde bir hizmetin bir
      ülkede olmadığını asla göremezsiniz; o ülkenin listesinde satır yoktur,
      yokluk sessizdir. Hizmet-önce menüde üç ülke slotu hep basılıyor; İngiltere
      sekmesi "Oturum ve vize"de boş kalıyor ve sebebini yazıyor. Bu, firmanın
      duruşuyla (brand.ts STANCE_LIMITS) aynı damardan: söylemediğimiz şeyi
      gizlemek yerine sınırı yazıyoruz. Ülke sayfasına girip "acaba vize de
      veriyorlar mı" diye arayan ziyaretçi, cevabı menüde alıyor.

   Ülke ekseni kaybolmuyor, ikinciye düşüyor: panelin altındaki şeritte üç ülke
   çipi duruyor (/dubai, /ingiltere, /kktc). Yani iki eksen de menüde, sadece
   hangisinin önce geldiği değişti.

   ---------------------------------------------------------------------------
   MEVCUT NAVBAR'DAN AYRILDIĞIM DİĞER KARARLAR (hepsi bilinçli)

   A) PANEL SÜTUN DEĞİL SATIR. Canlıda panel iki sütun (solda seçici, sağda
      kartlar). Burada iki yatay kat: üstte hizmet sekmeleri, altta ülke
      kartları. Okuma yönü soldan sağa "hizmet → ülke → git" diye akıyor,
      gözün panel içinde sağa-sola zıplaması gerekmiyor. "Megabar" adının hakkı
      da bu: bar aşağı doğru katlanarak büyüyor.

   B) TETİKLEYİCİLER <a> DEĞİL <button>. Canlıda üst menü başlıkları SmartLink,
      yani hem bir adrese gidiyorlar hem de aria-expanded taşıyorlar. Bu ikisi
      birbirini yiyor: ekran okuyucuya "açılır" diyen ama tıklayınca açmayıp
      sayfa değiştiren bir öğe. Burada başlıklar düğme (açar/kapatır), gidilecek
      adres panelin içinde ayrı bir bağlantı olarak duruyor.

   C) TEK BÜYÜK PANEL + ÜÇ KÜÇÜK. Canlıda dört menünün dördü de tam genişlikte
      mega. Burada yalnızca "Hizmetler" tam mega; Araçlar/Kaynaklar/Kurumsal
      dar birer levha. Menünün kendisi de bir hiyerarşi ifadesi olsun istedim:
      sitenin bir ana işi var, gerisi rafta duruyor.

   D) NAVBAR KENDİ ZEMİNİNİ TAŞIYOR. Canlıda bar en üstte şeffaf ve yazısı
      beyaz — yani "altımda koyu hero var" varsayımı barın içine gömülü. Beyaz
      bir bölümün üstüne düşerse okunmuyor, bu yüzden bir sürü
      `.nav:not([data-scrolled])` istisnası yazılmış. Burada bar her zaman opak
      beyaz bir yüzey: en üstte container genişliğinde yüzen bir kapsül, sayfa
      kayınca kenardan kenara bir şeride çözülüyor. Hem koyu hero'nun hem beyaz
      bölümün üstünde tek bir kural yetiyor, kontrast varsayımı kalmıyor.

   E) KURULUŞ ARTIK ÜLKE SAYFASI DEĞİL. Canlıda "Şirket kuruluşu" satırı
      /dubai'ye gidiyor (kuruluş = ülke sayfasının kendisi). Hizmet-önce bir
      menüde bu tutarsız: beş hizmetin dördü kendi sayfasına giderken biri
      ülkeye sapıyor. Burada hepsi aynı kalıpta — /{ülke}/{hizmet}. Ülke
      sayfası, alttaki ülke çipleriyle kendi başına erişilebiliyor.

   ---------------------------------------------------------------------------
   MOBİL: TEK CÜMLE

   Mega panel açılamaz; bar altına tam ekran bir levha iniyor ve aynı ters eksen
   akordeon olarak yaşıyor — beş hizmet satırı, açılınca altında o hizmetin
   ülkeleri (ve verilmediği ülkenin gerekçesi).

   ---------------------------------------------------------------------------
   ERİŞİLEBİLİRLİK — SÜS DEĞİL, KISIT

   · Hover tek yol değil: tıklama, Enter/Space, ok tuşları hepsi açıyor. Hover
     yalnızca (hover:hover) olan cihazlarda devrede.
   · Escape kapatıyor ve odağı tetikleyen düğmeye geri veriyor.
   · Odak tuzağı YOK: panel içinde Tab'a basıp sonuncuyu geçtiğinizde odak
     header'dan çıkar, focusout yakalar ve paneli kapatır. Kimse kilitli kalmaz.
   · aria-expanded / aria-controls gerçek: her tetikleyicinin kontrol ettiği
     panel DOM'da o id ile duruyor (kapalıyken boş kabuk olarak).
   · Sekme şeridi gerçek tablist: roving tabindex, Ok/Home/End, tek Tab durağı.
   · Dışarı tıklama kapatıyor (pointerdown), perde yalnızca görsel — tıklamayı
     yutmuyor ki klavye ve fare aynı kapanma yolunu kullansın.
   · useReducedMotion(): hareket kapalıysa hem motion varyantları hem CSS
     geçişleri sadeleşiyor.
   ========================================================================= */

/* --------------------------------------------------------------- veri türetme
   Hangi hizmetin hangi ülkede olduğu ELLE YAZILMIYOR. servicesFor() ne
   döndürüyorsa menü o. Sebep: visa() BAE ve KKTC dışında null dönüyor ve bu
   karar pricing.ts'teki perVisa değerinden türüyor. Menüye elle bir liste
   yazsaydım, İngiltere'de bir gün vize hizmeti açıldığında menü yalan söylemeye
   devam edecekti. Ayrıca lib/routes.ts de canlı adresleri aynı fonksiyondan
   türetiyor; iki taraf tek kaynağa bakınca SmartLink'in "yakında" kararıyla
   menünün gösterdiği yapı hiçbir zaman çelişmiyor. */

const COUNTRIES: CountrySlug[] = COUNTRY_SLUGS;

type Where = Record<CountrySlug, Service | null>;
type MenuService = {
  slug: ServiceSlug;
  label: string;
  icon: LucideIcon;
  lead: string;
  where: Where;
};

/* Sekme etiketi neden ayrı bir tablo: services.ts'teki title ülkeye göre
   değişiyor (Dubai'de "Uyum (AML / goAML)", diğerlerinde "Uyum ve AML").
   goAML BAE'ye özgü bir sistem, ülkeler-üstü bir sekmenin başlığında yeri yok.
   Eşleşmeyen bir slug gelirse hizmetin kendi title'ına düşülüyor — yeni bir
   hizmet eklendiğinde menü yine de çalışsın. */
const TAB_LABEL: Partial<Record<ServiceSlug, string>> = {
  "sirket-kurulusu": "Şirket kuruluşu",
  muhasebe: "Muhasebe ve vergi",
  "banka-hesabi": "Banka ve ödeme",
  "oturum-vize": "Oturum ve vize",
  uyum: "Uyum ve AML",
};

const TAB_ICON: Partial<Record<ServiceSlug, LucideIcon>> = {
  "sirket-kurulusu": Building2,
  muhasebe: CalendarCheck,
  "banka-hesabi": Landmark,
  "oturum-vize": IdCard,
  uyum: ShieldCheck,
};

/* Panelin tek satırlık girişi. Varsayılan olarak hizmetin services.ts'teki
   kendi cümlesini kullanıyorum — yeni metin uydurmamak için. Tek istisna uyum:
   oradaki cümle Dubai'ye özgü ("goAML kaydı…") ve ülkeler-üstü bir başlıkta
   yanıltıcı olur. */
const TAB_LEAD: Partial<Record<ServiceSlug, string>> = {
  uyum: "AML politikası, kayıt yükümlülükleri ve dönemsel bildirimlerin takibi.",
};

/* Ülke kartının tek satırı: "burada bu hizmet neye benziyor". Menünün eklediği
   tek yeni içerik bu ve bilerek kısa — kurum/rejim adı veriyor, iddia etmiyor.
   Rakam yok: fiyat ve süre hizmet sayfasında yaşıyor, üst menüde değil (canlı
   Nav'ın da kararı buydu ve doğru). Eşleşme bulunmazsa FACTS[c].tag'e
   düşülüyor, yani slot hiçbir zaman boş kalmıyor. */
const DIFF: Partial<Record<ServiceSlug, Partial<Record<CountrySlug, string>>>> = {
  "sirket-kurulusu": {
    dubai: "Serbest bölge lisansı, isim onayı ve tescil",
    ingiltere: "Companies House tescili ve kayıtlı adres",
    kktc: "Yerel tescil ve ana sözleşme",
  },
  muhasebe: {
    dubai: "FTA portalı, kurumlar vergisi ve KDV",
    ingiltere: "HMRC beyanı ve yıllık mali tablolar",
    kktc: "Yerel vergi dairesi, dönemsel beyan",
  },
  "banka-hesabi": {
    dubai: "Wio ve Mashreq NeoBiz başvurusu",
    /* İngiltere'de kurum adı yazmıyorum: brand.ts "Wise · Payoneer" diyor,
       services.ts "Wise · Revolut Business" diyor. İki kaynak anlaşana kadar
       menüde bir marka adı geçmesin — menü, sayfanın söylemediği bir şeyi
       söylememeli. */
    ingiltere: "Banka ve ödeme kuruluşu başvurusu",
    kktc: "Yerel banka, imza için yerinde bulunma",
  },
  "oturum-vize": {
    dubai: "Ortak ve çalışan vizesi, Emirates ID",
    kktc: "Çalışma ve oturum izni adımları",
  },
  uyum: {
    dubai: "goAML kaydı ve bildirim yükümlülükleri",
    ingiltere: "Gerçek fayda sahibi (PSC) kaydı",
    kktc: "AML politikası ve kayıt yükümlülükleri",
  },
};

/* Hizmetin verilmediği ülkede kartın yerine geçen gerekçe. Bugün tek bir kutu
   var (İngiltere / oturum-vize) ve gerekçeyi uydurmuyoruz: FACTS.ingiltere.limit
   zaten sitenin her yerinde aynı cümleyi söylüyor. Kutu servisin yokluğundan
   TÜRÜYOR; buraya bir kayıt eklemek onu göstermiyor, servicesFor() gösteriyor. */
const MISSING: Partial<Record<ServiceSlug, Partial<Record<CountrySlug, string>>>> = {
  "oturum-vize": { ingiltere: FACTS.ingiltere.limit },
};

const MENU_SERVICES: MenuService[] = (() => {
  const order: ServiceSlug[] = [];
  const bag = new Map<ServiceSlug, Partial<Record<CountrySlug, Service>>>();

  /* Kanonik sıra = ilk görüldüğü sıra. Dubai beş hizmetin hepsini taşıdığı için
     pratikte Dubai'nin sırası; ama bir gün taşımazsa liste yine de eksiksiz
     olsun diye üç ülkenin birleşimini alıyorum. */
  for (const c of COUNTRIES) {
    for (const s of servicesFor(c)) {
      let entry = bag.get(s.slug);
      if (!entry) {
        entry = {};
        bag.set(s.slug, entry);
        order.push(s.slug);
      }
      entry[c] = s;
    }
  }

  return order.map((slug) => {
    const entry = bag.get(slug) ?? {};
    const first = COUNTRIES.map((c) => entry[c]).find(Boolean);
    return {
      slug,
      label: TAB_LABEL[slug] ?? first?.title ?? slug,
      icon: TAB_ICON[slug] ?? Layers,
      lead: TAB_LEAD[slug] ?? first?.line ?? "",
      where: {
        dubai: entry.dubai ?? null,
        ingiltere: entry.ingiltere ?? null,
        kktc: entry.kktc ?? null,
      },
    };
  });
})();

/* ------------------------------------------------------------- yan menüler
   İçerik canlı Nav.tsx ile birebir aynı. Bilerek: müşteri bu turda menü
   YAPISINI karşılaştırıyor, metin farkı karşılaştırmayı bulandırır. Yayında
   olmayan adresler (fiyatlar, blog, hakkımızda…) burada da duruyor; SmartLink
   onları sönükleştirip "yakında" rozetini kendisi basıyor. */
type Tile = { label: string; href: string; desc: string; icon: LucideIcon };

const TOOLS: Tile[] = [
  { label: "Uygunluk testi", href: "/uygunluk-testi", desc: "6 soruda ülke önerisi", icon: SlidersHorizontal },
  { label: "Maliyet hesaplayıcı", href: "/fiyatlar", desc: "Paket ve ek hizmet tutarı", icon: Calculator },
  { label: "Ödeme altyapısı matrisi", href: "/araclar/odeme-altyapisi", desc: "Hangi kanal nerede çalışıyor", icon: Landmark },
  { label: "Ülke karşılaştırma", href: "/ulke-karsilastirma", desc: "Üç ülke yan yana", icon: Scale3d },
];

const RESOURCES: Tile[] = [
  { label: "Ülke rehberleri", href: "/kaynaklar", desc: "Dubai, İngiltere, KKTC", icon: FileDown },
  { label: "Mevzuat", href: "/blog", desc: "Güncellemeler ve tarihler", icon: Scale },
  { label: "E-kitaplar", href: "/kaynaklar", desc: "Ücretsiz PDF rehberler", icon: Layers },
];

const CORPORATE: Tile[] = [
  { label: "Hakkımızda", href: "/hakkimizda", desc: "Ofis, lisans ve ekip", icon: Building2 },
  { label: "İş ortaklığı", href: "/is-ortakligi", desc: "Mali müşavir ve danışman kanalı", icon: Handshake },
  { label: "Şirketini taşı", href: "/sirket-tasima", desc: "Mevcut şirketi Ortac'a alın", icon: ShieldCheck },
  { label: "İletişim", href: "/iletisim", desc: "Dubai ofis ve destek", icon: Landmark },
];

type MenuKey = "hizmetler" | "araclar" | "kaynaklar" | "kurumsal";

const BAR: { key: MenuKey; label: string; wide: boolean; tiles?: Tile[] }[] = [
  { key: "hizmetler", label: "Hizmetler", wide: true },
  { key: "araclar", label: "Araçlar", wide: false, tiles: TOOLS },
  { key: "kaynaklar", label: "Kaynaklar", wide: false, tiles: RESOURCES },
  { key: "kurumsal", label: "Kurumsal", wide: false, tiles: CORPORATE },
];

/* ============================================================== alt parçalar */

/** Dar levhaların içeriği: tek sütun ikonlu satırlar. */
function TileList({ items, onGo }: { items: Tile[]; onGo: () => void }) {
  return (
    <div className="n2-tiles">
      {items.map((t, i) => (
        <SmartLink
          key={t.label}
          href={t.href}
          className="n2-tile"
          onClick={onGo}
          data-n2-entry={i === 0 ? "" : undefined}
        >
          <span className="n2-tile-ic" aria-hidden="true">
            <t.icon size={17} strokeWidth={1.9} />
          </span>
          <span className="n2-tile-txt">
            <b>{t.label}</b>
            <em>{t.desc}</em>
          </span>
        </SmartLink>
      ))}
    </div>
  );
}

/** Bir hizmetin üç ülkedeki hâli. Slot sayısı hep üç — yokluk da bir bilgi. */
function CountryRow({ svc, onGo }: { svc: MenuService; onGo: () => void }) {
  return (
    <div className="n2-row">
      {COUNTRIES.map((c) => {
        const here = svc.where[c];

        if (!here) {
          return (
            <div key={c} className="n2-cc n2-cc-off">
              <span className="n2-cc-flag" aria-hidden="true">
                <Flag country={c} />
              </span>
              <span className="n2-cc-txt">
                <b>{COUNTRY_NAME[c]}</b>
                <em>
                  Bu ülkede sunmuyoruz —{" "}
                  {MISSING[svc.slug]?.[c] ?? "kapsamımız dışında"}
                </em>
              </span>
              <span className="n2-cc-go" aria-hidden="true">
                <Ban size={15} strokeWidth={2} />
              </span>
            </div>
          );
        }

        return (
          <SmartLink key={c} href={`/${c}/${here.slug}`} className="n2-cc" onClick={onGo}>
            <span className="n2-cc-flag" aria-hidden="true">
              <Flag country={c} />
            </span>
            <span className="n2-cc-txt">
              <b>{COUNTRY_NAME[c]}</b>
              <em>{DIFF[svc.slug]?.[c] ?? FACTS[c].tag}</em>
            </span>
            <span className="n2-cc-go" aria-hidden="true">
              <ChevronRight size={16} strokeWidth={2.2} />
            </span>
          </SmartLink>
        );
      })}
    </div>
  );
}

/* ====================================================================== nav */

export default function NavN2() {
  const lenis = useLenis();
  const reduce = useReducedMotion();

  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState<MenuKey | null>(null);
  const [tab, setTab] = useState<ServiceSlug>(MENU_SERVICES[0].slug);
  const [sheet, setSheet] = useState(false);
  const [acc, setAcc] = useState<string | null>(null);

  const headerRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const burgerRef = useRef<HTMLButtonElement | null>(null);
  const trigRefs = useRef<Partial<Record<MenuKey, HTMLButtonElement | null>>>({});
  const tabRefs = useRef<Partial<Record<ServiceSlug, HTMLButtonElement | null>>>({});

  /* Hover yalnızca gerçek imleci olan cihazlarda. Dokunmatikte pointerenter
     tıklamayla birlikte gelir ve menü açılır-kapanır titrer. */
  const hoverOK = useRef(false);
  const timer = useRef<number | null>(null);
  /* Klavyeyle açıldığında odağı panele taşımak istiyoruz, fareyle açıldığında
     istemiyoruz — bayrak bu ayrımı taşıyor. */
  const wantFocus = useRef(false);

  const current = useMemo(
    () => MENU_SERVICES.find((s) => s.slug === tab) ?? MENU_SERVICES[0],
    [tab],
  );

  useEffect(() => {
    hoverOK.current = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }, []);

  /* Kaydırma durumu. Lenis varsa onun olayına biniyoruz; yoksa pencereye.
     rAF kilidi, tek karede birden çok setState'i engelliyor. */
  const ticking = useRef(false);
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

  /* Mobil levha açıkken sayfa kaymasın. Mega panel sayfayı kilitlemiyor:
     bar sabit, panel bara yapışık, kaydırma sırasında ikisi birlikte duruyor. */
  useEffect(() => {
    if (!lenis) return;
    if (sheet) lenis.stop();
    else lenis.start();
  }, [sheet, lenis]);

  useEffect(() => () => {
    if (timer.current) window.clearTimeout(timer.current);
  }, []);

  const closeAll = useCallback(() => {
    if (timer.current) window.clearTimeout(timer.current);
    setMenu(null);
    setSheet(false);
    setAcc(null);
  }, []);

  /* Dışarı tıklama. Perde tıklamayı yutmuyor (pointer-events:none) — kapanma
     tek bir yerden, bu dinleyiciden geçsin diye. */
  useEffect(() => {
    if (!menu) return;
    const onDown = (ev: PointerEvent) => {
      if (!headerRef.current?.contains(ev.target as Node)) setMenu(null);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [menu]);

  /* Klavyeyle açılan panelde odak içeri giriyor. İlk durağı [data-n2-entry]
     işaretliyor: hizmetlerde etkin sekme, dar levhalarda ilk satır.
     :is(a,button) süzgeci şunun için: yayında olmayan adreslerde SmartLink <a>
     değil <span> döndürüyor ve span odaklanmaz. O durumda panelin ilk gerçek
     odaklanabilir öğesine düşüyoruz; hiçbiri yoksa (dört satırın dördü de
     "yakında" ise) odak tetikleyicide kalıyor — Tab yine sayfaya devam eder,
     kimse kilitlenmez. */
  const enterPanel = useCallback(() => {
    const root = panelRef.current;
    if (!root) return;
    const el =
      root.querySelector<HTMLElement>("[data-n2-entry]:is(a, button)") ??
      root.querySelector<HTMLElement>('a[href], button:not([disabled]), [tabindex="0"]');
    el?.focus();
  }, []);

  /* AnimatePresence levhayı bir kare sonra bastığı için odak taşıma effect'e
     bırakıldı: render bitmeden querySelector boş döner. */
  useEffect(() => {
    if (!menu || !wantFocus.current) return;
    wantFocus.current = false;
    enterPanel();
  }, [menu, enterPanel]);

  const openSoon = (k: MenuKey) => {
    if (!hoverOK.current) return;
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setMenu(k), 70);
  };

  const closeSoon = () => {
    if (!hoverOK.current) return;
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setMenu(null), 160);
  };

  const toggle = (k: MenuKey) => {
    if (timer.current) window.clearTimeout(timer.current);
    setMenu((m) => (m === k ? null : k));
  };

  /* Bar ile levha arasında birkaç pikselik boşluk var; fare oradan geçerken
     header'ı bir an terk ediyor ve kapanma sayacı başlıyor. Levhaya varınca
     sayaç iptal. Boşluğu görünmez bir köprüyle doldurmak yerine bunu tercih
     ettim: köprü, panel kapalıyken de sayfanın üstünde tıklama yiyen bir
     hayalet dikdörtgen bırakıyor. */
  const holdOpen = () => {
    if (timer.current) window.clearTimeout(timer.current);
  };

  /* Üst şerit klavyesi. role="menubar" bilerek kullanılmadı: o rol uygulama
     menüsü sözü verir ve tam bir tuş modeli ister. Burada W3C'nin "disclosure
     navigation" kalıbı var — düğme + aria-expanded — üstüne ok tuşlarıyla
     komşuya geçiş bir kolaylık olarak ekli. */
  const onBarKey = (e: React.KeyboardEvent, k: MenuKey) => {
    const i = BAR.findIndex((b) => b.key === k);
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const step = e.key === "ArrowRight" ? 1 : BAR.length - 1;
      const next = BAR[(i + step) % BAR.length].key;
      trigRefs.current[next]?.focus();
      if (menu) setMenu(next);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      /* Zaten açıksa setMenu durumu değiştirmez, effect de tetiklenmez —
         o yüzden açık hâlde odağı doğrudan taşıyoruz. */
      if (menu === k) {
        enterPanel();
        return;
      }
      wantFocus.current = true;
      setMenu(k);
    }
  };

  /* Escape header'ın herhangi bir yerinden çalışıyor ve odağı geri veriyor:
     kullanıcı paneli kapattığında imleci nerede bıraktığını bilmeli. */
  const onHeaderKey = (e: React.KeyboardEvent) => {
    if (e.key !== "Escape") return;
    if (menu) {
      e.stopPropagation();
      const k = menu;
      setMenu(null);
      trigRefs.current[k]?.focus();
    } else if (sheet) {
      e.stopPropagation();
      setSheet(false);
      burgerRef.current?.focus();
    }
  };

  /* Odak tuzağı yok: panelin son öğesinden Tab'a basınca odak header'ı terk
     eder, burası da paneli kapatır. Kullanıcı sayfanın akışına düşer.

     Mobil levha için ek bir koşul var — yalnızca odak GERÇEKTEN başka bir
     öğeye geçtiyse kapanıyor. relatedTarget null geldiğinde (dokunmatikte
     odaklanamaz bir yere dokunmak bunu üretiyor) levha açık kalıyor; yoksa
     kullanıcı boş bir yere dokunduğunda menü elinde patlıyor. */
  const onHeaderBlur = (e: React.FocusEvent<HTMLElement>) => {
    const next = e.relatedTarget as Node | null;
    if (next && e.currentTarget.contains(next)) return;
    if (menu) setMenu(null);
    if (sheet && next) setSheet(false);
  };

  const onTabKey = (e: React.KeyboardEvent) => {
    const n = MENU_SERVICES.length;
    const i = MENU_SERVICES.findIndex((s) => s.slug === tab);
    let target = -1;
    if (e.key === "ArrowRight") target = (i + 1) % n;
    else if (e.key === "ArrowLeft") target = (i - 1 + n) % n;
    else if (e.key === "Home") target = 0;
    else if (e.key === "End") target = n - 1;
    else return;
    e.preventDefault();
    const slug = MENU_SERVICES[target].slug;
    setTab(slug);
    tabRefs.current[slug]?.focus();
  };

  /* Hareket: azaltılmışsa yer değiştirme yok, yalnızca opaklık. */
  const drop = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -6 },
      };

  const bar: React.CSSProperties = {
    display: "block",
    width: 18,
    height: 1.5,
    background: "currentColor",
    transition: reduce
      ? "none"
      : "transform 250ms var(--ease-inout), opacity 250ms var(--ease-inout)",
  };

  return (
    <header
      ref={headerRef}
      className="n2"
      data-scrolled={scrolled}
      data-open={menu !== null || sheet}
      onKeyDown={onHeaderKey}
      onBlur={onHeaderBlur}
      onPointerLeave={closeSoon}
    >
      {/* Perde yalnızca görsel: arkadaki sayfayı geri çekiyor, tıklamayı
          yutmuyor. Yutsaydı fare için ayrı, klavye için ayrı kapanma yolu
          olurdu; tek yol olsun istedim. */}
      <AnimatePresence>
        {menu && (
          <motion.div
            className="n2-scrim"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
          />
        )}
      </AnimatePresence>

      <div className="n2-bar">
        <SmartLink href="/" className="n2-logo" aria-label="Ortac Global" onClick={closeAll}>
          <Logo height={24} />
        </SmartLink>

        <nav className="n2-menu" aria-label="Ana menü">
          {BAR.map((b) => (
            <div key={b.key} className="n2-item">
              <button
                type="button"
                ref={(el) => {
                  trigRefs.current[b.key] = el;
                }}
                id={`n2-trig-${b.key}`}
                className="n2-trig"
                data-on={menu === b.key}
                aria-expanded={menu === b.key}
                aria-controls={`n2-panel-${b.key}`}
                onClick={() => toggle(b.key)}
                onPointerEnter={() => openSoon(b.key)}
                onKeyDown={(e) => onBarKey(e, b.key)}
              >
                {b.label}
                <ChevronDown size={14} strokeWidth={2.2} aria-hidden="true" />
              </button>

              {/* Dar levha tetikleyicisinin ALTINA demirliyor. Canlıda dört
                  menünün dördü de tam genişlikte mega açıyor; "İletişim"i
                  görmek için ekranın tamamını kaplayan bir panel açmak
                  gereksiz bir jest. Burada sadece Hizmetler mega, gerisi
                  kendi başlığının altında duran birer levha — menünün kendisi
                  de bir hiyerarşi cümlesi kuruyor. */}
              {!b.wide && (
                <div id={`n2-panel-${b.key}`} className="n2-host n2-host-near">
                  <AnimatePresence>
                    {menu === b.key && (
                      <motion.div
                        ref={panelRef}
                        className="n2-sheet n2-sheet-near"
                        role="group"
                        aria-labelledby={`n2-trig-${b.key}`}
                        initial={drop.initial}
                        animate={drop.animate}
                        exit={drop.exit}
                        transition={{ duration: reduce ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
                        onPointerEnter={holdOpen}
                      >
                        <TileList items={b.tiles ?? []} onGo={closeAll} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="n2-right">
          <SmartLink href="/basla" className="n2-cta" onClick={closeAll}>
            Kurulumu Başlat
          </SmartLink>
          <SmartLink href="/panel" className="n2-panel-link" onClick={closeAll}>
            Panel
          </SmartLink>
          <span className="n2-lang" role="group" aria-label="Dil">
            <button type="button" data-on aria-pressed="true">
              TR
            </button>
            {/* aria-disabled, disabled değil: devre dışı bir düğme odağa
                gelmez ve kullanıcı nedenini hiç öğrenemez. Böyle sekmeyle
                ulaşılıyor ve "yakında" sesli okunuyor. */}
            <button type="button" aria-pressed="false" aria-disabled="true" onClick={(e) => e.preventDefault()}>
              EN<span className="n2-sr"> — yakında</span>
            </button>
          </span>
        </div>

        <button
          ref={burgerRef}
          type="button"
          className="n2-burger"
          aria-label={sheet ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={sheet}
          aria-controls="n2-sheet"
          onClick={() => {
            setMenu(null);
            setSheet((s) => !s);
          }}
        >
          <span style={{ ...bar, transform: sheet ? "translateY(6.5px) rotate(45deg)" : "none" }} />
          <span style={{ ...bar, opacity: sheet ? 0 : 1 }} />
          <span style={{ ...bar, transform: sheet ? "translateY(-6.5px) rotate(-45deg)" : "none" }} />
        </button>
      </div>

      {/* ---------------------------------------------------- HİZMETLER MEGA
          Tek geniş levha, barın altında ve container genişliğinde. Kabuk her
          zaman DOM'da duruyor: aria-controls'ün işaret ettiği id gerçekten var
          olsun diye. Kapalıyken içi boş, yüksekliği sıfır, tıklama geçirmiyor. */}
      <div id="n2-panel-hizmetler" className="n2-host n2-host-wide">
        <AnimatePresence>
          {menu === "hizmetler" && (
            <motion.div
              ref={panelRef}
              className="n2-sheet n2-sheet-wide"
              role="group"
              aria-labelledby="n2-trig-hizmetler"
              initial={drop.initial}
              animate={drop.animate}
              exit={drop.exit}
              transition={{ duration: reduce ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
              onPointerEnter={holdOpen}
            >
              <div className="n2-svc">
                {/* KAT 1 — hizmet şeridi. Menünün birinci ekseni.
                    Gerçek tablist: tek Tab durağı, içinde ok tuşlarıyla
                    dolaşılıyor. Hover sekmeyi değiştiriyor ama tek yol o
                    değil — tıklama ve klavye aynı sonucu veriyor. */}
                <div className="n2-tabs" role="tablist" aria-label="Hizmetler" onKeyDown={onTabKey}>
                  {MENU_SERVICES.map((s) => (
                    <button
                      key={s.slug}
                      type="button"
                      role="tab"
                      id={`n2-tab-${s.slug}`}
                      className="n2-tab"
                      data-on={tab === s.slug}
                      data-n2-entry={tab === s.slug ? "" : undefined}
                      aria-selected={tab === s.slug}
                      aria-controls={tab === s.slug ? "n2-svc-panel" : undefined}
                      tabIndex={tab === s.slug ? 0 : -1}
                      ref={(el) => {
                        tabRefs.current[s.slug] = el;
                      }}
                      onClick={() => setTab(s.slug)}
                      onPointerEnter={() => {
                        if (hoverOK.current) setTab(s.slug);
                      }}
                    >
                      <span className="n2-tab-ic" aria-hidden="true">
                        <s.icon size={17} strokeWidth={1.9} />
                      </span>
                      {s.label}
                    </button>
                  ))}
                </div>

                {/* KAT 2 — seçilen hizmetin ülkeleri. */}
                <div
                  className="n2-tabbody"
                  id="n2-svc-panel"
                  role="tabpanel"
                  aria-labelledby={`n2-tab-${current.slug}`}
                >
                  <motion.div
                    key={current.slug}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }}
                    animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    transition={{ duration: reduce ? 0 : 0.22, ease: [0.33, 1, 0.68, 1] }}
                  >
                    <p className="n2-lead">{current.lead}</p>
                    <CountryRow svc={current} onGo={closeAll} />
                  </motion.div>

                  {/* İkinci eksen burada yaşıyor: ülke menüden çıkmadı, sıraya
                      girdi. Yanında da ülkesini bilmeyenin çıkışı — menü onu
                      bir karara zorlamak yerine araca gönderiyor. */}
                  <div className="n2-foot">
                    <span className="n2-foot-lbl">Ülkeye göre:</span>
                    {COUNTRIES.map((c) => (
                      <SmartLink key={c} href={`/${c}`} className="n2-chip" onClick={closeAll}>
                        <span className="n2-chip-flag" aria-hidden="true">
                          <Flag country={c} />
                        </span>
                        {COUNTRY_NAME[c]}
                      </SmartLink>
                    ))}
                    <SmartLink href="/uygunluk-testi" className="n2-ask" onClick={closeAll}>
                      Hangisi bana uygun?
                      <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                    </SmartLink>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ------------------------------------------------------- mobil levha
          Mega panel dar ekranda açılamaz — üç sütun yan yana sığmaz ve hover
          diye bir şey yok. Aynı ters eksen akordeona iniyor: beş hizmet satırı,
          açılınca altında o hizmetin ülkeleri. Yani mobilde de önce "ne", sonra
          "nerede".

          Levha odağı KİLİTLEMİYOR. Tam ekran olduğu için "focus trap kur"
          refleksi gelir ama brief'in istediği bunun tersi: son bağlantıdan
          sonra Tab sayfaya devam ediyor, kimse levhanın içine hapsolmuyor.
          Kapanış için iki yol var — Escape ve kapatma düğmesi.

          Kabuk her zaman DOM'da; burger'ın aria-controls'ü boşluğu değil
          gerçek bir elemanı gösteriyor. */}
      <div id="n2-sheet">
        <AnimatePresence>
          {sheet && (
            <motion.div
              className="n2-mob"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: reduce ? 0 : 0.26, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="n2-mob-in">
                <p className="n2-mob-h">Hizmetler</p>

                {MENU_SERVICES.map((s) => {
                  const key = `svc:${s.slug}`;
                  const on = acc === key;
                  return (
                    <div key={s.slug} className="n2-acc">
                      <button
                        type="button"
                        className="n2-acc-top"
                        aria-expanded={on}
                        aria-controls={`n2-acc-${s.slug}`}
                        onClick={() => setAcc(on ? null : key)}
                      >
                        <span className="n2-acc-ic" aria-hidden="true">
                          <s.icon size={17} strokeWidth={1.9} />
                        </span>
                        {s.label}
                        <ChevronDown
                          size={18}
                          strokeWidth={2}
                          aria-hidden="true"
                          className="n2-acc-chev"
                          data-on={on}
                        />
                      </button>
                      <div id={`n2-acc-${s.slug}`} className="n2-acc-body" hidden={!on}>
                        {COUNTRIES.map((c) => {
                          const here = s.where[c];
                          if (!here)
                            return (
                              <p key={c} className="n2-mrow n2-mrow-off">
                                <span className="n2-mflag" aria-hidden="true">
                                  <Flag country={c} />
                                </span>
                                <span>
                                  <b>{COUNTRY_NAME[c]}</b> — bu ülkede sunmuyoruz.{" "}
                                  {MISSING[s.slug]?.[c] ?? "Yürütmediğimiz bir hizmet."}
                                </span>
                              </p>
                            );
                          return (
                            <SmartLink
                              key={c}
                              href={`/${c}/${here.slug}`}
                              className="n2-mrow"
                              onClick={closeAll}
                            >
                              <span className="n2-mflag" aria-hidden="true">
                                <Flag country={c} />
                              </span>
                              <span>
                                <b>{COUNTRY_NAME[c]}</b>
                                <em>{DIFF[s.slug]?.[c] ?? FACTS[c].tag}</em>
                              </span>
                            </SmartLink>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}

                <p className="n2-mob-h">Ülkeler</p>
                <div className="n2-mob-ctry">
                  {COUNTRIES.map((c) => (
                    <SmartLink key={c} href={`/${c}`} className="n2-chip" onClick={closeAll}>
                      <span className="n2-chip-flag" aria-hidden="true">
                        <Flag country={c} />
                      </span>
                      {COUNTRY_NAME[c]}
                    </SmartLink>
                  ))}
                </div>

                {BAR.filter((b) => b.tiles).map((b) => {
                  const key = `m:${b.key}`;
                  const on = acc === key;
                  return (
                    <div key={b.key} className="n2-acc">
                      <button
                        type="button"
                        className="n2-acc-top"
                        aria-expanded={on}
                        aria-controls={`n2-macc-${b.key}`}
                        onClick={() => setAcc(on ? null : key)}
                      >
                        {b.label}
                        <ChevronDown
                          size={18}
                          strokeWidth={2}
                          aria-hidden="true"
                          className="n2-acc-chev"
                          data-on={on}
                        />
                      </button>
                      <div id={`n2-macc-${b.key}`} className="n2-acc-body" hidden={!on}>
                        {(b.tiles ?? []).map((t) => (
                          <SmartLink key={t.label} href={t.href} className="n2-mrow" onClick={closeAll}>
                            <span className="n2-acc-ic" aria-hidden="true">
                              <t.icon size={16} strokeWidth={2} />
                            </span>
                            <span>
                              <b>{t.label}</b>
                            </span>
                          </SmartLink>
                        ))}
                      </div>
                    </div>
                  );
                })}

                <div className="n2-mob-cta">
                  <SmartLink href="/basla" className="n2-cta n2-cta-full" onClick={closeAll}>
                    Kurulumu Başlat
                  </SmartLink>
                  <SmartLink href="/panel" className="n2-panel-link n2-panel-full" onClick={closeAll}>
                    Panel
                  </SmartLink>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
