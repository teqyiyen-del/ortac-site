import type { Metadata } from "next";
import HomeServices from "@/components/home/HomeServices";
import { Aday } from "../aday";

/* LAB · gece sahnesinin zemini (25.09.2026). Burak: "simsiyah üzerinde
   durunca biraz garip oluyor … arka plana görsel değil … daha farklı bir
   çözüm bulmak lazım, dene. İyi olursa belki bentolarda da yaparız."
   Aynı bileşen (ana sayfa · Verdiğimiz hizmetler), yalnız `zemin` değişiyor. */
export const metadata: Metadata = { title: "Sahne zemini · adaylar | Ortac Global" };

export default function LabSahne() {
  return (
    <main>
      <Aday bolum ad="Z0 · Bugün" kunye="kenardan kenara düz siyah">
        <HomeServices />
      </Aday>
      <Aday bolum ad="Z1 · Kuyu" kunye="sahne kartın içinde bir tık açık, yuvarlak bir kuyuda (Hakkımızda kalıbı)">
        <HomeServices zemin="kuyu" />
      </Aday>
      <Aday bolum ad="Z2 · Nokta ızgara" kunye="düz siyah yerine silik nokta ızgarası ve hafif ton geçişi">
        <HomeServices zemin="izgara" />
      </Aday>
      <Aday bolum ad="Z3 · Foto öğe" kunye="fotoğraf arka plan değil, sahnenin içinde bir kart; çizim onun üstüne biniyor">
        <HomeServices zemin="foto" />
      </Aday>
    </main>
  );
}
