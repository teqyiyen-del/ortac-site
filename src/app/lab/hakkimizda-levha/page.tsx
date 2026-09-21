import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Building2,
  Calculator,
  Check,
  FileCheck2,
  FileText,
  Handshake,
  History,
  Landmark,
  Link2,
  RefreshCw,
  Stamp,
} from "lucide-react";

import { Flag } from "@/components/shared/CountryPicker";
import { BrandChip } from "@/components/shared/BrandMark";
import Logo from "@/components/shared/Logo";
import { CHAIN, COUNTRY_NAME, type CountrySlug } from "@/lib/brand";
import { BASIS, LEVHA, type AboutIcon } from "@/lib/about";

/* /lab/hakkimizda-levha — "Neye dayanarak çalışıyoruz" bölümünün bento denemesi.

   DÖRT GEÇİŞ. İlk üçü elendi ve üçünün de elenme sebebi aynı kökten:

   1 · karolarda görsel yoktu (rakam + etiket + cümle).
   2 · görsel kondu ama SOYUTTU (yay, zaman çizgisi, tik).
   3 · görseller "sahne"ye çevrildi ama küçük ve gri kaldılar; Burak: "bunlar
       kötü tasarım olarak. Boxların ölçüsüyle bi derdimiz yok, anasayfadaki
       gibi güzel fln olmalı."

   KÖK SEBEP, ANA SAYFANIN BENTOSUNA BAKINCA GÖRÜLDÜ (ilk üç geçişte koduna
   bakılmış, ekranına bakılmamıştı). O bentonun grameri buradakinin TERSİ:

     · Karo BAŞLIKLA açılıyor (ikon kuyusu + 20 px başlık + tek cümle), dev bir
       rakamla değil. "3 · 5 · 30" rakam dili bir istatistik panosunun dili;
       ana sayfada "30 yıllık kurumsal geçmiş" bile rakam olarak değil BAŞLIK
       olarak duruyor.
     · Sahne karonun YARISINDAN FAZLASINI kaplıyor ve karoyu dolduruyor. İlk üç
       geçişte sahneler 136 px'lik nesnelerdi ve beyaz boşlukta yüzüyorlardı.
     · Sahnelerin içi DOLU: "Merve · danışmanınız", "Canlı durum %50", "Eksik
       yenileme · kapatıldı". Üçüncü geçişin gri kutucukları bitmemiş bir ekran
       iskeleti gibi okunuyordu.
     · RENK VAR: yeşil "Tamam", amber "Eksik dosya", mavi çubuk. Üçüncü geçişte
       yalnız --blue-100 ve gri vardı.
     · Karolar 28 px köşeli, 26 px dolgulu, bölüm zemini kırık beyaz, dört
       karonun ikisi GECE.

   DÖRDÜNCÜ GEÇİŞ BU GRAMERLE YAZILDI ve karo kabuğu ana sayfanınkiyle AYNI
   SINIFLAR (.bn-tile · .bn-ic · .bn-title · .bn-line): "ana sayfadaki gibi"
   demenin en sağlam yolu aynı kabuğu kullanmak. Sahneler bu sayfaya özel
   (.lhb-) ve beşi de deponun GERÇEK verisiyle dolu:

     ofisler   → harita kesiti: üç bayraklı konum hapı, aralarında tek rota
     zincir    → takip panosu: beş halka, her birinin kendi alt satırı (CHAIN)
     30 yıl    → "tek çatı" panosu: cümledeki beş dosya türü, ikonlu
     IFZA      → ortaklık kartı + doğrudan başvuru akışı (iki renkli düğüm)
     lisans    → imzalı hizmet belgesi: başlık, gövde, imza bloğu

   METİNLER DEFTERDEN. Dört karonun başlık + cümle çifti BASIS.cards'tan
   (müşterinin onayladığı çiftler), zincir karosu LEVHA'dan. Dosya türleri bile
   elle yazılmıyor: "30 yıl" cümlesinden ayrıştırılıyor, cümle değişirse pano
   da değişiyor.

   UYDURMA OLGU YOK. Belgenin gövdesi gri satır (bir belgenin biçimi, içeriği
   değil); numara, tarih, kurum adı basılmıyor. İmza çizgisi gerçek bir imza
   değil. İki marka işareti gerçek ve deponun kendi bileşeninden geliyor.

   ÜÇ ADAYIN DÜZENİ AYNI (Burak: "boxların ölçüsüyle bi derdimiz yok"); değişen
   yalnız tasarım dili. Kıyas o yüzden temiz: aynı beş sahne, üç ayrı kabuk.

   SAHNELERDE ANİMASYON YOK — lab aşaması. Kazanan canlıya geçerken ana
   sayfadaki gibi giriş hareketi alabilir; o zaman tuzak A'ya (useReducedMotion
   render ağacına girmesin) dikkat. */

export const metadata: Metadata = {
  title: "Neye dayanarak · bento adayları | Ortac Global",
  robots: { index: false, follow: false },
};

/* ---------------------------------------------------------------- METİNLER */

/* Kartlar sıra numarasıyla değil İKONLA bulunuyor (about.ts · kart() ile aynı
   gerekçe): sıra değişirse sessizce yanlış cümle basılmasın, gürültüyle
   patlasın. */
function kart(icon: AboutIcon) {
  const k = BASIS.cards.find((c) => c.icon === icon);
  if (!k) throw new Error(`BASIS.cards içinde "${icon}" kartı yok; bento bu karta bağlı.`);
  return k;
}
const OFIS = kart("office");
const GECMIS = kart("history");
const ORTAK = kart("handshake");
const LISANS = kart("stamp");

const [, ZINCIR, , IFZA_SATIR, KISI] = LEVHA;

/* Zincir karosunda cümlenin SAYIM kısmı düşüyor: beş halkayı pano adıyla ve
   alt satırıyla zaten sayıyor. Sayım elle kesilmiyor, aynı kaynaktan (CHAIN)
   üretilip cümleden çıkarılıyor. */
const ZINCIR_BASLIK = `${ZINCIR.n} ${ZINCIR.t}`;
const ZINCIR_CUMLE = ZINCIR.s.replace(`${CHAIN.map((c) => c.label).join(", ")}. `, "");

/* "Tek çatı" panosunun satırları CÜMLEDEN AYRIŞTIRILIYOR: "Kuruluş, lisans
   yenileme, muhasebe, beyan ve banka dosyası; hepsi …" → noktalı virgüle kadar
   olan kısım, virgül ve "ve" ile bölünüyor. Elle ikinci bir liste yazılsaydı
   cümle değiştiği gün pano eski listeyi basardı. */
const DOSYALAR = GECMIS.s
  .split(";")[0]
  .split(/, | ve /)
  .map((d) => d.trim())
  .filter(Boolean)
  .map((d) => d.charAt(0).toLocaleUpperCase("tr") + d.slice(1));
const DOSYA_IKON: LucideIcon[] = [FileText, RefreshCw, Calculator, FileCheck2, Landmark];

/* Harita kesitindeki konumlar enlem-boylam DEĞİL (kesit bir harita değil,
   olmayan bir hassasiyet iddia etmiyor) ama keyfî de değil: batıdan doğuya,
   kuzeyden güneye — İngiltere sol üstte, KKTC ortada, Dubai sağ altta. Ana
   sayfadaki kürenin işaretleri de aynı mantıkla dizili (Authority.tsx). */
const KONUM: { c: CountrySlug; x: number; y: number }[] = [
  { c: "ingiltere", x: 24, y: 30 },
  { c: "kktc", x: 52, y: 56 },
  { c: "dubai", x: 76, y: 80 },
];

const buyukHarf = (s: string) => s.charAt(0).toLocaleUpperCase("tr") + s.slice(1);

/* ------------------------------------------------------------------ SAHNELER */

/** Harita kesiti: noktalı zemin, üç konum hapı, aralarından geçen tek rota.
 *  Haplar ana sayfadaki kürenin haplarıyla aynı dilde (beyaz, gölgeli, bayrak
 *  + ad). SEÇİCİ `> svg`: çıplak `svg` yazılırsa kural hapların içindeki
 *  bayrakları da yakalıyor (bu depoda bir kez yaşandı: 38 px diskte 323 px
 *  bayrak). */
function SahneHarita() {
  return (
    <div className="lhb-harita" aria-hidden="true">
      <span className="lhb-harita-tag">Ofislerimiz</span>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false">
        <path d="M24 30 C 34 34, 42 50, 52 56 S 68 74, 76 80" />
      </svg>
      {KONUM.map((k) => (
        <span key={k.c} className="lhb-pin" style={{ left: `${k.x}%`, top: `${k.y}%` }}>
          <span className="lhb-pin-b">
            <Flag country={k.c} />
          </span>
          {COUNTRY_NAME[k.c]}
        </span>
      ))}
    </div>
  );
}

/** Takip panosu: ana sayfadaki LiveTracker'ın dili (başlık satırı, çubuk,
 *  durum noktalı satırlar). Fark: orada süreç YÜRÜYOR (yüzde ilerliyor), burada
 *  anlatılan duran bir durum — beş halkanın beşi de aynı ekipte, o yüzden çubuk
 *  dolu ve beş nokta da tamam. Alt satırlar defterden (brand.ts · CHAIN.line).
 *  `yatay`: N2'nin geniş karosunda sahne ÜSTTE ve enine uzanıyor; beş halka
 *  orada beş sütun. N1 ve N3'te pano geniş karonun sağ yarısında, dikey. */
function SahneZincir({ yatay = false }: { yatay?: boolean }) {
  return (
    <div className={`lhb-tr${yatay ? " lhb-tr-yatay" : ""}`} aria-hidden="true">
      <div className="lhb-tr-bas">
        <span>Aynı ekipte</span>
        <b>
          {CHAIN.length} / {CHAIN.length}
        </b>
      </div>
      <span className="lhb-tr-bar" />
      <ol className="lhb-tr-l">
        {CHAIN.map((c) => (
          <li key={c.key} className="lhb-tr-s">
            <span className="lhb-tr-n">
              <Check size={12} strokeWidth={3.2} />
            </span>
            <span className="lhb-tr-b">
              <b>{c.label}</b>
              <i>{c.line}</i>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** "Tek çatı" panosu: üstte bizim işaretimiz (çatı), altında cümlenin saydığı
 *  beş dosya türü. Ana sayfadaki "devralınan dosyalar" karosu da aynı şeyi
 *  yapıyor: cümlenin saydıklarını satır satır ekrana döküyor. */
function SahneCati() {
  return (
    <div className="lhb-cati" aria-hidden="true">
      <div className="lhb-cati-bas">
        <Logo height={14} />
        <span>Tek çatı</span>
      </div>
      <ul className="lhb-cati-l">
        {DOSYALAR.map((d, i) => {
          const Ikon = DOSYA_IKON[i] ?? FileText;
          return (
            <li key={d}>
              <Ikon size={14} strokeWidth={2} />
              {d}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** Ortaklık kartı + doğrudan başvuru akışı. Akış ana sayfadaki "Eksik dosya →
 *  Devralındı" çiftinin dili: iki renkli düğüm, aralarında ok. Arada üçüncü
 *  bir düğüm YOK — "bir aracı üzerinden değil, doğrudan" cümlesinin çizimi. */
function SahneOrtak() {
  return (
    <div className="lhb-ortak" aria-hidden="true">
      <div className="lhb-ortak-kart">
        <BrandChip brand="ifza" withName={false} size={34} />
        <span className="lhb-durum">
          <Check size={12} strokeWidth={3} />
          {buyukHarf(IFZA_SATIR.t)}
        </span>
      </div>
      <div className="lhb-akis">
        <span className="lhb-dugum lhb-dugum-biz">
          <span className="lhb-dugum-m">
            <Logo height={13} />
          </span>
          Başvuru
        </span>
        <span className="lhb-ok">
          <span />
          <ArrowRight size={14} strokeWidth={2.2} />
        </span>
        <span className="lhb-dugum lhb-dugum-ok">
          <span className="lhb-dugum-m">
            <BrandChip brand="ifza" withName={false} size={20} />
          </span>
          Serbest bölge
        </span>
      </div>
    </div>
  );
}

/** İmzalı hizmet belgesi. Gövde gri satır: bir belgenin BİÇİMİ, içeriği değil
 *  (uydurma belge bu depoda yasak). İmza bloğundaki ad ve sıfat defterden
 *  (LEVHA · Murat Ortaç satırı); çizgi gerçek bir imza değil, soyutlama. */
function SahneBelge() {
  return (
    <div className="lhb-blg-sahne" aria-hidden="true">
      <div className="lhb-blg">
        <div className="lhb-blg-bas">
          <span className="lhb-blg-ic">
            <FileText size={14} strokeWidth={2} />
          </span>
          <b>Hizmet belgesi</b>
          <span className="lhb-durum">
            <Check size={12} strokeWidth={3} />
            İmzalı
          </span>
        </div>
        <span className="lhb-cizgi" />
        <span className="lhb-cizgi" />
        <span className="lhb-cizgi lhb-cizgi-k" />
        <div className="lhb-blg-imza">
          <svg viewBox="0 0 120 30" focusable="false">
            <path d="M4 22 C 18 2, 26 27, 38 13 S 58 0, 66 17 S 84 25, 94 9 L 116 9" />
          </svg>
          <span className="lhb-blg-rule" />
          <b>{KISI.n}</b>
          <i>{KISI.t}</i>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------- KAROLAR */

type KaroVeri = {
  kod: "gecmis" | "ofis" | "zincir" | "lisans" | "ortak";
  Ikon: LucideIcon;
  t: string;
  s: string;
  /* Tek sahne prop alıyor (zincir · `yatay`); ötekiler propsuz ve daha az
     parametreli bir işlev bu tipe zaten atanabiliyor. */
  Sahne: (p: { yatay?: boolean }) => React.ReactElement;
};

/* DÜZEN: üstte GENİŞ zincir karosu (4 sütun) + ofisler (2), altta üç eşit
   karo. Beş öge, delik yok.
   İLK DENEMEDE ZİNCİR UZUN KAROYDU (2 sütun × 2 satır, ana sayfada sohbetin
   tuttuğu yer) ve tutmadı: iki satır yüksekliğindeki karo 940 px ediyor, beş
   satırlık pano ise 380 px istiyor — halkalar 157 px arayla dağıldı (çekimde
   görüldü). Sohbet o boyu dolduruyor çünkü mesajlar uzuyor; beş satır uzamıyor.
   Geniş karo ana sayfadaki geniş karonun kuruluşu: solda başlık, sağda sahne. */
const KAROLAR: KaroVeri[] = [
  { kod: "zincir", Ikon: Link2, t: ZINCIR_BASLIK, s: ZINCIR_CUMLE, Sahne: SahneZincir },
  { kod: "ofis", Ikon: Building2, t: OFIS.t, s: OFIS.s, Sahne: SahneHarita },
  { kod: "gecmis", Ikon: History, t: GECMIS.t, s: GECMIS.s, Sahne: SahneCati },
  { kod: "ortak", Ikon: Handshake, t: ORTAK.t, s: ORTAK.s, Sahne: SahneOrtak },
  { kod: "lisans", Ikon: Stamp, t: LISANS.t, s: LISANS.s, Sahne: SahneBelge },
];

/** N1 ve N3'ün ortak karosu: ana sayfanın kabuğu. Geniş karoda metin solda bir
 *  sütun (.bn-copy), sahne sağda — ana sayfadaki geniş karonun kuruluşu. */
function AnaKaro({ k, sinif }: { k: KaroVeri; sinif: string }) {
  const metin = (
    <>
      <span className="bn-ic">
        <k.Ikon size={18} strokeWidth={1.9} />
      </span>
      <h3 className="bn-title">{k.t}</h3>
      <p className="bn-line">{k.s}</p>
    </>
  );
  const genis = k.kod === "zincir";
  return (
    <div className={`bn-tile${genis ? " bn-tile-wide lhb-genis" : ""}${sinif}`}>
      {genis ? <div className="bn-copy">{metin}</div> : metin}
      <k.Sahne />
    </div>
  );
}

/* =========================================================== N1 · İKİZ */
/* Ana sayfanın kabuğu birebir: ikon kuyusu, başlık, cümle ve karoyu dolduran
   sahne. İki karo gece (geniş zincir karosu + lisans), üçü beyaz; gece karolar
   çapraz duruyor (sol üst · sağ alt), ana sayfada da öyle. */
function N1() {
  const GECE = new Set(["zincir", "lisans"]);
  return (
    <div className="lhb-izgara" data-aday="n1">
      {KAROLAR.map((k) => (
        <AnaKaro key={k.kod} k={k} sinif={GECE.has(k.kod) ? " bn-tile-dark lhb-gece" : ""} />
      ))}
    </div>
  );
}

/* ================================================== N2 · SAHNE ÜSTTE */
/* Okuma sırası ters: önce ekran, sonra yazı. Sahne karonun üstünde kırık
   beyaz bir çerçevenin içinde duruyor (ekran görüntüsü dili), başlık ve cümle
   altında. İkon kuyusu yok — onun işini sahne görüyor. Tamamı beyaz. Geniş
   karoda zincir panosu ENİNE uzanıyor: beş halka, beş sütun. */
function N2() {
  return (
    <div className="lhb-izgara" data-aday="n2">
      {KAROLAR.map((k) => (
        <div key={k.kod} className={`lhb-k2${k.kod === "zincir" ? " lhb-k2-genis" : ""}`}>
          <div className="lhb-k2-sahne">
            {k.kod === "zincir" ? <SahneZincir yatay /> : <k.Sahne />}
          </div>
          <h3 className="lhb-k2-t">{k.t}</h3>
          <p className="lhb-k2-s">{k.s}</p>
        </div>
      ))}
    </div>
  );
}

/* ================================================= N3 · GECE YOK, MAVİ */
/* N1'in grameri, tek fark: gece karo yok. Geniş zincir karosu marka mavisi
   (--blue-900, beyaz yazı 7,14:1), geri kalan dördü beyaz. Gerekçe bu SAYFAYA
   özel: bölümün hemen altında zaten gece bir bölüm var ("Üç ülkede
   çalışıyoruz") ve Burak iki koyu alanın yakınlığından şikâyet etmişti. */
function N3() {
  return (
    <div className="lhb-izgara" data-aday="n3">
      {KAROLAR.map((k) => (
        <AnaKaro key={k.kod} k={k} sinif={k.kod === "zincir" ? " lhb-mavi" : ""} />
      ))}
    </div>
  );
}

const ADAYLAR = [
  {
    kod: "n1",
    ad: "N1 · Ana sayfanın ikizi",
    not: "Kabuk ana sayfadaki bentoyla aynı: ikon, başlık, cümle ve karoyu dolduran sahne. İki karo gece (geniş zincir karosu ve lisans), üçü beyaz.",
    B: N1,
  },
  {
    kod: "n2",
    ad: "N2 · Sahne üstte, yazı altta",
    not: "Okuma sırası ters: önce ekran, sonra yazı. Sahneler kırık beyaz bir çerçevenin içinde, ekran görüntüsü gibi. İkon kuyusu yok, tamamı beyaz.",
    B: N2,
  },
  {
    kod: "n3",
    ad: "N3 · Gece yok, zincir marka mavisi",
    not: "N1'in grameri ama koyu karo yok: geniş zincir karosu marka mavisi. Bölümün hemen altında zaten gece bir bölüm var; iki koyu alan üst üste binmiyor.",
    B: N3,
  },
];

export default function LevhaBentoLab() {
  return (
    <main>
      <div className="lgc-kunye">
        <span>Aday · neye dayanarak</span>
        <h1>Levha bento olursa · dördüncü geçiş</h1>
        <p>
          İlk üç geçiş elendi ve kök sebep ana sayfadaki bentoya <b>bakınca</b> görüldü: orada karo
          başlıkla açılıyor (dev bir rakamla değil), sahne karonun yarısından fazlasını dolduruyor,
          içi gerçek içerikle dolu ve renk var. Buradakiler dev rakam + küçük gri nesnelerdi.
        </p>
        <p>
          Üç adayın <b>düzeni aynı</b>, değişen yalnız tasarım dili. Kabuk ana sayfanın kendi karo
          sınıfları; sahnelerin içi deponun gerçek verisi (zincirin alt satırları, ülke adları,
          cümledeki dosya türleri, IFZA işareti, imza bloğu).
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
