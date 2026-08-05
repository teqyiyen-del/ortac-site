import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  Boxes,
  Building2,
  ChartCandlestick,
  Code2,
  Compass,
  Handshake,
  History,
  Languages,
  LayoutDashboard,
  Mail,
  MapPin,
  Phone,
  Quote as QuoteMark,
  Stamp,
  Stethoscope,
  Target,
  TriangleAlert,
  UserRound,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import Nav from "@/components/Nav";
import FinalCta from "@/components/FinalCta";
import PageHero from "@/components/shared/PageHero";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import SmartLink from "@/components/shared/SmartLink";
import AskCta from "@/components/shared/AskCta";
import { BrandChip } from "@/components/shared/BrandMark";
import { Flag } from "@/components/shared/CountryPicker";
import CountUp from "@/app/hakkimizda/CountUp";
import SummaryArt, { SCENE_OBJECTS } from "@/app/hakkimizda/SummaryArt";
import { brandKeyForName } from "@/lib/brands";
import { CHAIN, COUNTRY_NAME, PARTNERS, STANCE_LIMITS } from "@/lib/brand";
import { COUNTRY_PHOTO, TEAM_PHOTO } from "@/lib/media";
import { sectorHref } from "@/lib/sectors";
import {
  BASIS,
  CONTACT,
  FOR_WHOM,
  HERO,
  HOW,
  IDENTITY,
  OPENING,
  QUOTE,
  SEO,
  SUMMARY,
  WHERE,
  structureOf,
  type AboutIcon,
  type ContactKind,
  type SummaryKey,
} from "@/lib/about";

/* ============================================================================
   HAKKIMIZDA — /hakkimizda

   Bu dosyada tek bir cümle yok. Sayfada görünen her kelime lib/about.ts'te ya
   da lib/brand.ts'te duruyor; şablon yalnızca onu diziyor. Sebebi onaydan
   geliyor: firma hakkındaki iddiaları müşteri ve muhasebeci tek dosyadan
   okuyup onaylayabilsin, kimse doğrulama yapmak için React okumak zorunda
   kalmasın.

   ------------------------------------------------------ NEDEN BAŞTAN YAZILDI
   Önceki sürüm ekranda çöküyordu ve sebebi tek bir şeydi: bu sayfanın CSS'i
   hiç yazılmamıştı (hakkimizda.css tek satırlık bir yer tutucuydu). Flag
   bileşeni width/height taşımayan çıplak bir <svg> döndürüyor — kabı
   ölçülmediğinde bayrak kabına yayılıyor ve ekranı kaplıyor. Aynı sebeple
   metinler de biçimsiz akıyordu.

   Bu turda hem CSS yazıldı hem sayfa yeniden kurgulandı. En büyük kurgu
   değişikliği: ÜÇ ÜLKE KÜRESİ KALDIRILDI. Mutlak konumlu bayrak işaretleriyle
   dolu bir tel kafes küre, sayfaya hiçbir bilgi eklemeden bütün kırılganlığı
   üstlenen parçaydı — ve kırıldığı yer tam olarak orasıydı. Yerine aynı üç
   ülkeyi taşıyan ama ölçüsü sabit üç kart geldi.

   ---------------------------------------------- MÜŞTERİNİN İKİ KURALI, BURADA
   1) "Her section özet versin, detay tıklamayla ya da başka sayfada açılsın."
      Ülke kartları ülke sayfasına, sektör kartları sektör sayfasına çıkıyor.

      DİKKAT — bu kuralın İKİ istisnası var ve ikisi de müşterinin kendi geri
      bildiriminden çıktı:

        · Vizyon ve misyon bir tur boyunca <details> içinde kapalı bekledi,
          müşteri sayfayı okudu ve "vizyon misyon hiç yazmıyor" dedi. Kapalı
          duran şey görülmüyor. Artık açıkta. Aynısı taahhüt sınırları için de
          geçerli (bkz. 5. bölüm).
        · Açılıştaki üç kutucuk bir tur boyunca sayfanın İÇİNDEKİLER TABLOSUYDU
          — her rakam kendi bölümüne inen bir çapaydı. Müşteri o işi iptal
          etti: "bir yere yönlendiren bir tarzı fln olmasın aşağı fln
          göndermesin ya sadece sayı verelim." Artık bağlantı değiller.

   2) "Anlatmayacağız, göstereceğiz." Sayfada iki paragraflık tek bir düz
      metin var (açılış) ve o da müşterinin talebi. Geri kalan her bilgi bir
      yapıya bağlı: künye bir tabloya, ülke bir bayrak diskine, hizmet sırası
      numaralı bir raya, ortaklar gerçek marka işaretlerine, sektörler kartlara.

   ------------------------------------------------------------------- AKIŞ
   Sayfa bir kurumsal broşür değil, bir kayıt zinciri:

     1  kim olduğumuz ekip fotoğrafı + iki paragraf + vizyon/misyon + üç bento
     2  neredeyiz     üç ülke, üç kart, üç çıkış               #nerede
     3  (alıntı)      Murat Ortaç
     4  neye dayanarak  dört olgu + iki ayrı ortak grubu
     5  nasıl         beş halkalı ray + üç ilke + taahhüt sınırları  #nasil
     6  kimler için   altı sektör                              #sektorler
     7  künye         kolofon — sayfanın dipnotu
     8  temas         tek çıkış

   ---------------------------------------------------- AÇILIŞ NEDEN DEĞİŞTİ
   1. bölüm bir tur önce KÜNYE TABLOSUYDU. Müşteri reddetti: "firma künyesi
   kısmına gerek yok hakkımızda bölümünde... bir kısım olsun ve görselle
   açılsın, oraya bi ekip fotosu bulur koyarsın." İki iş birden çıktı:

     · Açılış görselle açılıyor (media.ts · TEAM_PHOTO — yer tutucu, müşteri
       kendi çekimiyle değiştirecek) ve yanında firmanın ne yaptığını düz
       cümleyle söyleyen iki paragraf var. Sayfada daha önce böyle bir metin
       hiç yoktu.
     · Vizyon ve misyon aynı bölümde, AÇIK iki kart olarak duruyor.

   Künye silinmedi, 7. bölüme indi: veri doğrulanmış ve /basinda-biz oradaki
   dört satırı basıyor ama beşincisini ("Müşteri paneli · TaxDome") basmıyor.
   Gerekçenin tamamı about.ts · IDENTITY başında.

   -------------------------------------------------------------- ZEMİN RİTMİ
   beyaz(açılış) → gece(ülkeler) → mavi(alıntı) → beyaz(dayanak) → gece(nasıl)
   → beyaz(sektörler) → gri(künye + temas). Son iki bölüm BİLEREK aynı gri
   zeminde: künye ile iletişim tek bir kapanış alanı, sayfanın dipnotu. Onun
   dışında hiçbir yerde iki bölüm aynı zeminle arka arkaya gelmiyor.

   ------------------------------------------------------------ SUNUCU BİLEŞENİ
   Sayfa "use client" DEĞİL ve öyle kalmalı: generateMetadata ve JSON-LD
   sunucu tarafında üretiliyor. Sayfadaki hareketin neredeyse tamamını FadeUp
   ve SplitWords taşıyor; ikisi de istemci bileşeni ve MotionConfig
   reducedMotion="user" altında çalışıyor (Providers.tsx).

   İSTEMCİYE İNEN TEK YENİ ŞEY sayaç (CountUp.tsx) ve o da sayfanın ağacını
   değiştirmiyor — sunucu son rakamı basıyor, sayaç yalnızca o düğümün
   textContent'ini oynatıyor. Bento kutucuklarının sağındaki üç SVG sahnesi
   (SummaryArt.tsx) SUNUCU BİLEŞENİ: hareketleri saf CSS, tarayıcıya oradan
   tek satır JavaScript inmiyor.

   ------------------------------------------------------ BU TURDA NE DEĞİŞTİ
   Beş düzeltme geldi ve dördü bu dosyada görünüyor:

     · hero        başlık kısaldı — eskisi hizmet tanımının tamamıydı
                   ("upuzun"). Tanım kaybolmadı, lead'e indi (about.ts · HERO).
     · üç kutucuk  bento oldu: çapa ve chevron gitti, mavi üst şerit gitti,
                   rakam sayaçla geliyor ve her kutunun sağında o rakamı çizen
                   bir SVG sahnesi var (1. bölüm).
     · ülkeler     Dubai'nin "Kendi ofisimiz" rozeti kalktı — üç ülkede de
                   kendi ofisimiz var (2. bölüm).
     · künye       kutu, mavi antet şeridi ve filigran mühür kalktı; yerine
                   gazete künyesi düzeni (7. bölüm).

   Bir önceki turdan gelen ve DURAN şeyler: ülke kartlarındaki fotoğraf
   şeritleri, alıntının mavi kâğıdı, zincir rayındaki ışık, sektör kartlarının
   hover'ı, açılış fotoğrafı ve açık duran vizyon/misyon kartları.

   ----------------------------------------------------------- HAREKET BÜTÇESİ
   Giriş hareketleri: hepsi FadeUp / SplitWords, hepsi whileInView + once.

   BU SAYFANIN KENDİ CSS'İNDEN gelen sürekli hareket DÖRT TANE ve sayı bu
   turda 1'den 4'e çıktı — üçü bento kutucuklarının sahneleri (abxSpin ·
   abxSlide · abxStep), biri zincir rayındaki ışık (abRailRun). Bütçe bilerek
   büyütüldü: müşteri kutucuklara SVG animasyonu istedi ve üçü aynı satırda,
   yani aynı anda görülüyor. Kontrol altında tutan üç şey:

     · Periyotlar ortak katsız (13s · 17s · 23s · 7,5s) — hiçbir zaman aynı
       anda "atmıyorlar", sayfa tek bir nabza kilitlenmiyor.
     · Dördü de saf CSS ve yalnızca transform / opacity / background-position
       üzerinde: her karede JS yok, düzen hesabı yok, sekme arkaya alındığında
       tarayıcı durduruyor.
     · prefers-reduced-motion: reduce altında DÖRDÜ DE hiç başlamıyor. Üçünün
       tanımı yalnızca no-preference içinde (yani duraklatılmış bir animasyon
       bile kalmıyor), rayınki de `display: none` ile kaldırılıyor.

   ÖLÇÜM NOTU: ekranda getAnimations() sekiz sonsuz animasyon sayıyor. Dördü
   yukarıdakiler, kalan dördü PAYLAŞILAN BİLEŞENLERDEN geliyor — PageHero'nun
   ızgara/glow zemini (phgDrift · phgBreathe) ve FinalCta'nın zemini
   (ft2Drift · ft2Breathe). İkisi de bu sayfaya özel değil, sitedeki her
   sayfada aynı ve bu dosyanın bütçesine girmiyor.

   Math.random() yok, her karede JS yok.
   ========================================================================= */

const SITE = "https://ortacglobal.com";
const PATH = "/hakkimizda";

/* about.ts ikonu string taşıyor (bkz. oradaki gerekçe: dosya React'ten
   bağımsız kalsın). Metin ile görselin buluştuğu tek yer burası. */
const ICONS: Record<AboutIcon, LucideIcon> = {
  stamp: Stamp,
  handshake: Handshake,
  office: Building2,
  history: History,
  team: UsersRound,
  language: Languages,
  panel: LayoutDashboard,
};

const CONTACT_ICONS: Record<ContactKind, LucideIcon> = {
  phone: Phone,
  mail: Mail,
  address: MapPin,
};

/* Sektör ikonları ana sayfadaki kartlarla AYNI: aynı sektörün iki sayfada iki
   farklı glifle çıkması, ziyaretçinin kurduğu görsel eşlemeyi bozuyor. */
const SECTOR_ICONS: Record<string, LucideIcon> = {
  "e-ticaret": Boxes,
  "yazilim-ve-teknoloji": Code2,
  danismanlik: UserRound,
  gayrimenkul: Building2,
  "finans-ve-yatirim": ChartCandlestick,
  "saglik-ve-medikal": Stethoscope,
};

export function generateMetadata(): Metadata {
  /* Kanonik mutlak yazılıyor: layout.tsx'te metadataBase tanımlı değil ve
     göreli bir kanonik geliştirme sunucusunun adresine çözülürdü. */
  return {
    title: SEO.title,
    description: SEO.description,
    alternates: { canonical: `${SITE}${PATH}` },
    openGraph: {
      type: "profile",
      locale: "tr_TR",
      siteName: "Ortac Global",
      url: `${SITE}${PATH}`,
      title: SEO.title,
      description: SEO.description,
    },
  };
}

/* ------------------------------------------------------------ ortak parçalar */

/* Marka işareti olan ortak BrandChip ile, olmayan (TaxDome — resmî vektörü
   depoda yok) düz metinle çıkıyor. Renk uydurulmuyor: yanlış bir logo,
   logosuzluktan daha kötü. */
function PartnerRow({ name, role }: { name: string; role: string }) {
  const key = brandKeyForName(name);
  return (
    <li className="ab-prow">
      {key ? <BrandChip brand={key} size={18} /> : <b className="ab-prow-n">{name}</b>}
      <span className="ab-prow-r">{role}</span>
    </li>
  );
}

/* ------------------------------------------------------------------- sayfa */

export default function AboutPage() {
  const identityRows = IDENTITY.rows.filter((r) => r.value);
  const channels = CONTACT.channels.filter((c) => c.value);
  const officialPartners = PARTNERS.filter((p) => p.group === "resmi");
  const infraPartners = PARTNERS.filter((p) => p.group === "altyapi");

  /* Özet kutucuklarındaki üç sayı ELLE YAZILMIYOR, dizilerin uzunluğu.
     Bir ülke ya da sektör eklendiğinde kutucuk kendiliğinden doğru kalıyor;
     yanlış bir sayı, hiç olmayan bir sayıdan daha kötü olurdu. */
  const COUNTS: Record<SummaryKey, number> = {
    where: WHERE.countries.length,
    chain: CHAIN.length,
    sectors: FOR_WHOM.sectors.length,
  };

  /* UYUŞMAZLIK BEKÇİSİ — geliştirmede, sunucu konsoluna.
     Rakam veriden türüyor ve hep doğru; sahnedeki nesneler ise ELLE çizilmiş
     geometri (üç iğne 120° arayla, beş halka 25 birim arayla, altı karo
     3 × 2). Bir ülke ya da sektör eklendiğinde rakam kendini düzeltiyor ama
     çizim düzeltmiyor: kutucuk "6" yazarken beş karo gösterebilir.

     Bu sessiz bir hata olurdu — tip denetimi de derleme de görmez. Uyarı
     yalnızca geliştirmede çalışıyor ve üretim paketine hiçbir şey eklemiyor;
     çözümü de tek yerde: SummaryArt.tsx'teki ilgili sahneyi yeniden çizmek. */
  if (process.env.NODE_ENV !== "production") {
    for (const k of Object.keys(SCENE_OBJECTS) as SummaryKey[]) {
      if (SCENE_OBJECTS[k] !== COUNTS[k]) {
        console.warn(
          `[hakkimizda] Bento sahnesi eskimiş: "${k}" için veri ${COUNTS[k]} diyor, ` +
            `SummaryArt.tsx ${SCENE_OBJECTS[k]} nesne çiziyor. Sahneyi yeniden çiz.`,
        );
      }
    }
  }

  /* JSON-LD — YALNIZCA sayfada zaten yazan, doğrulanmış alanlar.
     Bilerek YOK: foundingDate, numberOfEmployees, address, telephone, email,
     aggregateRating, review. Hiçbirinin doğrulanmış karşılığı elimizde yok ve
     yapısal veride uydurma alan, sayfadaki uydurma cümleden daha ağır bir
     hata: arama motoruna makine tarafından okunabilir bir iddia veriyor.

     @id veriliyor çünkü layout.tsx sitenin her sayfasında asgari bir
     Organization düğümü basıyor; ikisi aynı kurumu anlatıyor ve aynı url'i
     gösteriyor. Bu sayfa o düğümün tam hâli. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana sayfa", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: HERO.crumb, item: `${SITE}${PATH}` },
        ],
      },
      {
        "@type": "Organization",
        "@id": `${SITE}/#organization`,
        name: "Ortac Global",
        alternateName: "Ortac International Accounting",
        legalName: "Ortac Accounting Services LLC",
        url: SITE,
        description: SEO.description,
        areaServed: [
          { "@type": "Place", name: "Dubai" },
          { "@type": "Place", name: "Birleşik Krallık" },
          { "@type": "Place", name: "KKTC" },
        ],
        knowsAbout: [
          "Şirket kuruluşu",
          "Vergi danışmanlığı",
          "Muhasebe",
          "Denetim",
          "Banka hesabı açılışı",
          "Uyum ve AML",
        ],
        employee: {
          "@type": "Person",
          name: "Murat Ortaç",
          jobTitle: "Managing Partner",
        },
      },
      {
        "@type": "AboutPage",
        name: SEO.title,
        url: `${SITE}${PATH}`,
        about: { "@id": `${SITE}/#organization` },
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

        {/* country VERİLMİYOR: PageHero kompakt başlık bloğunu basıyor. İki
            sütunlu hero tek bir ülkenin sahnesini çiziyor ve bu sayfanın
            iddiası tam tersi — üç ülke eşit. */}
        <PageHero crumb={HERO.crumb} title={HERO.title} accent={HERO.accent} lead={HERO.lead} />

        {/* ================= 1 · KİM OLDUĞUMUZ =================
            Sayfanın yeni açılışı. Bir tur önce burada künye tablosu vardı;
            müşteri onu reddetti ve yerine "görselle açılan, biraz vizyoner"
            bir bölüm istedi. Bölüm üç parçadan kuruluyor:

              a) fotoğraf + iki paragraf — firmanın ne yaptığı, düz cümleyle
              b) vizyon ve misyon — AÇIK iki kart, firmanın kendi ifadesi
              c) üç rakam — sayfanın içindekiler tablosu (eskiden de vardı)

            FOTOĞRAF SOLDA ve ızgarada İLK: müşteri "görselle açılsın" dedi.
            Dar ekranda ızgara tek sütuna iniyor ve fotoğraf yine ilk sırada
            kalıyor, yani bölüm her genişlikte görselle açılıyor. */}
        <section className="sec-pad">
          <div className="container-o">
            <div className="ab-open">
              {/* <figure> + <figcaption>: künye satırı fotoğrafın PARÇASI,
                  yanına konmuş bağımsız bir not değil. Ekran okuyucu ikisini
                  birlikte okuyor ve "bu kare temsilî" bilgisi görselden
                  kopmuyor.

                  FadeUp ızgara hücresi oluyor (className), <figure>'ı
                  sarmalamak için fazladan bir kap eklenmiyor. */}
              <FadeUp className="ab-open-figw" y={20}>
                <figure className="ab-open-fig">
                  {/* alt="" ve DEKORATİF. Bu kare "işte ekibimiz" demiyor ve
                      diyemez: media.ts'teki adres bir Unsplash yer tutucusu.
                      Ülke kartlarındaki fotoğraflarda da aynı kalıp kullanıldı
                      (bkz. 2. bölüm · WHERE.photoNote) — stok bir kareyi
                      firmanın kendi çekimi gibi göstermek, bu sayfanın baştan
                      sona reddettiği şey olurdu.

                      unoptimized: next.config.ts'te remotePatterns tanımlı
                      değil, sitedeki bütün uzak görseller böyle basılıyor. */}
                  <span className="ab-open-ph">
                    <Image
                      src={TEAM_PHOTO}
                      alt=""
                      fill
                      sizes="(min-width: 980px) 48vw, 100vw"
                      className="ab-open-img"
                      unoptimized
                    />
                  </span>
                  <figcaption className="ab-open-note">{OPENING.photoNote}</figcaption>
                </figure>
              </FadeUp>

              <div className="ab-open-body">
                <SplitWords
                  as="h2"
                  text={OPENING.heading}
                  accent={OPENING.accent}
                  className="h2"
                  style={{ color: "var(--text-900)" }}
                />
                <FadeUp delay={0.18}>
                  <p className="ab-open-lead">{OPENING.lead}</p>
                </FadeUp>
                {/* Paragraflar sırayla düşüyor. İçerik about.ts'te ve orada
                    her cümlenin sayfadaki karşılığı yazılı — buraya yeni bir
                    olgu girmedi. */}
                {OPENING.body.map((p, i) => (
                  <FadeUp key={p.slice(0, 24)} delay={0.26 + i * 0.08}>
                    <p className="ab-open-p">{p}</p>
                  </FadeUp>
                ))}
              </div>
            </div>

            {/* ---- VİZYON VE MİSYON · AÇIKTA ----
                Bir tur önce kapalı bir <details> arkasındaydılar ve müşteri
                sayfayı okuyup "vizyon misyon hiç yazmıyor" dedi. Metin
                oradaydı; görünmüyordu. Tek harfi değişmeden açığa çıktılar.

                İki kart, künye kartıyla aynı dilde (beyaz kâğıt, kuyulu ikon)
                ama kasıtlı olarak DAHA GENİŞ punto: bu bölümün iki paragrafı
                sayfadaki en "insan" metin ve bir tablo satırı gibi değil, bir
                beyan gibi okunmalı. */}
            <div className="ab-vm">
              {[
                { s: OPENING.vision, Icon: Compass },
                { s: OPENING.mission, Icon: Target },
              ].map(({ s, Icon }, i) => (
                <FadeUp key={s.t} delay={0.12 + i * 0.08}>
                  <article className="ab-vm-card">
                    <span className="ab-vm-ic" aria-hidden="true">
                      <Icon size={18} strokeWidth={1.9} />
                    </span>
                    <h3>{s.t}</h3>
                    <p>{s.s}</p>
                  </article>
                </FadeUp>
              ))}
            </div>

            {/* Kartların künyesi. Ülke fotoğraflarının altındaki satırla
                (.ab-geo-note) aynı iş: bu iki paragraf bizim yazdığımız
                pazarlama cümlesi değil, firmanın kendi resmî ifadesi. */}
            <FadeUp delay={0.3}>
              <p className="ab-vm-note">{OPENING.statementNote}</p>
            </FadeUp>

            {/* ---- ÜÇ BENTO KUTUCUĞU ----
                BAĞLANTI DEĞİL. Bir tur boyunca üçü de <a> idi ve sayfanın alt
                bölümlerine inen çapa görevi görüyorlardı. Müşteri o işi iptal
                etti: "bir yere yönlendiren bir tarzı fln olmasın aşağı fln
                göndermesin ya sadece sayı verelim." Chevron, çapa ve <a>
                gitti; geriye rakamın kendisi kaldı. Bölümlerin id'leri
                yerinde (dışarıdan derin bağlantı çalışsın diye) ama sayfa
                artık kendi içine yol göstermiyor.

                ÜSTTEKİ MAVİ ŞERİT DE GİTTİ (.ab-stat::before). Müşteri bu
                turda kartların üst/sol kenarına renk kodlu ince çubuk koymayı
                yasakladı; sitenin geri kalanından kaldırıldı, buradan da.

                YERİNE BENTO: solda sayaçlı rakam ve etiket, sağda o rakamın
                ne saydığını çizen bir SVG sahnesi (SummaryArt.tsx). Üç sahne
                aynı ailenin üç üyesi — ortak tuval, ortak çizgi merdiveni,
                her birinde tek bir mavi nesne ve o nesne hareket eden.

                RAKAM ELLE YAZILMIYOR (bkz. COUNTS) ama SAHNE ÇİZİLİ: üç iğne,
                beş halka, altı karo elle yerleştirilmiş geometri. Rakam veri
                değişince kendini düzeltiyor, çizim düzeltmiyor — o yüzden
                aşağıdaki COUNTS'un yanında bir uyuşmazlık bekçisi var.

                Kutucuğun kendi FadeUp'ı SAYAÇ İÇİN DE ŞART: sayacın sıfırdan
                başlaması ancak rakam henüz görünmezken yapılabiliyor ve onu
                görünmez tutan şey bu FadeUp'ın opacity 0 başlangıcı
                (gerekçenin tamamı CountUp.tsx'te). */}
            <div className="ab-bento">
              {SUMMARY.map((s, i) => (
                <FadeUp className="ab-bento-w" key={s.k} delay={0.1 + i * 0.08} y={18}>
                  {/* SIRA ÖNEMLİ: ızgara hücrelerini DOM sırası dolduruyor,
                      yani metin önce yazılmak zorunda — yoksa sahne sol
                      sütuna düşüyor (ilk denemede tam bu oldu). Kaynak sırası
                      aynı zamanda okuma sırası: önce rakam, sonra dekor. */}
                  <div className="ab-b">
                    <span className="ab-b-t">
                      <CountUp className="ab-b-n" to={COUNTS[s.k]} />
                      <span className="ab-b-l">{s.label}</span>
                    </span>
                    <span className="ab-b-art" aria-hidden="true">
                      <SummaryArt scene={s.k} />
                    </span>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ================= 2 · ÜÇ ÜLKE =================
            Üç eşit kart. Eşitlik burada biçimsel değil, bölümün tezi: üç ayrı
            ülke değil, üç ülkeden geçen tek zincir.

            BU TURDA GERÇEKTEN EŞİTLENDİLER: Dubai'nin "Kendi ofisimiz" rozeti
            ve ona bağlı koyu mavi kart varyantı kaldırıldı. Rozetin dayanağı
            "kendi ofisimizin olduğu tek yer" iddiasıydı ve müşteri onu yanlış
            olarak işaretledi — üç ülkede de firmanın kendi ofisi var ve
            üçünü de kendisi yürütüyor. O bilgi artık bölümün lead'inde, üçü
            için birden (about.ts · WHERE.lead).

            Sıra batıdan doğuya. Coğrafi bir iddia taşımıyor, yalnızca keyfî
            olmamasını sağlıyor. */}
        <section className="sec-pad sec-night ab-anchor" id="nerede">
          <div className="container-o">
            <div className="sec-head sec-head-dark">
              <SplitWords
                as="h2"
                text={WHERE.heading}
                accent={WHERE.accent}
                className="h2"
                style={{ color: "#ffffff" }}
              />
              <FadeUp delay={0.2}>
                <p className="sec-lead sec-lead-dark">{WHERE.lead}</p>
              </FadeUp>
            </div>

            <div className="ab-geo">
              {WHERE.countries.map((c, i) => (
                <FadeUp key={c.slug} delay={0.12 + i * 0.07}>
                  {/* Ülke sayfasına çıkış SmartLink ile: İngiltere ve KKTC şu an
                      dolaşıma kapalı, o yüzden sönük ve tıklanamaz çıkıyorlar.
                      Kart yine de basılıyor — üç ülkeden birini gizlemek,
                      sayfanın "üç ülke" iddiasını görselde doğru,
                      metinde eksik bırakırdı. */}
                  <SmartLink href={c.href} className="ab-cn">
                    {/* Fotoğraf şeridi — sayfanın tek gerçek görseli.
                        Kaynağı lib/media.ts · COUNTRY_PHOTO, yani sitenin geri
                        kalanıyla aynı havuz; buraya yeni bir adres yazılmadı.

                        alt BOŞ ve şerit aria-hidden: fotoğraf bilgi taşımıyor,
                        atmosfer taşıyor. Ülkenin adı bir satır altında zaten
                        yazıyor; ekran okuyucuya "Dubai silueti" diye ikinci kez
                        okutmak tekrar olurdu.

                        Griye çekilip karartılıyor (CSS · .ab-cn-img). İki
                        sebep: gece zemininde tam renkli üç kare bölümü afişe
                        çeviriyordu, ve sönük bir stok karesi "bizim çekimimiz"
                        iddiasından görsel olarak da uzak duruyor. Renk yalnızca
                        AÇILABİLEN kartta, imleç üstüne gelince geliyor.

                        unoptimized: next.config.ts'te remotePatterns tanımlı
                        değil, sitedeki diğer uzak görseller de (HomeBlog) aynı
                        şekilde basılıyor. */}
                    <span className="ab-cn-ph" aria-hidden="true">
                      <Image
                        src={COUNTRY_PHOTO[c.slug]}
                        alt=""
                        fill
                        sizes="(min-width: 900px) 33vw, 100vw"
                        className="ab-cn-img"
                        unoptimized
                      />
                    </span>

                    <span className="ab-cn-head">
                      <span className="ab-cn-flag" aria-hidden="true">
                        <Flag country={c.slug} />
                      </span>
                      <b className="ab-cn-name">{COUNTRY_NAME[c.slug]}</b>
                    </span>

                    {/* Yapı künyesi brand.ts · FACTS'ten okunuyor; about.ts'e
                        kopyalanmadı ki iki yerde iki farklı yapı yazma ihtimali
                        hiç doğmasın. */}
                    <span className="ab-cn-st">{structureOf(c.slug)}</span>
                    <span className="ab-cn-line">{c.line}</span>
                    <span className="ab-cn-go">
                      Ülke sayfası
                      <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                    </span>
                  </SmartLink>
                </FadeUp>
              ))}
            </div>

            {/* Fotoğrafların künyesi. Sayfanın tek "şerh" satırı ve bilerek
                küçük: bir iddia değil, iddianın reddi. Bölüm "üç ülkede de
                kendi ofisimiz var" diyor ve kartların üstünde birer şehir
                karesi duruyor; elimizde firmanın kendi çekimi yok ve stok bir
                kareyi kendi ofisi gibi göstermek bu sayfanın baştan sona
                reddettiği şey olurdu. */}
            <FadeUp delay={0.36}>
              <p className="ab-geo-note">{WHERE.photoNote}</p>
            </FadeUp>
          </div>
        </section>

        {/* ================= 3 · ALINTI =================
            Kısa bir gri bant, kendi bölümü değil bir nefes: sec-pad yerine
            kendi dar dolgusu var. Koyu ile beyazın arasında duruyor ve sayfanın
            tek "insan sesi" anı.

            Künye satırında yayın adı ve tarih YOK çünkü elimizde doğrulanmış
            hâli yok (about.ts · SWAP:QUOTE_SOURCE). Boş kaldığı sürece
            basılmıyor; uydurulmuş bir kaynak, alıntının kendisini de şüpheli
            hâle getirirdi. */}
        <section className="ab-quote-sec">
          <div className="container-o">
            <FadeUp>
              <figure className="ab-quote">
                {/* Tırnak 26 → 38 ve alfası kalktı. Bant sayfanın tek insan
                    sesi ama gri zeminde gri bir tırnakla iki bölümün arasında
                    kayboluyordu; şimdi bandın kendisi de mavi kâğıda basılıyor
                    (CSS · .ab-quote-sec). Metin bir harf bile değişmedi,
                    yalnızca puntosu ve zemini değişti. */}
                <QuoteMark className="ab-quote-m" size={38} strokeWidth={1.6} aria-hidden="true" />
                <blockquote>{QUOTE.text}</blockquote>
                <figcaption>
                  <b>{QUOTE.who}</b>
                  <span>{QUOTE.role}</span>
                  {QUOTE.source && <span>{QUOTE.source}</span>}
                </figcaption>
              </figure>
            </FadeUp>
          </div>
        </section>

        {/* ================= 4 · NEYE DAYANARAK ================= */}
        <section className="sec-pad">
          <div className="container-o">
            <div className="sec-head">
              <SplitWords
                as="h2"
                text={BASIS.heading}
                accent={BASIS.accent}
                className="h2"
                style={{ color: "var(--text-900)" }}
              />
              <FadeUp delay={0.2}>
                <p className="sec-lead">{BASIS.lead}</p>
              </FadeUp>
            </div>

            <div className="ab-basis">
              {BASIS.cards.map((c, i) => {
                const Icon = ICONS[c.icon];
                return (
                  <FadeUp key={c.t} delay={0.12 + i * 0.05}>
                    <article className="ab-bcard">
                      <span className="ab-bic" aria-hidden="true">
                        <Icon size={17} strokeWidth={1.9} />
                      </span>
                      <h3>{c.t}</h3>
                      <p>{c.s}</p>
                    </article>
                  </FadeUp>
                );
              })}
            </div>

            {/* İki grup AYRI kutularda ve bu ayrım bu sayfanın en önemli
                dürüstlük detayı: "IFZA resmî iş ortağı" ile "Stripe
                kullanıyoruz" aynı şeritte akarsa ikisi de resmî ortaklık gibi
                okunuyor. Liste brand.ts · PARTNERS'tan geliyor, buraya
                kopyalanmadı. */}
            <div className="ab-partners">
              {[
                { head: BASIS.partners, rows: officialPartners },
                { head: BASIS.infra, rows: infraPartners },
              ].map((g, i) => (
                <FadeUp key={g.head.t} delay={0.3 + i * 0.06}>
                  <div className="ab-pgroup">
                    <h3>{g.head.t}</h3>
                    <p>{g.head.s}</p>
                    <ul className="ab-plist">
                      {g.rows.map((p) => (
                        <PartnerRow key={p.name} name={p.name} role={p.role} />
                      ))}
                    </ul>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ================= 5 · NASIL ÇALIŞIYORUZ ================= */}
        <section className="sec-pad sec-night ab-anchor" id="nasil">
          <div className="container-o">
            <div className="sec-head sec-head-dark">
              <SplitWords
                as="h2"
                text={HOW.heading}
                accent={HOW.accent}
                className="h2"
                style={{ color: "#ffffff" }}
              />
              <FadeUp delay={0.2}>
                <p className="sec-lead sec-lead-dark">{HOW.lead}</p>
              </FadeUp>
            </div>

            {/* Zincir brand.ts · CHAIN'den geliyor — ana sayfadaki Chain
                bölümüyle aynı beş halka, aynı sırada. Burada ikon değil sıra
                numarası var: bu bölümde anlatılan şey halkaların NE olduğu
                değil, PEŞ PEŞE geldiği. Beş halkanın üstünden geçen kesintisiz
                ray da bunu söylüyor — cümle kurmadan. */}
            <FadeUp delay={0.12}>
              <ol className="ab-chain">
                {CHAIN.map((s, i) => (
                  <li className="ab-step" key={s.key}>
                    <span className="ab-step-n" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <b className="ab-step-t">{s.label}</b>
                    <span className="ab-step-l">{s.line}</span>
                  </li>
                ))}
              </ol>
            </FadeUp>

            <div className="ab-princ">
              {HOW.principles.map((p, i) => {
                const Icon = ICONS[p.icon];
                return (
                  <FadeUp key={p.t} delay={0.2 + i * 0.06}>
                    <article className="ab-pcard">
                      <span className="ab-pic" aria-hidden="true">
                        <Icon size={17} strokeWidth={1.9} />
                      </span>
                      <h3>{p.t}</h3>
                      <p>{p.s}</p>
                    </article>
                  </FadeUp>
                );
              })}
            </div>

            {/* STANCE_LIMITS aynen brand.ts'ten. Metni burada yeniden yazmak,
                firma politikasının iki farklı sürümünü üretmek olurdu. Blok
                AÇIKTA duruyor, <details> içinde değil: taahhüt etmediğimiz şeyi
                bir tıklamanın arkasına saklamak, tam olarak bu üç maddenin
                engellemeye çalıştığı davranış olurdu. */}
            <FadeUp delay={0.3}>
              <div className="ab-limits">
                <div className="ab-limits-h">
                  <span className="ab-limits-ic" aria-hidden="true">
                    <TriangleAlert size={16} strokeWidth={2.1} />
                  </span>
                  <div>
                    <h3>{HOW.limits.t}</h3>
                    <p>{HOW.limits.s}</p>
                  </div>
                </div>
                <ul className="ab-limits-l">
                  {STANCE_LIMITS.map((l) => (
                    <li key={l.title}>
                      <b>{l.title}</b>
                      <span>{l.line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ================= 6 · SEKTÖRLER ================= */}
        <section className="sec-pad ab-anchor" id="sektorler">
          <div className="container-o">
            <div className="sec-head">
              <SplitWords
                as="h2"
                text={FOR_WHOM.heading}
                accent={FOR_WHOM.accent}
                className="h2"
                style={{ color: "var(--text-900)" }}
              />
              <FadeUp delay={0.2}>
                <p className="sec-lead">{FOR_WHOM.lead}</p>
              </FadeUp>
            </div>

            <div className="ab-sectors">
              {FOR_WHOM.sectors.map((s, i) => {
                const Icon = SECTOR_ICONS[s.slug];
                return (
                  <FadeUp key={s.slug} delay={0.12 + i * 0.045}>
                    {/* Altı adresin beşi şu an dolaşıma kapalı ve SmartLink
                        onları sönük basıyor. Kapalı olanı listeden çıkarmak
                        daha "temiz" görünürdü ama sayfa o zaman altı değil bir
                        sektörde çalıştığımızı söylerdi. */}
                    <SmartLink
                      href={sectorHref(s.slug)}
                      className="ab-sec"
                      aria-label={`${s.label} — detayları gör`}
                    >
                      <span className="ab-sec-ic" aria-hidden="true">
                        {Icon && <Icon size={16} strokeWidth={1.9} />}
                      </span>
                      <span className="ab-sec-b">
                        <b className="ab-sec-t">{s.label}</b>
                        <span className="ab-sec-l">{s.line}</span>
                      </span>
                      <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                    </SmartLink>
                  </FadeUp>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= 7 · KÜNYE · kolofon =================
            SAYFANIN AÇILIŞIYDI, ŞİMDİ DİPNOTU. Müşterinin itirazı künyenin
            varlığına değil, sayfayı onunla açmamızaydı: "firma künyesi kısmına
            gerek yok... başka bir şeyle giriş açalım, ama künye değil."

            Silinmedi çünkü veri doğrulanmış ve buradaki beş satırın dördü
            /basinda-biz'de de basılıyor — beşincisi ("Müşteri paneli ·
            TaxDome") orada yok (bkz. o sayfadaki PRESS_FACT_LABELS). Daha
            önemlisi: tüzel kişiliğini hakkımızda sayfasında hiç yazmayan bir
            firma, sitenin kendi vaadini ("yalnızca doğrulanabilir olanı
            yazıyoruz") kendi sayfasında bozmuş olurdu.

            ------------------------------------------- BU TURDA YENİDEN ÇİZİLDİ
            Müşteri yeri değil GÖRÜNTÜSÜ için itiraz etti: "en alta firma
            künyesi kısmı yapmışsın onun tasarımını daha iyi yapabilirsin çok
            dandik duruyor." Kalkan üç şey ve gerekçeleri:

              · MAVİ ANTET ŞERİDİ (.ab-id::before) — kartın üst kenarındaki
                renkli çubuk. Müşteri bu turda tam olarak bu kalıbı yasakladı.
              · FİLİGRAN MÜHÜR (.ab-id-seal) — "resmî belge" havası vermek
                için konmuş bir dekordu ve dekorla söylenen şey inandırıcı
                olmuyordu. Veri zaten resmî; süslemeye ihtiyacı yok.
              · BEYAZ KUTU — gri zeminin üstünde beyaz bir kart, sayfanın en
                küçük bloğunu en gösterişli bloğu yapıyordu.

            Yerine bir GAZETE KÜNYESİ düzeni geldi: üstte tek bir saç teli,
            solda başlık, sağda satırlar iki sütun hâlinde. Kutu yok, renk yok,
            dekor yok — bir dipnotun görünmesi gereken hâl. Ölçüler CSS'te.

            SplitWords YOK ve `sec-pad` YOK: bu bir bölüm açılışı değil.
            Blok bir sonraki bölümle aynı gri zeminde duruyor — ikisi birlikte
            tek bir kapanış alanı.

            Boş değerli satırlar hiç basılmıyor (about.ts'teki SWAP notları):
            "Kuruluş yılı: —" yazan bir satır, bilginin yokluğunu bilgi gibi
            gösterirdi. */}
        <section className="ab-colo-sec">
          <div className="container-o">
            <FadeUp y={18}>
              <div className="ab-colo">
                <div className="ab-colo-h">
                  <h2>{IDENTITY.heading}</h2>
                  <p>{IDENTITY.lead}</p>
                </div>

                {/* Satırlar SIRAYLA beliriyor: hepsi birden basıldığında bir
                    veri dökümü gibi okunuyor. Tek tek düştüklerinde künye
                    dizilir gibi okunuyor — bilgi aynı, sırası görünür.

                    FadeUp'ın kendisi `.ab-id-row` oluyor, satırı SARMIYOR:
                    <dl> içine ancak dt/dd taşıyan doğrudan <div> girebiliyor,
                    araya ikinci bir kap koymak işaretlemeyi bozardı. */}
                <dl className="ab-id">
                  {identityRows.map((r, i) => (
                    <FadeUp
                      className="ab-id-row"
                      key={r.label}
                      delay={0.1 + i * 0.06}
                      y={10}
                      duration={0.5}
                    >
                      <dt>{r.label}</dt>
                      <dd>{r.value}</dd>
                    </FadeUp>
                  ))}
                </dl>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ================= 8 · TEMAS =================
            Kanal listesi şu an boş (about.ts · SWAP:CONTACT_*) ve o yüzden
            hiç basılmıyor; geriye sitenin tek gerçek soru kanalı kalıyor.
            "Mali müşavire danışın" kalıbı emekli — sorusu olan AskCta ile
            doğrudan bize soruyor.

            Zemin bir öncekiyle AYNI (gri): künye ile temas tek bir kapanış
            alanı. Sayfanın geri kalanında iki bölüm hiçbir yerde aynı zeminle
            arka arkaya gelmiyor, bu bilinçli tek istisna. */}
        <section className="sec-pad" style={{ background: "var(--paper)" }}>
          <div className="container-o">
            <FadeUp>
              <div className="ab-close">
                <div className="ab-close-t">
                  <h2>{CONTACT.heading}</h2>
                  <p>{CONTACT.lead}</p>
                  {channels.length > 0 && (
                    <ul className="ab-chan">
                      {channels.map((c) => {
                        const Icon = CONTACT_ICONS[c.kind];
                        return (
                          <li key={c.kind}>
                            <Icon size={15} strokeWidth={2} aria-hidden="true" />
                            {c.href ? <a href={c.href}>{c.value}</a> : <span>{c.value}</span>}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
                <AskCta label={CONTACT.ctaLabel} />
              </div>
            </FadeUp>
          </div>
        </section>

        <FinalCta />
      </main>
    </>
  );
}
