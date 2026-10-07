"use client";

/* /basla · kurulum akışının sayfadaki hâli (06.10.2026).
   Burak: "sağ üstten Kurulumu Başlat'a basarsak bunu gösteririz; ama
   fiyatlar kısmından seçip başlatıyorsa direkt seçili gelmesini istiyorum,
   ülkenin de seçimin de. Direkt ikinci aşamadan başlatır."
   Pencerenin kendisi components/lab/SatisAkisi.tsx · SatisPenceresi (`ozet`
   akışı); burada yalnız açılışı ve kapanınca görünen sayfa var. `onceden`
   sunucu sayfasının adresten okuduğu seçim (lib/dubaiFiyat.ts ·
   dubaiSecimOku). Sunum modu kapalı: gerçek akışta alanlar doldurulmadan
   ilerlenmiyor. */

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { SatisPenceresi } from "@/components/lab/SatisAkisi";
import type { BaslaOnceden } from "@/lib/baslaSecim";

export default function BaslaAkis({ onceden }: { onceden: BaslaOnceden | null }) {
  const [acik, setAcik] = useState(true);
  const [oturum, setOturum] = useState(0);
  return (
    <>
    <section className="sat-basla">
      <div className="sat-basla-ic">
        <h1>Kurulumu başlatın</h1>
        <p>Ülkenizi ve kurulumunuzu seçin, bilgilerinizi yazın; özetinizi görüp süreci başlatın.</p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            setOturum((n) => n + 1);
            setAcik(true);
          }}
        >
          Kurulumu Başlat
          <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
        </button>
      </div>
    </section>
      {/* pencere bölümün DIŞINDA: bölümün ortalaması ve gece yazı rengi
          pencereye miras kalmasın */}
      <SatisPenceresi
        key={oturum}
        acik={acik}
        akis="ozet"
        sunum={false}
        onceden={oturum === 0 ? onceden : null}
        onKapat={() => setAcik(false)}
      />
    </>
  );
}
