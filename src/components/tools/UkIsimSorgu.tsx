"use client";

import { useId, useRef, useState, useSyncExternalStore } from "react";
import { ExternalLink, Search } from "lucide-react";
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
      Aynı sebeple sonuç kutusu hiçbir hâlde YEŞİL değil: aynı isim çıkınca
      kehribar, çıkmayınca nötr. Yeşil bir "yok" kutusu, yazıyla söylemediğimiz
      "alabilirsiniz"i renkle söylerdi.

   2) KARŞILAŞTIRMA BİÇİMİ CANLI GÖRÜNÜYOR. Yazarken ismin kurumun kuralıyla
      hangi dizgeye indiği yardım satırında basılıyor ("ATLASLAB"). Bu tamamen
      yerel bir hesap, ağa hiçbir şey gitmiyor — ve "neden Atlas Lab ile
      ATLAS LABS LIMITED aynı çıktı" sorusunu sonuç gelmeden cevaplıyor.

   3) SORGU YALNIZ DÜĞMEYLE GİDİYOR. Yazarken değil, sayfa açılırken değil,
      isim üretecinden hazır dolu gelindiğinde de değil. İsim üretecinin
      "Companies House'ta sorgula" çıkışı ismi adresin #isim= kısmında
      taşıyor; araç onu kutuya yazıyor ve düğmeyi bekliyor. Adres başkası
      tarafından kurulmuş bir bağlantı da olabilir: kendiliğinden çalışan bir
      sorgu, bir bağlantıyla ortak kotamızı tüketmenin yolu olurdu.

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

/** Ekran okuyucunun duyurduğu kısa özet (aria-live). Uzun liste canlı
 *  bölgeye girmiyor: yirmi şirket adını art arda okutmak duyuru değil. */
function ozet(hal: Hal): string {
  if (hal.ad === "bekliyor") return "Companies House kaydı sorgulanıyor.";
  if (hal.ad === "ag") return HATA_METNI.ag.baslik + ".";
  if (hal.ad !== "cevap") return "";
  const c = hal.cevap;
  if (c.durum === "tamam") {
    return c.ayni.length > 0
      ? `${c.ayni.length} kayıt aynı sayılabilir, ${c.benzer.length} benzer kayıt listelendi.`
      : `Kayıtta aynı isim görünmüyor, ${c.benzer.length} benzer kayıt listelendi.`;
  }
  if (c.durum === "gecersiz") return c.neden;
  return HATA_METNI[c.durum].baslik + ".";
}

/* ----------------------------------------------------------- BİLEŞENLER */

function Kayit({ k }: { k: SirketKaydi }) {
  const tr = DURUM_ADI[k.durum];
  return (
    <li className="tl-name">
      <div className="tl-name-h">
        <span className="tl-name-t">{k.ad}</span>
      </div>
      <ul className="tl-name-d">
        <li>
          {/* Türkçe karşılığın yanında kurumun kendi kelimesi: çeviri hukuki
              terimi tam karşılamazsa asıl değer ekranda duruyor. */}
          <b>{tr ?? (k.durum || "Durum belirtilmemiş")}</b>
          {tr && ` (${k.durum})`} · No {k.numara}
        </li>
        {k.kurulus && (
          <li>
            Kuruluş {tarih(k.kurulus)}
            {k.kapanis && ` · kapanış ${tarih(k.kapanis)}`}
          </li>
        )}
      </ul>
      <a
        className="tl-name-dbtn"
        href={chKayitAdresi(k.numara)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Kaydı aç: ${k.ad}, Companies House, yeni sekmede`}
      >
        <ExternalLink size={13} strokeWidth={2.1} aria-hidden="true" />
        Kaydı aç
      </a>
    </li>
  );
}

/** Companies House'un kendi isim uygunluk sayfası — her sonucun ve her
 *  hatanın ortak çıkışı. */
function ChCikisi({ isim }: { isim: string }) {
  return (
    <div className="tl-actions">
      <a className="tl-ghost" href={chUygunlukAdresi(isim)} target="_blank" rel="noopener noreferrer">
        <ExternalLink size={16} strokeWidth={2.1} aria-hidden="true" />
        Companies House&apos;un kendi kontrolünde açın
        <span className="sr-only"> (yeni sekmede)</span>
      </a>
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

  return (
    <div className="tl-app">
      <form onSubmit={sorgula} noValidate>
        <div className="tl-field">
          <label className="tl-label" htmlFor={`${uid}-isim`}>
            Şirket ismi <span className="tl-label-x">(Ltd ekini yazmanız gerekmiyor)</span>
          </label>
          <input
            id={`${uid}-isim`}
            className="tl-input"
            type="text"
            inputMode="text"
            autoComplete="off"
            autoCapitalize="words"
            spellCheck={false}
            placeholder="Atlas Labs"
            /* 160 kurumun sınırı ve denetim onu söylüyor; buradaki 200 yalnız
               yapıştırılan uzun metni sessizce kesmemek için bir üst korkuluk. */
            maxLength={200}
            value={isim}
            onChange={(e) => onIsim(e.target.value)}
            aria-describedby={`${uid}-yardim`}
            aria-invalid={hataGoster || undefined}
          />
          <p id={`${uid}-yardim`} className="tl-help">
            {hataGoster && !denetim.ok ? (
              denetim.neden
            ) : bicim ? (
              <>
                Karşılaştırma biçimi: <b>{bicim}</b>. Companies House şirket türü ekini, noktalamayı,
                boşlukları ve sondaki S harfini yok sayarak karşılaştırıyor.
                {yazilan === null && hazirIsim && " İsim, isim üretecinden aktarıldı; sorgu siz düğmeye basınca gidiyor."}
              </>
            ) : (
              `Latin harfleri, rakamlar ve temel noktalama; en fazla ${EN_FAZLA_KARAKTER} karakter.`
            )}
          </p>
        </div>

        <div className="tl-actions">
          <button type="submit" className="tl-copy" disabled={bekliyor}>
            <Search size={16} strokeWidth={2.1} aria-hidden="true" />
            {bekliyor ? "Sorgulanıyor…" : "Kayıtta ara"}
          </button>
          {/* Canlı bölge boşken de DOM'da (araclar.css · SONUÇ notu). */}
          <span className="tl-actions-s" role="status" aria-live="polite">
            {ozet(hal)}
          </span>
        </div>
      </form>

      {/* ------------------------------------------------------- HATA */}
      {hata && hal.ad !== "bos" && hal.ad !== "bekliyor" && (
        <>
          <div className="tl-out">
            <span className="tl-out-k">Companies House kaydı · {hal.isim}</span>
            <strong className="tl-big">{hata.baslik}</strong>
            <span className="tl-sub">{hata.cumle}</span>
          </div>
          <ChCikisi isim={hal.isim} />
        </>
      )}

      {/* Sunucunun isim kuralı reddi. Arayüz aynı denetimi göndermeden önce
          yaptığı için buraya normalde düşülmez; düşülürse sebep yazıyor. */}
      {c?.durum === "gecersiz" && <p className="tl-warn">{c.neden}</p>}

      {/* ------------------------------------------------------ SONUÇ */}
      {c?.durum === "tamam" && hal.ad === "cevap" && (
        <>
          <div className="tl-out" data-state={c.ayni.length > 0 ? "yakin" : undefined}>
            <span className="tl-out-k">Companies House kaydı · {hal.isim}</span>
            <strong className="tl-big">
              {c.ayni.length > 0 ? `${c.ayni.length} kayıt aynı sayılabilir` : "Kayıtta aynı isim görünmüyor"}
            </strong>
            <span className="tl-sub">
              {c.ayni.length > 0 ? (
                <>
                  Aşağıdaki {c.ayni.length === 1 ? "kayıt" : "kayıtlar"} kurumun kuralıyla isminizle aynı
                  biçime iniyor: <b>{c.bicim}</b>. Kayıtta aynı sayılan bir isim varsa o isim
                  kullanılamıyor; istisnaları (aynı gruptan şirketin yazılı onayı gibi) Companies
                  House değerlendiriyor.
                </>
              ) : c.bakilan > 0 ? (
                <>
                  Aramanın ilk {c.bakilan} sonucunda <b>{c.bicim}</b> biçimine inen kayıt yok. Bu,
                  ismin alınabileceği anlamına gelmiyor; son söz Companies House&apos;un.
                </>
              ) : (
                <>
                  Companies House araması bu isimle hiç sonuç döndürmedi. Bu da ismin alınabileceği
                  anlamına gelmiyor; son söz Companies House&apos;un.
                </>
              )}
            </span>
          </div>

          {c.ayni.length > 0 && (
            <section className="tl-ct" aria-labelledby={`${uid}-ayni`}>
              <h2 id={`${uid}-ayni`} className="tl-ct-k">
                Aynı sayılabilir · {c.ayni.length}
              </h2>
              {/* Kapanmış şirketlerin isminin engel olup olmadığı DOĞRULANMADI;
                  o yüzden burada hüküm yok, yalnız kararın kimde olduğu var. */}
              <p className="tl-ct-out">
                Her kaydın durumu Companies House&apos;tan geliyor. Kapanmış bir kaydın isminize engel
                olup olmadığını Companies House değerlendiriyor.
              </p>
              <ol className="tl-names">
                {c.ayni.map((k) => (
                  <Kayit key={k.numara} k={k} />
                ))}
              </ol>
            </section>
          )}

          {c.benzer.length > 0 && (
            <section className="tl-ct" aria-labelledby={`${uid}-benzer`}>
              <h2 id={`${uid}-benzer`} className="tl-ct-k">
                Benzer isimler · {c.benzer.length}
              </h2>
              <p className="tl-ct-out">
                Companies House aramasının döndürdüğü öteki yakın kayıtlar, kurumun kendi sırasıyla. Aynı
                sayılmıyorlar; ama yalnızca birkaç karakterle ayrılan bir isim &quot;too like&quot; sayılıp
                kayıttan sonraki 12 ay içinde değiştirilmesi istenebiliyor.
              </p>
              <ol className="tl-names">
                {c.benzer.map((k) => (
                  <Kayit key={k.numara} k={k} />
                ))}
              </ol>
            </section>
          )}

          <ChCikisi isim={hal.isim} />
        </>
      )}

      {/* "İsminiz sunucumuzdan geçiyor" notu BURADA YOK ve bilerek: aynı
          cümle kartın hemen altında kabuktan basılıyor (ToolShell · "Nereye
          gidiyor", kaynağı defterdeki `sunucu.cumle`). İlk yazımda ikisi de
          vardı ve ekran görüntüsünde alt alta neredeyse aynı paragraf okundu.
          Tek kaynak defter, çünkü o satır kabukta ZORUNLU; bileşendeki not
          bir gün silinse bile bilgi ekrandan düşmüyor. */}
      <p className="tl-note">
        Karşılaştırma kuralı The Company, Limited Liability Partnership and Business (Names and Trading
        Disclosures) Regulations 2015, Ek 3&apos;ten alındı ve kurumun kendi isim uygunluk sayfasıyla
        karşılaştırılarak sınandı: aksanlı harfler sadeleşiyor, sondaki Ltd, PLC gibi ek düşüyor, &amp;
        ile AND gibi eşdeğerler birleşiyor; sondaki &quot;&amp; Co&quot;, &quot;UK&quot;, &quot;.co.uk&quot;
        gibi ifadeler, noktalama, sondaki S harfi, baştaki &quot;The&quot; ve &quot;www&quot; ile
        boşluklar yok sayılıyor.
      </p>
      <p className="tl-warn">
        Bu sorgu bir <b>uygunluk onayı değil</b>. Kayıtta aynı isim görünmemesi, ismin alınabileceği
        anlamına gelmiyor: kısıtlı ve hassas kelimeler, marka hakları ve Companies House&apos;un kendi
        değerlendirmesi ayrı bir aşama. Son sözü başvuru sırasında Companies House söylüyor.
      </p>
    </div>
  );
}
