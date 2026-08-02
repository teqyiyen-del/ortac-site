"use client";

import SmartLink from "@/components/shared/SmartLink";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  Building2,
  CalendarCheck,
  IdCard,
  Landmark,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { CHAIN } from "@/lib/brand";

/* ============================================================================
   Z8 — "Kuruluş bir halka, zincir devam ediyor" · ad alanı .z8-

   TEŞHİS: Z7 KABUĞU KORUDU AMA SATIRI KALABALIKLAŞTIRDI.
   Müşteri "hala live'ın hissini vermiyor, bir şeyler çok karışık" dedi. Z7
   canlının kabuğunu (sec-pad + container-o + sec-head, beyaz zemin, kutusuz
   liste) gerçekten birebir korumuştu; yani sorun kabukta değil. Sorun şu:
   canlının ferahlığı "her satırda okunacak TEK grafik nesne" olmasından
   geliyordu ve Z7 bunu bozdu.

   Canlıda bölüm bütününde okunacak şeyler: iki eksen kelimesi + beş satır +
   bir dipnot. Z7'de: bir okuma-sözleşmesi paragrafı + 12 rakamlı cetvel + iki
   grup başlığı (her biri başlık + alt cümle) + mavi ayraç ray + beş satır +
   dipnot + ince yazı. Satır içinde de tek çubuk gitti, yerine 12 kutucuk
   geldi — beş satırda 60 küçük nesne.

   En kritik nokta: Z7 lejantı kaldırmaya çalışırken lejantı YAZIYA çevirdi.
   "Şerit kuruluş anından başlıyor… her kare bir ay, dolu kare o ay iş çıktığı
   anlamına geliyor" cümlesi tanımı gereği bir lejanttır: grafiği anlamak için
   önce onu okumak gerekiyor. Brief "lejant çözmeden okunsun" diyordu.

   Z8'İN KURALI: EKLEME YOK, DÜZELTME VAR.
   Z7'den çıkanlar — okuma-sözleşmesi paragrafı, 1–12 cetveli, "Kuruluştan
   itibaren" sol başlığı, iki grup başlığı, mavi ayraç ray, ince yazı satırı,
   satır başına 12 kutucuk. Geriye canlının kendi düzeni kalıyor ve iki
   problem canlının ZATEN VAR OLAN nesneleri düzeltilerek çözülüyor.

   1) "Siyah çizgi neden solda?"
      Canlıda kuruluş çubuğu 0→%24, diğer dördü %24→%100 idi. Yani kuruluş
      diğerlerinden farklı bir YERDE duruyordu ve ekseni adlandıran hiçbir şey
      yoktu; konum keyfi görünüyordu. Z8 bunu ekleyerek değil ÇIKARARAK çözüyor:
      yatay kaydırma siliniyor, beş çubuk da aynı yerden — kuruluş anından —
      başlıyor. Artık kuruluşu ayıran şey konumu değil, tek biten çubuk olması.
      Ekseni adlandıran iki şey var, ikisi de canlıda zaten vardı:
        · Canlının iki havada duran eksen kelimesinin yerine üç çapalı etiket:
          solda "Kuruluş anı" (x=0, çubukların ortak başlangıcı), ortada
          "1 yıl", sağda "süresiz devam ediyor" (çubukların söndüğü uç).
        · Canlının satırlar boyunca inen adsız dikey çizgisi (%24'teki omurga)
          kaldırılmadı, ADLANDIRILDI: aynı tek çizgi artık 1. yılın bittiği
          yerde duruyor ve üstünde "1 yıl" yazıyor. Nesne sayısı değişmedi,
          çizginin anlamı geldi.

   2) "Çok soyut, neyi ifade ettiğini anlamaz insanlar."
      Canlıda sıklık iki yerde birden soyuttu: çubuğun DOKUSUNDA (düz / sık
      tırtıklı / seyrek tırtıklı) ve etiketin KELİMESİNDE ("Dönemsel",
      "Yenilemeli", "Sürekli" — hiçbiri ne sıklıkta olduğunu söylemiyor).
      Z7 buna yeni bir nesne (12 kutucuk) ekleyerek cevap verdi. Z8 satırda
      zaten duran iki nesneyi somutlaştırıyor:
        · Etiket sayıya dönüyor: "Yılda 12 kez", "2 yılda 1 yenileme",
          "Kesintisiz", "Bir kez".
        · Çubuğun tırtık aralığı artık keyfi piksel değil, AYNI VERİDEN
          türüyor: tekrar aralığı = periyot / eksen uzunluğu. Yani "Yılda 12
          kez" yazan satırda "1 yıl" çizgisine kadar tam 12 işaret var. İsteyen
          sayar, kimse saymak zorunda değil; resim ile yazının çelişmesi
          imkânsız çünkü ikisi de tek sayıdan (`months`) çıkıyor.
      Okuma kuralı tek cümlede ve yazılmasına gerek yok, çünkü beş satır aynı
      dilbilgisini kullanıyor: MÜREKKEP = iş var, BOŞLUK = iş yok, mürekkep
      temelli bitiyorsa iş bitmiştir. Kuruluş kısa bir blok ve biter; banka
      aynı blokla başlar ama ince bir çizgi devam eder; muhasebe her ay bir
      işaret; uyum hiç kesilmeyen çizgi; oturum iki yılda bir işaret.

   SIKLIK VERİSİ — hiçbir sayı uydurulmadı, biri de düzeltildi
   Kaynak lib/afterSetup.ts (mali müşavir onaylı kalem listesi) ve canlı
   bölümün kendi META tablosu:
     muhasebe → "Aylık Muhasebe Hizmeti", rhythm "aylik"      → months: 1
     oturum   → "Yatırımcı / İşçi Vizesi ve Emirates ID",
                rhythm "iki-yillik"                            → months: 24
   DİKKAT: Z7 oturumu 12. aya koyup yılda bir yenileme diyordu; afterSetup.ts
   bu kalemi "iki-yillik" olarak tanımlıyor. Z8 veriye uyuyor, bu yüzden ayrıca
   "yenileme dönemleri değişir" diye bir ince yazıya da ihtiyaç kalmıyor —
   satır zaten doğru periyodu söylüyor.
     kurulus  canlı "once"  / "Bir kez"          → biten kısa blok
     banka    canlı "taper" / "Açılış ve takip"  → blok + ince sürekli çizgi
     uyum     canlı "solid" / "Sürekli"          → kesintisiz çizgi
   ONCE_SPAN bir süre İDDİASI değil (kuruluş süresi lisansa göre değişir),
   yalnızca "kısa ve biter" demenin ölçüsü — canlıdaki SPLIT = 24 de öyleydi.
   Ekranda süre olarak hiçbir yerde yazılmıyor, o yüzden çelişecek bir sayı yok.

   ANİMASYON — "biraz canlandır" · üç hareket, üçü de bölümün cümlesi
   Satır başına yine TEK motion düğümü (canlıdaki gibi), satıra hiçbir nesne
   eklenmedi. Gecikme canlının değeri: 0.1 + i*0.12.

   1) PERDE, ÖLÇEK DEĞİL. Çubuk artık scaleX ile büyümüyor; üstündeki perde
      soldan sağa çekiliyor (clip-path inset). Sebep süs değil ölçü: scaleX
      çubuğun DOKUSUNU da esnetiyor, yani "Yılda 12 kez" satırında tırtıklar
      açılış boyunca yanlış aralıkta duruyor ve ancak animasyon bitince doğru
      aralığa oturuyordu. Bu bölümde tırtık aralığı bir ölçü — bir saniye bile
      yanlış göstermek onu tekrar süs yapardı. Perdeyle her işaret doğduğu
      yerde beliriyor: eksen boyunca ay ay konan işaretler.
   2) BİTEN ÇUBUK DURUR, SÜREN ÇUBUK SÜRER. Fark artık süre ve yumuşamada:
      kuruluş 0.5s ve kararlı bir hızlanma-durma eğrisiyle gelip DURUYOR;
      diğer dördü 1.15s ve expo-out ile açılıyor, yani mesafenin son parçasını
      sürünerek alıyor ve tam o sırada maskenin altında sönüyor. Göz hareketi
      "bitti" diye değil "kadraj dışına çıktı" diye kaydediyor.
   3) TEK SÜREKLİ HAREKET, O DA SAF CSS. Sonsuz dönen tek şey Uyum satırındaki
      ışık (lab-z8.css · z8-run): bölümdeki tek "Kesintisiz" iş o. Kural şu —
      HAREKET EDEN SATIR = HİÇ DURMAYAN İŞ. Tekrarlayan iki satır (muhasebe,
      oturum) bilerek duruyor: işaretleri kaydırmak sayılabilirliği bozardı,
      yani "12 işaret sonra 1 yıl" iddiası animasyon boyunca yalan olurdu.
      Kuruluş da duruyor, çünkü bir kez oldu.

   `reduce` yalnızca SÜREYİ sıfırlıyor; render edilen ağaç aynı kalıyor, çünkü
   sunucuda medya sorgusu yok ve istemciye özel bir `initial` hidrasyonla
   çelişirdi (canlı dosyadaki not da bunu söylüyor). Sürekli ışığın reduce
   ve dar ekran ayarları CSS'te, bu dosyadan hiç geçmiyor.
   ========================================================================= */

/** sitenin standart açılış eğrisi: hızlı başlar, sona doğru sürünür */
const EASE = [0.22, 1, 0.36, 1] as const;
/** biten iş için: hızlanır, gelir ve DURUR — sürünen bir kuyruğu yok */
const EASE_STOP = [0.45, 0.05, 0.25, 1] as const;
const VIEW = { once: true, margin: "0px 0px -15% 0px" } as const;

/* Perde. Ölçek yerine kırpma olmasının sebebi yukarıdaki (1) numaralı not:
   kırpma yüzdesi çubuğun KENDİ kutusuna göre çözülüyor ve kutu hiç
   değişmediği için arkadaki desen kıpırdamıyor, yalnızca açılıyor. */
const REVEAL_OFF = { clipPath: "inset(0% 100% 0% 0%)" };
const REVEAL_ON = { clipPath: "inset(0% 0% 0% 0%)" };

/** Eksenin toplam uzunluğu, ay cinsinden. Üç yıl: iki yıllık oturum yenilemesi
 *  bir kez tekrarlanmadan görünmezdi, tekrar okunması için en az iki işaret
 *  gerekiyor. "1 yıl" çizgisi de bu sayıdan çıkıyor, elle konmuyor. */
const SPAN_MONTHS = 36;

/** Kuruluş bloğunun ekseni kapladığı oran (%). Süre iddiası değil: tek işi
 *  "erken bitiyor" demek. Banka satırındaki açılış bloğu da aynı ölçüyü
 *  kullanıyor — iki satır yan yana okunduğunda bölümün cümlesi çizilmiş
 *  oluyor: aynı blok, biri bitiyor, diğerinden ince bir çizgi devam ediyor. */
const ONCE_SPAN = 10;

/** İşaretin genişliği (%). Üst sınır var ki seyrek tekrarlayan iş uzun bir
 *  bant gibi görünmesin ("iki yılda bir olan iş" iki yıl SÜRMÜYOR); periyodun
 *  yarısıyla da sınırlı ki sık tekrarlayan iş dolu bir çubuğa dönüşmesin. */
const MARK_MAX = 1.55;
const MARK_RATIO = 0.52;

type Rhythm =
  /** bir kez olur ve biter */
  | { kind: "once" }
  /** bir kez açılır, sonra düşük seviyede devam eder */
  | { kind: "open" }
  /** `months` ayda bir tekrarlar; hem etiketin rakamı hem çubuğun tırtık
   *  aralığı buradan türüyor, o yüzden ikisi ayrışamaz */
  | { kind: "repeat"; months: number; unit: string }
  /** hiç durmaz — sayılabilir bir olay değil */
  | { kind: "nonstop" };

/* İkonlar ve adresler canlı bölümün META'sıyla birebir aynı; brand.ts'te
   durmadıkları için burada tekrar yazılıyorlar, içerikleri değişmedi. */
const META: Record<string, { Icon: LucideIcon; href: string; rhythm: Rhythm }> = {
  kurulus: { Icon: Building2, href: "/dubai", rhythm: { kind: "once" } },
  banka: { Icon: Landmark, href: "/dubai/banka-hesabi", rhythm: { kind: "open" } },
  muhasebe: {
    Icon: CalendarCheck,
    href: "/dubai/muhasebe",
    rhythm: { kind: "repeat", months: 1, unit: "kez" },
  },
  uyum: { Icon: ShieldCheck, href: "/dubai/uyum", rhythm: { kind: "nonstop" } },
  oturum: {
    Icon: IdCard,
    href: "/dubai/oturum-vize",
    rhythm: { kind: "repeat", months: 24, unit: "yenileme" },
  },
};

/** yüzde değerini CSS'e verilebilir hâle getirir; uzun ondalık kuyruğu yok */
const pct = (n: number) => `${Math.round(n * 1000) / 1000}%`;

/** iki tekrar arasındaki mesafe, eksenin yüzdesi olarak */
const pitchOf = (months: number) => (months / SPAN_MONTHS) * 100;

/** Etiketin tek kaynağı `months`: rakam elle yazılmıyor, bölünerek çıkıyor.
 *  Yılda birden sık olan iş "Yılda N kez", daha seyrek olan "N yılda 1 …". */
function cadenceOf(r: Rhythm): string {
  switch (r.kind) {
    case "once":
      return "Bir kez";
    case "open":
      return "Açılış, sonra takip";
    case "nonstop":
      return "Kesintisiz";
    default: {
      const perYear = 12 / r.months;
      return perYear >= 1
        ? `Yılda ${perYear} ${r.unit}`
        : `${r.months / 12} yılda 1 ${r.unit}`;
    }
  }
}

export default function ChainZ8() {
  const reduce = useReducedMotion();

  return (
    <section className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="sec-head">
          <SplitWords
            as="h2"
            text="Kuruluş bir halka, zincir devam ediyor."
            accent="zincir devam ediyor."
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.2}>
            <p className="sec-lead">Şirket kurulduktan sonra başlayan iş burada.</p>
          </FadeUp>
        </div>

        {/* "1 yıl" çizgisinin yeri de veriden: eksen SPAN_MONTHS ay uzunsa bir
            yıl bunun 12/SPAN_MONTHS'ı. Etiket ile çizgi aynı değişkeni okuyor,
            yani biri kayarsa diğeri de kayıyor. */}
        <div
          className="z8"
          style={{ "--z8-year": pct((12 / SPAN_MONTHS) * 100) } as React.CSSProperties}
        >
          {/* Canlı bölümün .lc-head'i ile aynı ızgarada ve aynı yükseklikte.
              Fark: iki kelime havada durmuyor, üç etiket eksenin gerçek
              noktalarına çapalanmış — başlangıç, bir yıl, açık uç. */}
          <div className="z8-head" aria-hidden="true">
            <span />
            <span className="z8-axis">
              <i className="z8-ax-a">Kuruluş anı</i>
              <i className="z8-ax-y">1 yıl</i>
              <i className="z8-ax-b">süresiz devam ediyor</i>
            </span>
            <span />
          </div>

          <ol className="z8-rows">
            {CHAIN.map((c, i) => {
              /* CHAIN brand.ts'te yazılıyor ve bu dosya ona tip düzeyinde bağlı
                 değil: bilinmeyen bir anahtar sayfayı götürmemeli. */
              const meta = META[c.key];
              if (!meta) return null;
              const { Icon, href, rhythm } = meta;
              const once = rhythm.kind === "once";

              /* Geometri değişken olarak gidiyor: dar ekranda eksen aynı kalıyor
                 (oranlar yüzde), o yüzden canlıdaki gibi mobil için ayrı bir
                 çubuk genişliği ezmesine gerek yok. */
              const pitch = rhythm.kind === "repeat" ? pitchOf(rhythm.months) : 0;
              const vars = {
                "--z8-w": once ? pct(ONCE_SPAN) : "100%",
                "--z8-p": pitch ? pct(pitch) : undefined,
                "--z8-m": pitch ? pct(Math.min(MARK_MAX, pitch * MARK_RATIO)) : undefined,
                "--z8-open": rhythm.kind === "open" ? pct(ONCE_SPAN) : undefined,
              } as React.CSSProperties;

              /* reduce süreyi sıfırlıyor, `initial`'ı düşürmüyor: sunucuda medya
                 sorgusu yok, istemciye özel bir başlangıç hidrasyonla çelişirdi */
              const dur = reduce ? 0 : once ? 0.5 : 1.15;
              const delay = reduce ? 0 : 0.1 + i * 0.12;

              return (
                <li key={c.key}>
                  <SmartLink href={href} className="z8-row">
                    <span className="z8-lab">
                      <span className="z8-t">
                        <Icon
                          className="z8-ic"
                          size={17}
                          strokeWidth={1.9}
                          aria-hidden="true"
                        />
                        {c.label}
                        <ArrowUpRight
                          className="z8-arrow"
                          size={15}
                          strokeWidth={2.1}
                          aria-hidden="true"
                        />
                      </span>
                      <span className="z8-l">{c.line}</span>
                    </span>

                    {/* Çubuk ekran okuyucuya kapalı: taşıdığı bilgiyi sağdaki
                        etiket zaten kelimeyle söylüyor (canlı bölümdeki tercih
                        de aynı). */}
                    <span className="z8-track" aria-hidden="true">
                      <motion.span
                        className="z8-bar"
                        data-kind={rhythm.kind}
                        style={vars}
                        initial={REVEAL_OFF}
                        whileInView={REVEAL_ON}
                        viewport={VIEW}
                        transition={{
                          duration: dur,
                          delay,
                          ease: once ? EASE_STOP : EASE,
                        }}
                      />
                    </span>

                    <span className="z8-cad" data-once={once || undefined}>
                      {cadenceOf(rhythm)}
                    </span>
                  </SmartLink>
                </li>
              );
            })}
          </ol>
        </div>

        <FadeUp delay={0.4}>
          <p className="z8-note">
            Kategorideki firmaların çoğu ilk halkada bitiyor. Ceza da, sorun da sonrasında
            çıkıyor.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
