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

/** Ölçülmüş uzantılar. Sıra ekranda da bu sıra: en çok istenen önde. */
export const ALAN_UZANTILARI = ["com", "net", "org", "co.uk"] as const;
export type AlanUzantisi = (typeof ALAN_UZANTILARI)[number];

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
    const cevap = await fetch(`https://rdap.org/domain/${etiket}.${uzanti}`, {
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
export async function alanAdiSorgula(etiket: string): Promise<AlanSonuc[]> {
  if (!etiket || etiket.length < 2) return [];
  return Promise.all(
    ALAN_UZANTILARI.map(async (uzanti) => ({ uzanti, durum: await tekSorgu(etiket, uzanti) })),
  );
}
