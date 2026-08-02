import SmartLink from "@/components/shared/SmartLink";
import {
  ArrowRight,
  BookOpen,
  CalendarClock,
  CalendarRange,
  FileDown,
  ListChecks,
  Scale,
  type LucideIcon,
} from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { TOOL_CATALOG, type ToolId } from "@/lib/tools/catalog";

/* §12 — one section, three columns. The legislation column is dated and
   time-sensitive; that is where the authority is built. */

/* ARAÇLAR SÜTUNU BU TURDA BAŞTAN KURULDU.
 *
 * Eskiden üç satır vardı: uygunluk testi (/uygunluk-testi), maliyet
 * hesaplayıcı (/fiyatlar) ve ödeme altyapısı matrisi
 * (/araclar/odeme-altyapisi). İki sorun birden vardı.
 *
 * Birincisi bağlantı: /fiyatlar ve /araclar/odeme-altyapisi diye sayfa yok.
 * İkisi de app/[...yapim] yakalayıcısına düşüyor, yani ziyaretçi "yapım
 * aşamasında" kartına iniyordu — üç satırın ikisi ölüydü. Yakalayıcı 200
 * döndürdüğü için hiçbir durum kodu kontrolü bunu göstermiyordu.
 *
 * İkincisi ve asıl olanı iş tanımı: o üçü KARAR araçları, yani bizim satış
 * yardımcılarımız, ve sitenin içine zaten dağıtıldılar — test hero'da ve
 * navbar'da, maliyet ülke sayfalarının fiyat bölümünde, matris /ulkeler'in
 * kıyas tablosunda. Araçlar sütunu artık ziyaretçinin kendi işine yarayan,
 * kullanınca elinde bir çıktı kalan araçları listeliyor.
 *
 * Liste elle yazılmıyor: lib/tools/catalog.ts ne diyorsa o. Böylece bu sütun,
 * navbar'ın Araçlar paneli ve /araclar sayfası tek kaynaktan besleniyor ve
 * ikinci kez "karşılığı olmayan araç" listelemek zorlaşıyor. */
const TOOL_ICON: Record<ToolId, LucideIcon> = {
  "oturum-sayaci": CalendarClock,
  "yukumluluk-takvimi": CalendarRange,
  "belge-listesi": ListChecks,
};

const TOOLS = TOOL_CATALOG.map((t) => ({
  Icon: TOOL_ICON[t.id],
  t: t.title,
  l: t.meta,
  href: t.href,
}));

const GUIDES = [
  { Icon: BookOpen, t: "Dubai kuruluş rehberi", l: "32 sayfa · PDF", href: "/kaynaklar" },
  { Icon: BookOpen, t: "İngiltere Ltd el kitabı", l: "24 sayfa · PDF", href: "/kaynaklar" },
  { Icon: FileDown, t: "KKTC başlangıç rehberi", l: "18 sayfa · PDF", href: "/kaynaklar" },
];

/* SWAP:LEGISLATION — tarihli ve aciliyeti olan konular */
const LEGAL = [
  { t: "Kurumlar vergisi beyan takvimi", d: "12 Tem 2026" },
  { t: "goAML kayıt yükümlülüğü", d: "3 Tem 2026" },
  { t: "KDV eşiği ve kayıt zorunluluğu", d: "24 Haz 2026" },
];

export default function ToolsResources() {
  return (
    <section id="kaynaklar" className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="sec-head">
          {/* Başlık "Karar vermeden önce."ydi. Araçlar sütunu artık karar
              araçlarını taşımıyor — oturum sayacı ve yükümlülük takvimi karar
              verildikten SONRA işe yarıyor — yani eski başlık bölümün üçte
              birini yanlış tanıtıyordu. */}
          <SplitWords
            as="h2"
            text="Karar öncesi ve sonrası."
            accent="ve sonrası."
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.2}>
            <p className="sec-lead">
              Kullanıp götüreceğiniz araçlar, rehberler ve güncel mevzuat.
            </p>
          </FadeUp>
        </div>

        <div className="tr-grid">
          <FadeUp delay={0.16}>
            <div className="tr-col">
              <span className="tr-h">Araçlar</span>
              {TOOLS.map((x) => (
                <SmartLink key={x.t} href={x.href} className="tr-row">
                  <span className="tr-ic" aria-hidden="true">
                    <x.Icon size={17} strokeWidth={1.9} />
                  </span>
                  <span>
                    <b>{x.t}</b>
                    <em>{x.l}</em>
                  </span>
                  <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                </SmartLink>
              ))}
              {/* Sütunun çıkışı. Mevzuat sütununda zaten aynı kalıp var;
                  araçların da kendi sayfası olduğuna göre oraya bir kapı
                  gerekiyor — üç satır sayfanın tamamı değil. */}
              <SmartLink href="/araclar" className="link-arrow">
                Araçlar sayfası
                <ArrowRight size={15} strokeWidth={2.1} />
              </SmartLink>
            </div>
          </FadeUp>

          <FadeUp delay={0.22}>
            <div className="tr-col">
              <span className="tr-h">Rehberler</span>
              {GUIDES.map((x) => (
                <SmartLink key={x.t} href={x.href} className="tr-row">
                  <span className="tr-ic" aria-hidden="true">
                    <x.Icon size={17} strokeWidth={1.9} />
                  </span>
                  <span>
                    <b>{x.t}</b>
                    <em>{x.l}</em>
                  </span>
                  <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                </SmartLink>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.28}>
            <div className="tr-col tr-col-legal">
              <span className="tr-h">
                <Scale size={15} strokeWidth={2} aria-hidden="true" />
                Güncel mevzuat
              </span>
              {LEGAL.map((x) => (
                <SmartLink key={x.t} href="/blog" className="tr-legal">
                  <time>{x.d}</time>
                  <b>{x.t}</b>
                </SmartLink>
              ))}
              <SmartLink href="/blog" className="link-arrow">
                Tüm mevzuat yazıları
                <ArrowRight size={15} strokeWidth={2.1} />
              </SmartLink>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
