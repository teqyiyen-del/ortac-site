"use client";

import {
  ArrowLeftRight,
  ArrowRight,
  Building2,
  Check,
  ClipboardCheck,
  Coins,
  CreditCard,
  IdCard,
  Info,
  Landmark,
  ListChecks,
  Percent,
  Receipt,
  Timer,
  Users,
  Wallet,
  X,
  type LucideIcon,
} from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import SmartLink from "@/components/shared/SmartLink";
import { Flag } from "@/components/shared/CountryPicker";
import { BrandGlyph } from "@/components/shared/BrandMark";
import { brandKeyForName, type BrandKey } from "@/lib/brands";
import {
  COUNTRY_NAME,
  COUNTRY_SERVICES,
  FACTS,
  PAY_MATRIX,
  type CountrySlug,
  type MatrixGroup,
} from "@/lib/brand";
import { COUNTRY_CONTENT } from "@/lib/countryContent";
import { serviceFor } from "@/lib/services";
import { COUNTRY_PHOTO } from "@/lib/media";
import { useOrtacStore } from "@/lib/store";

/* ============================================================================
   /ulkeler — ÜÇ ÜLKENİN AYRINTILI KIYASI
   ve aynı zamanda: SİTEDEKİ ÜLKE KIYASININ TEK VERİ KAYNAĞI

   NE DEĞİŞTİ VE NEDEN

   Bir tur önce derinlik terstiydi: ana sayfada "yan yana kıyas" düğmesine
   basınca on üç satırlık, üç para grubunu ve bütün kanalları sayan bir matris
   açılıyordu; bu sayfada ise elle yazılmış altı satırlık ("$$$", "Kolay",
   "Zor") bir özet duruyordu. Müşterinin teşhisi: ana sayfa bir vitrin, burası
   ise kıyasın KENDİ sayfası — detay yanlış yerde.

   Bu turda ikisi yer değiştirdi. Ayrıntılı matris buraya geldi ve buraya ait
   olduğu için genişledi; ana sayfada yalnızca kararı en çok değiştiren dört
   ölçüt kaldı ve oradan buraya çıkan bir bağlantı var.

   ELLE YAZILMIŞ HÜCRELER SİLİNDİ. Eski ROWS dizisi veriyle bağlantısı olmayan
   değerler taşıyordu: "$$$/$/$$" maliyet sıralamasını ikinci kez kodluyordu,
   "Banka hesabı: Kolay / Zor / Orta" hiçbir yerde doğrulanmamış bir yargıydı,
   "%0*" ise Dubai'nin vergi çerçevesini tek yıldıza indiriyordu. Hepsi gitti;
   yerlerine aynı bilgiyi VERİDEN okuyan satırlar geldi (aşağıya bakın).

   ---------------------------------------------------------------- TEK KAYNAK

   Ana sayfadaki özet kıyas ile buradaki ayrıntılı kıyas aynı gerçeği
   göstermek zorunda. Bunu garanti etmenin tek yolu satırları İKİ dosyada
   tanımlamamak: ortak olan satırlar (maliyet, süre, yapı, kim için, oturum,
   kurumlar vergisi, banka başvurusu) aşağıda bir kez yazılıyor ve ana sayfa
   AYNI NESNELERİ `HOME_CMP_ROWS` üzerinden alıyor. Yani bir hücrenin biçimi
   ya da kaynağı değişince iki yer birden değişiyor; ayrışmaları mümkün değil.

   Bu yüzden aşağıda hiçbir satır CMP_GROUPS'un İÇİNDE anonim nesne olarak
   yazılmıyor artık: paylaşılabilmesi için satırın bir adı olması gerekiyor.
   Yalnızca bu sayfada kalan ikisi (verdiğimiz hizmetler, dürüst kısıt) yerinde
   duruyor — paylaşılmayan bir satıra isim vermek, bir sonraki kişiye "bu da
   ana sayfada var" dedirtirdi.

   Kıyas ilkelleri (Chips, Channel, channels, parts, worksIn …) de burada
   yaşıyor ve ana sayfanın hem tablosu hem açılan paneli bunları çağırıyor.
   Neden bu dosya: kıyas artık bu sayfanın işi, home/ThreeCountries onun
   özetini gösteren taraf. Ters yönde bağlamak /ulkeler'i bir ana sayfa
   bölümüne bağımlı kılardı.

   Sayılar hâlâ hiçbir yerde elle yazılmıyor; hepsi lib'den:
     · FACTS, PAY_MATRIX, COUNTRY_SERVICES  → lib/brand.ts
     · tax.rows (kurumlar vergisi, KDV)      → lib/countryContent.ts
     · banka başvurusunun tipik hâli         → lib/services.ts
   Bu üç kaynakta karşılığı olmayan hiçbir satır eklenmedi.

   ---------------------------------------------------------------- CSS ÖNEKİ

   Tablonun kendisi .uk3- kurallarını kullanıyor (src/app/css/countries.css) —
   evet, o önek "ana sayfa, üçüncü kuşak ülke bölümü" demek. Kopyalanmadı ve
   bu bilerek: iki tablo tek bir tablo tasarımının iki derinliği ve ayrı bir
   önek açmak, bir gün birinin kenarlığı değişince ötekinin geride kalması
   demekti. Yalnızca bu sayfaya özgü olan şeyler (fotoğraflı sütun başlığı,
   seçili sütunun boyanması, satır grubu başlıkları) .ctry- önekiyle ve aynı
   dosyada yazıldı.

   ------------------------------------------------------------------ MAĞAZA

   Sütun başlıkları zustand'ı sürmeye DEVAM EDİYOR (useOrtacStore.setCountry).
   Bu bağ sayfanın kendisinden büyük: seçim istemcide kalıyor ve ziyaretçi
   fiyat hesaplayıcıya ya da /basla'ya geçtiğinde aynı ülke seçili geliyor.
   Eski sürümde başlıklar role="columnheader" taşıyan div'lerdi; artık gerçek
   <th scope="col"> içinde gerçek bir düğme (aria-pressed) — klavyeyle
   çalışıyor ve durumunu duyuruyor.
   ========================================================================= */

/* Sütun sırası ana sayfadakiyle BİREBİR aynı ve oradan değil buradan geliyor.
   Sıra coğrafi değil editoryal: Dubai firmanın ana ürünü ve üç sütunlu bir
   dizide gözün ilk gittiği yer orta sütun. İki ekranda aynı üç ülkeyi aynı
   yerde bulmak zorunda olan kişi, ana sayfadan buraya gelen ziyaretçi. */
export const ORDER: CountrySlug[] = ["ingiltere", "dubai", "kktc"];

/* --------------------------------------------------------- veriyi okumak --- */

/* İki alan da veride zaten AYRILMIŞ liste: forWhom virgülle, structure orta
   noktayla. Ayırıcılar tek yerde çünkü ileride biri değişirse bölme kuralının
   tek satırda düzelmesi gerekiyor. filter(Boolean) sondaki olası boş parçayı
   atıyor — veri elle yazılıyor, "Limited · " gibi bir satır bir gün girebilir. */
export function parts(v: string): string[] {
  return v
    .split(/[·,]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function payGroup(title: string): MatrixGroup | undefined {
  return PAY_MATRIX.find((g) => g.title === title);
}

/** bir grupta o ülkede gerçekten çalışan kanalların adları */
export function worksIn(title: string, c: CountrySlug): string[] {
  return (
    payGroup(title)
      ?.rows.filter((r) => r.cells[c] === "yes")
      .map((r) => r.name) ?? []
  );
}

/** aynı grupta sağlayıcının o ülkeyi AÇIKÇA desteklemediği kanallar */
function failsIn(title: string, c: CountrySlug): string[] {
  return (
    payGroup(title)
      ?.rows.filter((r) => r.cells[c] === "no")
      .map((r) => r.name) ?? []
  );
}

/** "a, b ve c" — cümlenin içinde kanal adı sayarken virgül listesi kaba kalıyor */
export function trList(xs: string[]) {
  if (xs.length < 2) return xs[0] ?? "";
  return `${xs.slice(0, -1).join(", ")} ve ${xs[xs.length - 1]}`;
}

/* Oturum/vize COUNTRY_SERVICES'ten türüyor: bir ülkenin hizmet listesinde
   "oturum-vize" varsa o ülkede bu iş yapılıyor demektir. Bugün yalnızca
   Dubai'de var ve bu, ana sayfada Dubai'nin başlığı olan "Oturum vizesi
   çıkabilen tek ülke" ifadesiyle aynı kaynaktan çıkıyor — iki ekran
   çelişemez. */
export const hasVisa = (c: CountrySlug) =>
  COUNTRY_SERVICES[c].some((s) => s.key === "oturum-vize");

/* Grup başlığına göre ikon; eşleşmezse Wallet'a düşüyor — başlık bir gün
   değişirse tablo çökmüyor, yalnızca ikonu genelleşiyor.

   "Ödeme kuruluşu" için Wallet DEĞİL ArrowLeftRight: Wallet ana sayfada
   İngiltere'nin maliyet satırında duruyor ve aynı ikonun iki ayrı anlama
   gelmesi ikon dilini kırar. Transfer oku hem Wise'ın hem Payoneer'ın
   gerçekten yaptığı işi söylüyor. */
export const GROUP_ICON: Record<string, LucideIcon> = {
  "Banka hesabı": Landmark,
  "Ödeme kuruluşu": ArrowLeftRight,
  Tahsilat: CreditCard,
};

export type Chan = { name: string; brand: BrandKey | null; on: boolean };

/* Bir grubun bir ülkedeki kanalları. Ana sayfadaki açılan panelin de buradaki
   tablonun da tek kaynağı bu — iki ekran aynı çarpıları göstermek zorunda.

   "none" satırları düşüyor, "no" satırları KALIYOR. İkisi farklı şeyler:
   "none" o ülkede konusu bile olmayan kanal (BAE bankası İngiltere'de — kimse
   beklemiyor, satır olarak durursa gürültü), "no" ise sağlayıcının o ülkeyi
   açıkça desteklemediği kanal. İkincisi kıyasın en keskin bilgisi; KKTC'nin
   dört çarpısı buradan geliyor ve gizlenmiyor. */
export function channels(g: MatrixGroup, c: CountrySlug): Chan[] {
  return g.rows
    .filter((r) => r.cells[c] !== "none")
    .map((r) => ({
      name: r.name,
      /* Marka anahtarı addan türüyor: PAY_MATRIX satırları markayı anahtarla
         değil görünen adıyla taşıyor. Karşılığı olmayan ad (ör. "Yerel banka")
         null dönüyor, o satır lucide ikonuyla çıkıyor. */
      brand: brandKeyForName(r.name),
      on: r.cells[c] === "yes",
    }));
}

/* ------------------------------------------------------- ortak parçacıklar - */

/** veride zaten liste olan şey ekranda da liste — panelde ve iki tabloda aynı */
export function Chips({ items }: { items: string[] }) {
  return (
    <ul className="uk3-chips">
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}

/** tek kanal satırı: işaret + ad + durum */
export function Channel({ ch }: { ch: Chan }) {
  /* data-v yalnızca yerel biçim için değil: globals.css'te [data-v="no"] > .bm-g
     kuralı çalışmayan kanalın logosunu griye düşürüyor. Renkli bir Stripe
     logosu, yanındaki çarpıya rağmen "çalışıyor" diye okunuyor. Kuralın
     çalışması için işaretin data-v taşıyan elemanın DOĞRUDAN çocuğu olması
     gerekiyor — aradaki her sarmalayıcı kuralı sessizce iptal ederdi. */
  return (
    <li className="uk3-ch" data-v={ch.on ? "yes" : "no"}>
      {ch.brand ? (
        <BrandGlyph brand={ch.brand} size={16} />
      ) : (
        /* Resmî işareti olmayan tek kalem "Yerel banka". Soyut bir madde imi
           yerine ne olduğunu söyleyen ikon: bu bir banka. */
        <Landmark className="bm-g" size={16} strokeWidth={1.8} aria-hidden="true" />
      )}
      <span className="uk3-ch-n">{ch.name}</span>
      {/* Durum ikonu tek başına bilgi taşımıyor: ekran okuyucu için kelime de
          yazılı. Renk yalnızca hızlandırıyor. */}
      {ch.on ? (
        <Check className="uk3-ch-s" size={15} strokeWidth={2.6} aria-hidden="true" />
      ) : (
        <X className="uk3-ch-s" size={15} strokeWidth={2.6} aria-hidden="true" />
      )}
      <span className="sr-only">{ch.on ? "çalışıyor" : "desteklenmiyor"}</span>
    </li>
  );
}

/** değer + altında veriden gelen kendi dipnotu (vergi satırları, dürüst kısıt) */
function Fact({ v, note }: { v: string; note?: string }) {
  return (
    <span className="ctry-fact">
      <b>{v}</b>
      {note ? <em>{note}</em> : null}
    </span>
  );
}

/** var/yok hücresi — kanal satırlarıyla aynı renk dili: yeşil tik, kırmızı çarpı */
function YesNo({ on, yes, no }: { on: boolean; yes: string; no: string }) {
  return (
    <span className="uk3-td-s" data-v={on ? "yes" : "no"}>
      {on ? (
        <Check size={15} strokeWidth={2.6} aria-hidden="true" />
      ) : (
        <X size={15} strokeWidth={2.6} aria-hidden="true" />
      )}
      {on ? yes : no}
    </span>
  );
}

function ChanCell({ g, c }: { g: MatrixGroup; c: CountrySlug }) {
  const items = channels(g, c);
  if (!items.length) {
    /* Bugün hiçbir ülkede bu duruma düşülmüyor; veri değişirse hücre boş
       kalmasın diye duruyor. */
    return <p className="uk3-empty">Bu ülkede sunulmuyor</p>;
  }
  return (
    <ul className="uk3-list">
      {items.map((ch) => (
        <Channel key={ch.name} ch={ch} />
      ))}
    </ul>
  );
}

/* ============================================================ SATIR KAYITLARI */

export type CmpRow = {
  k: string;
  /** başlığın altındaki küçük satır; sınırı ya da tanımı söylüyor */
  hint?: string;
  i: LucideIcon;
  cell: (c: CountrySlug) => React.ReactNode;
};

export type CmpGroup = { title: string; rows: CmpRow[] };

/* --------------------------------- ana sayfayla PAYLAŞILAN üç satır -------- */
/* Bu üç nesne hem aşağıdaki ayrıntılı tabloya hem de HOME_CMP_ROWS'a giriyor.
   Aynı fonksiyon iki yerde basıldığı için ana sayfa ile bu sayfa aynı hücreyi
   farklı gösteremez. */

/* TUTAR VE "TUTAR FİYAT BÖLÜMÜNDE" SÖZLEŞMESİ
   Ana sayfanın kapalı hâli rakam basmıyor, üç ülkenin maliyetini "en düşük /
   orta / en yüksek" diye sıralıyor. Kıyas bu sözleşmeyi bilerek esnetiyor:
   üç sayıyı yan yana koymayı vaat edip en çok kıyaslanan sayıyı sıfat olarak
   yazmak, ziyaretçiyi tabloya bakıp cevabı bulamamış durumda bırakır.
   Yeni bir rakam ÜRETİLMİYOR: FACTS[c].fromLabel zaten fiyat bölümünde ve
   Nav'ın mega menüsünde basılıyor. */
const R_COST: CmpRow = {
  k: "Kuruluş maliyeti",
  hint: "Tutarlar temsilî",
  i: Coins,
  cell: (c) => (
    <span className="uk3-td-v">
      {FACTS[c].fromLabel}
      <em>&apos;dan başlar</em>
    </span>
  ),
};

const R_DAYS: CmpRow = {
  /* "Tipik" kelimesi zorunlu, süsleme değil: STANCE_LIMITS kesin süre
     taahhüdünü açıkça yasaklıyor ve bir tabloda yan yana duran üç gün
     aralığı, etiketi olmadan taahhüt gibi okunur. */
  k: "Tipik süre",
  hint: "Kesin süre taahhüdü yok",
  i: Timer,
  cell: (c) => <span className="uk3-td-v">{FACTS[c].days}</span>,
};

/* Yapı ve "kim için": ikisi de veride zaten AYRILMIŞ liste, ikisi de kutucuk
   olarak basılıyor (parts + Chips).

   İKİSİ DE ANA SAYFAYA GERİ GİRDİ ve bu, bir tur önceki kararın tersi.
   O turda "açılan panelde zaten duruyor" diye çıkarılmışlardı. Doğru olmayan
   yanı şu: panelde bir seferde TEK ülkenin kutucukları görünüyor — üçünü
   karşılaştırmak için üç kez tıklayıp aradaki farkı akılda tutmak gerekiyor.
   Kıyas görünümünün varlık sebebi tam olarak bunu gerektirmemek. Yani aynı veri
   iki yerde değil, iki ÇÖZÜNÜRLÜKTE: panelde bir ülkenin künyesi, tabloda üç
   ülkenin farkı. Nesne tek olduğu için ikisi çelişemiyor. */
const R_STRUCT: CmpRow = {
  k: "Yapı",
  i: Building2,
  cell: (c) => <Chips items={parts(FACTS[c].structure)} />,
};

const R_WHO: CmpRow = {
  k: "Kim için",
  i: Users,
  cell: (c) => <Chips items={parts(FACTS[c].forWhom)} />,
};

/* Hücre metinleri uydurma değil: ana sayfadaki SSS'in "Şirket kurmak oturum
   hakkı veriyor mu?" cevabı (home/HomeFaq.tsx) tam olarak bunu söylüyor. */
const R_VISA: CmpRow = {
  k: "Oturum / vize",
  i: IdCard,
  cell: (c) => (
    <YesNo
      on={hasVisa(c)}
      yes="Şirket üzerinden oturum vizesi"
      no="Şirket kurmak oturum vermiyor"
    />
  ),
};

/* ------------------------------- yalnızca ANA SAYFA'da olan özet satır ----- */
/* Ayrıntılı tabloda tahsilat kanalları tek tek ve işaretleriyle duruyor
   (aşağıdaki PAY_MATRIX satırı). Ana sayfada aynı gerçeğin tek satırlık
   çözünürlüğü var: kart tahsilatı bu ülkede çalışıyor mu, hangi kanallarla.
   Kaynak yine PAY_MATRIX — iki çözünürlük, tek veri. */
const R_CARDS: CmpRow = {
  k: "Kart tahsilatı",
  hint: "Kartla ve platform üzerinden",
  i: CreditCard,
  cell: (c) => {
    const on = worksIn("Tahsilat", c);
    return (
      <YesNo
        on={on.length > 0}
        yes={`${trList(on)} çalışıyor`}
        no={`${trList(failsIn("Tahsilat", c))} desteklemiyor`}
      />
    );
  },
};

/* --------------------------------- yalnızca BU SAYFADA olan satırlar ------- */

/* Vergi satırları countryContent'ten, etikete göre eşleşerek. Üç ülkenin de
   tax.rows dizisinde "Kurumlar vergisi" ve "KDV" var; başka hiçbir etiket
   üçünde birden bulunmuyor, o yüzden kıyas tablosuna yalnızca bu ikisi
   giriyor. Eşleşme bulunamazsa hücre "—" oluyor: veri değişirse tablo
   çökmüyor, yalnızca o hücre boşalıyor.

   SWAP: üçünde birden karşılığı olan üçüncü bir vergi satırı (ör. beyan
   takvimi) veriye eklenirse buraya bir satır daha girebilir.

   "SWAP:" İLE BAŞLAYAN DİPNOT BASILMIYOR. countryContent'te bazı notlar
   ziyaretçiye değil bize yazılmış: İngiltere'nin kurumlar vergisi notu
   "SWAP: güncel oran ve marjinal indirim eşiği kuruluş öncesi teyit edilir."
   diyor — bu bir yapılacak işareti, bir bilgi değil. Veri dosyasına
   dokunmadan burada eleniyor; işaret kaldırılırsa cümle kendiliğinden
   görünür olur. Not: aynı dizi ülke sayfalarındaki vergi bloğunda da
   basılıyor (CountryTax) ve orası bu elemeyi YAPMIYOR — kaynağın kendisi
   düzeltilmeli. */
const internal = (s?: string) => !!s && s.trimStart().startsWith("SWAP:");

function taxRow(label: string, i: LucideIcon): CmpRow {
  return {
    k: label,
    i,
    cell: (c) => {
      const r = COUNTRY_CONTENT[c].tax.rows.find((x) => x.label === label);
      if (!r) return <span className="uk3-empty">—</span>;
      return <Fact v={r.value} note={internal(r.note) ? undefined : r.note} />;
    },
  };
}

/* İki vergi satırı da artık isimli sabit: kurumlar vergisi ana sayfaya da
   giriyor, KDV girmiyor (gerekçe HOME_CMP_ROWS'ta) ve iki tablonun aynı
   nesneyi basması gerekiyor. taxRow her çağrıldığında YENİ bir nesne üretir;
   ana sayfa için ikinci kez çağırmak, satırı ikinci kez tanımlamakla aynı
   şey olurdu. */
const R_TAX_CORP = taxRow("Kurumlar vergisi", Percent);
const R_TAX_VAT = taxRow("KDV", Receipt);

/* Banka başvurusunun bu ülkedeki bilinen hâli. services.ts'te banka
   hizmetinin `duration` alanı zaten tam olarak bunu taşıyor ("Onay oranı
   düşük, süre değişken" gibi) ve orada da ülkeye göre yazılmış. İkinci kez
   yazmıyoruz, okuyoruz. */
const R_BANK_APPLY: CmpRow = {
  k: "Banka başvurusu",
  hint: "Hesabı banka açar; onay taahhüdü vermiyoruz",
  i: ClipboardCheck,
  cell: (c) => <Fact v={serviceFor(c, "banka-hesabi")?.duration ?? "—"} />,
};

/* ------------------------------------------------ ANA SAYFANIN ALT KÜMESİ -- */
/* SEKİZ SATIR ve hepsi yukarıda bir kez tanımlanmış nesnelerin TA KENDİSİ —
   burada yeni satır yazılmıyor, aşağıdaki tablodan seçim yapılıyor. Diziyi
   burada, satır kayıtlarının hepsi tanımlandıktan SONRA kuruyoruz; yukarıda
   dursaydı vergi ve banka satırlarına daha doğmadan başvurmuş olurdu.

   Sıra, aşağıdaki ayrıntılı tablonun sırasının aynısı (kuruluş kararı →
   vergi → para). Ana sayfadan "ölçüt ölçüt kıyaslayın" diye tıklayan kişi
   aynı satırları aynı düzende bulmalı; farklı sıralarsak geçiş bir derinleşme
   değil, yeni bir tablo öğrenmek olur.

   NEDEN BU DÖRDÜ EKLENDİ (dört satır → sekiz)
   Ölçüt tek: hangi ölçüt kararı gerçekten çeviriyor.
     · Kim için  — ilk elemek: "bu ülke benim gibi biri için mi". Tutara
       bakmadan önce sorulan soru.
     · Yapı      — ne aldığınız. Bu satır olmadan üç maliyet birbirinin
       karşılığı değil; serbest bölge şirketi ile Limited aynı şey değil.
     · Kurumlar vergisi — kuruluş maliyeti bir kerelik, vergi her yıl. En çok
       sorulan kıyas kalemi ve verisi countryContent'te hazır duruyor.
     · Banka başvurusu  — kuruluşun en sık takıldığı yer, ve satırın kendi
       açıklaması firmanın duruşunu taşıyor ("onay taahhüdü vermiyoruz").
       Kart tahsilatı satırının hemen üstünde: para tarafı iki satırda
       tamamlanıyor — hesap açılıyor mu, para giriyor mu.

   NEDEN ÖTEKİLER ALINMADI — hepsi aşağıdaki tabloda duruyor:
     · KDV — kurumlar vergisinin yanında ikincil. Sekiz satırlık bir özete iki
       vergi satırı koymak, özeti vergi tablosuna çevirirdi.
     · Verdiğimiz hizmetler — ülke başına beş-yedi kutucuk; üç sütunda bir
       hizmet kataloğu oluyor. Ana sayfada zaten kendi bölümü var
       (home/HomeServices), bu tablonun hemen altında.
     · Dürüst kısıt — ana sayfadan bir tur önce müşterinin isteğiyle çıktı
       ("aşırı dikkat çekiyor"). Aynı turda geri koymak o kararı geri almak
       olurdu. Bilgi kaybolmuyor: bu sayfada kendi satırı var ve her ülke
       sayfasının hero'sunda PageHero basıyor.
     · Para gruplarının kanal matrisi — bu turun bütün amacı o matrisi ana
       sayfadan buraya taşımaktı; ana sayfada tek satırlık özeti (R_CARDS)
       zaten var. */
export const HOME_CMP_ROWS: CmpRow[] = [
  R_COST,
  R_DAYS,
  R_STRUCT,
  R_WHO,
  R_VISA,
  R_TAX_CORP,
  R_BANK_APPLY,
  R_CARDS,
];

/* Üç para grubu, PAY_MATRIX'te olduğu gibi ve aynı sırayla; banka başvurusu
   satırı da konusunun hemen ardında duruyor. */
const PARA_ROWS: CmpRow[] = PAY_MATRIX.flatMap<CmpRow>((g) => {
  const row: CmpRow = {
    k: g.title,
    /* Grubun kendi açıklaması veriden geliyor: "Banka değil; farklı lisans ve
       koruma rejimi" uyarısı bu yüzden ayrı bir dipnot bloğu istemiyor —
       uyardığı satırın, yani Wise ile Payoneer'ın tam üstünde duruyor. */
    hint: g.hint,
    i: GROUP_ICON[g.title] ?? Wallet,
    cell: (c) => <ChanCell g={g} c={c} />,
  };
  return g.title === "Banka hesabı" ? [row, R_BANK_APPLY] : [row];
});

/* Grup başlığından çapa slug'ı. Türkçe harfler ASCII'ye iniyor, çünkü çapa
   adres çubuğunda görünüyor ve yüzde kodlanmış bir "ödeme" kimseye bir şey
   anlatmıyor. Elle yazılmıyor ki başlık değişince çapa da kendiliğinden
   değişsin — kırık bir çapa, olmayan bir çapadan daha kötü. */
const TR_ASCII: Record<string, string> = {
  ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u", İ: "i",
};
export function groupAnchor(title: string): string {
  return title
    .toLocaleLowerCase("tr")
    .replace(/[çğıöşüİ]/g, (ch) => TR_ASCII[ch] ?? ch)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/* Tablonun tamamı. Gruplar okunabilirlik için: on üç satır tek blokta akarsa
   ziyaretçi nerede olduğunu kaybediyor, üç başlık tabloyu üç soruya bölüyor. */
export const CMP_GROUPS: CmpGroup[] = [
  {
    title: "Kuruluş kararı",
    rows: [
      R_COST,
      R_DAYS,
      R_STRUCT,
      R_WHO,
      R_VISA,
      {
        /* Hangi hizmeti hangi ülkede gerçekten yürüttüğümüz. Liste
           COUNTRY_SERVICES'in kendisi — menüdeki ülke panelini besleyen dizi.
           Oturum & Vize yalnızca Dubai'de, Sponsor Licence yalnızca
           İngiltere'de, Serbest Bölge yalnızca KKTC'de: farkı liste
           kendiliğinden söylüyor. */
        k: "Verdiğimiz hizmetler",
        i: ListChecks,
        cell: (c) => <Chips items={COUNTRY_SERVICES[c].map((s) => s.label)} />,
      },
      {
        /* DÜRÜST KISIT. Ana sayfadan kaldırılmıştı — orada üç ülkenin altında
           üç amber uyarı olarak tekrarlanınca bilgi olmaktan çıkıp desene
           dönüşüyordu (bkz. home/ThreeCountries.tsx · DÜZELTME 1). Kıyas
           tablosunda durum tersi: satır tam olarak "bu ülkede takıldığınız
           yer neresi" sorusunun cevabı ve üç ülkede yan yana okunması
           gerekiyor. Amber yok, tablodaki her satır gibi duruyor. */
        k: "Dürüst kısıt",
        i: Info,
        cell: (c) => <Fact v={FACTS[c].limit} />,
      },
    ],
  },
  {
    title: "Vergi çerçevesi",
    rows: [R_TAX_CORP, R_TAX_VAT],
  },
  { title: "Para ve tahsilat", rows: PARA_ROWS },
];

/* ==================================================================== UI === */

export default function Countries() {
  const country = useOrtacStore((s) => s.country);
  const setCountry = useOrtacStore((s) => s.setCountry);

  return (
    <section id="ulkeler" className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="sec-head">
          <SplitWords
            as="h2"
            text="Üç ülke, ölçüt ölçüt."
            accent="ölçüt ölçüt."
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.2}>
            <p className="sec-lead">
              Kuruluş, vergi çerçevesi ve para tarafı tek tabloda. Sütun seçin;
              seçtiğiniz ülke işaretli kalır ve hesaplayıcıya da o ülkeyle geçersiniz.
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.26} y={32} duration={0.8} className="ctry-wrap">
          {/* IZGARA DEĞİL GERÇEK <table>, ve bu bilinçli bir tercih.

              Gösterilen şey tanımı gereği iki eksenli: satır bir ölçüt, sütun
              bir ülke, hücre ikisinin kesişimi. Izgarayla da aynı görüntü
              çıkardı ama ekran okuyucu "Tahsilat, İngiltere: Stripe çalışıyor"
              diyemezdi. <th scope="col"> / <th scope="row"> bu ilişkiyi
              tarayıcıya söylüyor; tablo gezinme kısayolları ancak o zaman
              çalışıyor. Sayfanın eski sürümü role="table" taşıyan div'lerden
              kuruluydu — görsel olarak tabloydu, semantik olarak değil.

              Kaydırma kutusu klavyeyle de gezilebilsin diye odaklanabilir ve
              kendi adı olan bir bölge: fare olmayan bir kullanıcı dar ekranda
              tabloyu yatay kaydırmak için başka bir yol bulamazdı. Kutu
              overscroll-behavior ile kendi içinde kalıyor, yani tablo bitince
              sayfa yana kaymıyor. */}
          <div
            className="uk3-tblwrap"
            tabIndex={0}
            role="region"
            aria-label="Üç ülkenin ayrıntılı karşılaştırma tablosu, yatay kaydırılabilir"
          >
            {/* Tablonun kendisi .uk3-tbl: ana sayfadaki özet kıyasla aynı
                biçim, yalnızca daha derin. Bu sayfaya özgü olan şeylerin
                (fotoğraflı başlık, seçili sütun, grup satırları) kendi
                sınıfları var; tabloya ayrıca bir kanca sınıfı takmıyoruz —
                kullanılmayan bir sınıf adı, bir sonraki kişiye "burada bir
                kural var" dedirtir. */}
            <table className="uk3-tbl">
              <caption className="sr-only">
                Dubai, İngiltere ve KKTC üç başlıkta yan yana: kuruluş kararı,
                vergi çerçevesi, para ve tahsilat. Sütun başlıkları birer
                düğmedir; seçtiğiniz ülke tabloda işaretlenir.
              </caption>

              {/* Sütun başlığı fotoğrafın kendisi — sayfanın bir tur önceki
                  hâlinden kalan ve korunan tek şey bu. Fotoğraf burada süs
                  değil işaret: üç sütunu birbirinden ayıran en hızlı ipucu ve
                  seçili olanı tek bakışta gösteren yüzey. Düğme olması ise
                  mağaza bağının kendisi. */}
              <thead>
                <tr>
                  <th scope="col" className="uk3-tbl-corner">
                    Ölçüt
                  </th>
                  {ORDER.map((c) => {
                    const on = country === c;
                    return (
                      <th key={c} scope="col" className="ctry-th">
                        <button
                          type="button"
                          className="ctry-head"
                          data-on={on}
                          aria-pressed={on}
                          onClick={() => setCountry(c)}
                        >
                          <span
                            className="ctry-photo"
                            aria-hidden="true"
                            style={{ backgroundImage: `url(${COUNTRY_PHOTO[c]})` }}
                          />
                          <span className="ctry-scrim" aria-hidden="true" />
                          <span className="ctry-head-body">
                            <span className="uk3-tflag ctry-flag" aria-hidden="true">
                              <Flag country={c} />
                            </span>
                            <span className="ctry-name">{COUNTRY_NAME[c]}</span>
                            {/* İki kelimelik künye, veriden: FACTS[c].tag */}
                            <span className="ctry-sub">{FACTS[c].tag}</span>
                          </span>
                        </button>
                      </th>
                    );
                  })}
                </tr>
              </thead>

              {/* Her grup kendi <tbody>'si ve başında scope="rowgroup" taşıyan
                  bir başlık satırı var: ekran okuyucu grubu bir bütün olarak
                  duyuruyor, gözle okuyan da tablonun neresinde olduğunu
                  biliyor. Başlığın metni yatay kaydırmada yerinde kalıyor
                  (CSS: sticky iç span) — yoksa üçüncü sütuna geldiğinizde
                  grubun adı ekrandan çıkardı. */}
              {CMP_GROUPS.map((g) => (
                /* Grup başlığı çapa taşıyor: menüdeki "Ödeme altyapısı matrisi"
                   girdisi doğrudan o gruba iniyor. Matris bu turda ana sayfadan
                   buraya taşındı ve menü girdisi belirli bir şeyi vaat ediyor —
                   sayfanın tepesine düşmesi o vaadi yarım bırakırdı.
                   Çapa slug'ı elle yazılmıyor, başlıktan türüyor. */
                <tbody key={g.title} id={groupAnchor(g.title)}>
                  <tr>
                    <th scope="rowgroup" colSpan={1 + ORDER.length} className="ctry-grouph">
                      <span>{g.title}</span>
                    </th>
                  </tr>

                  {g.rows.map((row) => {
                    const Icon = row.i;
                    return (
                      <tr key={row.k}>
                        <th scope="row" className="uk3-rowh">
                          <span className="uk3-rowh-t">
                            <Icon size={15} strokeWidth={1.9} aria-hidden="true" />
                            {row.k}
                          </span>
                          {row.hint ? <span className="uk3-rowh-h">{row.hint}</span> : null}
                        </th>
                        {ORDER.map((c) => (
                          <td key={c} className="uk3-td" data-on={country === c}>
                            {row.cell(c)}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              ))}

              {/* Kıyasın çıkışı: her sütunun kendi altında. Kapalı ülkeler
                  sönük çıkıyor (SmartLink) — kıyas dolaşım kararını delmiyor. */}
              <tfoot>
                <tr>
                  <td className="uk3-td uk3-tbl-corner" />
                  {ORDER.map((c) => (
                    <td key={c} className="uk3-td" data-on={country === c}>
                      <SmartLink href={`/${c}`} className="btn btn-line btn-sm uk3-tcta">
                        {COUNTRY_NAME[c]} sayfası
                        <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                      </SmartLink>
                    </td>
                  ))}
                </tr>
              </tfoot>
            </table>
          </div>
        </FadeUp>

        {/* Tablonun tek dipnotu. Üç şey için var ve üçü de bu tablonun kendi
            getirdiği bilgi türleri: tutar, süre ve vergi. Son cümle firmanın
            resmî duruşu (lib/brand.ts · STANCE_LIMITS) — vergi satırları
            eklendiği için burada tekrar ediliyor. */}
        <div className="uk3-foot">
          <p className="uk3-note">
            Tutarlar temsilîdir, süreler tipik aralıktır. Kesin tutar ve takvim
            dosyaya göre netleşir. Vergi satırları genel çerçevedir; kişiye özel
            vergi görüşü siteden verilmiyor.
          </p>
        </div>
      </div>
    </section>
  );
}
