"use client";

/* KKTC FİYAT PANELİ (07.10.2026) · rakamlar lib/kktcFiyat.ts (kaynak orada).
   Dubai panelinin (DubaiFiyat.tsx) kardeşi: aynı kutu dili (.dfy-), aynı
   sonuç paneli (.ip-out). KKTC'de seçilecek pek bir şey yok, tek yapı var
   (Serbest Liman ve Bölge şirketi); panel o yüzden "ne ödüyorsunuz"u
   gösteriyor:
     · kuruluş ve yıllık faaliyet harcı zorunlu, sabit iki kutu
     · kayıtlı adres ve yasal temsilcilik: aç/kapa (kendi adresinizi beyan
       edebilirsiniz; belge madde 5)
     · muhasebe: aktif mi pasif mi; kuruluş tutarına girmiyor, yanında
       ayrı yazıyor (belge madde 6)
   Düğme kurulum penceresini seçimle açıyor (07.10.2026: pencereye KKTC eklendi). */

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Building2, Calculator, Check, FileBadge, MapPin, Moon, Percent } from "lucide-react";
import SmartLink from "@/components/shared/SmartLink";
import { gtm } from "@/lib/gtm";
import {
  KKTC_KALEMLER,
  KKTC_MUH_AKTIF,
  KKTC_MUH_PASIF,
  KKTC_VARSAYILAN,
  euro,
  kktcSatirlar,
  kktcToplam,
  type KktcSecim,
} from "@/lib/kktcFiyat";
import { kktcBaslaHref } from "@/lib/baslaSecim";
import "@/app/css/dubai-ek.css";

/* Seçim formu ayrı bileşen: kurulum penceresinin ikinci adımı da bunu
   basıyor (components/lab/SatisAkisi.tsx), Dubai'deki DubaiSecimFormu gibi. */
export function KktcSecimFormu({ secim, onSecim }: { secim: KktcSecim; onSecim: (s: KktcSecim) => void }) {
  return (
    <div className="ip-form">
      {/* KAPSAM, SEÇİM DEĞİL (07.10.2026 · 2). Dört kalemin hepsi zorunlu;
          ilk hâlde seçili beyaz kutular olarak basılıyordu ve "seçebilecekmiş
          gibi" duruyordu (Burak). Şimdi düz, tıklanmayan satırlar: ikon, ad,
          tutar. */}
      <div className="ip-field">
        <span className="ip-label">Kuruluş ve ilk yıl · hepsi dahil</span>
        <ul className="dfy-kapsam">
          {KKTC_KALEMLER.map((k, i) => {
            const Icon = KALEM_IKON[i] ?? Check;
            return (
              <li key={k.ad}>
                <span className="dfy-ic" aria-hidden="true">
                  <Icon size={18} strokeWidth={1.9} />
                </span>
                <span className="dfy-ek-m">
                  <span className="dfy-ad">{k.ad}</span>
                  <span className="dfy-alt">{k.alt}</span>
                </span>
                <span className="dfy-tutar">{euro(k.tutar)}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="ip-field">
        <span className="ip-label">Muhasebe · kuruluştan sonra, siz seçiyorsunuz</span>
        <div className="dfy-uc dfy-uc-iki">
          {(
            [
              { k: "aktif", Icon: Calculator, ad: "Aktif şirket", alt: "Banka hesabı açıldığı aydan itibaren", tutar: `${euro(KKTC_MUH_AKTIF)} / ay` },
              { k: "pasif", Icon: Moon, ad: "Pasif şirket", alt: "Hesabı ve faaliyeti olmayan şirket", tutar: `${euro(KKTC_MUH_PASIF)} / yıl` },
            ] as const
          ).map((m) => (
            <button
              key={m.k}
              type="button"
              className="dfy-kutu dfy-bolge"
              data-on={secim.muhasebe === m.k}
              aria-pressed={secim.muhasebe === m.k}
              onClick={() => onSecim({ ...secim, muhasebe: m.k })}
            >
              <span className="dfy-ic" aria-hidden="true">
                <m.Icon size={18} strokeWidth={1.9} />
              </span>
              <span className="dfy-ad">{m.ad}</span>
              <span className="dfy-alt">{m.alt}</span>
              <span className="dfy-tutar">{m.tutar}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const KALEM_IKON = [Building2, FileBadge, MapPin, Percent];

export default function KktcFiyat() {
  const [secim, setSecim] = useState<KktcSecim>(KKTC_VARSAYILAN);
  const satirlar = kktcSatirlar();
  const toplam = kktcToplam();

  return (
    <div className="ip">
      <KktcSecimFormu secim={secim} onSecim={setSecim} />

      <aside className="ip-out">
        <span className="ip-out-k">Kuruluş ve ilk yıl · toplam</span>
        <span className="ip-total">{euro(toplam)}</span>
        <span className="ip-out-u">yaklaşık 30-40 iş günü</span>

        <div className="ip-lines">
          <AnimatePresence initial={false}>
            {satirlar.map((l) => (
              <motion.div
                key={l.ad}
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                className="ip-line"
                data-base={l.baz || undefined}
              >
                <span>{l.ad}</span>
                <span className="ip-line-a">{l.baz ? euro(l.tutar) : `+${euro(l.tutar)}`}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="ip-meta">
          <span>
            Yapı<b>Serbest Liman ve Bölge</b>
          </span>
          <span>
            Muhasebe
            <b>{secim.muhasebe === "aktif" ? `${euro(KKTC_MUH_AKTIF)} / ay` : `${euro(KKTC_MUH_PASIF)} / yıl`}</b>
          </span>
        </div>

        {/* seçim adresle kurulum penceresine gidiyor (lib/baslaSecim.ts) */}
        <SmartLink
          href={kktcBaslaHref(secim)}
          className="btn btn-primary btn-full"
          onClick={() => gtm("country_config_start", { country: "kktc", total: toplam })}
        >
          Bu kurulumla başlayın
          <ArrowRight size={15} strokeWidth={2.1} />
        </SmartLink>

        <ul className="ip-assure">
          <li>
            <Check size={13} strokeWidth={3} />
            Kapsam ve hariç kalemler yazılı
          </li>
          <li>
            <Check size={13} strokeWidth={3} />
            Muhasebe ayrıca faturalanır
          </li>
        </ul>
      </aside>
    </div>
  );
}
