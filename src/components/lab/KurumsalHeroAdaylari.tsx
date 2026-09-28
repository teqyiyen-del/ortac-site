/* LAB · /lab/hero-kurumsal — ana sayfa girişi için üç aday (28.09.2026).

   Murat Bey'in yönü (ChatGPT sohbeti, Burak iletti): ORTAC bir "şirket
   kurma" firması değil; 1996'dan beri çalışan bir muhasebe, vergi ve
   kurumsal danışmanlık firması, şirket kuruluşu hizmetlerden biri.
   Bugünkü girişin üç parçası bu algıyı tersine kuruyor: "Şirketinizi
   kuruyor, süreçlerinizi yönetiyoruz" başlığı, ana düğme "Kurulumu Başlat"
   ve "hangi ülke?" diye sorulan üç bayrak. Üç adayın ortak kuralı:
     · başlık firmayı anlatıyor, işlemi değil;
     · ana düğme "Kurulumu Başlat" DEĞİL (o menüde ve Dubai sayfasında
       kalıyor), girişte hizmetler ve iletişim;
     · ülkeler "seçim" değil "ofislerimiz";
     · 1996 ilk ekranda (Burak: "doğrulanmış bilgi, onu sorgulama");
     · "Türkçe yürütülür" yok, vergi vaadi yok.

     K1 · Kurumsal cümle  gece zemin (bugünkü marka sürekliliği), solda
                          "Uluslararası işiniz için yerel uzmanlık", sağda
                          1996 ve üç ofis.
     K2 · Fotoğraf         açık dil, tam genişlik iş fotoğrafı üstünde
                          başlık, altında dört hizmet kutusu (dergi / rapor
                          hissi, Big Four sıralaması: önce kim, sonra ne).
     K3 · Öne çıkan yazı   EY'deki gibi giriş bir görüş yazısı; altında sabit
                          kurumsal şerit. Yazı bloğun GERÇEK son yazısı.

   Sınıflar .lhk- (css/lab-hero-kurumsal.css). Seçilen aday Hero.tsx'in
   yerine geçer; bu dosya ve CSS silinir. */

import Image from "next/image";
import {
  ArrowRight,
  Building2,
  CalendarCheck,
  Landmark,
  Scale,
} from "lucide-react";
import SmartLink from "@/components/shared/SmartLink";
import { Flag } from "@/components/shared/CountryPicker";
import { OFFICES } from "@/lib/offices";
import { PHOTO_KURUMSAL } from "@/lib/media";

const KURULUS = 1996;
const YIL = 2026 - KURULUS;

function Ofisler({ koyu }: { koyu?: boolean }) {
  return (
    <ul className="lhk-ofis" data-koyu={koyu || undefined}>
      {OFFICES.map((o) => (
        <li key={o.country}>
          <span className="lhk-flag" aria-hidden="true">
            <Flag country={o.country} />
          </span>
          <span>
            <b>{o.label}</b>
            {o.city && o.city !== o.label && <em>{o.city}</em>}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ================================================================ K1 */
export function HeroK1() {
  return (
    <section className="lhk-k1">
      <div className="container-o lhk-k1-grid">
        <div>
          <p className="lhk-kicker">Muhasebe · Vergi · Kurumsal danışmanlık</p>
          <h1 className="lhk-h1">
            Uluslararası işiniz için <span className="lhk-mavi">yerel uzmanlık.</span>
          </h1>
          <p className="lhk-lead">
            Dubai, İngiltere ve KKTC&apos;deki kendi ofislerimizden muhasebe, vergi, şirket kuruluşu
            ve kurumsal danışmanlık.
          </p>
          <div className="lhk-cta">
            <SmartLink href="/#hizmetler" className="lhk-btn lhk-btn-acik">
              Hizmetlerimizi keşfedin
              <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </SmartLink>
            <SmartLink href="/iletisim" className="lhk-btn lhk-btn-cizgi">
              Bizimle iletişime geçin
            </SmartLink>
          </div>
        </div>
        <aside className="lhk-k1-sag" aria-label="Ofislerimiz">
          <div className="lhk-yil">
            <b>{KURULUS}</b>
            <span>&apos;dan beri, {YIL} yıl</span>
          </div>
          <p className="lhk-sag-t">Ofislerimiz</p>
          <Ofisler koyu />
        </aside>
      </div>
    </section>
  );
}

/* ================================================================ K2 */
const HIZMET = [
  { ad: "Muhasebe ve vergi", l: "Defter, beyan ve takvim tek ekipte.", href: "/dubai/muhasebe", Icon: CalendarCheck, ton: "amber" },
  { ad: "Şirket kuruluşu", l: "Dubai, İngiltere ve KKTC'de.", href: "/ulkeler", Icon: Building2, ton: "mavi" },
  { ad: "Banka ve ödeme", l: "Kurumsal hesap ve tahsilat kanalları.", href: "/dubai/banka-hesabi", Icon: Landmark, ton: "yesil" },
  { ad: "Kurumsal danışmanlık", l: "Yapılanma kararları, baştan sona.", href: "/hakkimizda", Icon: Scale, ton: "mavi" },
] as const;

export function HeroK2() {
  return (
    <section className="lhk-k2">
      <div className="lhk-k2-foto">
        <Image src={PHOTO_KURUMSAL} alt="" fill priority sizes="100vw" className="lhk-k2-img" />
        <div className="container-o lhk-k2-m">
          <p className="lhk-kicker lhk-kicker-acik">{KURULUS}&apos;dan beri</p>
          <h1 className="lhk-h1 lhk-h1-acik">Muhasebe, vergi ve kurumsal danışmanlık.</h1>
          <p className="lhk-lead lhk-lead-acik">Dubai, İngiltere ve KKTC&apos;de, kendi ekiplerimizle.</p>
          <div className="lhk-cta">
            <SmartLink href="/iletisim" className="lhk-btn lhk-btn-acik">
              Bizimle iletişime geçin
              <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </SmartLink>
          </div>
        </div>
      </div>
      <div className="container-o">
        <ul className="lhk-k2-hiz">
          {HIZMET.map(({ ad, l, href, Icon, ton }) => (
            <li key={ad}>
              <SmartLink href={href} className="lhk-k2-kart">
                <span className="lhk-ic" data-ton={ton} aria-hidden="true">
                  <Icon size={18} strokeWidth={2} />
                </span>
                <b>{ad}</b>
                <span>{l}</span>
                <ArrowRight className="lhk-ok" size={16} strokeWidth={2.2} aria-hidden="true" />
              </SmartLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ================================================================ K3 */
export type OneCikan = { title: string; summary: string; href: string; cover: string; etiket: string };

export function HeroK3({ yazi }: { yazi: OneCikan | null }) {
  return (
    <section className="lhk-k3">
      <div className="container-o">
        {yazi && (
          <div className="lhk-k3-grid">
            <div>
              <p className="lhk-kicker lhk-kicker-mavi">Öne çıkan · {yazi.etiket}</p>
              <h1 className="lhk-h1 lhk-h1-k3">{yazi.title}</h1>
              <p className="lhk-lead lhk-lead-koyu">{yazi.summary}</p>
              <SmartLink href={yazi.href} className="lhk-btn lhk-btn-mavi">
                Yazıyı okuyun
                <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
              </SmartLink>
            </div>
            <div className="lhk-k3-kapak">
              <Image src={yazi.cover} alt="" fill priority sizes="(min-width: 1024px) 560px, 100vw" className="lhk-k2-img" />
            </div>
          </div>
        )}
        <div className="lhk-k3-serit">
          <p>
            <b>{YIL} yıllık deneyim.</b> Üç ülkede yerel uzmanlık, tek muhatap.
          </p>
          <Ofisler />
          <SmartLink href="/iletisim" className="lhk-btn lhk-btn-koyu">
            Bizimle iletişime geçin
          </SmartLink>
        </div>
      </div>
    </section>
  );
}
