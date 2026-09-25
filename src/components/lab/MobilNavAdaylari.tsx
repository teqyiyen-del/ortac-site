"use client";

/* LAB · /lab/mobil-nav — telefon menüsü adayları (25.09.2026, optimizasyon turu).
   Burak: "mobildeki navbarımız nasıl bilmiyorum ama mobilde navbar denemeni
   istiyorum."

   BUGÜNKÜ HÂL (NavIstemci · mobil çarşaf): çubukta yalnız logo ve üç çizgi.
   Menü açılınca ekranı dolduran uzun bir çarşaf: ülke rayı, koyu ülke satırı,
   altı hizmet satırı, "emin değilim", üç akordeon, en dipte Kurulumu Başlat.
   Ölçüldü (390 × 844): çarşafın içi 947 px, görünen 779 px; sitenin ana
   düğmesi menüde kaydırmadan görünmüyor, kapalı çubukta hiç yok.

   Üç aday, üç yön:
     N1 · Çubukta düğme    Başlat her an üst çubukta; menü dört sekmeye
                           bölünüyor, her sekme kaydırmadan tek ekrana sığıyor.
     N2 · Alttan menü      "Menü" hapı; kart ekranın altından, başparmağın
                           yetiştiği yerden açılıyor, tutamaktan aşağı çekince
                           kapanıyor. Çubuk aşağı kaydırırken saklanıyor.
     N3 · Alt sekme çubuğu Uygulama dili: beş sekme altta, Başlat ortada; her
                           sekme kendi kartını açıyor. Üst çubukta yalnız logo.

   Veri canlı menüden (NavIstemci'nin dışa açtığı listeler), hizmet adresleri
   serviceHref()'ten; elle yazılmış bağlantı listesi yok. Renk sitenin
   kuralından: banka yeşil (para), muhasebe amber (vergi), gerisi mavi.
   Sınıflar .lmn- (css/lab-mobil-nav.css).

   Bir aday seçilince NavIstemci'nin mobil dalına taşınır; bu dosya, CSS'i ve
   /lab/mobil-nav silinir. */

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useDragControls, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Calculator,
  ChevronRight,
  Compass,
  Globe,
  LayoutGrid,
  Mail,
  Menu,
  X,
} from "lucide-react";
import Logo from "@/components/shared/Logo";
import SmartLink from "@/components/shared/SmartLink";
import { Flag } from "@/components/shared/CountryPicker";
import { useLenis } from "@/components/Providers";
import { COUNTRY_NAME, COUNTRY_ORDER, FACTS, type CountrySlug } from "@/lib/brand";
import { servicesFor, serviceHref, type ServiceSlug } from "@/lib/services";
import { COUNTRY_PHOTO, photoThumb } from "@/lib/media";
import {
  CORPORATE,
  RESOURCES,
  SERVICE_UNIVERSE,
  SVC_ICON,
  TOOLS,
  type Tile,
} from "@/components/NavIstemci";

const EASE = [0.22, 1, 0.36, 1] as const;

/* renk kuralı: para yeşil, vergi amber; kalan hizmetler mavi */
const SVC_TON: Partial<Record<ServiceSlug, "yesil" | "amber">> = {
  "banka-hesabi": "yesil",
  muhasebe: "amber",
};

/* Kurumsal: canlı çarşaftaki gibi İletişim listenin başında */
const KURUMSAL: Tile[] = [
  { label: "İletişim", href: "/iletisim", hint: "Üç ofis, tek muhatap", icon: Mail },
  ...CORPORATE,
];

/* ------------------------------------------------------------------ kancalar */

/* Çubuğun iki hâli canlı menüyle aynı eşikte: koyu hero'nun üstünde saydam,
   8 px kaydırınca beyaz. `gizle` verilirse aşağı kaydırırken çubuk yukarı
   çekiliyor, yukarı kaydırınca geri geliyor; 8 px'ten küçük titreşim yön
   saymıyor, sayfanın ilk 80 px'inde çubuk hep görünür. */
function useKaydirma(gizle: boolean) {
  const lenis = useLenis();
  const [solid, setSolid] = useState(false);
  const [gizli, setGizli] = useState(false);
  useEffect(() => {
    let son = window.scrollY;
    let bekliyor = false;
    const guncelle = () => {
      bekliyor = false;
      const y = window.scrollY;
      setSolid(y > 8);
      if (!gizle) return;
      if (y < 80) {
        setGizli(false);
        son = y;
      } else if (Math.abs(y - son) > 8) {
        setGizli(y > son);
        son = y;
      }
    };
    const onScroll = () => {
      if (bekliyor) return;
      bekliyor = true;
      requestAnimationFrame(guncelle);
    };
    guncelle();
    if (lenis) {
      lenis.on("scroll", onScroll);
      return () => lenis.off("scroll", onScroll);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lenis, gizle]);
  return { solid, gizli };
}

/* Menü açıkken sayfa kaymıyor (canlı menü gibi Lenis durduruluyor, yerel
   kaydırmada kök taşması kapanıyor); Escape kapatıyor. */
function useKilit(acik: boolean, kapat: () => void) {
  const lenis = useLenis();
  useEffect(() => {
    if (!acik) return;
    lenis?.stop();
    const kok = document.documentElement;
    const eski = kok.style.overflow;
    kok.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") kapat();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      kok.style.overflow = eski;
      window.removeEventListener("keydown", onKey);
    };
  }, [acik, lenis, kapat]);
}

/* -------------------------------------------------------------- ortak parça */

function UlkeSec({
  deger,
  sec,
  panel,
}: {
  deger: CountrySlug;
  sec: (c: CountrySlug) => void;
  panel: string;
}) {
  return (
    <div className="lmn-seg" role="tablist" aria-label="Ülke">
      {COUNTRY_ORDER.map((c) => (
        <button
          key={c}
          type="button"
          role="tab"
          aria-selected={deger === c}
          aria-controls={panel}
          className="lmn-seg-b"
          onClick={() => sec(c)}
        >
          <span className="lmn-flag" aria-hidden="true">
            <Flag country={c} />
          </span>
          {COUNTRY_NAME[c]}
        </button>
      ))}
    </div>
  );
}

/* Seçili ülkenin künyesi: çarşaftaki tek koyu yüzey (canlı menünün kuralı) */
function UlkeKarti({ ulke, git }: { ulke: CountrySlug; git: () => void }) {
  return (
    <SmartLink href={`/${ulke}`} className="lmn-ulke" onClick={git}>
      <span>
        <b>{COUNTRY_NAME[ulke]} ülke sayfası</b>
        <em>{FACTS[ulke].structure}</em>
      </span>
      <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
    </SmartLink>
  );
}

/* Hizmetler üç ülkenin birleşimi üzerinden: o ülkede olmayan hizmet kesik
   çizgili kutu olarak yerinde duruyor (canlı menünün kuralı). `bicim`: iki
   sütun karo ya da tek sütun satır. */
function Hizmetler({
  ulke,
  git,
  bicim = "karo",
  id,
}: {
  ulke: CountrySlug;
  git: () => void;
  bicim?: "karo" | "satir";
  id: string;
}) {
  const own = new Map(servicesFor(ulke).map((s) => [s.slug, s]));
  return (
    <ul id={id} className={bicim === "karo" ? "lmn-grid" : "lmn-list"}>
      {SERVICE_UNIVERSE.map((u) => {
        const s = own.get(u.slug);
        const Icon = SVC_ICON[u.slug];
        const ic = (
          <span className="lmn-ic" data-ton={SVC_TON[u.slug]} aria-hidden="true">
            <Icon size={17} strokeWidth={2} />
          </span>
        );
        return (
          <li key={u.slug}>
            {s ? (
              <SmartLink href={serviceHref(ulke, u.slug)} className="lmn-tile" onClick={git}>
                {ic}
                <span className="lmn-tile-t">{s.title}</span>
                {bicim === "satir" && (
                  <ChevronRight className="lmn-tile-ok" size={16} strokeWidth={2} aria-hidden="true" />
                )}
              </SmartLink>
            ) : (
              <span className="lmn-tile" data-dead="">
                {ic}
                <span className="lmn-tile-t">{u.title}</span>
                <span className="lmn-sr"> ({COUNTRY_NAME[ulke]} için yok)</span>
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/* Araç adları uzun ("Dubai kurumlar vergisi hesaplayıcı"): iki sütunda dört
   satıra kırılıyordu, araçlar tek sütun satır basılıyor. */
function Karolar({
  items,
  git,
  bicim = "karo",
}: {
  items: Tile[];
  git: () => void;
  bicim?: "karo" | "satir";
}) {
  return (
    <ul className={bicim === "karo" ? "lmn-grid" : "lmn-list"}>
      {items.map((t) => (
        <li key={t.label}>
          <SmartLink href={t.href} className="lmn-tile" onClick={git}>
            <span className="lmn-ic" aria-hidden="true">
              <t.icon size={17} strokeWidth={2} />
            </span>
            <span className="lmn-tile-t">{t.label}</span>
            {bicim === "satir" && (
              <ChevronRight className="lmn-tile-ok" size={16} strokeWidth={2} aria-hidden="true" />
            )}
          </SmartLink>
        </li>
      ))}
    </ul>
  );
}

function Emin({ git }: { git: () => void }) {
  return (
    <SmartLink href="/uygunluk-testi" className="lmn-emin" onClick={git}>
      <Compass size={16} strokeWidth={2} aria-hidden="true" />
      Emin değilim, bana uygun olanı bulun
      <ArrowRight size={14} strokeWidth={2.2} aria-hidden="true" />
    </SmartLink>
  );
}

/* ================================================================ N1
   Çubukta düğme + sekmeli menü. Başlat çubukta: kapalıyken de, menü açıkken
   de görünüyor, yani çarşafın dibine bir kopya daha gerekmiyor. Akordeon yok:
   dört başlık dört sekme, her sekme tek ekrana sığıyor. */
type Sekme = "hizmetler" | "araclar" | "kaynaklar" | "kurumsal";
const SEKMELER: { k: Sekme; ad: string }[] = [
  { k: "hizmetler", ad: "Hizmetler" },
  { k: "araclar", ad: "Araçlar" },
  { k: "kaynaklar", ad: "Kaynaklar" },
  { k: "kurumsal", ad: "Kurumsal" },
];
const SEKME_KARO: Record<Exclude<Sekme, "hizmetler">, Tile[]> = {
  araclar: TOOLS,
  kaynaklar: RESOURCES,
  kurumsal: KURUMSAL,
};

function N1() {
  const reduce = useReducedMotion() ?? false;
  const { solid } = useKaydirma(false);
  const [acik, setAcik] = useState(false);
  const [sekme, setSekme] = useState<Sekme>("hizmetler");
  const [ulke, setUlke] = useState<CountrySlug>("dubai");
  const kapat = useCallback(() => setAcik(false), []);
  useKilit(acik, kapat);

  return (
    <header className="lmn-bar" data-solid={solid || acik}>
      <div className="container-o lmn-bar-in">
        <SmartLink href="/" aria-label="Ortac Global" className="lmn-logo" onClick={kapat}>
          <Logo height={22} />
        </SmartLink>
        <SmartLink href="/basla" className="lmn-cta" onClick={kapat}>
          Başlat
          <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
        </SmartLink>
        <button
          type="button"
          className="lmn-burger"
          aria-label={acik ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={acik}
          aria-controls="lmn1-menu"
          onClick={() => setAcik((v) => !v)}
        >
          {acik ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
        </button>
      </div>

      <AnimatePresence>
        {acik && (
          <motion.div
            id="lmn1-menu"
            className="lmn1-sheet"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: reduce ? 0.01 : 0.24, ease: EASE }}
          >
            <div className="container-o lmn1-in">
              <div className="lmn-tabs" role="tablist" aria-label="Menü">
                {SEKMELER.map((s) => (
                  <button
                    key={s.k}
                    type="button"
                    role="tab"
                    aria-selected={sekme === s.k}
                    aria-controls="lmn1-panel"
                    className="lmn-tab"
                    onClick={() => setSekme(s.k)}
                  >
                    {s.ad}
                  </button>
                ))}
              </div>
              <div id="lmn1-panel" role="tabpanel" className="lmn-panel">
                {sekme === "hizmetler" ? (
                  <>
                    <UlkeSec deger={ulke} sec={setUlke} panel="lmn1-hiz" />
                    <UlkeKarti ulke={ulke} git={kapat} />
                    <Hizmetler ulke={ulke} git={kapat} id="lmn1-hiz" />
                    <Emin git={kapat} />
                  </>
                ) : (
                  <Karolar
                    items={SEKME_KARO[sekme]}
                    git={kapat}
                    bicim={sekme === "araclar" ? "satir" : "karo"}
                  />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ---------------------------------------------------- alttan açılan kart
   N2 ve N3'ün ortak kabuğu: perde + ekranın altından kalkan kart. Tutamaktan
   aşağı çekince (90 px ya da hızlı fiske) kapanıyor; kartın içi kendi
   kaydırmasında, sürükleme yalnız tutamakta, yani içerik kaydırırken kart
   kaçmıyor. `alt`: kartın altında sabit duran şerit (N3'te sekme çubuğu,
   kart onun üstünde bitiyor). */
function AltKart({
  id,
  ad,
  kapat,
  alt = 0,
  dip,
  children,
}: {
  id: string;
  ad: string;
  kapat: () => void;
  alt?: number;
  dip?: React.ReactNode;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion() ?? false;
  const surukle = useDragControls();
  return (
    <>
      <motion.div
        className="lmn-perde"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduce ? 0.01 : 0.22 }}
        onClick={kapat}
      />
      <motion.div
        id={id}
        role="dialog"
        aria-modal="true"
        aria-label={ad}
        className="lmn-kart"
        style={{ bottom: alt }}
        initial={reduce ? { opacity: 0 } : { y: "100%" }}
        animate={reduce ? { opacity: 1 } : { y: 0 }}
        exit={reduce ? { opacity: 0 } : { y: "100%" }}
        transition={{ duration: reduce ? 0.01 : 0.32, ease: EASE }}
        drag={reduce ? false : "y"}
        dragListener={false}
        dragControls={surukle}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.7 }}
        onDragEnd={(_, i) => {
          if (i.offset.y > 90 || i.velocity.y > 600) kapat();
        }}
      >
        <div className="lmn-kart-bas" onPointerDown={(e) => surukle.start(e)}>
          <span className="lmn-tutamak" aria-hidden="true" />
          <b>{ad}</b>
          <button type="button" className="lmn-kart-x" aria-label="Kapat" onClick={kapat}>
            <X size={18} strokeWidth={2} />
          </button>
        </div>
        <div className="lmn-kart-ic">{children}</div>
        {dip && <div className="lmn-kart-dip">{dip}</div>}
      </motion.div>
    </>
  );
}

/* ================================================================ N2
   "Menü" hapı → alttan kart. Üç çizgi yerine yazılı hap: ne olduğunu
   söylüyor ve dokunma alanı büyük. Kartta önce ülke (büyük bayraklı üç
   seçim), sonra o ülkenin hizmetleri tek sütun satır, altta hızlı geçiş
   hapları; Kurulumu Başlat kartın dibinde sabit. */
const HIZLI: Tile[] = [
  TOOLS.find((t) => t.href === "/araclar") ?? TOOLS[TOOLS.length - 1],
  ...RESOURCES.slice(0, 2),
  ...KURUMSAL.slice(0, 2),
];

function N2() {
  const { solid, gizli } = useKaydirma(true);
  const [acik, setAcik] = useState(false);
  const [ulke, setUlke] = useState<CountrySlug>("dubai");
  const kapat = useCallback(() => setAcik(false), []);
  useKilit(acik, kapat);

  return (
    <>
      <header className="lmn-bar" data-solid={solid} data-gizli={gizli && !acik}>
        <div className="container-o lmn-bar-in">
          <SmartLink href="/" aria-label="Ortac Global" className="lmn-logo">
            <Logo height={22} />
          </SmartLink>
          <button
            type="button"
            className="lmn-hap"
            aria-expanded={acik}
            aria-controls={acik ? "lmn2-menu" : undefined}
            onClick={() => setAcik(true)}
          >
            <Menu size={17} strokeWidth={2} aria-hidden="true" />
            Menü
          </button>
        </div>
      </header>

      <AnimatePresence>
        {acik && (
          <AltKart
            id="lmn2-menu"
            ad="Menü"
            kapat={kapat}
            dip={
              <SmartLink href="/basla" className="lmn-btn" onClick={kapat}>
                Kurulumu Başlat
                <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
              </SmartLink>
            }
          >
            <div className="lmn2-ulkeler" role="tablist" aria-label="Ülke">
              {COUNTRY_ORDER.map((c) => (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={ulke === c}
                  aria-controls="lmn2-hiz"
                  className="lmn2-ulke"
                  onClick={() => setUlke(c)}
                >
                  <span className="lmn-flag lmn-flag-b" aria-hidden="true">
                    <Flag country={c} />
                  </span>
                  {COUNTRY_NAME[c]}
                </button>
              ))}
            </div>
            <UlkeKarti ulke={ulke} git={kapat} />
            <Hizmetler ulke={ulke} git={kapat} bicim="satir" id="lmn2-hiz" />
            <ul className="lmn-haplar">
              {HIZLI.map((t) => (
                <li key={t.label}>
                  <SmartLink href={t.href} className="lmn-hizli" onClick={kapat}>
                    <t.icon size={15} strokeWidth={2} aria-hidden="true" />
                    {t.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </AltKart>
        )}
      </AnimatePresence>
    </>
  );
}

/* ================================================================ N3
   Alt sekme çubuğu. Dört sekme kendi kartını açıyor, ortadaki Başlat
   doğrudan /basla. Açık sekmeye yeniden dokunmak kartı kapatıyor. Ülkeler
   kartı fotoğraflı (sitenin ülke fotoğrafları, 800 px). Sayfanın dibi çubuğun
   altında kalmasın diye sayfaya çubuk boyu kadar pay veriliyor
   (.lmn-sayfa[data-aday="n3"]). */
type AltSekme = "ulkeler" | "hizmetler" | "araclar" | "menu";
const ALT_AD: Record<AltSekme, string> = {
  ulkeler: "Ülkeler",
  hizmetler: "Hizmetler",
  araclar: "Araçlar",
  menu: "Menü",
};
const ALT_BOY = 68;

function N3() {
  const { solid, gizli } = useKaydirma(true);
  const [acik, setAcik] = useState<AltSekme | null>(null);
  const [ulke, setUlke] = useState<CountrySlug>("dubai");
  const kapat = useCallback(() => setAcik(null), []);
  useKilit(acik !== null, kapat);

  const sekme = (k: AltSekme, Icon: typeof Globe) => (
    <button
      type="button"
      className="lmn3-s"
      data-on={acik === k || undefined}
      aria-expanded={acik === k}
      aria-controls={acik === k ? "lmn3-kart" : undefined}
      onClick={() => setAcik((v) => (v === k ? null : k))}
    >
      <Icon size={21} strokeWidth={2} aria-hidden="true" />
      {ALT_AD[k]}
    </button>
  );

  return (
    <>
      <header className="lmn-bar" data-solid={solid} data-gizli={gizli && acik === null}>
        <div className="container-o lmn-bar-in">
          <SmartLink href="/" aria-label="Ortac Global" className="lmn-logo" onClick={kapat}>
            <Logo height={22} />
          </SmartLink>
        </div>
      </header>

      <AnimatePresence>
        {acik && (
          <AltKart key="kart" id="lmn3-kart" ad={ALT_AD[acik]} kapat={kapat} alt={ALT_BOY}>
            {acik === "ulkeler" && (
              <ul className="lmn3-fotolar">
                {COUNTRY_ORDER.map((c) => (
                  <li key={c}>
                    <SmartLink href={`/${c}`} className="lmn3-foto" onClick={kapat}>
                      <Image
                        src={photoThumb(COUNTRY_PHOTO[c], 800)}
                        alt=""
                        fill
                        sizes="(min-width: 640px) 600px, 100vw"
                        className="lmn3-foto-img"
                      />
                      <span className="lmn3-foto-m">
                        <span className="lmn-flag lmn-flag-b" aria-hidden="true">
                          <Flag country={c} />
                        </span>
                        <span>
                          <b>{COUNTRY_NAME[c]}</b>
                          <em>{FACTS[c].structure}</em>
                        </span>
                        <ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" />
                      </span>
                    </SmartLink>
                  </li>
                ))}
              </ul>
            )}
            {acik === "hizmetler" && (
              <>
                <UlkeSec deger={ulke} sec={setUlke} panel="lmn3-hiz" />
                <UlkeKarti ulke={ulke} git={kapat} />
                <Hizmetler ulke={ulke} git={kapat} id="lmn3-hiz" />
                <Emin git={kapat} />
              </>
            )}
            {acik === "araclar" && <Karolar items={TOOLS} git={kapat} bicim="satir" />}
            {acik === "menu" && (
              <>
                <p className="lmn-grup">Kaynaklar</p>
                <Karolar items={RESOURCES} git={kapat} />
                <p className="lmn-grup">Kurumsal</p>
                <Karolar items={KURUMSAL} git={kapat} />
              </>
            )}
          </AltKart>
        )}
      </AnimatePresence>

      <nav className="lmn3-alt" aria-label="Ana menü" style={{ height: ALT_BOY }}>
        {sekme("ulkeler", Globe)}
        {sekme("hizmetler", LayoutGrid)}
        <SmartLink href="/basla" className="lmn3-s lmn3-baslat" onClick={kapat}>
          <span className="lmn3-baslat-ic" aria-hidden="true">
            <ArrowRight size={20} strokeWidth={2.4} />
          </span>
          Başlat
        </SmartLink>
        {sekme("araclar", Calculator)}
        {sekme("menu", Menu)}
      </nav>
    </>
  );
}

/* aday listesi sunucu sayfasında (app/lab/mobil-nav/[aday]); "use client"
   dosyasından dışa açılan bir DEĞER sunucuya dizi olarak değil istemci
   referansı olarak gider */
export type MobilNavAday = "n1" | "n2" | "n3";

export default function MobilNavAdayi({ aday }: { aday: MobilNavAday }) {
  if (aday === "n1") return <N1 />;
  if (aday === "n2") return <N2 />;
  return <N3 />;
}
