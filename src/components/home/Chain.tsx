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
   §5 — "Kuruluş bir halka, zincir devam ediyor" · ad alanı .chn-

   Bu bölüm dört tur denendi (karar kaydı: /lab/zincir) ve seçilen Z8 buraya
   alındı. Z8'in kuralı "ekleme yok, düzeltme var" idi: bölümün açık, kutusuz,
   ferah düzeni — sec-pad + container-o + sec-head, beyaz zemin, satır listesi —
   olduğu gibi duruyor; satır başına okunacak nesne sayısı da aynı kaldı:
   ad + cümle + TEK çubuk + sıklık etiketi. Değişen iki şey var, ikisi de
   müşteriden gelen iki yorumun karşılığı:

   1) "Şirket kuruluşdaki siyah çizgi neden solda?"
      Eski çizimde kuruluş 0→%24, diğer dördü %24→%100 idi; yani kuruluşu ayıran
      şey KONUMU idi ve ekseni adlandıran hiçbir şey yoktu, o yüzden konum keyfi
      görünüyordu. Yatay kaydırma silindi: beş çubuk da aynı yerden, kuruluş
      anından başlıyor. Kuruluşu ayıran şey artık tek biten çubuk olması.
      Ekseni iki şey adlandırıyor ve ikisi de eskiden de vardı: havada duran iki
      kelimenin yerini eksenin gerçek noktalarına çapalı üç etiket aldı
      ("Kuruluş anı" · "1 yıl" · "süresiz devam ediyor"), ve satırlar boyunca
      inen adsız dikey çizgi kaldırılmadı, 1. yılın hizasına taşınıp ADLANDIRILDI.

   2) "Çok soyut, neyi ifade ettiğini anlamaz insanlar."
      Sıklık iki yerde birden soyuttu: çubuğun DOKUSUNDA (düz / sık tırtıklı /
      seyrek tırtıklı) ve etiketin KELİMESİNDE ("Dönemsel", "Yenilemeli" — ikisi
      de ne sıklıkta olduğunu söylemiyor). İkisi de somutlaştı: etiket sayıya
      döndü ve tırtık aralığı aynı sayıdan türüyor, yani "Yılda 12 kez" yazan
      satırda "1 yıl" çizgisine kadar tam 12 işaret var. İsteyen sayar, kimse
      saymak zorunda değil; resim ile yazının çelişmesi imkânsız, ikisi de tek
      bir `months` değerinden çıkıyor.

   SIKLIK VERİSİ — türetiliyor, elle yazılmıyor
   Kaynak lib/afterSetup.ts (mali müşavir onaylı kalem listesi):
     muhasebe → "Aylık Muhasebe Hizmeti", rhythm "aylik"       → months: 1
     oturum   → "Yatırımcı / İşçi Vizesi ve Emirates ID",
                rhythm "iki-yillik"                             → months: 24
   Bu türetme bir veri hatası da yakaladı: bölümün eski "Yenilemeli" kelimesi
   vizenin İKİ YILLIK olduğunu söylemiyordu. Etiket bölünerek üretildiği için
   ("2 yılda 1 yenileme") aynı hata bir daha sessizce duramaz.

   ANİMASYON — açılış bir kez, nefes hiç durmadan
   Satır başına yine TEK motion düğümü; satıra hiçbir nesne eklenmedi.
   Gecikme bölümün kendi değeri: 0.1 + i*0.12, yani zincir yukarıdan aşağı
   kuruluyor.
     1) PERDE, ÖLÇEK DEĞİL. Çubuk scaleX ile büyümüyor, üstündeki perde soldan
        sağa çekiliyor (clip-path inset). Sebep süs değil ölçü: scaleX çubuğun
        DOKUSUNU da esnetiyor, yani "Yılda 12 kez" satırında tırtıklar açılış
        boyunca yanlış aralıkta duruyordu ve ancak animasyon bitince doğru
        aralığa oturuyordu. Bu bölümde tırtık aralığı bir ölçü — bir saniye bile
        yanlış göstermek onu tekrar süs yapardı. Perdeyle her işaret doğduğu
        yerde beliriyor: eksen boyunca ay ay konan işaretler.
     2) BİTEN ÇUBUK DURUR, SÜREN ÇUBUK SÜRER. Kuruluş 0.5s ve kararlı bir
        hızlanma-durma eğrisiyle gelip DURUYOR; diğer dördü 1.15s ve expo-out
        ile açılıyor, mesafenin son parçasını sürünerek alıyor ve tam o sırada
        maskenin altında sönüyor. Göz "bitti" diye değil "kadraj dışına çıktı"
        diye kaydediyor.
     3) AÇILIŞ BİTİYOR, BÖLÜM BİTMİYOR. Perde bir kez iniyor; altındaki dört
        açık uçlu çubuk ondan sonra da nefes almaya devam ediyor. Açık uçlu
        dört çubuğun üstünden aynı geçiş dolaşıyor (css/chain.css · chn-run /
        chn-pass / chn-trail): tek hız, tek periyot, yalnız fazları farklı —
        dört ayrı efekt değil, bölümün içinde dolaşan tek dalga. Kuruluş
        satırı katılmıyor: bir kez oldu ve bitti, hareketsizliği bir bilgi.
        Kural şu — hareket eden satır = bitmeyen iş; bölümün cümlesi
        ("kuruluş biter, gerisi bitmez") duran bir çubuk ile dört hareketli
        çubuk arasındaki farkta okunuyor.
        İŞARETLERİN YERİ HİÇ DEĞİŞMİYOR: tekrarlayan satırlarda tırtıklar
        artık boya değil MASKE, kayan şey maskenin altındaki ışık. "1 yıl
        çizgisine kadar 12 işaret" iddiası animasyonun her karesinde doğru;
        işaretler yerinde durup sırayla aydınlanıyor.
        Hepsi saf CSS (background-position): karede JS çalışmıyor, sekme
        arkadayken tarayıcı animasyonu park edebiliyor.
   `reduce` yalnızca SÜREYİ sıfırlıyor, `initial`'ı düşürmüyor: sunucuda medya
   sorgusu yok, istemciye özel bir başlangıç hidrasyonla çelişirdi. Sürekli
   geçişin reduce ve dar ekran ayarları CSS'te; bu dosyadan geçen tek şey faz,
   o da `reduce`'a değil satır sırasına bağlı — yani sunucu ile istemci aynı
   değeri yazıyor.
   ========================================================================= */

/** sitenin standart açılış eğrisi: hızlı başlar, sona doğru sürünür */
const EASE = [0.22, 1, 0.36, 1] as const;
/** biten iş için: hızlanır, gelir ve DURUR — sürünen bir kuyruğu yok */
const EASE_STOP = [0.45, 0.05, 0.25, 1] as const;
const VIEW = { once: true, margin: "0px 0px -15% 0px" } as const;

/* Perde. Ölçek yerine kırpma olmasının sebebi yukarıdaki (1) numaralı not:
   kırpma yüzdesi çubuğun KENDİ kutusuna göre çözülüyor ve kutu hiç değişmediği
   için arkadaki desen kıpırdamıyor, yalnızca açılıyor. */
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

/** Sürekli geçişin satırlar arasındaki faz kayması (saniye). Dört çubuk aynı
 *  periyotta (CSS · --chn-dur) dönüyor; onları ayıran tek şey bu. Değer
 *  periyodun beşte birine yakın seçildi: satırlar ne aynı anda parlıyor
 *  (tek bir yanıp sönme olurdu) ne de birbirinden kopuyor.
 *  İşaret negatif ve sıralama ters (CHAIN.length - i): dalga yukarıdan aşağı
 *  iniyor, yani açılış perdesinin yönünü sürdürüyor. Negatif olması ayrıca
 *  hiçbir çubuğun "başlamayı beklemesini" engelliyor. */
const PHASE_STEP = 1.7;

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

/* İkonlar ve adresler bölümün ilk yazımındakiyle birebir aynı. */
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

export default function Chain() {
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
          className="chn"
          style={{ "--chn-year": pct((12 / SPAN_MONTHS) * 100) } as React.CSSProperties}
        >
          {/* Eksen çizilmiyor, hazır duruyor: çerçeve sabit, yalnızca veri
              açılıyor. Üç etiket de eksenin gerçek bir noktasına çapalı —
              başlangıç, bir yıl, açık uç. */}
          <div className="chn-head" aria-hidden="true">
            <span />
            <span className="chn-axis">
              <i className="chn-ax-a">Kuruluş anı</i>
              <i className="chn-ax-y">1 yıl</i>
              <i className="chn-ax-b">süresiz devam ediyor</i>
            </span>
            <span />
          </div>

          <ol className="chn-rows">
            {CHAIN.map((c, i) => {
              /* CHAIN brand.ts'te yazılıyor ve bu dosya ona tip düzeyinde bağlı
                 değil: bilinmeyen bir anahtar sayfayı götürmemeli. */
              const meta = META[c.key];
              if (!meta) return null;
              const { Icon, href, rhythm } = meta;
              const once = rhythm.kind === "once";

              /* Geometri değişken olarak gidiyor: dar ekranda eksen aynı kalıyor
                 (oranlar yüzde), o yüzden mobil için ayrı bir çubuk genişliği
                 ezmesine gerek yok. */
              const pitch = rhythm.kind === "repeat" ? pitchOf(rhythm.months) : 0;
              const vars = {
                "--chn-w": once ? pct(ONCE_SPAN) : "100%",
                "--chn-p": pitch ? pct(pitch) : undefined,
                "--chn-m": pitch ? pct(Math.min(MARK_MAX, pitch * MARK_RATIO)) : undefined,
                "--chn-open": rhythm.kind === "open" ? pct(ONCE_SPAN) : undefined,
                /* Sürekli geçişin fazı. `reduce`'a bakmıyor bilerek: hidrasyon
                   sunucu ile istemcinin aynı stili yazmasını istiyor, hareketi
                   kapatan yer CSS medya sorgusu. */
                "--chn-phase": `-${((CHAIN.length - i) * PHASE_STEP).toFixed(2)}s`,
              } as React.CSSProperties;

              /* reduce süreyi sıfırlıyor, `initial`'ı düşürmüyor: sunucuda medya
                 sorgusu yok, istemciye özel bir başlangıç hidrasyonla çelişirdi */
              const dur = reduce ? 0 : once ? 0.5 : 1.15;
              const delay = reduce ? 0 : 0.1 + i * 0.12;

              return (
                <li key={c.key}>
                  <SmartLink href={href} className="chn-row">
                    <span className="chn-lab">
                      <span className="chn-t">
                        <Icon
                          className="chn-ic"
                          size={17}
                          strokeWidth={1.9}
                          aria-hidden="true"
                        />
                        {c.label}
                        <ArrowUpRight
                          className="chn-arrow"
                          size={15}
                          strokeWidth={2.1}
                          aria-hidden="true"
                        />
                      </span>
                      <span className="chn-l">{c.line}</span>
                    </span>

                    {/* Çubuk ekran okuyucuya kapalı: taşıdığı bilgiyi sağdaki
                        etiket zaten kelimeyle söylüyor. */}
                    <span className="chn-track" aria-hidden="true">
                      <motion.span
                        className="chn-bar"
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

                    <span className="chn-cad" data-once={once || undefined}>
                      {cadenceOf(rhythm)}
                    </span>
                  </SmartLink>
                </li>
              );
            })}
          </ol>
        </div>

        <FadeUp delay={0.4}>
          <p className="chn-note">
            Kategorideki firmaların çoğu ilk halkada bitiyor. Ceza da, sorun da sonrasında
            çıkıyor.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
