"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Building2, Check, ChevronDown, Globe, Split, Store, TriangleAlert } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import type { CountryContent } from "@/lib/countryContent";

/* YAPI SEÇİMİ — "serbest bölge mi, mainland mi?" · ÇERÇEVE
 *
 * NEDEN BÖYLE
 *
 * Bu bölüm hero'dan hemen sonra geliyor. Ziyaretçi ülkeyi daha tanımadan
 * buraya düşüyor; yani burada verilmesi gereken şey bir kıyas cetveli değil
 * bir kavrayış: "bu ülkede iki yol var, biri muhtemelen seninki". Bu bölümün
 * bir önceki hâli bir kıyas tablosuydu — etiket sütunu, iki seçenek sütunu,
 * hücreler. Tablo doğru bir araç ama YANLIŞ YERDE: tablo, neyi kıyasladığını
 * zaten bilen birinin aracı. Sayfanın ikinci ekranında kimse bunu bilmiyor,
 * ve tabloya bakan kişi ilk iş satır etiketlerini okuyup ızgarayı çözmek
 * zorunda kalıyordu.
 *
 * O yüzden bölüm ızgara olmaktan çıkıp bir KARAR AĞACI oldu:
 *
 *   [ karar kuralı ]        ← tek cümle, en üstte, dipnot değil başlangıç
 *          │
 *      ┌───┴───┐            ← kural iki dala ayrılıyor, çizgiler aşağı iniyor
 *   [ kart ]  [ kart ]      ← dalların indiği yer: iki seçenek, iki karakter
 *
 * Bunun tabloya göre üç kazancı var:
 *
 * 1) KURAL SEBEP OLUYOR, DİPNOT OLMUYOR. Tabloda kural başlığın yanında bir
 *    kutuydu ve tablonun dışındaydı; okuyan kişi önce ızgarayı çözüp sonra
 *    kurala dönüyordu. Burada kural fiziksel olarak kartların ÜSTÜNDE ve
 *    çizgilerle onlara bağlı. Kartlar kuralın sonucu gibi duruyor, çünkü
 *    öyleler. Çatal süs değil: iki kolun bittiği yer, o kolun cevabı.
 *
 * 2) İKİ SÜTUN DEĞİL, İKİ KARAKTER. Tabloda her satır iki hücreyi aynı
 *    cümleyi söylemeye zorluyordu ("kime satarsınız" satırında iki hücre,
 *    "tipik iş modeli" satırında iki hücre...). Veri buna uygun değil: iki
 *    seçeneğin fit maddeleri birebir örtüşmüyor, watch cümleleri farklı
 *    şeylerden bahsediyor. Zorlama hizalama, olmayan bir simetri iddia
 *    ediyordu. Kart, her seçeneğin kendi uzunluğunda konuşmasına izin veriyor;
 *    ızgara `align-items: start` olduğu için biri açıldığında öteki uzamıyor —
 *    iki kart birbirine bağlı değil.
 *
 * 3) MÜŞTERİNİN ÖZLEDİĞİ ÇERÇEVE GERİ GELDİ. Bu bölümün en ilk hâli iki
 *    seçeneği iki kartta, altlarında "kimler için" listesiyle veriyordu.
 *    O çerçeve korundu; düzeltilen şey o sürümün gerçek kusuruydu: her iki
 *    kartın tamamı aynı anda açıktı ve solda sekmeyle değişen bir bölge
 *    haritası vardı, yani ziyaretçi seçim yapmadan hiçbir şey göremiyordu.
 *    Burada kapalı hâl dört şeyden ibaret (çizim, isim, tek cümle, dikkat
 *    satırı), listeler tek bir düğmenin arkasında ve düğme KART BAŞINA —
 *    kendi yolunu bulan kişi ötekini açmak zorunda kalmıyor.
 *
 * ÇİZİMLER — VE İÇLERİNDEKİ HAREKET
 * İki şema birbirinin aynası: aynı viewBox, aynı BAE dikdörtgeni, aynı üç
 * düğüm (şirketiniz / BAE içindeki alıcı / BAE dışındaki alıcı). Değişen tek
 * şey MAVİNİN NEREDE OLDUĞU. Mavi burada tek bir şey demek: serbestçe
 * satabildiğiniz saha.
 *
 * HAREKET BU TURDA DEĞİŞTİ — YÜKLENİŞTEN YAŞAMAYA.
 * Eskiden tek bir hareket vardı: ana ok görüş alanına girince bir kez
 * çiziliyordu (motion.path + pathLength) ve sonra sonsuza kadar duruyordu.
 * Müşterinin bu turdaki isteği bunun tam tersi:
 *   "şuan stabil duruyorlar ya nefes alan canlı bir animasyon olsun, satış
 *    yaptığını hissettiren bir şeyler gidebilir bae dışına çekilen okla fln
 *    … mesela s3 vardı orda okun çizgili kısmı hareket ediyordu."
 * ve genel ilke olarak: "sadece yükleniş animasyonu değil ekranda olduğu süre
 * boyunca bir şeyler yapmalı."
 *
 * O yüzden bir kerelik çizim KALDIRILDI, yerine bölümün kendi cümlesini
 * tekrarlayan sürekli bir döngü kondu — SATIŞIN KENDİSİ:
 *   · Ana okun üzerinde tek bir "sevkiyat" tanesi şirketten çıkıp alıcıya
 *     gidiyor.
 *     Serbest bölge kartında bu yol BAE dikdörtgenini kesip dışarı çıkıyor;
 *     mainland kartında sınırın içinde kalıp dükkâna iniyor. Yani hareketin
 *     kendisi kuralı söylüyor: kararı satışın gittiği taraf veriyor.
 *   · Vardığı anda hedef düğümün etrafında bir halka açılıp sönüyor: satış
 *     düştü. Sonra ~2 saniye sessizlik, sonra bir sonraki satış.
 * Ritim bilerek yavaş; bu bir yükleme çubuğu değil, arka planda dönen bir iş.
 *
 * Hareket TAMAMEN CSS (css/structures.css · .ysc-flow / .ysc-hit). Ne motion
 * ne useReducedMotion: bu depoda useReducedMotion beş ayrı kalıpta hidrasyon
 * hatası çıkardı, ve saf CSS olunca aynı döngü sunucuda basılan işaretlemeyle
 * birebir eşleşiyor. reduce açıkken iki öge de hiç basılmıyor (display:none)
 * ve geriye bu bölümün bugüne kadarki onaylanmış duruş karesi kalıyor: düz
 * ok, ok başı, kesik soluk alternatif yol. Yani duruş karesi eksik bir şey
 * değil, tasarımın kendisi.
 *   · Serbest bölge → mavi, ülkenin içindeki çitli alanınızda başlıyor ve
 *     sınırı aşıp dışarı gidiyor. İç pazara giden bağ kesik ve soluk.
 *   · Mainland     → mavi ülkenin tamamını dolduruyor, ok sınırın içinde
 *     kalıyor. Dışarı giden bağ kesik ve soluk.
 * Kesik soluk bağ tesadüf değil: her iki kartın `watch` cümlesinin özünü
 * çiziyor. Yani "dikkat" yazısı okunmadan önce bile kısıt ekranda duruyor.
 *
 * Şemaların kalemi .gv2-* sınıflarından ödünç — sitedeki diğer bütün şemalar
 * o paletle çizildi, burada yeni bir görsel dil açmıyoruz. Yalnızca bu bölüme
 * özgü iki dolgu (.ysc-fr, .ysc-dim) yerel, çünkü şemalar --paper bir bandın
 * üstünde duruyor ve --border çizgisi o zeminde kayboluyordu.
 *
 * AD ALANI
 * Sınıflar .ysc-*. Aynı tasarım /lab/yapi altında S1 adayı olarak .scer-*
 * sınıflarıyla yaşamaya devam ediyor (üç aday da orada kalıyor, nihai kararı
 * müşteri kendi tarafına bıraktı). İki kopya bilerek ayrı ad alanında: lab
 * dosyası ileride kurcalanırsa canlı bölüm etkilenmesin, canlıda yapılan bir
 * ölçü düzeltmesi de lab'daki karşılaştırmayı bozmasın.
 *
 * İDDİA SINIRI
 * Tek satır yeni içerik yok; ekranda görünen her cümle countryContent'ten
 * geliyor. Kartların üstündeki "BAE dışına satıyorsanız / BAE içine
 * satıyorsanız" etiketleri data.rule cümlesinin kendi ifadesi ("Kararı satış
 * yaptığınız taraf veriyor"), yeni bir ölçüt değil. Süre, banka onayı ve
 * vergi hakkında burada hiçbir taahhüt yok.
 */

/* Tek kalan motion kullanımı açılan listenin yüksekliği. Şemalardaki hareket
   bu turda CSS'e geçtiği için görüş-alanı sabiti (VIEW) buradan kalktı. */
const EASE = [0.22, 1, 0.36, 1] as const;

/* Kartların üst etiketi ve ikonu. Sıra data.options ile aynı olmak zorunda:
   0 = serbest bölge, 1 = mainland. Bileşen zaten yalnızca Dubai'de çalışıyor
   (structures başka ülkede tanımlı değil, sayfa da `c.structures &&` ile
   basıyor), o yüzden bu eşleşme veriye ait bir varsayım değil, bu sunuma ait
   bir karar. Dizi kısa kalırsa etiket hiç basılmıyor — kart yine ayakta.

   İkonlar şemalardaki hedef düğümlerin birebir aynısı: dünya = BAE dışındaki
   alıcı, dükkân = BAE içindeki alıcı. Etiketteki glif ile çizimdeki glif aynı
   olunca, etiket çizimin altyazısı gibi okunuyor ve ikisini birbirine
   bağlamak için fazladan bir cümle kurmak gerekmiyor. */
const BRANCHES = [
  { when: "BAE dışına satıyorsanız", Icon: Globe },
  { when: "BAE içine satıyorsanız", Icon: Store },
];

/* ---- şemalar ----
   Ortak geometri. İki çizim aynı sayıları kullanıyor; yan yana durduklarında
   göz iki ayrı resmi çözmesin, yalnız değişen şeyi görsün diye. Panoramik
   oran (480x132) bilerek seçildi: kart bandının tam genişliğini kaplayınca
   çizim "kartın içindeki küçük ikon" değil "kartın kapak resmi" oluyor, ve
   146px'lik bir bantla bunu yapabiliyor. Kare bir viewBox aynı genişlikte
   400px yükseklik isterdi. */
const VB = "0 0 480 132";

/** ok başı — sitedeki diğer şemalardaki ArrowR ile aynı biçim, bu ölçeğe göre */
function Arrow({ x, y, blue }: { x: number; y: number; blue?: boolean }) {
  return (
    <path
      d={`M${x} ${y - 6} L${x + 8.5} ${y} L${x} ${y + 6} Z`}
      className={blue ? "gv2-ah gv2-ah-b" : "gv2-ah"}
    />
  );
}

/** Ana yön + üzerinde giden satış.
 *
 *  İki öge, aynı `d`, aynı 7.3 saniyelik döngü:
 *   1. YOL — düz, kalın, mavi. Hiç oynamıyor; şemanın "asıl olan" çizgisi.
 *   2. SEVKİYAT — yolun üstünde kayan tek bir tane. pathLength={1} sayesinde
 *      kesik deseni yolun GERÇEK uzunluğundan bağımsız: iki kartın okları çok
 *      farklı uzunlukta (serbest bölge ~240 birim, mainland ~62) ama ikisi de
 *      yolunun %14'ü kadar bir parçayı aynı sürede baştan sona taşıyor. Yüzde
 *      kullanılmasaydı kısa okta parça devasa, uzun okta nokta kalırdı.
 *
 *  Sevkiyat non-scaling-stroke'un DIŞINDA tutuluyor (css'te
 *  `.ysc-fig > path:not(.ysc-flow)`): o özellik açıkken stroke-dasharray
 *  kullanıcı birimi yerine cihaz pikseliyle yorumlanıyor, yani kesik deseni
 *  ekran genişliğiyle birlikte kayardı ve pathLength'in getirdiği kesinlik
 *  boşa giderdi. Bedeli, parçanın kalınlığının ölçekle değişmesi — kabul
 *  edildi, ölçüsü CSS'te yazılı.
 *
 *  Ok başı sevkiyattan SONRA çiziliyor: tane ucun üstünden geçerken onu
 *  örtmesin. */
function Beam({ d }: { d: string }) {
  return (
    <>
      <path d={d} className="gv2-line-b ysc-beam" />
      <path d={d} pathLength={1} className="ysc-flow" />
    </>
  );
}

/** Serbest bölge: ülkenin içinde kendi çitiniz var, satış sınırın dışına. */
function FigFree() {
  return (
    <svg viewBox={VB} className="ysc-fig" data-fig="free" focusable="false" aria-hidden="true">
      {/* BAE — iki çizimde de aynı dikdörtgen, aynı yerde. Burada beyaz:
          ülkenin tamamı sizin sahanız değil. */}
      <rect x="16" y="12" width="272" height="108" rx="26" className="ysc-fr" />

      {/* serbest bölge: ülkenin içinde ama kendi sınırı olan alan. Kesik mavi
          çerçeve, "ayrı rejim" demenin en kısa yolu. */}
      <rect x="30" y="26" width="110" height="62" rx="18" className="gv2-box-b gv2-dash" />

      {/* şirketiniz */}
      <rect x="44" y="38" width="82" height="38" rx="12" className="gv2-chip-w" />
      <Building2 x={74} y={46} width={22} height={22} strokeWidth={2} className="gv2-ic-b" />

      {/* ana yön: iki sınırı da geçip dışarı */}
      <Beam d="M126 52 C 200 52, 240 44, 362 44" />
      <Arrow x={362} y={44} blue />
      <circle cx="402" cy="44" r="30" className="gv2-chip-w" />
      <Globe x={388} y={30} width={28} height={28} strokeWidth={1.9} className="gv2-ic-b" />
      {/* satış düştüğü an açılıp sönen halka. Düğümün üstüne çiziliyor ama
          içi boş, yani ikonu kapatmıyor; büyürken viewBox'ı taşmıyor
          (402+30*1.22 = 439 < 480). */}
      <circle cx="402" cy="44" r="30" className="ysc-hit" />

      {/* iç pazar aynı kolaylıkta değil: kesik ve soluk. watch cümlesinin özü,
          o cümle okunmadan önce de ekranda dursun diye. İki yol da şirketin
          aynı kenarından çıkıyor — fark yolun kendisinde, çıkış kapısında
          değil. */}
      <path d="M126 66 C 148 66, 150 84, 166 84" className="gv2-line gv2-dash gv2-faint" />
      <Arrow x={166} y={84} />
      <rect x="176" y="64" width="72" height="40" rx="14" className="ysc-dim" />
      <Store x={201} y={73} width={22} height={22} strokeWidth={2} className="gv2-ic-m" />
    </svg>
  );
}

/** Mainland: çerçevenin tamamı sizin sahanız, satış sınırın içinde. */
function FigMain() {
  return (
    <svg viewBox={VB} className="ysc-fig" data-fig="main" focusable="false" aria-hidden="true">
      {/* aynı dikdörtgen, bu kez baştan sona mavi: iç pazarın tamamı açık.
          Çitli alan yok — farkın kendisi bu, bir kutunun yokluğu. */}
      <rect x="16" y="12" width="272" height="108" rx="26" className="gv2-box-b" />

      <rect x="44" y="38" width="82" height="38" rx="12" className="gv2-chip-w" />
      <Building2 x={74} y={46} width={22} height={22} strokeWidth={2} className="gv2-ic-b" />

      {/* ana yön: sınırın içinde kalıyor */}
      <Beam d="M126 66 C 148 66, 150 84, 166 84" />
      <Arrow x={166} y={84} blue />
      <rect x="176" y="64" width="72" height="40" rx="14" className="gv2-chip-w" />
      <Store x={201} y={73} width={22} height={22} strokeWidth={2} className="gv2-ic-b" />
      {/* aynı halka, bu kez iç pazardaki alıcının etrafında. Serbest bölge
          kartıyla yarım periyot kaydırılıyor (CSS, [data-fig="main"]) — iki
          kart aynı anda "satış yaptı" demesin, sahne ikili bir nabız gibi
          değil sürekli bir iş gibi okunsun. */}
      <rect x="176" y="64" width="72" height="40" rx="14" className="ysc-hit" />

      {/* dışarısı kapalı değil, ama bu yapıyı kurma sebebiniz o değil */}
      <path d="M126 52 C 200 52, 240 44, 362 44" className="gv2-line gv2-dash gv2-faint" />
      <Arrow x={362} y={44} />
      <circle cx="402" cy="44" r="30" className="ysc-dim" />
      <Globe x={388} y={30} width={28} height={28} strokeWidth={1.9} className="gv2-ic-m" />
    </svg>
  );
}

/* BRANCHES ile aynı sıra sözleşmesi: 0 = serbest bölge, 1 = mainland. */
const FIGS = [FigFree, FigMain];

export default function CountryStructures({
  data,
}: {
  data: NonNullable<CountryContent["structures"]>;
}) {
  /* Açık olan kartların indeksi. Dizi, tek sayı değil: iki kart birbirinden
     bağımsız açılıyor. Akordeon (biri açılınca öteki kapanır) bilerek
     yapılmadı — ziyaretçi iki listeyi yan yana görmek isterse engellemenin
     bir gerekçesi yok, ve akordeon kapanan kartın altındaki içeriği
     zıplatıyor. */
  const [open, setOpen] = useState<number[]>([]);
  const reduce = useReducedMotion() ?? false;
  const uid = useId();

  const toggle = (i: number) =>
    setOpen((prev) => (prev.includes(i) ? prev.filter((n) => n !== i) : [...prev, i]));

  return (
    <section id="yapi" className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="sec-head">
          {/* BAŞLIK VERİDEN GELİYOR, BURADA KIRPILMIYOR.
              Müşteri başlığın yalnızca "Önce yapıyı seçiyoruz:" olmasını
              istedi: "zaten altta konuyu veriyoruz 30 kez serbest bölge
              mainland yazmamıza gerek yok yani." — iki seçeneğin adı kartların
              üstünde zaten yazıyor.

              Düzeltme countryContent.structures.title'da yapılıyor, bileşende
              değil. Burada `data.title.split(":")[0]` gibi bir kırpma yazmak
              kırılgan olurdu: veri düzelince kırpma sessizce yanlış çalışır ve
              başlığı ikinci kez budar.

              accent BU YÜZDEN "yapıyı seçiyoruz:" — hem eski uzun başlıkta hem
              yeni kısa başlıkta geçen tek parça, yani veri hangi hâldeyse
              vurgu doğru yerde kalıyor. SplitWords accent'i bulamazsa vurgusuz
              basar, patlamaz; ama bu iki hâlde de buluyor. */}
          <SplitWords
            as="h2"
            text={data.title}
            accent="yapıyı seçiyoruz:"
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.2}>
            <p className="sec-lead">{data.lead}</p>
          </FadeUp>
        </div>

        {/* ---- kural ----
            Bölümün ilk hareketi. Tam genişlikte, mavi zeminde ve tek cümle:
            aşağıdaki iki kartın niye var olduğunu söyleyen şey bu. Kartlardan
            SONRA gelseydi bir uyarı, başlığın yanında dursaydı bir yan not
            olurdu; burada ise akışın kendisi. */}
        <FadeUp delay={0.26} className="ysc-rulew">
          <p className="ysc-rule">
            <span className="ysc-rule-k">
              <Split size={15} strokeWidth={2.3} aria-hidden="true" />
              Karar kuralı
            </span>
            <span className="ysc-rule-t">{data.rule}</span>
          </p>
        </FadeUp>

        {/* ---- çatal ----
            Kuraldan çıkıp iki kartın tam ortasına inen iki çizgi. Tamamen
            dekoratif değil: kolların bittiği x konumu kartların merkezine
            hizalı, yani "bu kural bu iki sonuca çıkıyor" cümlesini yerleşim
            söylüyor. Dar ekranda kartlar alt alta düştüğü için çatal tek bir
            gövdeye iniyor (CSS), çünkü orada iki kol da aynı yere işaret
            ederdi ve anlamsız bir çizim kalırdı. */}
        <div className="ysc-fork" aria-hidden="true">
          <span className="ysc-stem" />
          <span className="ysc-branch" data-i="0" />
          <span className="ysc-branch" data-i="1" />
        </div>

        <div className="ysc-cards">
          {data.options.map((o, idx) => {
            const branch = BRANCHES[idx];
            const Fig = FIGS[idx] ?? FigFree;
            const on = open.includes(idx);
            const panelId = `${uid}-fit-${idx}`;

            return (
              <FadeUp key={o.name} delay={0.34 + idx * 0.08} className="ysc-cardw">
                <article className="ysc-card">
                  <div className="ysc-band">
                    <Fig />
                  </div>

                  <div className="ysc-body">
                    {/* etiket + isim birlikte tek bir koşul cümlesi kuruyor:
                        "BAE dışına satıyorsanız → Serbest bölge". Kuralın
                        kartın kendi başlığına dönüşmüş hâli. */}
                    {branch && (
                      <p className="ysc-eyebrow">
                        <branch.Icon size={14} strokeWidth={2.3} aria-hidden="true" />
                        {branch.when}
                      </p>
                    )}
                    <h3 className="ysc-name">{o.name}</h3>
                    <p className="ysc-line">{o.line}</p>

                    {/* Tek kontrol, kart başına. "Bunu yapıyorsanız" etiketi
                        bölümün ilk sürümünden geliyor — müşterinin beğendiği
                        çerçevenin dili. Sağdaki sayaç kapalıyken bile arkada
                        ne kadar şey olduğunu söylüyor: kapalı bir düğmenin en
                        büyük riski boş olduğunun sanılması. */}
                    <button
                      type="button"
                      className="ysc-toggle"
                      aria-expanded={on}
                      aria-controls={on ? panelId : undefined}
                      onClick={() => toggle(idx)}
                    >
                      <ChevronDown size={15} strokeWidth={2.4} aria-hidden="true" />
                      <span className="ysc-toggle-l">Bunu yapıyorsanız</span>
                      <span className="ysc-toggle-n">{o.fit.length} madde</span>
                    </button>

                    <AnimatePresence initial={false}>
                      {on && (
                        <motion.div
                          key="fit"
                          id={panelId}
                          className="ysc-fitw"
                          initial={reduce ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.38, ease: EASE }}
                        >
                          <ul className="ysc-fit">
                            {o.fit.map((f) => (
                              <li key={f}>
                                <Check size={13} strokeWidth={3.2} aria-hidden="true" />
                                {f}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Dikkat satırı DÜĞMENİN ARKASINDA DEĞİL. Kartın kapalı
                        hâlinde de duruyor, çünkü bu bölümün dürüstlük noktası
                        burası: her iki yapının da bir bedeli var ve o bedeli
                        görmek için tıklamak gerekmemeli. Sakin bir satır
                        olarak yazıldı (küçük punto, nötr metin rengi, yalnız
                        glif amber) — pano gibi bağıran bir uyarı kutusu,
                        hero'dan sonraki ilk bölümde ziyaretçiyi geri iter. */}
                    <p className="ysc-watch">
                      <TriangleAlert size={14} strokeWidth={2.3} aria-hidden="true" />
                      <span>
                        <b>Dikkat —</b> {o.watch}
                      </span>
                    </p>
                  </div>
                </article>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
