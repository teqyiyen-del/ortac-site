import type { Metadata } from "next";

import { Flag } from "@/components/shared/CountryPicker";
import { BrandChip } from "@/components/shared/BrandMark";
import { CHAIN, COUNTRY_ORDER } from "@/lib/brand";
import { LEVHA } from "@/lib/about";

/* /lab/hakkimizda-levha — "Neye dayanarak çalışıyoruz" bölümünün bento denemesi.

   19.09.2026 · İKİ GEÇİŞ.

   BİRİNCİ GEÇİŞ ELENDİ ve sebebi net: karolar yalnız rakam + etiket + cümle
   taşıyordu, yani rayın satırları kutuya kondu ve iş bitti sanıldı. Burak:
   "BU NE SAÇMA BENTO … biraz bi görselleştirme bi svg fln bişi yapsaydın. ana
   sayfadaki bento ne güzel mesela, burda bi bok yapmamışsın."

   HAKLI VE ÖLÇÜLEBİLİR: ana sayfanın bentosunda (components/TrustLayer.tsx)
   her karonun KENDİ ÇİZİMİ var — sohbet mokapı, canlı takip şeridi, onarım
   akışı. Karolar birbirinden düzenle değil İÇERİKLE ayrılıyor. Buradaki ilk
   deneme bunu hiç yapmıyordu.

   İKİNCİ GEÇİŞ: beş karonun beşinde de kendi çizimi var ve her çizim o
   karonun rakamını GÖSTERİYOR, tekrar etmiyor.
     3 ülke      → üç bayrak, aralarında tek bir yay (üçü aynı zincir)
     5 halka     → beş numaralı durak, üstlerinden geçen kesintisiz ray
     30 yıl      → zaman çizgisi, son durak dolu
     IFZA        → logo plakası + onay tiki
     Murat Ortaç → baş harf diski + imza çizgisi

   ZİNCİR ÇİZİMİ ARTIK SERBEST. Birinci geçişte "beşinci bölümdeki rayı
   kopyalama" diye bir kısıt vardı; o ray aynı gün sayfadan KALKTI (Burak:
   "kuruluş bitiş değil kısmına ne gerek var"). Zincir artık sayfada tek bir
   yerde anlatılıyor ve o yer burası.

   İMZA ÇİZGİSİ GERÇEK BİR İMZA DEĞİL, soyutlama: uydurma belge ve imza basmak
   bu depoda yasak (docs/tuzaklar.md · değişmez kurallar).

   ÇİZİMLERDE ANİMASYON YOK. Bölüm aktarım kalıbıyla zaten giriş animasyonu
   alıyor; içeride ikinci bir hareket katmanı `useReducedMotion`'ı render
   ağacına sokma riskini (tuzak A) karşılığı olmadan getirirdi. */

export const metadata: Metadata = {
  title: "Neye dayanarak · bento adayları | Ortac Global",
  robots: { index: false, follow: false },
};

const [ULKE, ZINCIR, YIL, IFZA, KISI] = LEVHA;

/* ZİNCİR KAROSUNDA CÜMLE KISALIYOR. Defterdeki satır beş durağı adıyla sayıyor
   ("Kuruluş, Banka & Ödeme, … Zincirin tamamı aynı ekipte.") çünkü canlıdaki
   ray düz bir metin satırı ve sayan başka bir şey yok. Bentoda ÇİZİM sayıyor;
   cümle de sayarsa aynı liste tek karoda iki kez okunuyor (ölçüldü: ilk
   çekimde karonun 58 karakteri birebir tekrar). Sayım kısmı elle yazılmıyor,
   aynı kaynaktan (CHAIN) üretilip cümleden düşülüyor: bir durak eklenirse
   ikisi birden değişiyor. Bento kazanırsa satır about.ts'te kısalacak; lab
   defteri değiştirmiyor. */
const ZINCIR_S = ZINCIR.s.replace(`${CHAIN.map((c) => c.label).join(", ")}. `, "");
const ZINCIR_KARO = { ...ZINCIR, s: ZINCIR_S };

/* ------------------------------------------------------------------ ÇİZİMLER */

/** Üç bayrak, aralarında tek bir yay: "üç ayrı ülke değil, üç ülkeden geçen
 *  tek zincir" — ülke bölümünün kendi teziyle aynı cümle.
 *  Bayrak kabı SABİT PİKSEL (tuzaklar.md · tuzak H): <Flag> çıplak viewBox
 *  basıyor ve kapsız bırakılırsa 300x150'ye şişiyor. */
function CizimUlke() {
  return (
    <span className="lhb-ciz lhb-ciz-ulke" aria-hidden="true">
      <svg viewBox="0 0 220 60" preserveAspectRatio="none" focusable="false">
        <path d="M0 52 C 60 20, 160 20, 220 52" className="lhb-yay" />
      </svg>
      <span className="lhb-diskler">
        {COUNTRY_ORDER.map((c) => (
          <span key={c} className="lhb-disk">
            <Flag country={c} />
          </span>
        ))}
      </span>
    </span>
  );
}

/** Beş durak, üstlerinden geçen kesintisiz ray. Rakamlar 01-05; adlar
 *  defterden (brand.ts · CHAIN), elle yazılmıyor. */
function CizimZincir() {
  return (
    <span className="lhb-ciz lhb-ciz-zincir" aria-hidden="true">
      <span className="lhb-ray" />
      <ol className="lhb-duraklar">
        {CHAIN.map((c, i) => (
          <li key={c.key}>
            <span className="lhb-nokta">{String(i + 1).padStart(2, "0")}</span>
            <span className="lhb-durak-t">{c.label}</span>
          </li>
        ))}
      </ol>
    </span>
  );
}

/** Zaman çizgisi: solda geçmiş, sağda bugün. Son durak dolu, ötekiler boş —
 *  "otuz yıl buraya kadar geldi" cümlesinin çizimi. Yıl yazılmıyor, rakam
 *  karonun kendisinde zaten var. */
function CizimYil() {
  return (
    <span className="lhb-ciz lhb-ciz-yil" aria-hidden="true">
      <span className="lhb-cubuk" />
      <span className="lhb-tikler">
        {Array.from({ length: 6 }, (_, i) => (
          <i key={i} data-son={i === 5 ? "" : undefined} />
        ))}
      </span>
    </span>
  );
}

/** Logo plakası + onay tiki: "resmî iş ortağı" satırının görsel karşılığı.
 *  Rozet değil tek bir tik — iddia büyütülmüyor. */
function CizimIfza() {
  return (
    <span className="lhb-ciz lhb-ciz-ifza" aria-hidden="true">
      <span className="lhb-plaka">
        <BrandChip brand="ifza" withName={false} size={26} />
      </span>
      <span className="lhb-muhur">
        <svg viewBox="0 0 24 24" focusable="false">
          <path d="M5 12.5 10 17.5 19 7" />
        </svg>
      </span>
    </span>
  );
}

/** Baş harf diski + imza çizgisi. Kalıp muhasebe sayfasının imza kutusundan. */
function CizimKisi({ ad }: { ad: string }) {
  return (
    <span className="lhb-ciz lhb-ciz-kisi" aria-hidden="true">
      <span className="lhb-harf">{ad.trim().charAt(0)}</span>
      <svg viewBox="0 0 120 34" className="lhb-imza" focusable="false">
        <path d="M4 26 C 18 4, 26 30, 38 16 S 58 2, 66 20 S 84 28, 94 12 L 116 12" />
      </svg>
    </span>
  );
}

/* --------------------------------------------------------------------- KARO */

function Karo({
  r,
  ciz,
  sinif,
}: {
  r: (typeof LEVHA)[number];
  ciz: React.ReactNode;
  sinif?: string;
}) {
  return (
    <div className={`lhb-karo${sinif ? ` ${sinif}` : ""}`}>
      {/* Çizim ÜSTTE ve karonun artan yerini alıyor; rakam ile cümle altta
          sabit bir künye gibi duruyor. Ana sayfanın bentosundaki sıra da bu. */}
      <span className="lhb-gorsel">{ciz}</span>
      <p className="lhb-n" data-tip={r.tip}>
        {r.n}
      </p>
      <p className="lhb-t">{r.t}</p>
      <p className="lhb-s">{r.s}</p>
    </div>
  );
}

/* ============================================================== L1 · 2 + 4 */
/* Üst satır: 3 ülke (2 sütun) + zincir (4 sütun). Alt satır üç eşit karo.
   En büyük karo (zincir) aynı zamanda en SEYREK karo — eski bento turunun
   kendi kuralı ("hiçbir karo hem en büyük hem en yoğun olmasın"). */
function L1() {
  return (
    <div className="lhb-bento" data-aday="l1">
      <Karo r={ULKE} sinif="lhb-w2" ciz={<CizimUlke />} />
      <Karo r={ZINCIR_KARO} sinif="lhb-w4" ciz={<CizimZincir />} />
      <Karo r={YIL} sinif="lhb-w2" ciz={<CizimYil />} />
      <Karo r={IFZA} sinif="lhb-w2" ciz={<CizimIfza />} />
      <Karo r={KISI} sinif="lhb-w2" ciz={<CizimKisi ad={KISI.n} />} />
    </div>
  );
}

/* ========================================================= L2 · TEK BÜYÜK */
/* Zincir karosu sol sütunu baştan sona tutuyor ve çizimi DİKEY akıyor; sağda
   dört karo alt alta ikişerli. Bütün karolar üç sütun, yani beş öge altı
   sütunluk ızgarada DELİK BIRAKMADAN oturuyor.
   İLK DENEMEDE 4 + dört tane 2 vardı ve son satırda iki sütunluk boş bir
   hücre kalıyordu (çekimde görüldü): beş öge, 4+2 / 4+2 / 2+2+? dizilişinde
   asla kapanmıyor. Üç sütun bunu yapısal olarak çözüyor.
   Kıyasın asıl sorusu: zincirin beş durağı DİKEY mi daha okunur, yatay mı. */
function L2() {
  return (
    <div className="lhb-bento" data-aday="l2">
      <Karo r={ZINCIR_KARO} sinif="lhb-w3 lhb-h2 lhb-dikey" ciz={<CizimZincir />} />
      <Karo r={ULKE} sinif="lhb-w3" ciz={<CizimUlke />} />
      <Karo r={YIL} sinif="lhb-w3" ciz={<CizimYil />} />
      <Karo r={IFZA} sinif="lhb-w3" ciz={<CizimIfza />} />
      <Karo r={KISI} sinif="lhb-w3" ciz={<CizimKisi ad={KISI.n} />} />
    </div>
  );
}

/* ====================================================== L3 · ZİNCİR GECE */
/* L1'in aynısı, tek fark: zincir karosu GECE yüzey. Bölümün tek koyu karosu o
   ve bentoya bir ağırlık merkezi veriyor — ana sayfanın bentosunda da iki
   karo gece, ikisi beyaz. */
function L3() {
  return (
    <div className="lhb-bento" data-aday="l3">
      <Karo r={ULKE} sinif="lhb-w2" ciz={<CizimUlke />} />
      <Karo r={ZINCIR_KARO} sinif="lhb-w4 lhb-gece" ciz={<CizimZincir />} />
      <Karo r={YIL} sinif="lhb-w2" ciz={<CizimYil />} />
      <Karo r={IFZA} sinif="lhb-w2" ciz={<CizimIfza />} />
      <Karo r={KISI} sinif="lhb-w2" ciz={<CizimKisi ad={KISI.n} />} />
    </div>
  );
}

const ADAYLAR = [
  {
    kod: "l1",
    ad: "L1 · 2 + 4, sonra üç eşit",
    not: "Üst satırda üç ülke ve zincir, alt satırda otuz yıl, IFZA ve Murat Ortaç. En büyük karo aynı zamanda en seyrek karo.",
    B: L1,
  },
  {
    kod: "l2",
    ad: "L2 · Zincir iki satır birden",
    not: "Zincir karosu sol sütunu baştan sona tutuyor ve beş durak DİKEY akıyor. Beş öge üç sütunluk karolarla delik bırakmadan oturuyor. Soru şu: zincir dikey mi daha okunur, yatay mı.",
    B: L2,
  },
  {
    kod: "l3",
    ad: "L3 · Zincir karosu gece",
    not: "L1'in aynısı, tek fark zincir karosunun gece yüzey olması. Bentonun ağırlık merkezi oraya kayıyor; ana sayfadaki bentoda da iki karo gece.",
    B: L3,
  },
];

export default function LevhaBentoLab() {
  return (
    <main>
      <div className="lgc-kunye">
        <span>Aday · neye dayanarak</span>
        <h1>Levha bento olursa</h1>
        <p>
          Bölüm bugün beş <b>eşit</b> satırlık bir ray, ama ögeler eşit değil: cümleler 74 ile 127
          karakter arasında, üçünde rakam var, ikisinde özel ad.
        </p>
        <p>
          Beş karonun beşinde de <b>kendi çizimi</b> var ve her çizim o karonun rakamını gösteriyor,
          tekrar etmiyor. İçerik birebir defterden (about.ts · LEVHA); değişen yalnız düzen.
        </p>
      </div>

      {ADAYLAR.map((a) => (
        <section key={a.kod} className="lhb-blok">
          <div className="container-o">
            <p className="lhb-etiket">{a.ad}</p>
            <p className="lhb-not">{a.not}</p>
            <a.B />
          </div>
        </section>
      ))}
    </main>
  );
}
