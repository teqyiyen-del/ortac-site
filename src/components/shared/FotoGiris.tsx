"use client";

/* FOTO GİRİŞ · ülke ve hizmet sayfalarının ortak girişi (07.10.2026)
   Ad alanı .dhr- (css/dubai-hero.css; ad Dubai'den kaldı, dosya ortak).

   NEREDEN GELDİ. Dubai ülke sayfasında dört lab turundan sonra seçilen giriş
   (bkz. docs/durum.md · 05-07.10.2026): beyaz zemin, solda yazı ve düğmeler,
   sağda fotoğraf; fotoğrafın dibinde iki cam parça yan yana: solda bir belge
   kartı ("işin sonunda elinizde olan"), sağında üç rozet (üç kısa olgu).
   Burak (07.10.2026): "bunu böyle seçtiysen şimdi git diğer sayfalara da
   yap; muhasebe, banka … siyah olan hero'lar var ya, onları al çek buna."

   KİM ÇAĞIRIYOR. Yalnız PageHero (ülke dalı ve "art" dalı); sayfalar eskisi
   gibi PageHero çağırıyor. İkonlar çizilmiş düğüm olarak geliyor (sunucu
   sayfasından bileşen geçemez). Belge kartı süs: satırları yer tutucu çubuk,
   ekran okuyucudan gizli. Hareket yok. */

import Image from "next/image";
import { BadgeCheck, ChevronRight } from "lucide-react";
import SmartLink from "@/components/shared/SmartLink";
import "@/app/css/dubai-hero.css";

export type FotoRozet = { icon: React.ReactNode; ton?: "amber"; metin: React.ReactNode };

export default function FotoGiris({
  iz,
  baslik,
  vurgu,
  lead,
  fiyat,
  dugmeler,
  guven,
  foto,
  belge,
  rozetler,
}: {
  /** kırıntının son parçası: "Ülkeler · Dubai" */
  iz: React.ReactNode;
  baslik: string;
  /** başlığın mavi parçası; sondaysa alt satıra iner, ortadaysa yerinde kalır */
  vurgu?: string;
  lead: string;
  /** düğmelerin üstündeki "…'den başlayan" satırı (yalnız fiyatı net sayfada) */
  fiyat?: React.ReactNode;
  dugmeler?: React.ReactNode;
  guven?: { icon: React.ReactNode; line: string }[];
  foto: string;
  belge: { ad: string; cip: string };
  rozetler: FotoRozet[];
}) {
  /* vurgu başlığın sonundaysa kendi satırına iner (ülke sayfaları); ortasındaysa
     yerinde, yalnız rengi değişir ("Dubai'de banka hesabı ve ödeme altyapısı.") */
  const sonda = !!vurgu && baslik.endsWith(vurgu);
  const yer = vurgu ? baslik.indexOf(vurgu) : -1;
  return (
    <section className="dhr">
      <div className="container-o dhr-grid">
        <div className="dhr-sol">
          <nav className="dhr-iz" aria-label="Sayfa yolu">
            <SmartLink href="/">Ana sayfa</SmartLink>
            <ChevronRight size={14} strokeWidth={2} aria-hidden="true" />
            <span>{iz}</span>
          </nav>
          <h1 className="dhr-h1">
            {vurgu && yer >= 0 ? (
              <>
                {baslik.slice(0, yer)}
                <span data-ic={sonda ? undefined : ""}>{vurgu}</span>
                {baslik.slice(yer + vurgu.length)}
              </>
            ) : (
              baslik
            )}
          </h1>
          <p className="dhr-lead">{lead}</p>
          {fiyat && <p className="dhr-fiyat">{fiyat}</p>}
          {dugmeler && <div className="dhr-cta">{dugmeler}</div>}
          {guven && guven.length > 0 && (
            <ul className="dhr-guven">
              {guven.map((g) => (
                <li key={g.line}>
                  {g.icon}
                  {g.line}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="dhr-foto">
          <Image src={foto} alt="" fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="dhr-img" />
          <div className="dhr-karma">
            <div className="dhr-belge" aria-hidden="true">
              <div className="dhr-belge-ust">
                <span className="dhr-belge-t">{belge.ad}</span>
                <span className="dhr-belge-muhur">
                  <BadgeCheck size={20} strokeWidth={2} />
                </span>
              </div>
              <span className="dhr-belge-ad" />
              <span className="dhr-belge-s" />
              <span className="dhr-belge-s" data-kisa="" />
              <div className="dhr-belge-alt">
                <span>{belge.cip}</span>
              </div>
            </div>

            <ul className="dhr-rozetler">
              {rozetler.map((r, i) => (
                <li key={i}>
                  <span className="dhr-rozet-ic" data-ton={r.ton} aria-hidden="true">
                    {r.icon}
                  </span>
                  <span>{r.metin}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
