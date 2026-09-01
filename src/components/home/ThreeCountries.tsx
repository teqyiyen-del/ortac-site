"use client";

import { ArrowRight } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import SmartLink from "@/components/shared/SmartLink";
import { Flag } from "@/components/shared/CountryPicker";
import { HOME_CMP_ROWS, ORDER } from "@/components/Countries";
import { COUNTRY_NAME, FACTS } from "@/lib/brand";
import { COUNTRY_PHOTO } from "@/lib/media";
import { useOrtacStore } from "@/lib/store";

/* ============================================================================
   §3 — ÜLKE KARARI · "yay + yerinde açılan panel" + "yan yana kıyas"

   NEREDEN GELDİ

   Bu bölüm lab'da yarışan on iki adaydan C11'in canlıya alınmış hâli. Önceki
   canlı sürüm (uk2-) üç fotoğraflı sütun + "yan yana kıyas" tablosu ikilisiydi;
   müşteri C11'i seçti. Karar bağlandıktan sonra müşteri isteğiyle lab tarafı
   tamamen silindi: /lab/ulkeler sayfası, CountriesC11.tsx, CountriesC12.tsx ve
   lab-c11.css / lab-c12.css artık yok. Bölümün tek kaynağı bu dosya.

   CSS AD ALANI — uk3-
   Aday c11- önekiyle ayrı bir dosyada yaşıyordu; iki dosya da globals.css'e
   import edildiği için aynı sınıf adlarını paylaşmamaları gerekiyordu, yoksa
   sonuncusu kazanır ve canlıda yapılan bir düzeltme sessizce lab'daki adayı da
   değiştirirdi. Aday silindiği için çakışma riski kalktı, ama önek olduğu gibi
   duruyor — canlı CSS'i yeniden adlandırmanın hiçbir kazancı yok. Bu dosyanın
   CSS'i src/app/css/countries.css ve öneki uk3-: bölümün üçüncü kuşağı
   (uk- → uk2- → uk3-).

   ESKİ uk2- BLOĞU
   globals.css'teki .uk2-* kuralları artık bu dosyadan çağrılmıyor. Silinmediler
   çünkü globals.css bu turda kilitli; ölü CSS olarak duruyorlar. Bir gün
   temizlenirlerse DİKKAT: o bloğun içinde bir :root var ve --red-600 /
   --red-100 / --green-300 / --red-300 orada tanımlı. Bu dosya --red-600
   kullanıyor (çalışmayan kanalın çarpısı); token'lar silinirse çarpı renksiz
   kalır.

   BU TURDA NE DEĞİŞTİ — KIYASIN DERİNLİĞİ BURADAN ÇIKTI

   "Yan yana kıyas" görünümü on üç satırdı: beş künye satırı ve üç para grubu,
   yani bütün kanallar tek tek. Müşterinin teşhisi doğru — ana sayfa bir vitrin,
   o tablo ise kıyasın kendi sayfasının işi. Tablo /ulkeler'e taşındı ve orada
   genişledi (vergi çerçevesi, banka başvurusu, dürüst kısıt, hizmet listesi).
   Burada önce dört satır kaldı, sonra sekize çıktı — aşağıdaki nota bakın.
   Sitenin tasarım yasası değişmedi: her section özet verir, detaya tıklanarak
   açılan yerlerden ya da başka bir sayfadan girilir.

   BİR SONRAKİ TUR — iki geri alma. Taşıma doğruydu ama iki şey fazla gitmişti:
   fotoğraflı sütun başlıkları da kalkmıştı ve dört satır az geldi. Müşteri
   ikisini de geri istedi. Fotoğraf /ulkeler'deki .ctry- başlığının aynısı
   olarak döndü (gerekçesi tablonun içinde), satır sayısı sekize çıktı.

   Sekiz satırın tanımı BURADA DEĞİL, src/components/Countries.tsx'te ve yedisi
   /ulkeler'deki tablonun kullandığı NESNENİN TA KENDİSİ. İki ekranın aynı
   hücreyi farklı göstermesi bu yüzden mümkün değil. Kıyas ilkelleri (Chips,
   Channel, channels, parts …) de oradan geliyor; aşağıdaki açılan panel de
   onları çağırıyor.

   ÇAPALAR — ikisi de zorunlu
   · id="ulkeler"        — lib/routes.ts HOME_ANCHORS'ta canlı, /#ulkeler oraya iner.
   · id="odeme-altyapisi" — aynı listede canlı; Nav'ın mega menüsü, FinalCta
     (yayındaki /sektorler/yazilim-ve-teknoloji sayfasında duruyor) ve footer
     oraya bağlanıyor. Bu çapanın ana sayfadaki TEK karşılığı bu bölüm:
     home/PaymentInfra.tsx aynı id'yi taşıyor ama o bileşen ana sayfadan
     çıkarıldı ve hiçbir yerde render edilmiyor (bkz. src/app/page.tsx'in
     başındaki "Kaldırılanlar" notu). Yani buradaki id kaybolursa çalışan üç
     bağlantı birden hiçbir yere inmez. Çapanın nereye taşındığı ve neden
     kıyas görünümünü açtığı için aşağıdaki HASH SENKRONU notuna bakın.
   ========================================================================= */

/* =================================================================== UI ==== */

/* --------------------------------------------------------------- ayak ----- */
/* Tablonun altındaki iki şey: bir not ve /ulkeler'e çıkan bağlantı.
   Bileşen bir tur boyunca İKİ görünüme birden hizmet ediyordu ve `note`
   propu o yüzden vardı; tek görünüm kalınca prop da tek çağrılıyor, ama
   yerinde bırakıldı — ayağın metni bölümün içeriğine bağlı ve bir sonraki
   turda değişebilir.

   Metin "detaylı kıyas" demiyor, ne yapacağını söylüyor: ölçüt ölçüt. Ana
   sayfadaki tablo da bir kıyas; ayrımı "detaylı" sıfatıyla değil, sayfanın
   gerçekten sunduğu şeyle kurmak gerekiyor. */
function Foot({ note }: { note: string }) {
  return (
    <div className="uk3-foot">
      <p className="uk3-note">{note}</p>
      <SmartLink href="/ulkeler" className="btn btn-line btn-sm uk3-exit">
        Ölçüt ölçüt kıyaslayın
        <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
      </SmartLink>
    </div>
  );
}

export default function ThreeCountries() {
  /* Kıyas tablosunun sütun seçimi. Bölümün KENDİ durumu değil, sayfanın ortak
     durumu: aynı zustand dilimini hero'daki küre de sürüyor (HeroGlobe) ve
     fiyat hesaplayıcı ile /basla da onu okuyor. Yerel bir useState koysaydık
     ziyaretçi burada KKTC'yi seçip hesaplayıcıya Dubai ile geçerdi.

     Ülke ülke görünümündeki `open` ise mağazaya BAĞLANMIYOR ve bağlanmamalı:
     orada tıklama "bu ülkeyi seçtim" demiyor, "bu paneli açtım" diyor —
     kapatmak için ikinci kez tıklanıyor ve null'a düşüyor. Bir seçimin
     "hiçbiri" hâli yok. */
  const country = useOrtacStore((s) => s.country);
  const setCountry = useOrtacStore((s) => s.setCountry);

  /* #odeme-altyapisi ÇAPASININ GÖRÜNÜM SEÇEN ETKİSİ KALKTI.
     Bu bölüm bir tur boyunca iki görünümlüydü ve çapayla gelen ziyaretçiye
     kıyas görünümünü açan bir `hashchange` dinleyicisi vardı. Müşteri bölümü
     tek görünüme indirdi ("sadece bu tabloyu verelim"), yani seçilecek bir
     görünüm kalmadı; dinleyici de kalktı. Çapanın kendisi DURUYOR (.uk3-views
     üzerinde) çünkü ana sayfa SSS'i ve menü oraya bağlanıyor; tarayıcının
     kendi kaydırması artık tek başına yetiyor. */

  return (
    /* Zemin beyaz ve bu yapısal bir zorunluluk, tercih değil: açılan panelin
       kendi zemini --paper, içindeki para kartı --white ve disklerin halkası
       yine --white. Bölüm --paper olsaydı panel zeminle aynı renge düşer,
       halkalar da gri üstünde beyaz bir daire olarak görünürdü. Önceki canlı
       sürüm --paper idi; bu bölüm ile altındaki "Verdiğimiz hizmetler" (o da
       beyaz) arasındaki gri şerit bu turda kayboluyor. Ayrımı artık renk değil
       yayın kendisi yapıyor: bölüm boş bir beyazlıkla değil, üç diskli bir
       kemerle açılıyor. */
    <section id="ulkeler" className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        {/* Başlık ve değiştirici aynı satırda, iki uçta. Değiştirici başlığın
            ALTINDA değil YANINDA: altına konsaydı içerikten önce gelen ikinci
            bir kontrol katmanı olur ve bölüm "önce bir şey seç" diye açılırdı.
            Oysa varsayılan görünüm zaten doğru olan; değiştirici bir seçenek,
            bir kapı değil. Dar ekranda flex-wrap onu başlığın altına indiriyor
            ve orada sola hizalanıyor. */}
        <div className="uk3-top">
          <div className="sec-head">
            <SplitWords
              as="h2"
              text="Hizmet verdiğimiz ülkeler ve karşılaştırması."
              accent="ülkeler ve karşılaştırması."
              className="h2"
              style={{ color: "var(--text-900)" }}
            />
            <FadeUp delay={0.2}>
              <p className="sec-lead">
                Üç ülkede kuruluş, banka ve muhasebe. Sekiz temel ölçüt aşağıda yan yana;
                her ülkenin ayrıntısı kendi sayfasında.
              </p>
            </FadeUp>
          </div>

        </div>

        {/* #odeme-altyapisi ÇAPASININ EVİ. Kap bir tur boyunca iki görünümü
            birden taşıyordu ve yüksekliği geçişte animasyon ediliyordu; ikisi
            de kalktı, `ref` de onunla birlikte gitti. Kabın kendisi DURUYOR
            çünkü çapayı o taşıyor: ana sayfa SSS'i ve menü buraya bağlanıyor.
            Boşluğu (--space-head) hâlâ kabın ÜST KENAR BOŞLUĞU veriyor. */}
        <div className="uk3-views" id="odeme-altyapisi">
          {/* ================================================= YAN YANA KIYAS
              TEK GÖRÜNÜM KALDI. Müşteri: "Burada ülkeler yazısının yanına
              karşılaştırma yazalım ve sadece bu tabloyu verelim." Bölüm bir
              tur boyunca iki görünümlüydü (ülke ülke / yan yana kıyas) ve
              üstünde bir sekme değiştirici duruyordu; ikisi de kalktı.

              Bu yüzden burada artık `role="tabpanel"` ve `hidden` YOK: tek
              panel varken sekme kalıbı erişilebilirlik ağacında olmayan bir
              seçim vaat ederdi. Sarmalayıcı `.uk3-views` duruyor, çünkü
              #odeme-altyapisi çapasını o taşıyor (ana sayfa SSS'inden ve
              menüden bağlanıyor). */}
          <div className="uk3-view" id="uk3-view-kiyas">
            {/* IZGARA DEĞİL GERÇEK <table>, ve bu bilinçli bir tercih.

                Burada gösterilen şey tanımı gereği iki eksenli: satır bir ölçüt,
                sütun bir ülke, hücre ikisinin kesişimi. Izgarayla da aynı görüntü
                çıkardı ama ekran okuyucu "Tahsilat, İngiltere: Stripe çalışıyor"
                diyemezdi — yalnızca hücrelerin içeriğini arka arkaya okurdu ve
                kullanıcı hangi sütunda olduğunu sayarak takip etmek zorunda
                kalırdı. <th scope="col"> ve <th scope="row"> bu ilişkiyi tarayıcıya
                söylüyor; tablo gezinme kısayolları (satır/sütun okuma) ancak o
                zaman çalışıyor. Görsel bir tablonun semantik tablo olmaması,
                erişilebilirlikte en sık yapılan sessiz kayıp.

                Kaydırma kutusu klavyeyle de gezilebilsin diye odaklanabilir ve
                kendi adı olan bir bölge: fare olmayan bir kullanıcı dar ekranda
                tabloyu yatay kaydırmak için başka bir yol bulamazdı. */}
            <div
              className="uk3-tblwrap"
              tabIndex={0}
              role="region"
              aria-label="Üç ülkenin karşılaştırma tablosu, yatay kaydırılabilir"
            >
              <table className="uk3-tbl">
                <caption className="sr-only">
                  Üç ülke yan yana, sekiz temel ölçütte: kuruluş maliyeti, tipik
                  süre, yapı, kim için, oturum, kurumlar vergisi, banka başvurusu
                  ve kart tahsilatı. Sütun başlıkları birer düğmedir; seçtiğiniz
                  ülke tabloda işaretlenir ve hesaplayıcıya da onunla geçersiniz.
                  Ölçüt ölçüt tam kıyas ülkeler sayfasında.
                </caption>

                {/* FOTOĞRAFLI SÜTUN BAŞLIĞI — GERİ GELDİ.

                    Bir tur önce başlık, bayrak yanında ülke adından ibaret tek
                    satırlık bir şeritti. Müşterinin cümlesi: "görselleri de
                    istiyorum, ülke görselleri çıkıyordu ya o güzeldi." Haklı
                    olduğu yer şu — fotoğraf burada süs değil işaret: dört sütunlu
                    bir tabloda ülkelerin nerede başladığını tek bakışta veren şey
                    o, ve dar ekranda tablo yana kayarken sütunu ayırt etmenin en
                    hızlı yolu. Kıyasın kendisini okunaksız yapmıyor çünkü fotoğraf
                    BAŞLIK hücresinde kalıyor: değer hücreleri beyaz, tablonun
                    verisi fotoğrafın üstüne hiç düşmüyor.

                    NASIL BASILIYOR — next/image DEĞİL, CSS background-image.
                    Üç gerekçe: (1) /ulkeler'deki başlık tam olarak bu; .ctry-
                    kuralları zaten yazılı ve paylaşılıyor, kopyalasaydık bir gün
                    biri değişip öteki geride kalırdı — müşteri iki ekranda iki
                    farklı başlık görürdü. (2) next.config.ts'te remotePatterns
                    yok, yani next/image ancak `unoptimized` ile çalışır — o hâlde
                    bileşen hiçbir optimizasyon yapmıyor, yalnızca <img> basıyor;
                    kazanç sıfır, <th> içine `fill` ile yerleştirme maliyeti ise
                    gerçek. (3) Fotoğraf dekor: aria-hidden ve alt metni yok.
                    Zemin görüntüsü olarak yazmak bu niyeti işaretlemenin kendisi.

                    Kaynak lib/media.ts · COUNTRY_PHOTO — /ulkeler ile aynı harita.
                    URL'ler Unsplash yer tutucusu (SWAP:STOCK_PHOTOS), müşterinin
                    kendi çekimiyle değişecekler; o gün tek dosya değişiyor.

                    NEDEN DÜĞME, NEDEN BAĞLANTI DEĞİL — ve [data-soon] kararı.
                    Başlık ülke sayfasına giden bir bağlantı OLSAYDI, /ingiltere ve
                    /kktc dolaşıma kapalı olduğu için SmartLink onları sönük birer
                    span'e çevirirdi: üç fotoğraflı başlıktan ikisi soluk ve
                    tıklanamaz. Müşterinin ayrımı burada nettir — sönükleşen şey
                    bir bağlantı değil bir TASARIM olurdu ve arıza gibi görünürdü.
                    Çözüm sönüklüğü kapatmak (--soon-dim: 1) değil, başlığı hiç
                    bağlantı yapmamak: başlık bir SEÇİM düğmesi, üç ülkede de
                    çalışıyor ve hiçbir dolaşım vaadi vermiyor. Bölümde [data-soon]
                    yalnızca gerçek bağlantılarda kalıyor (tablo ayağındaki "…
                    sayfası" düğmeleri, paneldeki "…'de kuruluş") ve orada sönük
                    KALMASI doğru: onlar bilgi taşıyan bağlantılar. Bu yüzden
                    countries.css'te --soon-dim tanımı YOK.

                    Sütun sırası ORDER, yani yaydakiyle birebir aynı: İngiltere ·
                    Dubai · KKTC. Orta sütun kendiliğinden boyanmıyor — yayda
                    Dubai'yi öne çıkaran şey editoryal bir tercih ve kubbeyle
                    söyleniyor; bir kıyas tablosunda bir sütunu renklendirmek
                    "önerilen bu" demek olurdu. Boyanan tek sütun ziyaretçinin
                    KENDİ seçtiği. */}
                <thead>
                  <tr>
                    <th scope="col" className="uk3-tbl-corner">
                      Ölçüt
                    </th>
                    {ORDER.map((c) => {
                      const on = country === c;
                      return (
                        <th key={c} scope="col" className="ctry-th">
                          <button
                            type="button"
                            className="ctry-head"
                            data-on={on}
                            aria-pressed={on}
                            onClick={() => setCountry(c)}
                          >
                            <span
                              className="ctry-photo"
                              aria-hidden="true"
                              style={{ backgroundImage: `url(${COUNTRY_PHOTO[c]})` }}
                            />
                            <span className="ctry-scrim" aria-hidden="true" />
                            <span className="ctry-head-body">
                              <span className="uk3-tflag ctry-flag" aria-hidden="true">
                                <Flag country={c} />
                              </span>
                              <span className="ctry-name">{COUNTRY_NAME[c]}</span>
                              {/* İki kelimelik künye, veriden: FACTS[c].tag */}
                              <span className="ctry-sub">{FACTS[c].tag}</span>
                            </span>
                          </button>
                        </th>
                      );
                    })}
                  </tr>
                </thead>

                {/* SEKİZ SATIR — bu turda dörtten çıktı. Tanımları burada değil
                    Countries.tsx'te (HOME_CMP_ROWS) ve yedisi /ulkeler'deki
                    ayrıntılı tablonun bastığı NESNENİN AYNISI; sekizincisi (kart
                    tahsilatı) aynı verinin — PAY_MATRIX'in — tek satırlık özeti.
                    Yani ana sayfa ile kıyas sayfasının aynı hücrede farklı şey
                    söylemesi mümkün değil. Hangi satırın neden seçildiği o
                    dosyada, dizinin başında yazılı.

                    Sekiz hâlâ ÖZET: sayfanın yasası her section'ın özet vermesi,
                    detayın tıklanarak açılan yerlerden ya da başka bir sayfadan
                    gelmesi. Ayrıntılı tablo on üç satır ve /ulkeler'de; buradaki
                    çıkış düğmesi de oraya gidiyor. */}
                <tbody>
                  {HOME_CMP_ROWS.map((row) => {
                    const Icon = row.i;
                    return (
                      <tr key={row.k}>
                        <th scope="row" className="uk3-rowh">
                          <span className="uk3-rowh-t">
                            <Icon size={15} strokeWidth={1.9} aria-hidden="true" />
                            {row.k}
                          </span>
                          {row.hint ? <span className="uk3-rowh-h">{row.hint}</span> : null}
                        </th>
                        {/* Seçili sütun boyanıyor (.uk3-td[data-on]) — başlıktaki
                            düğmenin görünür karşılığı bu. Boya olmasaydı
                            aria-pressed duyurduğu şeyin ekranda karşılığı olmazdı:
                            gören kullanıcı neyi seçtiğini yalnızca fotoğrafın
                            parlaklığından anlardı. Yapışkan ölçüt sütunu beyaz
                            kalıyor; altından kayan hücreler görünmesin diye. */}
                        {ORDER.map((c) => (
                          <td key={c} className="uk3-td" data-on={country === c}>
                            {row.cell(c)}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>

                {/* Kıyasın çıkışı. Yay görünümünde ülke sayfasına giden düğme
                    açılan panelin içinde; tabloda panel yok, o yüzden çıkış tablo
                    ayağında ve her sütunun kendi altında duruyor. Kapalı ülkeler
                    burada da sönük çıkıyor (SmartLink) — kıyas görünümü dolaşım
                    kararını delmiyor. */}
                <tfoot>
                  <tr>
                    <td className="uk3-td uk3-tbl-corner" />
                    {ORDER.map((c) => (
                      <td key={c} className="uk3-td" data-on={country === c}>
                        <SmartLink href={`/${c}`} className="btn btn-line btn-sm uk3-tcta">
                          {COUNTRY_NAME[c]} sayfası
                          <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                        </SmartLink>
                      </td>
                    ))}
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Tablonun tek dipnotu, ve artık tek iş yapıyor.

                TALİMAT KISMI KALKTI (20.08.2026). Eskiden "Sütun başlığına basın:
                seçtiğiniz ülke işaretli kalır, hesaplayıcıya da onunla geçersiniz."
                diye başlıyordu. Müşterinin kuralı: kullanım talimatı YALNIZCA
                açılır bloklarda kalsın, tabloda ve kartta kalksın. Bu bir tablo;
                sütun başlığı bir şey açmıyor, seçiyor ve seçimi boya gösteriyor.
                Yay görünümünün notu ("Ülkeye tıklayın…") DURUYOR, çünkü orada
                tıklama gerçekten bir bloğu yerinde açıyor.

                KALAN İŞ ETİKET. Tablonun kendi getirdiği üç bilgi türü var — tutar,
                süre ve bu turda eklenen vergi — ve üçü de kapalı hâlde
                görünmüyor. Etiketsiz bırakmak STANCE_LIMITS'e aykırı olurdu:
                yan yana duran üç oran, sınırı söylenmezse kişiye özel bir vergi
                görüşü gibi okunur. Aynı cümle /ulkeler'in ayağında da var. */}
            <Foot note="Tutarlar temsilîdir, süreler tipik aralıktır; vergi satırı genel çerçevedir." />
          </div>
        </div>

        {/* ---------------------------------------------------------- DÜZELTME 3
            BÖLÜMÜN ALTINDAKİ İKİ DİPNOT KUTUSU KALKTI.

            Burada .uk3-notes içinde iki kutu vardı:
              · "Ödeme kuruluşu hesabı, banka hesabı değildir. Wise ve Payoneer
                 farklı lisansa tabidir."
              · "Hesabı banka açar, karar bankanındır. Onay taahhüdü vermiyoruz.
                 Dosyayı hazırlar, süreci yürütürüz."

            Müşteri ikisinin de bu bölümden çıkmasını istedi. İkisi de dürüstlük
            maddesi ve SİTEDEN SİLİNMİYOR — brand.ts'e dokunulmadı. Nerede
            yaşamaya devam ettikleri, tek tek doğrulanmış hâliyle:

            1) "Ödeme kuruluşu hesabı, banka hesabı değildir"
               → src/lib/brand.ts · PAY_MATRIX "Ödeme kuruluşu" grubunun hint'i:
                 "Banka değil; farklı lisans ve koruma rejimi". Bu cümle bu
                 bölümde İKİ yerde basılıyor: açılan panelin para kartında
                 (.uk3-mgh) ve yukarıdaki kıyas tablosunun aynı adlı satır
                 başlığının altında. Yani uyarı kaybolmadı, konusunun yanına
                 taşındı — Wise ile Payoneer'ın tam üstüne.
               → src/components/home/PaymentInfra.tsx:194'te daha uzun bir hâli
                 duruyor AMA O BİLEŞEN RENDER EDİLMİYOR: ana sayfadan çıkarıldı
                 (bkz. src/app/page.tsx) ve başka hiçbir yerden import edilmiyor.
                 Yani orayı "yaşamaya devam ediyor" diye saymadım.

            2) "Hesabı banka açar, karar bankanındır"
               → src/components/home/HomeFaq.tsx:64 · "Banka hesabı açılacağı
                 garanti mi?" sorusunun cevabı, birebir aynı cümleyle başlıyor.
                 HomeFaq ana sayfada yayında ve bu bölümün birkaç blok altında.
               → src/lib/brand.ts · STANCE_LIMITS[0] ("Banka onayı garantisi
                 vermiyoruz") başlığı src/components/Nav.tsx:594'te, yani SİTENİN
                 HER SAYFASINDAKİ mega menüde basılıyor.
               → Not: aynı diziyi basan src/components/home/Stance.tsx de ana
                 sayfadan çıkarılmış ve hiçbir yerde import edilmiyor; o da
                 sayılmadı.

            ÇAPA NE OLDU — id="odeme-altyapisi" bu kutularla birlikte kaybolamazdı:
            Nav'ın mega menüsü, FinalCta ve footer oraya bağlanıyor ve ana sayfada
            başka karşılığı yok. Çapa yukarıdaki .uk3-views kutusuna taşındı ve
            oraya inen ziyaretçiye kıyas görünümü açılıyor; gerekçesi HASH
            SENKRONU notunda. */}
      </div>
    </section>
  );
}
