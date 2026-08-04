/* ============================================================================
   BASINDA BİZ — basın kayıtlarının tek defteri.
   Sayfa: src/app/basinda-biz/page.tsx · Biçim: src/app/css/kurumsal.css

   ---------------------------------------------------------- BUGÜN NEDEN BOŞ
   `PRESS` boş ve bu bir eksiklik değil, bir KARAR. Depo baştan sona arandı:
   sitede firmayla ilgili tek bir doğrulanmış basın kaydı yok — ne bir yayın
   adı, ne bir tarih, ne bir bağlantı. "Basında biz" başlığı altında uydurma
   bir yayın adı ya da tarihi olmayan bir alıntı basmak, sitenin geri kalanının
   dayandığı tek iddiayı ("yalnızca doğrulanabilir olanı yazıyoruz") tek
   ekranda çürütürdü. Basın sayfası bu riskin en yüksek olduğu sayfa türü:
   buradaki her satır ÜÇÜNCÜ BİR TARAFIN ağzından bir iddia.

   -------------------------------------------------- ŞEMANIN KENDİSİ BİR KİLİT
   Kayıt yazmak isteyen kişinin uydurma bir satır yazması TİP DENETİMİNDEN
   geçmiyor, çünkü `url` ve `publishedAt` zorunlu. Yani "bir haber sitesinde
   çıktı" diye kaynaksız kayıt, ya da tarihi bilinmeyen bir röportaj bu diziye
   hiç giremiyor. Aynı kilit /e-kitaplar'da da var (Ebook.file) ve aynı işi
   görüyor: doğrulanamayan içerik yayına alınamıyor.

   SWAP:PRESS_ITEMS — kayıt geldiğinde yapılacak tek şey aşağıdaki diziye bir
   satır eklemek. Sayfa, boş durumdan listeye kendiliğinden geçiyor; ne sayfaya
   ne CSS'e dokunmak gerekiyor.
   ========================================================================= */

/** Kaydın türü. Röportaj ile haber aynı şey değil: birinde konuşan biziz. */
export type PressKind = "haber" | "roportaj" | "kose" | "bulten";

export const PRESS_KIND_LABEL: Record<PressKind, string> = {
  haber: "Haber",
  roportaj: "Röportaj",
  kose: "Köşe yazısı",
  bulten: "Bülten",
};

export type PressItem = {
  /** React anahtarı ve JSON-LD kimliği; adres parçası DEĞİL */
  id: string;
  /** yayının adı — ekranda tam olarak böyle çıkıyor */
  outlet: string;
  /** haberin KENDİ başlığı; bizim özetimiz değil */
  title: string;
  /**
   * ZORUNLU — yayının kendi adresi.
   * Bu alan opsiyonel olsaydı defter "şurada da çıkmıştık" tipi, okuyucunun
   * doğrulayamayacağı satırlarla dolardı. Bağlantısı olmayan kayıt yazılamaz.
   */
  url: string;
  /** ZORUNLU — YYYY-MM-DD. Tarihsiz basın kaydı doğrulanamaz. */
  publishedAt: string;
  kind: PressKind;
  lang: "tr" | "en";
  /** en fazla iki cümle: haberin ne dediği. Bizim yorumumuz buraya girmiyor. */
  summary?: string;
};

/* SWAP:PRESS_ITEMS — bkz. dosya başı. Bilerek boş. */
export const PRESS: PressItem[] = [];

/** Yeniden eskiye. Liste boşken de çalışıyor; çağıran taraf ayrım yapmıyor. */
export function sortedPress(): PressItem[] {
  return [...PRESS].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

/* ------------------------------------------------------------- BOŞ DURUM
   Metin burada, sayfada değil: bu iki cümle firmanın basın karşısındaki
   duruşunu anlatıyor, yani onaylanması gereken bir METİN — React okuyarak
   onaylanmasın diye veri dosyasında duruyor (aynı kalıp lib/about.ts'te). */
export const PRESS_EMPTY = {
  title: "Henüz yayımlanmış bir basın kaydımız yok.",
  line: "Bu sayfa bir arşiv ve bugün boş. Buraya yalnızca yayının kendi adresine bağlanabilen, tarihi belli kayıtlar giriyor; ekran görüntüsü, kaynağı yazılmayan alıntı ya da “bir haber sitesinde çıktı” cümlesi girmiyor. İlk kayıt yayımlandığında bu sayfa kendiliğinden listeye dönüşecek.",
};

/* --------------------------------------------------------- BASIN İLETİŞİMİ
   SWAP:PRESS_CONTACT — basına AYRILMIŞ bir e-posta ya da muhatap yok.

   Uydurulmadı, çünkü basın sayfasındaki çalışmayan bir adres, gazetecinin
   haberi bizsiz yazmasıyla biten bir hata. Alan dolana kadar sayfa basını
   sitenin genel iletişim kanalına yönlendiriyor ve fazlasını söylemiyor:
   yanıt süresi, "7/24 basın hattı" ya da bir sözcü adı BİLEREK yazılmıyor —
   üçünün de karşılığı firmada yok.

   Doldurma kuralı offices.ts'teki ile aynı: `value` ekranda görünen metin,
   `href` tıklanınca gidilecek yer; ikisi birden dolmadan kanal canlanmıyor. */
export const PRESS_CONTACT: { value: string; href: string } = {
  value: "",
  href: "",
};

export const hasPressContact = (): boolean =>
  PRESS_CONTACT.value.trim() !== "" && PRESS_CONTACT.href.trim() !== "";
