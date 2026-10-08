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

type Soru = { id: string; s: string; sik?: string[]; cok?: boolean; ipucu?: string };
const GRUPLAR: { ad: string; sorular: Soru[] }[] = [
  {
    ad: "Dubai",
    sorular: [
      { id: "d-yil", s: "2. ve 3. yıl lisans fiyatı ne kadar? (Sitede şu an yer tutucu rakam var.)", sik: ["İlk yılla aynı", "Farklı, aşağıya yazıyorum"], ipucu: "IFZA, Meydan ve DWTC için ayrı ayrı" },
      { id: "d-vip", s: "VIP bölümünün başlığında \"yaklaşık 5 iş günü\" yazıyor. Fiyat kartındaki gibi \"yaklaşık\"ı kaldıralım mı?", sik: ["Kaldıralım, \"5 iş günü\"", "\"Yaklaşık\" kalsın"] },
    ],
  },
  {
    ad: "KKTC · Muhasebe",
    sorular: [
      { id: "k-ay", s: "Yıllık hesap ve beyan hangi ayda veriliyor?", sik: ["Ocak - Mart", "Nisan", "Mayıs - Haziran", "Şirkete göre değişiyor"], ipucu: "Geç kalınırsa ceza varsa yazın" },
      { id: "k-ne", s: "Her yıl tam olarak ne veriliyor?", cok: true, sik: ["Beyanname", "Bilanço", "Denetçi raporu", "Serbest Liman faaliyet raporu"] },
      { id: "k-denetci", s: "Denetçi raporu 270 € / 900 € ücrete dahil mi?", sik: ["Dahil", "Ayrı ücret", "Denetçi raporu gerekmiyor"] },
      { id: "k-yenileme", s: "İkinci yıldan itibaren faaliyet harcı (2.700 €) ve adres hizmeti (2.000 € + KDV) aynı tutarla mı yenileniyor?", sik: ["Evet, aynı", "Farklı, aşağıya yazıyorum"] },
      { id: "k-devir", s: "Başka bir ofisteki KKTC şirketinin muhasebesini devralıyor muyuz?", sik: ["Evet, adres ve temsilci de bize geçiyor", "Evet, yalnız muhasebe", "Hayır"] },
      { id: "k-belge", s: "Müşteri belgeleri bize hangi yoldan iletiyor?", cok: true, sik: ["Müşteri paneli", "E-posta", "WhatsApp"] },
      { id: "k-islem", s: "Aylık 270 €'luk standart kapsam ayda kaç işleme kadar?", sik: ["100", "250", "500", "Sınır koymuyoruz"] },
      { id: "k-imza", s: "KKTC şirketinin defterini kim imzalıyor? Dubai sayfasındaki gibi \"defterinizi imzalayan\" kutusu koyalım mı?", sik: ["Murat Ortaç, kutu koyalım", "KKTC'deki mali müşavir", "Kutu koymayalım"] },
    ],
  },
  {
    ad: "KKTC · Banka ve ödeme",
    sorular: [
      { id: "k-sure", s: "Banka hesabı kabaca ne kadar sürede açılıyor?", sik: ["1 hafta içinde", "2 - 4 hafta", "1 aydan uzun", "Sitede süre yazmayalım"] },
      { id: "k-sahsen", s: "Hesap için bankaya şahsen gitmek şart mı?", sik: ["Evet, her bankada", "Bazı bankalarda", "Hayır"] },
      { id: "k-tr", s: "\"Türkiye bankalarıyla çalışmak mümkün olabiliyor\" cümlesi sitede kalsın mı?", sik: ["Kalsın", "Kaldıralım"], ipucu: "Hangi durumda mümkün olduğunu biliyorsanız yazın" },
      { id: "k-tiko", s: "Sanal POS için \"Tiko\" adını sitede yazmaya devam edelim mi?", sik: ["Evet", "Hayır, \"yerel sanal POS\" diyelim"], ipucu: "Tiko'nun aradığı şart varsa yazın (site, ciro, sektör)" },
      { id: "k-doviz", s: "Yurt dışından gelen dövizde müşterinin bilmesi gereken bir sınır ya da masraf var mı?", sik: ["Yok", "Var, aşağıya yazıyorum"] },
    ],
  },
  {
    ad: "İngiltere",
    sorular: [
      { id: "i-pdf", s: "İngiltere için de Dubai ve KKTC'deki gibi bir teklif belgesi gelecek mi?", sik: ["Evet, göndereceğim", "Yok, sitedekiyle devam"] },
      { id: "i-fiyat", s: "Sitede İngiltere kuruluşu üç paketle duruyor: Basic 900, Gold 1.500, Platinium 2.600 dolar. Doğru mu?", sik: ["Doğru", "Paket yok, tek fiyat", "Yanlış, aşağıya yazıyorum"] },
      { id: "i-muh", s: "İngiltere muhasebe ücretini sitede nasıl yazalım?", sik: ["Yıllık sabit tutar", "Aylık tutar", "Fiyat yazmayalım"], ipucu: "Tutarı biliyorsanız yazın" },
      { id: "i-hesap", s: "Müşteriyi fiilen hangi hesapla başlatıyoruz?", cok: true, sik: ["Tide", "Revolut Business", "Wise Business", "Payoneer", "Geleneksel banka"] },
      { id: "i-basvuru", s: "Hesap başvurusunu kim yapıyor?", sik: ["Biz yapıyoruz", "Müşteri yapıyor, biz yönlendiriyoruz"] },
      { id: "i-ek", s: "İngiltere'de bunlardan hangilerini veriyoruz?", cok: true, sik: ["KDV kaydı ve beyanı", "Bordro (PAYE)", "Sponsor Licence", "Kayıtlı adres ve posta"] },
    ],
  },
  {
    ad: "Henüz açılmamış sayfalar",
    sorular: [
      { id: "s-hangi", s: "Bunlardan hangilerinin sayfası açılsın?", cok: true, sik: ["İngiltere şirket adresi", "İngiltere Sponsor Licence", "KKTC Serbest Bölge", "Kurumsal danışmanlık (İngiltere, KKTC)", "AML ve uyum (İngiltere, KKTC)", "Mevcut şirketi Ortac'a taşıma"] },
      { id: "s-tasima", s: "Başka bir firmadaki şirketi hangi ülkelerde devralıyoruz?", cok: true, sik: ["Dubai", "İngiltere", "KKTC"] },
      { id: "s-aml", s: "AML ve uyum hizmeti İngiltere ve KKTC'de ne kapsıyor?", ipucu: "Birkaç madde yeter; yoksa \"yok\" yazın" },
    ],
  },
  {
    ad: "Genel",
    sorular: [
      { id: "g-panel", s: "Müşteri paneli için sitede hangi adresi kullanalım?", ipucu: "\"Panel girişi\" ve kurulum akışının son adımı bu adrese gidecek" },
      { id: "g-wa", s: "Kurulum akışındaki WhatsApp düğmesi hangi numaraya gitsin?", sik: ["Sitedeki Dubai numarası (+971 5628 66 466)", "Başka numara, aşağıya yazıyorum"] },
      { id: "g-kvkk", s: "KVKK metni için: veri sorumlusunun tam unvanı ve başvuru e-postası ne olsun?" },
    ],
  },
];

const ANAHTAR = "ortac-teyit-sorular-v2";
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
    <main className="tsr">
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
