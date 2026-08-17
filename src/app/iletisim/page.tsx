import type { Metadata } from "next";

import Nav from "@/components/Nav";
import FinalCta from "@/components/FinalCta";
import PageHero from "@/components/shared/PageHero";
import ContactSections from "@/app/iletisim/ContactSections";
import { CHANNELS, OFFICES, isLiveChannel, linksOf } from "@/lib/offices";

/* ============================================================================
   İLETİŞİM — /iletisim

   Lab adayı I6'nın (src/components/lab/ContactI6.tsx) canlı hâli. Aday kendi
   dosyasında karar kaydı olarak duruyor ve DEĞİŞTİRİLMEDİ; buradaki kopya
   .i6- yerine .ct- ad alanını kullanıyor, çünkü lab-i6.css hâlâ globals.css'e
   import ediliyor ve aynı seçici adı iki dosyada sessiz eziciliğe yol açardı.

   ---------------------------------------------------------- NEDEN İKİ DOSYA
   Bu dosya SUNUCU bileşeni ve öyle kalmalı: `export const metadata` bir
   "use client" dosyasından verilemiyor. Denenen alternatif (React 19'un yerli
   <title>/<meta> yükseltmesi) ölçüldü ve elendi — layout.tsx'in varsayılan
   metadata'sı da basıldığı için <head> içinde İKİ <title> ve İKİ description
   oluşuyordu. O yüzden durum tutan her şey ContactSections.tsx'te (istemci),
   metadata + JSON-LD + sayfa kabuğu burada.

   ------------------------------------------------------- SAYFANIN İSKELETİ
     Nav
     PageHero            kırıntı yolu + sayfanın TEK <h1>'i + lead
     1 · form            görünür kutucuklarla ülke ve konu, dört alan
                         BAŞLIKSIZ: hero'dan sonra doğrudan form geliyor,
                         bölümü adlandıran şey aria-label
     2 · ofisler         üç ofis düğmesi → gerçek harita → üç kanal kartı (h2)
     FinalCta

   ------------------------------------------ CANLI SAYFANIN AÇIK EKSİKLERİ
   Bunlar gizlenmiyor, ekranda da yazıyor:
   · KKTC ofisinin adresi, iki telefonu ve e-postası DOLDU (kaynak:
     müşterinin kendi sitesi). Dubai ve İngiltere'nin dört alanı hâlâ boş
     (src/lib/offices.ts · SWAP:OFFICE_DUBAI / SWAP:OFFICE_INGILTERE); o
     kartlar tıklanamıyor. KKTC'de yalnız WhatsApp açık.
   · Formun gönderim ucu YOK. Buton devre dışı ve sahte onay ekranı yok.
   Yani formun karşılığı hâlâ yok; artık gerçekten çalışan bir çıkış var:
   KKTC hatları ve /basla bağlantısı.
   ========================================================================= */

const SITE = "https://ortacglobal.com";
const PATH = "/iletisim";

const TITLE = "İletişim — Dubai, İngiltere ve KKTC ofisleri | Ortac Global";
/* Açıklama bilerek söz vermiyor: yanıt süresi, "7/24" ya da çalışan bir form
   ima eden hiçbir ifade yok. Sayfada olmayan şeyi arama sonucunda vaat etmek,
   sayfanın kendi dürüstlüğünü de götürürdü. */
const DESCRIPTION =
  "Ortac Global'in Dubai, İngiltere ve KKTC ofisleri. Hangi ofisle konuşacağınızı seçin; harita, adres ve iletişim kanalları o seçime göre değişiyor.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  /* Kanonik mutlak yazılıyor: layout.tsx'te metadataBase tanımlı değil ve
     göreli bir kanonik geliştirme sunucusunun adresine çözülürdü. */
  alternates: { canonical: `${SITE}${PATH}` },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Ortac Global",
    url: `${SITE}${PATH}`,
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function IletisimPage() {
  /* ---------------------------------------------------------------- JSON-LD
     KURAL: yapısal veriye yalnızca DOĞRULANMIŞ alan giriyor. Bir iletişim
     sayfasında bu kural her yerdekinden ağır basıyor, çünkü telephone / email
     / address alanları arama motoruna makine tarafından okunabilir bir iddia
     veriyor — yanlışı, sayfadaki yanlış bir cümleden daha uzun yaşıyor.

     BİLEREK YOK (offices.ts'te karşılıkları boş):
       telephone · email · address · contactPoint · openingHours ·
       areaServed başına adres · yanıt süresi taahhüdü

     Aşağıdaki iki liste offices.ts'ten TÜRETİLİYOR, elle yazılmıyor. Şu an
     ikisi de boş, dolayısıyla ilgili anahtarlar JSON'a hiç girmiyor. Bilgi
     doğrulanıp offices.ts doldurulduğunda bu sayfada tek satır değişmeden
     yapısal veri de kendiliğinden doğru hâle geliyor. */
  const contactPoints = OFFICES.flatMap((office) => {
    const live = CHANNELS.filter((c) => isLiveChannel(office.contact[c.kind]));
    if (live.length === 0) return [];
    /* Telefon linksOf() üzerinden okunuyor, .value üzerinden DEĞİL: KKTC'nin
       iki hattı var ve ekranda ikisi de yazıyor. Yalnız birincisini yapısal
       veriye koymak, sayfanın söylediğiyle makinenin okuduğunu ayırırdı.
       schema.org telephone birden çok değer alabiliyor; tek hatlı ofislerde
       dizi yerine düz metin kalıyor ki mevcut çıktı değişmesin. */
    const phones = linksOf(office.contact.phone).map((h) => h.value);
    const email = office.contact.email;
    const whatsapp = office.contact.whatsapp;
    return [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        areaServed: office.label,
        ...(phones.length > 0 ? { telephone: phones.length === 1 ? phones[0] : phones } : {}),
        ...(isLiveChannel(email) ? { email: email.value } : {}),
        /* WhatsApp'ın schema.org'da kendi alanı yok; doğrulanmış hat bir
           url olarak giriyor (wa.me bağlantısı zaten href'te duruyor). */
        ...(isLiveChannel(whatsapp) ? { url: whatsapp.href } : {}),
      },
    ];
  });

  /* Açık adres yalnızca metin olarak giriyor: PostalAddress'in ülke kodu alanı
     doldurulmuyor, çünkü KKTC'nin tartışmasız bir ISO kodu yok ve oraya bir
     kod uydurmak tam olarak bu blokta kaçındığımız şey. */
  const places = OFFICES.filter((o) => o.address.trim() !== "").map((o) => ({
    "@type": "Place",
    name: `${o.label} ofisi`,
    address: o.address,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana sayfa", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "İletişim", item: `${SITE}${PATH}` },
        ],
      },
      {
        /* @id, layout.tsx'in ve /hakkimizda'nın bastığı düğümle AYNI — üçü
           aynı kurumu anlatıyor. Buradaki alanlar o düğümün alt kümesi;
           çelişen tek bir alan yok. Doğrulanmış olan: tüzel kişilik adı ve üç
           ülke (src/lib/about.ts · IDENTITY). */
        "@type": "Organization",
        "@id": `${SITE}/#organization`,
        name: "Ortac Global",
        alternateName: "Ortac International Accounting",
        legalName: "Ortac Accounting Services LLC",
        url: SITE,
        areaServed: [
          { "@type": "Place", name: "Dubai" },
          { "@type": "Place", name: "Birleşik Krallık" },
          { "@type": "Place", name: "KKTC" },
        ],
        ...(contactPoints.length > 0 ? { contactPoint: contactPoints } : {}),
        ...(places.length > 0 ? { location: places } : {}),
      },
      {
        "@type": "ContactPage",
        name: TITLE,
        url: `${SITE}${PATH}`,
        description: DESCRIPTION,
        inLanguage: "tr-TR",
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
            sütunlu hero tek bir ülkenin sahnesini çiziyor, bu sayfanın iddiası
            ise tam tersi — üç ofis eşit. */}
        {/* Başlık "Üç ülke, üç ofis." idi: doğru ama sayfanın ne olduğunu
            söylemiyor, bir istatistik gibi duruyordu. Müşterinin ölçüsü:
            sayfanın konusu başlıkta CÜMLE İÇİNDE geçsin, ne çıplak etiket
            ("İletişim") ne de konudan bağımsız bir slogan.
            LEAD DE BAYATTI: "önce hangi ofisle konuşacağınızı seçin" diyordu,
            oysa form bu turda öne alındı ve ofis seçici artık ikinci bölüm. */}
        <PageHero
          crumb="İletişim"
          title="Bizimle iletişime geçin."
          accent="iletişime geçin."
          lead="Formu doldurun ya da doğrudan yazın. Dubai, İngiltere ve KKTC'de ayrı adresimiz ve ayrı iletişim bilgilerimiz var; aşağıdaki seçici haritayı, adresi ve kanalları birlikte değiştiriyor."
        />

        <ContactSections />

        <FinalCta />
      </main>
    </>
  );
}
