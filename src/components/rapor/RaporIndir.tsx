"use client";

import { Download } from "lucide-react";
import { gtm } from "@/lib/gtm";

/* Rapor düğmesi. Tarayıcının yazdırma kutusunu açıyor; kullanıcı oradan
   "PDF olarak kaydet" diyor. Yazdırma kipinde sayfadaki her şey gizli, yalnız
   RaporBelge basılıyor (css/rapor.css).

   NEDEN window.print: sunucu tarafı PDF üretimi (kayıt tutmak, e-postayla
   göndermek) ayrı bir iş ve karar bekliyor; bu yol bugün, ek bir bağımlılık
   ve sunucu turu olmadan Ortac logolu bir belge veriyor. */
export default function RaporIndir({ arac, etiket = "Raporu indir (PDF)" }: { arac: string; etiket?: string }) {
  return (
    <button
      type="button"
      className="btn btn-line rap-indir"
      onClick={() => {
        gtm("rapor_indir", { arac });
        window.print();
      }}
    >
      <Download size={15} strokeWidth={2.1} aria-hidden="true" />
      {etiket}
    </button>
  );
}
