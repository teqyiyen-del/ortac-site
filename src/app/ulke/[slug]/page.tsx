import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import PageHero from "@/components/shared/PageHero";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import CountryPricing from "@/components/CountryPricing";
import CountryProcess from "@/components/CountryProcess";
import CountryStructures from "@/components/CountryStructures";
import CountryDocs from "@/components/CountryDocs";
import CountryTax from "@/components/CountryTax";
import CountryFaq from "@/components/CountryFaq";
import CountryFit from "@/components/CountryFit";
import CountryPros from "@/components/country/CountryPros";
import CountryOrtac from "@/components/country/CountryOrtac";
import CountryAfter from "@/components/country/CountryAfter";
import CountryCross from "@/components/country/CountryCross";
import MoneyHome from "@/components/country/MoneyHome";
import FinalCta from "@/components/FinalCta";
import { COUNTRY_SLUGS } from "@/lib/services";
import { COUNTRY_CONTENT } from "@/lib/countryContent";
import { COUNTRY_LABELS, type Country } from "@/lib/store";

type Params = Promise<{ slug: string }>;

const isCountry = (s: string): s is Country => (COUNTRY_SLUGS as string[]).includes(s);

export function generateStaticParams() {
  return COUNTRY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  if (!isCountry(slug)) return {};
  const name = COUNTRY_LABELS[slug];
  return {
    title: `${name}'de şirket kuruluşu — maliyet, süreç ve hizmetler | Ortac Global`,
    description: `${name}'de kuruluş süresi, maliyeti, avantajları ve dikkat edilmesi gerekenler. Kurulumunuzu seçin, fiyat anında çıksın.`,
  };
}

export default async function CountryPage({ params }: { params: Params }) {
  const { slug } = await params;
  if (!isCountry(slug)) notFound();

  const name = COUNTRY_LABELS[slug];
  const c = COUNTRY_CONTENT[slug];
  const others = COUNTRY_SLUGS.filter((x) => x !== slug);

  /* Para yolları buradan çıktı: artık MoneyHome kendi içinde kuruyor. Sebebi
     hedef ülke seçicisi — sahnelerdeki "Türkiye şirketiniz" düğümü seçime göre
     değiştiği için diyagram state'e bağlı, yani istemci tarafında yaşamak
     zorunda. Sunucu bileşeni olan bu sayfa onu artık hazır kuramıyor. */

  return (
    <>
      <Nav />
      <main>
        {/* country geçince PageHero iki sütunlu hero'ya dönüyor: solda başlık,
            butonlar ve güven satırları, sağda ülkeye özgü vektör sahne.
            Verilmezse eski kompakt başlık bloğu aynen çıkıyor, o yüzden
            /ulkeler, /kaynaklar ve hizmet sayfaları etkilenmiyor. */}
        {/* backdrop propu ARTIK GEÇİLMİYOR. Izgara + glow zemini /dubai'de
            denenip onaylandı ve PageHero'nun varsayılanı oldu, yani üç ülke de
            (dubai / ingiltere / kktc) aynı girişi alıyor. Buradaki koşullu
            prop kalksaydı bile davranış değişmezdi; silinmesinin sebebi
            "Dubai özel" okumasının artık yanlış olması.
            Kalibrasyon: src/app/css/pagehero-grid.css, TİP B (.ph-split). */}
        <PageHero
          country={slug}
          crumb={`Ülkeler · ${name}`}
          title={`${name}'de şirket kurmak.`}
          accent="şirket kurmak."
          lead={c.intro}
        />

        {/* ---------- KALDIRILDI · rakam şeridi (.cp-facts) ----------
             Hero'nun hemen altında dört rakam duruyordu: süre, yapı, kuruluş
             başlangıcı, vize. Sayfa daha "burası neden" demeden fiyat
             konuşmaya başlıyordu ve dört sayı beyaz bir şeritte tasarımsız
             duruyordu. Aynı rakamların hepsi zaten aşağıda, kendi
             bağlamlarında var: süre ve yapı süreç bölümünde, tutarlar
             fiyat yapılandırıcısında.

             ---------- KALDIRILDI · CountryClarify ----------
             "…'de karıştırılan üç şey" bloğu buradaydı. İçerik doğru ama yeri
             yanlıştı: ziyaretçi ülkeyi tanımadan üç uyarıyla karşılaşıyordu.
             Bileşen ve metni duruyor (countryContent.clarify), akıştan çıktı.
             Duruşun kendisi kaybolmadı — "şirket kurmak vergi avantajı
             üretmiyor" cümlesi CountryTax içinde STANCE_Q/STANCE_A olarak,
             "serbest bölge otomatik muafiyet değil" satırı da aynı bölümün
             vergi tablosunda yaşamaya devam ediyor. */}

        {/* ---------- DEVRE DIŞI · konuya giriş (CountryIntro) ----------
             Burada hero'dan sonraki giriş bölümü duruyordu: zemin fotoğrafı +
             perde + tek koyu blok, solda öne çıkan bir avantaj, sağda kalan üç
             madde. Beş tur denendi; beşincisi (muhasebe sayfasındaki K4
             düzeninin kopyası) ilk kez onay almıştı ama müşteri bu turda slotun
             tamamını kapattı:
               "herodan sonra gelen kısımı daha mantıklı bir işlev için
                kullanamayacaksak bence direkt siktiret uçur gitsin … tamamen
                konudan apayrı düşünerek … farklı farklı türde şeyler deneyip
                laba atabilirsin, şimdilik ordaki kısmı kaldır."

             DOSYA SİLİNMEDİ, SADECE AKIŞTAN ÇIKTI. Ne bileşen
             (components/country/CountryIntro.tsx) ne CSS (css/country-intro.css)
             ne de globals.css'teki @import satırı kaldırıldı. Sebebi: aynı slot
             için labda yeni denemeler istenecek ve o dosya en son ONAYLANMIŞ
             hâlin kaydı — sıfırdan yazmak yerine ondan devam edilecek.

             GERİ AÇMAK: aşağıdaki satırın yorumunu kaldırmak ve import'u geri
             koymak yeterli, başka hiçbir şey gerekmiyor.
               import CountryIntro from "@/components/country/CountryIntro";
               <CountryIntro country={slug} name={name} />

             YAN ETKİ — SAYFANIN TEK FOTOĞRAFI BURADAYDI. Ülke sayfası artık
             baştan sona vektör ve tipografi; COUNTRY_PHOTO yalnızca bu bölümde
             kullanılıyordu. Slota yeni bir aday gelene kadar sayfada fotoğraf
             yok. Hero'ya fotoğraf koyup açığı kapatmak BİR ÇÖZÜM DEĞİL: müşteri
             hero'ların fotoğrafsız kalmasını ayrıca istemişti. */}

        {/* ---------- the structural choice, where there is one ----------
             Akışta yukarı çıkmadı, ÜSTÜ BOŞALDI: giriş bölümü kalkınca
             hero'dan sonraki ilk bölüm bu oldu. Yerleşim buna hazır — bölümün
             kendi karar kaydı zaten "bu bölüm hero'dan hemen sonra geliyor,
             ziyaretçi ülkeyi daha tanımadan buraya düşüyor" varsayımıyla
             yazılmıştı; giriş bloğu araya beş tur önce girmişti. */}
        {c.structures && <CountryStructures data={c.structures} />}

        {/* ---------- avantajlar · GERİ GELDİ ----------
             Bu bölüm bir tur kaldırılmıştı ve KALDIRILMASI BİR HATAYDI.

             Olan şuydu: giriş bloğu K4 düzenine geçip avantajları da basmaya
             başlayınca "aynı liste iki kez görünmesin" diye bento silindi,
             slot "Karşılığında"ya devredildi. Oysa müşterinin isteği
             avantajlardan GİRİŞTE de söz edilmesiydi; bölümün kendisinin
             kalkması hiç konuşulmadı. Tepkisi: "avantajlar kısmının özel bir
             yeri olması gayet iyiydi."

             Bölüm git'ten birebir geri kuruldu (510f687) ve SİLİNMEDEN ÖNCEKİ
             SLOTUNA döndü: yapı seçiminin altı, Ortac bölümünün üstü. Yer
             seçiminin iki gerekçesi var — (a) girişle arasına CountryStructures
             giriyor, yani aynı dört madde arka arkaya iki ekranda çakışmıyor;
             (b) "Karşılığında" bölümü hemen altına düşüyor ve o bölümün spotu
             zaten "Yukarısı ülkenin verdikleri; bunlar bedeli" diyor.

             Tekrar silinmedi, AYRIŞTIRILDI: giriş manşet (bir madde beyan, üçü
             satır, çizim yok, marka yok), burası detay (dört madde eşit rütbede,
             her birinin üstünde ProSchema'dan kendi vektörü ve gerçek marka
             plakaları). Ayrıntı bileşenin başında. */}
        <CountryPros pros={c.pros} name={name} />

        {/* ---------- KALDIRILDI · "… karşılığında ne istiyor?" ----------
             Bir tur önce buraya countryContent.watchouts'u basan bir bölüm
             eklenmişti (CountryCost + css/country-cost.css, .cco-). Müşteri
             görünce istemedi: "dubai karşılığında ne istiyor kısmına gerek
             yok." Bileşen ve CSS dosyası SİLİNDİ, globals.css'teki @import
             satırı da kalktı.

             VERİ SİLİNMEDİ. countryContent.watchouts olduğu gibi duruyor
             (Dubai 2, İngiltere 1, KKTC 3 kalem). Bu kalemler daha önce de bir
             tur avantaj ızgarasından çıkarılıp kullanılmadan beklemiş ve sonra
             geri gelmişti; veri ucuz, bölüm pahalı. */}

        {/* ---------- what WE add on top of it (base, dubai only for now) ---------- */}
        <CountryOrtac country={slug} />

        {/* ---------- tax frame ----------
             Akışta yukarı alındı: avantajlardan hemen sonra, fiyattan önce.
             It used to sit near the end, after the process and the document
             list, which is long past the point where the question gets asked.
             What a visitor wants to know right after "why here" is what they
             actually keep, and only then what our own work costs. */}
        <CountryTax data={c.tax} name={name} />

        {/* ---------- money home ----------
             Akışta yukarı alındı: vergi çerçevesinin hemen altına. Eskiden
             fiyatın, sürecin, evrakların ve "kimin işine yarar"ın arkasındaydı;
             oysa "burada ne kalıyor" sorusunun doğal devamı "peki onu nasıl
             eve getiririm". İki bölüm yan yana durunca ziyaretçi parayı uçtan
             uca takip edebiliyor, fiyat konuşması ondan sonra başlıyor. */}
        <MoneyHome country={slug} name={name} />

        {/* ---------- interactive price ----------
             ZEMİN MAVİDEN SİYAHA GERİ DÖNDÜ. Müşteri: "dubai fiyat kısmını eski
             haline çevir ve o kısım için labda tasarım dene yeni daha farklı
             nasıl bi fiyat kısmı yaparız fln diye."

             Bir tur önce burada `ip-sec` vardı: derin mavi bir alan, kayan
             ızgara, nefes alan ışık ve beyaz bir yapılandırıcı kartı. Gerekçesi
             müşterinin bir önceki turdaki "mavi üzerine bir yapı" cümlesiydi;
             görünce beğenmedi. Bölüm `sec-night`a döndü, `.ip-sec` bloğu
             globals.css'ten tamamen silindi (silme notu orada), fiyat
             yapılandırıcısının gece sürümü de git'ten geri kuruldu.

             YENİ TASARIM ARAYIŞI BU SAYFADA DEĞİL: /lab/dubai-fiyat. Burada
             yapılan iş yalnızca geri alma; canlı sayfa 18c54af'teki hâlinde. */}
        <section id="fiyat" className="sec-pad sec-night">
          <div className="container-o">
            <div className="sec-head sec-head-dark">
              {/* accentColor GERİ ALINDI. Mavi zemin için #9cc6f5 verilmişti,
                  çünkü varsayılan aksan (--blue-700 #307fe2) kendi zemininin
                  ailesine düşüp #0a2450 üstünde 3,81:1'e iniyordu. Zemin
                  --night'a (#080808) dönünce o sorun ortadan kalktı: #307fe2
                  siyah üstünde 5,02:1 ve h2 zaten büyük metin. Prop kaldırıldı,
                  varsayılan geri geldi — sitedeki diğer gece başlıklarıyla
                  aynı aksan rengi. */}
              <SplitWords
                as="h2"
                text="Kurulumunuzu seçin, fiyat anında çıksın."
                accent="fiyat anında çıksın."
                className="h2"
                style={{ color: "#ffffff" }}
              />
              <FadeUp delay={0.2}>
                <p className="sec-lead sec-lead-dark">
                  {name} için paket ve ek hizmetleri seçin; tutar sağda satır satır oluşur.
                </p>
              </FadeUp>
            </div>
            <CountryPricing country={slug} />
          </div>
        </section>

        {/* ---------- KALDIRILDI · "… hizmetleri" fiyat kartları ----------
             Beş hizmet kartı, her birinin üstünde bir fiyat. Fiyat konusu bu
             sayfada zaten bir bölüm önce, yapılandırıcıyla açılıyor; burada
             ikinci kez ve bağlamsız açılınca sayfa iki ayrı fiyat okuması
             veriyordu. Hizmetlere giriş kalktığı yerde durmuyor: ana sayfadaki
             hizmet kartlarında ülke seçimiyle, ayrıca Nav'daki ülke menüsünde
             duruyor. */}

        {/* ---------- KALDIRILDI · "Neyi dahil ediyoruz, neyi etmiyoruz" ----------
             Kapsam matrisi tek ve sabit bir liste veriyordu, oysa neyin dahil
             olduğu seçilen pakete göre değişiyor. Sayfanın ortasında paketten
             bağımsız bir "dahil / hariç" tablosu, fiyat yapılandırıcısında
             görülenle çelişme riski taşıyordu. Kapsam fiyatın içine taşınacak;
             ayrı bir bölüm olarak durmuyor. Veri (countryContent.included /
             .excluded) ve CountryScope bileşeni yerinde duruyor. */}

        {/* ---------- process ---------- */}
        <CountryProcess steps={c.steps} title={`${name}'de süreç, adım adım.`} />

        {/* ---------- documents: the inputs that process needs ---------- */}
        <CountryDocs data={c.docs} name={name} />

        {/* ---------- what happens after the company exists ----------
             Yeri kasıtlı: kuruluş anlatıldıktan (süreç) ve neyin istendiği
             yazıldıktan (evraklar) sonra geliyor. Daha önce koyulsaydı henüz
             kurulmamış bir şirketin yıllık yükümlülüklerini okutuyor olurduk.
             Şimdilik yalnızca Dubai'de içerik var; diğer ülkelerde null. */}
        <CountryAfter country={slug} />

        {/* ---------- fit ---------- */}
        <section className="sec-pad" style={{ background: "var(--white)" }}>
          <div className="container-o">
            <div className="sec-head">
              <SplitWords
                as="h2"
                text={`${name} kimin işine yarar?`}
                accent="kimin işine yarar?"
                className="h2"
                style={{ color: "var(--text-900)" }}
              />
              <FadeUp delay={0.2}>
                <p className="sec-lead">Profilinizi seçin, cevabı burada verelim.</p>
              </FadeUp>
            </div>

            <CountryFit rows={c.fitTable} country={slug} />
          </div>
        </section>

        {/* ---------- faq ---------- */}
        <section className="sec-pad" style={{ background: "var(--white)" }}>
          <div className="container-o">
            <div className="sec-head">
              <SplitWords
                as="h2"
                text="Sık sorulanlar."
                accent="sorulanlar."
                className="h2"
                style={{ color: "var(--text-900)" }}
              />
            </div>
            <CountryFaq items={c.faq} />
          </div>
        </section>

        {/* ---------- other countries ----------
             Kart artık fiyat ve süre basmıyor; bayrak + ad + tek satır künye.
             Gerekçe CountryCross'un başında. */}
        <section className="sec-pad" style={{ background: "var(--white)" }}>
          <div className="container-o">
            <CountryCross
              title="Diğer ülkelere bakın"
              items={others.map((o) => ({ country: o, href: `/${o}` }))}
            />
          </div>
        </section>

        <FinalCta />
      </main>
    </>
  );
}
