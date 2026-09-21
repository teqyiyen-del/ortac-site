import type { Metadata } from "next";
import { Check, MapPin } from "lucide-react";

import { Flag } from "@/components/shared/CountryPicker";
import { BrandChip } from "@/components/shared/BrandMark";
import Logo from "@/components/shared/Logo";
import { CHAIN, COUNTRY_NAME } from "@/lib/brand";
import { LEVHA, LEVHA_ULKE_SIRASI } from "@/lib/about";

/* /lab/hakkimizda-levha — "Neye dayanarak çalışıyoruz" bölümünün bento denemesi.

   ÜÇ GEÇİŞ. Düzen birinci geçişten beri aynı (2+4 · tek büyük · gece karo);
   elenen şey her seferinde KARONUN İÇİ oldu.

   1. GEÇİŞ · karolarda görsel yoktu, yalnız rakam + etiket + cümle vardı, yani
      rayın satırları kutuya kondu ve iş bitti sanıldı. Burak: "BU NE SAÇMA
      BENTO … ana sayfadaki bento ne güzel mesela, burda bi bok yapmamışsın."

   2. GEÇİŞ · her karoya çizim kondu ama çizimler SOYUTTU: bir yay, bir zaman
      çizgisi, bir tik. Yine elendi ve Burak sorunu kendisi adlandırdı: düzen
      değil çizimler kötüydü, "ana sayfadaki bento gibi gerçek mini görseller"
      olmalı.

   3. GEÇİŞ (burası) · ÇİZİM DEĞİL SAHNE. Ana sayfanın bentosunda
      (components/TrustLayer.tsx) karoların içi diyagram değil, ürünün kendisine
      benzeyen küçük ekranlar: LiveChat bir sohbet penceresi, LiveTracker bir
      takip panosu, "devralınan dosyalar" karosu satır satır bir onarım listesi.
      Göz onları çizim olarak değil EKRAN olarak okuyor. Beş sahne o dilde:

        3 ülke      → ofis panosu: üç satır, bayrak + ülke + "Ofis" rozeti
        5 halka     → takip panosu: beş durak, altlarından geçen ray
        30 yıl      → dosya yığını: üst üste üç belge kartı
        IFZA        → iki plaka, aralarında onay halkası (arada kimse yok)
        Murat Ortaç → belge önizlemesi: gövde satırları ve imza çizgisi

   SAHTE BELGE İÇERİĞİ YOK. Dosya yığınındaki ve imza belgesindeki satırlar gri
   kutucuk; bir kurum adı, bir numara ya da bir tarih basılmıyor. İmza çizgisi
   de gerçek bir imza değil, soyutlama (docs/tuzaklar.md · değişmez kurallar:
   uydurma firma bilgisi ve belge yasak). İki markanın işareti gerçek, ikisi de
   deponun kendi bileşeninden geliyor — taklidi çizilmiyor.

   İÇERİK BİREBİR DEFTERDEN (about.ts · LEVHA). Ülke sırası da defterden
   (LEVHA_ULKE_SIRASI): yoksa aynı karoda cümle bir sırayla, sahne başka bir
   sırayla sayardı (sahne önce menü sırasını kullanıyordu).

   SAHNELERDE ANİMASYON YOK. Bölüm aktarım kalıbıyla zaten giriş animasyonu
   alıyor; içeride ikinci bir hareket katmanı `useReducedMotion`'ı render
   ağacına sokma riskini (tuzak A) karşılığı olmadan getirirdi. Ana sayfadaki
   sahneler canlı, ama onlar SÜREÇ anlatıyor (yüzde ilerliyor, mesaj geliyor);
   burada anlatılan şey duran bir durum. */

export const metadata: Metadata = {
  title: "Neye dayanarak · bento adayları | Ortac Global",
  robots: { index: false, follow: false },
};

const [ULKE, ZINCIR, YIL, IFZA, KISI] = LEVHA;

/* ZİNCİR KAROSUNDA CÜMLE KISALIYOR. Defterdeki satır beş durağı adıyla sayıyor
   ("Kuruluş, Banka & Ödeme, … Zincirin tamamı aynı ekipte.") çünkü canlıdaki
   ray düz bir metin satırı ve sayan başka bir şey yok. Bentoda PANO sayıyor;
   cümle de sayarsa aynı liste tek karoda iki kez okunuyor (ölçüldü: ilk
   çekimde karonun 58 karakteri birebir tekrar). Sayım kısmı elle yazılmıyor,
   aynı kaynaktan (CHAIN) üretilip cümleden düşülüyor: bir durak eklenirse
   ikisi birden değişiyor. Bento kazanırsa satır about.ts'te kısalacak; lab
   defteri değiştirmiyor. Ülke karosunda aynı kesme YOK: oradaki cümlenin asıl
   yükü sayım değil, "üçünü de kendimiz yürütüyoruz". */
const ZINCIR_S = ZINCIR.s.replace(`${CHAIN.map((c) => c.label).join(", ")}. `, "");
const ZINCIR_KARO = { ...ZINCIR, s: ZINCIR_S };

/* ------------------------------------------------------------------ SAHNELER */

/** Ofis panosu. Üç satır, her satırda bayrak + ülke + "Ofis" rozeti — panelden
 *  alınmış bir konum listesi gibi. Bayrak kabı SABİT PİKSEL (tuzak H): <Flag>
 *  çıplak viewBox basıyor ve kapsız bırakılırsa 300x150'ye şişiyor. */
function SahneUlke() {
  return (
    <span className="lhb-pano" aria-hidden="true">
      {LEVHA_ULKE_SIRASI.map((c) => (
        <span key={c} className="lhb-sat">
          <span className="lhb-bayrak">
            <Flag country={c} />
          </span>
          <span className="lhb-sat-t">{COUNTRY_NAME[c]}</span>
          <span className="lhb-cip">
            <MapPin size={11} strokeWidth={2.2} />
            Ofis
          </span>
        </span>
      ))}
    </span>
  );
}

/** Takip panosu. Beş durak, altlarından geçen kesintisiz ray. Geniş karoda
 *  duraklar yan yana; L2'nin uzun karosunda (.lhb-dikey) alt alta ve her satır
 *  kendi beyaz kutusunda — o hâli ana sayfadaki LiveTracker'ın dili. */
function SahneZincir() {
  return (
    <span className="lhb-pano lhb-pano-ray" aria-hidden="true">
      <ol className="lhb-duraklar">
        {CHAIN.map((c, i) => (
          <li key={c.key} className="lhb-durak">
            <span className="lhb-durak-n">{String(i + 1).padStart(2, "0")}</span>
            <span className="lhb-durak-t">{c.label}</span>
          </li>
        ))}
      </ol>
    </span>
  );
}

/** Dosya yığını: üst üste üç belge kartı, öndeki içeriğiyle. Satırlar gri
 *  kutucuk — uydurma bir belge basmıyoruz, bir belgenin BİÇİMİNİ basıyoruz. */
function SahneYil() {
  return (
    <span className="lhb-yigin" aria-hidden="true">
      <span className="lhb-belge lhb-belge-3" />
      <span className="lhb-belge lhb-belge-2" />
      <span className="lhb-belge lhb-belge-1">
        <span className="lhb-belge-bas" />
        <span className="lhb-belge-sat" />
        <span className="lhb-belge-sat lhb-belge-sat-k" />
      </span>
    </span>
  );
}

/** İki plaka, aralarında onay halkası: "arada bir aracı yok". Soldaki bizim
 *  markamız, sağdaki IFZA'nınki; ikisi de gerçek işaret. Rozet değil tek bir
 *  tik — iddia büyütülmüyor. */
function SahneIfza() {
  return (
    <span className="lhb-kopru" aria-hidden="true">
      <span className="lhb-plaka">
        <Logo height={15} />
      </span>
      <span className="lhb-bag">
        <i />
        <span className="lhb-muhur">
          <Check size={13} strokeWidth={3} />
        </span>
        <i />
      </span>
      <span className="lhb-plaka">
        <BrandChip brand="ifza" withName={false} size={22} />
      </span>
    </span>
  );
}

/** Belge önizlemesi: gövde satırları, altında imza alanı ve çizgisi. İmza
 *  çizgisi gerçek bir imza değil, soyutlama.
 *  SIFAT BURADA YAZMIYOR ("Certified Accountant"): karonun kendi etiketi zaten
 *  o kelime ve belgeye de yazılınca aynı sıfat tek karoda iki kez okunuyordu
 *  (ilk çekimde görüldü). Belge sıfatı değil imzanın kendisini gösteriyor. */
function SahneKisi() {
  return (
    <span className="lhb-imzabelge" aria-hidden="true">
      <span className="lhb-belge-sat" />
      <span className="lhb-belge-sat lhb-belge-sat-k" />
      <span className="lhb-imza-alan">
        <svg viewBox="0 0 120 30" className="lhb-imza" focusable="false">
          <path d="M4 22 C 18 2, 26 27, 38 13 S 58 0, 66 17 S 84 25, 94 9 L 116 9" />
        </svg>
        <span className="lhb-imza-cizgi" />
      </span>
    </span>
  );
}

/* --------------------------------------------------------------------- KARO */

function Karo({
  r,
  sahne,
  sinif,
}: {
  r: (typeof LEVHA)[number];
  sahne: React.ReactNode;
  sinif?: string;
}) {
  return (
    <div className={`lhb-karo${sinif ? ` ${sinif}` : ""}`}>
      {/* Sahne ÜSTTE ve karonun artan yerini alıyor; rakam ile cümle altta
          sabit bir künye gibi duruyor. Ana sayfanın bentosundaki sıra da bu. */}
      <span className="lhb-gorsel">{sahne}</span>
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
      <Karo r={ULKE} sinif="lhb-w2" sahne={<SahneUlke />} />
      <Karo r={ZINCIR_KARO} sinif="lhb-w4" sahne={<SahneZincir />} />
      <Karo r={YIL} sinif="lhb-w2" sahne={<SahneYil />} />
      <Karo r={IFZA} sinif="lhb-w2" sahne={<SahneIfza />} />
      <Karo r={KISI} sinif="lhb-w2" sahne={<SahneKisi />} />
    </div>
  );
}

/* ========================================================= L2 · TEK BÜYÜK */
/* Zincir karosu sol sütunu baştan sona tutuyor ve panosu DİKEY akıyor; sağda
   dört karo alt alta ikişerli. Bütün karolar üç sütun, yani beş öge altı
   sütunluk ızgarada DELİK BIRAKMADAN oturuyor.
   İLK DENEMEDE 4 + dört tane 2 vardı ve son satırda iki sütunluk boş bir
   hücre kalıyordu (çekimde görüldü): beş öge, 4+2 / 4+2 / 2+2+? dizilişinde
   asla kapanmıyor. Üç sütun bunu yapısal olarak çözüyor.
   Kıyasın asıl sorusu: zincirin beş durağı DİKEY mi daha okunur, yatay mı. */
function L2() {
  return (
    <div className="lhb-bento" data-aday="l2">
      <Karo r={ZINCIR_KARO} sinif="lhb-w3 lhb-h2 lhb-dikey" sahne={<SahneZincir />} />
      <Karo r={ULKE} sinif="lhb-w3" sahne={<SahneUlke />} />
      <Karo r={YIL} sinif="lhb-w3" sahne={<SahneYil />} />
      <Karo r={IFZA} sinif="lhb-w3" sahne={<SahneIfza />} />
      <Karo r={KISI} sinif="lhb-w3" sahne={<SahneKisi />} />
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
      <Karo r={ULKE} sinif="lhb-w2" sahne={<SahneUlke />} />
      <Karo r={ZINCIR_KARO} sinif="lhb-w4 lhb-gece" sahne={<SahneZincir />} />
      <Karo r={YIL} sinif="lhb-w2" sahne={<SahneYil />} />
      <Karo r={IFZA} sinif="lhb-w2" sahne={<SahneIfza />} />
      <Karo r={KISI} sinif="lhb-w2" sahne={<SahneKisi />} />
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
    not: "Zincir karosu sol sütunu baştan sona tutuyor ve beş durak DİKEY akıyor — ana sayfadaki takip panosunun dili. Beş öge üç sütunluk karolarla delik bırakmadan oturuyor.",
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
          Karoların içi çizim değil <b>sahne</b>: ofis panosu, takip panosu, dosya yığını, iki
          plaka arasında onay, imzalı belge. Ana sayfanın bentosundaki dil bu — göz onları diyagram
          olarak değil ekran olarak okuyor. İçerik birebir defterden (about.ts · LEVHA); değişen
          yalnız düzen.
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
