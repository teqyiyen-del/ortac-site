import Image from "next/image";
import { ChevronRight, Compass, Target } from "lucide-react";
import SmartLink from "@/components/shared/SmartLink";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { HERO, OPENING } from "@/lib/about";
import { TEAM_PHOTO } from "@/lib/media";

/* ADAY · ZEMİN — İKİLİ'nin türevi. /hakkimizda ilk şeridi: hero + kim
   olduğumuz + vizyon/misyon. Biçim: src/app/css/lab-hikili-c.css · ad alanı .hic-

   İKİLİ'DEN NE DEVRALINDI: fikrin tamamı. Solda firma bugün ne yapıyor
   (şimdiki zaman), sağda ne hedefliyor (mastar); fark görsel değil DİLSEL,
   iki sütun iki zaman kipinde konuşuyor. Zaman etiketleri, iki başlığın
   çekimlenmiş fiile düşen vurgusu ve metinlerin kendisi aynen duruyor.

   NE DEĞİŞTİ: görselin işi. İkili'de fotoğrafın yeri yoktu; burada VAR ama
   kutu olarak değil ZEMİN olarak. Şeridin tamamı tek bir yüzey: hero da iki
   sütun da o yüzeyin üstünde yüzüyor, aralarında kart, kenarlık ya da bölüm
   sınırı yok. İkili'nin "panel hero'nun üstüne binsin" hilesine de gerek
   kalmadı — binecek iki ayrı nesne yok, tek nesne var.

   ZEMİN İKİ SESİ TAŞIYOR. Perde her yerde aynı yoğunlukta değil: solda
   ("Bugün") kare görünüyor, sağa doğru ("Bundan sonra") perde koyulaşıp
   fotoğrafı yutuyor. Sebep kurgunun kendisi: bugün yapılan işin görüntüsü
   var, henüz olmamış bir hedefin görüntüsü olmaz. Telefonda aynı çözülme
   yukarıdan aşağı işliyor, çünkü sütunlar orada alt alta düşüyor.

   HERO'DA GÖRSEL YOK, ZEMİN VAR. Müşteri hero'da görsel istemiyor
   ("hakkımızdada heroda görsel kullanmayı beğenemedim ya, kim olduğumuz
   kısmına geri çekelim") ve o karar burada da geçerli: perde şeridin en
   üstünde neredeyse opak, yani h1 ve altındaki iki satır sitenin bildiği
   gece hero zemininde duruyor. Kare aşağı inildikçe, tam da "kim olduğumuz"
   metninin arkasında ortaya çıkıyor. Yani fotoğraf hero'da bir nesne değil,
   şeridin altından yükselen bir doku.

   KÜNYE YOK. Kare alt="" ile dekoratif basılıyor, altında tek satır yazı
   yok; müşteri "Fotoğraf temsilî…" cümlesini sildirdi ve geri gelmiyor.
   Fotoğraf hiç yüklenmese bile şerit okunur kalıyor: zemin rengi --night ve
   kontrast perdeden değil o tabandan da sağlanıyor.

   VİZYON VE MİSYON metinlerine dokunulmadı, tek harfi değişmedi. */

/* Ekrandaki tek türetilmiş cümle, İkili'den aynen geldi: iki sütunu adıyla
   kuruyor. Aday seçilirse about.ts'e taşınır. */
const HINGE = "Sorunun cevabı iki parça: bugün yaptığımız iş, bundan sonrası için hedefimiz.";

const SESLER = {
  simdi: { when: "Bugün", head: "Ne yapıyoruz", accent: "yapıyoruz" },
  sonra: { when: "Bundan sonra", head: "Neyi hedefliyoruz", accent: "hedefliyoruz" },
} as const;

export default function AboutIkiliZemin() {
  return (
    <section className="hic">
      {/* ================= ZEMİN =================
          Üç katman, sırası kritik: kare → ışık → perde. Işık perdenin ALTINDA
          çünkü ölçülen kontrastı belirleyen tek şey perde olmalı; üstte olsaydı
          metnin altındaki piksel hareket ettikçe değişirdi. */}
      <div className="hic-bg" aria-hidden="true">
        {/* alt="" ve DEKORATİF: media.ts · TEAM_PHOTO bir Unsplash yer tutucusu,
            firmanın kendi ekip çekimi değil; "işte ekibimiz" diyemez.
            unoptimized: next.config.ts'te remotePatterns yok, sitedeki bütün
            uzak görseller böyle basılıyor. `priority` YOK — LCP adayı h1. */}
        <Image src={TEAM_PHOTO} alt="" fill sizes="100vw" className="hic-img" unoptimized />
        <span className="hic-sweep" />
        <span className="hic-veil" />
      </div>

      <div className="container-o hic-inner">
        {/* Kırıntı yolu her iç sayfada aynı görünmeli; sınıf da aynı
            (.ph-crumb), yeni bir ad açılmadı. */}
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
          className="hic-h1"
        />

        <FadeUp delay={0.24}>
          <p className="hic-lead">{HERO.lead}</p>
        </FadeUp>
        <FadeUp delay={0.32}>
          <p className="hic-hinge">{HINGE}</p>
        </FadeUp>

        {/* FadeUp iki sütunu BİRLİKTE kaldırıyor: adayın tezi ikisinin tek
            nesne olması, iki ayrı yükseliş onu yeniden iki bloğa bölerdi. */}
        <FadeUp y={26} className="hic-pairw">
          <div className="hic-pair">
            {/* ---- SOL SES · şimdiki zaman · zeminin göründüğü taraf ----
                İkili'de sütunların .hzb-now / .hzb-next ile AYRI ZEMİN RENGİ
                vardı (beyaz / gece). Burada yok ve olamaz: bu adayın fikri
                zeminin görselin kendisi olması, sütuna opak zemin vermek onu
                yok ederdi. İki sesi ayıran şey renk değil, perdenin yoğunluğu
                ve zaman etiketi. */}
            <div className="hic-col">
              <p className="hic-when">{SESLER.simdi.when}</p>
              <SplitWords
                as="h2"
                text={SESLER.simdi.head}
                accent={SESLER.simdi.accent}
                accentColor="var(--blue-500)"
                className="hic-k"
              />
              {/* about.ts'ten, iki paragraf, sırayla. Yeni olgu girmedi. */}
              {OPENING.body.map((p, i) => (
                <FadeUp key={p.slice(0, 24)} delay={0.14 + i * 0.08}>
                  <p className="hic-p">{p}</p>
                </FadeUp>
              ))}
            </div>

            {/* ---- SAĞ SES · hedef · zeminin çözüldüğü taraf ---- */}
            <div className="hic-col">
              <p className="hic-when">{SESLER.sonra.when}</p>
              <SplitWords
                as="h2"
                text={SESLER.sonra.head}
                accent={SESLER.sonra.accent}
                accentColor="var(--blue-500)"
                className="hic-k"
              />

              <div className="hic-aims">
                {[
                  { s: OPENING.vision, Icon: Compass },
                  { s: OPENING.mission, Icon: Target },
                ].map(({ s, Icon }, i) => (
                  <FadeUp key={s.t} delay={0.16 + i * 0.08}>
                    <article className="hic-aim">
                      <h3 className="hic-aim-h">
                        <span className="hic-ic" aria-hidden="true">
                          <Icon size={17} strokeWidth={1.9} />
                        </span>
                        {s.t}
                      </h3>
                      <p className="hic-aim-s">{s.s}</p>
                      {/* Çizginin üstündeki ışık sağa ilerliyor ama uca
                          VARMADAN sönüyor: hedef bir yön, varılmış bir yer
                          değil. Üstüne gelince çizgi sütunun kenarına kadar
                          uzuyor. Dekoratif. */}
                      <span className="hic-rail" aria-hidden="true">
                        <span className="hic-glint" />
                      </span>
                    </article>
                  </FadeUp>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
