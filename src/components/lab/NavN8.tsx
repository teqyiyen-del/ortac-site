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
   N8 — "KOYU ÜLKE KARTI, AÇIK ŞERİT"          (stil: app/css/lab-n8.css)

   NEDEN BU DOSYA VAR — N7'DE KOYU YANLIŞ YERDEYDİ
   N7, "şu ülkelerin arkası siyahtı ya, o hoştu" cümlesini panelin en üstündeki
   ülke şeridine uygulamıştı: gece zeminli bir bant, içinde hap biçimli ray.
   Müşteri düzeltti — kastedilen yer o değildi:

     "navbarda üst şeridi siyah yapmışsın, orayı demiyordum; SOLDAKİ ÜLKE
      KARTININ ARKASINI yapmandan bahsediyordum."

   Yani beğenilen şey N1'in .n1-id levhasıydı: Hizmetler panelinin solunda
   duran, seçili ülkeyi kısaca anlatan koyu kart. N8 tam olarak iki şey
   yapıyor ve başka hiçbir şeye dokunmuyor:

     1. ÜST ŞERİT AÇIĞA DÖNDÜ. Bant artık paper zeminli, rayın kendisi beyaz,
        seçili ülkenin hapı mavi — yani N1'in ilk hâli. Geometri N7'den aynen
        kalıyor (tek satır, 34px, yuvarlak bayrak jetonu, kayan hap); değişen
        yalnızca renk. Müşterinin "üstte minik minik ülke seçebiliyoruz"
        dediği ray bozulmadı.

     2. KOYU, SOLDAKİ KÜNYE KARTININ ARKASINA GEÇTİ. Bayrak, ülke adı, üç
        künye satırı ve ülke sayfası bağlantısı opak #111111 bir kartın
        üstünde. Panelin geri kalanı — hizmet kartları, araçlar, kaynaklar,
        kurumsal — N4'ten gelen açık düzeninde, tek bir koyu yüzey daha yok.

   ÖLÇÜ MESELESİ — BİR TUR ÖNCEKİ ŞİKÂYET TEKRARLAMASIN
   "Sağdaki koyu blok kaba duruyor" teşhisi renk değil ALAN × YER idi: N1'in
   levhası 320px genişliğinde, panel boyunca tam yükseklikteydi ve panel
   alanının üçte birini kaplıyordu; N5 ölçtüğünde ~%25 çıkmıştı. Aynı hataya
   düşmemek için koyu kart üç yerden kısıldı:

     · Panelin "hangi ülke size uyuyor" eteği hizmet sütunundan ÇIKARILDI ve
       gövdenin altına, iki sütunun da altına tam genişlikte bir satır olarak
       taşındı. Sağdaki sütun 65px kısaldı; koyu kart ona hizalandığı için
       koyu alanı doğrudan kısaltan en büyük hamle bu. Kararın kendisi de
       doğru: "henüz karar veremedim" çıkışı hizmet ızgarasının değil panelin
       tamamının eteği.
     · Künye başlığı dikey değil yatay: 32px yuvarlak jeton + yanında ad ve
       tek satır. N1'de bayrak kendi satırındaydı, altında 21px'lik ad vardı;
       o diziliş kartı ~60px uzatıyordu.
     · Sütun 320px yerine 280px. Buradaki ders sayının kendisinden önemli:
       daha DAR sütun kartı UZATIYOR. 264px denendi, künye 287,8px'e çıktı ve
       240,6px'lik hizmet ızgarasını aşarak panelin yüksekliğini koyu tarafa
       devretti. 280px, künye değerlerinin fazladan satıra kırılmadığı en dar
       ölçü; künye 239,3px'e iniyor ve boyu artık AÇIK ızgara belirliyor.

   Ölçüldü (tarayıcıda, gerçek Poppins metrikleriyle, 1200px kapsayıcı): koyu
   kart 280 × 240,6 px = 67.368 px², panel 1136 × 414,6 px = 470.986 px² →
   panelin ALANININ %14,3'ü (genişliğinin %24,6'sı, yüksekliğinin %58'i).
   1024–1199 arasında sütun 260px'e iniyor, oran %14,9. Eşik "dörtte bir"di;
   iki kırılımda da yarısına yakın altında. Sayılar lab-n8.css'in başında da.

   Yan fayda: panel yüksekliği artık üç ülkede de 414,6px. Boyu en uzun künyeye
   değil sabit ızgaraya bağlı olduğu için ülke değiştirirken panel zıplamıyor.

   ---------------------------------------------------------------------------
   DEĞİŞMEYENLER (hepsi N7'den olduğu gibi)
   · Üst menü dört klasik başlık: Hizmetler · Araçlar · Kaynaklar · Kurumsal.
   · Hizmet listesi elle yazılmıyor, servicesFor()'dan türüyor; kartın alt
     satırı da öyle (bkz. hintOf).
   · Izgara üç ülkenin BİRLEŞİMİ üzerinden basılıyor: o ülkede yürütmediğimiz
     hizmet kesik çizgili ve tıklanamaz olarak yerinde duruyor.
   · FACTS[c].limit'ten gelen ünlemli uyarı satırı yok — ne masaüstünde ne
     mobilde. Menü bir çekince okuma yüzeyi değil.
   · Bütün bağlantılar SmartLink; yayında olmayan adres sönük ve tıklanamaz,
     "yakında" rozeti üretilmiyor.
   · Erişilebilirlik ve mobil davranış birebir korundu (aşağıda).

   ERİŞİLEBİLİRLİK (süs değil, kısıt)
   - Tetikleyiciler <button aria-expanded/aria-controls>, <a> değil.
   - Hover tek açılma yolu DEĞİL: tıklama, Enter/Space, ArrowDown.
   - ArrowLeft/ArrowRight dört başlık arasında dolaşır; panel açıksa
     odaklanılan başlığın paneli açılır.
   - Ülke rayı gerçek bir sekme grubu: roving tabindex, ok tuşuyla otomatik
     seçim, aria-selected/aria-controls.
   - ArrowDown ile açılan Hizmetler panelinde odak doğrudan SEÇİLİ ÜLKE
     sekmesine iniyor ([data-pfocus]).
   - Escape kapatır, odağı tetikleyiciye geri verir. Odak tuzağı yok.
   - Ülke sekmeleri hover ile DEĞİŞMİYOR: ray, başlıktan panele inen imlecin
     güzergâhında; hover ile seçseydik ziyaretçi hedefine giderken istemeden
     ülke değiştirirdi. (Canlı navbar bu hatayı yapıyor.)

   MOBİL
   Mega panel mobilde açılmıyor. Karşılığı çarşafın tepesinde: aynı açık
   şerit, aynı üç ülkelik ray, aynı mavi seçim hapı; tek fark rayın hap yerine
   üç eşit paya bölünmesi. Koyu burada da ülke kartının arkasında — çarşaftaki
   tek koyu yüzey "… ülke sayfası" satırı. Böylece "koyu neredeyse SEÇİLİ ÜLKE
   KARTI oradadır" cümlesi iki kırılımda da aynı.
   ========================================================================= */

/* Ülke başlığının altındaki tek satır. Nerede olduğunu söyler, iddia etmez.

   "TEK satır" burada bir üslup tercihi değil ölçü kısıtı: koyu künye kartında
   bu metne 207px düşüyor ve ikinci satıra taşan her ülke kartı 15px uzatıyor —
   uzayan kart panelin yüksekliğini açık ızgaradan alıp koyu tarafa devrediyor
   (bkz. lab-n8.css'teki ölçü notu). En uzunu İngiltere: 11,5px'te 190px, yani
   bütçe dolmuş sayılır.

   Dubai'nin satırı bu yüzden N7'deki "· ofisimiz burada" kuyruğunu bıraktı;
   iki satıra taşıyordu. Bilgi kaybolmuyor, ülke sayfasında ve Hakkımızda'da
   duruyor — menüde satırın asıl işi zaten "Dubai neresi" sorusuna cevap
   vermek. */
const COUNTRY_LINE: Record<CountrySlug, string> = {
  dubai: "Birleşik Arap Emirlikleri",
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
    <SmartLink href={t.href} className="n8-card" onClick={onGo}>
      <span className="n8-ic" aria-hidden="true">
        <t.icon size={18} strokeWidth={1.9} />
      </span>
      <span className="n8-card-tx">
        <b>{t.label}</b>
        <em>{t.hint}</em>
      </span>
    </SmartLink>
  );
}

/* ------------------------------------------------------- HİZMETLER paneli */
/* Panelin üç katı var: üstte AÇIK ülke şeridi, ortada iki sütun (solda koyu
   künye kartı, sağda hizmet ızgarası), altta tam genişlikte etek. Ülke
   değişince yalnızca orta kat yenileniyor; şerit ve odak yerinde kalıyor,
   yani ok tuşlarıyla üç ülkeyi tarayıp karşılaştırmak mümkün. */
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
    <div className="n8-svcp">
      {/* AÇIK ÜLKE ŞERİDİ — N7'nin geri alınan kararı.
          Biçim aynen duruyor (tek satır, hap rayı, yuvarlak bayrak jetonu,
          layoutId ile kayan seçim hapı); değişen yalnızca renk. N7 bu bandı
          gece zeminine oturtmuştu, müşteri "orayı demiyordum" dedi. Şimdi
          bant paper, ray beyaz, seçili hap mavi — yani N1'in ilk hâli.
          Koyu tek bir yere ayrıldı ve orası aşağıdaki künye kartı. */}
      <div className="n8-axis">
        <span className="n8-axis-tag" id="n8-axis-lbl">
          Önce ülke
        </span>

        <div className="n8-rail" role="tablist" aria-labelledby="n8-axis-lbl">
          {COUNTRY_ORDER.map((k) => (
            <button
              key={k}
              type="button"
              role="tab"
              id={`n8-tab-${k}`}
              ref={(el) => {
                tabs.current[k] = el;
              }}
              className="n8-ctry"
              aria-selected={c === k}
              aria-controls="n8-cty-panel"
              tabIndex={c === k ? 0 : -1}
              data-here={here === k}
              data-pfocus={c === k ? "" : undefined}
              onClick={() => onPick(k)}
              onKeyDown={onTabKey}
            >
              {/* Seçim mavi bir hap; layoutId ile üç sekme arasında kayıyor.
                  Kayma hareketi "seçim değişti" diyor, üç ayrı yanıp sönen
                  kutudan daha sakin. Renk seçimi bilinçli: şerit artık açık
                  olduğu için beyaz hap (N7'nin çözümü) görünmez olurdu;
                  mavi hem markanın seçim rengi hem de aşağıdaki koyu kartla
                  yarışmıyor. */}
              {c === k && (
                <motion.span
                  layoutId="n8-rail-pill"
                  className="n8-ctry-pill"
                  aria-hidden="true"
                  transition={reduce ? { duration: 0 } : { duration: 0.26, ease: EASE }}
                />
              )}
              <span className="n8-ctry-flag" aria-hidden="true">
                <Flag country={k} />
              </span>
              <span className="n8-ctry-n">{COUNTRY_NAME[k]}</span>
              {here === k && <span className="n8-sr"> (şu an bu ülkedesiniz)</span>}
            </button>
          ))}
        </div>

        <span className="n8-axis-note">Aşağıdaki her şey seçtiğiniz ülkeye göre değişiyor</span>
      </div>

      <div className="n8-body" id="n8-cty-panel" role="tabpanel" aria-labelledby={`n8-tab-${c}`}>
        <motion.div
          key={c}
          className="n8-cty"
          initial={reduce ? false : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.18, ease: EASE }}
        >
          {/* KOYU KÜNYE KARTI — müşterinin işaret ettiği yer.
              "Solda dubai kartı var, orda kısaca anlatıyor" dediği blok bu;
              "arkası siyahtı ya, o hoştu" cümlesi de bunun için söylenmişti.
              Zemin N1'in .n1-id'sinden: opak #111111, alfa yok.

              Ama N1'in ÖLÇÜSÜNDEN değil. Orada kart 320px genişlikte ve
              panel boyunca tam yükseklikteydi; bir tur önce "kaba duruyor"
              denen şey o kütleydi. Burada sütun 280px, başlık yatay (jeton +
              ad yan yana, N1'de alt alta) ve panelin eteği bu sütunun
              hizasından çıkarıldı — üçü birlikte koyu alanı panelin
              %14,3'üne indiriyor (ölçüm: 280 × 240,6 px / 1136 × 414,6 px).

              Ünlemli sınır satırı burada DEĞİL: menü bir çekince okuma yeri
              değil, geçiş yeri. Bilgi ülke sayfasında ve karşılaştırma
              tablosunda duruyor. */}
          <div className="n8-brief">
            <div className="n8-brief-top">
              <span className="n8-brief-flag" aria-hidden="true">
                <Flag country={c} />
              </span>
              <span className="n8-brief-tx">
                <b>{COUNTRY_NAME[c]}</b>
                <em>{COUNTRY_LINE[c]}</em>
              </span>
            </div>

            <dl className="n8-facts">
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

            {/* Koyu kartın tek eylemi, beyaz dolgulu. Kartın içinde kalıyor
                çünkü dışarı alsaydık koyu kart sağdaki ızgaradan kısa kalır
                ve sütunun altında ne yapacağını bilmediğimiz bir boşluk
                açılırdı; içeride margin-top:auto ile dibe yapışıyor. */}
            <SmartLink href={`/${c}`} className="n8-brief-go" onClick={onGo}>
              {COUNTRY_NAME[c]} ülke sayfası
              <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
            </SmartLink>
          </div>

          <div className="n8-svc">
            <p className="n8-h">{COUNTRY_NAME[c]} için yürüttüğümüz hizmetler</p>

            <div className="n8-grid" data-cols={2}>
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
                    <span key={u.slug} className="n8-card" data-dead="">
                      <span className="n8-ic" aria-hidden="true">
                        <Icon size={18} strokeWidth={1.9} />
                      </span>
                      <span className="n8-card-tx">
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
                    className="n8-card"
                    onClick={onGo}
                  >
                    <span className="n8-ic" aria-hidden="true">
                      <Icon size={18} strokeWidth={1.9} />
                    </span>
                    <span className="n8-card-tx">
                      <b>{s.title}</b>
                      <em>{hintOf(s)}</em>
                    </span>
                  </SmartLink>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* PANEL ETEĞİ — N7'de hizmet sütununun içindeydi, buraya taşındı.
            İki gerekçe, ikisi de bağımsız olarak yeterli:
            (1) Ölçü: sağdaki sütun kısaldığı için, ona hizalanan koyu kart da
                ~50px kısalıyor. Koyu alanı düşüren en büyük tek hamle bu.
            (2) Anlam: "hangi ülke size uyuyor" sorusu hizmet ızgarasının
                değil, ülke seçtiren panelin tamamının eteği. Zaten ülkeden
                bağımsız — ülke değişince yeniden animasyona girmesi de
                gereksizdi, artık keyed bloğun dışında.
            N1'de sağdaki buton siyah dolguluydu; koyu artık künye kartının
            işi olduğu için burada mavi-100 — aynı vurgu, bağırmadan. */}
        <div className="n8-foot">
          <span className="n8-foot-q">
            <Compass size={15} strokeWidth={2} aria-hidden="true" />
            Hangi ülke size uyuyor, emin değil misiniz?
          </span>
          <span className="n8-foot-a">
            <SmartLink href="/ulkeler" className="n8-foot-l" onClick={onGo}>
              Üçünü yan yana görün
            </SmartLink>
            <SmartLink href="/uygunluk-testi" className="n8-foot-l" data-strong="" onClick={onGo}>
              Uygunluk testi
              <ArrowRight size={14} strokeWidth={2.2} aria-hidden="true" />
            </SmartLink>
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------- ARAÇLAR / KAYNAKLAR / KURUMSAL */
/* Üçü de N4'ten olduğu gibi: tek koyu yüzey yok, ağırlığı çerçeve ve boşluk
   taşıyor. Koyu künye kartı bu panellerde YOK — koyu, seçili ülkenin işareti;
   ülkesi olmayan panelde bulunması rengi anlamsızlaştırırdı. */
function TailPanel({ k, onGo }: { k: TopKey; onGo: () => void }) {
  /* ARAÇLAR — canlı navbar'ın en beğenilen düzeni: tek sırada dört kart, panel
     genişliğinde. Bölünmüş kolon ve öne çıkan koyu kart yok; dört araç eşit
     ağırlıkta ve hangisinin yayında olduğunu sönüklük söylüyor. */
  if (k === "araclar") {
    return (
      <div className="n8-tail">
        <p className="n8-h">Karar vermeden önce çalıştırabileceğiniz araçlar</p>
        <div className="n8-grid" data-cols={4}>
          {TOOLS.map((t) => (
            <CardLink key={t.label} t={t} onGo={onGo} />
          ))}
        </div>
        <p className="n8-note">
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
      <div className="n8-tail n8-split">
        <div>
          <p className="n8-h">Okumalık ve indirilebilir kaynaklar</p>
          <div className="n8-grid" data-cols={1}>
            {RESOURCES.map((t) => (
              <CardLink key={t.label} t={t} onGo={onGo} />
            ))}
          </div>
        </div>
        <div>
          <p className="n8-h">Öne çıkanlar</p>
          <div className="n8-feat">
            {FEATURED.map((f) => (
              <SmartLink key={f.title} href={f.href} className="n8-feat-c" onClick={onGo}>
                <span className="n8-feat-tag">{f.tag}</span>
                <span className="n8-feat-t">{f.title}</span>
                <span className="n8-feat-m">{f.meta}</span>
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
    <div className="n8-tail n8-split">
      <div>
        <p className="n8-h">Kurumsal</p>
        <div className="n8-grid" data-cols={1}>
          {CORPORATE.map((t) => (
            <CardLink key={t.label} t={t} onGo={onGo} />
          ))}
        </div>
        <p className="n8-note">
          <span className="n8-note-k">Resmî iş ortaklarımız</span>
          {OFFICIAL}
        </p>
      </div>

      <div>
        <p className="n8-h">Söz vermediklerimiz</p>
        <SmartLink href={CORP_LEAD.href} className="n8-stance" onClick={onGo}>
          <span className="n8-stance-h">
            <Scale size={15} strokeWidth={2} aria-hidden="true" />
            {CORP_LEAD.label}
          </span>
          <span className="n8-stance-l">
            {STANCE_LIMITS.map((s) => (
              <span key={s.title}>{s.title}</span>
            ))}
          </span>
          <span className="n8-stance-go">
            Tamamını okuyun
            <ArrowRight size={14} strokeWidth={2.2} aria-hidden="true" />
          </span>
        </SmartLink>
      </div>
    </div>
  );
}

/* ==================================================================== navbar */
export default function NavN8() {
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
      className="n8"
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
      <div className="container-o n8-bar">
        <SmartLink href="/" aria-label="Ortac Global" className="n8-logo" onClick={closeAll}>
          <Logo height={24} />
        </SmartLink>

        <nav className="n8-nav" aria-label="Ana menü">
          {TOP.map((k) => {
            /* Ülke adları çubukta değil (müşteri dört kategori istedi), ama
               "buradasınız" bilgisi kaybolmasın: bir ülke sayfasındaysanız
               Hizmetler başlığının yanında o ülkenin küçük bayrağı beliriyor.
               N4'ün buluşu; N1'in nötr mavi noktasından daha çok şey söylüyor,
               üstelik menünün ekseninin ülke olduğunu çubuk kapalıyken de
               anlatıyor. Hangi ülke olduğunu ekran okuyucuya .n8-sr yazıyor. */
            const marked = k === "hizmetler" && here !== null;
            return (
              <button
                key={k}
                type="button"
                ref={(el) => {
                  triggers.current[k] = el;
                }}
                className="n8-top"
                data-on={open === k}
                aria-expanded={open === k}
                aria-controls={open === k ? "n8-mega" : undefined}
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
                    <span className="n8-top-flag" aria-hidden="true">
                      <Flag country={here} />
                    </span>
                    <span className="n8-sr"> — şu an {COUNTRY_NAME[here]} sayfasındasınız</span>
                  </>
                )}
                <ChevronDown className="n8-chev" size={13} strokeWidth={2.4} aria-hidden="true" />
              </button>
            );
          })}
        </nav>

        {/* Panel DOM'da menü ile sağ blok arasında: klavyeyle panelden çıkan
            odak doğal olarak CTA'ya düşüyor, sayfanın başına dönmüyor. */}
        <AnimatePresence>
          {open !== null && (
            <motion.div
              id="n8-mega"
              ref={panelRef}
              className="n8-panel"
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

        <div className="n8-right">
          <span className="n8-lang" role="group" aria-label="Dil">
            <button type="button" data-on="" aria-pressed="true">
              TR
            </button>
            <button type="button" aria-pressed="false" aria-disabled="true" title="Yakında">
              EN
            </button>
          </span>
          <SmartLink href="/panel" className="n8-ghost">
            Panel
          </SmartLink>
          <SmartLink href="/basla" className="n8-cta" onClick={() => gtm("nav_cta_click")}>
            Kurulumu Başlat
            <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
          </SmartLink>
        </div>

        <button
          type="button"
          ref={burgerRef}
          className="n8-burger"
          aria-label={sheet ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={sheet}
          aria-controls={sheet ? "n8-sheet" : undefined}
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
            id="n8-sheet"
            className="n8-sheet"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: reduce ? 0.01 : 0.26, ease: EASE }}
          >
            <div className="n8-sheet-in">
              {/* Masaüstündeki AÇIK şeridin mobil ikizi: aynı paper zemin,
                  aynı üç ülke, aynı mavi seçim hapı. Mega panel mobilde
                  açılmıyor ama "önce ülke" fikri aynen duruyor ve akordeona
                  sokulmuyor — çarşafın en çok kullanılan bölümü bu.
                  Tek fark rayın hap dizisi yerine üç eşit paya bölünmesi:
                  telefon genişliğinde satır içi diziliş sağa taşıyordu. */}
              <div className="n8-axis n8-axis-m">
                <span className="n8-axis-tag" id="n8-seg-lbl">
                  Hizmetler · önce ülke
                </span>

                <div className="n8-rail n8-rail-m" role="tablist" aria-labelledby="n8-seg-lbl">
                  {COUNTRY_ORDER.map((c) => (
                    <button
                      key={c}
                      type="button"
                      role="tab"
                      id={`n8-seg-${c}`}
                      ref={(el) => {
                        segs.current[c] = el;
                      }}
                      aria-selected={sheetCountry === c}
                      aria-controls="n8-seg-panel"
                      tabIndex={sheetCountry === c ? 0 : -1}
                      className="n8-ctry"
                      data-here={here === c}
                      onClick={() => setSheetCountry(c)}
                      onKeyDown={(e) => onSegKey(e, c)}
                    >
                      {sheetCountry === c && (
                        <motion.span
                          layoutId="n8-seg-pill"
                          className="n8-ctry-pill"
                          aria-hidden="true"
                          transition={reduce ? { duration: 0 } : { duration: 0.26, ease: EASE }}
                        />
                      )}
                      <span className="n8-ctry-flag" aria-hidden="true">
                        <Flag country={c} />
                      </span>
                      <span className="n8-ctry-n">{COUNTRY_NAME[c]}</span>
                      {here === c && <span className="n8-sr"> (şu an bu ülkedesiniz)</span>}
                    </button>
                  ))}
                </div>
              </div>

              <div
                className="n8-seg-panel"
                id="n8-seg-panel"
                role="tabpanel"
                aria-labelledby={`n8-seg-${sheetCountry}`}
              >
                {/* Masaüstündeki koyu künye kartının mobil karşılığı. Çarşafta
                    iki sütun yok, o yüzden kart tek satıra iniyor — ama koyu
                    olan yine SEÇİLİ ÜLKE KARTI, yani kural iki kırılımda da
                    aynı. Çarşaftaki tek koyu yüzey bu satır. */}
                <SmartLink href={`/${sheetCountry}`} className="n8-m-country" onClick={closeAll}>
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
                      <span key={u.slug} className="n8-m-row" data-dead="">
                        <span className="n8-m-ic" aria-hidden="true">
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
                      className="n8-m-row"
                      onClick={closeAll}
                    >
                      <span className="n8-m-ic" aria-hidden="true">
                        <Icon size={16} strokeWidth={2} />
                      </span>
                      {s.title}
                    </SmartLink>
                  );
                })}
              </div>

              <SmartLink href="/uygunluk-testi" className="n8-m-unsure" onClick={closeAll}>
                <Compass size={15} strokeWidth={2} aria-hidden="true" />
                Emin değilim, bana uygun olanı bulun
                <ArrowRight size={14} strokeWidth={2.2} aria-hidden="true" />
              </SmartLink>

              <div className="n8-m-acc">
                {TAIL.map((k) => {
                  const items = TAIL_ITEMS[k];
                  const on = sheetSec === k;
                  return (
                    <div key={k} className="n8-m-sec">
                      <button
                        type="button"
                        className="n8-m-top"
                        aria-expanded={on}
                        aria-controls={on ? `n8-m-${k}` : undefined}
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
                            id={`n8-m-${k}`}
                            initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                            animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                            transition={{ duration: reduce ? 0.01 : 0.22, ease: EASE }}
                            style={{ overflow: "hidden" }}
                          >
                            <div className="n8-m-body">
                              {items.map((t) => (
                                <SmartLink
                                  key={t.label}
                                  href={t.href}
                                  className="n8-m-row"
                                  onClick={closeAll}
                                >
                                  <span className="n8-m-ic" aria-hidden="true">
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

              <div className="n8-m-cta">
                <SmartLink href="/basla" className="n8-cta n8-cta-full" onClick={closeAll}>
                  Kurulumu Başlat
                  <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
                </SmartLink>
                <SmartLink href="/panel" className="n8-ghost n8-ghost-full" onClick={closeAll}>
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
            className="n8-scrim"
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
