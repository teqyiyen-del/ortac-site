"use client";

import Image from "next/image";

import { COUNTRY_PHOTO } from "@/lib/media";
import { useState } from "react";
import SmartLink from "@/components/shared/SmartLink";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  Building2,
  Clock,
  Code2,
  CreditCard,
  Globe,
  IdCard,
  Map as MapIcon,
  Package,
  Percent,
  Plane,
  Receipt,
  Store,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import { Flag } from "@/components/shared/CountryPicker";
import { FACTS } from "@/lib/brand";
import type { FitProfilIkon, FitRow } from "@/lib/countryContent";
import { COUNTRY_LABELS, type Country } from "@/lib/store";

/* A seven-row table of prose is something you read past. The same seven rows as
   a question the visitor answers about themselves is something they act on.
   The verdict is written in the firm's voice — "doğru yer" / "önermiyoruz" —
   not as a compatibility badge, and it always ends holding a destination with
   its real price and duration, so the answer is a next step and not a label. */

/* ÇİP GLİFLERİ. Anahtar veride (countryContent.ts · FitProfilIkon), glif
   burada — veri dosyası JSX taşımıyor. `Record` olduğu için veriye yeni bir
   anahtar girerse burası DERLEME HATASI veriyor, sessizce eskimiyor.

   DEPODA YAZILI İKİ KURAL BU EŞLEMEYİ SINIRLIYOR (lib/fitTest.ts):
     1) Kaleme BAYRAK KONMAZ. "Körfez ve Orta Doğu'ya satış" BAE bayrağı
        alsaydı, ya da "Yalnızca AB'ye fatura kesen" İngiltere bayrağı alsaydı,
        çip hangi ülkeye gittiğini ilk bakışta söylerdi — yani cevap anahtarı
        olurdu. Blok "seç, cevabı gör" kurgusu.
     2) Glif PROFİLİ anlatır, KARARI değil. `ok: false` olan kalemlere uyarı,
        ünlem ya da çarpı konmuyor; olumsuzu çipte ele vermek altındaki paneli
        gereksizleştirirdi.

   "Kuruluş bütçesi dar olan" gibi DERECE kalemleri fitTest'in kuralına göre
   glif almazdı; burada alıyor ve sebebi şu: orası bir soru ŞIKKI, burası
   ziyaretçinin kendi profili. Yedinin altısına glif verip birini boş bırakmak
   şeridi tırtıklardı. */
const CIP_IKON: Record<FitProfilIkon, LucideIcon> = {
  magaza: Store,
  kure: Globe,
  kimlik: IdCard,
  kod: Code2,
  cuzdan: Wallet,
  ucak: Plane,
  fis: Receipt,
  harita: MapIcon,
  kalem: Percent,
  yuzde: Percent,
  kart: CreditCard,
  bina: Building2,
  saat: Clock,
  kutu: Package,
};

const EASE = [0.22, 1, 0.36, 1] as const;

export default function CountryFit({
  rows,
  country,
}: {
  rows: FitRow[];
  country: Country;
}) {
  const [i, setI] = useState(0);
  const row = rows[i];
  const name = COUNTRY_LABELS[country];
  /* where this answer points: here when it fits, the better country when it
     does not, and nowhere when there is no honest alternative */
  const dest: Country | null = row.ok ? country : (row.alt ?? null);

  return (
    <div className="cfit">
      <FadeUp delay={0.16}>
        <div className="cfit-chips" role="tablist" aria-label="Profil seçin">
          {rows.map((r, idx) => {
            const Ikon = CIP_IKON[r.ikon];
            return (
              <button
                key={r.profile}
                type="button"
                role="tab"
                aria-selected={i === idx}
                className="cfit-chip"
                data-on={i === idx || undefined}
                onClick={() => setI(idx)}
              >
                {/* aria-hidden ŞART: çip role="tab" ve erişilebilir adını
                    görünen metninden alıyor; glif oraya sızmamalı. Aynı tuzak
                    FitTest.tsx'te de yazılı. */}
                <Ikon className="cfit-chip-i" size={16} strokeWidth={1.9} aria-hidden="true" />
                {r.profile}
              </button>
            );
          })}
        </div>
      </FadeUp>

      <FadeUp delay={0.22}>
        <div className="cfit-panel">
          <AnimatePresence mode="wait">
            <motion.div
              key={row.profile}
              className="cfit-body"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: EASE }}
            >
              <div className="cfit-main">
                {/* 23.09.2026 · üçüncü hâl "şartla uygun" (FitRow.sart). Karar
                    rengi mavi kalıyor (uygun), şart ayrı kutuda ve kararın
                    hemen altında: okuyan şartı atlayamasın. */}
                <p className="cfit-verdict">
                  {row.you}{" "}
                  <b data-ok={row.ok || undefined}>
                    {row.ok
                      ? row.sart
                        ? `${name} şartla uygun.`
                        : `${name} doğru yer.`
                      : `${name}'yi önermiyoruz.`}
                  </b>
                </p>
                <p className="cfit-why">{row.why}</p>
                {row.sart && (
                  <p className="cfit-sart">
                    <b>Şart</b>
                    {row.sart}
                  </p>
                )}
              </div>

              {/* 25.09.2026 · HEDEF KUTUSUNDA HEDEF ÜLKENİN FOTOĞRAFI. Burak:
                  "Dubai sayfasının içine bir yerlere koyabiliriz … orada hiç
                  görsel yok." Kutu nav'daki ülke kartıyla aynı işi yapıyor (bir
                  ülkeye yönlendiriyor), kalıbı da o: fotoğraf + karartma +
                  üstünde beyaz yazı. Fotoğraf yönlendirdiği ülkenin
                  (COUNTRY_PHOTO, gözle doğrulanmış): uygunsa bu ülke,
                  önermiyorsak alternatif. Hedef yoksa (nötr) eski açık kutu. */}
              <aside className="cfit-dest" data-ok={row.ok || undefined} data-foto={dest ? "" : undefined}>
                {dest && (
                  <>
                    <span className="cfit-foto" aria-hidden="true">
                      <Image src={COUNTRY_PHOTO[dest]} alt="" fill sizes="(min-width: 1024px) 380px, 100vw" unoptimized />
                    </span>
                    <span className="cfit-perde" aria-hidden="true" />
                  </>
                )}
                <span className="cfit-dest-h">
                  {row.ok ? "Buradan devam edin" : dest ? "Bunun yerine" : "Emin değilseniz"}
                </span>

                {dest ? (
                  <>
                    <span className="cfit-dest-c">
                      <span className="cfit-flag" aria-hidden="true">
                        <Flag country={dest} />
                      </span>
                      {COUNTRY_LABELS[dest]}
                    </span>
                    {/* KKTC'nin fiyatı ve süresi henüz netleşmedi (FACTS.kktc
                        temsilî, fiyat üç pakete geçecek): o ülkede basılmıyor. */}
                    {dest !== "kktc" && (
                      <span className="cfit-dest-m">
                        {FACTS[dest].fromLabel}&apos;dan · {FACTS[dest].days}
                      </span>
                    )}
                    <SmartLink href={row.ok ? "/basla" : `/${dest}`} className="btn btn-solid">
                      {row.ok ? "Kurulumu başlat" : `${COUNTRY_LABELS[dest]} sayfasına git`}
                      <ArrowRight size={15} strokeWidth={2.1} />
                    </SmartLink>
                  </>
                ) : (
                  <>
                    <span className="cfit-dest-m cfit-dest-m-alone">
                      Bu profilde üç ülkeden birini önermek doğru olmaz. Testi çözün,
                      sonucu birlikte konuşalım.
                    </span>
                    <SmartLink href="/uygunluk-testi" className="btn btn-solid">
                      Uygunluk testini çözün
                      <ArrowRight size={15} strokeWidth={2.1} />
                    </SmartLink>
                  </>
                )}
              </aside>
            </motion.div>
          </AnimatePresence>
        </div>
      </FadeUp>
    </div>
  );
}
