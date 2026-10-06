import { redirect } from "next/navigation";

/* LAB · /lab/hizmet-hero/sunum. S6 06.10.2026'da canlıya alındı
   (components/country/DubaiHero.tsx); müşteriye verilmiş bağlantı
   boşa düşmesin diye sayfa canlı Dubai sayfasına yönleniyor. */
export default function Sunum() {
  redirect("/dubai");
}
