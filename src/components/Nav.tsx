"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  BookOpen,
  Building2,
  Calculator,
  CalendarCheck,
  ChevronDown,
  ChevronRight,
  FileDown,
  Handshake,
  IdCard,
  Landmark,
  Scale,
  Scale3d,
  ShieldCheck,
  SlidersHorizontal,
  type LucideIcon,
} from "lucide-react";
import Logo from "@/components/shared/Logo";
import { Flag } from "@/components/shared/CountryPicker";
import { useLenis } from "@/components/Providers";
import { gtm } from "@/lib/gtm";
import { COUNTRY_NAME, COUNTRY_ORDER, type CountrySlug } from "@/lib/brand";

/* Tek giriş: "Hizmetler". Ülke ayrı bir menü değil, hizmet menüsünün sol
   sütunundaki seçici. Menüde rakam yok — fiyat ve süre hizmet sayfasında
   yaşıyor, üst menüde değil. */

type Item = { label: string; href: string; desc?: string; icon?: LucideIcon };

/** ülke başlığının altındaki tek satır: nerede olduğunu söyler, iddia etmez */
const COUNTRY_LINE: Record<CountrySlug, string> = {
  dubai: "Birleşik Arap Emirlikleri, ofisimiz burada",
  ingiltere: "Birleşik Krallık, Companies House",
  kktc: "Kuzey Kıbrıs, Türkiye'ye en yakın",
};

/* URL mimarisi SABİT: kuruluş ülke sayfasının kendisi, diğerleri onun altında.
   İngiltere'de oturum/vize satırı yok — şirket kurmak orada oturum vermiyor. */
type Svc = { key: string; label: string; desc: string; href: string; icon: LucideIcon };

const SERVICES: Record<CountrySlug, Svc[]> = {
  dubai: [
    {
      key: "kurulus",
      label: "Şirket kuruluşu",
      desc: "Lisans sınıfı, isim onayı ve tescil",
      href: "/dubai",
      icon: Building2,
    },
    {
      key: "muhasebe",
      label: "Muhasebe ve vergi",
      desc: "Defter, beyan ve dönemsel raporlama",
      href: "/dubai/muhasebe",
      icon: CalendarCheck,
    },
    {
      key: "banka",
      label: "Banka ve ödeme",
      desc: "Kurumsal hesap başvurusu ve tahsilat kanalları",
      href: "/dubai/banka-hesabi",
      icon: Landmark,
    },
    {
      key: "oturum",
      label: "Oturum ve vize",
      desc: "Ortak ve çalışan vizesi, Emirates ID",
      href: "/dubai/oturum-vize",
      icon: IdCard,
    },
    {
      key: "uyum",
      label: "Uyum ve AML",
      desc: "goAML kaydı ve bildirim yükümlülükleri",
      href: "/dubai/uyum",
      icon: ShieldCheck,
    },
  ],
  ingiltere: [
    {
      key: "kurulus",
      label: "Şirket kuruluşu",
      desc: "Companies House tescili ve kayıtlı adres",
      href: "/ingiltere",
      icon: Building2,
    },
    {
      key: "muhasebe",
      label: "Muhasebe ve vergi",
      desc: "Defter, beyan ve yıllık mali tablolar",
      href: "/ingiltere/muhasebe",
      icon: CalendarCheck,
    },
    {
      key: "banka",
      label: "Banka ve ödeme",
      desc: "Hesap ve ödeme kuruluşu başvurusu",
      href: "/ingiltere/banka-hesabi",
      icon: Landmark,
    },
    {
      key: "uyum",
      label: "Uyum ve AML",
      desc: "Gerçek fayda sahibi kaydı ve AML politikası",
      href: "/ingiltere/uyum",
      icon: ShieldCheck,
    },
  ],
  kktc: [
    {
      key: "kurulus",
      label: "Şirket kuruluşu",
      desc: "Yerel tescil ve ana sözleşme",
      href: "/kktc",
      icon: Building2,
    },
    {
      key: "muhasebe",
      label: "Muhasebe ve vergi",
      desc: "Defter, beyan ve dönemsel raporlama",
      href: "/kktc/muhasebe",
      icon: CalendarCheck,
    },
    {
      key: "banka",
      label: "Banka ve ödeme",
      desc: "Yerel banka hesabı, imza için yerinde bulunma",
      href: "/kktc/banka-hesabi",
      icon: Landmark,
    },
    {
      key: "oturum",
      label: "Oturum ve vize",
      desc: "Çalışma ve oturum izni adımları",
      href: "/kktc/oturum-vize",
      icon: IdCard,
    },
    {
      key: "uyum",
      label: "Uyum ve AML",
      desc: "AML politikası ve kayıt yükümlülükleri",
      href: "/kktc/uyum",
      icon: ShieldCheck,
    },
  ],
};

const TOOLS: Item[] = [
  { label: "Uygunluk testi", href: "/uygunluk-testi", desc: "6 soruda ülke önerisi", icon: SlidersHorizontal },
  { label: "Maliyet hesaplayıcı", href: "/fiyatlar", desc: "Paket ve ek hizmet tutarı", icon: Calculator },
  { label: "Ödeme altyapısı matrisi", href: "/araclar/odeme-altyapisi", desc: "Hangi kanal nerede çalışıyor", icon: Landmark },
  { label: "Ülke karşılaştırma", href: "/ulke-karsilastirma", desc: "Üç ülke yan yana", icon: Scale3d },
];

/* SWAP:NAV_FEATURED — menü kendi başına bir keşif yüzeyi (brief §6) */
const FEATURED: { tag: string; title: string; meta: string; href: string }[] = [
  { tag: "En güncel mevzuat", title: "Kurumlar vergisi beyan takvimi", meta: "Temmuz 2026", href: "/blog" },
  { tag: "En çok indirilen", title: "Dubai kuruluş rehberi", meta: "32 sayfa · PDF", href: "/kaynaklar" },
  { tag: "En çok kullanılan", title: "Uygunluk testi", meta: "6 soru · 2 dk", href: "/uygunluk-testi" },
];

const RESOURCES: Item[] = [
  { label: "Ülke rehberleri", href: "/kaynaklar", desc: "Dubai, İngiltere, KKTC", icon: BookOpen },
  { label: "Mevzuat", href: "/blog", desc: "Güncellemeler ve tarihler", icon: Scale },
  { label: "E-kitaplar", href: "/kaynaklar", desc: "Ücretsiz PDF rehberler", icon: FileDown },
];

const CORPORATE: Item[] = [
  { label: "Hakkımızda", href: "/hakkimizda", desc: "Ofis, lisans ve ekip", icon: Building2 },
  { label: "İş ortaklığı", href: "/is-ortakligi", desc: "Mali müşavir ve danışman kanalı", icon: Handshake },
  { label: "Şirketini taşı", href: "/sirket-tasima", desc: "Mevcut şirketi Ortac'a alın", icon: ShieldCheck },
  { label: "İletişim", href: "/iletisim", desc: "Dubai ofis ve destek", icon: Landmark },
];

type MenuKey = "hizmetler" | "araclar" | "kaynaklar" | "kurumsal";
const MENUS: { key: MenuKey; label: string; href: string }[] = [
  { key: "hizmetler", label: "Hizmetler", href: "/dubai" },
  { key: "araclar", label: "Araçlar", href: "/araclar" },
  { key: "kaynaklar", label: "Kaynaklar", href: "/kaynaklar" },
  { key: "kurumsal", label: "Kurumsal", href: "/hakkimizda" },
];

/* ------------------------------------------------------------------ tiles */
function Tiles({ items, onGo, cols }: { items: Item[]; onGo: () => void; cols: 1 | 4 }) {
  return (
    <div className="nv2-tiles" data-cols={cols}>
      {items.map((it) => (
        <Link key={it.label} href={it.href} className="nv2-card" onClick={onGo}>
          <span className="nv2-ic" aria-hidden="true">
            {it.icon && <it.icon size={18} strokeWidth={1.9} />}
          </span>
          <span className="nv2-card-txt">
            <b>{it.label}</b>
            {it.desc && <em>{it.desc}</em>}
          </span>
        </Link>
      ))}
    </div>
  );
}

/* ----------------------------------------------------- services mega panel */
function ServicesPanel({
  active,
  setActive,
  onGo,
}: {
  active: CountrySlug;
  setActive: (c: CountrySlug) => void;
  onGo: () => void;
}) {
  return (
    <div className="nv2-svc">
      <div className="nv2-pick">
        {COUNTRY_ORDER.map((c) => (
          <Link
            key={c}
            href={`/${c}`}
            className="nv2-ctry"
            data-on={active === c}
            onMouseEnter={() => setActive(c)}
            onFocus={() => setActive(c)}
            onClick={onGo}
          >
            <span className="nv2-flag" aria-hidden="true">
              <Flag country={c} />
            </span>
            <span className="nv2-ctry-txt">
              <b>{COUNTRY_NAME[c]}</b>
              <em>{COUNTRY_LINE[c]}</em>
            </span>
            <span className="nv2-ctry-go" aria-hidden="true">
              <ChevronRight size={16} strokeWidth={2.2} />
            </span>
          </Link>
        ))}
        <Link href="/ulkeler" className="nv2-pick-foot" onClick={onGo}>
          Üç ülkeyi yan yana karşılaştırın
        </Link>
      </div>

      <div className="nv2-cards">
        <p className="nv2-cards-h">{COUNTRY_NAME[active]} için yürüttüğümüz hizmetler</p>
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, ease: [0.33, 1, 0.68, 1] }}
        >
          <div className="nv2-tiles" data-cols={2}>
            {SERVICES[active].map((s) => (
              <Link key={s.key} href={s.href} className="nv2-card" onClick={onGo}>
                <span className="nv2-ic" aria-hidden="true">
                  <s.icon size={18} strokeWidth={1.9} />
                </span>
                <span className="nv2-card-txt">
                  <b>{s.label}</b>
                  <em>{s.desc}</em>
                </span>
              </Link>
            ))}
          </div>
          <Link href={`/${active}`} className="nv2-more" onClick={onGo}>
            {COUNTRY_NAME[active]} sayfasının tamamı
            <ArrowRight size={15} strokeWidth={2.1} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------- nav */
export default function Nav() {
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<MenuKey | null>(null);
  const [mob, setMob] = useState<MenuKey | null>(null);
  const [country, setCountry] = useState<CountrySlug>("dubai");
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

  useEffect(() => {
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
  }, [open, lenis]);

  const close = () => {
    setMenu(null);
    setOpen(false);
  };

  const bar: React.CSSProperties = {
    display: "block",
    width: 18,
    height: 1.5,
    background: "currentColor",
    transition: "transform 250ms var(--ease-inout), opacity 250ms var(--ease-inout)",
  };

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="nav"
      data-scrolled={scrolled}
      data-open={open}
      onMouseLeave={() => setMenu(null)}
    >
      <div className="container-o nav-inner">
        <Link href="/" aria-label="Ortac Global" className="nav-logo" onClick={close}>
          <Logo height={24} />
        </Link>

        <nav className="nav-menu" aria-label="Ana menü">
          {MENUS.map((m) => (
            <div
              key={m.key}
              className="nav-item"
              onMouseEnter={() => setMenu(m.key)}
              onFocus={() => setMenu(m.key)}
            >
              <Link href={m.href} className="nav-top" aria-expanded={menu === m.key} onClick={close}>
                {m.label}
                <ChevronDown size={14} strokeWidth={2.2} aria-hidden="true" />
              </Link>
            </div>
          ))}
        </nav>

        <div className="nav-right">
          <Link href="/basla" className="btn btn-solid btn-sm" onClick={() => gtm("nav_cta_click")}>
            Kurulumu Başlat
          </Link>
          <Link href="/panel" className="btn btn-line btn-sm nav-panel">
            Panel
          </Link>
          <span className="nav-lang" role="group" aria-label="Dil">
            <button type="button" data-on aria-pressed="true">
              TR
            </button>
            <button type="button" aria-pressed="false" title="Yakında">
              EN
            </button>
          </span>
        </div>

        <button
          type="button"
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="nav-burger"
        >
          <span style={{ ...bar, transform: open ? "translateY(6.5px) rotate(45deg)" : "none" }} />
          <span style={{ ...bar, opacity: open ? 0 : 1 }} />
          <span style={{ ...bar, transform: open ? "translateY(-6.5px) rotate(-45deg)" : "none" }} />
        </button>
      </div>

      {/* ---------------- mega panel ---------------- */}
      {menu && (
        <motion.div
          className="nv2-mega"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          onMouseLeave={() => setMenu(null)}
        >
          <div className="container-o nv2-in">
            {menu === "hizmetler" && (
              <ServicesPanel active={country} setActive={setCountry} onGo={close} />
            )}

            {menu === "araclar" && <Tiles items={TOOLS} onGo={close} cols={4} />}

            {menu === "kaynaklar" && (
              <div className="nv2-split">
                <Tiles items={RESOURCES} onGo={close} cols={1} />
                <div className="nv2-feat">
                  {FEATURED.map((f) => (
                    <Link key={f.title} href={f.href} className="nv2-feat-card" onClick={close}>
                      <span className="nv2-feat-tag">{f.tag}</span>
                      <span className="nv2-feat-t">{f.title}</span>
                      <span className="nv2-feat-m">{f.meta}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {menu === "kurumsal" && <Tiles items={CORPORATE} onGo={close} cols={4} />}
          </div>
        </motion.div>
      )}

      {/* ---------------- mobile sheet ---------------- */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="nav-sheet"
        >
          {MENUS.map((m) => (
            <div key={m.key} className="nav-acc">
              <button
                type="button"
                className="nav-acc-top"
                aria-expanded={mob === m.key}
                onClick={() => setMob(mob === m.key ? null : m.key)}
              >
                {m.label}
                <ChevronDown
                  size={18}
                  strokeWidth={2}
                  aria-hidden="true"
                  style={{
                    transform: mob === m.key ? "rotate(180deg)" : "none",
                    transition: "transform 200ms var(--ease-out-soft)",
                  }}
                />
              </button>
              {mob === m.key && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={{ duration: 0.22 }}
                  style={{ overflow: "hidden" }}
                >
                  <div className="nav-acc-body">
                    {m.key === "hizmetler" &&
                      COUNTRY_ORDER.map((c) => (
                        <div key={c} className="nav-acc-group">
                          <Link href={`/${c}`} className="nav-acc-country" onClick={close}>
                            <span className="nav-acc-ic nv2-mflag" aria-hidden="true">
                              <Flag country={c} />
                            </span>
                            {COUNTRY_NAME[c]}
                          </Link>
                          {SERVICES[c].map((s) => (
                            <Link
                              key={s.key}
                              href={s.href}
                              className="nv2-msub"
                              onClick={close}
                            >
                              <span className="nav-acc-ic" aria-hidden="true">
                                <s.icon size={16} strokeWidth={2} />
                              </span>
                              {s.label}
                            </Link>
                          ))}
                        </div>
                      ))}

                    {m.key === "araclar" &&
                      TOOLS.map((t) => (
                        <Link key={t.label} href={t.href} onClick={close}>
                          <span className="nav-acc-ic" aria-hidden="true">
                            {t.icon && <t.icon size={16} strokeWidth={2} />}
                          </span>
                          {t.label}
                        </Link>
                      ))}

                    {m.key === "kaynaklar" &&
                      RESOURCES.map((t) => (
                        <Link key={t.label} href={t.href} onClick={close}>
                          <span className="nav-acc-ic" aria-hidden="true">
                            {t.icon && <t.icon size={16} strokeWidth={2} />}
                          </span>
                          {t.label}
                        </Link>
                      ))}

                    {m.key === "kurumsal" &&
                      CORPORATE.map((t) => (
                        <Link key={t.label} href={t.href} onClick={close}>
                          <span className="nav-acc-ic" aria-hidden="true">
                            {t.icon && <t.icon size={16} strokeWidth={2} />}
                          </span>
                          {t.label}
                        </Link>
                      ))}
                  </div>
                </motion.div>
              )}
            </div>
          ))}

          <div className="nav-sheet-cta">
            <Link href="/basla" className="btn btn-solid btn-full" onClick={close}>
              Kurulumu Başlat
            </Link>
            <Link href="/panel" className="btn btn-line btn-full" onClick={close}>
              Panel
            </Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
