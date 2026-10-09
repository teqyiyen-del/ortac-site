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
/* 10.10.2026 · İKİNCİ TUR. İlk 31 sorunun cevabı 09.10'da geldi ve siteye
   işlendi (docs/durum.md · 09.10 (3)); o sorular buradan çıktı. Kalanlar:
   cevapların açık bıraktıkları, yeni iş ortaklığı sayfası ve üç yeni blog
   yazısının yazarken doğrulanamayan noktaları. */
const GRUPLAR: { ad: string; sorular: Soru[] }[] = [
  {
    ad: "Fiyat",
    sorular: [
      { id: "f-lisans", s: "IFZA'daki 5.120 doların tamamı lisans bedeli mi? Çok yıllı indirimi (2 yıl %15, 3 yıl %20, 5 yıl %30) bu tutarın tamamına uyguladık.", sik: ["Evet, tamamı lisans", "Hayır, içinde indirime girmeyen bir pay var"], ipucu: "Pay varsa tutarını yazın. Sitede örnek: IFZA 2 yıl = 2 × 5.120 × 0,85 = 8.704 $." },
      { id: "f-uk", s: "İngiltere'nin tek kuruluş fiyatı sterlin olarak ne kadar?", ipucu: "Sitede şu an rakam yok, \"tek fiyat, teklifte bildiriyoruz\" yazıyor." },
      { id: "f-kyil", s: "KKTC'de ikinci yıldan itibaren adres ve temsilcilik (2.000 € + KDV) ile 2.700 € harç aynı tutarla mı yenileniyor?", sik: ["Evet, aynı", "Hayır, aşağıya yazıyorum"] },
    ],
  },
  {
    ad: "İletişim",
    sorular: [
      { id: "i-wa", s: "Kurulum akışından gelenler WhatsApp'ta hangi numaraya yazsın? (İlk turda \"aşağıya yazıyorum\" demiştiniz, numara gelmedi.)" },
      { id: "i-panel", s: "Yeni müşteri paneli adresi nedir? Kıbrıs ve Dubai için ayrı portal olduğunu yazmıştınız.", ipucu: "İki adresi de yazabilirsiniz." },
    ],
  },
  {
    ad: "İş ortaklığı sayfası",
    sorular: [
      { id: "o-white", s: "İş ortağı hizmeti kendi markasıyla sunabiliyor mu (white-label)? Tarifinizde geçmediği için sayfadan çıkardık.", sik: ["Evet, var", "Hayır, yalnız yönlendirme"] },
      { id: "o-panel", s: "Ortak panelinde ortak neyi görecek?", cok: true, sik: ["Dosyanın hangi adımda olduğu", "Yüklenen belgeler", "Ödeme durumu", "Müşteriyle yazışmalar"], ipucu: "Sayfa şu an \"tanımlanan yetkiyle\" diyor, ayrıntı vermiyor." },
      { id: "o-bugun", s: "Panel hazır olana kadar süreç adımları ortakla nasıl paylaşılıyor?", sik: ["E-posta", "WhatsApp", "Müşteri panelinden", "Bugün paylaşmıyoruz"] },
      { id: "o-adim", s: "Sayfadaki örnek dosya adımları doğru mu: evrak, kuruluş başvurusu, şirket tescili, banka başvurusu, muhasebe?", sik: ["Doğru", "Düzeltme var, aşağıya yazıyorum"] },
      { id: "o-rakam", s: "İş ortaklığı sayfasında \"700'den fazla şirket\" ve \"300 civarı aktif muhasebe müşterisi\" yazsın mı?", sik: ["Yazsın", "Yalnız 700 yazsın", "Yazmasın"] },
    ],
  },
  {
    ad: "KKTC",
    sorular: [
      { id: "k-sermaye", s: "İki ortak da Türkiye vatandaşıysa 25.000 € sermayenin tamamı mı bloke ediliyor?", sik: ["Evet, tamamı", "Hayır, aşağıya yazıyorum"], ipucu: "Yeni blog yazısında örnek olarak geçiyor." },
      { id: "k-yerel", s: "KKTC'de yerel (iç piyasa) limited şirket de kuruyor muyuz, yalnız Serbest Liman şirketi mi?", sik: ["Yalnız Serbest Liman", "İkisini de kuruyoruz"] },
      { id: "k-depo", s: "Yalnız hizmet satan Serbest Liman şirketinden Gazimağusa'da fiilî faaliyet ya da depo isteniyor mu?", sik: ["İstenmiyor", "İsteniyor, aşağıya yazıyorum"] },
      { id: "k-pazar", s: "Amazon ve Etsy KKTC şirketini satıcı olarak kabul etmiyor diye yazdık. Doğru mu?", sik: ["Doğru", "Yanlış, aşağıya yazıyorum"] },
    ],
  },
  {
    ad: "Dubai",
    sorular: [
      { id: "d-mainland", s: "Dubai'de mainland şirket kuruluşu da yapıyor muyuz?", sik: ["Evet", "Hayır, yalnız serbest bölge"], ipucu: "Yeni \"serbest bölge mi, mainland mi\" yazısı için." },
      { id: "d-icpazar", s: "Serbest bölge şirketi BAE iç pazarına nasıl satış yapıyor? İlk teyitte \"sorunsuz satabiliyor\" demiştiniz; resmî portal dağıtıcı, şube ya da izin gerektiğini yazıyor.", sik: ["Hizmet faturası serbest, mal için izin gerekir", "İzin ya da şube şart", "Başka, aşağıya yazıyorum"], ipucu: "Yeni yazıda resmî kuralı yazdık; sizin uygulamanız farklıysa düzeltelim." },
      { id: "d-fiyat", s: "Meydan 5.300 $ ve DWTC 5.820 $ rakamlarını teklifteki toplamdan geri hesapladık. Doğru mu?", sik: ["Doğru", "Düzeltme var, aşağıya yazıyorum"] },
      { id: "d-ceza", s: "Geç beyan cezası rakamını (ayda 500, sonra 1.000 AED) siteden çıkardık. Güncel rakamı yazmak ister misiniz?", sik: ["Yazmayalım", "Yazalım, aşağıya yazıyorum"] },
    ],
  },
  {
    ad: "AML ve uyum sayfası",
    sorular: [
      { id: "a-metin", s: "AML sayfasının yazılarını sevmediğinizi yazmıştınız. Neyi değiştirelim?", cok: true, sik: ["Çok uzun, kısalsın", "Dili fazla teknik", "Anlatılan hizmet bizim yaptığımızla uyuşmuyor", "Başlıklar değişsin"], ipucu: "Aklınızdaki cümle ya da örnek varsa yazın." },
    ],
  },
];

const ANAHTAR = "ortac-teyit-sorular-2-v1";
type Cevap = { sec: string[]; yazi: string };
const BOS: Cevap = { sec: [], yazi: "" };

export default function TeyitSorular2() {
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
