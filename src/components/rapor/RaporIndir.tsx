"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Download, FileText, X } from "lucide-react";
import RaporBelge from "@/components/rapor/RaporBelge";
import { gtm } from "@/lib/gtm";
import type { Rapor } from "@/lib/rapor";

/* ============================================================================
   RAPOR DÜĞMESİ VE ÖNİZLEME KATMANI
   Belge: RaporBelge.tsx · model: lib/rapor.ts · CSS: css/rapor.css (.rap-onz-)

   19.09.2026 · Burak: "raporu doğrudan indirmeye gerek yok, ekranda
   açabiliriz sorun değil ama yazdırma ekranı açma ÖNİZLEME EKRANI AÇ."

   ESKİ AKIŞ: düğmeye basınca doğrudan `window.print()` çağrılıyordu, yani
   ziyaretçi belgeyi hiç görmeden tarayıcının yazdırma kutusuyla karşılaşıyordu.
   YENİ AKIŞ iki adım: düğme belgeyi EKRANDA açıyor, kaydetme kararı belgeyi
   gördükten sonra veriliyor.

   NEDEN HÂLÂ window.print(): gerçek bir indirme için PDF'i bir yerde üretmek
   gerekiyor (sunucuda başsız tarayıcı ya da bir PDF kitaplığı) ve o, depoya
   ilk ağır bağımlılığı sokan ayrı bir iş. Burak bu turda onu istemedi:
   "doğrudan indirmeye gerek yok". Kaydetme yine tarayıcının "PDF olarak
   kaydet" akışıyla oluyor, ama artık ziyaretçi ne kaydettiğini biliyor.

   BELGE ARTIK BU BİLEŞENİN İÇİNDE. Önceden araç sayfası iki şey basıyordu:
   düğme ve ayrıca gizli `<RaporBelge>`. Katman kendi belgesini bassaydı
   sayfada İKİ `.rap-belge` olurdu ve yazdırma izolasyonu ikisini birden
   basardı (iki sayfa). Tek düğüm var ve katman açıkken DOM'da.

   KÂĞIT GERÇEK ÖLÇÜDE (210 mm) kuruluyor ve kabına sığacak kadar
   küçültülüyor. Ekranda görünen satır kırılmaları ve sayfa doluluğu PDF'teki
   ile aynı; "ekranda güzeldi ama PDF'te taştı" olmuyor. `transform: scale`
   düzeni etkilemediği için kabın yüksekliği elle veriliyor (aynı kalıp
   components/lab/RaporOnizleme.tsx'te de var).

   YAZDIRMADA KATMANIN KENDİSİ BASILMIYOR: izolasyon kuralı `.rap-belge`nin
   ata zincirindeki her şeyi düz bloğa indiriyor ve kardeşleri gizliyor
   (css/rapor.css · @media print). Ölçek de orada sıfırlanıyor. */
export default function RaporIndir({
  arac,
  rapor,
  etiket = "Raporu açın (PDF)",
}: {
  arac: string;
  rapor: Rapor;
  etiket?: string;
}) {
  const [acik, setAcik] = useState(false);
  const [olcek, setOlcek] = useState(1);
  const [yukseklik, setYukseklik] = useState<number | undefined>(undefined);
  const kap = useRef<HTMLDivElement>(null);
  const sayfa = useRef<HTMLDivElement>(null);
  const kutu = useRef<HTMLDivElement>(null);
  /* Katman kapanınca odak düğmeye dönsün: klavye kullanıcısı sayfanın başına
     fırlamasın. */
  const donus = useRef<HTMLButtonElement>(null);
  const basId = useId();

  const kapat = useCallback(() => {
    setAcik(false);
    donus.current?.focus();
  }, []);

  /* Esc ile kapanma + arka planın kaydırılmaması. İkisi de yalnız katman
     açıkken bağlanıyor. */
  useEffect(() => {
    if (!acik) return;
    const tus = (e: KeyboardEvent) => {
      if (e.key === "Escape") kapat();
    };
    document.addEventListener("keydown", tus);
    const eski = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    kutu.current?.focus();
    return () => {
      document.removeEventListener("keydown", tus);
      document.body.style.overflow = eski;
    };
  }, [acik, kapat]);

  /* Ölçek: kâğıt kabına sığacak kadar küçülüyor. Hem kabı hem kâğıdı izliyor,
     çünkü kâğıdın boyu içeriğe göre değişiyor (kısa raporlar daha kısa). */
  useEffect(() => {
    if (!acik) return;
    const k = kap.current;
    const s = sayfa.current;
    if (!k || !s) return;
    const olc = () => {
      const o = Math.min(1, k.clientWidth / s.offsetWidth);
      setOlcek(o);
      setYukseklik(s.offsetHeight * o);
    };
    olc();
    const ro = new ResizeObserver(olc);
    ro.observe(k);
    ro.observe(s);
    return () => ro.disconnect();
  }, [acik]);

  return (
    <>
      <button
        ref={donus}
        type="button"
        className="btn btn-line rap-indir"
        onClick={() => {
          gtm("rapor_ac", { arac });
          setAcik(true);
        }}
      >
        <FileText size={15} strokeWidth={2.1} aria-hidden="true" />
        {etiket}
      </button>

      {acik && (
        <div className="rap-onz" role="presentation" onClick={kapat}>
          {/* Kâğıdın üstüne tıklamak katmanı kapatmasın; kapatma yalnız
              perdeye ve düğmelere ait. */}
          <div
            ref={kutu}
            className="rap-onz-kutu"
            role="dialog"
            aria-modal="true"
            aria-labelledby={basId}
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rap-onz-bas">
              <p id={basId} className="rap-onz-t">
                {rapor.baslik}
              </p>
              <span className="rap-onz-a">
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    gtm("rapor_indir", { arac });
                    window.print();
                  }}
                >
                  <Download size={15} strokeWidth={2.1} aria-hidden="true" />
                  PDF olarak kaydedin
                </button>
                <button
                  type="button"
                  className="rap-onz-kapat"
                  onClick={kapat}
                  aria-label="Önizlemeyi kapat"
                >
                  <X size={18} strokeWidth={2.2} aria-hidden="true" />
                </button>
              </span>
            </div>

            <div className="rap-onz-govde">
              <div ref={kap} className="rap-onz-kap" style={{ height: yukseklik }}>
                <div
                  ref={sayfa}
                  className="rap-onz-a4"
                  style={{ "--rap-olcek": olcek } as React.CSSProperties}
                >
                  <RaporBelge rapor={rapor} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
