import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SmartLink from "@/components/shared/SmartLink";
import {
  CATEGORY,
  CATEGORY_ORDER,
  categoryCount,
  categoryHref,
  demoHref,
  formatDate,
  postsOfCategory,
  readingMinutes,
  sortedPosts,
  type BlogCategory,
  type BlogPost,
} from "@/lib/blog";
import { photoThumb } from "@/lib/media";

/* ============================================================================
   BLOG BÖLÜMÜ — liste + kategori şeridi   ·   /blog ve /blog/kategori/<slug>
   ============================================================================

   NEDEN TEK BİLEŞEN
   Altı sayfa da aynı şeyi listeliyor, yalnızca süzgeç farklı. Ayrı listeler
   yazmak, yeni bir yazı geldiğinde birinde görünüp ötekinde görünmeyen bir
   kart demek olurdu. Sayfalara kalan iş kendi başlığı, kendi metadata'sı ve
   kendi JSON-LD'si — SEO tarafında hepsinin AYRI sayfa olmasının sebebi de o.

   KATEGORİ ŞERİDİ NEDEN BAĞLANTI
   Müşteri "üst filtre gibi switch" istedi. Şerit bir açılır menü değil (açık
   isteği), görünen kutucuklar; hepsi gerçek adres, yani:
     · klavyeyle çalışıyor (bağlantı, ek JS yok),
     · seçili durum `aria-current="page"` ile duyuruluyor,
     · paylaşılabiliyor ve arama motoru her birini ayrı sayfa olarak görüyor.
   İstemci tarafı bir filtre bunların üçünü de kaybettirirdi.

   NEDEN GİZLİ RADYO DEĞİL — bir önceki turun gerekçesi aynen geçerli:
   sitedeki öteki anahtarlar (FitTest, hesaplayıcı, gelişmeler şeridi) görünen
   kutucuk + gizli <input type="radio"> kalıbıyla kurulu ve orada doğrusu o,
   çünkü hepsi TEK sayfa içinde durumu değiştiriyor. Buradaki şerit SAYFA
   değiştiriyor: altı rota, altı <h1>, altı kanonik. Bir radyo grubu bunu
   ancak JS'le gezinerek taklit edebilirdi ve adres paylaşılabilirliğini,
   tarama motorunun sayfaları ayrı görmesini ve geri tuşunu kaybettirirdi.
   Kategori sayısı ikiden altıya çıkarken kalıbın değişmemesinin sebebi bu:
   değişen şey durak sayısı, kontrolün İŞİ değil. Duyuru tarafı da kayba
   uğramıyor — sayfa değiştiği için ekran okuyucu yeni başlığı okuyor; bu
   yüzden ayrıca bir aria-live bölgesi YOK, olsaydı hiç değişmeyen bir metni
   boşuna duyururdu.

   "TÜMÜ" DURAĞI GERİ GELDİ ve bu bilinçli bir geri dönüş. Bir tur önce
   kaldırılmıştı, müşterinin kararıyla: "onu tümü ve ülke rehberi şeklinde
   değilde blog ve ülke rehberi şeklinde ayır ya tümü gibi bir şey lazım
   değil." O cümlenin bağlamı İKİ DURAKLI bir anahtardı: "Tümü" ile "Ülke
   rehberi" eş düzey iki seçenek gibi duruyor ama biri ötekini kapsıyordu,
   yani gerçek bir seçim değildi. Şimdi duraklar birbirini kapsamayan beş
   kategori ve "Tümü" onlardan biri değil, hepsinin durduğu KÖK: kaldırılırsa
   bir kategoriye giren ziyaretçinin listenin tamamına dönecek yeri kalmıyor
   ve süzgeç tek yönlü bir kapıya dönüşüyor. Adresi de bölümün kökü: /blog.

   KATEGORİ ROZETİ YALNIZCA "TÜMÜ" LİSTESİNDE basılıyor. Süzülmüş bir sayfada
   her satırın aynı rozeti taşıması bilgi değil tekrar; kategoriyi zaten
   sayfanın h1'i söylüyor. Karışık listede ise rozet satırın tek ayrımı.

   YER TUTUCULAR AYRI BÖLÜMDE DEĞİL — bu turun değişikliği
   Önceki hâlde yer tutucular listenin altında "Hazırlananlar" başlığı altında,
   tarihsiz ve okuma süresiz duruyordu. Müşteri bunu reddetti: şu an tasarım
   yapılıyor ve o ayrım sayfanın dolu hâlini görünmez kılıyordu.

   Artık aynı listede, aynı satır biçiminde, tarihli ve okuma süreli
   duruyorlar. Ayrımı taşıyan tek şey satırın üst şeridindeki küçük "Örnek"
   işareti (.bh-seed) — sitedeki yerleşik yer tutucu diliyle aynı: amber, tek
   kelime, rozet boyunda (bkz. .kyn-seed-tag, ana sayfa dizini).

   İşaretin kesikli çerçeve, sönüklük ya da uyarı paneli OLMAMASI bilinçli:
   üçü de satırı "bozuk" gösteriyor ve tam olarak müşterinin görmek istediği
   şeyi — dolu bir liste — engelliyor.

   HAREKET
   Bu dosyada motion kodu yok: hareketin tamamı FadeUp üzerinden geliyor
   (Providers'taki MotionConfig reducedMotion="user"). Dolayısıyla hareket
   tercihi render edilen ağacı değiştirmiyor.
   ========================================================================= */

/**
 * Hangi liste görünüyor: kök ("tumu") ya da tek bir kategori. Kategori tarafı
 * `BlogCategory`nin kendisi olduğu için altıncı bir kategori eklendiğinde şerit
 * de liste de kendiliğinden bilir; elle güncellenen bir sekme listesi yok.
 *
 * "tumu" bir kategori slug'ı DEĞİL ve olmamalı: kategori adresleri
 * /blog/kategori/<slug> kalıbında, kök ise /blog. Aynı birleşimde durmalarının
 * sebebi ikisinin de bu bileşen için tek bir şey söylemesi — hangi kayıtlar
 * basılacak.
 */
export type HubView = "tumu" | BlogCategory;

/** Kökün ekrandaki adı ve sayım birimi; kategorilerinki CATEGORY'den geliyor. */
const ALL_LABEL = "Tümü";
const ALL_UNIT = "yazı";

const labelOf = (view: HubView) => (view === "tumu" ? ALL_LABEL : CATEGORY[view].label);
const unitOf = (view: HubView) => (view === "tumu" ? ALL_UNIT : CATEGORY[view].unit);
const hrefOf = (view: HubView) => (view === "tumu" ? "/blog" : categoryHref(view));

/**
 * Görünüşün kayıtları — tek yerde süzülüyor, tek liste.
 *
 * ŞERİTTEKİ SAYI DA BURADAN: aşağıdaki sekme döngüsü `categoryCount`u, o da
 * `postsOfCategory`yi çağırıyor, yani sekmenin yanındaki rakam ile tıklayınca
 * çıkan listenin uzunluğu AYNI süzgeçten geliyor. İki ayrı kaynak olsaydı
 * biri güncellenip öteki unutulurdu; bu depoda bir tur önce /kaynaklar
 * şeridinde tam olarak bu yaşandı.
 */
function postsFor(view: HubView): BlogPost[] {
  return view === "tumu" ? sortedPosts() : postsOfCategory(view);
}

/** Sekmenin yanındaki sayı — kökte bütün kayıtlar, kategoride o kategori. */
function countFor(view: HubView): number {
  return view === "tumu" ? sortedPosts().length : categoryCount(view);
}

/* Şeridin durakları: kök + beş kategori, sıra CATEGORY_ORDER'dan. Etiketler
   elle yazılmıyor — CATEGORY sitedeki kategori adlarının tek kaynağı ve
   satırdaki rozet de oradan besleniyor; sekmede "Ülke rehberi" yazarken
   rozette başka bir şey yazması ayrı bir şey sanılırdı. */
const TABS: HubView[] = ["tumu", ...CATEGORY_ORDER];

/**
 * Yer tutucu işareti. Tek yerde duruyor çünkü iki yüzeyde birden basılıyor
 * (öne çıkan kart ve arşiv satırı) ve ikisinin aynı şeyi söylemesi gerekiyor.
 */
function SeedTag() {
  return <span className="bh-seed">Örnek</span>;
}

/**
 * SATIRIN MİNİK GÖRSELİ.
 *
 * Müşterinin cümlesi: "hepsinde bide minik şekilde görseli gözükse daha iyi
 * olmaz mı? sonuçta dikkat çekiciliği o da sağlıyor". Alt alta sıralama
 * düzenine dokunulmadı, çünkü onu beğeniyor: görsel satırın soluna, tarih ile
 * başlık arasına giren SABİT GENİŞLİKTE bir sütun. Başlıklar hâlâ aynı
 * dikeyden başlıyor.
 *
 * BİÇİM AYRIMI YOK ve geri getirilmiyor. Bir tur önce blog satırı yatay
 * dikdörtgen, rehber satırı DAİRE madalyondu; ayrım iki listenin aynı sayfa
 * sanılmasını engellemek içindi. Müşteri reddetti: "blog ve ülke rehberinin
 * görsel mantığını ayırmana gerek yok hepsininki dikdörtgen olabilir".
 * Kategori eklenmesi bu kararı değiştirmiyor: beş kategori beş ayrı satır
 * biçimi demek olsaydı liste bir arşiv değil bir katalog gibi görünürdü.
 *
 * Ayrımın dayandığı OLGU duruyor (rehber kapağı ile blog kapağı aynı Unsplash
 * dosyası olabiliyor) ama biçimle değil, kaynağında çözülüyor: rehber
 * listesinin öne çıkan kaydına ayrı fotoğraf verildi (lib/media.ts ·
 * GUIDE_PHOTO).
 *
 * alt="" — kare temsilî bir stok fotoğraf (SWAP:STOCK_PHOTOS), yazının
 * bilgisini taşımıyor; adı zaten hemen yanındaki başlıkta yazıyor. Ekran
 * okuyucuya ikinci kez okutmanın karşılığı yok.
 *
 * `photoThumb` — kapak adresi 900–1400 piksel genişlikte üretiliyor ve
 * `unoptimized` olduğu için tarayıcı onu olduğu gibi indirirdi. Sekiz satır
 * çarpı 900 piksel, yalnızca minik görseller yüzünden megabaytlarca yük
 * demekti (bkz. lib/media.ts).
 */
function RowThumb({ post }: { post: BlogPost }) {
  return (
    <span className="bh-thumb">
      <Image
        src={photoThumb(post.cover)}
        alt=""
        fill
        sizes="(min-width: 720px) 96px, 68px"
        className="bh-thumb-img"
        unoptimized
      />
    </span>
  );
}

/* ---------------------------------------------------------------- parçalar */

/**
 * Arşiv satırı. Kart değil satır: tarih sabit sütunda, başlıklar aynı
 * dikeyden başlıyor.
 *
 * Bağlantı BAŞLIĞIN İÇİNDE, satırın tamamı değil. Sebebi işaretleme: SmartLink
 * kapalı adreste <span> basıyor ve <span> içine başlık koymak geçersiz iç
 * içelik olurdu; ayrıca ekran okuyucunun bağlantı listesinde yazının adı
 * görünüyor, adsız bir "satır" değil. Satırın kalanını görünmez örtü
 * tıklanabilir yapıyor (.bh-row-a::after).
 *
 * YER TUTUCU SATIRI GERÇEK SATIRDAN FARKSIZ: tarihi de okuma süresi de
 * basılıyor. Tarih kaydın kendi alanından ve geçmiş bir tarih; okuma süresi
 * gövdeden hesaplanıyor, yani sayfada gerçekten okunacak metnin süresi.
 * Değişen tek şey üst şeritteki "Örnek" işareti.
 */
function Row({ post, delay, showCat }: { post: BlogPost; delay: number; showCat: boolean }) {
  return (
    <FadeUp delay={delay}>
      <article className="bh-row">
        <p className="bh-row-d">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        </p>

        <RowThumb post={post} />

        <div className="bh-row-b">
          <p className="bh-row-k">
            {showCat && (
              <span className="bh-kind" data-cat={post.category}>
                {CATEGORY[post.category].label}
              </span>
            )}
            {post.placeholder && <SeedTag />}
            {/* Konu ibaresi kategorinin altındaki ayrıntı: "Kuruluş sonrası ·
                Muhasebe". Kategori rozeti düşünce tek başına kalıyor ve
                satırın hâlâ bir üst şeridi oluyor. */}
            <span className="bh-cat">{post.topic}</span>
          </p>

          <h2 className="bh-row-t">
            {/* Adres yazının kendi adresi DEĞİL, türünün demo sayfası: bu
                turda yalnızca iki iç sayfa yayına girdi (bkz. lib/blog.ts ·
                demoHref). Vardığı sayfa en üstte bunu söylüyor. */}
            <SmartLink href={demoHref(post)} className="bh-row-a">
              {post.title}
            </SmartLink>
          </h2>

          <p className="bh-row-s">{post.summary}</p>
        </div>

        <span className="bh-row-m">{readingMinutes(post)} dk</span>
      </article>
    </FadeUp>
  );
}

/* -------------------------------------------------------------------- bölüm */

export default function BlogHub({ view }: { view: HubView }) {
  const posts = postsFor(view);
  const [lead, ...rest] = posts;
  const seeds = posts.filter((p) => p.placeholder).length;
  /* Rozet yalnızca karışık listede: süzülmüş sayfada her satır aynı kategoriyi
     taşıyor ve kategoriyi zaten h1 söylüyor (gerekçe: dosya başı). */
  const showCat = view === "tumu";

  /* Sayım cümlesi veriden: anahtarın altında "kaç şey var" yazması gerekiyor
     ama sekmelerin üstüne "0" basmak ilk bakışta hata gibi okunuyor (aynı
     karar kaynaklar şeridinde de verilmişti).

     İkinci parça sayfanın en üstünde, tek cümlede, kaç kaydın örnek olduğunu
     söylüyor. Satır satır uyarı basmanın yerini bu tutuyor: bilgi bir kez
     veriliyor ve liste tasarımı bozulmuyor. */
  /* Üçüncü parça bu turun eklentisi: bağlantıların nereye indiğini TIKLAMADAN
     ÖNCE söylüyor. Söylenmese, "Banka hesabı açarken neler soruluyor?"
     satırına tıklayıp Dubai maliyet yazısına düşen ziyaretçi bunu arıza
     sanardı. Cümle listenin biçimini bozmuyor: zaten var olan sayım satırına
     eklenen bir öbek. Vardığı sayfa aynı şeyi bir kez daha söylüyor. */
  /* Sayı bulunulan listenin sayısı ve birimi de onu söylüyor: "6 ülke rehberi"
     ile "3 yazı" iki farklı sayfada iki farklı cümle olmalı. */
  const counts = [
    posts.length > 0 ? `${posts.length} ${unitOf(view)}` : `Bu listede ${unitOf(view)} yok`,
    seeds > 0 ? `${seeds} tanesi örnek kayıt` : "",
    posts.length > 0 ? "bağlantılar şimdilik demo sayfasına iniyor" : "",
  ].filter(Boolean);

  return (
    <section className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        {/* ---------- KATEGORİ ŞERİDİ ---------- */}
        <FadeUp>
          <nav className="bh-switch" aria-label="Kategoriler">
            <ul className="bh-tabs">
              {TABS.map((t) => {
                const label = labelOf(t);
                const n = countFor(t);

                /* Sayı ekranda çıplak bir rakam ("Ülke rehberi 6") ama ekran
                   okuyucuya birimiyle gidiyor: görünen metne "kayıt" yazmak
                   şeridi altı kez uzatırdı, okunmadan geçmesi ise sayının ne
                   saydığını duyulmaz yapardı.

                   RAKAM AĞAÇTAN GİZLENİYOR (aria-hidden) ve birimli hâli iki
                   ayrı yoldan veriliyor — sebebi ölçüldü, tahmin değil.
                   Erişilebilirlik ağacı okundu: `<a>Tümü<span>15<span
                   class="sr-only"> kayıt</span></span></a>` kalıbında bağlantı
                   adı "Tümü" çıkıyordu ve "15" ağaçta hiç görünmüyordu, yani
                   sayı okunmuyordu. Bu depoda aynı arıza iki bileşende daha
                   yaşandı ve çözümü aynı: adı açıkça yazmak. */
                const count = (
                  <span className="bh-tab-n" aria-hidden="true">
                    {n}
                  </span>
                );

                return (
                  <li key={t}>
                    {t === view ? (
                      /* Bulunulan liste bağlantı değil: aynı sayfaya giden bir
                         bağlantı klavye kullanıcısına gerçek bir seçenek gibi
                         görünüyor. Sönük DE değil — sönüklük bu sitede "kapalı
                         adres" demek (bkz. [data-soon]); burası kapalı değil,
                         buradasınız.

                         GİZLİ METİN NEDEN VAR: `aria-current` tek başına
                         yetmiyor. Erişilebilirlik ağacı okundu — rolü olmayan
                         bir <span> Chrome'da `generic` düğüme düşüyor, adsız
                         kalıyor ve `current` özelliği hiç yayınlanmıyor. Yani
                         ekran okuyucu "Ülke rehberi" yazısını düz metin olarak
                         okuyup geçiyordu: şeridin hangi durakta olduğu
                         duyulmuyordu. Etiketin yanına görünmeyen bir durum
                         ibaresi kondu; sitenin kendi sözü ("Bu sayfa", bkz.
                         KynSwitch) küçük harfle tekrarlanıyor. `aria-current`
                         duruyor çünkü seçili durumun işareti o ve CSS de ondan
                         değil `data-here`den besleniyor. */
                      <span className="bh-tab" data-here="true" aria-current="page">
                        {label}
                        {count}
                        {/* Burada `aria-label` İŞE YARAMAZ: rolü olmayan bir
                            <span> generic düğüme düşüyor ve generic'in adı
                            yayınlanmıyor. Ölçülen çözüm görünmez METİN — o
                            ağaçta gerçekten duruyor. Sayı da burada, çünkü
                            görünen rakam aria-hidden. */}
                        <span className="sr-only">, {n} kayıt, bu sayfa</span>
                      </span>
                    ) : (
                      /* Bağlantıda tersi doğru: <a> adını içeriğinden ya da
                         `aria-label`den alıyor ve açık ad tek bir düğümde,
                         parçalanmadan duruyor. SmartLink kapalı adreste <span>
                         basıyor ve o hâlde ad düşerdi — ama etiket metni
                         aria-hidden DEĞİL, yani en kötü durumda sayı okunmuyor,
                         kategori adı okunuyor. Altı kategori adresinin altısı
                         da zaten açık (lib/routes.ts). */
                      <SmartLink
                        href={hrefOf(t)}
                        className="bh-tab"
                        aria-label={`${label}, ${n} kayıt`}
                      >
                        {label}
                        {count}
                      </SmartLink>
                    )}
                  </li>
                );
              })}
            </ul>
            <p className="bh-switch-l">{counts.join(" · ")}</p>
          </nav>
        </FadeUp>

        {/* ---------- ÖNE ÇIKAN ---------- */}
        {lead ? (
          /* Listenin en yenisi. Yatay blok: görsel solda, metin sağda —
             altındaki satırlarla aynı ızgarayı kullanmıyor, çünkü "en yeni"
             olduğunu boyutuyla söylemesi gerekiyor. */
          <FadeUp delay={0.06}>
            <article className="bh-lead">
              {/* TEK KART BİÇİMİ — bu turun değişikliği. Bir tur önce rehber
                  kartı daire madalyonla basılıyordu; ayrım iki listenin aynı
                  fotoğrafla açılmasını gizlemek içindi. Müşteri biçim ayrımını
                  reddetti ("hepsininki dikdörtgen olabilir"), dolayısıyla tek
                  düzen kaldı: fotoğraf kartın solunu baştan başa dolduruyor.

                  Aynı fotoğraf sorunu ORTADAN KALKTI, gizlenmedi: rehber
                  listesinin en yeni kaydına ayrı bir kare verildi (lib/media.ts
                  · GUIDE_PHOTO). Yani iki sayfa artık gerçekten farklı bir
                  fotoğrafla açılıyor, aynı fotoğrafın iki farklı kesimiyle
                  değil. */}
              <div className="bh-lead-media">
                {/* alt boş: SWAP:STOCK_PHOTOS ile gelen temsilî stok fotoğraf,
                    yazının bilgisini taşımıyor. `unoptimized` — URL zaten
                    Unsplash CDN'inde boyutlanmış ve next.config'te
                    remotePatterns tanımlı değil. */}
                <Image
                  src={lead.cover}
                  alt=""
                  fill
                  sizes="(min-width: 880px) 46vw, 100vw"
                  className="bh-lead-img"
                  unoptimized
                />
              </div>

              <div className="bh-lead-body">
                <p className="bh-lead-top">
                  <span className="bh-flag">En yeni</span>
                  {showCat && (
                    <span className="bh-kind" data-cat={lead.category}>
                      {CATEGORY[lead.category].label}
                    </span>
                  )}
                  {/* Öne çıkan kart yer tutucu olabiliyor (rehber listesinde
                      bugün öyle) ve işaret orada da duruyor: sayfanın en
                      büyük kartında bunu söylememek, ayrımı taşıyan tek yeri
                      kaybetmek olurdu. */}
                  {lead.placeholder && <SeedTag />}
                  <span className="bh-cat">{lead.topic}</span>
                </p>

                <h2 className="bh-lead-t">
                  <SmartLink href={demoHref(lead)} className="bh-lead-a">
                    {lead.title}
                  </SmartLink>
                </h2>
                <p className="bh-lead-s">{lead.summary}</p>

                <p className="bh-lead-foot">
                  <time dateTime={lead.publishedAt}>{formatDate(lead.publishedAt)}</time>
                  <span className="bh-dot" aria-hidden="true" />
                  <span>{readingMinutes(lead)} dk okuma</span>
                  <span className="bh-go" aria-hidden="true">
                    Yazıyı okuyun
                    <ArrowUpRight size={15} strokeWidth={2.1} />
                  </span>
                </p>
              </div>
            </article>
          </FadeUp>
        ) : (
          /* BOŞ DURUM — bugün hiçbir görünüşte basılmıyor (altı listenin
             hepsinde kayıt var). Duruyor çünkü kategori süzgeci veriden
             geliyor: kayıtsız bir kategori eklendiği gün sayfa sahte kart
             basmak yerine durumunu söylesin. */
          <FadeUp delay={0.06}>
            <div className="bh-empty">
              <h2 className="bh-empty-t">{`Bu listede henüz ${unitOf(view)} yok.`}</h2>
              <p className="bh-empty-l">
                Bir yazı ancak içindeki her satırın kaynağı gösterilebildiğinde yayına
                giriyor. Doldurulmuş bir liste koymuyoruz.
              </p>
            </div>
          </FadeUp>
        )}

        {/* ---------- ARŞİV ----------
            Tek liste, tarih sırası. Yer tutucu satırlar buraya karışıyor ve
            karışması isteniyor: ayrı bölüm listeyi ikiye bölüyordu. */}
        {rest.length > 0 && (
          <ol className="bh-list">
            {rest.map((p, i) => (
              <li key={p.slug}>
                <Row post={p} delay={0.08 + i * 0.05} showCat={showCat} />
              </li>
            ))}
          </ol>
        )}

        {/* Tek kayıt varken listenin bittiğini söylemek gerekiyor: boşluk kendi
            başına bir açıklama değil. Bugün yalnızca "Sektör notları"
            sayfasında basılıyor — cümle bu yüzden "arşiv" değil "bu liste"
            diyor; kökte on beş kayıt varken bir kategoride bir tane olabilir
            ve "arşivde tek yazı var" o sayfada yanlış olurdu. */}
        {posts.length === 1 && (
          <FadeUp delay={0.12}>
            <p className="bh-note">
              Bu listede şimdilik tek kayıt var. Yenileri yayınlandıkça burada tarih
              sırasıyla birikecek.
            </p>
          </FadeUp>
        )}
      </div>
    </section>
  );
}
