import Image from "next/image";
import { ChevronRight } from "lucide-react";
import SmartLink from "@/components/shared/SmartLink";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { HERO, OPENING } from "@/lib/about";
import { TEAM_PHOTO } from "@/lib/media";

/* ADAY · KULE — /hakkimizda giriş şeridi. Biçim: src/app/css/lab-hkapak-d.css · .hkd-

   ÜÇ TUR ÜST ÜSTE REDDEDİLDİ ve müşterinin şikâyeti her turda aynı yöne
   işaret etti: karmaşıklık. Bu aday bilerek şeridin en sade hâli — kompozisyonda
   TEK bir eksen var (dikey orta çizgi) ve tek bir değişken var (blokların
   genişliği). Dar hero · geniş görsel · orta metin · geniş taban. Ritim budur;
   başka bir yerleşim hilesi yok.

   MÜŞTERİNİN BEŞ MADDESİ, BURADA NASIL KARŞILANDI
   1 · Görsel büyük ve yuvarlak köşeli: sütunun EN GENİŞ nesnesi (kabın tamamı,
       masaüstünde 1136 px) ve 16/9 ile 639 px boyunda. Yarıçap 32 px.
   2 · Opaklık oyunu yok: kare tam opak basılıyor. mask-image yok, sönen gradyan
       yok, yarı saydam perde yok, opacity geçişi yok, kare üstünde hover
       yakınlaşması bile yok. Kırpma yalnız `overflow: hidden` ile yuvarlak
       köşeden ibaret.
   3 · Arka planda değil: kendi satırında duran bir nesne. Arkasında metin yok,
       üstünde katman yok; gece zemin karenin ARKASINDA değil, YANINDA.
   4 · "Kim olduğumuz" tek akış: iki paragraf alt alta, aynı sütunda, aynı
       hizada. Sola-sağa dağıtılmış tek bir kelime yok; şeritte iki sütunlu
       gövde metni hiç yok.
   5 · Vizyon ve misyonda mavi: bu iki blok artık düz gecede değil, kulenin
       MAVİ TABANINDA (--blue-900 #1b56a8, tam genişlik bant). Beyaz metin o
       zeminde 7,14:1 — küçük punto eşiği 4,5, rahat geçiyor. Etiketler
       --blue-100 (#e8f1fd), aynı zeminde 6,26:1. Marka mavisi #307fe2 ZEMİN
       OLARAK KULLANILMADI: beyazla 3,99:1 verir ve düşerdi.

   NEDEN TEK ZEMİN (gece): şerit üç ayrı ekran değil tek bir kule. Hero ile
   gövde arasında zemin değişseydi ortada bir dikiş belirir, "bölüm bitti yenisi
   başladı" hissi kurulur ve kule iki parçaya ayrılırdı. Zemin bir kez, en altta
   değişiyor — orası kulenin oturduğu yer ve müşterinin mavi istediği yer.

   METİN ORTALI: sütun ortalıyken paragrafı sola yaslamak kompozisyona hiçbir
   şeyin hizalanmadığı ikinci bir dikey çizgi sokuyor. İki paragraf da kısa
   (215 ve 147 karakter) ve satır uzunluğu 56ch ile sınırlı, yani ortalı akış
   okunurluğu düşürmüyor. 720 pikselin altında yine de sola yaslanıyor: dar
   ekranda satır zaten kısa, ortalama orada tırtıklı bir sağ kenar bırakıyor.

   ------------------------------------------------------ EKRANA BASILAN METİN
   Hepsi about.ts'ten, tek kelimesi değişmeden: HERO.title · HERO.accent ·
   HERO.lead · OPENING.heading · OPENING.accent · OPENING.lead · OPENING.body
   (iki paragraf) · OPENING.vision · OPENING.mission. Yeni cümle yazılmadı.
   Fotoğrafın altında künye YOK (müşteri sildirdi) ve vizyon/misyonun altında
   "resmî ifadesi" notu YOK — ikisi de bilerek. Vizyon ve misyon firmanın kendi
   resmî ifadesi, tek harfi değişmez.

   HAREKET (tamamı CSS'te, tamamı reduce kapısının arkasında · tuzak A):
     25,999 s  kulenin omurgasından inen mavi ışık   (.hkd-drop, üç segment)
     35,023 s  mavi tabanın su çizgisinde giden ışık (.hkd-tide)
   İkisi de asal, birbirleriyle ve sitede kullanılan otuz bir periyodun hepsiyle
   aralarında asal (tuzak K). `animation-direction: alternate` yok, gecikme
   kısayolun içinde bir değişkenle veriliyor (tuzak F). */

/* Ekranda üç yerde omurga segmenti var ve üçü aynı animasyonu farklı fazda
   çalıştırıyor: ışık kulede yukarıdan aşağı iniyor. Gecikme burada değil
   CSS'te (.hkd-spine-2 / -3), çünkü değer bir ZAMANLAMA kararı ve periyotla
   birlikte tek yerde durması gerekiyor. */
const AIMS = [OPENING.vision, OPENING.mission];

export default function AboutKapakKule() {
  return (
    <>
      {/* ================= 1 · HERO · DAR =================
          Zemin PageHero'nun kompakt dalı (.phg + .phg-bg). `.ph` sınıfı
          bilerek basılmıyor: globals.css'teki `.ph { padding }` kuralı
          @import'lardan SONRA geldiği için aynı özgüllükteki dolguyu yenerdi.
          Üst dolgu .ph ile aynı (132 / 156) çünkü .phg glow kalibrasyonu
          ölçülen h1 üst kenarına bağlı ve o kenar kaymamalı.

          Glow'un YATAY yeri bu adayda %50'ye çekildi (varsayılan masaüstünde
          %42). Sebep: sitenin bütün hero'ları sola yaslı, bu şerit ortalı;
          ışık %42'de kalsaydı kulenin ekseniyle başlığın ekseni ayrışırdı.
          Ayrıntı CSS'te. */}
      <section className="hkd-hero phg">
        <div className="phg-bg" aria-hidden="true">
          <div className="phg-grid" />
          <div className="phg-glow" />
        </div>

        <div className="container-o">
          <nav className="ph-crumb hkd-crumb" aria-label="Konum">
            <SmartLink href="/">Ana sayfa</SmartLink>
            <ChevronRight size={14} strokeWidth={2} aria-hidden="true" />
            <span>{HERO.crumb}</span>
          </nav>

          <SplitWords
            as="h1"
            text={HERO.title}
            accent={HERO.accent}
            accentColor="var(--blue-500)"
            base={0.08}
            className="hkd-h1"
          />

          <FadeUp delay={0.24}>
            <p className="hkd-lead">{HERO.lead}</p>
          </FadeUp>
        </div>
      </section>

      {/* ================= 2 · GÖVDE · GENİŞ, SONRA ORTA =================
          Hero ile aynı gece zeminde: iki <section> arasındaki sınır görünmüyor,
          kule kesintisiz iniyor. */}
      <section className="hkd-body">
        <div className="container-o">
          {/* Omurga · 1. segment. Dekoratif; ekran okuyucuya çıkmıyor. */}
          <span className="hkd-spine" aria-hidden="true">
            <i className="hkd-drop" />
          </span>

          {/* ---- GÖRSEL ----
              <figure> DEĞİL düz kap: künye yazılmıyor (müşteri "Fotoğraf
              temsilî…" satırını sildirdi) ve künyesiz bir <figure>
              erişilebilirlik ağacında adsız bir grup bırakırdı. Kare alt=""
              ile DEKORATİF basılıyor — sayfanın hiçbir iddiası ona dayanmıyor.
              unoptimized: next.config.ts'te remotePatterns tanımlı değil,
              sitedeki bütün uzak görseller böyle basılıyor.
              SWAP:TEAM_PHOTO yer tutucusu, gerçek ekip çekimiyle değişecek
              (media.ts · TEAM_PHOTO). */}
          <FadeUp y={30}>
            <div className="hkd-shot">
              <Image
                src={TEAM_PHOTO}
                alt=""
                fill
                sizes="(min-width: 1264px) 1136px, (min-width: 1024px) calc(100vw - 64px), calc(100vw - 40px)"
                className="hkd-img"
                unoptimized
              />
            </div>
          </FadeUp>

          {/* Omurga · 2. segment */}
          <span className="hkd-spine hkd-spine-2" aria-hidden="true">
            <i className="hkd-drop" />
          </span>

          {/* ---- KİM OLDUĞUMUZ · TEK AKIŞ ----
              Üç kademe, aynı sütunda, aynı eksende: başlık · tanım cümlesi ·
              iki paragraf. Sütun bölme yok. */}
          <div className="hkd-say">
            <SplitWords
              as="h2"
              text={OPENING.heading}
              accent={OPENING.accent}
              accentColor="var(--blue-500)"
              className="hkd-k"
            />

            <FadeUp delay={0.08}>
              <p className="hkd-say-lead">{OPENING.lead}</p>
            </FadeUp>

            {/* Tek FadeUp, tek kap: iki paragraf ayrı ayrı yükselseydi
                "bir akış" değil iki blok olurlardı. */}
            <FadeUp delay={0.16}>
              <div className="hkd-flow">
                {OPENING.body.map((p) => (
                  <p key={p.slice(0, 24)} className="hkd-p">
                    {p}
                  </p>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* Omurga · 3. segment. Işık buradan mavi tabana düşüyor. */}
          <span className="hkd-spine hkd-spine-3" aria-hidden="true">
            <i className="hkd-drop" />
          </span>
        </div>
      </section>

      {/* ================= 3 · TABAN · GENİŞ, MAVİ =================
          Kutu DEĞİL zemin: tam genişlik bant, yarıçap yok, gölge yok, kenarlık
          yok. Müşterinin "şu vizyon misyon kısımlarına biraz daha mavilik"
          isteği burada karşılanıyor — mavi bir çizgiyle değil, blokların
          üstünde durduğu yüzeyle. */}
      <section className="hkd-base">
        <span className="hkd-tide" aria-hidden="true" />

        <div className="container-o">
          <FadeUp y={26}>
            <div className="hkd-aims">
              <article className="hkd-aim">
                <h3 className="hkd-aim-t">{AIMS[0].t}</h3>
                <p className="hkd-aim-s">{AIMS[0].s}</p>
              </article>

              {/* Ayırıcı ızgaranın kendi hücresi (masaüstünde 1px'lik sabit
                  sütun, telefonda tam genişlik satır). Dekoratif. */}
              <span className="hkd-div" aria-hidden="true" />

              <article className="hkd-aim">
                <h3 className="hkd-aim-t">{AIMS[1].t}</h3>
                <p className="hkd-aim-s">{AIMS[1].s}</p>
              </article>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
