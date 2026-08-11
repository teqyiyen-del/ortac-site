import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SmartLink from "@/components/shared/SmartLink";
import BlogFilter, { type FilterTab } from "@/app/blog/BlogFilter";
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

   ---------------------------------------------------------------------------
   BU TURUN DEĞİŞİKLİĞİ · /blog'da ÇİP SAYFA YENİLEMİYOR
   ---------------------------------------------------------------------------
   Müşteri: "blogda katagori seçtiğimizde link değişip yeniden yüklenmesin
   sayfa ya. sadece dinamik bir katagorize olsun sayfaya f5 atmışız gibi
   olmasın." Kurgunun tamamı ve gerekçeleri BlogFilter.tsx dosya başında;
   burada yalnızca bu dosyayı ilgilendiren kısım:

   İKİ KİP, TEK BİLEŞEN
     · interactive=true  (/blog) → bileşen ALTI GÖRÜNÜŞÜN tamamını tek DOM'a
       basıyor, görünmeyenler `hidden`. Çip tıklanınca istemci yalnızca
       `hidden` niteliklerini çeviriyor: istek yok, gezinme yok.
     · interactive=false (/blog/kategori/<slug>) → yalnızca o kategorinin
       kayıtları basılıyor, tıpkı eskisi gibi. Sunucu çıktısı değişmedi, yani
       beş kategori adresi arama motoru için hâlâ beş AYRI sayfa. Karışık
       listeyi oraya da basmak altı adresi altı kopyaya çevirirdi.

   ŞERİDİN İŞARETLEMESİ İKİ KİPTE DE AYNI: aynı <a>, aynı adres, aynı ad, aynı
   sayı. Değişen tek şey /blog'da tıklamanın yakalanması.

   NEDEN GİZLİ RADYO DEĞİL — sitedeki öteki anahtarlar (FitTest, hesaplayıcı,
   gelişmeler şeridi) görünen kutucuk + gizli <input type="radio"> kalıbıyla
   kurulu. Buradaki şerit tek sayfada durum değiştirdiği için artık o kalıba
   YAKLAŞTI, ama radyoya çevrilmedi: radyonun adresi olmaz. Bu şeridin her
   durağının GERÇEK bir adresi var (/blog/kategori/<slug>), JS kapalıyken
   çalışması ve arama motorunun beş sayfayı bulması buna bağlı. Radyo grubu
   üçünü de kaybettirirdi.

   "TÜMÜ" DURAĞI listenin kökü, kategorilerden biri değil: kaldırılırsa bir
   kategoriye giren ziyaretçinin listenin tamamına dönecek yeri kalmıyor.
   Süzgeci geri almanın tek yolu da o — geçmiş adımı biriktirilmediği için
   (replaceState) geri tuşu bu işi yapmıyor.

   KATEGORİ ROZETİ YALNIZCA KARIŞIK LİSTEDE basılıyor. Kayıt tek DOM'da
   durduğu için bu artık bir React koşulu değil bir CSS kuralı:
   .bh-scope:not([data-mixed]) .bh-kind { display: none }.

   ---------------------------------------------------------------------------
   TEK DOM'UN BEDELİ — ölçüldü, gizlenmedi
   ---------------------------------------------------------------------------
   /blog'un HTML'inde DÖRT kayıt iki kez basılıyor. Sebebi yapısal: bir
   kategorinin en yeni kaydı o görünüşte ÖNE ÇIKAN KART, karışık listede ise
   normal bir SATIR — iki farklı yerleşim, iki ayrı işaretleme. Karışık
   listenin öne çıkanı beşincisiyle aynı kayıt olduğu için beş öne çıkan
   karttan dördü tekrar. Ölçüldü: 5.978 bayt, belgenin %2,9'u (208.569 bayt).
     · Görsel yükü yok: dördü de `hidden` (yani display:none) bir atanın
       içinde ve next/image `loading="lazy"` basıyor — tarayıcı görünmeyen bir
       kutudaki tembel görseli indirmiyor. İşaretleme tarafı doğrulandı (beş
       .bh-lead-img'in dördü hidden ata + loading="lazy"); ağ tarafı bu
       oturumda ölçülemedi, tarayıcı paneli 0x0 görünümde çalışıyor ve hiçbir
       tembel görsel tetiklenmiyor. `priority` verilmemesi bu yüzden önemli:
       verilseydi beşi de eager olurdu.
     · Arama motoru tarafında sorun değil: içerik gerçek, ziyaretçinin
       ulaşabildiği bir kontrolün arkasında ve ayrı bir adres üretmiyor.
     · Alternatifi — altı görünüşü ayrı ayrı basmak — on beş kaydı otuza
       çıkarırdı; bu dördü orada da olurdu, üstüne on beş tane daha.

   ---------------------------------------------------------------------------
   YER TUTUCULAR AYRI BÖLÜMDE DEĞİL
   Aynı listede, aynı satır biçiminde, tarihli ve okuma süreli duruyorlar.
   Ayrımı taşıyan tek şey satırın üst şeridindeki küçük "Örnek" işareti
   (.bh-seed) — sitedeki yerleşik yer tutucu diliyle aynı: amber, tek kelime,
   rozet boyunda (bkz. .kyn-seed-tag, ana sayfa dizini). Kesikli çerçeve,
   sönüklük ya da uyarı paneli OLMAMASI bilinçli: üçü de satırı "bozuk"
   gösteriyor ve tam olarak müşterinin görmek istediği şeyi — dolu bir liste —
   engelliyor.

   HAREKET
   Bu dosyada motion kodu yok: hareketin tamamı FadeUp üzerinden geliyor
   (Providers'taki MotionConfig reducedMotion="user"). Dolayısıyla hareket
   tercihi render edilen ağacı değiştirmiyor. Süzgeç bunu bedavaya bir geçişe
   çeviriyor: gizliyken hiç görünmemiş bir satır ortaya çıkınca FadeUp'ın
   whileInView'i ilk kez tetikleniyor.
   ========================================================================= */

/**
 * Hangi liste görünüyor: kök ("tumu") ya da tek bir kategori. Kategori tarafı
 * `BlogCategory`nin kendisi olduğu için altıncı bir kategori eklendiğinde şerit
 * de liste de kendiliğinden bilir; elle güncellenen bir sekme listesi yok.
 *
 * "tumu" bir kategori slug'ı DEĞİL ve olmamalı: kategori adresleri
 * /blog/kategori/<slug> kalıbında, kök ise /blog. Aynı birleşimde durmalarının
 * sebebi ikisinin de bu bileşen için tek bir şey söylemesi — hangi kayıtlar
 * basılacak. Değer aynı zamanda /blog'daki hash: /blog#ulke-rehberi.
 */
export type HubView = "tumu" | BlogCategory;

/** Kökün ekrandaki adı ve sayım birimi; kategorilerinki CATEGORY'den geliyor. */
const ROOT = "tumu" as const satisfies HubView;
const ALL_LABEL = "Tümü";
const ALL_UNIT = "yazı";

const labelOf = (view: HubView) => (view === ROOT ? ALL_LABEL : CATEGORY[view].label);
const unitOf = (view: HubView) => (view === ROOT ? ALL_UNIT : CATEGORY[view].unit);
const hrefOf = (view: HubView) => (view === ROOT ? "/blog" : categoryHref(view));

/**
 * Görünüşün kayıtları — tek yerde süzülüyor, tek liste.
 *
 * ŞERİTTEKİ SAYI DA BURADAN: sekme döngüsü `categoryCount`u, o da
 * `postsOfCategory`yi çağırıyor, yani sekmenin yanındaki rakam ile tıklayınca
 * çıkan listenin uzunluğu AYNI süzgeçten geliyor. İki ayrı kaynak olsaydı
 * biri güncellenip öteki unutulurdu; bu depoda bir tur önce /kaynaklar
 * şeridinde tam olarak bu yaşandı.
 */
function postsFor(view: HubView): BlogPost[] {
  return view === ROOT ? sortedPosts() : postsOfCategory(view);
}

/** Sekmenin yanındaki sayı — kökte bütün kayıtlar, kategoride o kategori. */
function countFor(view: HubView): number {
  return view === ROOT ? sortedPosts().length : categoryCount(view);
}

/* Şeridin durakları: kök + beş kategori, sıra CATEGORY_ORDER'dan. Etiketler
   elle yazılmıyor — CATEGORY sitedeki kategori adlarının tek kaynağı ve
   satırdaki rozet de oradan besleniyor. */
const TABS: HubView[] = [ROOT, ...CATEGORY_ORDER];

/**
 * Şeridin altındaki sayım cümlesi. Görünüş başına hesaplanıyor çünkü süzgeç
 * değiştiğinde canlı bölge bunu duyuruyor — yani bu metin "kaç yazı
 * görüntüleniyor" sorusunun erişilebilirlik ağacındaki tek cevabı.
 *
 * KATEGORİ ADI CÜMLENİN BAŞINDA — bu turun eklentisi. /blog#maliyet-ve-vergi
 * adresinde sayfanın h1'i hâlâ bölümün başlığı ("Yazılar ve ülke rehberleri"),
 * çünkü sayfa değişmedi. Hangi kategorinin süzüldüğünü koyu çip söylüyor ama
 * o yalnızca göze; cümlenin başındaki ad hem gözle hem ekran okuyucuyla
 * çalışıyor. BİRİM ZATEN KATEGORİNİN ADIYSA tekrarlanmıyor: "Ülke rehberi ·
 * 6 ülke rehberi" gülünçtü, "6 ülke rehberi" zaten adı söylüyor.
 *
 * İkinci parça kaç kaydın örnek olduğunu, üçüncüsü bağlantıların nereye
 * indiğini söylüyor: söylenmese, "Banka hesabı açarken neler soruluyor?"
 * satırına tıklayıp Dubai maliyet yazısına düşen ziyaretçi bunu arıza
 * sanardı. Sayfanın en üstünde, tek satırda; satır satır uyarı basmanın
 * yerini bu tutuyor.
 */
function noteFor(view: HubView): string {
  const list = postsFor(view);
  const seeds = list.filter((p) => p.placeholder).length;
  const unit = unitOf(view);
  const label = labelOf(view);
  const named =
    view !== ROOT && !unit.toLocaleLowerCase("tr").includes(label.toLocaleLowerCase("tr"));

  return [
    named ? label : "",
    list.length > 0 ? `${list.length} ${unit}` : `Bu listede ${unit} yok`,
    seeds > 0 ? `${seeds} tanesi örnek kayıt` : "",
    list.length > 0 ? "bağlantılar şimdilik demo sayfasına iniyor" : "",
  ]
    .filter(Boolean)
    .join(" · ");
}

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
 * düzenine dokunulmadı: görsel satırın soluna, tarih ile başlık arasına giren
 * SABİT GENİŞLİKTE bir sütun. Başlıklar hâlâ aynı dikeyden başlıyor.
 *
 * BİÇİM AYRIMI YOK ve geri getirilmiyor. Müşteri reddetti: "blog ve ülke
 * rehberinin görsel mantığını ayırmana gerek yok hepsininki dikdörtgen
 * olabilir". Ayrımın dayandığı OLGU (rehber kapağı ile blog kapağı aynı
 * Unsplash dosyası olabiliyor) biçimle değil kaynağında çözülüyor: rehber
 * listesinin öne çıkan kaydına ayrı fotoğraf verildi (lib/media.ts ·
 * GUIDE_PHOTO).
 *
 * alt="" — kare temsilî bir stok fotoğraf (SWAP:STOCK_PHOTOS), yazının
 * bilgisini taşımıyor; adı zaten hemen yanındaki başlıkta yazıyor.
 *
 * `photoThumb` — kapak adresi 900–1400 piksel genişlikte üretiliyor ve
 * `unoptimized` olduğu için tarayıcı onu olduğu gibi indirirdi (bkz.
 * lib/media.ts).
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
 * KATEGORİ ROZETİ İKİ AŞAMALI. /blog'da satır altı görünüşün ortak DOM'unda
 * duruyor, yani rozet basılıyor ama süzülmüş görünüşlerde CSS gizliyor
 * (.bh-scope:not([data-mixed]) .bh-kind) — "hangi görünüşteyiz" bilgisi artık
 * React'e değil kapsayıcıya ait. Kategori sayfasında paylaşım yok, dolayısıyla
 * rozet HİÇ basılmıyor (`showCat` false): gizli metin bırakmanın karşılığı yok
 * ve o sayfaların sunucu çıktısı bu turdan önceki hâliyle aynı kalıyor.
 *
 * GECİKME ÜST SINIRLI. Kademeli açılış listenin GLOBAL sırasından besleniyor
 * (tek DOM, tek sıra); süzülmüş bir görünüşte on ikinci satır görünen ilk
 * satır olabiliyor ve 0,68 sn beklemesi gerekirdi. 0,3 sn'de kesiliyor.
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
                Muhasebe". Kategori rozeti gizlenince tek başına kalıyor ve
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

/**
 * Öne çıkan kart — görünüşün en yenisi. Yatay blok: görsel solda, metin sağda;
 * altındaki satırlarla aynı ızgarayı kullanmıyor, çünkü "en yeni" olduğunu
 * boyutuyla söylemesi gerekiyor.
 *
 * TEK KART BİÇİMİ: fotoğraf kartın solunu baştan başa dolduruyor. Bir tur önce
 * rehber kartı daire madalyonla basılıyordu; müşteri biçim ayrımını reddetti.
 */
function Lead({ post, showCat }: { post: BlogPost; showCat: boolean }) {
  return (
    <article className="bh-lead">
      {/* alt boş: SWAP:STOCK_PHOTOS ile gelen temsilî stok fotoğraf, yazının
          bilgisini taşımıyor. `unoptimized` — URL zaten Unsplash CDN'inde
          boyutlanmış ve next.config'te remotePatterns tanımlı değil.
          `priority` YOK ve olmamalı: beş kartın dördü gizli başlıyor, tembel
          yükleme sayesinde dosyaları hiç indirilmiyor. */}
      <div className="bh-lead-media">
        <Image
          src={post.cover}
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
            <span className="bh-kind" data-cat={post.category}>
              {CATEGORY[post.category].label}
            </span>
          )}
          {/* Öne çıkan kart yer tutucu olabiliyor (rehber listesinde bugün
              öyle) ve işaret orada da duruyor: sayfanın en büyük kartında
              bunu söylememek, ayrımı taşıyan tek yeri kaybetmek olurdu. */}
          {post.placeholder && <SeedTag />}
          <span className="bh-cat">{post.topic}</span>
        </p>

        <h2 className="bh-lead-t">
          <SmartLink href={demoHref(post)} className="bh-lead-a">
            {post.title}
          </SmartLink>
        </h2>
        <p className="bh-lead-s">{post.summary}</p>

        <p className="bh-lead-foot">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span className="bh-dot" aria-hidden="true" />
          <span>{readingMinutes(post)} dk okuma</span>
          <span className="bh-go" aria-hidden="true">
            Yazıyı okuyun
            <ArrowUpRight size={15} strokeWidth={2.1} />
          </span>
        </p>
      </div>
    </article>
  );
}

/* -------------------------------------------------------------------- bölüm */

export default function BlogHub({
  view,
  interactive = false,
}: {
  view: HubView;
  /** /blog: altı görünüş tek DOM'da, çip süzüyor. Kategori sayfası: kapalı. */
  interactive?: boolean;
}) {
  /* Basılacak görünüşler. Kategori sayfasında TEK: o sayfanın HTML'i yalnızca
     kendi kategorisini içeriyor ve beş adres arama motoru için beş ayrı sayfa
     olarak kalıyor. */
  const views: HubView[] = interactive ? TABS : [view];
  const listOf = new Map<HubView, BlogPost[]>(views.map((v) => [v, postsFor(v)]));

  /* ÖNE ÇIKAN SLOTLARI. Bir kaydın iki görünüşte birden en yeni olması olağan
     (karışık listenin en yenisi, kendi kategorisinin de en yenisi) — o yüzden
     slotlar KAYDA göre birleştiriliyor, görünüşe göre değil. Yoksa aynı kart
     iki kez basılırdı. Kaydı olmayan bir görünüş kendi boş durumunu alıyor. */
  const slots: { key: string; views: HubView[]; post?: BlogPost }[] = [];
  const slotAt = new Map<string, number>();
  for (const v of views) {
    const first = listOf.get(v)?.[0];
    const key = first ? `lead-${first.slug}` : `empty-${v}`;
    const at = slotAt.get(key);
    if (at === undefined) {
      slotAt.set(key, slots.length);
      slots.push({ key, views: [v], post: first });
    } else {
      slots[at].views.push(v);
    }
  }

  /* ARŞİV SATIRLARI. Bir kayıt, en yeni OLMADIĞI görünüşlerde satır oluyor.
     Sıra global tarih sırası: her görünüşün görünen alt kümesi de o sırayı
     koruyor, yani ayrıca sıralamak gerekmiyor. */
  const rowViews = new Map<string, HubView[]>();
  for (const v of views) {
    for (const post of (listOf.get(v) ?? []).slice(1)) {
      const at = rowViews.get(post.slug);
      if (at) at.push(v);
      else rowViews.set(post.slug, [v]);
    }
  }
  const rows = (interactive ? sortedPosts() : (listOf.get(view) ?? [])).filter((p) =>
    rowViews.has(p.slug),
  );

  /* Listenin kabı ve "tek kayıt" notu da görünüşe bağlı: birinde satır varken
     ötekinde olmayabiliyor (bugün "Sektör notları" tek kayıt). Kap gizlenmezse
     boş bir <ol>'un üst çizgisi ve 28px boşluğu ortada kalırdı. */
  const listViews = views.filter((v) => (listOf.get(v)?.length ?? 0) > 1);
  const soloViews = views.filter((v) => (listOf.get(v)?.length ?? 0) === 1);

  const tabs: FilterTab[] = TABS.map((v) => ({
    id: v,
    label: labelOf(v),
    count: countFor(v),
    href: hrefOf(v),
    note: noteFor(v),
  }));

  /** `hidden`ın sunucu tarafı — istemci aynı kuralı `data-views` üzerinden
      yeniden uyguluyor, yani ilk çıktı ile ilk süzgeç arasında fark yok. */
  const off = (list: HubView[]) => !list.includes(view);

  return (
    <section className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <BlogFilter tabs={tabs} view={view} rootView={ROOT} interactive={interactive}>
          {/* ---------- ÖNE ÇIKAN ---------- */}
          {slots.map((slot) => (
            <div
              key={slot.key}
              className="bh-slot"
              data-views={slot.views.join(" ")}
              hidden={off(slot.views)}
            >
              <FadeUp delay={0.06}>
                {slot.post ? (
                  <Lead post={slot.post} showCat={interactive} />
                ) : (
                  /* BOŞ DURUM — bugün hiçbir görünüşte basılmıyor (altı
                     listenin hepsinde kayıt var). Duruyor çünkü kategori
                     süzgeci veriden geliyor: kayıtsız bir kategori eklendiği
                     gün sayfa sahte kart basmak yerine durumunu söylesin.
                     Sessiz boşluk seçenek değil — süzgeç kullanan biri boş
                     ekranı "yüklenmedi" diye okur. */
                  <div className="bh-empty">
                    <h2 className="bh-empty-t">{`Bu listede henüz ${unitOf(slot.views[0])} yok.`}</h2>
                    <p className="bh-empty-l">
                      Bir yazı ancak içindeki her satırın kaynağı gösterilebildiğinde yayına
                      giriyor. Doldurulmuş bir liste koymuyoruz.
                    </p>
                  </div>
                )}
              </FadeUp>
            </div>
          ))}

          {/* ---------- ARŞİV ----------
              Tek liste, tarih sırası. Yer tutucu satırlar buraya karışıyor ve
              karışması isteniyor: ayrı bölüm listeyi ikiye bölüyordu. */}
          {rows.length > 0 && (
            <ol className="bh-list" data-views={listViews.join(" ")} hidden={off(listViews)}>
              {rows.map((post, i) => (
                <li
                  key={post.slug}
                  data-views={(rowViews.get(post.slug) ?? []).join(" ")}
                  hidden={off(rowViews.get(post.slug) ?? [])}
                >
                  <Row post={post} delay={Math.min(0.08 + i * 0.05, 0.3)} showCat={interactive} />
                </li>
              ))}
            </ol>
          )}

          {/* Tek kayıt varken listenin bittiğini söylemek gerekiyor: boşluk
              kendi başına bir açıklama değil. Bugün yalnızca "Sektör notları"
              görünüşünde basılıyor — cümle bu yüzden "arşiv" değil "bu liste"
              diyor; kökte on beş kayıt varken bir kategoride bir tane olabilir
              ve "arşivde tek yazı var" o görünüşte yanlış olurdu. */}
          {soloViews.length > 0 && (
            <div className="bh-slot" data-views={soloViews.join(" ")} hidden={off(soloViews)}>
              <FadeUp delay={0.12}>
                <p className="bh-note">
                  Bu listede şimdilik tek kayıt var. Yenileri yayınlandıkça burada tarih
                  sırasıyla birikecek.
                </p>
              </FadeUp>
            </div>
          )}
        </BlogFilter>
      </div>
    </section>
  );
}
