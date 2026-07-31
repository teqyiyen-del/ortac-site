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
import { servicesFor, type Service, type ServiceSlug } from "@/lib/services";

/* ============================================================================
   N4 — "AÇIK PANEL"                            (stil: app/css/lab-n4.css)

   N1'in TEZİ AYNEN DURUYOR
   Menünün birinci ekseni ülke. Çubukta dört klasik başlık var (Hizmetler ·
   Araçlar · Kaynaklar · Kurumsal), ülke rayı Hizmetler panelinin ilk satırı,
   rayın altında seçili ülkenin brifingi ve o ülkede gerçekten yürüttüğümüz
   hizmetler. Ziyaretçi bir hizmet adına tıklamadan önce mutlaka bir ülkenin
   içinden geçiyor. Bu varyasyon o hiyerarşiye dokunmuyor; değiştirdiği şey
   panelin YÜZEYİ.

   ---------------------------------------------------------------------------
   TEŞHİS — "sağdaki siyah kısımlar çok kaba duruyor" şikâyeti neyin şikâyeti?

   Müşterinin rahatsız olduğu şey siyahın kendisi değil, dört ayrı ölçü hatası:

   1) KÜTLE. N1'de .n1-id, panelin sol sütununda 320px genişliğinde ve panel
      boyunca tam yükseklikte opak bir #111111 levha — panel alanının yaklaşık
      üçte biri. Bu ölçekte siyah artık bir vurgu değil, İKİNCİ BİR ZEMİN.
      Panel tek bir levha gibi değil, birbirine yapıştırılmış iki belge gibi
      okunuyor. Kabalık dediği şey büyük ölçüde bu oran.

   2) KENAR. Levha panelin dış kenarına dayanıyor. Yani 21:1 kontrastlı sert
      bir dikdörtgen, panelin 1px saç teli çizgisiyle ve 28px yumuşak
      köşesiyle yan yana geliyor. Göz önce siyah dikdörtgeni görüyor, panelin
      kendi biçimi kayboluyor — panel siyah bloğu "çerçeveleyen" bir şeye
      dönüşüyor.

   3) TERS AĞIRLIK. En koyu, en ağır yüzey en az tıklanabilir içeriği taşıyor
      (üç künye satırı ve bir sınır cümlesi). Asıl gezinme — hizmet kartları —
      sessiz beyazın üstünde duruyor. Görsel ağırlık eylemin tersine işaret
      ediyor; bu da "gereksiz yere bağırıyor" hissi veriyor.

   4) TEKRAR. Aynı #111111 dolgusu altı ayrı rolde geri geliyor: ülke künyesi,
      öne çıkan kaynak kartı, duruş kartı, panel eteğindeki güçlü buton, mobil
      ülke satırı, mobil segment seçimi. Altı farklı iş aynı azami-kontrast
      üniformasını giyince koyuluk bir anlam taşımayı bırakıyor, sadece
      gürültü oluyor.

   ÇÖZÜM — panelden koyu yüzey tamamen kalkıyor
   Kütle problemine en dürüst cevap kütleyi kaldırmak. Hiyerarşiyi üç açık ton
   taşıyor: beyaz (kart), paper (zemin bandı ve künye), blue-100 (vurgu). Bir
   de tek bir amber kuyusu: ülkenin dürüst sınırı. Amber zaten sitede "dikkat"
   rengi (mobil sınır kutusu böyleydi) ve koyu griden çok daha net konuşuyor —
   yani sınır cümlesi koyu yüzeyi kaybederken görünürlüğünü kaybetmiyor,
   artırıyor.

   Peki eksen ağırlığını nasıl koruyor? Dolguyla değil, ÖLÇÜ VE KONUMLA:
   ülke rayı artık panelin tepesinde kendi paper bandına oturan, panel
   genişliğini üçe bölen iki satırlı bir sekme şeridi. Seçili ülke bandın
   içinden beyaz bir kart olarak yukarı kalkıyor ve altında mavi bir omurga
   çizgisi taşıyor. Yani "önce ülke" cümlesini artık siyah bir levha değil,
   panelin en büyük ve en üstteki bileşeni söylüyor. Koyu blok gitti, eksen
   büyüdü.

   ---------------------------------------------------------------------------
   CANLI NAVBAR'DAN ALINAN: KART DÜZENİ
   Müşteri canlı navbar'ın kartlarını, özellikle Araçlar bölümünü beğeniyor.
   .n4-card birebir o kalıp: 1px çerçeveli beyaz kart, içinde çerçeveli kare
   ikon kutusu, hover'da çerçeve maviye dönüyor, ikon kutusu maviye doluyor ve
   kart 1px kalkıyor. Araçlar paneli de canlıdaki gibi tek sırada dört kart.
   N1'in dolgusuz, çerçevesiz, yalnızca hover'da grileşen karolarının yerine
   bu geçti: açık zeminde kartı ayakta tutan şey dolgu değil çerçeve.

   HİZMET AÇIKLAMALARI ELLE YAZILMIYOR
   N1'de kartların alt satırı elle yazılmış bir tabloydu. Burada services.ts'in
   includes dizisinden türüyor (bkz. hintOf). Kazanç şu: bir ülkenin kapsamı
   değişince menü de kendiliğinden değişiyor ve satır ülkeye göre gerçekten
   farklılaşıyor — Dubai bankasında "Wio · Mashreq NeoBiz", İngiltere'de
   "Wise · Revolut Business" yazıyor, kimse iki yerde birden güncellemiyor.

   YOKLUK GÖRÜNÜR
   Izgara üç ülkenin hizmet listelerinin BİRLEŞİMİ üzerinden basılıyor. Seçili
   ülkede karşılığı olmayan kart kesik çizgili ve tıklanamaz olarak yerinde
   duruyor: İngiltere'ye geçtiğinizde "Vize ve oturum" kaybolmuyor,
   "İngiltere için yürütmüyoruz" diyor. Kaybolan bilgi okunmuyor.

   YAYINDA OLMAYAN ADRESLER
   Hiçbir yerde "bu sayfa var mı" kararı vermiyoruz; bütün bağlantılar
   SmartLink. Yayında olmayan girdi sönük ve tıklanamaz oluyor, rozet
   basılmıyor — bu dosyada da, lab-n4.css'te de "yakında" diye bir işaret
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
   - Escape kapatır, odağı tetikleyiciye geri verir. Odak tuzağı yok.
   - Ülke sekmeleri hover ile DEĞİŞMİYOR: ray, başlıktan panele inen imlecin
     güzergâhında duruyor; hover ile seçseydik ziyaretçi hedefine giderken
     istemeden ülke değiştirirdi. (Canlı navbar bu hatayı yapıyor.)

   MOBİL
   Mega panel mobilde açılmıyor. Karşılığı çarşafın tepesinde: aynı paper
   bandı, aynı üç ülkelik sekme şeridi, aynı beyaz seçim kartı. Masaüstüyle
   aynı dil, aynı adlandırma; sadece iki satır tek satıra iniyor.
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
   birleştiriliyor → "Defter tutma · KDV beyanı". Eşiği sabitlemek yerine
   elle yazılmış bir tablo tutmak da mümkündü; tercih etmedim, çünkü o tablo
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
/* Canlı navbar'ın .nv2-card kalıbı. Çerçeveli beyaz kart + çerçeveli ikon
   kutusu; hover'da ikisi birden maviye dönüyor. Açık zeminde kartı ayakta
   tutan şey dolgu değil çerçeve — koyu bloklar kalkınca bu fark kritik. */
function CardLink({ t, onGo }: { t: Tile; onGo: () => void }) {
  return (
    <SmartLink href={t.href} className="n4-card" onClick={onGo}>
      <span className="n4-ic" aria-hidden="true">
        <t.icon size={18} strokeWidth={1.9} />
      </span>
      <span className="n4-card-tx">
        <b>{t.label}</b>
        <em>{t.hint}</em>
      </span>
    </SmartLink>
  );
}

/* ------------------------------------------------------- HİZMETLER paneli */
/* Panelin iki katı var: üstte paper bandına oturan ülke şeridi, altında seçili
   ülkenin künyesi ve hizmet ızgarası. Ülke değişince yalnızca alt kat
   yenileniyor; şerit ve odak yerinde kalıyor, yani ok tuşlarıyla üç ülkeyi
   tarayıp karşılaştırmak mümkün. */
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
    <div className="n4-svcp">
      {/* EKSEN BANDI — N4'ün asıl hamlesi burada.
          N1'de eksen, panelin içinde ince bir hap rayıydı ve ağırlık siyah
          künye levhasındaydı. Burada tam tersi: levha yok, eksen panelin en
          üstünde kendi zemin bandına oturmuş, panel genişliğini üçe bölen bir
          sekme şeridi. Ağırlığı dolgudan değil ölçüden alıyor. */}
      <div className="n4-axis">
        <div className="n4-axis-head">
          <span className="n4-axis-tag" id="n4-axis-lbl">
            Önce ülke
          </span>
          <span className="n4-axis-note">Aşağıdaki her şey seçtiğiniz ülkeye göre değişiyor</span>
        </div>

        <div className="n4-rail" role="tablist" aria-labelledby="n4-axis-lbl">
          {COUNTRY_ORDER.map((k) => (
            <button
              key={k}
              type="button"
              role="tab"
              id={`n4-tab-${k}`}
              ref={(el) => {
                tabs.current[k] = el;
              }}
              className="n4-ctry"
              aria-selected={c === k}
              aria-controls="n4-cty-panel"
              tabIndex={c === k ? 0 : -1}
              data-pfocus={c === k ? "" : undefined}
              onClick={() => onPick(k)}
              onKeyDown={onTabKey}
            >
              {/* Seçim, bandın içinden kalkan beyaz bir kart. layoutId ile üç
                  sekme arasında kayıyor: kayma hareketi "seçim değişti" diyor,
                  üç ayrı yanıp sönen kutudan daha sakin. Kartın altındaki mavi
                  çizgi (CSS ::after) sekmeyi aşağıdaki içeriğe bağlıyor —
                  klasör sekmesi metaforu, koyu dolguya gerek kalmadan. */}
              {c === k && (
                <motion.span
                  layoutId="n4-rail-card"
                  className="n4-ctry-card"
                  aria-hidden="true"
                  transition={reduce ? { duration: 0 } : { duration: 0.28, ease: EASE }}
                />
              )}
              <span className="n4-ctry-flag" aria-hidden="true">
                <Flag country={k} />
              </span>
              <span className="n4-ctry-tx">
                <b>{COUNTRY_NAME[k]}</b>
                <em>{FACTS[k].tag}</em>
              </span>
              {here === k && (
                <>
                  <span className="n4-ctry-here" aria-hidden="true" />
                  <span className="n4-sr"> (şu an bu ülkedesiniz)</span>
                </>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="n4-body" id="n4-cty-panel" role="tabpanel" aria-labelledby={`n4-tab-${c}`}>
        <motion.div
          key={c}
          className="n4-cty"
          initial={reduce ? false : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.18, ease: EASE }}
        >
          {/* KÜNYE — N1'de bu blok #111111 levhaydı. Şimdi paper zeminli,
              çerçeveli bir kart: aynı bilgi, aynı yer, üçte bir kütle. Sütun
              hâlâ ayrı bir şey olduğunu söylüyor (zemin farkı + çerçeve), ama
              artık panelin içinde ikinci bir zemin açmıyor. */}
          <div className="n4-brief">
            <div className="n4-brief-top">
              <span className="n4-brief-flag" aria-hidden="true">
                <Flag country={c} />
              </span>
              <span className="n4-brief-tx">
                <b>{COUNTRY_NAME[c]}</b>
                <em>{COUNTRY_LINE[c]}</em>
              </span>
            </div>

            <dl className="n4-facts">
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

            {/* Dürüst sınır menüde de görünüyor: ziyaretçiyi eleyen bilgi
                tıklamadan sonra değil, tıklamadan önce durmalı. Koyu gri kuyu
                yerine amber — sitenin "dikkat" rengi zaten bu ve açık zeminde
                koyu griden çok daha net konuşuyor. */}
            <p className="n4-limit">
              <TriangleAlert size={14} strokeWidth={2.1} aria-hidden="true" />
              {f.limit}
            </p>

            <SmartLink href={`/${c}`} className="n4-brief-go" onClick={onGo}>
              {COUNTRY_NAME[c]} ülke sayfası
              <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
            </SmartLink>
          </div>

          <div className="n4-svc">
            <p className="n4-h">{COUNTRY_NAME[c]} için yürüttüğümüz hizmetler</p>

            <div className="n4-grid" data-cols={2}>
              {SERVICE_UNIVERSE.map((u) => {
                const s = own.get(u.slug);
                const Icon = SVC_ICON[u.slug];

                /* Yokluk sessiz kalmıyor. Kart yerinde duruyor, kesik çizgili
                   ve tıklanamaz; hangi ülkede yürütmediğimizi söylüyor.
                   [data-soon] ile karıştırılmamalı: o bir söz ("sayfa gelecek"),
                   bu bir sınır ("bu ülkede bu işi yapmıyoruz"). */
                if (!s) {
                  return (
                    <span key={u.slug} className="n4-card" data-dead="">
                      <span className="n4-ic" aria-hidden="true">
                        <Icon size={18} strokeWidth={1.9} />
                      </span>
                      <span className="n4-card-tx">
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
                    className="n4-card"
                    onClick={onGo}
                  >
                    <span className="n4-ic" aria-hidden="true">
                      <Icon size={18} strokeWidth={1.9} />
                    </span>
                    <span className="n4-card-tx">
                      <b>{s.title}</b>
                      <em>{hintOf(s)}</em>
                    </span>
                  </SmartLink>
                );
              })}
            </div>

            {/* Ülke-önce bir menünün ödemesi gereken bedel: henüz karar
                veremeyene çıkış. İki bağlantı da yayında. N1'de sağdaki buton
                siyah dolguluydu (aynı #111111 ailesinden); burada mavi-100 —
                aynı vurgu, bağırmadan. */}
            <div className="n4-foot">
              <span className="n4-foot-q">
                <Compass size={15} strokeWidth={2} aria-hidden="true" />
                Hangi ülke size uyuyor, emin değil misiniz?
              </span>
              <span className="n4-foot-a">
                <SmartLink href="/ulkeler" className="n4-foot-l" onClick={onGo}>
                  Üçünü yan yana görün
                </SmartLink>
                <SmartLink
                  href="/uygunluk-testi"
                  className="n4-foot-l"
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
function TailPanel({ k, onGo }: { k: TopKey; onGo: () => void }) {
  /* ARAÇLAR — canlı navbar'ın en beğenilen düzeni: tek sırada dört kart, panel
     genişliğinde. Bölünmüş kolon ve öne çıkan koyu kart yok; dört araç eşit
     ağırlıkta ve hangisinin yayında olduğunu sönüklük söylüyor. */
  if (k === "araclar") {
    return (
      <div className="n4-tail">
        <p className="n4-h">Karar vermeden önce çalıştırabileceğiniz araçlar</p>
        <div className="n4-grid" data-cols={4}>
          {TOOLS.map((t) => (
            <CardLink key={t.label} t={t} onGo={onGo} />
          ))}
        </div>
        <p className="n4-note">
          Araçların çıktısı bir ön değerlendirmedir, teklif değildir. Sonucu birlikte gözden
          geçiriyoruz.
        </p>
      </div>
    );
  }

  /* KAYNAKLAR — canlıdaki gibi: solda liste, sağda öne çıkan kartlar. Öne
     çıkanlar canlı navbar'da da açık zeminliydi (paper + çerçeve, hover'da
     mavi); N1 bunları koyulaştırmıştı, geri alındı. */
  if (k === "kaynaklar") {
    return (
      <div className="n4-tail n4-split">
        <div>
          <p className="n4-h">Okumalık ve indirilebilir kaynaklar</p>
          <div className="n4-grid" data-cols={1}>
            {RESOURCES.map((t) => (
              <CardLink key={t.label} t={t} onGo={onGo} />
            ))}
          </div>
        </div>
        <div>
          <p className="n4-h">Öne çıkanlar</p>
          <div className="n4-feat">
            {FEATURED.map((f) => (
              <SmartLink key={f.title} href={f.href} className="n4-feat-c" onClick={onGo}>
                <span className="n4-feat-tag">{f.tag}</span>
                <span className="n4-feat-t">{f.title}</span>
                <span className="n4-feat-m">{f.meta}</span>
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
    <div className="n4-tail n4-split">
      <div>
        <p className="n4-h">Kurumsal</p>
        <div className="n4-grid" data-cols={1}>
          {CORPORATE.map((t) => (
            <CardLink key={t.label} t={t} onGo={onGo} />
          ))}
        </div>
        <p className="n4-note">
          <span className="n4-note-k">Resmî iş ortaklarımız</span>
          {OFFICIAL}
        </p>
      </div>

      <div>
        <p className="n4-h">Söz vermediklerimiz</p>
        <SmartLink href={CORP_LEAD.href} className="n4-stance" onClick={onGo}>
          <span className="n4-stance-h">
            <Scale size={15} strokeWidth={2} aria-hidden="true" />
            {CORP_LEAD.label}
          </span>
          <span className="n4-stance-l">
            {STANCE_LIMITS.map((s) => (
              <span key={s.title}>{s.title}</span>
            ))}
          </span>
          <span className="n4-stance-go">
            Tamamını okuyun
            <ArrowRight size={14} strokeWidth={2.2} aria-hidden="true" />
          </span>
        </SmartLink>
      </div>
    </div>
  );
}

/* ==================================================================== navbar */
export default function NavN4() {
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
      className="n4"
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
      <div className="container-o n4-bar">
        <SmartLink href="/" aria-label="Ortac Global" className="n4-logo" onClick={closeAll}>
          <Logo height={24} />
        </SmartLink>

        <nav className="n4-nav" aria-label="Ana menü">
          {TOP.map((k) => {
            /* Ülke adları çubukta değil (müşteri dört kategori istedi), ama
               "buradasınız" bilgisi kaybolmasın: bir ülke sayfasındaysanız
               Hizmetler başlığının yanında o ülkenin küçük bayrağı beliriyor.
               N1 burada nötr bir mavi nokta kullanıyordu; bayrak aynı işi
               yapıyor ve üstelik menünün ekseninin ülke olduğunu çubuk
               kapalıyken de söylüyor. Hangi ülke olduğunu ekran okuyucuya
               .n4-sr yazıyor. */
            const marked = k === "hizmetler" && here !== null;
            return (
              <button
                key={k}
                type="button"
                ref={(el) => {
                  triggers.current[k] = el;
                }}
                className="n4-top"
                data-on={open === k}
                aria-expanded={open === k}
                aria-controls={open === k ? "n4-mega" : undefined}
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
                    <span className="n4-top-flag" aria-hidden="true">
                      <Flag country={here} />
                    </span>
                    <span className="n4-sr"> — şu an {COUNTRY_NAME[here]} sayfasındasınız</span>
                  </>
                )}
                <ChevronDown className="n4-chev" size={13} strokeWidth={2.4} aria-hidden="true" />
              </button>
            );
          })}
        </nav>

        {/* Panel DOM'da menü ile sağ blok arasında: klavyeyle panelden çıkan
            odak doğal olarak CTA'ya düşüyor, sayfanın başına dönmüyor. */}
        <AnimatePresence>
          {open !== null && (
            <motion.div
              id="n4-mega"
              ref={panelRef}
              className="n4-panel"
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

        <div className="n4-right">
          <span className="n4-lang" role="group" aria-label="Dil">
            <button type="button" data-on="" aria-pressed="true">
              TR
            </button>
            <button type="button" aria-pressed="false" aria-disabled="true" title="Yakında">
              EN
            </button>
          </span>
          <SmartLink href="/panel" className="n4-ghost">
            Panel
          </SmartLink>
          <SmartLink href="/basla" className="n4-cta" onClick={() => gtm("nav_cta_click")}>
            Kurulumu Başlat
            <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
          </SmartLink>
        </div>

        <button
          type="button"
          ref={burgerRef}
          className="n4-burger"
          aria-label={sheet ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={sheet}
          aria-controls={sheet ? "n4-sheet" : undefined}
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
            id="n4-sheet"
            className="n4-sheet"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: reduce ? 0.01 : 0.26, ease: EASE }}
          >
            <div className="n4-sheet-in">
              {/* Masaüstündeki eksen bandının mobil ikizi: aynı paper zemin,
                  aynı üç sekme, aynı beyaz seçim kartı. Mega panel mobilde
                  açılmıyor ama "önce ülke" fikri aynen duruyor ve akordeona
                  sokulmuyor — çarşafın en çok kullanılan bölümü bu. */}
              <div className="n4-axis n4-axis-m">
                <div className="n4-axis-head">
                  <span className="n4-axis-tag" id="n4-seg-lbl">
                    Hizmetler · önce ülke
                  </span>
                </div>

                <div className="n4-rail n4-rail-m" role="tablist" aria-labelledby="n4-seg-lbl">
                  {COUNTRY_ORDER.map((c) => (
                    <button
                      key={c}
                      type="button"
                      role="tab"
                      id={`n4-seg-${c}`}
                      ref={(el) => {
                        segs.current[c] = el;
                      }}
                      aria-selected={sheetCountry === c}
                      aria-controls="n4-seg-panel"
                      tabIndex={sheetCountry === c ? 0 : -1}
                      className="n4-ctry"
                      onClick={() => setSheetCountry(c)}
                      onKeyDown={(e) => onSegKey(e, c)}
                    >
                      {sheetCountry === c && (
                        <motion.span
                          layoutId="n4-seg-card"
                          className="n4-ctry-card"
                          aria-hidden="true"
                          transition={reduce ? { duration: 0 } : { duration: 0.28, ease: EASE }}
                        />
                      )}
                      <span className="n4-ctry-flag" aria-hidden="true">
                        <Flag country={c} />
                      </span>
                      <span className="n4-ctry-tx">
                        <b>{COUNTRY_NAME[c]}</b>
                      </span>
                      {here === c && (
                        <>
                          <span className="n4-ctry-here" aria-hidden="true" />
                          <span className="n4-sr"> (şu an bu ülkedesiniz)</span>
                        </>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div
                className="n4-seg-panel"
                id="n4-seg-panel"
                role="tabpanel"
                aria-labelledby={`n4-seg-${sheetCountry}`}
              >
                <SmartLink href={`/${sheetCountry}`} className="n4-m-country" onClick={closeAll}>
                  <span>
                    <b>{COUNTRY_NAME[sheetCountry]} ülke sayfası</b>
                    <em>{FACTS[sheetCountry].structure}</em>
                  </span>
                  <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
                </SmartLink>

                {/* Masaüstündeki ızgarayla aynı kural: liste birleşim üzerinden
                    basılıyor, o ülkede olmayan hizmet satırı kaybolmuyor,
                    "yürütmüyoruz" diyor. */}
                {SERVICE_UNIVERSE.map((u) => {
                  const s = sheetOwn.get(u.slug);
                  const Icon = SVC_ICON[u.slug];
                  if (!s) {
                    return (
                      <span key={u.slug} className="n4-m-row" data-dead="">
                        <span className="n4-m-ic" aria-hidden="true">
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
                      className="n4-m-row"
                      onClick={closeAll}
                    >
                      <span className="n4-m-ic" aria-hidden="true">
                        <Icon size={16} strokeWidth={2} />
                      </span>
                      {s.title}
                    </SmartLink>
                  );
                })}

                <p className="n4-limit n4-limit-m">
                  <TriangleAlert size={13} strokeWidth={2.1} aria-hidden="true" />
                  {FACTS[sheetCountry].limit}
                </p>
              </div>

              <SmartLink href="/uygunluk-testi" className="n4-m-unsure" onClick={closeAll}>
                <Compass size={15} strokeWidth={2} aria-hidden="true" />
                Emin değilim, bana uygun olanı bulun
                <ArrowRight size={14} strokeWidth={2.2} aria-hidden="true" />
              </SmartLink>

              <div className="n4-m-acc">
                {TAIL.map((k) => {
                  const items = TAIL_ITEMS[k];
                  const on = sheetSec === k;
                  return (
                    <div key={k} className="n4-m-sec">
                      <button
                        type="button"
                        className="n4-m-top"
                        aria-expanded={on}
                        aria-controls={on ? `n4-m-${k}` : undefined}
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
                            id={`n4-m-${k}`}
                            initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                            animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                            transition={{ duration: reduce ? 0.01 : 0.22, ease: EASE }}
                            style={{ overflow: "hidden" }}
                          >
                            <div className="n4-m-body">
                              {items.map((t) => (
                                <SmartLink
                                  key={t.label}
                                  href={t.href}
                                  className="n4-m-row"
                                  onClick={closeAll}
                                >
                                  <span className="n4-m-ic" aria-hidden="true">
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

              <div className="n4-m-cta">
                <SmartLink href="/basla" className="n4-cta n4-cta-full" onClick={closeAll}>
                  Kurulumu Başlat
                  <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
                </SmartLink>
                <SmartLink href="/panel" className="n4-ghost n4-ghost-full" onClick={closeAll}>
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
            className="n4-scrim"
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
