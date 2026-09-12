import type { ComponentType } from "react";
import UaeVat from "@/components/tools/UaeVat";
import NameForge from "@/components/tools/NameForge";
import UkIsimSorgu from "@/components/tools/UkIsimSorgu";
import SicBulucu from "@/components/tools/SicBulucu";
import type { PagedToolId } from "@/lib/tools/catalog";

/* ============================================================================
   ARAÇ KİMLİĞİ → BİLEŞEN
   ============================================================================

   NEDEN KAYIT DEFTERİNDE DEĞİL
   lib/tools/catalog.ts'i istemci bileşeni olan Nav.tsx de içeri alıyor. Bu
   tabloyu oraya koymak bütün araçların kodunu (ve bağımlılıklarını) menü paketine
   sokardı — menüde hiçbiri çalışmadığı hâlde.

   DEFTER YİNE TEK KAYNAK
   Tablo `Record<PagedToolId, …>` olarak yazılı ve `PagedToolId` doğrudan
   defterdeki `status` alanından türüyor. Yani:
     · Bir aracı "live" yapıp bileşenini yazmazsan  → eksik anahtar, tsc hatası.
     · Yazılmamış bir araca bileşen yazarsan        → fazla anahtar, tsc hatası.
   Tablo deftere uymak zorunda; tersi değil.

   TİPİ ComponentType, hazır ELEMAN değil: eleman tutmak, sayfa hiç
   basılmayacak olsa bile altı aracın React ağacını modül yüklenirken
   kurdurur. Sayfa yalnızca kendi aracını çağırıyor.

   KURUMLAR VERGİSİ BU TABLODAN ÇIKTI (11.09.2026 · araç dili turu). Araç
   artık ülke başına kendi adresinde (app/araclar/kurumlar-vergisi/[ulke])
   ve o sayfa bileşeni doğrudan, `ulke` propuyla çağırıyor. Defterde
   `ownHref` taşıdığı için PagedToolId'den düştü; satır burada kalsaydı
   yukarıdaki "fazla anahtar" kuralı tsc hatası verirdi — yani çıkış elle
   hatırlanmadı, tip sistemi istedi. Tablonun imzası `ComponentType` (propsuz)
   olduğu için zaten sığmıyordu da: ülkesiz çağrılan bir kurumlar vergisi
   aracı bu turdan sonra anlamsız.
   ========================================================================= */
export const TOOL_VIEW: Record<PagedToolId, ComponentType> = {
  "bae-kdv": UaeVat,
  "isim-ureteci": NameForge,
  "ingiltere-isim-sorgulama": UkIsimSorgu,
  "ingiltere-sic-kodu": SicBulucu,
};
