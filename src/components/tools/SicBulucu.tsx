"use client";

import { useEffect, useId, useState, type CSSProperties } from "react";
import {
  Briefcase,
  Building2,
  CalendarClock,
  Check,
  ClipboardCopy,
  ClipboardList,
  Code,
  Copy,
  Droplets,
  Factory,
  Globe,
  GraduationCap,
  Handshake,
  HardHat,
  HeartPulse,
  House,
  Info,
  Landmark,
  Languages,
  Layers,
  ListChecks,
  ListOrdered,
  ListTree,
  MonitorSmartphone,
  Network,
  Palette,
  Pickaxe,
  Plus,
  RefreshCw,
  Search,
  Shield,
  ShieldCheck,
  Ship,
  ShoppingCart,
  Sprout,
  TriangleAlert,
  Truck,
  UtensilsCrossed,
  Wrench,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import AskCta from "@/components/shared/AskCta";
import {
  AracKunye,
  Bant,
  Derin,
  DerinListe,
  Dip,
  GirdiSatiri,
  Kaynak,
  Kural,
  Sayac,
  Tezgah,
  Yardim,
} from "@/components/tools/ToolShell";
import type { CeviriAnahtari, SicMotor, SicSatir } from "@/lib/tools/sic";

/* ============================================================================
   İNGİLTERE SIC KODU BULUCU · CSS: src/app/css/araclar-sic.css (.ta-sic-)
   ============================================================================

   Kural ve veri lib/tools/sic.ts'te; burada yalnızca arayüz var. Bu ayrım
   isim üretecindekiyle aynı gerekçeli: çeviri yardımının listesine bakıp
   ekleyip çıkarmak isteyen bileşeni açmak zorunda kalmıyor.

   ---------------------------------------------------------------------------
   VERİ SONRADAN GELİYOR — `import()` ve bunun ekrandaki üç sonucu

   731 kod küçültülmüş hâlde ~52 KB, gzip ~16 KB (ölçüm ve gerekçe sic.ts'in
   başında). Düz import edilseydi registry.tsx üzerinden bütün araç
   sayfalarına inerdi; o yüzden bileşen ilk çizimden sonra veriyi ayrı parça
   olarak istiyor. Ekrandaki karşılıkları:

     1) Sunucuda ve ilk karede sonuç yok, yalnız bandın yönergesi var. Sorgu
        da boş olduğu için bu bir kayıp değil; ilk tuşa basılana kadar parça
        çoktan gelmiş oluyor.
     2) Parça gelmeden çipe basan kısa bir an "Kod listesi yükleniyor…"
        görüyor; sonuç parça gelince kendiliğinden çıkıyor, tekrar basmak
        gerekmiyor (sorgu durumda bekliyor).
     3) Parça yüklenemezse (bağlantı koptu, yayın arası eski sayfa) sessiz
        kalmıyor: ne olduğunu söylüyor ve Companies House'un kendi listesine
        bağlantı veriyor.

   Tipler `import type` ile geliyor; o satır derlemede tamamen siliniyor,
   yani bu dosya sic.ts'ten tek bayt taşımıyor.

   ---------------------------------------------------------------------------
   KURALLAR NEREDEN — 11.09.2026'da resmî kaynaktan açılıp okundu

   Kural dipnotu ve açılırlardaki notlar aşağıdaki sayfaların bizzat
   okunmasıyla yazıldı. Doğrulanamayan hiçbir kural (ör. kod değişikliğinin
   ücreti, süresi) yazılmadı.

     · En az bir, en fazla dört kod — Companies House blogu, 12.10.2021
       ("you can select up to 4 SIC codes") ve 28.05.2026 ("You must provide
       at least one code, and you can select up to 4…"). Defterin dört
       yuvası (EN_COK) bu cümleden.
     · Sonradan değişir, confirmation statement ile — aynı iki yazı ("If you
       need to update your SIC code, file a confirmation statement"; erken
       verilebildiği 2021 yazısında) + gov.uk "Filing your company's
       confirmation statement" (ek bilgi bölümünde SIC kodu; "at least once
       every year"; erken verince yeni bildirim tarihi seçiliyor).
     · Yalnız kısaltılmış listedeki kodlar — gov.uk yayın sayfası: "Only use
       SIC codes on the condensed list when filing to Companies House or your
       filing may be rejected." Kısaltmanın NE olduğu ise bizim ölçümümüz
       (sic.ts: ONS'nin en ayrıntılı basamağındaki 728 kodun hepsi listede,
       listede olmayan şey alt kırılımı olan sınıfların kendi kodu, ör. 56100).
     · 99999 / 74990 uyarısı — 28.05.2026 yazısı: "Using a dormant or
       non-trading code for an active company is one of the most common
       discrepancies we see."
     · UK SIC 2026 notu — ONS'nin UK SIC 2026 sayfası (03.08.2026 güncel)
       onu istatistikte kullanılan güncel sınıflama diye tanıtıyor; Companies
       House aynı 28.05.2026 yazısının altındaki bir soruya "A future SIC
       code framework is under active discussion between Companies House and
       ONS, but no final framework has yet been agreed or implemented" diye
       cevap vermiş. gov.uk yayın sayfası bugün hâlâ SIC 2007 kısaltılmış
       listesini istiyor.

   `rates.ts`'teki `confirmed: false` sözleşmesi burada devreye girmiyor:
   araç oran ya da eşik üretmiyor, kurallar da müşteri teyidine değil resmî
   kaynağa dayanıyor ve kaynak bağlantıları kural dipnotunun altında duruyor.

   ---------------------------------------------------------------------------
   SUNUM · 12.09.2026 · TEZGÂH DİLİNE GEÇİŞ (A2)

   Bir tur önce bu araç uygunluk testinin İKİ PANELLİ kurgusundaydı: solda
   beyaz çalışma paneli, sağda gece "başvuru defteri". Müşteri o kurguyu geri
   çevirdi ("tüm araçlarda sağ tarafa siyah alan koy onun içinde dönsün her
   şey gibi bir şey demedimki sana amk ben") ve A2'yi seçti: doğru referans
   test değil SİTENİN KENDİ HESAPLAYICISI (CountryTax.tsx · .txm-).

   ARAMA MANTIĞINA YİNE DOKUNULMADI: sorgu, yalınlaştırma, sıra ve sayfalama
   sic.ts'te ve bu dosyada eskisi gibi (`ara`, `sonuc`, `kalan`, `bulunamadi`
   satırları bayt bayt eski dosyadan; `altCumle`'nin dalları da aynı). Değişen
   sunum:

     künye      "SIC kodu" + büyük bayrak; ÜLKE PİLİ YOK (tek ülkeli araç)
     tezgâh     tek panel · kicker; İKİNCİ DEĞİŞKEN ÇİPİ YOK
     girdi      geniş tek arama kutusu; altında sık aranan iş türü çipleri
     BANT       cevap · sayfanın tek gece yüzeyi: kaç kod eşleşti
     defter     bandın altında, bölüşümün yerinde: dört yuva + kopyalama
     liste      eşleşen kodlar · "nasıl çıktı" satırlarının kabuğunda
     kural      tek satırlık "Uygulanan kural" + üç kaynak çipi
     dip        soru çıkışı, sonra açılır notlar

   A2'NİN HANGİ PARÇASI NEDEN ALINMADI (sözleşmenin 1. kuralı: karşılığı
   olmayan parça basılmaz, boş bırakılmaz)

     SÜRGÜ            Bir SAYININ ölçeği. Burada girdi bir metin; "yazılım"
                      kelimesinin ekseni yok.
     HAZIR TUTARLAR   Bileşen `degerler: number[]` alıyor. Buradaki karşılık
                      metin + ikon olduğu için ortak `Hazirlar` çağrılmadı,
                      ama ORTAK SINIFLAR (.ta-hazir · .ta-hazir-k ·
                      .ta-hazir-b) aynen kullanıldı: ölçü ve görünüş
                      birebir aynı, yalnız içerik metin. (Rapor notu:
                      Hazirlar'ın metin + ikon kabul etmesi sözleşmeye
                      eklenmeli; o gün buradaki yerel işaretleme silinir.)
     BÖLÜŞÜM          Bir bütünün payları + TEK BÜYÜK RAKAM. Aramada
                      bölünecek bütün yok. Çeviri yardımı / resmî tanım
                      ayrımı gerçek bir pay ama 40 px'lik bir rakamı hak
                      etmiyor: o bilgi zaten bandın alt cümlesinde YAZIYLA
                      duruyor (eski .ta-dilim pay çubuğu bu yüzden kalktı).
     SATIRLAR/Satir   Bileşenin mini çubuğu bir oranı çiziyor; kod listesinde
                      oran yok. KABUĞU (.ta-satirlar: kağıt zemin, 28 px köşe,
                      18/26/20 dolgu, satır arası 1 px ayraç) kullanıldı,
                      bileşeni değil.
     HALKA/GÖSTERGE   Halka bir paydayı ister; "7 kod bulundu"nun paydası yok.
     İKİNCİ DEĞİŞKEN  Tezgâhın sağ üst köşesi (Cipler) boş: aramanın kipini
                      (kod / metin) kişi seçmiyor, yazdığı şey belirliyor.
     ÜLKE PİLLERİ     Araç tek ülkeli; AracKunye `yol` almayınca pil basmıyor.

   BAŞLIKTAKİ SAYAÇ KALKTI. Eski künyede sağda "00 / 04" duruyordu; o köşe
   öteki araçlarda "kaçıncı adım" demekti ve burada "kaç kod seçildi" diyordu,
   yani aynı yerde iki anlam. Yeni sözleşmede künyenin sağı ülke pilleri (ya
   da ülkesiz araçta rozet) için. Sayı kaybolmadı, ait olduğu yere geçti:
   defterin başlık satırında "02 / 04".

   "BİLMENİZ GEREKEN ÜÇ ŞEY" İNDİ. Üç sütunlu blok ailenin en kalabalık
   yüzeyiydi (üç disk + üç başlık + üç paragraf + üç kaynak çipi). A2'nin
   karşılığı tek satırlık kural dipnotu: üç kuralın üçü de tek cümlede,
   kaynak çipleri altında, ayrıntı açılırda. Cümlelerin hiçbiri yeniden
   yazılmadı, açılırlara taşındı.

   ---------------------------------------------------------------------------
   BAŞVURU DEFTERİ · KORUNDU, GECE PANELDEN ÇIKTI

   Sözleşmenin 2. kuralı: sayfada TEK koyu yüzey var, o da Bant. Defterin
   eski evi gece paneldi; kurgu kalkınca defterin kendisi kalktı mı? Hayır —
   defter bir GÖRÜNÜM değil bir DAVRANIŞ: Companies House en az bir, en fazla
   dört kod istiyor, listedeki "Ekle" kodu bir yuvaya alıyor, defter aramalar
   arasında korunuyor (yazılım arayıp 62012'yi, danışmanlık arayıp 70229'u
   ekleyen kişi ikisini birlikte görüyor) ve hepsi tek düğmeyle kopyalanıyor.
   Arama sonucunu değiştirmiyor, yalnız bu bileşenin durumu.

   Yeni yeri: bandın ALTINDA, bölüşümün durduğu yer (.ta-serit kabuğu — üstte
   1 px ayraç, başlık satırı solda, sayı sağda). Dört yuva yan yana; dolu
   yuva --blue-100 haplı (kod --text-900 ile 17,58:1), boş yuva kesik
   çerçeveli ve SIRADAKİ boş yuva periyodun bir anında bir kez yanıyor.

   DEFTERDEN TEK PARÇA DÜŞTÜ: yuvanın kendi kopyalama düğmesi. Aynı kod
   listede de kopyalanabiliyor ve "Hepsini kopyala" tek kod seçiliyken de
   çalışıyor; yuvada iki daire düğme (kopyala + çıkar) 4 yuvada 8 küçük
   hedef demekti. `Kopya.yer` da bu yüzden iki değere indi.

   Defter sayfada tutuluyor (adrese ya da depoya yazılmıyor); dipnotu bunu
   söylüyor. Müşteri istemezse `defter` durumu ve tek blok silinir, arama
   aynen çalışır — rapordaki açık soru, bir tur önceki gibi.

   ---------------------------------------------------------------------------
   SATIR · "kod büyük, kopyala düğmesi, bölüm harfi ikonlu çip"

     kod      20 px/700, sabit sütun (masaüstü) — gözün taradığı şey kod
     kopyala  kodun hemen altında; sessiz hap, satır başına dolu düğme yok
     tanım    Companies House'un İngilizce yazımı AYNEN (çevrilmedi)
     çip      bölümün ikonu + harfi + TÜİK adı. İkonlar SÜS (aria-hidden),
              eşleme aşağıda BOLUM_IKON'da ve bir tasarım kararı, veri değil
     ekle     sağda; defterdeyse dolu (--blue-900, beyazla 7,14:1) ve
              "Defterde" diyor, basınca çıkarıyor

   <select> YOK. `useReducedMotion` YOK (tuzak A): sıralı beliriş, yuvanın
   dolması ve sıradaki yuvanın nabzı CSS'te, `no-preference` kapısında.
   ========================================================================= */

/* Sık aranan iş türleri. Tip, çipin çeviri yardımında karşılığı olan bir
   anahtar olmasını zorunlu kılıyor: listede olmayan bir kelime yazılırsa
   `satisfies` derleme hatası veriyor, yani boş sonuç veren bir çip doğamıyor.
   Seçim durum.md'deki araç listesinin örneklerinden ve Ortac'ın üç ülkede
   kurduğu şirketlerin sık faaliyetlerinden; "holding" İngiltere'de grup
   yapısı kuranlar için.

   İkon SÜS (çipin adı kelimenin kendisi). Ölçüldü (sic.ts ile, 12.09.2026):
   sekiz çipin sonuç sayısı 2 ile 7 arası — çip hiçbir zaman uzun bir liste
   açmıyor. */
const HAZIR = [
  { q: "yazılım", ikon: Code },
  { q: "e-ticaret", ikon: ShoppingCart },
  { q: "danışmanlık", ikon: Handshake },
  { q: "dış ticaret", ikon: Ship },
  { q: "emlak", ikon: Building2 },
  { q: "restoran", ikon: UtensilsCrossed },
  { q: "lojistik", ikon: Truck },
  { q: "holding", ikon: Network },
] as const satisfies readonly { q: CeviriAnahtari; ikon: LucideIcon }[];

/* SIC 2007 bölümü (A–U) → glif. TASARIM KARARI, VERİ DEĞİL: bölümün adı
   çipte yazıyla duruyor, ikon yalnız taramayı hızlandırıyor ("her şeyin bir
   işareti var" — uygunluk testinin ikinci dersi). Seçim bölümün TÜİK adının
   ilk kelimesine göre; U'nun altında Companies House 99999'u da diziyor, o
   yüzden U'da "uluslararası" değil nötr bir küre. Bulunamayan harf
   (veri değişirse) Layers'a düşüyor, satır boş kalmıyor. */
const BOLUM_IKON: Record<string, LucideIcon> = {
  A: Sprout,
  B: Pickaxe,
  C: Factory,
  D: Zap,
  E: Droplets,
  F: HardHat,
  G: ShoppingCart,
  H: Truck,
  I: UtensilsCrossed,
  J: MonitorSmartphone,
  K: Landmark,
  L: Building2,
  M: Briefcase,
  N: ClipboardList,
  O: Shield,
  P: GraduationCap,
  Q: HeartPulse,
  R: Palette,
  S: Wrench,
  T: House,
  U: Globe,
};
const bolumIkonu = (harf: string) => BOLUM_IKON[harf] ?? Layers;

/* Liste ilk açılışta yirmi satır. "manufacture" gibi bir kelime 200'ü aşkın
   kod döndürüyor (ölçüldü: 202); hepsini birden basmak hem sayfayı uzatıyor
   hem aradığı satırı gömüyor. Kalanlar düğmeyle yirmişer açılıyor.

   OTUZ DEĞİL YİRMİ, çünkü satır büyük: kod 20 px + kopyala düğmesi + tanım +
   bölüm çipi ve satır 1440'ta 82 px (ölçüldü). 30 satır 2.460 px'lik bir
   liste demekti; 20 satır 1.640 px. Sayı tek yerde: "Sonraki N kodu göster"
   de buradan yazılıyor. */
const SAYFA = 20;

/* Defterin yuva sayısı: Companies House'un "en fazla dört kod" kuralı
   (kaynaklar dosya başında). Ekrandaki "04" ve yuva sayısı buradan. */
const EN_COK = 4;

/* Sıralı belirişin basamağı: satır başına 38 ms, en çok on basamak. Yirmi
   satırın hepsi basamaklansaydı son satır 722 ms beklerdi; on basamakta
   liste 380 + 440 = 820 ms'de tamamen yerinde ve onuncudan sonrakiler
   onuncuyla birlikte giriyor. Sonraki sayfa kendi başından basamaklanıyor
   (i % SAYFA), yani "Sonraki 20" de aynı dalgayla açılıyor. */
const BASAMAK_EN = 10;

const CH_LISTE = "https://resources.companieshouse.gov.uk/sic/";

const KAYNAKLAR = [
  {
    ad: "gov.uk · SIC listesi",
    href: "https://www.gov.uk/government/publications/standard-industrial-classification-of-economic-activities-sic",
  },
  {
    ad: "Companies House · kod seçimi",
    href: "https://companieshouse.blog.gov.uk/2026/05/28/keeping-your-standard-industrial-classification-sic-code-accurate/",
  },
  {
    ad: "gov.uk · confirmation statement",
    href: "https://www.gov.uk/guidance/confirmation-statement-guidance",
  },
];

/* Kopyalanan şey: listedeki tek kod ya da defterin tamamı. `yer` ikisini
   ayırıyor ki defterden kopyalayınca listedeki düğme "Kopyalandı" demesin. */
type Kopya = { kod: string; ok: boolean; yer: "liste" | "hepsi" };

const pad = (n: number) => String(n).padStart(2, "0");

export default function SicBulucu() {
  const uid = useId();
  const [sorgu, setSorgu] = useState("");
  const [motor, setMotor] = useState<SicMotor | null>(null);
  const [hata, setHata] = useState(false);
  const [goster, setGoster] = useState(SAYFA);
  const [kopya, setKopya] = useState<Kopya | null>(null);
  const [defter, setDefter] = useState<SicSatir[]>([]);
  /* Son defter işlemi — yalnızca ekran okuyucunun duyurusu için. Ayrı bir
     "duyuru metni" durumu DEĞİL: metin çizim sırasında kuruluyor, yani
     defterin uzunluğu her zaman güncel. */
  const [sonIslem, setSonIslem] = useState<{ kod: string; eklendi: boolean } | null>(null);

  /* Veri parçası ilk çizimden sonra isteniyor (gerekçe dosya başında).
     `iptal`: sayfa parça gelmeden kapanırsa durum yazılmasın. */
  useEffect(() => {
    let iptal = false;
    import("@/lib/tools/sic")
      .then((m) => {
        if (!iptal) setMotor(m.SIC);
      })
      .catch(() => {
        if (!iptal) setHata(true);
      });
    return () => {
      iptal = true;
    };
  }, []);

  /* "Kopyalandı" iki buçuk saniye duruyor, sonra düğme eski hâline dönüyor.
     Başarısızlık DURUYOR: kişi kodu elle seçecek, mesaj kaybolmamalı. */
  useEffect(() => {
    if (!kopya?.ok) return;
    const t = setTimeout(() => setKopya(null), 2500);
    return () => clearTimeout(t);
  }, [kopya]);

  const ara = (v: string) => {
    setSorgu(v);
    setGoster(SAYFA);
  };

  const kopyala = async (kod: string, yer: Kopya["yer"]) => {
    try {
      await navigator.clipboard.writeText(kod);
      setKopya({ kod, ok: true, yer });
    } catch {
      setKopya({ kod, ok: false, yer });
    }
  };

  /* Defterde varsa çıkarıyor, yoksa ve yer varsa ekliyor. Dolu defterde
     ekleme düğmesi zaten devre dışı (gerekçesi defterin dipnotunda yazılı);
     buradaki sınır ikinci bir kilit. Duyuru ekran okuyucu için; görünen
     karşılığı düğmenin kendi metni ve defterin yuvaları. */
  const defterDegis = (s: SicSatir) => {
    const icinde = defter.some((d) => d.kod === s.kod);
    if (!icinde && defter.length >= EN_COK) return;
    /* Güncelleme FONKSİYONEL: aynı karede iki tıklama gelirse ikisi de
       işlensin. Kapanıştaki diziyle yazıldığında bayatlıyor — ölçüldü,
       programlı dört tıklamanın üçü kayboluyordu. Sınır burada da var:
       ekleme düğmesi dolu defterde devre dışı ama iki tıklama arasında
       defter dolabilir. */
    setDefter((d) =>
      d.some((x) => x.kod === s.kod)
        ? d.filter((x) => x.kod !== s.kod)
        : d.length >= EN_COK
          ? d
          : [...d, s],
    );
    setSonIslem({ kod: s.kod, eklendi: !icinde });
  };

  /* Arama her çizimde yeniden koşuyor. Ölçüldü (Node, geliştirme makinesi,
     on sorgu × 200 tekrar): ilk arama tanım dizinini kurduğu için 5,8 ms,
     sonrakiler ortalama 0,32 ms. Telefonda on katı bile tek kareye sığıyor;
     useMemo ya da önbellek bir hata kaynağı eklemekten başka iş görmezdi. */
  const sonuc = motor && sorgu.trim() ? motor.ara(sorgu) : null;
  const satirlar = sonuc?.satirlar ?? [];
  const kalan = Math.max(0, satirlar.length - goster);
  const bulunamadi = sonuc !== null && (sonuc.kip === "metin" || sonuc.kip === "kod") && satirlar.length === 0;

  const n = defter.length;
  const dolu = n >= EN_COK;
  const bulundu = satirlar.length > 0;
  const hepsi = defter.map((d) => d.kod).join(", ");
  /* Sayılabilir bir sonuç var mı: bandın büyük rakamı ancak arama gerçekten
     koştuysa anlamlı (kısa/uzun sorguda ve yükleme sırasında rakam yok). */
  const sayilabilir = sonuc !== null && (sonuc.kip === "metin" || sonuc.kip === "kod");

  /* Bandın alt cümlesi — eski özet kutusunun (.tl-out) cümleleri, aynı
     sırayla ve aynı dallarla. Bulunamayan sorgunun ikinci cümlesi (ne
     denenebilir) listenin yerinde, eylem çiplerinin yanında. */
  const altCumle = !sorgu.trim()
    ? "Şirketin ne iş yapacağını yazın ya da sık arananlardan birini seçin."
    : hata
      ? "Kod listesi yüklenemedi. Sayfayı yenileyip tekrar deneyin; olmazsa Companies House'un kendi listesine bakabilirsiniz."
      : !motor || !sonuc
        ? "Kod listesi yükleniyor…"
        : sonuc.kip === "kisa"
          ? "En az iki harf ya da kodun ilk iki rakamını yazın."
          : sonuc.kip === "uzun"
            ? "İngiltere'deki SIC kodu beş hanelidir; yazdığınız sayı daha uzun. Türkiye'de kullanılan altı haneli faaliyet kodu (NACE) bu listede yer almıyor."
            : bulunamadi
              ? sonuc.kip === "kod"
                ? "Yazdığınız rakamlarla başlayan bir kod listede yok."
                : `Araç, Companies House listesindeki ${motor.toplam} kodun resmî İngilizce tanımlarında ve sık iş türleri için hazırladığımız küçük bir Türkçe çeviri yardımında arıyor; her kelimeyi tanımıyor.`
              : sonuc.kip === "kod"
                ? "Kodu yazdığınız rakamlarla başlayanlar, kod sırasıyla."
                : sonuc.ceviriSayisi === 0
                  ? "Resmî İngilizce tanımında aradığınız kelimeler geçen kodlar."
                  : `${sonuc.anahtarlar.map((a) => `"${a}"`).join(", ")} için çeviri yardımıyla eşlenen ${
                      satirlar.length > sonuc.ceviriSayisi
                        ? `${sonuc.ceviriSayisi} kod başta, ardından resmî İngilizce tanımında aradığınız kelime geçen ${satirlar.length - sonuc.ceviriSayisi} kod.`
                        : "kodlar."
                    }`;

  /* Bandın duyurusu. `duyuru` verildiği için görünen blok aria-hidden oluyor
     ve sayan rakamın ara kareleri ağaca hiç gitmiyor (Bant'ın sözleşmesi).
     Cümle ikiye bölünmüyor: rakam + zaten yazılı olan alt cümle. */
  const duyuru = sayilabilir ? `${satirlar.length} kod bulundu. ${altCumle}` : altCumle;

  /* Defterin durum cümlesi. Dolu defterde ekleme düğmesinin neden kapalı
     olduğu BURADA yazılı (tuzaklar.md kural 10: devre dışı düğmenin gerekçesi
     yazılı olur). */
  const defterCumle = dolu
    ? `${EN_COK} yuvanın hepsi dolu; yenisini eklemek için birini çıkarın.`
    : n === 0
      /* Bu dal artık ekrana düşmüyor (blok n > 0 iken basılıyor); dizinin
         bütünlüğü için duruyor, silinirse okuyan kişi "boş hâl nerede"
         diye arar. */
      ? `${EN_COK} yuva boş; listedeki Ekle ile dolar.`
      : `${n} kod seçili, ${EN_COK - n} yuva boş.`;

  /* Yuvalar: dolu olanlar sırayla, kalanlar boş. Boş yuvaların İLKİ
     "sıradaki" — nabzı olan tek yuva o (araclar-sic.css · taSicYuva). */
  const yuvalar = Array.from({ length: EN_COK }, (_, i) => defter[i] ?? null);

  return (
    <>
      <AracKunye
        ad="SIC kodu"
        alt="İngiltere · Companies House kısaltılmış listesi"
        ulke="ingiltere"
      />

      <Tezgah
        kicker={
          <>
            <Info size={15} strokeWidth={2.1} aria-hidden="true" />
            Resmî tanımlarda arama
          </>
        }
      >
        {/* ------------------------------------------------------- GİRDİ
            Ortak `Girdi` bileşeni ÇAĞRILMADI: içinde `type="text"` +
            `inputMode="decimal"` sabit ve o kombinasyon telefonda sayı
            klavyesi açıyor — metin araması için yanlış. Yerine aynı ızgara
            hücrelerinin (GirdiSatiri) içine aynı ORTAK SINIFLAR yazıldı:
            .ta-etiket · .ta-no · .ta-kutu · .ta-kutu-i · .ta-girdi-b. Yani
            ölçü (62 px kutu, 30 px yazı, 28 px disk) birebir referanstaki.
            `type="search"` tarayıcının kendi temizleme işaretini de veriyor.
            Rapor notu: Girdi'ye bir `kip` propu eklenirse bu yerel blok
            silinir. */}
        <GirdiSatiri>
          <label className="ta-etiket" htmlFor={`${uid}-q`}>
            <span className="ta-no" aria-hidden="true">
              01
            </span>
            <span>
              Şirketiniz ne iş yapacak?
              {/* Boşluk parantezin İÇİNDE: dışarıda metin olarak durunca
                  erişilebilir ad bitişik okunuyor (Girdi'nin `ek` propunda
                  ölçülen ders). */}
              <span className="ta-etiket-x ta-sic-ek">{" (Türkçe, İngilizce ya da kod)"}</span>
            </span>
          </label>
          <div className="ta-kutu">
            <span className="ta-kutu-i" aria-hidden="true">
              <Search size={18} strokeWidth={1.9} />
            </span>
            <input
              id={`${uid}-q`}
              className="ta-girdi-b ta-sic-girdi"
              type="search"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              enterKeyHint="search"
              /* Yer tutucu TEK KELİME. "yazılım ya da 62012" 30 px'lik
                 yazıda 390 px'te ölçüldü: kutuya sığmayıp "…ya da 6" diye
                 kırpılıyordu. Kodla da aranabildiği etiketin kuyruğunda ve
                 yardım satırında zaten yazılı. */
              placeholder="yazılım"
              value={sorgu}
              onChange={(e) => ara(e.target.value)}
              aria-describedby={`${uid}-yardim`}
            />
          </div>
        </GirdiSatiri>

        {/* Hazır girdiler. Ortak `Hazirlar` sayı dizisi aldığı için ortak
            SINIFLARI kullanılıyor, bileşeni değil (gerekçe dosya başında).
            Düğme, bağlantı değil: sayfayı değiştirmiyor, kutuyu dolduruyor.
            Seçili olan, kutuda aynen o yazdığı için işaretli. */}
        <div className="ta-hazir" role="group" aria-labelledby={`${uid}-hz`}>
          <span id={`${uid}-hz`} className="ta-hazir-k">
            Sık aranan iş türleri
          </span>
          {HAZIR.map(({ q, ikon: Ikon }) => (
            <button
              key={q}
              type="button"
              className="ta-hazir-b ta-sic-cip"
              data-on={sorgu === q ? "" : undefined}
              aria-pressed={sorgu === q}
              onClick={() => ara(q)}
            >
              <Ikon size={14} strokeWidth={1.9} aria-hidden="true" />
              {q}
            </button>
          ))}
        </div>

        <Yardim id={`${uid}-yardim`}>
          Kodun ilk rakamlarını biliyorsanız onlarla da arayabilirsiniz (ör. 62). Resmî tanımlar
          İngilizce; Türkçe kelimeler küçük bir çeviri yardımıyla eşleniyor.
        </Yardim>

        {/* --------------------------------------------------------- BANT
            Sayfanın TEK gece yüzeyi. Büyük değer bir para değil bir SAYIM:
            kaç kod eşleşti. Gösterge (halka) YOK — halka bir payda ister ve
            "7 kod"un paydası yok. */}
        <Bant
          ikon={<ListChecks size={14} strokeWidth={1.9} aria-hidden="true" />}
          kicker={sorgu.trim() ? `“${sorgu.trim()}” için eşleşen kod` : "Eşleşen kod"}
          alt={altCumle}
          duyuru={duyuru}
        >
          {sayilabilir ? (
            <>
              <Sayac deger={satirlar.length} />
              <span className="ta-bant-c">kod</span>
            </>
          ) : (
            <span className="ta-bant-bos">—</span>
          )}
        </Bant>

        {/* --------------------------------------------- SEÇTİĞİNİZ KODLAR
            Bölüşümün durduğu yer ve onun kabuğu (.ta-serit). Bölüşümün
            KENDİSİ değil: bölünecek bir bütün yok, dört yuvalı bir sınır var.
            Grup adı başlığın kendisinden (role="group" + aria-labelledby);
            yuvalar ayrıca listenin adını taşımıyor, çünkü liste zaten bu
            grubun tek içeriği.

            İKİ DÜZELTME (bütünlük denetiminden, 12.09.2026):

            1) BOŞKEN HİÇ BASILMIYOR (`n > 0` kapısı). Önce ziyaretçi hiçbir şey
               yapmadan dört boş yuva, "00 / 04" ve "4 yuva boş" cümlesi
               çıkıyordu: 1440'ta 160, 390'da ~215 piksel boş mobilya, üstelik
               arama sonuçlarının ÜSTÜNDE ve kendi sürekli animasyonuyla.
               Sınır (en çok dört kod) kaybolmadı; kural kutusunda ve listedeki
               "Ekle" düğmesinin davranışında zaten yazılı. Blok ilk kod
               eklendiği anda açılıyor, yani ekranda ancak taşıyacak bir bilgi
               varken duruyor.

            2) ADI "DEFTER" DEĞİL. Müşterinin geri çevirdiği tasarımın adı tam
               olarak o kelimeydi ("sağ tarafa siyah alan koy onun içinde
               dönsün"); kurgu gitti, kelimenin kalması yanlış anlaşılmaya
               açıktı. */}
        {n > 0 && (
        <div className="ta-serit" role="group" aria-labelledby={`${uid}-df`}>
          <p className="ta-serit-h">
            <span id={`${uid}-df`}>Seçtiğiniz kodlar</span>
            <span className="ta-serit-v">
              {pad(n)} / {pad(EN_COK)}
            </span>
          </p>

          <ul className="ta-sic-yuvalar">
            {yuvalar.map((s, i) => {
              if (!s) {
                /* Sıradaki boş yuva: ilk boş olan. Nabız yalnız onda. */
                const sira = i === n;
                return (
                  <li
                    key={`bos-${i}`}
                    className="ta-sic-yuva"
                    data-bos=""
                    data-sira={sira ? "" : undefined}
                  >
                    <span className="ta-sic-yd" aria-hidden="true">
                      <Plus size={14} strokeWidth={2} />
                    </span>
                    <span className="ta-sic-yt">Boş yuva</span>
                  </li>
                );
              }
              const Ikon = bolumIkonu(s.bolum.harf);
              return (
                <li key={s.kod} className="ta-sic-yuva" data-on="">
                  <span className="ta-sic-yd" aria-hidden="true">
                    <Ikon size={14} strokeWidth={1.9} />
                  </span>
                  <span className="ta-sic-yt">{s.kod}</span>
                  <button
                    type="button"
                    className="ta-sic-yx"
                    onClick={() => defterDegis(s)}
                    aria-label={`${s.kod} kodunu defterden çıkar`}
                  >
                    <X size={14} strokeWidth={2.2} aria-hidden="true" />
                  </button>
                </li>
              );
            })}
          </ul>

          {n > 0 && (
            <div className="ta-sic-alt">
              <button
                type="button"
                className="ta-sic-daha"
                onClick={() => kopyala(hepsi, "hepsi")}
                aria-label={
                  kopya?.yer === "hepsi"
                    ? kopya.ok
                      ? `Kopyalandı: ${hepsi}`
                      : "Kopyalanamadı, pano kapalı"
                    : `Başvuruya yazılacak kodları kopyala: ${hepsi}`
                }
              >
                {kopya?.yer === "hepsi" && kopya.ok ? (
                  <Check size={14} strokeWidth={2.4} aria-hidden="true" />
                ) : (
                  <ClipboardCopy size={14} strokeWidth={2} aria-hidden="true" />
                )}
                {kopya?.yer === "hepsi"
                  ? kopya.ok
                    ? "Kopyalandı"
                    : "Pano kapalı"
                  : "Hepsini kopyala"}
              </button>
              <span className="ta-sic-alt-s">{hepsi}</span>
            </div>
          )}

          <p className="ta-serit-e">
            {defterCumle} Liste bu sayfada tutuluyor; sayfa yenilenince boşalır.
          </p>
        </div>
        )}
      </Tezgah>

      {/* ================================================ EŞLEŞEN KODLAR
          "Nasıl çıktı" satırlarının KABUĞU (.ta-satirlar: kağıt zemin, 28 px
          köşe, 18/26/20 dolgu), içinde aramanın kendi satırları. Sorgu yoksa
          ya da sonuç sayılamıyorsa panel hiç basılmıyor: boş bir kağıt kutu
          "burada bir şey olmalıydı" diye okunurdu. */}
      {(bulundu || bulunamadi || hata) && (
        <div className="ta-satirlar ta-sic-panel">
          {/* Çeviri yardımının notları (ör. 46900'ün ne olduğu). Listenin
              hemen üstünde, çünkü satırları açıklıyorlar. */}
          {sonuc?.notlar.map((m) => (
            <p key={m} className="ta-sic-not">
              <Info size={15} strokeWidth={1.9} aria-hidden="true" />
              <span>{m}</span>
            </p>
          ))}

          {sonuc?.faaliyetsizVar && (
            <p className="ta-sic-not" data-uyari="">
              <TriangleAlert size={15} strokeWidth={2} aria-hidden="true" />
              <span>
                <b>99999 (dormant, faaliyetsiz) ve 74990 (non-trading, ticari faaliyeti olmayan)</b>{" "}
                yalnız faaliyet göstermeyen şirketler içindir. Companies House, faal bir şirketin bu
                kodlarla kayıtlı olmasını en sık gördüğü uyumsuzluklardan biri olarak sayıyor.
              </span>
            </p>
          )}

          {bulundu && (
            <ul className="ta-sic-liste" aria-label="Eşleşen SIC kodları">
              {satirlar.slice(0, goster).map((s, i) => {
                const bu = kopya?.yer === "liste" && kopya.kod === s.kod ? kopya : null;
                const defterde = defter.some((d) => d.kod === s.kod);
                const Ikon = bolumIkonu(s.bolum.harf);
                return (
                  <li
                    key={s.kod}
                    className="ta-sic-satir"
                    data-on={defterde ? "" : undefined}
                    style={{ "--ta-sic-i": Math.min(i % SAYFA, BASAMAK_EN) } as CSSProperties}
                  >
                    <div className="ta-sic-kk">
                      <span className="ta-sic-kod">{s.kod}</span>
                      {/* Ad aria-label'da: görünen kısa fiil ("Kopyala")
                          tek başına yirmi satırda yirmi aynı ad olurdu.
                          Görünen metin adın içinde geçiyor. */}
                      <button
                        type="button"
                        className="ta-sic-b"
                        onClick={() => kopyala(s.kod, "liste")}
                        aria-label={
                          bu
                            ? bu.ok
                              ? `${s.kod} kopyalandı`
                              : `${s.kod} kopyalanamadı, pano kapalı`
                            : `${s.kod} kodunu kopyala`
                        }
                      >
                        {bu?.ok ? (
                          <Check size={13} strokeWidth={2.4} aria-hidden="true" />
                        ) : (
                          <Copy size={13} strokeWidth={2.1} aria-hidden="true" />
                        )}
                        {bu ? (bu.ok ? "Kopyalandı" : "Pano kapalı") : "Kopyala"}
                      </button>
                    </div>

                    <div className="ta-sic-govde">
                      <span className="ta-sic-tanim">{s.tanim}</span>
                      {/* Bölüm çipi. "Bölüm" kelimesi yalnız ekran
                          okuyucuya; nokta süs. Boşluklar METİN (ölçülen ders:
                          satır içi öğeler boşluksuz birleşiyor). */}
                      <span className="ta-sic-bolum">
                        <Ikon size={13} strokeWidth={1.9} aria-hidden="true" />
                        <span>
                          <span className="sr-only">Bölüm </span>
                          <b>{s.bolum.harf}</b>{" "}
                          <span aria-hidden="true">·</span> {s.bolum.ad}
                        </span>
                      </span>
                      {s.ozel && (
                        <span className="ta-sic-ozel">
                          Companies House&apos;a özgü kod; ONS sınıflandırmasında yok.
                        </span>
                      )}
                    </div>

                    <div className="ta-sic-eylem">
                      <button
                        type="button"
                        className="ta-sic-b"
                        data-ekle=""
                        data-on={defterde ? "" : undefined}
                        disabled={!defterde && dolu}
                        onClick={() => defterDegis(s)}
                        aria-label={
                          defterde
                            ? `${s.kod} defterde, çıkarmak için basın`
                            : `${s.kod} kodunu deftere ekle`
                        }
                      >
                        {defterde ? (
                          <Check size={14} strokeWidth={2.4} aria-hidden="true" />
                        ) : (
                          <Plus size={14} strokeWidth={2.2} aria-hidden="true" />
                        )}
                        {defterde ? "Defterde" : "Ekle"}
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          {kalan > 0 && (
            <div className="ta-sic-alt">
              <button type="button" className="ta-sic-daha" onClick={() => setGoster((g) => g + SAYFA)}>
                <Plus size={14} strokeWidth={2.2} aria-hidden="true" />
                Sonraki {Math.min(SAYFA, kalan)} kodu göster
              </button>
              <span className="ta-sic-alt-s">{kalan} kod daha var.</span>
            </div>
          )}

          {(bulunamadi || hata) && (
            <>
              {bulunamadi && (
                <p className="ta-yardim ta-sic-bos">
                  İşin İngilizce karşılığıyla deneyin (ör. software, restaurant, consultancy), daha
                  genel bir kelime yazın ya da kodun ilk iki rakamını girin. Yine bulamazsanız
                  Companies House&apos;un listesine bakın ya da bize sorun.
                </p>
              )}
              <div className="ta-sic-alt">
                <Kaynak href={CH_LISTE} dis="Companies House listesi, yeni sekmede açılır">
                  Companies House listesi
                </Kaynak>
                {!hata && <Kaynak href="/iletisim">Bize sorun</Kaynak>}
              </div>
            </>
          )}
        </div>
      )}

      {/* -------------------------------------------------- UYGULANAN KURAL
          Eski "Bilmeniz gereken üç şey" bloğunun (üç sütun, üç paragraf) tek
          satırlık hâli: üç kuralın üçü de bu cümlede. Her kuralın ayrıntısı
          aşağıdaki açılırlarda, kaynaklar çiplerde.
          TEYİT SATIRI YOK: teyit bir ORANIN mali müşavir onayını bekliyor
          demek; burada oran değil resmî bir liste kuralı var. */}
      <Kural
        ikon={<ShieldCheck size={18} strokeWidth={1.9} />}
        baslik="Uygulanan kural · Companies House"
        kaynak={
          <>
            {KAYNAKLAR.map((k) => (
              <Kaynak key={k.href} href={k.href} dis={`${k.ad}, yeni sekmede açılır`}>
                {k.ad}
              </Kaynak>
            ))}
          </>
        }
      >
        Şirket kaydında en az bir, en fazla dört SIC kodu veriliyor; kodun bu kısaltılmış listede
        olması isteniyor ve sonradan confirmation statement ile değiştirilebiliyor.
      </Kural>

      {/* Tahmin ibaresi YOK: araç bir sayı tahmin etmiyor, resmî bir listede
          arıyor. Kalan tek şey soru çıkışı. */}
      <Dip>
        <AskCta />
      </Dip>

      {/* Kopyalama ve defterin sesli karşılığı. Görünen karşılıkları
          düğmelerin kendi metni ve defterin yuvaları. */}
      <p className="sr-only" role="status" aria-live="polite">
        {kopya
          ? kopya.ok
            ? `${kopya.kod} panoya kopyalandı.`
            : `Pano kullanılamadı; ${kopya.kod} kodunu elle seçip kopyalayın.`
          : ""}
      </p>
      <p className="sr-only" role="status" aria-live="polite">
        {sonIslem
          ? `${sonIslem.kod} ${sonIslem.eklendi ? "deftere eklendi" : "defterden çıkarıldı"}. Defterde ${n} kod var, en çok ${EN_COK}.`
          : ""}
      </p>

      {/* Aracın kendi açılırları. Kabuğun "ne değil" satırı hemen altta ve
          iki liste CSS'te tek liste gibi birleşiyor. İlk üçü eski "bilmeniz
          gereken üç şey" bloğunun ayrıntısı; cümleler yeniden yazılmadı. */}
      <DerinListe>
        <Derin
          ikon={<ListOrdered size={16} strokeWidth={1.9} />}
          baslik="En az bir, en fazla dört kod"
          ipucu="Şirket birden çok faaliyet yürütecekse dördüne kadar kod verilebiliyor."
        />
        <Derin
          ikon={<RefreshCw size={16} strokeWidth={1.9} />}
          baslik="Kod sonradan değişebilir"
          ipucu="Değişiklik confirmation statement ile bildiriliyor."
        >
          Her şirket yılda en az bir kez confirmation statement veriyor ve SIC kodu o bildirimin
          ek bilgi bölümünde yer alıyor; bildirim erken de verilebiliyor.
        </Derin>
        <Derin
          ikon={<ListTree size={16} strokeWidth={1.9} />}
          baslik="Yalnız bu kısaltılmış listedeki kodlar"
          ipucu="Companies House, listede olmayan kodla yapılan başvurunun reddedilebileceğini yazıyor."
        >
          Companies House, ONS&apos;nin tam sınıflandırmasının kısaltılmış bir sürümünü kullanıyor.
          Kısaltma kod eksiltmiyor: en ayrıntılı basamaktaki kodların hepsi burada, alt kırılımı olan
          sınıfların kendi kodu (ör. 56100) yok. Üstüne Companies House&apos;a özgü üç kod ekleniyor:
          74990, 98000 ve 99999.
        </Derin>
        <Derin
          ikon={<Info size={16} strokeWidth={1.9} />}
          baslik="n.e.c. ne demek"
          ipucu="“not elsewhere classified”, yani başka yerde sınıflandırılmamış: faaliyet daha özel bir koda uymadığında seçilen kodlar."
        />
        <Derin
          ikon={<Languages size={16} strokeWidth={1.9} />}
          baslik="Türkçe arama ve bölüm adları"
          ipucu="Sık iş türleri küçük bir çeviri yardımıyla koda eşleniyor."
        >
          Resmî tanımlar İngilizce. Sık iş türlerini Türkçe yazdığınızda küçük bir çeviri yardımı
          onları koda eşliyor; eşlenmeyen kelimeler İngilizce tanımların içinde aranıyor. Bölüm
          adlarının Türkçesi TÜİK&apos;in NACE Rev.2 terimleri; kod tanımları çevrilmedi, Companies
          House&apos;un listesinde yazıldığı gibi İngilizce.
        </Derin>
        <Derin
          ikon={<CalendarClock size={16} strokeWidth={1.9} />}
          baslik="UK SIC 2026 ve bu liste"
          ipucu="Şirket kaydında bugün hâlâ SIC 2007 listesi isteniyor."
        >
          ONS, iş yerlerini sınıflandırmada artık UK SIC 2026&apos;yı güncel sınıflandırma olarak
          gösteriyor. Companies House ise yeni bir kod çerçevesinin ONS ile görüşüldüğünü ama henüz
          kararlaştırılmadığını söylüyor ve şirket kaydında bugün hâlâ bu SIC 2007 listesini istiyor.
        </Derin>
      </DerinListe>
    </>
  );
}
