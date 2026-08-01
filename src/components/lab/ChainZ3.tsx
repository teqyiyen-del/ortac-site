"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  Building2,
  CalendarCheck,
  IdCard,
  Landmark,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import SmartLink from "@/components/shared/SmartLink";
import { CHAIN } from "@/lib/brand";

/* ============================================================================
   Z3 — "Kuruluş bir halka, zincir devam ediyor" · üçüncü aday · ad alanı .z3-

   TEŞHİS
   Canlı bölüm (home/Chain.tsx) doğru şeyi anlatıyor ama yanlış dilde
   anlatıyor: ekranda duran şey bir yükümlülük grafiği. Eksen başlığı, 11
   pikselik çubuklar, 2px köşe, doku ile kodlanmış ritim (sık tırtık = beyan,
   seyrek tırtık = yenileme), sağ kenarda maskeyle silinen uçlar. Sitenin geri
   kalanında bu ailenin tek bir örneği yok: her bölüm 28/16/12 yarıçaplı
   yüzeylerden, ikon çiplerinden, saç teli ayraçlardan kuruluyor. Bölüm bu
   yüzden "kötü" değil, YABANCI görünüyor — ana sayfada tek başına bir gösterge
   paneli duruyor. İkinci sebep: bölümün hiç yüzeyi yok. Komşuları (hizmet
   kartları, bento karoları, süreç panosu) birer nesne; bu bölüm beyaz zeminde
   yüzen çizgilerden ibaret, o yüzden sayfaya tutunmuyor.

   BU ADAYIN AÇISI — halka yerine bağlantı
   Metaforu ÇİZMİYORUZ. Halka, bakla, zincir yok; "zincir" kelimesi başlıkta
   kalıyor. Bağlantıyı taşıyan şey tek bir pano: beş iş aynı çerçevenin içinde
   duruyor, aralarında sadece saç teli var. Argümanın iki yarısı panoyu ikiye
   bölüyor:
     · üstte, kâğıt dolgulu tek bant  → bir kez yapılan iş (Kuruluş)
     · altında iki piksellik mavi ray → "buradan sonrası bitmiyor"
     · rayın altında dört hücre       → süresiz devam eden işler
   Oran hâlâ okunuyor (bir bant, dört hücre) ama artık bir grafik değil, bir
   pano. Sitenin kendi araçları: --r-panel çerçeve, --border saç teli, --paper
   iç dolgu, tek mavi aksan, satır üstüne gelince mavi başlık + ok.

   BİLGİ AYNI. Beş başlık ve beş cümle CHAIN'den geliyor; eksen etiketleri
   ("Tek seferlik" / "Süresiz devam eden"), beş ritim sözcüğü, beş adres ve
   alttaki uyarı cümlesi canlı bölümden birebir taşındı. Eklenen ya da
   çıkarılan tek bir iddia yok.
   ========================================================================= */

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEW = { once: true, margin: "0px 0px -15% 0px" } as const;

/** kâğıt banda çıkan, yani bir kez yapılan iş */
const ONCE_KEY = "kurulus";

/* İkon, adres ve ritim sözcüğü canlı bölümdeki META ile aynı — brand.ts'te
   durmuyorlar, o yüzden burada tekrar yazılıyorlar; içerikleri değiştirilmedi. */
const META: Record<string, { Icon: LucideIcon; href: string; cadence: string }> = {
  kurulus: { Icon: Building2, href: "/dubai", cadence: "Bir kez" },
  banka: { Icon: Landmark, href: "/dubai/banka-hesabi", cadence: "Açılış ve takip" },
  muhasebe: { Icon: CalendarCheck, href: "/dubai/muhasebe", cadence: "Dönemsel" },
  uyum: { Icon: ShieldCheck, href: "/dubai/uyum", cadence: "Sürekli" },
  oturum: { Icon: IdCard, href: "/dubai/oturum-vize", cadence: "Yenilemeli" },
};

export default function ChainZ3() {
  const reduce = useReducedMotion();

  /* CHAIN brand.ts'te yazılıyor ve bu dosya ona tip düzeyinde bağlı değil:
     anahtar değişirse bölüm boş kalmalı, sayfayı düşürmemeli. */
  const once = CHAIN.find((c) => c.key === ONCE_KEY);
  const rest = CHAIN.filter((c) => c.key !== ONCE_KEY && META[c.key]);
  const onceMeta = once ? META[once.key] : undefined;

  return (
    <section className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="sec-head">
          <SplitWords
            as="h2"
            text="Kuruluş bir halka, zincir devam ediyor."
            accent="zincir devam ediyor."
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.2}>
            <p className="sec-lead">Şirket kurulduktan sonra başlayan iş burada.</p>
          </FadeUp>
        </div>

        {/* Pano tek parça geliyor: bölümün iddiası "bunlar ayrı ayrı hizmetler
            değil, tek bir iş" olduğu için kutular tek tek belirmemeli. */}
        <FadeUp delay={0.15} y={18} className="z3-board">
          {once && onceMeta && (
            <SmartLink href={onceMeta.href} className="z3-once">
              <p className="z3-lab">Tek seferlik</p>
              <div className="z3-once-row">
                <span className="z3-chip z3-chip-once" aria-hidden="true">
                  <onceMeta.Icon size={19} strokeWidth={1.8} />
                </span>
                <span className="z3-once-copy">
                  <span className="z3-t">
                    {once.label}
                    <ArrowUpRight className="z3-arrow" size={15} strokeWidth={2.1} aria-hidden="true" />
                  </span>
                  <span className="z3-l">{once.line}</span>
                </span>
                <span className="z3-cad z3-cad-once">{onceMeta.cadence}</span>
              </div>
            </SmartLink>
          )}

          {/* Tek grafik unsuru bu: panoyu ikiye bölen mavi ray. Zincir çizmiyor,
              sınır çiziyor — "buraya kadar bir kez, buradan sonrası sürekli". */}
          <motion.span
            className="z3-rail"
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={VIEW}
            transition={{ duration: reduce ? 0 : 0.9, delay: reduce ? 0 : 0.25, ease: EASE }}
          />

          <div className="z3-cont">
            <p className="z3-lab">Süresiz devam eden</p>
            <ul className="z3-cells">
              {rest.map((c, i) => {
                const { Icon, href, cadence } = META[c.key];
                return (
                  /* reduce yalnızca zamanlamayı sıfırlıyor, `initial`i değil:
                     sunucuda medya sorgusu yok, istemciye özel bir başlangıç
                     durumu HTML ile hidrasyonu çelişirdi. */
                  <motion.li
                    key={c.key}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={VIEW}
                    transition={{
                      duration: reduce ? 0 : 0.5,
                      delay: reduce ? 0 : 0.35 + i * 0.08,
                      ease: EASE,
                    }}
                  >
                    <SmartLink href={href} className="z3-cell">
                      <span className="z3-chip z3-chip-go" aria-hidden="true">
                        <Icon size={17} strokeWidth={1.8} />
                      </span>
                      <span className="z3-t">
                        {c.label}
                        <ArrowUpRight className="z3-arrow" size={14} strokeWidth={2.1} aria-hidden="true" />
                      </span>
                      <span className="z3-l">{c.line}</span>
                      <span className="z3-cad">{cadence}</span>
                    </SmartLink>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          {/* Uyarı cümlesi panonun dışında serbest bir paragraf değil, panonun
              alt bandı: panonun anlattığı şeyin sonucu, ayrı bir düşünce değil. */}
          <p className="z3-note">
            Kategorideki firmaların çoğu ilk halkada bitiyor. Ceza da, sorun da sonrasında
            çıkıyor.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
