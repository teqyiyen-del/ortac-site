"use client";

import { useEffect, useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Building2,
  Check,
  ChevronDown,
  IdCard,
  Landmark,
  LayoutDashboard,
  Lock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Receipt,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

import AskCta from "@/components/shared/AskCta";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { COUNTRY_NAMES, COUNTRY_ORDER, Flag } from "@/components/shared/CountryPicker";
import { useLenis } from "@/components/Providers";
import { CHAIN, COUNTRY_SERVICES, STANCE_LIMITS, type ServiceKey } from "@/lib/brand";
import type { Country } from "@/lib/store";

/* ADAY I2 (.i2-) — iletişim sayfası. "Karşınızda bir form değil, bir masa var."
 *
 * ---------------------------------------------------------------------------
 * FİKİR
 *
 * Standart iletişim sayfası ziyaretçiye bir kutu uzatır ve susar: form, harita,
 * telefon. Gönderdikten sonra notun nereye gittiği, kimin okuduğu, ne zaman
 * okunduğu bilinmez. Bu sayfanın tamamı o boşluğu kapatmak üzerine kurulu,
 * çünkü sitenin en güçlü ve en doğrulanmış vaadi tam olarak bu: isimli tek
 * muhatap ve mesai içinde doğrudan erişim.
 *
 * Bu yüzden sayfanın omurgası form değil MASA. Ziyaretçi önce konusunu seçiyor,
 * o masanın hangi ülkelerde çalıştığını ve yazarken neyi eklemesinin işi
 * hızlandırdığını görüyor, sonra notunu bırakıyor. Form en sonda ve seçilen
 * masaya bağlı: "bu not şu masaya düşer" cümlesi ekranda duruyor.
 *
 * ---------------------------------------------------------------------------
 * "TAŞAKLI" KISMI NEREDE
 *
 * Ölçüde değil iddiada. Sayfa "bize ulaşın" demiyor, ÜÇ ÜLKENİN SAATİNİ ekrana
 * koyup "şu an masadayız / şu an mesai dışı" diyor. Bu bir grafik değil, kendi
 * aleyhine de çalışabilen bir açıklama — gece yarısı giren ziyaretçiye kapalı
 * yazıyor. Bir sayfanın kendi hakkında söyleyebileceği en pahalı şey budur ve
 * sayfanın geri kalanının inandırıcılığını da o taşıyor.
 *
 * İkinci iddia: masa seçimi ile ülke seçimi ÇAKIŞABİLİYOR ve sayfa bunu
 * saklamıyor. Uyum masası şu an yalnızca Dubai'de çalışıyor; ziyaretçi
 * İngiltere + Uyum seçerse fiş bunu yüzüne söylüyor. Veri brand.ts'ten
 * geliyor, elle yazılmadı.
 *
 * ---------------------------------------------------------------------------
 * ELİMİZDE OLMAYAN
 *
 * Telefon, e-posta, adres ve çalışma saatleri doğrulanmadı. Hiçbiri
 * uydurulmadı: değer alanları boş yuva olarak çiziliyor ve yanlarında görünür
 * bir "yer tutucu" rozeti duruyor. Gerçek bilgi gelince yalnızca aşağıdaki iki
 * sabit blok değişiyor, tasarımda tek satır oynamıyor.
 *
 * Muhatap ADI da uydurulmadı — ve bu bir eksik değil, sayfanın en dürüst
 * yeri: isim siteye değil dosyaya bağlıdır. Masa kartındaki isim plakası boş
 * duruyor ve altında ne zaman dolacağı yazıyor.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

/* ---------------------------------------------------------------------------
   SWAP:CONTACT_HOURS — masanın açık olduğu pencere DOĞRULANMADI.
   Aşağıdaki değerler temsilîdir; ekranda yanında "yer tutucu" rozetiyle
   çıkıyor ki kimse bunu taahhüt sanmasın. Saatler tek yerden okunuyor, gerçek
   pencere gelince yalnızca bu nesne değişiyor.
   ------------------------------------------------------------------------ */
const HOURS = {
  from: 9,
  to: 18,
  /** 1=Pazartesi … 5=Cuma */
  days: [1, 2, 3, 4, 5],
  label: "Hafta içi 09.00 – 18.00",
};

/* Saat dilimleri doğrulanabilir veri, bu yüzden SWAP değil.
   KKTC 2017'den beri Kıbrıs'ın saat rejiminde; Europe/Istanbul sabit +3 olduğu
   için kışın bir saat yanlış gösterirdi. */
const ZONES: { c: Country; tz: string }[] = [
  { c: "dubai", tz: "Asia/Dubai" },
  { c: "ingiltere", tz: "Europe/London" },
  { c: "kktc", tz: "Asia/Nicosia" },
];

/* ---------------------------------------------------------------------------
   MASALAR
   Etiket ve tek satırlık tanım brand.ts'teki CHAIN'den okunuyor — sitenin geri
   kalanı hangi kelimeyi kullanıyorsa burası da onu kullansın diye. Bu dosyanın
   eklediği tek şey ikonu, hangi hizmet anahtarına bağlandığı ve "yazarken
   şunları ekleyin" listesi. O liste bir bilgi iddiası değil, bir istek listesi:
   hiçbir rakam, isim veya tarih içermiyor.
   ------------------------------------------------------------------------ */
type DeskKey = "kurulus" | "banka" | "muhasebe" | "uyum" | "oturum";

/* Duruş satırları da uydurulmuyor: üçü de brand.ts'teki STANCE_LIMITS.
   Her masaya kendi işini en çok ilgilendiren sınır bağlanıyor. */
const [LIMIT_BANK, LIMIT_TIME, LIMIT_TAX] = STANCE_LIMITS;

type Desk = {
  key: DeskKey;
  svc: ServiceKey;
  icon: LucideIcon;
  bring: string[];
  limit: { title: string; line: string };
};

const DESKS: Desk[] = [
  {
    key: "kurulus",
    svc: "kurulus",
    icon: Building2,
    bring: [
      "Aklınızdaki ülke — ya da hiç bilmiyor olmanız, o da bilgi",
      "Ne iş yapacağınız ve kaç ortak olacağınız",
      "Oturum ya da vize ihtiyacınız olup olmadığı",
    ],
    limit: LIMIT_TIME,
  },
  {
    key: "banka",
    svc: "banka-hesabi",
    icon: Landmark,
    bring: [
      "Faaliyet konunuz ve beklediğiniz aylık hacim aralığı",
      "Kimlerden tahsilat yapacaksınız — ülke ve müşteri tipi",
      "Şirket kuruldu mu, kurulduysa hangi ülkede",
    ],
    limit: LIMIT_BANK,
  },
  {
    key: "muhasebe",
    svc: "muhasebe",
    icon: Receipt,
    bring: [
      "Şirketin ülkesi ve kuruluş tarihi",
      "Aylık fatura ve işlem adediniz",
      "Şu an defterinizi tutan biri var mı",
    ],
    limit: LIMIT_TAX,
  },
  {
    key: "uyum",
    svc: "uyum",
    icon: ShieldCheck,
    bring: [
      "Şirketin ülkesi ve lisans tipi",
      "Faaliyetiniz kayıt gerektiren listelerden birinde mi",
      "Bekleyen bir bildirim yükümlülüğünüz var mı",
    ],
    limit: LIMIT_TAX,
  },
  {
    key: "oturum",
    svc: "oturum-vize",
    icon: IdCard,
    bring: [
      "Kaç kişi için oturum düşünüyorsunuz",
      "Şirket kuruldu mu, hangi serbest bölgede",
      "Seyahat için uygun olduğunuz aralık",
    ],
    limit: LIMIT_TIME,
  },
];

/** brand.ts'teki CHAIN bu beş anahtarı içeriyor. Bulunamazsa sayfa yine ayakta
 *  kalsın diye boş dönüyoruz — yerine metin uydurmuyoruz. */
function chainOf(key: DeskKey): { label: string; line: string } {
  const hit = CHAIN.find((c) => c.key === key);
  return { label: hit?.label ?? "", line: hit?.line ?? "" };
}

/** Bir masanın hangi ülkelerde çalıştığı elle yazılmıyor: hizmet listesi hangi
 *  ülkede o anahtarı taşıyorsa orada var. Uyum ve Oturum'un yalnızca Dubai'de
 *  çıkması bu yüzden — liste değişirse sayfa kendiliğinden düzeliyor. */
function countriesOf(svc: ServiceKey): Country[] {
  return COUNTRY_ORDER.filter((c) => COUNTRY_SERVICES[c].some((s) => s.key === svc));
}

/* ---------------------------------------------------------------------------
   SWAP:CONTACT_INFO — telefon, WhatsApp, e-posta, ofis adresi ve panel adresi
   DOĞRULANMADI. `value` alanı bilerek boş: boş olan yuva olarak çiziliyor.
   Doğrulanmış olan tek şey açıklama satırları (Dubai'de kendi ofisimiz var,
   süreç Türkçe yürüyor, TaxDome müşteri paneli kullanılıyor).
   ------------------------------------------------------------------------ */
const LINES: { icon: LucideIcon; label: string; value: string; note: string }[] = [
  {
    icon: Phone,
    label: "Telefon",
    value: "",
    note: "Mesai içinde doğrudan muhatabınıza bağlanır.",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "",
    note: "Yazışma da Türkçe yürür; dosya numaranızla eşlenir.",
  },
  {
    icon: Mail,
    label: "E-posta",
    value: "",
    note: "Ek gönderecekseniz en rahat kanal burası.",
  },
  {
    icon: MapPin,
    label: "Dubai ofisi",
    value: "",
    note: "Aracı ofis değil, kendi ofisimiz. Randevuyla ziyaret edilebilir.",
  },
  {
    icon: LayoutDashboard,
    label: "TaxDome paneli",
    value: "",
    note: "Mevcut müşteriler için: evrak, imza ve süreç aynı panelde.",
  },
];

/* --------------------------------------------------------------- yardımcılar */

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function pad2(n: number) {
  return n < 10 ? `0${n}` : String(n);
}

/** Bir saat diliminde o anki saat, dakika ve haftanın günü. */
function readZone(tz: string, at: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: tz,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(at);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return {
    h: Number(get("hour")),
    m: Number(get("minute")),
    wd: WEEKDAYS.indexOf(get("weekday")),
  };
}

function isOpenNow(z: { h: number; wd: number }) {
  return HOURS.days.includes(z.wd) && z.h >= HOURS.from && z.h < HOURS.to;
}

/* ---------------------------------------------------------------------------
   Yer tutucu rozeti ve boş yuva.
   İkisi de aynı işi yapıyor: "burada bir bilgi olacak ama henüz yok" demek.
   Bunu yazıyla söylemek yerine biçimle söylüyoruz, çünkü sayfa müşteriye
   gösterilirken tek bir uydurma numaranın gerçek sanılması bütün sayfanın
   güvenilirliğini götürür.
   ------------------------------------------------------------------------ */
function SwapChip({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <span className="i2-swap" data-tone={tone}>
      <Lock size={11} strokeWidth={2.2} aria-hidden="true" />
      yer tutucu
    </span>
  );
}

function Slot({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <span className="i2-slot" data-tone={tone}>
      <span className="sr-only">Bilgi henüz girilmedi</span>
      <span className="i2-slot-fill" aria-hidden="true" />
    </span>
  );
}

/* ---------------------------------------------------------------------------
   DURUM PANOSU — sayfanın canlı olduğunu söyleyen tek parça.
   Kendi bileşeni olmasının sebebi teknik: saniyede bir değil, dakikada bir
   yenilense bile bu blok sürekli render oluyor. Ayrı tutulunca formdaki yazı
   alanları ve masa seçimi bu yenilemelerden hiç etkilenmiyor.
   ------------------------------------------------------------------------ */
type ZoneNow = { c: Country; label: string; time: string; open: boolean };

function StatusBoard() {
  /* Saat sunucuda okunamaz: SSR'da üretilen değer istemcinin ilk render'ıyla
     kaçınılmaz olarak farklı olur ve hidrasyon uyuşmazlığı verir. Bu yüzden
     bağlanana kadar saat yerine tire duruyor ve hiçbir ölçü kaymıyor. */
  const [zones, setZones] = useState<ZoneNow[] | null>(null);

  useEffect(() => {
    const read = () => {
      const at = new Date();
      try {
        setZones(
          ZONES.map(({ c, tz }) => {
            const z = readZone(tz, at);
            return {
              c,
              label: COUNTRY_NAMES[c],
              time: `${pad2(z.h)}.${pad2(z.m)}`,
              open: isOpenNow(z),
            };
          }),
        );
      } catch {
        /* Bilinmeyen bir saat dilimi adında Intl fırlatabiliyor. Pano saatsiz
           de ayakta kalsın diye sayfayı düşürmüyoruz. */
      }
    };
    read();
    /* Dakika hassasiyeti yeterli. Saniye göstermiyoruz: saniye ibresi burada
       "canlı" hissi vermez, ziyaretçiyi sayaç izlemeye çağırır. */
    const id = window.setInterval(read, 20_000);
    return () => window.clearInterval(id);
  }, []);

  const anyOpen = zones ? zones.some((z) => z.open) : false;

  return (
    <div className="i2-board" data-open={zones ? anyOpen : undefined}>
      <div className="i2-board-head">
        <span className="i2-board-state">
          <span className="i2-dot" aria-hidden="true" />
          {zones ? (anyOpen ? "Şu an masadayız" : "Şu an mesai dışı") : "Saat okunuyor"}
        </span>
        <SwapChip tone="dark" />
      </div>

      <ul className="i2-zones">
        {ZONES.map(({ c }, i) => {
          const z = zones?.[i];
          return (
            <li className="i2-zone" key={c} data-open={z ? z.open : undefined}>
              <span className="i2-zone-flag" aria-hidden="true">
                <Flag country={c} />
              </span>
              <span className="i2-zone-name">{COUNTRY_NAMES[c]}</span>
              <span className="i2-zone-time data">{z ? z.time : "--.--"}</span>
              <span className="i2-zone-tag">
                {z ? (z.open ? "açık" : "kapalı") : "—"}
              </span>
            </li>
          );
        })}
      </ul>

      <p className="i2-board-foot">
        {HOURS.label} · yerel saatle. Kapalıyken de yazabilirsiniz; not masaya
        düşer, mesai başında sırada olur.
      </p>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   BİLEŞEN — sayfa gövdesi. Prop almıyor.
   Masa seçimi kökte duruyor çünkü iki bölüm birden onu okuyor: masa kartı ve
   aşağıdaki fiş. "Bu masaya yaz" düğmesi ikisini birbirine bağlıyor — sayfanın
   tek gerçek etkileşimi bu ve kasıtlı olarak tek.
   ------------------------------------------------------------------------ */
export default function ContactI2() {
  const reduce = useReducedMotion();
  const lenis = useLenis();
  const [deskKey, setDeskKey] = useState<DeskKey>("kurulus");

  const desk = DESKS.find((d) => d.key === deskKey) ?? DESKS[0];
  const deskInfo = chainOf(desk.key);
  const deskCountries = countriesOf(desk.svc);
  const DeskIcon = desk.icon;

  /* Lenis kaydırmayı devraldığı için (globals.css: html{scroll-behavior:auto})
     tarayıcının kendi atlaması onun konumuyla çakışıyor. Sitedeki kalıbın
     aynısı: hedef gerçekten varsa lenis.scrollTo, yoksa hiç karışma. */
  const goToSlip = () => {
    const target = document.getElementById("i2-fis");
    if (!target) return;
    if (lenis) lenis.scrollTo(target, { duration: reduce ? 0 : 1.1 });
    else target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  };

  /* Ok tuşlarıyla masa değiştirme. Sekme listesi klavyeyle gezilemezse
     "hangi konuda kime yazacağınız belli" iddiası yalnızca fareyle geçerli
     olurdu. */
  const onRailKey = (e: React.KeyboardEvent) => {
    const i = DESKS.findIndex((d) => d.key === deskKey);
    let next = -1;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (i + 1) % DESKS.length;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (i - 1 + DESKS.length) % DESKS.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = DESKS.length - 1;
    if (next < 0) return;
    e.preventDefault();
    setDeskKey(DESKS[next].key);
    document.getElementById(`i2-tab-${DESKS[next].key}`)?.focus();
  };

  return (
    <>
      {/* ==================================================================
          1 · GİRİŞ — koyu. İddia solda, kanıt sağda.
          ================================================================== */}
      <section className="i2-hero sec-night">
        <div className="i2-hero-rules" aria-hidden="true" />
        <div className="container-o i2-hero-in">
          <div className="i2-hero-grid">
            <div className="i2-hero-copy">
              <FadeUp>
                <span className="i2-eyebrow">İletişim</span>
              </FadeUp>

              <SplitWords
                as="h1"
                text="Karşınızda bir form değil, bir masa var."
                accent="bir masa var."
                accentColor="#78b0f5"
                base={0.08}
                className="i2-h1"
                style={{ color: "#ffffff" }}
              />

              <FadeUp delay={0.22}>
                <p className="i2-hero-lead">
                  Dosyanız açıldığında isimli tek bir muhatabınız olur; mesai içinde
                  doğrudan ona ulaşırsınız. Süreç baştan sona Türkçe yürür, her adım
                  TaxDome panelinde durur.
                </p>
              </FadeUp>

              <FadeUp delay={0.32}>
                <div className="i2-hero-cta">
                  <button type="button" className="i2-btn i2-btn-light" onClick={goToSlip}>
                    Notunuzu bırakın
                    <ArrowRight size={16} strokeWidth={2.1} aria-hidden="true" />
                  </button>
                  <AskCta tone="solid" />
                </div>
              </FadeUp>
            </div>

            <FadeUp delay={0.14} className="i2-hero-side">
              <StatusBoard />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ==================================================================
          2 · MASALAR — sayfanın omurgası.
          ================================================================== */}
      <section
        id="i2-masalar"
        className="sec-pad i2-desks"
        style={{ background: "var(--white)" }}
      >
        <div className="container-o">
          <div className="sec-head">
            <SplitWords
              as="h2"
              text="Formu değil, masayı seçiyorsunuz."
              accent="masayı seçiyorsunuz."
              className="h2"
              style={{ color: "var(--text-900)" }}
            />
            <FadeUp delay={0.2}>
              <p className="sec-lead">
                Dosyanız tek ekipte kalır, ama her adımın sorumlusu ayrıdır. Konuyu
                seçin: hangi ülkelerde çalıştığını, yazarken neyi eklemenizin işi
                hızlandırdığını ve o masanın peşinen söylediği sınırı görün.
              </p>
            </FadeUp>
          </div>

          <FadeUp delay={0.1}>
            <div className="i2-desk-wrap">
              {/* --- sol ray: konu listesi (mobilde yatay şerit) --- */}
              <div
                className="i2-rail"
                role="tablist"
                aria-label="Masalar"
                aria-orientation="vertical"
                onKeyDown={onRailKey}
              >
                {DESKS.map((d) => {
                  const info = chainOf(d.key);
                  const Icon = d.icon;
                  const on = d.key === deskKey;
                  return (
                    <button
                      key={d.key}
                      id={`i2-tab-${d.key}`}
                      type="button"
                      role="tab"
                      aria-selected={on}
                      aria-controls="i2-desk-panel"
                      tabIndex={on ? 0 : -1}
                      className="i2-rail-btn"
                      data-on={on}
                      onClick={() => setDeskKey(d.key)}
                    >
                      {/* Seçili göstergesi tek bir düğüm ve masadan masaya
                          kayıyor: beş ayrı zemin yakıp söndürmek yerine tek
                          nesnenin yer değiştirmesi, listeyi bir ray gibi
                          okutuyor. */}
                      {on && (
                        <motion.span
                          layoutId="i2-rail-on"
                          className="i2-rail-on"
                          transition={{ duration: reduce ? 0 : 0.42, ease: EASE }}
                          aria-hidden="true"
                        />
                      )}
                      <span className="i2-rail-ic" aria-hidden="true">
                        <Icon size={17} strokeWidth={1.9} />
                      </span>
                      <span className="i2-rail-t">{info.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* --- sağ pano: seçilen masanın içi --- */}
              <div
                className="i2-panel"
                id="i2-desk-panel"
                role="tabpanel"
                aria-labelledby={`i2-tab-${desk.key}`}
                tabIndex={-1}
              >
                {/* key ile yeniden doğuyor: geçiş animasyonunu AnimatePresence
                    olmadan almanın en ucuz yolu ve çıkış animasyonuna zaten
                    ihtiyaç yok — yeni içerik eskisinin yerini anında alıyor. */}
                <motion.div
                  key={desk.key}
                  initial={{ opacity: 0, y: reduce ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
                  className="i2-panel-in"
                >
                  <div className="i2-panel-head">
                    <span className="i2-panel-ic" aria-hidden="true">
                      <DeskIcon size={22} strokeWidth={1.8} />
                    </span>
                    <div>
                      <h3 className="i2-panel-t">{deskInfo.label} masası</h3>
                      <p className="i2-panel-l">{deskInfo.line}</p>
                    </div>
                  </div>

                  <div className="i2-panel-grid">
                    {/* muhatap plakası — sayfanın en dürüst yeri */}
                    <div className="i2-who">
                      <span className="i2-cap">Muhatabınız</span>
                      <div className="i2-who-row">
                        <span className="i2-who-face" aria-hidden="true" />
                        <span className="i2-who-name">
                          <Slot />
                        </span>
                        <SwapChip />
                      </div>
                      <p className="i2-who-note">
                        İsim siteye değil dosyaya bağlıdır: dosyanız açıldığında bu
                        masadaki muhatabınızın adı size bildirilir ve süreç boyunca
                        değişmez.
                      </p>
                    </div>

                    {/* hangi ülkeler — brand.ts'ten türetiliyor */}
                    <div className="i2-where">
                      <span className="i2-cap">Çalıştığı ülkeler</span>
                      <ul className="i2-where-list">
                        {COUNTRY_ORDER.map((c) => {
                          const on = deskCountries.includes(c);
                          return (
                            <li key={c} className="i2-where-item" data-on={on}>
                              <span className="i2-where-flag" aria-hidden="true">
                                <Flag country={c} />
                              </span>
                              {COUNTRY_NAMES[c]}
                              <span className="sr-only">
                                {on ? " — bu masa burada çalışıyor" : " — bu masa burada çalışmıyor"}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>

                  <div className="i2-bring">
                    <span className="i2-cap">Yazarken bunları eklerseniz iş hızlanır</span>
                    <ul className="i2-bring-list">
                      {desk.bring.map((b) => (
                        <li key={b}>
                          <Check size={15} strokeWidth={2.4} aria-hidden="true" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="i2-limit">
                    <b>{desk.limit.title}</b>
                    <span>{desk.limit.line}</span>
                  </div>

                  <div className="i2-panel-foot">
                    <button type="button" className="i2-btn i2-btn-ink" onClick={goToSlip}>
                      Bu masaya yaz
                      <ArrowRight size={16} strokeWidth={2.1} aria-hidden="true" />
                    </button>
                    <span className="i2-panel-foot-n">
                      Seçtiğiniz masa aşağıdaki fişe geçer.
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ==================================================================
          3 · DOĞRUDAN HATLAR — koyu. Beş plaka, beşi de şu an boş.
          ================================================================== */}
      <section className="sec-pad sec-night i2-lines">
        <div className="container-o">
          <div className="sec-head sec-head-dark">
            <SplitWords
              as="h2"
              text="Doğrudan hatlar, arada katman yok."
              accent="arada katman yok."
              accentColor="#78b0f5"
              className="h2"
              style={{ color: "#ffffff" }}
            />
            <FadeUp delay={0.2}>
              <p className="sec-lead sec-lead-dark">
                Mesai içinde muhatabınıza doğrudan ulaşırsınız. Aşağıdaki bilgiler
                müşteri onayı bekliyor — bu yüzden yerlerinde boş yuva duruyor,
                uydurma numara değil.
              </p>
            </FadeUp>
          </div>

          <div className="i2-lines-grid">
            {LINES.map((l, i) => {
              const Icon = l.icon;
              return (
                <FadeUp key={l.label} delay={0.06 * i}>
                  <div className="i2-plate">
                    <span className="i2-plate-ic" aria-hidden="true">
                      <Icon size={18} strokeWidth={1.8} />
                    </span>
                    <div className="i2-plate-body">
                      <span className="i2-plate-lab">{l.label}</span>
                      {l.value ? (
                        <span className="i2-plate-val">{l.value}</span>
                      ) : (
                        <span className="i2-plate-val">
                          <Slot tone="dark" />
                        </span>
                      )}
                      <p className="i2-plate-n">{l.note}</p>
                    </div>
                    {!l.value && <SwapChip tone="dark" />}
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================================
          4 · FİŞ — form. Cümlenin içine gömülü, sonunda nereye düştüğü yazıyor.
          ================================================================== */}
      <Slip
        deskKey={deskKey}
        onDeskChange={setDeskKey}
        reduce={Boolean(reduce)}
      />

      {/* ==================================================================
          5 · KAPANIŞ — koyu. Duruş, brand.ts'ten.
          ================================================================== */}
      <section className="sec-pad sec-night i2-close">
        <div className="container-o">
          <div className="sec-head sec-head-dark">
            <SplitWords
              as="h2"
              text="Ne sorarsanız sorun, üçünü baştan söylüyoruz."
              accent="baştan söylüyoruz."
              accentColor="#78b0f5"
              className="h2"
              style={{ color: "#ffffff" }}
            />
          </div>

          <div className="i2-close-grid">
            {STANCE_LIMITS.map((s, i) => (
              <FadeUp key={s.title} delay={0.08 * i}>
                <div className="i2-close-card">
                  <span className="i2-close-n data" aria-hidden="true">
                    {pad2(i + 1)}
                  </span>
                  <b className="i2-close-t">{s.title}</b>
                  <p className="i2-close-l">{s.line}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.24}>
            <div className="i2-close-foot">
              <AskCta tone="solid" label="Kendi durumunuzu sorun" />
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}

/* ---------------------------------------------------------------------------
   FİŞ — form bölümü.
   Ayrı bileşen olmasının sebebi yine render maliyeti: yazı alanları her tuşta
   durum değiştiriyor, bunun yukarıdaki masa panosunu ve saat panosunu yeniden
   çizmesi için hiçbir sebep yok.

   SWAP:CONTACT_FORM — çalışan bir gönderim ucumuz YOK. Bu yüzden gönder düğmesi
   devre dışı ve hiçbir koşulda "mesajınız iletildi" yazmıyor. Sahte başarı
   ekranı göstermektense düğmenin kapalı durması dürüst: yanındaki gerçek çıkış
   (AskCta) çalışıyor.
   ------------------------------------------------------------------------ */
type Channel = "eposta" | "telefon" | "whatsapp";
type CountryChoice = Country | "bilmiyorum";

const CHANNELS: Record<Channel, string> = {
  eposta: "e-posta",
  telefon: "telefon",
  whatsapp: "WhatsApp",
};

function Slip({
  deskKey,
  onDeskChange,
  reduce,
}: {
  deskKey: DeskKey;
  onDeskChange: (k: DeskKey) => void;
  reduce: boolean;
}) {
  const uid = useId();
  const [country, setCountry] = useState<CountryChoice>("dubai");
  const [channel, setChannel] = useState<Channel>("eposta");

  const desk = DESKS.find((d) => d.key === deskKey) ?? DESKS[0];
  const deskInfo = chainOf(desk.key);
  const deskCountries = countriesOf(desk.svc);
  const DeskIcon = desk.icon;

  /* Sayfanın kendi kendini yalanlamayan yeri: seçilen masa seçilen ülkede
     çalışmıyorsa bu saklanmıyor. Veri brand.ts'ten geldiği için liste
     değiştiğinde uyarı da kendiliğinden doğru kalıyor. */
  const mismatch = country !== "bilmiyorum" && !deskCountries.includes(country);

  const countryLabel =
    country === "bilmiyorum" ? "henüz bilmiyorum" : COUNTRY_NAMES[country];

  return (
    <section id="i2-fis" className="sec-pad i2-slip" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="sec-head">
          <SplitWords
            as="h2"
            text="Notunuzu bir cümlede bırakın."
            accent="bir cümlede"
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.2}>
            <p className="sec-lead">
              Uzun form yok. Cümledeki üç boşluğu doldurun, gerisini yazın. Sağdaki
              fiş notunuzun hangi masaya düşeceğini anında gösterir.
            </p>
          </FadeUp>
        </div>

        <div className="i2-slip-wrap">
          {/* ------------------------------ sol: cümle + alanlar ------------ */}
          <form className="i2-form" onSubmit={(e) => e.preventDefault()} noValidate>
            <p className="i2-sentence">
              <span className="sr-only">
                Aşağıdaki cümlede ülke, konu ve tercih ettiğiniz kanal seçilir.
              </span>
              Ben{" "}
              <Pick
                id={`${uid}-c`}
                label="Ülke"
                value={country}
                onChange={(v) => setCountry(v as CountryChoice)}
              >
                {COUNTRY_ORDER.map((c) => (
                  <option key={c} value={c}>
                    {COUNTRY_NAMES[c]}
                  </option>
                ))}
                <option value="bilmiyorum">henüz bilmiyorum</option>
              </Pick>{" "}
              için{" "}
              <Pick
                id={`${uid}-d`}
                label="Konu"
                value={deskKey}
                onChange={(v) => onDeskChange(v as DeskKey)}
              >
                {DESKS.map((d) => (
                  <option key={d.key} value={d.key}>
                    {chainOf(d.key).label}
                  </option>
                ))}
              </Pick>{" "}
              konusunda yazıyorum. Bana{" "}
              <Pick
                id={`${uid}-k`}
                label="Kanal"
                value={channel}
                onChange={(v) => setChannel(v as Channel)}
              >
                {(Object.keys(CHANNELS) as Channel[]).map((k) => (
                  <option key={k} value={k}>
                    {CHANNELS[k]}
                  </option>
                ))}
              </Pick>{" "}
              ile dönün.
            </p>

            <div className="i2-fields">
              <Field id={`${uid}-n`} label="Ad soyad" placeholder="Adınız" />
              <Field
                id={`${uid}-r`}
                label={channel === "eposta" ? "E-posta" : "Telefon"}
                placeholder={channel === "eposta" ? "ornek@ornek.com" : "+__ ___ ___ __ __"}
                type={channel === "eposta" ? "email" : "tel"}
              />
            </div>

            <div className="i2-field">
              <label className="i2-label" htmlFor={`${uid}-m`}>
                Notunuz
              </label>
              <textarea
                id={`${uid}-m`}
                className="i2-input i2-area"
                rows={5}
                placeholder={desk.bring[0]}
              />
              <span className="i2-hint">
                Yer tutucu metin, o masanın ilk sorusudur — cevaplarsanız bir tur
                yazışma eksilir.
              </span>
            </div>
          </form>

          {/* ------------------------------ sağ: fiş ------------------------ */}
          <aside className="i2-receipt" aria-live="polite">
            <div className="i2-receipt-top">
              <span className="i2-cap i2-cap-dark">Bu not şu masaya düşer</span>
            </div>

            <motion.div
              key={desk.key}
              initial={{ opacity: 0, y: reduce ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
              className="i2-receipt-desk"
            >
              <span className="i2-receipt-ic" aria-hidden="true">
                <DeskIcon size={20} strokeWidth={1.8} />
              </span>
              <b>{deskInfo.label} masası</b>
            </motion.div>

            <dl className="i2-receipt-rows">
              <div>
                <dt>Ülke</dt>
                <dd>{countryLabel}</dd>
              </div>
              <div>
                <dt>Dönüş kanalı</dt>
                <dd>{CHANNELS[channel]}</dd>
              </div>
              <div>
                <dt>Muhatap</dt>
                <dd className="i2-receipt-pending">dosya açıldığında bildirilir</dd>
              </div>
            </dl>

            {mismatch && (
              <p className="i2-receipt-warn">
                {deskInfo.label} masası şu an yalnızca{" "}
                {deskCountries.map((c) => COUNTRY_NAMES[c]).join(", ")} için çalışıyor.
                Notunuz yine de okunur; {COUNTRY_NAMES[country as Country]} tarafında
                neyin mümkün olduğunu birlikte netleştiririz.
              </p>
            )}

            {/* Gönderim ucu yok — düğme kapalı ve öyle görünüyor. */}
            <button type="button" className="i2-send" disabled>
              <Lock size={15} strokeWidth={2.1} aria-hidden="true" />
              Gönderim henüz açık değil
            </button>
            <p className="i2-send-n">
              Form ucu bağlanana kadar en hızlı yol aşağıdaki çıkış — aynı ekibe
              düşer.
            </p>
            <AskCta label="Sorunuzu buradan iletin" />
          </aside>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   Cümlenin içindeki seçim. Yerli <select> kullanılıyor: mobilde işletim
   sisteminin kendi tekerleği açılıyor, klavyeyle geziliyor, ekran okuyucu
   tanıyor. Görünümü değişti, davranışı değişmedi.
   ------------------------------------------------------------------------ */
function Pick({
  id,
  label,
  value,
  onChange,
  children,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <span className="i2-pick">
      <label className="sr-only" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        className="i2-pick-sel"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {children}
      </select>
      <ChevronDown size={15} strokeWidth={2.2} aria-hidden="true" />
    </span>
  );
}

function Field({
  id,
  label,
  placeholder,
  type = "text",
}: {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div className="i2-field">
      <label className="i2-label" htmlFor={id}>
        {label}
      </label>
      <input id={id} className="i2-input" type={type} placeholder={placeholder} />
    </div>
  );
}
