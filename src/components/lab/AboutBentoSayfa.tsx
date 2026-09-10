import Image from "next/image";
import {
  ArrowRight,
  Boxes,
  Briefcase,
  Building2,
  ChartCandlestick,
  Code2,
  Compass,
  Handshake,
  History,
  Languages,
  LayoutDashboard,
  MapPin,
  Quote as QuoteMark,
  Stamp,
  Stethoscope,
  Target,
  TriangleAlert,
  UserRound,
  Waypoints,
  type LucideIcon,
} from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import PageHero from "@/components/shared/PageHero";
import SmartLink from "@/components/shared/SmartLink";
import AskCta from "@/components/shared/AskCta";
import { BrandChip } from "@/components/shared/BrandMark";
import { Flag } from "@/components/shared/CountryPicker";
import { brandKeyForName } from "@/lib/brands";
import { CHAIN, COUNTRY_NAME, PARTNERS, STANCE_LIMITS } from "@/lib/brand";
import { TEAM_PHOTO } from "@/lib/media";
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
  WHERE,
  partnerTypes,
  structureOf,
  type AboutIcon,
} from "@/lib/about";

/* ============================================================================
   HAKKIMIZDA · KOMPLE BENTO — aday · /lab/hakkimizda-bento
   Biçim: src/app/css/lab-hak-bento.css (ad alanı .hbn-)

   Müşteri: "bide burayı komple bentogrid mi yapsak anasayfadaki en aşağıdaki
   bento gibi."

   ---------------------------------------------------------------- TEK KAYNAK
   Bu dosyada TEK BİR CÜMLE YAZILI DEĞİL. Ekrandaki her kelime lib/about.ts ya
   da lib/brand.ts'ten okunuyor; burası yalnızca diziyor. Canlı sayfanın kuralı
   bu ve lab adayı da onu bozmuyor — yoksa aday, canlı metin onaylandıktan
   sonra sessizce bayatlardı.

   ------------------------------------------------ ASIL İŞ TASARIM DEĞİL KARAR
   Dokuz bölümü dokuz karoya çevirmek bento değil, kutulanmış liste olur ve
   müşteri bunu daha önce reddetti. Bento'nun anlamı hiyerarşi: KARO BOYU =
   ÖNEM. Karar ölçülerek verildi; ölçüm rapordaki tabloda, özeti şu:

   ÖLÇÜM 1440'ta, canlı /hakkimizda üstünde, bölüm bölüm innerText sayılarak
   yapıldı (rakam = metindeki sayı simgesi):

     bölüm             karakter  rakam  doğrulanabilir olgu   karo
     künye                  204      0  4  (1 / 51 kr)       ┐ birleşti → EN BÜYÜK
     kim olduğumuz · metin  428      0  0  (SIFIR)           ┘ (4 sütun × 2 sıra, gece)
     kurumlar               312      0  12 logo + 6 tür       geniş (4)
     nasıl · zincir+ilke+sınır 1.136  5  11 madde             BÖLÜNDÜ: tam (6) + küçük (2)
     sektörler              691      0  6                     geniş (4)
     üç ülke                676      0  6                     geniş (4)
     dayanak                577      1  4                     ÜÇ küçük karo (2+2+2)
     alıntı                 159      0  1                     küçük (2)
     vizyon + misyon        294      0  0  (SIFIR)             ✗ tahtaya girmedi
     temas                  225      0  0  (kanallar boş)      ✗ tahtaya girmedi

   TEŞHİS ÖLÇÜLDÜ VE DOĞRULANDI: hero (131) + açılış bölümü (723) = 854
   karakter ve içinde SIFIR rakam var. Sayfanın tamamında yalnızca ALTI sayı
   simgesi geçiyor ve altısı da girişin dışında (biri "30 yıllık", beşi
   zincirin 01-05 numaraları). Sorun uzunluk değil DAYANAK YOKLUĞU.

   Tahtanın birinci kararı bunun cevabı: giriş karosu, sayfanın en yüksek
   kanıt yoğunluklu bloğunu (künye · bir olgu / 51 karakter) yanına alıyor ve
   hemen sağında sayfanın tek büyük rakamı duruyor.

   ------------------------------------------------------- TAHTANIN YERLEŞİMİ
   Altı sütun, altı sıra, on karo. Koyular köşegen kuruyor.

     sıra 1-2  [ KİMLİK 4 × 2sıra · gece ][ 30 YIL 2 ]
                                          [ LİSANS 2 ]
     sıra 3    [ IFZA 2 ][ ÜÇ ÜLKE 4 · gece          ]
     sıra 4    [ KURUMLAR 4              ][ ALINTI 2 · mavi ]
     sıra 5    [ ZİNCİR 6 · gece                     ]
     sıra 6    [ SINIRLAR 2 · gece ][ SEKTÖRLER 4    ]

   DOM SIRASI = EKRAN SIRASI ve bu şart. `grid-auto-flow: dense` kullanılmadı;
   yerleşim delik bırakmadan çözülüyor (hesap CSS'te, TAHTA bloğunda). Aynı
   kural ana sayfa bentosunun kendi kaydında da yazılı.

   Okuma sırası bir anlatı: kimlik → üç kanıt (yıl, imza, marka) → nerede →
   kiminle → tek insan sesi → nasıl → neyi taahhüt etmiyoruz → kimler için.

   ----------------------------------------------------- BENTOYA GİRMEYEN İKİSİ
   VİZYON + MİSYON tahtadan çıktı: 337 karakter, içinde SIFIR doğrulanabilir
   olgu — sayfanın en düşük kanıt yoğunluğu. Karo boyu önem demekse bu ikisi
   en küçük karoyu bile hak etmiyor. SİLİNMEDİ ama: müşteri bir tur önce onları
   kapalı bir <details> arkasında görememişti ("vizyon misyon hiç yazmıyor"),
   yani görünür kalmaları şart. Tahtanın ALTINDA, ayrı zeminde, açık duruyorlar.

   TEMAS da tahtadan çıktı: üç kanalın üçü de boş (about.ts · SWAP:CONTACT_*),
   yani karo somut hiçbir şey gösteremezdi. Sayfanın çıkışı olarak alt blokta.

   ------------------------------------------- TAHTAYA HİÇ BASILMAYAN İKİ METİN
   1) OPENING.body[1] — "Bunun arkasında üç somut dayanak var: kendi muhasebe
      lisansımız, Dubai serbest bölgesiyle resmî iş ortaklığımız ve üç ülkenin
      üçünde de kendi ofisimiz." Bu cümle ÜÇ ŞEY SAYIYOR ve üçü de tahtada
      ayrı karo. Karoların yanında duran bir sayaç cümlesi, karoların altyazısı
      olurdu.
   2) HOW.principles[0] — "Taşeron değil, kendi kadromuz · Defter, beyan ve
      banka dosyası başka bir firmaya devredilmiyor." Aynı iddia
      BASIS.cards[0].s'in son cümlesinde zaten var ("Defter ve beyan taşerona
      gitmiyor") ve bir bentoda iki karo YAN YANA duruyor — akan sayfada iki
      ekran arayla fark edilmeyen tekrar burada aynı bakışta görünüyor.

   Kalan iki ilke (Türkçe tek muhatap · tek panelden takip) zincir karosunun
   ayağında çip olarak duruyor: ikisi de zincirin NASIL yürüdüğünü söylüyor.

   ---------------------------------------------------- AÇIK VERİ · UYDURULMADI
   Dört alan boş ve boş bırakıldı (about.ts'teki SWAP işaretleri yerinde):
     SWAP:FOUNDED           kuruluş yılı        → künye satırı hiç basılmıyor
     SWAP:LICENCE_NO        lisans numarası     → lisans karosu numarasız
     SWAP:OFFICE_ADDRESSES  üç ofisin adresi    → künye satırı hiç basılmıyor
     SWAP:STOCK_PHOTOS      gerçek ekip çekimi  → kare Unsplash yer tutucusu,
                                                  alt="" ile DEKORATİF basılıyor
   Boş değerli satır basılmıyor: "Kuruluş yılı: yok" yazan bir satır, bilginin
   yokluğunu bilgi gibi gösterirdi. Değer girildiği anda satır kendiliğinden
   görünüyor, bu dosyaya dokunmak gerekmiyor.

   ------------------------------------------------------------ SUNUCU BİLEŞENİ
   "use client" YOK ve olmamalı. Hareketin tamamı ya CSS'te (iki döngü, ikisi de
   prefers-reduced-motion kapısının içinde) ya FadeUp'ta. Bu depoda
   `useReducedMotion` ile render ağacını değiştirmek beş ayrı kalıpta
   hidratasyon hatası çıkardı (docs/tuzaklar.md · tuzak A).
   ========================================================================= */

/* about.ts ikonu string taşıyor (React'ten bağımsız kalsın diye). Metin ile
   görselin buluştuğu tek yer burası — canlı sayfadaki eşlemenin aynısı. */
const SECTOR_ICONS: Record<string, LucideIcon> = {
  "e-ticaret": Boxes,
  "yazilim-ve-teknoloji": Code2,
  danismanlik: UserRound,
  gayrimenkul: Building2,
  "finans-ve-yatirim": ChartCandlestick,
  "saglik-ve-medikal": Stethoscope,
};

/* Zincir karosunun ayağındaki iki ilke, about.ts'teki kendi ikon adlarıyla.
   Üçüncü ilke burada YOK; gerekçe dosya başında (BASIS ile birebir tekrar). */
const ILKE_ICONS: Partial<Record<AboutIcon, LucideIcon>> = {
  language: Languages,
  panel: LayoutDashboard,
};

/* Dayanak kartını İKONUYLA arıyoruz, dizin numarasıyla değil. Sebep: about.ts
   bir gün kart sırasını değiştirirse numara sessizce başka bir kartı gösterir;
   ikon adı ise kartın kimliği. Bulunamazsa ilgili karo hiç basılmıyor —
   yer tutucu bir kutu, olmayan bir dayanağı varmış gibi gösterirdi. */
const dayanak = (icon: AboutIcon) => BASIS.cards.find((c) => c.icon === icon);

/* Başlığın başındaki rakamı ayırıyor: "30 yıllık kurumsal geçmiş" →
   ["30", "yıllık kurumsal geçmiş"]. RAKAM ELLE YAZILMIYOR ve bu kasıtlı: sayı
   ile onu tarif eden kelimeler aynı dizeden geliyor, yani sessizce
   ayrılamıyorlar. Veri "35 yıllık" olursa karo 35 basar; veriden rakam
   çıkarsa `null` dönüyor ve karo düz başlığa düşüyor (aşağıda). Aynı kaygı
   canlı bentonun kendi kaydında da yazılı: "rakam ile nesne tek bir satırdan
   geliyor. İkinci bir kaynak, sessizce ayrılabilecek ikinci bir sayı
   demekti." */
function sayiyiAyir(t: string): { n: string; kalan: string } | null {
  const m = /^(\d+)\s+(.+)$/.exec(t.trim());
  return m ? { n: m[1], kalan: m[2] } : null;
}

export default function AboutBentoSayfa() {
  /* Değeri boş olan künye satırı hiç basılmıyor (SWAP notları dosya başında). */
  const kunye = IDENTITY.rows.filter((r) => r.value);
  const gruplar = partnerTypes(PARTNERS);

  const yil = dayanak("history");
  const lisans = dayanak("stamp");
  const ifza = dayanak("handshake");
  const yilSayi = yil ? sayiyiAyir(yil.t) : null;
  const ifzaKey = ifza ? brandKeyForName("IFZA") : null;

  return (
    <>
      {/* ------------------------------------------------------ SAYFA BAŞLIĞI
          PageHero'nun KOMPAKT dalı (`country` de `art` da verilmiyor): kırıntı
          + h1 + tek satır, sağ sütun hiç basılmıyor. Canlı sayfa da bugün tam
          bu dalda ve fotoğrafsız — müşteri hero'daki görseli geri almıştı.

          HERO NEDEN KAROYA GİRMEDİ, TAHTANIN ÜSTÜNDE KALDI: müşterinin
          referansı ana sayfanın bentosu ve orada da tahta bir metin bloğunun
          ALTINDA duruyor — "başlık bloğu + tahta" sitenin kendi bento grameri.
          Hero'yu bir karoya çevirmek yeni bir biçim icat etmek olurdu; üstelik
          kırıntı, h1 ve ızgara zemini PageHero'nun kompakt dalına bağlı ve o
          dal on dört sayfanın girişi.

          Tahtanın kendi bölüm başlığı ise YOK; gerekçe aşağıda, TAHTA bloğunda.
          "Hero de karoya girsin mi" sorusu bir varsayım olarak duruyor ve
          rapora açık soru diye yazıldı. */}
      <PageHero crumb={HERO.crumb} title={HERO.title} accent={HERO.accent} lead={HERO.lead} />

      {/* ================================ TAHTA ================================
          BÖLÜM BAŞLIĞI (`sec-head`) YOK VE BU BİR ATLAMA DEĞİL, DÜZELTME.

          İlk kuruluşta tahtanın üstünde bir `sec-head` vardı ve içinde
          OPENING.heading + OPENING.lead duruyordu — yani ekranda okunan metin
          şuydu: "Kim olduğumuz / Üç ülkede çalışan tek bir ekip." ve HEMEN
          ALTINDA, kimlik karosunun içinde, birebir aynı iki satır. Sayfanın
          metnini okuyunca görüldü (get_page_text), gözle değil. Bir bentoda
          başlık ile ilk karo yan yana değil ÜST ÜSTE duruyor; tekrar
          gizlenmiyor.

          Ana sayfa bentosunda böyle bir çakışma yok çünkü oradaki sec-head
          ("Neden Ortac Global?") hiçbir karonun başlığı değil. Burada tahtanın
          tamamı sayfa demek, yani üstüne konacak başlık zaten h1 — PageHero onu
          basıyor. İkinci bir üst başlık uydurmak yerine (ve about.ts'te böyle
          bir dize yok) başlık karonun kendisine bırakıldı.

          SONUÇ · BELGE YAPISI: h1 PageHero'da, on karonun onu da h2. Karolar
          sayfanın konularının kendisi; aralarında iç içelik yok, düz bir sıra.
          Bu yüzden hepsi aynı düzeyde. */}
      <section className="sec-pad">
        <div className="container-o">
          <div className="hbn">
            {/* --------------------------------------------- 1 · KİMLİK (4 × 2, gece)
                Tahtanın en büyük karosu. Dayanaksız giriş ile sayfanın en
                dayanaklı bloğu (künye) burada birleşiyor.

                İKON KUYUSU YOK ve bu ana sayfa bentosunun kendi kuralı: geniş
                karo (.bn-tile-wide · Authority) da ikon kuyusu basmıyor —
                karonun görseli zaten kendisi. Burada o görsel fotoğraf. */}
            <FadeUp className="hbn-t hbn-t-h hbn-t-gece" y={18}>
              <div className="hbn-kim">
                {/* alt="" ve DEKORATİF. Bu kare "işte ekibimiz" demiyor ve
                    diyemez: media.ts'teki adres bir Unsplash yer tutucusu
                    (SWAP:STOCK_PHOTOS). Aynı kalıp canlı sayfada da kullanıldı.

                    unoptimized: next.config.ts'te remotePatterns tanımlı değil,
                    sitedeki bütün uzak görseller böyle basılıyor.

                    `priority` YOK: kare hero'nun altında, LCP adayı hero'nun
                    h1'i. Kareyi öncelikli indirmek o başlığın önüne geçerdi. */}
                <span className="hbn-kim-ph">
                  <Image
                    src={TEAM_PHOTO}
                    alt=""
                    fill
                    sizes="(min-width: 1000px) 34vw, 100vw"
                    className="hbn-kim-img"
                    unoptimized
                  />
                </span>

                <div className="hbn-kim-body">
                  <h2 className="hbn-h">{OPENING.heading}</h2>
                  <p className="hbn-kim-lead">{OPENING.lead}</p>
                  {/* Yalnızca BİRİNCİ paragraf. İkincisi tahtanın üç karosunu
                      sayıyor, gerekçe dosya başında. */}
                  <p className="hbn-kim-p">{OPENING.body[0]}</p>

                  {/* Künye · sayfanın en yüksek kanıt yoğunluklu bloğu.
                      FadeUp'ın kendisi `.hbn-kn-row` oluyor, satırı SARMIYOR:
                      <dl> içine ancak dt/dd taşıyan doğrudan bir kap girebilir,
                      araya ikinci bir <div> koymak işaretlemeyi bozardı. */}
                  <dl className="hbn-kn">
                    {kunye.map((r, i) => (
                      <FadeUp
                        className="hbn-kn-row"
                        key={r.label}
                        delay={0.14 + i * 0.06}
                        y={10}
                        duration={0.5}
                      >
                        <dt>{r.label}</dt>
                        <dd>{r.value}</dd>
                      </FadeUp>
                    ))}
                  </dl>
                </div>
              </div>
            </FadeUp>

            {/* ------------------------------------------------ 2 · OTUZ YIL (2)
                Tahtanın tek büyük rakamı ve teşhisin doğrudan cevabı: girişte
                sıfır rakam vardı, şimdi girişin hemen sağında bir rakam var. */}
            {yil && (
              <FadeUp className="hbn-t hbn-t-kanit" delay={0.08} y={18}>
                <span className="hbn-ic" aria-hidden="true">
                  <History size={18} strokeWidth={1.9} />
                </span>
                {yilSayi ? (
                  /* <h2>, <p> DEĞİL: diğer dokuz karonun başlığı h2 ve bu
                     karonun başlığı da rakamın kendisi. <p> kalsaydı tahtanın
                     tek karosu başlık listesinden düşerdi.

                     Rakam ile kelimeler ayrı <b>'lerde ama AYNI dizeden ve
                     ardışık: ekran okuyucu "30 yıllık kurumsal geçmiş" diye
                     kesintisiz okuyor. Ayrı bir aria-label KOYULMADI — hem
                     gereksiz, hem de bu depoda ARIA ile "göstermek" bir kez
                     sessizce başarısız oldu (tuzak G-2). Görünmesi gereken
                     metin ekranda ve erişilebilirlik ağacına metin olarak
                     giriyor. */
                  <h2 className="hbn-yil">
                    <b className="hbn-yil-n">{yilSayi.n}</b>
                    <b className="hbn-yil-t">{yilSayi.kalan}</b>
                  </h2>
                ) : (
                  <h2 className="hbn-h">{yil.t}</h2>
                )}
                <p className="hbn-p">{yil.s}</p>
              </FadeUp>
            )}

            {/* -------------------------------------------------- 3 · LİSANS (2)
                Kanıtın ikinci türü: İMZA. Karo lisansın VARLIĞINI değil,
                imzanın hangi sıfatla atıldığını söylüyor — numarası elimizde
                yok ve yazılmıyor (SWAP:LICENCE_NO). */}
            {lisans && (
              <FadeUp className="hbn-t hbn-t-kanit" delay={0.14} y={18}>
                <span className="hbn-muhur" aria-hidden="true">
                  <Stamp size={19} strokeWidth={1.9} />
                  {/* Halka DEKORATİF ve tek işi mührü mühür gibi göstermek.
                      Sürekli hareketi de burada (hbnMuhur 17,9 s) — metne
                      dokunmuyor, yalnız bu çemberin ölçeği değişiyor. */}
                  <i className="hbn-muhur-h" />
                </span>
                <h2 className="hbn-h">{lisans.t}</h2>
                <p className="hbn-p">{lisans.s}</p>
              </FadeUp>
            )}

            {/* ---------------------------------------------------- 4 · IFZA (2)
                Kanıtın üçüncü türü: GERÇEK MARKA İŞARETİ. Logo marka kayıt
                defterinden geliyor; kayıtta karşılığı olmasaydı düz adıyla
                çıkardı. Renk ya da işaret UYDURULMUYOR — yanlış bir logo,
                logosuzluktan daha kötü. */}
            {ifza && (
              <FadeUp className="hbn-t hbn-t-kanit" delay={0.2} y={18}>
                {ifzaKey ? (
                  <span className="hbn-marka">
                    <BrandChip brand={ifzaKey} optical={17} />
                  </span>
                ) : (
                  <span className="hbn-ic" aria-hidden="true">
                    <Handshake size={18} strokeWidth={1.9} />
                  </span>
                )}
                <h2 className="hbn-h">{ifza.t}</h2>
                <p className="hbn-p">{ifza.s}</p>
              </FadeUp>
            )}

            {/* ------------------------------------------- 5 · ÜÇ ÜLKE (4, gece)
                DÖRDÜNCÜ DAYANAK BURADA, KENDİ KAROSUNDA DEĞİL. "Üç ülkede de
                kendi ofisimiz" iddiası WHERE.lead'in içinde ve karo zaten üç
                bayrak basıyor; ayrı bir ofis karosu aynı üç ülkeyi ikinci kez
                sayardı. Aynı karar canlı sayfada bir kez verilmişti (Dubai'nin
                "Kendi ofisimiz" rozeti silinip iddia lead'e taşındı). */}
            <FadeUp className="hbn-t hbn-t-w hbn-t-gece" delay={0.1} y={18}>
              <span className="hbn-ic" aria-hidden="true">
                <MapPin size={18} strokeWidth={1.9} />
              </span>
              <h2 className="hbn-h">{WHERE.heading}</h2>
              <p className="hbn-p">{WHERE.lead}</p>

              <ul className="hbn-ulke">
                {WHERE.countries.map((c) => (
                  <li key={c.slug}>
                    {/* İngiltere ve KKTC şu an dolaşıma kapalı; SmartLink onları
                        sönük ve tıklanamaz <span> olarak basıyor. Satır yine de
                        görünüyor — üç ülkeden birini gizlemek karonun "üç ülke"
                        iddiasını görselde doğru, metinde eksik bırakırdı. */}
                    <SmartLink href={c.href} className="hbn-cn">
                      {/* BAYRAK KABI · silinemez. `Flag` width/height taşımayan
                          çıplak bir <svg viewBox="0 0 60 40"> döndürüyor ve
                          ölçülmeyen kap içinde 300 × 150'ye şişiyor — canlı
                          hakkımızda sayfası tam bu yüzden bir kez çöktü
                          (tuzak H). Kap sabit px + overflow:hidden. */}
                      <span className="hbn-cn-disk" aria-hidden="true">
                        <Flag country={c.slug} />
                      </span>
                      <span>
                        <b className="hbn-cn-ad">{COUNTRY_NAME[c.slug]}</b>
                        {/* Yapı künyesi brand.ts · FACTS'ten okunuyor,
                            about.ts'e kopyalanmadı: iki yerde iki farklı yapı
                            yazma ihtimali hiç doğmasın. */}
                        <span className="hbn-cn-yapi">{structureOf(c.slug)}</span>
                      </span>
                      <span className="hbn-cn-ok" aria-hidden="true">
                        <ArrowRight size={16} strokeWidth={2.1} />
                      </span>
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </FadeUp>

            {/* ------------------------------------------------ 6 · KURUMLAR (4)
                Tahtanın en yoğun görsel kanıtı: 312 karakter metne karşılık 12
                gerçek logo. Satırlarda ROL METNİ YOK, yalnız türü söyleyen
                başlık — gerekçe about.ts · partnerTypes başında (IFZA'nın
                rolündeki "· resmî iş ortağı" yarısı ekrana çıksaydı müşterinin
                kaldırdığı ayrım listeye geri sızardı).

                <dl> gerçek: her sütun bir TÜR ve o türün kurumları, yani
                etiket/değer ilişkisi var. <ul>/<li> de gerçek: bu bir liste ve
                ekran okuyucu kaç kurum olduğunu böyle söylüyor. */}
            <FadeUp className="hbn-t hbn-t-w" delay={0.16} y={18}>
              <span className="hbn-ic" aria-hidden="true">
                <Handshake size={18} strokeWidth={1.9} />
              </span>
              <h2 className="hbn-h">{BASIS.partners.t}</h2>
              <p className="hbn-p">{BASIS.partners.s}</p>

              <dl className="hbn-kur">
                {gruplar.map((g) => (
                  <div className="hbn-kur-g" key={g.type}>
                    <dt className="hbn-kur-t">{g.type}</dt>
                    <dd className="hbn-kur-d">
                      <ul className="hbn-kur-l">
                        {g.names.map((n) => {
                          const key = brandKeyForName(n);
                          return (
                            <li className="hbn-kur-b" key={n}>
                              {key ? (
                                <BrandChip brand={key} optical={14} />
                              ) : (
                                <b className="hbn-kur-n">{n}</b>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </dd>
                  </div>
                ))}
              </dl>
            </FadeUp>

            {/* -------------------------------------------- 7 · ALINTI (2, mavi)
                Tahtanın tek insan sesi ve bilerek KÜÇÜK: 159 karakter, tek
                doğrulanmış olgu (konuşanın adı ve unvanı) ve cümlenin konusu
                firma değil Dubai. Kaynak satırı boş kaldığı sürece basılmıyor
                (SWAP:QUOTE_SOURCE) — uydurulmuş bir kaynak, alıntının kendisini
                de şüpheli hâle getirirdi. */}
            <FadeUp className="hbn-t hbn-t-mavi" delay={0.22} y={18}>
              <figure className="hbn-alnt">
                <QuoteMark className="hbn-alnt-m" size={30} strokeWidth={1.6} aria-hidden="true" />
                <blockquote>{QUOTE.text}</blockquote>
                <figcaption className="hbn-alnt-k">
                  <b>{QUOTE.who}</b>
                  <span>{QUOTE.role}</span>
                  {QUOTE.source && <span>{QUOTE.source}</span>}
                </figcaption>
              </figure>
            </FadeUp>

            {/* ------------------------------------ 8 · ZİNCİR (6, gece) · OMURGA
                Sayfanın tezi bu karoda. Tam genişlik verilmesinin ölçüsü canlı
                bentonun kendi kaydından: karo 752'den 1136'ya çıkınca beş ada
                düşen yer 141 pikselden 213 piksele çıkıyor ve ray en uzun yolu
                burada alıyor.

                Halkalarda ikon değil SIRA NUMARASI var: burada anlatılan şey
                halkaların NE olduğu değil, PEŞ PEŞE geldiği. */}
            <FadeUp className="hbn-t hbn-t-f hbn-t-gece" delay={0.1} y={18}>
              <span className="hbn-ic" aria-hidden="true">
                <Waypoints size={18} strokeWidth={1.9} />
              </span>
              <h2 className="hbn-h">{HOW.heading}</h2>
              <p className="hbn-p">{HOW.lead}</p>

              <ol className="hbn-zin">
                {CHAIN.map((s, i) => (
                  <li className="hbn-adim" key={s.key}>
                    {/* Numara aria-hidden: <ol> zaten sırayı söylüyor, ekran
                        okuyucuda "01 Kuruluş" diye iki kez duyulurdu. */}
                    <span className="hbn-adim-n" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <b className="hbn-adim-t">{s.label}</b>
                    <span className="hbn-adim-l">{s.line}</span>
                  </li>
                ))}
              </ol>

              {/* İki ilke. Üçüncüsü ("Taşeron değil, kendi kadromuz") BASIS
                  kartıyla birebir aynı iddia olduğu için basılmıyor; gerekçe
                  dosya başında. */}
              <ul className="hbn-ilke">
                {HOW.principles
                  .filter((p) => ILKE_ICONS[p.icon])
                  .map((p) => {
                    const Icon = ILKE_ICONS[p.icon] as LucideIcon;
                    return (
                      <li className="hbn-ilke-c" key={p.t}>
                        <Icon size={14} strokeWidth={2} aria-hidden="true" />
                        {p.t}
                      </li>
                    );
                  })}
              </ul>
            </FadeUp>

            {/* --------------------------------------- 9 · SINIRLAR (2, gece)
                Karo küçük ama tahtadan ÇIKMADI. Gerekçe canlı sayfanın kendi
                kararı: "Taahhüt etmediğimiz şeyi bir tıklamanın arkasına
                saklamak, tam olarak bu üç maddenin engellemeye çalıştığı
                davranış olurdu." Sınırları tahtanın altına indirmek de aynı
                saklamanın başka bir biçimi olurdu.

                Üç maddenin üçü de ekranda; "+1 daha" gibi bir kısaltma yok. */}
            <FadeUp className="hbn-t hbn-t-gece" delay={0.16} y={18}>
              <span className="hbn-ic" aria-hidden="true">
                <TriangleAlert size={18} strokeWidth={1.9} />
              </span>
              <h2 className="hbn-h">{HOW.limits.t}</h2>
              <p className="hbn-p">{HOW.limits.s}</p>
              <ul className="hbn-sinir">
                {STANCE_LIMITS.map((l) => (
                  <li key={l.title}>
                    <b>{l.title}</b>
                    <span>{l.line}</span>
                  </li>
                ))}
              </ul>
            </FadeUp>

            {/* ------------------------------------------------ 10 · SEKTÖRLER (4)
                Geniş ama alçak: yer kaplıyor, hiyerarşinin tepesini tutmuyor.
                Altı çipin altısı da ekranda — karo altı sektör sayıyorsa
                altısı da görünmek zorunda, yoksa rakam ile nesne ayrışır.
                Beşi dolaşıma kapalı ve sönük basılıyor; kapalı olanı listeden
                çıkarmak sayfanın altı değil bir sektörde çalıştığını söylerdi. */}
            <FadeUp className="hbn-t hbn-t-w" delay={0.22} y={18}>
              <span className="hbn-ic" aria-hidden="true">
                <Briefcase size={18} strokeWidth={1.9} />
              </span>
              <h2 className="hbn-h">{FOR_WHOM.heading}</h2>
              <p className="hbn-p">{FOR_WHOM.lead}</p>

              <ul className="hbn-sek">
                {FOR_WHOM.sectors.map((s) => {
                  const Icon = SECTOR_ICONS[s.slug];
                  return (
                    <li key={s.slug}>
                      <SmartLink href={sectorHref(s.slug)} className="hbn-sek-c">
                        <span className="hbn-sek-ic" aria-hidden="true">
                          {Icon && <Icon size={16} strokeWidth={1.9} />}
                        </span>
                        <span>
                          <b className="hbn-sek-t">{s.label}</b>
                          <span className="hbn-sek-l">{s.line}</span>
                        </span>
                      </SmartLink>
                    </li>
                  );
                })}
              </ul>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ============================ TAHTANIN DIŞI ============================
          Bentoya girmeyen iki blok. Zemin `--paper`: tahtanın beyaz zemininden
          ayrılmazsa alt blok tahtanın devamı gibi okunur. */}
      <section className="sec-pad hbn-alt">
        <div className="container-o">
          {/* Vizyon ve misyon AÇIKTA. Kapalı duran metin görülmüyor, görülmeyen
              metin yazılmamış sayılıyor — müşteri bunu bir tur önce birebir
              söyledi. Metinler firmanın kendi resmî ifadesi ve tek harfi
              değişmedi; bunlar bizim yazdığımız pazarlama cümleleri değil. */}
          <div className="hbn-vm">
            {[
              { s: OPENING.vision, Icon: Compass },
              { s: OPENING.mission, Icon: Target },
            ].map(({ s, Icon }, i) => (
              <FadeUp key={s.t} delay={0.1 + i * 0.08}>
                <article className="hbn-vm-c">
                  <span className="hbn-vm-ic" aria-hidden="true">
                    <Icon size={18} strokeWidth={1.9} />
                  </span>
                  <h3>{s.t}</h3>
                  <p>{s.s}</p>
                </article>
              </FadeUp>
            ))}
          </div>

          {/* Sayfanın çıkışı. Kanal listesi şu an boş (SWAP:CONTACT_*) ve hiç
              basılmıyor; geriye sitenin tek gerçek soru kanalı kalıyor. */}
          <FadeUp delay={0.24}>
            <div className="hbn-cikis">
              <div className="hbn-cikis-t">
                <h2>{CONTACT.heading}</h2>
                <p>{CONTACT.lead}</p>
              </div>
              <AskCta label={CONTACT.ctaLabel} />
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
