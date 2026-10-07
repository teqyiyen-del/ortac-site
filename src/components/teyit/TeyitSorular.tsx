"use client";

/* MURAT BEY'E AÇIK UÇLU SORULAR · /teyit/kktc (07.10.2026)
   Burak: "bu soruları bir PDF olarak hazırla ya da HTML'den cevapları
   kopyala işi mi yapalım yine, sen bilirsin." HTML seçildi: Murat Bey
   telefonda açıyor, her sorunun altına yazıyor, tek düğmeyle hepsini
   kopyalayıp WhatsApp'a yapıştırıyor. PDF'te cevap yazılamıyor.

   /teyit'teki liste doğru / yanlış işaretlemek içindi (TeyitListesi);
   bunlar açık soru, o yüzden ayrı ve küçük bir bileşen. Yazılanlar
   tarayıcıda saklanıyor (sayfa kapanırsa kaybolmasın); saklama
   çalışmazsa sayfa yine çalışıyor. Hiçbir şey sunucuya gitmiyor. */

import "@/app/css/teyit-soru.css";
import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import Logo from "@/components/shared/Logo";

const GRUPLAR: { ad: string; sorular: string[] }[] = [
  {
    ad: "KKTC · Muhasebe",
    sorular: [
      "KKTC şirketinin defterini kim imzalıyor? Sayfaya \"defterinizi imzalayan\" kutusu koyalım mı, KKTC için bir cümleniz olur mu?",
      "Yıllık hesap ve beyan hangi ayda veriliyor? Geç kalınırsa ceza var mı?",
      "Her yıl tam olarak ne veriliyor: beyanname, bilanço, denetçi raporu? Denetçi raporu 270 € / 900 € ücrete dahil mi?",
      "Yıllık faaliyet harcı ve adres yenilemesi ne zaman, ne kadar?",
      "Başka bir ofisteki KKTC şirketinin muhasebesini devralıyor muyuz? Adres ve temsilci de bize mi geçiyor?",
      "Belgeler bize hangi yoldan geliyor (müşteri paneli, e-posta)? Müşteriye rapor dönüyor muyuz?",
      "\"Standart kapsam\" ayda kaç işleme kadar? (Dubai'de 500.)",
    ],
  },
  {
    ad: "KKTC · Banka ve ödeme",
    sorular: [
      "Banka hesabı kabaca ne kadar sürede açılıyor? Şahsen gitmek her bankada şart mı?",
      "Türkiye bankasında hesap hangi durumda mümkün oluyor?",
      "Sanal POS (Tiko) için aranan şart var mı (site, ciro, sektör)? Adını sayfada yazmaya devam edelim mi?",
      "Yurt dışından gelen dövizde müşterinin bilmesi gereken sınır ya da masraf var mı?",
    ],
  },
  {
    ad: "Dubai · Fiyat",
    sorular: [
      "2. ve 3. yıl lisans fiyatı ne kadar? IFZA, Meydan ve DWTC için ayrı ayrı. (Sitede şu an yer tutucu rakam var.)",
    ],
  },
];

const ANAHTAR = "ortac-teyit-sorular-v1";

export default function TeyitSorular() {
  const [cevap, setCevap] = useState<Record<string, string>>({});
  const [kopya, setKopya] = useState<"" | "ok" | "yok">("");

  useEffect(() => {
    try {
      const h = window.localStorage.getItem(ANAHTAR);
      // saklanan cevap yalnız istemcide: ilk boyamadan sonra okunuyor (TeyitListesi'yle aynı kalıp)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (h) setCevap(JSON.parse(h) as Record<string, string>);
    } catch {
      /* saklama kapalı: boş başlıyor */
    }
  }, []);

  const yaz = (k: string, v: string) => {
    const yeni = { ...cevap, [k]: v };
    setCevap(yeni);
    try {
      window.localStorage.setItem(ANAHTAR, JSON.stringify(yeni));
    } catch {
      /* saklama kapalı */
    }
  };

  let no = 0;
  const duz = GRUPLAR.flatMap((g) => g.sorular.map((s) => ({ g: g.ad, s, n: ++no })));
  const dolu = duz.filter((x) => (cevap[String(x.n)] ?? "").trim()).length;

  const kopyala = async () => {
    const metin = GRUPLAR.map((g) => {
      const satirlar = duz
        .filter((x) => x.g === g.ad)
        .map((x) => `${x.n}. ${x.s}\nCevap: ${(cevap[String(x.n)] ?? "").trim() || "(boş)"}`);
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
          <h1>Murat Bey, on iki kısa soru.</h1>
          <p>Her sorunun altına yazın, sonra en alttaki düğmeyle hepsini kopyalayıp WhatsApp&apos;tan Burak&apos;a gönderin. Bilmediğinizi boş bırakabilirsiniz.</p>
        </header>

        {GRUPLAR.map((g) => (
          <section key={g.ad} className="tsr-grup">
            <h2>{g.ad}</h2>
            <ol>
              {duz
                .filter((x) => x.g === g.ad)
                .map((x) => (
                  <li key={x.n}>
                    <label htmlFor={`tsr-${x.n}`}>
                      <b>{x.n}</b>
                      <span>{x.s}</span>
                    </label>
                    <textarea
                      id={`tsr-${x.n}`}
                      rows={2}
                      placeholder="Cevabınız"
                      value={cevap[String(x.n)] ?? ""}
                      onChange={(e) => yaz(String(x.n), e.target.value)}
                    />
                  </li>
                ))}
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
