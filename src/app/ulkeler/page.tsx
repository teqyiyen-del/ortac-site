import type { Metadata } from "next";
import Nav from "@/components/Nav";
import PageHero from "@/components/shared/PageHero";
import Countries from "@/components/Countries";
import FinalCta from "@/components/FinalCta";

/* Kıyasın kendi sayfası. Ana sayfadaki ülke bölümü dört temel ölçütte yan yana
   bakış veriyor ve buraya çıkıyor; ayrıntı — vergi çerçevesi, banka başvurusu,
   dürüst kısıt, bütün tahsilat kanalları — burada. Başlık ve giriş metni bu
   ayrımı söylüyor: ziyaretçi buraya "karar veremedim" diye geliyor. */
export const metadata: Metadata = {
  title: "Ülkeler — Dubai, İngiltere ve KKTC'yi ölçüt ölçüt karşılaştırın | Ortac Global",
  description:
    "Dubai, İngiltere ve KKTC'yi maliyet, süre, oturum, vergi çerçevesi ve tahsilat kanalları başlıklarında tek tabloda karşılaştırın.",
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
          lead="Üç ülke ölçüt ölçüt yan yana: maliyet ve süre, oturum, vergi çerçevesi, banka ve tahsilat kanalları."
        />
        <Countries />
        <FinalCta />
      </main>
    </>
  );
}
