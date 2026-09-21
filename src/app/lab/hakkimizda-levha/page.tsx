import type { Metadata } from "next";
import Image from "next/image";

import { Flag } from "@/components/shared/CountryPicker";
import { BrandChip } from "@/components/shared/BrandMark";
import { COUNTRY_ORDER } from "@/lib/brand";
import { LEVHA } from "@/lib/about";
import { TEAM_PHOTO } from "@/lib/media";

/* /lab/hakkimizda-levha — "Neye dayanarak çalışıyoruz" bölümünün bento denemesi.

   19.09.2026 · Burak: "şu neye dayanarak çalışıyoruz kısmı var ya hakkımızda
   sayfasında. orayı bento yapma şansımız var mı ya? bir deneyelim nasıl durur
   falan diye görmek istiyorum. ee, bir dene yani."

   NEDEN MANTIKLI: bölüm bugün beş EŞİT satırlık bir ray, ama ögeler eşit
   değil. Cümleler 74 ile 127 karakter arasında (1,72 kat yayılım), üçünde
   54 px'lik rakam var, ikisinde 27 px'lik özel ad. Rayın kendi ölçümü de
   bunu söylüyor: satır boyları 139,3 / 139,3 / 139,3 / 112,3 / 114,1 px,
   yani ray zaten iki farklı boyda satır taşıyor ve bunu gizlemeye çalışıyor.

   BENTO'NUN KENDİ KURALI (eski bento turundan, hakkimizda.css): hiçbir karo
   hem EN BÜYÜK hem EN YOĞUN olmamalı. Üç adayın üçünde de en büyük karo en
   SEYREK karo — "uyumsuz" şikâyetinin ölçülen sebebi baştan kapanıyor.

   ESKİ BENTO NEDEN KALKMIŞTI: "bento bir dizindi" — karolar sayfanın
   altındaki bölümleri tekrar ediyordu. Bu yüzden zincir karosunda beşinci
   bölümdeki rayın çizimi KOPYALANMIYOR, yalnız beş ad düz metin duruyor.

   ÜÇ EŞİT SÜTUNLU bir ızgara hiç denenmedi ve denenmemeli: sayfanın alt
   yarısında zaten DÖRT ardışık `repeat(3)` ızgara var (ülkeler, kurumlar,
   ilkeler, sektörler); beşincisi o duvarı büyütürdü. */

export const metadata: Metadata = {
  title: "Neye dayanarak · bento adayları | Ortac Global",
  robots: { index: false, follow: false },
};

const [ULKE, ZINCIR, YIL, IFZA, KISI] = LEVHA;

/* Karonun ortak iskeleti: rakam/ad + etiket + cümle. Adaylar arasındaki fark
   YALNIZ DÜZEN olsun diye içerik tek yerden basılıyor. */
function Karo({
  r,
  gorsel,
  sinif,
}: {
  r: (typeof LEVHA)[number];
  gorsel?: React.ReactNode;
  sinif?: string;
}) {
  return (
    <div className={`lhb-karo${sinif ? ` ${sinif}` : ""}`}>
      {/* Görsel yuvası HER KAROda duruyor, boş olsa bile: yoksa görseli olan
          ve olmayan karoların rakamları farklı yükseklikte başlıyor ve satır
          tırtıklanıyor. */}
      <span className="lhb-gorsel" aria-hidden="true">
        {gorsel}
      </span>
      <p className="lhb-n" data-tip={r.tip}>
        {r.n}
      </p>
      <p className="lhb-t">{r.t}</p>
      <p className="lhb-s">{r.s}</p>
    </div>
  );
}

/* Üç bayrak diski: "3 ülke" karosunun görseli. Sayfada zaten var
   (.ab-cn-flag), yeni bir dil doğmuyor. */
function UcBayrak() {
  return (
    <span className="lhb-bayraklar">
      {COUNTRY_ORDER.map((c) => (
        <span key={c} className="lhb-bayrak">
          <Flag country={c} />
        </span>
      ))}
    </span>
  );
}

/* ZİNCİR KAROSUNUN GÖRSELİ YOK ve bu bir karar. Önce beş ad düz metin olarak
   karonun tepesine konmuştu; ölçüldü ve AYNI BEŞ AD karonun cümlesinde zaten
   yazılı (about.ts · LEVHA[1].s) — yani karo aynı listeyi iki kez basıyordu.
   Beşinci bölümdeki ışıklı ray da kopyalanmadı: eski bentonun kalkma sebebi
   tam olarak o tekrardı ("bento bir dizindi"). Geniş karo boşluğunu nefes
   olarak taşıyor. */

/* Kişinin baş harfi. Kalıp muhasebe sayfasının imza kutusundan. */
function BasHarf({ ad }: { ad: string }) {
  return <span className="lhb-harf">{ad.trim().charAt(0)}</span>;
}

/* ============================================================== L1 · 2 + 4 */
/* Üst satır: 3 ülke (2 sütun, üç bayrak) + zincir (4 sütun, beş ad).
   Alt satır: 30 yıl + IFZA + Murat Ortaç, üçü 2'şer sütun.
   İki satır da delik bırakmadan kapanıyor. En büyük karo (zincir) aynı
   zamanda en seyrek karo. */
function L1() {
  return (
    <div className="lhb-bento" data-aday="l1">
      <Karo r={ULKE} sinif="lhb-w2" gorsel={<UcBayrak />} />
      <Karo r={ZINCIR} sinif="lhb-w4" />
      <Karo r={YIL} sinif="lhb-w2" />
      <Karo r={IFZA} sinif="lhb-w2" gorsel={<BrandChip brand="ifza" withName={false} size={22} />} />
      <Karo r={KISI} sinif="lhb-w2" gorsel={<BasHarf ad={KISI.n} />} />
    </div>
  );
}

/* ========================================================= L2 · TEK BÜYÜK */
/* Zincir karosu iki satır birden tutuyor (4 sütun × 2 satır) ve sağında dört
   küçük karo 2'şer sütunla diziliyor. Bölümün tezi "zincirin tamamı aynı
   ekipte" olduğu için en büyük yüzey ona veriliyor. */
function L2() {
  return (
    <div className="lhb-bento" data-aday="l2">
      <Karo r={ZINCIR} sinif="lhb-w4 lhb-h2" />
      <Karo r={ULKE} sinif="lhb-w2" gorsel={<UcBayrak />} />
      <Karo r={YIL} sinif="lhb-w2" />
      <Karo r={IFZA} sinif="lhb-w2" gorsel={<BrandChip brand="ifza" withName={false} size={22} />} />
      <Karo r={KISI} sinif="lhb-w2" gorsel={<BasHarf ad={KISI.n} />} />
    </div>
  );
}

/* ====================================================== L3 · KİŞİ FOTOĞRAFLI */
/* L1'in aynısı, tek fark: Murat Ortaç karosu gece yüzey ve ekip fotoğrafını
   taşıyor. Bölümün tek insan ögesi o ve sayfanın açılışında zaten bir ekip
   karesi var (lib/media.ts · TEAM_PHOTO, SWAP:STOCK_PHOTOS).
   RİSK: fotoğraf "bu bizim ekibimiz" diye okunuyor, oysa kare temsilî ve
   sayfa bunu açılışta ayrıca yazıyor. Aday listede, ama seçilirse künye
   satırı şart. */
function L3() {
  return (
    <div className="lhb-bento" data-aday="l3">
      <Karo r={ULKE} sinif="lhb-w2" gorsel={<UcBayrak />} />
      <Karo r={ZINCIR} sinif="lhb-w4" />
      <Karo r={YIL} sinif="lhb-w2" />
      <Karo r={IFZA} sinif="lhb-w2" gorsel={<BrandChip brand="ifza" withName={false} size={22} />} />
      <div className="lhb-karo lhb-w2 lhb-gece">
        <span className="lhb-foto" aria-hidden="true">
          <Image src={TEAM_PHOTO} alt="" fill sizes="360px" unoptimized />
        </span>
        <span className="lhb-perde" aria-hidden="true" />
        <span className="lhb-uzeri">
          <p className="lhb-n" data-tip="ad">
            {KISI.n}
          </p>
          <p className="lhb-t">{KISI.t}</p>
        </span>
      </div>
    </div>
  );
}

const ADAYLAR = [
  {
    kod: "l1",
    ad: "L1 · 2 + 4, sonra üç eşit",
    not: "Üst satırda üç ülke (iki sütun, üç bayrak) ve zincir (dört sütun, beş ad). Alt satırda otuz yıl, IFZA ve Murat Ortaç. En büyük karo aynı zamanda en seyrek karo.",
    B: L1,
  },
  {
    kod: "l2",
    ad: "L2 · Zincir iki satır birden",
    not: "Bölümün tezi “zincirin tamamı aynı ekipte”; en büyük yüzey ona veriliyor. Sağında dört küçük karo.",
    B: L2,
  },
  {
    kod: "l3",
    ad: "L3 · Kişi karosu fotoğraflı",
    not: "L1'in aynısı, tek fark Murat Ortaç karosunun gece yüzey ve ekip karesi taşıması. Fotoğraf temsilî — seçilirse künye satırı şart.",
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
          karakter arasında, üçünde rakam var, ikisinde özel ad. Rayın kendi ölçümü de bunu söylüyor
          — satırlar 139 ve 112 px olmak üzere iki ayrı boyda.
        </p>
        <p>
          Üçünde de içerik birebir aynı ve <b>defterden</b> (about.ts · LEVHA); değişen yalnız
          düzen. Üç eşit sütunlu bir ızgara bilerek denenmedi: sayfanın alt yarısında zaten dört
          ardışık üçlü ızgara var.
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
