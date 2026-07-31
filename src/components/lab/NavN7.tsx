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
import { servicesFor, serviceHref, type Service, type ServiceSlug } from "@/lib/services";

/* ============================================================================
   N7 — "GECE ŞERİDİ, AÇIK PANEL"              (stil: app/css/lab-n7.css)

   NE OLDUĞU
   Bu dosya sıfırdan bir fikir değil, iki adayın birleştirilmiş hâli. Müşteri
   üç şeyi ayrı ayrı söyledi ve üçü de farklı adaydan geliyor:

     1. "n4 bahsettiğim şeyi yapmış gibi"          → PANEL DÜZENİ N4'TEN
        Panelin iskeleti, ferah açık zemini, hizmet ve araç kutularının biçimi
        (çerçeveli beyaz kart + çerçeveli kare ikon kutusu, hover'da ikisi
        birden maviye dönüyor) N4'ten olduğu gibi geliyor. N1'in dolgusuz,
        çerçevesiz, yalnızca hover'da grileşen karoları yok.

     2. "yukardaki ülke seçme kısımlarını beğenmedim, onu n1'den getirebilirsin"
                                                    → ÜLKE ŞERİDİ N1'DEN
        N4 ülke seçimini panelin genişliğini üçe bölen, iki satırlı, kart
        boyunda bir sekme şeridine çevirmişti — ülke seçimi panelin en büyük
        bileşeniydi. N1'inki tam tersi: tek satır, hap biçimli, dar bir ray;
        müşterinin "üstte minik minik ülke seçebiliyoruz" dediği şey bu. Geri
        geldi: aynı yükseklik (34px), aynı yuvarlak bayrak jetonu, aynı kayan
        seçim hapı.

     3. "şu ülkelerin arkası siyahtı ya, o hoştu"    → KOYU ZEMİN N1'DEN
        Koyu tamamen kalkmıyor ama N1'deki yerinde de durmuyor. N1'de koyu olan
        şey panelin sol sütunundaki 320px'lik tam boy künye levhasıydı; N4 onu
        haklı olarak kaldırdı (o ölçekte koyu bir vurgu değil, ikinci bir
        zemin). Burada koyu, ÜLKE EKSENİNİN kendi bandı oldu: panelin en
        üstünde, kenardan kenara, tek satır yüksekliğinde bir gece şeridi ve
        ülke rayı onun içinde yaşıyor.

        Neden bu yer doğru: koyu artık bir SÜTUN değil bir BAŞLIK. Yan yana
        duran iki zemin gözü "burada iki ayrı belge var" diye yanıltıyordu;
        üst üste duran bir bant ise şapka gibi okunuyor, panelin altındaki açık
        alanla yarışmıyor. Ve rengin taşıdığı cümle artık tek: koyu neredeyse
        ülke oradadır. Panelin geri kalanında — hizmet kartları, araçlar,
        kaynaklar, kurumsal — tek bir koyu yüzey yok.

     4. "ülkelerle ilgili ünlem atıp uyarı koymuşsun, onlara da gerek yok"
                                                    → SINIR SATIRLARI ÇIKTI
        FACTS[c].limit'ten gelen ünlem işaretli uyarı kutusu hem masaüstü künye
        kartından hem mobil listeden kaldırıldı. Bu bilgi silinmiyor, taşınıyor:
        ülke sayfası ve karşılaştırma tablosu onu zaten gösteriyor. Menü bir
        okuma yüzeyi değil, bir geçiş yüzeyi; her açılışta üç satırlık bir
        çekince okutmak menüyü yavaşlatıyordu. Yerine bir şey de konmuyor —
        boşluk, künye kartının nefes alması demek.

   ---------------------------------------------------------------------------
   DEĞİŞMEYEN TEZ — ÖNCE ÜLKE
   Sitenin geri kalanı baştan sona "önce ülkeye karar ver" diyor: hero ülke
   seçtiriyor, fiyat ülkeye göre değişiyor, hatta hizmetin var olup olmadığı
   bile ülkeye bağlı. Menü de aynı ekseni kullanıyor. Çubukta müşterinin
   istediği dört klasik başlık var (Hizmetler · Araçlar · Kaynaklar · Kurumsal),
   ülke rayı Hizmetler panelinin ilk satırı. Ziyaretçi bir hizmet adına
   tıklamadan önce mutlaka bir ülkenin içinden geçiyor.

   HİZMET LİSTESİ TÜRETİLİYOR
   Elle yazılmış hizmet listesi yok: her şey servicesFor()'dan geliyor. Kartın
   alt satırı da öyle (bkz. hintOf) — Dubai bankasında "Wio · Mashreq NeoBiz",
   İngiltere'de "Wise · Revolut Business" yazıyor ve kimse iki yerde birden
   güncellemiyor.

   YOKLUK GÖRÜNÜR
   Izgara üç ülkenin hizmet listelerinin BİRLEŞİMİ üzerinden basılıyor. Seçili
   ülkede karşılığı olmayan kart kesik çizgili ve tıklanamaz olarak yerinde
   duruyor. Bu, kaldırılan ünlemli uyarıyla karıştırılmamalı: o bir çekinceydi
   ("gelmeniz gerekiyor"), bu bir kapsam bilgisi ("bu işi orada yürütmüyoruz")
   ve doğrudan tıklanacak şeyin kendisi hakkında.

   YAYINDA OLMAYAN ADRESLER
   Hiçbir yerde "bu sayfa var mı" kararı vermiyoruz; bütün bağlantılar
   SmartLink. Yayında olmayan girdi sönük ve tıklanamaz oluyor, rozet
   basılmıyor — bu dosyada da lab-n7.css'te de "yakında" diye bir işaret
   üretilmiyor.

   ERİŞİLEBİLİRLİK (süs değil, kısıt)
   - Tetikleyiciler <button aria-expanded/aria-controls>, <a> değil.
   - Hover tek açılma yolu DEĞİL: tıklama, Enter/Space, ArrowDown.
   - ArrowLeft/ArrowRight dört başlık arasında dolaşır; panel açıksa
     odaklanılan başlığın paneli açılır.
   - Ülke rayı gerçek bir sekme grubu: roving tabindex, ok tuşuyla otomatik
     seçim, aria-selected/aria-controls. Fare olmadan ülke değiştirilebiliyor.
   - ArrowDown ile açılan Hizmetler panelinde odak doğrudan SEÇİLİ ÜLKE
     sekmesine iniyor ([data-pfocus]) — klavyede de ilk durak ülke seçimi.
   - Escape kapatır, odağı tetikleyiciye geri verir. Odak tuzağı yok: panel
     DOM'da menü ile sağ blok arasında, Tab ile CTA'ya çıkılıyor.
   - Ülke sekmeleri hover ile DEĞİŞMİYOR: ray, başlıktan panele inen imlecin
     güzergâhında duruyor; hover ile seçseydik ziyaretçi hedefine giderken
     istemeden ülke değiştirirdi. (Canlı navbar bu hatayı yapıyor.)

   MOBİL
   Mega panel mobilde açılmıyor. Karşılığı çarşafın tepesinde: aynı gece
   şeridi, aynı üç ülkelik ray, aynı beyaz seçim hapı. Masaüstüyle aynı dil,
   aynı adlandırma; tek fark rayın hap yerine üç eşit paya bölünmesi — telefon
   genişliğinde satır içi hap dizisi kayıyor.
   ========================================================================= */

/* Ülke başlığının altındaki tek satır. Nerede olduğunu söyler, iddia etmez. */
const COUNTRY_LINE: Record<CountrySlug, string> = {
  dubai: "Birleşik Arap Emirlikleri · ofisimiz burada",
  ingiltere: "Birleşik Krallık · Companies House",
  kktc: "Kuzey Kıbrıs · Türkiye'ye en yakın",
};

/* İkon slug'a bağlı, ülkeye değil: aynı iş üç ülkede aynı ikonla çıksın ki ray
   üstünde ülke değiştirirken göz aynı yerde aynı şeyi bulsun. */
const SVC_ICON: Record<ServiceSlug, LucideIcon> = {
  "sirket-kurulusu": Building2,
  muhasebe: CalendarCheck,
  "banka-hesabi": Landmark,
  "oturum-vize": IdCard,
  uyum: ShieldCheck,
};

/* Kartın alt satırı. service.line tam bir cümle ("Lisans sınıfının seçilmesi,
   isim onayı, tescil ve kuruluş evrakının teslimi.") — menüde bu uzunluk kartı
   iki katına çıkarıyor ve göz taramayı bırakıyor. Onun yerine kapsamın ilk
   kalemini alıyoruz: hem kısa, hem gerçek, hem ülkeye göre kendiliğinden
   değişiyor (Dubai "Serbest bölge ticaret lisansı", İngiltere "Companies House
   tescili").

   Tek istisna muhasebe: ilk kalem "Defter tutma", iki kelime, başlığı tekrar
   etmekten öteye geçmiyor. 18 karakterin altındaki kalemler ikinciyle
   birleştiriliyor → "Defter tutma · KDV beyanı". Eşiği sabitlemek yerine elle
   yazılmış bir tablo tutmak da mümkündü; tercih etmedim, çünkü o tablo
   services.ts değişince sessizce yanlışa düşen ikinci bir doğruluk kaynağı
   olurdu. */
function hintOf(s: Service): string {
  const first = s.includes[0];
  if (!first) return s.duration;
  if (first.length >= 18 || !s.includes[1]) return first;
  return `${first} · ${s.includes[1]}`;
}

/* Üç ülkenin hizmet listelerinin BİRLEŞİMİ, ilk görülme sırasıyla. Izgara her
   ülkede aynı sırada aynı sayıda hücre basıyor; ülke değişince düzen
   zıplamıyor ve eksik hizmet boşluk bırakmak yerine kendini söylüyor. Elle
   yazılmış liste yok — bir hizmet bir ülkede açıldığında bu dizi de, kartın
   canlanması da kendiliğinden oluyor. */
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

/* Araçlar. Canlı navbar bu bölümü tek sırada dört kartla veriyor ve müşterinin
   beğendiği düzen bu; dördü de burada aynı sırada. Yayında olan araç başta
   duruyor: sönük bir kartla karşılamak kötü bir açılış. */
const TOOLS: Tile[] = [
  {
    label: "Uygunluk testi",
    href: "/uygunluk-testi",
    hint: "6 soru · ülke önerisi ve gerekçesi",
    icon: SlidersHorizontal,
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

/* SWAP:NAV_FEATURED — menü kendi başına bir keşif yüzeyi. Buradaki tarih ve
   sayfa sayısı temsilî; gerçek içerik geldiğinde yalnızca bu blok değişir. */
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
   "hakkımızda" sayfası değil, ne söz VERMEDİĞİ — ve o metin zaten sitede. */
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

/* mobil akordeonlar: Hizmetler hariç hepsi — Hizmetler çarşafın tepesinde,
   ülke şeridiyle birlikte açık duruyor */
const TAIL: TopKey[] = ["araclar", "kaynaklar", "kurumsal"];

const TAIL_ITEMS: Record<string, Tile[]> = {
  araclar: TOOLS,
  kaynaklar: RESOURCES,
  kurumsal: [...CORPORATE, CORP_LEAD],
};

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------- parça */
/* Canlı navbar'ın .nv2-card kalıbı, N4 üzerinden geliyor: çerçeveli beyaz kart
   + çerçeveli kare ikon kutusu; hover'da ikisi birden maviye dönüyor ve kart
   1px kalkıyor. Açık zeminde kartı ayakta tutan şey dolgu değil çerçeve. */
function CardLink({ t, onGo }: { t: Tile; onGo: () => void }) {
  return (
    <SmartLink href={t.href} className="n7-card" onClick={onGo}>
      <span className="n7-ic" aria-hidden="true">
        <t.icon size={18} strokeWidth={1.9} />
      </span>
      <span className="n7-card-tx">
        <b>{t.label}</b>
        <em>{t.hint}</em>
      </span>
    </SmartLink>
  );
}

/* ------------------------------------------------------- HİZMETLER paneli */
/* Panelin iki katı var: üstte gece şeridi (ülke rayı), altında seçili ülkenin
   künyesi ve hizmet ızgarası. Ülke değişince yalnızca alt kat yenileniyor;
   şerit ve odak yerinde kalıyor, yani ok tuşlarıyla üç ülkeyi tarayıp
   karşılaştırmak mümkün. */
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
     künyesini sırayla okuyabiliyor. */
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
    <div className="n7-svcp">
      {/* GECE ŞERİDİ — N7'nin birleştirme noktası.
          Biçim N1'den: tek satır, hap rayı, yuvarlak bayrak jetonu, kayan
          seçim hapı. Zemin N1'in künye levhasından ödünç: aynı opak gece,
          ama sütun olarak değil bant olarak. Panelin en üstünde kenardan
          kenara duruyor, altındaki açık alanla yan yana değil üst üste —
          bu yüzden "ikinci bir zemin" gibi değil, panelin başlığı gibi
          okunuyor. */}
      <div className="n7-axis">
        <span className="n7-axis-tag" id="n7-axis-lbl">
          Önce ülke
        </span>

        <div className="n7-rail" role="tablist" aria-labelledby="n7-axis-lbl">
          {COUNTRY_ORDER.map((k) => (
            <button
              key={k}
              type="button"
              role="tab"
              id={`n7-tab-${k}`}
              ref={(el) => {
                tabs.current[k] = el;
              }}
              className="n7-ctry"
              aria-selected={c === k}
              aria-controls="n7-cty-panel"
              tabIndex={c === k ? 0 : -1}
              data-here={here === k}
              data-pfocus={c === k ? "" : undefined}
              onClick={() => onPick(k)}
              onKeyDown={onTabKey}
            >
              {/* Seçim, gece şeridinin içinden kalkan beyaz bir hap. layoutId
                  ile üç sekme arasında kayıyor: kayma hareketi "seçim değişti"
                  diyor, üç ayrı yanıp sönen kutudan daha sakin.
                  N1 bu hapı mavi doldurmuştu; koyu bandın üstünde beyaz hem
                  daha okunur (21:1) hem de aşağıdaki beyaz panelle aynı
                  malzeme — seçili ülke şeritten panele "iniyor" gibi duruyor.
                  Mavi kayboluyor değil, işaret rolüne çekiliyor (buradasınız
                  noktası). */}
              {c === k && (
                <motion.span
                  layoutId="n7-rail-pill"
                  className="n7-ctry-pill"
                  aria-hidden="true"
                  transition={reduce ? { duration: 0 } : { duration: 0.26, ease: EASE }}
                />
              )}
              <span className="n7-ctry-flag" aria-hidden="true">
                <Flag country={k} />
              </span>
              <span className="n7-ctry-n">{COUNTRY_NAME[k]}</span>
              {here === k && <span className="n7-sr"> (şu an bu ülkedesiniz)</span>}
            </button>
          ))}
        </div>

        <span className="n7-axis-note">Aşağıdaki her şey seçtiğiniz ülkeye göre değişiyor</span>
      </div>

      <div className="n7-body" id="n7-cty-panel" role="tabpanel" aria-labelledby={`n7-tab-${c}`}>
        <motion.div
          key={c}
          className="n7-cty"
          initial={reduce ? false : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.18, ease: EASE }}
        >
          {/* KÜNYE KARTI — müşterinin "solda dubai kartı var, orda kısaca
              anlatıyor" dediği blok. Yeri ve içeriği N1'deki gibi, yüzeyi
              N4'teki gibi: paper zemin + 1px çerçeve. Koyu değil, çünkü koyu
              artık yukarıdaki bandın işi; aynı panelde iki koyu kütle olsaydı
              N1'in şikâyet edilen hâline geri dönerdik.

              Ünlemli sınır satırı burada DEĞİL. Kaldırıldı: menü bir çekince
              okuma yeri değil, geçiş yeri. Bilgi kaybolmuyor, ülke sayfasında
              ve karşılaştırma tablosunda duruyor. */}
          <div className="n7-brief">
            <div className="n7-brief-top">
              <span className="n7-brief-flag" aria-hidden="true">
                <Flag country={c} />
              </span>
              <span className="n7-brief-tx">
                <b>{COUNTRY_NAME[c]}</b>
                <em>{COUNTRY_LINE[c]}</em>
              </span>
            </div>

            <dl className="n7-facts">
              <div>
                <dt>Yapı</dt>
                <dd>{f.structure}</dd>
              </div>
              <div>
                {/* "Tipik" kelimesi zorunlu: STANCE_LIMITS kesin süre
                    taahhüdünü yasaklıyor, etiket de bunu söylemeli. */}
                <dt>Tipik süre</dt>
                <dd>{f.days}</dd>
              </div>
              <div>
                <dt>Kimler için</dt>
                <dd>{f.forWhom}</dd>
              </div>
            </dl>

            <SmartLink href={`/${c}`} className="n7-brief-go" onClick={onGo}>
              {COUNTRY_NAME[c]} ülke sayfası
              <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
            </SmartLink>
          </div>

          <div className="n7-svc">
            <p className="n7-h">{COUNTRY_NAME[c]} için yürüttüğümüz hizmetler</p>

            <div className="n7-grid" data-cols={2}>
              {SERVICE_UNIVERSE.map((u) => {
                const s = own.get(u.slug);
                const Icon = SVC_ICON[u.slug];

                /* Yokluk sessiz kalmıyor. Kart yerinde duruyor, kesik çizgili
                   ve tıklanamaz; hangi ülkede yürütmediğimizi söylüyor.
                   Kaybolan bilgi okunmuyor: İngiltere'ye geçen ziyaretçi
                   "vize yok" cümlesini görmeli, boşluğu fark etmesi
                   beklenmemeli. */
                if (!s) {
                  return (
                    <span key={u.slug} className="n7-card" data-dead="">
                      <span className="n7-ic" aria-hidden="true">
                        <Icon size={18} strokeWidth={1.9} />
                      </span>
                      <span className="n7-card-tx">
                        <b>{u.title}</b>
                        <em>{COUNTRY_NAME[c]} için yürütmüyoruz</em>
                      </span>
                    </span>
                  );
                }

                /* Adres elle kurulmuyor: serviceHref() ne diyorsa o. Fark
                   görünür — şirket kuruluşunun ayrı bir sayfası yok, ülke
                   sayfasının kendisi o hizmetin sayfası. `/${c}/${slug}`
                   yazsaydık kart, yönlendirmeye düşen ve dolaşıma kapalı olan
                   bir adrese bakacaktı; yani yayında olan tek hizmet menüde
                   sönük görünecekti. */
                return (
                  <SmartLink
                    key={u.slug}
                    href={serviceHref(c, u.slug)}
                    className="n7-card"
                    onClick={onGo}
                  >
                    <span className="n7-ic" aria-hidden="true">
                      <Icon size={18} strokeWidth={1.9} />
                    </span>
                    <span className="n7-card-tx">
                      <b>{s.title}</b>
                      <em>{hintOf(s)}</em>
                    </span>
                  </SmartLink>
                );
              })}
            </div>

            {/* Ülke-önce bir menünün ödemesi gereken bedel: henüz karar
                veremeyene çıkış. İki bağlantı da yayında. N1'de sağdaki buton
                siyah dolguluydu; koyu artık yalnızca ülke bandının işi olduğu
                için burada mavi-100 — aynı vurgu, bağırmadan. */}
            <div className="n7-foot">
              <span className="n7-foot-q">
                <Compass size={15} strokeWidth={2} aria-hidden="true" />
                Hangi ülke size uyuyor, emin değil misiniz?
              </span>
              <span className="n7-foot-a">
                <SmartLink href="/ulkeler" className="n7-foot-l" onClick={onGo}>
                  Üçünü yan yana görün
                </SmartLink>
                <SmartLink
                  href="/uygunluk-testi"
                  className="n7-foot-l"
                  data-strong=""
                  onClick={onGo}
                >
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

/* ------------------------------------------- ARAÇLAR / KAYNAKLAR / KURUMSAL */
/* Üçü de N4'ten olduğu gibi: tek koyu yüzey yok, ağırlığı çerçeve ve boşluk
   taşıyor. Gece şeridi bu panellerde YOK — bant ülke ekseninin işareti,
   ülkesi olmayan panelde bulunması rengi anlamsızlaştırırdı. */
function TailPanel({ k, onGo }: { k: TopKey; onGo: () => void }) {
  /* ARAÇLAR — canlı navbar'ın en beğenilen düzeni: tek sırada dört kart, panel
     genişliğinde. Bölünmüş kolon ve öne çıkan koyu kart yok; dört araç eşit
     ağırlıkta ve hangisinin yayında olduğunu sönüklük söylüyor. */
  if (k === "araclar") {
    return (
      <div className="n7-tail">
        <p className="n7-h">Karar vermeden önce çalıştırabileceğiniz araçlar</p>
        <div className="n7-grid" data-cols={4}>
          {TOOLS.map((t) => (
            <CardLink key={t.label} t={t} onGo={onGo} />
          ))}
        </div>
        <p className="n7-note">
          Araçların çıktısı bir ön değerlendirmedir, teklif değildir. Sonucu birlikte gözden
          geçiriyoruz.
        </p>
      </div>
    );
  }

  /* KAYNAKLAR — canlıdaki gibi: solda liste, sağda öne çıkan kartlar. Öne
     çıkanlar canlı navbar'da da açık zeminliydi (paper + çerçeve, hover'da
     mavi); N1 bunları koyulaştırmıştı, N4 geri almıştı, öyle kalıyor. */
  if (k === "kaynaklar") {
    return (
      <div className="n7-tail n7-split">
        <div>
          <p className="n7-h">Okumalık ve indirilebilir kaynaklar</p>
          <div className="n7-grid" data-cols={1}>
            {RESOURCES.map((t) => (
              <CardLink key={t.label} t={t} onGo={onGo} />
            ))}
          </div>
        </div>
        <div>
          <p className="n7-h">Öne çıkanlar</p>
          <div className="n7-feat">
            {FEATURED.map((f) => (
              <SmartLink key={f.title} href={f.href} className="n7-feat-c" onClick={onGo}>
                <span className="n7-feat-tag">{f.tag}</span>
                <span className="n7-feat-t">{f.title}</span>
                <span className="n7-feat-m">{f.meta}</span>
              </SmartLink>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* KURUMSAL — üç kartın üçü de henüz yayında değil ve SmartLink bunu
     saklamıyor. Panelin tamamen sönük kalmaması için yanında sitenin gerçekten
     var olan en kurumsal metni duruyor; başlıklar brand.ts STANCE_LIMITS'ten
     okunuyor, elle yazılmıyor. */
  return (
    <div className="n7-tail n7-split">
      <div>
        <p className="n7-h">Kurumsal</p>
        <div className="n7-grid" data-cols={1}>
          {CORPORATE.map((t) => (
            <CardLink key={t.label} t={t} onGo={onGo} />
          ))}
        </div>
        <p className="n7-note">
          <span className="n7-note-k">Resmî iş ortaklarımız</span>
          {OFFICIAL}
        </p>
      </div>

      <div>
        <p className="n7-h">Söz vermediklerimiz</p>
        <SmartLink href={CORP_LEAD.href} className="n7-stance" onClick={onGo}>
          <span className="n7-stance-h">
            <Scale size={15} strokeWidth={2} aria-hidden="true" />
            {CORP_LEAD.label}
          </span>
          <span className="n7-stance-l">
            {STANCE_LIMITS.map((s) => (
              <span key={s.title}>{s.title}</span>
            ))}
          </span>
          <span className="n7-stance-go">
            Tamamını okuyun
            <ArrowRight size={14} strokeWidth={2.2} aria-hidden="true" />
          </span>
        </SmartLink>
      </div>
    </div>
  );
}

/* ==================================================================== navbar */
export default function NavN7() {
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
     boyunca açık panelin yeni sayfanın üstünde asılı kalmasına yol açıyor. */
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

  /* --------------------------------------------------- mobil şerit (sekme) */
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
      className="n7"
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
      <div className="container-o n7-bar">
        <SmartLink href="/" aria-label="Ortac Global" className="n7-logo" onClick={closeAll}>
          <Logo height={24} />
        </SmartLink>

        <nav className="n7-nav" aria-label="Ana menü">
          {TOP.map((k) => {
            /* Ülke adları çubukta değil (müşteri dört kategori istedi), ama
               "buradasınız" bilgisi kaybolmasın: bir ülke sayfasındaysanız
               Hizmetler başlığının yanında o ülkenin küçük bayrağı beliriyor.
               N4'ün buluşu; N1'in nötr mavi noktasından daha çok şey söylüyor,
               üstelik menünün ekseninin ülke olduğunu çubuk kapalıyken de
               anlatıyor. Hangi ülke olduğunu ekran okuyucuya .n7-sr yazıyor. */
            const marked = k === "hizmetler" && here !== null;
            return (
              <button
                key={k}
                type="button"
                ref={(el) => {
                  triggers.current[k] = el;
                }}
                className="n7-top"
                data-on={open === k}
                aria-expanded={open === k}
                aria-controls={open === k ? "n7-mega" : undefined}
                onClick={() => toggle(k)}
                onKeyDown={(e) => onTriggerKey(e, k)}
                onPointerEnter={(e) => hoverOpen(e, k)}
                onPointerLeave={() => {
                  if (suppress.current === k) suppress.current = null;
                }}
              >
                {TOP_LABEL[k]}
                {marked && here && (
                  <>
                    <span className="n7-top-flag" aria-hidden="true">
                      <Flag country={here} />
                    </span>
                    <span className="n7-sr"> — şu an {COUNTRY_NAME[here]} sayfasındasınız</span>
                  </>
                )}
                <ChevronDown className="n7-chev" size={13} strokeWidth={2.4} aria-hidden="true" />
              </button>
            );
          })}
        </nav>

        {/* Panel DOM'da menü ile sağ blok arasında: klavyeyle panelden çıkan
            odak doğal olarak CTA'ya düşüyor, sayfanın başına dönmüyor. */}
        <AnimatePresence>
          {open !== null && (
            <motion.div
              id="n7-mega"
              ref={panelRef}
              className="n7-panel"
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

        <div className="n7-right">
          <span className="n7-lang" role="group" aria-label="Dil">
            <button type="button" data-on="" aria-pressed="true">
              TR
            </button>
            <button type="button" aria-pressed="false" aria-disabled="true" title="Yakında">
              EN
            </button>
          </span>
          <SmartLink href="/panel" className="n7-ghost">
            Panel
          </SmartLink>
          <SmartLink href="/basla" className="n7-cta" onClick={() => gtm("nav_cta_click")}>
            Kurulumu Başlat
            <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
          </SmartLink>
        </div>

        <button
          type="button"
          ref={burgerRef}
          className="n7-burger"
          aria-label={sheet ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={sheet}
          aria-controls={sheet ? "n7-sheet" : undefined}
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
            id="n7-sheet"
            className="n7-sheet"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: reduce ? 0.01 : 0.26, ease: EASE }}
          >
            <div className="n7-sheet-in">
              {/* Masaüstündeki gece şeridinin mobil ikizi: aynı opak zemin,
                  aynı üç ülke, aynı beyaz seçim hapı. Mega panel mobilde
                  açılmıyor ama "önce ülke" fikri aynen duruyor ve akordeona
                  sokulmuyor — çarşafın en çok kullanılan bölümü bu.
                  Tek fark rayın hap dizisi yerine üç eşit paya bölünmesi:
                  telefon genişliğinde satır içi diziliş sağa taşıyordu. */}
              <div className="n7-axis n7-axis-m">
                <span className="n7-axis-tag" id="n7-seg-lbl">
                  Hizmetler · önce ülke
                </span>

                <div className="n7-rail n7-rail-m" role="tablist" aria-labelledby="n7-seg-lbl">
                  {COUNTRY_ORDER.map((c) => (
                    <button
                      key={c}
                      type="button"
                      role="tab"
                      id={`n7-seg-${c}`}
                      ref={(el) => {
                        segs.current[c] = el;
                      }}
                      aria-selected={sheetCountry === c}
                      aria-controls="n7-seg-panel"
                      tabIndex={sheetCountry === c ? 0 : -1}
                      className="n7-ctry"
                      data-here={here === c}
                      onClick={() => setSheetCountry(c)}
                      onKeyDown={(e) => onSegKey(e, c)}
                    >
                      {sheetCountry === c && (
                        <motion.span
                          layoutId="n7-seg-pill"
                          className="n7-ctry-pill"
                          aria-hidden="true"
                          transition={reduce ? { duration: 0 } : { duration: 0.26, ease: EASE }}
                        />
                      )}
                      <span className="n7-ctry-flag" aria-hidden="true">
                        <Flag country={c} />
                      </span>
                      <span className="n7-ctry-n">{COUNTRY_NAME[c]}</span>
                      {here === c && <span className="n7-sr"> (şu an bu ülkedesiniz)</span>}
                    </button>
                  ))}
                </div>
              </div>

              <div
                className="n7-seg-panel"
                id="n7-seg-panel"
                role="tabpanel"
                aria-labelledby={`n7-seg-${sheetCountry}`}
              >
                <SmartLink href={`/${sheetCountry}`} className="n7-m-country" onClick={closeAll}>
                  <span>
                    <b>{COUNTRY_NAME[sheetCountry]} ülke sayfası</b>
                    <em>{FACTS[sheetCountry].structure}</em>
                  </span>
                  <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
                </SmartLink>

                {/* Masaüstündeki ızgarayla aynı kural: liste birleşim üzerinden
                    basılıyor, o ülkede olmayan hizmet satırı kaybolmuyor,
                    "yürütmüyoruz" diyor. Adres yine serviceHref()'ten.
                    Mobil sınır uyarısı da masaüstündeki gibi kaldırıldı. */}
                {SERVICE_UNIVERSE.map((u) => {
                  const s = sheetOwn.get(u.slug);
                  const Icon = SVC_ICON[u.slug];
                  if (!s) {
                    return (
                      <span key={u.slug} className="n7-m-row" data-dead="">
                        <span className="n7-m-ic" aria-hidden="true">
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
                      href={serviceHref(sheetCountry, u.slug)}
                      className="n7-m-row"
                      onClick={closeAll}
                    >
                      <span className="n7-m-ic" aria-hidden="true">
                        <Icon size={16} strokeWidth={2} />
                      </span>
                      {s.title}
                    </SmartLink>
                  );
                })}
              </div>

              <SmartLink href="/uygunluk-testi" className="n7-m-unsure" onClick={closeAll}>
                <Compass size={15} strokeWidth={2} aria-hidden="true" />
                Emin değilim, bana uygun olanı bulun
                <ArrowRight size={14} strokeWidth={2.2} aria-hidden="true" />
              </SmartLink>

              <div className="n7-m-acc">
                {TAIL.map((k) => {
                  const items = TAIL_ITEMS[k];
                  const on = sheetSec === k;
                  return (
                    <div key={k} className="n7-m-sec">
                      <button
                        type="button"
                        className="n7-m-top"
                        aria-expanded={on}
                        aria-controls={on ? `n7-m-${k}` : undefined}
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
                            id={`n7-m-${k}`}
                            initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                            animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                            transition={{ duration: reduce ? 0.01 : 0.22, ease: EASE }}
                            style={{ overflow: "hidden" }}
                          >
                            <div className="n7-m-body">
                              {items.map((t) => (
                                <SmartLink
                                  key={t.label}
                                  href={t.href}
                                  className="n7-m-row"
                                  onClick={closeAll}
                                >
                                  <span className="n7-m-ic" aria-hidden="true">
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

              <div className="n7-m-cta">
                <SmartLink href="/basla" className="n7-cta n7-cta-full" onClick={closeAll}>
                  Kurulumu Başlat
                  <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
                </SmartLink>
                <SmartLink href="/panel" className="n7-ghost n7-ghost-full" onClick={closeAll}>
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
            className="n7-scrim"
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
