"use client";

/* ============================================================================
   SATIŞ AKIŞI · DEMO — /lab/satis-akisi

   Müşterinin sesli brifi (13.09.2026, tamamı docs/durum.md'de):
     "önce ülke seçecek, sonra … şimdi Dubai üzerinden sadece şu an onu
      yapalım. Dubai'yi seçtikten sonra kaç tane vize istiyor, hangi paketi
      istiyor falan … bizim normal fiyatlar kısmındaki gibi düşün, sonrasında
      … kişisel bilgileri doldurma kısmı gelecek … bir sonraki aşamada teklifi
      görecek. Sonra onu onaylarlarsa [ödeme] tarafına geçecek."

   İKİ GİRİŞ, TEK PENCERE. Her yerdeki "Kurulumu Başlat" pencereyi BOŞ açıyor;
   fiyatlardaki "Hemen başla" AYNI pencereyi seçimler DOLU açıyor ve kullanıcı
   yalnızca kontrol edip devam ediyor. İki ayrı akış yazılmadı: fark yalnızca
   pencereye verilen başlangıç değeri (`onceden`).

   ------------------------------------------------------------ NEDEN <dialog>
   Pencere yerleşik <dialog> + showModal(). Odak tuzağı, Esc ile kapanma, arka
   planın erişilemez olması ve üst katman (z-index yarışı yok) tarayıcıdan
   geliyor; bir modal kütüphanesi ya da elle yazılmış odak döngüsü eklenmedi.
   Sitenin kaydırması Lenis — pencerenin kaydırılan gövdesinde
   `data-lenis-prevent` var, yoksa tekerlek olayını Lenis yutup sayfayı
   kaydırırdı.

   ------------------------------------------------------------ VERİ VE UYDURMA
   Fiyatların TAMAMI lib/pricing.ts · configure()'dan — ülke sayfasındaki fiyat
   bölümünün (CountryPricing.tsx) kullandığı fonksiyonun ta kendisi. Dosyaya
   dokunulmadı. O dosyanın kendi kaydı "SWAP:PRICING — every number is a
   placeholder; must ship with the 'temsili' disclaimer" diyor; teklifin
   altındaki ibare bu yüzden var ve SİLİNEMEZ.

   Veride KARŞILIĞI OLMAYAN üç şey uydurulmadı, ekranda SWAP olarak duruyor:
     · teklifin geçerlilik süresi
     · havale için banka hesabı bilgileri
     · kişi bilgisi alanlarının kesin listesi (müşteri "neler alacağımızı
       teyit ederiz" dedi; ad · soyad · e-posta · telefon demo için)

   ------------------------------------------------------------ DEMO SINIRI
   Ödeme adımı HİÇBİR YERE BAĞLI DEĞİL: Stripe çağrısı yok, sunucu rotası yok,
   hiçbir bilgi bir yere gönderilmiyor. Ekrandaki her girdi tarayıcının
   belleğinde ve pencere kapanınca siliniyor.

   PDF: "PDF olarak kaydet" tarayıcının yazdırma penceresini açıyor ve yazdırma
   CSS'i yalnız teklif belgesini basıyor (lab-satis.css · @media print). Demo
   için yeni bir bağımlılık eklenmedi. Gerçek akışta PDF sunucuda üretilmeli,
   çünkü aynı dosya müşteriye e-postayla da gidecek.
   ========================================================================= */

import { useEffect, useMemo, useRef, useState } from "react";
import { animate, useMotionValue } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  Building2,
  Check,
  CreditCard,
  FileText,
  Globe2,
  Landmark,
  Minus,
  Package,
  Plus,
  Printer,
  ShieldCheck,
  UserRound,
  X,
  type LucideIcon,
} from "lucide-react";
import { Flag } from "@/components/shared/CountryPicker";
import {
  configure,
  PRICING,
  TIER_INCLUDES,
  TIER_META,
  TIER_PRICE,
} from "@/lib/pricing";
import {
  ACTIVITY_LABELS,
  COUNTRY_LABELS,
  type Activity,
  type Country,
  type Tier,
} from "@/lib/store";

/* ------------------------------------------------------------------ TİPLER */

export type Onceden = {
  ulke: Country;
  tier: Tier;
  activity: Activity;
  visas: number;
  bank: boolean;
  accounting: boolean;
};

type Kisi = { ad: string; soyad: string; eposta: string; telefon: string };

const ADIMLAR: { ad: string; icon: LucideIcon }[] = [
  { ad: "Ülke", icon: Globe2 },
  { ad: "Paket", icon: Package },
  { ad: "Bilgiler", icon: UserRound },
  { ad: "Teklif", icon: FileText },
  { ad: "Ödeme", icon: CreditCard },
];

const ULKELER: Country[] = ["dubai", "ingiltere", "kktc"];
/* Müşteri: "şimdi Dubai üzerinden sadece şu an onu yapalım." Öteki iki ülke
   görünüyor ama seçilemiyor; akışın üç ülkeli olacağı ilk adımda belli. */
const ACIK: Country = "dubai";

const TIERS: Tier[] = ["basic", "gold", "platinium"];
const ACTIVITIES: Activity[] = [
  "e-ticaret",
  "yazilim",
  "danismanlik",
  "gayrimenkul",
  "saglik",
  "finans",
];
const VIZE_EN_COK = 10;

/* Sitenin fiyat bölümüyle aynı biçim (CountryPricing.tsx · money). */
const money = (n: number) => `$${n.toLocaleString("tr-TR")}`;

/* Mevcut site cümlesi (home/PriceSummary.tsx · fy2-note), yeniden yazılmadı. */
const TEMSILI =
  "Tutarlar tahminîdir. Nihai teklif faaliyet, yapı ve belgelere göre netleşir; resmî harçlar ile üçüncü taraf ücretleri değişebilir.";

/* Teklif numarası: girdiden türeyen kısa bir özet. Math.random yok — aynı kişi
   aynı seçimle aynı numarayı görür, sayfa yenilense de değişmez. Gerçek akışta
   numarayı sunucu verecek (tekillik orada garanti edilir). */
function ozet(metin: string) {
  let h = 5381;
  for (let i = 0; i < metin.length; i++) h = ((h << 5) + h + metin.charCodeAt(i)) >>> 0;
  return h.toString(36).toUpperCase().padStart(6, "0").slice(-6);
}

/* ----------------------------------------------------------- SAYAN TUTAR
   Ülke sayfasının fiyat bölümüyle aynı kalıp (CountryPricing.tsx · Amount):
   motion'ın animate'i, useReducedMotion YOK (tuzak A). */
function Tutar({ deger, className }: { deger: number; className?: string }) {
  const mv = useMotionValue(deger);
  const [metin, setMetin] = useState(money(deger));
  useEffect(() => {
    const c = animate(mv, deger, {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setMetin(money(Math.round(v / 50) * 50)),
    });
    return () => c.stop();
  }, [deger, mv]);
  return <span className={className}>{metin}</span>;
}

/* ================================================================ PENCERE */

export function SatisPenceresi({
  acik,
  onceden,
  onKapat,
}: {
  acik: boolean;
  onceden: Onceden | null;
  onKapat: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  /* Başlangıç değerleri: fiyatlardan geliyorsa DOLU, değilse BOŞ. Pencere her
     açılışta YENİ bir `key` ile kuruluyor (SatisAkisiDemo · oturum), yani bu
     başlatıcılar her açılışta yeniden çalışıyor; kapatıp yeniden açan kişi
     yarım bir akışa değil başa düşüyor. Sıfırlama bir effect'le yapılmadı:
     effect içinde toplu setState, fazladan bir render ve React'in
     set-state-in-effect uyarısı demekti. */
  const [adim, setAdim] = useState(0);
  const [ulke, setUlke] = useState<Country | null>(onceden?.ulke ?? null);
  const [tier, setTier] = useState<Tier | null>(onceden?.tier ?? null);
  const [activity, setActivity] = useState<Activity | null>(onceden?.activity ?? null);
  const [visas, setVisas] = useState(onceden?.visas ?? 0);
  const [bank, setBank] = useState(onceden?.bank ?? false);
  const [accounting, setAccounting] = useState(onceden?.accounting ?? false);
  const [kisi, setKisi] = useState<Kisi>({ ad: "", soyad: "", eposta: "", telefon: "" });
  const [dokundu, setDokundu] = useState(false);
  const [yontem, setYontem] = useState<"kart" | "havale" | null>(null);
  const [bitti, setBitti] = useState(false);

  /* Effect yalnız tarayıcı API'sine dokunuyor (showModal/close); React
     durumuna yazmıyor. */
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (acik && !d.open) d.showModal();
    else if (!acik && d.open) d.close();
  }, [acik]);

  const sonuc = useMemo(
    () =>
      ulke && tier && activity
        ? configure({ country: ulke, tier, activity, visas, bank, accounting })
        : null,
    [ulke, tier, activity, visas, bank, accounting],
  );

  const epostaGecerli = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(kisi.eposta.trim());
  const kisiTamam = kisi.ad.trim() !== "" && kisi.soyad.trim() !== "" && epostaGecerli;

  const devamOlur =
    (adim === 0 && ulke !== null) ||
    (adim === 1 && sonuc !== null) ||
    (adim === 2 && kisiTamam) ||
    adim === 3;

  const bugun = useMemo(
    () => (adim >= 3 ? new Date().toLocaleDateString("tr-TR") : ""),
    [adim],
  );
  const teklifNo = useMemo(() => {
    if (adim < 3 || !ulke) return "";
    const tarih = new Date();
    const yy = String(tarih.getFullYear()).slice(-2);
    const mm = String(tarih.getMonth() + 1).padStart(2, "0");
    const kod = ozet(
      [kisi.eposta, kisi.ad, kisi.soyad, ulke, tier, activity, visas, bank, accounting].join("|"),
    );
    return `ORT-DXB-${yy}${mm}-${kod}`;
  }, [adim, ulke, tier, activity, visas, bank, accounting, kisi]);

  function ileri() {
    if (adim === 2 && !kisiTamam) {
      setDokundu(true);
      return;
    }
    if (devamOlur) setAdim((a) => Math.min(a + 1, 4));
  }
  function geri() {
    setAdim((a) => Math.max(a - 1, 0));
  }

  const inc = tier ? TIER_INCLUDES[tier] : null;

  return (
    <dialog
      ref={ref}
      className="sat-pen"
      aria-labelledby="sat-pen-baslik"
      onClose={onKapat}
      onCancel={onKapat}
    >
      <div className="sat-pen-in">
        {/* ------------------------------------------------ BAŞLIK + ADIMLAR */}
        <header className="sat-bas">
          <div className="sat-bas-ust">
            <p id="sat-pen-baslik" className="sat-bas-t">
              Kurulumu başlat
              {onceden && !bitti && <span className="sat-rozet">Fiyatlardan seçimlerinizle</span>}
            </p>
            <button type="button" className="sat-kapat" onClick={onKapat} aria-label="Pencereyi kapat">
              <X size={18} strokeWidth={2} aria-hidden="true" />
            </button>
          </div>

          {!bitti && (
            <ol className="sat-adimlar">
              {ADIMLAR.map((a, i) => {
                const Icon = a.icon;
                const durum = i < adim ? "gecti" : i === adim ? "simdi" : "sonra";
                return (
                  <li key={a.ad} data-durum={durum} aria-current={i === adim ? "step" : undefined}>
                    <span className="sat-adim-ic" aria-hidden="true">
                      {i < adim ? <Check size={14} strokeWidth={2.4} /> : <Icon size={14} strokeWidth={1.9} />}
                    </span>
                    <span>
                      <span className="sat-adim-no">{String(i + 1).padStart(2, "0")}</span>
                      {a.ad}
                    </span>
                  </li>
                );
              })}
            </ol>
          )}
        </header>

        {/* ------------------------------------------------------------ GÖVDE */}
        <div className="sat-govde" data-lenis-prevent="">
          {bitti ? (
            <Tamam yontem={yontem} teklifNo={teklifNo} eposta={kisi.eposta} />
          ) : (
            <div className="sat-adim" key={adim}>
              {/* ================================================= 1 · ÜLKE */}
              {adim === 0 && (
                <section aria-labelledby="sat-a0">
                  <h2 id="sat-a0" className="sat-soru">Şirketinizi hangi ülkede kuruyorsunuz?</h2>
                  <div className="sat-ulkeler" role="radiogroup" aria-labelledby="sat-a0">
                    {ULKELER.map((c) => {
                      const acikMi = c === ACIK;
                      return (
                        <label key={c} className="sat-ulke" data-kapali={!acikMi || undefined}>
                          <input
                            type="radio"
                            name="sat-ulke"
                            value={c}
                            checked={ulke === c}
                            disabled={!acikMi}
                            onChange={() => setUlke(c)}
                          />
                          <span className="sat-bayrak" aria-hidden="true">
                            <Flag country={c} />
                          </span>
                          <span className="sat-ulke-t">
                            <b>{COUNTRY_LABELS[c]}</b>
                            <span>{acikMi ? PRICING[c].license : "Yakında bu akışta"}</span>
                          </span>
                          <span className="sat-tik" aria-hidden="true">
                            <Check size={14} strokeWidth={2.6} />
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* ================================================= 2 · PAKET */}
              {adim === 1 && ulke && (
                <section aria-labelledby="sat-a1" className="sat-paket">
                  <div>
                    <h2 id="sat-a1" className="sat-soru">Paketinizi seçin</h2>

                    <div className="sat-tierler" role="radiogroup" aria-label="Paket">
                      {TIERS.map((t) => (
                        <label key={t} className="sat-tier">
                          <input
                            type="radio"
                            name="sat-tier"
                            value={t}
                            checked={tier === t}
                            onChange={() => setTier(t)}
                          />
                          <span className="sat-tier-ad">{TIER_META[t].name}</span>
                          <span className="sat-tier-bilgi">{TIER_META[t].info}</span>
                          <span className="sat-tier-f">{money(TIER_PRICE[ulke][t])}</span>
                          <span className="sat-tik" aria-hidden="true">
                            <Check size={14} strokeWidth={2.6} />
                          </span>
                        </label>
                      ))}
                    </div>

                    <p className="sat-alt-soru" id="sat-faal">Faaliyet alanı</p>
                    <div className="sat-cipler" role="radiogroup" aria-labelledby="sat-faal">
                      {ACTIVITIES.map((a) => (
                        <label key={a} className="sat-cip">
                          <input
                            type="radio"
                            name="sat-faal"
                            value={a}
                            checked={activity === a}
                            onChange={() => setActivity(a)}
                          />
                          <span>{ACTIVITY_LABELS[a]}</span>
                        </label>
                      ))}
                    </div>

                    <div className="sat-ekler">
                      <div className="sat-ek">
                        <span className="sat-ek-ic" aria-hidden="true">
                          <UserRound size={16} strokeWidth={1.9} />
                        </span>
                        <span className="sat-ek-t">
                          <b id="sat-vize">Oturum &amp; vize</b>
                          <span>
                            {inc && inc.visas > 0 ? `${inc.visas} kişi pakete dahil · ` : ""}
                            kişi başı {money(PRICING[ulke].perVisa)}
                          </span>
                        </span>
                        <span className="sat-sayac" role="group" aria-labelledby="sat-vize">
                          <button
                            type="button"
                            onClick={() => setVisas((v) => Math.max(0, v - 1))}
                            disabled={visas === 0}
                            aria-label="Bir kişi azalt"
                          >
                            <Minus size={14} strokeWidth={2.2} aria-hidden="true" />
                          </button>
                          <output aria-live="polite">{visas}</output>
                          <button
                            type="button"
                            onClick={() => setVisas((v) => Math.min(VIZE_EN_COK, v + 1))}
                            disabled={visas >= VIZE_EN_COK}
                            aria-label="Bir kişi ekle"
                          >
                            <Plus size={14} strokeWidth={2.2} aria-hidden="true" />
                          </button>
                        </span>
                      </div>

                      <label className="sat-ek sat-ek-anahtar">
                        <span className="sat-ek-ic" aria-hidden="true">
                          <Landmark size={16} strokeWidth={1.9} />
                        </span>
                        <span className="sat-ek-t">
                          <b>Banka hesabı desteği</b>
                          <span>{inc?.bank ? "Pakete dahil" : money(PRICING[ulke].bank)}</span>
                        </span>
                        <input
                          type="checkbox"
                          role="switch"
                          checked={bank || !!inc?.bank}
                          disabled={!!inc?.bank}
                          onChange={(e) => setBank(e.target.checked)}
                        />
                        <span className="sat-anahtar" aria-hidden="true" />
                      </label>

                      <label className="sat-ek sat-ek-anahtar">
                        <span className="sat-ek-ic" aria-hidden="true">
                          <Building2 size={16} strokeWidth={1.9} />
                        </span>
                        <span className="sat-ek-t">
                          <b>Yıllık muhasebe</b>
                          <span>{inc?.accounting ? "Pakete dahil" : money(PRICING[ulke].annual)}</span>
                        </span>
                        <input
                          type="checkbox"
                          role="switch"
                          checked={accounting || !!inc?.accounting}
                          disabled={!!inc?.accounting}
                          onChange={(e) => setAccounting(e.target.checked)}
                        />
                        <span className="sat-anahtar" aria-hidden="true" />
                      </label>
                    </div>
                  </div>

                  {/* Tutar kolonu: fiyatlar bölümüyle aynı ilişki — solda seçim,
                      sağda o seçimin kalem kalem karşılığı. */}
                  <aside className="sat-ozet" aria-label="Tahmini tutar">
                    <p className="sat-ozet-k">Tahmini toplam</p>
                    {sonuc ? (
                      <>
                        <Tutar deger={sonuc.total} className="sat-ozet-v" />
                        <ul className="sat-ozet-l">
                          {sonuc.lines.map((l) => (
                            <li key={l.label}>
                              <span>{l.label}</span>
                              <span>{money(l.amount)}</span>
                            </li>
                          ))}
                        </ul>
                        <p className="sat-ozet-n">
                          {PRICING[ulke].duration} · {PRICING[ulke].license}
                        </p>
                      </>
                    ) : (
                      <p className="sat-ozet-bos">
                        {tier ? "Faaliyet alanını seçin" : "Paket ve faaliyet alanını seçin"}
                      </p>
                    )}
                  </aside>
                </section>
              )}

              {/* ============================================== 3 · BİLGİLER */}
              {adim === 2 && (
                <section aria-labelledby="sat-a2">
                  <h2 id="sat-a2" className="sat-soru">Teklif kimin adına hazırlansın?</h2>
                  <div className="sat-form">
                    <Alan
                      etiket="Ad"
                      deger={kisi.ad}
                      onDeger={(v) => setKisi((k) => ({ ...k, ad: v }))}
                      hata={dokundu && kisi.ad.trim() === "" ? "Adınızı yazın" : ""}
                      autoComplete="given-name"
                    />
                    <Alan
                      etiket="Soyad"
                      deger={kisi.soyad}
                      onDeger={(v) => setKisi((k) => ({ ...k, soyad: v }))}
                      hata={dokundu && kisi.soyad.trim() === "" ? "Soyadınızı yazın" : ""}
                      autoComplete="family-name"
                    />
                    <Alan
                      etiket="E-posta"
                      tip="email"
                      deger={kisi.eposta}
                      onDeger={(v) => setKisi((k) => ({ ...k, eposta: v }))}
                      hata={dokundu && !epostaGecerli ? "Geçerli bir e-posta adresi yazın" : ""}
                      autoComplete="email"
                      yardim="Teklif ve ödeme bilgisi bu adrese gidecek."
                    />
                    <Alan
                      etiket="Telefon"
                      tip="tel"
                      istege
                      deger={kisi.telefon}
                      onDeger={(v) => setKisi((k) => ({ ...k, telefon: v }))}
                      autoComplete="tel"
                    />
                  </div>
                  <p className="sat-swap">
                    <b>SWAP</b> Alanların kesin listesi müşteriden bekleniyor (&quot;neler alacağımızı
                    teyit ederiz&quot;). Demo için ad · soyad · e-posta · telefon.
                  </p>
                </section>
              )}

              {/* ================================================ 4 · TEKLİF */}
              {adim === 3 && ulke && tier && activity && sonuc && (
                <section aria-labelledby="sat-a3">
                  <h2 id="sat-a3" className="sat-soru sat-yazdirma-yok">Teklifiniz hazır</h2>

                  <article className="sat-belge" aria-label={`Teklif ${teklifNo}`}>
                    <header className="sat-belge-bas">
                      {/* eslint-disable-next-line @next/next/no-img-element -- yazdırmada da basılması için düz img */}
                      <img src="/ortac-logo.png" alt="Ortac Global" className="sat-belge-logo" />
                      <div className="sat-belge-kunye">
                        <p className="sat-belge-tur">Hizmet teklifi</p>
                        <p>
                          <span>Teklif no</span> <b>{teklifNo}</b>
                        </p>
                        <p>
                          <span>Tarih</span> <b>{bugun}</b>
                        </p>
                        <p>
                          <span>Geçerlilik</span> <b className="sat-swap-i">SWAP · teyit edilecek</b>
                        </p>
                      </div>
                    </header>

                    <div className="sat-belge-taraf">
                      <div>
                        <p className="sat-belge-k">Teklif sahibi</p>
                        <p className="sat-belge-ad">
                          {kisi.ad} {kisi.soyad}
                        </p>
                        <p>{kisi.eposta}</p>
                        {kisi.telefon.trim() && <p>{kisi.telefon}</p>}
                      </div>
                      <div>
                        <p className="sat-belge-k">Hizmet</p>
                        <p className="sat-belge-ad">
                          <span className="sat-belge-bayrak" aria-hidden="true">
                            <Flag country={ulke} />
                          </span>
                          {COUNTRY_LABELS[ulke]} şirket kuruluşu
                        </p>
                        <p>{PRICING[ulke].license}</p>
                        <p>Faaliyet: {ACTIVITY_LABELS[activity]}</p>
                      </div>
                    </div>

                    <div className="sat-belge-paket">
                      <p className="sat-belge-k">{TIER_META[tier].name} paketinin kapsamı</p>
                      <ul>
                        <li>
                          <Check size={14} strokeWidth={2.4} aria-hidden="true" />
                          Şirket kuruluşu ve lisans · {PRICING[ulke].duration}
                        </li>
                        {(TIER_INCLUDES[tier].bank || bank) && (
                          <li>
                            <Check size={14} strokeWidth={2.4} aria-hidden="true" />
                            Banka hesabı desteği
                          </li>
                        )}
                        {Math.max(visas, TIER_INCLUDES[tier].visas) > 0 && (
                          <li>
                            <Check size={14} strokeWidth={2.4} aria-hidden="true" />
                            Oturum &amp; vize · {Math.max(visas, TIER_INCLUDES[tier].visas)} kişi
                          </li>
                        )}
                        {(TIER_INCLUDES[tier].accounting || accounting) && (
                          <li>
                            <Check size={14} strokeWidth={2.4} aria-hidden="true" />
                            Yıllık muhasebe
                          </li>
                        )}
                      </ul>
                    </div>

                    <table className="sat-belge-tablo">
                      <thead>
                        <tr>
                          <th scope="col">Kalem</th>
                          <th scope="col">Tutar</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sonuc.lines.map((l) => (
                          <tr key={l.label}>
                            <td>{l.label}</td>
                            <td>{money(l.amount)}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <th scope="row">Toplam</th>
                          <td>{money(sonuc.total)}</td>
                        </tr>
                      </tfoot>
                    </table>

                    <p className="sat-belge-dip">{TEMSILI}</p>
                  </article>

                  <div className="sat-teklif-eylem sat-yazdirma-yok">
                    <button type="button" className="btn btn-line btn-sm" onClick={() => window.print()}>
                      <Printer size={15} strokeWidth={2} aria-hidden="true" />
                      PDF olarak kaydet
                    </button>
                  </div>
                </section>
              )}

              {/* ================================================= 5 · ÖDEME */}
              {adim === 4 && sonuc && (
                <section aria-labelledby="sat-a4">
                  <h2 id="sat-a4" className="sat-soru">Nasıl ödemek istersiniz?</h2>
                  <p className="sat-toplam-satir">
                    Teklif <b>{teklifNo}</b> · toplam <b>{money(sonuc.total)}</b>
                  </p>

                  <div className="sat-yontemler" role="radiogroup" aria-labelledby="sat-a4">
                    <label className="sat-yontem">
                      <input
                        type="radio"
                        name="sat-yontem"
                        checked={yontem === "kart"}
                        onChange={() => setYontem("kart")}
                      />
                      <span className="sat-yontem-ic" aria-hidden="true">
                        <CreditCard size={20} strokeWidth={1.9} />
                      </span>
                      <span className="sat-yontem-t">
                        <b>Kredi veya banka kartı</b>
                        <span>Stripe&apos;ın güvenli ödeme sayfasında</span>
                      </span>
                      <span className="sat-tik" aria-hidden="true">
                        <Check size={14} strokeWidth={2.6} />
                      </span>
                    </label>
                    <label className="sat-yontem">
                      <input
                        type="radio"
                        name="sat-yontem"
                        checked={yontem === "havale"}
                        onChange={() => setYontem("havale")}
                      />
                      <span className="sat-yontem-ic" aria-hidden="true">
                        <Banknote size={20} strokeWidth={1.9} />
                      </span>
                      <span className="sat-yontem-t">
                        <b>Havale / EFT</b>
                        <span>Referans kodu ile, ödeme otomatik eşleşir</span>
                      </span>
                      <span className="sat-tik" aria-hidden="true">
                        <Check size={14} strokeWidth={2.6} />
                      </span>
                    </label>
                  </div>

                  {yontem === "kart" && (
                    <div className="sat-yontem-d">
                      <p>
                        <ShieldCheck size={16} strokeWidth={1.9} aria-hidden="true" />
                        Kart bilgileriniz bu sitede alınmıyor; Stripe&apos;ın ödeme sayfasına
                        yönlendirilirsiniz ve ödeme onayı e-postanıza gelir.
                      </p>
                    </div>
                  )}
                  {yontem === "havale" && (
                    <div className="sat-yontem-d">
                      <dl className="sat-havale">
                        <div>
                          <dt>Referans kodu</dt>
                          <dd className="sat-kod">{teklifNo}</dd>
                        </div>
                        <div>
                          <dt>Alıcı</dt>
                          <dd className="sat-swap-i">SWAP · banka hesabı bilgisi bekleniyor</dd>
                        </div>
                        <div>
                          <dt>IBAN</dt>
                          <dd className="sat-swap-i">SWAP · bekleniyor</dd>
                        </div>
                        <div>
                          <dt>Tutar</dt>
                          <dd>{money(sonuc.total)}</dd>
                        </div>
                      </dl>
                      <p>
                        Havale açıklamasına yalnızca referans kodunu yazın. Ödemeniz ulaştığında
                        teklifinizle eşleşir ve size e-posta gelir.
                      </p>
                    </div>
                  )}
                </section>
              )}
            </div>
          )}
        </div>

        {/* ------------------------------------------------------------ ALT */}
        {!bitti && (
          <footer className="sat-alt">
            {adim > 0 ? (
              <button type="button" className="btn btn-line btn-sm" onClick={geri}>
                <ArrowLeft size={15} strokeWidth={2} aria-hidden="true" />
                Geri
              </button>
            ) : (
              <span />
            )}

            {adim < 3 && (
              <button
                type="button"
                className="btn btn-sm sat-ana"
                onClick={ileri}
                aria-disabled={!devamOlur || undefined}
                data-kapali={!devamOlur || undefined}
              >
                Devam et
                <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
              </button>
            )}
            {adim === 3 && (
              <button type="button" className="btn btn-sm sat-ana" onClick={ileri}>
                Teklifi onayla, ödemeye geç
                <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
              </button>
            )}
            {adim === 4 && (
              <button
                type="button"
                className="btn btn-sm sat-ana"
                onClick={() => yontem && setBitti(true)}
                aria-disabled={!yontem || undefined}
                data-kapali={!yontem || undefined}
              >
                {yontem === "havale" ? "Havale bilgilerini aldım" : "Ödemeye geç"}
                <span className="sat-demo">demo</span>
              </button>
            )}
          </footer>
        )}
      </div>
    </dialog>
  );
}

/* ------------------------------------------------------------------ ALAN */

function Alan({
  etiket,
  deger,
  onDeger,
  tip = "text",
  hata = "",
  yardim,
  istege,
  autoComplete,
}: {
  etiket: string;
  deger: string;
  onDeger: (v: string) => void;
  tip?: string;
  hata?: string;
  yardim?: string;
  istege?: boolean;
  autoComplete?: string;
}) {
  const id = `sat-alan-${etiket.toLocaleLowerCase("tr-TR").replace(/[^a-zçğıöşü]/g, "")}`;
  return (
    <div className="sat-alan" data-hata={hata ? "" : undefined}>
      <label htmlFor={id}>
        {etiket}
        {istege && <span> · isteğe bağlı</span>}
      </label>
      <input
        id={id}
        type={tip}
        value={deger}
        autoComplete={autoComplete}
        aria-invalid={hata ? true : undefined}
        aria-describedby={hata || yardim ? `${id}-not` : undefined}
        onChange={(e) => onDeger(e.target.value)}
      />
      {(hata || yardim) && (
        <p id={`${id}-not`} className="sat-alan-not">
          {hata || yardim}
        </p>
      )}
    </div>
  );
}

/* ----------------------------------------------------------------- TAMAM
   Müşteri: "Stripe'tan ödeme yapıldıktan sonra zaten kişiye mail gidiyor ya,
   oradan sonrası Murat abilerde … hesap açıp insanları içeri çekiyoruz."
   Bu ekran o devrin kendisini söylüyor: sitenin işi burada bitiyor. */
function Tamam({
  yontem,
  teklifNo,
  eposta,
}: {
  yontem: "kart" | "havale" | null;
  teklifNo: string;
  eposta: string;
}) {
  return (
    <section className="sat-tamam" aria-labelledby="sat-tamam-t">
      <span className="sat-tamam-ic" aria-hidden="true">
        <Check size={26} strokeWidth={2.4} />
      </span>
      <h2 id="sat-tamam-t" className="sat-soru">
        {yontem === "havale" ? "Havaleniz bekleniyor" : "Ödemeniz alındı"}
      </h2>
      <p>
        Teklif <b>{teklifNo}</b>.{" "}
        {yontem === "havale"
          ? "Ödemeniz hesabımıza ulaşıp eşleştiğinde"
          : "Ödeme onayı"}{" "}
        <b>{eposta}</b> adresine gelecek.
      </p>
      <ol className="sat-sonra">
        <li>
          <span>01</span>Ekibimiz size müşteri paneli davetini gönderir.
        </li>
        <li>
          <span>02</span>Kimlik ve şirket belgelerini panel üzerinden iletirsiniz.
        </li>
        <li>
          <span>03</span>Kuruluş süreci aynı panelden adım adım ilerler.
        </li>
      </ol>
      <p className="sat-demo-not">
        Demo: hiçbir ödeme alınmadı, hiçbir bilgi bir yere gönderilmedi.
      </p>
    </section>
  );
}

/* ================================================================ SAHNE
   Lab sayfasındaki iki giriş. Ürettikleri tek şey pencereye verilen
   başlangıç değeri. */

const FIYATTAN: Onceden = {
  ulke: "dubai",
  tier: "gold",
  activity: "yazilim",
  visas: 2,
  bank: true,
  accounting: false,
};

export default function SatisAkisiDemo() {
  const [acik, setAcik] = useState(false);
  const [onceden, setOnceden] = useState<Onceden | null>(null);
  const [oturum, setOturum] = useState(0);
  const ornek = configure({
    country: FIYATTAN.ulke,
    tier: FIYATTAN.tier,
    activity: FIYATTAN.activity,
    visas: FIYATTAN.visas,
    bank: FIYATTAN.bank,
    accounting: FIYATTAN.accounting,
  });

  function ac(o: Onceden | null) {
    setOnceden(o);
    setOturum((n) => n + 1);
    setAcik(true);
  }

  return (
    <>
      <div className="sat-girisler">
        <div className="sat-giris">
          <p className="sat-giris-k">Giriş 1 · her yerdeki düğme</p>
          <p className="sat-giris-t">Navbar, hero, sayfa altları</p>
          <p className="sat-giris-s">Pencere boş açılır: ülke, paket, seçenekler sırayla seçilir.</p>
          <button type="button" className="btn btn-sm sat-ana" onClick={() => ac(null)}>
            Kurulumu Başlat
            <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
          </button>
        </div>

        <div className="sat-giris">
          <p className="sat-giris-k">Giriş 2 · fiyatlar bölümü</p>
          <p className="sat-giris-t">
            <span className="sat-bayrak sat-bayrak-s" aria-hidden="true">
              <Flag country="dubai" />
            </span>
            Dubai · {TIER_META[FIYATTAN.tier].name} · {FIYATTAN.visas} vize · banka
          </p>
          <p className="sat-giris-s">
            Ziyaretçi fiyatlarda seçimini yapmış: <b>{money(ornek.total)}</b>. Pencere bu seçimlerle dolu açılır.
          </p>
          <button type="button" className="btn btn-sm sat-ana" onClick={() => ac(FIYATTAN)}>
            Hemen başla
            <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
          </button>
        </div>
      </div>

      <SatisPenceresi key={oturum} acik={acik} onceden={onceden} onKapat={() => setAcik(false)} />
    </>
  );
}
