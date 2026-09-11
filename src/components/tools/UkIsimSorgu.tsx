"use client";

import { useId, useRef, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  CircleDot,
  CircleHelp,
  CircleSlash,
  Equal,
  ExternalLink,
  FileCheck,
  FileX,
  Gavel,
  Handshake,
  Hourglass,
  KeyRound,
  Landmark,
  Layers,
  LifeBuoy,
  ListFilter,
  RefreshCcw,
  Scale,
  Search,
  Type,
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
  IkonDisk,
  Kaynak,
  Kural,
  Sayac,
  Sonuc,
} from "@/components/tools/ToolShell";
import {
  ayniBicim,
  CH_SURE_SN,
  chKayitAdresi,
  chUygunlukAdresi,
  DURUM_ADI,
  EN_FAZLA_KARAKTER,
  isimDenetle,
  type SirketKaydi,
  type SorguCevap,
  type SorguHatasi,
} from "@/lib/tools/ukIsim";

/* ============================================================================
   İNGİLTERE ŞİRKET İSMİ SORGULAMA
   ============================================================================

   İsim üretecinin (NameForge) eksik yarısı: üreteç aday çıkarıyor ve alan
   adını soruyor, şirket kaydını kimse sormuyordu. Bu araç Companies House'un
   resmî kaydına soruyor ve sonucu kurumun kendi "aynı sayılır" kuralıyla
   ikiye ayırıyor. Kural lib/tools/ukIsim.ts'te, istek sunucu rotasında
   (app/api/araclar/isim-sorgu/route.ts); burada yalnız arayüz var.

   ---------------------------------------------------------------------------
   DÖRT KARAR

   1) "ALINABİLİR" KELİMESİ HİÇBİR YERDE YOK. Bulunamadı = "kayıtta aynı isim
      görünmüyor". Hassas kelime onayı, "too like" itirazı ve marka hakkı bu
      sorgunun dışında; son sözü Companies House başvuruda söylüyor. İsim
      üretecindeki "müsait demiyoruz" ve alanadi.ts'teki "boş görünüyor ≠
      alabilirsiniz" kuralının aynısı.
      Aynı sebeple sonuç hiçbir hâlde YEŞİL değil. Araç dilinde bu kural
      durum çiplerine de uzandı (aşağıda DURUM ÇİPLERİ): "Aktif" çipi mavi,
      yeşil değil — yeşil bir aktif şirket "sorun yok" diye okunurdu, oysa
      isminizle aynı biçimdeki aktif bir kayıt tam olarak engelin kendisi.

   2) KARŞILAŞTIRMA BİÇİMİ CANLI GÖRÜNÜYOR. Yazarken ismin kurumun kuralıyla
      hangi dizgeye indiği basılıyor ("ATLASLAB"). Bu tamamen yerel bir hesap,
      ağa hiçbir şey gitmiyor — ve "neden Atlas Lab ile ATLAS LABS LIMITED
      aynı çıktı" sorusunu sonuç gelmeden cevaplıyor. Araç dilinde bu bir
      yardım cümlesi olmaktan çıkıp kendi adımı oldu (2 · Karşılaştırma
      biçimi, gece plaka).

   3) SORGU YALNIZ DÜĞMEYLE GİDİYOR. Yazarken değil, sayfa açılırken değil,
      isim üretecinden hazır dolu gelindiğinde de değil. İsim üretecinin
      "Companies House'ta sorgula" çıkışı ismi adresin #isim= kısmında
      taşıyor; araç onu kutuya yazıyor ve düğmeyi bekliyor. Adres başkası
      tarafından kurulmuş bir bağlantı da olabilir: kendiliğinden çalışan bir
      sorgu, bir bağlantıyla ortak kotamızı tüketmenin yolu olurdu.
      Örnek yazım çipleri de (aşağıda) yalnız kutuyu dolduruyor, sormuyor.

   4) HATANIN HER BİRİ AYRI CÜMLE VE HER BİRİNİN ÇIKIŞI VAR. Anahtar yoksa,
      Companies House anahtarı reddederse (401), kota dolarsa (429), kurum
      cevap vermezse (5xx / süre): ziyaretçi her durumda aynı kontrolü
      Companies House'un kendi sayfasında, isim hazır doldurulmuş hâlde
      yapabiliyor. Araç çalışmadığında bile bir sonraki adımı veriyor.

   ------------------------------------------------ #isim= NEDEN ?isim= DEĞİL
   Sorgu dizesi (?isim=) sunucuya gidiyor ve erişim kayıtlarına düşüyor;
   rotanın ismi GÖVDEDE taşımasının sebebi tam olarak bu. # sonrası (parça)
   tarayıcıdan hiç çıkmıyor. Yan kazancı: useSearchParams gerekmiyor, yani
   statik üretilen bu sayfada Suspense sınırı ve istemci tarafına düşen
   render (CSR bailout) da gerekmiyor.

   Parça useSyncExternalStore ile okunuyor, useEffect + setState ile değil:
   sunucu anlık görüntüsü "" (sunucu parçayı hiç görmüyor), yani ilk render
   iki tarafta aynı ve hidratasyon uyarısı doğmuyor; React hidratasyondan
   hemen sonra istemci değerine geçiyor. Etki içinde setState ise bu deponun
   lint kuralına (react-hooks · set-state-in-effect) takılıyordu.

   ---------------------------------------------------------------------------
   SUNUM · ARAÇ DİLİ TURU (11.09.2026 · T3)

   Müşteri: "araçlarda ok gibi ama tasarımlar fena kötü kral biraz icondur,
   bayraktır, kontrasttır bir şeyler ekle … karman çorman." Mantığa
   DOKUNULMADI: parça okuma, istek sırası koruması, fetch akışı, HATA_METNI
   ve BILINEN bayt bayt eski dosyadan. Değişen yalnız JSX; ortak dil
   ToolShell.tsx + araclar.css'te, bu aracın kendine özgü parçaları
   css/araclar-isim.css'te (.ta-isim-).

     SOLDA  beyaz çalışma paneli — künye + adım sayacı + saç teli, üç adım:
            1 isim kutusu (içinde canlı karakter sayacı, altında "aynı sayılan
            üç yazım" çipleri), 2 karşılaştırma biçimi (İngiltere bayraklı
            gece plaka, yazdıkça değişiyor), 3 sorgu düğmesi. Dipte kuralın
            özeti ve iki resmî kaynak.
     SAĞDA  gece "kayıt defteri" — sonucun kendisi (sayarak gelen sayı),
            Companies House çıkışı, iki grup: "aynı sayılabilir" (kart) ve
            "benzer isimler" (satır), her kayıtta ikonlu durum çipi.
     ALTTA  açılırlar: yok sayılanların tam listesi, durum çiplerinin
            anlamı, benzerlerin neden listede olduğu + kabuğun iki satırı.

   EKRANDAN KALKANLAR VE NEREYE GİTTİLER
     · Kutunun altındaki beş satırlık yönetmelik paragrafı (.tl-note) →
       "Karşılaştırmada ne yok sayılıyor" açılırı. Kuralın tek cümlelik
       özeti kalıyor (Kural).
     · Kehribar "uygunluk onayı değil" kutusu (.tl-warn) → KALDIRILDI, çünkü
       kabuğun "Bu araç ne değil" satırı aynı şeyi söylüyor (defter · isNot)
       ve sözleşme "ne değil"i tekrar etmeyi yasaklıyor. Defterin dipnotu tek
       satırla hatırlatıyor.
     · Grupların altındaki açıklama paragrafları (.tl-ct-out) → iki açılır
       ("Şirket durumları", "Benzer isimler neden listede").
     · Düğmenin yanındaki durum cümlesi (ozet() + role="status") → Sonuc'un
       kendisi canlı bölge; iki canlı bölge aynı olayı iki kez duyururdu.

   YÜKSEKLİK DENGESİ. İki panel ızgarada aynı boya uzuyor. Sonuç listesi
   gece paneli beyazın iki katına çıkarabiliyordu (20 kayıt: 10 benzer + en
   çok 10 aynı). Bu yüzden iki grup da yüzeyde EN ÇOK ÜÇ kayıt gösteriyor,
   kalanı "N kayıt daha" açılırında. Karşılaştırma biçimi de bu sebeple
   beyaz panele alındı: defterde dururken boş hâlde iki panel dengeliydi ama
   sonuç hâlinde beyaz panelin ortasında 340 px boşluk kalıyordu (tahmin,
   satır ölçüleriyle; ekranda ölçülen sayılar ana oturuma dönen raporda).
   ========================================================================= */

/** Rotadan dönen ya da istemcide oluşan durum. */
type Hal =
  | { ad: "bos" }
  | { ad: "bekliyor"; isim: string }
  | { ad: "cevap"; isim: string; cevap: SorguCevap }
  /** Bizim sunucumuza ulaşılamadı (ağ yok, istemci süresi doldu, gövde bozuk). */
  | { ad: "ag"; isim: string };

/** Sunucunun Companies House sınırının (CH_SURE_SN) üstünde bir pay. Rota
 *  kendi süresini aşmadan cevap veriyor; bu sınır yalnız bizim sunucumuz
 *  hiç cevap vermezse devreye giriyor. */
const ISTEMCI_SURE_MS = 15000;

const ROTA = "/api/araclar/isim-sorgu";

/* ------------------------------------------------------ #isim= PARÇASI */
function parcaAbone(bildir: () => void) {
  window.addEventListener("hashchange", bildir);
  return () => window.removeEventListener("hashchange", bildir);
}
function parcaIsmi(): string {
  try {
    return (new URLSearchParams(window.location.hash.slice(1)).get("isim") ?? "").slice(0, 200);
  } catch {
    return "";
  }
}
const sunucudaParca = () => "";

/* ---------------------------------------------------------- METİNLER */

/** Hata durumlarının ekrandaki karşılığı: başlık + tek cümle. */
const HATA_METNI: Record<SorguHatasi | "ag", { baslik: string; cumle: string }> = {
  "anahtar-yok": {
    baslik: "Sorgu henüz etkin değil",
    cumle:
      "Companies House bağlantımız henüz kurulmadı. Aynı kontrolü Companies House'un kendi isim uygunluk sayfasında, isminiz hazır doldurulmuş olarak yapabilirsiniz.",
  },
  yetki: {
    baslik: "Companies House sorgumuzu kabul etmedi",
    cumle:
      "Erişim anahtarımız reddedildi. Sorun bizim tarafımızda ve yazdığınız isimle ilgili değil; bu arada aynı kontrolü Companies House'un kendi sayfasında yapabilirsiniz.",
  },
  yogun: {
    baslik: "Sorgu sınırı doldu",
    cumle:
      "Companies House beş dakikada en fazla 600 sorguya izin veriyor ve bu sınır sitemizin bütün ziyaretçileri için ortak. Birkaç dakika sonra yeniden deneyin ya da kontrolü Companies House'un kendi sayfasında yapın.",
  },
  "ch-hata": {
    baslik: "Companies House şu an cevap veremedi",
    cumle: "Biraz sonra yeniden deneyin ya da kontrolü Companies House'un kendi sayfasında yapın.",
  },
  "zaman-asimi": {
    baslik: "Companies House zamanında cevap vermedi",
    cumle: `${CH_SURE_SN} saniye içinde cevap gelmedi. Bu, isimle ilgili bir sonuç değil; yeniden deneyin ya da kontrolü Companies House'un kendi sayfasında yapın.`,
  },
  ulasilamadi: {
    baslik: "Companies House'a ulaşılamadı",
    cumle: "Biraz sonra yeniden deneyin ya da kontrolü Companies House'un kendi sayfasında yapın.",
  },
  "istek-hatali": {
    baslik: "İstek işlenemedi",
    cumle: "Sayfayı yenileyip yeniden deneyin ya da kontrolü Companies House'un kendi sayfasında yapın.",
  },
  ag: {
    baslik: "Sunucumuza ulaşılamadı",
    cumle:
      "İnternet bağlantınızı kontrol edip yeniden deneyin ya da kontrolü Companies House'un kendi sayfasında yapın.",
  },
};

const BILINEN = new Set<string>(["tamam", "gecersiz", ...Object.keys(HATA_METNI).filter((k) => k !== "ag")]);

/** "2022-03-19" → "19.03.2022" */
function tarih(t: string): string {
  const [y, a, g] = t.split("-");
  return `${g}.${a}.${y}`;
}

/* ------------------------------------------------------- ÖRNEK VE ÇİPLER
   Kutunun yer tutucusu ve boş kutudaki plakanın örneği AYNI dizge: iki ayrı
   örnek olsaydı boş kutuda bir isim, plakada başka bir ismin biçimi
   görünürdü (KurumlarVergisi.tsx · TERIM.ornek ile aynı gerekçe).

   Üç yazım lib/tools/ukIsim.ts · ayniBicim'in kendi belge örnekleri. Üçü de
   o fonksiyonla ATLASLAB'a iniyor (11.09.2026'da dosyanın kopyası Node'la
   çağrılarak doğrulandı; yer tutucu "Atlas Labs" da ATLASLAB). Çiplerin işi
   kuralı GÖSTERMEK: ziyaretçi üçüne sırayla basınca kutu üç kez değişiyor,
   plaka hiç değişmiyor — "Companies House için bunlar tek isim" cümlesini
   kurmadan söylüyor. Çip yalnız kutuyu dolduruyor; sorgu yine düğmeyle
   (karar 3). Bir İDDİA değil, KurumlarVergisi'ndeki hazır tutarlar gibi
   bir örnek; kayıtta böyle bir şirket olduğunu ya da olmadığını söylemiyor. */
const ORNEK = "Atlas Labs";
const YAZIMLAR = ["Atlas Labs Ltd.", "The Atlas-Labs (UK) Limited", "www.atlaslabs.co.uk"];

/* Kuralın resmî metni. Adres lib/tools/ukIsim.ts'in KAYNAKLAR bloğundan
   (Ek 3, 11.09.2026'da açılıp okundu); sabit burada çünkü lib dosyası bu
   turda dokunulmaz ve adresi dışa aktarmıyor. */
const YONETMELIK = "https://www.legislation.gov.uk/uksi/2015/17/schedule/3";

/* ---------------------------------------------------------- DURUM ÇİPLERİ
   Her kaydın durumu Companies House'tan geliyor (lib · DURUM_ADI, ham değer
   `company_status`). Çip Türkçesini, yanında kurumun kendi kelimesini ve
   durumu anlatan bir glifi basıyor.

   RENK YALNIZ DURUMUN TÜRÜNÜ SÖYLÜYOR, HÜKÜM DEĞİL. Üç aile:
     canli   kayıt açık               active · registered            mavi
     surec   tasfiye / iflas süreci   liquidation · receivership ·
                                      administration · voluntary-
                                      arrangement · insolvency-
                                      proceedings                     kehribar
     kapali  kayıt kapanmış           dissolved · removed ·
                                      converted-closed                gri
   "Kapanmış bir kaydın isminize engel olup olmadığı" DOĞRULANMADI ve bu
   araç o konuda hüküm vermiyor; gri "engel değil" demek değil, yalnız "bu
   kayıt kapalı" demek. Anlamı açılırda yazılı ("Şirket durumları").
   Sözlükte olmayan bir durum (kurum yeni bir değer eklerse) soru işareti ve
   gri alıyor; ekranı boş bırakmıyor, ham değeri olduğu gibi basıyor.

   KONTRAST (WCAG, betikle ölçüldü; 11,5 px metin, eşik 4,5):
     #9cc6f5 / #16304f  7,52   canli
     #e8a33d / #2a200f  7,42   surec
     #a4a7ad / #1d1e21  6,91   kapali */
type Ton = "canli" | "surec" | "kapali";
const DURUM_GORUNUM: Record<string, { Ikon: LucideIcon; ton: Ton }> = {
  active: { Ikon: CircleDot, ton: "canli" },
  registered: { Ikon: FileCheck, ton: "canli" },
  liquidation: { Ikon: Hourglass, ton: "surec" },
  receivership: { Ikon: KeyRound, ton: "surec" },
  administration: { Ikon: LifeBuoy, ton: "surec" },
  "voluntary-arrangement": { Ikon: Handshake, ton: "surec" },
  "insolvency-proceedings": { Ikon: Gavel, ton: "surec" },
  dissolved: { Ikon: CircleSlash, ton: "kapali" },
  removed: { Ikon: FileX, ton: "kapali" },
  "converted-closed": { Ikon: RefreshCcw, ton: "kapali" },
};
const BILINMEYEN_DURUM = { Ikon: CircleHelp, ton: "kapali" as Ton };

/** Grup başına yüzeyde gösterilen kayıt (bkz. YÜKSEKLİK DENGESİ). */
const YUZEYDE = 3;

const pad = (n: number) => String(n).padStart(2, "0");

/* Kaydın giriş sırası: CSS gecikmesi --ta-isim-i × 70 ms. Birimsiz (tuzak J). */
const sira = (i: number) => ({ "--ta-isim-i": i }) as CSSProperties;

/* ----------------------------------------------------------- BİLEŞENLER */

/* SAYI YA DA TİRE — sayarak gelen sayının tek kalıbı.
   Sayac (ToolShell) ilk basışta SAYMIYOR, yalnız değer değişince sayıyor.
   Sonuç gelince "—" yerine yeni bir Sayac takılsaydı her sonuç sayısız,
   düz belirirdi. O yüzden Sayac HEP TAKILI ve değeri boşken 0; boşken
   `hidden` ile gizleniyor, yerinde tire duruyor. Sonuç gelince aynı Sayac
   0'dan yeni değere sayıyor. Gizliyken ağaçta yok, yani "0" okunmuyor.
   (Görünmez hâlde 0'a dönüşü de sayıyor; kimse görmüyor, 520 ms'lik bir rAF.) */
function Sayi({ n }: { n: number | null }) {
  return (
    <>
      <span hidden={n === null}>
        <Sayac deger={n ?? 0} />
      </span>
      {n === null && <span aria-hidden="true">—</span>}
    </>
  );
}

function Kayit({ k, i }: { k: SirketKaydi; i: number }) {
  const tr = DURUM_ADI[k.durum];
  const g = DURUM_GORUNUM[k.durum] ?? BILINMEYEN_DURUM;
  return (
    <li className="ta-isim-kayit" style={sira(i)}>
      {/* Bağlantı yalnız ad: kartın tamamı bağlantı olsaydı durum, numara ve
          tarihler bağlantının adına karışırdı. Ad görünür metni İÇERİYOR
          (etiket-ad eşleşmesi) ve yeni sekmeyi söylüyor; <a> yazardan ad
          almayı destekliyor (tuzak G-2 <p>/<div> için). */}
      <a
        className="ta-isim-kayit-a"
        href={chKayitAdresi(k.numara)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${k.ad}, Companies House kaydı, yeni sekmede açılır`}
      >
        <span className="ta-isim-kayit-t">{k.ad}</span>
        <ArrowUpRight size={14} strokeWidth={2.1} aria-hidden="true" />
      </a>
      <p className="ta-isim-kayit-m">
        {/* Türkçe karşılığın yanında kurumun kendi kelimesi: çeviri hukuki
            terimi tam karşılamazsa asıl değer ekranda duruyor. */}
        <span className="ta-isim-durum" data-ton={g.ton}>
          <g.Ikon size={12} strokeWidth={2.2} aria-hidden="true" />
          {tr ?? (k.durum || "Durum belirtilmemiş")}
          {tr && (
            <span className="ta-isim-durum-h">
              <span className="sr-only">, kurumun ifadesiyle </span>
              {k.durum}
            </span>
          )}
        </span>
        <span>No {k.numara}</span>
        {k.kurulus && (
          <span>
            Kuruluş {tarih(k.kurulus)}
            {k.kapanis && ` · kapanış ${tarih(k.kapanis)}`}
          </span>
        )}
      </p>
    </li>
  );
}

/* Grubun kayıtları: ilk üçü yüzeyde, kalanı açılırda. İki <ol> ve ikincisi
   `start` ile devam ediyor; numara ekranda basılmıyor ama sıra kurumun
   kendi arama sırası ve ekran okuyucu listeyi o sırayla okuyor. */
function KayitListe({ kayitlar, tur }: { kayitlar: SirketKaydi[]; tur: "ayni" | "benzer" }) {
  const ilk = kayitlar.slice(0, YUZEYDE);
  const kalan = kayitlar.slice(YUZEYDE);
  return (
    <>
      <ol className="ta-isim-liste" data-tur={tur}>
        {ilk.map((k, i) => (
          <Kayit key={k.numara} k={k} i={i} />
        ))}
      </ol>
      {kalan.length > 0 && (
        <details className="ta-isim-daha">
          <summary>
            {kalan.length} kayıt daha
            <ChevronDown size={14} strokeWidth={2.1} aria-hidden="true" />
          </summary>
          <ol className="ta-isim-liste" data-tur={tur} start={YUZEYDE + 1}>
            {kalan.map((k, i) => (
              <Kayit key={k.numara} k={k} i={i} />
            ))}
          </ol>
        </details>
      )}
    </>
  );
}

/* Defterin iki grubundan biri. Sorgudan ÖNCE de basılıyor: sayısı tire,
   altında grubun ne toplayacağını söyleyen tek satır. Uygunluk testinin
   cevap defteri de bölümlerini boş halkalarla baştan gösteriyor; defter
   neyin nereye geleceğini sonuç gelmeden anlatıyor, boş bir gece panel
   değil (FitTest.tsx · uyg-log).

   Başlık <h2>: eski dilde de öyleydi ve sayfanın düzeni h1 (araç adı) → h2
   (bu gruplar, sonra kabuğun kardeş bölümü). Kap bölge (region) DEĞİL: iki
   gruba birer işaret noktası vermek gece paneli ekran okuyucunun işaret
   listesinde üçe bölerdi. */
function Grup({
  ikon,
  baslik,
  sayi,
  akt,
  aciklama,
  children,
}: {
  ikon: ReactNode;
  baslik: string;
  sayi: number | null;
  akt?: boolean;
  aciklama?: string;
  children?: ReactNode;
}) {
  const id = useId();
  return (
    <div className="ta-isim-grup" role="group" aria-labelledby={id}>
      <h2 className="ta-isim-grup-h" id={id}>
        <IkonDisk boy="s" ton="gece" akt={akt}>
          {ikon}
        </IkonDisk>
        <span className="ta-isim-grup-t">{baslik}</span>
        <span className="ta-isim-grup-n">
          <Sayi n={sayi} />
        </span>
      </h2>
      {aciklama && <p className="ta-isim-grup-a">{aciklama}</p>}
      {children}
    </div>
  );
}

export default function UkIsimSorgu() {
  const uid = useId();

  /* İsim üretecinden gelen hazır isim (#isim=). Ziyaretçi kutuya dokununca
     `yazilan` devralıyor; o ana kadar kutu parçadaki ismi gösteriyor. */
  const hazirIsim = useSyncExternalStore(parcaAbone, parcaIsmi, sunucudaParca);
  const [yazilan, setYazilan] = useState<string | null>(null);
  const isim = yazilan ?? hazirIsim;

  const [hal, setHal] = useState<Hal>({ ad: "bos" });
  /* Gönder denendi mi: "en az iki karakter" gibi uyarılar yazarken değil,
     ilk denemeden sonra görünsün. */
  const [denendi, setDenendi] = useState(false);
  /* Yarış koruması: cevap gelmeden kutu değişirse eski cevap yeni ismin
     altına düşmesin. Her istek bir numara alıyor; yalnız sonuncusu yazılıyor. */
  const sonIstek = useRef(0);

  const denetim = isimDenetle(isim);
  /* İki karakteri geçen girdide uyarı yazarken hemen görünüyor (yanlış
     karakteri, 160 sınırını o an görmek işe yarıyor). "En az iki karakter"
     ise yalnız denemeden sonra: ilk harfte uyarı basmak yazana bağırmak olur. */
  const hataGoster = !denetim.ok && (denendi || isim.trim().length >= 2);
  const bicim = denetim.ok ? ayniBicim(denetim.isim) : "";

  const onIsim = (v: string) => {
    setYazilan(v);
    sonIstek.current++;
    setHal({ ad: "bos" });
  };

  const sorgula = async (e: React.FormEvent) => {
    e.preventDefault();
    setDenendi(true);
    if (!denetim.ok || hal.ad === "bekliyor") return;

    const gonderilen = denetim.isim;
    const no = ++sonIstek.current;
    setHal({ ad: "bekliyor", isim: gonderilen });

    let sonuc: Hal;
    try {
      const r = await fetch(ROTA, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ isim: gonderilen }),
        signal: AbortSignal.timeout(ISTEMCI_SURE_MS),
      });
      /* Durum koduna değil gövdedeki `durum` alanına bakılıyor: 503/502/429
         da anlamlı birer cevap ve gövdeleri aynı biçimde. Tanımadığımız bir
         `durum` (rota bir gün yeni bir hâl eklerse) "ulaşılamadı" sayılıyor,
         ekranı boş bırakmıyor. */
      const g = (await r.json()) as SorguCevap | null;
      sonuc =
        g && typeof g === "object" && BILINEN.has(g.durum)
          ? { ad: "cevap", isim: gonderilen, cevap: g }
          : { ad: "ag", isim: gonderilen };
    } catch {
      sonuc = { ad: "ag", isim: gonderilen };
    }
    if (no === sonIstek.current) setHal(sonuc);
  };

  const bekliyor = hal.ad === "bekliyor";
  const c = hal.ad === "cevap" ? hal.cevap : null;
  const hata =
    hal.ad === "ag" ? HATA_METNI.ag : c && c.durum !== "tamam" && c.durum !== "gecersiz" ? HATA_METNI[c.durum] : null;

  /* ------------------------------------------------ SUNUMUN TÜRETTİKLERİ
     Aşağıdakilerin hiçbiri state değil; hepsi yukarıdaki hâlden okunuyor. */
  const tamam = c?.durum === "tamam" ? c : null;
  /* Sorgunun gittiği isim: sonuç ve hatalarda Companies House çıkışı bu
     isimle doluyor (kutuda o arada başka bir şey yazıyor olabilir). */
  const sorulan = hal.ad === "bos" ? null : hal.isim;

  /* Künye sayacı: dolu adım sayısı. 1 ve 2 birlikte doluyor (geçerli bir
     isim yazıldığı an biçimi de belli), 3 yalnız cevaplanmış bir sorguda —
     hata cevabı adımı tamamlamıyor, çünkü kayıt hâlâ sorulmamış. */
  const dolu = (denetim.ok ? 2 : 0) + (tamam ? 1 : 0);

  /* Plaka: geçerli isimde onun biçimi; boş kutuda yer tutucunun biçimi,
     sönük ve "örnek" etiketli; okunamayan girdide tire. */
  const bosKutu = isim.trim() === "";
  const plaka = denetim.ok ? bicim : bosKutu ? ayniBicim(ORNEK) : "—";
  /* Kutudaki karakter sayacı. Geçerli isimde denetimin kendi sayısı (boşluk
     sadeleşmiş hâli, sınır o sayıya uygulanıyor); geçersizde kırpılmış ham
     uzunluk — sınırı aşan isimde hata cümlesi zaten denetimin sayısını yazıyor. */
  const uzunluk = denetim.ok ? denetim.isim.length : isim.trim().length;

  /* Sonucun ışığı (Sonuc · tetik) hâl DEĞİŞİNCE bir kez akıyor. Yazarken hâl
     her tuşta "bos"a dönüyor ama tetik aynı kalıyor, yani ışık yalnız
     sorgu anında ve cevap anında. */
  const tetik =
    hal.ad === "bos"
      ? "bos"
      : hal.ad === "cevap"
        ? `${hal.cevap.durum}:${hal.isim}:${tamam ? tamam.ayni.length : ""}`
        : `${hal.ad}:${hal.isim}`;

  const ayniSayi = tamam ? tamam.ayni.length : null;

  return (
    <>
      <AracKart>
        <AracIs
          baslik="İsim sorgusu"
          /* KÜNYEYE BAYRAK VE ÜLKE (bütünlük denetimi turu). Künye yalnız
             "Companies House kaydı" diyordu; aynı ülkenin öteki aracı (SIC)
             "[bayrak] İngiltere · Companies House listesi" diyor. İki
             İngiltere aracının künyesi iki ayrı biçimdeydi. Ülke adı
             kaydın kurumundan önce geliyor, SIC'teki sırayla aynı.
             Sarmalayıcı yok: hiza ortak kuralda (araclar.css · .ta-bas-s). */
          alt={
            <>
              <BayrakDisk ulke="ingiltere" boy="xs" />
              İngiltere · Companies House kaydı
            </>
          }
          sag={
            <span className="ta-sayim" aria-hidden="true">
              <b>{pad(dolu)}</b> / 03
            </span>
          }
          ilerleme={dolu / 3}
        >
          {/* Form yalnız adımları sarıyor; kural formun dışında, çünkü
              .ta-kural'ın margin-top: auto'su panelin (.ta-is) çocuğu olarak
              çalışıyor — formun içinde olsaydı dibe yaslanmazdı. */}
          <form className="ta-isim-form" onSubmit={sorgula} noValidate>
            <Adim
              no={1}
              akt
              ikon={<Type size={18} strokeWidth={1.9} />}
              etiketIcin={`${uid}-isim`}
              baslik={
                /* Boşluk parantezli kuyruğun İÇİNDE (KurumlarVergisi.tsx ile
                   aynı ölçüm): dışarıda kalınca ad bitişik okunuyordu. */
                <>
                  Şirket ismi
                  <span className="ta-adim-x">{" (Ltd ekini yazmanız gerekmiyor)"}</span>
                </>
              }
            >
              {/* Kutunun sağındaki rozet para birimi değil CANLI KARAKTER
                  SAYACI: sınır kurumun (160, EN_FAZLA_KARAKTER) ve yazarken
                  görünüyor. Süs, aria-hidden: sınırı hata cümlesi söylüyor. */}
              <div className="ta-tutar" data-hata={hataGoster ? "" : undefined}>
                <input
                  id={`${uid}-isim`}
                  className="ta-girdi ta-isim-girdi"
                  type="text"
                  inputMode="text"
                  autoComplete="off"
                  autoCapitalize="words"
                  spellCheck={false}
                  placeholder={ORNEK}
                  /* 160 kurumun sınırı ve denetim onu söylüyor; buradaki 200
                     yalnız yapıştırılan uzun metni sessizce kesmemek için bir
                     üst korkuluk. */
                  maxLength={200}
                  value={isim}
                  onChange={(e) => onIsim(e.target.value)}
                  aria-describedby={`${uid}-yardim ${uid}-plaka`}
                  aria-invalid={hataGoster || undefined}
                />
                <span className="ta-birim" aria-hidden="true">
                  {uzunluk} / {EN_FAZLA_KARAKTER}
                </span>
              </div>

              <div className="ta-hazir">
                <span className="ta-hazir-k">Aynı sayılan üç yazım</span>
                {YAZIMLAR.map((y) => (
                  <button
                    key={y}
                    type="button"
                    className="ta-hazir-b"
                    data-on={isim === y ? "" : undefined}
                    onClick={() => onIsim(y)}
                  >
                    {y}
                  </button>
                ))}
              </div>

              <p id={`${uid}-yardim`} className="ta-yardim">
                {hataGoster && !denetim.ok ? (
                  denetim.neden
                ) : yazilan === null && hazirIsim ? (
                  "İsim, isim üretecinden aktarıldı; sorgu siz düğmeye basınca gidiyor."
                ) : (
                  "Latin harfleri, rakamlar ve temel noktalama kullanın."
                )}
              </p>
            </Adim>

            <Adim
              no={2}
              ikon={<Equal size={18} strokeWidth={1.9} />}
              baslik="Karşılaştırma biçimi"
              ipucu="Companies House iki ismi bu biçime indirip karşılaştırıyor; siz yazdıkça değişir."
            >
              {/* GECE PLAKA. Beyaz panelin içinde gece bir yüzey: kurumun
                  gözündeki isim, defterin diliyle. Bayrak kimin kuralı
                  olduğunu söylüyor. Metin `key` ile yeniden takılıyor, yani
                  yalnız BİÇİM DEĞİŞİNCE kısa bir giriş oynuyor — boşluk ya da
                  nokta yazınca plaka kıpırdamıyor, bu da kuralın kendisini
                  gösteriyor. Canlı bölge DEĞİL: her tuşta duyuru olurdu; kutu
                  aria-describedby ile bu metni okutuyor. */}
              <div
                id={`${uid}-plaka`}
                className="ta-isim-plaka"
                data-ornek={bosKutu ? "" : undefined}
                data-bos={!bosKutu && !denetim.ok ? "" : undefined}
              >
                <BayrakDisk ulke="ingiltere" boy="s" />
                <span className="sr-only">Karşılaştırma biçimi: </span>
                <span key={plaka} className="ta-isim-plaka-t">
                  {plaka}
                </span>
                {/* Ayraç METİN olarak: satır içi öğeler erişilebilir adda
                    boşluksuz birleşiyor ve ilk yazımda kutunun açıklaması
                    "ATLASLABörnek" diye okundu (tarayıcıda ölçüldü — aynı
                    tuzak ToolShell · Adim'de de kayıtlı). */}
                {bosKutu && (
                  <>
                    <span className="sr-only">, </span>
                    <span className="ta-isim-plaka-r">örnek</span>
                  </>
                )}
              </div>
            </Adim>

            <Adim
              no={3}
              ikon={<Search size={18} strokeWidth={1.9} />}
              baslik="Companies House'a sorun"
              ipucu="Sorgu yalnız siz düğmeye basınca gidiyor; isim kaydedilmiyor."
            >
              <div className="ta-eylem">
                <button type="submit" className="ta-isim-git" disabled={bekliyor}>
                  <Search size={16} strokeWidth={2.1} aria-hidden="true" />
                  {bekliyor ? "Sorgulanıyor…" : "Kayıtta ara"}
                </button>
              </div>
            </Adim>
          </form>

          <Kural
            ikon={<Scale size={18} strokeWidth={1.9} />}
            baslik="Karşılaştırma kuralı · SI 2015/17"
            kaynak={
              <>
                <Kaynak href={YONETMELIK} dis="legislation.gov.uk · Ek 3, SI 2015/17, yeni sekmede açılır">
                  legislation.gov.uk · Ek 3
                </Kaynak>
                <Kaynak
                  href={chUygunlukAdresi()}
                  dis="Companies House · isim uygunluğu sayfası, yeni sekmede açılır"
                >
                  Companies House · isim uygunluğu
                </Kaynak>
              </>
            }
          >
            Şirket türü eki, noktalama, boşluklar ve sondaki S harfi atıldıktan sonra aynı biçime inen iki
            isim, Companies House için aynı isimdir.
          </Kural>
        </AracIs>

        <AracDefter
          ikon={<Landmark size={15} strokeWidth={1.9} />}
          baslik="Kayıt defteri"
          sag={
            <>
              <BayrakDisk ulke="ingiltere" boy="xs" />
              İngiltere
            </>
          }
        >
          <Sonuc
            etiket={sorulan ? `Companies House kaydı · ${sorulan}` : "Companies House kaydı"}
            tetik={tetik}
            alt={
              hal.ad === "bos" ? (
                "İsmi yazıp Kayıtta ara'ya basın; aynı sayılabilen ve benzer kayıtlar aşağıda listelenir."
              ) : bekliyor ? (
                `Companies House'un cevabı bekleniyor; ${CH_SURE_SN} saniyede gelmezse sorgu kesiliyor.`
              ) : hata ? (
                hata.cumle
              ) : c?.durum === "gecersiz" ? (
                /* Sunucunun isim kuralı reddi. Arayüz aynı denetimi göndermeden
                   önce yaptığı için buraya normalde düşülmez; düşülürse sebep
                   yazıyor. */
                c.neden
              ) : tamam && tamam.ayni.length > 0 ? (
                <>
                  Aşağıdaki {tamam.ayni.length === 1 ? "kayıt" : "kayıtlar"} kurumun kuralıyla isminizle aynı
                  biçime iniyor: <b>{tamam.bicim}</b>. Aynı sayılan bir isim kullanılamıyor; istisnaları
                  Companies House değerlendiriyor.
                </>
              ) : tamam && tamam.bakilan > 0 ? (
                <>
                  Aramanın ilk {tamam.bakilan} sonucunda <b>{tamam.bicim}</b> biçimine inen kayıt yok. Bu,
                  ismin alınabileceği anlamına gelmiyor; son söz Companies House&apos;un.
                </>
              ) : (
                <>
                  Companies House araması bu isimle hiç sonuç döndürmedi. Bu da ismin alınabileceği anlamına
                  gelmiyor; son söz Companies House&apos;un.
                </>
              )
            }
          >
            {/* Sayı hep takılı (bkz. Sayi): sonuç gelince 0'dan sayıyor. */}
            <span className="ta-isim-say" hidden={!ayniSayi}>
              <Sayac deger={ayniSayi ?? 0} />
              <span className="ta-sonuc-b">kayıt aynı sayılabilir</span>
            </span>
            {hal.ad === "bos" && (
              <>
                <span className="ta-sonuc-bos" aria-hidden="true">
                  —
                </span>
                <span className="sr-only">Henüz sorgu yok.</span>
              </>
            )}
            {bekliyor && <span className="ta-sonuc-yok">Sorgulanıyor…</span>}
            {hata && <span className="ta-sonuc-yok">{hata.baslik}</span>}
            {c?.durum === "gecersiz" && <span className="ta-sonuc-yok">İsim kabul edilmedi</span>}
            {tamam && tamam.ayni.length === 0 && <span className="ta-sonuc-yok">Aynı isim görünmüyor</span>}
          </Sonuc>

          {/* SÜRE ÇİZGİSİ — beklerken rotanın Companies House süresi
              (CH_SURE_SN) boyunca bir kez doluyor. Sayı lib'den, CSS'e özel
              değişkenle geçiyor; yani "8 saniye" iki yerde yazılı değil. Süs:
              aynı bilgi Sonuc'un cümlesinde. Duruş karesinde yok (CSS). */}
          {bekliyor && (
            <span
              className="ta-isim-sure"
              aria-hidden="true"
              style={{ "--ta-isim-sn": `${CH_SURE_SN}s` } as CSSProperties}
            >
              <span className="ta-isim-sure-i" />
            </span>
          )}

          {/* COMPANIES HOUSE ÇIKIŞI — her sonucun ve her hatanın ortak ikinci
              adımı (karar 4), sonucun hemen altında. Hatada ASIL eylem o,
              dolu (beyaz) basılıyor; sonuçta ikincil, çerçeveli. */}
          {sorulan && !bekliyor && (
            <a
              className="ta-isim-cikis"
              data-on={tamam ? undefined : ""}
              href={chUygunlukAdresi(sorulan)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={15} strokeWidth={2.1} aria-hidden="true" />
              Companies House&apos;un kendi kontrolünde açın
              <span className="sr-only"> (yeni sekmede)</span>
            </a>
          )}

          <Grup
            akt
            ikon={<Equal size={14} strokeWidth={1.9} />}
            baslik="Aynı sayılabilir"
            sayi={tamam ? tamam.ayni.length : null}
            aciklama={tamam ? undefined : "Kurumun kuralıyla isminizle aynı biçime inen kayıtlar."}
          >
            {tamam && tamam.ayni.length > 0 && <KayitListe kayitlar={tamam.ayni} tur="ayni" />}
          </Grup>

          <Grup
            ikon={<Layers size={14} strokeWidth={1.9} />}
            baslik="Benzer isimler"
            sayi={tamam ? tamam.benzer.length : null}
            aciklama={
              tamam
                ? tamam.benzer.length > 0
                  ? "Aramanın öteki yakın kayıtları, kurumun kendi sırasıyla."
                  : undefined
                : "Companies House aramasının döndürdüğü öteki yakın kayıtlar."
            }
          >
            {tamam && tamam.benzer.length > 0 && <KayitListe kayitlar={tamam.benzer} tur="benzer" />}
          </Grup>

          <DefterNot>Bu sorgu bir ön kontrol, uygunluk onayı değil; son sözü başvuruda Companies House söylüyor.</DefterNot>
        </AracDefter>
      </AracKart>

      {/* Aracın kendi açılırları. Kabuğun "ne değil" ve "nereye gidiyor"
          satırları hemen altta; iki liste CSS'te tek liste gibi birleşiyor. */}
      <DerinListe>
        <Derin
          ikon={<ListFilter size={16} strokeWidth={1.9} />}
          baslik="Karşılaştırmada ne yok sayılıyor"
          ipucu="Tür eki, noktalama, boşluklar, sondaki S, baştaki The ve www."
        >
          Karşılaştırma kuralı The Company, Limited Liability Partnership and Business (Names and Trading
          Disclosures) Regulations 2015, Ek 3&apos;ten alındı ve kurumun kendi isim uygunluk sayfasıyla
          karşılaştırılarak sınandı: aksanlı harfler sadeleşiyor, sondaki Ltd, PLC gibi ek düşüyor, &amp; ile
          AND gibi eşdeğerler birleşiyor; sondaki &quot;&amp; Co&quot;, &quot;UK&quot;, &quot;.co.uk&quot; gibi
          ifadeler, noktalama, sondaki S harfi, baştaki &quot;The&quot; ve &quot;www&quot; ile boşluklar yok
          sayılıyor.
        </Derin>
        <Derin
          ikon={<CircleDot size={16} strokeWidth={1.9} />}
          baslik="Şirket durumları"
          ipucu="Durum Companies House'tan geliyor; kapanmış bir kaydın engel olup olmadığını kurum değerlendiriyor."
        >
          Her kaydın durumu Companies House&apos;tan geliyor ve Türkçesinin yanında kurumun kendi kelimesiyle
          yazıyor. Çipin rengi yalnız durumun türünü gösteriyor: mavi kayıt açık, kehribar tasfiye ya da iflas
          süreci, gri kayıt kapanmış. Kapanmış bir kaydın isminize engel olup olmadığını Companies House
          değerlendiriyor; bu araç o konuda hüküm vermiyor.
        </Derin>
        <Derin
          ikon={<Layers size={16} strokeWidth={1.9} />}
          baslik="Benzer isimler neden listede"
          ipucu="Yalnızca birkaç karakterle ayrılan bir isim itiraz görebiliyor."
        >
          Benzer isimler aynı sayılmıyor. Ama yalnızca birkaç karakterle ayrılan bir isim &quot;too like&quot;
          sayılıp kayıttan sonraki 12 ay içinde değiştirilmesi istenebiliyor; bu yüzden Companies House
          aramasının döndürdüğü öteki yakın kayıtlar da kurumun kendi sırasıyla listeleniyor.
        </Derin>
      </DerinListe>
    </>
  );
}
