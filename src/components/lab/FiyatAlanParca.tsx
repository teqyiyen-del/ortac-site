"use client";

import { Check } from "lucide-react";
import { Flag } from "@/components/shared/CountryPicker";
import { NEEDS, type NeedKey } from "@/components/lab/fiyatKart";
import type { CountrySlug } from "@/lib/brand";

/* ============================================================================
   LAB · MAVİ BÖLÜM TURU — ÜÇ ADAYIN ORTAK PARÇALARI

   Bu turda değişen şey BÖLÜM ZEMİNİ ve İÇERİK SEÇİMİ. Kontrol yüzeyi (çip
   satırı) ve bayrak kabı üçünde de birebir aynı tutuldu ki kıyas zemini ve
   içeriği karşılaştırsın, çipin biçimini değil.

   VERİ NEREDEN GELİYOR
   Rakamların hiçbiri burada yazılı değil:
     · başlangıç tutarı → src/lib/brand.ts · FACTS[c].from / fromLabel
     · ek kalemler      → src/lib/pricing.ts · PRICING[c] (fiyatKart.ts üzerinden)
   src/lib/pricing.ts'e DOKUNULMADI, yalnızca okundu.

   METİN SABİTLERİ (NEEDS, SCOPE, LINE_NOTE) geçen turdan kalan
   src/components/lab/fiyatKart.ts'ten okunuyor, YENİDEN KOPYALANMADI. O dosya
   da canlı PriceSummary.tsx'ten aynalanmıştı; ikinci bir kopya çıkarmak aynı
   cümlenin üç yerde eskimesi demekti.
   ========================================================================= */

/* ---------------------------------------------------------------- çip satırı
   ÜÇ ADAYIN ÜÇÜNDE DE AYNI ÇİP, AMA DURUM TEK.
   Çipler her adayın KENDİ bölümünün içinde duruyor çünkü bu turda
   değerlendirilen şey bölümün bütün kompozisyonu; kontrolü dışarı almak üç
   adayı da eksik gösterirdi. Durum ise tek bir yerde (FiyatAlanLab), yani bir
   adayda basılan çip üçünü birden çeviriyor: müşteri aynı kalemi üç kez
   açmak zorunda kalmıyor ve üç tasarımın aynı duruma nasıl tepki verdiğini
   aynı anda görüyor.

   ERİŞİLEBİLİRLİK — AYNI ADLI ÜÇ DÜĞME SORUNU
   Aynı sayfada "Banka hesabı" adlı üç düğme var ve üçü aynı durumu taşıyor.
   Ekran okuyucuda hangisinin nerede olduğu ayırt edilebilsin diye her satır
   role="group" + aria-label taşıyor; etiket adayın adını içeriyor.
   AGENTS.md · G: görsel olarak gizli <span> erişilebilirlik ağacına
   çıkmayabiliyor (üç kez oldu), o yüzden ad sr-only metinle değil aria-label
   ile veriliyor. */
export function AfCips({
  aday,
  on,
  toggle,
}: {
  aday: string;
  on: Record<NeedKey, boolean>;
  toggle: (k: NeedKey) => void;
}) {
  return (
    <div className="afx-cips-satir" role="group" aria-label={`Kuruluşa ek olarak · ${aday}`}>
      <span className="afx-cips-q">Kuruluşa ek olarak:</span>
      <div className="afx-cips">
        {NEEDS.map((n) => {
          const Icon = on[n.key] ? Check : n.icon;
          return (
            <button
              key={n.key}
              type="button"
              className="afx-cip"
              data-on={on[n.key]}
              aria-pressed={on[n.key]}
              onClick={() => toggle(n.key)}
            >
              <Icon size={16} strokeWidth={2.2} />
              {n.chip}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------- bayrak
   AGENTS.md · H: shared/CountryPicker'ın Flag'i çıplak <svg viewBox="0 0 60 40">
   basıyor, width/height YOK → sınırlanmazsa 300x150'ye şişiyor ve iki sayfayı
   bozdu. Kap sabit px + overflow:hidden (.afx-bayrak). */
export function AfBayrak({ c }: { c: CountrySlug }) {
  return (
    <span className="afx-bayrak" aria-hidden="true">
      <Flag country={c} />
    </span>
  );
}
