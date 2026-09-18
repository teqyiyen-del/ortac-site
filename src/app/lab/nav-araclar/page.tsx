import type { Metadata } from "next";

import { NavAracN1, NavAracN2, NavAracN3 } from "@/components/lab/NavAracAdaylari";

/* /lab/nav-araclar — navbardaki Araçlar panelinin üç yönü.

   18.09.2026 · Burak: "navbardaki araçları sunuş şeklimiz pek okey değil onu
   tam olarak beğenemiyorum aşırı karışık duruyor ve her şey çorba gibi bir
   arada. kimisi 2 satır, kimisi 1 satır fln öyle bi dengesizlikte var amk."

   Ölçülen sebep: iki satıra çıkan üç başlığın HEPSİNDE ilk kelime ülke adı
   ("Dubai kurumlar vergisi hesaplayıcı" · "İngiltere kurumlar vergisi
   hesaplayıcı" · "İngiltere şirket ismi sorgulama"). Dengesizliğin kaynağı
   araç adları değil, her ada tekrar tekrar yazılan ülke — ve yedi kartın 4x2
   ızgarada sekizinci gözü boş bırakması.

   Üç aday da AYNI YEDİ ARACI kayıt defterinden (lib/tools/catalog.ts) okuyor;
   uydurma araç, uydurma künye yok. Canlı navbar bu turda değişmedi. */

export const metadata: Metadata = {
  title: "Navbar araçlar paneli · adaylar | Ortac Global",
  robots: { index: false, follow: false },
};

export default function NavAracLab() {
  return (
    <main>
      <div className="lgc-kunye">
        <span>Aday · navbar araçlar</span>
        <h1>Araçlar panelinin düzeni</h1>
        <p>
          Bugünkü panelde yedi kart 4x2 ızgarada duruyor ve sekizinci göz boş kalıyor. Üç başlık
          iki satır, dördü tek satır; künyelerin ikisi iki satır. Yani <b>hiçbir kart aynı
          yükseklikte değil</b> ve ızgara tırtıklı.
        </p>
        <p>
          İki satıra çıkan üç başlığın hepsinde ilk kelime <b>ülke adı</b>. Dengesizliğin kaynağı
          araç adları değil, her ada tekrar yazılan ülke. Üç aday da bu noktadan başlıyor.
        </p>
        <p>
          Üçünde de panel çerçevesi canlı panelin ölçülerinde ve yedi araç kayıt defterinden
          okunuyor. Canlı navbar bu turda <b>değişmedi</b>.
        </p>
      </div>

      <NavAracN1 />
      <NavAracN2 />
      <NavAracN3 />
    </main>
  );
}
