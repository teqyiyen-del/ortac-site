import type { Metadata } from "next";

import Nav from "@/components/Nav";
import PageHero from "@/components/shared/PageHero";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import AskCta from "@/components/shared/AskCta";
import CountryFaq from "@/components/CountryFaq";
import FinalCta from "@/components/FinalCta";
import AccountingHeroCard from "@/components/services/AccountingHeroCard";
import AccountingHandover from "@/components/services/AccountingHandover";
import AccountingCalendar from "@/components/services/AccountingCalendar";
import AccountingNeeds from "@/components/services/AccountingNeeds";
import {
  ACC_ICON,
  AccountingGains,
  AccountingPrice,
  AccountingQuote,
  AccountingScope,
  AccountingStrengths,
  AccountingSwitch,
} from "@/components/services/AccountingSections";
import { ACCOUNTING_DUBAI as C, accountingFaq, accountingMonthlyPrice } from "@/lib/accountingDubai";

/* ============================================================================
   DUBAİ MUHASEBE HİZMETİ — /dubai/muhasebe

   ---------------------------------------------------------------------------
   BU TUR (11.09.2026): /lab/muhasebe CANLIYA ALINDI — künye MD · K1 · F3

   Müşteri: "muhasebe ve hakkımızda sayfalarını live alabilirsin kral."
   TASARIM DEĞİŞİKLİĞİ YOK: lab'de ne görünüyorsa burada o görünüyor. İş,
   lab kopyasını CANLI KOD yapmaktı:

     · bölümler lab'in components/lab/MuhasebeBloklar.tsx'inden
       components/services/AccountingSections.tsx'e taşındı (.lmh- → .svm-),
     · lab'in veri.ts'teki metni lib/accountingDubai.ts'e taşındı,
     · lab'de CSS ile GİZLENEN takvim blokları (01-02-03 kayıtları ve
       istatistik cümlesi) AccountingCalendar'ın KAYNAĞINDAN çıktı,
     · takas panelinin ×1,3 ölçeği ve takvim ışığı bileşenlerin kendi canlı
       CSS'ine (svc-muhasebe.css · 6, muhasebe-takvim.css) yazıldı; ikisi de
       yalnız bu sayfada ve lab'de basılıyor (tarandı; AccountingVisuals.tsx
       AccountingHandover'ı basmıyordu, adı yalnız bir yorumda geçiyordu ve
       dosyanın kendisi hiçbir yerden import edilmiyordu — silindi).

   15.09.2026 · MARKETING REVİZESİ (Burak'ın seçtiği 10 maddeden bu sayfaya
   düşenler): hero'da "Dubai muhasebe hizmeti" h1'i ve fiyat kutusu (4, 5),
   alıntı bandına imza sahibinin künyesi (11, 12), #gecis muhasebeci
   değiştirenler (8), #ihtiyac hizmet bulucu (9), SSS sekiz soruya çıktı
   (13), kapanış bandı bu sayfaya özel başlık (7). Fiyat listesinin her
   kalemi artık kendi alt sayfasına bağlı (14 · /dubai/muhasebe/[alt]).

   YENİ SIRA (müşterinin bölüm bölüm brifi, lab'de üç turda oturdu):

     hero        → PageHero + AccountingHeroCard (kart değişmedi)
     #arti       → artılarımız, dört karo       AccountingStrengths
     #kapsam     → K1, beş aşama beş açılır       AccountingScope
     takas       → sizden gelen / size dönen      AccountingHandover (×1,3)
     alıntı      → Murat Ortaç + imza kutusu      AccountingQuote  (18.09'da
                   buraya indi; gece bant A3 ile genişledi)
     #takvim     → sade ray + vergi çerçevesi     AccountingCalendar
     #fayda      → F3, tek defter + dört satır    AccountingGains
     #gecis      → muhasebeci değiştirenler       AccountingSwitch   (15.09)
     #ihtiyac    → dört soru, altı kalem          AccountingNeeds    (15.09)
     #fiyat      → altı satır + kapı              AccountingPrice
     #sss        → sekiz soru + soru çıkışı

   GİDEN BÖLÜMLER (müşterinin cümleleri lab'de, veri.ts'in başında):
     #ozet (kısa cevap künyesi) ve #ortac-perspektifi (süreci yürüten ekip)
     BİRLEŞİP #arti oldu · "Neyi kapsamıyor?" şeridi (#sinirlar) K1'in içine
     girdi · takvimin 01-02-03 bloğu (#neden) ve istatistik cümlesi kalktı ·
     #sonra ile "Nasıl başlanıyor?" kapanış kartları kalktı ("hiç gerek yok
     valla, fazlalık göz sikiyor"). Dört çapa sitede HİÇBİR bağlantının hedefi
     değildi (src'nin tamamı tarandı); kırılan iç bağlantı yok. Metinleri
     accountingDubai.ts'te "OKUNMUYOR" notuyla duruyor.

   GLOBAL KABUK KALDI: <Nav /> ve <FinalCta /> (footer dahil). Lab sayfası
   lab'in kendi şeridiyle basılıyordu; bunlar bölüm değil sitenin kabuğu.

   ---------------------------------------------------------------------------
   ROTA: NEDEN BU DOSYA DİNAMİK ROTAYI YENİYOR

   /dubai/[hizmet] dinamik rotası zaten var ve dört hizmeti tek bir şablondan
   basıyor. App Router'da STATİK SEGMENT DİNAMİĞİ YENER: bu dosya var olduğu
   sürece /dubai/muhasebe buraya düşüyor, diğer üç hizmet dinamik rotadan
   çalışmaya devam ediyor.

   Bunun bir sonucu var ve bilerek kabul edildi: dinamik şablon muhasebe için
   services.ts'ten "aylık 175 USD" basıyordu (PRICING.dubai.annual / 12), bu
   sayfa ise müşterinin imzalı hizmet belgesindeki 350 USD'yi basıyor. Çelişki
   yeni değil (bkz. lib/accountingDubai.ts · SWAP:ACC_PRICING ve
   lib/afterSetup.ts · SWAP:AFTER_PRICING). pricing.ts'e dokunulmadı: hangi
   rakamın geçerli olduğu müşterinin kararı.

   ---------------------------------------------------------------------------
   BU DOSYADA TEK BİR CÜMLE YOK

   Ekranda görünen her kelime lib/accountingDubai.ts'te; rakamlar da oradan
   değil, onun okuduğu kaynaklardan (afterSetup.ts, countryContent.ts,
   services.ts) geliyor. Şablon yalnızca diziyor.

   ---------------------------------------------------------------------------
   NE GİZLENMEZ (önceki turların sert kuralı, hâlâ geçerli)

   Bir rakamı, bir oranı veya bir iddiayı NİTELEYEN şerh <details> arkasına
   konmuyor. Açık kalanlar: fiyat satırındaki "başlangıç" sıfatı ve "+ KDV",
   ritim ve rozet, kalem notları ve "tek bir toplam yazmıyoruz" girişi.
   Vergi çerçevesinde değer ile şerhi aynı kapının arkasında, birlikte açılıp
   birlikte kapanıyor; çıplak "%0" hiçbir hâlde ekranda değil.

   BİR MADDE DEĞİŞTİ VE BİLEREK: eski sayfada "sınır başlıkları hep açıkta"
   idi (tek şerit, kapalıyken başlık görünüyordu). K1'de beş sınır ait olduğu
   aşamanın AÇILIRINDA; müşteri K1'i bu hâliyle seçti. Kuralın özü bozulmuyor,
   çünkü sınırların hiçbiri ekrandaki bir rakamı nitelemiyor — tek aday olan
   "yıl sonu beyanı aylık hizmete dahil değil" bilgisi fiyat listesinde
   yıl sonu kaleminin AYRI SATIR olarak durmasıyla zaten açıkta.

   ---------------------------------------------------------------------------
   SEO — başlık ve açıklama DEĞİŞMEDİ (C.seo), iskelet bozulmadı

   Tek h1 (PageHero), bölüm başına bir h2, takvimde iki h3 (ray başlığı ve
   #vergi-cercevesi), SSS'te seçili sorunun h3'ü. JSON-LD üç düğüm:
   BreadcrumbList, Service, FAQPage. FAQPage artık EKRANDAKİ ÜÇ SORUYU
   işaretliyor (accountingFaq() hem CountryFaq'ı hem şemayı besliyor);
   altısını işaretlemek ekranda olmayan üç cevabı zengin sonuca taşımak
   olurdu. CountryFaq yalnız seçili cevabı DOM'a basıyor, üçünün de metni
   bileşenin sunucu yükünde ve şemada duruyor — ülke sayfalarındaki düzen.

   Kapalı <details> içeriği Google tarafından normal biçimde indeksleniyor ve
   gizleme sayılmıyor; opaklığı sıfırlanmış metin ise spam politikalarında
   adı geçen bir teknik. Bu sayfada ikincisi yok.

   Önceki turların ayrıntılı kaydı (takas panelinin dört turu, hero kartı,
   "anlatmıcaz gösterecez" ölçümleri) git'te: bu dosyanın 895afc8 hâli ve
   AccountingHandover.tsx · AccountingHeroCard.tsx'in kendi başlıkları.
   ========================================================================= */

/* Kanonik adres mutlak: layout.tsx'te metadataBase yok, göreli bir kanonik
   geliştirme sunucusunun adresine çözülürdü. */
const SITE = "https://ortacglobal.com";
const PAGE_URL = `${SITE}/dubai/muhasebe`;

export const generateMetadata = (): Metadata => ({
  title: C.seo.title,
  description: C.seo.description,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "article",
    locale: "tr_TR",
    siteName: "Ortac Global",
    url: PAGE_URL,
    title: C.seo.title,
    description: C.seo.description,
  },
});

export default function DubaiAccountingPage() {
  const faq = accountingFaq();
  /* Fiyat kutusu: tutar kalemin kendisinden. Kalem bulunamazsa kutu hiç
     basılmıyor — boş ya da "0 USD" bir kutu yanlış bir fiyat söylerdi. */
  const monthly = accountingMonthlyPrice();
  const heroPrice = monthly
    ? { ...C.hero.price, amount: C.hero.price.amount.replace("{usd}", monthly.usd.toLocaleString("tr-TR")) }
    : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana sayfa", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "Dubai", item: `${SITE}/dubai` },
          { "@type": "ListItem", position: 3, name: "Muhasebe", item: PAGE_URL },
        ],
      },
      {
        /* offers/price BİLEREK yok: kalemlerin yarısı koşullu ve "başlangıç"
           nitelikli. Yapılandırılmış veride tek bir fiyat göstermek, sayfada
           özenle kurulan koşulluluğu düz bir rakama indirgerdi. */
        "@type": "Service",
        name: "Dubai'de şirket muhasebesi, KDV ve vergi beyan hizmeti",
        serviceType: "Muhasebe ve vergi uyumu",
        url: PAGE_URL,
        provider: { "@type": "Organization", name: "Ortac Global", url: SITE },
        areaServed: { "@type": "Place", name: "Dubai" },
        description: C.seo.description,
      },
      {
        /* Ekrandaki üç soru, CountryFaq ile AYNI listeden. */
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
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

        {/* HERO · iki sütunlu PageHero (`art` · `cta` · `trust` opt-in
            propları; `country` VERİLMİYOR, o dal ülke hero'sunu basar).
            Sağdaki kart değişmedi (AccountingHeroCard, .svmk-). Metin lab'in
            (accountingDubai.ts · hero, neyin neden değiştiği orada).

            İKON BURADA ÇİZİLİYOR: PageHero istemci bileşeni, bu sayfa sunucu
            bileşeni — lucide bileşeninin kendisi sınırı geçemez, çizilmiş
            düğüm geçer. Ölçü ülke hero'sundakiyle aynı (15 · 2). */}
        <PageHero
          crumb={C.hero.crumb}
          title={C.hero.title}
          accent={C.hero.accent}
          lead={C.hero.lead}
          art={<AccountingHeroCard />}
          cta={C.hero.cta}
          price={heroPrice}
          trust={C.hero.trust.map((t) => {
            const Icon = ACC_ICON[t.icon];
            return { icon: <Icon size={15} strokeWidth={2} aria-hidden="true" />, line: t.line };
          })}
        />

        <AccountingStrengths />
        <AccountingScope />

        {/* TAKAS PANELİ · kendi bölümünde, başlıksız. Müşteri: "şu sizden
            gelen size dönen kısmı var ya, orası muhakkak olsun, güzel çünkü
            baya" ve iki tur sonra "sitedeki daha iyi duruyordu sadece küçük
            olmasından şikayetçiydim." Panel eski sayfanınkinin aynısı, oranı
            korunarak ~×1,3 büyüdü; sayılar svc-muhasebe.css · 6. bölümde.

            Başlık (exchange.title) YOK ve bilerek: panelin iki sütun başlığı
            ("Sizden gelen" / "Size dönen") girişin söyleyeceği her şeyi
            söylüyor. Bölümün kendi dikey dolgusu da yok (.svm-takas): komşu
            iki bölümün dolgusu arasında duruyor, üçüncü bir boşluk
            eklemiyor. */}
        <section className="svm-takas">
          <div className="container-o">
            <AccountingHandover />
          </div>
        </section>

        {/* ALINTI + İMZA KUTUSU · 18.09.2026'da BİR BASAMAK AŞAĞI İNDİ.
            Burak: "aşağı alma konusunda denemek lazım emin değilim ama çok
            aşağı gitmemeli." Eskiden artılarımız ile kapsamın arasındaydı
            (sayfanın ikinci bölümü); şimdi kapsam ve takas panelinden sonra:
            ziyaretçi "ne yapılıyor" ve "ne verip ne alıyorum" sorularını
            geçtikten sonra kimin imzaladığına bakıyor. Takvimden önce
            duruyor, yani sayfanın ortası — labdaki diyagramın önerdiği yer
            (karşılık bölümünün altı) bir basamak daha aşağıdaydı ve "çok
            aşağı gitmemeli" denildiği için oraya taşınmadı. */}
        <AccountingQuote />

        {/* TAKVİM · sade. Müşteri: "özellikle direkt girişindeki 1-2-3 kısmı
            çok göz yoruyor, bide ilk 12 ayda başlığının altındaki açıklama
            fln." İkisi de bileşenin KAYNAĞINDAN çıktı (lab'de CSS ile
            gizleniyordu). Rayın üstünden geçen ışık ("ona bide animasyon
            ver") ve çerçevenin raya 18 px'e yaklaşması ("aradaki spacingi
            azalt") muhasebe-takvim.css'te. */}
        <section id={C.calendar.id} className="sec-pad svm-sec">
          <div className="container-o">
            <div className="sec-head">
              <SplitWords
                as="h2"
                text={C.calendar.heading}
                accent={C.calendar.accent}
                className="h2"
              />
              <FadeUp delay={0.2}>
                <p className="sec-lead">{C.calendar.lead}</p>
              </FadeUp>
            </div>
            <AccountingCalendar />
          </div>
        </section>

        <AccountingGains />

        {/* 15.09.2026 · marketing listesi: madde 8 (muhasebeci değiştirenler)
            ve madde 9 (ihtiyaç bulucu). İkisi de fiyattan ÖNCE: ziyaretçi
            önce kendi durumunu, sonra bedeli görüyor. Bulucu fiyatın hemen
            üstünde çünkü işaretlediği altı kalem bir alttaki listenin altı
            kalemi. */}
        <AccountingSwitch />
        <AccountingNeeds />
        <AccountingPrice />

        {/* SSS · 15.09.2026'dan beri SEKİZ soru (faq.shown · madde 13). Eski not:
            üç soru (faq.shown), ülke sayfalarının bileşeni. Altıdan üçe
            indi: üç cevap sayfanın kendi metninin neredeyse birebir
            kopyasıydı. #sss çapası korundu (lab'de id yoktu; görünmeyen bir
            fark ve eski sayfanın çapası). Soru çıkışı kapanış kartlarının
            yerini aldı. */}
        <section id={C.faq.id} className="sec-pad svm-sec">
          <div className="container-o">
            <div className="sec-head">
              <SplitWords as="h2" text={C.faq.heading} accent={C.faq.accent} className="h2" />
            </div>
            <CountryFaq items={faq} />
            <FadeUp delay={0.2}>
              <p className="svm-sss-cta">
                <AskCta label={C.faq.askLabel} />
              </p>
            </FadeUp>
          </div>
        </section>

        <FinalCta kapanis={C.closing} />
      </main>
    </>
  );
}
