import type { Metadata } from "next";
import AraclarPage from "@/app/araclar/page";
import { POST_PHOTO } from "@/lib/media";
import "@/app/css/lab-foto-baslik.css";

/* LAB · /lab/foto-baslik/araclar. Aynı örnek araçlar sayfasında: farklı
   sayfa, farklı fotoğraf (masada vergi formları ve hesap makinesi). */
export const metadata: Metadata = { title: "Fotoğraflı başlık · araçlar | Ortac Global" };

export default function LabFotoBaslikAraclar() {
  return (
    <div className="fb-sayfa" style={{ "--fb-foto": `url(${POST_PHOTO.corpTax})` } as React.CSSProperties}>
      <AraclarPage />
    </div>
  );
}
