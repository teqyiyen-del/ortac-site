import type { Metadata } from "next";
import { ArrowRight, Inbox, Link2, Newspaper, Quote as QuoteMark } from "lucide-react";

import Nav from "@/components/Nav";
import FinalCta from "@/components/FinalCta";
import PageHero from "@/components/shared/PageHero";
import FadeUp from "@/components/shared/FadeUp";
import SmartLink from "@/components/shared/SmartLink";
import { IDENTITY } from "@/lib/about";
import {
  PRESS_CONTACT,
  PRESS_EMPTY,
  PRESS_KIND_LABEL,
  PRESS_QUOTE,
  hasPressContact,
  hasPressQuote,
  sortedPress,
} from "@/lib/press";

/* ============================================================================
   BASINDA BİZ — /basinda-biz

   NEDEN VAR
   Navbar'ın Kurumsal paneli iki karttan ibaretti ve müşterinin teşhisi
   buydu: "içi çok boş hissettirdi 2 tane şey var diye". Panele giren iki yeni
   kapıdan biri burası.

   SAYFANIN İSKELETİ  (sitenin standardı: Nav + main + PageHero + … + FinalCta)
     Nav
     PageHero          kırıntı yolu + sayfanın TEK <h1>'i + lead
     1 · kayıtlar      sekiz gerçek basın kaydı            (görünmeyen h2)
     2 · basın için    nereye yazılır + haberde kullanılacak künye      (h2)
     FinalCta

   Birinci bölümün başlığı GÖRÜNMÜYOR: hero zaten sayfanın konusunu söylüyor,
   listenin üstünde ikinci bir giriş kurmuyoruz. Uzun gerekçe bölümün başında.

   BU TURDA SAYFA DOLDU — ve içindekilerin hepsi gerçek
   Önceki hâlde liste boştu, gerekçe de "depoda doğrulanmış kayıt yok"tu.
   Kayıtlar depoda değil firmanın yayındaki sitesindeydi; müşteri o adresi
   kaynak gösterdi ve sekiz kayıt oradan alındı (uzun döküm, doğrulama yöntemi
   ve listeye GİRMEYEN dokuzuncu kaydın gerekçesi src/lib/press.ts'in başında).

   Sayfada YER TUTUCU KAYIT YOK. Sitenin bu turdaki "sayfalar doluymuş gibi
   dolsun + kayıt başına Örnek rozeti" politikası bu sayfaya uygulanmadı:
   basın kaydındaki her satır üçüncü bir tarafın ağzından bir iddia ve rozet,
   Hürriyet'e yazmadığı bir başlığı atfetmeyi güvenli hâle getirmiyor. Liste
   zaten dolu, doldurulacak bir tasarım boşluğu da yok. Yani bu ekranda amber
   "Örnek" rozeti göremezsiniz — göründüğü gün bir hata olmuş demektir.

   İKİNCİ BÖLÜM DOLGU DEĞİL
   Basın sayfasına gelen ikinci ziyaretçi tipi gazeteci ve onun sorusu farklı:
   "kimle konuşurum, firmanın adını haberde nasıl yazarım". Künye satırları
   lib/about.ts'ten TÜRETİLİYOR, buraya kopyalanmadı — iki kopya, birini
   güncelleyip diğerini unutmanın garantisi olurdu.
   ========================================================================= */

const SITE = "https://ortacglobal.com";
const PATH = "/basinda-biz";

/* Modül düzeyinde: `metadata` bir sunucu sabiti ve PRESS de öyle. Kayıt
   eklendiği gün başlık, açıklama ve hero metni birlikte doğruya dönüyor. */
const ITEMS = sortedPress();
const EMPTY = ITEMS.length === 0;

/* Tarih biçimi burada kuruluyor, lib/blog.ts'ten ödünç ALINMIYOR: blog künyesi
   ile basın künyesi aynı biçimi kullansa da aynı şeyi anlatmıyorlar ve bu sayfa
   blogun yayın kararlarına bağlanmamalı. İki satırlık bir bağımlılık, bir
   dosyayı iki bölümün ortak sorumluluğuna sokmaya değmez. */
const DATE_FMT = new Intl.DateTimeFormat("tr-TR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});
const pressDate = (iso: string) => DATE_FMT.format(new Date(`${iso}T00:00:00`));

const TITLE = "Basında biz — Ortac Global'in yer aldığı yayınlar | Ortac Global";

/* "HAKKINDA" DEĞİL "YER ALDIĞI": elimizdeki sekiz kaydın hiçbiri firmayı konu
   alan bir haber değil; hepsi Dubai ekonomisini anlatan haberler ve firma
   içlerinde uzman kaynak olarak alıntılanıyor. "Hakkımızda çıkanlar" demek
   küçük ama gerçek bir abartma olurdu — sayfanın tamamı zaten bunun tersini
   iddia ediyor.

   Açıklamanın boş dalı da duruyor: liste bir gün boşalırsa aramada "haberler"
   görüp boş sayfaya düşmek sayfanın kendi dürüstlüğünü götürürdü. */
const DESCRIPTION = EMPTY
  ? "Ortac Global'in yer aldığı basın kayıtları. Bu sayfaya yalnızca yayının kendi adresine bağlanabilen, tarihi belli kayıtlar giriyor. Bugün liste boş."
  : "Ortac Global'in uzman görüşüyle yer aldığı haberler; her biri yayının adı, tarihi ve kendi adresiyle birlikte.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  /* Kanonik mutlak: layout.tsx'te metadataBase yok, göreli kanonik geliştirme
     sunucusunun adresine çözülürdü (aynı gerekçe /iletisim'de de yazılı). */
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

/* Haberde kullanılabilecek alanlar. Değerler lib/about.ts'ten geliyor; burada
   yalnızca HANGİ satırların basın künyesine girdiği yazılı.

   Neden ad listesi: /hakkimizda'daki künyede kullandığımız yazılımlar gibi
   satırlar da var — doğru ama gazetecinin işine yaramıyor. Liste pozitif
   seçiyor, yani about.ts'te bir etiket değişirse satır SESSİZCE DÜŞÜYOR;
   yanlış değerle ayakta kalmıyor. Bu bilinçli bir tercih: eksik künye,
   eskimiş künyeden ucuz. */
const PRESS_FACT_LABELS = [
  "Ticari isim",
  "Dubai tüzel kişiliği",
  "Yönetici ortak",
  "Ülkeler",
];

export default function BasindaBizPage() {
  /* Değeri boş olan satır zaten basılmıyor (SWAP:* alanları about.ts'te boş) */
  const facts = PRESS_FACT_LABELS.map((label) =>
    IDENTITY.rows.find((r) => r.label === label && r.value.trim() !== ""),
  ).filter((r): r is { label: string; value: string } => Boolean(r));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana sayfa", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "Basında biz", item: `${SITE}${PATH}` },
        ],
      },
      {
        "@type": "CollectionPage",
        name: "Basında biz",
        url: `${SITE}${PATH}`,
        description: DESCRIPTION,
        inLanguage: "tr-TR",
        about: { "@id": `${SITE}/#organization` },
        /* JSON-LD'ye YALNIZCA GERÇEK KAYIT giriyor ve bugün bunu sağlayan şey
           tek bir gerçek: PRESS'te yer tutucu kayıt yok, sekizi de gerçek
           (bkz. lib/press.ts). Yani burada ayrıca süzmeye gerek kalmıyor.

           Kural yine de yazılı olsun: bir gün bu deftere yer tutucu bir kayıt
           girerse, ITEMS'ı olduğu gibi buraya dökmek onu Google'a gerçek haber
           diye bildirmek olur — sayfadaki yanlış bir cümleden çok daha uzun
           yaşayan bir yanlış beyan. O gün gereken şey, listeyi ekrana basmadan
           önce değil BURADA süzmek; sitenin kalıbı blog.ts · publishedPosts().

           Liste boşken de hiçbir `NewsArticle` düğümü yazılmıyor: var olmayan
           bir haberi bildirmek aynı hatanın öteki ucu. */
        ...(EMPTY
          ? {}
          : {
              mainEntity: {
                "@type": "ItemList",
                itemListElement: ITEMS.map((p, i) => ({
                  "@type": "ListItem",
                  position: i + 1,
                  item: {
                    "@type": "NewsArticle",
                    headline: p.title,
                    url: p.url,
                    datePublished: p.publishedAt,
                    inLanguage: p.lang === "tr" ? "tr-TR" : "en",
                    publisher: { "@type": "Organization", name: p.outlet },
                  },
                })),
              },
            }),
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

        {/* country VERİLMİYOR: PageHero kompakt başlığı basıyor. İki sütunlu
            hero tek bir ülkenin sahnesini çiziyor; bu sayfanın konusu ülke
            değil. */}
        {/* Başlık "Yer aldığımız yayınlar, kaynağıyla birlikte." idi. Konuya
            yakındı ama sayfanın adını hiç kullanmıyor ve "kaynağıyla birlikte"
            zaten lead'in söylediği şeyi başlıkta bir kez daha söylüyordu.
            Ölçü: sayfanın konusu başlıkta cümle içinde geçsin. */}
        <PageHero
          crumb="Basında biz"
          title="Basında yer aldığımız haberler."
          accent="yer aldığımız haberler."
          lead={
            EMPTY
              ? "Bu sayfa bir basın arşivi ve bugün boş. Buraya yalnızca yayının kendi adresine bağlanabilen, tarihi belli kayıtlar giriyor; ekran görüntüsü, kaynağı yazılmayan alıntı ya da adı verilmeyen bir yayın girmiyor."
              : "Dubai ekonomisini anlatan haberlerde uzman görüşümüzle yer alıyoruz. Her kaydın yanında yayının adı, tarihi ve haberin kendi adresi duruyor; alıntıyı buradan değil, kaynağından okuyun."
          }
        />

        {/* ÇİFT BAŞLIK KALKTI — hero'dan sonra doğrudan liste geliyor.
            Müşterinin ölçüsü: "basın kısmında zaten heroda bir şeyler
            yazıyorken bi de altta kayıtların üstüne bir daha başlığa gerek
            yok, direkt listele, e-kitaplardaki gibi düşün." Referans
            /e-kitaplar: PageHero'nun hemen altında .kyn-shelf listesi, arada
            bölüm başlığı yok.

            KALKAN İKİ SATIR VE NEDENİ
            · h2 "Basın kaydı" — hero başlığı zaten "Basında yer aldığımız
              haberler." diyor; ikisi arka arkaya okununca sayfaya iki kez
              giriş yapılıyordu.
            · sec-lead "Kaynağına gidilemeyen kayıt bu listeye hiç girmiyor…"
              — bilgi taşıyordu ama YENİ bilgi değil: hero'nun lead'i aynı
              kuralı olumlu yönden zaten söylüyor ("Her kaydın yanında yayının
              adı, tarihi ve haberin kendi adresi duruyor"). Kaynağı olmayan
              kaydın listeye girmemesi bu cümlenin mantıksal karşılığı. Hero
              metnine taşımak da gerekmedi (bu turda hero metinleri sabit).

            ERİŞİLEBİLİR YAPI: h2 kalkınca sekiz kayıtlık liste başlıksız
            kalıyordu. Görünmeyen h2 duruyor — başlık gezinmesi (screen
            reader'da H tuşu) bozulmasın diye. Bölümün kendisine aria-label
            VERİLMEDİ: adsız <section> zaten `region` değil `generic` olarak
            eşleniyor, yani ortada kaybedilen bir bölge adı yok; kaybedilen
            şey başlık düzeyiydi ve karşılığı da bir başlık.

            .sr-only kaçmıyor: Tailwind'in kuralı top/left vermiyor, kutu
            statik konumunda kalıyor ve .container-o bir kaydırma kabı değil
            (tuzak C yalnızca overflow-x:auto kaplarında geçerli). Ölçüldü. */}
        <section
          className="sec-pad krm-nohead"
          id="kayitlar"
          style={{ background: "var(--white)" }}
        >
          <div className="container-o">
            <h2 className="sr-only">Basın kayıtları</h2>

            {EMPTY ? (
              /* BOŞ DURUM — bugün buraya düşülmüyor (liste dolu). Duruyor ki
                 kayıtlar bir gün kaldırıldığında sayfa boş bir <ul> basmasın;
                 aynı koruma /kariyer'de de var. Kalıp sitenin standardı: ne
                 yok, hangi kuralla dolar, bu arada nereye gidilir. Metin
                 lib/press.ts'te (onaylanacak metin React'in içine dağılmasın). */
              <FadeUp>
                <div className="krm-empty">
                  <span className="krm-empty-ic" aria-hidden="true">
                    <Inbox size={20} strokeWidth={1.8} />
                  </span>
                  <p className="krm-empty-t">{PRESS_EMPTY.title}</p>
                  <p className="krm-empty-l">{PRESS_EMPTY.line}</p>

                  <p className="krm-empty-k">Bu arada</p>
                  <div className="krm-empty-x">
                    <SmartLink href="/hakkimizda" className="krm-exit">
                      <span>
                        <b>Hakkımızda</b>
                        <em>Firmanın künyesi, çalıştığımız ülkeler ve nasıl çalıştığımız.</em>
                      </span>
                      <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                    </SmartLink>
                    <SmartLink href="/iletisim" className="krm-exit">
                      <span>
                        <b>İletişim</b>
                        <em>Üç ülkede ofis, tek muhatap. Basın sorusu da buradan geliyor.</em>
                      </span>
                      <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                    </SmartLink>
                  </div>
                </div>
              </FadeUp>
            ) : (
              <>
                {/* ==================== ALINTI BANDI · BUGÜN BASILMIYOR ==========
                    Müşteri alıntı kalıbını beğendi ("o olayı daha çok
                    kullanabiliriz, o hoşuna gitti murat abinin") ve sitede o
                    kalıbın gerçekten bir iddiayı doğruladığı yer arandı. Bu
                    sayfa çıktı: iddiası doğrudan "adı olan bir kişi basında
                    uzman olarak konuşuyor" olan tek sayfa burası ve o kişinin
                    ağzından tek bir cümle sayfanın hiçbir yerinde geçmiyor.

                    Bandın YERİ listenin ÜSTÜ, altı değil: hero iddiayı
                    kuruyor, alıntı onu insan sesiyle doğruluyor, liste
                    kaynaklarını sayıyor. Alta konsaydı, sekiz kaydı okuduktan
                    sonra gelen bir ek olurdu.

                    BUGÜN HİÇ BASILMIYOR ve bu bir eksik değil, bu sayfanın
                    kendi kuralı: hero "alıntıyı buradan değil, kaynağından
                    okuyun" diyor, yani kaynaksız alıntıyı sayfa açıkça
                    reddediyor. Depodaki iki doğrulanmış Murat Ortaç cümlesinin
                    de hangi yayında söylendiği elimizde yok. Cümle ve kaynağı
                    birlikte geldiği gün blok kendiliğinden görünür oluyor;
                    sayfaya dokunmak gerekmiyor. Metin ve gerekçe
                    lib/press.ts · SWAP:PRESS_QUOTE. */}
                {hasPressQuote() && (
                  <FadeUp>
                    <figure className="krm-quote">
                      <QuoteMark
                        className="krm-quote-m"
                        size={34}
                        strokeWidth={1.6}
                        aria-hidden="true"
                      />
                      <blockquote>{PRESS_QUOTE.text}</blockquote>
                      <figcaption>
                        <b>{PRESS_QUOTE.who}</b>
                        <span>{PRESS_QUOTE.role}</span>
                        <span>{PRESS_QUOTE.source}</span>
                      </figcaption>
                    </figure>
                  </FadeUp>
                )}

                {/* ============== KARTIN GÖRSELİ · "ÖNİZLEME KOYALIM MI" ==========
                    Müşteri sordu: "basın kısmında bide önizleme olarak görsel mi
                    koysak bunlara ya, çok mu donuk kaldı acaba diye bi düşündüm."

                    TEŞHİS DOĞRU, ÖLÇÜLDÜ. 1440'ta bu sayfanın <main>'i
                    1136 × 4252 = 6.059.300 piksel kare ve içindeki bütün grafik
                    ögelerin (svg/img) toplam alanı 5.118 piksel kare: sayfanın
                    binde 0,84'ü. Bir kartta TEK bir grafik öge var, o da alt
                    satırdaki 14 × 14 zincir ikonu — 242.879 piksel karelik kartın
                    binde 0,8'i. Sayfa gerçekten donuk.

                    ÖNİZLEME GÖRSELİ YİNE DE KONMADI. Üç yol denendi, üçü de
                    kapalı:
                      · Haberin kendi görseli / ekran görüntüsü → yayının telifi.
                        Sekiz kaydın sekizi de üçüncü tarafın içeriği.
                      · Yayının logosu → depoda kaynağı yok. lib/brands.ts on iki
                        markanın tam logosunu taşıyor ama hepsi banka, ödeme
                        kuruluşu ve serbest bölge; tek bir yayın yok. O dosyanın
                        kendi kuralı da net: "kayıt defterinde karşılığı olmayan
                        ada logo İCAT EDİLMİYOR".
                      · Temsilî stok fotoğraf → kaydın kendisiyle ilgisiz bir
                        kare, haberin görseliymiş gibi okunurdu.

                    ---------------------------------------------- YERİNE NE KONDU
                    Kartın görsel ağırlığı, kartta zaten duran ve kart başına
                    GERÇEKTEN DEĞİŞEN tek şeye verildi: yayının adı.

                    Ölçüm bunu söylüyor. Sekiz kaydın sekizi de ayrı yayından
                    ama yalnızca ALTI farklı başlık ve BEŞ farklı özet var
                    (aynı ajans metni birden çok yayında çıkmış). Yani listeye
                    kart başına bir görsel koysaydık bile, sekiz kartın altısı
                    hâlâ aynı cümleyi tekrar ediyor olurdu; ayırt eden tek alan
                    yayın adı ve o ad 12,5 pikselde künye satırının içinde
                    kayboluyordu. Ad artık kartın solunda kendi plakasında.

                    PLAKA LOGO DEĞİL ve öyle görünmemeli. Kuralları CSS'te
                    yazılı (kurumsal.css · .krm-item-plate): sitenin kendi yazı
                    tipi, sekiz plakada tek bir yüzey rengi, yayına özel renk
                    ya da işaret yok.

                    METİN İKİ KEZ BASILMIYOR: ad künye satırından ÇIKTI, plakaya
                    girdi. Plaka aria-hidden DEĞİL, gerçek metin — bu depoda
                    görsel olarak gizlenen <span>'lerin erişilebilirlik ağacına
                    hiç çıkmadığı üç kez yaşandı. DOM sırası da okuma sırası:
                    kim → ne türde → ne zaman → ne. */}
                <ul className="krm-feed">
                  {ITEMS.map((p, i) => (
                    <li key={p.id}>
                      <FadeUp delay={i * 0.05}>
                        {/* Bağlantı SmartLink DEĞİL: hedef site dışı bir yayın,
                            dolaşım kararının (lib/routes.ts) konusu değil. */}
                        <a
                          className="krm-item"
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span className="krm-item-plate">
                            <span className="krm-item-plate-n">{p.outlet}</span>
                          </span>
                          <span className="krm-item-b">
                            <span className="krm-item-h">
                              <span className="krm-item-kind">{PRESS_KIND_LABEL[p.kind]}</span>
                              <time className="krm-item-d" dateTime={p.publishedAt}>
                                {pressDate(p.publishedAt)}
                              </time>
                            </span>
                            <span className="krm-item-t">{p.title}</span>
                            {p.summary && <span className="krm-item-s">{p.summary}</span>}
                            <span className="krm-item-go">
                              <Link2 size={14} strokeWidth={2} aria-hidden="true" />
                              Kaynağında okuyun
                            </span>
                          </span>
                        </a>
                      </FadeUp>
                    </li>
                  ))}
                </ul>

                {/* Listenin dipnotu. Metin lib/press.ts'e KONMADI çünkü
                    onaylanacak bir iddia değil, sunum hakkında bir açıklama —
                    aynı sebeple bu sayfadaki .krm-facts-n notu da satır içinde
                    duruyor. Sekiz plaka yan yana görülünce "logoları koymuşlar"
                    diye okunabilir; bu satır o okumayı kapatıyor. */}
                <p className="krm-feed-n">
                  Plakalardaki yayın adları sitenin kendi yazı tipiyle dizildi; yayınların
                  logoları değil.
                </p>
              </>
            )}
          </div>
        </section>

        <section className="sec-pad" id="basin-iletisim" style={{ background: "var(--paper)" }}>
          <div className="container-o">
            <div className="krm-media">
              <div>
                <h2 className="h2">Basından geliyorsanız</h2>
                <p className="sec-lead">
                  {hasPressContact()
                    ? "Basın soruları için doğrudan aşağıdaki adres kullanılıyor."
                    : "Basına ayrılmış ayrı bir adres yayımlamıyoruz; soru da iletişim sayfasındaki kanallardan geliyor. Yanıt süresi taahhüdümüz yok, o yüzden bir süre de yazmıyoruz."}
                </p>

                <div className="krm-media-a">
                  {hasPressContact() ? (
                    <a className="btn btn-primary" href={PRESS_CONTACT.href}>
                      {PRESS_CONTACT.value}
                      <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                    </a>
                  ) : (
                    <SmartLink href="/iletisim" className="btn btn-primary">
                      İletişim sayfası
                      <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                    </SmartLink>
                  )}
                </div>
              </div>

              {/* Gazetecinin ikinci sorusu: "firmanın adını haberde nasıl
                  yazarım". Satırların değeri lib/about.ts'ten geliyor. */}
              <div className="krm-facts">
                <p className="krm-facts-k">
                  <Newspaper size={14} strokeWidth={2} aria-hidden="true" />
                  Haberde kullanabileceğiniz alanlar
                </p>
                <dl className="krm-facts-l">
                  {facts.map((f) => (
                    <div key={f.label} className="krm-facts-r">
                      <dt>{f.label}</dt>
                      <dd>{f.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="krm-facts-n">
                  Doğrulanmamış alan burada hiç basılmıyor: kuruluş yılı, lisans numarası ve açık
                  adres bu yüzden listede yok.
                </p>
              </div>
            </div>
          </div>
        </section>

        <FinalCta />
      </main>
    </>
  );
}
