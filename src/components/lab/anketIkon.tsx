import {
  Banknote,
  Briefcase,
  Building2,
  CalendarClock,
  CircleHelp,
  Code,
  CreditCard,
  Fingerprint,
  Globe,
  Handshake,
  IdCard,
  Landmark,
  Laptop,
  Layers,
  MapPin,
  Package,
  PanelsTopLeft,
  Plane,
  Receipt,
  SlidersHorizontal,
  Stamp,
  Store,
  UserRound,
  UserRoundX,
  UsersRound,
  Wallet,
  type LucideIcon,
} from "lucide-react";

import type { FitIcon } from "@/lib/fitTest";

/* ============================================================================
   /lab/anket · üç adayın ORTAK ikon haritası

   NEDEN AYRI DOSYA. Anahtar → lucide bileşeni eşlemesi 26 satır ve üç aday da
   aynı soruları basıyor. Üç dosyada üç kopya, ilk gün birebir aynı olur;
   ikinci turda biri güncellenir öteki unutulur ve adaylar aynı soruyu farklı
   glifle gösterir. O anda karşılaştırma bozulur, çünkü kıyas ettiğimiz şey
   YAPI, ikon seçimi değil.

   HARİTA CANLIDAKİNİN AYNISI. src/components/FitTest.tsx içindeki FIT_ICONS
   ne diyorsa burada da o yazıyor; bilerek kopyalandı, import edilmedi.
   FitTest.tsx bu tur BAŞKA BİR AJANIN elinde ve o dosyadan içeri almak, lab
   sayfasını canlı bileşenin bugünkü hâline bağlamak olurdu: canlı taraf
   değişince adaylar da haber vermeden değişir. Anahtar tipinin (FitIcon)
   kendisi fitTest.ts'ten geliyor, yani yeni bir ikon anahtarı eklenirse
   BURASI DERLEME HATASI VERİR. Kopya sessizce eskiyemez.

   BOYUT BURADA YOK. Üç aday ikonu üç farklı ölçekte kullanıyor (SAHNE 26 ve
   132 px, FÖY 30, PANO 20) ve ölçek adayın tasarım kararı; ortak dosya
   yalnızca hangi anahtarın hangi glifi çağırdığını söylüyor.
   ========================================================================= */
export const ANK_ICONS: Record<FitIcon, LucideIcon> = {
  pin: MapPin,
  layers: Layers,
  receipt: Receipt,
  panels: PanelsTopLeft,
  landmark: Landmark,
  plane: Plane,
  wallet: Wallet,
  calendar: CalendarClock,
  stamp: Stamp,
  code: Code,
  package: Package,
  handshake: Handshake,
  help: CircleHelp,
  card: CreditCard,
  cash: Banknote,
  store: Store,
  user: UserRound,
  userx: UserRoundX,
  users: UsersRound,
  building: Building2,
  id: IdCard,
  finger: Fingerprint,
  laptop: Laptop,
  briefcase: Briefcase,
  globe: Globe,
  sliders: SlidersHorizontal,
};

/* Şıkkın ikonu yoksa ne konacak — üç adayın ortak cevabı ve KASITLI olarak
   ikon değil HARF. Gerekçe fitTest.ts · İKON ANAHTARI kural 2'nin devamı:
   ikonsuz şıklar (bütçe bandı, takvim bandı, yer adları) birbirinden yalnızca
   DERECE ile ayrılıyor, oraya glif uydurmak üç kutuya üç rastgele resim
   dağıtmak olurdu. Ama kutunun BOŞ kalması da bu turun teşhisine aykırı:
   ölçüldü, canlı testte görsel mürekkep panel alanının %0,45'i. Harf, süs
   olmayan ve anlam uydurmayan tek dolgu; ayrıca "A şıkkı" demenin ekrandaki
   karşılığı, yani klavyeyle konuşurken de işe yarıyor. */
export const ANK_HARF = ["A", "B", "C", "D", "E"] as const;
