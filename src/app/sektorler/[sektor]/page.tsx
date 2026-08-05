import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Building2,
  Check,
  CreditCard,
  IdCard,
  Landmark,
  Minus,
  Receipt,
  Repeat,
  ShieldCheck,
  Tag,
  TriangleAlert,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import Nav from "@/components/Nav";
import PageHero from "@/components/shared/PageHero";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import SmartLink from "@/components/shared/SmartLink";
import AskCta from "@/components/shared/AskCta";
import { BrandGlyph } from "@/components/shared/BrandMark";
import { Flag } from "@/components/shared/CountryPicker";
import SectorCountryArt from "@/components/sectors/SectorCountryArt";
import { SectorHeroScene } from "@/components/sectors/SectorScenes";
import FinalCta from "@/components/FinalCta";
import { sectorPhoto } from "@/lib/media";
import {
  cardPayFor,
  COMPARE_ROWS,
  hasVisaRoute,
  offerFor,
  sectorFor,
  sectorHref,
  SECTOR_SLUGS,
  VISA_LINE,
  type CompareKey,
  type Sector,
  type SectorCountry,
  type SectorIcon,
} from "@/lib/sectors";
import type { ServiceSlug } from "@/lib/services";
import { COUNTRY_LABELS, type Country } from "@/lib/store";

/* ============================================================================
   SEKTÖR İÇ SAYFASI — /sektorler/[sektor]

   Bu dosyada tek bir cümle yok: sayfada görünen her kelime lib/sectors.ts'te
   duruyor. Şablon yalnızca o veriyi sitenin diliyle diziyor. İkinci sektör
   eklendiğinde buraya dokunulmuyor.

   ###########################################################################
   TEŞHİS — "çok karmaşık ve algılayamadığım bir tarz olmuş"

   Sayfa iki turda yazıldı (önce metin, sonra görseller) ve sonuç müşterinin
   algılayamadığı bir şey oldu. Tarayıcıda ölçüldü (1694px genişlik,
   :3000/sektorler/yazilim-ve-teknoloji) ve beş ayrı sorun çıktı. Beşi de
   birbirini besliyordu:

   1. ÜÇ ÜLKE BÖLÜMÜ SAYFANIN YARISINDAN FAZLASIYDI VE ÜÇÜ AYNI ŞEYDİ.
      Ölçüm: 1131 + 1129 + 1142 = 3402px. Footer hariç sayfanın %56'sı.
      Üçü de birebir aynı iskeleti basıyordu — bayrak + h2 + giriş + şema,
      sonra iki panel (uyum listesi | tahsilat kanalları), sonra amber kısıt
      kutusu, sonra bağlantı hapları. İkinci ülkeye gelen göz "burada yeni bir
      şey yok" diye tarıyor, üçüncüde hiç okumuyor. Sorun tekrarın kendisi
      değil — tekrar tarama için iyidir — sorun her tekrarın 1130 piksel
      sürmesi ve ülkeler arasındaki FARKI hiçbir yerde yan yana koymaması.
      Ziyaretçi Dubai'nin künyesini 1100 piksel akılda tutup İngiltere'ninkiyle
      karşılaştırmak zorunda kalıyordu.

   2. SAYFA AYNI LİSTEYİ İKİ KEZ ANLATIYORDU. Birinci bölüm "kuruluşu belirleyen
      üç şey" diyordu: tahsilat, ekip, faaliyet kodu. İkinci bölüm "tekrar eden
      dört başlık" diyordu: ekip, tahsilat, sahiplik, faaliyet kodu. Aynı liste,
      iki farklı başlıkla, iki farklı düzende (biri numaralı dikey ray, öteki
      koyu zeminde 2x2 açılır kart). Okuyan kişi ikinci bölümde déjà vu
      yaşayıp güvenini kaybediyor.

   3. HER BÖLÜM BAŞKA BİR DÜZENDEYDİ. Sekiz bölümde altı ayrı ızgara dili
      vardı. Ortak bir ritim olmadığı için sayfa "bir sayfa" gibi değil, arka
      arkaya dizilmiş altı ayrı deneme gibi okunuyordu. "Algılayamadığım bir
      tarz" cümlesinin karşılığı büyük ihtimalle bu.

   4. DÖRT SAHNENİN İKİSİ AKIŞI KESİYORDU. Ülke şemaları başlığın YANINDA
      duruyordu, yani göz ülkenin ilk cümlesini okumadan önce koyu bir çizime
      çarpıyordu. Üstelik ikisi (Dubai çatalı, İngiltere uzaktan adımları)
      yanlarındaki metinden fazlasını söylemiyordu.

   5. HİYERARŞİ YOKTU. Uyum listesi, künye, tahsilat kanalları, kısıt ve
      bağlantılar aynı ağırlıkta, aynı boyda kutulardaydı. Hiçbir şey "önce
      şuna bak" demiyordu.

   ###########################################################################
   YENİ AKIŞ — sayfa tek bir soruya yaslanıyor

   Bu sayfaya gelen kişi yazılım/SaaS işi olan ve yurt dışında şirket kurmayı
   düşünen biri; sorduğu şey "benim işim için hangisi mantıklı". Sayfa artık o
   soruyu üç adımda kapatıyor ve hero'da adımların adını söyleyerek başlıyor:

     0 · HERO (h1)      — soru soruluyor, adımların adı veriliyor.
     0b· FOTOĞRAF ŞERİDİ— hero'nun hemen altında, koyudan beyaza geçişi taşıyan
                          tek kare. Dekor: alt="" ve bir iddia taşımıyor.
     1 · KARAR (beyaz)  — kararı veren DÖRT eksen. Eski iki bölüm burada
                          birleşti; hiçbir cümle silinmedi, ikinci bölümün
                          metinleri açılır ayrıntıya taşındı. Sayfanın tezinin
                          şeması (tahsilat akışı) burada, çünkü ilk eksen o.
     2 · SEÇİM (koyu)   — sayfanın omurgası. Önce kısa yol: "şu durumdaysanız
                          şurası" dört satır. Sonra DÖRT ölçütte üç ülke yan
                          yana. Tablonun ayağı üç ülke bölümüne, altındaki çıkış
                          /ulkeler'e iniyor.
     3 · ÜLKE ÜLKE (beyaz ×3) — derin bağlantı hedefleri. Solda o ülkenin kendi
                          anlatısı + dürüst kısıtı, sağda saf görsel.
     4 · ORTAC (koyu)   — "biz bu alanda ne yapıyoruz". Hizmet listesi
                          services.ts'ten türüyor; sektöre özgü olan tek şey her
                          hizmetin yanındaki cümle.
     5 · FinalCta       — sayfanın kendi kapanış bölümü yok: altında zaten
                          FinalCta'nın "Kurulumunuzu bugün başlatalım" bloğu
                          duruyor. Sayfanın tek AskCta'sı 2. bölümde, kararın
                          verildiği yerde.

   Ritim: koyu hero → şerit → beyaz → koyu → beyaz ×3 → koyu → FinalCta.

   ###########################################################################
   BU TURDA NE DEĞİŞTİ — MÜŞTERİNİN BEŞ MADDESİ

   1. "ORTAC NE YAPIYOR" EKLENDİ (4. bölüm). Sayfa sektörü ve üç ülkeyi
      anlatıyordu, firmanın kendi teklifini hiç anlatmıyordu.
   2. ÜÇ ÜLKE BLOĞUNUN SAĞ SÜTUNU SAF GÖRSEL OLDU. Eski KKTC şeması silindi
      (bkz. SectorScenes.tsx); yerine üç ülkeye üç ayrı dekoratif çizim geldi
      (SectorCountryArt.tsx) — etiketsiz, oksuz, iddiasız.
   3. DÜRÜST KISIT SOLA TAŞINDI, metnin altına. Silinmedi, yeri değişti: sağ
      sütun tamamen görsele ayrıldığı için kısıt anlatının devamı oldu.
   4. KIYAS TABLOSU DOKUZ SATIRDAN DÖRDE İNDİ ve /ulkeler'e çıkış aldı.
      Hangi ölçütün neden kaldığı sectors.ts'te satır satır yazılı.
   5. İKİ GERÇEK FOTOĞRAF: hero altındaki şerit ve 4. bölümün yanındaki kare.
      İkisi de lib/media.ts'ten (SWAP:STOCK_PHOTOS) ve ikisi de dekor —
      alt="" ile basılıyorlar, "bizim ofisimiz" gibi bir iddia taşımıyorlar.

   ###########################################################################
   SEO — bu sayfanın varlık sebebi, hiçbiri kaybolmadı

   1. Tek h1 (PageHero) — sektörün kendisi.
   2. Her ülke kendi <section id="…"> bloğunda ve başlığı h2. h2 metni aranan
      cümlenin birebir kendisi ("Dubai'de yazılım şirketi kurmak").
   3. Aynı cümleler sayfa İÇİNDE bağlantı metni olarak da geçiyor: eski
      "atlama şeridi" ayrı bir eleman olmaktan çıktı ama işi kaybolmadı —
      kıyas tablosunun ayağındaki üç düğme aynı üç başlığı taşıyor ve aynı üç
      çapaya iniyor.
   4. generateMetadata, canonical, OpenGraph ve JSON-LD (BreadcrumbList +
      Service) olduğu gibi duruyor.
   5. Her ülke bloğu ilgili ülke ve hizmet sayfalarına iç bağlantı veriyor.
      SmartLink kullanılıyor: yayında olmayan bir adres ölü bağlantı değil,
      sönük "yakında" oluyor.
   6. Kıyas tablosu gerçek bir <table>, ızgara taklidi değil — satır/sütun
      ilişkisi hem ekran okuyucuya hem tarayıcıya yazılı (th scope).
   ========================================================================= */

type Params = Promise<{ sektor: string }>;

/* Şimdilik tek slug üretiyor. sectors.ts'e ikinci sektör girdiği anda burası
   kendiliğinden iki sayfa üretmeye başlıyor. */
export function generateStaticParams() {
  return SECTOR_SLUGS.map((sektor) => ({ sektor }));
}

/* Kanonik adres mutlak yazılıyor: layout.tsx'te metadataBase tanımlı değil,
   göreli bir kanonik geliştirme sunucusunun adresine çözülürdü. Alan adı
   layout.tsx'teki JSON-LD ile aynı kaynaktan. */
const SITE = "https://ortacglobal.com";

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { sektor } = await params;
  const s = sectorFor(sektor);
  if (!s) return {};

  const url = `${SITE}${sectorHref(s.slug)}`;
  return {
    title: s.seo.title,
    description: s.seo.description,
    alternates: { canonical: url },
    /* keywords meta'sı bilerek yok: arama motorları yıllardır yok sayıyor ve
       sayfada zaten karşılığı olan kelimeleri ikinci kez listelemek hiçbir şey
       kazandırmıyor. Sorguların karşılığı başlıklarda ve metnin kendisinde. */
    openGraph: {
      type: "article",
      locale: "tr_TR",
      siteName: "Ortac Global",
      url,
      title: s.seo.title,
      description: s.seo.description,
    },
  };
}

/* sectors.ts ikon adını string taşıyor (bkz. oradaki gerekçe); eşleme burada */
const AXIS_ICON: Record<SectorIcon, LucideIcon> = {
  users: Users,
  repeat: Repeat,
  shield: ShieldCheck,
  tag: Tag,
};

/* Kıyas tablosunun satır ikonları. Ana sayfadaki kıyas tablosuyla (home/
   ThreeCountries.tsx) BİLEREK aynı eşleme: aynı ölçüt sitenin iki yerinde
   farklı bir ikonla çıksa, ikon dili bilgi taşımayı bırakır. */
const ROW_ICON: Record<CompareKey, LucideIcon> = {
  structure: Building2,
  tax: Landmark,
  visa: IdCard,
};

/* "Ortac ne yapıyor" listesinin ikonları. Anahtar services.ts'in ServiceSlug'ı,
   yani kataloğa yeni bir hizmet girerse burada karşılığı olmadığı derleme
   anında görülüyor — sessizce ikonsuz basılmıyor. */
const OFFER_ICON: Record<ServiceSlug, LucideIcon> = {
  "sirket-kurulusu": Building2,
  "banka-hesabi": Wallet,
  muhasebe: Receipt,
  "oturum-vize": IdCard,
  uyum: ShieldCheck,
};

/* ------------------------------------------------------------- kıyas hücresi

   Üç ölçütün biri COUNTRY_SERVICES'ten (oturum/vize), ikisi sektör
   girdisinden geliyor; tahsilat satırı ayrı basılıyor çünkü hücresi tek değer
   değil, liste. Tek bir switch: satırın anahtarı hücrenin nasıl basılacağını da
   belirliyor, yani yeni bir ölçüt eklemek COMPARE_ROWS'a bir satır + buraya bir
   dal demek. */
function CompareCell({ row, c, data }: { row: CompareKey; c: Country; data: SectorCountry }) {
  if (row === "visa") {
    const on = hasVisaRoute(c);
    /* Durum ikonda VE kelimede: renk yalnızca hızlandırıyor, bilgiyi tek başına
       taşımıyor. Kapalı hâl kırmızı çarpı değil nötr eksi — bu sayfanın koyu
       dilinde "kapalı" işareti her yerde eksi (bkz. tahsilat satırı) ve iki
       farklı olumsuz işaret iki farklı derece gibi okunurdu. */
    return (
      <span className="sxk-s" data-v={on ? "yes" : "no"}>
        {on ? (
          <Check size={15} strokeWidth={2.6} aria-hidden="true" />
        ) : (
          <Minus size={15} strokeWidth={2.6} aria-hidden="true" />
        )}
        {on ? VISA_LINE.yes : VISA_LINE.no}
      </span>
    );
  }

  /* Kalan ikisi sektör girdisinden: değer + onu nitelendiren şerh. Şerh
     GİZLENMİYOR ve bir tıklamanın arkasına da konmuyor. Denendi ve geri alındı:
     şerhlerin çoğu üstündeki değeri niteliyor ("%0 otomatik değil", "sonradan
     değiştirmek yeni kuruluş demek"). Tıklama arkasına konunca tablo
     "375.000 AED'ye kadar %0" ifadesini çıplak basmış oluyor — tam olarak
     brand.ts'teki STANCE_LIMITS'in yasakladığı şey. Kademelendirme metni
     azaltmak için var, şerhi saklamak için değil. */
  const cell = data.cells[row];
  return (
    <>
      <b className="sxk-cv">{cell.value}</b>
      {cell.note && <span className="sxk-cn">{cell.note}</span>}
    </>
  );
}

/* ----------------------------------------------------------- kıyas tablosu */

function CompareTable({ s }: { s: Sector }) {
  const order = s.countries.map((c) => c.country);
  /* Ülke başına bir kez okunuyor, satır başına değil: cardPayFor her çağrıda
     matrisi baştan geziyor. */
  const pay = Object.fromEntries(order.map((c) => [c, cardPayFor(c)])) as Record<
    Country,
    ReturnType<typeof cardPayFor>
  >;

  return (
    <div
      className="sxk-wrap"
      tabIndex={0}
      role="region"
      aria-label="Üç ülkenin karşılaştırma tablosu, yatay kaydırılabilir"
    >
      <table className="sxk-tbl">
        <caption className="sr-only">
          {s.name} için üç ülke yan yana, yazılımda kararı çeviren dört ölçütte: kartla
          tahsilat, yapı ve kuruluş, ekip için oturum, vergi çerçevesi.
        </caption>

        <thead>
          <tr>
            <th scope="col" className="sxk-corner">
              Ölçüt
            </th>
            {s.countries.map((c) => (
              <th key={c.country} scope="col">
                <span className="sxk-thc">
                  <span className="sxk-tflag" aria-hidden="true">
                    <Flag country={c.country} />
                  </span>
                  {COUNTRY_LABELS[c.country]}
                </span>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {/* TAHSİLAT SATIRI EN ÜSTTE. Yazılımda ülkeyi çoğu zaman bu satır
              seçiyor: abonelik geliri olan bir şirket için Stripe ve PayPal'ın
              çalışıp çalışmaması bir tercih değil, bir eleme. Başlık ve şerh
              PAY_MATRIX'ten geliyor; matris değişince satır da değişiyor.

              Üç ödeme grubundan yalnızca bu kaldı — banka hesabı ve ödeme
              kuruluşu satırları şirket kuruluşunun genel konusu ve /ulkeler'de
              ölçüt ölçüt duruyorlar (bkz. sectors.ts · cardPayFor). */}
          {pay[order[0]].map((g, gi) => (
            <tr key={g.title}>
              <th scope="row" className="sxk-rowh">
                <span className="sxk-rowh-t">
                  <CreditCard size={15} strokeWidth={1.9} aria-hidden="true" />
                  {g.title}
                </span>
                <span className="sxk-rowh-h">{g.hint}</span>
              </th>
              {order.map((c) => (
                <td key={c} className="sxk-td">
                  <ul className="sxk-chl">
                    {pay[c][gi].items.map((r) => (
                      <li key={r.name} data-v={r.on ? "yes" : "no"}>
                        {/* Beyaz plaka şart: PayPal'ın laciverti ve Stripe'ın
                            moru koyu zeminde kayboluyor (BrandMark.tsx'teki
                            BrandBadge de aynı sebeple plakalı). */}
                        <span className="sxk-chp" aria-hidden="true">
                          {r.brand ? (
                            <BrandGlyph brand={r.brand} size={14} />
                          ) : (
                            <Landmark size={14} strokeWidth={1.9} />
                          )}
                        </span>
                        <span className="sxk-chn">{r.name}</span>
                        {r.on ? (
                          <Check size={14} strokeWidth={2.6} aria-hidden="true" />
                        ) : (
                          <Minus size={14} strokeWidth={2.6} aria-hidden="true" />
                        )}
                        <span className="sr-only">
                          {r.on ? "çalışıyor" : "desteklenmiyor"}
                        </span>
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
          ))}

          {COMPARE_ROWS.map((row) => {
            const Icon = ROW_ICON[row.key];
            return (
              <tr key={row.key}>
                <th scope="row" className="sxk-rowh">
                  <span className="sxk-rowh-t">
                    <Icon size={15} strokeWidth={1.9} aria-hidden="true" />
                    {row.label}
                  </span>
                  {row.hint && <span className="sxk-rowh-h">{row.hint}</span>}
                </th>
                {s.countries.map((c) => (
                  <td key={c.country} className="sxk-td">
                    <CompareCell row={row.key} c={c.country} data={c} />
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>

        {/* Tablonun ayağı sayfanın kendi bölümlerine iniyor, ülke sayfalarına
            değil: ziyaretçi henüz ülke seçmedi, bir sonraki adımı bu sayfada.
            (Ülke sayfalarına giden bağlantılar her ülke bloğunun altında.)

            Bağlantı metni ülke adı değil bölümün TAM BAŞLIĞI — eski "atlama
            şeridi"nin işi buraya taşındı: aranan cümle sayfanın kendi içinde
            bir bağlantı olarak geçiyor. */}
        <tfoot>
          <tr>
            <td className="sxk-corner" />
            {s.countries.map((c) => (
              <td key={c.country} className="sxk-td">
                <a href={`#${c.country}`} className="sxk-go">
                  {c.heading}
                  <ArrowRight size={14} strokeWidth={2.1} aria-hidden="true" />
                </a>
              </td>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

/* ---------------------------------------------------------------- ülke bloğu

   Ayrı bir bileşen çünkü üç kez basılıyor. Kendi <section id>'si var:
   /sektorler/…#dubai doğrudan buraya iniyor.

   BU TURDA NE ÇIKTI: künye tablosu (yapı, faaliyet tanımı, vergi, süre) ve
   tahsilat kanalları paneli. İkisi de yukarıdaki kıyas tablosunda, üç ülke
   için birden ve yan yana duruyor. Burada tekrar edilmeleri bloğu iki katına
   çıkarıyordu ve kıyas değeri sıfırdı — aynı bilgiyi üç ayrı yerde okuyan kişi
   karşılaştırma yapamıyor, sadece yoruluyor.

   NE KALDI: o ülkenin kendi anlatısı (giriş + üç madde), dürüst kısıtı ve iç
   bağlantıları. Üçü de bu bölüme özgü; hiçbiri tabloda yok.

   İKİ SÜTUN, AMA BU TURDA GÖREVLERİ DEĞİŞTİ: solda metnin tamamı (anlatı →
   olumlu maddeler → dürüst kısıt), sağda yalnızca görsel. Önceki kurguda kısıt
   sağ sütundaydı, "olumlunun tam karşısında" duruyordu; müşteri sağ tarafın
   tamamen görsel alanı olmasını istedi ve kısıt için doğru yer de zaten
   anlatının devamı — okuyan kişi "burası neden iyi"nin hemen ardından "neye
   dikkat"i okuyor, gözünü sayfanın öbür tarafına atmadan.

   KISIT BU TURDA AKORDİYONA GİRDİ — ama İÇERİĞİ KISALMADI. Müşteri: "dürüst
   kısıt kısımları var ya onları akordiyona çevir, basınca okusunlar." Üç ülke
   bloğunun her birinde bu kutu açıkta duruyordu ve üçü birden sol sütunu
   uzatıyordu.

   AÇIKTA KALAN ŞEY KAYBOLMADI: kapalı hâlde de kutunun kendisi görünüyor
   (amber zemin, uyarı ikonu, "… tarafında dürüst kısıt" başlığı ve kaç madde
   olduğu). Yani ziyaretçi kısıtın VARLIĞINI tıklamadan öğreniyor, yalnızca
   maddeleri okumak için açıyor. Firma politikasının istediği şey buydu;
   yasaklanan şey kısıtı görünmez yapmaktı, tek satıra indirmek değil.

   MADDE SAYISI VERİDEN GELİYOR (data.limits.length), elle yazılmıyor: bir
   ülkeye kısıt eklendiğinde özet satırı kendiliğinden doğru kalıyor. */
function CountryBlock({ data }: { data: SectorCountry }) {
  const name = COUNTRY_LABELS[data.country];

  return (
    <section id={data.country} className="sxc" aria-labelledby={`${data.country}-h`}>
      <div className="container-o">
        {/* Bayrak ve hüküm satırı başlığın ÜSTÜNDE. Üç bölüm aynı iskeleti
            taşıyor ve bu kasıtlı (ikinci ülkede nereye bakacağını öğrenmiş
            olmak iyi bir şey); tekrar duygusunu kıran şey bu satır — üç ülkede
            üç farklı cümle ve göz onu başlıktan önce okuyor. */}
        <FadeUp>
          <p className="sxc-badge">
            <span className="sxc-flag" aria-hidden="true">
              <Flag country={data.country} />
            </span>
            {data.badge}
          </p>
        </FadeUp>

        <div className="sxc-title" id={`${data.country}-h`}>
          <SplitWords
            as="h2"
            text={data.heading}
            accent={data.accent}
            className="h2 sx-h2"
            style={{ color: "var(--text-900)" }}
          />
        </div>

        <div className="sxc-grid">
          <FadeUp delay={0.1} className="sxc-col">
            <p className="sec-lead">{data.lead}</p>
            <ul className="sxc-fit">
              {data.fit.map((f) => (
                <li key={f}>
                  <i aria-hidden="true">
                    <Check size={12} strokeWidth={3.4} />
                  </i>
                  {f}
                </li>
              ))}
            </ul>

            {/* Dürüst kısıt, native <details>: JavaScript yok, klavye ve ekran
                okuyucu desteği tarayıcıdan geliyor, bileşen sunucu tarafında
                kalabiliyor. Sayfadaki dört eksenle (sx-axis) aynı kalıp —
                ikinci bir açılır tasarım dili girmiyor.

                BAŞLIK <summary>'NİN İÇİNDE h3 OLARAK DURUYOR: HTML'in içerik
                modeli summary'ye tek bir başlık öğesine izin veriyor ve bu
                şart, yoksa üç ülke bloğunun başlık ağacından üç h3 birden
                düşerdi (SEO ve ekran okuyucu gezinmesi ikisi de bu ağaçtan
                besleniyor).

                ÖZET SATIRI BOŞ DEĞİL: kapalı hâlde "Dubai tarafında dürüst
                kısıt · 2 madde" okunuyor, yani kutunun ne olduğu ve ne kadar
                olduğu tıklanmadan belli. */}
            <details className="sxc-limit">
              <summary>
                <h3 className="sxc-lh">
                  <span className="sxc-lic" aria-hidden="true">
                    <TriangleAlert size={15} strokeWidth={2.1} />
                  </span>
                  <span className="sxc-lt">
                    <b>{name} tarafında dürüst kısıt</b>
                    <i>{data.limits.length} madde</i>
                  </span>
                  <span className="sxc-lx" aria-hidden="true" />
                </h3>
              </summary>
              <ul>
                {data.limits.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </details>
          </FadeUp>

          {/* Sağ sütun tamamen görsel. Çizim bir şey ANLATMIYOR ve anlatmaması
              kasıtlı: etiketli bir şema burada metnin söylediğini ikinci kez
              söylerdi. aria-hidden bileşenin kendi içinde (SectorCountryArt) —
              ekran okuyucu için bu sütun hiç yok. */}
          <FadeUp delay={0.18} className="sxc-col sxc-vis">
            <SectorCountryArt country={data.country} />
          </FadeUp>
        </div>

        <FadeUp delay={0.24}>
          <nav className="sxc-links" aria-label={`${name} sayfaları`}>
            {data.links.map((l) => (
              <SmartLink key={l.href} href={l.href} className="sxc-link">
                {l.label}
                <ArrowRight size={14} strokeWidth={2.1} aria-hidden="true" />
              </SmartLink>
            ))}
          </nav>
        </FadeUp>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- sayfa */

export default async function SectorPage({ params }: { params: Params }) {
  const { sektor } = await params;
  const s = sectorFor(sektor);
  if (!s) notFound();

  const url = `${SITE}${sectorHref(s.slug)}`;
  /* Sektörün iki fotoğrafı. Kaydı olmayan sektör de bir şey alıyor
     (lib/media.ts · sectorPhoto), yani dinamik segment her slug'da çalışıyor. */
  const photo = sectorPhoto(s.slug);
  /* Hizmet listesi sektör dosyasında değil, services.ts'teki gerçek katalogda
     duruyor; buradaki tek iş onu sayfanın diline dizmek. */
  const offer = offerFor(s);

  /* JSON-LD — yalnızca sayfada zaten yazan şeyler. Uydurma alan yok:
     puan, yorum sayısı, fiyat ve süre iddiası taşımıyor. BreadcrumbList iki
     basamaklı çünkü bir /sektorler dizin sayfası henüz yok; olmayan bir
     adrese basamak vermek kırık işaretleme olurdu. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana sayfa", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: s.name, item: url },
        ],
      },
      {
        "@type": "Service",
        name: `${s.name} şirketleri için yurt dışında şirket kuruluşu`,
        serviceType: s.name,
        url,
        provider: { "@type": "Organization", name: "Ortac Global", url: SITE },
        areaServed: s.countries.map((c) => ({
          "@type": "Place",
          name: COUNTRY_LABELS[c.country],
        })),
      },
    ],
  };

  return (
    <>
      <Nav />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* country VERİLMİYOR: PageHero o zaman kompakt başlık bloğunu
            basıyor. İki sütunlu hero ülke sayfalarına ait ve buradaki sahne
            tek bir ülkeyi öne çıkarırdı — oysa sayfanın iddiası tam tersi. */}
        <PageHero
          crumb={s.hero.crumb}
          title={s.hero.title}
          accent={s.hero.accent}
          lead={s.hero.lead}
        />

        {/* ---------- 0b · fotoğraf şeridi ----------
            Sayfa baştan sona çizimden ibaretti ve müşterinin gözlemi doğru:
            site görselsiz duruyor. Şerit hero ile ilk beyaz bölümün arasında,
            yani koyudan beyaza geçişi de o taşıyor.

            DEKOR OLDUĞU İŞARETLİ: alt="" — bu kare bir bilgi taşımıyor ve
            "bizim ofisimiz" gibi bir iddiada da bulunmuyor. Kaynağı
            lib/media.ts ve orada SWAP:STOCK_PHOTOS ile işaretli; müşterinin
            kendi çekimi geldiğinde bu dosyada tek satır değişmiyor.

            unoptimized: next.config.ts'te images.remotePatterns tanımlı değil,
            yani iyileştirici dış alan adını reddederdi. URL zaten Unsplash
            CDN'inde boyutlanmış geliyor (blog/[slug] ve hakkimizda aynı
            gerekçeyle aynı şekilde basıyor). */}
        {/* HERO ALTINDAKİ GENİŞ FOTOĞRAF ŞERİDİ KALDIRILDI.

            Müşteri: "yazılım sayfasının direkt girişine yatay kocaman görsel
            koyma ya çok blog sayfası gibi oluyor." Haklı — tam genişlikte bir
            kapak görseli sayfayı bir MAKALE gibi açıyordu, oysa burası bir
            hizmet sayfası. Sayfanın içindeki ikinci fotoğraf (Ortac bölümünün
            yanındaki dikey kare) DURUYOR; sorun görselin kendisi değil, ilk
            ekranda tuttuğu yerdi. */}

        {/* ---------- 1 · kararı veren dört eksen ---------- */}
        <section className="sec-pad" style={{ background: "var(--white)" }}>
          <div className="container-o">
            <div className="sec-head">
              <SplitWords
                as="h2"
                text={s.decide.heading}
                accent={s.decide.accent}
                className="h2"
                style={{ color: "var(--text-900)" }}
              />
              <FadeUp delay={0.2}>
                <p className="sec-lead">{s.decide.lead}</p>
              </FadeUp>
            </div>

            {/* İki sütun: solda dört eksen, sağda sektörün şeması. Şema ızgarada
                İKİNCİ sırada duruyor ama mobilde CSS onu başa alıyor
                (sektor.css · .sx-art order) — telefonda bölümün ilk gördüğü şey
                yine şema olsun diye. */}
            <div className="sx-decide">
              <div className="sx-axes">
                {s.decide.axes.map((a, i) => {
                  const Icon = AXIS_ICON[a.icon];
                  return (
                    <FadeUp key={a.title} delay={0.12 + i * 0.05}>
                      {/* native <details>: JavaScript yok, klavye ve ekran
                          okuyucu desteği tarayıcıdan geliyor, ve sunucu
                          bileşeni olarak kalabiliyor. Açılma animasyonu CSS ve
                          prefers-reduced-motion altında kapalı. Sayfadaki TEK
                          açma hareketi bu — eskiden iki farklı bölümde iki
                          farklı görünümde iki açılır kalıp vardı. */}
                      <details className="sx-axis">
                        <summary>
                          <span className="sx-axis-ic" aria-hidden="true">
                            <Icon size={16} strokeWidth={1.9} />
                          </span>
                          <span className="sx-axis-t">
                            <b>{a.title}</b>
                            <i>{a.line}</i>
                          </span>
                          <span className="sx-axis-x" aria-hidden="true" />
                        </summary>
                        <p>{a.detail}</p>
                      </details>
                    </FadeUp>
                  );
                })}
              </div>

              <FadeUp delay={0.1} className="sx-art">
                <SectorHeroScene slug={s.slug} />
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ---------- 2 · seçim: kısa yol + ölçüt ölçüt kıyas ----------
            Sayfanın omurgası. Koyu zemin bir üslup tercihi değil, hiyerarşi:
            ziyaretçinin duracağı yer burası ve üstündeki beyaz bölümden
            ayrılması gerekiyor. */}
        <section id="karsilastirma" className="sec-pad sec-night">
          <div className="container-o">
            <div className="sec-head sec-head-dark">
              <SplitWords
                as="h2"
                text={s.choose.heading}
                accent={s.choose.accent}
                className="h2"
                style={{ color: "#ffffff" }}
              />
              <FadeUp delay={0.2}>
                <p className="sec-lead sec-lead-dark">{s.choose.lead}</p>
              </FadeUp>
            </div>

            {/* KISA YOL. Dört satırın tamamı tablodan ve PAY_MATRIX'ten
                çıkarılabilir bilgi, ama çıkarmayı ziyaretçiye bırakmak sayfanın
                asıl hatasıydı. Ülke rozetleri çapa: tıklayan doğrudan o
                bölüme iniyor. */}
            <ul className="sxr">
              {s.choose.routes.map((r, i) => (
                /* FadeUp <li>'nin İÇİNDE, dışında değil: <ul> ile <li> arasına
                   bir <div> girmesi geçersiz işaretleme olurdu ve liste
                   semantiği (ekran okuyucuda "4 öğeli liste") kaybolurdu.
                   Izgarayı da FadeUp taşıyor, yani araya fazladan bir kap
                   eklenmiyor. */
                <li key={r.when}>
                  <FadeUp className="sxr-row" delay={0.1 + i * 0.05}>
                    <p className="sxr-when">{r.when}</p>
                    <p className="sxr-to">
                      {r.to.map((c) => (
                        <a key={c} href={`#${c}`} className="sxr-pill">
                          <span className="sxr-flag" aria-hidden="true">
                            <Flag country={c} />
                          </span>
                          {COUNTRY_LABELS[c]}
                        </a>
                      ))}
                    </p>
                    <p className="sxr-why">{r.why}</p>
                  </FadeUp>
                </li>
              ))}
            </ul>

            {/* UZUN YOL — ama artık uzun değil. Kısa yol bir eleme, bu tablo
                gerekçesi; dört ölçütün seçim gerekçesi sectors.ts'te yazılı. */}
            <FadeUp delay={0.14}>
              <CompareTable s={s} />
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="sxk-note">{s.choose.note}</p>
            </FadeUp>

            {/* TAM KIYASA ÇIKIŞ. Bu sayfanın işi genel kıyas değil, yazılımcının
                kararı — dolayısıyla tablodan çıkarılan ölçütler kaybolmuyor,
                kendi sayfalarına gönderiliyor. Düğme değil ok bağlantısı:
                sayfanın tek düğmesi hemen altındaki AskCta ve iki düğme arka
                arkaya ikisini birden zayıflatırdı. */}
            <FadeUp delay={0.22}>
              <p className="sxk-more">
                {s.choose.more.line}{" "}
                <SmartLink href={s.choose.more.href} className="sxk-out">
                  {s.choose.more.label}
                  <ArrowRight size={14} strokeWidth={2.1} aria-hidden="true" />
                </SmartLink>
              </p>
            </FadeUp>

            {/* Kişiye özel vergi görüşü siteden verilmiyor; sorusu olan için tek
                çıkış AskCta ve yeri burası — "mali müşavire danışın" kalıbı
                emekli. Sayfanın sonuna değil kararın verildiği yere konuldu:
                dört yönlendirmenin hiçbiri oturmayan kişi tam burada takılıyor. */}
            <FadeUp delay={0.24}>
              <div className="sxr-ask">
                <p>{s.choose.ask}</p>
                <AskCta label="Durumumu sorayım" tone="solid" />
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ---------- 3 · üç ülke, her biri kendi h2'si ve kendi id'siyle ---------- */}
        {s.countries.map((c) => (
          <CountryBlock key={c.country} data={c} />
        ))}

        {/* ---------- 4 · Ortac bu alanda ne yapıyor ----------
            Sayfanın en büyük eksiğiydi: sektörü ve üç ülkeyi anlatıyor, ama
            firmanın kendi teklifini hiçbir yerde göstermiyordu.

            LİSTE UYDURULMUYOR: offerFor() üç ülkenin gerçek hizmet kataloğunu
            (services.ts · servicesFor) birleştiriyor, başlıklar oradan geliyor.
            Sektör dosyasının katkısı her hizmetin yanındaki tek cümle — yeni
            bir hizmet tarif etmiyor, yapılan işi yazılımın diliyle anlatıyor.

            SAYFANIN SONUNDA, ÜLKE BLOKLARINDAN SONRA: ziyaretçi önce hangi
            ülkenin kendisine uyduğuna bakıyor, sonra o işi kimin yürüttüğüne.
            Ters sırada, henüz kararını vermemiş birine hizmet listesi
            okutuluyor olurdu. Hemen altında FinalCta duruyor, yani bölüm
            doğrudan iletişime akıyor.

            Koyu zemin bir üslup tercihi değil: üstündeki üç ülke bloğu beyaz ve
            bu bölüm onların devamı gibi okunmamalı — burada konu ülke değil,
            firma. */}
        <section id="ortac" className="sec-pad sec-night" aria-labelledby="ortac-h">
          <div className="container-o">
            <div className="sec-head sec-head-dark" id="ortac-h">
              <SplitWords
                as="h2"
                text={s.offer.heading}
                accent={s.offer.accent}
                className="h2"
                style={{ color: "#ffffff" }}
              />
              <FadeUp delay={0.2}>
                <p className="sec-lead sec-lead-dark">{s.offer.lead}</p>
              </FadeUp>
            </div>

            <div className="sxo">
              <ul className="sxo-list">
                {offer.map((o, i) => {
                  const Icon = OFFER_ICON[o.slug];
                  return (
                    <li key={o.slug}>
                      <FadeUp className="sxo-row" delay={0.1 + i * 0.05}>
                        <span className="sxo-ic" aria-hidden="true">
                          <Icon size={17} strokeWidth={1.9} />
                        </span>
                        <span className="sxo-txt">
                          {/* Başlık h3 değil <b>: bu liste bir bölüm hiyerarşisi
                              kurmuyor, tek bir h2'nin altındaki eş öğeler. Beş
                              h3, sayfanın başlık ağacına gerçekte olmayan beş
                              alt bölüm eklerdi. */}
                          <b>{o.title}</b>
                          <i>{o.line}</i>
                        </span>
                      </FadeUp>
                    </li>
                  );
                })}
              </ul>

              <FadeUp delay={0.16} className="sxo-side">
                {/* İkinci fotoğraf. Yine dekor, yine alt="" — bkz. şerit. */}
                <div className="sxo-photo">
                  <Image
                    src={photo.work}
                    alt=""
                    fill
                    sizes="(min-width: 1040px) 420px, 100vw"
                    className="sxo-img"
                    unoptimized
                  />
                </div>
                <p className="sxo-note">{s.offer.note}</p>
              </FadeUp>
            </div>
          </div>
        </section>

        <FinalCta />
      </main>
    </>
  );
}
