import {
  ChartColumn,
  FileStack,
  Landmark,
  Receipt,
  SlidersHorizontal,
  Stamp,
  Wallet,
  X,
  BookOpen,
  type LucideIcon,
} from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import {
  ACCOUNTING_DUBAI,
  ACC_EXCLUDES,
  accountingItems,
  type AccIcon,
} from "@/lib/accountingDubai";
import { KAPSAM } from "@/app/lab/muhasebe/veri";

/* ############################################################################
   /lab/muhasebe-kapsam · "Ne yapıyoruz, ne yapmıyoruz" bölümüne üç aday

   Müşteri: "ne yapıyoruz ne yapmıyoruz kısmı çok arada kalmış gibi duruyor
   bide 4 madde az gibi ama bunların hepsini böyle vermekte sıkıntı, şuan
   sitedeki bilgi olarak daha dolu ama o da çok karışık ve icon cart curt yok
   ya biraz sıkıntı. buraya çeşit denemeni isteyeceğim. genel olarak görünen
   kısımda sade gözüken ama meraklısının üstüne tıkayıp akordiyonla fln daha
   çok şey görebileceği bir mantık kullanabilirz."

   Üç şikâyet, tek eksen: YÜZEY SADE, DERİNLİK TIKLAMAYLA.
   Üç aday da AYNI VERİYİ taşıyor; fark yalnızca o verinin nasıl katmanlandığı.

   ------------------------------------------------------- VERİ NEREDEN GELİYOR
   Tek satır uydurma yok. Kaynak dosyaya dokunulmadı, yalnız okundu:

     lib/accountingDubai.ts · scope.phases   → 5 aşama (title · line · detail)
     lib/accountingDubai.ts · limits.items   → 5 sınır (title · line)
     lib/accountingDubai.ts · exchange       → 3 girdi + 6 çıktı çipi
     lib/accountingDubai.ts · ACC_EXCLUDES   → teklifte hariç yazılan 2 kalem
     lib/afterSetup.ts (accountingItems)     → iki tek seferlik kayıt kalemi
     app/lab/muhasebe/veri.ts · KAPSAM       → bölüm başlığı ve "dahil değil"
                                               etiketi (bugünkü adayın kendisi)

   BUGÜNKÜ ADAYDA EKRANA HİÇ ÇIKMAYAN ALANLAR — ölçüldü:
     · phases[].detail   5 paragraf ·  1.249 karakter · 164 kelime
     · limits[].line     5 gerekçe  ·    799 karakter · 105 kelime
     · exchange çipleri  9 etiket   (bölüm bugün tek bir ikon basmıyor)
     · ACC_EXCLUDES      2 etiket
   Bugünkü bölüm 10 parça taşıyor (4 karo + 6 çıplak başlık); adaylar 28 parça
   taşıyor ve yüzeyde yalnız 5'i duruyor.

   -------------------------------------------------------- NEDEN 4 DEĞİL DE 5
   Müşteri "4 madde az" dedi. Altıncı bir kalem YAZILMADI çünkü veride yok;
   bunun yerine listenin omurgası değişti: bugünkü dört karo (Defter · KDV ·
   Rapor · Arşiv) canlı verinin BEŞ AŞAMASINA döndü. Aşamalar zaten kapsamın
   kendisi ve her birinin ayrıntısı, çıktısı ve sınırı veride yazılı. Yani
   madde 4 → 5 çıkarken taşınan bilgi 10 parçadan 28'e çıkıyor.

   -------------------------------------------- SINIR ARTIK AYRI BÖLÜM DEĞİL
   Bugün "yapmadıklarımız" altı çıplak başlıktan oluşan tek bir akordiyon.
   Adaylarda beş sınırın beşi de AİT OLDUĞU AŞAMANIN içine giriyor, gerekçesiyle
   birlikte. Eşleme uydurma değil, metnin kendisinden:

     "Bordro aylık muhasebede yok"                → gelir/gider takibi
     "Yıl sonu beyanı aylık hizmete dahil değil"  → KDV ve yıllık beyan
     "Kişiye özel vergi görüşü siteden verilmiyor"→ KDV ve yıllık beyan
     "Bağımsız denetim ayrı bir hizmet"           → banka ve denetim uyumu
     "Banka onayı ve otorite hızı bizde değil"    → banka ve denetim uyumu

   Bugünkü listedeki iki kalem (kurumlar vergisi kaydı, KDV kaydı) SINIR DEĞİL:
   ikisini de biz yapıyoruz, yalnızca aylık ücrete dahil değiller. Onlar birinci
   aşamanın (altyapı kurulumu) altına, kendi etiketiyle giriyor — etiket de
   uydurma değil, bugünkü adayın kendi cümlesi (KAPSAM.yokBaslik).

   ------------------------------------------------------------ ÇİPLER NEREDEN
   exchange'in dokuz çipi bu bölümde YENİ BİR İLİŞKİ kuruyor: hangi aşamanın
   neyi ürettiği. Takas panelinde aynı dokuz etiket "sizden gelen / size dönen"
   olarak duruyor; burada "hangi aşamadan çıkıyor" olarak. Etiketler aynı,
   söylenen şey farklı. (Aday kazanırsa bu örtüşme bir karar noktası; rapora
   açık soru olarak yazıldı.)

   ŞERİT YOK (docs/tuzaklar.md · kural 4). Kutu kenarına kalın çubuk çekilmedi;
   ayrım tam çerçeve, zemin ve 1 piksellik ARA çizgilerle yapıldı.
   ############################################################################ */

const C = ACCOUNTING_DUBAI;

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
  /** CSS'teki radyo eşleşmesi buna dayanıyor (K3), o yüzden sabit ve kısa. */
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

export const KALEMLER: Kalem[] = [
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

/* ========================================================== ORTAK PARÇALAR == */

/** Bölüm başlığı. Üç adayda da aynı: metin bugünkü adayın kendi başlığı. */
function Baslik() {
  return (
    <div className="sec-head">
      <SplitWords as="h2" text={KAPSAM.heading} accent={KAPSAM.accent} className="h2" />
    </div>
  );
}

/** Bir kalemin AÇILDIĞINDA görünen gövdesi. Üç adayda birebir aynı bileşen;
    yalnız kabı değişiyor (akordiyon · tablo hücresi · sahne paneli). */
function Govde({ k }: { k: Kalem }) {
  return (
    <>
      <div className="lkp-gov">
        <p className="lkp-gov-h">{k.baslik}</p>
        <p className="lkp-gov-d">{k.detay}</p>
        {k.cipler.length > 0 && (
          <>
            <p className="lkp-lbl">{k.cipBaslik}</p>
            <ul className="lkp-cip">
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
        <div className="lkp-sin">
          <p className="lkp-lbl">{k.sinirBaslik}</p>
          <ul>
            {k.sinir.map((s) => (
              <li key={s.t}>
                <span className="lkp-sin-x" aria-hidden="true">
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

/** Bölümün kapanış satırı. services.ts'teki hariç listesi — aynı bilginin
    teklifte hangi sözcüklerle geçtiği. Üç adayda da var. */
function Haric() {
  if (ACC_EXCLUDES.length === 0) return null;
  return (
    <FadeUp delay={0.3}>
      <p className="lkp-haric">
        Teklifte hariç kalem olarak yazılanlar:{" "}
        {ACC_EXCLUDES.map((e) => (
          <span className="svm-tag" key={e}>
            {e}
          </span>
        ))}
      </p>
    </FadeUp>
  );
}

/* =============================================== K1 · HER KALEM KENDİ AÇILIRI */
/* Beş aşamanın beşi de kendi akordiyonu. Yüzeyde ikon + kısa ad + tek satır;
   açılınca o kalemin KAPSAMI ve SINIRI yan yana geliyor.

   "Yapmadıklarımız" ayrı bir bölüm olmaktan çıkıyor — bugün altı çıplak
   başlık tek bir akordiyonun arkasında duruyor ve gerekçeleri hiç basılmıyor.
   Burada her sınır, ait olduğu aşamanın içinde ve gerekçesiyle.

   Native <details>: JavaScript yok, klavye ve ekran okuyucu davranışı
   tarayıcıdan geliyor, bileşen sunucu tarafında kalıyor. */
export function KapsamK1() {
  return (
    <section id="k1" className="sec-pad lkp-sec">
      <div className="container-o">
        <Baslik />
        <div className="lkp-a">
          {KALEMLER.map((k, i) => (
            <FadeUp key={k.id} delay={0.06 + i * 0.05}>
              <details className="lkp-a-it">
                <summary>
                  <span className="lkp-ic" aria-hidden="true">
                    <k.Ikon size={24} strokeWidth={1.8} />
                  </span>
                  <span className="lkp-a-t">
                    <b>{k.kisa}</b>
                    <span>{k.ozet}</span>
                  </span>
                  <span className="lkp-x" aria-hidden="true" />
                </summary>
                <div className="lkp-a-b">
                  <Govde k={k} />
                </div>
              </details>
            </FadeUp>
          ))}
        </div>
        <Haric />
      </div>
    </section>
  );
}

/* ========================================================== K2 · İKİ KADEME */
/* Birinci kademe bugünkü sadelik: beş ikonlu karo, hiçbiri tıklanmıyor.
   Altında TEK bir kapı ve arkasında gerçek kapsam çizelgesi.

   Neden tablo: bugünkü bölümün "arada kalmış" hissi, kapsamla sınırın iki
   ayrı yerde durmasından geliyor. Çizelge ikisini aynı satıra koyuyor ve
   ziyaretçi beş aşamayı alt alta kıyaslayabiliyor — akordiyonda yapamadığı
   şey bu.

   Kapı sayıları elle yazılmıyor, veriden sayılıyor. */
export function KapsamK2() {
  const sinirSayisi = KALEMLER.reduce((n, k) => n + k.sinir.length, 0);
  return (
    <section id="k2" className="sec-pad lkp-sec" data-alt="">
      <div className="container-o">
        <Baslik />
        <ul className="lkp-karo">
          {KALEMLER.map((k, i) => (
            <FadeUp key={k.id} delay={0.06 + i * 0.05}>
              <li>
                <span className="lkp-ic" aria-hidden="true">
                  <k.Ikon size={24} strokeWidth={1.8} />
                </span>
                <b>{k.kisa}</b>
                <span className="lkp-karo-l">{k.ozet}</span>
              </li>
            </FadeUp>
          ))}
        </ul>

        <FadeUp delay={0.26}>
          <details className="lkp-kapi">
            <summary>
              <span>
                Kapsamın tamamını gör
                <em>
                  {KALEMLER.length} aşama · {sinirSayisi} sınır
                </em>
              </span>
              <span className="lkp-x" aria-hidden="true" />
            </summary>

            {/* overflow-x kabı position: relative — tuzak C. SplitWords'ün
                .sr-only'si bu ağaçta yok ama kural ucuz ve her kapta yazılıyor. */}
            <div className="lkp-tbl-w">
              <table className="lkp-tbl">
                <thead>
                  <tr>
                    <th scope="col">Aşama</th>
                    <th scope="col">Ne yapılıyor</th>
                    <th scope="col">Sınır</th>
                  </tr>
                </thead>
                <tbody>
                  {KALEMLER.map((k) => (
                    <tr key={k.id}>
                      <th scope="row">
                        <span className="lkp-ic lkp-ic-s" aria-hidden="true">
                          <k.Ikon size={18} strokeWidth={1.9} />
                        </span>
                        <b>{k.baslik}</b>
                      </th>
                      <td>
                        <p className="lkp-gov-d">{k.detay}</p>
                        {k.cipler.length > 0 && (
                          <>
                            <p className="lkp-lbl">{k.cipBaslik}</p>
                            <ul className="lkp-cip">
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
                      </td>
                      <td>
                        {k.sinir.length > 0 ? (
                          <>
                            {/* Etiket satır satır: birinci aşamanınki "Aylık
                                ücrete dahil değil", ötekilerinki "Neyi
                                kapsamıyor?". İkisi aynı şey değil ve sütun
                                başlığı ikisini birden söyleyemez. */}
                            <p className="lkp-lbl">{k.sinirBaslik}</p>
                            <ul className="lkp-sin-l">
                              {k.sinir.map((s) => (
                                <li key={s.t}>
                                  <b>{s.t}:</b> {s.l}
                                </li>
                              ))}
                            </ul>
                          </>
                        ) : (
                          <span className="lkp-bos">Bu aşamanın ayrı bir sınırı yok.</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        </FadeUp>

        <Haric />
      </div>
    </section>
  );
}

/* ======================================================== K3 · TEK SAHNE == */
/* Solda beş kalem, sağda seçilenin ayrıntısı. Ekranda hep TEK kalem duruyor
   ama beşine de erişiliyor.

   NEDEN AKORDİYON DEĞİL: müşterinin beğendiği /dubai sayfası ölçüldü ve
   granülasyonu akordiyondan değil DÜĞMEDEN geliyor — 73 <button>, 1 <details>.
   Muhasebe sayfasında tersi: 17 <details>, 17 <button>. Yani "tıklayınca daha
   çok şey" fikri akordiyonla da düğmeyle de kurulabilir; bu aday düğme
   tarafını deniyor.

   MEKANİZMA: gerçek <input type="radio"> + CSS :has(:checked). JavaScript yok,
   durum tarayıcıda, klavyede ok tuşları grubun içinde geziyor. Kalıp bu
   deponun kendi kalıbı (css/lab-hak-levha.css · .lhl-chip, partnerlik.css ·
   .pt-chip) ve <select> yasağının (tuzaklar.md · kural 9) karşılığı.

   Radyoların aria-label'ı ekrandaki kısa adın BİREBİR aynısı: adsız radyo
   ağaçta "on" diye okunuyor (tuzak G) ve erişilebilir ad görünen metni
   içermek zorunda (WCAG · Label in Name). */
export function KapsamK3() {
  return (
    <section id="k3" className="sec-pad lkp-sec">
      <div className="container-o">
        <Baslik />
        <FadeUp delay={0.1}>
          <div className="lkp-s">
            <div className="lkp-s-rail" role="group" aria-label={KAPSAM.heading}>
              {KALEMLER.map((k, i) => (
                <label className="lkp-s-chip" key={k.id}>
                  <input
                    type="radio"
                    name="lkp-s"
                    id={`lkp-s-${k.id}`}
                    defaultChecked={i === 0}
                    aria-label={k.kisa}
                  />
                  <span className="lkp-ic" aria-hidden="true">
                    <k.Ikon size={22} strokeWidth={1.8} />
                  </span>
                  <span className="lkp-s-t">
                    <b>{k.kisa}</b>
                    <span>{k.ozet}</span>
                  </span>
                </label>
              ))}
            </div>

            <div className="lkp-s-panels">
              {KALEMLER.map((k) => (
                <div className="lkp-s-panel" data-for={k.id} key={k.id}>
                  <Govde k={k} />
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
        <Haric />
      </div>
    </section>
  );
}
