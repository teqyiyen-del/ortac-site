import type { Metadata } from "next";
import { DubaiVip, type VipDuzen } from "@/components/country/DubaiEkler";

/* LAB · /lab/dubai-vip (07.10.2026). Dubai sayfasındaki VIP vize bölümünün
   düzeni için üç aday ve canlıdaki. Gerekçe ve tarifler
   components/country/DubaiEkler.tsx · DubaiVip'in başında. */
export const metadata: Metadata = { title: "Dubai · VIP bölümü adayları | Ortac Global" };

const ADAY: { k: VipDuzen; ad: string; kunye: string }[] = [
  { k: "iki", ad: "V1 · İki kart", kunye: "önceki hava: solda siyah kart, sağda beyaz kartta altı satır" },
  { k: "rakam", ad: "V2 · Büyük rakam", kunye: "5 iş günü dev rakamla, standart üstü çizili yanında" },
  { k: "gun", ad: "V3 · Gün gün", kunye: "on iki günlük iki sıra kare: standart dolu, VIP beşte bitiyor" },
  { k: "tek", ad: "Canlıdaki", kunye: "tek siyah kart, solda çubuklar, sağda maddeler" },
];

export default function LabDubaiVip() {
  return (
    <main>
      {ADAY.map(({ k, ad, kunye }) => (
        <div key={k}>
          <div className="lhz-lab-ad">
            <div className="container-o">
              <a href="#">
                {ad}
                <span>{kunye}</span>
              </a>
            </div>
          </div>
          <DubaiVip duzen={k} />
        </div>
      ))}
    </main>
  );
}
