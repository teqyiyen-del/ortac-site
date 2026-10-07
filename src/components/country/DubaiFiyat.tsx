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
import {
  ArrowRight,
  Building2,
  Calculator,
  CalendarDays,
  Check,
  Cpu,
  Crown,
  IdCard,
  Info,
  Minus,
  Plus,
  Zap,
  type LucideIcon,
} from "lucide-react";
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
  dubaiBaslaHref,
  dubaiSatirlar,
  dubaiToplam,
  money,
  type Bolge,
  type DubaiSecim,
} from "@/lib/dubaiFiyat";
import "@/app/css/dubai-ek.css";

/* SEÇİM FORMU · panelin sol yarısı. Ayrı bileşen, çünkü kurulum akışının
   ikinci adımı da BUNU basıyor (components/lab/SatisAkisi.tsx · Burak:
   "paket yok … Dubai şirket kısmında bir fiyatlar yaptık ya, oraya benzer
   bir şey koyman lazım, ya da orayı koyman lazım direkt"). Durum dışarıda;
   koyu ve açık zeminde aynı işaretleme (renkler CSS'te).

   07.10.2026 · FORM TEK KUTU DİLİNE GEÇTİ (.dfy-, css/dubai-ek.css). Burak:
   "lisans süresi ve vize kısmı çok küçük ve bağımsız duruyor, onları da
   kalan box mantığına çevir; yuvarlak değil dikdörtgenimsi. Bölgelerin
   yanına ikon. '1 yıl'ın yanına 'baz fiyata dahil' yazmaya gerek yok.
   Vizenin altındaki kişi başı fiyata gerek yok. Bölgelerin, VIP'in ve
   muhasebenin sağ üstüne bir 'i' düğmesi: basınca ufak bir detay açılsın,
   'detaylı gör' diye gidebilsin."
   Her seçenek aynı kutu: ikon, ad, (varsa) tutar. "i" düğmesi kutunun
   İÇİNDE DEĞİL yanında duruyor (düğme içinde düğme olmaz); üstüne gelince
   ya da basınca balon açılıyor, balondaki bağlantı ilgili bölüme götürüyor. */
function Bilgi({ ad, metin, href }: { ad: string; metin: string; href: string }) {
  const [acik, setAcik] = useState(false);
  return (
    <span className="dfy-i" data-acik={acik || undefined} onMouseLeave={() => setAcik(false)}>
      <button
        type="button"
        className="dfy-i-b"
        aria-label={`${ad} hakkında bilgi`}
        aria-expanded={acik}
        onClick={() => setAcik((v) => !v)}
        onBlur={(e) => {
          if (!e.currentTarget.parentElement?.contains(e.relatedTarget)) setAcik(false);
        }}
      >
        <Info size={15} strokeWidth={2.2} aria-hidden="true" />
      </button>
      <span className="dfy-balon" role="note">
        {metin}
        <SmartLink href={href} className="dfy-balon-a">
          Detaylı gör
          <ArrowRight size={14} strokeWidth={2.2} aria-hidden="true" />
        </SmartLink>
      </span>
    </span>
  );
}

const BOLGE_IKON: Record<Bolge, LucideIcon> = { ifza: Cpu, meydan: Zap, dwtc: Building2 };

export function DubaiSecimFormu({
  secim,
  onSecim,
}: {
  secim: DubaiSecim;
  onSecim: (s: DubaiSecim) => void;
}) {
  const { bolge, yil, vize, vip, yillik } = secim;
  const set = (p: Partial<DubaiSecim>) => onSecim({ ...secim, ...p });
  const ekler = [
    {
      on: vip,
      degis: () => set({ vip: !vip }),
      Icon: Crown,
      ad: "Vize hizmeti",
      vip: true,
      /* 07.10.2026 · Murat Bey: "VIP'de altında tam şöyle yaz" */
      alt: "Dubai'de kalma süresi 5 iş günü.",
      tutar: `+${money(VIP)}`,
      bilgi: "Havalimanında karşılama, özel araç ve Türkçe danışman. Randevular siz gelmeden kurulur.",
      href: "/dubai#vip",
    },
    {
      on: yillik,
      degis: () => set({ yillik: !yillik }),
      Icon: Calculator,
      ad: "Muhasebeyi yıllık alın",
      vip: false,
      /* Burak: "yıllıkta 10 ay fiyatına yapıyoruz; oraya yüzde şu kadar
         indirim diye bilgi gir." 2 / 12 = %16,7 → %17. */
      alt: `12 ay hizmet, 10 ay fiyatına · %${Math.round((1 - MUH_YILLIK / (MUH_AYLIK * 12)) * 100)} indirim`,
      tutar: `+${money(MUH_YILLIK)}`,
      bilgi: `Muhasebe her şirket için zorunlu. Yıllık almazsanız aylık ${money(MUH_AYLIK)} ödenir.`,
      href: "/dubai/muhasebe",
    },
  ];
  return (
    <div className="ip-form">
      <div className="ip-field">
        <span className="ip-label">Serbest bölge</span>
        <div className="dfy-uc">
          {BOLGELER.map((k) => {
            const Icon = BOLGE_IKON[k];
            return (
              <div key={k} className="dfy-sar">
                <button
                  type="button"
                  className="dfy-kutu dfy-bolge"
                  data-on={bolge === k}
                  aria-pressed={bolge === k}
                  onClick={() => {
                    set({ bolge: k });
                    gtm("dubai_bolge", { bolge: k });
                  }}
                >
                  <span className="dfy-ic" aria-hidden="true">
                    <Icon size={18} strokeWidth={1.9} />
                  </span>
                  <span className="dfy-ad">{BOLGE[k].ad}</span>
                  <span className="dfy-alt">Kuruluş + 1 yıl lisans</span>
                  <span className="dfy-tutar">{money(BOLGE[k].baz)}</span>
                </button>
                <Bilgi ad={BOLGE[k].ad} metin={BOLGE[k].kisa} href="/dubai#serbest-bolgeler" />
              </div>
            );
          })}
        </div>
      </div>

      <div className="dfy-iki">
        <div className="ip-field">
          <span className="ip-label">Lisans süresi</span>
          <div className="dfy-uc dfy-uc-dar">
            {[1, 2, 3].map((y) => (
              <button
                key={y}
                type="button"
                className="dfy-kutu dfy-yil"
                data-on={yil === y}
                aria-pressed={yil === y}
                onClick={() => set({ yil: y })}
              >
                <span className="dfy-ic" aria-hidden="true">
                  <CalendarDays size={18} strokeWidth={1.9} />
                </span>
                <span className="dfy-ad">{y} yıl</span>
              </button>
            ))}
          </div>
        </div>

        <div className="ip-field">
          <span className="ip-label">Vize</span>
          <div className="dfy-kutu dfy-vize" data-on={vize > 0}>
            <span className="dfy-ic" aria-hidden="true">
              <IdCard size={18} strokeWidth={1.9} />
            </span>
            <span className="dfy-ad">{vize === 0 ? "Vize yok" : `${vize} kişi`}</span>
            <span className="dfy-adim">
              <button type="button" aria-label="Vize sayısını azalt" disabled={vize <= 0} onClick={() => set({ vize: vize - 1 })}>
                <Minus size={16} strokeWidth={2.2} aria-hidden="true" />
              </button>
              <button type="button" aria-label="Vize sayısını artır" disabled={vize >= 10} onClick={() => set({ vize: vize + 1 })}>
                <Plus size={16} strokeWidth={2.2} aria-hidden="true" />
              </button>
            </span>
          </div>
        </div>
      </div>

      <div className="ip-field">
        <span className="ip-label">Ek hizmetler</span>
        <div className="dfy-ekler">
          {ekler.map((ek) => (
            <div key={ek.ad} className="dfy-sar">
              <button
                type="button"
                role="checkbox"
                aria-checked={ek.on}
                className="dfy-kutu dfy-ek"
                data-on={ek.on}
                data-vip={ek.vip || undefined}
                onClick={ek.degis}
              >
                <span className="dfy-ic" aria-hidden="true">
                  <ek.Icon size={18} strokeWidth={1.9} />
                </span>
                <span className="dfy-ek-m">
                  <span className="dfy-ad">
                    {ek.vip && <span className="dbe-ek-vip">VIP</span>}
                    {ek.ad}
                  </span>
                  <span className="dfy-alt">{ek.alt}</span>
                </span>
                <span className="dfy-tutar">{ek.tutar}</span>
                <span className="dfy-tik" aria-hidden="true">
                  <Check size={14} strokeWidth={3} />
                </span>
              </button>
              <Bilgi ad={ek.ad} metin={ek.bilgi} href={ek.href} />
            </div>
          ))}
        </div>
      </div>
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
