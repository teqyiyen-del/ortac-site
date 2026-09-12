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
import AskCta from "@/components/shared/AskCta";
import {
  AracKunye,
  Bant,
  Derin,
  DerinListe,
  Dip,
  GirdiSatiri,
  IkonDisk,
  Kaynak,
  Kural,
  Sayac,
  Tezgah,
  Yardim,
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
   DÖRT KARAR (değişmedi)

   1) "ALINABİLİR" KELİMESİ HİÇBİR YERDE YOK. Bulunamadı = "kayıtta aynı isim
      görünmüyor". Hassas kelime onayı, "too like" itirazı ve marka hakkı bu
      sorgunun dışında; son sözü Companies House başvuruda söylüyor.
      Aynı sebeple sonuç hiçbir hâlde YEŞİL değil ve durum çipleri de değil:
      "Aktif" çipi mavi — yeşil bir aktif şirket "sorun yok" diye okunurdu,
      oysa isminizle aynı biçimdeki aktif bir kayıt tam olarak engelin kendisi.

   2) KARŞILAŞTIRMA BİÇİMİ CANLI GÖRÜNÜYOR. Yazarken ismin kurumun kuralıyla
      hangi dizgeye indiği basılıyor ("ATLASLAB"). Tamamen yerel bir hesap, ağa
      hiçbir şey gitmiyor — ve "neden Atlas Lab ile ATLAS LABS LIMITED aynı
      çıktı" sorusunu sonuç gelmeden cevaplıyor.

   3) SORGU YALNIZ DÜĞMEYLE GİDİYOR. Yazarken değil, sayfa açılırken değil,
      isim üretecinden hazır dolu gelindiğinde de değil. İsim üretecinin
      "Companies House'ta sorgula" çıkışı ismi adresin #isim= kısmında
      taşıyor; araç onu kutuya yazıyor ve düğmeyi bekliyor. Adres başkası
      tarafından kurulmuş bir bağlantı da olabilir: kendiliğinden çalışan bir
      sorgu, bir bağlantıyla ortak kotamızı tüketmenin yolu olurdu.
      Örnek yazım çipleri de yalnız kutuyu dolduruyor, sormuyor.

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
   iki tarafta aynı ve hidratasyon uyarısı doğmuyor.

   ===========================================================================
   SUNUM · 12.09.2026 · TEZGÂH DİLİNE GEÇİŞ (A2)

   Bir tur önce bu araç uygunluk testinin İKİ PANELLİ kurgusundaydı: solda
   beyaz çalışma paneli (üç numaralı adım + adım sayacı + saç teli), sağda
   gece "kayıt defteri". Müşteri o kurguyu geri çevirdi ("tüm araçlarda sağ
   tarafa siyah alan koy onun içinde dönsün her şey gibi bir şey demedimki
   sana amk ben") ve /lab/arac-dili'nin A2 adayını seçti. Dilin ortak hâli
   ToolShell.tsx · C bölümünde, ilk kullanıcısı KurumlarVergisi.tsx.

   MANTIĞA DOKUNULMADI: parça okuma, denetim, yarış koruması, fetch akışı,
   HATA_METNI ve BILINEN bayt bayt eski dosyadan. Değişen yalnız sunum.

   YENİ SIRA
     künye     aracın adı + büyük İngiltere bayrağı (ülke pili YOK, aşağıda)
     tezgâh    TEK panel · kicker "Resmî kayıt sorgusu"
       girdi     geniş tek kutu; sağında canlı karakter sayacı
       yazımlar  "aynı sayılan üç yazım" çipleri
       yardım    tek satır (hata cümlesi de burada)
       sor       solda "Kayıtta ara" düğmesi, sağda karşılaştırma biçimi
       BANT      CEVAP · sayfanın TEK gece yüzeyi
     sonuç     kâğıt panel · iki grup (aynı sayılabilir / benzer isimler)
     kural     SI 2015/17 dipnotu + iki resmî kaynak çipi
     dip       ön kontrol ibaresi + soru çıkışı
     açılırlar

   A2'NİN ALINMAYAN PARÇALARI — hiçbiri boş bırakılmadı, hiçbiri
   uydurma veriyle doldurulmadı:
     SÜRGÜ        bir SAYININ ölçeği. Burada girdi bir isim; bir ismin
                  ölçeği yok, sürgüsü de olamaz.
     HAZIR TUTAR  "Hazırlar" bileşeni sayı dizisi alıyor. Bu araçtaki
                  karşılığı TUTAR değil YAZIM: aynı biçime inen üç örnek
                  (aşağıda YAZIMLAR). Aynı sınıflarla, yerel basılıyor.
     BÖLÜŞÜM      bölünecek bir bütün yok. "N kayıt"ın payı olmaz.
     SATIRLAR     "nasıl çıktı" dökümü bir HESABIN adımları. Burada hesap
                  yok, kayıt var; dökümün yerini sonuç panelindeki iki grup
                  aldı ve aynı grameri kullanıyor (disk · ad + alt satır ·
                  sağda değer).
     KÜNYE PİLİ   ülke pili ülkeler arasında ADRES değiştiriyor. Bu araç
                  tek ülkeli (Companies House yalnız İngiltere), yani
                  gidilecek ikinci bir adres yok. Bayrak duruyor, pil yok.
     TEZGÂH SAĞI  başlık satırının sağı İKİNCİ DEĞİŞKENİN çipleri için.
                  Bu araçta ikinci değişken yok (dönem yok, ülke yok);
                  köşe boş bırakılmadı, kicker tek başına duruyor.

   ANAHTARSIZ HÂL BİR HATA EKRANI DEĞİL, ARACIN BUGÜNKÜ HÂLİ. Companies
   House anahtarı henüz verilmedi, yani düğmeye basan herkes
   `durum: "anahtar-yok"` alıyor. Bant o hâlde bir sayı yerine hükmü
   ("Sorgu henüz etkin değil") ve altında kurumun kendi kontrolüne çıkışı
   taşıyor; çıkış bandın `eylem` yuvasında, yani ekran okuyucudan asla
   gizlenmiyor ve isim hazır doldurulmuş gidiyor.
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

/** Hata durumlarının ekrandaki karşılığı: başlık + tek cümle. Başlık bandın
 *  büyük değeri (bir sayı değil bir hüküm), cümle bandın alt satırı. */
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
   Kutunun yer tutucusu ve boş kutudaki biçimin örneği AYNI dizge: iki ayrı
   örnek olsaydı boş kutuda bir isim, biçim plakasında başka bir ismin biçimi
   görünürdü (KurumlarVergisi.tsx · TERIM.ornek ile aynı gerekçe).

   Üç yazım lib/tools/ukIsim.ts · ayniBicim'in kendi belge örnekleri. Üçü de
   o fonksiyonla ATLASLAB'a iniyor (11.09.2026'da dosyanın kopyası Node'la
   çağrılarak doğrulandı; yer tutucu "Atlas Labs" da ATLASLAB). Çiplerin işi
   kuralı GÖSTERMEK: ziyaretçi üçüne sırayla basınca kutu üç kez değişiyor,
   biçim hiç değişmiyor — "Companies House için bunlar tek isim" cümlesini
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

   ÇİPİN TONU BU TURDA GECEDEN AÇIĞA GEÇTİ: sonuç listesi artık kâğıt
   panelde. Renk taşıyıcısı ZEMİN VE GLİF, yazı üçünde de --text-900 —
   gerekçesi araclar-isim.css'in kontrast bloğunda (sitede 11,5 px'te
   eşiği geçen bir kehribar YOK, üç çipin ikisini renkli biri siyah
   yazmak da dili bozardı). */
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

/** Grup başına yüzeyde gösterilen kayıt; kalanı "N kayıt daha" açılırında.
 *  Sebep iki panelli kurguda YÜKSEKLİK DENGESİYDİ (gece panel beyazın iki
 *  katına çıkabiliyordu) ve o kurgu kalktı. Sınır yine de duruyor: 20 kayıt
 *  (10 benzer + en çok 10 aynı) tek listede basılınca sonuç paneli bandın
 *  ve tezgâhın toplamından uzun oluyor, yani sayfanın ağırlık merkezi
 *  CEVAPTAN listeye kayıyor. Üçü yüzeyde, gerisi tıklamayla. */
const YUZEYDE = 3;

/* Kaydın giriş sırası: CSS gecikmesi --ta-isim-i × 70 ms. Birimsiz (tuzak J). */
const sira = (i: number) => ({ "--ta-isim-i": i }) as CSSProperties;

/* ----------------------------------------------------------- BİLEŞENLER */

/* ------------------------------------------------------------ İSİM GİRDİSİ
   Ortak `Girdi` (ToolShell · C) BU ARAÇTA KULLANILAMADI ve sebebi tek bir
   satır: o bileşen kutuyu `inputMode="decimal"` ile basıyor (tutar alanı
   için doğru), burada girdi bir İSİM ve mobilde sayı tuş takımı açılırdı.
   `autoCapitalize`, `spellCheck` ve `maxLength` de ortak bileşenin propları
   arasında yok. Ortak dosyaya dokunulmadığı için kutu burada YERELDE
   basılıyor — ama sınıflarının hepsi ORTAK (.ta-etiket · .ta-no ·
   .ta-etiket-x · .ta-kutu · .ta-kutu-i · .ta-girdi-b · .ta-birim-b), yani
   ölçü, renk ve odak davranışı tezgâhın kendi kuralından geliyor; bu
   dosyada tek bir kutu kuralı yok. Sözleşmeye eklenmeli: `Girdi`ye bir
   `tur` ("sayi" | "metin") propu.

   Fragman döndürüyor ki iki ızgara hücresi GirdiSatiri'nde kalsın. */
function IsimGirdi({
  id,
  deger,
  onDeger,
  hata,
  tarif,
  sayac,
}: {
  id: string;
  deger: string;
  onDeger: (v: string) => void;
  hata?: boolean;
  tarif: string;
  /** kutunun sağındaki rozet: canlı karakter sayacı */
  sayac: ReactNode;
}) {
  return (
    <>
      <label className="ta-etiket" htmlFor={id}>
        <span className="ta-no" aria-hidden="true">
          01
        </span>
        {/* ETİKETİN KUYRUĞU YOK ve bu ölçülerek karar verildi. Ortak
            .ta-etiket-x `white-space: nowrap` (referansın kuyruğu " (AED)",
            iki kelime); "(Ltd ekini yazmanız gerekmiyor)" 260 px'lik etiket
            sütununda satır sonuna sığmıyor ve sütunun dışına taşıyordu
            (1440 px'te ölçüldü). Cümle kaybolmadı, yardım satırına indi. */}
        <span>Şirket ismi</span>
      </label>

      <div className="ta-kutu" data-hata={hata ? "" : undefined}>
        <span className="ta-kutu-i" aria-hidden="true">
          <Type size={18} strokeWidth={1.9} />
        </span>
        <input
          id={id}
          className="ta-girdi-b"
          type="text"
          inputMode="text"
          autoComplete="off"
          autoCapitalize="words"
          spellCheck={false}
          placeholder={ORNEK}
          /* 160 kurumun sınırı ve denetim onu söylüyor; buradaki 200 yalnız
             yapıştırılan uzun metni sessizce kesmemek için bir üst korkuluk. */
          maxLength={200}
          value={deger}
          onChange={(e) => onDeger(e.target.value)}
          aria-describedby={tarif}
          aria-invalid={hata || undefined}
        />
        {/* Rozet SÜS (aria-hidden): sınırı hata cümlesi söylüyor. Ortak
            .ta-birim-b esnek satırın `flex: none` çocuğu, yani yazının
            altına girmiyor — eski dilde kutuya elle 100 px sağ dolgu
            verilmişti, o düzeltme bu turda gereksizleşti ve silindi. */}
        <span className="ta-birim-b" aria-hidden="true">
          {sayac}
        </span>
      </div>
    </>
  );
}

/* --------------------------------------------------------- ÖRNEK YAZIMLAR
   A2'nin "Hazır tutarlar" çipleri, bu araçtaki karşılığıyla. Ortak
   `Hazirlar` bileşeni `degerler: number[]` alıyor ve bir metin aracında
   karşılığı yok; çipler aynı ORTAK sınıflarla (.ta-hazir · .ta-hazir-k ·
   .ta-hazir-b) yerelde basılıyor, yani ölçü ve renk yine tezgâhın kendi
   kuralından. Sözleşmeye eklenmeli: `Hazirlar`a metin dizisi alan bir hâl.

   DÜĞME, bağlantı değil: sayfayı değiştirmiyor, kutuyu dolduruyor. */
function Yazimlar({ secili, onSec }: { secili: string; onSec: (v: string) => void }) {
  return (
    <div className="ta-hazir">
      <span className="ta-hazir-k">Aynı sayılan üç yazım</span>
      {YAZIMLAR.map((y) => (
        <button
          key={y}
          type="button"
          className="ta-hazir-b"
          data-on={secili === y ? "" : undefined}
          onClick={() => onSec(y)}
        >
          {y}
        </button>
      ))}
    </div>
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

/* --------------------------------------------------------------- GRUP ----
   Sonuç panelinin bir grubu. Başlığı A2'nin "nasıl çıktı" SATIRIYLA aynı
   gramer: disk · (ad + tek satır alt) · sağda değer. Bu araçta hesap yok,
   o yüzden `Satir` bileşeni değil ama grameri aynı; değer sütununda
   kayıt sayısı duruyor.

   BOŞ GRUP BASILMIYOR. "Aynı sayılabilir · 0" satırı bandın büyük değerinin
   ("Aynı sayılan kayıt yok") ikinci kez yazılmış hâli olurdu; sözleşmenin
   "karşılığı yoksa o parçayı kullanma" kuralı grubun kendisi için de
   geçerli. Panelin tamamı da yalnız en az bir grup doluysa basılıyor.

   Başlık <h2>: sayfanın düzeni h1 (araç adı, PageHero) → h2 (bu gruplar,
   sonra kabuğun SSS ve kardeş bölümleri). Kap role="group": sayı ile adın
   ilişkisi ağaçta da kalsın. */
function Grup({
  ikon,
  baslik,
  alt,
  sayi,
  children,
}: {
  ikon: ReactNode;
  baslik: string;
  alt: string;
  sayi: number;
  children: ReactNode;
}) {
  const id = useId();
  return (
    <div className="ta-isim-grup" role="group" aria-labelledby={id}>
      <div className="ta-isim-grup-h">
        <IkonDisk boy="m">{ikon}</IkonDisk>
        <div className="ta-isim-grup-b">
          <h2 className="ta-isim-grup-t" id={id}>
            {baslik}
          </h2>
          <p className="ta-isim-grup-a">{alt}</p>
        </div>
        <p className="ta-isim-grup-n">
          <b>{sayi}</b>
          <span>kayıt</span>
        </p>
      </div>
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

  /* Biçim plakası: geçerli isimde onun biçimi; boş kutuda yer tutucunun
     biçimi, sönük ve "örnek" etiketli; okunamayan girdide tire. */
  const bosKutu = isim.trim() === "";
  const okunamadi = !bosKutu && !denetim.ok;
  const plaka = denetim.ok ? bicim : bosKutu ? ayniBicim(ORNEK) : "—";
  /* Kutudaki karakter sayacı. Geçerli isimde denetimin kendi sayısı (boşluk
     sadeleşmiş hâli, sınır o sayıya uygulanıyor); geçersizde kırpılmış ham
     uzunluk — sınırı aşan isimde hata cümlesi zaten denetimin sayısını yazıyor. */
  const uzunluk = denetim.ok ? denetim.isim.length : isim.trim().length;

  const ayniSayi = tamam ? tamam.ayni.length : null;
  /* Panel yalnız dolu grup varsa basılıyor (gerekçe Grup'un başında). */
  const listeVar = !!tamam && (tamam.ayni.length > 0 || tamam.benzer.length > 0);

  /* Bandın alt cümlesi. Tek yerde toplandı: bant yedi hâl taşıyor ve
     cümleler JSX'in içine dağılınca hangi hâlin hangi cümleyi aldığı
     okunmuyordu. */
  const bantAlt: ReactNode =
    hal.ad === "bos" ? (
      "İsmi yazıp Kayıtta ara'ya basın; aynı sayılabilen ve benzer kayıtlar aşağıda listelenir."
    ) : bekliyor ? (
      `Companies House'un cevabı bekleniyor; ${CH_SURE_SN} saniyede gelmezse sorgu kesiliyor.`
    ) : hata ? (
      hata.cumle
    ) : c?.durum === "gecersiz" ? (
      /* Sunucunun isim kuralı reddi. Arayüz aynı denetimi göndermeden önce
         yaptığı için buraya normalde düşülmez; düşülürse sebep yazıyor. */
      c.neden
    ) : tamam && tamam.ayni.length > 0 ? (
      <>
        Aşağıdaki {tamam.ayni.length === 1 ? "kayıt" : "kayıtlar"} kurumun kuralıyla isminizle aynı biçime
        iniyor: <b>{tamam.bicim}</b>. Aynı sayılan bir isim kullanılamıyor; istisnaları Companies House
        değerlendiriyor.
      </>
    ) : tamam && tamam.bakilan > 0 ? (
      <>
        Aramanın ilk {tamam.bakilan} sonucunda <b>{tamam.bicim}</b> biçimine inen kayıt yok. Bu, ismin
        alınabileceği anlamına gelmiyor; son söz Companies House&apos;un.
      </>
    ) : (
      <>
        Companies House araması bu isimle hiç sonuç döndürmedi. Bu da ismin alınabileceği anlamına gelmiyor;
        son söz Companies House&apos;un.
      </>
    );

  /* BANDIN DUYURUSU YALNIZ SAYI TAŞIYAN HÂLDE VERİLİYOR (sözleşme · Bant).
     `duyuru` verilince görünen blok aria-hidden oluyor ve sayan rakamın ara
     kareleri ağaca gitmiyor; karşılığında cümle burada bir kez daha, düz
     metin olarak yazılıyor (KurumlarVergisi.tsx'te de aynı ikizleme var).
     Öteki hâllerde bant bir SAYI değil bir HÜKÜM taşıyor, sayan rakam yok,
     yani duyuru verilmiyor ve bloğun kendisi okunuyor. */
  const bantDuyuru =
    tamam && tamam.ayni.length > 0
      ? `Companies House kaydı, ${sorulan}: ${tamam.ayni.length} kayıt aynı sayılabilir. ` +
        `${tamam.ayni.length === 1 ? "Aşağıdaki kayıt" : "Aşağıdaki kayıtlar"} kurumun kuralıyla isminizle ` +
        `aynı biçime iniyor: ${tamam.bicim}. Aynı sayılan bir isim kullanılamıyor; istisnaları Companies ` +
        `House değerlendiriyor.`
      : undefined;

  return (
    <>
      <AracKunye
        ad="Şirket ismi sorgusu"
        alt="İngiltere · Companies House kaydı"
        /* Bayrak var, ülke pili YOK: pil ülkeler arasında adres değiştirmek
           için ve bu aracın gidilecek ikinci bir adresi yok (gerekçe dosya
           başında, A2'NİN ALINMAYAN PARÇALARI). */
        ulke="ingiltere"
      />

      <Tezgah
        kicker={
          <>
            <Landmark size={15} strokeWidth={2.1} aria-hidden="true" />
            Resmî kayıt sorgusu
          </>
        }
      >
        {/* Form yalnız girdiyi ve düğmeyi sarıyor; bant formun DIŞINDA,
            çünkü cevap bir form alanı değil. Esnek sütun: blokların arası
            kendi margin'lerinden geliyor (tezgâhın ritmi) ve flex kabı
            margin çökmesini kapatıyor. */}
        <form className="ta-isim-form" onSubmit={sorgula} noValidate>
          <GirdiSatiri>
            <IsimGirdi
              id={`${uid}-isim`}
              deger={isim}
              onDeger={onIsim}
              hata={hataGoster}
              /* Kutunun açıklaması İKİ öğe: yardım satırı ve biçim plakası.
                 Plaka <p> ve gerçek metin taşıyor; aria-label ile "gösterme"
                 yolu kapalı (tuzak G-2). */
              tarif={`${uid}-yardim ${uid}-bicim`}
              sayac={
                <>
                  {uzunluk} / {EN_FAZLA_KARAKTER}
                </>
              }
            />
          </GirdiSatiri>

          <Yazimlar secili={isim} onSec={onIsim} />

          <Yardim id={`${uid}-yardim`}>
            {hataGoster && !denetim.ok
              ? denetim.neden
              : yazilan === null && hazirIsim
                ? "İsim, isim üretecinden aktarıldı; sorgu siz düğmeye basınca gidiyor."
                : "Ltd ekini yazmanız gerekmiyor; Latin harfleri, rakamlar ve temel noktalama kullanın."}
          </Yardim>

          {/* SOR SATIRI — ızgarası girdi satırınınkiyle aynı (260 / 1fr):
              solda eylem etiket sütununun altında, sağda biçim plakası
              kutunun altında. Plakanın kutuyla aynı sütunda durması bir
              ölçü kararı: ikisi aynı şeyin iki hâli (yazdığınız isim ve
              kurumun gördüğü dizge), farklı sütunlarda kopuk duruyorlardı. */}
          <div className="ta-isim-sor">
            <button type="submit" className="ta-isim-git" disabled={bekliyor}>
              <Search size={16} strokeWidth={2.1} aria-hidden="true" />
              {bekliyor ? "Sorgulanıyor…" : "Kayıtta ara"}
            </button>

            {/* BİÇİM PLAKASI. Eski dilde gece bir yüzeydi; yeni dilde
                sayfada TEK koyu yüzey var (bant), o yüzden plaka açık
                zemine geçti: canlı hâlde --blue-100, örnek ve okunamayan
                hâlde --paper. Bilgi kaybı yok, ikinci gece kutu yok.
                Metin `key` ile yeniden takılıyor, yani yalnız BİÇİM
                değişince kısa bir giriş oynuyor — boşluk ya da nokta
                yazınca plaka kıpırdamıyor, bu da kuralın kendisi.
                Canlı bölge DEĞİL: her tuşta duyuru olurdu; kutu
                aria-describedby ile bu metni okutuyor. */}
            <p
              id={`${uid}-bicim`}
              className="ta-isim-bicim"
              data-ornek={bosKutu ? "" : undefined}
              data-okunamadi={okunamadi ? "" : undefined}
            >
              <span className="ta-isim-bicim-k">
                <Equal size={14} strokeWidth={2.1} aria-hidden="true" />
                Karşılaştırma biçimi
              </span>
              {/* Ayraç METİN olarak: satır içi öğeler erişilebilir adda
                  boşluksuz birleşiyor ve ilk yazımda kutunun açıklaması
                  "Karşılaştırma biçimiATLASLAB" diye okunuyordu. */}
              <span className="sr-only">: </span>
              <span key={plaka} className="ta-isim-bicim-t">
                {plaka}
              </span>
              {bosKutu && (
                <>
                  <span className="sr-only">, </span>
                  <span className="ta-isim-bicim-r">örnek</span>
                </>
              )}
            </p>
          </div>
        </form>

        {/* ------------------------------------------------------- BANT
            CEVAP ve sayfanın TEK gece yüzeyi. Burada bir SAYI değil çoğu
            zaman bir HÜKÜM taşıyor:
              aynı sayılan varsa   sayan rakam + "kayıt aynı sayılabilir"
              yoksa                "Aynı sayılan kayıt yok"
              hata / anahtarsız    hatanın başlığı
            `eylem` her sonuçta ve her hatada Companies House'un kendi
            kontrolüne çıkış (karar 4). `gosterge` yalnız beklerken:
            rotanın Companies House süresi kadar bir kez dolan çizgi. */}
        <Bant
          ikon={<Landmark size={14} strokeWidth={1.9} aria-hidden="true" />}
          kicker={sorulan ? `Companies House kaydı · ${sorulan}` : "Companies House kaydı"}
          alt={bantAlt}
          duyuru={bantDuyuru}
          gosterge={
            bekliyor ? (
              /* SÜRE ÇİZGİSİ — süs (gosterge zaten aria-hidden). Sayı
                 lib'den, CSS'e özel değişkenle geçiyor; "8 saniye" iki
                 yerde yazılı değil. Duruş karesinde yok (CSS). */
              <span className="ta-isim-sure" style={{ "--ta-isim-sn": `${CH_SURE_SN}s` } as CSSProperties}>
                <span className="ta-isim-sure-i" />
              </span>
            ) : undefined
          }
          eylem={
            sorulan && !bekliyor ? (
              <a
                className="ta-isim-cikis"
                /* Hatada ASIL eylem o, dolu (beyaz) basılıyor; sonuçta
                   ikincil, çerçeveli. */
                data-on={tamam ? undefined : ""}
                href={chUygunlukAdresi(sorulan)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink size={15} strokeWidth={2.1} aria-hidden="true" />
                Companies House&apos;un kendi kontrolünde açın
                <span className="sr-only"> (yeni sekmede)</span>
              </a>
            ) : undefined
          }
        >
          {/* Sayan rakamın kabı HEP TAKILI, boşken `hidden`: Sayac ilk
              basışta saymıyor (sunucu ile tarayıcı aynı sayıyı bassın
              diye), yani sonuç gelince yeni takılan bir Sayac düz
              belirirdi. Kap takılı kalınca aynı Sayac 0'dan yeni değere
              sayıyor; gizliyken ağaçta yok, "0" okunmuyor. */}
          <span className="ta-isim-say" hidden={!ayniSayi}>
            <Sayac deger={ayniSayi ?? 0} />
            <span className="ta-bant-c">kayıt aynı sayılabilir</span>
          </span>
          {hal.ad === "bos" && <span className="ta-bant-bos">—</span>}
          {bekliyor && <span className="ta-bant-karar">Sorgulanıyor…</span>}
          {hata && <span className="ta-bant-karar">{hata.baslik}</span>}
          {c?.durum === "gecersiz" && <span className="ta-bant-karar">İsim kabul edilmedi</span>}
          {tamam && tamam.ayni.length === 0 && <span className="ta-bant-karar">Aynı sayılan kayıt yok</span>}
        </Bant>
      </Tezgah>

      {listeVar && tamam && (
        <div className="ta-isim-sonuc">
          {tamam.ayni.length > 0 && (
            <Grup
              ikon={<Equal size={15} strokeWidth={1.9} />}
              baslik="Aynı sayılabilir"
              alt="Kurumun kuralıyla isminizle aynı biçime inen kayıtlar."
              sayi={tamam.ayni.length}
            >
              <KayitListe kayitlar={tamam.ayni} tur="ayni" />
            </Grup>
          )}
          {tamam.benzer.length > 0 && (
            <Grup
              ikon={<Layers size={15} strokeWidth={1.9} />}
              baslik="Benzer isimler"
              alt="Aramanın öteki yakın kayıtları, kurumun kendi sırasıyla."
              sayi={tamam.benzer.length}
            >
              <KayitListe kayitlar={tamam.benzer} tur="benzer" />
            </Grup>
          )}
        </div>
      )}

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

      {/* Kapanış. Dipnot ESTIMATE_NOTE DEĞİL ve bu bir karar: o cümle bir
          TAHMİN üretilen araçlar için ("Bu sonuç bir tahmindir, teklif
          değildir"), burada üretilen şey bir tahmin değil bir kayıt
          sorgusunun sonucu. Yerine eski defterin dipnotu geçti; cümle
          değişmedi, yeri değişti. */}
      <Dip not="Bu sorgu bir ön kontrol, uygunluk onayı değil; son sözü başvuruda Companies House söylüyor.">
        <AskCta />
      </Dip>

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
