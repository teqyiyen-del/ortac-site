/* ============================================================================
   KARİYER — açık pozisyonların tek defteri.
   Sayfa: src/app/kariyer/page.tsx · Biçim: src/app/css/kurumsal.css

   ------------------------------------------------------- BUGÜN NEDEN BOŞ
   `OPENINGS` boş. Firmadan gelmiş, doğrulanmış tek bir ilan yok: ne bir
   pozisyon adı, ne bir ekip, ne bir lokasyon, ne bir istihdam tipi. Bir
   kariyer sayfasında uydurma ilan, sitedeki öteki uydurmalardan daha pahalı —
   çünkü karşılığı bir BAŞVURU. Olmayan pozisyona CV gönderen kişi, cevap
   alamadığında firmanın ciddiyetini sorgular; ilan kaldırıldığında da bunu
   fark eden ilk kişi o olur.

   Bu yüzden burada YAPI kuruldu, DEĞER bırakıldı — tıpkı lib/offices.ts'te
   olduğu gibi. Sayfa boşluğu gizlemiyor: pozisyon yokken "şu an açık pozisyon
   yok" diyor ve açık başvuru yolunu gösteriyor.

   ------------------------------------------------ ŞEMANIN İKİ KİLİDİ
   1. `applyHref` ZORUNLU. Başvurunun gideceği gerçek bir yer olmadan ilan
      yazılamıyor. Bu, "ilan var ama başvuru düğmesi hiçbir yere gitmiyor"
      hatasını tip denetimine taşıyor.
   2. `duties` ve `requirements` zorunlu dizi. Tek satırlık, içi boş bir ilan
      ("Muhasebeci aranıyor") yazmak mümkün ama en az bir madde yazmadan
      geçmiyor; ilanı yazan kişi işi tarif etmeye mecbur.

   ------------------------------------------------------ BİLEREK OLMAYANLAR
   Şemada MAAŞ ARALIĞI, YAN HAKLAR, EKİP BÜYÜKLÜĞÜ ve İŞE ALIM ADIMLARI alanı
   yok. Dördü de bugün doğrulanmamış; alan açmak, ilk ilanı yazan kişiyi o
   alanı doldurmaya davet etmek olurdu. İhtiyaç doğduğunda doğrulanmış
   değerle birlikte eklenirler.

   SWAP:CAREER_OPENINGS — ilan geldiğinde yapılacak tek şey aşağıdaki diziye
   bir satır eklemek. Sayfa boş durumdan listeye kendiliğinden geçiyor.
   ========================================================================= */

import { COUNTRY_NAME, type CountrySlug } from "@/lib/brand";

/** İstihdam tipi. Etiketler ekranda aynen çıkıyor. */
export type OpeningType = "tam-zamanli" | "yari-zamanli" | "sozlesmeli" | "staj";

export const OPENING_TYPE_LABEL: Record<OpeningType, string> = {
  "tam-zamanli": "Tam zamanlı",
  "yari-zamanli": "Yarı zamanlı",
  sozlesmeli: "Sözleşmeli",
  staj: "Staj",
};

/** Nerede çalışılacağı. Ülkeler sitenin tek kaynağından; "uzaktan" ayrı bir
 *  seçenek çünkü bir ofise bağlı olmayan pozisyon ülke adı taşımamalı. */
export type OpeningPlace = CountrySlug | "uzaktan";

export const placeLabel = (p: OpeningPlace): string =>
  p === "uzaktan" ? "Uzaktan" : COUNTRY_NAME[p];

export type Opening = {
  /** adres parçası ve React anahtarı */
  id: string;
  /** pozisyonun adı — "Kıdemli muhasebeci" gibi, sıfat yığını değil */
  title: string;
  /** hangi ekip / hangi iş kolu */
  team: string;
  place: OpeningPlace;
  type: OpeningType;
  /** iki cümleyi geçmeyen iş tanımı */
  summary: string;
  /** en az bir madde — bkz. dosya başı, ikinci kilit */
  duties: string[];
  requirements: string[];
  /** YYYY-MM-DD */
  postedAt: string;
  /**
   * ZORUNLU — başvurunun gideceği gerçek yer (mailto: ya da bir sayfa adresi).
   * Bu alan olmadan ilan yazılamıyor; "başvur" düğmesi hiçbir zaman boşa
   * düşmüyor.
   */
  applyHref: string;
};

/* SWAP:CAREER_OPENINGS — bkz. dosya başı. Bilerek boş. */
export const OPENINGS: Opening[] = [];

/** Yeniden eskiye. Liste boşken de çalışıyor. */
export function sortedOpenings(): Opening[] {
  return [...OPENINGS].sort((a, b) => b.postedAt.localeCompare(a.postedAt));
}

/* ------------------------------------------------------------- BOŞ DURUM
   Metin veri dosyasında, sayfada değil: bu satırlar firmanın işe alım
   duruşunu anlatıyor ve onaylanması gereken bir METİN (aynı kalıp
   lib/about.ts ve lib/press.ts'te). */
export const CAREERS_EMPTY = {
  title: "Şu an açık pozisyonumuz yok.",
  line: "İlan yayımlamadığımız dönemde bu sayfa boş duruyor; doldurmak için olmayan bir pozisyon yazmıyoruz. Yine de başvurunuzu bırakabilirsiniz — bir pozisyon açıldığında elimizdeki başvurulara ilk biz bakıyoruz.",
};

/* ------------------------------------------------------- AÇIK BAŞVURU
   Pozisyon yokken de gerçekten çalışan tek yol. Sitede bugün BAŞVURUYA
   AYRILMIŞ bir e-posta adresi yok (SWAP:CAREER_INBOX), o yüzden burada bir
   adres uydurmak yerine ziyaretçi sitenin gerçek kapısına gönderiliyor.

   Yazılmayanlar, tek tek ve bilerek: yanıt süresi, "başvurunuz X ay saklanır"
   taahhüdü, işe alım adımları ve bir muhatap adı. Dördünün de firmada bugün
   karşılığı yok; söz vermek, sözü tutacak yapıyı kurmadan önce gelirdi. */
export const OPEN_APPLICATION = {
  title: "Açık başvuru",
  line: "Uygun bir pozisyon açıldığında haberdar olmak için özgeçmişinizi ve hangi alanda çalışmak istediğinizi bize iletin. Başvuruyu iletişim sayfasındaki kanallardan alıyoruz; kariyer için ayrı bir adres yayımlamıyoruz.",
  /* SWAP:CAREER_INBOX — başvuruya ayrılmış e-posta. Dolduğunda bu satır
     doğrudan bir mailto: bağlantısına dönecek; sayfa değişmeyecek. */
  inbox: "",
  cta: { label: "İletişim sayfası", href: "/iletisim" },
};

/** Kariyer kutusu doldu mu? Boşken sayfa iletişim sayfasına yönlendiriyor. */
export const hasCareerInbox = (): boolean => OPEN_APPLICATION.inbox.trim() !== "";
