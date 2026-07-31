"use client";

import SmartLink from "@/components/shared/SmartLink";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { PHOTO } from "@/lib/media";

/* Hizmetler — image card + 75% black scrim + copy on top.
   /public/ph/*.svg are PLACEHOLDERS: drop real photography in with the same
   filenames and nothing else has to change. */
const SERVICES = [
  {
    title: "Şirket Kuruluşu",
    desc: "Dubai serbest bölge, İngiltere Ltd, KKTC tescili. Lisans, sözleşme ve vergi kaydı tek akışta.",
    href: "/hizmetler/sirket-kurulumu",
    img: PHOTO.formation,
  },
  {
    title: "Banka & Ödeme",
    desc: "Wio ve Mashreq başvurusunu biz hazırlıyoruz. PayPal ve Stripe aynı süreçte bağlanır.",
    href: "/hizmetler/banka-odeme",
    img: PHOTO.bank,
  },
  {
    title: "Muhasebe & Vergi",
    desc: "Aylık raporlama, KDV ve kurumlar vergisi. Takvimi biz takip ediyoruz, tarih kaçmaz.",
    href: "/hizmetler/muhasebe-vergi",
    img: PHOTO.accounting,
  },
  {
    title: "Vize & Oturum",
    desc: "Yatırımcı vizesi, Emirates ID ve sağlık testi. Aile başvurusu dahil, gün gün takip.",
    href: "/hizmetler/vize-oturum",
    img: PHOTO.visa,
  },
];

export default function Services() {
  return (
    <section id="hizmetlerimiz" className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="sec-head">
          <SplitWords
            as="h2"
            text="Kuruluş sonrasını da biz yürütüyoruz."
            accent="biz yürütüyoruz."
            base={0.1}
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.26}>
            <p className="sec-lead">
              Kuruluş, banka hesabı, muhasebe ve vize aynı ekipte yürür; beyan ve lisans
              yenileme dönemlerinde süreç kesintiye uğramaz.
            </p>
          </FadeUp>
        </div>

        <div className="svc-grid">
          {SERVICES.map((s, i) => (
            <FadeUp key={s.title} delay={0.28 + i * 0.07}>
              <SmartLink href={s.href} className="svc-img">
                <span
                  className="svc-img-bg"
                  aria-hidden="true"
                  style={{ backgroundImage: `url(${s.img})` }}
                />
                <span className="svc-scrim" aria-hidden="true" />
                <span className="svc-img-body">
                  <span className="svc-img-title">{s.title}</span>
                  <span className="svc-img-desc">{s.desc}</span>
                  <span className="svc-img-more">
                    Detaya bak
                    <svg viewBox="0 0 14 14" width="13" height="13" aria-hidden="true">
                      <path
                        d="M2 7 H11 M7.5 3.5 L11 7 L7.5 10.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </span>
              </SmartLink>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
