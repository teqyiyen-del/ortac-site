"use client";

/* ANA SAYFA GİRİŞİ · "AKIŞ" (03.10.2026 · /lab/hero-kurumsal E3 canlıya alındı).
   Ad alanı .hak- (css/hero-akis.css; yalnız bu bileşenin olduğu rotada yüklenir).

   NEDEN DEĞİŞTİ. Murat Bey (ChatGPT sohbeti, Burak iletti): ORTAC bir "şirket
   kurma" firması değil; 1996'dan beri çalışan bir muhasebe, vergi ve
   kurumsal danışmanlık firması, şirket kuruluşu hizmetlerden biri. Eski
   giriş (components/Hero.tsx) bunu tersine kuruyordu: "Şirketinizi kuruyor,
   süreçlerinizi yönetiyoruz" başlığı, ana düğme "Kurulumu Başlat", "hangi
   ülke?" diye sorulan üç bayrak.

   KARAR YOLU (lab, dört tur): K1-K3 "fena kötü, %100 yükseklik, daha
   enerjik" → E1-E4 → dil turu ("tek masada", "kuruluş", "gerisi bizde" gibi
   işlem dili yok; vizyon ve kurum). Müşteri E3 için: "mantık olarak çok
   güzel, bildirim örnekleri de güzel; yukarıya doğru değişerek notification
   gibi olursa daha yenilikçi." Burak: "bildirimlere göre arka plan da
   değişsin … E3 güzel oldu, ana sayfaya alabilirsin."

   SAHNE. Tam ekran (100svh) fotoğraf; solda firma cümlesi, sağda işin
   kendisi: bildirimler alttan girip yukarı akıyor (en yenisi altta, mavi
   çerçeveli) ve arka plan bildirimin geçtiği şehre dönüyor. Başlık Murat
   Bey'in sohbetindeki öneri. Ana düğme "Uzmanlık alanlarımız" (hizmetler
   bölümü); "Kurulumu Başlat" menüde duruyor.

   BİLDİRİMLER TEMSİLÎ. Sitede zaten anlatılan işler (beyan, tescil, banka,
   Serbest Liman); müşteri adı, tutar, tarih yok. Liste dekoratif, ekran
   okuyucudan gizli.

   CANLIYA ALIRKEN LAB'DAN FARKLAR
     · İlk boyamada yalnız İLK fotoğraf iniyor; öteki iki şehir bileşen
       oturduktan sonra yükleniyor (üç tam ekran kare birden inmesin).
     · Giriş ekranda değilken sayaç duruyor (aşağıda gezerken boşa dönmesin).
     · Başlık ve bloklar sitenin `ilk` girişiyle geliyor (SplitWords ·
       FadeUp): CSS animasyonu, JavaScript'i beklemiyor.
     · Düğmelerin ölçüm olayları eski girişle aynı ad ve yerde.
     · Yakınlaşma (Ken Burns) yok: "ona gerek yok". Hareket azaltmada akış
       ve fotoğraf değişimi hiç başlamıyor, ilk kare duruyor. */

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  CalendarCheck,
  Check,
  FileCheck,
  Landmark,
  ReceiptText,
  ScrollText,
  type LucideIcon,
} from "lucide-react";
import SmartLink from "@/components/shared/SmartLink";
import SplitWords from "@/components/shared/SplitWords";
import FadeUp from "@/components/shared/FadeUp";
import { gtm } from "@/lib/gtm";
import { COUNTRY_PHOTO } from "@/lib/media";
import HeroPartners from "@/components/home/HeroPartners";
import { useCeviri } from "@/lib/i18n/useDil";
import { yerelAdres } from "@/lib/i18n/cevir";
import { EN_HERO } from "@/lib/en/heroAkis";
import "@/app/css/hero-akis.css";

const EASE = [0.22, 1, 0.36, 1] as const;
/** bir bildirimin ekranda yeni kaldığı süre */
const ADIM_MS = 2800;

export type Olay = {
  Icon: LucideIcon;
  /** renk kuralı: vergi amber, para yeşil, kalanlar mavi */
  ton: "amber" | "yesil" | "mavi";
  t: string;
  s: string;
  /** bildirimin geçtiği şehrin fotoğrafı; arka plan buna dönüyor */
  foto: string;
};

/* Sıra bilerek böyle: aynı şehir art arda gelmiyor, yani her bildirimde arka
   plan değişiyor. */
export const OLAY: Olay[] = [
  { Icon: ReceiptText, ton: "amber", t: "KDV beyanı gönderildi", s: "Dubai · dönem kapanışı", foto: COUNTRY_PHOTO.dubai },
  { Icon: ScrollText, ton: "mavi", t: "Tescil tamamlandı", s: "Londra · Companies House", foto: COUNTRY_PHOTO.ingiltere },
  { Icon: FileCheck, ton: "mavi", t: "Serbest Liman onayı geldi", s: "KKTC · kuruluş", foto: COUNTRY_PHOTO.kktc },
  { Icon: Landmark, ton: "yesil", t: "Kurumsal hesap açıldı", s: "Dubai · banka dosyası", foto: COUNTRY_PHOTO.dubai },
  { Icon: CalendarCheck, ton: "amber", t: "Yıllık hesaplar teslim", s: "Londra · mali yıl sonu", foto: COUNTRY_PHOTO.ingiltere },
];
/* arka plan kareleri: aynı şehir iki olayda geçiyor, kare bir kez basılıyor */
const KARE = [...new Set(OLAY.map((o) => o.foto))];

/* `partners`: ortak şeridi girişin hemen altında, eski Hero'daki gibi BU
   bileşenin içinden basılıyor. Sunucu sayfasından ayrı basınca şeridin
   bütün logo yolları hem HTML'e hem sayfanın veri yüküne giriyordu (ana
   sayfa HTML'i 54 → 72 KB sıkıştırılmış; ölçüldü, 03.10.2026). */
export default function HeroAkis({ partners = true }: { partners?: boolean }) {
  /* 10.10.2026 · İngilizce deneme (/en): metin lib/en/heroAkis sözlüğünden,
     Türkçe sayfada `c` cümleyi aynen geri veriyor (lib/i18n/cevir). */
  const { dil, c } = useCeviri(EN_HERO);
  const reduce = useReducedMotion();
  const kok = useRef<HTMLElement>(null);
  const gorunur = useInView(kok, { amount: 0.25 });
  const [i, setI] = useState(0);
  /* öteki şehirlerin fotoğrafı: ilk boyamadan sonra, akış başlamadan önce */
  const [hepsi, setHepsi] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const t = window.setTimeout(() => setHepsi(true), 1200);
    return () => window.clearTimeout(t);
  }, [reduce]);

  useEffect(() => {
    if (reduce || !gorunur) return;
    const t = window.setInterval(() => setI((v) => (v + 1) % OLAY.length), ADIM_MS);
    return () => window.clearInterval(t);
  }, [reduce, gorunur]);

  /* Bildirim akışı: son üç olay, EN YENİSİ ALTTA. Yenisi alttan giriyor,
     öncekiler bir sıra yukarı kayıp soluyor, en eski üstten çıkıyor. */
  const gorunen = [2, 1, 0].map((k) => OLAY[(i - k + OLAY.length * 2) % OLAY.length]);
  const kare = KARE.indexOf(OLAY[i].foto);

  return (
    <>
    <section ref={kok} className="hak">
      <div className="hak-arka" aria-hidden="true">
        {KARE.map((foto, k) =>
          k === 0 || hepsi ? (
            <div key={foto} className="hak-kare" data-on={k === kare || undefined}>
              {/* `priority` YOK ve bilerek: önyüklenen tam ekran fotoğraf stil
                  dosyasıyla aynı anda inip ilk boyamayı geciktiriyordu
                  (telefon, 1,6 Mbps: 2,4 → 2,85 sn; ölçüldü). Sayfanın en
                  büyük öğesi zaten başlık (Chrome tam ekran görseli zemin
                  sayıp LCP'ye almıyor), yani fotoğrafın erken inmesi bir
                  şey kazandırmıyor. Tembel yüklemede görsel, stil gelip
                  yerleşim kurulunca isteniyor: önce yazı, sonra fotoğraf. */}
              <Image src={foto} alt="" fill sizes="100vw" className="hak-img" />
            </div>
          ) : null,
        )}
      </div>
      <div className="hak-perde" aria-hidden="true" />

      <div className="container-o hak-icerik">
        <div>
          <FadeUp delay={0.05} y={14} ilk>
            <p className="hak-ust">
              {/* telefonda yalnız "1996'dan beri" kalıyor (css/mobil-deneme.css):
                  Burak, 09.10.2026: "mobilde ana sayfa herosu kalabalık" */}
              {dil === "en" ? (
                <>
                  Since <b>1996</b>
                  <span className="hak-ust-ek"> · Accounting · Tax · Corporate advisory</span>
                </>
              ) : (
                <>
                  <b>1996</b>&apos;dan beri<span className="hak-ust-ek"> · Muhasebe · Vergi · Kurumsal danışmanlık</span>
                </>
              )}
            </p>
          </FadeUp>
          {/* accent, metnin içinde birebir geçmek zorunda (SplitWords tuzağı:
              eşleşmezse vurgu sessizce basılmıyor) */}
          <SplitWords
            as="h1"
            text={c("İş dünyası değişiyor. Sizi geleceğe hazırlıyoruz.")}
            accent={c("Sizi geleceğe hazırlıyoruz.")}
            accentColor="var(--blue-500)"
            base={0.12}
            className="hak-h1"
            style={{ color: "#ffffff" }}
            ilk
          />
          <FadeUp delay={0.3} ilk>
            <p className="hak-alt">{c("30 yıllık deneyim, Dubai, Londra ve KKTC'de uluslararası uzmanlıkla.")}</p>
          </FadeUp>
          <FadeUp delay={0.38} ilk>
            <div className="hak-cta">
              <SmartLink href={yerelAdres(dil, "/#hizmetler")} className="hak-btn hak-btn-mavi" onClick={() => gtm("hero_cta_click")}>
                {c("Uzmanlık alanlarımız")}
                <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
              </SmartLink>
              <SmartLink
                href="/iletisim"
                className="hak-btn hak-btn-cizgi"
                onClick={() => gtm("cta_meeting_click", { placement: "hero" })}
              >
                {c("Bizimle iletişime geçin")}
              </SmartLink>
            </div>
          </FadeUp>
        </div>

        <FadeUp delay={0.46} ilk>
          <ul className="hak-akis" aria-hidden="true">
            <AnimatePresence initial={false} mode="popLayout">
              {gorunen.map((o, k) => (
                <motion.li
                  key={o.t}
                  layout={!reduce}
                  className="hak-kart"
                  data-k={k}
                  initial={reduce ? false : { opacity: 0, y: 36, scale: 0.96 }}
                  animate={{ opacity: k === 0 ? 0.4 : k === 1 ? 0.8 : 1, y: 0, scale: 1 }}
                  exit={reduce ? undefined : { opacity: 0, y: -36 }}
                  transition={{ duration: 0.55, ease: EASE }}
                >
                  <span className="hak-ic" data-ton={o.ton}>
                    <o.Icon size={18} strokeWidth={2} />
                  </span>
                  <span>
                    <b>{c(o.t)}</b>
                    <em>{c(o.s)}</em>
                  </span>
                  <span className="hak-tik">
                    <Check size={14} strokeWidth={2.4} />
                  </span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </FadeUp>
      </div>
    </section>
    {partners && <HeroPartners dil={dil} />}
    </>
  );
}
