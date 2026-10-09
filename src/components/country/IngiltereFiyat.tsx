/* İNGİLTERE FİYAT · TEK FİYAT, PAKET YOK (09.10.2026).
   Murat Bey'in teyit cevabı (soru 3): "Paket yok, tek fiyat. STG olacak,
   yapıyorum." Önceki panel (CountryPricing) üç paketi (Basic 900, Gold 1.500,
   Platinium 2.600 dolar) ve faaliyet çarpanını gösteriyordu; ikisi de
   lib/pricing.ts'teki temsilî rakamlardı ve artık yanlış bilgi.
   Sterlin tutar HENÜZ GELMEDİ: rakam uydurulmadı, kart "tek fiyat" olduğunu
   söyleyip teklife götürüyor. Tutar gelince `TUTAR` dolar ve kartın başına
   basılır; başka bir şey değişmez.
   (soru 4) İngiltere muhasebe ücreti sitede YAZILMIYOR; kartta da yok.
   lib/pricing.ts'e dokunulmadı; CountryPricing.tsx duruyor, akışta değil. */

import { ArrowRight, Check } from "lucide-react";
import SmartLink from "@/components/shared/SmartLink";
import { FACTS } from "@/lib/brand";

/** Murat Bey'den gelecek tek kuruluş fiyatı (ör. "£950"); boşken basılmıyor */
const TUTAR: string | null = null;

export default function IngiltereFiyat() {
  return (
    <div className="ip ip-tek">
      <aside className="ip-out">
        <span className="ip-out-k">Kuruluş</span>
        <span className="ip-total">{TUTAR ?? "Tek fiyat"}</span>
        <span className="ip-out-u">
          {TUTAR ? `tek seferlik · ${FACTS.ingiltere.days}` : `Paket yok; tutar teklifte · ${FACTS.ingiltere.days}`}
        </span>

        <div className="ip-meta">
          <span>
            Yapı<b>{FACTS.ingiltere.structure}</b>
          </span>
          <span>
            Para birimi<b>Sterlin (£)</b>
          </span>
        </div>

        <SmartLink href="/iletisim" className="btn btn-primary btn-full">
          Fiyat için iletişime geçin
          <ArrowRight size={15} strokeWidth={2.1} />
        </SmartLink>

        <ul className="ip-assure">
          <li>
            <Check size={13} strokeWidth={3} />
            Kapsam ve hariç kalemler yazılı
          </li>
          <li>
            <Check size={13} strokeWidth={3} />
            Beklenmedik kalem çıkmaz
          </li>
        </ul>
      </aside>
    </div>
  );
}
