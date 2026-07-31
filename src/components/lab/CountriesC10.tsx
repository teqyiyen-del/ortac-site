"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  IdCard,
  Languages,
  Laptop,
  TriangleAlert,
  X,
  type LucideIcon,
} from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import SmartLink from "@/components/shared/SmartLink";
import { Flag } from "@/components/shared/CountryPicker";
import {
  COUNTRY_NAME,
  COUNTRY_ORDER,
  FACTS,
  PAY_MATRIX,
  type CountrySlug,
} from "@/lib/brand";

/* ============================================================================
   ADAY C10 — "tek şerit"

   FİKİR TEK CÜMLEYLE
   Bölüm tek bir yatay şerit: üç ülke yan yana, aralarında saç teli ayırıcılar,
   her ülkenin adının altında iki ikonlu satır ve altlarında o ülkenin dürüst
   kısıtı. Bir ülkeye tıklandığında AYNI şeridin alt yarısı açılıyor — yeni bir
   kutu belirmiyor, sayfa değişmiyor, şerit uzuyor.

   NEDEN ŞERİT, NEDEN KART DEĞİL
   Bu turda dört adayın hepsi üç ülkeyi üç ayrı nesne olarak kurdu: üç kart, üç
   panel, üç sütun. Üç nesne yan yana durduğunda göz önce nesneleri, sonra
   içeriklerini okuyor — yani kıyas ikinci adımda başlıyor. Burada nesne bir
   tane: kenarlığı olan tek bir beyaz şerit. Ülkeler o şeridin bölmeleri.
   Bölmeler arasında gölge, köşe yarıçapı, boşluk yok; yalnızca 1 piksellik
   çizgi var. Böylece göz üç ayrı şeye değil, tek bir cetvele bakıyor ve
   satırlar (ad · özellik · özellik · kısıt) kendiliğinden hizalı okunuyor.
   Bu "kalabalık yok" isteğinin biçimsel karşılığı: eleman sayısını değil,
   NESNE sayısını düşürmek.

   HİZA NEDEN SUBGRID İLE
   Şeridin işe yaraması hizaya bağlı: üç bölmedeki "kartla tahsilat" satırı ve
   üç kısıt çizgisi aynı yükseklikte olmazsa cetvel bozulur ve tekrar üç karta
   dönüşür. Ama bölmenin tamamı TEK bir düğme (ülkenin her yerine tıklanabilsin
   diye), yani içerideki satırları ayrı ayrı ızgaraya sokamıyorum. Çözüm CSS
   subgrid: düğme dış ızgaranın üç satırını miras alıyor, üç düğmenin içindeki
   satırlar aynı hatlara oturuyor. Desteklenmeyen tarayıcıda "subgrid" geçersiz
   bir değer olduğu için satırlar auto'ya düşüyor — hiza dar ekranda birkaç
   piksel kayabilir, başka hiçbir şey bozulmaz.

   KAPALIYKEN NEDEN ZATEN KIYAS
   Üç bölmede aynı sırayla üç şey var ve ikisi üç ülkede de AYNI eksen:
     1. ülkenin kendi ayırt edici özelliği (ikonu değişiyor — bu kimlik satırı)
     2. kartla tahsilat: PAY_MATRIX'ten türüyor, iki yeşil bir kırmızı
     3. dürüst kısıt: FACTS[c].limit, üçü yan yana
   İkinci satır bölümün en keskin verisi ve hiçbir şeye dokunmadan görünüyor:
   KKTC'nin çarpısı gizlenmiyor, kıyasın ortasında duruyor. Üçüncü satır ise
   bu bölümde ilk kez kapalı hâlde: canlı bölümde kısıtı görmek için kartı
   açmak, /ulkeler tablosunda en alta inmek gerekiyor. Üç kısıt yan yana
   okunduğunda "hepsinin bir bedeli var" cümlesi kuruluyor ve bu, üç ayrı
   uyarı kutusundan hem daha kısa hem daha dürüst.

   KISIT NEDEN AMBER KUTU DEĞİL
   Renk üç kez tekrarlanınca uyarı olmaktan çıkıp desen oluyor. Kutuyu attım,
   uyarıyı üçgene bıraktım: üçgen amber, metin gri, arka plan yok. Aynı karar
   canlı bölümde de verilmişti (ThreeCountries'te amber şerit bilerek
   kaldırıldı); burada metin duruyor, ağırlığı gitmiş.

   AÇILAN PANELDE NE VAR, NE YOK
   Panel tekrar değil devam: şeritte olmayan beş kalem. Kim için, yapı, maliyet
   sırası, banka hesabı, ödeme kuruluşu. Şeritteki üç satırın hiçbiri panelde
   ikinci kez yazılmıyor — açınca aynı şeyi tekrar okumak, açmanın bedava
   olduğu hissini bozar.

   MALİYET NEDEN RAKAMSIZ
   Bu bölümün baştan beri sözleşmesi "tutar fiyat bölümünde". Buraya üç rakam
   koymak fiyat tartışmasını bölümün ortasına taşır. Sıralama ise kıyasın
   istediği şeyin kendisi ve FACTS[c].from'dan türüyor — liste güncellenince
   sıra kendiliğinden düzeliyor, elle yazılmış tek kelime yok.

   İSTANBUL YOK
   Bölümde referans nokta yok. KKTC'nin yakınlık argümanı yalnızca kendi
   panelinde, FACTS.kktc.forWhom'un içinde ("Türkiye'ye yakın operasyon")
   duruyor; bölümün geneline bir merkez dayatmıyor.
   ========================================================================= */

const EASE = [0.22, 1, 0.36, 1] as const;

/* --------------------------------------------------------- kimlik satırı --- */
/* Ülke başına tek elle yazılmış cümle ve ona ait tek ikon. Üç kural:
   (1) üçünde de doğru olan bir şey yazılmaz — kuruluş, banka ve muhasebe zaten
       başlığın altında duruyor ve üç kez tekrarlanırsa ayırt etmiyor demektir;
   (2) taahhüt yok — Dubai'ninki "çıkabilen", "çıkar" değil (STANCE_LIMITS);
   (3) tek satır, çünkü üç bölmenin ikinci satırı bunun altına hizalanacak.
   İkonlar da ayırt edici: kimlik kartı (oturum), dizüstü (uzaktan), diller
   (Türkçe süreç). Aynı ikonu üç kez basmak satırı dekoratif hâle getirirdi. */
const EDGE: Record<CountrySlug, { i: LucideIcon; t: string }> = {
  dubai: { i: IdCard, t: "Oturum vizesi çıkabilen tek ülke" },
  ingiltere: { i: Laptop, t: "Baştan sona uzaktan kuruluş" },
  kktc: { i: Languages, t: "Süreç tamamen Türkçe" },
};

/* ------------------------------------------------------ PAY_MATRIX okuma --- */
function group(title: string) {
  return PAY_MATRIX.find((g) => g.title === title);
}

/** o ülkede gerçekten çalışan kanalların adları */
function worksIn(title: string, c: CountrySlug): string[] {
  return (
    group(title)
      ?.rows.filter((r) => r.cells[c] === "yes")
      .map((r) => r.name) ?? []
  );
}

/** o ülkede sağlayıcının açıkça desteklemediği kanallar ("none" değil, "no") */
function failsIn(title: string, c: CountrySlug): string[] {
  return (
    group(title)
      ?.rows.filter((r) => r.cells[c] === "no")
      .map((r) => r.name) ?? []
  );
}

/* Şeridin ikinci satırı. Marka adları elle yazılmıyor: KKTC'nin hangi kanalda
   takıldığını matris söylüyor, Stripe bir gün listesine KKTC'yi eklerse bu
   satır kendiliğinden yeşile döner. "desteklemiyor" öznesi sağlayıcı — biz
   sunmuyor değiliz, sağlayıcının ülke listesinde yok. */
function collect(c: CountrySlug): { ok: boolean; t: string } {
  const on = worksIn("Tahsilat", c);
  if (on.length) return { ok: true, t: on.join(", ") };
  return { ok: false, t: `${failsIn("Tahsilat", c).join(" ve ")} desteklemiyor` };
}

/* ------------------------------------------------------------- maliyet ---- */
/* Rakam değil sıra. Dizi FACTS[c].from'a göre kuruluyor, kelime de dizideki
   yerinden geliyor; ülke sayısı değişse bile bozulmuyor (kelime bitince "—"). */
const COST_WORD = ["en düşük", "ortada", "en yüksek"];
const COST_ORDER = [...COUNTRY_ORDER].sort((a, b) => FACTS[a].from - FACTS[b].from);

function costWord(c: CountrySlug): string {
  const w = COST_WORD[COST_ORDER.indexOf(c)];
  return w ? `Üç ülke içinde ${w}` : "—";
}

/* --------------------------------------------------------------- panel ---- */
/* Yalnızca şeritte OLMAYAN kalemler. Ödeme kuruluşunun "banka değildir"
   uyarısı ayrı bir dipnot bloğu olarak değil, grubun kendi hint'i olarak
   geliyor: metin zaten PAY_MATRIX'te duruyor, burada ikinci kopyası açılmıyor. */
function panelRows(c: CountrySlug) {
  return [
    { k: "Kim için", v: FACTS[c].forWhom, hint: undefined as string | undefined },
    { k: "Yapı", v: FACTS[c].structure, hint: undefined as string | undefined },
    {
      k: "Kuruluş maliyeti",
      v: costWord(c),
      hint: "Tutarlar fiyat bölümünde.",
    },
    {
      k: "Banka hesabı",
      v: worksIn("Banka hesabı", c).join(", ") || "Bu ülkede sunulmuyor",
      hint: group("Banka hesabı")?.hint,
    },
    {
      k: "Ödeme kuruluşu",
      v: worksIn("Ödeme kuruluşu", c).join(", ") || "Bu ülkede çalışan kanal yok",
      hint: group("Ödeme kuruluşu")?.hint,
    },
  ];
}

export default function CountriesC10() {
  /* null = hepsi kapalı. Bölümün gerçek boyu bu ve ziyaretçi bölümü ilk
     gördüğünde bu hâlde görüyor: üç ülke eşit ağırlıkta sunulacaksa hiçbiri
     önden açık olamaz (canlı bölüm Dubai açık başlıyor ve kapalı yüksekliğini
     hiç göstermiyor). Kapalı hâl boş da değil — üç satır kıyas orada. */
  const [open, setOpen] = useState<CountrySlug | null>(null);
  const reduce = useReducedMotion();

  /* Mavi çizginin hangi bölmenin altında duracağı. Kapanırken indeks
     korunuyor: çizgi yalnızca soluyor, bir kenara kayarak kaybolmuyor. */
  const [ink, setInk] = useState(0);

  const toggle = (c: CountrySlug) => {
    setInk(COUNTRY_ORDER.indexOf(c));
    setOpen((p) => (p === c ? null : c));
  };

  return (
    /* id="ulkeler" bilerek yok: adaylar /lab/ulkeler'de aynı sayfada duruyor ve
       çapayı ikinci kez basmak sayfada çift id demek. Kazanan aday canlıya
       taşınırken hem bu id'yi hem de eski bölümün #odeme-altyapisi çapasını
       (routes.ts onu canlı sayıyor) devralmak zorunda.
       Zemin --paper: şerit beyaz ve kenarlıklı, yani gri zeminin üstünde tek
       bir nesne olarak duruyor. Beyaz üstüne beyaz olsaydı kenarlık şeridi
       değil, üç bölmeyi çizmek zorunda kalırdı. */
    <section className="sec-pad" style={{ background: "var(--paper)" }}>
      <div className="container-o">
        <div className="sec-head">
          <SplitWords
            as="h2"
            text="Hizmet verdiğimiz bölgeler."
            accent="bölgeler."
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.2}>
            {/* Mekanizmayı söylüyor ama talimat vermiyor: "tıklayın" değil,
                "tıklayınca ne oluyor". Ziyaretçiye ödev veren bir satır bu
                bölümde zaten bir kez denendi ve geri alındı. */}
            <p className="sec-lead">
              Üç ülkede kuruluş, banka ve muhasebe. Üçü yan yana; ayrıntı, ülkeye
              tıklayınca aynı şeritte açılıyor.
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.16} className="c10-wrap">
          <div className="c10-board">
            {/* Şeridin üst yarısı: üç bölme. grid-template-rows üç satır
                tanımlıyor (kimlik · özellikler · kısıt) ve düğmeler bu üç
                satırı subgrid ile miras alıyor — hiza buradan geliyor.
                Dördüncü satır panelin, üç sütunu birden kaplıyor. */}
            <div className="c10-band">
              {COUNTRY_ORDER.map((c) => {
                const on = open === c;
                const Icon = EDGE[c].i;
                const pay = collect(c);

                return (
                  /* display:contents — bölmenin kendi kutusu yok, iki çocuğu
                     (düğme ve panel) doğrudan ızgaraya giriyor. Dar ekranda
                     lane gerçek bir bloğa dönüyor ve aynı işaretleme ülke ülke
                     alt alta iniyor; panel de kendi ülkesinin hemen altında
                     kalıyor. Tek işaretleme, iki yerleşim. */
                  <div key={c} className="c10-lane">
                    <button
                      type="button"
                      className="c10-trig"
                      data-on={on}
                      aria-expanded={on}
                      aria-controls={on ? `c10-p-${c}` : undefined}
                      onClick={() => toggle(c)}
                    >
                      <span className="c10-id">
                        <span className="c10-flag" aria-hidden="true">
                          <Flag country={c} />
                        </span>
                        <span className="c10-name">{COUNTRY_NAME[c]}</span>
                        <ChevronDown
                          className="c10-chev"
                          size={16}
                          strokeWidth={2.2}
                          aria-hidden="true"
                        />
                      </span>

                      <span className="c10-feats">
                        <span className="c10-feat">
                          <Icon size={15} strokeWidth={2} aria-hidden="true" />
                          {EDGE[c].t}
                        </span>
                        {/* Renk tek başına bilgi taşımıyor: yeşil onayın yanında
                            marka adları, kırmızı çarpının yanında "desteklemiyor"
                            kelimesi var. Ekran okuyucu için eksenin adı da
                            baştan söyleniyor, yoksa üç marka adı bağlamsız
                            okunuyordu. */}
                        <span className="c10-feat" data-v={pay.ok ? "yes" : "no"}>
                          {pay.ok ? (
                            <Check size={15} strokeWidth={2.5} aria-hidden="true" />
                          ) : (
                            <X size={15} strokeWidth={2.5} aria-hidden="true" />
                          )}
                          <span className="sr-only">Kartla tahsilat: </span>
                          {pay.t}
                          {pay.ok && <span className="sr-only"> çalışıyor</span>}
                        </span>
                      </span>

                      {/* Dürüst kısıt, kapalı hâlde. Düğmenin İÇİNDE duruyor:
                          bölmenin her yerine tıklanabilsin diye — dışarı
                          alsaydım şeridin alt üçte biri ölü alan olurdu. */}
                      <span className="c10-limit">
                        <TriangleAlert size={13} strokeWidth={2.1} aria-hidden="true" />
                        <span>
                          <span className="sr-only">Dürüst kısıt: </span>
                          {FACTS[c].limit}
                        </span>
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {on && (
                        /* Yerinde açılım, şeridin alt yarısı olarak. Panel
                           ızgaranın son satırı ve üç sütunu birden kaplıyor,
                           o yüzden hangi ülke açılırsa açılsın yatayda hiçbir
                           şey kımıldamıyor — sadece şerit uzuyor. Kapanınca
                           satır DOM'dan tamamen çıkıyor, boş yuva bırakmıyor. */
                        <motion.div
                          key="panel"
                          className="c10-panel"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: reduce ? 0 : 0.36, ease: EASE }}
                        >
                          <div
                            className="c10-panel-in"
                            id={`c10-p-${c}`}
                            role="group"
                            aria-label={`${COUNTRY_NAME[c]} ayrıntısı`}
                          >
                            {/* Panelin kendi kapatma düğmesi ve kendi başlığı
                                yok: açan düğme (ülkenin adı) hemen üstte, mavi
                                çizgisiyle işaretli duruyor. Bayrağı ve adı
                                ikinci kez basmak panelin ilk satırını
                                bilgisizleştirirdi. */}
                            <dl className="c10-facts">
                              {panelRows(c).map((r) => (
                                <div key={r.k}>
                                  <dt>{r.k}</dt>
                                  <dd>
                                    {r.v}
                                    {r.hint && <span>{r.hint}</span>}
                                  </dd>
                                </div>
                              ))}
                            </dl>

                            <SmartLink
                              href={`/${c}`}
                              className="btn btn-solid btn-sm c10-cta"
                            >
                              {COUNTRY_NAME[c]}&apos;de kuruluş
                              <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                            </SmartLink>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              {/* Açık bölmeyi işaretleyen mavi çizgi. Akıştan çıkmış tek bir
                  eleman: üç bölmeye üç ayrı çizgi koymak yerine bir çizgi
                  kayıyor, böylece ülke değiştirmek "kapandı, açıldı" değil
                  "kaydı" gibi okunuyor. Kayma CSS transition ile, JS layout
                  animasyonu yok; azaltılmış hareket tercihinde CSS'in kendi
                  media query'si transition'ı kapatıyor. */}
              <span
                className="c10-ink"
                aria-hidden="true"
                data-on={open !== null}
                style={{ "--c10-i": ink } as React.CSSProperties}
              />
            </div>
          </div>

          {/* Şeridin altındaki tek satır. İki cümle: bankaya dair taahhütsüzlük
              (STANCE_LIMITS'in birincisi) ve tutarların nerede olduğu. Kısıt
              notu burada yok, çünkü kısıtların kendisi şeridin içinde. */}
          <div className="c10-foot">
            <p>Hesabı banka açar; onay taahhüdü vermiyoruz. Tutarlar fiyat bölümünde.</p>
            <SmartLink href="/ulkeler" className="link-arrow c10-exit">
              Üç ülkeyi yan yana kıyaslayın
              <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
            </SmartLink>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
