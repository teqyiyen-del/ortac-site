import {
  ArrowRight,
  BookOpen,
  Building2,
  CalendarCheck,
  ChartColumn,
  FileCheck2,
  FileStack,
  FileText,
  FolderOpen,
  Hash,
  Info,
  Landmark,
  MapPin,
  Quote,
  Receipt,
  ScanSearch,
  ScrollText,
  SlidersHorizontal,
  Stamp,
  UserRound,
  Users,
  Wallet,
  X,
  type LucideIcon,
} from "lucide-react";
import AskCta from "@/components/shared/AskCta";
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
  type AccNeedIcon,
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
/* 15.09.2026 · İMZA SAHİBİNİN KUTUSU (marketing listesi, madde 11-12).
   Veri ve üç hâlin kaydı accountingDubai.ts · expert.

   ÜÇÜNCÜ HÂL: solda alıntı (künye satırı 17.09'da geri geldi), sağda gece kutu. Kutunun
   içi üç kat, üçü de cümlesiz:
     baş    baş harf dairesi · etiket · ad · sıfatlar
     rakam  iki büyük rakam yan yana, altlarında iki kelimelik açıklama
     dip    lisans / vergi ajanı no, YALNIZ veri varsa (bugün basılmıyor)
   Göz kutuda üç şey okuyor: kim, ne sıfatla, ne kadar süredir. */
export function AccountingQuote() {
  const q = C.ortac.quote;
  const e = C.expert;
  const lisans = e.license.number
    ? `${e.license.number}${e.license.authority ? ` · ${e.license.authority}` : ""}`
    : "";
  const dip = [
    lisans && { k: e.license.label, v: lisans, href: e.license.verifyUrl },
    e.taxAgent.taan && { k: e.taxAgent.label, v: e.taxAgent.taan, href: e.taxAgent.verifyUrl },
  ].filter(Boolean) as { k: string; v: string; href: string }[];

  return (
    <section className="svm-alinti">
      <div className="container-o svm-alinti-in">
        <FadeUp>
          <figure>
            <Quote size={30} strokeWidth={1.6} aria-hidden="true" />
            <blockquote>{q.text}</blockquote>
            {/* 17.09.2026 · GERİ GELDİ. Burak: "alıntının altında murat abinin
                ismi geçsin yine ilk versiyondaki gibi." Üçüncü hâlde "kutu
                yanında, iki kez yazmak kalabalık" diye kaldırılmıştı; alıntı
                künyesiz kalınca sözün kime ait olduğu kutuya bakmadan
                okunmuyordu. İlk hâlin işaretlemesi ve ölçüsü birebir. */}
            <figcaption>
              <b>{q.who}</b>
              <span>{q.role}</span>
            </figcaption>
          </figure>
        </FadeUp>

        <FadeUp delay={0.12}>
          <aside className="svm-imza" aria-labelledby="svm-imza-ad">
            <div className="svm-imza-bas">
              {e.photo ? (
                // eslint-disable-next-line @next/next/no-img-element -- tek küçük portre
                <img className="svm-imza-foto" src={e.photo} alt="" width={52} height={52} />
              ) : (
                <span className="svm-imza-foto" aria-hidden="true">
                  {e.initials}
                </span>
              )}
              <div>
                <p className="svm-imza-ust">{e.heading}</p>
                <h2 id="svm-imza-ad" className="svm-imza-ad">
                  {e.name}
                </h2>
                <p className="svm-imza-sifat">{e.credentials.join(" · ")}</p>
              </div>
            </div>
            <dl className="svm-imza-sayi">
              {e.stats.map((st) => (
                <div key={st.t}>
                  <dt>{st.t}</dt>
                  <dd className="data">{st.n}</dd>
                </div>
              ))}
            </dl>
            {dip.length > 0 && (
              <dl className="svm-imza-dip">
                {dip.map((d) => (
                  <div key={d.k}>
                    <dt>{d.k}</dt>
                    <dd>
                      {d.href ? (
                        <a href={d.href} target="_blank" rel="noopener noreferrer">
                          {d.v}
                        </a>
                      ) : (
                        d.v
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </aside>
        </FadeUp>
      </div>
    </section>
  );
}

/* Devir listesinin ikonları · accountingDubai.ts · AccNeedIcon ile birebir.
   Altı kalem, altı ayrı ikon (18.09.2026: "öncekinde tüm iconlar aynıydı fln
   ondan sıkıntıydı"). */
const NEED_ICON: Record<AccNeedIcon, LucideIcon> = {
  numara: Hash,
  beyanname: FileCheck2,
  defter: BookOpen,
  banka: Landmark,
  lisans: ScrollText,
  denetim: ScanSearch,
};

/* ====================================================== 2b · GEÇİŞ (#gecis)
   15.09.2026 · marketing listesi, madde 8. Veri accountingDubai.ts ·
   switchover; dört hâlin kaydı orada.

   18.09.2026 · ÖNCE G2 (tam gece bant), AYNI GÜN G1. Burak: "live tarafta g1
   daha iyi olacak gibi ama g2 deki gibi devir durumumu sorayım butonunu ya
   boxun içine alalım ya da yukardaki başlığın sağına alalım."
   Bölüm beyaz, içinde GECE KART; hat kartın içinde, çıkış da kartın içinde
   (gerekenler listesinin sağında). Kartın dışında düğme kalmadı: G1'in ilk
   hâlinde düğme kartın altında ayrı duruyordu ve bandın parçası gibi
   okunmuyordu. Tam gece hâli (G2) labda kayıt olarak duruyor.
   Hat: solda önceki muhasebeci, ortada dört numaralı durak, sağda Ortac.
   Hattın üstünde bir belge akıyor; belge durağa vardığı anda o durak doluyor
   ve numarası beyazlıyor — tek döngü, 7.919 ms (tuzaklar.md · K: sayfadaki
   öteki sürekli hareketlerle periyodu asal). Hareket kapalıyken duraklar
   numaralı ve açık mavi, belge ilk durağın üstünde bekliyor.

   Adımların açıklama cümleleri (steps[].line) EKRANDA DEĞİL: dört hâlin
   ortak şikâyeti metindi ("texte boğulmuş"). Cümleler veride duruyor.

   GEREKENLER: altı kalem, altısı da AYRI ikon (switchover.needs · ikon adı);
   iki sütun, çıkışın yanında. Aynı liste labdaki G1 ve G3'te de basılıyor.

   HAT BURADAN DIŞA AÇIK (GecisHat): /lab/muhasebe-gecis'in G1 adayı aynı
   hattı gece kartın içinde kullanıyor, ikinci bir kopya çıkmasın diye. */
export function GecisHat() {
  const S = C.switchover;
  return (
    <div className="svm-gc-hat">
      {/* 18.09.2026 · "Önceki muhasebeciniz" → "X Muhasebe". Burak: "önceki
          muhasebeciniz değil de X Muhasebe diyelim oraya direkt ve tek satırda
          kalsın." İki satırlık etiket hattın sol ucunu sağ ucundan aşağı
          düşürüyordu; tek satır hem o hizasızlığı hem de uzun cümleyi
          kaldırıyor. Ad uydurma bir firma DEĞİL, bilerek harf: "X" okuyucunun
          kendi muhasebecisinin yerine koyduğu boşluk. */}
      <div className="svm-gc-uc">
        <span className="svm-gc-uc-d" aria-hidden="true">
          <UserRound size={20} strokeWidth={1.8} />
        </span>
        <b>X Muhasebe</b>
      </div>

      {/* Belge <ol>'un DIŞINDA: <ol>'un doğrudan çocuğu yalnız <li> olabilir. */}
      <div className="svm-gc-yol">
        <span className="svm-gc-belge" aria-hidden="true">
          <FileText size={15} strokeWidth={2} />
        </span>
        <ol className="svm-gc-durak">
          {S.steps.map((a, i) => (
            <li key={a.title} style={{ "--svm-gc-i": i } as React.CSSProperties}>
              <span className="svm-gc-n data" aria-hidden="true">
                {i + 1}
              </span>
              <b>{a.title}</b>
            </li>
          ))}
        </ol>
      </div>

      <div className="svm-gc-uc" data-biz="">
        <span className="svm-gc-uc-d" aria-hidden="true">
          <Stamp size={20} strokeWidth={1.8} />
        </span>
        <b>Ortac ekibi</b>
      </div>
    </div>
  );
}

/** Devir için gerekenler · kalem başına ayrı ikon. Gece yüzeyler için. */
export function GecisGerekenler() {
  const S = C.switchover;
  return (
    <ul className="svm-gc-gerek" aria-label={S.needsTitle}>
      {S.needs.map((n) => {
        const Ikon = NEED_ICON[n.ikon];
        return (
          <li key={n.t}>
            <span aria-hidden="true">
              <Ikon size={16} strokeWidth={1.9} />
            </span>
            {n.t}
          </li>
        );
      })}
    </ul>
  );
}

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

        <FadeUp delay={0.1}>
          <div className="svm-gc-kart">
            <GecisHat />
            <div className="svm-gc-alt">
              <div>
                <p className="svm-gc-alt-h">{S.needsTitle}</p>
                <GecisGerekenler />
              </div>
              <AskCta label={S.askLabel} href={S.askHref} tone="solid" />
            </div>
          </div>
        </FadeUp>
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
                  {/* 18.09.2026 · KALEM NOTU AÇILIRIN İÇİNE GİRDİ. Eskiden
                      listenin ALTINDA üç satırlık ayrı bir blok olarak hep
                      görünüyordu. Burak: "bağımsız denetimin aşağısında bir
                      yazı daha var, orada yine bir şeyler yazıyor, bunlar
                      kimse okumayacak … öyle şeyin altına bir şey koymana
                      gerek yok."

                      Notun işi tutarın neden değişebileceğini söylemek; o
                      soruyu soran zaten kalemi açıyor. Kalemin adıyla
                      birlikte yazılmasına da gerek kalmadı, çünkü artık
                      kendi kaleminin içinde duruyor. */}
                  {it.note && <p className="svm-prow-not">{it.note}</p>}
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

        {/* SİLİNDİ · .svm-pnotes (18.09.2026). Kalem notlarının listenin
            altında hep görünen bloğuydu; artık her not kendi kaleminin
            açılırında (yukarıdaki nota bak). Eski gerekçe "hangi tutarı
            niteledikleri kaybolmasın" idi ve o sorun da kendiliğinden
            çözüldü: not artık nitelediği tutarın İÇİNDE. */}

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
