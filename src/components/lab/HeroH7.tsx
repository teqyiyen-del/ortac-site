"use client";

import { useCallback, useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { MoveRight } from "lucide-react";

/* ============================================================================
   DUBAI HERO KARTI — ADAY H7 · "ŞERİT"

   ---------------------------------------------------------------- MUHAKEME

   1) BU SAYFAYA KİM GELİYOR?
   Türkiye'den, Dubai'de şirket kurmayı düşünen ama karar vermemiş biri.
   Reklamdan geldi, aklında "3 günde şirket" gibi bir cümle var. Kafasındaki
   engel fiyat değil — fiyatı aşağıda görecek. Engel şu: "kuruluş" onun
   zihninde tek parça, sınırı belirsiz bir kütle. İçinde ne olduğunu bilmiyor,
   o yüzden ne kadar süreceğini de kendi kafasında uyduruyor.

   2) ÜÇ SANİYEDE KART NE VERSİN?
   Bir SÜREKLİLİK hissi. Kuruluşun tek bir olay değil, birbirini kovalayan
   aşamalar dizisi olduğunu — ve o dizinin bir başı, bir sonu olduğunu. Zaman
   değil AKIŞ, çünkü zaman taahhüdü veremiyoruz (STANCE_LIMITS). Kartın
   verdiği duygu: "Bu iş duran bir yığın değil, işleyen bir hat."

   3) HANGİ SORUYU KAPATIYOR? AŞAĞIDA ZATEN VAR MI?
   Kapattığı soru: "Bu süreçte ne oluyor?"
   Sayfanın aşağısındaki CountryProcess yedi adımı gün gün, paragraf paragraf
   yazıyor. Yani cevap AŞAĞIDA VAR — ama okunması gereken bir metin olarak.
   Hero'nun işi o metnin özeti olmak değil, o metne İŞTAH açmak: ziyaretçi
   üç saniyede "burada sıralı bir iş akışı var ve tarif edilmiş" hissini
   alıyor, detayı isteyen aşağı iniyor. Müşterinin kendi cümlesi bu:
   "özet önde, detay talep üzerine".

   ---------------------------------------------------------------- TASARIM

   TEK ŞERİT. Aşamalar dikey bir liste değil, YATAY tek bir bandın üstünde
   duran kareler. Kart o bandın tamamını göstermiyor; bandın içinden geçtiği
   bir PENCERE. Şerit soldan sağa akıyor, kareler pencereden geçiyor.

   H5'TEN AYRILDIĞI YER — TERSİNE ÇEVRİLMİŞ HAREKET
   H5'te yol duruyor, ışık yürüyordu; ziyaretçi bütün durakları aynı anda
   görüyor ve sayabiliyordu. Burada tam tersi: ŞİMDİ duruyor (pencerenin
   %38'inde sabit duran beyaz nokta), SÜREÇ akıyor. Aşamaların hepsi aynı
   anda görünmüyor, o yüzden sayılamıyor da. Müşteri "boğmadan hissettirmek"
   dedi; saymak boğar, akış hissettirir.

   NEDEN SAYAÇ YOK ("3 / 6" gibi)
   Kart yedi gerçek adımı altı kareye sıkıştırıyor (ad + faaliyet + yapı
   seçimi tek karede). Ekrana bir toplam yazarsak aşağıdaki CountryProcess'in
   yedi satırıyla çelişir ve ziyaretçi hangisinin doğru olduğunu sorar.
   Sayı yerine YER kullanıyoruz: şeridin pencere içindeki konumu nerede
   olduğunuzu söylüyor.

   İLERLEME NEREDEN OKUNUYOR — BOŞLUĞUN YERİ
   Bu kartın en sessiz fikri bu. Şerit sonlu bir parça: iki ucu var.
     · Başta  → pencerenin SOL yarısı boş. "Daha yeni başlıyor."
     · Ortada → iki yan da dolu. "İçindeyiz."
     · Sonda  → pencerenin SAĞ yarısı boş, şeridin ucu görünüyor. "Bitti."
   Yani ilerleme çubuğunu boşluğun kendisi çiziyor. Buna ek olarak alt ray
   geçilen kısımda maviye dönüyor — birikim görünür, sıfırlanmıyor.

   KARELERİN İÇİ — H2'DEN GELEN DİL
   Müşteri H2'de "svg kartların, tasvirlerin olması"nı beğendi. Her aşamanın
   kendi minik tasviri var: üç ad adayı, mühür inen sözleşme, mühürlü lisans,
   kimlik + parmak izi, dosyadaki kesikli boş halka, ve varışta tabela.
   H2'den bir fark var: orada öndeki belge BEYAZ kağıttı. Burada bütün
   kareler koyu. Sebebi şeridin kendisi: pencereden sürekli akan beyaz
   dikdörtgenler kartı yanıp sönen bir panoya çevirirdi. Beyaz iki yerde
   kaldı — sabit "şimdi" noktası ve varış tabelası.

   AKTİF KARE OYNAR
   Kare pencerenin ortasına geldiğinde tasviri bir kez canlanıyor: mühür
   iniyor, tik çiziliyor, parmak izi halkaları sırayla beliriyor, banka
   dosyasındaki kesikli halka dönmeye başlıyor. Aşama "olurken" görünüyor.
   Karenin dışına çıkınca animasyon kalkıyor ve tasvir TAMAMLANMIŞ hâlinde
   kalıyor — geçmiş kareler bitmiş işler gibi duruyor, yarım değil.

   ---------------------------------------------------------------- SINIRLAR
   · Gün sayısı, fiyat, banka onayı vaadi YOK. Beşinci karenin alt satırı
     STANCE_LIMITS'in birinci maddesini aynen taşıyor: "Onay bankada."
     Çizim de bunu metinden önce söylüyor — ilk dört karede mühür/tik dolu,
     banka karesinde halka kesikli ve boş.
   · Üçüncü karenin sahibi bilerek yazılı: "Otorite düzenliyor". Takvimin
     bizde olmadığı yer burası (STANCE_LIMITS ikinci madde) ve saklamak
     yerine şeridin bir karesi olarak duruyor.
   · Dördüncü kare FACTS.dubai.limit ile aynı gerçek: "Bir kez BAE'de".
   · Aşama metinleri countryContent.dubai.steps'ten sıkıştırıldı, uydurulmadı.
   · AYNI ANDA GÖRÜNEN METİN 4 SATIR: üst etiket, aşama adı, aşama alt satırı,
     kartın alt cümlesi. Diğer beş aşamanın metni DOM'da duruyor ama sırası
     gelene kadar görünmüyor — H2'deki sayımın aynısı.
   · <768px gizli (CSS'te). Telefonda hero metinle taşınıyor.
   ========================================================================= */

const EASE = [0.22, 1, 0.36, 1] as const;

/* Bir karenin pencerede durma süresi. H2'de 4200 ms'di çünkü orada okunacak
   bir başlık + bir şart satırı + marka çipleri vardı. Burada alt satır iki-üç
   kelime; 3200 ms rahat okunuyor ve altı kareyi 19 saniyede bitiriyor. Daha
   uzun tutmak şeridi akış olmaktan çıkarıp slayt gösterisine çeviriyor. */
const DWELL = 3200;
/* Son karede daha uzun duruyoruz: varış okunacak tek yer ve sıfırlamadan
   önce ziyaretçinin şeridin bittiğini görmesi gerekiyor. */
const HOLD = 4600;
/* Sessiz sıfırlama. Şerit geri kaydırılmıyor — geri akan bir bant "geri adım"
   diye okunuyor (aynı ders hero.css'te ve lab-h5.css'te yazılı). Bunun yerine
   şerit sönüyor, görünmezken başa alınıyor, tekrar beliriyor. */
const FADE = 260;

type Stage = {
  key: string;
  title: string;
  /* tek kısa satır: aşamanın şartı ya da sahibi. Cümle değil. */
  note: string;
  art: ReactNode;
};

/* ------------------------------------------------------------------ tasvirler
   Hepsi aynı 160×115 kutuda, hepsi koyu zeminde, hiçbirinde harf yok. Ölçüler
   ortak: sol kenar 12-18, satır yüksekliği 5-8, köşe yarıçapı 3-9. Amaç altı
   ayrı çizim değil, tek bir çizim dilinin altı cümlesi olmaları.

   Renkler opak hex ve anlamlı:
     #1c1c1c/#1f1f1f  nesnenin gövdesi (kağıt, kart, dosya)
     #2b2b2b/#363636/#454545  mürekkep kademeleri — koyu zeminde alfa çalışmaz
     #1d3550 + #307fe2        o aşamada İLERLEYEN şey
     #ffffff                  yalnızca varış tabelasında
   Hiçbir çizimde uydurma numara, uydurma resmî damga ya da gerçek bir belgenin
   taklidi yok. Sadece "kağıt", "kart", "dosya", "tabela" siluetleri. */

function ArtName() {
  /* Seçim aşaması: üç aday satır, biri onaylanmış. Ad, faaliyet ve yapı
     seçimini tek karede topluyor çünkü üçü de aynı şeyin tekrarı: önünüze
     seçenek konuyor, biri işaretleniyor. */
  return (
    <svg className="serit-art" viewBox="0 0 160 115" aria-hidden="true" focusable="false">
      <rect x="14" y="20" width="92" height="16" rx="8" fill="#1d3550" />
      <rect x="14" y="50" width="76" height="16" rx="8" fill="#2b2b2b" />
      <rect x="14" y="80" width="84" height="16" rx="8" fill="#2b2b2b" />
      <circle className="sx-pop" cx="132" cy="28" r="13" fill="#307fe2" />
      <path
        className="sx-draw"
        d="M126 28.4 l4.2 4.2 L139 23.6"
        fill="none"
        stroke="#0d1c2c"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="132" cy="58" r="11" fill="none" stroke="#333333" strokeWidth="1.6" />
      <circle cx="132" cy="88" r="11" fill="none" stroke="#333333" strokeWidth="1.6" />
    </svg>
  );
}

function ArtDeed() {
  /* Kuruluş ve tescil: ana sözleşme + imza satırı, üstüne inen mühür. Mühür
     kağıdın sağ kenarına BİNİYOR — bitişik dursa iki ayrı nesne olurdu,
     binince "bu kağıda vuruldu" oluyor. */
  return (
    <svg className="serit-art" viewBox="0 0 160 115" aria-hidden="true" focusable="false">
      <rect x="16" y="12" width="94" height="91" rx="7" fill="#1c1c1c" stroke="#303030" />
      <rect x="28" y="26" width="52" height="8" rx="4" fill="#454545" />
      <rect x="28" y="46" width="66" height="6" rx="3" fill="#2b2b2b" />
      <rect x="28" y="60" width="56" height="6" rx="3" fill="#2b2b2b" />
      <rect x="28" y="74" width="62" height="6" rx="3" fill="#2b2b2b" />
      <path
        className="sx-draw sx-long"
        d="M28 93 c6 -9 12 9 18 0 s12 -9 18 0"
        fill="none"
        stroke="#3d3d3d"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <g className="sx-drop">
        <rect x="100" y="44" width="38" height="38" rx="11" fill="#1d3550" stroke="#2a5f9e" />
        <path
          className="sx-draw"
          d="M110 63.4 l5.4 5.4 L128 56"
          fill="none"
          stroke="#307fe2"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

function ArtLicence() {
  /* Ticari lisans: yatay bir belge, üstünde otoritenin bandı. Mavi bant
     "bunu düzenleyen biz değiliz" bilgisini taşıyor — kartın diğer
     tasvirlerinde böyle bir üst bant yok. */
  return (
    <svg className="serit-art" viewBox="0 0 160 115" aria-hidden="true" focusable="false">
      <rect x="14" y="18" width="132" height="80" rx="9" fill="#1c1c1c" stroke="#333333" />
      <path d="M14 27a9 9 0 0 1 9-9h114a9 9 0 0 1 9 9v9H14z" fill="#1d3550" />
      <rect x="26" y="23" width="42" height="7" rx="3.5" fill="#2a5f9e" />
      <rect x="26" y="50" width="54" height="8" rx="4" fill="#454545" />
      <rect x="26" y="68" width="66" height="5.5" rx="2.75" fill="#2b2b2b" />
      <rect x="26" y="81" width="48" height="5.5" rx="2.75" fill="#2b2b2b" />
      <circle
        className="sx-pop"
        cx="116"
        cy="72"
        r="17"
        fill="#16202b"
        stroke="#307fe2"
        strokeWidth="1.6"
      />
      <path
        className="sx-draw"
        d="M108 72.5 l5 5 L127 63"
        fill="none"
        stroke="#307fe2"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArtId() {
  /* Biyometri ve Emirates ID: kimlik kartı + yanında parmak izi. Şeridin
     ziyaretçiye fiziksel iş düşen tek karesi, o yüzden mavi olan şey burada
     bir belge değil, PARMAK İZİ — yani kişinin kendisi. */
  return (
    <svg className="serit-art" viewBox="0 0 160 115" aria-hidden="true" focusable="false">
      <rect x="12" y="26" width="92" height="62" rx="8" fill="#1c1c1c" stroke="#333333" />
      <rect x="22" y="36" width="26" height="32" rx="5" fill="#2b2b2b" />
      <circle cx="35" cy="47" r="6.4" fill="#3f3f3f" />
      <path d="M25 66c0-8 5-11.5 10-11.5S45 58 45 66z" fill="#3f3f3f" />
      <rect x="56" y="37" width="36" height="7" rx="3.5" fill="#454545" />
      <rect x="56" y="51" width="26" height="5" rx="2.5" fill="#2b2b2b" />
      <rect x="56" y="61" width="32" height="5" rx="2.5" fill="#2b2b2b" />
      {/* akıllı kart çipi — bir kimliği tek başına ele veren detay */}
      <rect x="22" y="74" width="16" height="11" rx="2.5" fill="#3a3a3a" />
      <rect x="22" y="79" width="16" height="1.2" fill="#2b2b2b" />
      <rect x="29" y="74" width="1.2" height="11" fill="#2b2b2b" />
      <rect x="46" y="76" width="48" height="6" rx="3" fill="#262626" />
      <g fill="none" stroke="#307fe2" strokeWidth="2" strokeLinecap="round">
        <circle className="sx-s1" cx="126" cy="57" r="3.2" fill="#307fe2" stroke="none" />
        <path className="sx-s1" d="M126 47a10 10 0 0 1 0 20" />
        <path className="sx-s2" d="M126 39a18 18 0 0 1 0 36" />
        <path className="sx-s3" d="M126 31a26 26 0 0 1 0 52" />
      </g>
    </svg>
  );
}

function ArtBank() {
  /* Banka başvurusu: bizde biten üç satır tikli, kararı verecek olan halka
     KESİKLİ ve BOŞ. Bu ayrım H2'den geliyor ve orada da aynı sebeple vardı —
     hesabı banka açıyor, kararı banka veriyor. Halka aktifken yavaşça dönüyor:
     bekleyen bir şey, tamamlanmış bir şey değil. */
  return (
    <svg className="serit-art" viewBox="0 0 160 115" aria-hidden="true" focusable="false">
      <rect x="12" y="17" width="38" height="13" rx="4" fill="#262626" />
      <rect x="12" y="26" width="92" height="72" rx="8" fill="#1c1c1c" stroke="#333333" />
      {[38, 56, 74].map((y, n) => (
        <g key={y} className={`sx-s${n + 1}`}>
          <rect x="24" y={y} width="13" height="13" rx="3.5" fill="#1d3550" />
          <path
            d={`M27.6 ${y + 6.6} l3.1 3.1 L33.9 ${y + 3.6}`}
            fill="none"
            stroke="#307fe2"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="44" y={y + 3.5} width="48" height="6" rx="3" fill="#2b2b2b" />
        </g>
      ))}
      <circle
        className="sx-spin"
        cx="130"
        cy="62"
        r="18"
        fill="none"
        stroke="#3a3a3a"
        strokeWidth="1.6"
        strokeDasharray="3 6"
      />
      <circle cx="122" cy="62" r="2.2" fill="#4a4a4a" />
      <circle cx="130" cy="62" r="2.2" fill="#4a4a4a" />
      <circle cx="138" cy="62" r="2.2" fill="#4a4a4a" />
    </svg>
  );
}

function ArtLive() {
  /* Varış. Bilerek belge DEĞİL: önceki beş kare kağıt, kart, dosya çiziyor;
     altıncı bir NESNE değil bir DURUM. Tabela — adınız kapıda. Kartın iki
     beyaz yüzeyinden biri burada: rozet ve üstteki çubuk. Şeridin sonuna
     kadar beyaz görünmüyor, o yüzden vardığında gerçekten varılmış oluyor. */
  return (
    <svg className="serit-art" viewBox="0 0 160 115" aria-hidden="true" focusable="false">
      <rect x="18" y="24" width="124" height="56" rx="12" fill="#1d3550" stroke="#2a5f9e" />
      <rect className="sx-pop" x="32" y="38" width="28" height="28" rx="9" fill="#ffffff" />
      <path
        className="sx-draw"
        d="M39.5 52.4 l4.4 4.4 L53 47"
        fill="none"
        stroke="#0d1c2c"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="70" y="42" width="54" height="8" rx="4" fill="#ffffff" />
      <rect x="70" y="56" width="34" height="6" rx="3" fill="#4f83bd" />
      {/* tabelanın ayağı: nesne havada durmuyor, bir yere monte */}
      <rect x="76" y="80" width="8" height="12" rx="2" fill="#232323" />
      <rect x="44" y="92" width="72" height="4" rx="2" fill="#2b2b2b" />
    </svg>
  );
}

/* --------------------------------------------------------------------- içerik
   Yedi gerçek adım (countryContent.dubai.steps) altı kareye indi:
     steps 1+2+3  → "Ad ve faaliyet seçimi"   (üçü de seçim, üçü de ilk görüşme)
     step  4      → "Kuruluş ve tescil"
     step  5      → "Ticari lisans"
     step  6      → "Biyometri ve Emirates ID"
     step  7      → "Banka başvurusu"         (GSM hattı kartta yok: kuruluşun
                                               hikâyesini değiştirmeyen bir kalem)
   Altıncı kare adımlarda yok, çünkü adım listesi işi anlatıyor, sonucu değil.
   Şeridin bir sonu olmasa döngü "bitmeyen süreç" gibi okunurdu. */
const STAGES: Stage[] = [
  {
    key: "ad",
    title: "Ad ve faaliyet seçimi",
    note: "Üç ad adayı, tek faaliyet kodu",
    art: <ArtName />,
  },
  {
    key: "tescil",
    title: "Kuruluş ve tescil",
    note: "Ana sözleşme ve başvuru",
    art: <ArtDeed />,
  },
  {
    key: "lisans",
    title: "Ticari lisans",
    note: "Otorite düzenliyor",
    art: <ArtLicence />,
  },
  {
    key: "kimlik",
    title: "Biyometri ve Emirates ID",
    note: "Bir kez BAE'de",
    art: <ArtId />,
  },
  {
    key: "banka",
    title: "Banka başvurusu",
    note: "Dosya bizde, onay bankada",
    art: <ArtBank />,
  },
  {
    key: "canli",
    title: "Şirket faaliyette",
    note: "Yasal olarak iş yapabilirsiniz",
    art: <ArtLive />,
  },
];

const LAST = STAGES.length - 1;

export default function HeroH7() {
  const reduced = useReducedMotion() ?? false;
  const [i, setI] = useState(0);
  /* Tek duraklatma sebebi var: imleç ya da klavye odağı kartın üstünde.
     H2'de bir de KALICI duraklatma vardı ("sekmeye basan seçimini yaptı") —
     burada bilerek yok. Sebep biçimsel: H2'nin sekmeleri hep ekranda kalıyordu,
     burada tıklanan kare birkaç saniye sonra pencereden çıkıp gidiyor. Kalıcı
     kilit, kullanıcıyı geri dönemeyeceği bir karede bırakırdı. Kart imleç
     ayrılınca kaldığı yerden akmaya devam ediyor. */
  const [held, setHeld] = useState(false);
  /* Sıfırlama penceresi: şerit görünmezken başa alınıyor. */
  const [blank, setBlank] = useState(false);

  useEffect(() => {
    if (reduced || held || blank) return;
    if (i < LAST) {
      const id = window.setTimeout(() => setI(i + 1), DWELL);
      return () => window.clearTimeout(id);
    }
    const id = window.setTimeout(() => setBlank(true), HOLD);
    return () => window.clearTimeout(id);
  }, [i, reduced, held, blank]);

  /* Sıfırlama kendi etkisinde duruyor. Yukarıdaki etkiye konsaydı setI(0)
     kendi temizleyicisini tetikleyip "blank'i kapat" zamanlayıcısını silerdi
     ve şerit görünmez kalırdı. Burada bağımlılık yalnızca blank olduğu için
     dizi kesintisiz işliyor: sön → başa al → yeniden belir. */
  useEffect(() => {
    if (!blank) return;
    const toStart = window.setTimeout(() => setI(0), FADE);
    const show = window.setTimeout(() => setBlank(false), FADE + 60);
    return () => {
      window.clearTimeout(toStart);
      window.clearTimeout(show);
    };
  }, [blank]);

  const go = useCallback((n: number) => {
    setI(n);
    setHeld(true);
  }, []);

  /* reduced hâlde işaretleme değişmiyor, yalnızca süre sıfırlanıyor: sunucu ve
     ilk istemci render'ı aynı DOM'u üretmek zorunda (H5'teki aynı gerekçe). */
  const t = (v: number) => (reduced ? 0 : v);

  return (
    <motion.div
      className="serit"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: t(0.7), delay: t(0.2), ease: EASE }}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={() => setHeld(false)}
    >
      <span className="serit-k">Kuruluş aşama aşama</span>

      <div className="serit-win" role="group" aria-label="Kuruluş aşamaları">
        <div
          className="serit-track"
          data-blank={blank}
          style={{ "--i": String(i) } as CSSProperties}
        >
          {/* Bandın iki rayı ve iki ucu. Uçlar şeridin SONLU olduğunu söylüyor:
              başta soldaki uç, sonda sağdaki uç pencereye giriyor. */}
          <span className="serit-rail serit-rail-t" aria-hidden="true" />
          <span className="serit-rail serit-rail-b" aria-hidden="true">
            {/* Kat edilen kısım. Genişliği "şimdi" noktasına kadar; şerit
                kaydıkça ikisi aynı süre ve aynı yumuşamayla ilerlediği için
                mavinin ucu ekranda hep sabit noktada kalıyor. */}
            <span className="serit-fill" />
          </span>
          <span className="serit-cap serit-cap-a" aria-hidden="true" />
          <span className="serit-cap serit-cap-b" aria-hidden="true" />

          {STAGES.map((s, n) => (
            <button
              key={s.key}
              type="button"
              className="serit-cell"
              data-st={n === i ? "on" : n < i ? "past" : "next"}
              aria-label={s.title}
              aria-current={n === i ? "step" : undefined}
              onClick={() => go(n)}
              /* Klavyeyle gezen kullanıcı pencerenin dışındaki bir kareye
                 odaklanabiliyor; odak o kareyi ortaya getiriyor ki görünmeyen
                 bir düğmeye basılmasın. */
              onFocus={() => go(n)}
            >
              {s.art}
            </button>
          ))}
        </div>

        {/* ŞİMDİ. Kartın sabit noktası ve iki beyaz yüzeyinden biri. Şerit
            sıfırlanırken bile duruyor — akan şey süreç, duran şey bu an. */}
        <span className="serit-now" aria-hidden="true" />
      </div>

      {/* Pencerede hangi kare varsa onun adı. Altısı da DOM'da, üst üste:
          yükseklik sabit kalıyor, kart aşama değişince zıplamıyor. */}
      <div className="serit-say">
        {STAGES.map((s, n) => (
          <div key={s.key} className="serit-p" data-on={n === i} aria-hidden={n !== i}>
            <b>{s.title}</b>
            <i>{s.note}</i>
          </div>
        ))}
      </div>

      <p className="serit-foot">
        <MoveRight size={14} strokeWidth={2} aria-hidden="true" />
        <span>Sıra kimde olursa olsun, takibi bizde.</span>
      </p>
    </motion.div>
  );
}
