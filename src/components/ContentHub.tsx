"use client";

import Link from "next/link";
import { ArrowRight, FileDown } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { POST_PHOTO } from "@/lib/media";
import { gtm } from "@/lib/gtm";

/* Kaynaklar — editorial cards on the night surface: photo, category, title,
   excerpt, then who wrote it and when. Everything links to /kaynaklar until the
   real slugs exist. */

type Kind = "ulke" | "mevzuat" | "pratik";

const KIND: Record<Kind, string> = {
  ulke: "Ülke rehberi",
  mevzuat: "Mevzuat",
  pratik: "Pratik",
};

/* SWAP:BLOG_POSTS — titles, excerpts, authors and dates are placeholders */
const POSTS: {
  t: string;
  k: Kind;
  m: string;
  img: string;
  ex: string;
  by: string;
  on: string;
}[] = [
  {
    t: "Dubai'de şirket kurmanın 2026 maliyeti",
    k: "ulke",
    m: "8 dk",
    img: POST_PHOTO.dubaiCost,
    ex: "Serbest bölge lisansı, vize, ofis ve ikinci yıl yenileme kalemleri tek tek; hangi kalemin ne zaman ödendiği dahil.",
    by: "Mali Müşavir",
    on: "12 Tem 2026",
  },
  {
    t: "İngiltere Ltd vergi rehberi",
    k: "mevzuat",
    m: "6 dk",
    img: POST_PHOTO.ukTax,
    ex: "Kurumlar vergisi eşikleri, KDV kaydı ve Companies House beyan takvimi; Türkiye'de mukim ortak için ne değişir.",
    by: "Mali Müşavir",
    on: "3 Tem 2026",
  },
  {
    t: "KKTC'de şirket: kimler için mantıklı?",
    k: "ulke",
    m: "5 dk",
    img: POST_PHOTO.kktc,
    ex: "Düşük kuruluş maliyeti ve Türkiye'ye yakınlık kime yarar, kime yaramaz; banka ve tahsilat tarafındaki sınırlar.",
    by: "Ortac Global",
    on: "24 Haz 2026",
  },
  {
    t: "Kurumlar vergisi değişiklikleri",
    k: "mevzuat",
    m: "4 dk",
    img: POST_PHOTO.corpTax,
    ex: "Yürürlüğe giren düzenlemeler, geçiş tarihleri ve mevcut şirketlerin hangi beyanı hangi dönemde vereceği.",
    by: "Mali Müşavir",
    on: "18 Haz 2026",
  },
  {
    t: "Banka hesabı reddedilirse ne olur?",
    k: "pratik",
    m: "7 dk",
    img: POST_PHOTO.bank,
    ex: "Red gerekçeleri, ikinci başvuru için hazırlanan dosya ve alternatif banka ile ödeme kuruluşu seçenekleri.",
    by: "Ortac Global",
    on: "9 Haz 2026",
  },
  {
    t: "Vize başvurusunda istenen belgeler",
    k: "pratik",
    m: "5 dk",
    img: POST_PHOTO.visa,
    ex: "Oturum vizesi için istenen evrak listesi, sağlık kontrolü ve Emirates ID adımlarının sırası ve süreleri.",
    by: "Ortac Global",
    on: "1 Haz 2026",
  },
];

const GUIDES = [
  { t: "Dubai Vergi Rehberi", m: "32 sayfa · PDF" },
  { t: "İngiltere Ltd El Kitabı", m: "24 sayfa · PDF" },
  { t: "KKTC Başlangıç", m: "18 sayfa · PDF" },
];

export default function ContentHub() {
  return (
    <section id="kaynaklar" className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="sec-head">
          <SplitWords
            as="h2"
            text="Rehberler ve mevzuat."
            accent="mevzuat."
            base={0.1}
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.24}>
            <p className="sec-lead">
              Her yazıda kaynak ve güncelleme tarihi belirtilir.
            </p>
          </FadeUp>
        </div>

        <div className="ch-cards">
          {POSTS.map((p, i) => (
            <FadeUp key={p.t} delay={0.26 + i * 0.05}>
              <Link href="/kaynaklar" className="bl-card">
                <span className="bl-media">
                  <span
                    className="bl-img"
                    aria-hidden="true"
                    style={{ backgroundImage: `url(${p.img})` }}
                  />
                </span>

                <span className="bl-meta">
                  <span className="bl-pill">{KIND[p.k]}</span>
                  <span className="bl-dot" aria-hidden="true" />
                  {p.m} okuma
                </span>

                <h3 className="bl-title">{p.t}</h3>
                <p className="bl-ex">{p.ex}</p>

                <span className="bl-foot">
                  <span>
                    Yazan
                    <b>{p.by}</b>
                  </span>
                  <span className="bl-foot-r">
                    Yayın
                    <b>{p.on}</b>
                  </span>
                </span>
              </Link>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.5}>
          <Link href="/kaynaklar" className="link-arrow">
            Tüm rehberler
            <ArrowRight size={15} strokeWidth={2.1} />
          </Link>
        </FadeUp>

        <div className="ch-guides">
          {GUIDES.map((g, i) => (
            <FadeUp key={g.t} delay={0.54 + i * 0.06}>
              <Link
                href="/kaynaklar"
                className="ch-guide"
                onClick={() => gtm("ebook_download_click", { title: g.t })}
              >
                <span className="ch-guide-ic" aria-hidden="true">
                  <FileDown size={18} strokeWidth={1.8} />
                </span>
                <span>
                  <span className="ch-guide-t">{g.t}</span>
                  <span className="ch-guide-m">{g.m}</span>
                </span>
                <span className="ch-guide-cta">Ücretsiz indir</span>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
