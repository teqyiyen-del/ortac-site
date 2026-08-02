"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { AnimatePresence, animate, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Building2,
  ChevronDown,
  Columns3,
  CreditCard,
  IdCard,
  Languages,
  MapPin,
  MonitorSmartphone,
  Table2,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import SmartLink from "@/components/shared/SmartLink";
import { Flag } from "@/components/shared/CountryPicker";
import {
  Chips,
  Channel,
  GROUP_ICON,
  HOME_CMP_ROWS,
  ORDER,
  channels,
  parts,
  trList,
  worksIn,
  type Chan,
} from "@/components/Countries";
import {
  COUNTRY_NAME,
  COUNTRY_ORDER,
  FACTS,
  PAY_MATRIX,
  type CountrySlug,
} from "@/lib/brand";
import { COUNTRY_PHOTO } from "@/lib/media";
import { useOrtacStore } from "@/lib/store";

/* ============================================================================
   §3 — ÜLKE KARARI · "yay + yerinde açılan panel" + "yan yana kıyas"

   NEREDEN GELDİ

   Bu bölüm /lab/ulkeler'de yarışan on iki adaydan C11'in canlıya alınmış hâli.
   Önceki canlı sürüm (uk2-) üç fotoğraflı sütun + "yan yana kıyas" tablosu
   ikilisiydi; müşteri C11'i seçti. Aday dosyası src/components/lab/CountriesC11.tsx
   olduğu yerde duruyor ve /lab/ulkeler'de yayında kalıyor — canlıya taşınan
   kopya odur, kesilip alınmış hâli değil. İki dosya bu yüzden birbirine ÇOK
   benziyor ve bu bilerek: aday sayfası "müşteriye ne gösterdik"in kaydı,
   burası ise onun düzeltmelerle canlıya girmiş hâli. Aşağıda o düzeltmeler
   tek tek işaretli.

   CSS AD ALANI — uk3-
   Aday lab-c11.css'te c11- önekiyle yaşıyor ve orada YAŞAMAYA DEVAM EDİYOR.
   Aynı sınıf adlarını buraya kopyalasaydık iki dosya aynı seçicileri tanımlar,
   ikisi de globals.css'e import edildiği için sonuncusu kazanır ve canlıda
   yapılan bir düzeltme sessizce /lab/ulkeler'deki adayı da değiştirirdi —
   yani karşılaştırma kaydı bozulurdu. Bu dosyanın CSS'i src/app/css/countries.css
   ve öneki uk3-: bölümün üçüncü kuşağı (uk- → uk2- → uk3-).

   ESKİ uk2- BLOĞU
   globals.css'teki .uk2-* kuralları artık bu dosyadan çağrılmıyor. Silinmediler
   çünkü globals.css bu turda kilitli; ölü CSS olarak duruyorlar. Bir gün
   temizlenirlerse DİKKAT: o bloğun içinde bir :root var ve --red-600 /
   --red-100 / --green-300 / --red-300 orada tanımlı. Bu dosya --red-600
   kullanıyor (çalışmayan kanalın çarpısı); token'lar silinirse çarpı renksiz
   kalır.

   BU TURDA NE DEĞİŞTİ — KIYASIN DERİNLİĞİ BURADAN ÇIKTI

   "Yan yana kıyas" görünümü on üç satırdı: beş künye satırı ve üç para grubu,
   yani bütün kanallar tek tek. Müşterinin teşhisi doğru — ana sayfa bir vitrin,
   o tablo ise kıyasın kendi sayfasının işi. Tablo /ulkeler'e taşındı ve orada
   genişledi (vergi çerçevesi, banka başvurusu, dürüst kısıt, hizmet listesi).
   Burada önce dört satır kaldı, sonra sekize çıktı — aşağıdaki nota bakın.
   Sitenin tasarım yasası değişmedi: her section özet verir, detaya tıklanarak
   açılan yerlerden ya da başka bir sayfadan girilir.

   BİR SONRAKİ TUR — iki geri alma. Taşıma doğruydu ama iki şey fazla gitmişti:
   fotoğraflı sütun başlıkları da kalkmıştı ve dört satır az geldi. Müşteri
   ikisini de geri istedi. Fotoğraf /ulkeler'deki .ctry- başlığının aynısı
   olarak döndü (gerekçesi tablonun içinde), satır sayısı sekize çıktı.

   Sekiz satırın tanımı BURADA DEĞİL, src/components/Countries.tsx'te ve yedisi
   /ulkeler'deki tablonun kullandığı NESNENİN TA KENDİSİ. İki ekranın aynı
   hücreyi farklı göstermesi bu yüzden mümkün değil. Kıyas ilkelleri (Chips,
   Channel, channels, parts …) de oradan geliyor; aşağıdaki açılan panel de
   onları çağırıyor.

   ÇAPALAR — ikisi de zorunlu
   · id="ulkeler"        — lib/routes.ts HOME_ANCHORS'ta canlı, /#ulkeler oraya iner.
   · id="odeme-altyapisi" — aynı listede canlı; Nav'ın mega menüsü, FinalCta
     (yayındaki /sektorler/yazilim-ve-teknoloji sayfasında duruyor) ve footer
     oraya bağlanıyor. Bu çapanın ana sayfadaki TEK karşılığı bu bölüm:
     home/PaymentInfra.tsx aynı id'yi taşıyor ama o bileşen ana sayfadan
     çıkarıldı ve hiçbir yerde render edilmiyor (bkz. src/app/page.tsx'in
     başındaki "Kaldırılanlar" notu). Yani buradaki id kaybolursa çalışan üç
     bağlantı birden hiçbir yere inmez. Çapanın nereye taşındığı ve neden
     kıyas görünümünü açtığı için aşağıdaki HASH SENKRONU notuna bakın.
   ========================================================================= */

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------- geometri --- */
/* Yayın şeridi BAND kadar yüksek, SVG'nin viewBox yüksekliği de aynı sayı ve
   preserveAspectRatio="none" yalnızca yatayda geriyor: viewBox'taki y birimi
   ile ekrandaki piksel birebir eşit. Diskleri yayın üstüne oturtmak için eğriyi
   örneklemek yetiyor, ölçek düzeltmesi gerekmiyor. */
const BAND = 112;
const VB_W = 1000;
/** yayın iki ucunun yüksekliği */
const BASE_Y = 82;
/** tepe noktasının uçlardan yüksekliği */
const RISE = 43;

/* Sütun merkezleri: üç eşit sütunda 1/6, 1/2, 5/6. */
const LANE_P = [1 / 6, 1 / 2, 5 / 6];

/** yayın p noktasındaki yüksekliği — eğri karesel Bézier, x'te doğrusal */
function arcY(p: number) {
  return BASE_Y - 4 * RISE * p * (1 - p);
}

/* Yay ve altındaki iki sönük sıra. Her sıra biraz aşağıda (dy) ve biraz daha
   düz (k): sadece kaydırılmış kopyalar olsalardı iç içe kemerler okunurdu. */
const ARC_ROWS = [
  { dy: 0, k: 1, o: 1 },
  { dy: 14, k: 0.84, o: 0.32 },
  { dy: 30, k: 0.68, o: 0.16 },
].map((r) => {
  const y0 = BASE_Y + r.dy;
  return { ...r, d: `M0 ${y0}Q${VB_W / 2} ${y0 - 2 * RISE * r.k} ${VB_W} ${y0}` };
});

/* ---------------------------------------------------------------- DÜZELTME 2
   SIRA ARTIK COĞRAFİ DEĞİL — İngiltere · Dubai · KKTC.

   Adayda sıra boylamdan hesaplanıyordu: bir LNG haritası (İngiltere -0,13 ·
   KKTC 33,38 · Dubai 55,27) ve onu küçükten büyüğe sıralayan bir satır. Çıkan
   dizi İngiltere → KKTC → Dubai idi, yani soldan sağa okunan şey batıdan
   doğuya bir harita şeridiydi.

   Müşteri Dubai'yi ORTAYA, KKTC'yi SAĞA istedi. Bu istek coğrafyayı bozuyor ve
   bozması sorun değil: bu bölüm bir harita değil, bir menü. Dubai firmanın
   ana ürünü — üç ülke içinde sayfası elden geçirilmiş tek ülke o (bkz.
   lib/routes.ts, /dubai açık; /ingiltere ve /kktc kapalı) ve üç sütunlu bir
   dizide gözün ilk gittiği yer orta sütun. Yani sıra artık coğrafi değil
   editoryal: ortada olan, en çok anlatmak istediğimiz.

   Boylam haritası da sıralama satırı da SİLİNDİ, saklanmadı. Yorumda durup
   kullanılmayan bir sabit, bir sonraki kişiye "burada bir yerde coğrafi sıra
   hâlâ var" dedirtir.

   YAYIN KENDİSİ NE OLDU
   Yay boylamdan hiç beslenmiyordu: eğri simetrik bir kubbe (M0 → Q orta →
   1000) ve diskler sütun merkezlerine (1/6, 1/2, 5/6) oturuyor. Yani
   geometride düzeltilecek bir hesap yoktu; düzeltilecek olan ANLAMDI. Eski
   okumada simetrik kubbe sessizce "KKTC yolun ortası" diyordu ve bu coğrafi
   bir iddiaydı. Yeni sırada kubbe hiçbir coğrafi iddia taşımıyor; tepe noktası
   yalnızca orta sütunu işaretliyor — ve orta sütun artık Dubai. Yani müşterinin
   isteği ile yayın en yüksek noktası aynı yere düşüyor: orta disk yanındakilerden
   19 piksel yukarıda duruyor ve öne çıkan ülke olan Dubai o tepeye oturuyor.
   Sıra ile çizim tutarlı; kimse "neden ortadaki daha yukarıda" diye sormuyor.

   ORDER kıyas tablosunun da sütun sırası. İki görünüm aynı diziyi okumak
   ZORUNDA: değiştiriciye basan kişi aynı üç ülkeyi aynı yerde bulmalı, yoksa
   geçiş bir görünüm değişikliği değil bir yer değiştirme oyunu olur. Aynı
   gerekçe /ulkeler için de geçerli — oraya tıklayan kişi de aynı sırayı
   bulmalı — ve dizi bu yüzden artık BURADA DEĞİL, Countries.tsx'te tanımlı;
   iki dosya onu oradan okuyor.

   Adaydaki sr-only satır ("Ülkeler batıdan doğuya sıralı: İngiltere, KKTC,
   Dubai") de kalktı — artık doğru değil ve yerine yenisi yazılmadı: editoryal
   bir sıranın açıklanacak bir kuralı yok, üç adı ekran okuyucuya iki kez
   saydırmak yalnızca gürültü olurdu. Düğmeler adları zaten okuyor. */

/* --------------------------------------------------------- iki başlık ----- */
/* KAPALI HÂL. Maliyet sırası FACTS.from'dan türüyor, elle yazılmıyor; rakam yok
   çünkü bu bölümün sözleşmesi "tutar fiyat bölümünde".

   Sözleşme kapalı hâl için AYNEN GEÇERLİ ve bu turda da değişmedi. Kıyas
   görünümü onu bir yerde esnetiyor — gerekçesi Countries.tsx'teki R_COST
   satırının başında.

   Sıralama COUNTRY_ORDER üzerinden, ORDER üzerinden DEĞİL: burada hesaplanan
   şey ekrandaki dizilim değil, üç ülkenin fiyat sıralaması. Ekran sırası
   editoryal bir tercih ve değişebilir; hangi ülkenin daha ucuz olduğu veriden
   çıkan bir olgu. İkisini aynı diziye bağlamak, bir gün sıra değiştiğinde
   "en düşük maliyet" etiketini yanlış ülkeye yapıştırırdı. */
const COST_WORD = ["en düşük", "orta", "en yüksek"];
const COST_RANK = [...COUNTRY_ORDER].sort((a, b) => FACTS[a].from - FACTS[b].from);
const costWord = (c: CountrySlug) => COST_WORD[COST_RANK.indexOf(c)] ?? "—";

type Feat = { i: LucideIcon; t: string };

/* Ülke başına tam iki satır. Kurallar: üçünde de doğru olan bir şey yazılmaz,
   taahhüt yok, tek satır, ülkenin ÖNDE olduğu eksen seçilir. */
const FEATS: Record<CountrySlug, [Feat, Feat]> = {
  dubai: [
    { i: IdCard, t: "Oturum vizesi çıkabilen tek ülke" },
    { i: CreditCard, t: `${trList(worksIn("Tahsilat", "dubai"))} çalışıyor` },
  ],
  ingiltere: [
    { i: MonitorSmartphone, t: "Baştan sona uzaktan kuruluş" },
    { i: Wallet, t: `Üç ülkede ${costWord("ingiltere")} maliyet` },
  ],
  kktc: [
    { i: MapPin, t: "Türkiye'ye en yakın ülke" },
    { i: Languages, t: "Süreç tamamen Türkçe" },
  ],
};

/* =========================================================== PANEL VERİSİ == */

/* --------------------------------------------------------------- künye ---- */
/* İki niteliksel kalem, ikisi de veride zaten AYRILMIŞ liste. Bölme işini
   Countries.tsx'teki parts() yapıyor: aynı iki alan (forWhom, structure)
   /ulkeler tablosunda da kutucuk olarak basılıyor ve ayırıcı kuralının iki
   dosyada ayrı ayrı yaşaması, bir gün birinde düzeltilip ötekinde unutulması
   demekti. */
type Brief = { i: LucideIcon; k: string; items: string[] };

function brief(c: CountrySlug): Brief[] {
  return [
    { i: Users, k: "Kim için", items: parts(FACTS[c].forWhom) },
    { i: Building2, k: "Yapı", items: parts(FACTS[c].structure) },
  ];
}

/* ---------------------------------------------------------------- para ---- */
/* PAY_MATRIX'in üç grubu, olduğu gibi ve aynı sırayla. Grup ikonu (GROUP_ICON)
   ve kanal listesi (channels) Countries.tsx'ten geliyor: /ulkeler'deki
   ayrıntılı tablonun para satırları da aynı iki şeyi kullanıyor, yani panelde
   çalışan bir kanal orada çalışmıyor görünemiyor.

   Eşleşmeyen bir başlık Wallet'a düşüyor — veri bir gün değişirse panel
   çökmüyor, yalnızca ikonu genelleşiyor. */
type MoneyGroup = { title: string; hint: string; i: LucideIcon; items: Chan[] };

function money(c: CountrySlug): MoneyGroup[] {
  return PAY_MATRIX.map((g) => ({
    title: g.title,
    hint: g.hint,
    i: GROUP_ICON[g.title] ?? Wallet,
    items: channels(g, c),
  }));
}

/* ==================================================== KIYAS GÖRÜNÜMÜ VERİSİ */

/* NEDEN BÖLÜM İÇİ GÖRÜNÜM VE NEDEN ARTIK BİR DE SAYFA VAR

   Kıyas bir "araç" değil: araç girdi alıp sonuç üretir (uygunluk testi, fiyat
   yapılandırıcı — bir şeye tıklarsın, sana ait bir çıktı gelir). Kıyas hiçbir
   şey üretmiyor, zaten var olan veriyi ikinci bir düzende gösteriyor. Bu yüzden
   bölümün İÇİNDE bir görünüm olarak duruyor ve öyle kalıyor: karar burada
   veriliyor, ziyaretçiyi ortasında başka yere göndermek akışı keserdi.

   Değişen şey görünümün DERİNLİĞİ. Bir tur önce burada on üç satır vardı ve
   üç para grubunun bütün kanalları tek tek listeleniyordu. O tablo /ulkeler'e
   taşındı; ana sayfada dört satır kaldı ve tablonun ayağında oraya çıkan bir
   bağlantı var. Yani ziyaretçi burada "hangisi bana uygun" sorusunun kaba
   cevabını alıyor, ölçüt ölçüt bakmak isteyen bir tık ötede.

   Bağlantı bu kez sönük çıkmıyor: /ulkeler bu turda dolaşıma açılıyor. Açılana
   kadar SmartLink onu sönük bir span olarak basıyor ve bu doğru davranış —
   karar lib/routes.ts'te, burada değil.

   SATIR SEÇİMİ — DÖRTTEN SEKİZE
   Dört satır (maliyet, süre, oturum/vize, kart tahsilatı) müşteriye az geldi:
   "kıyasa girecek konular varda 3-5 satır daha ekleyebilirsin". Dördü daha
   eklendi — yapı, kim için, kurumlar vergisi, banka başvurusu — ve üst sınır
   dokuz: bunun ötesinde tablo özet olmaktan çıkıp /ulkeler'in kopyası olurdu.

   Hangi satırın neden seçildiği ve hangilerinin neden alınmadığı BURADA DEĞİL,
   satırların tanımlı olduğu yerde yazılı: Countries.tsx · HOME_CMP_ROWS. Aynı
   gerekçeyi iki dosyada tutmak, bir gün birinde güncellenip ötekinde eskimesi
   demekti — satır kaydı orada, kaydın gerekçesi de orada. */

/* =================================================================== UI ==== */

/* --------------------------------------------------------- değiştirici ---- */
type View = "ulke" | "kiyas";

const VIEWS: { id: View; label: string; i: LucideIcon }[] = [
  { id: "ulke", label: "Ülke ülke", i: Columns3 },
  { id: "kiyas", label: "Yan yana kıyas", i: Table2 },
];

/* --------------------------------------------------------------- ayak ----- */
/* İki görünümün de altında aynı iki şey duruyor: o görünüme ait bir not ve
   /ulkeler'e çıkan bağlantı. Bağlantı ikisinde de var çünkü "hangisini
   seçeceğimi bilmiyorum" sorusu görünümden bağımsız; ve aynı anda yalnızca bir
   görünüm açık olduğu (kapalı olan `hidden`) için ekranda da erişilebilirlik
   ağacında da tek bir çıkış görünüyor.

   Metin "detaylı kıyas" demiyor, ne yapacağını söylüyor: ölçüt ölçüt. Ana
   sayfadaki tablo da bir kıyas; ayrımı "detaylı" sıfatıyla değil, sayfanın
   gerçekten sunduğu şeyle kurmak gerekiyor. */
function Foot({ note }: { note: string }) {
  return (
    <div className="uk3-foot">
      <p className="uk3-note">{note}</p>
      <SmartLink href="/ulkeler" className="btn btn-line btn-sm uk3-exit">
        Ölçüt ölçüt kıyaslayın
        <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
      </SmartLink>
    </div>
  );
}

export default function ThreeCountries() {
  /** açık ülke; null = hepsi kapalı, bölümün gerçek boyu bu */
  const [open, setOpen] = useState<CountrySlug | null>(null);
  /** hangi görünüm açık; varsayılan HER ZAMAN yay — kıyas ikinci katman */
  const [view, setView] = useState<View>("ulke");
  const reduce = useReducedMotion();

  /* Kıyas tablosunun sütun seçimi. Bölümün KENDİ durumu değil, sayfanın ortak
     durumu: aynı zustand dilimini hero'daki küre de sürüyor (HeroGlobe) ve
     fiyat hesaplayıcı ile /basla da onu okuyor. Yerel bir useState koysaydık
     ziyaretçi burada KKTC'yi seçip hesaplayıcıya Dubai ile geçerdi.

     Ülke ülke görünümündeki `open` ise mağazaya BAĞLANMIYOR ve bağlanmamalı:
     orada tıklama "bu ülkeyi seçtim" demiyor, "bu paneli açtım" diyor —
     kapatmak için ikinci kez tıklanıyor ve null'a düşüyor. Bir seçimin
     "hiçbiri" hâli yok. */
  const country = useOrtacStore((s) => s.country);
  const setCountry = useOrtacStore((s) => s.setCountry);

  const viewsRef = useRef<HTMLDivElement>(null);
  const paneRef = useRef<Partial<Record<View, HTMLDivElement | null>>>({});
  const tabRef = useRef<Partial<Record<View, HTMLButtonElement | null>>>({});
  /* Süren yükseklik animasyonu. Tipi bilerek dar: burada yapılan tek şey onu
     durdurmak ve motion'ın döndürdüğü nesnenin tam tipini içeri almak, bu
     dosyaya taşıdığı tek fayda için fazla bağ olurdu. */
  const running = useRef<{ stop: () => void } | null>(null);

  /* ------------------------------------------------------ HASH SENKRONU ---
     /#odeme-altyapisi ana sayfada yalnızca bu bölüme iniyor (Nav'ın mega
     menüsü, FinalCta ve footer oraya bağlanıyor; home/PaymentInfra.tsx aynı
     id'yi taşısa da render edilmiyor). Çapa .uk3-views kutusunda, yani İKİ
     görünümün de kapsayıcısında — hangi görünüm açık olursa olsun DOM'da duran
     tek eleman o. Çapayı tablonun kendisine koysaydık, yay görünümündeyken
     hedef DOM'da olmaz ve tarayıcı hiçbir yere kaydıramazdı.

     Kaydırma yetmiyor ama: "ödeme altyapısı" diyen bir bağlantının indiği yerde
     ödeme altyapısı görünmeli. Yay görünümü kanalları ancak bir ülkeye
     tıklandığında açıyor; kıyas görünümü ise "kart tahsilatı" satırıyla üç
     ülkeyi birden, tıklama gerektirmeden gösteriyor. O yüzden bu çapayla gelen
     ziyaretçiye kıyas açılıyor.

     DİKKAT — bu satırın dayanağı bu turda zayıfladı. Kıyas görünümü eskiden üç
     para grubunu (banka hesabı, ödeme kuruluşu, tahsilat) bütün kanallarıyla
     basıyordu; o matris /ulkeler'e taşındı ve burada kanalların tek satırlık
     özeti kaldı. Yani çapa artık "ödeme altyapısının tamamı"na değil, en keskin
     satırına iniyor; tamamı ayağındaki bağlantının ucunda. Matrisin adresini
     bilen bağlantılar (Nav'ın "Ödeme altyapısı matrisi" kartı gibi) bir gün
     doğrudan /ulkeler'e çevrilirse bu blok da kalkabilir.

     hashchange dinleniyor çünkü ziyaretçi zaten ana sayfadayken menüden
     tıkladığında bileşen yeniden kurulmuyor; yalnızca adres değişiyor. İlk
     çağrı da yapılıyor, çünkü sayfaya doğrudan /#odeme-altyapisi ile
     gelinebilir. Bu geçişte yükseklik animasyonu yok (switchView'a
     uğramıyoruz): kullanıcı bir düğmeye basmadı, sayfa daha yeni açıldı. */
  useEffect(() => {
    const sync = () => {
      if (window.location.hash === "#odeme-altyapisi") setView("kiyas");
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  /* ------------------------------------------------- görünüm değiştirme ---
     İKİ GÖRÜNÜM DE HEP MONTELİ, pasif olan `hidden` ile kapalı. Sebebi üç
     tane: (1) yayın diskleri whileInView + once ile geliyor, her geçişte
     yeniden monte edilseydi bayraklar her seferinde baştan uçarak gelirdi;
     (2) açık bırakılan ülke paneli geri dönüldüğünde açık kalıyor; (3) `hidden`
     elemanı hem erişilebilirlik ağacından hem sekme sırasından çıkarıyor, yani
     kapalı görünümün düğmelerine klavyeyle düşmek mümkün değil.

     YÜKSEKLİK NEDEN ELLE ANİMASYON EDİLİYOR
     Tablo yaydan belirgin biçimde uzun. İki görünüm arasında geçiş yaparken
     kapsayıcı bir kareda bir boydan diğerine atlarsa sayfanın altındaki her şey
     zıplıyor. Ölçüm flushSync ile yapılıyor: tıklama anındaki boy okunuyor,
     React'in yeni görünümü basması ZORLANIYOR, sonra yeni boy okunuyor. Bu
     ölçüm useLayoutEffect ile de yapılabilirdi ama o kanca sunucuda uyarı
     basıyor ve bu dosya sunucuda da render ediliyor; flushSync yalnızca
     tıklamada çalıştığı için o sorunu hiç doğurmuyor.

     overflow:hidden yalnızca animasyon SÜRESİNCE açılıyor. Sürekli açık
     kalsaydı sütun düğmelerinin odak halkası (:focus-visible, 2px dış çizgi)
     kapsayıcının kenarında kırpılırdı — klavyeyle gezen kişi seçili sütunu
     göremezdi. Animasyon biterken hem yükseklik hem taşma satır içi biçimden
     siliniyor: kutu tekrar auto oluyor ve içeride açılan panel serbestçe
     büyüyebiliyor.

     Hareket azaltmada hiçbiri çalışmıyor: görünüm anında değişiyor. */
  function switchView(next: View) {
    if (next === view) return;

    const box = viewsRef.current;
    if (!box || reduce) {
      setView(next);
      return;
    }

    /* Sıra ÖNEMLİ ve buradaki en kolay hata kaynağı. Önce şu ANDAKİ boy
       okunuyor — kutu bir önceki geçişin ortasındaysa bu, animasyonun ara
       değeri ve doğrusu da o: geçiş bulunduğu yerden devam etmeli.

       Sonra önceki animasyon durduruluyor ve bıraktığı satır içi yükseklik
       SİLİNİYOR. Silinmeseydi bir sonraki satırdaki ölçüm o ara değeri
       okur, yani "yeni görünümün doğal boyu" diye eski animasyonun yarısını
       alırdık ve hızlı iki tıklamada kutu yanlış boyda kalırdı. */
    const from = box.offsetHeight;
    running.current?.stop();
    flushSync(() => setView(next));
    box.style.height = "";
    const to = box.offsetHeight;

    if (from === to) {
      box.style.overflow = "";
      return;
    }

    /* Başlangıç boyu ANİMASYONDAN ÖNCE elle yazılıyor. motion ilk kareyi kendi
       döngüsünde uyguluyor ve o döngü boyamadan önce çalışıyor, yani teoride
       gerek yok; ama flushSync DOM'u şimdiden yeni boya getirdi ve araya giren
       herhangi bir şey (eklenti, devtools, yavaş kare) tek karelik bir sıçrama
       yaratabilir. Tek satırlık sigorta. */
    box.style.height = `${from}px`;
    box.style.overflow = "hidden";
    running.current = animate(
      box,
      { height: [from, to] },
      {
        duration: 0.42,
        ease: EASE,
        onComplete: () => {
          running.current = null;
          box.style.height = "";
          box.style.overflow = "";
        },
      },
    );

    /* Gelen görünüm kendi başına da yumuşasın: yükseklik açılırken içerik
       hazır bekliyormuş gibi durursa geçiş "kutu büyüdü" diye okunuyor,
       "görünüm değişti" diye değil. Ufak bir gecikme yüksekliğin önden
       gitmesini sağlıyor. */
    const pane = paneRef.current[next];
    if (pane) {
      animate(pane, { opacity: [0, 1], y: [8, 0] }, { duration: 0.3, ease: EASE, delay: 0.06 });
    }
  }

  /* Sekme listesi klavye sözleşmesi: ok tuşları seçimi taşır, Home/End uçlara
     gider ve odak seçimle birlikte hareket eder (roving tabindex). */
  const onSegKey = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) return;
    e.preventDefault();
    const i = VIEWS.findIndex((v) => v.id === view);
    const n =
      e.key === "Home"
        ? 0
        : e.key === "End"
          ? VIEWS.length - 1
          : (i + (e.key === "ArrowRight" ? 1 : VIEWS.length - 1)) % VIEWS.length;
    const next = VIEWS[n].id;
    switchView(next);
    tabRef.current[next]?.focus();
  };

  /* Kademeli giriş iki varyantla. Hareket azaltmada ikisi de boşa çıkıyor:
     stagger yok, kayma yok, süre yok — içerik ilk karede yerinde ve tam.
     Varyantlar bileşen gövdesinde tanımlı çünkü `reduce` bir kanca değeri;
     modül seviyesinde sabit olsalardı tercihe uyamazlardı.

     BUNLAR YUKARIDAKİ HİDRASYON KURALININ İSTİSNASI DEĞİL, KAPSAMI DIŞINDA.
     Kural "sunucuda basılan ağaç istemcidekiyle aynı olmalı" diyor; bu iki
     varyant yalnızca açılan panelin içinde kullanılıyor ve panel sunucuda HİÇ
     basılmıyor — `open` her iki tarafta da null'la başlıyor, panel ancak
     tıklamayla monte oluyor. Yani ortada hidrate edilecek bir işaretleme yok.
     Diskteki `initial` ise ilk boyamada DOM'a giriyor; farkın tamamı bu. */
  const listV = reduce
    ? { hidden: {}, show: {} }
    : { hidden: {}, show: { transition: { staggerChildren: 0.04, delayChildren: 0.06 } } };

  const itemV = reduce
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 8 },
        show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE } },
      };

  return (
    /* Zemin beyaz ve bu yapısal bir zorunluluk, tercih değil: açılan panelin
       kendi zemini --paper, içindeki para kartı --white ve disklerin halkası
       yine --white. Bölüm --paper olsaydı panel zeminle aynı renge düşer,
       halkalar da gri üstünde beyaz bir daire olarak görünürdü. Önceki canlı
       sürüm --paper idi; bu bölüm ile altındaki "Verdiğimiz hizmetler" (o da
       beyaz) arasındaki gri şerit bu turda kayboluyor. Ayrımı artık renk değil
       yayın kendisi yapıyor: bölüm boş bir beyazlıkla değil, üç diskli bir
       kemerle açılıyor. */
    <section id="ulkeler" className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        {/* Başlık ve değiştirici aynı satırda, iki uçta. Değiştirici başlığın
            ALTINDA değil YANINDA: altına konsaydı içerikten önce gelen ikinci
            bir kontrol katmanı olur ve bölüm "önce bir şey seç" diye açılırdı.
            Oysa varsayılan görünüm zaten doğru olan; değiştirici bir seçenek,
            bir kapı değil. Dar ekranda flex-wrap onu başlığın altına indiriyor
            ve orada sola hizalanıyor. */}
        <div className="uk3-top">
          <div className="sec-head">
            <SplitWords
              as="h2"
              text="Hizmet verdiğimiz bölgeler."
              accent="bölgeler."
              className="h2"
              style={{ color: "var(--text-900)" }}
            />
            <FadeUp delay={0.2}>
              <p className="sec-lead">
                Üç ülkede kuruluş, banka ve muhasebe. Tek tek bakın ya da temel
                ölçütlerde yan yana koyun; ölçüt ölçüt kıyas ülkeler sayfasında.
              </p>
            </FadeUp>
          </div>

          <FadeUp delay={0.24} className="uk3-segwrap">
            <div className="uk3-seg" role="tablist" aria-label="Ülke bölümü görünümü">
              {VIEWS.map((v) => {
                const Icon = v.i;
                const on = view === v.id;
                return (
                  <button
                    key={v.id}
                    type="button"
                    role="tab"
                    id={`uk3-tab-${v.id}`}
                    ref={(el) => {
                      tabRef.current[v.id] = el;
                    }}
                    className="uk3-seg-b"
                    aria-selected={on}
                    aria-controls={`uk3-view-${v.id}`}
                    tabIndex={on ? 0 : -1}
                    onClick={() => switchView(v.id)}
                    onKeyDown={onSegKey}
                  >
                    <Icon size={15} strokeWidth={2} aria-hidden="true" />
                    {v.label}
                  </button>
                );
              })}
            </div>
          </FadeUp>
        </div>

        {/* İki görünümün ortak kabı ve #odeme-altyapisi çapasının yeni evi.
            Yüksekliği switchView animasyon ediyor; boşluğu (--space-head) kabın
            ÜST KENAR BOŞLUĞU taşıyor, iç dolgusu değil — kenar boşluğu
            offsetHeight'a girmediği için ölçüm iki görünümde de yalnızca
            içeriği sayıyor. */}
        <div className="uk3-views" id="odeme-altyapisi" ref={viewsRef}>
          {/* ======================================= 1. GÖRÜNÜM · ÜLKE ÜLKE */}
          <div
            className="uk3-view"
            id="uk3-view-ulke"
            role="tabpanel"
            aria-labelledby="uk3-tab-ulke"
            hidden={view !== "ulke"}
            ref={(el) => {
              paneRef.current.ulke = el;
            }}
          >
            <FadeUp delay={0.16} className="uk3-wrap">
              {/* BAND tek sayı olarak buradan çıkıyor ve iki yere birden gidiyor:
                  yayın SVG yüksekliği ve disklerin oturduğu yuvanın yüksekliği. */}
              <div
                className="uk3-grid"
                style={{ "--uk3-band": `${BAND}px` } as React.CSSProperties}
              >
                <svg
                  className="uk3-arc"
                  viewBox={`0 0 ${VB_W} ${BAND}`}
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  {ARC_ROWS.map((r) => (
                    <path key={r.dy} d={r.d} opacity={r.o} vectorEffect="non-scaling-stroke" />
                  ))}
                </svg>

                {ORDER.map((c, i) => {
                  const on = open === c;
                  const dy = arcY(LANE_P[i]);

                  return (
                    /* .uk3-lane masaüstünde display:contents — kutusu yok, iki
                       çocuğu doğrudan ızgaraya giriyor: düğme 1. satıra, panel 2.
                       satıra ve üç sütunu birden kaplayarak. Dar ekranda lane
                       gerçek bir bloğa dönüşüyor ve aynı DOM ülke ülke satırlara
                       iniyor. Tek işaretleme, iki yerleşim. */
                    <div key={c} className="uk3-lane">
                      <button
                        type="button"
                        className="uk3-pick"
                        style={{ gridColumn: String(i + 1) }}
                        data-on={on}
                        aria-expanded={on}
                        aria-controls={on ? `uk3-p-${c}` : undefined}
                        onClick={() => setOpen((p) => (p === c ? null : c))}
                      >
                        <span className="uk3-discwrap">
                          <motion.span
                            className="uk3-disc"
                            style={{ top: dy }}
                            /* HİDRASYON — `initial` KOŞULLU OLAMAZ.
                               Burada `initial={reduce ? false : {...}}` yazıyordu
                               ve ana sayfa, hareket azaltma açık bir tarayıcıda
                               "Hydration failed" atıyordu. Sebep: sunucuda medya
                               sorgusu diye bir şey yok, useReducedMotion orada
                               her zaman false — yani sunucu diski opacity:0 ile
                               basıyor, istemci `initial={false}` yüzünden hiç
                               satır içi biçim yazmıyor ve iki ağaç uyuşmuyor.

                               Kural: reduce RENDER EDİLEN AĞACI değil yalnızca
                               SÜREYİ değiştirir. Süre ve gecikme sıfırlanınca
                               disk kadraja girdiği anda tek karede yerine
                               oturuyor — hareket yok, uyuşmazlık da yok. Aynı
                               kalıp home/Chain.tsx ve lab/ChainZ8.tsx'te de
                               yorumuyla birlikte yazılı. */
                            initial={{ opacity: 0, y: 14, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                            transition={{
                              duration: reduce ? 0 : 0.6,
                              ease: EASE,
                              delay: reduce ? 0 : 0.28 + i * 0.1,
                            }}
                          >
                            <Flag country={c} />
                          </motion.span>
                        </span>

                        <span className="uk3-name">
                          {COUNTRY_NAME[c]}
                          <ChevronDown size={16} strokeWidth={2.2} aria-hidden="true" />
                        </span>

                        <span className="uk3-feats">
                          {FEATS[c].map((f) => {
                            const Icon = f.i;
                            return (
                              <span key={f.t} className="uk3-feat">
                                <Icon size={15} strokeWidth={1.9} aria-hidden="true" />
                                <span>{f.t}</span>
                              </span>
                            );
                          })}
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {on && (
                          /* Yerinde açılım. Panel ızgaranın son satırı ve üç sütunu
                             birden kaplıyor, o yüzden hangi ülke açılırsa açılsın
                             yanal kayma olmuyor — sadece bölüm uzuyor. */
                          <motion.div
                            key="panel"
                            className="uk3-panel"
                            style={{ gridColumn: "1 / -1" }}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: reduce ? 0 : 0.36, ease: EASE }}
                          >
                            <div
                              className="uk3-panel-in"
                              id={`uk3-p-${c}`}
                              role="group"
                              aria-label={`${COUNTRY_NAME[c]} detayı`}
                            >
                              {/* Başlık kademeye girmiyor: panelin çapası o ve
                                  kayarak gelen bir başlık, açılan kutunun kendisi
                                  zaten büyürken, iki ayrı hareket demek. */}
                              <div className="uk3-phead">
                                <span className="uk3-pflag" aria-hidden="true">
                                  <Flag country={c} />
                                </span>
                                <b>{COUNTRY_NAME[c]}</b>
                                {/* Panelin kendi kapatma düğmesi yok: açan düğme
                                    her zaman görünür, mavi ve oku dönmüş durumda. */}
                                <SmartLink href={`/${c}`} className="btn btn-solid btn-sm">
                                  {COUNTRY_NAME[c]}&apos;de kuruluş
                                  <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                                </SmartLink>
                              </div>

                              {/* Kademeyi yöneten kap. Ara katmanlar (.uk3-brief,
                                  .uk3-money) düz div: motion'ın varyant yayılımı
                                  bağlam üzerinden yürüdüğü için aradaki sade
                                  elemanlar zinciri kesmiyor ve beş kalem sırayla
                                  geliyor — künyenin ikisi, paranın üçü. */}
                              <motion.div variants={listV} initial="hidden" animate="show">
                                {/* Geniş ekranda künye SOLDA dar bir sütun, para
                                    kartı sağda: künye sütunu para kartından kısa,
                                    yani satırın yüksekliğini zaten kart belirliyor
                                    ve künye bedava biniyor. 1024'ün altında yeniden
                                    alt alta iniyor; orada sağdaki kart üç kanal
                                    sütununu taşıyamayacak kadar daralıyor. */}
                                <div className="uk3-body">
                                  <div className="uk3-brief">
                                    {brief(c).map((b) => {
                                      const Icon = b.i;
                                      return (
                                        <motion.div key={b.k} className="uk3-bit" variants={itemV}>
                                          <span className="uk3-bic" aria-hidden="true">
                                            <Icon size={17} strokeWidth={1.9} />
                                          </span>
                                          <div>
                                            <p className="uk3-blabel">{b.k}</p>
                                            {/* Veride zaten liste olan şey ekranda
                                                da liste: dört kısa nesne saymak bir
                                                cümle okumaktan hafif. Aynı kutucuk
                                                kıyas tablosunun yapı ve kim için
                                                satırlarında da kullanılıyor. */}
                                            <Chips items={b.items} />
                                          </div>
                                        </motion.div>
                                      );
                                    })}
                                  </div>

                                  {/* Paranın üç kanalı tek beyaz kartta. Panelin
                                      zemini gri (--paper); kartı beyaz yapmak hem
                                      marka işaretlerine kendi doğal zeminini
                                      veriyor (BrandGlyph plakasız, çünkü zemin
                                      zaten beyaz) hem de panelin odağını işaret
                                      eden tek yüzey oluyor. */}
                                  <div className="uk3-money">
                                    {money(c).map((g) => {
                                      const Icon = g.i;
                                      return (
                                        <motion.div
                                          key={g.title}
                                          className="uk3-mg"
                                          variants={itemV}
                                        >
                                          <p className="uk3-mgt">
                                            <Icon size={15} strokeWidth={1.9} aria-hidden="true" />
                                            {g.title}
                                          </p>
                                          {/* Grubun kendi açıklaması veriden
                                              geliyor. "Banka değil; farklı lisans"
                                              uyarısı bu yüzden ayrı bir dipnot
                                              bloğu istemiyor — üç grubun üç
                                              açıklaması yan yana zaten farkı
                                              anlatıyor. */}
                                          <p className="uk3-mgh">{g.hint}</p>
                                          {g.items.length ? (
                                            <ul className="uk3-list">
                                              {g.items.map((ch) => (
                                                <Channel key={ch.name} ch={ch} />
                                              ))}
                                            </ul>
                                          ) : (
                                            /* Bugün hiçbir ülkede bu duruma
                                               düşülmüyor; veri değişirse grup boş
                                               bir başlık olarak kalmasın diye
                                               duruyor. */
                                            <p className="uk3-empty">Bu ülkede sunulmuyor</p>
                                          )}
                                        </motion.div>
                                      );
                                    })}
                                  </div>
                                </div>

                                {/* ------------------------------------ DÜZELTME 1
                                    DÜRÜST KISIT BU BÖLÜMDEN ÇIKTI.

                                    Burada, panelin en altında, amber bir üçgen ve
                                    "Dürüst kısıt — {FACTS[c].limit}" satırı vardı.
                                    Kalkma sebebi müşterinin cümlesi: "ülkelerin
                                    hepsine dürüst kısıt yazmışsın, aşırı dikkat
                                    çekiyor". Haklı olduğu yer şu — ana sayfa bir
                                    menü ve menüde her satırın altına bir uyarı
                                    asmak, uyarıyı bilgi olmaktan çıkarıp desene
                                    çeviriyor: üç ülke, üç amber üçgen, hiçbiri
                                    okunmuyor.

                                    NEREYE GİTTİ — SİLİNMEDİ, TAŞINDI DEĞİL, ZATEN
                                    ORADA. Bilgi ülke sayfalarında yaşamaya devam
                                    ediyor ve tek kaynaktan basılıyor:

                                      src/lib/brand.ts        → FACTS[c].limit (kaynak, DURUYOR)
                                      src/components/shared/PageHero.tsx:431
                                                              → { icon: Info, line: FACTS[country].limit }

                                    PageHero her ülke sayfasının (/dubai,
                                    /ingiltere, /kktc) hero'sunda güven satırlarını
                                    basıyor ve o satırlardan biri tam olarak bu
                                    cümle. Yani ziyaretçi kısıtı, o ülkeye karar
                                    vermeye başladığı ilk ekranda görüyor — bir
                                    menüde üstünkörü değil, ilgilendiği yerde.
                                    Ayrıca /ulkeler karşılaştırma sayfasında da
                                    kendi satırı var.

                                    Bu yüzden FACTS[c].limit alanı brand.ts'ten
                                    SİLİNMEDİ ve silinmemeli: burada kullanılmıyor
                                    olması onu ölü alan yapmıyor.

                                    Bölümün kalan dürüstlük yükü panelin ve kıyas
                                    tablosunun içindeki çarpılarda: KKTC'de Stripe
                                    ve PayPal'ın yanında duran dört kırmızı çarpı,
                                    bu sayfanın en keskin "her yerde her şey
                                    olmuyor" ifadesi ve o hiçbir yere gitmedi. */}
                              </motion.div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Alt satır: not tıkın arkasında ne olduğunu söylüyor, bağlantı
                  ise kararı veremeyeni ölçüt ölçüt kıyasa gönderiyor.

                  ÇIKIŞ BAĞLANTISI GERİ GELDİ. Bir tur önce buradan kalkmıştı
                  çünkü /ulkeler dolaşıma kapalıydı ve SmartLink onu sönük bir
                  span olarak basıyordu — müşterinin "sitede hep live dışında
                  gözüküyorlar" dediği şey buydu. Sayfa bu turda açılıyor ve
                  artık gerçekten gidilecek bir yer: ayrıntılı tablonun yeni
                  evi orası. */}
              <Foot note="Ülkeye tıklayın: yapı, banka ve tahsilat kanalları yerinde açılır." />
            </FadeUp>
          </div>

          {/* ==================================== 2. GÖRÜNÜM · YAN YANA KIYAS */}
          <div
            className="uk3-view"
            id="uk3-view-kiyas"
            role="tabpanel"
            aria-labelledby="uk3-tab-kiyas"
            hidden={view !== "kiyas"}
            ref={(el) => {
              paneRef.current.kiyas = el;
            }}
          >
            {/* IZGARA DEĞİL GERÇEK <table>, ve bu bilinçli bir tercih.

                Burada gösterilen şey tanımı gereği iki eksenli: satır bir ölçüt,
                sütun bir ülke, hücre ikisinin kesişimi. Izgarayla da aynı görüntü
                çıkardı ama ekran okuyucu "Tahsilat, İngiltere: Stripe çalışıyor"
                diyemezdi — yalnızca hücrelerin içeriğini arka arkaya okurdu ve
                kullanıcı hangi sütunda olduğunu sayarak takip etmek zorunda
                kalırdı. <th scope="col"> ve <th scope="row"> bu ilişkiyi tarayıcıya
                söylüyor; tablo gezinme kısayolları (satır/sütun okuma) ancak o
                zaman çalışıyor. Görsel bir tablonun semantik tablo olmaması,
                erişilebilirlikte en sık yapılan sessiz kayıp.

                Kaydırma kutusu klavyeyle de gezilebilsin diye odaklanabilir ve
                kendi adı olan bir bölge: fare olmayan bir kullanıcı dar ekranda
                tabloyu yatay kaydırmak için başka bir yol bulamazdı. */}
            <div
              className="uk3-tblwrap"
              tabIndex={0}
              role="region"
              aria-label="Üç ülkenin karşılaştırma tablosu, yatay kaydırılabilir"
            >
              <table className="uk3-tbl">
                <caption className="sr-only">
                  Üç ülke yan yana, sekiz temel ölçütte: kuruluş maliyeti, tipik
                  süre, yapı, kim için, oturum, kurumlar vergisi, banka başvurusu
                  ve kart tahsilatı. Sütun başlıkları birer düğmedir; seçtiğiniz
                  ülke tabloda işaretlenir ve hesaplayıcıya da onunla geçersiniz.
                  Ölçüt ölçüt tam kıyas ülkeler sayfasında.
                </caption>

                {/* FOTOĞRAFLI SÜTUN BAŞLIĞI — GERİ GELDİ.

                    Bir tur önce başlık, bayrak yanında ülke adından ibaret tek
                    satırlık bir şeritti. Müşterinin cümlesi: "görselleri de
                    istiyorum, ülke görselleri çıkıyordu ya o güzeldi." Haklı
                    olduğu yer şu — fotoğraf burada süs değil işaret: dört sütunlu
                    bir tabloda ülkelerin nerede başladığını tek bakışta veren şey
                    o, ve dar ekranda tablo yana kayarken sütunu ayırt etmenin en
                    hızlı yolu. Kıyasın kendisini okunaksız yapmıyor çünkü fotoğraf
                    BAŞLIK hücresinde kalıyor: değer hücreleri beyaz, tablonun
                    verisi fotoğrafın üstüne hiç düşmüyor.

                    NASIL BASILIYOR — next/image DEĞİL, CSS background-image.
                    Üç gerekçe: (1) /ulkeler'deki başlık tam olarak bu; .ctry-
                    kuralları zaten yazılı ve paylaşılıyor, kopyalasaydık bir gün
                    biri değişip öteki geride kalırdı — müşteri iki ekranda iki
                    farklı başlık görürdü. (2) next.config.ts'te remotePatterns
                    yok, yani next/image ancak `unoptimized` ile çalışır — o hâlde
                    bileşen hiçbir optimizasyon yapmıyor, yalnızca <img> basıyor;
                    kazanç sıfır, <th> içine `fill` ile yerleştirme maliyeti ise
                    gerçek. (3) Fotoğraf dekor: aria-hidden ve alt metni yok.
                    Zemin görüntüsü olarak yazmak bu niyeti işaretlemenin kendisi.

                    Kaynak lib/media.ts · COUNTRY_PHOTO — /ulkeler ile aynı harita.
                    URL'ler Unsplash yer tutucusu (SWAP:STOCK_PHOTOS), müşterinin
                    kendi çekimiyle değişecekler; o gün tek dosya değişiyor.

                    NEDEN DÜĞME, NEDEN BAĞLANTI DEĞİL — ve [data-soon] kararı.
                    Başlık ülke sayfasına giden bir bağlantı OLSAYDI, /ingiltere ve
                    /kktc dolaşıma kapalı olduğu için SmartLink onları sönük birer
                    span'e çevirirdi: üç fotoğraflı başlıktan ikisi soluk ve
                    tıklanamaz. Müşterinin ayrımı burada nettir — sönükleşen şey
                    bir bağlantı değil bir TASARIM olurdu ve arıza gibi görünürdü.
                    Çözüm sönüklüğü kapatmak (--soon-dim: 1) değil, başlığı hiç
                    bağlantı yapmamak: başlık bir SEÇİM düğmesi, üç ülkede de
                    çalışıyor ve hiçbir dolaşım vaadi vermiyor. Bölümde [data-soon]
                    yalnızca gerçek bağlantılarda kalıyor (tablo ayağındaki "…
                    sayfası" düğmeleri, paneldeki "…'de kuruluş") ve orada sönük
                    KALMASI doğru: onlar bilgi taşıyan bağlantılar. Bu yüzden
                    countries.css'te --soon-dim tanımı YOK.

                    Sütun sırası ORDER, yani yaydakiyle birebir aynı: İngiltere ·
                    Dubai · KKTC. Orta sütun kendiliğinden boyanmıyor — yayda
                    Dubai'yi öne çıkaran şey editoryal bir tercih ve kubbeyle
                    söyleniyor; bir kıyas tablosunda bir sütunu renklendirmek
                    "önerilen bu" demek olurdu. Boyanan tek sütun ziyaretçinin
                    KENDİ seçtiği. */}
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

                {/* SEKİZ SATIR — bu turda dörtten çıktı. Tanımları burada değil
                    Countries.tsx'te (HOME_CMP_ROWS) ve yedisi /ulkeler'deki
                    ayrıntılı tablonun bastığı NESNENİN AYNISI; sekizincisi (kart
                    tahsilatı) aynı verinin — PAY_MATRIX'in — tek satırlık özeti.
                    Yani ana sayfa ile kıyas sayfasının aynı hücrede farklı şey
                    söylemesi mümkün değil. Hangi satırın neden seçildiği o
                    dosyada, dizinin başında yazılı.

                    Sekiz hâlâ ÖZET: sayfanın yasası her section'ın özet vermesi,
                    detayın tıklanarak açılan yerlerden ya da başka bir sayfadan
                    gelmesi. Ayrıntılı tablo on üç satır ve /ulkeler'de; buradaki
                    çıkış düğmesi de oraya gidiyor. */}
                <tbody>
                  {HOME_CMP_ROWS.map((row) => {
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
                        {/* Seçili sütun boyanıyor (.uk3-td[data-on]) — başlıktaki
                            düğmenin görünür karşılığı bu. Boya olmasaydı
                            aria-pressed duyurduğu şeyin ekranda karşılığı olmazdı:
                            gören kullanıcı neyi seçtiğini yalnızca fotoğrafın
                            parlaklığından anlardı. Yapışkan ölçüt sütunu beyaz
                            kalıyor; altından kayan hücreler görünmesin diye. */}
                        {ORDER.map((c) => (
                          <td key={c} className="uk3-td" data-on={country === c}>
                            {row.cell(c)}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>

                {/* Kıyasın çıkışı. Yay görünümünde ülke sayfasına giden düğme
                    açılan panelin içinde; tabloda panel yok, o yüzden çıkış tablo
                    ayağında ve her sütunun kendi altında duruyor. Kapalı ülkeler
                    burada da sönük çıkıyor (SmartLink) — kıyas görünümü dolaşım
                    kararını delmiyor. */}
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

            {/* Tablonun tek dipnotu ve iki iş yapıyor.

                Önce TALİMAT — yay görünümünün notu da öyle ("Ülkeye tıklayın…").
                Sütun başlığının bir düğme olduğu ve seçimin sayfadan çıkarken de
                yanınızda geldiği başka hiçbir yerde yazmıyor; boya seçimi
                gösteriyor ama tıklanabilir olduğunu önceden söylemiyor.

                Sonra ETİKET. Tablonun kendi getirdiği üç bilgi türü var — tutar,
                süre ve bu turda eklenen vergi — ve üçü de kapalı hâlde
                görünmüyor. Etiketsiz bırakmak STANCE_LIMITS'e aykırı olurdu:
                yan yana duran üç oran, sınırı söylenmezse kişiye özel bir vergi
                görüşü gibi okunur. Aynı cümle /ulkeler'in ayağında da var. */}
            <Foot note="Sütun başlığına basın: seçtiğiniz ülke işaretli kalır, hesaplayıcıya da onunla geçersiniz. Tutarlar temsilîdir, süreler tipik aralıktır; vergi satırı genel çerçevedir." />
          </div>
        </div>

        {/* ---------------------------------------------------------- DÜZELTME 3
            BÖLÜMÜN ALTINDAKİ İKİ DİPNOT KUTUSU KALKTI.

            Burada .uk3-notes içinde iki kutu vardı:
              · "Ödeme kuruluşu hesabı, banka hesabı değildir. Wise ve Payoneer
                 farklı lisansa tabidir."
              · "Hesabı banka açar, karar bankanındır. Onay taahhüdü vermiyoruz.
                 Dosyayı hazırlar, süreci yürütürüz."

            Müşteri ikisinin de bu bölümden çıkmasını istedi. İkisi de dürüstlük
            maddesi ve SİTEDEN SİLİNMİYOR — brand.ts'e dokunulmadı. Nerede
            yaşamaya devam ettikleri, tek tek doğrulanmış hâliyle:

            1) "Ödeme kuruluşu hesabı, banka hesabı değildir"
               → src/lib/brand.ts · PAY_MATRIX "Ödeme kuruluşu" grubunun hint'i:
                 "Banka değil; farklı lisans ve koruma rejimi". Bu cümle bu
                 bölümde İKİ yerde basılıyor: açılan panelin para kartında
                 (.uk3-mgh) ve yukarıdaki kıyas tablosunun aynı adlı satır
                 başlığının altında. Yani uyarı kaybolmadı, konusunun yanına
                 taşındı — Wise ile Payoneer'ın tam üstüne.
               → src/components/home/PaymentInfra.tsx:194'te daha uzun bir hâli
                 duruyor AMA O BİLEŞEN RENDER EDİLMİYOR: ana sayfadan çıkarıldı
                 (bkz. src/app/page.tsx) ve başka hiçbir yerden import edilmiyor.
                 Yani orayı "yaşamaya devam ediyor" diye saymadım.

            2) "Hesabı banka açar, karar bankanındır"
               → src/components/home/HomeFaq.tsx:64 · "Banka hesabı açılacağı
                 garanti mi?" sorusunun cevabı, birebir aynı cümleyle başlıyor.
                 HomeFaq ana sayfada yayında ve bu bölümün birkaç blok altında.
               → src/lib/brand.ts · STANCE_LIMITS[0] ("Banka onayı garantisi
                 vermiyoruz") başlığı src/components/Nav.tsx:594'te, yani SİTENİN
                 HER SAYFASINDAKİ mega menüde basılıyor.
               → Not: aynı diziyi basan src/components/home/Stance.tsx de ana
                 sayfadan çıkarılmış ve hiçbir yerde import edilmiyor; o da
                 sayılmadı.

            ÇAPA NE OLDU — id="odeme-altyapisi" bu kutularla birlikte kaybolamazdı:
            Nav'ın mega menüsü, FinalCta ve footer oraya bağlanıyor ve ana sayfada
            başka karşılığı yok. Çapa yukarıdaki .uk3-views kutusuna taşındı ve
            oraya inen ziyaretçiye kıyas görünümü açılıyor; gerekçesi HASH
            SENKRONU notunda. */}
      </div>
    </section>
  );
}
