import FadeUp from "@/components/shared/FadeUp";
import { Flag } from "@/components/shared/CountryPicker";
import { CHAIN } from "@/lib/brand";
import { FOR_WHOM, SUMMARY, WHERE } from "@/lib/about";
import { SECTOR_ICON } from "@/components/lab/aboutBentoIcons";

/* ============================================================================
   LAB · ADAY 5 · "OYMA"
   Biçim: src/app/css/lab-hb5.css (ad alanı .hb5-)

   ------------------------------------------------------------------- FİKİR
   Bento bir kart dizisi değil, bir AFİŞ. Üç karonun her birinde tek bir dev
   rakam var ve rakam karonun içeriği değil YÜZEYİ: içinden ışık geçiyor,
   nesneler onun üstüne biniyor.

   ---------------------------------------------- IZGARA VERİNİN KENDİSİ
   Karoların genişliği keyfî değil, SAYDIKLARI ŞEYLE ORANTILI. Izgara
   3 + 5 + 6 = 14 sütun; ülke karosu 3, zincir karosu 5, sektör karosu 6 sütun
   kaplıyor. Yani bento hiçbir şey söylemeden "hangisi daha çok" bilgisini
   ızgaranın kendisiyle veriyor.

   Sıra da elle dizilmedi: karolar SAYIYA GÖRE artan sırada. Bir sektör
   eklendiğinde hem o karo genişliyor hem de gerekirse sıra değişiyor; hiçbir
   sayı, oran ya da sütun değeri bu dosyada yazılı değil.

   ----------------------------------------------------- NEDEN ANLATMIYOR
   Müşterinin teşhisi: aynı bilgiyi bento ve alt bölümler iki kez veriyor.
   Bu adayda blok üç karakter taşıyor — üç rakam, etiketsiz. Ülke adı yok,
   halka adı yok, sektör adı yok; hepsi sayfanın devamında kendi bölümünde,
   kendi cümlesiyle duruyor. Bento onların kapısı.

   ------------------------------------------ ANA SAYFA BENTOSUNDAN NE ALDI
   Eşit olmayan hücreyi ve ton karşıtlığını (ortadaki karo koyu). Almadığı şey
   yine anatomi: başlık, satır ve dipnot yok. Ana sayfada karonun mekaniği
   içeride bir panoydu; burada mekanik doğrudan TİPOGRAFİNİN kendisinde.

   ------------------------------------------------------------------ HAREKET
   İki mekanik ve ikisi de kesintisiz:
     · Rakamın gövdesinden geçen ışık. Durmuyor, tur boyunca akıyor (14,9 s).
     · On dört işaret sırayla bir tık yükseliyor (19,9 s). On dört nesne bir
       periyoda yayıldığı için ortalama her 1,4 saniyede bir şey oluyor.

   Yani ekran hiçbir an durmuyor, ama tek bir nesnenin yaptığı iş bir kaç
   piksel ve bir renk. Kuralın istediği denge bu: çok sayıda nesne varsa
   hareket minimal, dinamikleşme imlece bırakılmış.

   -------------------------------------------------------------- ERİŞİM
   Karo adları aria-label ile veriliyor ve o adlar uydurulmuyor: about.ts ·
   SUMMARY etiketleri. Ekranda yalnızca rakam görünüyor, işaretler
   aria-hidden — taşıdıkları bilgi karonun adında zaten var.
   ========================================================================= */

type Kutu = {
  k: string;
  n: number;
  /** Karoların altındaki işaretler. Sayıları n ile aynı; ikisi de aynı diziden. */
  isaret: React.ReactNode[];
};

export default function AboutBentoOyma() {
  const AD = Object.fromEntries(SUMMARY.map((s) => [s.k, s.label]));

  /* BAYRAK TUZAĞI: `Flag` width/height taşımayan çıplak bir <svg viewBox="0 0
     60 40"> döndürüyor; kabı ölçülmezse 300 × 150'ye açılıyor ve bu sayfa bir
     kez tam bu yüzden çöktü. .hb5-bayrak sabit piksel (lab-hb5.css). */
  const kutular: Kutu[] = [
    {
      k: AD.where,
      n: WHERE.countries.length,
      isaret: WHERE.countries.map((c) => (
        <span key={c.slug} className="hb5-mim hb5-bayrak">
          <Flag country={c.slug} />
        </span>
      )),
    },
    {
      k: AD.chain,
      n: CHAIN.length,
      /* Halkaların ADI yok: beşi de sayfanın 5. bölümünde tek tek, kendi
         cümleleriyle yazıyor. Burada yalnızca beş işaret var. */
      isaret: CHAIN.map((s) => <span key={s.key} className="hb5-mim hb5-halka" />),
    },
    {
      k: AD.sectors,
      n: FOR_WHOM.sectors.length,
      isaret: FOR_WHOM.sectors.map((s) => {
        const Icon = SECTOR_ICON[s.slug];
        return (
          <span key={s.slug} className="hb5-mim hb5-cip">
            {Icon ? <Icon size={18} strokeWidth={1.7} /> : null}
          </span>
        );
      }),
    },
  ].sort((a, b) => a.n - b.n);

  /* Izgaranın sütun ORANLARI dizilerden geliyor: "minmax(0, 3fr) minmax(0, 5fr)
     minmax(0, 6fr)". Elle yazılmış tek bir sayı yok — bir sektör eklendiğinde
     o karo kendiliğinden genişliyor.

     Değer doğrudan grid-template-columns'a değil bir DEĞİŞKENE yazılıyor:
     satır içi biçim medya sorgusunu ezerdi ve dar ekranda tek sütuna inen
     kural (lab-hb5.css) hiç çalışmazdı. Değişkeni yalnızca geniş ekran kuralı
     okuyor.

     `minmax(0, Nfr)`, çıplak `Nfr` DEĞİL: çıplak fr'nin auto minimum izi
     içeriğin min-content'ine kadar şişiyor ve bu depoda aynı hata dört
     ızgarada yatay kaymaya yol açtı. */
  const oran = kutular.map((b) => `minmax(0, ${b.n}fr)`).join(" ");

  /* İşaretlerin sıraya girme gecikmesi için karo başına BAŞLANGIÇ İNDEKSİ.
     Üç karonun on dört işareti tek bir dizi gibi dalgalanıyor; periyot CSS'te,
     burada yalnızca kaçıncı sırada olduğu.

     Değerler render'dan ÖNCE hesaplanıyor. İlk deneme map'in içinde bir sayacı
     artırıyordu ve bu depodaki eslint kuralı (react-hooks/immutability) onu
     reddediyor — haklı olarak: render sırasında dışarıdaki bir değişkeni
     değiştirmek, aynı ağacın iki kez render edilmesi hâlinde farklı sonuç
     üretir. Ön toplam saf bir ifade. */
  const fazlar = kutular.reduce<number[]>(
    (a, b, i) => [...a, i === 0 ? 0 : a[i - 1] + kutular[i - 1].n],
    [],
  );

  return (
    <section className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="hb5" style={{ "--hb5-oran": oran } as React.CSSProperties}>
          {kutular.map((b, i) => {
            const faz = fazlar[i];
            return (
              <FadeUp key={b.k} className="hb5-w" y={18} delay={0.06 + i * 0.08}>
                {/* Ortadaki karo koyu. Koşul DOM sırasına bakıyor, bir slug'a
                    değil: dizi sayıya göre sıralandığı için "ortadaki" hangi
                    karoysa o koyu oluyor ve ton karşıtlığı içerik değişse de
                    ızgaranın ortasında kalıyor. Sunucuda ve istemcide aynı
                    değer hesaplanıyor, hidrasyon farkı yok. */}
                <article
                  className={i === 1 ? "hb5-t hb5-t-dark" : "hb5-t"}
                  aria-label={`${b.n} ${b.k}`}
                  style={{ "--hb5-t": i, "--hb5-faz": faz } as React.CSSProperties}
                >
                  {/* Bloğun taşıdığı tek görünür metin. Etiketi yok. */}
                  <b className="hb5-n">{b.n}</b>
                  <span className="hb5-mimler" aria-hidden="true">
                    {b.isaret.map((el, k) => (
                      <span
                        key={k}
                        className="hb5-mimw"
                        style={{ "--hb5-k": k } as React.CSSProperties}
                      >
                        {el}
                      </span>
                    ))}
                  </span>
                </article>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
