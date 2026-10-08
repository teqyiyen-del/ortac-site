"use client";

/* FORM BAĞLA · sunucuda basılmış düz bir <form>'u gönderime bağlar (09.10.2026)

   İş ortaklığı formu bir sunucu bileşeninin içinde, durum tutmayan düz HTML
   (alanların `name`'i var, seçimler native radyo). Onu istemci bileşenine
   çevirmek yerine bu küçük parça formun İÇİNE konuyor: en yakın <form>'un
   gönderimini yakalıyor, alanları FormData'dan okuyor, lib/formGonder ile
   yolluyor ve sonucu formun not satırına yazıyor.

     <form …>
       …alanlar…
       <FormBagla tur="ortaklik" konu="…" etiketler={{ ad: "Ad Soyad", … }}
                  zorunlu={["ad", "eposta"]} yedekEposta="…" notId="pt-form-note" />
     </form>

   Görünür hiçbir şey basmıyor. */
import { useEffect, useRef } from "react";
import { formGonder, FORM_SONUC_METNI } from "@/lib/formGonder";

export default function FormBagla({
  tur,
  konu,
  etiketler,
  zorunlu,
  yedekEposta,
  notId,
}: {
  tur: "iletisim" | "kariyer" | "ortaklik" | "reklam" | "kurulum";
  konu: string;
  /** alan adı → ziyaretçinin gördüğü etiket; sıra iletideki sıradır */
  etiketler: Record<string, string>;
  zorunlu: string[];
  yedekEposta: string;
  /** sonucun yazılacağı not satırının id'si */
  notId: string;
}) {
  const kok = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const form = kok.current?.closest("form");
    if (!form) return;
    let gidiyor = false;
    const gonder = async (e: Event) => {
      e.preventDefault();
      if (gidiyor) return;
      const fd = new FormData(form);
      const oku = (n: string) => String(fd.get(n) ?? "").trim();
      const not = document.getElementById(notId);
      const eksik = zorunlu.filter((n) => !oku(n));
      if (eksik.length > 0) {
        if (not) not.textContent = `Lütfen şu alanları doldurun: ${eksik.map((n) => etiketler[n] ?? n).join(", ")}.`;
        return;
      }
      gidiyor = true;
      const sonuc = await formGonder({
        tur,
        konu,
        alanlar: Object.keys(etiketler).map((n) => [etiketler[n], oku(n)]),
        yedekEposta,
      });
      if (not) not.textContent = FORM_SONUC_METNI[sonuc];
      gidiyor = false;
    };
    form.addEventListener("submit", gonder);
    return () => form.removeEventListener("submit", gonder);
  }, [tur, konu, etiketler, zorunlu, yedekEposta, notId]);

  return <span ref={kok} hidden />;
}
