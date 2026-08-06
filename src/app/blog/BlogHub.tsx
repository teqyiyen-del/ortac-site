import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SmartLink from "@/components/shared/SmartLink";
import {
  demoHref,
  formatDate,
  GUIDES_HREF,
  KIND_LABEL,
  postsOfKind,
  readingMinutes,
  type BlogKind,
  type BlogPost,
} from "@/lib/blog";
import { photoThumb } from "@/lib/media";

/* ============================================================================
   BLOG BÖLÜMÜ — liste + tür anahtarı   ·   /blog ve /blog/rehberler
   ============================================================================

   NEDEN TEK BİLEŞEN
   İki sayfa da aynı şeyi listeliyor, yalnızca süzgeç farklı. İki ayrı liste
   yazmak, ikinci yazı geldiğinde birinde görünüp ötekinde görünmeyen bir
   kart demek olurdu. Sayfalara kalan iş kendi başlığı, kendi metadata'sı ve
   kendi JSON-LD'si — SEO tarafında ikisinin AYRI sayfa olmasının sebebi de o.

   TÜR ANAHTARI NEDEN İKİ BAĞLANTI
   Müşteri "üst filtre gibi switch" istedi. Anahtar bir açılır menü değil,
   görünen iki kontrol; ikisi de gerçek adres, yani:
     · klavyeyle çalışıyor (bağlantı, ek JS yok),
     · seçili durum `aria-current="page"` ile duyuruluyor,
     · paylaşılabiliyor ve arama motoru ikisini de ayrı sayfa olarak görüyor.
   İstemci tarafı bir filtre bunların üçünü de kaybettirirdi.

   NEDEN GİZLİ RADYO DEĞİL: sitedeki öteki anahtarlar (FitTest, hesaplayıcı,
   gelişmeler şeridi) görünen kutucuk + gizli <input type="radio"> kalıbıyla
   kurulu ve orada doğrusu o — hepsi TEK sayfa içinde durumu değiştiriyor.
   Buradaki anahtar sayfa değiştiriyor: iki ayrı rota, iki ayrı <h1>, iki ayrı
   kanonik. Bir radyo grubu bunu ancak JS'le gezinerek taklit edebilirdi ve
   adres paylaşılabilirliğini, tarama motorunun iki sayfayı ayrı görmesini ve
   geri tuşunu kaybettirirdi. Duyuru tarafı da kayba uğramıyor: sayfa
   değiştiği için ekran okuyucu yeni başlığı okuyor ve bulunulan sekme
   `aria-current="page"` taşıyor — bu yüzden ayrıca bir aria-live bölgesi YOK,
   olsaydı hiç değişmeyen bir metni boşuna duyururdu.

   ANAHTARIN İKİ DURAĞI: "Blog" ve "Ülke rehberi". "Tümü" KALDIRILDI, müşterinin
   kararı: "yukardaki swithc var ya onu tümü ve ülke rehberi şeklinde değilde
   blog ve ülke rehberi şeklinde ayır ya tümü gibi bir şey lazım değil."
   Davranış da değişti: /blog artık hepsini değil YALNIZCA blog türünü
   listeliyor. Karışık liste kalmadığı için tür rozeti (.bh-kind) tek başına
   ayrım taşımıyor; ayrımı hangi sayfada olduğunuz taşıyor.

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
 * Hangi liste görünüyor. Artık doğrudan yazının TÜRÜ: "hepsi" diye bir
 * görünüş yok, iki tür iki ayrı liste. Tip `BlogKind`in kendisi olduğu için
 * bir gün üçüncü bir tür eklenirse anahtar da liste de kendiliğinden bilir.
 */
export type HubView = BlogKind;

/* Anahtarın iki durağı. Etiketler elle yazılmıyor: KIND_LABEL sitedeki tür
   adlarının tek kaynağı ve satırdaki rozet de oradan besleniyor — sekmede
   "Ülke rehberi" yazarken rozette başka bir şey yazması ayrı bir şey
   sanılırdı. Sıra sabit ve iki sayfada aynı. */
const TABS: { view: HubView; label: string; href: string }[] = [
  { view: "blog", label: KIND_LABEL.blog, href: "/blog" },
  { view: "rehber", label: KIND_LABEL.rehber, href: GUIDES_HREF },
];

/** Görünüşün kayıtları — tek yerde süzülüyor, tek liste. */
function postsFor(view: HubView): BlogPost[] {
  return postsOfKind(view);
}

/* Sayım cümlesinin birimi. "yazı" iki türde de doğru ama artık iki AYRI liste
   var ve sayının hangi listeyi saydığı okunabilmeli: "9 yazı" iki sayfada da
   aynı cümle olurdu. Küçük harf, çünkü cümlenin içinde geçiyor (KIND_PLURAL
   büyük harfle başlıyor, o başlıklar için). */
const COUNT_UNIT: Record<HubView, string> = {
  blog: "blog yazısı",
  rehber: "ülke rehberi",
};

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
 * BİÇİM AYRIMI KALKTI — bu turun değişikliği. Bir tur önce blog satırı yatay
 * dikdörtgen, rehber satırı DAİRE madalyondu; ayrım iki listenin aynı sayfa
 * sanılmasını engellemek içindi. Müşteri reddetti: "blog ve ülke rehberinin
 * görsel mantığını ayırmana gerek yok hepsininki dikdörtgen olabilir".
 * Dolayısıyla `data-kind` gitti, tek bir satır biçimi kaldı.
 *
 * Ayrımın dayandığı OLGU duruyor (rehber kapağı ile blog kapağı aynı Unsplash
 * dosyası olabiliyor) ama artık biçimle değil, kaynağında çözülüyor: iki
 * listenin öne çıkan kaydına ayrı fotoğraf verildi (lib/media.ts ·
 * GUIDE_PHOTO). Ayrım ayrıca gerektiği kadar taşınıyor çünkü liste artık
 * karışık akmıyor: her sayfada tek tür var.
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
function Row({ post, delay }: { post: BlogPost; delay: number }) {
  return (
    <FadeUp delay={delay}>
      <article className="bh-row">
        <p className="bh-row-d">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        </p>

        <RowThumb post={post} />

        <div className="bh-row-b">
          <p className="bh-row-k">
            <span className="bh-kind" data-kind={post.kind}>
              {KIND_LABEL[post.kind]}
            </span>
            {post.placeholder && <SeedTag />}
            <span className="bh-cat">{post.category}</span>
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
  /* Sayı ARTIK TÜRÜN sayısı: "Tümü" kalktığı için her sekmenin altındaki rakam
     yalnızca o sekmenin listesini sayıyor ve birimi de onu söylüyor. */
  const counts = [
    posts.length > 0
      ? `${posts.length} ${COUNT_UNIT[view]}`
      : `Bu listede ${COUNT_UNIT[view]} yok`,
    seeds > 0 ? `${seeds} tanesi örnek kayıt` : "",
    posts.length > 0 ? "bağlantılar şimdilik demo sayfasına iniyor" : "",
  ].filter(Boolean);

  return (
    <section className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        {/* ---------- TÜR ANAHTARI ---------- */}
        <FadeUp>
          <nav className="bh-switch" aria-label="Yazı türü">
            <ul className="bh-tabs">
              {TABS.map((t) => (
                <li key={t.view}>
                  {t.view === view ? (
                    /* Bulunulan liste bağlantı değil: aynı sayfaya giden bir
                       bağlantı klavye kullanıcısına gerçek bir seçenek gibi
                       görünüyor. Sönük DE değil — sönüklük bu sitede "kapalı
                       adres" demek (bkz. [data-soon]); burası kapalı değil,
                       buradasınız.

                       GİZLİ METİN NEDEN VAR: `aria-current` tek başına yetmedi.
                       Erişilebilirlik ağacı okundu — rolü olmayan bir <span>
                       Chrome'da `generic` düğüme düşüyor, adsız kalıyor ve
                       `current` özelliği hiç yayınlanmıyor. Yani ekran okuyucu
                       "Blog" yazısını düz metin olarak okuyup geçiyordu:
                       anahtarın hangi durakta olduğu duyulmuyordu. Etiketin
                       yanına görünmeyen bir durum ibaresi kondu; sitenin kendi
                       sözü ("Bu sayfa", bkz. KynSwitch) küçük harfle
                       tekrarlanıyor. `aria-current` duruyor çünkü seçili
                       durumun işareti o ve CSS de ondan değil `data-here`den
                       besleniyor. */
                    <span className="bh-tab" data-here="true" aria-current="page">
                      {t.label}
                      <span className="sr-only">, bu sayfa</span>
                    </span>
                  ) : (
                    <SmartLink href={t.href} className="bh-tab">
                      {t.label}
                    </SmartLink>
                  )}
                </li>
              ))}
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
                  <span className="bh-kind" data-kind={lead.kind}>
                    {KIND_LABEL[lead.kind]}
                  </span>
                  {/* Öne çıkan kart yer tutucu olabiliyor (/blog/rehberler'de
                      bugün öyle) ve işaret orada da duruyor: sayfanın en
                      büyük kartında bunu söylememek, ayrımı taşıyan tek yeri
                      kaybetmek olurdu. */}
                  {lead.placeholder && <SeedTag />}
                  <span className="bh-cat">{lead.category}</span>
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
          /* BOŞ DURUM — bugün hiçbir görünüşte basılmıyor (iki listede de
             kayıt var). Duruyor çünkü tür süzgeci veriden geliyor: bir gün
             kayıtsız bir tür eklenirse sayfa sahte kart basmak yerine
             durumunu söylesin. */
          <FadeUp delay={0.06}>
            <div className="bh-empty">
              <h2 className="bh-empty-t">{`Bu listede henüz ${COUNT_UNIT[view]} yok.`}</h2>
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
                <Row post={p} delay={0.08 + i * 0.05} />
              </li>
            ))}
          </ol>
        )}

        {/* Tek yazı varken listenin bittiğini söylemek gerekiyor: boşluk kendi
            başına bir açıklama değil. Bugün basılmıyor. */}
        {posts.length === 1 && (
          <FadeUp delay={0.12}>
            <p className="bh-note">
              Arşivde şimdilik tek yazı var. Yenileri yayınlandıkça bu listede tarih
              sırasıyla birikecek.
            </p>
          </FadeUp>
        )}
      </div>
    </section>
  );
}
