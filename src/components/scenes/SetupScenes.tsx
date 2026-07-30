"use client";

import { useId } from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";

/* The five setup steps, drawn. These live on the night screen, so every fill
   here is a dark-surface value — the left rail already carries the words, the
   scene only has to show the thing happening.

   The scenes are shared by the home page and all three country pages, so nothing
   in here names a country, an authority or a bank. Every value shown is a
   schematic placeholder: masked numbers, an obviously made-up company name, no
   imitation of a real document. */

const EASE = [0.22, 1, 0.36, 1] as const;
const W = 560;
const H = 330;

/* the sample company that runs through every scene */
const SAMPLE_CO = "Velocity Trading";

/* ---------- 1 · the intake form fills itself in ---------- */
/* w = rough pixel width of the value text, used for the caret and the reveal */
const FORM_FIELDS = [
  { label: "Ad Soyad", value: "Mert Kayacan", x: 68, row: 0, w: 94 },
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

export const SETUP_SCENES = [SceneForm, SceneName, SceneLicence, SceneBank, SceneHandover];
