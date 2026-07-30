"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SplitWords from "@/components/shared/SplitWords";
import FadeUp from "@/components/shared/FadeUp";
import HeroGlobe from "@/components/HeroGlobe";
import HeroPartners from "@/components/home/HeroPartners";
import { gtm } from "@/lib/gtm";

/* §1 — composition is fixed by the brief: centred block, big H1, two lines of
   sub, two buttons, three flags, dotted globe below. Copy is fixed too. */
export default function Hero() {
  return (
    <>
      <section className="hero4">
      <div className="container-o hero4-top">
        <SplitWords
          as="h1"
          text="Şirketinizi kurun, sonrasını da biz yürütelim."
          accent="sonrasını da biz yürütelim."
          base={0.12}
          className="hero4-h1"
          style={{ color: "#ffffff" }}
        />

        <FadeUp delay={0.3}>
          <p className="hero4-sub">
            Dubai, İngiltere ve KKTC&apos;de kuruluş, banka, tahsilat ve muhasebe.
            <br />
            Dubai&apos;deki kendi ofisimizden, Türkçe yürütülür.
          </p>
        </FadeUp>

        <FadeUp delay={0.38}>
          <div className="hero4-cta">
            <Link href="/basla" className="btn btn-primary" onClick={() => gtm("hero_cta_click")}>
              Kurulumu Başlat
              <ArrowRight size={15} strokeWidth={2.1} />
            </Link>
            <Link
              href="/iletisim"
              className="btn btn-ghost"
              onClick={() => gtm("cta_meeting_click", { placement: "hero" })}
            >
              Ücretsiz danışmanlık
            </Link>
          </div>
        </FadeUp>
      </div>

      <FadeUp delay={0.46} className="hero4-globe">
        <HeroGlobe />
      </FadeUp>

      </section>

      {/* below the fold on purpose: the first screen is the promise, and the
          names we work with are the first thing you meet on the way down */}
      <HeroPartners />
    </>
  );
}
