"use client";

import { Landmark } from "lucide-react";

import HeroSceneCard, { type HeroSceneItem } from "@/components/shared/HeroSceneCard";
import { BANKA_DUBAI } from "@/lib/bankaDubai";

/* ============================================================================
   BANKA HERO KARTI — /dubai/banka-hesabi hero'sunun sağındaki kart
   İSKELET: components/shared/HeroSceneCard.tsx (ortak · .hkc-)
   PALET:   src/app/css/svc-banka.css · HERO KARTI · ad alanı .svbk-

   Üçüncü kullanım (kuruluş · muhasebe · banka) ve iskeletin kendi talimatına
   uyuyor: yeni ölçü kuralı YAZILMADI, yalnız çizimler ve renkleri. viewBox
   440 × 320 (oran 1,375, muhasebeyle aynı).

   `ordered`: EVET. Banka dört iş aynı anda değil, bir SIRA — seçim, dosya,
   hesap, tahsilat. Şerit "bitti / şimdi / sıradaki" boyanıyor. Rozet yok:
   kimin yaptığı bilgisi (dosya bizde, karar bankada) sahnenin satırında.

   DUR ŞAMA SÜRESİ 4,3 s. Sayfadaki öteki döngüler (PageHero 26 · 44,017 ·
   33,013 · 118,033; FinalCta 24,251 · 34,483 · 40,361 · 74,959 · 96,769 ·
   131,129) içinde 4,3'ün katı ya da böleni yok; muhasebe kartınınki 4,1.

   SAHNELER UYDURMA VERİ TAŞIMIYOR: banka adı, IBAN, tutar YOK — gri çubuk ve
   nokta dizileri bir belgenin, bir kartın BİÇİMİ. Kartın numarası dört
   gruplu nokta; okunacak bir rakam yok. */

const DWELL = 4300;

/* ---- 1 · SEÇİM · üç banka kartı, ortadaki seçili ------------------------ */
function ArtSecim() {
  const X = [34, 160, 286];
  return (
    <svg className="hkc-art" viewBox="0 0 440 320" aria-hidden="true" focusable="false">
      {X.map((x, i) => (
        <g key={x}>
          <rect className={i === 1 ? "svbk-sur-f" : "svbk-sur-q"} x={x} y={i === 1 ? 70 : 86} width="120" height={i === 1 ? 176 : 150} rx="14" />
          <circle className="svbk-dim" cx={x + 30} cy={i === 1 ? 104 : 118} r="12" />
          <rect className={i === 1 ? "svbk-ink" : "svbk-dim"} x={x + 20} y={i === 1 ? 136 : 146} width="70" height="9" rx="4.5" />
          <rect className="svbk-dim" x={x + 20} y={i === 1 ? 156 : 164} width="52" height="8" rx="4" />
          <rect className="svbk-dim" x={x + 20} y={i === 1 ? 172 : 180} width="62" height="8" rx="4" />
        </g>
      ))}
      {/* OLAY: seçim. Ortadaki kartın altında mavi çizgi ve köşesinde tik. */}
      <path className="svbk-act-line" d="M180 222 H260" />
      <g className="svbk-pick">
        <circle className="svbk-act" cx="266" cy="84" r="14" />
        <path className="svbk-tick" d="M259 84 l5 5 l9 -10" />
      </g>
    </svg>
  );
}

/* ---- 2 · DOSYA · kontrol listesi, satırlar sırayla işaretleniyor --------- */
const DOSYA_Y = [104, 136, 168, 200, 232];
const DOSYA_W = [96, 120, 84, 110, 72];
function ArtDosya() {
  return (
    <svg className="hkc-art" viewBox="0 0 440 320" aria-hidden="true" focusable="false">
      <rect className="svbk-sur-q" x="104" y="46" width="200" height="246" rx="12" />
      <rect className="svbk-sur-f" x="126" y="30" width="200" height="252" rx="12" />
      <rect className="svbk-ink" x="150" y="54" width="92" height="11" rx="5.5" />
      <path className="svbk-rule" d="M150 80 H302" />
      {DOSYA_Y.map((y, i) => (
        <g key={y}>
          <rect className="svbk-box" x="150" y={y - 8} width="16" height="16" rx="4" />
          <rect className="svbk-dim" x="178" y={y - 4} width={DOSYA_W[i]} height="8" rx="4" />
          <path className="svbk-chk" data-i={i} d={`M153 ${y} l4 4 l7 -8`} />
        </g>
      ))}
    </svg>
  );
}

/* ---- 3 · HESAP · kurumsal hesap kartı, durum hapı doluyor --------------- */
function ArtHesap() {
  return (
    <svg className="hkc-art" viewBox="0 0 440 320" aria-hidden="true" focusable="false">
      <rect className="svbk-sur-q" x="84" y="92" width="300" height="176" rx="18" />
      <rect className="svbk-sur-f" x="56" y="62" width="300" height="180" rx="18" />
      <circle className="svbk-dim" cx="90" cy="96" r="13" />
      <rect className="svbk-ink" x="112" y="90" width="96" height="11" rx="5.5" />
      {/* Numara yerine dört gruplu nokta: okunacak bir rakam yok. */}
      {[0, 1, 2, 3].map((g) => (
        <g key={g}>
          {[0, 1, 2, 3].map((d) => (
            <circle key={d} className="svbk-dim" cx={84 + g * 62 + d * 11} cy="160" r="3.4" />
          ))}
        </g>
      ))}
      <rect className="svbk-dim" x="80" y="200" width="90" height="8" rx="4" />
      <rect className="svbk-dim" x="80" y="216" width="60" height="8" rx="4" />
      {/* OLAY: durum hapı. Kuyu gri, dolgu mavi soldan doluyor. */}
      <rect className="svbk-well" x="250" y="202" width="84" height="20" rx="10" />
      <rect className="svbk-act svbk-fill" x="250" y="202" width="84" height="20" rx="10" />
    </svg>
  );
}

/* ---- 4 · TAHSİLAT · üç kaynak, hesaba akan ödemeler --------------------- */
const KAYNAK_Y = [104, 160, 216];
function ArtTahsilat() {
  return (
    <svg className="hkc-art" viewBox="0 0 440 320" aria-hidden="true" focusable="false">
      {KAYNAK_Y.map((y) => (
        <g key={y}>
          <path className="svbk-hair" d={`M98 ${y} H262`} />
          <circle className="svbk-sur-q" cx="74" cy={y} r="24" />
          <rect className="svbk-dim" x="62" y={y - 4} width="24" height="8" rx="4" />
        </g>
      ))}
      <rect className="svbk-sur-f" x="262" y="84" width="140" height="152" rx="16" />
      <rect className="svbk-ink" x="282" y="106" width="70" height="10" rx="5" />
      <path className="svbk-rule" d="M282 130 H382" />
      <rect className="svbk-dim" x="282" y="146" width="84" height="8" rx="4" />
      <rect className="svbk-dim" x="282" y="164" width="64" height="8" rx="4" />
      <rect className="svbk-well" x="282" y="196" width="100" height="10" rx="5" />
      <rect className="svbk-act svbk-sum" x="282" y="196" width="100" height="10" rx="5" />
      {/* OLAY: ödemeler. Her hatta bir mavi nokta kaynaktan hesaba akıyor. */}
      {KAYNAK_Y.map((y, i) => (
        <circle key={y} className="svbk-act svbk-akis" data-i={i} cx="104" cy={y} r="5" />
      ))}
    </svg>
  );
}

const B = BANKA_DUBAI.scenes;
const ART: Record<string, React.ReactNode> = {
  secim: <ArtSecim />,
  dosya: <ArtDosya />,
  hesap: <ArtHesap />,
  tahsilat: <ArtTahsilat />,
};
const SAHNELER: HeroSceneItem[] = B.map((s) => ({ key: s.key, word: s.word, meta: s.meta, art: ART[s.key] }));

export default function BankaHeroCard() {
  return (
    <HeroSceneCard
      ns="svbk"
      scenes={SAHNELER}
      dwell={DWELL}
      ordered
      railLabel="Banka adımları"
      foot={{
        icon: <Landmark size={14} strokeWidth={2} aria-hidden="true" />,
        line: BANKA_DUBAI.sceneFoot,
      }}
    />
  );
}
