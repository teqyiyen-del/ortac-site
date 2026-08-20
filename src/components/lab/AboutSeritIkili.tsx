import { ChevronRight, Compass, Target } from "lucide-react";
import SmartLink from "@/components/shared/SmartLink";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { HERO, OPENING } from "@/lib/about";

/* ADAY · İKİLİ — /hakkimizda'nın ilk şeridi: hero + kim olduğumuz +
   vizyon/misyon. Biçim: src/app/css/lab-hserit-b.css · ad alanı .hzb-

   TEŞHİS. Üçü ayrı ayrı değil, ÜST ÜSTE geldikleri için oturmuyor: hero
   "Ortac Global kimdir?" diye soruyor, hemen altındaki bölüm "Kim olduğumuz"
   diye aynı şeyi ikinci kez ilan ediyor, sonra "Vizyon" ve "Misyon" başlıkları
   üçüncü ve dördüncü kez. Dört başlık, tek konu. Ekranda bilgi değil, kendini
   tanıtan bloklar birikiyor — müşterinin "not gibi duruyor" dediği şey bu.
   İkinci kusur: vizyon ve misyon soyut, uzun ve birbirine benzeyen iki cümle,
   ve bugün ikisi de aynı beyaz kartta, aynı puntoda, aynı sırada duruyor.
   Aynı görünen iki şey okunmuyor.

   ÇÖZÜM · İKİ SÜTUN, İKİ SES. Şerit tek nesne oluyor ve o nesne ikiye
   ayrılıyor: SOLDA bugün gerçekten yapılan iş (şimdiki zaman: "üstleniyor",
   "yazıyor"), SAĞDA hedef (mastar: "sunmak", "desteklemek", "vermek").
   Fark uydurulmuş değil, metinlerin kendisinde ZATEN var — tasarımın işi onu
   görünür kılmak. Görünür kılan üç şey: iki sütunun kendi zaman etiketi
   ("Bugün" / "Bundan sonra"), iki başlığın vurgusunun tam da çekimlenmiş
   fiile düşmesi ("Ne YAPIYORUZ" / "Neyi HEDEFLİYORUZ") ve iki sesin farklı
   zeminde konuşması (beyaz kâğıt / gece panel, sitenin kendi görsel dili).

   TEK NESNE OLMASI KURGUNUN ŞARTI. Panel gece hero'nun son ~90 pikselinin
   üstüne biniyor, yani cevap sorunun içinden çıkıyor; hero ile şerit arasında
   "yeni bölüm" hissi veren bir boşluk kalmıyor.

   FOTOĞRAF KULLANILMADI. Bu kurguda oturacağı yer yok ve bu bir kaçınma
   değil, kurgunun sonucu: sol sütun "yalnızca bugün doğrulanabilir olan"
   sütunu, elde firmanın kendi ekip çekimi yok (media.ts · TEAM_PHOTO bir stok
   kare) ve müşteri o karenin altındaki "temsilî" şerhini kaldırttı — yani
   doğrulanamayan bir kare, doğrulanabilirlik sütununun başına konmuş olurdu.
   Sağ sütuna da giremez: henüz olmamış bir hedefin fotoğrafı olmuyor. Karenin
   yeri boş kalmıyor, iki ses o alanı paylaşıyor. Sayfanın görsel yükü zaten
   2. bölümde (üç ülke, üç gerçek kare) duruyor.

   ------------------------------------------------- EKRANA BASILMAYAN İKİ ALAN
   OPENING.heading ("Kim olduğumuz") ve OPENING.lead basılmıyor; ikisi de
   about.ts'te yerinde duruyor, yalnız bu adayda ekrana çıkmıyor.
   · heading: hero'nun h1'i zaten "Ortac Global kimdir?" — aynı cümlenin soru
     ve cevap hâli iki ekran arayla art arda geliyordu. Cevabı artık iki sütun
     başlığı veriyor.
   · lead: iki yarısı da sayfanın kendisi hakkında ("Aşağıda ... yazdık",
     "dayanağı sayfanın devamında tek tek duruyor"), yani şikâyet edilen not
     tonunun ta kendisi. Bilgi kaybı yok: ilk yarısındaki tek olgu ("üç ülkede
     çalışan tek bir ekip") body[0]'da kelimesi kelimesine duruyor
     ("KKTC, İngiltere ve Dubai'de, aynı ekiple ve Türkçe").

   Vizyon ve misyon metinlerine DOKUNULMADI, tek harfi değişmedi. */

/* Ekranda yazılan beş kısa metin. Hiçbiri yeni bir olgu taşımıyor; beşi de
   OPENING.lead'in kendi kelimelerinden ("ne yaptığımızı ve neyi
   hedeflediğimizi") türedi. Burada duruyorlar çünkü bu bir lab adayı: aday
   seçilirse about.ts'e taşınırlar, seçilmezse dosyayla birlikte giderler. */
const HINGE = "Sorunun cevabı iki parça: bugün yaptığımız iş, bundan sonrası için hedefimiz.";

const SESLER = {
  simdi: { when: "Bugün", head: "Ne yapıyoruz", accent: "yapıyoruz" },
  sonra: { when: "Bundan sonra", head: "Neyi hedefliyoruz", accent: "hedefliyoruz" },
} as const;

export default function AboutSeritIkili() {
  return (
    <>
      {/* ================= HERO =================
          PageHero KULLANILMIYOR ama zemini birebir onun kompakt dalının
          zemini: .phg + .phg-bg > .phg-grid + .phg-glow. Sebep ikili —
          sitenin hero dili değişmesin, ama şeridin alt dolgusu bu adayda
          panelin binmesine yer açacak kadar büyüsün.

          .ph SINIFI BİLEREK BASILMIYOR. globals.css'te `.ph { padding: ... }`
          kuralı @import satırlarından SONRA geliyor; aynı özgüllükte olduğu
          için bu dosyadan yazılacak bir padding'i sessizce yenerdi. Dolgu
          .hzb-hero'nun kendi kuralında, üst değeri .ph ile birebir aynı
          (132 / 156) — pagehero-grid.css'in glow kalibrasyonu h1'in üst
          kenarına göre ölçülmüş, o kenar kaymamalı. */}
      <section className="hzb-hero phg">
        <div className="phg-bg" aria-hidden="true">
          <div className="phg-grid" />
          <div className="phg-glow" />
        </div>

        <div className="container-o">
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
            className="hzb-h1"
          />

          {/* İki satır, ikisi de kısa. Birincisi firmanın ne yaptığını söyleyen
              olgu (about.ts, değişmedi), ikincisi bu adayın menteşesi: aşağıdaki
              iki sütunu adıyla kuruyor. Sıra kasıtlı — önce iş, sonra kurgu. */}
          <FadeUp delay={0.24}>
            <p className="hzb-lead">{HERO.lead}</p>
          </FadeUp>
          <FadeUp delay={0.32}>
            <p className="hzb-hinge">{HINGE}</p>
          </FadeUp>
        </div>
      </section>

      {/* ================= İKİLİ PANEL ================= */}
      <div className="hzb-wrap">
        <div className="container-o">
          {/* FadeUp panelin TAMAMINI sarıyor, iki yarısını ayrı ayrı değil:
              bu adayın tezi ikisinin tek nesne olması, iki ayrı yükseliş onu
              iki bloğa geri bölerdi. */}
          <FadeUp y={26}>
            <div className="hzb-pair">
              {/* DİKİŞ. İki sesin sınırı; hem beyaz hem gece tarafa değiyor.
                  İçindeki ışık sürekli aşağı akıyor (17,351 s), yani şerit
                  ekranda durduğu sürece ölü değil. Dekoratif, erişilebilirlik
                  ağacında yok. Telefonda gizleniyor: orada sütunlar alt alta
                  düşüyor ve dikey bir dikişin işaret edeceği sınır kalmıyor. */}
              <span className="hzb-seam" aria-hidden="true">
                <span className="hzb-run" />
              </span>

              {/* ---- SOL SES · şimdiki zaman ---- */}
              <div className="hzb-col hzb-now">
                <p className="hzb-when">{SESLER.simdi.when}</p>
                <SplitWords
                  as="h2"
                  text={SESLER.simdi.head}
                  accent={SESLER.simdi.accent}
                  className="hzb-k"
                />
                {/* about.ts'ten, iki paragraf, sırayla. Buraya yeni bir olgu
                    girmedi; ikisi de firmanın bugün yaptığı işi anlatıyor. */}
                {OPENING.body.map((p, i) => (
                  <FadeUp key={p.slice(0, 24)} delay={0.14 + i * 0.08}>
                    <p className="hzb-p">{p}</p>
                  </FadeUp>
                ))}
              </div>

              {/* ---- SAĞ SES · hedef ----
                  Gece panel. Kart kabuğu ve 1px'lik #e6e6e6 kenarlık (beyaz
                  üstünde 1,16:1) kalktı — canlıdaki iki vizyon/misyon kartını
                  "sönük" gösteren şey oydu. Ayrım artık kenarlıkta değil
                  ZEMİNDE, ve zemin farkı bu adayda anlam taşıyor. */}
              <div className="hzb-col hzb-next">
                <p className="hzb-when hzb-when-d">{SESLER.sonra.when}</p>
                <SplitWords
                  as="h2"
                  text={SESLER.sonra.head}
                  accent={SESLER.sonra.accent}
                  accentColor="var(--blue-500)"
                  className="hzb-k hzb-k-d"
                />

                <div className="hzb-aims">
                  {[
                    { s: OPENING.vision, Icon: Compass },
                    { s: OPENING.mission, Icon: Target },
                  ].map(({ s, Icon }, i) => (
                    <FadeUp key={s.t} delay={0.16 + i * 0.08}>
                      <article className="hzb-aim">
                        <h3 className="hzb-aim-h">
                          <span className="hzb-ic" aria-hidden="true">
                            <Icon size={17} strokeWidth={1.9} />
                          </span>
                          {s.t}
                        </h3>
                        <p className="hzb-aim-s">{s.s}</p>
                        {/* HEDEF ÇİZGİSİ. Üstündeki nokta sağa doğru ilerliyor
                            ama uca VARMADAN sönüyor: hedef bir yön, varılmış
                            bir yer değil. Üstüne gelince çizgi kartın kenarına
                            kadar uzuyor. Dekoratif. */}
                        <span className="hzb-rail" aria-hidden="true">
                          <span className="hzb-dot" />
                        </span>
                      </article>
                    </FadeUp>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </>
  );
}
