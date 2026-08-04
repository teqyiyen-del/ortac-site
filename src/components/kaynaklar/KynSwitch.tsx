import SmartLink from "@/components/shared/SmartLink";
import { ArrowRight } from "lucide-react";
import { KIND_ORDER, RESOURCE_KINDS, shelfCountOf, type ResourceKind } from "@/lib/resources";

/* ============================================================================
   TÜR DEĞİŞTİRİCİ — her kaynak sayfasının altındaki şerit
   ============================================================================

   Müşterinin şikâyeti "hepsi aynı yere çıkıyor"du. Ayrımı sayfaları bölerek
   yapmak yetmiyor; ziyaretçinin dört türün VAR olduğunu ve hangisinde
   durduğunu görmesi lazım. Bu şerit onu yapıyor: dördü de her sayfanın
   altında duruyor, içinde bulunulan tür sönük değil ama tıklanamaz
   (`aria-current="page"`), diğer üçü gerçek çıkış.

   Sayı elle yazılmıyor (`shelfCountOf`) ve dördü de aynı birimi sayıyor.

   BU TURDA İKİ ŞEY DEĞİŞTİ:

   1. Sayım `countOf`tan `shelfCountOf`a geçti. `countOf` yayınları sayıyor;
      şerit ise ziyaretçiyi bir SAYFAYA gönderiyor ve o sayfada kaç kart
      olduğunu söylemeli. Gelişmeler sayfasında yirmi iki kart varken şeridin
      "Hazırlanıyor" demesi, sayfayı görmüş kişi için doğrudan bir hata.

   2. Birim "yayın"dan "kayıt"a döndü ve "Hazırlanıyor" kalktı. Listedeki
      kartların bir kısmı örnek ve rozetiyle öyle işaretli; "22 yayın" demek
      onları yayınlanmış saymak olurdu. Sıfırda hiçbir şey yazılmıyor —
      "0 kayıt" ilk izlenimde hata gibi okunuyor, "Hazırlanıyor" ise müşterinin
      bu turda kaldırttığı dilin kendisi.
   ========================================================================= */

const countText = (kind: ResourceKind): string => {
  const n = shelfCountOf(kind);
  return n === 0 ? "" : `${n} kayıt`;
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
