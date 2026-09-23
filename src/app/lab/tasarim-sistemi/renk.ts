/* ============================================================================
   RENK ÖNERİSİ · /lab/tasarim-sistemi — veri (23.09.2026, rehber soru 8-15)
   Ölçüm: İngiltere sayfası (ekranda hesaplanmış renk, gerçek zemin,
   kontrast) + kod sayımı (docs/design-system/denetim.md). Canlı denemesi
   css/ds-renk.css ([data-ds-renk], /ingiltere). "simdi" = bu token'ın
   yerine geçtiği bugünkü değerler. "kontrast" = en sık zemininde, WCAG.
   ========================================================================== */

export type RenkSatir = {
  token: string;
  deger: string;
  rol: string;
  simdi?: string;
  kontrast?: string;
  koyu?: boolean; // örnek koyu zemin üstünde
  yazi?: boolean; // örnek yazı olarak basılsın
};

export const RENK_GRUPLAR: { baslik: string; aciklama: string; satirlar: RenkSatir[] }[] = [
  {
    baslik: "Zemin",
    aciklama: "Beş zemin zaten derli toplu; yalnız adları rolüne göre.",
    satirlar: [
      { token: "--bg", deger: "#ffffff", rol: "sayfa, kart" },
      { token: "--bg-soft", deger: "#f5f5f5", rol: "alternatif bölüm, kuyu, açık zeminde hover" },
      { token: "--bg-dark", deger: "#080808", rol: "koyu bölüm, hero, fiyat" },
      { token: "--bg-dark-2", deger: "#111111", rol: "koyu zemin üstündeki kart", simdi: "+ #191919 (19 yer)" },
    ],
  },
  {
    baslik: "Metin · açık zemin",
    aciklama: "İngiltere'de zaten iki renk. Üçüncüsü yalnız okunması şart olmayan küçük şeyler için.",
    satirlar: [
      { token: "--text", deger: "#080808", rol: "başlık, ana metin", kontrast: "17,6", yazi: true },
      { token: "--text-2", deger: "#5c5c5c", rol: "açıklama, ikincil metin", kontrast: "6,7", yazi: true },
      {
        token: "--text-3",
        deger: "#767676",
        rol: "sayaç, eksen, yer tutucu",
        simdi: "#9a9a9a (41 yer, 2,8:1) · #9d9d9d · #8c8c8c · #8a8a8a · #9c9c9c",
        kontrast: "4,5",
        yazi: true,
      },
    ],
  },
  {
    baslik: "Metin · koyu zemin",
    aciklama: "En dağınık yer: aynı işe 13 beyaz saydamlığı ve 6 düz gri. Üç kademeye iniyor.",
    satirlar: [
      { token: "--on-dark", deger: "#ffffff", rol: "başlık, düğme, seçili", simdi: ".86 · .88 · .9", kontrast: "19,8", koyu: true, yazi: true },
      {
        token: "--on-dark-2",
        deger: "rgba(255,255,255,.62)",
        rol: "açıklama, hero cümlesi, SSS cevabı (eski sönüklüğe yakın)",
        simdi: ".66 · .7 · .72 · .76 · #a6a6a6 · #9a9a9a · #9aa0aa",
        kontrast: "8,0",
        koyu: true,
        yazi: true,
      },
      {
        token: "--on-dark-3",
        deger: "rgba(255,255,255,.5)",
        rol: "not, etiket, yasal satır",
        simdi: ".4 (3,8:1) · .42 · .45 · .55 · .58 · #8a8a8a · #7d7d7d · #9c9c9c",
        kontrast: "5,2",
        koyu: true,
        yazi: true,
      },
    ],
  },
  {
    baslik: "Çizgi",
    aciklama: "Açıkta bir yumuşak bir belirgin, koyuda aynısı.",
    satirlar: [
      { token: "--line", deger: "#e6e6e6", rol: "kart kenarı, ayraç" },
      { token: "--line-strong", deger: "#cccccc", rol: "hover kenarı, form alanı", simdi: "#d4d7db · #d7dbe0 · #c9ccd0" },
      { token: "--line-dark", deger: "#262626", rol: "koyu kart kenarı", simdi: "#1f1f1f · #242424 · #2e2e2e", koyu: true },
      { token: "--line-dark-strong", deger: "rgba(255,255,255,.2)", rol: "koyu zeminde hayalet düğme", simdi: ".16 · .22", koyu: true },
    ],
  },
  {
    baslik: "Marka mavisi",
    aciklama: "#307fe2 beyaz üstünde 4,0:1: büyük yazıda ve grafikte serbest, 18 px altı yazıda değil.",
    satirlar: [
      { token: "--blue", deger: "#307fe2", rol: "vurgu kelime (büyük başlık), grafik, ikon, seçili kenar", kontrast: "4,0 · büyük yazı", yazi: true },
      { token: "--blue-hover", deger: "#2468c4", rol: "mavi düğmenin hover'ı (zemini #307fe2'de kalıyor)" },
      { token: "--blue-ink", deger: "#1b56a8", rol: "küçük mavi yazı, bağlantı", simdi: "#307fe2 12-14 px (3,5:1)", kontrast: "7,0", yazi: true },
      { token: "--blue-on-dark", deger: "#5c9eeb", rol: "koyu zeminde mavi yazı ve ikon", simdi: "#7fb3f0", kontrast: "7,2", koyu: true, yazi: true },
      { token: "--blue-100", deger: "#e8f1fd", rol: "mavi zeminli rozet, seçili satır" },
    ],
  },
  {
    baslik: "Vurgu renkleri",
    aciklama: "Beğendiğin çok renkli hava bunlardan: her renkte 100 zemin, 600 grafik ve büyük rakam, 700 küçük yazı.",
    satirlar: [
      { token: "--green-100", deger: "#e6f6ec", rol: "olumlu zemin (vergi yok, açık)" },
      { token: "--green-600", deger: "#1e8a54", rol: "grafik, 24 px üstü rakam, ikon", kontrast: "3,9 · büyük yazı", yazi: true },
      { token: "--green-700", deger: "#16704a", rol: "küçük yeşil yazı", simdi: "#1e8a54 12 px (3,9:1)", kontrast: "6,1", yazi: true },
      { token: "--amber-100", deger: "#fcf1de", rol: "dikkat zemini (şart, ceza)", simdi: "+ #fdf3d6 (kripto)" },
      { token: "--amber-600", deger: "#b26a00", rol: "grafik, 24 px üstü rakam, ikon", kontrast: "3,8 · büyük yazı", yazi: true },
      { token: "--amber-700", deger: "#8a5200", rol: "küçük amber yazı", simdi: "#b26a00 12 px (3,8:1) · #7a5600", kontrast: "6,4", yazi: true },
      { token: "--red-100", deger: "#fdeaea", rol: "hata, yok zemini" },
      { token: "--red-600", deger: "#c33b3b", rol: "hata, açılmıyor", kontrast: "5,3", yazi: true },
    ],
  },
];
