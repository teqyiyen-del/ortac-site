"use client";

import SmartLink from "@/components/shared/SmartLink";
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
import { CHAIN } from "@/lib/brand";

/* ============================================================================
   Z7 — "Kuruluş bir halka, zincir devam ediyor" · ad alanı .z7-

   TARİHÇE UYARISI: aşağıda anılan Z4 (ve Z1–Z3, Z5) müşteri isteğiyle SİLİNDİ
   — bileşenleri de lab-z1…lab-z5.css de artık yok. Bu adlar depoda karşılığı
   olmayan tasarım kararlarına atıf; /lab/zincir'de kalan Z8 · Z7 · Z6.

   BU BİR YENİDEN TASARIM DEĞİL, HEDEFLİ ONARIM.
   Müşteri canlı bölümün kendisini beğeniyor ("açık ferah tasarıma dön") ve
   Z4'ün panelini reddediyor ("tüm sectionun bi box içinde olması hoşuma
   gitmedi"). Yani Z4'ten alınan şey KUTUCUK/SAYILABİLİRLİK mantığı, panel
   değil. Kabuk, tipografi, boşluk ve satır ritmi canlı bölümden birebir
   geliyor: sec-pad + container-o + sec-head, beyaz zemin, kutusuz liste,
   17px başlık + 13.5px cümle, satır hover'ı --paper, sağ üst ok.

   İKİ ŞİKÂYET, İKİ KARAR

   1) "Şirket kuruluşdaki siyah çizgi neden solda?"
      Canlı kodda SPLIT = 24: kuruluş çubuğu 0→%24, diğer dördü %24→%100.
      Niyet bir zaman ekseniydi ama ekseni ADLANDIRAN hiçbir şey yoktu; iki
      etiket (.lc-axis-a / .lc-axis-b) hiçbir yere tutunmadan çubukların
      üstünde duruyordu. Konum bu yüzden keyfi görünüyordu.
      Karar: yatay bölme kalkıyor, eksen adlandırılıyor.
        · Eksen artık ölçülü: "Kuruluştan itibaren · ilk 12 ay" ve altında
          1..12 ay numaraları. Kuruluşun solda oluşu artık bir tasarım
          tercihi değil, okunabilir bir olgu — 1. ay.
        · Canlı bölümün iki ekseni etiketi ("Tek seferlik" / "Süresiz devam
          eden") aynen korunuyor ama artık havada durmuyor: SATIRLARI
          etiketliyorlar. Bir kez olan iş üstte tek satır, süresiz devam eden
          dört iş mavi rayın altında. Bölümün cümlesi ("kuruluş bir halka,
          zincir devam ediyor") artık düzenin kendisinde.
      Yan fayda: CHAIN sırası hiç bozulmadı — kuruluş zaten ilk sırada, ayraç
      birinci satırdan sonra düşüyor. Z4 satırları sıklığa göre yeniden
      sıralıyordu; burada canlı satır ritmi korunduğu için buna gerek yok.

   2) "Çok soyut, neyi ifade ettiğini anlamaz insanlar."
      Canlı kodda sıklık çubuğun DOKUSUNA kodluydu (düz = sürekli, sık tırtık
      = dönemsel, seyrek tırtık = yenilemeli). Okumak için lejant çözmek
      gerekiyordu.
      Karar: sıklık sayılabilir bir MİKTAR oluyor — Z4'ün fikri. Bir yıl on
      iki kare, her kare bir ay, dolu kare o ay iş çıkıyor demek. Kimse lejant
      okumadan "bu daha sık" diyebiliyor.

   SIKLIK VERİSİ NEREDEN GELİYOR — hiçbir sayı uydurulmadı
   CHAIN'de sıklık yok; canlı bölüm onu kendi META tablosunda `kind` +
   `cadence` olarak taşıyor. Aşağıdaki `year` dizileri o gerçeğin sayılabilir
   karşılığı (Z4 ile birebir aynı çeviri, aynı gerekçeyle):
     kurulus  canlı "once"   / "Bir kez"          → 1. ayda tek kare, mürekkep
     banka    canlı "taper"  / "Açılış ve takip"  → 1 dolu kare + sönük takip
     muhasebe canlı "period" / "Dönemsel"         → 12 kare (afterSetup.ts,
              "Aylık Muhasebe Hizmeti", rhythm "aylik")
     uyum     canlı "solid"  / "Sürekli"          → 12 kare, ARALIKSIZ; sürekli
              olan iş sayılabilir bir olay değil, bitişik çizilince şerit hiç
              durmuyor gibi okunuyor
     oturum   canlı "renew"  / "Yenilemeli"       → dönem sonunda tek kare
   Sağdaki rakam elle yazılmıyor, dolu kareler SAYILARAK çıkıyor: resim ile
   yazının çelişmesi mümkün değil. Yenileme dönemi ülkeye ve izin tipine göre
   değiştiği için kesin süre en alttaki ince satırda açıkça belirsiz bırakılıyor.

   ANİMASYON — canlı bölümün açılışı aynen duruyor
   Canlı çubuk scaleX 0→1 ile soldan açılıyordu; aynı hareket şimdi şeridin
   kendisine uygulanıyor. Satır başına TEK motion düğümü (kare başına düğüm
   altmış düğüm ederdi), süreler de canlıdaki değerler: tek seferlik 0.5s,
   devam edenler 1.05s, gecikme 0.1 + i*0.12. Z4'ün örtü (wipe) çözümü bilerek
   alınmadı: örtü opak olmak zorunda ve canlı satırın hover zemini --paper —
   açılış sırasında hover eden kişi beyaz bir dilim görürdü. scaleX'in zemin
   sorunu yok, yani beğenilen hover davranışı olduğu gibi kalabiliyor.
   `reduce` yalnızca süreyi sıfırlıyor, RENDER EDİLEN ŞEYİ değiştirmiyor:
   sunucuda medya sorgusu yok, istemciye özel bir `initial` hidrasyonla
   çelişirdi (canlı dosyadaki not da bunu söylüyor).
   ========================================================================= */

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEW = { once: true, margin: "0px 0px -15% 0px" } as const;
const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

/** bir ayın durumu: iş yok · iş var · düşük seviye takip */
type Slot = "off" | "on" | "soft";

type Meta = {
  Icon: LucideIcon;
  href: string;
  /** on iki ay, soldan sağa — eksenin tamamı kuruluştan sonraki ilk yıl */
  year: Slot[];
  /** kareler bitişik çizilsin mi (yalnızca "sürekli" olan iş için) */
  join?: boolean;
  /** rakamın yanındaki birim; rakamın kendisi dolu karelerden hesaplanıyor */
  unit: string;
};

/** aynı durumu on iki ay boyunca tekrarlayan şerit */
const all = (s: Slot): Slot[] => MONTHS.map(() => s);
/** tek bir ayı işaretleyen şerit; geri kalanı verilen taban durum */
const one = (month: number, rest: Slot = "off"): Slot[] =>
  MONTHS.map((m) => (m === month ? "on" : rest));

/* İkonlar ve adresler canlı bölümün META'sıyla birebir aynı — brand.ts'te
   durmadıkları için burada tekrar yazılıyorlar, içerikleri değişmedi. */
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

/* Grup adları canlı bölümün eksen etiketlerinden birebir alındı
   (.lc-axis-a / .lc-axis-b). Tek fark: orada iki kelime bir çubuk ekseninin
   üstünde havada duruyordu, burada satırları etiketliyorlar. Alt cümle
   şeridin neden on iki ay olduğunu söylüyor — grubun kendisi tekrarlıyor. */
const GROUP_DEF = [
  {
    id: "once",
    label: "Tek seferlik",
    sub: "bir kez olur, biter",
    keys: ["kurulus"],
  },
  {
    id: "loop",
    label: "Süresiz devam eden",
    sub: "bu on iki ay her yıl yeniden başlıyor",
    keys: ["banka", "muhasebe", "uyum", "oturum"],
  },
];

type Row = {
  key: string;
  label: string;
  line: string;
  m: Meta;
  /** dolu kare sayısı — sağdaki rakamın tek kaynağı */
  n: number;
  /** listedeki mutlak sıra; şeritlerin açılma gecikmesi buradan */
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
    return { id: g.id, label: g.label, sub: g.sub, rows };
  });
}

const GROUPS = buildGroups();

export default function ChainZ7() {
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

        <div className="z7">
          {/* Tek cümlelik okuma sözleşmesi. Lejant değil: karelerin ne olduğunu
              zaten cetvel söylüyor, bu cümle yalnızca ekseni bağlıyor. */}
          <p className="z7-cap" aria-hidden="true">
            Şerit kuruluş anından başlıyor ve ilk on iki ayı gösteriyor: her kare bir ay,
            dolu kare o ay iş çıktığı anlamına geliyor.
          </p>

          {/* Cetvel. Canlı bölümdeki .lc-head'in yerinde ve aynı ızgarada, ama
              iki soyut kelime yerine ölçü taşıyor — "neden solda?" sorusunun
              cevabı burada: eksen kuruluş anından başlıyor. */}
          <div className="z7-head" aria-hidden="true">
            <span className="z7-hk">Kuruluştan itibaren · ilk 12 ay</span>
            <span className="z7-ticks">
              {MONTHS.map((m) => (
                <i key={m}>{m}</i>
              ))}
            </span>
            <span className="z7-hn">Yılda</span>
          </div>

          {GROUPS.map((g) => (
            <div className="z7-grp" key={g.id} data-g={g.id}>
              {/* Sayı elle yazılmıyor: "1 iş" / "4 iş" gruptaki satırlardan
                  çıkıyor, yani bölümün iddiası (bir halka / dört devam eden
                  iş) veriyle asla çelişemiyor. */}
              <p className="z7-gl">
                <span>{g.label}</span>
                <em>
                  {g.rows.length} iş · {g.sub}
                </em>
              </p>

              <ol className="z7-rows">
                {g.rows.map((r) => {
                  const { Icon, href, year, join } = r.m;
                  const once = g.id === "once";
                  /* Canlı bölümün süreleri birebir: tek seferlik iş kısa
                     açılıyor çünkü kısa; devam edenler uzun. reduce yalnızca
                     süreyi sıfırlıyor, `initial` her durumda aynı kalıyor. */
                  const dur = reduce ? 0 : once ? 0.5 : 1.05;
                  const delay = reduce ? 0 : 0.1 + r.i * 0.12;
                  return (
                    <li key={r.key}>
                      <SmartLink
                        href={href}
                        className="z7-row"
                        data-tone={once ? "once" : undefined}
                      >
                        <span className="z7-lab">
                          <span className="z7-t">
                            <Icon
                              className="z7-ic"
                              size={17}
                              strokeWidth={1.9}
                              aria-hidden="true"
                            />
                            {r.label}
                            <ArrowUpRight
                              className="z7-arrow"
                              size={15}
                              strokeWidth={2.1}
                              aria-hidden="true"
                            />
                          </span>
                          <span className="z7-l">{r.line}</span>
                        </span>

                        {/* Şerit ekran okuyucuya kapalı: taşıdığı bilgiyi
                            sağdaki rakam ve birim zaten kelimeyle söylüyor,
                            on iki boş kareyi tek tek okutmanın karşılığı yok
                            (aynı tercih CountryAfter'daki .aft-months'ta). */}
                        <span className="z7-strip" aria-hidden="true">
                          <motion.span
                            className="z7-slots"
                            data-join={join || undefined}
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={VIEW}
                            transition={{ duration: dur, delay, ease: EASE }}
                          >
                            {year.map((s, mi) => (
                              <i key={MONTHS[mi]} className="z7-s" data-v={s} />
                            ))}
                          </motion.span>
                        </span>

                        <span className="z7-cad">
                          <b className="z7-n">{r.n}</b>
                          <span className="z7-u">{r.m.unit}</span>
                        </span>
                      </SmartLink>
                    </li>
                  );
                })}
              </ol>
            </div>
          ))}
        </div>

        <FadeUp delay={0.4}>
          <p className="z7-note">
            Kategorideki firmaların çoğu ilk halkada bitiyor. Ceza da, sorun da sonrasında
            çıkıyor.
          </p>
          <p className="z7-fine">
            Şerit ilk on iki ayı gösteriyor; yenileme dönemleri ülkeye, lisansa ve izin
            tipine göre değişiyor.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
