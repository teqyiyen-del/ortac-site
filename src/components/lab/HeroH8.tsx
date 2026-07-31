"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Blocks } from "lucide-react";

/* ============================================================================
   DUBAI HERO KARTI — ADAY H8 · "İNŞA"

   ---------------------------------------------------------------- MUHAKEME

   1) BU SAYFAYA KİM GELİYOR?
   Türkiye'den, Dubai'de şirket kurmayı düşünen ama henüz karar vermemiş biri.
   Bu turda müşteri yönü zaten seçti: kart SÜRECİ anlatacak, sonucu değil.
   O yüzden buradaki soru "ne anlatalım" değil, "süreç nasıl anlatılırsa
   okunmadan hissedilir" sorusu.

   2) NEDEN LİSTE DEĞİL, TEK NESNE?
   Süreci anlatmanın refleks biçimi bir liste: numaralı adımlar, yanlarında
   birer satır açıklama. Sayfanın aşağısında (CountryProcess) zaten o var ve
   orada olması doğru — isteyen açıp yedi adımı gün gün okuyor. Aynı şeyin
   küçültülmüş bir kopyasını hero'ya koymak iki kez aynı şeyi söylemek,
   üstelik ikincisini kötü söylemek olurdu.

   Bir liste okunur; bir nesnenin tamamlanması İZLENİR. Buradaki kart bu
   yüzden adım saydırmıyor: ekranda tek bir şey var — boş bir kuruluş dosyası
   — ve her aşamada üstüne bir parça oturuyor. Ziyaretçi "beş adım varmış"
   diye düşünmüyor; "bir şey kuruluyor" diye görüyor. Kartın tamamı bu tek
   cümlenin görsel karşılığı.

   Adımların adı yine de gerekli, yoksa hareket dekor olur. Ama tam olarak
   BİR KELİME: İsim · Faaliyet · Yapı · Tescil · Lisans. Kelime tek başına
   soyut; yanına inen şekil onu somutlaştırıyor. İkisi birlikte bir satırlık
   açıklamanın işini görüyor, bir satırlık açıklama yazmadan.

   3) H5'TEN (YOL) FARKI NE?
   H5 aynı süreci MESAFE olarak çiziyor: iki durak sizin, aradaki yolu biz
   yürüyoruz. Konusu SAHİPLİK — "benden ne isteniyor". Bu kartın konusu ise
   BİRİKME — "boş bir şey nasıl bütün oluyor". H5'te ekranda hiçbir şey
   üretilmiyor, bir işaretçi ilerliyor; burada ekranda kalıcı bir nesne
   büyüyor ve geriye hiçbir şey kaybolmuyor. İkisi aynı süreci iki farklı
   duyguyla veriyor, biri ötekinin varyantı değil.

   H2'den alınan tek şey ÇİZİM DİLİ: soyut SVG belge tasvirleri, harfsiz,
   sahte damgasız. Müşterinin beğendiği kısım oydu. Mekanik tamamen başka:
   H2 üç BİTMİŞ nesneyi sırayla öne alıyordu (envanter), bu kart TEK nesneyi
   parça parça kuruyor (süreç).

   4) NEDEN LİSANS DOSYASI, NEDEN GÖKDELEN DEĞİL?
   "İnşa" denince ilk akla gelen şey bina; Dubai deyince gökdelen. İkisi de
   burada yanlış: hero'nun kendi arka planında zaten bir şehir silueti var
   (hero.css .phx-sky-*), yani kendimizi tekrar ederdik; üstelik bina bu işin
   METAFORU olurdu, karşılığı değil. Kuruluşta gerçekten inşa edilen şey bir
   dosya: isim rezerve ediliyor, faaliyet kodu ekleniyor, kuruluş tipi
   işleniyor, tescil numarası düşüyor, en sonunda lisans mühürleniyor.
   Ekrandaki nesne süreci temsil etmiyor, süreç TAM OLARAK bu.

   5) BEŞ AŞAMA — NEDEN YEDİ DEĞİL?
   countryContent.dubai.steps yedi adım. İlk beşi tek bir nesnenin —
   lisansın — üstünde toplanıyor; son ikisi (medical fitness + Emirates ID,
   GSM + banka) o dosyanın parçası değil, ondan sonra açılan ayrı işler.
   Onları da bu kağıda yapıştırmak hem çizimi yalan yapardı hem de kartı
   yeniden bir envantere çevirirdi. Alt satır bu yüzden nesneyi adıyla
   anıyor ("ticaret lisansı dosyası"): kart bütün süreci gösterdiğini
   söylemiyor, tek bir şeyin nasıl kurulduğunu gösteriyor. Yedi adımın
   tamamı bir ekran aşağıda, açılır hâlde duruyor.

   ---------------------------------------------------------------- TASARIM

   ÜÇ RENKLİ DURUM MAKİNESİ. Kağıdın üstündeki her parçanın üç hâli var ve
   renk bu üç hâlden başka hiçbir şey anlatmıyor:
     · BOŞ    kesik çizgili boş yuva (#2a2a2a) — "buraya bir şey gelecek"
     · ŞİMDİ  marka mavisi (#307fe2) — "şu an bu işleniyor"
     · OLDU   koyu mavi (#2f4a6b) — "yerine oturdu, bir daha kalkmıyor"
   Mavi alan büyüdükçe ilerleme okunuyor; sayı, yüzde ya da gün göstermeye
   gerek kalmıyor. Yuvaların silueti birbirinden farklı (uzun çubuk, üç etiket,
   köşe rozeti, numara kutusu, mühür) — böylece "aynı çubuk beş kez doldu"
   değil, "beş ayrı parça geldi" okunuyor.

   BEYAZ TEK YERDE. Kartta beyaz yüzey yalnızca son aşamada beliren mühür.
   Kıt olduğu için "bitti" demeye tek başına yetiyor; iki yerde kullanılsaydı
   ikisi de bir şey söylemezdi. Mührün inişi tek hızlı hareket (üstten basma),
   geri kalan her şey sakin — vurgu bir kez ve sonda.

   KOYU YÜZEYDE ALFA YOK. Kart #111111, kağıt #161616, yuva #191919, çizgiler
   #242424. Neredeyse siyah zeminde rgba katmanları aynı griye çıkıyor;
   kademeler opak hex olmak zorunda.

   DÖNGÜ VE GERİ SARMA. Kart bittiğinde başa dönüyor ama animasyon geri
   çalışmıyor: dolu dosya sönüyor, boş dosya beliriyor. Parçaların tek tek
   kalkması "geri adım" diye okunurdu (hero.css'te aynı ders yazılı); sönüp
   yeniden başlamak "sıradaki dosya" diye okunuyor.

   MOTOR JS'TE, HAREKET CSS'TE. Aşama bir React state; parçalar data-state
   alıyor, geçişleri CSS yapıyor. H5'teki gibi yüzdelik keyframe'lere
   bağlanmadı, çünkü orada geometri ile zamanlama birbirine kilitleniyor —
   bir satırın yüksekliği değişince bütün keyframe'ler elden geçiyor. Burada
   şeritteki bir parçaya basmak da aynı state'i değiştiriyor, yani merak eden
   sırayı beklemeden istediği aşamaya gidebiliyor.

   ---------------------------------------------------------------- SINIRLAR
   - Gün sayısı, tarih, fiyat, banka adı, banka onayı vaadi yok. Kart hiçbir
     yerde "ne kadar sürer" sorusuna cevap vermiyor; verdiği tek şey SIRA.
   - Mühür lisansın düzenlenmesini gösteriyor (otoritenin işi, gerçek), banka
     onayını değil. Kağıtta banka hiç yok.
   - Çizimlerde harf, numara, sahte resmî amblem yok — hepsi siluet.
   - Metin bütçesi: beş aşama kelimesi + bir alt satır = altı birim, ve
     ekranda aynı anda en fazla ikisi görünüyor.
   - <768px'te kart gizli; mobilde hero'yu metin taşıyor.
   ========================================================================= */

const EASE = [0.22, 1, 0.36, 1] as const;

/* Aşama süreleri. Boş dosya kısa duruyor (giriş animasyonu biterken ilk
   parça düşsün), ara aşamalar eşit, bitmiş hâl uzun: asıl görülmesi gereken
   kare o. Toplam döngü ~14 sn — hero'da sürekli dönen bir şey için sakin
   sayılacak alt sınır; daha hızlısı göz köşesinde kıpırtı oluyor. */
const T_EMPTY = 1100;
const T_STEP = 2100;
const T_FULL = 4200;
/* Sönme + boş dosyanın geri gelmesi. İkinci sayı birincisinden 60ms büyük:
   state sıfırlanırken kart hâlâ görünmez, yani boş yuvalar "belirdi" gibi
   değil "zaten oradaydı" gibi geliyor. */
const T_FADE = 380;
const T_BACK = 440;

type Stage = {
  key: string;
  /* aşamanın tek kelimesi — kartın değişen tek metni */
  word: string;
  /* mühür kendi hareketine sahip: yukarıdan basıyor, ötekiler kayarak geliyor */
  stamp?: boolean;
  /* boş yuva: parçanın silueti, kesik çizgiyle. Şekiller çıplak; renkleri
     tek yerden, lab-h8.css'teki .insa-slot kuralı veriyor. */
  slot: React.ReactNode;
  /* yerine oturan parça. insa-k = ana yüzey, insa-s = ikincil, insa-c =
     kağıt rengiyle oyulmuş boşluk (etiket üstündeki yazı yerine geçiyor). */
  ink: React.ReactNode;
};

/* Bütün geometri tek koordinat sisteminde: viewBox 480×284, kağıt payı 26px.
   Parçalar üst üste binmiyor, aralarındaki boşluklar elle dengelendi. */
const STAGES: Stage[] = [
  {
    key: "isim",
    word: "İsim",
    /* Kağıdın en büyük tek çubuğu, en üstte: bir belgede şirket adının
       durduğu yer. İlk gelen parçanın en büyük parça olması kasıtlı —
       hareket başladığı anda fark ediliyor. */
    slot: (
      <>
        <rect x="26" y="94" width="262" height="20" rx="10" />
        <rect x="26" y="124" width="158" height="11" rx="5.5" />
      </>
    ),
    ink: (
      <>
        <rect className="insa-k" x="26" y="94" width="262" height="20" rx="10" />
        <rect className="insa-s" x="26" y="124" width="158" height="11" rx="5.5" />
      </>
    ),
  },
  {
    key: "faaliyet",
    word: "Faaliyet",
    /* Üç etiket: faaliyet kodları. Çoğul ve küçük olmaları bilinçli — tek
       büyük çubuk olsalardı isim satırının tekrarı gibi dururdu. */
    slot: (
      <>
        <rect x="26" y="152" width="92" height="26" rx="8" />
        <rect x="128" y="152" width="112" height="26" rx="8" />
        <rect x="250" y="152" width="74" height="26" rx="8" />
      </>
    ),
    ink: (
      <>
        <rect className="insa-k" x="26" y="152" width="92" height="26" rx="8" />
        <rect className="insa-k" x="128" y="152" width="112" height="26" rx="8" />
        <rect className="insa-k" x="250" y="152" width="74" height="26" rx="8" />
        <rect className="insa-c" x="40" y="161" width="64" height="8" rx="4" />
        <rect className="insa-c" x="142" y="161" width="84" height="8" rx="4" />
        <rect className="insa-c" x="264" y="161" width="46" height="8" rx="4" />
      </>
    ),
  },
  {
    key: "yapi",
    word: "Yapı",
    /* Sağ üst köşe rozeti: belgelerde sınıf/tür damgasının durduğu yer.
       Serbest bölge mi mainland mi kararı kağıdın kimliğini değiştiriyor,
       o yüzden gövdede değil başlık hizasında duruyor. */
    slot: <rect x="354" y="94" width="100" height="30" rx="15" />,
    ink: (
      <>
        <rect className="insa-k" x="354" y="94" width="100" height="30" rx="15" />
        <rect className="insa-c" x="370" y="104.5" width="68" height="9" rx="4.5" />
      </>
    ),
  },
  {
    key: "tescil",
    word: "Tescil",
    /* Numara kutusu: altı hane, ortada ayraç boşluğu. Haneler boş kalıyor
       (harf/rakam yok) — uydurma bir tescil numarası yazmak sahte belge
       üretmek olurdu; siluet yeterli. */
    slot: <rect x="26" y="194" width="200" height="66" rx="12" />,
    ink: (
      <>
        <rect className="insa-w" x="26" y="194" width="200" height="66" rx="12" />
        <rect className="insa-s" x="44" y="206" width="44" height="6" rx="3" />
        <rect className="insa-k" x="44" y="220" width="20" height="26" rx="5" />
        <rect className="insa-k" x="71" y="220" width="20" height="26" rx="5" />
        <rect className="insa-k" x="98" y="220" width="20" height="26" rx="5" />
        <rect className="insa-k" x="134" y="220" width="20" height="26" rx="5" />
        <rect className="insa-k" x="161" y="220" width="20" height="26" rx="5" />
        <rect className="insa-k" x="188" y="220" width="20" height="26" rx="5" />
      </>
    ),
  },
  {
    key: "lisans",
    word: "Lisans",
    stamp: true,
    /* Kartın tek beyaz yüzeyi ve tek hızlı hareketi. Halka + disk + tik:
       mühür, kurum amblemi değil. Otoritenin lisansı düzenlemesi gerçek bir
       olay; banka onayıyla ilgisi yok, kağıtta banka da yok. */
    slot: <circle cx="390" cy="212" r="40" />,
    ink: (
      <>
        <circle className="insa-ring" cx="390" cy="212" r="39" />
        <circle className="insa-disc" cx="390" cy="212" r="30" />
        <path className="insa-tick" d="M377 212.5 l8.6 8.6 L403.4 202" />
      </>
    ),
  },
];

const TOTAL = STAGES.length;

export default function HeroH8() {
  const reduced = useReducedMotion() ?? false;

  /* Yerine oturmuş parça sayısı. 0 = boş dosya (kartın açılış karesi),
     TOTAL = tamamlanmış dosya. Sunucu ve ilk istemci render'ı aynı olsun
     diye burada reduced'a bakılmıyor; o düzeltme aşağıda, effect içinde. */
  const [placed, setPlaced] = useState(0);
  /* Sönme evresi. Ayrı bir bayrak, çünkü sönerken state hâlâ "dolu" —
     kart görünmezken sıfırlanıyor, ziyaretçi geri sarma görmüyor. */
  const [fading, setFading] = useState(false);
  /* Fare kartın üstündeyken durdurma geçici; bir aşamaya basmak kalıcı.
     Basmak "ben seçiyorum" demek, iki saniye sonra kartın seçimi geri
     alması kullanıcının kararını çöpe atar. */
  const [hovered, setHovered] = useState(false);
  const [taken, setTaken] = useState(false);

  useEffect(() => {
    if (hovered || taken || fading) return;

    /* HAREKET KAPALIYSA aşamalar tek tek oynamıyor, kart ilk karede bitmiş
       hâle atlıyor: hareketsiz hâl eksik bir kare değil, tamamlanmış dosya.
       Sıfır gecikmeli zamanlayıcı gereksiz görünüyor ama iki işi birden
       yapıyor. Bir: setPlaced effect GÖVDESİNDE değil zamanlayıcının içinde
       çağrılıyor, yani zincirleme render uyarısına düşmüyor. İki: ilk render
       her iki tarafta da boş dosya oluyor — useReducedMotion sunucuda null,
       istemcide gerçek değeri döndürdüğü için işaretlemeyi doğrudan ona
       bağlarsak hydration ayrışır. */
    if (reduced) {
      if (placed === TOTAL) return;
      const jump = window.setTimeout(() => setPlaced(TOTAL), 0);
      return () => window.clearTimeout(jump);
    }

    const wait = placed === 0 ? T_EMPTY : placed === TOTAL ? T_FULL : T_STEP;
    const id = window.setTimeout(() => {
      if (placed === TOTAL) setFading(true);
      else setPlaced((v) => v + 1);
    }, wait);
    return () => window.clearTimeout(id);
  }, [placed, reduced, hovered, taken, fading]);

  useEffect(() => {
    if (!fading) return;
    const a = window.setTimeout(() => setPlaced(0), T_FADE);
    const b = window.setTimeout(() => setFading(false), T_BACK);
    return () => {
      window.clearTimeout(a);
      window.clearTimeout(b);
    };
  }, [fading]);

  const pick = useCallback((n: number) => {
    setPlaced(n);
    setFading(false);
    setTaken(true);
  }, []);

  const t = (v: number) => (reduced ? 0 : v);
  const done = placed >= TOTAL;

  return (
    <motion.div
      className="insa"
      data-fade={fading}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: t(0.7), delay: t(0.2), ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <div className="insa-canvas">
        <svg
          className="insa-svg"
          viewBox="0 0 480 284"
          data-full={done}
          aria-hidden="true"
          focusable="false"
        >
          {/* kağıdın kendisi — bitince kenarı maviye dönüyor: "bütün oldu" */}
          <rect
            className="insa-sheet"
            x="0.75"
            y="0.75"
            width="478.5"
            height="282.5"
            rx="15"
          />

          {/* Antet. Aşamalardan bağımsız, hep orada: boş dosya "hiçlik" değil,
              doldurulmayı bekleyen resmî bir form. Amblem soyut bir halka —
              gerçek bir kurumun işaretine benzemesin diye. */}
          <rect
            x="26"
            y="24"
            width="32"
            height="32"
            rx="9"
            fill="#1d1d1d"
            stroke="#272727"
          />
          <circle
            cx="42"
            cy="40"
            r="7"
            fill="none"
            stroke="#33507a"
            strokeWidth="2"
          />
          <circle cx="42" cy="40" r="2.4" fill="#33507a" />
          <rect x="68" y="30" width="104" height="9" rx="4.5" fill="#242424" />
          <rect x="68" y="45.5" width="70" height="7" rx="3.5" fill="#1f1f1f" />
          <rect x="26" y="74" width="428" height="1.25" fill="#212121" />

          {STAGES.map((s, i) => (
            <g
              key={s.key}
              className={s.stamp ? "insa-p insa-stamp" : "insa-p"}
              data-state={
                placed > i + 1 ? "done" : placed === i + 1 ? "now" : "empty"
              }
            >
              <g className="insa-slot">{s.slot}</g>
              <g className="insa-ink">{s.ink}</g>
            </g>
          ))}
        </svg>
      </div>

      {/* Değişen tek metin, ve nerede olduğumuz. Kelimeler üst üste duruyor
          (mutlak konum), yoksa "Faaliyet" → "Yapı" geçişinde kart genişliği
          oynuyor. Şerit hem ilerleme hem de kumanda: basan istediği aşamayı
          açıyor, basmayan zaten sırayla hepsini görüyor. */}
      <div className="insa-rail">
        <div className="insa-words">
          {STAGES.map((s, i) => (
            <span key={s.key} className="insa-word" data-on={placed === i + 1}>
              {s.word}
            </span>
          ))}
        </div>

        <div className="insa-steps">
          {STAGES.map((s, i) => (
            <button
              key={s.key}
              type="button"
              className="insa-step"
              data-state={
                placed > i + 1 ? "done" : placed === i + 1 ? "now" : "empty"
              }
              aria-pressed={placed === i + 1}
              aria-label={`${s.word} aşaması`}
              onClick={() => pick(i + 1)}
            >
              <i aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>

      <p className="insa-foot">
        <Blocks size={14} strokeWidth={2} aria-hidden="true" />
        <span>Ticaret lisansı dosyası. Her aşamada bir parça yerine oturuyor.</span>
      </p>
    </motion.div>
  );
}
