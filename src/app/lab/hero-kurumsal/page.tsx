import type { Metadata } from "next";
import { HeroK1, HeroK2, HeroK3 } from "@/components/lab/KurumsalHeroAdaylari";
import { Aday } from "../aday";
import { blogHref, sortedPosts } from "@/lib/blog";

/* LAB · /lab/hero-kurumsal (28.09.2026). Ana sayfa girişi için üç aday;
   gerekçe components/lab/KurumsalHeroAdaylari.tsx'in başında. K3'ün yazısı
   bloğun gerçek son yazısı (sunucuda okunuyor). */
export const metadata: Metadata = { title: "Ana sayfa girişi · adaylar | Ortac Global" };

export default function LabHeroKurumsal() {
  const p = sortedPosts()[0];
  const yazi = p
    ? { title: p.title, summary: p.summary, href: blogHref(p.slug), cover: p.cover, etiket: p.topic }
    : null;
  return (
    <main>
      <Aday bolum ad="K1 · Kurumsal cümle" kunye="gece zemin; solda firma, sağda 1996 ve üç ofis">
        <HeroK1 />
      </Aday>
      <Aday bolum ad="K2 · Fotoğraf" kunye="açık dil; fotoğraf üstünde başlık, altında dört hizmet">
        <HeroK2 />
      </Aday>
      <Aday bolum ad="K3 · Öne çıkan yazı" kunye="girişte bir görüş yazısı, altında kurumsal şerit" zemin="paper">
        <HeroK3 yazi={yazi} />
      </Aday>
    </main>
  );
}
