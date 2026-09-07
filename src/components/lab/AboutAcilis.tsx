import Image from "next/image";
import { Stamp, Handshake, Building2, History } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import PageHero from "@/components/shared/PageHero";
import { BASIS, IDENTITY, OPENING } from "@/lib/about";
import { TEAM_PHOTO } from "@/lib/media";

/* /lab/hakkimizda-acilis · girişin iki yeni kurgusu.
 *
 * Müşteri: "hakkımızda sayfasının giriş kısımları fln asla aklımıza oturmadı."
 *
 * TEŞHİS ÖLÇÜLDÜ, "TASARIM SORUNU" DEĞİL:
 *
 *   · Giriş şeridinin (hero + açılış + vizyon/misyon) toplam metni 786
 *     karakter ve içinde TEK BİR sayı, tarih, isim ya da adres yok.
 *   · Sayfa "üç ülke" listesini yedi kez, "kendi ofisimiz" iddiasını dört kez
 *     basıyor. Tekrar, kanıt yokluğunu kapatmıyor; altını çiziyor.
 *   · h1 bir SORU ("Ortac Global kimdir?") ve hemen altındaki bölüm başlığı
 *     aynı soruyu ikinci kez soruyor ("Kim olduğumuz"). Sitedeki öteki on
 *     dokuz hero'nun hepsi nokta ile biten bir CÜMLE.
 *   · Sayfanın gerçek cevabı (dört doğrulanabilir dayanak: kendi lisans,
 *     IFZA, üç ofis, 30 yıl) bugün BEŞİNCİ ekranda.
 *
 * İKİ ADAYIN ORTAK KARARI: giriş "biz kimiz" sorusunu değil "neden biz"
 * sorusunu cevaplasın, ve cevabı ilk ekranda versin.
 *
 * ------------------------------------------------ VİZYON/MİSYONA DOKUNULMADI
 * about.ts'in kendi yazılı kuralı: "METİNLER FİRMANIN KENDİ RESMÎ İFADESİ.
 * Tek harfi değişmedi ve değişmemeli." İki adayda da metin BİREBİR aynı;
 * değişen tek şey NEREDE durdukları. Bugün girişin yükünü onlar taşıyor ve
 * taşıyamıyorlar: ikisi de ölçülemez ("bütün finansal ihtiyaç", "kapsamlı ve
 * yenilikçi"). Aşağı indiklerinde giriş boşalmıyor, aksine doluyor.
 */

const ICON = { stamp: Stamp, handshake: Handshake, office: Building2, history: History } as const;

/* --------------------------------------------------------------- ORTAK HERO */
/* İki adayın da h1'i nokta ile biten bir cümle ve accent kuyruğu sitenin
   grameriyle aynı. Lead'de "üç ülke" listesi BİR KEZ geçiyor: bugün aynı
   liste girişte üç kez basılıyor (hero lead, açılış paragrafı, ülkeler lead). */
export function AcilisHero({ tip }: { tip: "dayanak" | "insan" }) {
  const dayanak = tip === "dayanak";
  return (
    <PageHero
      crumb="Hakkımızda"
      title={dayanak ? "Kendi lisansımızla, kendi ofislerimizle çalışıyoruz." : "Ortac Global'i kim yürütüyor."}
      accent={dayanak ? "kendi ofislerimizle çalışıyoruz." : "kim yürütüyor."}
      /* ÜLKE ADLARI BURADA SAYILMIYOR ve bu ölçümün sonucu: bugünkü girişte
         "KKTC, İngiltere ve Dubai" listesi ÜÇ KEZ geçiyor (hero lead, açılış
         paragrafı, ülkeler lead) ve sayfanın tamamında yedi kez. Üçü de
         hemen aşağıdaki dayanak bloğunda zaten yazılı. */
      lead="Vergi, muhasebe ve şirket kuruluşu. Üç ülkede, üçünü de kendimiz yürüterek."
    />
  );
}

/* ------------------------------------------------------- ADAY HA1 · DAYANAK */
/* Dört dayanak beşinci ekrandan İKİNCİ ekrana çıkıyor. Yeni metin yazılmadı,
   yeni ızgara icat edilmedi: kartların dördü de bugün sayfada duran kartlar.
   Değişen tek şey sıra.

   BUGÜN BOŞ OLAN LEAD DOLUYOR (about.ts · BASIS.lead === ""). Yerine giden
   cümle de yeni değil: açılış paragrafının ikinci cümlesi, yani kanıtı
   tanıtan cümle. Bugün kanıttan üç ekran önce duruyor ve neyi tanıttığı
   görünmüyor. */
export function AboutDayanak() {
  return (
    <section className="sec-pad lhb-sec">
      <div className="container-o">
        <div className="sec-head">
          <SplitWords as="h2" text={BASIS.heading} accent={BASIS.accent} className="h2" />
          <FadeUp delay={0.2}>
            <p className="sec-lead">{OPENING.body[1]}</p>
          </FadeUp>
        </div>

        <ul className="lhb-dayanak">
          {BASIS.cards.map((c, i) => {
            const Icon = ICON[c.icon as keyof typeof ICON] ?? Stamp;
            return (
              <FadeUp key={c.t} delay={0.08 + i * 0.06}>
                <li>
                  <Icon size={19} strokeWidth={1.9} aria-hidden="true" />
                  <b>{c.t}</b>
                  <span>{c.s}</span>
                </li>
              </FadeUp>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- ADAY HA2 · İNSAN */
/* Sayfada doğrulanmış TEK insan var (Murat Ortaç · Managing Partner ·
   Certified Accountant) ve bugün üç ayrı yere dağılmış: künye satırı, alıntı
   künyesi, dayanak kartının içi. Üçü tek yere gelince giriş bir anda "insanı
   olan" bir sayfa oluyor.

   KÜNYE GİRİŞE GERİ GELİYOR AMA TEK BAŞINA DEĞİL. Müşteri bir kez "künye ile
   giriş açmayalım" dedi; reddedilen şey künyeyi TEK BAŞINA açılış yapmaktı.
   Burada künye bir fotoğrafın ve bir kişinin yanındaki ikinci öge. Bu ayrım
   müşteriye açıkça sorulmalı.

   FOTOĞRAF HÂLÂ YER TUTUCU (media.ts · SWAP:TEAM_PHOTO, yüzsüz bir Unsplash
   karesi) ve bu adayın en zayıf noktası burası: aday gerçek çekimle
   değerlendirilmeli. */
export function AboutInsan() {
  /* BOŞ SATIRLAR SÜZÜLÜYOR. Künyenin yedi satırından üçü bugün boş
     (SWAP:FOUNDED · SWAP:LICENCE_NO · SWAP:OFFICE_ADDRESSES) ve süzülmezse
     panelin altında etiketi olan, değeri olmayan üç satır kalıyor. Canlı
     sayfa da aynı süzgeci uyguluyor.

     BU ÜÇÜ TAM DA GİRİŞİN İHTİYAÇ DUYDUĞU SOMUT BİLGİ: kuruluş yılı, lisans
     numarası ve ofis adresleri. Üçü dolduğunda bu panel bir "hakkımızda"
     girişi olmaktan çıkıp bir künye kanıtına dönüyor. */
  const kunye = IDENTITY.rows.filter((r) => r.value.trim().length > 0);
  return (
    <section className="sec-pad lhb-sec">
      <div className="container-o">
        <div className="lhb-panel">
          <FadeUp className="lhb-panel-f">
            <Image
              src={TEAM_PHOTO}
              alt=""
              width={760}
              height={570}
              sizes="(min-width: 900px) 46vw, 100vw"
              unoptimized
            />
          </FadeUp>

          <FadeUp delay={0.1} className="lhb-panel-t">
            <p className="lhb-kicker">Yönetici ortak</p>
            <p className="lhb-ad">Murat Ortaç</p>
            <p className="lhb-rol">{BASIS.cards[0].s}</p>

            <dl className="lhb-kunye">
              {kunye.map((r) => (
                <div key={r.label}>
                  <dt>{r.label}</dt>
                  <dd>{r.value}</dd>
                </div>
              ))}
            </dl>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------- İKİ ADAYIN ORTAK GÖVDESİ */
/* "Kim olduğumuz" düzyazısı. Metin değişmedi ama İKİNCİ paragraf burada YOK:
   o cümle ("Bunun arkasında üç somut dayanak var…") HA1'de dayanak bölümünün
   lead'ine taşındı, HA2'de de oraya ait. Aynı cümlenin iki yerde durması
   bugünkü sayfanın hastalığı. */
export function AboutGovde() {
  return (
    <section className="sec-pad lhb-sec" data-alt="">
      <div className="container-o">
        <div className="sec-head">
          <SplitWords as="h2" text={OPENING.heading} accent={OPENING.accent} className="h2" />
        </div>
        <FadeUp delay={0.12}>
          <p className="lhb-govde">{OPENING.body[0]}</p>
        </FadeUp>
      </div>
    </section>
  );
}
