import {
  Boxes,
  Building2,
  ChartCandlestick,
  Code2,
  Handshake,
  History,
  Languages,
  LayoutDashboard,
  Stamp,
  Stethoscope,
  UserRound,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

/* ============================================================================
   LAB · üç hakkımızda-bento adayının ORTAK ikon eşlemesi
   Kullanan: AboutBentoBase · AboutBentoKaro · AboutBentoBeyan · AboutBentoYerinde

   NEDEN AYRI DOSYA: about.ts ikonu bileşen değil STRING taşıyor (o dosya
   React'ten bağımsız kalsın diye, gerekçesi orada yazılı) ve sektör ikonları
   da slug ile eşleniyor. Üç aday da aynı eşlemeyi kullanmak ZORUNDA: aynı
   sektörün üç adayda üç farklı glifle çıkması, kıyası tasarım kararından
   çıkarıp glif kıyasına çevirirdi.

   EŞLEMELER CANLI SAYFANIN AYNISI. src/app/hakkimizda/page.tsx içindeki ICONS
   ve SECTOR_ICONS ile birebir aynı gliflere işaret ediyorlar; bir sektör
   sayfada bir gliflle, bentoda başka bir glifle çıkarsa ziyaretçinin kurduğu
   görsel eşleme bozulur. Canlı dosya SALT OKUNUR olduğu için import edilmiyor,
   değeri buraya kopyalandı.
   ========================================================================= */

/** about.ts · AboutIcon değerleri. Anahtar string, çünkü kaynak dosya öyle. */
export const ABOUT_ICON: Record<string, LucideIcon> = {
  stamp: Stamp,
  handshake: Handshake,
  office: Building2,
  history: History,
  team: UsersRound,
  language: Languages,
  panel: LayoutDashboard,
};

/** about.ts · FOR_WHOM.sectors[].slug */
export const SECTOR_ICON: Record<string, LucideIcon> = {
  "e-ticaret": Boxes,
  "yazilim-ve-teknoloji": Code2,
  danismanlik: UserRound,
  gayrimenkul: Building2,
  "finans-ve-yatirim": ChartCandlestick,
  "saglik-ve-medikal": Stethoscope,
};
