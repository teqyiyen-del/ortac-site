/* ============================================================================
   ALAN ADI SORGUSU — RDAP
   ============================================================================

   Müşteri: "üstüne başarabiliyorsak domain sorgulama vb gibi şeyler
   ekleyebiliriz." Başarılabiliyor, ama kısmen — ve sınırın nerede olduğu bu
   dosyanın asıl konusu.

   ---------------------------------------------------------------- NEDEN RDAP

   İlk akla gelen yol DNS sorgusu (DNS-over-HTTPS): "alan adı çözümleniyor mu?"
   Bu yol YANLIŞ CEVAP VERİR. Tescilli ama hiçbir sunucuya bağlanmamış alan
   adları çözümlenmez; DNS'e göre boş görünürler. Araç o kişiye "boş" derdi ve
   kişi gidip alamazdı. Bu tam olarak bu depoda yasak olan şey: karşılığı
   olmayan bir vaat (bkz. isim üretecinin "müsait demiyoruz" kuralı).

   RDAP tescil kaydının kendisini soruyor — WHOIS'in yerine geçen resmî
   protokol. Kayıt varsa 200, yoksa 404. Aracı bir kaynak yok, cevabı
   tescil kütüğü veriyor.

   ------------------------------------------------- KAPSAM ÖLÇÜLDÜ, TAHMİN YOK

   RDAP her uzantıda YOK ve olmayan uzantıda her sorgu 404 dönüyor — yani
   "kayıtlı değil" ile "veri yok" aynı cevabı veriyor. Uzantı listesini
   tahminle yazmak, kullanıcıya "boş" denen ama aslında dolu olan adlar
   göstermek demekti. O yüzden her uzantı ikişer denetimle ölçüldü: kesin
   kayıtlı bir ad (pozitif) ve kesin kayıtsız bir ad (negatif).

     uzantı    pozitif kontrol        negatif kontrol       sonuç
     .com      google.com      200    qwzx9137asdk.com 404  KULLANILIYOR
     .net      google.net      200    qwzx9137asdk.net 404  KULLANILIYOR
     .org      google.org      200    qwzx9137asdk.org 404  KULLANILIYOR
     .co.uk    bbc.co.uk       200    qwzx9137asdk...  404  KULLANILIYOR
     .ae       etisalat.ae     404 ←  YANLIŞ            —   DIŞARIDA
     .io       google.io       404 ←  YANLIŞ            —   DIŞARIDA
     .co       google.co       404 ←  YANLIŞ            —   DIŞARIDA
     .com.tr   trt.com.tr      404 ←  YANLIŞ            —   DIŞARIDA

   `.ae` DIŞARIDA KALMASI CANIMIZI YAKIYOR ve bilerek böyle: Dubai müşterisinin
   en çok isteyeceği uzantı o. Ama RDAP'te karşılığı olmadığı için sorulsaydı
   HER ada "boş" derdik. Yanlış cevap veren bir sorgu, sorgu olmamasından
   kötüdür. Uzantı listesi ölçüm sonucu, tercih değil — biri RDAP'e geçerse
   pozitif/negatif denetimini tekrarlayıp listeye eklemek yeterli.

   ------------------------------------------------------ DIŞARI GİDEN TEK İSTEK

   Bu, sitedeki araçlar arasında tarayıcıdan DIŞARIYA istek atan TEK yer.
   Öteki araçların hepsi tamamen yerel. Üç önlem yazılı:

     1. KENDİLİĞİNDEN ÇALIŞMIYOR. Ziyaretçi tek bir adayın yanındaki düğmeye
        basmadan hiçbir istek gitmiyor. Yazarken arka planda sorgu atan bir
        kurgu, kişinin aklından geçen bütün adları dışarı göndermek olurdu.
     2. GİDEN ŞEY EKRANDA YAZILI. Arayüz kime ne gönderildiğini söylüyor;
        "girdiğiniz bilgi bize gelmiyor" cümlesi hâlâ doğru (bize gelmiyor)
        ama tek başına eksik kalırdı.
     3. BİZE HİÇBİR ŞEY GELMİYOR. Sunucumuz bu işin içinde değil, istek
        tarayıcıdan doğrudan RDAP'e gidiyor.

   -------------------------------------------------------------- NE DEMİYORUZ
   404 "bu adı alabilirsiniz" demek DEĞİL: ad rezerve edilmiş, uyuşmazlık
   altında ya da marka hakkına takılıyor olabilir. Arayüz bu yüzden "boş
   görünüyor" diyor, "alabilirsiniz" demiyor. Aynı ayrım tescil tarafında da
   geçerli — alan adının boş olması şirket adının onaylanacağı anlamına gelmez.
   ========================================================================= */

/* ------------------------------------------------ 09.10.2026 · DOKUZ UZANTI
   Halil: "godaddy gibi; adam ismini girecek, alındıysa alındı diyecek, altta
   mevcut olabilecek diğerlerini gösterecek. Satın alınabilir bir sistem değil,
   sadece bilgi amaçlı." (.ae ve .com.tr istenmedi; ikisinin de RDAP'i yok.)

   Sorgu artık rdap.org üzerinden DEĞİL, her uzantının kendi kütüğüne gidiyor:
     · rdap.org bir yönlendirici ve IANA listesinde olmayan uzantıda her ada 404
       dönüyor (.io böyle: listede yok, kütüğünün RDAP'i ise çalışıyor),
     · tek bir aramada dokuz uzantı ve sekiz benzer ad soruluyor; hepsi aynı
       yönlendiriciden geçseydi sınırına takılırdı. Şimdi istekler altı ayrı
       kütüğe dağılıyor.
   Her uç iki denetimle ölçüldü (kesin kayıtlı ad 200, kesin kayıtsız ad 404) ve
   hepsi tarayıcıdan sorulabiliyor (Access-Control-Allow-Origin: *):

     uzantı   kütük                        kayıtlı           kayıtsız
     .com     Verisign                     google.com   200  qwzx9137asdk  404
     .net     Verisign                     google.net   200  qwzx9137asdk  404
     .org     Public Interest Registry     google.org   200  qwzx9137asdk  404
     .co.uk   Nominet                      bbc.co.uk    200  qwzx9137asdk  404
     .io      Identity Digital             google.io    200  qwzx9137asdk  404
     .ai      Identity Digital             google.ai    200  qwzx9137asdk  404
     .dev     Google Registry              google.dev   200  qwzx9137asdk  404
     .app     Google Registry              google.app   200  qwzx9137asdk  404
     .xyz     CentralNic                   abc.xyz      200  qwzx9137asdk  404
   ------------------------------------------------------------------------- */
const KUTUK = {
  com: ["Verisign", "https://rdap.verisign.com/com/v1/domain/"],
  net: ["Verisign", "https://rdap.verisign.com/net/v1/domain/"],
  org: ["Public Interest Registry", "https://rdap.publicinterestregistry.org/rdap/domain/"],
  "co.uk": ["Nominet", "https://rdap.nominet.uk/uk/domain/"],
  io: ["Identity Digital", "https://rdap.identitydigital.services/rdap/domain/"],
  ai: ["Identity Digital", "https://rdap.identitydigital.services/rdap/domain/"],
  dev: ["Google Registry", "https://pubapi.registry.google/rdap/domain/"],
  app: ["Google Registry", "https://pubapi.registry.google/rdap/domain/"],
  xyz: ["CentralNic", "https://rdap.centralnic.com/xyz/domain/"],
} as const;

/** İsim üretecinin sorduğu dört uzantı (o aracın ekranı dört sütuna göre kurulu). */
export const ALAN_UZANTILARI = ["com", "net", "org", "co.uk"] as const;
/** Alan adı aracının sorduğu dokuz uzantı. Sıra ekranda da bu sıra. */
export const TUM_UZANTILAR = ["com", "net", "org", "co.uk", "io", "ai", "dev", "app", "xyz"] as const;
export type AlanUzantisi = (typeof TUM_UZANTILAR)[number];
/** Sorgunun gittiği kütüklerin adları; arayüz "kime ne gidiyor" cümlesinde yazıyor. */
export const KUTUK_ADLARI = [...new Set(Object.values(KUTUK).map((k) => k[0]))];

export type AlanDurum = "kayitli" | "bos" | "sorulamadi";

export type AlanSonuc = { uzanti: AlanUzantisi; durum: AlanDurum };

/** Tek bir istek için üst sınır. RDAP kütükleri bazen yavaş; süresiz bekleyen
 *  bir sorgu arayüzü "yükleniyor"da bırakır. Süre dolarsa cevap "sorulamadı"
 *  oluyor — asla "boş", çünkü bilmiyoruz. */
const ZAMAN_ASIMI_MS = 9000;

async function tekSorgu(etiket: string, uzanti: AlanUzantisi): Promise<AlanDurum> {
  const kontrol = new AbortController();
  const saat = setTimeout(() => kontrol.abort(), ZAMAN_ASIMI_MS);

  try {
    const cevap = await fetch(`${KUTUK[uzanti][1]}${etiket}.${uzanti}`, {
      signal: kontrol.signal,
      headers: { accept: "application/rdap+json" },
    });

    if (cevap.status === 404) return "bos";
    if (cevap.ok) return "kayitli";
    /* 429 (çok istek), 5xx ve ötekiler: kütük cevap veremedi. Bunu "boş"
       saymak, geçici bir arızayı kalıcı bir iddiaya çevirmek olurdu. */
    return "sorulamadi";
  } catch {
    /* Ağ yok, istek iptal edildi ya da CORS kapandı. Yine bilmiyoruz. */
    return "sorulamadi";
  } finally {
    clearTimeout(saat);
  }
}

/**
 * Bir adayın bütün uzantılarını birlikte soruyor.
 *
 * `Promise.all` bilerek: dört istek sıraya girseydi en kötü hâlde 36 saniye
 * beklenirdi. Hiçbiri ötekini beklemiyor ve biri patlarsa öteki üçü yine
 * cevabını veriyor (tekSorgu kendi içinde hata yutuyor, yani `all` reddetmiyor).
 */
export async function alanAdiSorgula(etiket: string, uzantilar: readonly AlanUzantisi[] = ALAN_UZANTILARI): Promise<AlanSonuc[]> {
  if (!etiket || etiket.length < 2) return [];
  return Promise.all(uzantilar.map(async (uzanti) => ({ uzanti, durum: await tekSorgu(etiket, uzanti) })));
}

/* ----------------------------------------------------------- ALAN ADI ARACI */

/** Yazılanı ada ve (varsa) uzantıya ayırıyor: "Halil.com" → { etiket: "halil", uzanti: "com" }.
 *  Tanımadığımız bir uzantı yazıldıysa uzanti null ve `bilinmeyen` o uzantı: arayüz söylüyor.
 *  Alan adında yalnız a-z, 0-9 ve tire olur; Türkçe harfler ASCII karşılığına iniyor. */
const TR: Record<string, string> = { ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u", â: "a", î: "i", û: "u" };
export function alanAyristir(girdi: string): { etiket: string; uzanti: AlanUzantisi | null; bilinmeyen: string | null } {
  let ham = girdi.trim().toLocaleLowerCase("tr-TR").replace(/^https?:\/\//, "").replace(/^www\./, "").split(/[/?#\s]/)[0];
  ham = [...ham].map((c) => TR[c] ?? c).join("");
  let uzanti: AlanUzantisi | null = null, bilinmeyen: string | null = null;
  const nokta = ham.indexOf(".");
  if (nokta > -1) {
    const kuyruk = ham.slice(nokta + 1);
    if ((TUM_UZANTILAR as readonly string[]).includes(kuyruk)) uzanti = kuyruk as AlanUzantisi;
    else if (kuyruk) bilinmeyen = kuyruk.slice(0, 24);
    ham = ham.slice(0, nokta);
  }
  const etiket = ham.replace(/[^a-z0-9-]/g, "").replace(/^-+|-+$/g, "").slice(0, 63);
  return { etiket, uzanti, bilinmeyen };
}

/** Ad alınmışsa sorulacak benzerler: aynı adın önüne ve arkasına sık kullanılan ekler.
 *  Liste sabit ve sırası sabit; rastgelelik yok (aynı girdi aynı öneriler). */
const ON_EK = ["get", "try", "go", "the"] as const;
const SON_EK = ["hq", "co", "global", "group", "labs", "online"] as const;
export function alanBenzerleri(etiket: string): string[] {
  const out = [...SON_EK.map((e) => etiket + e), ...ON_EK.map((e) => e + etiket)];
  return out.filter((x) => x.length <= 63 && x !== etiket).slice(0, 8);
}
