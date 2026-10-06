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

   RAKAMLAR lib/dubaiFiyat.ts'te (kaynakları ve hangisinin teyit beklediği
   orada yazılı).

   EKLER ANAHTAR DEĞİL, KART (aynı gün, ikinci tur). Burak: "VIP hizmet ile
   muhasebeyi yıllık al kısımlarını daha belirgin yap, böyle switch butonu
   gibi değil." İki büyük onay kartı (.dbe-ek · css/dubai-ek.css).

   Görünüm eski panelin (CountryPricing · .ip-) aynısı; fiyat dosyasına
   (lib/pricing.ts) dokunulmadı, öteki iki ülke eski paneli kullanıyor. */

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import SmartLink from "@/components/shared/SmartLink";
import { gtm } from "@/lib/gtm";
import {
  BOLGE,
  BOLGELER,
  DUBAI_BASLANGIC,
  DUBAI_VARSAYILAN,
  MUH_AYLIK,
  MUH_YILLIK,
  VIP,
  VIZE,
  dubaiBaslaHref,
  dubaiSatirlar,
  dubaiToplam,
  money,
  type DubaiSecim,
} from "@/lib/dubaiFiyat";
import "@/app/css/dubai-ek.css";

/* SEÇİM FORMU · panelin sol yarısı. Ayrı bileşen, çünkü kurulum akışının
   ikinci adımı da BUNU basıyor (components/lab/SatisAkisi.tsx · Burak:
   "paket yok … Dubai şirket kısmında bir fiyatlar yaptık ya, oraya benzer
   bir şey koyman lazım, ya da orayı koyman lazım direkt"). Durum dışarıda;
   koyu ve açık zeminde aynı işaretleme (renkler CSS'te). */
export function DubaiSecimFormu({
  secim,
  onSecim,
}: {
  secim: DubaiSecim;
  onSecim: (s: DubaiSecim) => void;
}) {
  const { bolge, yil, vize, vip, yillik } = secim;
  const set = (p: Partial<DubaiSecim>) => onSecim({ ...secim, ...p });
  return (
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
                set({ bolge: k });
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
              onClick={() => set({ yil: y })}
            >
              {y} yıl{y === 1 ? " · baz fiyata dahil" : ""}
            </button>
          ))}
        </div>
      </div>

      <div className="ip-field">
        <div className="ip-mini">
          <span className="ip-label">Vize (kişi)</span>
          <div className="ip-step">
            <button type="button" aria-label="Azalt" disabled={vize <= 0} onClick={() => set({ vize: vize - 1 })}>
              −
            </button>
            <span>{vize}</span>
            <button type="button" aria-label="Artır" disabled={vize >= 10} onClick={() => set({ vize: vize + 1 })}>
              +
            </button>
          </div>
          <span className="ip-inc">kişi başı {money(VIZE)}</span>
        </div>
      </div>

      <div className="ip-field">
        <span className="ip-label">Ek hizmetler</span>
        <div className="dbe-ekler">
          {[
            {
              on: vip,
              degis: () => set({ vip: !vip }),
              ad: "Vize hizmeti",
              vip: true,
              alt: "Karşılama, özel araç, Türkçe danışman. Dubai'de yaklaşık 5 iş günü.",
              tutar: `+${money(VIP)}`,
            },
            {
              on: yillik,
              degis: () => set({ yillik: !yillik }),
              ad: "Muhasebeyi yıllık alın",
              vip: false,
              alt: `12 ay hizmet, 10 ay fiyatına. Aylık ödemede ${money(MUH_AYLIK)}.`,
              tutar: `+${money(MUH_YILLIK)}`,
            },
          ].map((ek) => (
            <button
              key={ek.ad}
              type="button"
              role="checkbox"
              aria-checked={ek.on}
              className="dbe-ek"
              data-on={ek.on}
              data-vip={ek.vip || undefined}
              onClick={ek.degis}
            >
              <span className="dbe-ek-kutu" aria-hidden="true">
                <Check size={16} strokeWidth={3} />
              </span>
              <span>
                <span className="dbe-ek-ad">
                  {ek.vip && <span className="dbe-ek-vip">VIP</span>}
                  {ek.ad}
                </span>
                <span className="dbe-ek-alt">{ek.alt}</span>
              </span>
              <span className="dbe-ek-tutar">{ek.tutar}</span>
            </button>
          ))}
        </div>
      </div>
      <p className="dbe-ipucu">Muhasebe her şirket için zorunlu; yıllık almazsanız aylık ödenir.</p>
    </div>
  );
}

export default function DubaiFiyat() {
  const [secim, setSecim] = useState<DubaiSecim>(DUBAI_VARSAYILAN);
  const satirlar = dubaiSatirlar(secim);
  const toplam = dubaiToplam(secim);
  const b = BOLGE[secim.bolge];

  return (
    <div className="ip">
      <DubaiSecimFormu secim={secim} onSecim={setSecim} />

      <aside className="ip-out">
        <span className="ip-out-k">Tahmini kurulum tutarı</span>
        <span className="ip-total">{money(toplam)}</span>
        <span className="ip-out-u">
          KDV hariç · {money(DUBAI_BASLANGIC)}&apos;den başlayan fiyatlarla
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
            Muhasebe<b>{secim.yillik ? `${money(MUH_YILLIK)} / yıl` : `${money(MUH_AYLIK)} / ay`}</b>
          </span>
        </div>

        {/* seçim adresle akışa gidiyor: /basla ikinci adımdan, seçili açılıyor */}
        <SmartLink
          href={dubaiBaslaHref(secim)}
          className="btn btn-primary btn-full"
          onClick={() => gtm("country_config_start", { country: "dubai", bolge: secim.bolge, total: toplam })}
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
