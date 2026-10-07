/* /basla · "Kurulumu Başlat" düğmelerinin indiği sayfa.

   06.10.2026 · AKIŞ BAĞLANDI. Sayfa o güne kadar "kurulum akışı henüz
   açılmadı" diyen bir taslaktı. Burak lab'daki akışı gezip "yapmamışsın,
   lab'da yapmışsın" dedi: akış artık burada açılıyor
   (components/basla/BaslaAkis.tsx). Menüden gelen baştan başlıyor; fiyat
   panelinden gelen (adreste ulke=dubai ve seçim) ikinci adımdan, seçili.

   HENÜZ GERÇEK DEĞİL: hiçbir bilgi bir yere gönderilmiyor; müşteri
   panelinin adresi, WhatsApp numarası ve KVKK metni SWAP. O yüzden sayfa
   aramaya kapalı kalıyor. Yalnız Dubai seçilebiliyor. */

import type { Metadata } from "next";
import Nav from "@/components/Nav";
import BaslaAkis from "@/components/basla/BaslaAkis";
import { baslaOku } from "@/lib/baslaSecim";

export const metadata: Metadata = {
  title: "Kurulumu başlat | Ortac Global",
  description: "Ülkenizi ve kurulumunuzu seçin, bilgilerinizi yazın, özetinizi görüp süreci başlatın.",
  robots: { index: false, follow: false },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function BaslaPage({ searchParams }: { searchParams: SearchParams }) {
  const onceden = baslaOku(await searchParams);
  return (
    <>
      <Nav />
      <main>
        <BaslaAkis onceden={onceden} />
      </main>
    </>
  );
}
