"use client";

import { useId, useState } from "react";
import type { CSSProperties } from "react";

/* ============================================================================
   VERGİ GRAFİĞİ · kâra göre kurumlar vergisi — .vgr- · css/tax.css
   Veri: countryContent.ts · ingiltere.tax.bant (başlık).

   [RESMÎ] gov.uk/corporation-tax-rates: £50.000'e kadar %19, £250.000 üstü
   %25, arası marjinal indirim. Aradaki eğri standart kesirle (3/200):
   efektif oran = %25 − 1,5 × (250.000 − kâr) / kâr. Kesir teyit listesinde
   (· 4); uçlardaki iki rakam resmî.

   GEÇMİŞ (23.09.2026, bir gün içinde):
     1. üç mavi kutuluk bant + dört rakam kartı: "her şeyi maviye boyamışsın"
     2. tek eğri, üstüne taşan gri "kademeli" kutusu ve dört olgulu şerit:
        "grafik güzel … dışına çektiğin kare, alttaki dört konu"
     3. /lab/ingiltere'de üç hâl (sade eğri · kaydırıcı · örnek sütunlar);
        Burak B'yi seçti: "B seçeneği çok iyi … altta 3 box var, onların
        total genişliği ile grafiğinki farklı, align olmuyor. Grafiği de
        biraz genişlet, altındaki siyah barı da genişlet ki tam denk
        gelsinler." Elenen iki hâl silindi (git'te).

   HİZA. Çizim, kaydırıcı ve üç sonuç kutusu AYNI genişlikte: eğri viewBox'ın
   0'ından 640'ına uzanıyor (eski hâlde iki yanda 20 birim boşluk vardı),
   kaydırıcının izi kutularla aynı kenarlardan başlıyor. Yerli range
   başparmağının merkezi izin iki ucundan yarım başparmak içeride kaldığı
   için (0'da 12 px sağda) başparmağı kendimiz çiziyoruz: `left: t%`, tam
   kesik çizginin altında. Yerli input görünmez ve izin üstünde; klavye,
   dokunma ve ekran okuyucu onu kullanıyor.

   YAZILAR SVG'DE DEĞİL, HTML'DE. SVG viewBox ile ölçekleniyor; 640 birimlik
   çizimde 11 birimlik yazı telefonda 6 px'e iniyordu. Etiketler aynı
   koordinattan yüzdeyle konumlanan HTML (SVG'nin en-boy oranı sabit). */

const W = 640;
const H = 230;
const EG = { x0: 0, x1: W, y0: 200, y1: 30, pMax: 300000, rMin: 17, rMax: 26 };
const ex = (p: number) => EG.x0 + (p / EG.pMax) * (EG.x1 - EG.x0);
const ey = (r: number) => EG.y0 - ((r - EG.rMin) / (EG.rMax - EG.rMin)) * (EG.y0 - EG.y1);
const px = (x: number) => `${(x / W) * 100}%`;
const py = (y: number) => `${(y / H) * 100}%`;

function oran(p: number) {
  if (p <= 50000) return 19;
  if (p >= 250000) return 25;
  return 25 - (1.5 * (250000 - p)) / p;
}
const EGRI = (() => {
  const pts: string[] = [];
  for (let p = 0; p <= EG.pMax; p += 2500) pts.push(`${ex(p).toFixed(1)} ${ey(oran(Math.max(p, 1))).toFixed(1)}`);
  return "M" + pts.join(" L");
})();

const nf = new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 0 });
const nf1 = new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 1 });

/* Yeşil (#1e8a54) → turuncu (#b26a00), oranla doğrusal. */
function renk(r: number) {
  const t = Math.min(1, Math.max(0, (r - 19) / 6));
  const a = [0x1e, 0x8a, 0x54];
  const b = [0xb2, 0x6a, 0x00];
  return `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * t)).join(",")})`;
}

export default function VergiGrafik({ baslik }: { baslik: string }) {
  const [p, setP] = useState(120000);
  const r = oran(Math.max(p, 1));
  const vergi = Math.round((p * r) / 100 / 50) * 50;
  const id = useId();
  const gid = id.replace(/:/g, "");
  const t = p / EG.pMax;
  return (
    <div className="txm-egri">
      <p className="txm-bant-h">
        {baslik}
        <span>Kaydırıcıyla yıllık kârınızı seçin.</span>
      </p>

      <div className="vgr-cizim">
        <svg className="vgr-svg" viewBox={`0 0 ${W} ${H}`} aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id={`${gid}c`} x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#1e8a54" />
              <stop offset="17%" stopColor="#1e8a54" />
              <stop offset="83%" stopColor="#b26a00" />
              <stop offset="100%" stopColor="#b26a00" />
            </linearGradient>
            <linearGradient id={`${gid}a`} x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#e6f6ec" />
              <stop offset="100%" stopColor="#fcf1de" />
            </linearGradient>
          </defs>
          {[19, 25].map((k) => (
            <path key={k} d={`M${EG.x0} ${ey(k)} H${EG.x1}`} className="vgr-kil" />
          ))}
          <path d={`${EGRI} L${EG.x1} ${EG.y0} L${EG.x0} ${EG.y0} Z`} fill={`url(#${gid}a)`} />
          <path d={EGRI} fill="none" stroke={`url(#${gid}c)`} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d={`M${EG.x0} ${EG.y0} H${EG.x1}`} className="vgr-eksen" />
          <path d={`M${ex(p)} ${EG.y0} V${ey(r)}`} className="vgr-secili-hat" />
          <circle cx={ex(p)} cy={ey(r)} r="8" fill={renk(r)} className="vgr-nokta" />
        </svg>
        <span className="vgr-oran" data-ton="dusuk" style={{ left: px(ex(25000)), top: py(ey(19)) }}>
          %19
        </span>
        <span className="vgr-oran" data-ton="ust" style={{ left: px(ex(275000)), top: py(ey(25)) }}>
          %25
        </span>
        {[
          [0, "£0"],
          [50000, "£50.000"],
          [250000, "£250.000"],
        ].map(([k, l]) => (
          <span
            key={l}
            className="vgr-x"
            data-bas={k === 0 ? "" : undefined}
            style={{ left: px(ex(k as number)), top: py(EG.y0) }}
          >
            {l}
          </span>
        ))}
        <span
          className="vgr-balon"
          style={{ left: px(ex(p)), top: py(ey(r)), "--vgr-renk": renk(r) } as CSSProperties}
        >
          %{nf1.format(r)}
        </span>
      </div>

      <div className="vgr-kay" style={{ "--vgr-t": `${t * 100}%` } as CSSProperties}>
        <span className="vgr-kay-iz" aria-hidden="true" />
        <span className="vgr-kay-bas" aria-hidden="true" />
        <label className="sr-only" htmlFor={id}>
          Yıllık kâr
        </label>
        <input
          id={id}
          type="range"
          min={0}
          max={EG.pMax}
          step={5000}
          value={p}
          aria-valuetext={`£${nf.format(p)}`}
          onChange={(e) => setP(Number(e.target.value))}
        />
      </div>

      <dl className="vgr-sonuc">
        <div>
          <dt>Yıllık kâr</dt>
          <dd>£{nf.format(p)}</dd>
        </div>
        <div>
          <dt>Vergi oranı</dt>
          <dd style={{ color: renk(r) }}>%{nf1.format(r)}</dd>
        </div>
        <div>
          <dt>Ödenecek vergi</dt>
          <dd>≈ £{nf.format(vergi)}</dd>
        </div>
      </dl>
    </div>
  );
}
