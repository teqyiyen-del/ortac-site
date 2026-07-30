"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { Flag } from "@/components/shared/CountryPicker";
import {
  SceneAccounting,
  SceneBanking,
  SceneCompliance,
  SceneFormation,
  SceneVisa,
} from "@/components/home/ServiceScenes";
import { CHAIN } from "@/lib/brand";
import { COUNTRY_SLUGS, servicesFor, type ServiceSlug } from "@/lib/services";
import { COUNTRY_LABELS, type Country } from "@/lib/store";

/* Verdiğimiz hizmetler.
 *
 * Revizyon — iki şey değişti.
 *
 * 1. Kartın çıkışı. Eskiden her kartın altında tek bir "Ayrıntı" bağlantısı
 *    vardı ve sabit bir ülkeye (çoğu Dubai'ye) gidiyordu. Ama hizmetlerin
 *    hepsi her ülkede yok: vize İngiltere'de hiç yok, kalan dördü üç ülkede
 *    de var. Tek bağlantı bu farkı gizliyordu ve ziyaretçiyi seçmediği bir
 *    ülkenin sayfasına düşürüyordu. Artık çıkış ülke başına: kart hangi
 *    ülkelerde verildiğini gösteriyor, ziyaretçi kendi ülkesini seçiyor.
 *
 *    Ülke listesi elle yazılmıyor — servicesFor() neyi döndürüyorsa o. Bir
 *    hizmet bir ülkede açılıp kapandığında bu bölüm kendiliğinden düzeliyor.
 *
 * 2. Kartın görseli. Eski maket metnin solunda 190px'lik bir kutuydu; beş
 *    kart alt alta gelince aynı gri dikdörtgen beş kez okunuyordu. Sahne
 *    artık kartın üstünde, tam genişlikte ve animasyonlu (ServiceScenes).
 *
 * Kural aynı: hiçbir sahne banka kararı, otorite kararı veya kesin süre ima
 * edemez.
 */

/* CHAIN sırası akışın kendisi; kart boyutu o sırayı bozmadan ritim veriyor.
   7+5 üstte, 4+4+4 altta — bento hiçbir zaman delikle kapanmıyor. */
const CARDS: {
  key: string;
  slug: ServiceSlug;
  span: 7 | 5 | 4;
  Scene: () => React.ReactElement;
}[] = [
  { key: "kurulus", slug: "sirket-kurulusu", span: 7, Scene: SceneFormation },
  { key: "banka", slug: "banka-hesabi", span: 5, Scene: SceneBanking },
  { key: "muhasebe", slug: "muhasebe", span: 4, Scene: SceneAccounting },
  { key: "uyum", slug: "uyum", span: 4, Scene: SceneCompliance },
  { key: "oturum", slug: "oturum-vize", span: 4, Scene: SceneVisa },
];

const byKey = Object.fromEntries(CHAIN.map((c) => [c.key, c]));

/** hizmetin gerçekten verildiği ülkeler — tek kaynak servicesFor() */
const countriesFor = (slug: ServiceSlug): Country[] =>
  COUNTRY_SLUGS.filter((c) => servicesFor(c).some((s) => s.slug === slug));

/** "Dubai ve KKTC" — üç ülkede de varsa satır hiç yazılmıyor */
function scopeNote(list: Country[]): string | null {
  if (list.length >= COUNTRY_SLUGS.length) return null;
  const names = list.map((c) => COUNTRY_LABELS[c]);
  const joined =
    names.length > 1 ? `${names.slice(0, -1).join(", ")} ve ${names.at(-1)}` : names[0];
  return `Yalnızca ${joined}`;
}

export default function HomeServices() {
  return (
    <section id="hizmetler" className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="sec-head">
          <SplitWords
            as="h2"
            text="Verdiğimiz hizmetler."
            accent="hizmetler."
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.2}>
            <p className="sec-lead">
              Kuruluş bir halka; zincirin tamamı bizde. Kapsam ve fiyat ülkeye göre
              değiştiği için, her hizmette hangi ülkeye bakacağınızı siz seçiyorsunuz.
            </p>
          </FadeUp>
        </div>

        <div className="hx-grid">
          {CARDS.map((c, i) => {
            const meta = byKey[c.key];
            const list = countriesFor(c.slug);
            const note = scopeNote(list);
            return (
              <FadeUp
                key={c.key}
                delay={0.12 + i * 0.06}
                y={18}
                className={`hx-cell hx-c${c.span}`}
              >
                <article className="hx-card">
                  <div className="hx-stage" aria-hidden="true">
                    <c.Scene />
                  </div>

                  <div className="hx-body">
                    <h3 className="hx-t">{meta.label}</h3>
                    <p className="hx-l">{meta.line}</p>
                  </div>

                  <div className="hx-pick">
                    <span className="hx-pick-k">
                      Ülke seçin
                      {note && <i>{note}</i>}
                    </span>
                    <div className="hx-flags">
                      {list.map((country) => (
                        <Link
                          key={country}
                          href={`/${country}/${c.slug}`}
                          className="hx-flag"
                          aria-label={`${COUNTRY_LABELS[country]} — ${meta.label}`}
                        >
                          <span className="hx-flag-f" aria-hidden="true">
                            <Flag country={country} />
                          </span>
                          {COUNTRY_LABELS[country]}
                          <ArrowRight size={14} strokeWidth={2.2} aria-hidden="true" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </article>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
