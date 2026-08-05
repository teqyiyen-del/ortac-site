import {
  CalendarCheck,
  FileStack,
  MapPin,
  Stamp,
  type LucideIcon,
} from "lucide-react";

import type { AccIcon } from "@/lib/accountingDubai";

/* "Bu işi kim yürütüyor?" adaylarının ortak ikon tablosu.
 *
 * Neden ayrı dosya: /dubai/muhasebe sayfasındaki ICON tablosu o dosyanın
 * içinde `const` olarak duruyor ve dışa açılmıyor. Üç aday da aynı dört
 * maddeyi basıyor; tabloyu üç kez yazmak, dördüncü bir madde eklendiğinde
 * üç yerde birden hata çıkarırdı.
 *
 * Tablo yalnızca ortac.facts'in kullandığı dört anahtarı taşıyor, dokuzunu
 * değil: burada kullanılmayan bir ikonu içeri almak, adaylardan biri
 * silindiğinde ölü bağımlılık bırakırdı.
 *
 * TABLO, YARDIMCI FONKSİYON DEĞİL. Önce `kimIcon(f.icon)` diye bir sarmalayıcı
 * yazılmıştı ve react-hooks/static-components onu haklı olarak reddetti:
 * render sırasında ÇAĞRILAN bir fonksiyonun bileşen döndürmesi, dönen şeyin
 * her render'da yeni bir tip sayılmasına ve durumun sıfırlanmasına yol
 * açabiliyor. Düz tablo okuması (`KIM_ICON[k] ?? KIM_ICON_FALLBACK`) çağrı
 * değil, o yüzden aynı riski taşımıyor. */
export const KIM_ICON: Partial<Record<AccIcon, LucideIcon>> = {
  stamp: Stamp,
  calendar: CalendarCheck,
  files: FileStack,
  pin: MapPin,
};

/** Veri dosyasına tabloda olmayan bir ikon adı girerse boşluk kalmasın. */
export const KIM_ICON_FALLBACK: LucideIcon = Stamp;
