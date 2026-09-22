"use client";

import { IdCard } from "lucide-react";

import HeroSceneCard, { type HeroSceneItem } from "@/components/shared/HeroSceneCard";
import { VIZE_DUBAI } from "@/lib/vizeDubai";

/* ============================================================================
   VİZE HERO KARTI — /dubai/oturum-vize hero'sunun sağındaki kart
   İSKELET: components/shared/HeroSceneCard.tsx (ortak · .hkc-)
   PALET:   src/app/css/svc-vize.css · HERO KARTI · ad alanı .svzk-

   Dördüncü kullanım (kuruluş · muhasebe · banka · vize). Yeni ölçü kuralı
   YOK, yalnız çizimler; palet bankanınkiyle aynı bantlar (koyu gövde, beyaz
   dış hat yalnız öndeki nesnede, gri iç işaret, mavi olay). viewBox 440×320.

   `ordered`: EVET. Vize bir sıra: giriş izni, sağlık, kimlik, oturum.

   DURMA SÜRESİ 4,7 s. Sayfanın öteki döngüleri (PageHero 26 · 44,017 ·
   33,013 · 118,033; FinalCta 24,251 · 34,483 · 40,361 · 74,959 · 96,769 ·
   131,129; sahneler 5,3 · 6,1 · 7,1 · 7,9; kota sahnesi 9,1) içinde 4,7'nin
   katı ya da böleni yok.

   SAHNELER UYDURMA VERİ TAŞIMIYOR: ad, pasaport ya da kimlik numarası, tarih
   YOK — gri çubuk ve nokta dizileri belgenin BİÇİMİ. */

const DWELL = 4700;

/* ---- 1 · GİRİŞ · giriş izni belgesi, köşesine onay mührü basılıyor ------ */
function ArtGiris() {
  return (
    <svg className="hkc-art" viewBox="0 0 440 320" aria-hidden="true" focusable="false">
      <rect className="svzk-sur-q" x="100" y="50" width="210" height="236" rx="12" />
      <rect className="svzk-sur-f" x="126" y="34" width="210" height="246" rx="12" />
      {/* başlık: küçük amblem + ad çubuğu */}
      <circle className="svzk-dim" cx="160" cy="68" r="12" />
      <rect className="svzk-ink" x="182" y="62" width="96" height="11" rx="5.5" />
      <path className="svzk-rule" d="M150 96 H312" />
      {[118, 140, 162, 184].map((y, i) => (
        <g key={y}>
          <rect className="svzk-dim" x="150" y={y} width="44" height="8" rx="4" />
          <rect className="svzk-well" x="206" y={y - 1} width={[92, 70, 84, 60][i]} height="10" rx="5" />
        </g>
      ))}
      {/* OLAY: onay mührü. Halka + tik, belgenin sağ alt köşesinde. */}
      <g className="svzk-muhur">
        <circle className="svzk-act-ring" cx="290" cy="238" r="26" />
        <circle className="svzk-act" cx="290" cy="238" r="18" />
        <path className="svzk-tick" d="M282 238 l6 6 l10 -12" />
      </g>
    </svg>
  );
}

/* ---- 2 · SAĞLIK · sağlık formu, artı işareti ve kontrol satırları -------- */
const SAGLIK_Y = [150, 182, 214, 246];
const SAGLIK_W = [110, 86, 120, 74];
function ArtSaglik() {
  return (
    <svg className="hkc-art" viewBox="0 0 440 320" aria-hidden="true" focusable="false">
      <rect className="svzk-sur-f" x="116" y="34" width="208" height="256" rx="14" />
      {/* pano klipsi */}
      <rect className="svzk-well" x="186" y="24" width="68" height="22" rx="8" />
      {/* artı işareti kuyusu */}
      <rect className="svzk-well" x="140" y="66" width="52" height="52" rx="12" />
      <path className="svzk-arti" d="M166 80 V104 M154 92 H178" />
      <rect className="svzk-ink" x="206" y="78" width="92" height="11" rx="5.5" />
      <rect className="svzk-dim" x="206" y="98" width="64" height="8" rx="4" />
      {SAGLIK_Y.map((y, i) => (
        <g key={y}>
          <rect className="svzk-box" x="140" y={y - 8} width="16" height="16" rx="4" />
          <rect className="svzk-dim" x="168" y={y - 4} width={SAGLIK_W[i]} height="8" rx="4" />
          <path className="svzk-chk" data-i={i} d={`M143 ${y} l4 4 l7 -8`} />
        </g>
      ))}
    </svg>
  );
}

/* ---- 3 · KİMLİK · Emirates ID kartı, alt şerit doluyor ------------------ */
function ArtKimlik() {
  return (
    <svg className="hkc-art" viewBox="0 0 440 320" aria-hidden="true" focusable="false">
      <rect className="svzk-sur-q" x="92" y="96" width="290" height="176" rx="18" />
      <rect className="svzk-sur-f" x="62" y="66" width="296" height="184" rx="18" />
      {/* fotoğraf kuyusu: baş ve omuz */}
      <rect className="svzk-well" x="84" y="96" width="78" height="96" rx="10" />
      <circle className="svzk-dim" cx="123" cy="132" r="15" />
      <path className="svzk-dim" d="M97 190 a26 22 0 0 1 52 0 Z" />
      <rect className="svzk-ink" x="180" y="100" width="110" height="11" rx="5.5" />
      <rect className="svzk-dim" x="180" y="122" width="80" height="8" rx="4" />
      {/* numara yerine noktalar */}
      {[0, 1, 2].map((g) => (
        <g key={g}>
          {[0, 1, 2, 3].map((d) => (
            <circle key={d} className="svzk-dim" cx={184 + g * 50 + d * 10} cy="156" r="3.2" />
          ))}
        </g>
      ))}
      {/* çip */}
      <rect className="svzk-cip" x="300" y="96" width="36" height="28" rx="6" />
      {/* OLAY: kart düzenleniyor. Kuyu gri, dolgu mavi soldan. */}
      <rect className="svzk-well" x="84" y="214" width="252" height="14" rx="7" />
      <rect className="svzk-act svzk-fill" x="84" y="214" width="252" height="14" rx="7" />
    </svg>
  );
}

/* ---- 4 · OTURUM · geçerlilik çizelgesi: üç yıl dilimi, yenileme noktası --- */
const YIL_X = [74, 172, 270];
function ArtOturum() {
  return (
    <svg className="hkc-art" viewBox="0 0 440 320" aria-hidden="true" focusable="false">
      <rect className="svzk-sur-f" x="50" y="70" width="340" height="180" rx="18" />
      <rect className="svzk-ink" x="74" y="96" width="104" height="11" rx="5.5" />
      <rect className="svzk-dim" x="74" y="116" width="70" height="8" rx="4" />
      {/* üç dilim: kuyu gri, dolgu mavi sırayla */}
      {YIL_X.map((x, i) => (
        <g key={x}>
          <rect className="svzk-well" x={x} y="156" width="90" height="16" rx="8" />
          <rect className="svzk-act svzk-yil" data-i={i} x={x} y="156" width="90" height="16" rx="8" />
          <rect className="svzk-dim" x={x} y="186" width="40" height="8" rx="4" />
        </g>
      ))}
      {/* yenileme: son dilimin sonunda dönen ok */}
      <g className="svzk-yenile">
        <circle className="svzk-act-ring" cx="360" cy="164" r="16" />
        <path className="svzk-ok" d="M352 164 a8 8 0 1 0 3 -6.2 M352 155 v4.5 h4.5" />
      </g>
      <rect className="svzk-dim" x="74" y="220" width="120" height="8" rx="4" />
    </svg>
  );
}

const V = VIZE_DUBAI.scenes;
const ART: Record<string, React.ReactNode> = {
  giris: <ArtGiris />,
  saglik: <ArtSaglik />,
  kimlik: <ArtKimlik />,
  oturum: <ArtOturum />,
};
const SAHNELER: HeroSceneItem[] = V.map((s) => ({ key: s.key, word: s.word, meta: s.meta, art: ART[s.key] }));

export default function VizeHeroCard() {
  return (
    <HeroSceneCard
      ns="svzk"
      scenes={SAHNELER}
      dwell={DWELL}
      ordered
      railLabel="Vize adımları"
      foot={{
        icon: <IdCard size={14} strokeWidth={2} aria-hidden="true" />,
        line: VIZE_DUBAI.sceneFoot,
      }}
    />
  );
}
