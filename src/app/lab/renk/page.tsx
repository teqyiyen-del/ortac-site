import type { Metadata } from "next";
import CountryPros from "@/components/country/CountryPros";
import { COUNTRY_CONTENT } from "@/lib/countryContent";
import { Aday } from "../aday";

/* LAB · bento rengi, üç kademe (25.09.2026). Burak: "nerelere ne kadar renk
   yedirebiliriz". Aynı bileşen, yalnız `renk` prop'u değişiyor; R1 bugün
   /dubai'de canlı. Kurallar css/advx-renk.css. */
export const metadata: Metadata = { title: "Bento rengi · adaylar | Ortac Global" };

const PROS = COUNTRY_CONTENT.dubai.pros;

export default function LabRenk() {
  return (
    <main>
      <Aday bolum ad="R0 · Bugün" kunye="tek mavi; logolar dışında renk yok">
        <CountryPros pros={PROS} name="Dubai" />
      </Aday>
      <Aday bolum ad="R1 · Ölçülü" kunye="vergi amber, banka ve onay yeşil, kart çipi altın · /dubai'de canlı">
        <CountryPros pros={PROS} name="Dubai" renk={1} />
      </Aday>
      <Aday bolum ad="R2 · Belirgin" kunye="R1 + gece panelinde kartın tonunda ışık">
        <CountryPros pros={PROS} name="Dubai" renk={2} />
      </Aday>
    </main>
  );
}
