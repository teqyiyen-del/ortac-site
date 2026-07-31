"use client";

import { useId, type ReactElement } from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";

/* Kuruluş adımları, çizilmiş hâlleriyle. Bunlar gece ekranında duruyor, yani
   buradaki her dolgu koyu yüzey değeri — soldaki ray zaten kelimeleri taşıyor,
   sahnenin tek işi olan şeyi göstermek.

   Değerlerin hepsi şematik yer tutucu: maskelenmiş numaralar, açıkça uydurma bir
   şirket adı, hiçbir gerçek belgenin taklidi yok. Hiçbir sahne bir banka ya da
   otorite kararını ima etmiyor; gösterilen her durum ya bizim yaptığımız iş
   ("hazırlandı", "gönderildi") ya da hâlâ açık olan iş ("onayda").

   ---- Küme neden büyüdü ve neden artık sıraya göre indekslenmiyor ----

   Başta beş çizim vardı ve tüketicileri (ana sayfadaki ProcessScroll ile ülke
   sayfalarındaki CountryProcess) çizimi adımın SIRA NUMARASIYLA seçiyordu.
   Bu, üç ülkenin de aynı beş adımı taşıdığı sürece çalıştı. Dubai listesi yediye
   çıkınca kurgu çöktü: altıncı ve yedinci adımın karşılığı yoktu, üstelik
   kaymadan ötürü dördüncü adım da yanlış çizimi gösteriyordu — "kuruluş tipinin
   seçilmesi"nin üstüne banka kartı düşüyordu. Sıra numarası adımın kimliği
   değil, yalnızca o ülkedeki yeri; ülke başına adım sayısı değişince eşleşme
   kayıyor.

   İki şey yapıldı. Eksik çizimler yazıldı (faaliyet-lisans eşleştirmesi, kuruluş
   tipi seçimi, kimlik ve sağlık kontrolü, kayıtlar) ve eşleşme ADIMIN KENDİSİNE
   bağlandı: `stepSceneKind()` adımın başlığından bir tür çıkarıyor, çizim o
   türden geliyor. Artık bir ülkeye adım eklemek ötekilerin çizimini
   kaydırmıyor.

   Türe bağlı olmanın bir bedeli var ve bilerek ödeniyor: türe bağlı sahneler
   yalnızca kendi adımlarında göründüğü için o adımın kelime dağarcığını
   kullanabiliyorlar ("Serbest bölge", "Mainland"). Beş genel sahne (form, isim,
   lisans, banka, teslim) üç ülkede birden çıktığı için hâlâ hiçbir ülke,
   otorite veya banka adı taşımıyor. */

const EASE = [0.22, 1, 0.36, 1] as const;
const W = 560;
const H = 330;

/* the sample company that runs through every scene */
const SAMPLE_CO = "Velocity Trading";
/* aynı örnek kişi formda da kimlik kartında da geçiyor: iki sahne aynı dosyayı
   anlatıyor, iki farklı isim onları iki ayrı hikâyeye böler */
const SAMPLE_PERSON = "Mert Kayacan";

/* ---------- 1 · the intake form fills itself in ---------- */
/* w = rough pixel width of the value text, used for the caret and the reveal */
const FORM_FIELDS = [
  { label: "Ad Soyad", value: SAMPLE_PERSON, x: 68, row: 0, w: 94 },
  { label: "Pasaport no", value: "U 07•••••", x: 292, row: 0, w: 70 },
  { label: "Faaliyet", value: "E-ticaret", x: 68, row: 1, w: 64 },
  { label: "Ülke", value: "Türkiye", x: 292, row: 1, w: 54 },
];

export function SceneForm() {
  /* clip ids have to be unique per instance and safe inside url(#…) — React's
     generated id carries punctuation, so strip everything that is not a plain
     id character and keep a letter in front */
  const uid = `f${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="sv sv-dark"
      role="img"
      aria-label="Başvuru formu örnek değerlerle dolduruluyor"
    >
      <defs>
        {FORM_FIELDS.map((f, i) => (
          <clipPath key={f.label} id={`${uid}-f${i}`}>
            <motion.rect
              x={f.x + 16}
              y={116 + f.row * 76}
              height={22}
              initial={{ width: 0 }}
              animate={{ width: f.w + 10 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.32, ease: EASE }}
            />
          </clipPath>
        ))}
      </defs>

      <rect x="40" y="24" width="480" height="282" rx="20" className="dv-card" />
      <text x="68" y="60" className="dv-h">
        Başvuru formu
      </text>
      <text x="492" y="60" className="dv-lbl" textAnchor="end">
        örnek doldurma
      </text>

      {FORM_FIELDS.map((f, i) => (
        <g key={f.label}>
          <text x={f.x} y={100 + f.row * 76} className="dv-lbl">
            {f.label}
          </text>
          <rect
            x={f.x}
            y={110 + f.row * 76}
            width="200"
            height="34"
            rx="9"
            className="dv-input"
          />
          {/* the value is revealed left to right, as if typed */}
          <text
            x={f.x + 16}
            y={132 + f.row * 76}
            className="pr2-dv-val"
            clipPath={`url(#${uid}-f${i})`}
          >
            {f.value}
          </text>
          <motion.rect
            y={118 + f.row * 76}
            width="2"
            height="18"
            className="dv-caret"
            initial={{ x: f.x + 16, opacity: 0 }}
            animate={{ x: f.x + 16 + f.w + 4, opacity: [0, 1, 1, 0] }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.32, ease: EASE }}
          />
          <motion.g
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.32,
              delay: 0.8 + i * 0.32,
              ease: [0.34, 1.5, 0.64, 1],
            }}
            style={{ transformOrigin: `${f.x + 178}px ${127 + f.row * 76}px` }}
          >
            <circle cx={f.x + 178} cy={127 + f.row * 76} r="11" className="dv-ok" />
            <Check
              x={f.x + 171}
              y={120 + f.row * 76}
              width={14}
              height={14}
              strokeWidth={3.2}
              className="dv-ok-ic"
            />
          </motion.g>
        </g>
      ))}

      <motion.text
        x="68"
        y="252"
        className="dv-s"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.5 }}
      >
        Form ve belgeler tek yerden toplanır.
      </motion.text>

      <motion.rect
        x="68"
        y="272"
        width="424"
        height="4"
        rx="2"
        className="dv-track"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      />
      <motion.rect
        x="68"
        y="272"
        height="4"
        rx="2"
        className="dv-progress"
        initial={{ width: 0 }}
        animate={{ width: 424 }}
        transition={{ duration: 1.7, delay: 0.3, ease: EASE }}
      />
    </svg>
  );
}

/* ---------- 2 · the name is checked, then filed ---------- */
export function SceneName() {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="sv sv-dark" role="img" aria-label="İsim onayı">
      <rect x="40" y="52" width="480" height="112" rx="18" className="dv-card" />
      <text x="68" y="90" className="dv-lbl">
        Aday şirket adı
      </text>
      <text x="68" y="130" className="dv-name">
        {SAMPLE_CO}
      </text>

      {/* a scan line sweeps the name */}
      <motion.rect
        y="56"
        width="3"
        height="104"
        className="dv-scan"
        initial={{ x: 44, opacity: 0 }}
        animate={{ x: [44, 512, 44], opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
      />

      <motion.g
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 1.7, ease: [0.34, 1.4, 0.64, 1] }}
        style={{ transformOrigin: "440px 108px" }}
      >
        <rect x="366" y="90" width="128" height="36" rx="18" className="dv-pill-ok" />
        <Check x={382} y={100} width={16} height={16} strokeWidth={3} className="dv-ok-ic" />
        <text x="406" y="113" className="dv-pill-t">
          Uygun
        </text>
      </motion.g>

      {/* handed on to the authority */}
      <motion.path
        d="M 280 176 L 280 224"
        className="dv-wire"
        markerEnd="url(#dv-head)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 2, ease: EASE }}
      />
      <defs>
        <marker id="dv-head" markerWidth="7" markerHeight="7" refX="5.5" refY="3.5" orient="auto">
          <path d="M0 0 L7 3.5 L0 7 Z" className="dv-arrow" />
        </marker>
      </defs>
      <motion.g
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 2.2, ease: EASE }}
      >
        <rect x="150" y="232" width="260" height="56" rx="16" className="dv-node" />
        <text x="280" y="257" className="dv-t" textAnchor="middle">
          Tescil otoritesi
        </text>
        <text x="280" y="276" className="dv-s" textAnchor="middle">
          ön başvuru iletildi
        </text>
      </motion.g>
    </svg>
  );
}

/* ---------- 3 · the registration comes back approved ---------- */
/* a schematic summary card, deliberately not a facsimile of a licence */
const LICENCE_ROWS = [
  { label: "Lisans no", value: "•••-••••" },
  { label: "Faaliyet sınıfı", value: "Ticari / Teknoloji" },
  { label: "Geçerlilik", value: "1 yıl" },
];

export function SceneLicence() {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="sv sv-dark"
      role="img"
      aria-label="Tescil ve lisans özeti, şematik"
    >
      <motion.g
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <rect x="76" y="26" width="344" height="278" rx="16" className="dv-doc" />
        <text x="104" y="64" className="dv-h">
          Tescil ve lisans
        </text>
        <text x="104" y="86" className="dv-lbl">
          şematik özet
        </text>
        <rect x="104" y="102" width="288" height="1" className="dv-ln" />
      </motion.g>

      {LICENCE_ROWS.map((r, i) => (
        <motion.g
          key={r.label}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.5 + i * 0.16, ease: EASE }}
        >
          <text x="104" y={134 + i * 38} className="dv-lbl">
            {r.label}
          </text>
          <text x="392" y={134 + i * 38} className="pr2-dv-val" textAnchor="end">
            {r.value}
          </text>
        </motion.g>
      ))}

      <text x="104" y="258" className="dv-lbl">
        Durum
      </text>
      {/* pending, then approved — same slot, one hands over to the other */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.3, delay: 0.55, times: [0, 0.2, 0.78, 1] }}
      >
        <rect x="288" y="242" width="104" height="26" rx="13" className="dv-node" />
        <text x="340" y="259" className="pr2-dv-wait-t" textAnchor="middle">
          Onayda
        </text>
      </motion.g>
      <motion.g
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, delay: 1.7, ease: [0.34, 1.4, 0.64, 1] }}
        style={{ transformOrigin: "340px 255px" }}
      >
        <rect x="288" y="242" width="104" height="26" rx="13" className="dv-pill-ok" />
        <text x="340" y="259" className="dv-pill-t" textAnchor="middle">
          Onaylandı
        </text>
      </motion.g>

      {/* the seal */}
      <motion.g
        initial={{ scale: 0.3, opacity: 0, rotate: -40 }}
        animate={{ scale: 1, opacity: 1, rotate: -8 }}
        transition={{ duration: 0.55, delay: 1.75, ease: [0.34, 1.4, 0.64, 1] }}
        style={{ transformOrigin: "488px 176px" }}
      >
        <circle cx="488" cy="176" r="42" className="dv-seal" />
        <circle cx="488" cy="176" r="33" className="dv-seal-in" />
        <Check x={473} y={161} width={30} height={30} strokeWidth={2.6} className="dv-seal-ic" />
      </motion.g>
      <motion.text
        x="488"
        y="246"
        className="dv-s"
        textAnchor="middle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, delay: 2 }}
      >
        kayıt tamamlandı
      </motion.text>
    </svg>
  );
}

/* ---------- 4 · the account opens ---------- */
const BANK_ROWS = [
  { name: "Banka dosyası", state: "Hazırlandı", y: 210 },
  { name: "Hesap açılışı", state: "Tamamlandı", y: 260 },
];

export function SceneBank() {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="sv sv-dark" role="img" aria-label="Banka hesabı açılışı">
      <motion.g
        initial={{ opacity: 0, y: -18, rotate: -4 }}
        animate={{ opacity: 1, y: 0, rotate: -2 }}
        transition={{ duration: 0.6, ease: EASE }}
        style={{ transformOrigin: "280px 106px" }}
      >
        <rect x="122" y="30" width="316" height="152" rx="18" className="dv-cardface" />
        <rect x="150" y="62" width="36" height="26" rx="5" className="dv-chip" />
        <text x="404" y="80" className="dv-s" textAnchor="end">
          iş hesabı
        </text>
        <text x="150" y="130" className="dv-iban">
          •••• •••• •••• ••••
        </text>
        <text x="150" y="156" className="dv-s">
          {SAMPLE_CO}
        </text>
        <text x="404" y="156" className="dv-s" textAnchor="end">
          çoklu para birimi
        </text>
      </motion.g>

      {BANK_ROWS.map((b, i) => (
        <motion.g
          key={b.name}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.7 + i * 0.3, ease: EASE }}
        >
          <rect x="122" y={b.y} width="316" height="40" rx="12" className="dv-row" />
          <text x="142" y={b.y + 25} className="dv-t">
            {b.name}
          </text>
          <motion.g
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.35, delay: 1.1 + i * 0.3, ease: [0.34, 1.5, 0.64, 1] }}
            style={{ transformOrigin: `${386}px ${b.y + 20}px` }}
          >
            <rect x="322" y={b.y + 8} width="98" height="24" rx="12" className="dv-pill-ok" />
            <text x="371" y={b.y + 24} className="dv-pill-t" textAnchor="middle">
              {b.state}
            </text>
          </motion.g>
        </motion.g>
      ))}
    </svg>
  );
}

/* ---------- 5 · everything handed over ---------- */
const DOCS = ["Tescil belgesi", "Vergi kaydı", "Ana sözleşme"];

export function SceneHandover() {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="sv sv-dark" role="img" aria-label="Belge teslimi">
      <rect x="300" y="42" width="220" height="246" rx="18" className="dv-card" />
      <text x="410" y="76" className="dv-h" textAnchor="middle">
        Paneliniz
      </text>

      {DOCS.map((d, i) => (
        <motion.g
          key={d}
          initial={{ x: -196, y: 22, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 + i * 0.32, ease: EASE }}
        >
          <rect x="324" y={98 + i * 52} width="172" height="40" rx="11" className="dv-row" />
          <rect x="340" y={112 + i * 52} width="12" height="12" rx="3" className="dv-fill-sq" />
          <text x="362" y={123 + i * 52} className="dv-t">
            {d}
          </text>
        </motion.g>
      ))}

      <motion.g
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 1.5, ease: EASE }}
        style={{ transformOrigin: "410px 262px" }}
      >
        <rect x="324" y="244" width="172" height="34" rx="17" className="dv-pill-ok" />
        <Check x={342} y={253} width={16} height={16} strokeWidth={3} className="dv-ok-ic" />
        <text x="366" y="266" className="dv-pill-t">
          Teslim edildi
        </text>
      </motion.g>

      {/* the folder they came out of */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <path
          d="M42 108 h56 l14 18 h68 a10 10 0 0 1 10 10 v96 a10 10 0 0 1 -10 10 h-138 a10 10 0 0 1 -10 -10 v-114 a10 10 0 0 1 10 -10 z"
          className="dv-folder"
        />
        <text x="120" y="266" className="dv-s" textAnchor="middle">
          Kuruluş dosyası
        </text>
      </motion.g>
    </svg>
  );
}

/* ---------- 6 · the activity is matched to a licence class ---------- */
/* Adımın kendisi bir EŞLEŞTİRME: "ne satıyorsunuz" sorusunun cevabı, faaliyet
   koduna ve onun karşılığı olan lisans sınıfına bağlanıyor. Çizim de o yüzden
   iki taraflı — solda seçenekler, sağda seçimin ürettiği kayıt. Seçilen satır
   E-ticaret, çünkü form sahnesinde de faaliyet alanına o yazılıyor: iki sahne
   aynı dosyayı anlatıyor. */
const ACTIVITY_ROWS = ["E-ticaret", "Danışmanlık", "Ticaret ve dağıtım"];

export function SceneActivity() {
  /* ok ucu marker'ı belge genelinde tekil bir id istiyor; React'in ürettiği
     değerdeki noktalama url(#…) içinde geçmediği için temizleniyor */
  const uid = `a${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="sv sv-dark"
      role="img"
      aria-label="Faaliyet ve lisans sınıfı eşleştirmesi, şematik"
    >
      <defs>
        <marker
          id={`${uid}-head`}
          markerWidth="7"
          markerHeight="7"
          refX="5.5"
          refY="3.5"
          orient="auto"
        >
          <path d="M0 0 L7 3.5 L0 7 Z" className="dv-arrow" />
        </marker>
      </defs>

      <text x="40" y="44" className="dv-lbl">
        Faaliyet
      </text>

      {ACTIVITY_ROWS.map((label, i) => (
        <motion.g
          key={label}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.15 + i * 0.16, ease: EASE }}
        >
          <rect x="40" y={62 + i * 66} width="228" height="54" rx="13" className="dv-row" />
          <text x="60" y={94 + i * 66} className="dv-t">
            {label}
          </text>
        </motion.g>
      ))}

      {/* Seçilen satır: taban satırın üstüne mavi bir katman biniyor, satır
          yeniden çizilmiyor — seçim bir DURUM, ayrı bir nesne değil. Etiket
          katmanla birlikte geliyor, ayrı durmuyor: mavi zemin yazının altına
          girdiği için ikisi tek nesne gibi görünmeli, yoksa açılışın ilk
          saniyesinde zeminsiz bir yazı görünüyor. */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, delay: 0.85, ease: EASE }}
      >
        <rect x="40" y="62" width="228" height="54" rx="13" className="dv-node" />
        <text x="60" y="94" className="dv-t">
          {ACTIVITY_ROWS[0]}
        </text>
      </motion.g>
      <motion.g
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.32, delay: 0.95, ease: [0.34, 1.5, 0.64, 1] }}
        style={{ transformOrigin: "242px 89px" }}
      >
        <circle cx="242" cy="89" r="11" className="dv-ok" />
        <Check x={235} y={82} width={14} height={14} strokeWidth={3.2} className="dv-ok-ic" />
      </motion.g>

      <motion.path
        d="M 272 89 L 304 89"
        className="dv-wire"
        markerEnd={`url(#${uid}-head)`}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 1.15, ease: EASE }}
      />

      <motion.g
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 1.3, ease: EASE }}
      >
        <rect x="310" y="62" width="210" height="186" rx="16" className="dv-card" />
        <text x="334" y="107" className="dv-lbl">
          Lisans sınıfı
        </text>
        <text x="334" y="133" className="pr2-dv-val">
          Ticari lisans
        </text>
        <rect x="334" y="157" width="162" height="1" className="dv-ln" />
        <text x="334" y="185" className="dv-lbl">
          Faaliyet kodu
        </text>
        <text x="334" y="211" className="pr2-dv-val">
          •••• ••
        </text>
      </motion.g>

      <motion.text
        x="40"
        y="288"
        className="dv-s"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.6 }}
      >
        Faaliyet kodu, lisans sınıfını belirler.
      </motion.text>
    </svg>
  );
}

/* ---------- 7 · the setup type is chosen ---------- */
/* Üç seçenek yan yana, biri seçili. Yan yana durmaları adımın kendisi: bu bir
   sıra değil, bir KARŞILAŞTIRMA — üçü aynı anda masada ve biri işaretleniyor.
   Alt satırlar seçim ölçütünü söylüyor, özelliği değil, çünkü adımın tek sorusu
   "hangisi bana uyar". */
const SETUP_TYPES = [
  { name: "Serbest bölge", fit: "dışa satış" },
  { name: "Mainland", fit: "iç pazara" },
  { name: "Offshore", fit: "varlık tutma" },
];

export function SceneJurisdiction() {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="sv sv-dark"
      role="img"
      aria-label="Kuruluş tipi seçenekleri, biri seçili"
    >
      <text x="40" y="54" className="dv-lbl">
        Kuruluş tipi
      </text>

      {SETUP_TYPES.map((t, i) => {
        const x = 40 + i * 167;
        return (
          <motion.g
            key={t.name}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 + i * 0.15, ease: EASE }}
          >
            <rect x={x} y="72" width="146" height="170" rx="16" className="dv-card" />
            <text x={x + 22} y="116" className="dv-t">
              {t.name}
            </text>
            <text x={x + 22} y="140" className="dv-s">
              {t.fit}
            </text>
          </motion.g>
        );
      })}

      {/* Seçim: ilk kartın üstüne mavi katman, ardından "Seçildi" rozeti. Katman
          kendi yazılarını da taşıyor — mavi zemin kartın yazısının altına
          girdiği için ikisi birlikte gelmeli, yoksa zemin oturmadan önce yazı
          iki kez basılmış gibi görünüyor. */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, delay: 0.85, ease: EASE }}
      >
        <rect x="40" y="72" width="146" height="170" rx="16" className="dv-node" />
        <text x="62" y="116" className="dv-t">
          {SETUP_TYPES[0].name}
        </text>
        <text x="62" y="140" className="dv-s">
          {SETUP_TYPES[0].fit}
        </text>
      </motion.g>
      <motion.g
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, delay: 1, ease: [0.34, 1.4, 0.64, 1] }}
        style={{ transformOrigin: "113px 209px" }}
      >
        <rect x="62" y="196" width="102" height="26" rx="13" className="dv-pill-ok" />
        <text x="113" y="214" className="dv-pill-t" textAnchor="middle">
          Seçildi
        </text>
      </motion.g>

      <motion.text
        x="40"
        y="284"
        className="dv-s"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.3 }}
      >
        Kararı, satış yaptığınız taraf veriyor.
      </motion.text>
    </svg>
  );
}

/* ---------- 8 · health check, biometrics, identity card ---------- */
/* Kart bilerek şematik: fotoğraf yerine boş bir blok, numara maskeli, hiçbir
   gerçek kimliğin taklidi değil. Sağdaki üç satır adımın kendi sırası; hepsinin
   yanındaki tik "yapıldı" diyor, "onaylandı" demiyor — kimlik kararı bizde
   değil ve bu ayrım sahnede de duruyor. */
const IDENTITY_ROWS = ["Sağlık kontrolü", "Biyometri", "Kimlik başvurusu"];

export function SceneIdentity() {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="sv sv-dark"
      role="img"
      aria-label="Sağlık kontrolü, biyometri ve kimlik başvurusu, şematik"
    >
      <motion.g
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        <rect x="40" y="54" width="252" height="186" rx="18" className="dv-cardface" />
        <text x="64" y="88" className="dv-lbl">
          Kimlik kartı
        </text>
        <rect x="64" y="104" width="58" height="72" rx="8" className="dv-chip" />
        <text x="138" y="126" className="dv-s">
          {SAMPLE_PERSON}
        </text>
        <text x="138" y="156" className="pr2-dv-val">
          •••-••••-•••••••
        </text>
        <text x="64" y="214" className="dv-s">
          başvuru açıldı
        </text>
      </motion.g>

      {IDENTITY_ROWS.map((label, i) => (
        <motion.g
          key={label}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.45 + i * 0.26, ease: EASE }}
        >
          <rect x="312" y={54 + i * 66} width="208" height="54" rx="13" className="dv-row" />
          <text x="330" y={86 + i * 66} className="dv-t">
            {label}
          </text>
          <motion.g
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.32,
              delay: 0.8 + i * 0.26,
              ease: [0.34, 1.5, 0.64, 1],
            }}
            style={{ transformOrigin: `494px ${81 + i * 66}px` }}
          >
            <circle cx="494" cy={81 + i * 66} r="11" className="dv-ok" />
            <Check
              x={487}
              y={74 + i * 66}
              width={14}
              height={14}
              strokeWidth={3.2}
              className="dv-ok-ic"
            />
          </motion.g>
        </motion.g>
      ))}

      <motion.text
        x="40"
        y="284"
        className="dv-s"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.5 }}
      >
        Bu adım yerinde yapılıyor, vekâletle değil.
      </motion.text>
    </svg>
  );
}

/* ---------- 9 · the registrations are opened ---------- */
/* Adres ve vergi kaydı görünmeyen işler: ortada bir belge yok, yalnızca bir
   yerde bir kayıt açılıyor. Çizim de o yüzden bir DEFTER — iki satır ve
   karşılarındaki durum. Durumlar bizim yaptığımız işi söylüyor. */
const REGISTRY_ROWS = [
  { label: "Kayıtlı adres", state: "Tanımlandı" },
  { label: "Vergi kaydı", state: "Açıldı" },
];

export function SceneRegistry() {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="sv sv-dark"
      role="img"
      aria-label="Adres ve vergi kaydı, şematik özet"
    >
      <motion.g
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <rect x="76" y="40" width="408" height="250" rx="18" className="dv-card" />
        <text x="104" y="80" className="dv-h">
          Kayıtlar
        </text>
        <text x="104" y="102" className="dv-lbl">
          şematik özet
        </text>
        <rect x="104" y="118" width="352" height="1" className="dv-ln" />
      </motion.g>

      {REGISTRY_ROWS.map((r, i) => (
        <motion.g
          key={r.label}
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.45 + i * 0.28, ease: EASE }}
        >
          <rect x="104" y={138 + i * 60} width="352" height="48" rx="12" className="dv-row" />
          <text x="124" y={167 + i * 60} className="dv-t">
            {r.label}
          </text>
          <motion.g
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.34,
              delay: 0.85 + i * 0.28,
              ease: [0.34, 1.5, 0.64, 1],
            }}
            style={{ transformOrigin: `384px ${162 + i * 60}px` }}
          >
            <rect x="332" y={149 + i * 60} width="104" height="26" rx="13" className="dv-pill-ok" />
            <text x="384" y={167 + i * 60} className="dv-pill-t" textAnchor="middle">
              {r.state}
            </text>
          </motion.g>
        </motion.g>
      ))}

      <motion.text
        x="104"
        y="272"
        className="dv-s"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.5 }}
      >
        Kayıtlar şirket dosyasına işlendi.
      </motion.text>
    </svg>
  );
}

/* ================= adım → çizim eşleşmesi ================= */

/* Çizimin türü. Adımın sıra numarası değil, ne yaptığı.
   Ad seçimi Dubai'de birinci, KKTC'de ikinci, İngiltere'de birinci adımın
   içinde; üçünde de aynı çizim. Tür bunu taşıyabiliyor, indeks taşıyamıyor. */
export type SceneKind =
  | "form"
  | "name"
  | "activity"
  | "jurisdiction"
  | "licence"
  | "identity"
  | "registry"
  | "bank"
  | "handover";

export const SCENE_BY_KIND: Record<SceneKind, () => ReactElement> = {
  form: SceneForm,
  name: SceneName,
  activity: SceneActivity,
  jurisdiction: SceneJurisdiction,
  licence: SceneLicence,
  identity: SceneIdentity,
  registry: SceneRegistry,
  bank: SceneBank,
  handover: SceneHandover,
};

/* Birinci kat: adım başlığının tam karşılığı. countryContent'teki on yedi adımın
   (Dubai 7, İngiltere 5, KKTC 5) hepsi burada. Tam eşleşme şart, çünkü aynı
   kelimeyi taşıyan iki adım farklı çizim istiyor: Dubai'nin "Kuruluş işlemleri
   ve tescil"i başvurunun HAZIRLANMASI, İngiltere'nin "Tescil onayı"ysa geri
   dönen kaydın kendisi. Anahtar kelime bu ikisini ayıramaz, tablo ayırır. */
const KIND_BY_TITLE: Record<string, SceneKind> = {
  /* Dubai */
  "Şirket isminin belirlenmesi": "name",
  "Faaliyet ve lisans türünün belirlenmesi": "activity",
  "Kuruluş tipinin seçilmesi": "jurisdiction",
  "Kuruluş işlemleri ve tescil": "form",
  "Ticari lisansın alınması": "licence",
  "Medical fitness ve Emirates ID": "identity",
  "GSM hattı ve banka hesabı": "bank",
  /* İngiltere */
  "Evrak ve isim seçimi": "form",
  "Companies House başvurusu": "name",
  "Tescil onayı": "licence",
  "Kayıtlı adres ve HMRC": "registry",
  "Hesap ve teslim": "handover",
  /* KKTC */
  "Evrak toplama": "form",
  "İsim onayı": "name",
  Tescil: "licence",
  "Banka hesabı": "bank",
  "Vergi kaydı ve teslim": "handover",
};

/* İkinci kat: başlık tabloda yoksa kelimesine bakılıyor. Bu ağ, tablonun
   kırılganlığı için var — adım metinleri müşteri onayıyla değişen bir SWAP
   bloğunda duruyor, "Şirket isminin belirlenmesi" bir gün "Şirket adının
   seçilmesi" olabilir ve o gün burası sessizce boş bir kart göstermesin.
   Sıra önemli: birden çok kelimeyi taşıyan başlıkta hangisinin kazanacağını
   liste belirliyor. "Vergi kaydı ve teslim" hem teslim hem kayıt taşıyor,
   adımın bittiği yer teslim; "Faaliyet ve lisans türü" hem faaliyet hem lisans
   taşıyor, adımın konusu faaliyet. İkisi de listede önce geliyor. */
const KIND_BY_KEYWORD: ReadonlyArray<readonly [string, SceneKind]> = [
  ["teslim", "handover"],
  ["banka", "bank"],
  ["emirates", "identity"],
  ["medical", "identity"],
  ["sağlık", "identity"],
  ["kimlik", "identity"],
  ["kuruluş tipi", "jurisdiction"],
  ["serbest bölge", "jurisdiction"],
  ["mainland", "jurisdiction"],
  ["offshore", "jurisdiction"],
  ["faaliyet", "activity"],
  ["evrak", "form"],
  ["lisans", "licence"],
  ["tescil", "licence"],
  /* "ism", "isim" değil: Türkçede ünlü düşmesi var ve "isminin" içinde "isim"
     geçmiyor. Kök hâli her iki çekimi de yakalıyor. */
  ["ism", "name"],
  ["vergi", "registry"],
  ["adres", "registry"],
  ["kayıt", "registry"],
  ["belge", "form"],
  ["başvuru", "form"],
];

/**
 * Bir sürecin adımına hangi çizimin düştüğü. Bilinmeyen adımda `null` dönüyor
 * ve sahne boş kalıyor: yanlış çizim, çizimsizlikten kötü — banka kartı gösteren
 * bir "kuruluş tipi" adımı ziyaretçiye yanlış bir şey söyler, boş bir sahne
 * hiçbir şey söylemez.
 */
export function stepSceneKind(title: string): SceneKind | null {
  const exact = KIND_BY_TITLE[title];
  if (exact) return exact;

  /* Türkçe locale şart: varsayılan toLowerCase "İ" harfini noktalı bir i'ye
     çeviriyor ve "İsim onayı" hiçbir anahtarla eşleşmiyor. */
  const t = title.toLocaleLowerCase("tr");
  for (const [word, kind] of KIND_BY_KEYWORD) {
    if (t.includes(word)) return kind;
  }
  return null;
}

/* Ana sayfa (ProcessScroll) hâlâ beş sabit adım anlatıyor ve çizimleri sırayla
   basıyor; orada adım listesi kod içinde sabit olduğu için indeks güvenli.
   Dizinin sırası o bileşenin rayına bağlı, değiştirilemez. */
export const SETUP_SCENES = [SceneForm, SceneName, SceneLicence, SceneBank, SceneHandover];
