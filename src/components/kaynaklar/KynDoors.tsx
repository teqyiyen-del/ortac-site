import SmartLink from "@/components/shared/SmartLink";
import { ArrowRight } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { formatDate, postsOfKind, sortedPosts } from "@/lib/blog";
import {
  DRAFT_EBOOKS,
  DRAFT_EBOOK_COPY,
  DRAFT_UPDATES,
  DRAFT_UPDATE_COPY,
  EBOOKS,
  GUIDES,
  KIND_ORDER,
  RESOURCE_KINDS,
  UPDATES,
  shelfCountOf,
  type ResourceKind,
} from "@/lib/resources";

/* ============================================================================
   KAYNAKLAR HUB — /kaynaklar'ın gövdesi
   ============================================================================

   NEDEN YENİ BİR DOSYA
   Bu bileşen eski components/ContentHub.tsx'in yerini aldı. O dosya turun
   başında başka bir ajanın alanındaydı ve kapıların içini doldurmak onu
   düzenlemeyi gerektiriyordu; iş bu ada taşındı. Devir tamamlanınca eski
   dosya SİLİNDİ — iki ayrı hub bileşeni bırakmak, biri güncellenip öteki
   unutulduğunda /kaynaklar'ın sessizce eski hâline dönmesi demekti.

   HUB'IN İŞİ DEĞİŞMEDİ: DÖRT KAPI
   Müşterinin ilk teşhisi buydu: "kaynaklar kısmında aslında hepsi aynı yere
   çıkıyor." Hub içerik listelemiyor, dört türü AYIRIYOR ve her birini kendi
   sayfasına gönderiyor. Kapılar birbirinin kopyası değil: her kapı o türün
   kendi ritminden bir örnek gösteriyor — blog tarihli bir satır, rehber
   numaralı bir yol, gelişmeler tarih ekseni, e-kitap dosya sırtı.

   BU TURDA DEĞİŞEN: "HENÜZ YOK" DURUMLARI KALKTI
   Eskiden bir kapının içi boşsa önizleme hiç basılmıyor, yerine "Henüz
   yayınlanmış bir gelişme yok" satırı geliyordu. Müşteri bu dili kaldırttı ve
   haklıydı: dört kapılı bir hub'da iki kapının boş ilan edilmesi, tasarımın
   dolu hâlini hiç göstermiyordu.

   Şimdi dört kapının dördü de dolu ve dördü de GERÇEK veriden besleniyor:
     · blog     · lib/blog.ts · yayınlanmış yazılar (başka ajanda dolduruluyor)
     · rehber   · lib/blog.ts · yayınlanmış rehberler; henüz yoksa GUIDES'tan
                  türeyen ülke yolu — o da uydurma değil, ülke verisinden
                  hesaplanıyor (bkz. lib/resources.ts · buildGuide)
     · gelisme  · yayındakiler + işaretli yer tutucular
     · ekitap   · yayındakiler + işaretli yer tutucular

   Yer tutucudan gelen önizleme satırında küçük "Örnek" rozeti duruyor: kapı
   ile sayfa aynı şeyi söylüyor, ziyaretçi tıklayınca sürprizle karşılaşmıyor.

   SAYIM ELLE YAZILMIYOR (`shelfCountOf`): blog tarafı dolduğunda kapı
   kendiliğinden doğru kalıyor. Sayı sıfırsa hiç basılmıyor — "0" ya da
   "Hazırlanıyor" yazmak, kaldırdığımız dilin başka bir kılığı olurdu.
   ========================================================================= */

/** Önizleme satırlarının ortak biçimi. */
type PreviewRow = {
  key: string;
  /** solda duran küçük şey: tarih, sıra numarası ya da dosya biçimi */
  lead: string;
  /** tarihli satırlarda <time dateTime> için ISO */
  iso?: string;
  title: string;
  /** sağda duran küçük ölçü: "9 durak", "32 sayfa" */
  tail?: string;
  /** yer tutucudan geliyorsa küçük "Örnek" rozeti basılıyor */
  seed?: boolean;
};

/** Her kapının içi o türün ritminden bir örnek; dördü de aynı veriden. */
function rowsFor(kind: ResourceKind): { rows: PreviewRow[]; cls: string } {
  switch (kind) {
    /* BLOG — tarihli satır. `placeholder` işareti satıra AYNEN taşınıyor:
       blog tarafı da bu turda yer tutucuyla doldu ve ayrım kaydın kendi
       alanında duruyor (lib/blog.ts · BlogPost.placeholder). Kapıda
       işaretlemezsek aynı listede iki farklı davranış olurdu — gelişme ve
       e-kitap satırlarında rozet var, blog satırında yok. */
    case "blog":
      return {
        cls: "kyn-pv-list",
        rows: sortedPosts()
          .slice(0, 3)
          .map((p) => ({
            key: p.slug,
            lead: formatDate(p.publishedAt),
            iso: p.publishedAt,
            title: p.title,
            seed: p.placeholder,
          })),
      };

    /* REHBER — rehber yazıları. Hiç yoksa ülke yolu: durak sayısı ülkenin
       kendi verisinden hesaplanıyor, yani bir bölüm eklendiğinde rakam
       kendiliğinden doğru kalıyor. */
    case "rehber": {
      const posts = postsOfKind("rehber");
      if (posts.length > 0) {
        return {
          cls: "kyn-pv-list",
          rows: posts.slice(0, 3).map((p) => ({
            key: p.slug,
            lead: formatDate(p.publishedAt),
            iso: p.publishedAt,
            title: p.title,
            seed: p.placeholder,
          })),
        };
      }
      return {
        cls: "kyn-pv-path",
        rows: GUIDES.map((g, i) => ({
          key: g.country,
          lead: String(i + 1).padStart(2, "0"),
          title: g.name,
          tail: `${g.chapters.length} durak`,
        })),
      };
    }

    /* GELİŞMELER — tarih ekseninin ilk üç satırı. */
    case "gelisme":
      return {
        cls: "kyn-pv-feed",
        rows: [
          ...UPDATES.map((u) => ({
            key: u.id,
            lead: formatDate(u.date),
            iso: u.date,
            title: u.title,
          })),
          ...DRAFT_UPDATES.map((d) => ({
            key: d.id,
            lead: formatDate(d.date),
            iso: d.date,
            title: d.topic,
            seed: true,
          })),
        ]
          .sort((a, b) => (b.iso ?? "").localeCompare(a.iso ?? ""))
          .slice(0, 3),
      };

    /* E-KİTAP — raftan üç dosya sırtı. */
    case "ekitap":
      return {
        cls: "kyn-pv-shelf",
        rows: [
          ...EBOOKS.map((b) => ({
            key: b.id,
            lead: b.format,
            iso: b.updatedAt,
            title: b.title,
            tail: `${b.pages} sayfa`,
          })),
          ...DRAFT_EBOOKS.map((b) => ({
            key: b.id,
            lead: b.format,
            iso: b.addedAt,
            title: b.title,
            tail: `~${b.plannedPages} sayfa`,
            seed: true,
          })),
        ]
          .sort((a, b) => (b.iso ?? "").localeCompare(a.iso ?? ""))
          .slice(0, 3),
      };
  }
}

/**
 * Yer tutucu rozetinin metni — dört kapıda da aynı tek kelime.
 *
 * Dört türün üçü yer tutucu taşıyabiliyor ve üçünün kaynağı ayrı dosyada
 * (gelişme ve e-kitap lib/resources.ts'te, blog ve rehber lib/blog.ts'te).
 * Kelimeyi burada tek yerde tutmanın sebebi tam da bu: aynı listede dört satır
 * yan yana duruyor ve biri "Örnek", öteki "Taslak" derse ziyaretçi iki farklı
 * durum olduğunu sanar. Kaynak dosyalar kendi metinlerini değiştirirse
 * aşağıdaki eşitlik denetimi tip düzeyinde bozulur ve fark burada yakalanır.
 */
const SEED_BADGE = DRAFT_UPDATE_COPY.badge;

/* Gelişme ve e-kitap tarafındaki iki rozet metninin AYNI kalması bir sözleşme;
   ayrışırlarsa bu satır derlemede hata verir. Çalışma zamanında hiçbir şey
   yapmıyor, yalnızca sözleşmeyi kayda geçiriyor. */
const _seedBadgesMatch: typeof DRAFT_EBOOK_COPY.badge = SEED_BADGE;
void _seedBadgesMatch;

export default function KynDoors() {
  return (
    <section id="kaynaklar" className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="sec-head">
          <SplitWords
            as="h2"
            text="Dört tür, dört ayrı yer."
            accent="dört ayrı yer."
            base={0.1}
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.24}>
            <p className="sec-lead">
              Okumak, yolunuzu bulmak, neyin değiştiğini görmek ve indirmek ayrı işler. Dördü ayrı
              sayfada duruyor.
            </p>
          </FadeUp>
        </div>

        <div className="kyn-doors">
          {KIND_ORDER.map((k, i) => {
            const m = RESOURCE_KINDS[k];
            const { rows, cls } = rowsFor(k);
            const n = shelfCountOf(k);

            return (
              <FadeUp key={k} delay={0.16 + i * 0.06}>
                <article className="kyn-door" data-kind={k}>
                  <span className="kyn-door-n" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <h3 className="kyn-door-t">{m.label}</h3>
                  <p className="kyn-door-j">{m.job}</p>

                  {rows.length > 0 && (
                    <ul className={`kyn-pv ${cls}`}>
                      {rows.map((r) => (
                        <li key={r.key}>
                          {r.iso ? (
                            <time dateTime={r.iso}>{r.lead}</time>
                          ) : (
                            <span aria-hidden="true">{r.lead}</span>
                          )}
                          <b>{r.title}</b>
                          {r.seed ? <span className="kyn-seed-tag">{SEED_BADGE}</span> : null}
                          {r.tail ? <em>{r.tail}</em> : null}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Sayı bağlantının İÇİNDE: kapının vaadi ile tıklayınca
                      çıkan liste tek cümlede birleşiyor. Sıfırsa hiç
                      yazılmıyor — "0 kayıt" ilk bakışta hata gibi okunur. */}
                  <SmartLink href={m.href} className="kyn-door-go">
                    {n > 0 ? `${m.label} sayfası · ${n} kayıt` : `${m.label} sayfası`}
                    <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                  </SmartLink>

                  <p className="kyn-door-not">{m.isNot}</p>
                </article>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
