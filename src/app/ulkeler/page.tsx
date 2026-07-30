import type { Metadata } from "next";
import Nav from "@/components/Nav";
import PageHero from "@/components/shared/PageHero";
import Countries from "@/components/Countries";
import FinalCta from "@/components/FinalCta";

export const metadata: Metadata = {
  title: "Ülkeler — Dubai, İngiltere ve KKTC'de şirket kuruluşu | Ortac Global",
  description:
    "Dubai, İngiltere ve KKTC'yi süre, maliyet, vergi ve banka başlıklarında yan yana karşılaştırın.",
};

export default function UlkelerPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero
          crumb="Ülkeler"
          title="Nerede kuracağınıza önce burada karar verin."
          accent="burada karar verin."
          lead="Üç ülkenin süresi, maliyeti, vergisi ve banka tarafı yan yana. Seçtiğiniz sütun sayfanın geri kalanında da geçerli olur."
        />
        <Countries />
        <FinalCta />
      </main>
    </>
  );
}
