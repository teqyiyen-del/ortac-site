"use client";

import { useEffect, useId, useState, type CSSProperties, type ReactNode } from "react";
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
  NotebookPen,
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
import {
  Adim,
  AracDefter,
  AracIs,
  AracKart,
  BayrakDisk,
  DefterNot,
  Derin,
  DerinListe,
  Dokum,
  DokumSatir,
  Halka,
  IkonDisk,
  Kaynak,
  PayCubugu,
  Sayac,
  Sonuc,
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

     1) Sunucuda ve ilk karede sonuç yok, yalnız yönerge var. Sorgu da boş
        olduğu için bu bir kayıp değil; ilk tuşa basılana kadar parça çoktan
        gelmiş oluyor.
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

   "Bilmeniz gereken üç şey" ve açılırlardaki notlar aşağıdaki sayfaların
   bizzat okunmasıyla yazıldı. Doğrulanamayan hiçbir kural (ör. kod
   değişikliğinin ücreti, süresi) yazılmadı.

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
   kaynağa dayanıyor ve kaynak bağlantıları kartın içinde duruyor.

   ---------------------------------------------------------------------------
   SUNUM · ARAÇ DİLİ TURU (12.09.2026) — ortak dil ToolShell.tsx'te

   Müşteri: "tasarımlar fena kötü kral biraz icondur, bayraktır, kontrasttır
   bir şeyler ekle … uygunluk testimiz güzeldi … dinamizm ekle … karman
   çorman." ARAMA MANTIĞINA DOKUNULMADI: sorgu, yalınlaştırma, sıra ve
   sayfalama sic.ts'te ve bu dosyada eskisi gibi (`ara`, `sonuc`, `kalan`,
   `bulunamadi` satırları bayt bayt eski dosyadan). Değişen sunum:

     SOLDA  beyaz çalışma paneli — künye ("SIC kodu · İngiltere", sağda
            defterdeki kod sayısı ve saç teli), 1 · arama kutusu + ikonlu
            sık arananlar, 2 · eşleşen kodların listesi, dipte "bilmeniz
            gereken üç şey" ve kaynaklar.
     SAĞDA  gece "başvuru defteri" — sayarak değişen eşleşme sayısı, sonucun
            nereden geldiği (çeviri yardımı / resmî tanım) çubukta, seçilen
            kodların halkası ve yuvaları, hepsini kopyalama.
     ALTTA  açılırlar: kısaltılmış liste, n.e.c., Türkçe arama, SIC 2026 +
            kabuğun "ne değil"i.

   ESKİDEN EKRANDA OLUP ARTIK AÇILIRDA OLANLAR: "yalnız listedeki kodlar"ın
   kısaltma açıklaması (ONS'nin en ayrıntılı basamağı, 56100 örneği, CH'ye
   özgü üç kod), n.e.c. paragrafı, UK SIC 2026 paragrafı, çeviri yardımının
   iki cümlelik yardım metni. Dört paragraflık gri kural kutusu (.tl-ct) +
   iki dipnot (.tl-note) → üç kalemlik tek sıra + dört açılır.

   ---------------------------------------------------------------------------
   YENİ OLAN TEK DAVRANIŞ · BAŞVURU DEFTERİ (en çok dört kod)

   Eski arayüzde gece panelin karşılığı yoktu: sonuç zaten bir listeydi.
   Uygunluk testinin defteri "cevaplarınız buraya işleniyor" diyordu; bu
   aracın doğal defteri de Companies House'un istediği şey: EN AZ BİR, EN
   FAZLA DÖRT KOD. Listedeki "Ekle" kodu defterin bir yuvasına alıyor; defter
   aramalar arasında KORUNUYOR (yazılım arayıp 62012'yi, danışmanlık arayıp
   70229'u ekleyen kişi ikisini birlikte görüyor) ve hepsi tek düğmeyle
   kopyalanıyor. Arama sonucunu değiştirmiyor, yalnız bu bileşenin durumu.
   Defter sayfada tutuluyor (adrese ya da depoya yazılmıyor); dipnotu bunu
   söylüyor. Müşteri istemezse `defter` durumu ve iki bloğu silinir, arama
   aynen çalışır — rapordaki açık soru.

   ELENEN İKİ DEFTER: (a) Yalnız arama özeti (sayı + bölüm dağılımı): gece
   panel bir şey YAPMIYOR, sadece listeyi tekrar ediyordu. (b) Tek kodun
   ayrıntısı (listeden tıklanan kod büyük): kişi zaten birden çok kod
   seçiyor ve ayrıntı listenin kendisinde yazılı.

   ---------------------------------------------------------------------------
   SATIR · "kod büyük, kopyala düğmesi, bölüm harfi ikonlu çip"

     kod      20 px/700, sabit sütun (masaüstü) — gözün taradığı şey kod
     kopyala  kodun hemen altında; sessiz hap, satır başına dolu düğme yok
     tanım    Companies House'un İngilizce yazımı AYNEN (çevrilmedi)
     çip      bölümün ikonu + harfi + TÜİK adı. İkonlar SÜS (aria-hidden),
              eşleme aşağıda BOLUM_IKON'da ve bir tasarım kararı, veri değil.
     ekle     sağda; defterdeyse dolu (--blue-900, beyazla 7,14:1) ve
              "Defterde" diyor, basınca çıkarıyor

   <select> YOK. `useReducedMotion` YOK (tuzak A): sıralı beliriş, defter
   satırının varışı ve boş yuvanın nabzı CSS'te, `no-preference` kapısında.
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

   OTUZ DEĞİL YİRMİ, çünkü satır büyüdü: eski zebra listede satır 53 px'di,
   yeni satırda kod 20 px + kopyala düğmesi + tanım + bölüm çipi var ve satır
   1440'ta 82 px (ölçüldü). 30 satır 2.460 px'lik bir liste demekti; 20 satır
   1.640 px, yani eski otuz satırın (1.590 px) yüksekliği. Sayı tek yerde:
   "Sonraki N kodu göster" da buradan yazılıyor. */
const SAYFA = 20;

/* Defterin yuva sayısı: Companies House'un "en fazla dört kod" kuralı
   (kaynaklar dosya başında). Ekranda "04" ve halkanın paydası buradan. */
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

/* Kopyalanan şey: tek kod ya da defterin tamamı. `yer`, aynı kodun listede
   ve defterde iki düğmesi olduğu için var: defterden kopyalayınca listedeki
   düğme de "Kopyalandı" demesin. */
type Kopya = { kod: string; ok: boolean; yer: "liste" | "defter" | "hepsi" };

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
     ekleme düğmesi zaten devre dışı (gerekçesi 2. adımın ipucunda yazılı);
     buradaki sınır ikinci bir kilit. Duyuru ekran okuyucu için: görünen
     karşılığı düğmenin kendi metni ve defterin halkası. */
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
  /* Sonucun ışığı (ToolShell · Sonuc) bu anahtar değişince bir kez akıyor:
     sorgu ya da sonuç sayısı değişti demek. */
  const tetik = `${sorgu.trim()}|${sonuc?.kip ?? (hata ? "hata" : "yok")}|${satirlar.length}`;
  const hepsi = defter.map((d) => d.kod).join(", ");

  /* Sonucun alt cümlesi — eski özet kutusunun (.tl-out) cümleleri, aynı
     sırayla ve aynı dallarla. Bulunamayan sorgunun ikinci cümlesi (ne
     denenebilir) çalışma panelinde, eylem düğmelerinin yanında. */
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

  /* Sonucun nereden geldiği: çeviri yardımı (başta) ve resmî tanım
     (ardından). Yalnız kelimeyle aranan ve sonuç veren sorguda; rakamla
     aramada ikisi de yok. Çubuk SÜS, sayılar göstergede yazılı. */
  const kaynakPay =
    sonuc && sonuc.kip === "metin" && bulundu
      ? { ceviri: sonuc.ceviriSayisi, tanim: satirlar.length - sonuc.ceviriSayisi }
      : null;

  return (
    <>
      <div className="ta-sic">
        <AracKart>
          <AracIs
            baslik="SIC kodu"
            /* Künye kabı gitti: bayrağın hizası artık ortak kuralda
               (araclar.css · .ta-bas-s .ta-bayrak). */
            alt={
              <>
                <BayrakDisk ulke="ingiltere" boy="xs" />
                İngiltere · Companies House listesi
              </>
            }
            sag={
              <span className="ta-sayim" aria-hidden="true">
                <b>{pad(n)}</b> / {pad(EN_COK)}
              </span>
            }
            ilerleme={n / EN_COK}
          >
            {/* --------------------------------------------------- 1 · ARAMA */}
            <Adim
              no={1}
              akt
              ikon={<Search size={18} strokeWidth={1.9} />}
              etiketIcin={`${uid}-q`}
              baslik={
                /* Boşluk parantezli kuyruğun İÇİNDE (KurumlarVergisi.tsx'te
                   ölçülen ders: dışarıda kalınca ad bitişik okunuyordu). */
                <>
                  Şirketiniz ne iş yapacak?
                  <span className="ta-adim-x">{" (Türkçe, İngilizce ya da kod)"}</span>
                </>
              }
            >
              <div className="ta-tutar">
                <input
                  id={`${uid}-q`}
                  className="ta-girdi ta-sic-girdi"
                  type="search"
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  enterKeyHint="search"
                  placeholder="ör. yazılım ya da 62012"
                  value={sorgu}
                  onChange={(e) => ara(e.target.value)}
                  aria-describedby={`${uid}-help`}
                />
              </div>

              {/* Hazır iş türleri. Düğme, bağlantı değil: sayfayı
                  değiştirmiyor, yalnızca kutuyu dolduruyor. Seçili olan,
                  kutuda aynen o yazdığı için işaretli. */}
              <div className="ta-hazir" role="group" aria-labelledby={`${uid}-hz`}>
                <span id={`${uid}-hz`} className="ta-hazir-k">
                  Sık arananlar
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

              <p id={`${uid}-help`} className="ta-yardim">
                Kodun ilk rakamlarını biliyorsanız onlarla da arayabilirsiniz (ör. 62).
              </p>
            </Adim>

            {/* ------------------------------------------ 2 · EŞLEŞEN KODLAR */}
            <Adim
              no={2}
              ikon={<ListChecks size={18} strokeWidth={1.9} />}
              baslik="Eşleşen kodlar"
              ipucu={
                dolu && bulundu
                  ? `Defter dolu: ${EN_COK} kod seçtiniz. Yenisini eklemek için defterden birini çıkarın.`
                  : bulundu
                    ? "Kodu kopyalayın ya da Ekle ile başvuru defterine alın."
                    : hata
                      ? "Kod listesi yüklenemedi."
                      : bulunamadi
                        ? "Bu sorguya uyan kod bulunamadı."
                        : "Aradığınız iş türüne uyan kodlar burada listelenir."
              }
            >
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
                              tek başına otuz satırda otuz aynı ad olurdu.
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
                              okuyucuya; nokta süs. Boşluklar METİN (Adim'deki
                              ölçülen ders: satır içi öğeler boşluksuz
                              birleşiyor). */}
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
            </Adim>

            {/* ------------------------------- BİLMENİZ GEREKEN ÜÇ ŞEY
                Eski dört paragraflık gri kutunun özü. Her cümle dosya
                başındaki kaynaklardan birine dayanıyor; uzun açıklamalar
                kartın arkasındaki açılırlarda. */}
            <div className="ta-sic-uc">
              <p id={`${uid}-uc`} className="ta-sic-uc-k">
                Bilmeniz gereken üç şey · Companies House kuralları
              </p>
              <ul className="ta-sic-uc-l" aria-labelledby={`${uid}-uc`}>
                <UcSey ikon={ListOrdered} baslik="En az bir, en fazla dört kod">
                  Şirket birden çok faaliyet yürütecekse dördüne kadar kod verilebiliyor.
                </UcSey>
                <UcSey ikon={RefreshCw} baslik="Kod sonradan değişebilir">
                  Değişiklik, her şirketin yılda en az bir kez verdiği confirmation statement ile
                  bildiriliyor; bu bildirim erken de verilebiliyor.
                </UcSey>
                <UcSey ikon={ShieldCheck} baslik="Yalnız bu listedeki kodlar">
                  Companies House, listede olmayan kodla yapılan başvurunun reddedilebileceğini yazıyor.
                </UcSey>
              </ul>
              <div className="ta-sic-alt">
                {KAYNAKLAR.map((k) => (
                  <Kaynak key={k.href} href={k.href} dis={`${k.ad}, yeni sekmede açılır`}>
                    {k.ad}
                  </Kaynak>
                ))}
              </div>
            </div>
          </AracIs>

          {/* ======================================== GECE · BAŞVURU DEFTERİ */}
          <AracDefter
            ikon={<NotebookPen size={15} strokeWidth={1.9} />}
            baslik="Başvuru defteri"
            sag={
              <>
                <BayrakDisk ulke="ingiltere" boy="xs" />
                SIC 2007
              </>
            }
          >
            {/* Yapışkan kap: uzun listede aşağı inerken defter ekranda kalsın
                ("Ekle"nin sonucu göründüğü yerde olsun). Yalnız geniş ve
                yeterince uzun ekranda (araclar-sic.css). Dipnot kabın DIŞINDA:
                panelin dibine yaslanıyor. */}
            <div className="ta-sic-yapis">
              <Sonuc etiket="Eşleşen kod" tetik={tetik} alt={altCumle}>
                {sonuc && (sonuc.kip === "metin" || sonuc.kip === "kod") ? (
                  <>
                    <Sayac deger={satirlar.length} />
                    <span className="ta-sonuc-b">kod</span>
                  </>
                ) : (
                  <>
                    <span className="ta-sonuc-bos" aria-hidden="true">
                      —
                    </span>
                    <span className="sr-only">Henüz sonuç yok.</span>
                  </>
                )}
              </Sonuc>

              {kaynakPay && (
                <div className="ta-dilim">
                  <PayCubugu
                    parcalar={[
                      { oran: kaynakPay.ceviri / satirlar.length, ton: "mavi" },
                      { oran: kaynakPay.tanim / satirlar.length, ton: "sonuk" },
                    ]}
                  />
                  {/* Sıfır olan yarı gösterilmiyor: "Resmî tanımdan · 0"
                      bir bilgi değil, gürültü. */}
                  <ul className="ta-dilim-e">
                    {kaynakPay.ceviri > 0 && (
                      <li data-ton="mavi">
                        <i aria-hidden="true" />
                        Çeviri yardımından · {kaynakPay.ceviri}
                      </li>
                    )}
                    {kaynakPay.tanim > 0 && (
                      <li data-ton="sonuk">
                        <i aria-hidden="true" />
                        Resmî tanımdan · {kaynakPay.tanim}
                      </li>
                    )}
                  </ul>
                </div>
              )}

              <div className="ta-oranlar">
                <Halka oran={n / EN_COK}>
                  <Sayac deger={n} />
                  <span className="ta-sic-payda" aria-hidden="true">
                    /{EN_COK}
                  </span>
                </Halka>
                <p className="ta-oranlar-t">
                  <b>Seçtiğiniz kodlar</b>
                  <span>
                    {dolu
                      ? `${EN_COK} yuvanın hepsi dolu.`
                      : n === 0
                        ? `${EN_COK} yuva boş; listedeki Ekle ile dolar.`
                        : `${n} kod seçili, ${EN_COK - n} yuva boş.`}
                  </span>
                </p>
              </div>

              <div className="ta-sic-kodlar">
                <Dokum>
                  {defter.map((s) => {
                    const Ikon = bolumIkonu(s.bolum.harf);
                    const bu = kopya?.yer === "defter" && kopya.kod === s.kod ? kopya : null;
                    return (
                      <DokumSatir
                        key={s.kod}
                        ikon={<Ikon size={14} strokeWidth={1.9} />}
                        etiket={<span className="ta-sic-dkod">{s.kod}</span>}
                        alt={s.tanim}
                        deger={
                          <span className="ta-sic-dbtns">
                            <button
                              type="button"
                              className="ta-sic-db"
                              onClick={() => kopyala(s.kod, "defter")}
                              aria-label={
                                bu
                                  ? bu.ok
                                    ? `${s.kod} kopyalandı`
                                    : `${s.kod} kopyalanamadı, pano kapalı`
                                  : `${s.kod} kodunu kopyala`
                              }
                            >
                              {bu?.ok ? (
                                <Check size={14} strokeWidth={2.4} aria-hidden="true" />
                              ) : (
                                <Copy size={14} strokeWidth={2} aria-hidden="true" />
                              )}
                            </button>
                            <button
                              type="button"
                              className="ta-sic-db"
                              onClick={() => defterDegis(s)}
                              aria-label={`${s.kod} kodunu defterden çıkar`}
                            >
                              <X size={14} strokeWidth={2.2} aria-hidden="true" />
                            </button>
                          </span>
                        }
                      />
                    );
                  })}

                  {/* Sıradaki boş yuva. DokumSatir'ın işaretlemesi elle (disk
                      kesikli, bileşen disk tonunu vermiyor); <dl> içinde
                      <div> + <dt>/<dd> geçerli. */}
                  {!dolu && (
                    <div className="ta-dokum-s ta-sic-yuva">
                      <dt>
                        <span className="ta-sic-yd" aria-hidden="true">
                          <Plus size={14} strokeWidth={2} />
                        </span>
                        <span className="ta-dokum-b">
                          <span className="ta-dokum-t">Sıradaki yuva</span>
                          <span className="ta-dokum-a">
                            {pad(n + 1)} / {pad(EN_COK)} · listeden bir kod ekleyin
                          </span>
                        </span>
                      </dt>
                      <dd />
                    </div>
                  )}

                  {n > 0 && (
                    <DokumSatir
                      toplam
                      ikon={<ClipboardCopy size={14} strokeWidth={1.9} />}
                      etiket="Başvuruya yazılacaklar"
                      alt={hepsi}
                      deger={
                        <button
                          type="button"
                          className="ta-sic-db"
                          data-metin=""
                          onClick={() => kopyala(hepsi, "hepsi")}
                          aria-label={
                            kopya?.yer === "hepsi"
                              ? kopya.ok
                                ? `Kopyalandı: ${hepsi}`
                                : "Kopyalanamadı, pano kapalı"
                              : `Kopyala: ${hepsi}`
                          }
                        >
                          {kopya?.yer === "hepsi" && kopya.ok ? (
                            <Check size={13} strokeWidth={2.4} aria-hidden="true" />
                          ) : (
                            <Copy size={13} strokeWidth={2} aria-hidden="true" />
                          )}
                          {kopya?.yer === "hepsi" ? (kopya.ok ? "Kopyalandı" : "Pano kapalı") : "Kopyala"}
                        </button>
                      }
                    />
                  )}
                </Dokum>
              </div>
            </div>

            <DefterNot>Defter bu sayfada tutuluyor; sayfa yenilenince boşalır.</DefterNot>
          </AracDefter>
        </AracKart>
      </div>

      {/* Kopyalama ve defterin sesli karşılığı. Görünen karşılıkları
          düğmelerin kendi metni ve defterin halkası. */}
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
          iki liste CSS'te tek liste gibi birleşiyor — bu yüzden bu liste
          .ta-sic kabının DIŞINDA (.ta-derin-liste + .ta-derin-liste kardeş
          seçicisi). */}
      <DerinListe>
        <Derin
          ikon={<ListTree size={16} strokeWidth={1.9} />}
          baslik="Kısaltılmış liste ne demek"
          ipucu="Kod eksiltmiyor; en ayrıntılı basamaktaki kodların hepsi listede."
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

/* "Bilmeniz gereken üç şey"in bir kalemi: disk + kalın başlık + tek cümle.
   Derin'in özet satırıyla aynı aile (disk + başlık + ipucu), ama açılır
   DEĞİL: üç cümle de kısa ve kuralın kendisi, tıklamanın arkasına
   saklanacak bir şey değil. */
function UcSey({
  ikon: Ikon,
  baslik,
  children,
}: {
  ikon: LucideIcon;
  baslik: string;
  children: ReactNode;
}) {
  return (
    <li className="ta-sic-uc-i">
      <IkonDisk boy="s">
        <Ikon size={15} strokeWidth={1.9} />
      </IkonDisk>
      <span className="ta-sic-uc-b">
        <b className="ta-sic-uc-t">{baslik}</b>
        <span className="ta-sic-uc-p">{children}</span>
      </span>
    </li>
  );
}
