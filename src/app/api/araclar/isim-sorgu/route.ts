import {
  aramaMetni,
  CH_SURE_SN,
  chCevabiniIsle,
  isimDenetle,
  type SorguCevap,
} from "@/lib/tools/ukIsim";

/* ============================================================================
   İNGİLTERE ŞİRKET İSMİ SORGUSU · SUNUCU ROTASI
   POST /api/araclar/isim-sorgu   gövde: { "isim": "Atlas Labs" }
   ============================================================================

   BU DEPONUN İLK SUNUCU ROTASI. Bugüne kadar her araç tamamen tarayıcıda
   çalışıyordu ve araç sayfalarının altındaki "girdiğiniz hiçbir bilgi bize
   gelmiyor" cümlesi bu yüzden doğruydu. Bu araç için DEĞİL: isim sunucumuzdan
   geçiyor. Cümle artık defterdeki `sunucu` alanına bakıyor (ToolShell).

   ------------------------------------------------------ NEDEN SUNUCU, NEDEN
   Companies House Public Data API her istekte bir anahtar istiyor (HTTP Basic,
   kullanıcı adı = anahtar, parola boş — developer-specs.company-information.
   service.gov.uk/guides/authorisation). Tarayıcıdan doğrudan sorulsaydı
   anahtar sayfanın kaynağında dururdu ve kotamız (aşağıda) herkese açık
   olurdu. Anahtar YALNIZCA bu dosyada, istek anında process.env'den okunuyor;
   NEXT_PUBLIC_ öneki yok, yani Next onu istemci paketine hiç koymuyor.

   ------------------------------------------ DOĞRULANAN API AYRINTILARI
   11.09.2026'da resmî sayfalardan okundu:
     · Uç nokta   GET https://api.company-information.service.gov.uk/search/companies
                  q (zorunlu), items_per_page, start_index, restrictions
                  (…/companies-house-public-data-api/reference/search/search-companies)
     · Kimlik     Basic <base64(anahtar + ":")>          (…/guides/authorisation)
     · Sınır      "beş dakikada en fazla 600 istek"; aşılınca pencerenin
                  kalanında her istek 429                  (…/guides/rateLimiting)
     · Sahte anahtar  401 {"error":"Invalid Authorization","type":"ch:service"}
                  — curl ile ölçüldü, anahtarsız istek de aynı 401'i veriyor.

   Sınır ANAHTAR başına, yani BÜTÜN ziyaretçilerimiz için ORTAK. Bunun için
   rotada bir sayaç YOK ve bilerek: Vercel'de her istek ayrı bir örneğe
   düşebiliyor, bellekte tutulan bir sayaç örnekler arasında paylaşılmıyor ve
   koruyor gibi görünüp korumazdı. Kotayı koruyan şey şimdilik üç şey:
   sorgunun yalnız düğmeyle gitmesi, JSON zorunluluğu (aşağıda) ve 429'un
   dürüstçe söylenmesi. Kötüye kullanım görülürse doğru yer Vercel'in kendi
   güvenlik duvarı kuralı — kod değil.

   ------------------------------------------------------------- GİZLİLİK
   alanadi.ts'teki üç ilke burada da geçerli, dördüncüsü eklendi:
     1. KENDİLİĞİNDEN ÇALIŞMIYOR. Arayüz yalnız düğmeye basılınca istek atıyor;
        yazarken değil, sayfa açılırken değil, adres çubuğundan gelen isimle de
        değil (UkIsimSorgu.tsx).
     2. GİDEN ŞEY EKRANDA YAZILI. Aracın altında ve kabukta (ToolShell).
     3. İSİM ADRESTE DEĞİL, GÖVDEDE. GET + ?isim= olsaydı isim, adresi
        yazan her erişim kaydına düşerdi; erişim kayıtları istek gövdesini
        yazmıyor. (İsim üretecinden gelen bağlantı da ismi ?isim= ile değil
        #isim= ile taşıyor: # sonrası tarayıcıdan hiç çıkmıyor.)
     4. KAYIT YOK. Bu dosyada tek bir console çağrısı yok ve olmayacak; hata
        yolları da ismi ya da Companies House'un cevabını yazdırmıyor. Sunucu
        hiçbir şey saklamıyor, her cevap `Cache-Control: no-store`.

   Companies House tarafında istek bizim sunucumuzdan gidiyor: kurum ziyaretçinin
   IP adresini değil sunucumuzunkini görüyor. İsmin kendisi ise kuruma gidiyor
   ve kurumun GET adresinde duruyor — bu, API'nin kendi tasarımı, bizde bir
   karşılığı yok. Arayüz bunu da söylüyor.

   -------------------------------------------------- İSTEK SINIRLARI
   · İçerik türü application/json olmak ZORUNDA (415). Başka bir sitenin
     sayfası tarayıcı üzerinden bu rotayı kendi Companies House vekili gibi
     kullanamasın diye: JSON isteği tarayıcıda bir ön kontrol (CORS preflight)
     doğuruyor ve bu rota CORS başlığı basmadığı için tarayıcı isteği hiç
     göndermiyor. Ön kontrolsüz türler (text/plain, form) ise burada 415'e
     düşüyor. Tarayıcı dışı istemcileri durdurmuyor; onu hiçbir başlık
     durdurmaz.
   · Gövde en fazla 2048 bayt (413). 160 karakterlik bir isim, JSON sarmalıyla
     birlikte 1 KB'ı geçmiyor; iki katı pay.
   · İsim kuralı lib/tools/ukIsim.ts · isimDenetle — arayüzle AYNI fonksiyon.
   · Companies House için 8 saniyelik süre sınırı (alanadi.ts'teki RDAP
     sorgusu 9 sn; aynı gerekçe): süresiz bekleyen bir istek arayüzü
     "sorgulanıyor"da bırakırdı. Süre dolarsa cevap "zaman-asimi" — asla
     "kayıtta yok", çünkü bilmiyoruz.

   ---------------------------------------- DURUM KODU → ARAYÜZDEKİ KARŞILIK
     200 tamam         sonuç listesi
     400 gecersiz      isim kuralı (neden metni cevapta)
     400/413/415       istek-hatali — arayüzden gelmez; elle atılmış istek
     503 anahtar-yok   "Sorgu henüz etkin değil" + Companies House'un kendi
                       isim uygunluk sayfası (isim hazır doldurulmuş)
     502 yetki         CH 401 — anahtar geçersiz ya da iptal; sorun bizde
     429 yogun         CH 429 — ortak kota doldu
     502 ch-hata       CH 5xx ya da beklenmeyen kod/gövde
     504 zaman-asimi   CH 8 sn içinde cevap vermedi
     502 ulasilamadi   CH'ye hiç bağlanılamadı
   Her gövde `{ durum: … }` taşıyor; arayüz durum koduna değil bu alana bakıyor.

   Rota dosyası YALNIZCA POST dışa aktarıyor: Next 15'in tip denetimi route.ts'te
   HTTP yöntemleri ve segment ayarları dışında bir dışa aktarıma izin vermiyor
   (node_modules/next/dist/build/webpack/plugins/next-types-plugin). Yardımcılar
   bu yüzden ya bu dosyada dışa aktarılmadan duruyor ya da lib'de. GET, PUT vb.
   Next'in kendisi 405 ile karşılıyor.
   ========================================================================= */

const CH_ARAMA = "https://api.company-information.service.gov.uk/search/companies";
/** Sabitin kendisi lib'de (ukIsim.ts · CH_SURE_SN): arayüz aynı sayıyı yazıyor. */
const CH_SURE_MS = CH_SURE_SN * 1000;
/** Aramadan istenen kayıt sayısı. "Aynı sayılır" kontrolü bunların hepsine
 *  bakıyor; ekranda benzerlerin ilk 10'u gösteriliyor (ukIsim.ts). */
const KAYIT_SAYISI = 20;
const GOVDE_SINIRI = 2048;

function cevap(govde: SorguCevap, status: number): Response {
  return Response.json(govde, { status, headers: { "Cache-Control": "no-store" } });
}

/** Süre sınırı mı, başka bir ağ hatası mı? AbortSignal.timeout Node'un
 *  fetch'inde "TimeoutError" adlı bir DOMException ile reddediyor. */
function sureDoldu(e: unknown): boolean {
  const ad = (e as { name?: unknown } | null)?.name;
  return ad === "TimeoutError" || ad === "AbortError";
}

export async function POST(request: Request): Promise<Response> {
  /* ------------------------------------------------------------ İSTEK */
  const tur = (request.headers.get("content-type") ?? "").toLowerCase();
  if (!tur.startsWith("application/json")) return cevap({ durum: "istek-hatali" }, 415);

  if (Number(request.headers.get("content-length") ?? "0") > GOVDE_SINIRI) {
    return cevap({ durum: "istek-hatali" }, 413);
  }

  let govde: unknown;
  try {
    const metin = await request.text();
    if (metin.length > GOVDE_SINIRI) return cevap({ durum: "istek-hatali" }, 413);
    govde = JSON.parse(metin);
  } catch {
    return cevap({ durum: "istek-hatali" }, 400);
  }

  const denetim = isimDenetle(
    govde && typeof govde === "object" ? (govde as { isim?: unknown }).isim : undefined,
  );
  if (!denetim.ok) return cevap({ durum: "gecersiz", neden: denetim.neden }, 400);

  /* ----------------------------------------------------------- ANAHTAR
     İstek anında okunuyor, modül yüklenirken değil: Vercel'e anahtar
     eklendikten sonraki ilk dağıtımda kod değişmeden çalışmaya başlasın.
     Yazdırılabilir ASCII dışı bir karakter taşıyorsa (yapıştırırken gelen
     görünmez karakter) Basic başlığı kurulamaz; o da "yetki" sayılıyor,
     çünkü düzeltilecek şey anahtarın kendisi. */
  const anahtar = process.env.COMPANIES_HOUSE_API_KEY?.trim();
  if (!anahtar) return cevap({ durum: "anahtar-yok" }, 503);
  if (!/^[\x21-\x7e]+$/.test(anahtar)) return cevap({ durum: "yetki" }, 502);

  /* ------------------------------------------------- COMPANIES HOUSE */
  const adres = `${CH_ARAMA}?q=${encodeURIComponent(aramaMetni(denetim.isim))}&items_per_page=${KAYIT_SAYISI}`;

  let ch: Response;
  try {
    ch = await fetch(adres, {
      headers: {
        Authorization: `Basic ${btoa(`${anahtar}:`)}`,
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(CH_SURE_MS),
      cache: "no-store",
    });
  } catch (e) {
    return sureDoldu(e) ? cevap({ durum: "zaman-asimi" }, 504) : cevap({ durum: "ulasilamadi" }, 502);
  }

  if (ch.status === 401) return cevap({ durum: "yetki" }, 502);
  if (ch.status === 429) return cevap({ durum: "yogun" }, 429);
  if (!ch.ok) return cevap({ durum: "ch-hata" }, 502);

  let veri: unknown;
  try {
    veri = await ch.json();
  } catch (e) {
    /* Gövde okunurken de süre dolabilir (aynı sinyal). */
    return sureDoldu(e) ? cevap({ durum: "zaman-asimi" }, 504) : cevap({ durum: "ch-hata" }, 502);
  }

  return cevap(chCevabiniIsle(veri, denetim.isim), 200);
}
