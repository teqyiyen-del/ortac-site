"use client";

/* DUBAİ SAYFASI GİRİŞİ · CANLI · ad alanı .dhr- (css/dubai-hero.css)

   SAHNE. Beyaz zemin; solda başlık, açıklama, "…'den başlayan" satırı ve
   düğmeler; sağda Dubai fotoğrafı. Fotoğrafın dibinde iki cam parça yan
   yana: solda ticaret lisansı kartı ("işin sonunda elinizde olan"), sağında
   üç rozet (üç teyitli olgu).

   KARAR YOLU
   05.10.2026 · /lab/hizmet-hero: siyah giriş yerine beyaz zemin + fotoğraf
     (Burak: "arka plan beyaz kalır, solda yazılarımız, sağ taraf görsel").
     S6 seçildi: fotoğrafın üstünde aşama kartı (çizim, ad, numaralı çubuk).
   06.10.2026 · S6 canlıya alındı.
   07.10.2026 · /lab/dubai-hero-kart, dört tur. Burak: "illa aşamaları
     anlatacak bir şeyler koymak zorunda değiliz; estetik olsun yeter."
       K1-K3 (aşama kartının üç biçimi): elendi.
       F1 dağınık rozetler · F2 eğik lisans kartı · F3 sade: "lisans
         mantıklı ama eğik olmasın; rozetler mantıklı ama dağınık; sade hiç
         okey değil."
       G1 sırayla değişen belge kartı · G2 derli rozetler: "G2 bir tık daha
         iyi … G2 ile G1'i kombine etsek? G1'den ticaret lisansını çekeriz,
         işin sonunda buna sahip oluyorsun gibi."
       G3 karma: seçim Burak tarafından bana bırakıldı ("ya G3'ü seç ya
         G2'yi … inisiyatif senin"); G3 canlıda. Gerekçe: lisans kartı sonucu,
         rozetler nedeni söylüyor; G2 tek başına fotoğrafın dibinde boş
         kalıyordu.
   Aşama kartı (S6) ve öteki adaylar silindi; git geçmişinde duruyor.

   ROZETLERDEKİ ÜÇ OLGU teyitli: %100 yabancı sahiplik (teklif PDF'i,
   06.10.2026), 5-6 günde kuruluş (teyit · Dubai kuruluş 1), 375.000 AED'ye
   kadar %0 (teyit · Dubai kuruluş 3). Lisans kartı süs: satırları yer tutucu
   çubuk, ekran okuyucudan gizli.

   Hareket yok (iki parça sabit). İstemci bileşeni olmasının tek sebebi
   düğmelerin ölçüm olayları (eski girişle aynı ad ve yerde). YALNIZ DUBAİ;
   İngiltere, KKTC ve hizmet sayfaları eski girişte (PageHero), aynı kalıba
   geçecekler (her ülke için üç teyitli olgu ve fotoğraf gerekiyor). Menü bu
   girişin üstünde açık zeminde koyu yazıyla (kural CSS dosyasında). */

import Image from "next/image";
import { ArrowRight, BadgeCheck, ChevronRight, Info, MapPin, Percent, Timer } from "lucide-react";
import SmartLink from "@/components/shared/SmartLink";
import { FACTS } from "@/lib/brand";
import { COUNTRY_PHOTO } from "@/lib/media";
import { DUBAI_BASLANGIC, money } from "@/lib/dubaiFiyat";
import { gtm } from "@/lib/gtm";
import "@/app/css/dubai-hero.css";

export default function DubaiHero({ lead }: { lead: string }) {
  return (
    <section className="dhr">
      <div className="container-o dhr-grid">
        <div className="dhr-sol">
          <nav className="dhr-iz" aria-label="Sayfa yolu">
            <SmartLink href="/">Ana sayfa</SmartLink>
            <ChevronRight size={14} strokeWidth={2} aria-hidden="true" />
            <span>Ülkeler · Dubai</span>
          </nav>
          <h1 className="dhr-h1">
            Dubai&apos;de <span>şirket kurmak.</span>
          </h1>
          <p className="dhr-lead">{lead}</p>
          <p className="dhr-fiyat">
            <b>{money(DUBAI_BASLANGIC)}</b>&apos;den başlayan fiyatlarla
          </p>
          <div className="dhr-cta">
            <SmartLink
              href="/basla"
              className="dhr-btn dhr-btn-mavi"
              onClick={() => gtm("cta_start_click", { placement: "page_hero", country: "dubai" })}
            >
              Hemen Başla
              <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </SmartLink>
            <a
              href="#fiyat"
              className="dhr-btn dhr-btn-cizgi"
              onClick={() => gtm("cta_pricing_click", { placement: "page_hero", country: "dubai" })}
            >
              Fiyatları Gör
            </a>
          </div>
          <ul className="dhr-guven">
            <li>
              <MapPin size={15} strokeWidth={2} aria-hidden="true" />
              Kendi ofisimizden, Türkçe yürütülür.
            </li>
            <li>
              <Info size={15} strokeWidth={2} aria-hidden="true" />
              {FACTS.dubai.limit}
            </li>
          </ul>
        </div>

        <div className="dhr-foto">
          <Image
            src={COUNTRY_PHOTO.dubai}
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="dhr-img"
          />
          <div className="dhr-karma">
            <div className="dhr-belge" aria-hidden="true">
              <div className="dhr-belge-ust">
                <span className="dhr-belge-t">Ticaret lisansı</span>
                <span className="dhr-belge-muhur">
                  <BadgeCheck size={20} strokeWidth={2} />
                </span>
              </div>
              <span className="dhr-belge-ad" />
              <span className="dhr-belge-s" />
              <span className="dhr-belge-s" data-kisa="" />
              <div className="dhr-belge-alt">
                <span>Serbest bölge</span>
              </div>
            </div>

            <ul className="dhr-rozetler" aria-label="Dubai'de şirket: üç olgu">
              <li>
                <span className="dhr-rozet-ic" aria-hidden="true">
                  <BadgeCheck size={18} strokeWidth={2} />
                </span>
                <span>
                  <b>%100</b> yabancı sahiplik
                </span>
              </li>
              <li>
                <span className="dhr-rozet-ic" aria-hidden="true">
                  <Timer size={18} strokeWidth={2} />
                </span>
                <span>
                  <b>5-6 günde</b> kuruluş
                </span>
              </li>
              <li>
                <span className="dhr-rozet-ic" data-ton="amber" aria-hidden="true">
                  <Percent size={18} strokeWidth={2} />
                </span>
                <span>
                  375.000 AED&apos;ye kadar <b>%0</b>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
