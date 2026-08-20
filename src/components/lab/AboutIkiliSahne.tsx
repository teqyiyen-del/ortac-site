import { ChevronRight, Compass, Target } from "lucide-react";
import SmartLink from "@/components/shared/SmartLink";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { HERO, OPENING } from "@/lib/about";

/* ADAY · SAHNE — "İkili"nin türevi. /hakkimizda'nın ilk şeridi: hero +
   kim olduğumuz + vizyon/misyon. Biçim: src/app/css/lab-hikili-b.css · .hib-

   İKİLİ'NİN FİKRİ KORUNDU. Solda firma bugün ne yapıyor (şimdiki zaman:
   "üstleniyor"), sağda ne hedefliyor (mastar: "sunmak", "desteklemek").
   Fark görsel değil DİLSEL ve zaten metinlerin içinde var; tasarımın işi
   onu görünür kılmak. Görünür kılan üç şey İkili'den aynen geliyor: iki
   sütunun zaman etiketi ("Bugün" / "Bundan sonra"), başlıkların vurgusunun
   çekimlenmiş fiile düşmesi ("Ne YAPIYORUZ" / "Neyi HEDEFLİYORUZ") ve iki
   sesin farklı zeminde konuşması (beyaz kâğıt / gece panel).

   TÜREVİN GETİRDİĞİ TEK ŞEY GÖRSEL. İkili'de eksik olan buydu. İki sesin
   sınırı orada 2 piksellik bir dikişti; burada o sınır AÇILIYOR ve üçüncü
   bir nesne oluyor: iki sütunun arasında, sayfa boyunca inen gece bir şerit.
   Şeridin içinde sitenin kendi diliyle çizilmiş bir sahne var —
     · iki ince ray ve aralarındaki kanal: zaman ekseni,
     · kanaldan çok yavaş geçen ışık (47,251 s): şerit hiç ölmüyor,
     · üç yerde kanalı kesen aktarım: bir uçta açık kare (bugün elde olan
       iş), ortada hat, öbür uçta dolu nokta (varış). Kalıp üçünü sırayla
       yakıyor, yani ekranda olan şey "soldaki bir şey sağa geçti".
   Yani "görsel" burada fotoğraf değil ÇİZİM ve çizim dekorasyon değil,
   iki sütun arasındaki cümlenin kendisi.

   FOTOĞRAF HİÇ YOK, VE BU BİR KAÇINMA DEĞİL. Elde firmanın kendi ekip
   çekimi yok (media.ts · TEAM_PHOTO bir stok kare), müşteri o karenin
   altındaki künyeyi de kaldırttı ve hero'da fotoğrafı zaten reddetti.
   Doğrulanamayan bir kare, "yalnızca bugün doğrulanabilir olanı yazıyoruz"
   diyen bir sütunun başında duramaz; sağ sütuna da giremez, çünkü henüz
   olmamış bir hedefin fotoğrafı olmuyor.

   TELEFONDA ÇİZİM KAYBOLMUYOR, DÖNÜYOR. İkili'nin dikişi 980px altında
   tamamen gizleniyordu; bu türevin tek görsel hamlesi o olduğu için burada
   gizlenemez. Sütunlar alt alta düşünce şerit yatay bir banda dönüyor,
   kanal yatay, aktarım dikey oluyor: "yukarıdaki bugünden aşağıdaki hedefe".
   Kural tek ve iki eksende de aynı: KANAL, AKTARIMA DİK. Ayrıntısı CSS'te.

   ------------------------------------------------- EKRANA BASILMAYAN ALANLAR
   OPENING.heading ("Kim olduğumuz") ve OPENING.lead basılmıyor; ikisi de
   about.ts'te yerinde duruyor, yalnız bu adayda ekrana çıkmıyor.
   · heading: hero'nun h1'i zaten "Ortac Global kimdir?" — aynı cümlenin soru
     ve cevap hâli iki ekran arayla art arda geliyordu. Cevabı iki sütun
     başlığı veriyor.
   · lead: iki yarısı da sayfanın kendisi hakkında konuşuyor ("Aşağıda …
     yazdık"), yani müşterinin sildirdiği "not" tonunun ta kendisi. Bilgi
     kaybı yok: içindeki tek olgu ("üç ülkede çalışan tek bir ekip")
     body[0]'da kelimesi kelimesine duruyor.

   İKİLİ'DEKİ MENTEŞE CÜMLESİ DE YAZILMADI. İkili hero'nun altına "Sorunun
   cevabı iki parça: bugün yaptığımız iş, bundan sonrası için hedefimiz."
   diye bir satır koyuyordu. O cümle bir olgu söylemiyor, SAYFANIN KENDİ
   YAPISINI tarif ediyor — müşterinin siteden 24 tanesini sildirdiği kalıp
   tam olarak bu. İşini zaten iki zaman etiketi ile iki başlık yapıyor.

   Vizyon ve misyon metinlerine DOKUNULMADI, tek harfi değişmedi. */

/* Ekranda yazılan dört kısa metin. Hiçbiri yeni bir olgu taşımıyor; dördü de
   OPENING.lead'in kendi kelimelerinden ("ne yaptığımızı ve neyi
   hedeflediğimizi") türedi. Aday seçilirse about.ts'e taşınırlar. */
const SESLER = {
  simdi: { when: "Bugün", head: "Ne yapıyoruz", accent: "yapıyoruz" },
  sonra: { when: "Bundan sonra", head: "Neyi hedefliyoruz", accent: "hedefliyoruz" },
} as const;

export default function AboutIkiliSahne() {
  return (
    <>
      {/* ================= HERO =================
          PageHero KULLANILMIYOR ama zemini birebir onun kompakt dalının
          zemini: .phg + .phg-bg > .phg-grid + .phg-glow. Sitenin hero dili
          değişmiyor; değişen tek şey alt dolgu, çünkü panel gece bandın son
          parçasının üstüne biniyor. .ph sınıfının neden basılmadığı CSS'te. */}
      <section className="hib-hero phg">
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
            className="hib-h1"
          />

          {/* Tek satır: firmanın ne yaptığını söyleyen olgu (about.ts,
              değişmedi). Altına ikinci bir cümle konmadı, gerekçe blok
              başında. */}
          <FadeUp delay={0.24}>
            <p className="hib-lead">{HERO.lead}</p>
          </FadeUp>
        </div>
      </section>

      {/* ================= İKİLİ PANEL + ÇİZİM ================= */}
      <div className="hib-wrap">
        <div className="container-o">
          {/* FadeUp panelin TAMAMINI sarıyor, parçalarını ayrı ayrı değil:
              tez üçünün tek nesne olması, üç ayrı yükseliş onu üç bloğa geri
              bölerdi. */}
          <FadeUp y={26}>
            <div className="hib-pair">
              {/* ---- SOL SES · şimdiki zaman ---- */}
              <div className="hib-col hib-now">
                <p className="hib-when">{SESLER.simdi.when}</p>
                <SplitWords
                  as="h2"
                  text={SESLER.simdi.head}
                  accent={SESLER.simdi.accent}
                  className="hib-k"
                />
                {/* about.ts'ten, iki paragraf, sırayla. Yeni bir olgu
                    girmedi; ikisi de firmanın bugün yaptığı işi anlatıyor. */}
                {OPENING.body.map((p, i) => (
                  <FadeUp key={p.slice(0, 24)} delay={0.14 + i * 0.08}>
                    <p className="hib-p">{p}</p>
                  </FadeUp>
                ))}
              </div>

              {/* ---- ÇİZİM · iki sesin arasındaki şerit ----
                  Ekrandaki tek görsel nesne ve tamamen dekoratif: taşıdığı
                  cümle ("bugünden yarına") iki sütunda zaten kelimeyle
                  yazılı, o yüzden erişilebilirlik ağacında yok.

                  Aktarımın mekanizması burada YOK: sınıflar (.akt-durak)
                  src/app/css/aktarim.css kalıbından geliyor, değerleri
                  lab-hikili-b.css veriyor. Kalıbın sözleşmesi "çağıran yer
                  DEĞER verir, MEKANİZMA yazmaz" diyor.

                  Üç aktarım açıkça üç kez yazıldı, döngüyle değil: css-check
                  yalnız düz metin className'leri denetleyebiliyor, şablon
                  değişkeniyle kurulan sınıf adları taranmadan geçiyor. */}
              <div className="hib-draw" aria-hidden="true">
                <span className="hib-rail hib-rail-a" />
                <span className="hib-rail hib-rail-b" />
                <span className="hib-beam" />

                <span className="hib-cross hib-c1">
                  <span className="hib-a akt-durak" />
                  <span className="hib-line akt-durak" />
                  <span className="hib-b akt-durak" />
                </span>
                <span className="hib-cross hib-c2">
                  <span className="hib-a akt-durak" />
                  <span className="hib-line akt-durak" />
                  <span className="hib-b akt-durak" />
                </span>
                <span className="hib-cross hib-c3">
                  <span className="hib-a akt-durak" />
                  <span className="hib-line akt-durak" />
                  <span className="hib-b akt-durak" />
                </span>
              </div>

              {/* ---- SAĞ SES · hedef ----
                  Gece panel. Kart kabuğu ve 1px'lik #e6e6e6 kenarlık (beyaz
                  üstünde 1,16:1) yok — canlıdaki iki vizyon/misyon kartını
                  "sönük" gösteren şey oydu. Ayrım kenarlıkta değil ZEMİNDE. */}
              <div className="hib-col hib-next">
                <p className="hib-when hib-when-d">{SESLER.sonra.when}</p>
                <SplitWords
                  as="h2"
                  text={SESLER.sonra.head}
                  accent={SESLER.sonra.accent}
                  accentColor="var(--blue-500)"
                  className="hib-k hib-k-d"
                />

                <div className="hib-aims">
                  {[
                    { s: OPENING.vision, Icon: Compass },
                    { s: OPENING.mission, Icon: Target },
                  ].map(({ s, Icon }, i) => (
                    <FadeUp key={s.t} delay={0.16 + i * 0.08}>
                      <article>
                        <h3 className="hib-aim-h">
                          <span className="hib-ic" aria-hidden="true">
                            <Icon size={17} strokeWidth={1.9} />
                          </span>
                          {s.t}
                        </h3>
                        <p className="hib-aim-s">{s.s}</p>
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
