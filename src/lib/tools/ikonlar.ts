import {
  Hash,
  Percent,
  Receipt,
  SearchCheck,
  SlidersHorizontal,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { ToolId } from "@/lib/tools/catalog";

/* ============================================================================
   ARAÇ İKONLARI — TEK KAYNAK

   18.09.2026 · Eşleme Nav.tsx'te yazılıydı ve /araclar dizini ikonsuzdu.
   Dizin de ikon basmaya başlayınca eşleme iki dosyada iki kopya olacaktı; bir
   araç eklendiğinde birinin unutulması kesin gibiydi. Kayıt defteri (catalog)
   veriyi tutuyor, bu dosya da onun görsel karşılığını.

   NEDEN DEFTERİN İÇİNDE DEĞİL: catalog.ts saf veri, hiçbir React bağımlılığı
   yok ve sunucu tarafında da okunuyor. lucide bir bileşen kitaplığı; onu
   deftere sokmak veriyi arayüze bağlardı.
   ========================================================================= */
export const TOOL_ICON: Record<ToolId, LucideIcon> = {
  "kurumlar-vergisi-dubai": Percent,
  "kurumlar-vergisi-ingiltere": Percent,
  "bae-kdv": Receipt,
  "uygunluk-testi": SlidersHorizontal,
  "isim-ureteci": Sparkles,
  "ingiltere-isim-sorgulama": SearchCheck,
  "ingiltere-sic-kodu": Hash,
};
