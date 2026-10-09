"use client";

import { useId, useState } from "react";
import { ArrowRight } from "lucide-react";

import SmartLink from "@/components/shared/SmartLink";
import type { VergiGorsel } from "@/lib/vergiDubai";

/* ============================================================================
   VERGİ HESABI · eşikli tek oran — .svr-hsp · css/svc-vergi.css
   Veri: lib/vergiDubai.ts · cerceve.gorsel (tur: "esik").

   09.10.2026 · Dubai vergi sayfasının çerçeve görseli. Ülke sayfasındaki
   vergi bölümü (CountryTax) rakamları kart olarak basıyor, İngiltere'nin
   eğrisi (country/VergiGrafik) kaydırıcıyla oranı gösteriyor. Dubai'de eğri
   yok: kural tek eşik ve tek oran. O yüzden çizim bir ÇUBUK: kârın eşiğe
   kadar olan kısmı yeşil (vergi çıkmıyor), üstü mavi (%9). Kaydırıcı kârı
   değiştirdikçe iki parçanın boyu ve dört rakam birlikte değişiyor.

   NEDEN SVG DEĞİL: çubuğun iki parçası genişliğini yüzdeyle alıyor ve
   rakamlar okunacak yazı (en az 14 px). viewBox ile ölçeklenen SVG'de yazı
   telefonda küçülüyor (VergiGrafik · "YAZILAR SVG'DE DEĞİL" notu).

   KAYDIRICI YERLİ <input type="range">: klavye, dokunma ve ekran okuyucu
   kendiliğinden çalışıyor; rengi accent-color. Sonuç kutuları aria-live.

   HESAP GÖSTERİM. Vergi = (kâr − eşik) × oran; "vergilendirilebilir gelir"
   muhasebe kârından farklı olabiliyor, o yüzden sonuç "tahmini". Ayrıntılı
   hesap aracın işi (arac bağlantısı). Başlangıç değeri sabit: sunucu ve
   tarayıcı aynı sayıyı basıyor, hidratasyon farkı yok. */

const nf = new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 0 });
const nf1 = new Intl.NumberFormat("tr-TR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

type Esik = Extract<VergiGorsel, { tur: "esik" }>;

export default function VergiHesap({ veri: G }: { veri: Esik }) {
  const [p, setP] = useState(G.varsayilan);
  const id = useId();
  const alt = Math.min(p, G.esik);
  const ust = Math.max(0, p - G.esik);
  const vergi = Math.round((ust * G.oran) / 100);
  const efektif = p > 0 ? (vergi / p) * 100 : 0;
  const yuzde = (v: number) => `${(v / G.max) * 100}%`;
  const para = (v: number) => `${nf.format(v)} ${G.birim}`;

  return (
    <div className="svr-hsp">
      <p className="svr-hsp-h">
        <b>{G.baslik}</b>
        <span>Kaydırıcıyla yıllık net kârınızı seçin.</span>
      </p>

      <div className="svr-hsp-kar">
        <label htmlFor={id} className="svr-hsp-et">
          Yıllık net kâr
        </label>
        <output htmlFor={id} className="svr-hsp-tutar">
          {para(p)}
        </output>
      </div>

      {/* çubuk süs: aynı bilgi aşağıdaki dört kutuda yazıyla duruyor */}
      <div className="svr-hsp-cubuk" aria-hidden="true">
        <span className="svr-hsp-dilim" data-ton="yesil" style={{ width: yuzde(alt) }} />
        <span className="svr-hsp-dilim" data-ton="mavi" style={{ width: yuzde(ust) }} />
        <span className="svr-hsp-esik" style={{ left: yuzde(G.esik) }}>
          <i />
          <b>{nf.format(G.esik)}</b>
        </span>
      </div>

      <input
        id={id}
        className="svr-hsp-kay"
        type="range"
        min={0}
        max={G.max}
        step={G.adim}
        value={p}
        onChange={(e) => setP(Number(e.target.value))}
        aria-valuetext={para(p)}
      />

      <dl className="svr-hsp-son" aria-live="polite">
        <div className="svr-hsp-k" data-ton="yesil">
          <dt>%0 dilimi</dt>
          <dd>{para(alt)}</dd>
        </div>
        <div className="svr-hsp-k" data-ton="mavi">
          <dt>%{G.oran} dilimi</dt>
          <dd>{para(ust)}</dd>
        </div>
        <div className="svr-hsp-k" data-ton="ana">
          <dt>Tahmini vergi</dt>
          <dd>{para(vergi)}</dd>
        </div>
        <div className="svr-hsp-k">
          <dt>Efektif oran</dt>
          <dd>%{nf1.format(efektif)}</dd>
        </div>
      </dl>

      {G.arac && (
        <SmartLink href={G.arac.href} className="svr-cik">
          {G.arac.label}
          <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
        </SmartLink>
      )}
    </div>
  );
}
