/* ============================================================================
   IFZA FAALİYET KODU BULUCU · veri ve arama (06.10.2026 · TABAN)
   ============================================================================
   Burak: "IFZA'daki tüm aktiviteleri kendi arşivine alan ve kişilere yapmak
   istedikleri işe göre aktivite kodu veren, eşleştiren bir araç eklemek
   istiyoruz araçlar kısmına; onun bir base'ini inşa et."

   ARŞİV. Liste IFZA'nın kendi faaliyet sayfasından (activities.ifza.com)
   çekilip depoya yazıldı: lib/tools/ifza-veri.json, 827 faaliyet. Araç
   çalışırken IFZA'ya gitmiyor. Yenileme: `node scripts/ifza-cek.mjs`.
   Ad ve açıklamalar IFZA'nın İngilizce yazımı, ÇEVRİLMEDİ (resmî metin).

   EŞLEŞTİRME (taban). Kişi işini Türkçe ya da İngilizce yazıyor:
     1) Türkçe kelimeler aşağıdaki küçük sözlükle İngilizce arama
        terimlerine çevriliyor (sözlük bizim, resmî çeviri değil);
     2) terimler faaliyet ADINDA ve AÇIKLAMASINDA kelime başından aranıyor;
        adda geçen açıklamada geçenden ağır basıyor;
     3) rakam yazılırsa kod önekiyle aranıyor.
   Sonraki adım (yapılmadı): serbest metinden anlam eşleştirme (yapay zekâ).
   O bir sunucu rotası ve API anahtarı ister; anahtar koda yazılmaz.

   Bu dosya bileşene `import()` ile ayrı parça olarak geliyor (JSON ~270 KB,
   sıkıştırılmış ~76 KB): öteki araç sayfalarına inmiyor.
   ========================================================================= */

import veri from "./ifza-veri.json";

export type IfzaSatir = {
  kod: string;
  ad: string;
  /** C ticari lisans · P profesyonel lisans */
  tur: "C" | "P";
  aciklama: string;
  /** ek onay isteyen kurumlar (yoksa boş) */
  onay: string[];
  /** B lisanstan önce · A lisanstan sonra · "" onay yok */
  onayZamani: "B" | "A" | "";
  not: string;
};

type Ham = [string, string, string, string, string[], string, string];

export const IFZA_CEKIM: string = veri.cekim;
export const IFZA_KAYNAK: string = veri.kaynak;

/** Türkçe karakterleri ve büyük harfi düzleyen yalın biçim. */
export function yalin(s: string): string {
  return s
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const SATIRLAR: (IfzaSatir & { _ad: string; _ac: string })[] = (veri.satirlar as unknown as Ham[]).map((h) => ({
  kod: h[0],
  ad: h[1],
  tur: h[2] === "P" ? "P" : "C",
  aciklama: h[3],
  onay: h[4],
  onayZamani: h[5] === "B" || h[5] === "A" ? h[5] : "",
  not: h[6],
  _ad: ` ${yalin(h[1])}`,
  _ac: ` ${yalin(h[3])}`,
}));

/* TÜRKÇE → İNGİLİZCE ARAMA TERİMLERİ. Anahtar yalın (düz harf) yazılı ve
   kelime BAŞINDAN eşleşiyor ("danisman" → danışman, danışmanlık). Değerler
   IFZA metninde gerçekten geçen kelimeler (06.10.2026 arşivinde sayıldı).
   Sözlük küçük ve bilerek öyle: sık kurulan iş türleri. Genişletmek tek
   satır. */
const SOZLUK: [tr: string, en: string[]][] = [
  ["yazilim", ["software", "computer", "information technology"]],
  ["bilisim", ["information technology", "computer", "software"]],
  ["teknoloji", ["technology", "software"]],
  ["web", ["web", "portal", "internet"]],
  ["uygulama", ["software", "application"]],
  ["oyun", ["game"]],
  ["e ticaret", ["e-commerce", "portal", "online", "internet"]],
  ["eticaret", ["e-commerce", "portal", "online", "internet"]],
  ["online satis", ["online", "portal", "internet"]],
  ["danisman", ["consultancy", "consulting", "consultant"]],
  ["yonetim", ["management"]],
  ["pazarlama", ["marketing"]],
  ["reklam", ["advertising", "advertisement"]],
  ["sosyal medya", ["social media"]],
  ["medya", ["media"]],
  ["tasarim", ["design"]],
  ["grafik", ["design", "graphic"]],
  ["ic mimar", ["interior"]],
  ["mimar", ["architectural", "architecture"]],
  ["muhendis", ["engineering"]],
  ["insaat", ["construction", "building"]],
  ["yapi malzeme", ["building materials", "construction materials"]],
  ["emlak", ["real estate"]],
  ["gayrimenkul", ["real estate"]],
  ["ticaret", ["trading", "trade"]],
  ["genel ticaret", ["general trading"]],
  ["dis ticaret", ["trading", "import", "export"]],
  ["ithalat", ["import", "trading"]],
  ["ihracat", ["export", "trading"]],
  ["toptan", ["trading", "wholesale"]],
  ["gida", ["food", "foodstuff"]],
  ["restoran", ["restaurant"]],
  ["kafe", ["cafe", "coffee"]],
  ["kahve", ["coffee"]],
  ["tekstil", ["textile", "garments", "clothes"]],
  ["giyim", ["garments", "clothes", "clothing"]],
  ["hazir giyim", ["garments", "readymade"]],
  ["ayakkabi", ["shoes", "footwear"]],
  ["mucevher", ["jewellery", "jewelry", "gold"]],
  ["kuyum", ["jewellery", "gold"]],
  ["altin", ["gold"]],
  ["kozmetik", ["cosmetics", "beauty", "perfumes"]],
  ["parfum", ["perfumes"]],
  ["guzellik", ["beauty"]],
  ["mobilya", ["furniture"]],
  ["elektronik", ["electronic", "electronics"]],
  ["telefon", ["phones", "mobile"]],
  ["bilgisayar", ["computer"]],
  ["otomotiv", ["vehicles", "auto", "cars"]],
  ["araba", ["cars", "vehicles", "auto"]],
  ["arac", ["vehicles", "cars"]],
  ["yedek parca", ["spare parts"]],
  ["lojistik", ["logistics", "cargo", "freight"]],
  ["kargo", ["cargo"]],
  ["nakliye", ["cargo", "freight", "transport"]],
  ["tasimacilik", ["transport", "cargo", "freight"]],
  ["denizcilik", ["marine", "ship", "shipping"]],
  ["yat", ["yacht", "boats"]],
  ["turizm", ["tourism", "travel"]],
  ["seyahat", ["travel"]],
  ["otel", ["hotel"]],
  ["etkinlik", ["event", "events"]],
  ["organizasyon", ["event", "events"]],
  ["egitim", ["training", "educational", "education"]],
  ["kurs", ["training"]],
  ["kocluk", ["coaching", "training"]],
  ["saglik", ["health", "medical"]],
  ["medikal", ["medical"]],
  ["tibbi", ["medical"]],
  ["ilac", ["pharmaceutical", "medicines"]],
  ["spor", ["sports", "sport", "fitness"]],
  ["fitness", ["fitness"]],
  ["yatirim", ["investment"]],
  ["holding", ["holding", "investment"]],
  ["finans", ["financial", "finance"]],
  ["muhasebe", ["accounting", "bookkeeping", "auditing"]],
  ["hukuk", ["legal"]],
  ["avukat", ["legal"]],
  ["ceviri", ["translation"]],
  ["tercume", ["translation"]],
  ["insan kaynak", ["human resources", "recruitment"]],
  ["ise alim", ["recruitment"]],
  ["komisyon", ["commission", "broker", "brokerage"]],
  ["aracilik", ["broker", "brokerage", "commission"]],
  ["fotograf", ["photography", "photographic"]],
  ["film", ["film", "production"]],
  ["produksiyon", ["production", "film"]],
  ["yayin", ["publishing", "broadcasting"]],
  ["matbaa", ["printing"]],
  ["baski", ["printing"]],
  ["temizlik", ["cleaning"]],
  ["guvenlik", ["security"]],
  ["enerji", ["energy", "power"]],
  ["petrol", ["oil", "petroleum"]],
  ["tarim", ["agricultural", "agriculture"]],
  ["kimya", ["chemical", "chemicals"]],
  ["arastirma", ["research"]],
  ["oyuncak", ["toys"]],
  ["evcil hayvan", ["pet", "pets"]],
  ["cicek", ["flowers"]],
  ["sanat", ["art", "artistic"]],
  ["kripto", ["crypto", "digital assets"]],
];

export const IFZA_SIK = ["yazılım", "e-ticaret", "danışmanlık", "genel ticaret", "pazarlama", "lojistik", "gıda", "holding"];

export type IfzaSonuc = {
  kip: "bos" | "kisa" | "kod" | "metin";
  satirlar: IfzaSatir[];
  /** sözlükten gelen İngilizce terimler (ekranda "şunlarla arandı" diye) */
  terimler: string[];
};

/** kelime başından eşleşme: " software" → " software trading" */
const gecer = (metin: string, terim: string) => metin.includes(` ${terim}`);

export function ifzaAra(sorgu: string): IfzaSonuc {
  const q = yalin(sorgu);
  if (!q) return { kip: "bos", satirlar: [], terimler: [] };
  if (/^[0-9 ]+$/.test(q)) {
    const on = q.replace(/ /g, "");
    return { kip: "kod", satirlar: SATIRLAR.filter((s) => s.kod.startsWith(on)), terimler: [] };
  }
  if (q.length < 2) return { kip: "kisa", satirlar: [], terimler: [] };

  /* 1) sözlük: sorgunun içinde geçen her Türkçe anahtar bir KAVRAM grubu.
        Uzun anahtar kısayı yutar: "e ticaret" yazınca "ticaret" ayrıca
        sayılmaz (yoksa bütün "trading" faaliyetleri öne dolardı). */
  const qb = ` ${q}`;
  const eslesen = SOZLUK.filter(([tr]) => qb.includes(` ${tr}`));
  const gruplar = eslesen
    .filter(([tr]) => !eslesen.some(([o]) => o !== tr && o.includes(tr)))
    .map(([, en]) => en.map(yalin));
  /* 2) yazılanın kendisi (İngilizce yazan için): 3+ harfli her kelime de
        kendi başına bir kavram */
  const dogrudan = q.split(" ").filter((k) => k.length >= 3);

  const puanli: { s: IfzaSatir; p: number }[] = [];
  for (const s of SATIRLAR) {
    let p = 0;
    let kavram = 0;
    for (const g of gruplar) {
      const enIyi = Math.max(0, ...g.map((t) => (gecer(s._ad, t) ? 6 : gecer(s._ac, t) ? 2 : 0)));
      if (enIyi > 0) kavram++;
      p += enIyi;
    }
    for (const t of dogrudan) {
      const v = gecer(s._ad, t) ? 5 : gecer(s._ac, t) ? 1 : 0;
      if (v > 0) kavram++;
      p += v;
    }
    /* birden fazla kavramı birlikte karşılayan faaliyet öne ("emlak
       danışmanlığı": hem real estate hem consultancy geçen satır başta);
       ek onay istemeyen faaliyet aynı puanda öne geçer */
    if (p > 0) puanli.push({ s, p: p + (kavram - 1) * 10 + (s.onay.length === 0 ? 0.5 : 0) });
  }
  puanli.sort((a, b) => b.p - a.p || a.s.kod.localeCompare(b.s.kod));
  return { kip: "metin", satirlar: puanli.map((x) => x.s), terimler: [...new Set(gruplar.flat())] };
}

export const IFZA = { ara: ifzaAra, toplam: SATIRLAR.length, cekim: IFZA_CEKIM };
export type IfzaMotor = typeof IFZA;
