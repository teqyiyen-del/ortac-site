import Image from "next/image";
import {
  BadgeCheck,
  Check,
  CreditCard,
  IdCard,
  Landmark,
  MapPin,
  MonitorSmartphone,
  Percent,
  Wallet,
  Zap,
  type LucideIcon,
} from "lucide-react";

import FadeUp from "@/components/shared/FadeUp";
import { FACTS } from "@/lib/brand";
import { COUNTRY_CONTENT } from "@/lib/countryContent";
import { COUNTRY_PHOTO } from "@/lib/media";
import type { Country } from "@/lib/store";

/* ############################################################################
 * ##  DEVRE DIŞI — BU BÖLÜM ŞU AN HİÇBİR SAYFADA BASILMIYOR.               ##
 * ############################################################################
 *
 * Dosya çalışır durumda ve BİLEREK SİLİNMEDİ. Yalnızca ülke sayfasının
 * akışından çıkarıldı: src/app/ulke/[slug]/page.tsx içinde ne import'u ne de
 * <CountryIntro /> satırı var (orada bunun yerine gerekçeli bir yorum bloğu
 * duruyor). css/country-intro.css ve globals.css'teki @import satırı da
 * duruyor — CSS yüklü ama kimse bu sınıfları basmıyor.
 *
 * NEDEN KAPANDI. Bu slot beş tur denendi; beşincisi (aşağıdaki tasarım) ilk
 * kez onay almıştı. Müşteri bu turda slotun tamamını kapattı:
 *   "herodan sonra gelen kısımı daha mantıklı bir işlev için kullanamayacaksak
 *    bence direkt siktiret uçur gitsin gerek yok çıkamıyoruz işin içinden.
 *    tamamen konudan apayrı düşünerek herodan sonra konuya geçmeden önce ne
 *    yapabiliriz olarak düşünerek farklı farklı türde şeyler deneyip laba
 *    atabilirsin, şimdilik ordaki kısmı kaldır."
 * Yani itiraz bu tasarıma değil, SLOTUN İŞLEVİNE. Aynı slot için labda yeni
 * denemeler istenecek ve o denemeler sıfırdan değil, buradan devam edecek:
 * bu dosya slotun EN SON ONAYLANMIŞ hâlinin kaydı. Silinseydi altıncı tur,
 * dört turluk hata kaydını da kaybederek başlardı.
 *
 * NASIL GERİ AÇILIR. page.tsx'e iki satır, başka hiçbir şey gerekmiyor:
 *   import CountryIntro from "@/components/country/CountryIntro";
 *   <CountryIntro country={slug} name={name} />
 *
 * GERİ AÇILIRSA KONTROL EDİLECEK İKİ ŞEY:
 *   · CountryPros'un başlığı bu turda "…'de şirket kurmanın avantajları" oldu.
 *     Bu bölümün üst başlığı (.cin-eyeb) "…'nin avantajları" diyor; ikisi
 *     birlikte basılırsa aynı sayfada iki avantaj başlığı olur.
 *   · `pros` yine iki yerde basılır. Kopya olmaması için kurulmuş dört kollu
 *     ayrım (rütbe / çizim / marka / zemin) CountryPros'un başındaki 1. maddede
 *     anlatılıyordu; o madde bu turda güncellendi, oradan okuyun.
 *
 * ############################################################################
 *
 * KONUYA GİRİŞ (.cin-) — ülke sayfasında hero ile yapı seçimi arasındaki bölüm.
 *
 * ============================================================================
 * 0) KARAR KAYDI — DÖRT TUR VE MÜŞTERİNİN BEŞİNCİ CÜMLESİ
 *
 * Bu aralık dört tur reddedildi. Sırayla ne denendi ve neden düştü:
 *
 *   1. tur — fotoğraf bölümün ZEMİNİ, kenardan kenara; üstünde hero'nun üç
 *      katmanı (gece yüzey + ızgara + mavi glow), metin fotoğrafın üstünde,
 *      altında iki satırlık künye. Müşteri: "şuan sayfada 2 tane hero varmış
 *      gibi duruyor bir şeyler çok yanlış ya."
 *      Sebep ÖLÇÜLDÜ ve punto değildi (o sürüm 46px, hero 58px — zaten
 *      küçüktü): ayrımı bozan şey ZEMİNDİ. Bölüm hero'nun dilini konuşuyordu.
 *   2. tur — C4 (sayfanın sırasını anlatan aday) ve C6 (ülkenin üç ülke
 *      içindeki yeri). İkisi de düştü, ikisi de silindi.
 *   3. tur — C5 "eşik": beyaz zemine konmuş kart, solda ülkenin adı + kurulan
 *      yapı pulu + sayfanın ne yapacağını söyleyen bir cümle, sağda fotoğraf.
 *      Yayına alındı ama şerhle: "hala tam ikna olmadım ama şimdilik onu koy."
 *   4. tur — C5 için gerekçe geldi: "ülke giriş kısmı asla hoşuma gitmiyor,
 *      GEREKSİZ BİR KISIM gibi hissettiriyor herodan farksız. direkt o kısımda
 *      dubainin en öne çıkan avantajlarını fln mı vererek girsek."
 *      Teşhis doğruydu: kartta ülkeye dair tek bir olgu vardı (kurulan yapı),
 *      gerisi sayfanın kendisi hakkındaydı. Labda O1/O2/O3 (beyaz zemin) ve
 *      O4 (fotoğraflı koyu zemin) denendi.
 *
 * BEŞİNCİ VE SON CÜMLE — bu dosyanın sebebi:
 *   "dubai giriş kısmındaki tasarımı ve içeriğide muhasebe sayfasındaki gibi
 *    yap. bir tanesini solda öne çıkar, diğer 3 ü sağda kalsın fln o tasarım
 *    iyi baya."
 *
 * Yani düzen artık uydurulmuyor, KOPYALANIYOR: /dubai/muhasebe'de yayına
 * alınan K4 (components/lab/KimK4.tsx + css/lab-kim4.css). Müşteri dört turdan
 * sonra ilk kez bir düzenden memnun; labda beşinci tur açılmadı, doğrudan
 * canlıya uygulandı.
 *
 * ============================================================================
 * 1) K4 NE YAPIYOR, BURAYA NASIL GEÇTİ
 *
 * K4'ün yapısı: zemin fotoğrafı + perde + TEK blok. Perdenin üstünde iki
 * sütun — solda bir madde BEYAN olarak (32 piksele kadar başlık + gövde),
 * sağda kalan maddeler saç teli çizgilerle ayrılmış satırlar hâlinde.
 *
 * Buradaki karşılığı countryContent.pros. Sıra VERİDEN geliyor, elle
 * sabitlenmiş dizi yok: `const [main, ...rest] = pros`. Veri dosyasında sıra
 * değişirse öne çıkan madde de kendiliğinden değişir; burada "vergi" diye
 * sabitlenmiş bir dize yok.
 *
 * ÜÇ ÜLKENİN DE DÖRT MADDESİ VAR, yani bugün düzen her ülkede "bir + üç".
 * Ama bu bir şablon değil: `rest` boşsa sağ sütun hiç basılmıyor ve sol sütun
 * bloğun tamamını alıyor; beşinci madde eklenirse sağ sütuna dördüncü satır
 * olarak düşüyor. Sayı hiçbir yerde sabit değil.
 *
 * DUBAİ'NİN YILDIZI KORUNDU. pros[0] "Kurumlar vergisi %0*" ve yıldız gerçek
 * bir şart taşıyor; şerhi (`line` içinde, "şart ihlalinde standart oran
 * uygulanır") öne çıkan maddenin gövdesi olarak yıldızla AYNI blokta ve
 * bloktaki en büyük gövde metni. Şartlılık rozeti metinden okunuyor (yıldız
 * ya da cümlede geçen "şart"), ikon anahtarından değil — kural canlı
 * CountryPros'tan devralındı, aynı ikonu kullanan koşulsuz bir avantaja rozet
 * kaymasın diye.
 *
 * KURULAN YAPI (brand.ts · FACTS.structure) DÜŞMEDİ. C5'in tek gerçek kazancı
 * buydu ve ülke sayfasında başka hiçbir yerde geçmiyor. K4'te beyanın dibinde
 * saç teli bir çizginin altında imza duruyor; burada o slotta bu pul var.
 * Etiket + değer çifti DEĞİL tek pul, çünkü müşterinin reddettiği şey tam
 * olarak künye kalıbıydı. İçi boş, kenarı saç teli: koyu yüzeyde dolu bir pul
 * parlak bir leke olurdu. "Serbest bölge" hukuki terim, olduğu gibi geliyor.
 *
 * UYDURMA YOK. Ekrandaki her başlık ve her cümle countryContent.ts'ten;
 * yazılmış tek metin bölüm başlığı ("…'nin avantajları", canlı CountryPros'un
 * başlığından birebir) ve "şarta bağlı" rozeti (yine CountryPros'tan). Yeni
 * bir oran, süre veya koşul yazılmadı.
 *
 * ============================================================================
 * 2) AŞAĞIDAKİ BÖLÜM — ÇÖZÜLEN ÇELİŞKİ
 *
 * `pros` bir bölüm aşağıda CountryPros bento'sunda ZATEN basılıyordu. Aynı
 * dört maddeyi iki ekran arayla iki kez göstermek bölümü yine "gereksiz"
 * yapardı — müşterinin dört turdur şikâyet ettiği şey buydu.
 *
 * Çözüm bölüşmek değil DEVRALMAK: avantajlar yukarı çıktı, aşağıdaki bento
 * kalktı. Boşalan slot boş kalmadı, çünkü depoda kullanılmayan bir içerik
 * duruyordu — countryContent.watchouts bugüne dek hiçbir bölüm tarafından
 * basılmıyordu. İki kod yorumu bunu doğruluyor: CountryPros "kalemler
 * silinmedi, bu ızgaradan çıktı", countryContent "aynı kalemler kendi
 * başlarına bir bölüm olarak geri gelecek". Geri geldiler:
 * components/country/CountryCost.tsx · "…karşılığında ne istiyor?"
 * Sayfa tek satır bilgi kaybetmedi, tersine kazandı.
 *
 * SONRAKİ TURUN DÜZELTMESİ: yukarıdaki paragraf artık geçmiş zaman. Avantaj
 * bento'su (CountryPros) geri geldi — kaldırılması bir talimat hatasıydı — ve
 * "Karşılığında" bölümü de bir tur sonra müşteri isteğiyle tamamen kaldırıldı;
 * CountryCost.tsx ve css/country-cost.css SİLİNDİ. countryContent.watchouts
 * verisi duruyor ama şu an hiçbir bölüm onu basmıyor.
 *
 * ============================================================================
 * 3) "İKİ HERO" RİSKİ — K4 KOYU BİR ZEMİN GETİRİYOR
 *
 * Birinci turun itirazı buydu ve K4 riski geri çağırıyor. Ayrım tek bir kola
 * değil beşine birden yıkıldı; ölçümlerin tamamı css/country-intro.css'in
 * başında, yan yana tablo hâlinde. Özeti:
 *
 *   1. MADDE   hero'nun zemini VEKTÖR (düz #080808 + CSS ızgara + mavi glow),
 *              buranınki FOTOĞRAF. Sayfada fotoğraf taşıyan tek koyu yüzey bu.
 *   2. YAYILIM hero kenardan kenara, yarıçapı 0, nav'ın altına giriyor. Bu blok
 *              container-o içinde ve 28px yuvarlak; 1440'ta solunda ve sağında
 *              145'er piksel beyaz duruyor. KOYU ALAN HİÇBİR EKRAN KENARINA
 *              DEĞMİYOR — müşterinin kendi tarifiyle "buraya koyulmuş bir part".
 *              Beş kolun en belirleyicisi bu.
 *   3. PUNTO   hero 1440'ta 58px; buradaki en büyük tipografi 32px (%55).
 *   4. IŞIK    hero'nun başlığının arkasında mavi glow var; burada glow yok,
 *              ızgara yok, mavi yalnızca ikon gliflerinde.
 *   5. BOY     hero 890px, koyu alan 344px — hero'nun %39'u. Bu kol telefonda
 *              zayıflıyor (metin uzuyor); gerekçesi ve kalan dört kolun orada
 *              da durduğu ölçüm CSS'in başında.
 *
 * Birinci turda kalkan sürüm de koyuydu; farkı şuydu: o, hero'nun KALIBINI
 * tekrar ediyordu (tam genişlik + gece zemin + ızgara + glow). Buradaki fark
 * taklit ile alıntı arasındaki fark.
 *
 * ============================================================================
 * 4) FOTOĞRAF VE PERDE
 *
 * Kaynak lib/media.ts · COUNTRY_PHOTO; buraya yeni bir adres yazılmadı.
 * Kareler: Dubai — alacakaranlıkta Burj Khalifa ve Şeyh Zayed kavşağı;
 * İngiltere — Tower Bridge; KKTC — bir Akdeniz kıyısı (media.ts'te "stand-in
 * for Girne" notu duruyor). Üçü de dekor: alt="" ve kartın altındaki künye
 * satırı karenin temsilî olduğunu yazıyor. unoptimized, çünkü next.config.ts'te
 * images.remotePatterns tanımlı değil.
 *
 * Perde karenin kendisine göre değil, "kare O NOKTADA SAF BEYAZ OLSAYDI"
 * ihtimaline göre kuruldu — Dubai karesinin en açık bloğu zaten neredeyse saf
 * beyaz (#fff0e2, güneş pusu), yani bu teorik bir pay değil. Kare müşterinin
 * kendi çekimiyle değişince (media.ts · SWAP:STOCK_PHOTOS) kontrastı yeniden
 * ölçmek gerekmiyor. Sayılar css/country-intro.css'in başında.
 *
 * ============================================================================
 * 5) HAREKET
 *
 * Yalnızca FadeUp, yani sitenin ortak açılış hareketi. CSS'te süregiden
 * animasyon yok; yine de country-intro.css'in sonunda bir
 * @media (prefers-reduced-motion: reduce) bloğu duruyor — ileride buraya bir
 * geçiş eklenirse ilk günden karşılansın diye. useReducedMotion KULLANILMIYOR:
 * bu depoda beş ayrı kalıpta hidrasyon hatası çıkardı. Bileşen sunucu bileşeni.
 */

/* Canlı CountryPros'un haritasıyla AYNI. Kopya değil zorunluluk: `pros[].icon`
   veri dosyasında bir dize ve o dizeyi bileşene bağlayan tek yer bu tablo. */
const PRO_ICON: Record<string, LucideIcon> = {
  percent: Percent,
  bank: Landmark,
  id: IdCard,
  pin: MapPin,
  remote: MonitorSmartphone,
  wallet: Wallet,
  badge: BadgeCheck,
  card: CreditCard,
  zap: Zap,
};

/* Koşul taşıyan iddia koşulunu başlıkta da gösterir. Metnin KENDİSİNDEN
   okunuyor (yıldızlı başlık ya da "şart" geçen cümle), ikon anahtarından
   değil — aynı ikonu kullanan koşulsuz bir avantaja rozet kaymasın. */
const isConditional = (title: string, line: string) =>
  title.includes("*") || /şart/i.test(line);

const POSSESSIVE: Record<string, string> = {
  Dubai: "Dubai'nin",
  İngiltere: "İngiltere'nin",
  KKTC: "KKTC'nin",
};

export default function CountryIntro({ country, name }: { country: Country; name: string }) {
  const facts = FACTS[country];
  /* Sıra veriden. Öne çıkan madde `pros[0]` — Dubai'de kurumlar vergisi,
     İngiltere'de ziyaret şartının olmaması, KKTC'de Türkiye'ye yakınlık. */
  const [main, ...rest] = COUNTRY_CONTENT[country].pros;
  const MainIcon = (main.icon && PRO_ICON[main.icon]) || Check;

  return (
    <section className="cin">
      <div className="container-o">
        {/* Bölümün başlığı koyu bloğun DIŞINDA, beyazın üstünde ve küçük.
            İki sebep: (a) blok içindeki tek büyük tipografi öne çıkan avantajın
            başlığı olsun — K4'ün kurucu kararı bu; (b) 46 piksellik ortak .h2
            buraya konsaydı hero'nun %79'u olurdu, yani birinci turda ölçülen
            ve reddedilen orana geri dönerdik. Metin canlı CountryPros'un
            başlığından birebir: avantajlar yukarı çıkarken başlığı da geldi. */}
        <FadeUp y={14}>
          <h2 className="cin-eyeb">{POSSESSIVE[name] ?? `${name}'nin`} avantajları</h2>
        </FadeUp>

        <figure className="cin-fig">
          <FadeUp delay={0.06} y={18}>
            <div className="cin-card">
              {/* alt boş: kare bir olgu taşımıyor, dekor. */}
              <div className="cin-bg" aria-hidden="true">
                <Image
                  src={COUNTRY_PHOTO[country]}
                  alt=""
                  fill
                  sizes="(min-width: 1240px) 1136px, 100vw"
                  className="cin-img"
                  unoptimized
                />
                <span className="cin-scrim" />
              </div>

              <div className="cin-in">
                {/* ---- beyan: öne çıkan avantaj ---- */}
                <div className="cin-lead">
                  {/* İkon kutusuz: koyu zeminde ikona ayrı bir kap açmak beyanı
                      yeniden bir karta çevirirdi, ayrıca açık renkli pulun
                      kendisi fotoğrafın üstünde parlak bir leke olurdu. */}
                  <span className="cin-lead-ic" aria-hidden="true">
                    <MainIcon size={26} strokeWidth={1.8} />
                  </span>

                  <h3 className="cin-lead-t">
                    {main.title}
                    {isConditional(main.title, main.line) && (
                      <span className="cin-flag">şarta bağlı</span>
                    )}
                  </h3>
                  <p className="cin-lead-l">{main.line}</p>

                  {/* Kurulan yapı, K4'te imzanın durduğu yerde: aynı bloğun
                      dibinde, saç teli bir çizginin altında.
                      margin-top: auto — sağdaki sütun beyandan uzun kalırsa
                      artan yükseklik başlıkla cümlenin arasına değil bu pulun
                      üstüne düşüyor. */}
                  <div className="cin-sign">
                    <span className="cin-struct">{facts.structure}</span>
                  </div>
                </div>

                {/* ---- kalan maddeler ----
                    Kutu değil satır: her satırın üstünden bir saç teli geçiyor,
                    kendi kenarlığı ve zemini yok. Kutu olmayınca satırların
                    farklı boylarda olması görünmüyor.
                    Koşullu basılıyor: veri tek maddeye inerse boş bir sütun ve
                    ızgara boşluğu kalmasın, beyan bloğun tamamını alsın. */}
                {rest.length > 0 && (
                  <ul className="cin-rest">
                    {rest.map((p) => {
                      const Icon = (p.icon && PRO_ICON[p.icon]) || Check;
                      return (
                        <li className="cin-r" key={p.title}>
                          <span className="cin-r-ic" aria-hidden="true">
                            <Icon size={16} strokeWidth={2.1} />
                          </span>
                          <h3 className="cin-r-t">
                            {p.title}
                            {isConditional(p.title, p.line) && (
                              <span className="cin-flag">şarta bağlı</span>
                            )}
                          </h3>
                          <p className="cin-r-l">{p.line}</p>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          </FadeUp>

          {/* Künye kartın DIŞINDA, beyazın üstünde: fotoğrafın üstüne binen bir
              uyarı, uyarı olmaktan çıkıp tasarım öğesine dönüşüyor. Aynı
              cümlenin çoğul hâli /hakkimizda'da yaşıyor (lib/about.ts ·
              WHERE.photoNote); oradan import edilmedi çünkü orada üç kare var,
              burada bir tane. */}
          <figcaption className="cin-cap">
            Görsel ülkeyi temsil ediyor; firmanın kendi çekimi değil.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
