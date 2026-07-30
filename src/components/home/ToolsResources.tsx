import Link from "next/link";
import { ArrowRight, BookOpen, Calculator, FileDown, Landmark, Scale, SlidersHorizontal } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";

/* §12 — one section, three columns. The legislation column is dated and
   time-sensitive; that is where the authority is built. */
const TOOLS = [
  { Icon: SlidersHorizontal, t: "Uygunluk testi", l: "6 soru · 2 dk", href: "/uygunluk-testi" },
  { Icon: Calculator, t: "Maliyet hesaplayıcı", l: "Paket ve ek hizmet", href: "/fiyatlar" },
  { Icon: Landmark, t: "Ödeme altyapısı matrisi", l: "Kanal · ülke", href: "/araclar/odeme-altyapisi" },
];

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
          <SplitWords
            as="h2"
            text="Karar vermeden önce."
            accent="önce."
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.2}>
            <p className="sec-lead">Araçlar, rehberler ve güncel mevzuat.</p>
          </FadeUp>
        </div>

        <div className="tr-grid">
          <FadeUp delay={0.16}>
            <div className="tr-col">
              <span className="tr-h">Araçlar</span>
              {TOOLS.map((x) => (
                <Link key={x.t} href={x.href} className="tr-row">
                  <span className="tr-ic" aria-hidden="true">
                    <x.Icon size={17} strokeWidth={1.9} />
                  </span>
                  <span>
                    <b>{x.t}</b>
                    <em>{x.l}</em>
                  </span>
                  <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.22}>
            <div className="tr-col">
              <span className="tr-h">Rehberler</span>
              {GUIDES.map((x) => (
                <Link key={x.t} href={x.href} className="tr-row">
                  <span className="tr-ic" aria-hidden="true">
                    <x.Icon size={17} strokeWidth={1.9} />
                  </span>
                  <span>
                    <b>{x.t}</b>
                    <em>{x.l}</em>
                  </span>
                  <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                </Link>
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
                <Link key={x.t} href="/blog" className="tr-legal">
                  <time>{x.d}</time>
                  <b>{x.t}</b>
                </Link>
              ))}
              <Link href="/blog" className="link-arrow">
                Tüm mevzuat yazıları
                <ArrowRight size={15} strokeWidth={2.1} />
              </Link>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
