import SmartLink from "@/components/shared/SmartLink";
import { ArrowRight } from "lucide-react";
import { KIND_ORDER, RESOURCE_KINDS, countOf, type ResourceKind } from "@/lib/resources";

/* ============================================================================
   TÜR DEĞİŞTİRİCİ — her kaynak sayfasının altındaki şerit
   ============================================================================

   Müşterinin şikâyeti "hepsi aynı yere çıkıyor"du. Ayrımı sayfaları bölerek
   yapmak yetmiyor; ziyaretçinin dört türün VAR olduğunu ve hangisinde
   durduğunu görmesi lazım. Bu şerit onu yapıyor: dördü de her sayfanın
   altında duruyor, içinde bulunulan tür sönük değil ama tıklanamaz
   (`aria-current="page"`), diğer üçü gerçek çıkış.

   Sayı elle yazılmıyor (`countOf`). Boş türde sayı yerine "hazırlanıyor"
   yazıyor — sıfır basmak da bir bilgi ama "0 yayın" ilk izlenimde hata gibi
   okunuyor, "hazırlanıyor" ise durumu doğru anlatıyor.
   ========================================================================= */

const countText = (kind: ResourceKind): string => {
  const n = countOf(kind);
  if (n === 0) return "Hazırlanıyor";
  return kind === "rehber" ? `${n} ülke` : `${n} yayın`;
};

export default function KynSwitch({ current }: { current: ResourceKind }) {
  return (
    <section className="kyn-switch">
      <div className="container-o">
        <h2 className="kyn-switch-h">Kaynakların dört türü</h2>
        <p className="kyn-switch-l">
          Dördü ayrı iş yapıyor: biri okutur, biri yol gösterir, biri neyin değiştiğini yazar,
          biri indirilir.
        </p>

        <div className="kyn-switch-g">
          {KIND_ORDER.map((k) => {
            const m = RESOURCE_KINDS[k];
            const here = k === current;

            /* Bulunulan tür bağlantı değil: aynı sayfaya giden bir bağlantı
               klavye kullanıcısına gerçek bir seçenek gibi görünüyor. */
            if (here) {
              return (
                <span key={k} className="kyn-switch-c" aria-current="page" data-here="true">
                  <b>{m.label}</b>
                  <em>{m.job}</em>
                  <i>Bu sayfa</i>
                </span>
              );
            }

            return (
              <SmartLink key={k} href={m.href} className="kyn-switch-c">
                <b>{m.label}</b>
                <em>{m.job}</em>
                <i>
                  {countText(k)}
                  <ArrowRight size={14} strokeWidth={2.2} aria-hidden="true" />
                </i>
              </SmartLink>
            );
          })}
        </div>
      </div>
    </section>
  );
}
