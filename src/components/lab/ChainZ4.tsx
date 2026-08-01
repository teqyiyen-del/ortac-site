"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  Building2,
  CalendarCheck,
  IdCard,
  Landmark,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import SmartLink from "@/components/shared/SmartLink";
import { CHAIN } from "@/lib/brand";

/* ============================================================================
   Z4 — "Kuruluş bir halka, zincir devam ediyor" · dördüncü aday · ad alanı .z4-

   MÜŞTERİ NE DEDİ
   "Ne zamanda bir olduğunu görselleştirerek gösteriyorduk ya, şu anki sitede
   olan mantık iyiydi... şimdi yaptığında sadece ne zamanda bir olduğu sadece
   yazı olarak yazıyor. Bi şekilde bu durumu görselleştirmek istiyorum."

   Yani sıralama şu: canlı bölümün FİKRİ doğru (sıklığı görselleştiriyor),
   BİÇİMİ yanlış (sıklık çubuğun dokusuna kodlanmış — düz / sık tırtıklı /
   seyrek tırtıklı; okumak için lejant çözmek gerekiyor). Z1-Z3 ise sıklığı
   yazıya çevirip görselleştirmeyi tamamen kaybetti. Bu aday ikisinin arasını
   buluyor: sıklık yine GÖRSEL, ama okumak için hiçbir kod öğrenmek gerekmiyor.

   AÇI — SAYILABİLİR MİKTAR
   Sıklık dokuyla değil MİKTARLA gösteriliyor. Zaman ekseni bir yıl, on iki
   kare; her kare bir ay. Yılda bir olan iş bir kare, her ay olan iş on iki
   kare. Beş halka aynı eksenin üstünde, yani gözün yapması gereken tek şey
   uzunlukları karşılaştırmak — "bu daha sık"ı saymadan da görüyor.

   EV İÇİ EMSAL — src/components/country/CountryAfter.tsx (.aft-months). Orada
   sekiz yükümlülüğün her birinin yanında aynı on iki aylık şerit var: aylık iş
   12 dolu kare, üç aylık iş 4, yıllık iş 1. Bu dosya o dili kopyalamıyor ama
   aynı okunabilirlik sözleşmesini kullanıyor: kare = ay, dolu = o ay iş var.
   Şeridin altındaki açıklama cümlesi de oradan alındı (.aft-thead-c), çünkü
   sitenin aynı şeyi iki farklı cümleyle anlatması gerekmiyor.

   SIKLIK VERİSİ NEREDEN GELİYOR — hiçbir sayı uydurulmadı
   CHAIN'de sıklık yok; canlı bölüm (home/Chain.tsx) onu kendi META tablosunda
   `kind` + `cadence` olarak taşıyor. Aşağıdaki `year` dizileri o gerçeğin
   sayılabilir karşılığı, satır satır:

     kurulus  canlı: kind "once",   cadence "Bir kez"
              → 1 kare. Tekrarı yok; grup başlığı da "Tek seferlik" diyor.
     banka    canlı: kind "taper",  cadence "Açılış ve takip"
              → 1 dolu kare (açılış) + kalan aylar sönük ton (takip).
                Canlı çubuğun maskesi de aynı şeyi yapıyor: ilk %20 tam
                ağırlıkta, sonrası düşük ağırlıkta ama bitmiyor.
     muhasebe canlı: kind "period", cadence "Dönemsel" (sık tırtık)
              → 12 kare. "Dönemsel"in ay cinsinden karşılığı ev içinde yazılı:
                afterSetup.ts · "Aylık Muhasebe Hizmeti", rhythm "aylik",
                months [1..12]. Yani sıklık daraltılmadı, yalnızca canlı
                bölümün en sık ritmi sayıya çevrildi.
     uyum     canlı: kind "solid",  cadence "Sürekli"
              → 12 kare, ARALIKSIZ. Sürekli olan iş sayılabilir bir olay
                değil; kareler bitişik çizilince şerit hiç durmuyor gibi
                okunuyor. Sayı yine görünür (eksen 12 ay), ama biçim "bu
                tekrar etmiyor, hiç bitmiyor" diyor.
     oturum   canlı: kind "renew",  cadence "Yenilemeli" (seyrek tırtık)
              → 1 kare, dönemin sonunda. Canlı bölümdeki en seyrek tekrar bu
                ve sıralama korunuyor. Yenileme dönemi ülkeye ve izin tipine
                göre değişiyor (afterSetup'ta Dubai vizesi "iki-yillik"), o
                yüzden panonun altındaki ince satır bunu açıkça söylüyor —
                STANCE_LIMITS kesin süre taahhüdünü yasaklıyor.

   Sağdaki sayı elle yazılmıyor, `year` dizisindeki dolu kareler sayılarak
   çıkıyor: resim ile yazının çelişmesi mümkün değil.

   SATIR SIRASI CHAIN'İN SIRASI DEĞİL. CHAIN anlatı sırasında yazılmış
   (kuruluş → banka → muhasebe → uyum → oturum); burada süresiz devam eden
   dört iş sıklığa göre sıralı, çünkü bölümün iddiası artık sıklık. Aynı
   tercih afterSetup.ts'te de var (RHYTHM_ORDER: "önce bir kez olan, sonra
   sıklaşan"), gerekçesi de aynı: şerit monoton seyredince pano bir bakışta
   okunuyor. Halkaların ADI ve CÜMLESİ değişmedi, ikisi de CHAIN'den geliyor.
   ========================================================================= */

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEW = { once: true, margin: "0px 0px -15% 0px" } as const;
const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

/** bir ayın durumu: iş yok · iş var · düşük seviye takip */
type Slot = "off" | "on" | "soft";

type Meta = {
  Icon: LucideIcon;
  href: string;
  /** on iki ay, soldan sağa — eksenin tamamı bir yıl */
  year: Slot[];
  /** kareler bitişik çizilsin mi (yalnızca "sürekli" olan iş için) */
  join?: boolean;
  /** sayının yanındaki birim; sayının kendisi dolu karelerden hesaplanıyor */
  unit: string;
};

/** aynı durumu on iki ay boyunca tekrarlayan şerit */
const all = (s: Slot): Slot[] => MONTHS.map(() => s);
/** tek bir ayı işaretleyen şerit; geri kalanı boş */
const one = (month: number, rest: Slot = "off"): Slot[] =>
  MONTHS.map((m) => (m === month ? "on" : rest));

/* İkon ve adresler canlı bölümün META'sıyla birebir aynı — brand.ts'te
   durmadıkları için burada tekrar yazılıyorlar, içerikleri değiştirilmedi. */
const META: Record<string, Meta> = {
  kurulus: { Icon: Building2, href: "/dubai", year: one(1), unit: "kez" },
  banka: {
    Icon: Landmark,
    href: "/dubai/banka-hesabi",
    year: one(1, "soft"),
    unit: "açılış, sonrası takip",
  },
  muhasebe: {
    Icon: CalendarCheck,
    href: "/dubai/muhasebe",
    year: all("on"),
    unit: "kez · her ay",
  },
  uyum: {
    Icon: ShieldCheck,
    href: "/dubai/uyum",
    year: all("on"),
    join: true,
    unit: "ay · kesintisiz",
  },
  oturum: {
    Icon: IdCard,
    href: "/dubai/oturum-vize",
    year: one(12),
    unit: "yenileme",
  },
};

/* Grup adları canlı bölümün eksen etiketlerinden birebir alındı (.lc-axis-a /
   .lc-axis-b): "Tek seferlik" ve "Süresiz devam eden". Bölümün asıl cümlesi
   bu ayrımda — bir kez olan iş üstte tek satır, tekrar eden dört iş altta. */
const GROUP_DEF = [
  { id: "once", label: "Tek seferlik", keys: ["kurulus"] },
  { id: "loop", label: "Süresiz devam eden", keys: ["uyum", "muhasebe", "banka", "oturum"] },
];

type Row = {
  key: string;
  label: string;
  line: string;
  m: Meta;
  /** dolu kare sayısı — sağdaki rakamın tek kaynağı */
  n: number;
  /** panodaki mutlak sıra; şeritlerin açılma gecikmesi buradan */
  i: number;
};

/* CHAIN brand.ts'te yazılıyor ve bu dosya ona tip düzeyinde bağlı değil:
   bir anahtar değişirse o satır düşmeli, bölüm sayfayı götürmemeli. */
function buildGroups() {
  let i = 0;
  return GROUP_DEF.map((g) => {
    const rows: Row[] = [];
    for (const key of g.keys) {
      const c = CHAIN.find((x) => x.key === key);
      const m = META[key];
      if (!c || !m) continue;
      rows.push({
        key,
        label: c.label,
        line: c.line,
        m,
        n: m.year.filter((s) => s === "on").length,
        i,
      });
      i += 1;
    }
    return { id: g.id, label: g.label, rows };
  });
}

const GROUPS = buildGroups();

export default function ChainZ4() {
  const reduce = useReducedMotion();

  return (
    <section className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="sec-head">
          <SplitWords
            as="h2"
            text="Kuruluş bir halka, zincir devam ediyor."
            accent="zincir devam ediyor."
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.2}>
            <p className="sec-lead">Şirket kurulduktan sonra başlayan iş burada.</p>
          </FadeUp>
        </div>

        {/* Pano tek parça geliyor: beş satır ayrı ayrı belirirse karşılaştırma
            değil, sıralı bir liste okunur. Karşılaştırma aynı anda görünmeyi
            gerektiriyor. */}
        <FadeUp delay={0.15} y={18} className="z4-wrap">
          <div className="z4-panel">
            {/* Cetvel yalnızca geniş ekranda: dar ekranda satırlar alt alta
                iniyor ve tek bir üst cetvel hiçbir şeritle hizalanmıyor
                olurdu. Orada işi altındaki açıklama cümlesi yapıyor. */}
            <div className="z4-ruler" aria-hidden="true">
              <span className="z4-ruler-k">Bir yıl</span>
              <span className="z4-ticks">
                {MONTHS.map((m) => (
                  <i key={m}>{m}</i>
                ))}
              </span>
              <span className="z4-ruler-n">Yılda</span>
            </div>

            <p className="z4-cap" aria-hidden="true">
              Şerit bir yılı gösteriyor: her kare bir ay, dolu kare o ay iş çıktığı
              anlamına geliyor.
            </p>

            {GROUPS.map((g) => (
              <div className="z4-grp" key={g.id} data-g={g.id}>
                <p className="z4-gl">
                  <span>{g.label}</span>
                  <em>{g.rows.length} iş</em>
                </p>

                <ol className="z4-rows">
                  {g.rows.map((r) => {
                    const { Icon, href, year, join } = r.m;
                    const once = g.id === "once";
                    return (
                      <li key={r.key}>
                        <SmartLink href={href} className="z4-row" data-tone={once ? "once" : undefined}>
                          <span className="z4-lab">
                            <span className="z4-chip" aria-hidden="true">
                              <Icon size={17} strokeWidth={1.8} />
                            </span>
                            <span className="z4-txt">
                              <span className="z4-t">
                                {r.label}
                                <ArrowUpRight
                                  className="z4-arrow"
                                  size={14}
                                  strokeWidth={2.1}
                                  aria-hidden="true"
                                />
                              </span>
                              <span className="z4-l">{r.line}</span>
                            </span>
                          </span>

                          {/* Şerit ekran okuyucuya kapalı: taşıdığı bilgiyi
                              sağdaki sayı ve birim zaten kelimeyle söylüyor,
                              on iki boş kareyi tek tek okutmanın karşılığı yok
                              (aynı tercih CountryAfter'daki .aft-months'ta). */}
                          <span className="z4-strip" aria-hidden="true">
                            <span className="z4-slots" data-join={join || undefined}>
                              {year.map((s, mi) => (
                                <i key={MONTHS[mi]} className="z4-s" data-v={s} />
                              ))}
                            </span>
                            {/* Şerit soldan sağa açılıyor: yıl ilerledikçe
                                kareler doluyor. Tek bir örtü elemanı geri
                                çekiliyor — kare başına bir animasyon düğümü
                                kurmak altmış düğüm ederdi ve gözle görülen
                                fark sıfır olurdu.
                                `initial` hareket azaltmada da aynı kalıyor,
                                yalnızca süre sıfırlanıyor: sunucuda medya
                                sorgusu yok, istemciye özel bir başlangıç
                                durumu hidrasyonla çelişirdi. */}
                            <motion.span
                              className="z4-wipe"
                              initial={{ scaleX: 1 }}
                              whileInView={{ scaleX: 0 }}
                              viewport={VIEW}
                              transition={{
                                duration: reduce ? 0 : 0.8,
                                delay: reduce ? 0 : 0.15 + r.i * 0.1,
                                ease: EASE,
                              }}
                            />
                          </span>

                          <span className="z4-cad">
                            <b className="z4-n">{r.n}</b>
                            <span className="z4-u">{r.m.unit}</span>
                          </span>
                        </SmartLink>
                      </li>
                    );
                  })}
                </ol>
              </div>
            ))}
          </div>

          <p className="z4-note">
            Kategorideki firmaların çoğu ilk halkada bitiyor. Ceza da, sorun da sonrasında
            çıkıyor.
          </p>
          <p className="z4-fine">
            Şerit ilk on iki ayı gösteriyor; yenileme dönemleri ülkeye, lisansa ve izin
            tipine göre değişiyor.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
