import type { Metadata } from "next";
import AracKartlari from "@/components/lab/AracKartlari";
import { Aday } from "../aday";

/* LAB · araç dizininde fotoğraf, iki biçim (25.09.2026). Seçilen /araclar'a
   taşınır. Bugünkü hâl /araclar'da. */
export const metadata: Metadata = { title: "Araç kartları · adaylar | Ortac Global" };

export default function LabAraclar() {
  return (
    <main>
      <Aday ad="A1 · Fotoğraflı kart" kunye="fotoğraf tam kart, yazı üstünde (sektör kartlarının kalıbı)">
        <AracKartlari bicim="a1" />
      </Aday>
      <Aday ad="A2 · Üstte fotoğraf" kunye="kartın üst bandı fotoğraf, altı bugünkü beyaz gövde" zemin="paper">
        <AracKartlari bicim="a2" />
      </Aday>
    </main>
  );
}
