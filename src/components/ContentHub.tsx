import SmartLink from "@/components/shared/SmartLink";
import { ArrowRight } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { formatDate, sortedPosts } from "@/lib/blog";
import {
  EBOOKS,
  GUIDES,
  KIND_ORDER,
  RESOURCE_KINDS,
  UPDATES,
  countOf,
  type ResourceKind,
} from "@/lib/resources";

/* ============================================================================
   KAYNAKLAR HUB — /kaynaklar'ın gövdesi
   ============================================================================

   ÖNCEKİ HÂLİ VE MÜŞTERİNİN ŞİKÂYETİ
   Bu bileşen altı editoryal karttan oluşan tek bir ızgaraydı ve altı kartın
   ALTISI DA `/kaynaklar`a, yani kendi sayfasına bağlanıyordu. Müşterinin
   cümlesi bunu tarif ediyordu: "kaynaklar kısmında aslında hepsi aynı yere
   çıkıyor." Kartların başlıkları, özetleri, yazarları ve tarihleri de
   uydurmaydı (SWAP:BLOG_POSTS) — yani bölüm hem tek yere çıkıyor hem de
   olmayan içerikleri duyuruyordu. Üç PDF satırı da öyle: "Ücretsiz indir"
   yazıyordu, indirilecek dosya yoktu (public/ altında tek PDF yok).

   YENİ İŞİ: DÖRT KAPI
   Hub artık içerik listelemiyor, dört türü birbirinden AYIRIYOR ve her birini
   kendi sayfasına gönderiyor. Kapılar birbirinin kopyası değil: her kapı o
   türün kendi ritminden bir örnek gösteriyor — blog tarihli bir satır,
   rehber numaralı bir yol, gelişmeler tarih ekseni, e-kitap dosya sırtı.
   Turun mottosu buydu: anlatmıcaz, göstericez. Dört kapı dört farklı şey gibi
   görünmezse ayrım yalnızca sözde kalır.

   BOŞ TÜR NASIL GÖRÜNÜYOR
   Kapının içi boşsa önizleme satırları HİÇ BASILMIYOR; kapı duruyor ve tek
   satırla ne zaman dolacağını söylüyor. Dört kapılı bir hub'da iki kapının
   koca bir "burası boş" panelini açması, bölümü boş ilan etmenin dört katı
   olurdu. Dürüst boş durumun tam hâli türün kendi sayfasında (KynEmpty);
   ziyaretçi oraya "burada e-kitap var" diyen bir bağlantıyla gidiyor ve orada
   açıklamayı hak ediyor.

   Sahte kart hiçbir yerde seçenek değil: bugün listelenen her kaydın ya
   dosyası ya kaynağı ya da yazısı var.

   NOT — `gtm("ebook_download_click")` buradan kalktı. Olay, indirmeyen bir
   bağlantıya bağlıydı: ölçtüğü şey indirme değil, /kaynaklar'a dönen bir
   tıklamaydı. Gerçek dosyalar geldiğinde olayın yeri /e-kitaplar'daki indirme
   düğmesi.
   ========================================================================= */

/* Her kapının içi o türün ritminden bir örnek. Boş tür `null` dönüyor ve kapı
   önizleme yerine tek satırlık durumunu basıyor. */
function Preview({ kind }: { kind: ResourceKind }) {
  switch (kind) {
    /* BLOG — tarihli satır. Gerçek kayıt: lib/blog.ts. */
    case "blog": {
      const posts = sortedPosts().slice(0, 2);
      if (posts.length === 0) return null;
      return (
        <ul className="kyn-pv kyn-pv-list">
          {posts.map((p) => (
            <li key={p.slug}>
              <time dateTime={p.publishedAt}>{formatDate(p.publishedAt)}</time>
              <b>{p.title}</b>
            </li>
          ))}
        </ul>
      );
    }

    /* REHBER — numaralı yol. Durak sayısı veriden geliyor: bir ülkeye bölüm
       eklendiğinde rakam kendiliğinden doğru kalıyor. */
    case "rehber": {
      if (GUIDES.length === 0) return null;
      return (
        <ol className="kyn-pv kyn-pv-path">
          {GUIDES.map((g, i) => (
            <li key={g.country}>
              <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <b>{g.name}</b>
              <em>{g.chapters.length} durak</em>
            </li>
          ))}
        </ol>
      );
    }

    /* GELİŞMELER — bugün teyit edilmiş kayıt yok, o yüzden önizleme de yok. */
    case "gelisme": {
      if (UPDATES.length === 0) return null;
      return (
        <ul className="kyn-pv kyn-pv-feed">
          {UPDATES.slice(0, 3).map((u) => (
            <li key={u.id}>
              <time dateTime={u.date}>{formatDate(u.date)}</time>
              <b>{u.title}</b>
            </li>
          ))}
        </ul>
      );
    }

    /* E-KİTAP — dosyası olan kayıt yok. */
    case "ekitap": {
      if (EBOOKS.length === 0) return null;
      return (
        <ul className="kyn-pv kyn-pv-shelf">
          {EBOOKS.slice(0, 3).map((b) => (
            <li key={b.id}>
              <span aria-hidden="true">{b.format}</span>
              <b>{b.title}</b>
              <em>{b.pages} sayfa</em>
            </li>
          ))}
        </ul>
      );
    }
  }
}

export default function ContentHub() {
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
            /* Kapının dolu mu boş mu olduğuna kayıt sayısı karar veriyor
               (lib/resources.ts · countOf), bileşen değil: bir kayıt
               eklendiğinde kapı kendiliğinden canlanıyor. */
            const filled = countOf(k) > 0;

            return (
              <FadeUp key={k} delay={0.16 + i * 0.06}>
                <article className="kyn-door" data-kind={k}>
                  <span className="kyn-door-n" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <h3 className="kyn-door-t">{m.label}</h3>
                  <p className="kyn-door-j">{m.job}</p>

                  {/* Dolu tür önizlemesini gösteriyor, boş tür tek satırla
                      durumunu söylüyor. Kararı veren kaydın kendisi; bileşende
                      sabitlenmiş bir liste yok. */}
                  {filled ? (
                    <Preview kind={k} />
                  ) : (
                    <p className="kyn-door-soon">{m.emptyTitle}</p>
                  )}

                  <SmartLink href={m.href} className="kyn-door-go">
                    {m.label} sayfası
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
