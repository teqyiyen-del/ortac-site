import Image from "next/image";
import { ChevronRight } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import SmartLink from "@/components/shared/SmartLink";
import { TEAM_PHOTO } from "@/lib/media";
import { HERO, OPENING } from "@/lib/about";

/* ADAY · NEFES — /hakkimizda'nın İLK ŞERİDİ (hero + kim olduğumuz +
   vizyon/misyon), üç bölüm değil TEK ŞERİT.
   Biçim: src/app/css/lab-hserit-a.css · Ad alanı: .hza-

   ----------------------------------------------------------------- TEŞHİS
   Müşteri: "hero, biz kimiz, vizyon misyon kısımları kafamda oturmuyor."
   Canlıda bu üç parça üç ayrı KUTU: gece hero bloğu biter, beyaz bölüm
   kendi h2'siyle yeniden başlar, altında iki kart daha açılır. Yani okuyucu
   aynı iddiayı üç kez, üç ayrı çerçevede karşılıyor ve hiçbiri diğerinin
   devamı gibi durmuyor. Bu adayın tezi: kopukluk kutulardan geliyor, o
   yüzden kutuları kaldırıyoruz, cümleleri değil.

   ---------------------------------------------------------- TEK NEFES NASIL
   Şerit baştan sona TEK SÜTUN ve tek bir RAY üstünde asılı duruyor. Ray
   şeridin en tepesinde başlıyor, gecenin içinden geçiyor, fotoğrafın üstünden
   iniyor ve son cümlenin altında sönüyor. Hiçbir yerde kesilmiyor, hiçbir
   yerde ikinci bir çerçeve açılmıyor.

   Şeridi taşıyan asıl şey PUNTO EĞRİSİ, yani nefesin kendisi:

     66 px  soru        (h1)             nefes alma
     27 px  cevabı      (HERO.lead)
     15 px  "Kim olduğumuz" (rayda çentik)
     20 px  tanıtım     (OPENING.lead)
     16 px  iki paragraf                  en sessiz yer
     34 px  vizyon ve misyon              nefes verme

   Vizyon ve misyon burada KART DEĞİL. Kutuları, kuyulu ikonları ve gövde
   puntosu kalktı; ikisi de şeridin doğal sonu ve sayfanın en büyük iki
   cümlesi oldu. Tek harfleri değişmedi.

   "Kim olduğumuz" başlığı da bilerek büyük basılmıyor: ortada bir h2 daha
   olsaydı şerit yine ikiye bölünürdü. Rayın üstünde bir çentik olarak
   duruyor, ekran okuyucuda h2 olarak kalıyor.

   -------------------------------------------------- FOTOĞRAF: ŞERİDİN DİKİŞİ
   Kare gecenin bittiği yerde değil, bittiği YER OLARAK duruyor: gece
   fotoğrafın içinde çözülüyor, fotoğraf da beyazın içinde. Üstünde ve altında
   yumuşak geçiş var, yani ekranda gece ile beyazı ayıran tek bir çizgi yok.
   Müşterinin iki kuralı da bozulmuyor: hero'da görsel yok (kare h1'den sonra,
   "kim olduğumuz" tarafında) ve ALTINDA KÜNYE YOK.

   Kare bilerek yarı yarıya söndürülmüş. media.ts'teki adres bir Unsplash yer
   tutucusu ve bu hâliyle "işte ekibimiz" diyemez; sönük hâlde bir iddia değil
   bir doku oluyor. alt="" ve dekoratif.

   ---------------------------------------------------------- BU DOSYADA CÜMLE YOK
   Ekrana çıkan her kelime lib/about.ts'ten geliyor (HERO, OPENING). Tek
   istisna kırıntı yolundaki "Ana sayfa" — PageHero'nun kendi metni, birebir.
   Yeni olgu yok: kuruluş yılı, çalışan sayısı, ödül, lisans numarası
   geçmiyor. */
export default function AboutSeritNefes() {
  return (
    <section className="hza">
      {/* RAY · şeridin omurgası. Tek nesne, tek renk, baştan sona kesintisiz;
          gece zeminde de beyaz zeminde de fotoğrafın üstünde de aynı mavi
          okunuyor. İçindeki ışık sürekli aşağı iniyor (11,311 s).
          Dekoratif, erişilebilirlik ağacında yok. */}
      <div className="hza-ray" aria-hidden="true">
        <span className="hza-akis" />
      </div>

      {/* ---- NEFES ALMA · soru ve cevabı ---- */}
      <div className="hza-ust">
        <div className="hza-aur" aria-hidden="true" />
        <div className="container-o hza-in">
          {/* Kırıntı yolu PageHero ile birebir aynı (aynı sınıf, aynı metin):
              bu şerit hero bileşenini kullanmıyor ama sitedeki konum çizgisi
              her iç sayfada aynı görünmeli. */}
          <nav className="ph-crumb" aria-label="Konum">
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
            className="hza-h1"
          />
          {/* Sorunun cevabı, aynı sütunda ve h1'in hemen altında. Ayrı bir
              "lead" kutusu değil; punto eğrisinin ikinci basamağı. */}
          <FadeUp delay={0.26}>
            <p className="hza-cevap">{HERO.lead}</p>
          </FadeUp>
        </div>
      </div>

      {/* ---- DİKİŞ · gece kareye, kare beyaza çözülüyor ----
          FadeUp YOK ve bu bilerek: kare açılırken saydam olsaydı arkasındaki
          gece/beyaz sınırı bir an için sert bir çizgi olarak görünürdü.
          Aynı sebeple geçiş kabın KENDİ zemininde de yazılı — kare bir gün
          404 dönerse (media.ts'te bu bir kez yaşandı) şerit yine dikişsiz
          kalıyor, yalnız dokusuz kalıyor. */}
      <div className="hza-dikis">
        <span className="hza-ph">
          <Image
            src={TEAM_PHOTO}
            alt=""
            fill
            sizes="100vw"
            className="hza-img"
            unoptimized
          />
        </span>
      </div>

      {/* ---- TUTMA · kim olduğumuz ---- */}
      <div className="container-o hza-in hza-orta">
        {/* Rayın üstündeki çentik. h2 olarak basılıyor (belge yapısı bozulmuyor)
            ama bölüm başlığı gibi durmuyor; SplitWords da kullanılmadı, çünkü
            burada yeni bir bölüm açılmıyor. */}
        <FadeUp>
          <h2 className="hza-mark">{OPENING.heading}</h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="hza-lead">{OPENING.lead}</p>
        </FadeUp>
        {OPENING.body.map((p, i) => (
          <FadeUp key={p.slice(0, 24)} delay={0.18 + i * 0.08}>
            <p className="hza-p">{p}</p>
          </FadeUp>
        ))}
      </div>

      {/* ---- NEFES VERME · vizyon ve misyon ----
          Kart yok, ikon kuyusu yok, ızgara yok: iki beyan da aynı sütunda,
          aynı rayda, alt alta. Yan yana koymak ikisini yeniden iki kutu
          yapardı ve bu adayın tamamı ona karşı.

          İkisi aynı puntoda: biri kısa biri uzun diye ölçü değiştirmek
          "vizyon daha önemli" gibi okunurdu. */}
      <div className="container-o hza-in hza-son">
        <div className="hza-isik" aria-hidden="true" />
        {[OPENING.vision, OPENING.mission].map((s, i) => (
          <FadeUp className="hza-beyan" key={s.t} delay={0.1 + i * 0.1}>
            <h3 className="hza-k">{s.t}</h3>
            <p className="hza-s">{s.s}</p>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
