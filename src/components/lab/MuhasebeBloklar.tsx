import {
  ArrowRight,
  BookOpen,
  Building2,
  CalendarCheck,
  ChartColumn,
  FileStack,
  FolderOpen,
  Landmark,
  Quote,
  Receipt,
  SlidersHorizontal,
  Stamp,
  Users,
  Wallet,
  X,
  type LucideIcon,
} from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import SmartLink from "@/components/shared/SmartLink";
import { RHYTHM_LABEL, type Inclusion } from "@/lib/afterSetup";
import {
  accountingItems,
  ACC_EXCLUDES,
  ACC_PRICE_FOOTNOTE,
  ACCOUNTING_DUBAI,
  type AccIcon,
} from "@/lib/accountingDubai";
import { ARTI, FIYAT, KAPSAM, KARSILIK } from "@/app/lab/muhasebe/veri";

/* Muhasebe sayfasının bölümleri. Brif, gerekçe ve neyin neden gittiği
   app/lab/muhasebe/veri.ts'in başında; burada yalnız işaretleme var.

   11.09.2026 · İKİ BÖLÜM KENDİ LAB TURUNDAN BURAYA TAŞINDI: kapsam (K1,
   eski /lab/muhasebe-kapsam · KapsamAdaylar.tsx) ve karşılık (F3, eski
   /lab/muhasebe-fayda · FaydaAdaylar.tsx). İki tur da kazananı taşındıktan
   sonra silindi; kaybeden adaylar (K2 · K3 · G1 · G2 · G3) git'te, abfd4be. */

const ARTI_IKON = [Stamp, Users, FolderOpen, Building2];

/* ROZET BU SAYFAYA AİT, PAYLAŞILAN ETİKET DEĞİL.
   afterSetup.ts'in INCLUSION_LABEL'ı "İlk yıl toplamında" diyor ve o etiket
   /dubai'deki ÖRNEK HESABA işaret ediyor. O hesap bu sayfada yok; üstelik
   bölümün kendi lead'i "tek bir toplam yazmıyoruz" diyor, yani canlı sayfada
   üç satır hemen üstündeki cümleyle çelişen bir rozet taşıyor. Buradaki üç
   etiket aynı veriyi bu sayfanın sorusuna göre okuyor; veri değişmedi. */
const ROZET: Record<Inclusion, string> = {
  ornekte: "Herkeste doğuyor",
  "gerekli-ise": "Gerekli ise",
  "istege-bagli": "İsteğe bağlı",
};

/* Canlı sayfanın biçimlendiricisiyle birebir aynı (page.tsx:465). */
const nf = new Intl.NumberFormat("tr-TR");
function priceText(p: { usd: number; plusVat: boolean; qualifier?: string }) {
  return `${p.qualifier ? `${p.qualifier} ` : ""}${nf.format(p.usd)} USD${p.plusVat ? " + KDV" : ""}`;
}

/* ------------------------------------------------------------------ 1 · ARTI */
export function MuhasebeArti() {
  return (
    <section id={ARTI.id} className="sec-pad lmh-sec">
      <div className="container-o">
        <div className="sec-head">
          <SplitWords as="h2" text={ARTI.heading} accent={ARTI.accent} className="h2" />
        </div>
        <ul className="lmh-karo">
          {ARTI.items.map((k, i) => {
            const Icon = ARTI_IKON[i];
            return (
              <FadeUp key={k.t} delay={0.06 + i * 0.05}>
                <li>
                  <Icon size={22} strokeWidth={1.9} aria-hidden="true" />
                  <b>{k.t}</b>
                  <span>{k.s}</span>
                </li>
              </FadeUp>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- 2 · ALINTI */
/* Müşteri: "sonra murat abinin alıntısını koyarız full genişlikte fln."
   Gece bant: sayfanın tek insan sesi ve tek tam genişlik bloğu, o yüzden
   aynı zamanda ritmin dönüm noktası. Metin canlı veriden, değişmedi.

   BU TUR SOLA YASLANDI ("onu sola daya"). İŞARETLEME DEĞİŞMEDİ: sıra hâlâ
   tırnak simgesi → gövde → künye, çünkü künyenin gövdenin ALTINDA kalması
   bilinçli bir karar (gerekçe css/lab-muhasebe.css · .lmh-alinti). Bant tam
   genişlik gece olmaya devam ediyor; yaslanan şey bandın içindeki figure. */
export function MuhasebeAlinti() {
  const q = ACCOUNTING_DUBAI.ortac.quote;
  return (
    <section className="lmh-alinti">
      <div className="container-o">
        <FadeUp>
          <figure>
            <Quote size={30} strokeWidth={1.6} aria-hidden="true" />
            <blockquote>{q.text}</blockquote>
            <figcaption>
              <b>{q.who}</b>
              <span>{q.role}</span>
            </figcaption>
          </figure>
        </FadeUp>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- 3 · KAPSAM */
/* K1 · HER KALEM KENDİ AÇILIRI. Müşterinin /lab/muhasebe-kapsam'daki üç
   adaydan seçtiği: "ne yapıyoruz kısmını k1 yapabiliriz o iyi olmuş."

   TASARIMINA DOKUNULMADI; taşıma yalnız AD değiştirdi:
     .lkp-  →  .lmh-kp-        (bu dosyanın ad alanı)
     #k1    →  #kapsam         (KAPSAM.id, sayfanın çapası)
     .lkp-sec → .lmh-sec       (ikisi de var(--white), başka kural yok)
   Taşımadan önce ve sonra bölümün bütün öğelerinin kutusu ve 21 hesaplanmış
   stili 1440 ve 390 pikselde karşılaştırıldı (beş açılırın beşi açık); sonuç
   css/lab-muhasebe.css · KAPSAM başlığında.

   NEYİN YERİNE GEÇTİ: dört ikonlu karo (Defter · KDV · Rapor · Arşiv) ve
   altı çıplak başlıklı bir "dahil değil" açılırı. Dört karo lab'in kendi
   kısaltmasıydı; müşterinin "4 madde az" şikâyetine kalem UYDURULARAK cevap
   verilmedi, omurga canlı verinin BEŞ AŞAMASINA döndü. Aşamalar kapsamın
   kendisi ve her birinin ayrıntısı, çıktısı, sınırı veride zaten yazılı;
   bugüne kadar ekrana hiç çıkmayan kısmı ölçüldü: 5 ayrıntı paragrafı
   (1.249 karakter), 5 sınır gerekçesi (799).

   VERİ · tek satır uydurma yok, kaynak dosyalara dokunulmadı, yalnız okundu:
     lib/accountingDubai.ts · scope.phases   → 5 aşama (title · line · detail)
     lib/accountingDubai.ts · limits.items   → 5 sınır (title · line)
     lib/accountingDubai.ts · exchange       → 3 girdi + 6 çıktı çipi
     lib/accountingDubai.ts · ACC_EXCLUDES   → teklifte hariç yazılan 2 kalem
     lib/afterSetup.ts (accountingItems)     → iki tek seferlik kayıt kalemi

   SINIR AYRI BİR LİSTE DEĞİL: beş sınırın beşi AİT OLDUĞU AŞAMANIN içinde,
   gerekçesiyle. Eşleme metnin kendi kelimelerinden (aşağıda KALEMLER).
   Kurumlar vergisi kaydı ve KDV kaydı SINIR DEĞİL — ikisini de biz
   yapıyoruz, yalnız aylık ücrete dahil değiller; birinci aşamada kendi
   etiketiyle (KAPSAM.yokBaslik).

   AÇIK NOT (müşteride): açılan gövdedeki "Size dönen" çipleri takas
   panelindeki dokuz etiketin aynısı ve panel bu bölümün hemen altında. Burada
   "hangi aşamadan çıkıyor", panelde "sizden gelen / size dönen" diyorlar;
   etiket aynı, söylenen farklı — ama ekranda aynı dokuz kelime art arda iki
   bölümde geçiyor.

   Native <details>: JavaScript yok, klavye ve ekran okuyucu davranışı
   tarayıcıdan, bileşen sunucu tarafında. */

/* Çip ikonları. Canlı sayfanın kendi haritasının (dubai/muhasebe/page.tsx)
   yalnızca exchange'de geçen altı kaydı; AccIcon'un kalan dördü (stamp,
   calendar, pin, info) bu bölümde hiç kullanılmıyor, o yüzden Partial.
   Eşleşmeyen bir ikon gelirse FileStack'e düşüyor — kutu boş kalmıyor. */
const CIP_IKON: Partial<Record<AccIcon, LucideIcon>> = {
  book: BookOpen,
  receipt: Receipt,
  chart: ChartColumn,
  wallet: Wallet,
  files: FileStack,
  bank: Landmark,
};

type Cip = { icon: AccIcon; label: string };
type Sinir = { t: string; l: string };

type Kalem = {
  /** React anahtarı. Adayların K3'ü radyo eşleşmesi için de kullanıyordu;
      o aday gitti, alan yalnız anahtar olarak kaldı. */
  id: string;
  /** Yüzeyde görünen ad. HER KELİMESİ aşamanın kendi başlığından alındı;
      açılınca tam başlık zaten basılıyor, yani kısaltma bilgi götürmüyor. */
  kisa: string;
  baslik: string;
  ozet: string;
  detay: string;
  Ikon: LucideIcon;
  cipBaslik: string;
  cipler: Cip[];
  sinirBaslik: string;
  sinir: Sinir[];
};

const C = ACCOUNTING_DUBAI;

/* Seçiciler. Hepsi ETİKETLE eşleşiyor çünkü kaynak dizilerde id yok; eşleşmeyen
   bir etiket sessizce düşüyor, yani veri değişirse bölüm bozulmuyor, eksiliyor.
   Ölçüldü: bugün dokuz çipin dokuzu ve beş sınırın beşi de yerini buluyor. */
const cikti = (...labels: string[]): Cip[] =>
  C.exchange.outputs.filter((o) => labels.includes(o.label));

const sinirlar = (...titles: string[]): Sinir[] =>
  C.limits.items.filter((l) => titles.includes(l.title)).map((l) => ({ t: l.title, l: l.line }));

/* Aylık ücrete dahil olmayan tek seferlik kayıtlar. accountingItems() fiyat
   listesinin kaynağı; buradan yalnız ad ve tanım cümlesi okunuyor, TUTAR
   OKUNMUYOR — fiyat bölümü müşterinin "aynen koruyalım" dediği yer ve rakamı
   iki ayrı bölümde tekrar etmek deponun teşhis edilmiş hastalığı. */
const kayitlar = (...ids: string[]): Sinir[] =>
  accountingItems()
    .filter((a) => ids.includes(a.id))
    .map((a) => ({ t: a.title, l: a.line }));

const KALEMLER: Kalem[] = [
  {
    id: "altyapi",
    kisa: "Altyapı",
    baslik: C.scope.phases[0].title,
    ozet: C.scope.phases[0].line,
    detay: C.scope.phases[0].detail,
    Ikon: SlidersHorizontal,
    /* Birinci aşamada ÇIKTI yok, GİRDİ var: fazın kendi metni "faturaların,
       fişlerin, banka ekstrelerinin bize hangi yoldan geleceği tanımlanıyor"
       diyor ve exchange.you tam olarak o üç kalem. Eşleşme yorumla değil
       kelimeyle kuruldu. */
    cipBaslik: C.exchange.youTitle,
    cipler: C.exchange.you,
    sinirBaslik: KAPSAM.yokBaslik,
    sinir: kayitlar("kurumlar-vergisi-kaydi", "kdv-kaydi"),
  },
  {
    id: "takip",
    kisa: "Fatura takibi",
    baslik: C.scope.phases[1].title,
    ozet: C.scope.phases[1].line,
    detay: C.scope.phases[1].detail,
    Ikon: Receipt,
    cipBaslik: C.exchange.usTitle,
    cipler: cikti("Dijital defter", "Fatura ve gider arşivi"),
    sinirBaslik: C.limits.title,
    sinir: sinirlar("Bordro aylık muhasebede yok"),
  },
  {
    id: "beyan",
    kisa: "KDV ve beyan",
    baslik: C.scope.phases[2].title,
    ozet: C.scope.phases[2].line,
    detay: C.scope.phases[2].detail,
    Ikon: Stamp,
    cipBaslik: C.exchange.usTitle,
    cipler: cikti("Aylık KDV raporu"),
    sinirBaslik: C.limits.title,
    sinir: sinirlar(
      "Yıl sonu beyanı aylık hizmete dahil değil",
      "Kişiye özel vergi görüşü siteden verilmiyor",
    ),
  },
  {
    id: "rapor",
    kisa: "Raporlama",
    baslik: C.scope.phases[3].title,
    ozet: C.scope.phases[3].line,
    detay: C.scope.phases[3].detail,
    Ikon: ChartColumn,
    cipBaslik: C.exchange.usTitle,
    cipler: cikti("Gelir-gider tablosu ve bilanço", "Nakit akış raporu"),
    /* Bu aşamanın veride sınırı YOK ve uydurulmadı. Boş kalıyor; asimetri
       dürüst, doldurulmuş bir kutu değil. */
    sinirBaslik: C.limits.title,
    sinir: [],
  },
  {
    id: "uyum",
    kisa: "Banka ve denetim",
    baslik: C.scope.phases[4].title,
    ozet: C.scope.phases[4].line,
    detay: C.scope.phases[4].detail,
    Ikon: Landmark,
    cipBaslik: C.exchange.usTitle,
    cipler: cikti("Banka ve denetim dosyası"),
    sinirBaslik: C.limits.title,
    sinir: sinirlar("Bağımsız denetim ayrı bir hizmet", "Banka onayı ve otorite hızı bizde değil"),
  },
];

/** Bir kalemin AÇILDIĞINDA görünen gövdesi: tam başlık, ayrıntı paragrafı,
    çipler (solda) ve sınır (sağda, 860 pikselden sonra). */
function KapsamGovde({ k }: { k: Kalem }) {
  return (
    <>
      <div className="lmh-kp-gov">
        <p className="lmh-kp-gov-h">{k.baslik}</p>
        <p className="lmh-kp-gov-d">{k.detay}</p>
        {k.cipler.length > 0 && (
          <>
            <p className="lmh-kp-lbl">{k.cipBaslik}</p>
            <ul className="lmh-kp-cip">
              {k.cipler.map((c) => {
                const Ic = CIP_IKON[c.icon] ?? FileStack;
                return (
                  <li key={c.label}>
                    <Ic size={15} strokeWidth={1.9} aria-hidden="true" />
                    {c.label}
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>

      {k.sinir.length > 0 && (
        <div className="lmh-kp-sin">
          <p className="lmh-kp-lbl">{k.sinirBaslik}</p>
          <ul>
            {k.sinir.map((s) => (
              <li key={s.t}>
                <span className="lmh-kp-sin-x" aria-hidden="true">
                  <X size={12} strokeWidth={2.8} />
                </span>
                <span>
                  <b>{s.t}:</b> {s.l}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export function MuhasebeKapsam() {
  return (
    <section id={KAPSAM.id} className="sec-pad lmh-sec">
      <div className="container-o">
        <div className="sec-head">
          <SplitWords as="h2" text={KAPSAM.heading} accent={KAPSAM.accent} className="h2" />
        </div>
        <div className="lmh-kp-a">
          {KALEMLER.map((k, i) => (
            <FadeUp key={k.id} delay={0.06 + i * 0.05}>
              <details className="lmh-kp-a-it">
                <summary>
                  <span className="lmh-kp-ic" aria-hidden="true">
                    <k.Ikon size={24} strokeWidth={1.8} />
                  </span>
                  <span className="lmh-kp-a-t">
                    <b>{k.kisa}</b>
                    <span>{k.ozet}</span>
                  </span>
                  <span className="lmh-kp-x" aria-hidden="true" />
                </summary>
                <div className="lmh-kp-a-b">
                  <KapsamGovde k={k} />
                </div>
              </details>
            </FadeUp>
          ))}
        </div>

        {/* Kapanış satırı: services.ts'teki hariç listesi — aynı bilginin
            teklifte hangi sözcüklerle geçtiği. */}
        {ACC_EXCLUDES.length > 0 && (
          <FadeUp delay={0.3}>
            <p className="lmh-kp-haric">
              Teklifte hariç kalem olarak yazılanlar:{" "}
              {ACC_EXCLUDES.map((e) => (
                <span className="svm-tag" key={e}>
                  {e}
                </span>
              ))}
            </p>
          </FadeUp>
        )}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- 5 · KARŞILIK */
/* F3 · TEK DEFTER, DÜZELTİLEREK. Müşterinin /lab/muhasebe-fayda'da seçtiği:
   "seçmeli fln yapı çok hoşuma gitmedi gerekte yok. f3 ile devam edelim ama
   şuan yatayda siyah kısım çok yer kaplıyor ve sağdaki textlere verilen alan
   çok az … bide text kısmı çok küçük duruyor."

   SEÇİM YOK. İkinci turun üç adayı (G1 Ray · G2 Tek sahne · G3 Omurga)
   sahneyi satır seçimine bağlıyordu (radyo + :has); müşteri o yapıyı
   istemedi ve üçü de silindi. Dört satır düz bir liste: tıklanan, odak alan,
   "seçili" hâli olan tek öğe yok. Sahne kendi döngüsünde yürüyor.

   NEDEN TEK SAHNE + DÖRT SATIR: dört kalem birbirinin eşi değil, AYNI
   SEBEBİN (ay ay tutulan kayıt) dört sonucu. Sebep tek ve büyük (soldaki
   defter), sonuçlar ondan dallanıyor — ikinci satırın cümlesi ("aynı
   defterden çıkıyor") sahnenin çizdiği şeyin kendisi.

   NEYİN YERİNE GEÇTİ: .lmh-kars, iki sütunlu düz metin ızgarası (ikon da
   sahne de yoktu). Metin aynı kaynaktan: veri.ts · KARSILIK — F3'ün kendi
   kopyası (FaydaTur2 · KISA) orada tek kopyaya indi, kararı orada yazılı.

   Düzeltmenin sayıları (ızgara 7+5 → 5+7, tipografi, ikon) ölçüleriyle
   birlikte css/lab-muhasebe.css · KARŞILIK'ta. İşaretlemede F3'ten iki fark
   var: ikon 15 → 22 px ve satırlar <div> + <h3> yerine <ul> / <li> (gerekçe
   aşağıda, listenin üstünde). Sahnenin çizimi birebir aynı. */

/* Satırların ve sahnedeki dört dalın ikonu — KARSILIK.items ile aynı sırada.
   Eşleme canlı verinin kendi ikon adlarından (accountingDubai.ts · gains:
   calendar · chart · bank · stamp); ARTI_IKON ile aynı kalıp. */
const KARSILIK_IKON = [CalendarCheck, ChartColumn, Landmark, Stamp] as const;

/* Dalların bitiş yükseklikleri (viewBox birimi) — dört kalemle aynı sırada. */
const DAL = [
  { y: 62, sinif: "lmh-fy-b1" },
  { y: 122, sinif: "lmh-fy-b2" },
  { y: 182, sinif: "lmh-fy-b3" },
  { y: 242, sinif: "lmh-fy-b4" },
] as const;

/* Sahne. F3'ün çizimi birebir: viewBox, geometri ve çizim sınıfları
   (.svx-*, globals.css) değişmedi. Hareket sitenin PAYLAŞILAN kalıbıyla
   (aktarim.css · .akt / .akt-durak): defter yanıyor, ışık dört dala sırayla
   geçiyor; bu dosya ve CSS yalnız değer veriyor. Sahne aria-hidden ve tek
   bir etiket, rakam ya da tarih taşımıyor — söylediği her şey yanındaki
   satırlarda yazılı. */
function DefterSahne() {
  return (
    <svg
      viewBox="0 0 340 300"
      className="lmh-fy-svg akt lmh-fy-akt"
      focusable="false"
      aria-hidden="true"
    >
      {/* defter — tek sebep */}
      <rect
        x="16"
        y="42"
        width="100"
        height="216"
        rx="16"
        className="svx-box akt-durak lmh-fy-defter"
      />
      {Array.from({ length: 8 }, (_, i) => (
        <rect
          key={i}
          x="32"
          y={62 + i * 24}
          width={i % 2 === 0 ? 68 : 54}
          height="7"
          rx="3.5"
          className="svx-bar"
        />
      ))}
      {/* kaydın ay ay tutulması: defterin üstünden inen okuma çizgisi */}
      <rect x="24" y="54" width="84" height="2" rx="1" fill="#5c9eeb" className="lmh-fy-tarama" />

      {DAL.map(({ y, sinif }) => (
        <path
          key={y}
          d={`M116 150 C 156 150, 166 ${y}, 206 ${y}`}
          fill="none"
          className={`svx-line akt-durak lmh-fy-hat ${sinif}`}
        />
      ))}

      {DAL.map(({ y, sinif }, i) => {
        const Icon = KARSILIK_IKON[i];
        return (
          <g key={y}>
            <rect
              x="206"
              y={y - 24}
              width="118"
              height="48"
              rx="14"
              className={`svx-box akt-durak lmh-fy-nod ${sinif}`}
            />
            <Icon
              x={222}
              y={y - 11}
              width={22}
              height={22}
              strokeWidth={1.9}
              className="svx-ic-b"
            />
            <rect x="256" y={y - 3} width="52" height="6" rx="3" className="svx-bar" />
          </g>
        );
      })}
    </svg>
  );
}

export function MuhasebeKarsilik() {
  return (
    <section id={KARSILIK.id} className="sec-pad lmh-sec">
      <div className="container-o">
        <div className="sec-head">
          <SplitWords as="h2" text={KARSILIK.heading} accent={KARSILIK.accent} className="h2" />
        </div>
        <div className="lmh-fy">
          <FadeUp className="lmh-fy-card" delay={0.06}>
            <div className="lmh-fy-stage" aria-hidden="true">
              <DefterSahne />
            </div>
          </FadeUp>

          {/* Satırlar <ul>: dört kalem bir liste ve ekran okuyucu "4 öğe"
              desin. F3'te <div> + <h3> idi; h3 düştü çünkü dört kısa satır
              belge ana hattında dört ayrı başlık değil, tek bölümün maddeleri.
              FadeUp <li>'nin İÇİNDE: dışında olsaydı <ul>'un doğrudan çocuğu
              <div> olurdu. Görünüm aynı. */}
          <ul className="lmh-fy-list">
            {KARSILIK.items.map((k, i) => {
              const Icon = KARSILIK_IKON[i];
              return (
                <li key={k.t} className="lmh-fy-row">
                  <FadeUp className="lmh-fy-row-in" delay={0.12 + i * 0.05}>
                    <span className="lmh-fy-ic" aria-hidden="true">
                      <Icon size={22} strokeWidth={1.9} />
                    </span>
                    <b className="lmh-fy-t">{k.t}</b>
                    <span className="lmh-fy-p">{k.s}</span>
                  </FadeUp>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- 6 · FİYAT */
/* Müşteri: "muhasebe hizmet bedeli kısmı güzel, burayı aynen koruyalım."
   Bölümün yapısı korundu; iki şey düzeltildi:
   · RHYTHM_LABEL ile price.unit yan yana basılıyordu, altı satırın beşinde
     aynı kelime iki kez ("Tek seferlik / tek seferlik").
   · Bölümün sonunda kapı yoktu. Ölçüldü: canlı fiyat bölümünün tamamında
     tek bir <a> yok. */
export function MuhasebeFiyat() {
  const items = accountingItems();
  return (
    <section id={FIYAT.id} className="sec-pad sec-night lmh-fiyat">
      <div className="container-o">
        <div className="sec-head sec-head-dark">
          <SplitWords
            as="h2"
            text={FIYAT.heading}
            accent={FIYAT.accent}
            className="h2"
            style={{ color: "#ffffff" }}
          />
          <FadeUp delay={0.2}>
            <p className="sec-lead sec-lead-dark">{FIYAT.lead}</p>
          </FadeUp>
        </div>

        {/* CANLI SİTEDEKİ TASARIMIN AYNISI. Müşteri: "muhasebe hizmetinin
            bedeli kısmını şuan sitede live olanın tasarımıyla koy."
            Bir önceki turda satırlar düzleştirilmişti (açılır değil); o karar
            geri alındı, canlı `.svm-prow` düzeni birebir kullanılıyor.

            İki şey CANLIDAN FARKLI ve ikisi de düzeltme:
            · `unit` yalnız rozetten farklıysa basılıyor. Canlıda RHYTHM_LABEL
              ile yan yana duruyor ve altı satırın beşinde aynı kelime iki kez
              çıkıyor ("Tek seferlik / tek seferlik").
            · Rozet bu sayfaya ait (bkz. ROZET). Canlıdaki "İlk yıl
              toplamında" etiketi /dubai'deki örnek hesaba işaret ediyor ve o
              hesap bu sayfada yok; üstelik bölümün kendi lead'i "tek bir
              toplam yazmıyoruz" diyor. */}
        <div className="svm-plist">
          {items.map((it, i) => (
            <FadeUp key={it.id} delay={0.06 + i * 0.04}>
              <details className="svm-more svm-more-dark svm-prow" data-inc={it.inclusion}>
                <summary>
                  <span className="svm-prow-t">
                    <b>{it.title}</b>
                    <span className="svm-prow-tags">
                      <em className="svm-badge">{ROZET[it.inclusion]}</em>
                      <em className="svm-rhythm">{RHYTHM_LABEL[it.rhythm]}</em>
                    </span>
                  </span>
                  <span className="svm-prow-v data">
                    {priceText(it.price)}
                    {it.price.unit !== RHYTHM_LABEL[it.rhythm].toLocaleLowerCase("tr-TR") && (
                      <i>{it.price.unit}</i>
                    )}
                  </span>
                  <span className="svm-more-x" aria-hidden="true" />
                </summary>

                <div className="svm-prow-d">
                  {it.en && <p className="svm-prow-en">{it.en}</p>}
                  {it.line && <p>{it.line}</p>}
                  {it.scope && it.scope.length > 0 && (
                    <ul>
                      {it.scope.map((sc) => (
                        <li key={sc}>{sc}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </details>
            </FadeUp>
          ))}
        </div>

        {items.some((it) => it.note) && (
          <FadeUp delay={0.26}>
            <ul className="svm-pnotes">
              {items
                .filter((it) => it.note)
                .map((it) => (
                  <li key={it.id}>
                    <b>{it.title}:</b> {it.note}
                  </li>
                ))}
            </ul>
          </FadeUp>
        )}

        <FadeUp delay={0.3}>
          <div className="lmh-fiyat-alt">
            <details className="svm-more svm-more-dark">
              <summary>
                Tutarlar USD ve KDV hariç · tam şartlar
                <span className="svm-more-x" aria-hidden="true" />
              </summary>
              <p>{ACC_PRICE_FOOTNOTE}</p>
            </details>

            <SmartLink href="/basla" className="btn btn-primary">
              {FIYAT.cta}
              <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
            </SmartLink>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
