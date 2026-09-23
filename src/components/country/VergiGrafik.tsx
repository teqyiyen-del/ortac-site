"use client";

import { useId, useState } from "react";
import type { CSSProperties } from "react";

/* ============================================================================
   VERGİ GRAFİĞİ · kâra göre kurumlar vergisi — .vgr- · css/tax.css
   Veri: countryContent.ts · ingiltere.tax.bant (grafik alanı hangisi basılır).

   [RESMÎ] gov.uk/corporation-tax-rates: £50.000'e kadar %19, £250.000 üstü
   %25, arası marjinal indirim. Aradaki eğri standart kesirle (3/200):
   efektif oran = %25 − 1,5 × (250.000 − kâr) / kâr. Kesir teyit listesinde
   (· 4); uçlardaki iki rakam resmî.

   23.09.2026 · Burak ilk eğriye: "grafik güzel olmuş, biraz daha tasarım
   deneyebilir misin … kademeli geçişin dışına çektiğin kare … alttaki dört
   tane yazan konu, onlardan emin olamadım." Üç hâl, /lab/ingiltere'de:
     sade    aynı eğri; gri kutu yok, kademeli bölge eksenin altında bir
             ayraçla, oranlar çizginin kendi üstünde
     kaydir  aynı eğri + kaydırıcı: kârı seç, oran ve vergi tutarı çıksın
     sutun   yedi örnek kâr için sütun; boy = oran, altında vergi tutarı
   Dört olgulu şerit (anlaşma 1988 · KDV · harç · bildirim) üçünde de yok:
   harç ve bildirim vergi değil (takvimde zaten var), anlaşma paraYolu'nda,
   KDV SSS'te.

   YAZILAR SVG'DE DEĞİL, HTML'DE. SVG viewBox ile ölçekleniyor; 640 birimlik
   çizimde 11 birimlik yazı telefonda 6 px'e iniyordu. Çizim yalnız çizgi ve
   alan; etiketler aynı koordinattan yüzdeyle konumlanan HTML (SVG'nin en-boy
   oranı sabit, yani % = viewBox birimi / genişlik). */

const W = 640;
const H = 230;
const EG = { x0: 20, x1: 620, y0: 200, y1: 30, pMax: 300000, rMin: 17, rMax: 26 };
const ex = (p: number) => EG.x0 + (p / EG.pMax) * (EG.x1 - EG.x0);
const ey = (r: number) => EG.y0 - ((r - EG.rMin) / (EG.rMax - EG.rMin)) * (EG.y0 - EG.y1);
const px = (x: number) => `${(x / W) * 100}%`;
const py = (y: number) => `${(y / H) * 100}%`;

export function oran(p: number) {
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

/* Ortak çizim: kılavuzlar, alan, çizgi, iki uç noktası. `secili` verilirse
   (kaydırıcı) o kârda dikey kesik çizgi ve çizgi üstünde nokta. */
function Cizim({ secili }: { secili?: number }) {
  const gid = useId().replace(/:/g, "");
  return (
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
      {[19, 25].map((r) => (
        <path key={r} d={`M${EG.x0} ${ey(r)} H${EG.x1}`} className="vgr-kil" />
      ))}
      <path d={`${EGRI} L${EG.x1} ${EG.y0} L${EG.x0} ${EG.y0} Z`} fill={`url(#${gid}a)`} />
      <path d={EGRI} fill="none" stroke={`url(#${gid}c)`} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d={`M${EG.x0} ${EG.y0} H${EG.x1}`} className="vgr-eksen" />
      {secili !== undefined && (
        <>
          <path d={`M${ex(secili)} ${EG.y0} V${ey(oran(secili))}`} className="vgr-secili-hat" />
          <circle cx={ex(secili)} cy={ey(oran(secili))} r="8" fill={renk(oran(secili))} className="vgr-nokta" />
        </>
      )}
      {secili === undefined && (
        <>
          <circle cx={ex(50000)} cy={ey(19)} r="7" fill="#1e8a54" className="vgr-nokta" />
          <circle cx={ex(250000)} cy={ey(25)} r="7" fill="#b26a00" className="vgr-nokta" />
        </>
      )}
    </svg>
  );
}

/* Eksen etiketleri + kademeli ayraç (HTML). */
function Eksen() {
  return (
    <>
      {[
        [0, "£0"],
        [50000, "£50.000"],
        [250000, "£250.000"],
      ].map(([p, l]) => (
        <span
          key={l}
          className="vgr-x"
          data-bas={p === 0 ? "" : undefined}
          style={{ left: px(ex(p as number)), top: py(EG.y0) }}
        >
          {l}
        </span>
      ))}
    </>
  );
}

function Oranlar() {
  return (
    <>
      <span className="vgr-oran" data-ton="dusuk" style={{ left: px(ex(25000)), top: py(ey(19)) }}>
        %19
      </span>
      <span className="vgr-oran" data-ton="ust" style={{ left: px(ex(275000)), top: py(ey(25)) }}>
        %25
      </span>
    </>
  );
}

/* A · SADE */
function Sade() {
  return (
    <div className="vgr-alan">
      <div className="vgr-cizim">
        <Cizim />
        <Oranlar />
        <Eksen />
      </div>
      <div className="vgr-ayrac" style={{ marginLeft: px(ex(50000)), width: px(ex(250000) - ex(50000)) }}>
        <span>kâr arttıkça oran kademeli yükseliyor</span>
      </div>
    </div>
  );
}

/* B · KAYDIRICI */
function Kaydir() {
  /* Kaydırıcı grafiğin ekseniyle aynı aralıkta (0–300.000) ve aynı yatay
     boşlukla (.vgr-kay, 20/640): başparmak kesik çizginin altında duruyor. */
  const [p, setP] = useState(120000);
  const r = oran(Math.max(p, 1));
  const vergi = Math.round((p * r) / 100 / 50) * 50;
  const id = useId();
  return (
    <div className="vgr-alan">
      <div className="vgr-cizim">
        <Cizim secili={p} />
        <Oranlar />
        <Eksen />
        <span className="vgr-balon" style={{ left: px(ex(p)), top: py(ey(r)), "--vgr-renk": renk(r) } as CSSProperties}>
          %{nf1.format(r)}
        </span>
      </div>
      <label className="vgr-kay" htmlFor={id}>
        <span className="sr-only">Yıllık kâr</span>
        <input
          id={id}
          type="range"
          min={0}
          max={300000}
          step={5000}
          value={p}
          onChange={(e) => setP(Number(e.target.value))}
          style={{ "--vgr-dolu": `${(p / 300000) * 100}%` } as CSSProperties}
        />
      </label>
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

/* C · SÜTUN. Boy = oran (0'dan; %19 ile %25 arası fark gerçek oranında). */
const ORNEK = [25000, 50000, 100000, 150000, 200000, 250000, 400000];
function Sutun() {
  return (
    <ol className="vgr-sutun">
      {ORNEK.map((p) => {
        const r = oran(p);
        return (
          <li key={p} style={{ "--vgr-boy": `${(r / 25) * 100}%`, "--vgr-renk": renk(r) } as CSSProperties}>
            <span className="vgr-sutun-kolon">
              <b>%{nf1.format(r)}</b>
              <i aria-hidden="true" />
            </span>
            <span className="vgr-sutun-kar">£{nf.format(p / 1000)} bin<span> kâr</span></span>
            <span className="vgr-sutun-vergi">vergi £{nf.format((p * r) / 100)}</span>
          </li>
        );
      })}
    </ol>
  );
}

export type VergiGrafikTip = "sade" | "kaydir" | "sutun";

export default function VergiGrafik({ tip, baslik }: { tip: VergiGrafikTip; baslik: string }) {
  return (
    <div className="txm-egri">
      <p className="txm-bant-h">
        {baslik}
        <span>
          {tip === "kaydir"
            ? "Kaydırıcıyla yıllık kârınızı seçin."
            : tip === "sutun"
              ? "Örnek kârlarda kurumlar vergisi oranı ve tutarı."
              : "Yatayda yıllık kâr, dikeyde kurumlar vergisi oranı."}
        </span>
      </p>
      {tip === "sade" && <Sade />}
      {tip === "kaydir" && <Kaydir />}
      {tip === "sutun" && <Sutun />}
    </div>
  );
}
