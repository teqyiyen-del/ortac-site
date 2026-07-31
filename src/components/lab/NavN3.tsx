"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Building2,
  CalendarCheck,
  ChevronDown,
  ChevronRight,
  IdCard,
  Landmark,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

import Logo from "@/components/shared/Logo";
import SmartLink from "@/components/shared/SmartLink";
import { Flag } from "@/components/shared/CountryPicker";
import { useLenis } from "@/components/Providers";
import { gtm } from "@/lib/gtm";
import { COUNTRY_NAME, COUNTRY_ORDER, FACTS, type CountrySlug } from "@/lib/brand";
import { servicesFor, type ServiceSlug } from "@/lib/services";

/* ============================================================================
   NavN3 — "TEK PANEL"

   FİKİR
   Mevcut navbar dört ayrı tetikleyici taşıyor (Hizmetler / Araçlar / Kaynaklar
   / Kurumsal) ve bunlardan biri — Hizmetler — kendi içinde ikinci bir eksene
   daha sahip: önce ülkeyi seçiyorsun, sonra hizmeti görüyorsun. Yani menüde
   iki ayrı karar var: "hangi kutu" ve "hangi ülke". Ziyaretçi sitenin
   tamamını görmek istediğinde dört kutuyu tek tek açmak zorunda.

   Buradaki aday bunu tersine çeviriyor: tek tetikleyici, tek panel. Bir kere
   açılıyor ve sitenin haritasının tamamı aynı anda ekranda: solda üç ülke,
   sağda seçili ülkenin hizmetleri, altta araçlar / kaynaklar / kurumsal.
   İkinci bir "hangi kutu" kararı yok; ülke seçimi de bir sonraki adım değil,
   panelin zaten açık olan sol sütunu.

   MEVCUT NAVBAR'DAN AYRILDIĞIM ASIL KARAR
   Panel koyu. Sebebi estetik değil, ölçü: bu panel bütün site haritasını
   taşıdığı için büyük, ve beyaz bir sayfanın üstüne düşen büyük beyaz bir
   yaprak sayfayla aynı katmandaymış gibi görünüyor — nerede bittiği belli
   olmuyor, gölgeyle ayırmak gerekiyor. Koyu yüzey bunu tek hamlede çözüyor:
   panel açıldığında üst çubuk da geceye dönüyor ve ikisi tek bir blok haline
   geliyor. "Megabar" adının karşılığı tam olarak bu — çubuk ile panel ayrı
   iki nesne değil, aynı nesnenin kapalı ve açık hali. Ayrıca sitenin koyu
   hero'su üstünde duran çubuk zaten koyu davranıyor; açılış o dili sürdürüyor.

   İKİNCİ AYRILIK: ZEMİN VARSAYIMI
   Mevcut navbar sayfanın en üstündeyken koşulsuz saydam ve beyaz metinli.
   Bu, her sayfanın tepesinde koyu bir hero olduğunu varsaymak demek; olmayan
   sayfada menü beyaz üstüne beyaz kalıyor. Burada varsayılan okunur beyaz
   çubuk, saydamlık ise sayfanın bildirdiği bir durum: hero kökündeki
   data-nav-dark özniteliği. Öznitelik yoksa hiçbir sayfa bozulmuyor.

   KALABALIK KONTROLÜ
   19 bağlantı az sayı değil. Kutuyla, çerçeveyle, gölgeyle ayırmak yerine üç
   ayrı doku kullanıyorum ve hiyerarşiyi tipografiyle kuruyorum:
     · ülkeler  → bayrak + ad + yapı satırı, seçilebilir satırlar
     · hizmetler → ikon + ad + tek satır açıklama
     · alt raf  → hiç ikon yok, hiç açıklama yok, sadece 13px metin bağlantı
   Böylece göz üç bölgeyi ilk bakışta ayırıyor; hepsi kart olsaydı 19 eşit
   ağırlıkta kutu olurdu ve panel gerçekten kalabalık görünürdü.

   İÇERİK NEREDEN GELİYOR
   Hizmet listesi elle yazılmıyor: servicesFor(ülke) ne döndürüyorsa o. Bu
   yüzden İngiltere'de oturum/vize satırı kendiliğinden yok. Daha iyisi: satır
   eksikse panel bunu sessizce yutmuyor, FACTS[ülke].limit ile sebebini
   yazıyor ("Şirket kurmak oturum hakkı vermiyor"). Menüdeki boşluk böylece
   bir eksiklik değil, bir bilgi oluyor.
   ========================================================================= */

/* Menüde rakam yok. Fiyat da süre de hizmet sayfasında yaşıyor; üst menüde
   bir sayı görünürse ziyaretçi onu taahhüt sanıyor ve firma politikası kesin
   süre / kesin tutar taahhüdüne kapalı. Bu yüzden servicesFor()'un from,
   duration ve unit alanlarına burada hiç dokunmuyorum — yalnızca slug, başlık
   ve adresi kullanıyorum. */
const SERVICE_ICON: Record<ServiceSlug, LucideIcon> = {
  "sirket-kurulusu": Building2,
  muhasebe: CalendarCheck,
  "banka-hesabi": Landmark,
  "oturum-vize": IdCard,
  uyum: ShieldCheck,
};

/* services.ts'teki `line` alanı hizmet sayfası için yazılmış tam cümleler —
   menü satırında iki satıra taşıyor ve paneli şişiriyor. Kısaltıp kırpmak
   yerine menüye ait, dört-beş kelimelik kendi satırını tutuyorum. Ülkeye göre
   değişmiyor, çünkü değişen şey işin kendisi değil mevzuat. */
const SERVICE_LINE: Record<ServiceSlug, string> = {
  "sirket-kurulusu": "Lisans, tescil ve kuruluş evrakı",
  muhasebe: "Defter, beyan ve dönemsel raporlama",
  "banka-hesabi": "Hesap başvurusu ve tahsilat kanalları",
  "oturum-vize": "Vize, sağlık kontrolü ve kimlik",
  uyum: "AML politikası ve bildirim takvimi",
};

/* Alt raf. İkon ve açıklama kasten yok: bunlar sitenin ikincil katmanı ve
   hizmetlerle aynı görsel ağırlığı alırlarsa panel dağılıyor. Yayında olmayan
   adresler SmartLink sayesinde kendiliğinden sönükleşip "yakında" rozetini
   alıyor — hangisinin canlı olduğuna burada karar verilmiyor. */
type RailItem = { label: string; href: string };
const RAIL: { title: string; items: RailItem[] }[] = [
  {
    title: "Araçlar",
    items: [
      { label: "Uygunluk testi", href: "/uygunluk-testi" },
      { label: "Maliyet hesaplayıcı", href: "/fiyatlar" },
      { label: "Ödeme altyapısı matrisi", href: "/araclar/odeme-altyapisi" },
    ],
  },
  {
    title: "Kaynaklar",
    items: [
      { label: "Ülke rehberleri", href: "/kaynaklar" },
      { label: "Mevzuat günlüğü", href: "/blog" },
      { label: "Sık sorulan sorular", href: "/#sss" },
    ],
  },
  {
    title: "Kurumsal",
    items: [
      { label: "Hakkımızda", href: "/hakkimizda" },
      { label: "İş ortaklığı", href: "/is-ortakligi" },
      { label: "İletişim", href: "/iletisim" },
    ],
  },
];

const PANEL_ID = "n3-map";
const TABPANEL_ID = "n3-map-services";
const tabId = (c: CountrySlug) => `n3-map-tab-${c}`;

export default function NavN3() {
  const lenis = useLenis();
  const reduce = useReducedMotion();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  /* Çubuğun şu anda koyu bir bloğun üstünde durup durmadığı. Ayrıntı için
     aşağıdaki kaydırma efektindeki uzun nota bakın. */
  const [overDark, setOverDark] = useState(false);
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState<CountrySlug>("dubai");
  /* Panel masaüstünde çubuğun altına açılıyor, dar ekranda tam sayfa oluyor.
     İkisi aynı DOM; fark yalnızca yerleşim ve gövde kilidinde, o yüzden hangi
     modda olduğumuzu bilmek gerekiyor. */
  const [narrow, setNarrow] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const deskTriggerRef = useRef<HTMLButtonElement>(null);
  /* Escape'te odağı geri vereceğimiz düğme: paneli hangisi açtıysa o. */
  const lastTrigger = useRef<HTMLButtonElement | null>(null);
  const tabRefs = useRef<Partial<Record<CountrySlug, HTMLButtonElement | null>>>({});

  const openT = useRef<number | null>(null);
  const closeT = useRef<number | null>(null);
  /* İşaretçi gerçekten "hover" yapabiliyor mu? Dokunmatik ekranda hover
     taklidi menüyü tek dokunuşta açıp kapatıyor; orada yalnızca tıklama var. */
  const canHover = useRef(false);
  /* Açıkken tetikleyiciye tıklayınca panel kapanır, ama imleç hâlâ düğmenin
     üstünde olduğu için hover onu anında geri açar. Klasik tuzak; kısa bir
     pencere boyunca hover'ı susturarak kapatıyoruz. */
  const hoverMuteUntil = useRef(0);

  const clearTimers = useCallback(() => {
    if (openT.current) window.clearTimeout(openT.current);
    if (closeT.current) window.clearTimeout(closeT.current);
    openT.current = null;
    closeT.current = null;
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  /* ---- kaydırma durumu ve zemin uyumu ----
     Lenis varsa onun döngüsünden, yoksa pencereden.

     Zemin meselesi mevcut navbar'ın çözmediği yer: orada çubuk sayfanın en
     üstündeyken koşulsuz saydam ve metni beyaz. Bu, her sayfanın tepesinde
     koyu bir hero olduğunu varsayıyor. Beyaz açılan bir sayfada (hizmet
     sayfaları, kaynaklar, panel) ilk ekranda menü beyaz üstüne beyaz kalıyor.

     Burada varsayım tersine çevrildi: varsayılan hal okunur beyaz çubuk.
     Saydam + beyaz metinli hal ancak sayfa "arkamda koyu bir blok var" dediği
     zaman açılıyor; bunu hero kökündeki data-nav-dark özniteliği söylüyor.
     Öznitelik yoksa hiçbir sayfa bozulmuyor. Varsa da blok çubuğun altından
     çıkar çıkmaz beyaza dönüyor — eşik kaydırma mesafesi değil, bloğun
     gerçek alt kenarı, yani hero'nun yüksekliği değişse bile doğru kalıyor. */
  useEffect(() => {
    /* Koyu blok bir kez bulunup saklanıyor; her kaydırma karesinde belge
       taramak pahalı. Menü yerleşimde kurulu olduğu ve sayfalar arasında
       ayakta kaldığı için arama rota değiştikçe yenileniyor — efektin
       bağımlılığındaki pathname'in tek işi bu. */
    const darkEl = document.querySelector<HTMLElement>("[data-nav-dark]");
    let ticking = false;
    const update = () => {
      ticking = false;
      setScrolled(window.scrollY > 8);
      const barH = window.innerWidth >= 1024 ? 76 : 64;
      setOverDark(!!darkEl && darkEl.getBoundingClientRect().bottom > barH);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    update();
    if (lenis) {
      lenis.on("scroll", onScroll);
      return () => lenis.off("scroll", onScroll);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lenis, pathname]);

  /* ---- kırılım ve işaretçi yeteneği ---- */
  useEffect(() => {
    const mqNarrow = window.matchMedia("(max-width: 1023.5px)");
    const mqHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => {
      setNarrow(mqNarrow.matches);
      canHover.current = mqHover.matches;
    };
    sync();
    mqNarrow.addEventListener("change", sync);
    mqHover.addEventListener("change", sync);
    return () => {
      mqNarrow.removeEventListener("change", sync);
      mqHover.removeEventListener("change", sync);
    };
  }, []);

  /* ---- gövde kilidi ----
     Yalnızca dar ekranda: orada panel tam sayfa, arkasında sayfanın kayması
     kafa karıştırıyor. Masaüstünde panel çubuğa asılı duruyor ve kaydırmayı
     kesmek ziyaretçiyi hapsetmek olur. */
  useEffect(() => {
    const lock = open && narrow;
    if (lenis) {
      if (lock) lenis.stop();
      else lenis.start();
      /* menü açıkken bileşen sökülürse kaydırma kilitli kalmasın */
      return () => {
        if (lock) lenis.start();
      };
    }
    document.body.style.overflow = lock ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, narrow, lenis]);

  /* ---- Escape ----
     Belge düzeyinde dinliyoruz ki odak nerede olursa olsun kapansın. Odağı
     tetikleyiciye ancak odak zaten menünün içindeyse geri veriyoruz; hover ile
     açılmış bir panel yüzünden ziyaretçinin yazdığı formdan odak çalınmasın. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const inside = headerRef.current?.contains(document.activeElement);
      setOpen(false);
      if (inside) lastTrigger.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  /* ---- dışarı tıklama ---- */
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown, true);
    return () => document.removeEventListener("pointerdown", onDown, true);
  }, [open]);

  /* ---- odak menüden çıkarsa kapat ----
     Odak tuzağı kurmuyoruz (kurmamamız da isteniyor). Bunun yerine son
     bağlantıdan sonra Tab'a basıldığında menü kendini kapatıyor: odak sayfaya
     doğal biçimde devam ediyor, görünmez bir bağlantıya düşmüyor.
     setTimeout(0): blur anında activeElement henüz body; bir tik sonra gerçek
     hedefe bakıyoruz. activeElement body kaldıysa bu bir fare etkileşimidir
     (panelin boş bir yerine basılmıştır), menüyü kapatmıyoruz. */
  const onHeaderBlur = useCallback(() => {
    window.setTimeout(() => {
      const el = document.activeElement;
      if (!headerRef.current || !el || el === document.body) return;
      if (headerRef.current.contains(el)) return;
      setOpen(false);
    }, 0);
  }, []);

  /* ---- hover: yalnızca açar, asla kapatmaz ----
     Kapatma işi başlığın tamamından çıkışa bağlı; böylece imleç çubuk ile
     panel arasındaki boşluktan geçerken menü titremiyor. Ve hover hiçbir
     zaman tek yol değil: aynı paneli tıklama, Enter/Space ve ArrowDown da
     açıyor. */
  const hoverOpen = useCallback(() => {
    if (!canHover.current || narrow) return;
    if (Date.now() < hoverMuteUntil.current) return;
    clearTimers();
    openT.current = window.setTimeout(() => {
      lastTrigger.current = deskTriggerRef.current;
      setOpen(true);
    }, 90);
  }, [narrow, clearTimers]);

  const hoverLeave = useCallback(() => {
    if (!canHover.current || narrow) return;
    clearTimers();
    closeT.current = window.setTimeout(() => setOpen(false), 180);
  }, [narrow, clearTimers]);

  const toggle = useCallback(
    (el: HTMLButtonElement) => {
      clearTimers();
      lastTrigger.current = el;
      setOpen((v) => {
        if (v) hoverMuteUntil.current = Date.now() + 450;
        return !v;
      });
    },
    [clearTimers],
  );

  const close = useCallback(() => setOpen(false), []);

  /* ---- ülke sekmeleri: gezinen tabindex + oklar ----
     Yerleşim kırılıma göre dikeyden yataya dönmediği için (dar ekranda da
     satırlar alt alta) yön dikey; yine de dört oku da kabul ediyoruz, kimse
     hangi okun çalıştığını tahmin etmek zorunda kalmasın. */
  const onTabsKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const n = COUNTRY_ORDER.length;
    const i = COUNTRY_ORDER.indexOf(country);
    let next: number | null = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (i + 1) % n;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (i - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    if (next === null) return;
    e.preventDefault();
    const c = COUNTRY_ORDER[next];
    setCountry(c);
    tabRefs.current[c]?.focus();
  };

  const onTriggerKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== "ArrowDown") return;
    e.preventDefault();
    lastTrigger.current = e.currentTarget;
    setOpen(true);
    requestAnimationFrame(() => tabRefs.current[country]?.focus());
  };

  const services = servicesFor(country);
  const hasVisa = services.some((s) => s.slug === "oturum-vize");

  return (
    <header
      ref={headerRef}
      className="n3"
      data-scrolled={scrolled}
      data-dark={overDark}
      data-open={open}
      onBlur={onHeaderBlur}
      onMouseLeave={hoverLeave}
    >
      {/* ---------------------------------------------------------- çubuk */}
      <div className="n3-bar">
        <div className="container-o n3-bar-in">
          <SmartLink href="/" className="n3-logo" aria-label="Ortac Global, ana sayfa" onClick={close}>
            <Logo height={24} />
          </SmartLink>

          <nav className="n3-nav" aria-label="Ana menü">
            {/* Tek tetikleyici. Etiket "Hizmetler" çünkü ziyaretçilerin
                büyük çoğunluğu buraya bir hizmet aramaya geliyor; panelin
                geri kalanı (araçlar, kaynaklar, kurumsal) alt rafta zaten
                görünür halde, yani etiketin sözü tutuluyor: bir açılış,
                bütün harita. */}
            <button
              ref={deskTriggerRef}
              type="button"
              className="n3-trigger"
              aria-expanded={open}
              aria-controls={PANEL_ID}
              onClick={(e) => toggle(e.currentTarget)}
              onKeyDown={onTriggerKeyDown}
              onMouseEnter={hoverOpen}
            >
              Hizmetler
              <ChevronDown size={14} strokeWidth={2.2} aria-hidden="true" />
            </button>

            {/* Çubuktaki diğer iki giriş menü değil, doğrudan sayfa: panel
                açmıyorlar, bir tıkla varılıyor. Menü sayısını değil, tıklama
                sayısını azaltmak istiyoruz. */}
            <SmartLink href="/ulkeler" className="n3-link" onClick={close}>
              Ülkeler
            </SmartLink>
            <SmartLink href="/kaynaklar" className="n3-link" onClick={close}>
              Kaynaklar
            </SmartLink>
          </nav>

          <div className="n3-act">
            <span className="n3-lang" role="group" aria-label="Dil">
              <button type="button" data-on aria-pressed="true">
                TR
              </button>
              <button type="button" aria-pressed="false" title="Yakında">
                EN
              </button>
            </span>

            <SmartLink href="/panel" className="n3-panel-link" onClick={close}>
              Panel
            </SmartLink>

            {/* CTA üç zeminde de aynı mavi kalıyor. Mevcut navbar onu koyu
                hero üstünde beyaza çeviriyor; bu, sayfanın en önemli
                düğmesinin rengini kaydırdıkça değiştiriyor demek. Sabit renk
                hem gözün onu her yerde bulmasını sağlıyor hem de bir durum
                daha az. */}
            <SmartLink
              href="/basla"
              className="n3-cta"
              onClick={() => {
                close();
                gtm("nav_cta_click");
              }}
            >
              <span className="n3-cta-long">Kurulumu Başlat</span>
              <span className="n3-cta-short">Başla</span>
            </SmartLink>
          </div>

          <button
            type="button"
            className="n3-burger"
            aria-expanded={open}
            aria-controls={PANEL_ID}
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            onClick={(e) => toggle(e.currentTarget)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* ---------------------------------------------------------- panel
          Panel her zaman DOM'da. Sebebi erişilebilirlik: aria-controls var
          olmayan bir kimliği işaret edemez. Kapalıyken hem visibility:hidden
          hem inert — erişilebilirlik ağacından da, sekme sırasından da
          tamamen çıkıyor. */}
      <motion.div
        id={PANEL_ID}
        className="n3-panel"
        inert={!open}
        initial={false}
        animate={open ? "open" : "closed"}
        variants={{
          open: { opacity: 1, y: 0, visibility: "visible" },
          closed: {
            opacity: 0,
            y: reduce ? 0 : -10,
            transitionEnd: { visibility: "hidden" },
          },
        }}
        transition={{ duration: reduce ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
        onMouseEnter={clearTimers}
      >
        <div className="container-o n3-in">
          <div className="n3-map">
            {/* --- sol: ülkeler --- */}
            <div className="n3-side">
              <p className="n3-eyebrow" id="n3-lbl-ctry">
                Nerede kuralım
              </p>

              {/* Ülke satırları bağlantı değil sekme. Aynı öğe hem "seç" hem
                  "git" olsaydı klavyede Enter'ın ne yapacağı belirsiz olurdu;
                  ülke sayfasına çıkış sağ sütunun altında ayrı bir satır
                  olarak duruyor. */}
              <div
                className="n3-tabs"
                role="tablist"
                aria-orientation="vertical"
                aria-labelledby="n3-lbl-ctry"
                onKeyDown={onTabsKeyDown}
              >
                {COUNTRY_ORDER.map((c) => (
                  <button
                    key={c}
                    ref={(el) => {
                      tabRefs.current[c] = el;
                    }}
                    type="button"
                    role="tab"
                    id={tabId(c)}
                    aria-selected={country === c}
                    aria-controls={TABPANEL_ID}
                    tabIndex={country === c ? 0 : -1}
                    className="n3-tab"
                    onClick={() => setCountry(c)}
                    onMouseEnter={() => setCountry(c)}
                  >
                    <span className="n3-flag" aria-hidden="true">
                      <Flag country={c} />
                    </span>
                    <span className="n3-tab-txt">
                      <b>{COUNTRY_NAME[c]}</b>
                      {/* Yapı satırı FACTS'ten geliyor: pazarlama cümlesi
                          değil, şirketin hangi biçimde kurulduğu. */}
                      <em>{FACTS[c].structure}</em>
                    </span>
                    <ChevronRight className="n3-tab-go" size={15} strokeWidth={2.2} aria-hidden="true" />
                  </button>
                ))}
              </div>

              <SmartLink href="/ulkeler" className="n3-quiet" onClick={close}>
                Üç ülkeyi yan yana karşılaştırın
                <ArrowRight size={14} strokeWidth={2.1} aria-hidden="true" />
              </SmartLink>
            </div>

            {/* --- sağ: seçili ülkenin hizmetleri --- */}
            <div className="n3-main" role="tabpanel" id={TABPANEL_ID} aria-labelledby={tabId(country)}>
              <p className="n3-eyebrow">{COUNTRY_NAME[country]} için yürüttüğümüz hizmetler</p>

              <motion.div
                key={country}
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduce ? 0 : 0.2, ease: [0.33, 1, 0.68, 1] }}
              >
                <div className="n3-svcs">
                  {services.map((s) => {
                    const Icon = SERVICE_ICON[s.slug];
                    return (
                      <SmartLink
                        key={s.slug}
                        href={`/${country}/${s.slug}`}
                        className="n3-svc"
                        onClick={close}
                      >
                        <span className="n3-svc-ic" aria-hidden="true">
                          <Icon size={17} strokeWidth={1.9} />
                        </span>
                        <span className="n3-svc-txt">
                          <b>{s.title}</b>
                          <em>{SERVICE_LINE[s.slug]}</em>
                        </span>
                      </SmartLink>
                    );
                  })}
                </div>

                {/* Eksik satırın sebebi. Listeyi kısaltmakla yetinmek
                    ziyaretçiye "unutmuşlar" dedirtiyor; sebebini yazmak aynı
                    boşluğu bir cevaba çeviriyor. */}
                {!hasVisa && (
                  <p className="n3-note">
                    Bu ülkede oturum ve vize hizmeti yürütmüyoruz. {FACTS[country].limit}.
                  </p>
                )}

                <SmartLink href={`/${country}`} className="n3-quiet" onClick={close}>
                  {COUNTRY_NAME[country]} sayfasının tamamı
                  <ArrowRight size={14} strokeWidth={2.1} aria-hidden="true" />
                </SmartLink>
              </motion.div>
            </div>
          </div>

          {/* --- alt raf: sitenin geri kalanı, tek bakışta --- */}
          <div className="n3-rail">
            {RAIL.map((g) => (
              <div key={g.title} className="n3-rail-col">
                <p className="n3-eyebrow">{g.title}</p>
                <ul className="n3-rail-list">
                  {g.items.map((it) => (
                    <li key={it.label}>
                      <SmartLink href={it.href} onClick={close}>
                        {it.label}
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Panelin kendi çıkışı bilerek CTA değil: çubuktaki "Kurulumu
                Başlat" zaten yüksek taahhütlü yolu tutuyor. Burada kararsız
                ziyaretçiye düşük taahhütlü olanı veriyoruz. */}
            <div className="n3-aside">
              <p className="n3-aside-t">Hangi ülke size uyar, emin değil misiniz?</p>
              <SmartLink href="/uygunluk-testi" className="n3-aside-go" onClick={close}>
                {/* SWAP:N3_QUIZ_LEN — soru sayısı testin kendisinden gelmiyor */}
                6 soruluk uygunluk testi
                <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
              </SmartLink>
            </div>
          </div>

          {/* --- yalnızca dar ekran: çubuktan çıkarılan iki öğe ---
              Dar ekranda çubukta logo, kısaltılmış CTA ve menü düğmesinden
              başkasına yer yok; Panel ve dil anahtarı buraya iniyor. Masaüstü
              kopyaları display:none olduğu için erişilebilirlik ağacında da
              tek örnek kalıyor, iki kez okunmuyor. */}
          <div className="n3-mob">
            <SmartLink href="/panel" className="n3-mob-panel" onClick={close}>
              Panel
            </SmartLink>
            <span className="n3-lang" role="group" aria-label="Dil">
              <button type="button" data-on aria-pressed="true">
                TR
              </button>
              <button type="button" aria-pressed="false" title="Yakında">
                EN
              </button>
            </span>
          </div>
        </div>
      </motion.div>
    </header>
  );
}
