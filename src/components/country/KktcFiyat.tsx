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
   Düğme iletişime gidiyor: kurulum akışı (/basla) şimdilik yalnız Dubai. */

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Building2, Calculator, Check, FileBadge, MapPin, Moon } from "lucide-react";
import SmartLink from "@/components/shared/SmartLink";
import { gtm } from "@/lib/gtm";
import {
  KKTC_ADRES,
  KKTC_HARC,
  KKTC_KURULUS,
  KKTC_MUH_AKTIF,
  KKTC_MUH_PASIF,
  KKTC_VARSAYILAN,
  euro,
  kktcSatirlar,
  kktcToplam,
  type KktcSecim,
} from "@/lib/kktcFiyat";
import "@/app/css/dubai-ek.css";

export default function KktcFiyat() {
  const [secim, setSecim] = useState<KktcSecim>(KKTC_VARSAYILAN);
  const satirlar = kktcSatirlar(secim);
  const toplam = kktcToplam(secim);

  return (
    <div className="ip">
      <div className="ip-form">
        <div className="ip-field">
          <span className="ip-label">Kuruluş · zorunlu</span>
          <div className="dfy-uc dfy-uc-iki">
            <div className="dfy-kutu dfy-bolge" data-on="true">
              <span className="dfy-ic" aria-hidden="true">
                <Building2 size={18} strokeWidth={1.9} />
              </span>
              <span className="dfy-ad">Şirket kuruluşu</span>
              <span className="dfy-alt">Başvuru, onay takibi ve tescil</span>
              <span className="dfy-tutar">{euro(KKTC_KURULUS)}</span>
            </div>
            <div className="dfy-kutu dfy-bolge" data-on="true">
              <span className="dfy-ic" aria-hidden="true">
                <FileBadge size={18} strokeWidth={1.9} />
              </span>
              <span className="dfy-ad">Faaliyet harcı</span>
              <span className="dfy-alt">Serbest Bölge izni, yıllık</span>
              <span className="dfy-tutar">{euro(KKTC_HARC)}</span>
            </div>
          </div>
        </div>

        <div className="ip-field">
          <span className="ip-label">Adres</span>
          <div className="dfy-ekler">
            <button
              type="button"
              role="checkbox"
              aria-checked={secim.adres}
              className="dfy-kutu dfy-ek"
              data-on={secim.adres}
              onClick={() => setSecim({ ...secim, adres: !secim.adres })}
            >
              <span className="dfy-ic" aria-hidden="true">
                <MapPin size={18} strokeWidth={1.9} />
              </span>
              <span className="dfy-ek-m">
                <span className="dfy-ad">Kayıtlı adres ve yasal temsilcilik</span>
                <span className="dfy-alt">Yıllık. Kendi adresinizi beyan ederseniz gerekmez.</span>
              </span>
              <span className="dfy-tutar">+{euro(KKTC_ADRES)}</span>
              <span className="dfy-tik" aria-hidden="true">
                <Check size={14} strokeWidth={3} />
              </span>
            </button>
          </div>
        </div>

        <div className="ip-field">
          <span className="ip-label">Muhasebe · kuruluştan sonra</span>
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
                onClick={() => setSecim({ ...secim, muhasebe: m.k })}
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

      <aside className="ip-out">
        <span className="ip-out-k">Kuruluş ve ilk yıl tutarı</span>
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

        <SmartLink
          href="/iletisim"
          className="btn btn-primary btn-full"
          onClick={() => gtm("country_config_start", { country: "kktc", total: toplam })}
        >
          İletişime geçin
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
