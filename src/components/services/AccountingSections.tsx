import {
  ArrowRight,
  BookOpen,
  Building2,
  CalendarCheck,
  ChartColumn,
  FileCheck2,
  FileStack,
  FolderOpen,
  Info,
  Landmark,
  MapPin,
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
import { RHYTHM_LABEL } from "@/lib/afterSetup";
import { altHizmetHrefByKalem } from "@/lib/muhasebeAltHizmet";
import {
  accountingItems,
  ACC_EXCLUDES,
  ACC_PRICE_FOOTNOTE,
  ACCOUNTING_DUBAI as C,
  type AccChip,
  type AccIcon,
  type AccStrengthIcon,
} from "@/lib/accountingDubai";

/* ============================================================================
   /dubai/muhasebe · BÖLÜMLER — ad alanı .svm- (CSS: css/svc-muhasebe.css)

   11.09.2026 · /lab/muhasebe CANLIYA ALINDI (künye MD · K1 · F3). Müşteri:
   "muhasebe ve hakkımızda sayfalarını live alabilirsin kral."

   BU DOSYA LAB'İN components/lab/MuhasebeBloklar.tsx'İNİN CANLI HÂLİ ve
   tasarım değişikliği YOK: işaretleme birebir, değişen üç şey ad, veri yolu
   ve bir tip güvencesi.

     AD      .lmh-  →  .svm-      (lmh-sec → svm-sec, lmh-kp- → svm-kp-,
                                   lmh-fy- → svm-fy-, lmh-karo → svm-karo …)
             Lab ile canlı bir süre YAN YANA duruyor ve ikisi de aynı
             globals.css'e giriyor; ad ortak olsaydı lab'deki bir deneme
             canlıyı sessizce değiştirirdi (bu depoda yaşandı, kapanis-cta.css
             ve muhasebe-takvim.css'in başında yazılı). Taramayla doğrulandı:
             bu adların hiçbiri depoda daha önce geçmiyordu.
     VERİ    app/lab/muhasebe/veri.ts → lib/accountingDubai.ts. Ekranda
             görünen her kelime o dosyada; burada yalnız dizim var.
     TİP     Çip ikonları lab'de Partial<Record> + FileStack'e düşüş idi;
             burada tam Record (ACC_ICON): veri dosyasına yeni bir ikon adı
             girerse derleme patlıyor, kutu ekranda sessizce yanlış ikonla
             kalmıyor.

   Sırası sayfadaki sıra: artılarımız → alıntı → kapsam (K1) → [takas ve
   takvim sayfanın kendi dosyasında] → karşılık (F3) → fiyat.

   Beşi de SUNUCU bileşeni. Açılırlar native <details>: JavaScript yok,
   klavye ve ekran okuyucu davranışı tarayıcıdan. Hareketin tamamı CSS'te ve
   `@media (prefers-reduced-motion)` kapısının arkasında; useReducedMotion
   YOK (docs/tuzaklar.md · A).
   ========================================================================= */

/* İçerik dosyası ikon adını string taşıyor; eşleme burada. TAM kayıt: çipler,
   karşılık satırları ve sayfanın hero satırları (page.tsx) buradan okuyor.
   AccountingHandover.tsx'in kendi kopyası bilerek duruyor (gerekçesi o
   dosyada: bileşen kendi başına ayakta dursun). */
export const ACC_ICON: Record<AccIcon, LucideIcon> = {
  book: BookOpen,
  receipt: Receipt,
  chart: ChartColumn,
  wallet: Wallet,
  stamp: Stamp,
  bank: Landmark,
  files: FileStack,
  calendar: CalendarCheck,
  pin: MapPin,
  info: Info,
};

/* Artılarımız karolarının ikonları — lab'in ARTI_IKON dizisinin aynısı,
   ama SIRAYLA değil ADIYLA eşleşiyor (veri: strengths.items[].icon). */
const STRENGTH_ICON: Record<AccStrengthIcon, LucideIcon> = {
  stamp: Stamp,
  users: Users,
  folder: FolderOpen,
  building: Building2,
};

/* "başlangıç 350 USD + KDV" — eski sayfanın biçimlendiricisiyle birebir. */
const nf = new Intl.NumberFormat("tr-TR");
function priceText(p: { usd: number; plusVat: boolean; qualifier?: string }) {
  return `${p.qualifier ? `${p.qualifier} ` : ""}${nf.format(p.usd)} USD${p.plusVat ? " + KDV" : ""}`;
}

/* ============================================================ 1 · ARTILARIMIZ
   "Kısa cevap" künyesi ile "Süreci yürüten ekip" bölümünün birleşimi, dört
   karo. İçerik başına en fazla yedi kelime; çerçeve ve dolgu var, gövde metni
   yok. Gerekçe accountingDubai.ts · strengths.

   LAB'DEN TEK FARK, İŞARETLEMEDE: FadeUp <li>'nin İÇİNDE (lab'de dışındaydı ve
   <ul>'un doğrudan çocuğu <div> oluyordu; erişilebilirlik ağacında liste "0
   öğe" okunuyordu). Kutu artık FadeUp'ın kabı (.svm-karo-in); görünüm aynı,
   gerekçe ve ölçü svc-muhasebe.css · 2. bölümde. */
export function AccountingStrengths() {
  const S = C.strengths;
  return (
    <section id={S.id} className="sec-pad svm-sec">
      <div className="container-o">
        <div className="sec-head">
          <SplitWords as="h2" text={S.heading} accent={S.accent} className="h2" />
        </div>
        <ul className="svm-karo">
          {S.items.map((k, i) => {
            const Icon = STRENGTH_ICON[k.icon];
            return (
              <li key={k.title}>
                <FadeUp className="svm-karo-in" delay={0.06 + i * 0.05}>
                  <Icon size={22} strokeWidth={1.9} aria-hidden="true" />
                  <b>{k.title}</b>
                  <span>{k.line}</span>
                </FadeUp>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ================================================================ 2 · ALINTI
   Müşteri: "sonra murat abinin alıntısını koyarız full genişlikte fln", bir
   tur sonra "onu sola daya". Gece bant sayfanın tek insan sesi ve tek tam
   genişlik bloğu, yani ritmin dönüm noktası (beyaz → gece → beyaz).

   BANT tam genişlik; SOLA YASLANAN içindeki figure. Sıra tırnak simgesi →
   gövde → künye: künye gövdenin ALTINDA, çünkü yanına alınsaydı paragrafın
   sonunda göz yatay bir sıçrama yapardı ve az önce kurulan sol hizayla
   çelişirdi (ölçüler svc-muhasebe.css · ALINTI).

   ESKİ SAYFADA alıntı "kim yürütüyor" bandının dibinde 13,5 px'lik bir
   imzaydı (.svm-who-sign); metin değişmedi, rütbesi değişti. */
/* 15.09.2026 · BANDIN SAĞINA KÜNYE KARTI GELDİ (marketing listesi, madde 11
   ve 12). Alıntı SOLDA ve birebir aynı; kart bandın boş duran sağ yarısında.
   Veri accountingDubai.ts · expert, hangi satırın nereden geldiği ve boş
   alanların neden basılmadığı orada.

   İKİ SÜTUN ANCAK 980 PX ÜSTÜNDE. Altında kart alıntının ALTINA iniyor:
   alıntının 74ch ölçüsü dar ekranda zaten tüm genişliği kullanıyor.

   BAŞLIK h2, çünkü kart sayfanın bölüm düzeyinde bir bilgisi ("kim imzalıyor")
   ve bandın başka başlığı yok; <aside aria-label> yazılsaydı etiket erişilebilirlik
   ağacında görünmezdi (tuzaklar.md · G-2), aria-labelledby görünür başlığa bağlı. */
export function AccountingQuote() {
  const q = C.ortac.quote;
  const e = C.expert;
  const lisans = e.license.number
    ? `${e.license.number}${e.license.authority ? ` · ${e.license.authority}` : ""}`
    : "";
  return (
    <section className="svm-alinti">
      <div className="container-o svm-alinti-in">
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

        <FadeUp delay={0.12}>
          <aside className="svm-imza" aria-labelledby="svm-imza-t">
            <div className="svm-imza-bas">
              {e.photo ? (
                // eslint-disable-next-line @next/next/no-img-element -- tek küçük portre, uzak kaynak değil
                <img className="svm-imza-foto" src={e.photo} alt={e.name} width={56} height={56} />
              ) : (
                <span className="svm-imza-foto" aria-hidden="true">
                  {e.initials}
                </span>
              )}
              <div>
                <h2 id="svm-imza-t" className="svm-imza-ust">
                  {e.heading}
                </h2>
                <p className="svm-imza-ad">{e.name}</p>
              </div>
              <Stamp className="svm-imza-muhur" size={20} strokeWidth={1.8} aria-hidden="true" />
            </div>
            <p className="svm-imza-p">{e.bio || e.line}</p>
            <dl className="svm-imza-dl">
              {e.rows.map((r) => (
                <div key={r.k}>
                  <dt>{r.k}</dt>
                  <dd>{r.v}</dd>
                </div>
              ))}
              {e.taxAgent.taan && (
                <div>
                  <dt>{e.taxAgent.label}</dt>
                  <dd>
                    <a href={e.taxAgent.verifyUrl} target="_blank" rel="noopener noreferrer">
                      {e.taxAgent.taan}
                    </a>
                  </dd>
                </div>
              )}
              {lisans && (
                <div>
                  <dt>{e.license.label}</dt>
                  <dd>
                    {e.license.verifyUrl ? (
                      <a href={e.license.verifyUrl} target="_blank" rel="noopener noreferrer">
                        {lisans}
                      </a>
                    ) : (
                      lisans
                    )}
                  </dd>
                </div>
              )}
            </dl>
          </aside>
        </FadeUp>
      </div>
    </section>
  );
}

/* ====================================================== 2b · GEÇİŞ (#gecis)
   15.09.2026 · marketing listesi, madde 8. Veri ve dayanaklar
   accountingDubai.ts · switchover.

   İKİ SÜTUN: solda dört numaralı adım (sıra önemli, <ol>), sağda devir için
   gerekenler listesi ve tek düğme. Adımlar kart değil satır: sayfada kart
   yoğunluğu zaten yüksek (dört karo, K1, F3) ve devir bir SIRA, yan yana
   duran eş ağırlıklı kutular değil. Ölçüler svc-muhasebe.css · 18. */
export function AccountingSwitch() {
  const S = C.switchover;
  return (
    <section id={S.id} className="sec-pad svm-sec" aria-labelledby="svm-gecis-t">
      <div className="container-o">
        <div className="sec-head">
          <SplitWords as="h2" id="svm-gecis-t" text={S.heading} accent={S.accent} className="h2" />
          <FadeUp delay={0.2}>
            <p className="sec-lead">{S.lead}</p>
          </FadeUp>
        </div>
        <div className="svm-gecis-in">
          <ol className="svm-gecis-adim">
            {S.steps.map((a, i) => (
              <li key={a.title}>
                <FadeUp className="svm-gecis-satir" delay={0.06 + i * 0.05}>
                  <span className="svm-gecis-n data" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <b>{a.title}</b>
                  <span>{a.line}</span>
                </FadeUp>
              </li>
            ))}
          </ol>
          <FadeUp delay={0.16}>
            <aside className="svm-gecis-kart" aria-labelledby="svm-gecis-liste">
              <h3 id="svm-gecis-liste">{S.needsTitle}</h3>
              <ul>
                {S.needs.map((n) => (
                  <li key={n}>
                    <FileCheck2 size={15} strokeWidth={1.9} aria-hidden="true" />
                    {n}
                  </li>
                ))}
              </ul>
              <p className="svm-gecis-dayanak">{S.basis}</p>
              <SmartLink href={S.cta.href} className="btn btn-primary">
                {S.cta.label}
                <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
              </SmartLink>
            </aside>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ================================================================ 3 · KAPSAM
   K1 · HER AŞAMA KENDİ AÇILIRI. Müşterinin /lab/muhasebe-kapsam'daki üç
   adaydan seçtiği: "ne yapıyoruz kısmını k1 yapabiliriz o iyi olmuş."

   NEYİN YERİNE GEÇTİ (eski canlı sayfada üç ayrı blok vardı):
     · süreç   numaralı ray + beş açılır satır (.svm-flow · .svm-fstep)
     · takas   panel — O KALDI, kendi bölümüne çıktı (page.tsx)
     · sınır   tek şerit, akordiyon (.svm-exc)
   Şimdi omurga verinin BEŞ AŞAMASI; her aşamanın ayrıntısı, çıktısı ve
   sınırı veride zaten yazılıydı ve ekrana hiç çıkmayan kısmı lab'de
   ölçülmüştü: 5 ayrıntı paragrafı (1.249 karakter), 5 sınır gerekçesi (799).
   "4 madde az" şikâyetine kalem UYDURULARAK cevap verilmedi.

   VERİ · tek satır uydurma yok, kaynaklar yalnız okunuyor:
     scope.phases   → 5 aşama (short · title · line · detail)
     limits.items   → 5 sınır (title · line)
     exchange       → 3 girdi + 6 çıktı çipi
     ACC_EXCLUDES   → teklifte hariç yazılan 2 kalem
     accountingItems() → iki tek seferlik kayıt kalemi (AD ve TANIM; tutar
                         OKUNMUYOR — fiyat müşterinin "aynen koruyalım"
                         dediği yer, rakamı iki bölümde tekrar etmek deponun
                         teşhis edilmiş hastalığı)

   SINIR AYRI BİR LİSTE DEĞİL: beşinin beşi AİT OLDUĞU AŞAMANIN içinde,
   gerekçesiyle. Kurumlar vergisi kaydı ve KDV kaydı SINIR DEĞİL — ikisini de
   biz yapıyoruz, yalnız aylık ücrete dahil değiller; birinci aşamada kendi
   etiketiyle (scope.feeLabel).

   AÇIK NOT (müşteride, lab'den devralındı): açılan gövdedeki "Size dönen"
   çipleri takas panelindeki dokuz etiketin aynısı ve panel bu bölümün hemen
   altında. Burada "hangi aşamadan çıkıyor", panelde "sizden gelen / size
   dönen" diyorlar; etiket aynı, söylenen farklı — ama aynı dokuz kelime art
   arda iki bölümde geçiyor. */

type Sinir = { t: string; l: string };

type Kalem = {
  /** React anahtarı. */
  id: string;
  kisa: string;
  baslik: string;
  ozet: string;
  detay: string;
  Ikon: LucideIcon;
  cipBaslik: string;
  cipler: AccChip[];
  sinirBaslik: string;
  sinir: Sinir[];
};

/* Seçiciler. Hepsi ETİKETLE eşleşiyor çünkü kaynak dizilerde id yok; eşleşmeyen
   bir etiket sessizce düşüyor, yani veri değişirse bölüm bozulmuyor, eksiliyor.
   Lab'de ölçülmüştü: bugün dokuz çipin dokuzu ve beş sınırın beşi de yerini
   buluyor (bu dosyada yeniden sayıldı, aynı). */
const cikti = (...labels: string[]): AccChip[] =>
  C.exchange.outputs.filter((o) => labels.includes(o.label));

const sinirlar = (...titles: string[]): Sinir[] =>
  C.limits.items.filter((l) => titles.includes(l.title)).map((l) => ({ t: l.title, l: l.line }));

const kayitlar = (...ids: string[]): Sinir[] =>
  accountingItems()
    .filter((a) => ids.includes(a.id))
    .map((a) => ({ t: a.title, l: a.line }));

/* Aşama ikonları lab'deki gibi; aşamanın kendi işini çiziyor (ayar · fatura ·
   mühür · grafik · banka). Veri dosyasına alınmadı: AccIcon'da "sliders" yok
   ve birliği büyütmek iki tam haritayı kırardı (accountingDubai.ts ·
   AccStrengthIcon'un notu). */
const KALEMLER: Kalem[] = [
  {
    id: "altyapi",
    kisa: C.scope.phases[0].short,
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
    sinirBaslik: C.scope.feeLabel,
    sinir: kayitlar("kurumlar-vergisi-kaydi", "kdv-kaydi"),
  },
  {
    id: "takip",
    kisa: C.scope.phases[1].short,
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
    kisa: C.scope.phases[2].short,
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
    kisa: C.scope.phases[3].short,
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
    kisa: C.scope.phases[4].short,
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

/** Bir aşamanın AÇILDIĞINDA görünen gövdesi: tam başlık, ayrıntı paragrafı,
    çipler (solda) ve sınır (sağda, 860 pikselden sonra). */
function KapsamGovde({ k }: { k: Kalem }) {
  return (
    <>
      <div className="svm-kp-gov">
        <p className="svm-kp-gov-h">{k.baslik}</p>
        <p className="svm-kp-gov-d">{k.detay}</p>
        {k.cipler.length > 0 && (
          <>
            <p className="svm-kp-lbl">{k.cipBaslik}</p>
            <ul className="svm-kp-cip">
              {k.cipler.map((c) => {
                const Ic = ACC_ICON[c.icon];
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
        <div className="svm-kp-sin">
          <p className="svm-kp-lbl">{k.sinirBaslik}</p>
          <ul>
            {k.sinir.map((s) => (
              <li key={s.t}>
                <span className="svm-kp-sin-x" aria-hidden="true">
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

export function AccountingScope() {
  return (
    <section id={C.scope.id} className="sec-pad svm-sec">
      <div className="container-o">
        <div className="sec-head">
          <SplitWords as="h2" text={C.scope.heading} accent={C.scope.accent} className="h2" />
        </div>
        <div className="svm-kp-a">
          {KALEMLER.map((k, i) => (
            <FadeUp key={k.id} delay={0.06 + i * 0.05}>
              <details className="svm-kp-a-it">
                <summary>
                  <span className="svm-kp-ic" aria-hidden="true">
                    <k.Ikon size={24} strokeWidth={1.8} />
                  </span>
                  <span className="svm-kp-a-t">
                    <b>{k.kisa}</b>
                    <span>{k.ozet}</span>
                  </span>
                  <span className="svm-kp-x" aria-hidden="true" />
                </summary>
                <div className="svm-kp-a-b">
                  <KapsamGovde k={k} />
                </div>
              </details>
            </FadeUp>
          ))}
        </div>

        {/* Kapanış satırı: services.ts'teki hariç listesi — aynı bilginin
            teklifte hangi sözcüklerle geçtiği. Rozet sınıfı (.svm-tag) eski
            sayfanın sınır şeridinden, aynı iş için. */}
        {ACC_EXCLUDES.length > 0 && (
          <FadeUp delay={0.3}>
            <p className="svm-kp-haric">
              {C.scope.excludesLead}{" "}
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

/* ============================================================== 5 · KARŞILIK
   F3 · TEK DEFTER. Müşterinin /lab/muhasebe-fayda'da seçtiği: "seçmeli fln
   yapı çok hoşuma gitmedi gerekte yok. f3 ile devam edelim ama şuan yatayda
   siyah kısım çok yer kaplıyor ve sağdaki textlere verilen alan çok az …
   bide text kısmı çok küçük duruyor."

   SEÇİM YOK: dört satır düz bir liste; tıklanan, odak alan, "seçili" hâli
   olan tek öğe yok. Sahne kendi döngüsünde yürüyor.

   NEDEN TEK SAHNE + DÖRT SATIR: dört kalem birbirinin eşi değil, AYNI
   SEBEBİN (ay ay tutulan kayıt) dört sonucu. Sebep tek ve büyük (soldaki
   defter), sonuçlar ondan dallanıyor — ikinci satırın cümlesi ("aynı
   defterden çıkıyor") sahnenin çizdiği şeyin kendisi.

   NEYİN YERİNE GEÇTİ: eski sayfanın #fayda'sı, iki sütunlu küçük satırlar
   (.svm-gain · 26 px ikon, 14,5 px başlık). Düzeltmenin sayıları (ızgara
   5+7, tipografi, ikon) svc-muhasebe.css · KARŞILIK'ta. */

/* Dalların bitiş yükseklikleri (viewBox birimi) — dört kalemle aynı sırada. */
const DAL = [
  { y: 62, sinif: "svm-fy-b1" },
  { y: 122, sinif: "svm-fy-b2" },
  { y: 182, sinif: "svm-fy-b3" },
  { y: 242, sinif: "svm-fy-b4" },
] as const;

/* Sahne. F3'ün çizimi birebir: viewBox, geometri ve çizim sınıfları
   (.svx-*, globals.css) değişmedi. Hareket sitenin PAYLAŞILAN kalıbıyla
   (aktarim.css · .akt / .akt-durak): defter yanıyor, ışık dört dala sırayla
   geçiyor; bu dosya ve CSS yalnız değer veriyor. Sahne aria-hidden ve tek
   bir etiket, rakam ya da tarih taşımıyor — söylediği her şey yanındaki
   satırlarda yazılı. Dal ikonları satırlarınkiyle aynı (gains[].icon). */
function DefterSahne() {
  const items = C.gains.items;
  return (
    <svg
      viewBox="0 0 340 300"
      className="svm-fy-svg akt svm-fy-akt"
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
        className="svx-box akt-durak svm-fy-defter"
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
      <rect x="24" y="54" width="84" height="2" rx="1" fill="#5c9eeb" className="svm-fy-tarama" />

      {DAL.map(({ y, sinif }) => (
        <path
          key={y}
          d={`M116 150 C 156 150, 166 ${y}, 206 ${y}`}
          fill="none"
          className={`svx-line akt-durak svm-fy-hat ${sinif}`}
        />
      ))}

      {DAL.map(({ y, sinif }, i) => {
        const Icon = ACC_ICON[items[i]?.icon ?? "stamp"];
        return (
          <g key={y}>
            <rect
              x="206"
              y={y - 24}
              width="118"
              height="48"
              rx="14"
              className={`svx-box akt-durak svm-fy-nod ${sinif}`}
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

export function AccountingGains() {
  const G = C.gains;
  return (
    <section id={G.id} className="sec-pad svm-sec">
      <div className="container-o">
        <div className="sec-head">
          <SplitWords as="h2" text={G.heading} accent={G.accent} className="h2" />
        </div>
        <div className="svm-fy">
          <FadeUp className="svm-fy-card" delay={0.06}>
            <div className="svm-fy-stage" aria-hidden="true">
              <DefterSahne />
            </div>
          </FadeUp>

          {/* Satırlar <ul>: dört kalem bir liste ve ekran okuyucu "4 öğe"
              desin. h3 yok: dört kısa satır belge ana hattında dört ayrı
              başlık değil, tek bölümün maddeleri. FadeUp <li>'nin İÇİNDE:
              dışında olsaydı <ul>'un doğrudan çocuğu <div> olurdu. */}
          <ul className="svm-fy-list">
            {G.items.map((k, i) => {
              const Icon = ACC_ICON[k.icon];
              return (
                <li key={k.title} className="svm-fy-row">
                  <FadeUp className="svm-fy-row-in" delay={0.12 + i * 0.05}>
                    <span className="svm-fy-ic" aria-hidden="true">
                      <Icon size={20} strokeWidth={1.9} />
                    </span>
                    <b className="svm-fy-t">{k.title}</b>
                    <span className="svm-fy-p">{k.line}</span>
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

/* ================================================================= 6 · FİYAT
   Müşteri: "muhasebe hizmet bedeli kısmı güzel, burayı aynen koruyalım" ve
   bir tur sonra "şuan sitede live olanın tasarımıyla koy". Satırlar eski
   sayfanın .svm-prow açılır düzeni, birebir.

   ESKİ SAYFADAN ÜÇ FARK, üçü de lab'de onaylanmış düzeltme:
   · `unit` yalnız ritim etiketinden farklıysa basılıyor. Eski sayfada
     RHYTHM_LABEL ile yan yana duruyordu ve altı satırın beşinde aynı kelime
     iki kez çıkıyordu ("Tek seferlik / tek seferlik").
   · Rozet bu sayfaya ait (price.badge; gerekçesi accountingDubai.ts'te).
   · Bölümün sonunda kapı var. Ölçülmüştü: eski fiyat bölümünün tamamında
     tek bir <a> yoktu. "Toplam yok" satırı (noTotal) giriş cümlesine çıktı. */
export function AccountingPrice() {
  const P = C.price;
  const items = accountingItems();
  return (
    <section id={P.id} className="sec-pad sec-night svm-fiyat">
      <div className="container-o">
        <div className="sec-head sec-head-dark">
          <SplitWords
            as="h2"
            text={P.heading}
            accent={P.accent}
            className="h2"
            style={{ color: "#ffffff" }}
          />
          <FadeUp delay={0.2}>
            <p className="sec-lead sec-lead-dark">{P.lead}</p>
          </FadeUp>
        </div>

        <div className="svm-plist">
          {items.map((it, i) => (
            <FadeUp key={it.id} delay={0.06 + i * 0.04}>
              <details className="svm-more svm-more-dark svm-prow" data-inc={it.inclusion}>
                <summary>
                  <span className="svm-prow-t">
                    <b>{it.title}</b>
                    <span className="svm-prow-tags">
                      <em className="svm-badge">{P.badge[it.inclusion]}</em>
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
                  {/* 15.09.2026 · madde 14: her kalemin kendi sayfası var. */}
                  {altHizmetHrefByKalem(it.id) && (
                    <p className="svm-prow-git">
                      <SmartLink href={altHizmetHrefByKalem(it.id) ?? ""}>
                        {it.title}: ayrıntılar, dayanaklar ve sık sorulanlar
                        <ArrowRight size={13} strokeWidth={2.1} aria-hidden="true" />
                      </SmartLink>
                    </p>
                  )}
                </div>
              </details>
            </FadeUp>
          ))}
        </div>

        {/* Kalem notları tutarın neden değişebileceğini söylüyor, o yüzden
            <details> arkasında DEĞİL; kalemin adıyla birlikte yazılıyorlar ki
            hangi tutarı niteledikleri kaybolmasın. */}
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
          <div className="svm-fiyat-alt">
            {/* Özet satırı tutarın iki niteliğini kapalıyken de basıyor (USD,
                KDV hariç); tamamı tek tıkla açılıyor. */}
            <details className="svm-more svm-more-dark">
              <summary>
                {P.termsTitle}
                <span className="svm-more-x" aria-hidden="true" />
              </summary>
              <p>{ACC_PRICE_FOOTNOTE}</p>
            </details>

            <SmartLink href="/basla" className="btn btn-primary">
              {P.cta}
              <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
            </SmartLink>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
