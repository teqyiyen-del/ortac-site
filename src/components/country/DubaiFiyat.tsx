"use client";

/* DUBAİ FİYAT · BAZ FİYAT + EKLER (06.10.2026, toplantı sırasında).
   Burak: "mantık ne paket ile ilerleyecek ne tek fiyat ile. Baz bir fiyat
   olacak ve üstüne ekleyecekleri her şeye göre fiyat değişecek; biz de her
   yere '…'den başlayan fiyatlar' yazacağız."
     · serbest bölgeye göre baz fiyat (üç bölge: IFZA, Meydan, DWTC)
     · baz fiyatın içinde 1 yıllık serbest bölge lisansı; 2 ya da 3 yıl seçilirse artar
     · vize: kişi başı 1.953 $ × kişi sayısı
     · VIP vize hizmeti: tek, 800 $
     · muhasebe: aylık zorunlu (200 $); yıllık alınırsa 10 ay fiyatına (2.000 $)

   RAKAMLARIN KAYNAĞI. Müşterinin teklif ekranından (ekran görüntüsü):
   IFZA kuruluş 1 yıl 5.120 $ · vize 1.953 $ · VIP vize 800 $. Muhasebe
   200 / 2.000 $ Burak'ın sözü ("gibi düşünebilirsin").
   SWAP · TEYİT BEKLEYEN: Meydan ve DWTC baz fiyatı ile 2. ve 3. yılın
   lisans farkı ELİMİZDE YOK; aşağıdaki değerler gösterim için yer tutucu,
   müşteriden gelince değişecek (docs/durum.md).

   Görünüm eski panelin (CountryPricing · .ip-) aynısı; fiyat dosyasına
   (lib/pricing.ts) dokunulmadı, öteki iki ülke eski paneli kullanıyor. */

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import SmartLink from "@/components/shared/SmartLink";
import { gtm } from "@/lib/gtm";

const money = (n: number) => `$${n.toLocaleString("tr-TR")}`;

type Bolge = "ifza" | "meydan" | "dwtc";
const BOLGE: Record<Bolge, { ad: string; baz: number; yilEk: number; teyit?: boolean }> = {
  ifza: { ad: "IFZA", baz: 5120, yilEk: 4200 },
  /* SWAP · iki bölgenin rakamı yer tutucu */
  meydan: { ad: "Meydan", baz: 5400, yilEk: 4400, teyit: true },
  dwtc: { ad: "DWTC", baz: 6900, yilEk: 5600, teyit: true },
};
const BOLGELER: Bolge[] = ["ifza", "meydan", "dwtc"];
const VIZE = 1953;
const VIP = 800;
const MUH_AYLIK = 200;
const MUH_YILLIK = 2000;
/** sitenin her yerinde yazılacak "…'den başlayan" rakam: en düşük baz */
export const DUBAI_BASLANGIC = Math.min(...BOLGELER.map((b) => BOLGE[b].baz));

export default function DubaiFiyat() {
  const [bolge, setBolge] = useState<Bolge>("ifza");
  const [yil, setYil] = useState(1);
  const [vize, setVize] = useState(0);
  const [vip, setVip] = useState(false);
  const [yillik, setYillik] = useState(false);

  const b = BOLGE[bolge];
  const satirlar: { ad: string; tutar: number; baz?: boolean }[] = [
    { ad: `${b.ad} kuruluş · 1 yıllık lisans`, tutar: b.baz, baz: true },
    ...(yil > 1 ? [{ ad: `Lisans · ${yil - 1} ek yıl`, tutar: (yil - 1) * b.yilEk }] : []),
    ...(vize > 0 ? [{ ad: `Vize · ${vize} kişi`, tutar: vize * VIZE }] : []),
    ...(vip ? [{ ad: "VIP vize hizmeti", tutar: VIP }] : []),
    ...(yillik ? [{ ad: "Muhasebe · yıllık (10 ay fiyatına)", tutar: MUH_YILLIK }] : []),
  ];
  const toplam = satirlar.reduce((a, s) => a + s.tutar, 0);

  return (
    <div className="ip">
      <div className="ip-form">
        <div className="ip-field">
          <span className="ip-label">Serbest bölge</span>
          <div className="ip-tiers">
            {BOLGELER.map((k) => (
              <button
                key={k}
                type="button"
                className="ip-tier"
                data-on={bolge === k}
                aria-pressed={bolge === k}
                onClick={() => {
                  setBolge(k);
                  gtm("dubai_bolge", { bolge: k });
                }}
              >
                <span className="ip-tier-n">{BOLGE[k].ad}</span>
                <span className="ip-tier-i">Kuruluş + 1 yıl lisans</span>
                <span className="ip-tier-p">{money(BOLGE[k].baz)}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="ip-field">
          <span className="ip-label">Lisans süresi</span>
          <div className="ip-chips">
            {[1, 2, 3].map((y) => (
              <button
                key={y}
                type="button"
                className="ip-chip"
                data-on={yil === y}
                aria-pressed={yil === y}
                onClick={() => setYil(y)}
              >
                {y} yıl{y === 1 ? " · baz fiyata dahil" : ""}
              </button>
            ))}
          </div>
        </div>

        <div className="ip-field ip-field-row">
          <div className="ip-mini">
            <span className="ip-label">Vize (kişi)</span>
            <div className="ip-step">
              <button type="button" aria-label="Azalt" disabled={vize <= 0} onClick={() => setVize(vize - 1)}>
                −
              </button>
              <span>{vize}</span>
              <button type="button" aria-label="Artır" disabled={vize >= 10} onClick={() => setVize(vize + 1)}>
                +
              </button>
            </div>
            <span className="ip-inc">kişi başı {money(VIZE)}</span>
          </div>

          <div className="ip-switches">
            {[
              { on: vip, set: setVip, label: "VIP vize hizmeti", ek: `+${money(VIP)}` },
              { on: yillik, set: setYillik, label: "Muhasebeyi yıllık al", ek: "10 ay fiyatına" },
            ].map((sw) => (
              <button
                key={sw.label}
                type="button"
                role="switch"
                aria-checked={sw.on}
                className="ip-toggle"
                data-on={sw.on}
                onClick={() => sw.set(!sw.on)}
              >
                <span className="ip-track" aria-hidden="true">
                  <span />
                </span>
                <span className="ip-toggle-t">
                  {sw.label}
                  <b>{sw.ek}</b>
                </span>
              </button>
            ))}
          </div>
        </div>
        <p className="ip-hint">
          Muhasebe zorunlu: aylık {money(MUH_AYLIK)}. Yıllık alırsanız {money(MUH_YILLIK)} (10 ay fiyatına).
        </p>
      </div>

      <aside className="ip-out">
        <span className="ip-out-k">Tahmini kurulum tutarı</span>
        <span className="ip-total">{money(toplam)}</span>
        <span className="ip-out-u">
          tek seferlik · {money(DUBAI_BASLANGIC)}&apos;den başlayan fiyatlarla
        </span>

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
                <span className="ip-line-a">{l.baz ? money(l.tutar) : `+${money(l.tutar)}`}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="ip-meta">
          <span>
            Yapı<b>Serbest bölge · {b.ad}</b>
          </span>
          <span>
            Muhasebe<b>{yillik ? `${money(MUH_YILLIK)} / yıl` : `${money(MUH_AYLIK)} / ay`}</b>
          </span>
        </div>

        <SmartLink
          href="/basla?ulke=dubai"
          className="btn btn-primary btn-full"
          onClick={() => gtm("country_config_start", { country: "dubai", bolge, total: toplam })}
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
            Sürpriz kalem çıkmaz
          </li>
        </ul>
        <p className="ip-note">Tutarlar temsilidir; nihai teklif faaliyet ve belgelere göre netleşir.</p>
      </aside>
    </div>
  );
}
