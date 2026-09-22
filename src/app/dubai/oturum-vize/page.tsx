import type { Metadata } from "next";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Briefcase,
  CalendarCheck,
  CalendarClock,
  ClipboardList,
  FileCheck,
  FingerprintPattern,
  HeartHandshake,
  IdCard,
  Link2,
  LogOut,
  Package,
  Plane,
  Plus,
  Stethoscope,
  UserPlus,
  UserRound,
} from "lucide-react";

import Nav from "@/components/Nav";
import PageHero from "@/components/shared/PageHero";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import CountryDocs from "@/components/CountryDocs";
import CountryFaq from "@/components/CountryFaq";
import FinalCta from "@/components/FinalCta";
import VizeHeroCard from "@/components/services/VizeHeroCard";
import { VIZE_DUBAI as V, type VizeIkon } from "@/lib/vizeDubai";

/* ============================================================================
   DUBAİ · VİZE & OTURUM — /dubai/oturum-vize
   Metin: lib/vizeDubai.ts (kaynak düzeni ve teyit bekleyenler orada) ·
   Biçim: css/svc-vize.css (.svz-) · Hero kartı: services/VizeHeroCard.tsx

   Bu sayfa /dubai'nin (şirket kuruluşu) VİZE ADIMININ AYRINTISI. Banka
   sayfasının iskeletiyle kardeş, kendi içeriğiyle:

     hero       HeroSceneCard iskeleti (kuruluş, muhasebe, bankayla kardeş)
     türler     ortak · çalışan · aile, her birinde kimin sponsor olduğu
     kota       Burak'ın asıl derdi: kotayı paket belirliyor, üstü görüşmede.
                Solda kota sahnesi, sağda üç madde (bankanın ayna düzeni)
     süreç      beş adım alt alta satır (bankada hâlâ yan yana kart; deneme)
     koruma     oturumu düşürmeyen dört resmî kural (u.ae)
     belgeler   sitenin standart belge bileşeni (CountryDocs)
     SSS        sitenin SSS bloğu (CountryFaq)

   FİYAT YOK (Burak: "buraya fiyat koyma").

   KAPALI SAYFA. lib/routes.ts · STATIC_LIVE'da DEĞİL: menü ve zincir
   bağlantıları sönük, sayfa yalnız doğrudan adresle açılıyor ve noindex.
   Onay gelince: STATIC_LIVE'a ekle, robots'u kaldır.

   STATİK KLASÖR, DİNAMİK ŞABLONU EZİYOR (app/dubai/[hizmet]; muhasebe ve
   banka da böyle). */

export const metadata: Metadata = {
  title: "Dubai'de Oturum Vizesi ve Emirates ID | Ortac Global",
  description: V.hero.lead,
  /* Kapalı taslak: onaydan sonra kalkacak (yukarıdaki not). */
  robots: { index: false, follow: false },
};

/* PageHero istemci bileşeni, bu sayfa sunucu bileşeni: lucide bileşeninin
   kendisi sınırı geçemez, çizilmiş düğüm geçer. */
const IKON: Record<VizeIkon, LucideIcon> = {
  randevu: CalendarCheck,
  "bir-kez": Plane,
  ortak: UserRound,
  calisan: Briefcase,
  aile: HeartHandshake,
  paket: Package,
  plan: ClipboardList,
  ek: UserPlus,
  giris: FileCheck,
  saglik: Stethoscope,
  biyometri: FingerprintPattern,
  izin: BadgeCheck,
  kimlik: IdCard,
  sure: CalendarClock,
  yurtdisi: Plane,
  bagli: Link2,
  iptal: LogOut,
};

/* ---------------------------------------------------------------- KOTA SAHNESİ
   aria-hidden: iddia başlıkta ve maddelerde. Altı kutu paketin kotası, dışında
   iki kesik kutu "ek vize". Kutu sayısı GÖSTERİM, bir paketin gerçek kotası
   değil; bu yüzden hiçbir yerde rakam yazmıyor. Kutular sırayla doluyor
   (svc-vize.css · svzDol): kota dolduğunda sıradaki kişi çerçevenin dışına,
   görüşmeye düşüyor. */
function KotaSahne() {
  return (
    <div className="svz-kota">
      <div className="svz-kota-cer">
        <span className="svz-kota-t">{V.quota.scene.title}</span>
        <ul className="svz-kota-l">
          {[0, 1, 2, 3, 4, 5].map((k) => (
            <li key={k} className="svz-kota-k" data-k={k}>
              <UserRound size={20} strokeWidth={1.9} />
            </li>
          ))}
        </ul>
      </div>
      <div className="svz-kota-ek">
        <span className="svz-kota-ek-k">
          <Plus size={18} strokeWidth={2} />
        </span>
        <span className="svz-kota-ek-k">
          <Plus size={18} strokeWidth={2} />
        </span>
        <b>{V.quota.scene.extra}</b>
      </div>
    </div>
  );
}

export default function DubaiVizePage() {
  const H = V.hero;
  const T = V.types;
  const Q = V.quota;
  const S = V.steps;
  const K = V.keep;
  return (
    <>
      <Nav />
      <main>
        <PageHero
          crumb={H.crumb}
          title={H.title}
          accent={H.accent}
          lead={H.lead}
          art={<VizeHeroCard />}
          cta={H.cta}
          trust={H.trust.map((t) => {
            const I = IKON[t.icon];
            return { icon: <I size={15} strokeWidth={2} aria-hidden="true" />, line: t.line };
          })}
        />

        {/* ---------------------------------------------------- VİZE TÜRLERİ
            Üç kart: ikon ve sponsor etiketi üstte, ad ve cümle altta. */}
        <section id={T.id} className="sec-pad">
          <div className="container-o">
            <div className="sec-head">
              <SplitWords as="h2" text={T.heading} accent={T.accent} className="h2" />
              <FadeUp delay={0.2}>
                <p className="sec-lead">{T.lead}</p>
              </FadeUp>
            </div>
            <ul className="svz-tur">
              {T.items.map((t, i) => {
                const I = IKON[t.icon];
                return (
                  <li key={t.title}>
                    <FadeUp className="svz-tur-k" delay={0.1 + i * 0.06}>
                      <span className="svz-tur-bas">
                        <span className="svz-ic" aria-hidden="true">
                          <I size={20} strokeWidth={1.9} />
                        </span>
                        <span className="svz-tur-sp">{t.sponsor}</span>
                      </span>
                      <h3 className="svz-tur-t">{t.title}</h3>
                      <p className="svz-tur-s">{t.line}</p>
                    </FadeUp>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------ VİZE KOTASI
            Solda kota sahnesi, sağda üç madde. */}
        <section id={Q.id} className="sec-pad">
          <div className="container-o">
            <div className="sec-head">
              <SplitWords as="h2" text={Q.heading} accent={Q.accent} className="h2" />
              <FadeUp delay={0.2}>
                <p className="sec-lead">{Q.lead}</p>
              </FadeUp>
            </div>
            <div className="svz-bol">
              <FadeUp className="svz-sahne" delay={0.1}>
                <div aria-hidden="true">
                  <KotaSahne />
                </div>
              </FadeUp>
              <ul className="svz-mad">
                {Q.points.map((p, i) => {
                  const I = IKON[p.icon];
                  return (
                    <li key={p.title}>
                      <FadeUp className="svz-mad-s" delay={0.12 + i * 0.05}>
                        <span className="svz-ic" aria-hidden="true">
                          <I size={18} strokeWidth={1.9} />
                        </span>
                        <div>
                          <b className="svz-mad-t">{p.title}</b>
                          <p className="svz-mad-p">{p.line}</p>
                        </div>
                      </FadeUp>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>

        {/* SÜREÇ · beş adım ALT ALTA (22.09.2026 · Burak: "1. madde çok uzun
            diye garip durmuş … yan yana değil de alt alta mı dizsek").
            Önce burada deneniyor, tutarsa bankaya da geçecek. */}
        <section id={S.id} className="sec-pad">
          <div className="container-o">
            <div className="sec-head">
              <SplitWords as="h2" text={S.heading} accent={S.accent} className="h2" />
              <FadeUp delay={0.2}>
                <p className="sec-lead">{S.lead}</p>
              </FadeUp>
            </div>
            <ol className="svz-adim">
              {S.items.map((st, i) => {
                const I = IKON[st.icon];
                return (
                  <li key={st.title}>
                    <FadeUp className="svz-adim-k" delay={0.1 + i * 0.06}>
                      <span className="svz-ic svz-adim-ic" aria-hidden="true">
                        <I size={18} strokeWidth={1.9} />
                      </span>
                      <span className="svz-adim-n" aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="svz-adim-t">{st.title}</h3>
                      <p className="svz-adim-s">{st.line}</p>
                    </FadeUp>
                  </li>
                );
              })}
            </ol>
            <Link href={S.exit.href} className="svz-cik">
              {S.exit.label}
              <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
            </Link>
          </div>
        </section>

        {/* ------------------------------------------------ OTURUMU KORUMAK
            Dört resmî kural, dört karo; altında kaynak. */}
        <section id={K.id} className="sec-pad">
          <div className="container-o">
            <div className="sec-head">
              <SplitWords as="h2" text={K.heading} accent={K.accent} className="h2" />
              <FadeUp delay={0.2}>
                <p className="sec-lead">{K.lead}</p>
              </FadeUp>
            </div>
            <ul className="svz-kor">
              {K.items.map((c, i) => {
                const I = IKON[c.icon];
                return (
                  <li key={c.title}>
                    <FadeUp className="svz-kor-k" delay={0.08 + i * 0.05}>
                      <span className="svz-ic" aria-hidden="true">
                        <I size={18} strokeWidth={1.9} />
                      </span>
                      <div>
                        <b>{c.title}</b>
                        <p>{c.line}</p>
                      </div>
                    </FadeUp>
                  </li>
                );
              })}
            </ul>
            <a className="svz-kaynak" href={K.source.href} target="_blank" rel="noopener noreferrer">
              {K.source.label}
              <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />
            </a>
          </div>
        </section>

        {/* BELGELER · sitenin standart belge bileşeni. */}
        <CountryDocs
          data={V.docs.data}
          name="Dubai"
          heading={V.docs.heading}
          accent={V.docs.accent}
          lead={V.docs.lead}
        />

        <section id={V.faq.id} className="sec-pad">
          <div className="container-o">
            <div className="sec-head">
              <SplitWords as="h2" text={V.faq.heading} accent={V.faq.accent} className="h2" />
            </div>
            <CountryFaq items={V.faq.items} />
          </div>
        </section>

        <FinalCta kapanis={V.closing} />
      </main>
    </>
  );
}
