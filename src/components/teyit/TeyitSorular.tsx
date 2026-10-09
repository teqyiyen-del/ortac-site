"use client";

/* MURAT BEY'E SORULAR · /teyit/sorular (08.10.2026; ilk hâli 07.10 /teyit/kktc)
   Burak: "eksik kalan ya da şunu da öğrenelim dediğin her şeyi soru olarak
   yaz; Murat abinin pratikçe ilgilenebileceği türden, bazıları şıklı olsun,
   diğer seçeneği olur, oraya kendi yazar."

   HER SORU: (varsa) şıklar + her zaman bir yazı alanı. Şık tek ya da çok
   seçmeli (`cok`). Şıklardan biri uymuyorsa alana yazılıyor; alan şıksız
   sorularda cevabın kendisi. En altta "Cevapları kopyala": seçilenler ve
   yazılanlar tek metin olarak panoya gidiyor, WhatsApp'a yapıştırılıyor.
   Cevaplar tarayıcıda saklanıyor (kapatıp açınca kaybolmasın); saklama
   çalışmazsa sayfa yine çalışıyor. Sunucuya hiçbir şey gitmiyor.

   Soruların dayanağı docs/durum.md · 07.10 (17) ve 08.10 kayıtları. Cevaplar
   uygulanınca rota silinecek. */

import "@/app/css/teyit-soru.css";
import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import Logo from "@/components/shared/Logo";

/* gorsel: sorunun sitedeki karşılığının ekran görüntüsü (public/teyit/…).
   09.10.2026 · Burak: "gerekenlere görsel de koyabilirsin; sitede böyle
   gözüküyor, bu okey mi gibisinden." */
type Soru = { id: string; s: string; sik?: string[]; cok?: boolean; ipucu?: string; gorsel?: string };
const GRUPLAR: { ad: string; sorular: Soru[] }[] = [
  {
    ad: "Fiyat",
    sorular: [
      { id: "f-yil", s: "Dubai'de 2. ve 3. yıl lisans bedeli ne kadar? (Sitede şu an yer tutucu rakam var.)", sik: ["İlk yılla aynı", "Farklı, aşağıya bölge bölge yazıyorum"], ipucu: "IFZA, Meydan ve DWTC için ayrı ayrı." },
      { id: "f-ifza", s: "Teklifte IFZA \"7.800 $ vergi dahil\" yazıyor; kalemleri toplayınca 7.873 + %5 = 8.266,65 çıkıyor. Müşteri hangisini ödüyor?", sik: ["7.800 $", "8.266,65 $", "Başka, aşağıya yazıyorum"] },
      { id: "f-uk", s: "İngiltere için teklif belgesi gelecek mi? Sitede Basic 900, Gold 1.500, Platinium 2.600 dolar yazıyor.", sik: ["Rakamlar doğru, kalsın", "Belge göndereceğim", "Paket yok, tek fiyat", "Fiyat yazmayalım"], ipucu: "Dolar mı sterlin mi, onu da yazın." },
      { id: "f-ukmuh", s: "İngiltere muhasebe ücretini sitede nasıl yazalım?", sik: ["Yıllık sabit tutar", "Aylık tutar", "Fiyat yazmayalım"], ipucu: "Tutarı biliyorsanız yazın." },
      { id: "f-kharc", s: "KKTC'de başvuru harcı (2.000 USD) ve tescil harcı (2.500 USD) 9.920 €'nun içinde mi?", sik: ["İçinde", "Ayrıca ödeniyor", "Bu harçlar yok"] },
      { id: "f-kharc2", s: "KKTC başvuru harcı sitede 2.000 USD yazıyor; Serbest Liman'ın resmî sayfasında 200 USD geçiyor. Hangisi doğru?", sik: ["2.000 USD", "200 USD", "Başka, aşağıya yazıyorum"] },
      { id: "f-kdenetci", s: "KKTC'de denetçi raporu 270 € / 900 € ücrete dahil mi?", sik: ["Dahil", "Ayrı ücret", "Denetçi raporu gerekmiyor"] },
    ],
  },
  {
    ad: "İletişim ve firma bilgisi",
    sorular: [
      { id: "i-wa", s: "Kurulum akışından gelenler WhatsApp'ta hangi numaraya yazsın?", sik: ["Dubai numarası", "Ülkesine göre ilgili ofis", "Başka, aşağıya yazıyorum"] },
      { id: "i-unvan", s: "Üç ülkedeki şirketlerimizin tescilli tam adı nedir? (Dubai, KKTC, İngiltere)", ipucu: "Sitenin künyesine ve KVKK metnine yazılacak." },
      { id: "i-lisans", s: "Hakkımızda sayfasına muhasebe lisans numarasını yazalım mı?", sik: ["Yazalım, numarayı aşağıya yazıyorum", "Yazmayalım"] },
      { id: "i-panel", s: "Müşteri paneli adresi eski sitedekiyle aynı mı kalacak?", sik: ["Aynı", "Değişecek, aşağıya yazıyorum"] },
    ],
  },
  {
    ad: "Doğru bilgi",
    sorular: [
      { id: "b-dodeme", s: "Dubai'de hangi ödeme kanalları listede kalsın?", cok: true, sik: ["Stripe", "PayPal", "Binance", "Amazon Payment Services", "Network International", "Payoneer", "wamo"] },
      { id: "b-ukhesap", s: "İngiltere'de fiilen hangi hesapları açtırıyoruz?", cok: true, sik: ["Tide", "Revolut", "Wise", "Payoneer", "Yerel banka"] },
      { id: "b-oturum", s: "Dubai oturumu kaç ay ülke dışında kalınca düşüyor?", sik: ["6 ay", "12 ay", "Vize türüne göre değişiyor"] },
      { id: "b-vize", s: "Ortak vizesi kaç yıllık?", sik: ["2 yıl", "3 yıl", "Serbest bölgeye göre değişiyor"] },
      { id: "b-mainland", s: "\"Serbest bölgeden mainland'e geçmek yeni kuruluş demek\" cümlesi doğru mu?", sik: ["Doğru", "Yanlış, aşağıya yazıyorum"] },
      { id: "b-bordro", s: "Dubai'de bordro hizmeti veriyor muyuz?", sik: ["Evet", "Hayır"] },
      { id: "b-ekip", s: "KKTC ve İngiltere'de muhasebeyi kendi ekibimiz mi yapıyor?", sik: ["İkisinde de kendi ekibimiz", "KKTC kendi, İngiltere anlaşmalı", "İkisi de anlaşmalı firma"] },
      { id: "b-kay", s: "KKTC'de yıllık hesap ve beyan hangi ayda veriliyor?", sik: ["Ocak - Mart", "Nisan", "Mayıs - Haziran", "Şirkete göre değişiyor"] },
      { id: "b-ksure", s: "KKTC'de banka hesabı kabaca ne kadar sürede açılıyor?", sik: ["1 hafta içinde", "2 - 4 hafta", "1 aydan uzun", "Sitede süre yazmayalım"] },
    ],
  },
  {
    ad: "Sitede açılacaklar",
    sorular: [
      { id: "s-kariyer", s: "Kariyer sayfasına koyacağımız açık bir ilan var mı?", sik: ["Var, aşağıya yazıyorum", "Yok, yalnız açık başvuru kalsın", "Kariyer sayfasını kapatalım"], ipucu: "Eski sitede \"Muhasebeci, KKTC\" ilanı vardı; hâlâ geçerli mi?" },
      { id: "s-ortaklik", s: "İş ortaklığı sayfasını kullanacak mıyız?", sik: ["Evet", "Şimdilik hayır, kapalı dursun"], ipucu: "Evetse komisyon ve şartları yazın; sayfada dört satır boş duruyor." },
      { id: "s-rakam", s: "Sitede gerçek bir rakam vermek istesek ne yazabiliriz?", ipucu: "Örnek: bugüne kadar kurulan şirket sayısı, hizmet verilen müşteri sayısı, muhasebesi tutulan şirket sayısı. Bildiğiniz kadarını yazın." },
      { id: "s-gelisme", s: "\"Gelişmeler\" sayfasına yazmamızı istediğiniz son dönem değişiklikleri var mı?", ipucu: "Dubai, KKTC ya da İngiltere'de müşteriyi etkileyen 3-5 değişiklik: ne, hangi tarihte." },
    ],
  },
  {
    ad: "Yeni sayfalar · sitede böyle görünüyor",
    sorular: [
      { id: "y-vergi", gorsel: "/teyit/vergi-kapsam.jpg", s: "Vergi danışmanlığı sayfasında \"ne yapıyoruz\" ve \"dışında kalanlar\" listesi doğru mu?", sik: ["Doğru", "Düzeltme var, aşağıya yazıyorum"], ipucu: "Çıkarılacak ya da eklenecek madde varsa yazın." },
      { id: "y-ceza", gorsel: "/teyit/vergi-ceza.jpg", s: "Dubai'de geç beyan cezası: ilk 12 ay ayda 500 AED, sonra ayda 1.000 AED yazdık. Güncel mi?", sik: ["Güncel", "Değişti, aşağıya yazıyorum", "Ceza rakamı yazmayalım"] },
      { id: "y-ktakvim", gorsel: "/teyit/kktc-takvim.jpg", s: "KKTC vergi takvimi (nisan beyanname, mayıs ve ekim ödeme) Serbest Liman şirketi için de geçerli mi?", sik: ["Geçerli", "Serbest Liman şirketinde farklı, aşağıya yazıyorum"] },
      { id: "y-kurumsal", gorsel: "/teyit/kurumsal-kapsam.jpg", s: "Kurumsal danışmanlık sayfasında üstlendiğimiz işler doğru mu?", sik: ["Doğru", "Düzeltme var, aşağıya yazıyorum"], ipucu: "Pay devri, yönetici değişikliği, faaliyet ekleme, şirket kapatma gibi işleri yapıyor muyuz?" },
      { id: "y-aml", gorsel: "/teyit/aml-kapsam.jpg", s: "AML ve uyum sayfasında üstlendiğimiz işler doğru mu?", sik: ["Doğru", "Düzeltme var, aşağıya yazıyorum"], ipucu: "Risk değerlendirmesi ve iç politika metni yazıyor muyuz?" },
      { id: "y-ulke", s: "Kurumsal danışmanlık ve AML hizmetini hangi ülkelerde veriyoruz?", cok: true, sik: ["Dubai", "İngiltere", "KKTC"] },
      { id: "y-eori", s: "Müşteriler için EORI numarası başvurusu yapıyor muyuz?", sik: ["Evet", "Hayır"] },
    ],
  },
];

const ANAHTAR = "ortac-teyit-sorular-v5";
type Cevap = { sec: string[]; yazi: string };
const BOS: Cevap = { sec: [], yazi: "" };

export default function TeyitSorular() {
  const [cevap, setCevap] = useState<Record<string, Cevap>>({});
  const [kopya, setKopya] = useState<"" | "ok" | "yok">("");

  useEffect(() => {
    try {
      const h = window.localStorage.getItem(ANAHTAR);
      // saklanan cevap yalnız istemcide: ilk boyamadan sonra okunuyor (TeyitListesi'yle aynı kalıp)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (h) setCevap(JSON.parse(h) as Record<string, Cevap>);
    } catch {
      /* saklama kapalı: boş başlıyor */
    }
  }, []);

  const yaz = (id: string, c: Cevap) => {
    const yeni = { ...cevap, [id]: c };
    setCevap(yeni);
    try {
      window.localStorage.setItem(ANAHTAR, JSON.stringify(yeni));
    } catch {
      /* saklama kapalı */
    }
  };
  const sec = (q: Soru, s: string) => {
    const c = cevap[q.id] ?? BOS;
    const var_ = c.sec.includes(s);
    yaz(q.id, { ...c, sec: q.cok ? (var_ ? c.sec.filter((x) => x !== s) : [...c.sec, s]) : var_ ? [] : [s] });
  };

  const duz = GRUPLAR.flatMap((g) => g.sorular);
  const no = new Map(duz.map((q, i) => [q.id, i + 1]));
  const doluMu = (q: Soru) => {
    const c = cevap[q.id];
    return !!c && (c.sec.length > 0 || c.yazi.trim().length > 0);
  };
  const dolu = duz.filter(doluMu).length;

  const kopyala = async () => {
    const metin = GRUPLAR.map((g) => {
      const satirlar = g.sorular.map((q) => {
        const c = cevap[q.id] ?? BOS;
        const parca = [c.sec.join(", "), c.yazi.trim()].filter(Boolean).join(" · ");
        return `${no.get(q.id)}. ${q.s}\nCevap: ${parca || "(boş)"}`;
      });
      return `${g.ad}\n${satirlar.join("\n\n")}`;
    }).join("\n\n");
    try {
      await navigator.clipboard.writeText(metin);
      setKopya("ok");
    } catch {
      setKopya("yok");
    }
    window.setTimeout(() => setKopya(""), 3000);
  };

  return (
    <main id="icerik" className="tsr">
      <div className="tsr-in">
        <header className="tsr-bas">
          <Logo />
          <h1>Murat Bey, {duz.length} kısa soru.</h1>
          <p>
            Çoğu tek dokunuş: uyan şıkkı seçin. Şıklar uymuyorsa ya da eklemek istediğiniz bir şey varsa altındaki
            alana yazın. Bitince en alttaki düğmeyle hepsini kopyalayıp WhatsApp&apos;tan Burak&apos;a gönderin.
            Bilmediğinizi boş bırakabilirsiniz.
          </p>
        </header>

        {GRUPLAR.map((g) => (
          <section key={g.ad} className="tsr-grup">
            <h2>{g.ad}</h2>
            <ol>
              {g.sorular.map((q) => {
                const c = cevap[q.id] ?? BOS;
                return (
                  <li key={q.id} data-dolu={doluMu(q) ? "" : undefined}>
                    <p className="tsr-soru">
                      <b>{no.get(q.id)}</b>
                      <span>
                        {q.s}
                        {q.cok && <em> Birden fazla seçebilirsiniz.</em>}
                      </span>
                    </p>
                    {q.gorsel && (
                      <a className="tsr-gorsel" href={q.gorsel} target="_blank" rel="noopener noreferrer">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={q.gorsel} alt="Sitedeki görünüm" loading="lazy" />
                      </a>
                    )}
                    {q.sik && (
                      <div className="tsr-sik" role="group" aria-label={q.s}>
                        {q.sik.map((s) => {
                          const on = c.sec.includes(s);
                          return (
                            <button key={s} type="button" aria-pressed={on} data-on={on ? "" : undefined} onClick={() => sec(q, s)}>
                              {on && <Check size={15} strokeWidth={2.6} aria-hidden="true" />}
                              {s}
                            </button>
                          );
                        })}
                      </div>
                    )}
                    <textarea
                      rows={q.sik ? 1 : 2}
                      aria-label={`${q.s} · kendi cevabınız`}
                      placeholder={q.ipucu ?? (q.sik ? "Başka bir cevap ya da not" : "Cevabınız")}
                      value={c.yazi}
                      onChange={(e) => yaz(q.id, { ...c, yazi: e.target.value })}
                    />
                  </li>
                );
              })}
            </ol>
          </section>
        ))}

        <div className="tsr-alt">
          <span aria-live="polite">
            {kopya === "ok"
              ? "Kopyalandı. WhatsApp'ta Burak'a yapıştırabilirsiniz."
              : kopya === "yok"
                ? "Kopyalanamadı; cevapları elle seçip kopyalayın."
                : `${dolu} / ${duz.length} cevaplandı`}
          </span>
          <button type="button" className="tsr-btn" onClick={kopyala}>
            {kopya === "ok" ? <Check size={17} strokeWidth={2.4} aria-hidden="true" /> : <Copy size={17} strokeWidth={2} aria-hidden="true" />}
            Cevapları kopyala
          </button>
        </div>
      </div>
    </main>
  );
}
