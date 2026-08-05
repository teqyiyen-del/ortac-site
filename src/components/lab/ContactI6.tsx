"use client";

import { useMemo, useState } from "react";
import { MotionConfig, motion, useReducedMotion } from "motion/react";
import {
  ArrowDown,
  AtSign,
  Check,
  Compass,
  Lock,
  MapPin,
  MessageCircle,
  Minus,
  Phone,
  Send,
  type LucideIcon,
} from "lucide-react";

import AskCta from "@/components/shared/AskCta";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { Flag } from "@/components/shared/CountryPicker";
import { useLenis } from "@/components/Providers";
import {
  CHANNELS,
  OFFICES,
  hasAnyInfo,
  isLiveChannel,
  officeFor,
  type ChannelKind,
} from "@/lib/offices";
import { COUNTRY_SLUGS, servicesFor } from "@/lib/services";
import { COUNTRY_LABELS, type Country } from "@/lib/store";

/* ============================================================================
   ADAY I6 — İLETİŞİM SAYFASI · "ÜÇ OFİS"
   CSS: src/app/css/lab-i6.css · ad alanı .i6-
   Veri: src/lib/offices.ts (adres ve kanalların tek kaynağı)

   ---------------------------------------------------------------------------
   BU DOSYA ARTIK HİÇBİR SAYFADAN ÇAĞRILMIYOR — VE BU BİLEREK

   Müşteri iletişim turunu kapattı: /lab/iletisim sayfası ile I1–I5 adayları
   (bileşenleri ve lab-i1…lab-i5.css) silindi. I6 kazandı ve canlıya taşındı
   (src/app/iletisim/**, ad alanı .ct-). Bu dosya ile lab-i6.css o kararın
   KAYDI olarak duruyor; lab-i6.css globals.css'e import edilmeye devam ediyor.

   Ölü kod gibi görünüp süpürülmesin: canlı kopyanın .i6- yerine .ct- önekini
   kullanmasının tek sebebi bu dosyanın ad alanının hâlâ kaskada olması. Silmek
   isteyen önce src/app/css/iletisim.css ve src/app/iletisim/ContactSections.tsx
   içindeki ad alanı notlarını okumalı — üçü birlikte karar veriyor.

   ---------------------------------------------------------------------------
   NEDEN BAŞTAN YAZILDI

   I4 ve I5 tek bir varsayım üzerine kuruluydu: bir telefon, bir e-posta, bir
   ofis. Yeni bilgi bunu geçersiz kıldı — firmanın Dubai, İngiltere ve KKTC'de
   AYRI adresi ve AYRI iletişim bilgisi var. Bu bir detay değil, sayfanın
   omurgası: ziyaretçinin ilk kararı "hangi kanaldan yazayım" değil, "hangi
   ofisle konuşuyorum". O yüzden sayfanın en üstünde tek bir seçim var ve
   altındaki her şey — harita, adres, kanal kartları — o seçimden besleniyor.

   ---------------------------------------------------------------------------
   GERİ BİLDİRİMİN SEKİZ MADDESİ, TEK TEK

   1) "BUNLARI BEKLEMEYİN" BANDI KALKTI. I4 ve I5'in kapanışındaki
      STANCE_LIMITS bölümü bu adayda YOK; brand.ts'ten o içe aktarma hiç
      yapılmıyor. Sayfa iletişim sayfası, beklenti yönetimi sayfası değil.

   2) KANALLAR BÜYÜK. Üç kanal, üç büyük kart: 56 piksellik ikon plakası,
      20 piksellik değer satırı ve altında kanalın ne işe yaradığını söyleyen
      tek cümle. "Minik minik" liste satırı yok; kartın tamamı tıklama hedefi.

   3) MÜŞTERİ PANELİ KALKTI. I4/I5'teki TaxDome kanalı bu adayda yok — sayfada
      karşılığı olmayan bir kapıydı.

   4) ÜÇ OFİS SAYFANIN OMURGASI. Seçici en üstte, harita ve kartlar ona bağlı.
      Değerlerin tamamı lib/offices.ts'te ve BOŞ: SWAP:OFFICE_DUBAI,
      SWAP:OFFICE_INGILTERE, SWAP:OFFICE_KKTC. Uydurma adres/telefon yok.
      Geçen turda kaldırılan iki şey geri GELMEDİ: ülke başına canlı saat ve
      hizmet/ofis başına ayrı muhatap.

   5) SEÇİMLER AÇILIR MENÜ DEĞİL. Formdaki ülke ve konu seçimlerinin ikisi de
      görünür kutucuk. <select> hiç kullanılmıyor. Altta yatan kontrol yerli
      radyo düğmesi — ok tuşlarıyla gezinme, klavyeyle seçme ve ekran okuyucu
      duyurusu tarayıcıdan geliyor, taklit edilmiyor.

   6) WEBSITE ALANI EKLENDİ. Ad soyad / e-posta / telefon'un yanında, isteğe
      bağlı, type="url".

   7) FORM TOPARLANDI. I3'ten canlı cümle (seçim yaptıkça üstteki cümle
      yeniden kuruluyor), I4'ten sıkı alan ızgarası ve etiket disiplini alındı.
      I5'in adım rozetleri ve ilerleme rayı ATILDI — formu karmaşık gösteren
      şey alan sayısı değil, alanların etrafındaki mekanikti.

   8) HARİTA GERÇEK. Soyut nokta/ızgara değil: Natural Earth 110m kıyı çizgisi
      ve ülke sınırları, Mercator izdüşümüyle satır içi SVG olarak. Dış servis
      yok — harita karosu, API anahtarı, çalışma anında dış istek yok.

   ---------------------------------------------------------------------------
   ELİMİZDE OLMAYAN İKİ ŞEY, İKİSİ DE GİZLENMİYOR

   · SWAP:OFFICE_* — üç ofisin adresi, telefonu, WhatsApp hattı ve e-postası
     doğrulanmadı. Kartlar boş yuvayla çıkıyor ve TIKLANAMIYOR.
   · SWAP:CONTACT_FORM — çalışan gönderim ucu yok. Buton devre dışı, onSubmit
     yalnızca varsayılanı iptal ediyor ve sahte "mesajınız iletildi" ekranı
     BİLEREK yazılmadı: gerçekten yazan birinin mesajını sessizce kaybetmek,
     kapalı bir butondan çok daha pahalıya patlar.
   ========================================================================= */

/* projedeki tek yumuşama eğrisi (--ease-out-quint'in JS karşılığı) */
const EASE = [0.22, 1, 0.36, 1] as const;

/* ======================================================== HARİTA · GEOMETRİ */

/* Kutu 16:9. Bölge, üç ülkeyi de rahat içine alacak biçimde seçildi:
   batıda Atlantik, doğuda Basra Körfezi, kuzeyde İskoçya'nın ucu, güneyde
   Sahra. Kuzey sınırı elle seçilmedi — 16:9 oranından türüyor, böylece
   izdüşüm hiçbir yönde esnemiyor. */
const MAP_W = 1000;
const MAP_H = 563;
const WEST = -25.5;
const EAST = 74.5;
const SOUTH = 19;

const D2R = Math.PI / 180;
/** Mercator'ün dikey ekseni, derece cinsinden */
const mercY = (lat: number) => Math.log(Math.tan(Math.PI / 4 + (lat * D2R) / 2)) / D2R;

const Y_S = mercY(SOUTH);
/* Kuzey kenarı elle seçilmedi: kutunun oranı kadar yukarıda. Karşılığı
   yaklaşık 60,10° — İskoçya'nın ucu içeride, izdüşüm hiçbir yönde esnemiyor. */
const Y_N = Y_S + ((EAST - WEST) * MAP_H) / MAP_W;

/** [lng, lat] → viewBox noktası. Aşağıdaki hazır yollarla aynı izdüşüm. */
function project(at: readonly [number, number]) {
  return {
    x: ((at[0] - WEST) / (EAST - WEST)) * MAP_W,
    y: ((Y_N - mercY(at[1])) / (Y_N - Y_S)) * MAP_H,
  };
}

/* Enlem/boylam ızgarası. Haritayı "harita" yapan şeylerden biri: kıyı çizgisi
   nerede olduğunu söyler, ızgara ölçeği söyler. Tam sayı dereceler, seyrek. */
const MERIDIANS = [-20, 0, 20, 40, 60];
const PARALLELS = [20, 30, 40, 50, 60];

/* Etiketin işaretin neresine oturacağı. Elle seçildi çünkü otomatik bir kural
   üç işaretin üçünde de yanlış yer buluyordu: Dubai sağ kenara yakın, KKTC'nin
   sağında Levant kıyısı var.

   Kaçıklıklar seçim halkasının yarıçapından (22) büyük: seçili ofisin etiketi
   halkanın içinde kalırsa ikisi birbirini okunmaz yapıyor. */
const LABEL: Record<Country, { dx: number; dy: number; anchor: "start" | "middle" | "end" }> = {
  dubai: { dx: -27, dy: 5, anchor: "end" },
  ingiltere: { dx: 27, dy: 5, anchor: "start" },
  kktc: { dx: 0, dy: 39, anchor: "middle" },
};

const CHANNEL_ICON: Record<ChannelKind, LucideIcon> = {
  phone: Phone,
  whatsapp: MessageCircle,
  email: AtSign,
};

/* =============================================================== 1 · OFİSLER
   Başlık, ofis seçici, harita ve büyük kanal kartları. Hepsi tek bölümde,
   çünkü hepsi tek bir seçime bağlı: seçiciyi görmeden değişen bir kart,
   ziyaretçiye neyin neyi değiştirdiğini anlatmıyor. */

function Offices({ active, onPick }: { active: Country; onPick: (c: Country) => void }) {
  const reduce = useReducedMotion();
  const office = officeFor(active);
  const pin = project(office.at);

  return (
    <>
      {/* ------------------------------------------- ofis seçici (üç düğme) */}
      <FadeUp delay={0.06}>
        <div className="i6-switch" role="group" aria-label="Hangi ofis">
          {OFFICES.map((o) => (
            <button
              key={o.country}
              type="button"
              className="i6-office"
              data-on={o.country === active ? "" : undefined}
              aria-pressed={o.country === active}
              onClick={() => onPick(o.country)}
            >
              <span className="i6-office-flag" aria-hidden="true">
                <Flag country={o.country} />
              </span>
              <span className="i6-office-t">{o.label} ofisi</span>
              <span className="i6-office-mark" aria-hidden="true">
                <Check size={15} strokeWidth={2.6} />
              </span>
            </button>
          ))}
        </div>
      </FadeUp>

      {/* --------------------------------------------------------- harita */}
      <FadeUp delay={0.12}>
        <div className="i6-map">
          <svg
            className="i6-map-svg"
            viewBox={`0 0 ${MAP_W} ${MAP_H}`}
            preserveAspectRatio="xMidYMid slice"
            role="img"
            aria-label={`Avrupa, Akdeniz ve Basra Körfezi haritası. Dubai, İngiltere ve KKTC işaretli; şu an ${office.label} seçili.`}
          >
            <rect className="i6-sea" width={MAP_W} height={MAP_H} />

            {/* ızgara — kıyı çizgisinin altında kalıyor ki denizde okunsun */}
            <g className="i6-grid" aria-hidden="true">
              {MERIDIANS.map((lng) => {
                const x = project([lng, SOUTH]).x;
                return <path key={`m${lng}`} d={`M${x} 0V${MAP_H}`} />;
              })}
              {PARALLELS.map((lat) => {
                const y = project([WEST, lat]).y;
                return <path key={`p${lat}`} d={`M0 ${y}H${MAP_W}`} />;
              })}
            </g>

            {/* Kara ve sınırlar tek yol; çizgi kalınlığı ölçekten bağımsız
                olsun diye non-scaling-stroke — kutu her genişlikte aynı
                inceliği tutuyor. */}
            <path className="i6-land" d={LAND_D} vectorEffect="non-scaling-stroke" />
            <path className="i6-border" d={BORDER_D} vectorEffect="non-scaling-stroke" />

            {/* Üç ülke gövdesi. Seçili olan dolu maviye geçiyor; geçiş CSS'te,
                yani hareket kapalıyken de doğru sonuç kalıyor. */}
            {OFFICES.map((o) => (
              <path
                key={o.country}
                className="i6-shape"
                data-on={o.country === active ? "" : undefined}
                d={SHAPE_D[o.country]}
              />
            ))}

            {/* Seçimi taşıyan halka: işaretten işarete kayıyor. Tek bir
                düğümün yer değiştirmesi, üç ayrı düğümün yanıp sönmesinden
                daha okunur — göz hareketi takip ediyor. */}
            <motion.g
              className="i6-ring"
              initial={false}
              animate={{ x: pin.x, y: pin.y }}
              transition={{ duration: reduce ? 0 : 0.72, ease: EASE }}
              aria-hidden="true"
            >
              <circle className="i6-ring-p" r="22" />
              <circle className="i6-ring-c" r="22" />
            </motion.g>

            {/* İşaretler ve etiketler. Haritanın kendisi role="img" ve tek bir
                etiketle duyuruluyor; içindeki her düğüm ayrı ayrı okunursa
                ekran okuyucu haritayı bir liste gibi sayardı. */}
            <g aria-hidden="true">
              {OFFICES.map((o) => {
                const p = project(o.at);
                const l = LABEL[o.country];
                const on = o.country === active;
                return (
                  <g key={o.country} className="i6-pin" data-on={on ? "" : undefined}>
                    {/* Yarıçaplar nitelik olarak duruyor, CSS'te değil:
                        SVG geometri özellikleri (r, cx, cy) CSS'ten yalnızca
                        yeni tarayıcılarda ayarlanabiliyor ve işaretin
                        görünmemesi kabul edilebilir bir bozulma değil. */}
                    <circle className="i6-pin-o" cx={p.x} cy={p.y} r="9" />
                    <circle className="i6-pin-i" cx={p.x} cy={p.y} r="4" />
                    {/* .i6-mlbl, .i6-label DEĞİL: form alanı etiketleri de
                        .i6-label kullanıyor ve iki kural birbirini eziyordu —
                        harita yazısı form etiketinin punto ve display'ini
                        alıyordu. Ayrı ad, ayrı iş. */}
                    <text
                      className="i6-mlbl"
                      x={p.x + l.dx}
                      y={p.y + l.dy}
                      textAnchor={l.anchor}
                    >
                      {o.label}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>

          {/* ---- haritanın üstündeki ofis kartı ----
              Konum haritanın içinde çünkü anlattığı şey haritanın üstündeki
              işaret. Dar ekranda CSS onu haritanın altına indiriyor: 360
              pikselde bir kartı bir haritanın üstüne bindirmek ikisini birden
              okunmaz yapardı. */}
          <div className="i6-card" aria-live="polite">
            <div className="i6-card-top">
              <span className="i6-card-flag" aria-hidden="true">
                <Flag country={office.country} />
              </span>
              <b className="i6-card-t">
                {office.label} ofisi
                {/* Şehir yalnızca ülke adından farklıysa yazılıyor: "Dubai
                    ofisi · Dubai" bilgi değil, tekrar. */}
                {office.city && office.city !== office.label ? <i>{office.city}</i> : null}
              </b>
            </div>

            {office.legal ? <p className="i6-card-legal">{office.legal}</p> : null}

            <p className="i6-card-addr">
              <MapPin size={15} strokeWidth={2} aria-hidden="true" />
              {office.address ? (
                office.address
              ) : (
                /* SWAP:OFFICE_* — açık adres doğrulanmadı. Yer tutucu bir
                   sokak adı yazmaktansa yuva açıkça boş duruyor. */
                <span className="i6-slot" data-swap={office.swap}>
                  <span className="sr-only">{office.label} ofisinin adresi </span>
                  açık adres eklenecek
                </span>
              )}
            </p>
          </div>
        </div>
      </FadeUp>

      <FadeUp delay={0.08}>
        <p className="i6-map-note">
          Kıyı çizgileri ve ülke sınırları Natural Earth 110m verisinden; çizim
          sayfanın kendi içinde üretiliyor — harita servisi, API anahtarı ve dış
          istek yok. İşaretler ülke düzeyinde duruyor: açık adresler
          doğrulandığında her işaret kendi noktasına çekilecek. KKTC işareti bu
          ölçekte Kıbrıs adasının tamamına düşüyor; bu bir sınır iddiası değil,
          ülke işareti.
        </p>
      </FadeUp>

      {/* ------------------------------------------------ büyük kanal kartları */}
      <div className="i6-chs">
        {CHANNELS.map((c, i) => {
          const Icon = CHANNEL_ICON[c.kind];
          const v = office.contact[c.kind];
          const live = isLiveChannel(v);

          const body = (
            <>
              <span className="i6-ch-ic" aria-hidden="true">
                <Icon size={24} strokeWidth={1.8} />
              </span>
              <b className="i6-ch-l">{c.label}</b>
              <span className="i6-ch-v">
                {live ? (
                  v.value
                ) : (
                  /* SWAP:OFFICE_* — numara/adres doğrulanmadı. */
                  <span className="i6-slot" data-swap={office.swap}>
                    <span className="sr-only">
                      {office.label} ofisinin {c.label.toLocaleLowerCase("tr")} bilgisi{" "}
                    </span>
                    eklenecek
                  </span>
                )}
              </span>
              <span className="i6-ch-j">{c.job}</span>
            </>
          );

          return (
            <FadeUp key={c.kind} delay={0.06 * i} className="i6-ch-w">
              {/* SmartLink DEĞİL: tel: / mailto: / wa.me site içi rota değil,
                  routes.ts'in kaydına da girmiyor. Değer gelmeden kart zaten
                  bağlantı olmuyor — tıklanabilir görünen ölü bir kart, boş
                  bir karttan kötüdür. */}
              {live ? (
                <a className="i6-ch" data-live="" href={v.href}>
                  {body}
                </a>
              ) : (
                <div className="i6-ch">{body}</div>
              )}
            </FadeUp>
          );
        })}
      </div>

      <FadeUp delay={0.12}>
        <p className="i6-chs-note">
          {hasAnyInfo(office)
            ? "Kalan yuvalar doğrulandıkça dolacak. Doğrulanmamış iletişim bilgisi yazmıyoruz."
            : `${office.label} ofisinin adresi, telefonu, WhatsApp hattı ve e-postası henüz doğrulanmadı — uydurulmadı da. Bilgi geldiğinde bu kartlar dolacak ve tıklanabilir olacak; o zamana kadar aşağıdaki form ve soru bağlantısı çalışan yol.`}
        </p>
      </FadeUp>
    </>
  );
}

/* ================================================================ 2 · FORM */

/** "" = henüz seçilmedi · "belirsiz" = ziyaretçi karar vermemiş */
type UlkeValue = "" | "belirsiz" | Country;

const COUNTRY_OPTIONS: { value: UlkeValue; label: string; country: Country | null }[] = [
  ...COUNTRY_SLUGS.map((c) => ({ value: c as UlkeValue, label: COUNTRY_LABELS[c], country: c })),
  /* Dördüncü seçenek bir ülke değil ama gerçek bir cevap. Karşılığı da var:
     seçilince konu listesi üç ülkenin birleşimine açılıyor. */
  { value: "belirsiz", label: "Henüz karar vermedim", country: null },
];

/* Konu listesi ELLE YAZILMIYOR. Ülke seçiliyse o ülkenin gerçek hizmetleri,
   değilse üçünün birleşimi. Somut karşılığı: İngiltere seçilince "Vize ve
   oturum" listeden kendiliğinden düşüyor, çünkü services.ts o ülkede o hizmeti
   üretmiyor. Elle yazılmış bir liste bunu yapamaz, üstelik sessizce yalan
   söylemeye başlar. */
function serviceOptionsFor(u: UlkeValue) {
  const list: Country[] = COUNTRY_SLUGS.includes(u as Country) ? [u as Country] : COUNTRY_SLUGS;
  const map = new Map<string, string>();
  for (const c of list) for (const s of servicesFor(c)) map.set(s.slug, s.title);
  return Array.from(map, ([slug, title]) => ({ slug, title }));
}

/** üç ülkenin birleşimi — düşen seçimin adını yazabilmek için */
const ALL_SERVICES = serviceOptionsFor("");

/** Cümlenin içinde geçerken başlık küçük harfle başlıyor. Türkçe kilidi şart:
 *  varsayılan küçültme "İ"yi "i̇" yapıyor. */
const lowerTr = (s: string) => s.charAt(0).toLocaleLowerCase("tr") + s.slice(1);

type FieldKey = "ulke" | "hizmet" | "ad" | "eposta" | "telefon" | "website" | "mesaj";
type Values = Record<FieldKey, string>;

const EMPTY: Values = {
  ulke: "",
  hizmet: "",
  ad: "",
  eposta: "",
  telefon: "",
  website: "",
  mesaj: "",
};

const REQUIRED: FieldKey[] = ["ulke", "hizmet", "ad", "eposta", "mesaj"];

/* Kasten gevşek: amaç adresin gerçek olduğunu kanıtlamak değil, "@" unutan
   ziyaretçiyi kendi yazım hatasından kurtarmak. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/* Website isteğe bağlı ve şema zorunlu değil: "sirketiniz.com" yazan kişiyi
   https:// eklemediği için uyarmak, doldurmayı bırakmasının en kısa yolu. */
const URL_RE = /^(https?:\/\/)?[^\s./]+\.[^\s]{2,}$/i;

function errorOf(k: FieldKey, v: Values): string | null {
  const t = v[k].trim();
  switch (k) {
    case "ulke":
      return t ? null : "Bir ülke işaretleyin — karar vermediyseniz son kutu da geçerli bir cevap.";
    case "hizmet":
      return t ? null : "Bir konu işaretleyin.";
    case "ad":
      return t.length >= 2 ? null : "Adınızı ve soyadınızı yazın.";
    case "eposta":
      if (!t) return "E-posta adresinizi yazın.";
      return EMAIL_RE.test(t) ? null : "Adres eksik görünüyor — ornek@sirketiniz.com gibi olmalı.";
    case "website":
      if (!t) return null;
      return URL_RE.test(t) ? null : "Adres eksik görünüyor — sirketiniz.com yeterli.";
    case "mesaj":
      return t.length >= 10 ? null : "Birkaç cümleyle ne hakkında yazdığınızı ekleyin.";
    default:
      return null; /* telefon isteğe bağlı ve biçim aranmıyor */
  }
}

function ContactForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  /* Ülke değişince düşen konu seçimini sessizce yutmuyoruz: ne olduğunu
     yazıyoruz, yoksa ziyaretçi seçimini kendi sildi sanır. */
  const [dropped, setDropped] = useState<string | null>(null);

  const options = useMemo(() => serviceOptionsFor(values.ulke as UlkeValue), [values.ulke]);

  const set = (k: FieldKey, val: string) => setValues((p) => ({ ...p, [k]: val }));
  const blur = (k: FieldKey) => setTouched((p) => ({ ...p, [k]: true }));
  /* Hata yalnızca alandan çıkıldıktan sonra görünüyor: ilk harfte kırmızıya
     dönen bir form, doldurmaya çalışan kişiyi azarlıyor demektir. */
  const shown = (k: FieldKey) => (touched[k] ? errorOf(k, values) : null);

  const missing = REQUIRED.filter((k) => errorOf(k, values) !== null).length;

  function pickCountry(next: UlkeValue) {
    const list = serviceOptionsFor(next);
    const keep =
      !values.hizmet || values.hizmet === "belirsiz" || list.some((o) => o.slug === values.hizmet);

    if (keep) {
      setDropped(null);
    } else {
      const gone = ALL_SERVICES.find((o) => o.slug === values.hizmet)?.title ?? "Seçtiğiniz konu";
      const where = COUNTRY_SLUGS.includes(next as Country)
        ? COUNTRY_LABELS[next as Country]
        : "bu seçim";
      setDropped(`${gone} — ${where} listesinde yok, konu seçiminiz temizlendi.`);
    }

    setValues((p) => ({ ...p, ulke: next, hizmet: keep ? p.hizmet : "" }));
    setTouched((p) => ({ ...p, ulke: true }));
  }

  /* --- canlı cümle ---
     I3'ün işe yarayan parçası: ziyaretçi ne göndereceğini formu bitirmeden
     görüyor. Cümle kademeli kuruluyor. Dört hâl ayrı ayrı yazıldı çünkü tek
     bir şablona sıkıştırmak Türkçeyi bozuyordu: "birden fazla konu konusunda"
     ve "Ülkeye karar vermeden için" ikisi de o şablonun ürünüydü. */
  const ulkeToken =
    values.ulke === ""
      ? null
      : values.ulke === "belirsiz"
        ? "Ülkeye karar vermeden"
        : COUNTRY_LABELS[values.ulke as Country];
  const belirsizUlke = values.ulke === "belirsiz";
  const belirsizKonu = values.hizmet === "belirsiz";
  const hizmetToken =
    values.hizmet === ""
      ? null
      : belirsizKonu
        ? "birden fazla konu"
        : lowerTr(options.find((o) => o.slug === values.hizmet)?.title ?? "");
  /* "… hakkında yazıyorum" mu "… konusunda yazıyorum" mu — tek fark bu. */
  const konuKuyruk = belirsizKonu ? " hakkında yazıyorum." : " konusunda yazıyorum.";

  let say: React.ReactNode;
  if (!ulkeToken && !hizmetToken) {
    say = <i className="i6-tok-x">Ülkeyi ve konuyu işaretleyin — cümleniz burada kurulacak.</i>;
  } else if (ulkeToken && !hizmetToken) {
    say = (
      <>
        <b className="i6-tok">{ulkeToken}</b>
        {belirsizUlke ? " yazıyorum." : " için yazıyorum."}
      </>
    );
  } else if (!ulkeToken && hizmetToken) {
    say = (
      <>
        <b className="i6-tok">{hizmetToken}</b>
        {konuKuyruk}
      </>
    );
  } else {
    say = (
      <>
        <b className="i6-tok">{ulkeToken}</b>
        {belirsizUlke ? " " : " için "}
        <b className="i6-tok">{hizmetToken}</b>
        {konuKuyruk}
      </>
    );
  }

  return (
    /* SWAP:CONTACT_FORM — alanlar gerçek, gönderim değil.
       onSubmit yalnızca varsayılanı iptal ediyor (metin alanında Enter'a
       basılırsa sayfa yenilenmesin diye), buton devre dışı ve altında neden
       kapalı olduğu yazıyor. Uç nokta bağlandığında değişecek yerler:
       butonun disabled'ı, onSubmit'in gövdesi ve o tek satır. Yerleşimde
       hiçbir şey oynamıyor. */
    <form className="i6-form" noValidate aria-describedby="i6-form-note" onSubmit={(e) => e.preventDefault()}>
      {/* aria-live="polite": çipler değiştiğinde ekranda değişen tek şey bu
          cümle. Görmeyen kullanıcı aksi hâlde seçiminin karşılığını duymuyor. */}
      <p className="i6-say" aria-live="polite">
        {say}
      </p>

      {/* ================= ÜLKE — açılır menü değil, görünür kutucuklar ====
          Yerli <fieldset> + <legend>: gruplama ve grup adının duyurulması
          tarayıcıdan geliyor. role="radiogroup" ile ezmedik — o rol legend'i
          ad olarak kullanmıyor, yani erişilebilirliği artırmak isterken
          grubun adını düşürüyordu. */}
      <fieldset className="i6-block" aria-describedby={shown("ulke") ? "i6-ulke-err" : undefined}>
        <legend className="i6-legend">
          Hangi ülke?
          <b className="i6-req" aria-hidden="true">
            *
          </b>
          <span className="sr-only"> (zorunlu)</span>
        </legend>

        {/* Radyo düğmesinin kendisi görünmüyor ama DOM'da duruyor ve
            odaklanabiliyor: ok tuşlarıyla gezinme, klavyeyle seçme ve ekran
            okuyucu duyurusu tarayıcının kendi radyo davranışından geliyor.
            Özel bir liste kutusu yazmak bunların hepsini elle taklit etmekti. */}
        <div className="i6-ctry">
          {COUNTRY_OPTIONS.map((o) => (
            <label
              key={o.value}
              className="i6-ctry-o"
              data-on={values.ulke === o.value ? "" : undefined}
            >
              <input
                type="radio"
                name="ulke"
                value={o.value}
                checked={values.ulke === o.value}
                onChange={() => pickCountry(o.value)}
                onBlur={() => blur("ulke")}
              />
              <span className="i6-ctry-ic" aria-hidden="true">
                {o.country ? <Flag country={o.country} /> : <Compass size={18} strokeWidth={1.9} />}
              </span>
              <span className="i6-ctry-t">{o.label}</span>
            </label>
          ))}
        </div>

        {shown("ulke") ? (
          <p className="i6-err" id="i6-ulke-err" role="alert">
            {shown("ulke")}
          </p>
        ) : null}
      </fieldset>

      {/* ================= KONU — yine kutucuk, yine radyo =============== */}
      <fieldset
        className="i6-block"
        aria-describedby={shown("hizmet") ? "i6-hizmet-err i6-hizmet-hint" : "i6-hizmet-hint"}
      >
        <legend className="i6-legend">
          Hangi konuda?
          <b className="i6-req" aria-hidden="true">
            *
          </b>
          <span className="sr-only"> (zorunlu)</span>
        </legend>

        <div className="i6-svc">
          {options.map((o) => (
            <label key={o.slug} className="i6-svc-o" data-on={values.hizmet === o.slug ? "" : undefined}>
              <input
                type="radio"
                name="hizmet"
                value={o.slug}
                checked={values.hizmet === o.slug}
                onChange={() => {
                  set("hizmet", o.slug);
                  setDropped(null);
                }}
                onBlur={() => blur("hizmet")}
              />
              <span className="i6-svc-t">{o.title}</span>
              <span className="i6-svc-x" aria-hidden="true">
                <Check size={14} strokeWidth={2.8} />
              </span>
            </label>
          ))}

          <label className="i6-svc-o" data-on={values.hizmet === "belirsiz" ? "" : undefined}>
            <input
              type="radio"
              name="hizmet"
              value="belirsiz"
              checked={values.hizmet === "belirsiz"}
              onChange={() => {
                set("hizmet", "belirsiz");
                setDropped(null);
              }}
              onBlur={() => blur("hizmet")}
            />
            <span className="i6-svc-t">Emin değilim / birden fazla konu</span>
            <span className="i6-svc-x" aria-hidden="true">
              <Check size={14} strokeWidth={2.8} />
            </span>
          </label>
        </div>

        <p className="i6-hint" id="i6-hizmet-hint">
          {values.ulke === "" || values.ulke === "belirsiz"
            ? "Ülke işaretlerseniz liste o ülkede gerçekten yürüttüğümüz hizmetlere daralıyor."
            : `${COUNTRY_LABELS[values.ulke as Country]} için yürüttüğümüz hizmetler.`}
        </p>

        {dropped ? (
          <p className="i6-drop" role="status">
            <Minus size={14} strokeWidth={2.4} aria-hidden="true" />
            {dropped}
          </p>
        ) : null}

        {shown("hizmet") ? (
          <p className="i6-err" id="i6-hizmet-err" role="alert">
            {shown("hizmet")}
          </p>
        ) : null}
      </fieldset>

      {/* ================= BİLGİLERİNİZ ================================= */}
      <fieldset className="i6-block">
        <legend className="i6-legend">Size nasıl dönelim?</legend>

        <div className="i6-fields">
          <div className="i6-field" data-bad={shown("ad") ? "" : undefined}>
            <label className="i6-label" htmlFor="i6-ad">
              Ad Soyad
              <b className="i6-req" aria-hidden="true">
                *
              </b>
              <span className="sr-only"> (zorunlu)</span>
            </label>
            <input
              className="i6-input"
              id="i6-ad"
              name="ad"
              type="text"
              autoComplete="name"
              placeholder="Adınız ve soyadınız"
              value={values.ad}
              aria-required="true"
              aria-invalid={shown("ad") ? true : undefined}
              aria-describedby={shown("ad") ? "i6-ad-err" : undefined}
              onChange={(e) => set("ad", e.target.value)}
              onBlur={() => blur("ad")}
            />
            {shown("ad") ? (
              <p className="i6-err" id="i6-ad-err" role="alert">
                {shown("ad")}
              </p>
            ) : null}
          </div>

          <div className="i6-field" data-bad={shown("eposta") ? "" : undefined}>
            <label className="i6-label" htmlFor="i6-eposta">
              E-posta
              <b className="i6-req" aria-hidden="true">
                *
              </b>
              <span className="sr-only"> (zorunlu)</span>
            </label>
            <input
              className="i6-input"
              id="i6-eposta"
              name="eposta"
              type="email"
              autoComplete="email"
              placeholder="ornek@sirketiniz.com"
              value={values.eposta}
              aria-required="true"
              aria-invalid={shown("eposta") ? true : undefined}
              aria-describedby={shown("eposta") ? "i6-eposta-err" : undefined}
              onChange={(e) => set("eposta", e.target.value)}
              onBlur={() => blur("eposta")}
            />
            {shown("eposta") ? (
              <p className="i6-err" id="i6-eposta-err" role="alert">
                {shown("eposta")}
              </p>
            ) : null}
          </div>

          <div className="i6-field">
            <label className="i6-label" htmlFor="i6-telefon">
              Telefon
              <i className="i6-optional">isteğe bağlı</i>
            </label>
            <input
              className="i6-input"
              id="i6-telefon"
              name="telefon"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+90 …"
              value={values.telefon}
              onChange={(e) => set("telefon", e.target.value)}
              onBlur={() => blur("telefon")}
            />
          </div>

          {/* Yeni alan: website. İsteğe bağlı ve type="url" — mobil klavye
              buna göre açılıyor. Neden işe yarıyor: faaliyetin ne olduğunu
              anlatan en kısa cevap çoğu zaman sitenin kendisi, ve o bilgi
              gelirse ilk dönüş çok daha isabetli oluyor. */}
          <div className="i6-field" data-bad={shown("website") ? "" : undefined}>
            <label className="i6-label" htmlFor="i6-website">
              Website
              <i className="i6-optional">isteğe bağlı</i>
            </label>
            <input
              className="i6-input"
              id="i6-website"
              name="website"
              type="url"
              inputMode="url"
              autoComplete="url"
              placeholder="sirketiniz.com"
              value={values.website}
              aria-invalid={shown("website") ? true : undefined}
              aria-describedby={shown("website") ? "i6-website-err" : "i6-website-hint"}
              onChange={(e) => set("website", e.target.value)}
              onBlur={() => blur("website")}
            />
            {shown("website") ? (
              <p className="i6-err" id="i6-website-err" role="alert">
                {shown("website")}
              </p>
            ) : (
              <p className="i6-hint" id="i6-website-hint">
                Varsa siteniz veya mağazanız; faaliyetinizi en kısa anlatan şey.
              </p>
            )}
          </div>

          <div className="i6-field" data-wide="" data-bad={shown("mesaj") ? "" : undefined}>
            <label className="i6-label" htmlFor="i6-mesaj">
              Mesajınız
              <b className="i6-req" aria-hidden="true">
                *
              </b>
              <span className="sr-only"> (zorunlu)</span>
            </label>
            <textarea
              className="i6-input i6-area"
              id="i6-mesaj"
              name="mesaj"
              rows={5}
              placeholder="Faaliyetiniz, hedef pazarınız, tahsilat kanalınız — aklınızda ne varsa."
              value={values.mesaj}
              aria-required="true"
              aria-invalid={shown("mesaj") ? true : undefined}
              aria-describedby={shown("mesaj") ? "i6-mesaj-err" : "i6-mesaj-hint"}
              onChange={(e) => set("mesaj", e.target.value)}
              onBlur={() => blur("mesaj")}
            />
            {shown("mesaj") ? (
              <p className="i6-err" id="i6-mesaj-err" role="alert">
                {shown("mesaj")}
              </p>
            ) : (
              <p className="i6-hint" id="i6-mesaj-hint">
                Ne kadar yazarsanız ilk dönüş o kadar isabetli olur.
              </p>
            )}
          </div>
        </div>
      </fieldset>

      {/* --- gönderim: kapalı ve kapalı olduğunu söylüyor --- */}
      <div className="i6-foot">
        <div className="i6-foot-l">
          <button type="submit" className="i6-send" disabled>
            Gönder
            <Send size={16} strokeWidth={2} aria-hidden="true" />
          </button>
          <span className="i6-lock">
            <Lock size={12} strokeWidth={2.4} aria-hidden="true" />
            gönderim kapalı
          </span>
          {/* Sayaçta aria-live YOK ve bu bilinçli: değer yazarken değiştiği
              için canlı bölge her karakterde ekran okuyucuyu keserdi. Eksik
              alanın kendisi zaten role="alert" ile duyuruluyor. */}
          <span className="i6-left data">
            {missing === 0 ? "Zorunlu alanların hepsi dolu" : `${missing} zorunlu alan kaldı`}
          </span>
        </div>
        <AskCta label="Sorunuzu şimdi sorun" href="/basla" />
      </div>

      <p className="i6-note" id="i6-form-note">
        Form henüz bir yere bağlı değil: gönderim uç noktası eklenene kadar bu
        buton çalışmıyor ve yazdıklarınız hiçbir yere kaydedilmiyor. Sahte bir
        “mesajınız iletildi” ekranı bilerek yazılmadı.
      </p>
    </form>
  );
}

/* =========================================================== SAYFA GÖVDESİ */

export default function ContactI6() {
  const reduce = useReducedMotion();
  const lenis = useLenis();
  const [active, setActive] = useState<Country>("dubai");

  /* Lenis kaydırmayı devraldığı için tarayıcının kendi atlaması onun
     konumuyla çakışıyor; sitedeki kalıbın aynısı. Bağlantı yine gerçek bir
     <a href="#…">, yani JavaScript çalışmasa da hedefe gidiyor. */
  function jump(event: React.MouseEvent<HTMLAnchorElement>) {
    const target = document.getElementById("i6-form-sec");
    if (!target) return;
    event.preventDefault();
    if (lenis) lenis.scrollTo(target, { duration: reduce ? 0 : 1.05 });
    else target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <MotionConfig reducedMotion="user">
      {/* ==================================================================
          1 · OFİSLER — seçici, harita, adres, büyük kanal kartları
          ================================================================== */}
      <section className="sec-pad" style={{ background: "var(--white)" }}>
        <div className="container-o">
          <div className="i6-head">
            <FadeUp>
              <span className="tag i6-eyebrow">
                <span className="i6-eyebrow-dot" aria-hidden="true" />
                İletişim
              </span>
            </FadeUp>

            <SplitWords
              as="h1"
              text="Üç ülke, üç ofis."
              accent="üç ofis."
              className="i6-h1"
              style={{ color: "var(--text-900)" }}
            />

            <FadeUp delay={0.18}>
              <p className="sec-lead">
                Dubai, İngiltere ve KKTC&apos;de ayrı adresimiz ve ayrı iletişim
                bilgilerimiz var. Önce hangi ofisle konuşacağınızı seçin —
                harita, adres ve kanallar o seçime göre değişiyor.
              </p>
            </FadeUp>

            <FadeUp delay={0.24}>
              <a className="i6-jump" href="#i6-form-sec" onClick={jump}>
                <ArrowDown size={15} strokeWidth={2.1} aria-hidden="true" />
                Doğrudan forma gideyim
              </a>
            </FadeUp>
          </div>

          <Offices active={active} onPick={setActive} />
        </div>
      </section>

      {/* ==================================================================
          2 · FORM — iki görünür seçim, dört alan, bir mesaj
          ================================================================== */}
      <section
        className="sec-pad"
        id="i6-form-sec"
        style={{ background: "var(--paper)", scrollMarginTop: 70 }}
      >
        <div className="container-o">
          <div className="sec-head">
            <SplitWords
              as="h2"
              text="Durumunuzu yazın."
              accent="yazın."
              className="h2"
              style={{ color: "var(--text-900)" }}
            />
            <FadeUp delay={0.18}>
              <p className="sec-lead">
                Ülkeyi ve konuyu işaretleyin, size nasıl döneceğimizi bırakın.
                Açılır menü yok: seçeneklerin hepsi ekranda duruyor.
              </p>
            </FadeUp>
          </div>

          <FadeUp delay={0.08}>
            <ContactForm />
          </FadeUp>
        </div>
      </section>
    </MotionConfig>
  );
}

/* ==========================================================================
   HARİTA VERİSİ — üretilmiş, elle düzenlenmiyor

   Kaynak: node_modules/world-atlas (Natural Earth 110m), topojson-client ile
   açılıp d3-geo'nun geoMercator + geoPath'iyle yukarıdaki bölgeye izdüşürüldü,
   bir ondalığa yuvarlandı. Üçü de devDependency; hiçbiri tarayıcıya gitmiyor,
   çünkü çıktı burada düz metin olarak duruyor. Projenin kendi kalıbı bu —
   scripts/gen-globe.mjs küresel nokta bulutunu aynı yoldan üretiyor.

   Yeniden üretmek için (bölge sabitleri yukarıda, WEST/EAST/SOUTH ve kutu
   oranı değişirse bu yolların da yeniden üretilmesi gerekir):

     const proj = geoMercator().scale(1000 / ((EAST - WEST) * Math.PI / 180));
     proj.translate([0, 0]).center([0, 0]);
     const [x0, y0] = proj([WEST, NORTH]);
     proj.translate([-x0, -y0]).clipExtent([[0, 0], [1000, 563]]);
     const path = geoPath(proj).digits(1);
     path(feature(landTopo, "land"))                     → LAND_D
     path(mesh(countryTopo, objects.countries, (a,b) => a !== b)) → BORDER_D
     path(<784 | 826 | 196 numaralı ülke>)               → SHAPE_D

   SHAPE_D'nin üç anahtarı Natural Earth kimlikleri: 784 BAE, 826 Birleşik
   Krallık, 196 Kıbrıs. KKTC bu çözünürlükte ayrı bir öğe değil — işaret ada
   üzerinde duruyor ve metin bunu sınır olarak sunmuyor.
   ========================================================================== */

const LAND_D = [
  "M600.8,374.3L594,379.5L594.8,381.8L595,382.8L584.8,387.8L579.9,386.2L577.6,381.3L582.3,380.8L583,380.8L584.5,377.8L591.7,378ZM492,373.9L497.5,378",
  "L505.3,377.3L512.7,378.2L512.5,380.3L517.9,378.9L516.6,382.5L502.2,383.5L502.3,381.5L490.1,379.1ZM410.2,342.3L406.6,352.2L408.1,356.1L406,362.5",
  "L398.3,357.9L393.3,356.5L379.3,350.1L380.7,343.6L392.4,344.8L402.6,343.4ZM347.1,303.5L353.1,312.9L351.7,330.2L347.1,329.3L343.1,333.6L339.3,330.2",
  "L338.9,314.5L336.6,307L342.1,307.6ZM350.6,290.9L347.3,301.3L342.8,298.6L340.4,289.5L342.5,284.5L348.9,279.3ZM187.1,141.5L169.4,151.1L155.2,148.6",
  "L163.3,131.5L158.1,114.5L171.7,101.1L179.3,92.9L187.7,92.2L198.4,103L193,114.7L194.7,126.7ZM381.9,84.5L375.9,98.7L365.4,88.9L364,81.5L378.7,75.6Z",
  "M225,28.8L214.3,49.3L224.5,46.7L235.4,46.8L232.8,61.9L223.8,78.1L234.1,79.2L243.9,101.8L250.7,104.5L256.9,123.9L259.7,130.4L271.8,133.6L270.6,144.1",
  "L265.5,148.9L269.5,157.2L260.5,165.5L247.1,165.3L230.1,169.7L225.4,166.6L218.8,173.9L209.6,172.2L202.6,178.1L197.2,175L211.9,158.4L220.9,155",
  "L205.2,152.3L202.3,145.9L212.8,140.8L207.3,131.9L209.2,121L224.1,122.5L225.5,112.7L218.7,101.9L206.6,98.9L204.2,94.2L207.8,86.3L204.5,81.5L199.1,89.8",
  "L198.5,72.7L193.5,63.4L197.1,44.3L204.9,28.9L212.9,30.4ZM746.1,302.6L751.2,312L755.9,312.6L758.9,316.1L750.7,317.2L748.9,327.3L747.3,331.8L743.6,334.8",
  "L743.8,341.1L747,350.5L756.5,353.1L763.4,359.4L777.6,361.6L793.3,358.3L794.2,355.3L792.4,346.4L793.8,333.1L786,328.7L788.6,319.8L782,319L784.2,308",
  "L793.6,311.2L802.4,307L795.1,299L792.2,291.3L784.2,294.7L783.1,304.5L780,295.9L779.5,292.6L781.9,287L780,282.2L768.4,277.6L763.9,265.2L758.4,261.6",
  "L758.1,257.1L767.8,258.4L768.2,248.1L776.7,245.8L785.4,247.9L787.2,233.9L785.4,225L775.4,225.7L766.9,222.1L755.4,228.5L746,231.6L741.5,240.1",
  "L731.8,242.5L721.8,257.1L730.9,270.3L729.9,279.6L740.8,295.5ZM983.7,563L983.2,560.8L983.2,547.9L981.3,537.9L966.7,544.3L959.7,543L946.7,530",
  "L951.4,526.1L948.5,521.8L936.8,512.6L929.4,509.8L926.5,501.9L918.7,493.6L900.3,495.6L884.1,495.8L870,497.4L851.1,494L840.3,491.5L829,490.1L824.7,476.4",
  "L819.9,474.4L812.2,476.4L802.2,481.8L789.9,478.1L779.8,469.5L770.2,466.2L763.5,455.5L756.1,440.1L750.8,442L744.4,438.2L740.7,442.7L734.8,442.1",
  "L736.8,447.2L735.9,449.8L739.2,458.4L743.1,468.2L748,470.8L749.7,474.8L756.5,479.5L757.1,484.1L756.1,487.8L757.4,491.5L760.3,494.6L761.6,498.3",
  "L763.1,501L762.4,492.9L765.1,487.1L767.9,485.9L770.9,489.4L771.1,495.9L768.9,502.4L770.8,506.6L772.6,506L773,509L780.8,507.3L789,507.6L795.1,507.9",
  "L801.9,500.5L809.4,493.4L815.7,486.5L818.6,482.8L819.9,483.7L818.9,488.3L817.6,490.3L819,499.1L823.5,506.6L829,510.6L836.4,512L842.3,514L846.8,520.2",
  "L849.5,523.8L853.1,525.2L853.1,527.6L849.4,534L847.8,537.1L843.6,540.5L839.9,547.8L835.3,547.3L833.3,549.8L831.7,555.2L832.9,562.3L832.4,563L666.1,563",
  "L666.1,563L664.4,557.8L657.5,550.5L653,548.8L646.4,538.6L645.2,531.1L645.7,524.7L639.9,512.7L635.3,508.4L629.9,506.1L626.5,499.8L627.1,497.3",
  "L624.3,491.6L621.4,489.1L617.5,480.8L611.4,471.8L606.3,464L601.3,464.1L602.9,457.8L603.3,453.8L604.5,449.3L604.2,447.6L601.4,452.2L599.3,460.8",
  "L596.6,466.7L594.2,468.7L590.9,465L586.4,460L579.2,443.6L578.2,444.6L582.3,456.7L588.5,468.1L596,485.6L599.7,491.6L603,497.9L611.9,510L609.9,511.9",
  "L610.3,519L621.9,528.8L623.7,531L626.9,541.5L624.7,543.5L626.1,554.4L628.6,563L92.5,563L92.5,563L92.4,562L91.2,556.7L92.2,551.4L89.6,546.3L84.4,541.7",
  "L84.8,537.2L85.3,532.2L89.1,529.3L92.4,523.6L91.7,520L95.2,512.3L100.8,505.3L104.1,503.5L106.8,497.1L107,491.2L110.6,484.3L117.2,480.3L123.6,468.8",
  "L128.8,464.3L138.1,463L146,455.3L151,452.2L159.4,442.6L156.8,428.2L160.7,418.1L162,411.8L168.4,403.8L178.4,398.3L185.9,393.3L192.6,380.7L195.7,373.2",
  "L203.1,373.3L209.1,378.5L218.6,377.6L229,380.3L233.3,380.5L242.9,373.8L253.7,371.6L260,366.5L269.7,362.7L286.6,360.5L303.2,359.5L308.2,361.3",
  "L317.6,356.4L328.3,356.3L332.4,359.2L339.2,358.5L350.1,353.4L357.1,354.9L356.8,361.3L365.3,356.7L366,359.1L361,365.2L360.9,370.9L364.4,374L363.1,384.6",
  "L356.5,390.7L358.4,397.2L363.6,397.5L366.1,403.2L369.9,405L381.6,409.1L385.8,408.1L394.2,410.1L407.4,415.4L412.1,425.9L421.1,428.1L435.2,433",
  "L445.9,438.8L450.8,435.8L455.5,430.4L453.2,421.4L456.3,415.7L463.5,410.1L470.4,408.5L483.9,411L487.4,416.3L491.1,416.3L494.3,418.3L504.2,419.7",
  "L506.7,423.6L519.9,423.4L529.6,426.5L539.5,430L544.1,431.8L551.8,428.1L555.9,424.7L564.8,423.7L571.9,425.2L574.6,431L576.9,427.2L584.9,430L592.7,430.6",
  "L597.7,427.7L600.5,423.8L599.9,423.2L602.5,417.7L604.5,408.7L606,405.7L606.3,405.6L609.8,395.8L614.8,387.3L615,386.9L614,377.5L616.5,372.4L612.8,366.8",
  "L616.6,362.2L610.5,363.2L602.1,360.4L595.3,367.5L580.1,368.9L572,362.3L561.2,361.8L558.9,367L552,368.5L542.3,361.8L531.4,362.1L525.5,349.6L518.2,342.6",
  "L523,332.6L516.7,326.4L527.8,314L543.2,313.4L547.4,303.4L566.5,305.2L578.5,296.5L590.1,292.7L606.7,292.4L624.1,301.8L638.5,307L650.1,305L658.7,306.1",
  "L670.5,299.2L672,293.5L669.5,284.2L663.8,279.2L658.2,277.6L654.5,273.4L641.8,261.7L630.4,256.4L621.8,248.1L629,245.8L637.3,233.8L631.7,228.1",
  "L646.5,222.1L646.2,218.9L637.2,221.3L629.2,222.5L622.6,227.2L613.2,228L604.6,233.4L605.2,242.3L610.1,245.8L620.3,244.9L618.3,250L607.4,252.4",
  "L593.8,260.6L588.3,257.7L590.5,251.1L579.5,246.9L581.3,244.2L590.9,239.5L588,236.2L572.4,232.5L571.7,227.1L562.5,228.9L558.8,236.8L551,247.4",
  "L551.3,251.1L546.4,254.1L543.4,252.8L540.6,269.7L535.4,275.4L531.8,285.1L535,292.9L536.1,298L544.9,302.3L543.1,305.6L531.2,306.3L526.9,310.4",
  "L518.6,317.5L515.4,311.4L515.6,308.7L509.5,308.3L504.2,307L492.2,310.5L499.1,317.8L494,320L488.4,320L483.2,313.2L481.3,316.1L483.5,323.9L488.5,330",
  "L484.7,332.8L490.3,338.7L495.2,342.4L495.4,349.6L486.1,346.2L489.1,352.7L482.8,354L486.5,365L479.9,365.2L471.7,359.7L468,349.7L466.2,341.3L462.3,335.4",
  "L457.2,328L456.5,324.3L454.8,323.4L454.6,320.6L449.1,316.2L448.2,309.9L449,300.9L450.4,296.7L448.7,294.6L446.6,293.6L443.8,289.2L439.5,286.5",
  "L430.1,281.5L424.3,276.5L415.1,272.4L406.8,262.2L408.8,261.2L404.2,255.3L404,250.5L397.6,248.3L394.5,254.4L391.6,249.6L391.8,244.7L392.1,244.5",
  "L394.4,243.2L386.4,241.1L378.3,246.2L378.8,253.2L377.6,257.2L380.9,264.3L390.3,271.3L395.3,282.7L406.4,293.6L414.2,293.5L416.7,296.4L413.9,299.1",
  "L422.9,303.9L430.2,307.9L438.8,314.8L439.8,317.3L437.9,321.9L432.4,315.8L423.7,313.7L419.5,322.1L426.7,326.9L425.5,333.7L421.3,334.4L416,345.4",
  "L411.8,346.4L411.9,342.5L413.9,335.6L416.1,332.9L412.2,325.4L409.1,318.8L405,317.2L402,311.5L395.6,309.1L391.3,303.8L383.9,303L376.1,296.9L366.9,288.2",
  "L360.1,280.3L357,266.7L352,265.1L343.9,260.5L339.3,262.4L333.5,268.8L329.4,269.9L320.3,277.6L300.6,273.9L286,278.4L284.9,286.6L285.4,294.4L275.9,303.3",
  "L263.1,306.1L262.2,310.6L256.1,317.8L252.2,328.4L256.1,335.8L250.3,341.5L248.2,349.7L240.6,352.2L233.5,361.9L220.9,362.1L211.3,361.8L205,366.2",
  "L201.2,370.9L196.3,369.9L192.6,365.7L189.8,358.5L180.5,356.6L176.4,359.8L171.2,358.1L166,359.4L167.5,349.6L166.6,341.8L162.1,340.6L159.7,335.8",
  "L160.5,327.4L164.5,322.7L165.2,317.4L167.3,309.5L167.1,303.9L165.1,299.1L164.7,294.6L165.2,285L161.1,279L175.2,269.1L187.4,271.6L200.9,271.5",
  "L211.5,273.9L219.8,273.1L236,273.6L241.2,265.3L243.1,237.1L232.7,221.9L225.4,214.4L210.1,208.7L209.1,197.7L222,194.4L238.8,198.3L235.6,181L245.1,187.6",
  "L268.4,175.5L271.4,162.6L280.1,159.4L288.1,156.3L293.3,151.9L302.1,127.7L315.8,120.7L324.1,121.2L326,117.7L334.4,116.8L336.2,120.5L343,112.1",
  "L340.7,105.7L340.3,95.9L336.2,86.2L335.9,67.9L337.6,63L340.4,57.4L349.2,56.3L352.8,51.2L360.8,45.9L360.5,55.5L357.5,61.5L358.7,66.6L364.1,69.3",
  "L361.7,76.1L358.7,74.2L351.5,87L354.2,95.5L354.4,102.2L364.5,106.3L364.4,112.3L374.6,109.1L380.2,104.4L391.5,111.2L396.2,116.6L403,111.6L418.6,103.7",
  "L431.2,97.8L441.2,100.8L442,105L451.6,105.2L453.9,97.6L467.7,91.9L465.5,77L465.9,63.4L470.8,51.9L480.2,45.5L488.2,59.4L496.2,59L498.1,44.8L499.3,33.6",
  "L495.6,36L489.3,29.2L488.4,18.1L501,12.6L513.6,9.8L524.5,13L534.8,12.4L546.2,1.4L544.6,0L1000,0L1000,563ZM502,0L500,0.9L483.7,5.1L481,0L502,0ZM442.5,0",
  "L442.9,0.4L433.7,22.6L423.3,27.1L419.5,58.7L413.8,75.7L401.7,74L396,88.1L384.4,88.9L381.2,72.1L372.9,51.3L365.3,24.5L358.6,12.5L338.8,34.9L325.5,39.4",
  "L311.6,29.7L308.1,8.7L307.5,0L442.5,0Z",
].join("");

const BORDER_D = [
  "M84.8,537.2L85,537.2L107.5,536.3L108.7,532.5L112.8,527.6L116.1,512.6L130,500.8L134.7,486.8L137.8,486L141.1,477.3L149.5,476.1L153.1,477.5L157.6,477.5",
  "L160.9,475L167.1,474.6L166.8,468.6L168.3,468.6L168.4,469.4L168.1,471.5L168.1,488.5L135.3,487.9L135.6,516.1L126.2,517L123.8,522.6L125.7,538.2",
  "L86.5,538.1L84.4,541.7M746,231.6L740.9,229.2L742,221.7L735.6,211.8L728.1,212.2L719.7,202.1L725.4,190.6L722.5,187.5L730.5,170.4L740.8,179.4L742,168",
  "L762.7,150.7L778.3,150.3L800.3,161.4L812.2,167.8L822.8,161.1L838.6,160.8L851.4,169L854.3,164.3L868.4,165L870.9,157.4L854.7,146.4L864.3,138.4",
  "L862.4,133.9L872,129.6L864.8,118.2L869.4,112.4L906.8,106.4L911.7,102.2L936.7,95.8L945.7,88.5L963.6,92.3L966.8,110.2L977.3,106L990.1,111.9L989.2,121.1",
  "L998.9,120.2L1000,119.4M1000,276.5L997.1,275.3L991.4,278.1L989.9,286.2L973.4,281.5L966.9,283.4L964.6,289.4L958.9,291.9L945.7,301.2L941.3,310.7",
  "L937.6,310.8L934.8,304.5L922.1,304.1L920.1,293.1L915.2,293L916,279.4L904,269.4L886.9,270.5L875.1,272.5L865.6,259.9L857.4,254.6L841.9,244.5L840,243.3",
  "L814.3,251.7L814.7,302.2L809.6,302.9L802.5,292.4L795.8,288.6L784.4,291.4L780,295.9M964.6,289.4L967.6,290.7L959.2,299.4L966.6,304.4L973.7,301.1",
  "L985.5,308.1L972.8,317.6L965.1,316.3L961,316.6L959.6,313L961.7,306.8L948.3,309.9L945.1,318.4L940.4,325.5L932,324.9L929.4,330.6L936.8,333.7L938.9,343.2",
  "L933.3,356L925.7,353.3L920.2,353.3L920.4,345.5L907.2,340.1L896.7,333.8L890.2,327.7L878.8,318.8L873.8,305.2L870.5,302.8L859.6,303.4L855.8,300.7",
  "L854.7,290L841.3,282.8L832.9,290.7L824.3,295.3L825.9,302L814.7,302.2M493.5,563L493.4,556.9L493.5,552.4L505,552.4L505,531L545.2,531L584,531L623.7,531",
  "M410,563L411.9,552.8L414,548.3L409.9,544.6L409.7,541.2L406,538.4L403.5,521.6L413.6,515.7L453.5,536.4L493.4,556.9M467.7,91.9L478.1,95L482.6,97.8",
  "L481.5,102.5L482.3,106.9L463.9,107.1L451.6,105.2M740.8,295.5L734.9,300.9L733.1,304.3L728.7,303.4L721.9,295.3L719.1,294.8L712.8,291.7L709.7,286.2",
  "L700.4,283.3L694.3,285.5L692.6,282.9L679,276.4L664.2,274.2L655.8,271.8L654.5,273.4M637.2,221.3L637.6,214.7L642.7,210.6L652.4,209.5L654,204.5",
  "L651.7,196.2L655.8,188.2L655.7,183.7L640.9,178.7L635.1,178.8L628.9,171.5L621.2,174L608.6,168.5L608.8,165.4L605.2,158.5L597.2,157.7L596.4,152.7",
  "L598.9,149.5L592.5,140.3L582.2,141.8L579.1,141L576.6,144.7L572.9,144.1L570.4,133.6L568,128.1L570,126.5L578,127.1L581.9,123.4L579.1,119L572.3,116",
  "L572.9,112.9L568.8,109.8L562.6,98.5L564.7,93.8L563.8,85.6L554,81.4L548.7,83.5L547.3,79.1L536.8,74.6L533.6,63.9L532.7,55L527.9,50.7L532.2,44.8",
  "L529.2,27.1L536.3,15.9L534.8,12.4M589.4,237.7L592,234.2L599.1,237.3L602.3,237.8L603.6,240.7L605.1,241.1M377.8,0L369.7,13.3L365.3,24.5M280.1,159.4",
  "L281.6,165L286.2,165.3L290.9,171.6L297.9,178.9L303,177.7L311.8,184.8L314,186.1L316.9,185.8L321.6,189.8L336,192.6L330.9,203L329.7,213.6L326.9,216.2",
  "L322.4,214.8L322.7,218.6L315.4,226.8L315.2,233.4L320,231.1L323.4,237.5L323,241.5L326,246.9L322.5,251.2L325.1,262.1L330.5,263.8L329.4,269.9M284.9,286.6",
  "L273.3,288.3L262,282.2L258.4,285.1L240,278.9L236,273.6M197.1,563L195.3,545.6L190.5,498.7L205.8,498.5L239.5,522.4L273.2,545.9L275.6,550.9L281.8,553.9",
  "L286.5,555.6L286.6,562.4L297.7,561.4L297.7,563M168.1,471.5L205.8,498.5M297.7,561.4L311.8,556.6L340.7,535.6L375,515L390.8,519.7L396.4,525.7L403.5,521.6",
  "M606.3,405.6L609.6,405.6L610.5,403.5L613.2,403.3L613.4,408.2L612,410L612.2,410.1L610.4,413.9L606.8,412.2L604.8,420.1L607.2,421.4L604.7,423L604.3,426.1",
  "L609,424.5L609.2,429.1L604.2,447.6L603.2,444.6L597.7,427.7M615,386.9L619.5,387.5L621.1,392.2L615.7,396.8L613.2,403.3M610.4,413.9L610.4,421.1L609,424.5",
  "M369.9,405L369.3,414.2L364.5,417.6L361.4,421.3L354.5,425.9L355.6,430.7L354.7,435.6L349.8,438.3L345.6,417.3L339.4,412.5L339.3,409.7L331.1,402.6",
  "L330.3,393.5L336.4,386.7L338.8,376.7L337.2,364.9L339.2,358.5M168.3,468.6L168.3,455.1L184.4,446.7L194.4,444.9L202.6,441.8L206.4,436.1L218.1,431.5",
  "L218.5,422.8L224.3,421.8L228.8,417.4L241.9,415.4L243.7,410.8L241.1,408.3L237.7,395.6L237.1,388.3L233.3,380.5M349.8,438.3L353,448.5L353.6,453.8",
  "L351.8,463.1L352.6,468.3L351.3,474.4L352.1,481.5L348.2,486.1L354.1,494.2L354.5,498.9L358.1,505.1L362.7,503.1L370.6,508.2L375,515M612.2,410.1",
  "L623.3,414.8L642.9,402.1L647,416.6L645,418.4L625,424.3L635,436L631.7,437.9L630,441.8L622.4,443.4L620,447.6L615.7,451.1L604.5,449.3M815.7,486.5",
  "L817.6,490.3M819,499.1L813.9,499.1L813,506.3L814.8,507.8L810.3,510L810.3,514.4L807.3,518.9L807.1,523.3L805.1,525.6L775,520.1L771.2,509.1L770.8,506.6",
  "M768.9,502.4L766.1,503.1L763.1,501M739.2,458.4L732.1,458.8L729.6,453.3L720.7,452.2L728,441.2L734.8,442.1M642.9,402.1L665.1,389.6L668.8,374.8",
  "L667.9,365.8L673.4,362.7L678.5,354.9L682.8,353L694.4,354.6L697.9,357.8L702.7,355.7L709.2,370.5L715.8,374.2L716.5,381.4L711.5,385.6L709.2,395",
  "L716.1,406.5L728.4,413L733.5,421.9L731.8,430.4L735,430.4L735.2,436.6L740.7,442.7M720.7,452.2L702.1,451.3L673.9,428L659,419.8L647,416.6M775,563",
  "L805,552.4L811.7,531L807.1,523.3M936.8,512.6L943.4,505.3L965.4,505.3L963.4,495.9L957.8,490.3L956.7,481.7L950.1,476.7L961.2,464.8L972.8,465.7",
  "L983.2,453.8L989.5,442.1L999.2,430.5L999.1,422.1L1000,421.4M1000,409.8L999.5,409.5L996,401.4L992.5,390.8L997.4,385.6L1000,386.1M870,497.4L873.8,484.5",
  "L888.2,478.7L887.3,473.6L882.5,471.7L882.3,461.8L872.7,456.8L868.7,449.9L863.7,443.8L880.5,449.7L890.5,448L896.5,449.4L898.5,446.9L905.5,447.9",
  "L918.5,443.1L918.8,433.3L924.4,426.7L931.8,426.7L932.9,423.4L940.6,421.9L944.3,423L948.2,419.7L947.6,412.6L951.9,405.4L958.2,402.4L954.3,394.4",
  "L963.8,394.8L966.6,390.4L966.1,385.8L971.1,380.7L970,374.6L967.6,369.3L973.5,363.9L984.2,361.3L995.7,359.9L1000,357.9M933.3,356L936.4,357.5",
  "L943.6,353.5L946.9,355.9L950.2,350.2L956.2,350.4L957.7,348.6L958.8,343.4L963.1,339L968.5,341.9L967.4,345.8L970.4,346.4L969.5,357L973.4,361.1",
  "L976.9,358.4L981.4,357.2L987.6,351.6L994.5,352.5L1000,352.5M863.7,443.8L872.8,433.3L872,425.8L864.4,423.8L863.6,416.4L860.4,406.9L864.6,400.3",
  "L860.3,398.6L863,389.8L867.1,374.6L877.3,379.2L884.8,377.6L886.9,372L894.8,370.2L900.5,366.4L902.4,356.4L910.9,354L912.5,349.5L917.2,352.9L920.2,353.3",
  "M965.1,316.3L961.5,320.3L950.6,318.1L949.6,325.6L960.5,324.6L972.8,328.8L991.8,326.9L994.3,338.8L997.6,337.5L1000,338.6M1000,316.5L993.2,320.8",
  "L994.6,323.9L991.8,326.9M867.1,374.6L866.2,364.1L858.8,363.7L847.3,352.6L839.4,351.2L828.3,344.8L821.2,343.7L816.8,346L810.1,345.7L803,352.9",
  "L794.2,355.3M702.7,355.7L697.2,345.6L699.2,341.6L696.1,326.9L702.9,323.2L704.5,328.1L709.6,334.1L716.4,335.7L720.1,335.4L731.8,325.9L735.6,324.9",
  "L738.5,328.7L735.1,335.1L741.3,341.8L743.8,341.1M616.5,372.4L619.2,369.8L621.9,367L622.4,360.1L625.7,362.5L636.7,359L642,361.4L650.2,361.4L661.8,356.7",
  "L667.1,356.9L678.5,354.9M716.4,335.7L712.4,328.3L712.4,326.3L708,326.3L705,322.9L702.9,323.2L699,319.4L691.6,316.2L692.5,309.7L690.8,305.1L704.7,303",
  "L706.8,306.5L710.6,308.8L708.6,312.1L713.9,316.6L711.1,320.8L715.4,324.3L719.8,326.4L720.1,335.4M572.9,144.1L564.3,145L561.2,148.6L560.6,156.7",
  "L556.6,155.1L547.6,155.9L544.9,152.2L541.2,155L537.4,152.6L529.6,152.3L518.4,148.4L508.3,147.2L500.5,147.5L495.1,151.9L490.3,152.5L490.1,145.3",
  "L487,137.8L493,134.4L493.1,127.8L490.3,121.4L489.8,114L499.5,114.1L510.4,107.7L512.7,97.9L520.9,92.3L519.9,84.5L526,81.5L536.8,74.6M551,247.4",
  "L546.5,245L541.8,247.3L537.3,244.7L539.9,243.1L541.6,238.2L544.4,233.6L543.6,231L545.7,229.8L546.7,231.8L552.6,232.3L555.3,231.2L553.4,229.7",
  "L554.1,227.6L550.6,223.8L549.1,217.7L545.5,215.3L546.2,210.2L541.7,206.2L537.6,205.7L530.2,201L523.6,202.5L521.2,204.7L517,204.7L514.5,208.2",
  "L507.1,209.6L503.7,211.9L499,208.3L492.6,208.2L486.4,206.6L482.1,209.8L481.4,205.7L475.8,201.6L477.8,195.6L480.6,191.6L482.8,192.5L480.2,185.6",
  "L489.3,172.7L494.2,170.9L495.3,166.4L490.3,152.5M480.6,191.6L471.1,185.7L463.9,187.9L459.2,186.3L453.2,189.6L448.2,184.1L444.1,186.2L443.5,185.3",
  "L438.9,177.7L431.5,176.7L430.6,171.8L423.7,170.1L422.2,174.1L416.8,170.9L417.4,166.6L409.9,165.2L405.2,160.1L401.1,149.8L401.9,144.2L399.4,135.5",
  "L395.7,129.6L398.5,125.1L396.2,116.6M482.3,106.9L487.4,108.7L489.8,114M482.1,209.8L476,212.9L471.3,222.9L465.2,232.8L457.2,235.5L451,234.8L443.3,238.6",
  "L439.6,240.8L431.3,238L423.8,231.8L420.7,230L418.7,225.1L417,225M424.8,206.1L424,212.2L418.4,212.3L420.3,215.5L417,225L415.1,227.4L406.4,227.8",
  "L401.3,231.1L393.1,230L378.8,226.2L376.5,221.1L366.7,223.6L365.5,226.4L359.4,224.4L354.3,224L349.8,221.3L351.3,217.7L351,215.1L353.9,214.2L359,218.3",
  "L360.4,214.4L369.2,215.1L376.4,212.4L381.2,212.9L384.3,215.9L385.3,213.4L383.8,203.7L387.4,201.7L391,194.8L398.4,199.7L404,193.4L407.6,192.3",
  "L415.3,196.9L420,196.2L424.6,199L423.8,200.9L424.8,206.1L429.9,210L433.6,211.6L442,209.8L442.8,206.8L446.8,206.3L451.6,204L452.7,205L457.4,203.1",
  "L459.8,199.5L463,198.6L473.7,203.2L475.8,201.6M537.3,244.7L535.5,238.1L536.6,232L536.3,225.6L530.5,216.8L527.3,210.6L524.2,206.1L521.2,204.7",
  "M540.6,269.7L534.7,268.2L527.4,263.2L515.7,266.4L510.7,269.9L496,269.2L488.3,267L484.4,268.1L481.6,262.3L479.7,259.9L482.1,257.5L479.6,255.8",
  "L476.5,258.9L470.6,254.9L469.8,249L463.7,245.7L462.6,241.1L457.2,235.5M465.5,77L477,71.5L493.8,72.7L503.6,70.9L505,74.6L510.3,75.8L519.9,84.5",
  "M498.1,44.8L506.7,41.4L511,43.7L519.6,50.7L527.9,50.7M405.2,160.1L400.7,161.7L398.1,159.9L395.6,163L388.4,166L384.7,169.9L377.4,173.3L379.1,178",
  "L380.2,184.5L385.3,188.2L391,194.8M351,215.1L340.2,210.5L338.2,213.7L329.7,213.6M316.9,185.8L317.4,179L315.4,175.5L316.6,164.9L314.9,148.1L320.9,148.1",
  "L323.4,142L325.9,126.9L324.1,121.2M340.3,95.9L347.8,98.2L354.2,95.5M535,292.9L526.4,291.1L516.2,295.3L516.1,301.9L507,303.2L499.9,298.6L491.9,302.2",
  "L484.5,301.8L483.8,293L478.8,288.7L480.5,286.7L479.4,285.1L481.1,280.8L484.8,276.5L480,270.6L479.1,265.5L481.6,262.3M516.2,295.3L521,298.8L517.9,307.2",
  "L515.6,308.7M456.5,324.3L461.2,318L461.7,313.8L465,311.9L465.2,308.4L471.7,307.2L475.6,304.3L481,304.6L482.6,302.3L484.5,301.8M670.5,299.2L681.2,298.6",
  "L690.8,305.1M448.7,294.6L448.1,290.3L452.4,283.6L453,286.2L455.7,285L457.8,288.7L460.2,290L460.9,294.9L459.6,299.5L461,305.2L465.2,308.4M443.3,238.6",
  "L445.7,244.2L448.9,248.2L445.1,253.6L440.5,250.4L433.6,250.6L425,248.3L420.3,248.6L418.2,251.5L414.6,248.3L412.5,254.1L417.4,260.7L419.6,265",
  "L424.1,270.2L428,273.3L431.7,279L440.6,284.2L439.5,286.5M392.1,244.5L399.1,245L401,242.6L404.3,244.9L408.3,245.2L408.2,241.2L411.7,239.7L412.7,233.9",
  "L420.7,230M359.4,224.4L358.6,230.3L354.2,232.8L346.8,230.9L344.7,236.8L339.9,237.3L338.2,235L332.6,239.8L327.7,240.5L323.4,237.5M311.8,184.8",
  "L312.8,176.1L315.4,175.5M288.1,156.3L295.5,157.5L304.7,154.2L311.1,161.2L316.6,164.9M164.7,294.6L168.3,291.1L172.4,289.2L174.9,295.8L180.8,295.8",
  "L182.5,294.1L188.3,294.5L191.1,301.2L186.5,304.8L186.4,315.1L184.7,317L184.3,323.2L180,324.3L184,332L181.3,340.5L184.7,344.2L183.3,347.7L179.6,352.4",
  "L180.5,356.6M179.3,92.9L181.3,102.3L179.3,111.5L185.5,111.2L193,114.7M393.1,230L392,237.1L394.4,243.2M704.7,303L707.2,300.9L714.6,304.7L720,305.5",
  "L721.4,303.9L716.5,296.7L719.1,294.8M424.6,199L426,195.7L430.4,195.9L433.9,194.4L434.1,193L436.1,192.2L436.7,188.8L439,188.1L440.6,185.3L443.5,185.3",
  "M594.8,381.8L593.7,381.4L591.8,382.3L590.3,382.1L589.7,382.5L589.6,381.3L588.8,380.5L586.9,380.4L584.2,381.5L582.3,380.8M505,531L505,490.7L505,450.6",
  "L502,441.3L504.6,434.2L503,429.2L506.7,423.6M445.1,253.6L448.7,253.5L446.2,259.7L451,265.1L449.5,271.6L447.2,272.2L445.3,273.5L442.1,276.7L440.6,284.2",
  "M460.9,294.9L462.2,295L462.6,292.3L468.5,290.2L470.8,289.7L474.2,288.9L478.8,288.7M470.8,289.7L470.4,288.7L471.6,287L472.7,283.7L471.3,283.8",
  "L469.4,281.3L467.7,280.6L466.4,278.4L464.6,277.6L463.1,275.7L461.3,276.4L460,281L457.6,282L458.4,280.8L454.6,277.9L451.3,276.5L449.9,274.6L447.2,272.2",
  "M457.6,282L455.7,285",
].join("");

const SHAPE_D = {
  dubai: "M770.8,506.6L772.6,506L773,509L780.8,507.3L789,507.6L795.1,507.9L801.9,500.5L809.4,493.4L815.7,486.5L817.6,490.3L819,499.1L813.9,499.1L813,506.3L814.8,507.8L810.3,510L810.3,514.4L807.3,518.9L807.1,523.3L805.1,525.6L775,520.1L771.2,509.1Z",
  ingiltere: "M193,114.7L185.5,111.2L179.3,111.5L181.3,102.3L179.3,92.9L187.7,92.2L198.4,103ZM224.1,122.5L224.1,122.5L225.5,112.7L218.8,102.2L218.7,101.9L206.6,98.9L204.2,94.2L207.8,86.3L204.5,81.5L199.1,89.8L198.5,72.7L193.5,63.4L197.1,44.3L204.9,28.9L212.9,30.4L225,28.8L214.3,49.3L224.5,46.7L235.4,46.8L232.8,61.9L223.8,78.1L234.1,79.2L234.9,81.1L243.9,101.8L250.7,104.5L256.9,123.9L259.7,130.4L271.8,133.6L270.6,144.1L265.5,148.9L269.5,157.2L260.5,165.5L247.1,165.3L230.1,169.7L225.4,166.6L218.8,173.9L209.6,172.2L202.6,178.1L197.2,175L211.9,158.4L220.9,155L220.8,155L205.2,152.3L202.3,145.9L212.8,140.8L207.3,131.9L209.2,121Z",
  kktc: "M582.3,380.8L584.2,381.5L586.9,380.4L588.8,380.5L589.6,381.3L589.7,382.5L590.3,382.1L591.8,382.3L593.7,381.4L594.8,381.8L595,382.8L584.8,387.8L579.9,386.2L577.6,381.3Z",
};
