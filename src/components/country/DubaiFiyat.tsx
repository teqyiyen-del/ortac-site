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

import { BOLGE, BOLGELER, DUBAI_BASLANGIC, MUH_AYLIK, MUH_YILLIK, VIP, VIZE, money, type Bolge } from "@/lib/dubaiFiyat";
import "@/app/css/dubai-ek.css";

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

        <div className="ip-field">
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
        </div>

        <div className="ip-field">
          <span className="ip-label">Ek hizmetler</span>
          <div className="dbe-ekler">
            {[
              {
                on: vip,
                set: setVip,
                ad: "Vize hizmeti",
                vip: true,
                alt: "Karşılama, özel araç, Türkçe danışman. Dubai'de yaklaşık 5 iş günü.",
                tutar: `+${money(VIP)}`,
              },
              {
                on: yillik,
                set: setYillik,
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
                onClick={() => ek.set(!ek.on)}
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
