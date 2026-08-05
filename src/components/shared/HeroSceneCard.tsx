"use client";

import { useCallback, useEffect, useState } from "react";

/* ============================================================================
   HERO SAHNE KARTI — SİTENİN TEK HERO KARTI İSKELETİ
   CSS: src/app/css/hero.css · ".hkc- · HERO SAHNE KARTI" bölümü

   Bu dosya BİR STANDART. Hero'nun sağında duran kartın ölçüleri, davranışı ve
   erişilebilirliği yalnızca burada ve o CSS bloğunda tanımlı. Bugün iki sayfa
   kullanıyor:
     /dubai · /ingiltere · /kktc  → components/shared/HeroDubaiCards.tsx (.dhs-)
     /dubai/muhasebe              → components/services/AccountingHeroCard.tsx
                                     (.svmk-)
   Bütün hizmet ve ülke sayfalarında aynı kart kullanılacak; üçüncü, dördüncü,
   onuncu sayfa da bunu çağıracak.

   ---------------------------------------------------------------- NEDEN VAR
   İki kart ayrı ayrı yazılmıştı ve şimdiden ayrışmışlardı. 1440px'te ölçülen
   (ikisi de 550.8×604, aynı dolgu, aynı paylar):

       katman        kuruluş   muhasebe
       sahne         379.5     339.5     −40
       ad+açıklama    64        86       +22
       şerit          26        44       +18
       künye          32.5      32.5       0

   Kart yüksekliği ikisinde de 604'e sabitlenmiş, sahne kutusu da
   `flex: 1 1 auto` ile ARTAN YERİ alıyordu. Yani alt katmanlardan biri
   büyüdüğünde bedelini sahne ödüyordu: muhasebe kartı şeride 18, ad kutusuna
   22 piksel verip sahneden 40 piksel almıştı. Müşterinin gördüğü "kartın
   bütününü daha iyi dolduruyor" farkı tam olarak bu.

   ÇÖZÜMÜN YÖNÜ TERSİNE ÇEVRİLDİ: artık DÖRT KATMANIN DÖRDÜ DE SABİT, kartın
   yüksekliği onlardan DOĞUYOR. Bir katman büyürse kart uzar; sahne asla
   kısalmaz. Ölçü tek yerde (hero.css · .hkc- bloğu) ve iki sayfa da birebir
   aynı sayıları alıyor.

   ------------------------------------------------- ÜÇÜNCÜ BİR SAYFA EKLEMEK
   YENİ CSS YAZILMAZ. Yapılacak tek şey:
     1. Sayfanın kendi çizimleri için bir palet ad alanı seç (.xyz-) ve
        yalnızca RENK kurallarını yaz — ölçü kuralı yazma.
     2. Çizimleri <svg className="hkc-art" viewBox="0 0 440 320"> ile bas.
     3. Bu bileşeni çağır: <HeroSceneCard ns="xyz" scenes={...} foot={...} />
   Sahne kutusunun, ad kutusunun, şeridin ve künyenin ölçüsüne DOKUNMA. Bir
   sayfa "bana biraz daha yer lazım" diyorsa cevap kartı değil METNİ
   kısaltmaktır: ad kutusu iki satırlık açıklamaya göre ölçüldü (aşağıda), üç
   satır tasarımın sınırının dışında.

   ------------------------------------------------------------ viewBox ORANI
   Sahne kutusu 380px yüksek ve 1440px'te iç genişliği 470.8px. Çizimin oranı
   1.24–1.38 aralığındaysa kutuyu neredeyse tam dolduruyor; bugünkü ikisi bu
   aralıkta (kuruluş 440×340 = 1.294 · muhasebe 440×320 = 1.375). Daha kare bir
   viewBox kutunun sağında solunda boşluk bırakır. Yeni çizim bu iki orandan
   birini kullansın.

   --------------------------------------------- MÜŞTERİNİN ANİMASYON POLİTİKASI
   Müşteri (bu turda yazıldı, sonraki turlar buradan okusun):
     "yaşayan animasyon konusunda eğer ekranda çok svg kısım varsa yine
      hepsinde olsun animasyon ama daha minimal şeyler olur, üstüne gelince
      daha dinamikleşir. sayfada tek ya da 2 tane fln şey gözüküyorsa onlarda
      olabildiğince fazla olabilir kendini belli edip sayfada dikkat çekmesi
      için."
   HERO KARTI "OLABİLDİĞİNCE FAZLA" KATEGORİSİNDE: sayfada tek başına duran bir
   sahne, ekranın yarısı. Bugünkü yaşayan döngüler (kuruluşta beş sahnenin
   kendi hareketi, muhasebede dört bölmenin sürekli döngüsü) bu politikaya
   uyuyor — AZALTILMAYACAK. Politikanın sitenin geri kalanına yayılması ayrı
   bir turun işi; bu kart oranın üst ucunda kalır.

   ------------------------------------------------------- HİDRASYON KURALI
   useReducedMotion KULLANILMIYOR. Bu depoda beş ayrı kalıpta hidrasyon hatası
   çıkardı (sunucuda null, istemcide boolean). Hareket tercihi YALNIZCA
   useEffect içinde, matchMedia ile okunuyor ve render ağacına hiç girmiyor:
   sunucu ile ilk istemci render'ı bayt bayt aynı işaretlemeyi üretiyor, fark
   yalnızca zamanlayıcının kurulup kurulmadığı. Durum değişkenlerinin dördü de
   (active=0, rewinding=false, hovered=false, taken=false) iki tarafta aynı
   başlıyor.
   Giriş animasyonu da JS'te değil CSS'te (hkcIn) ve yalnızca
   `prefers-reduced-motion: no-preference` altında TANIMLI — `animation: none`
   ile geri alınmıyor, hiç tanımlanmıyor. Ölçülebilir farkı: reduce açıkken
   getAnimations() bu karttan SIFIR döndürüyor.

   ------------------------------------------------------------ ERİŞİLEBİLİRLİK
   ŞERİTTEKİ AD aria-label'DAN GELİR, GİZLİ <span>'DEN DEĞİL. Labda önce görsel
   olarak gizlenmiş metin (1px kutu + clip-path) denendi; ÖLÇÜLDÜ VE TUTMADI —
   erişilebilirlik ağacında düğmelerin dördü de ADSIZ çıktı. aria-label çözdü.
   İKİSİ BİRDEN KONULMAZ: aria-label var olan içeriği zaten ezer, gizli metin
   ölü bir kopya olur ve zamanla asıldan ayrı düşer. Ad tek yerden geliyor:
   `scenes[].word` — kartın üstündeki 30 puntoluk başlığı basan alanın aynısı.
   Durum aria-pressed ile duyuruluyor.

   DOKUNMA HEDEFİ 44px. Şeritte görünen çubuk 5px ama düğmenin kendisi 44px
   yüksekliğinde ve sütun genişliğinin tamamı. Bu bir erişilebilirlik gereği,
   pazarlık konusu değil; kartın ölçüsü buna göre kuruldu, tersi değil.
   ========================================================================= */

/* Şerit geri sarılırken sönük kaldığı aralık. Yalnızca `rewind` açık
   kartlarda (sıra anlatan kartlar) devrede. */
const REWIND_BACK = 300;
const REWIND_RELIGHT = 360;

export type HeroSceneItem = {
  key: string;
  /** sahnenin tek kelimelik adı — kartın değişen ana metni VE şeridin
   *  erişilebilir adı. Tek kaynak, iki yerde kullanılıyor. */
  word: string;
  /** aşamanın içeriği ya da şartı; TEK KISA SATIR.
   *  Ad kutusu en dar bantta (1024px, kart 461px) İKİ SATIRA göre ölçüldü —
   *  üç satır sığmaz ve şeridin üstüne biner. Uzun cümle yazma. */
  meta: string;
  /** sahne çizimi — <svg className="hkc-art"> */
  art: React.ReactNode;
  /** OPSİYONEL: adın yanındaki rozet ("Siz" · "Ortac" · "Otorite").
   *  Yalnızca işi kimin yaptığı bilgisi taşıyan kartlarda var; kuruluş kartı
   *  kullanıyor, muhasebe kartı kullanmıyor. Yokken kutunun ölçüsü
   *  değişmiyor: rozet 22px, ad 31.5px, satır yüksekliğini ad belirliyor. */
  badge?: { label: string; tone: "you" | "muted" };
};

export type HeroSceneCardProps = {
  /**
   * Çizimlerin PALET ad alanı — kartın köküne ikinci sınıf olarak basılır
   * ("dhs" · "svmk"). Ölçü değil renk için: her sayfanın kendi çizim
   * kuralları kendi önekiyle yazılıyor, sahne animasyonları da
   * `.dhs .hkc-scene[data-on="true"] .dhs-…` biçiminde bu sınıfla
   * kapılanıyor. İki kart aynı DOM'a girse bile birbirine sızmıyor.
   */
  ns: string;
  /** Bölmeler. 3–6 arası; şerit segmenti 1024px bandında 6'da 68.5px'e
   *  iniyor, yedincide 57px ile gösterge okunmuyor. */
  scenes: HeroSceneItem[];
  /** Kartın tek sabit cümlesi. İkon hazır düğüm olarak geliyor. */
  foot: { icon: React.ReactNode; line: string };
  /** Bir bölmenin ekranda kalma süresi (ms). Sitedeki sürekli periyotlarla
   *  ORTAK KATI OLMAMALI — o disiplin çağıran dosyada gerekçesiyle yazılı. */
  dwell: number;
  /** Son bölmenin süresi. Verilmezse `dwell`. Sıra anlatan kartta son sahne
   *  daha uzun duruyor, çünkü ardından başa dönülüyor. */
  lastDwell?: number;
  /** Şerit SIRA mı gösteriyor? true → bitti/şimdi/sıradaki üç durum.
   *  false → yalnızca açık/kapalı; dört iş aynı anda yürüyorsa "bitti" yalan
   *  olurdu. */
  ordered?: boolean;
  /** Sona gelince şerit sönüp başa sarsın mı. Yalnızca `ordered` ile
   *  anlamlı: dolu segmentlerin tek tek boşalması "geri adım" diye okunuyor,
   *  sönük aralıkta yapılan dönüş okunmuyor. */
  rewind?: boolean;
  /** Şeridin erişilebilir grup adı. */
  railLabel: string;
  /** Şerit düğmesinin erişilebilir adı. Verilmezse `word`. Kuruluş kartı
   *  "Karar aşaması" diyor, çünkü orada beş şey bir sürecin adımları. */
  stepLabel?: (item: HeroSceneItem) => string;
};

export default function HeroSceneCard({
  ns,
  scenes,
  foot,
  dwell,
  lastDwell,
  ordered = false,
  rewind = false,
  railLabel,
  stepLabel,
}: HeroSceneCardProps) {
  const [active, setActive] = useState(0);
  /* Şerit sönümü: yalnızca son bölmeden birinciye dönerken açılıyor. */
  const [rewinding, setRewinding] = useState(false);
  /* İki ayrı duraklatma sebebi. Fare kartın üstünde (geçici) ve ziyaretçi bir
     segmente bastı (kalıcı). İkincisi kalıcı, çünkü basmak "ben seçiyorum"
     demek; dört saniye sonra kartın onu geri alması kararı çöpe atardı. */
  const [hovered, setHovered] = useState(false);
  const [taken, setTaken] = useState(false);

  const count = scenes.length;

  /* Bölme ilerletici.
     HAREKET KAPALIYSA hiç çalışmıyor: kart ilk bölmede duruyor ve o bölmenin
     çizimi zaten TAMAMLANMIŞ hâlde (duruş kareleri her sayfanın kendi
     CSS'inde, medya sorgusunun dışında). İlerletmek isteyen şeride basıyor.
     Hareket tercihi burada, effect içinde okunuyor — render ağacına girmiyor. */
  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || hovered || taken || rewinding) return;
    const last = active === count - 1;
    const id = window.setTimeout(
      () => {
        if (last && rewind) setRewinding(true);
        else setActive((v) => (v + 1) % count);
      },
      last ? (lastDwell ?? dwell) : dwell,
    );
    return () => window.clearTimeout(id);
  }, [active, hovered, taken, rewinding, count, dwell, lastDwell, rewind]);

  /* Başa dönüşün ikinci yarısı. Sahneler bu geçişi kendiliğinden yapıyor;
     burada zamanlanan tek şey şeridin sönük olduğu aralık. Ziyaretçi bu sırada
     bir bölmeye basarsa sönüm kapanıyor ve bu effect'in temizliği bekleyen iki
     zamanlayıcıyı iptal ediyor. */
  useEffect(() => {
    if (!rewinding) return;
    const back = window.setTimeout(() => setActive(0), REWIND_BACK);
    const lit = window.setTimeout(() => setRewinding(false), REWIND_RELIGHT);
    return () => {
      window.clearTimeout(back);
      window.clearTimeout(lit);
    };
  }, [rewinding]);

  const pick = useCallback((i: number) => {
    setActive(i);
    setRewinding(false);
    setTaken(true);
  }, []);

  return (
    <div
      className={`hkc ${ns}`}
      data-rewind={rewind ? rewinding : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      {/* ---- sahne: kartın en büyük katmanı, tek nesne ---- */}
      {/* Çizimlerin hepsi DOM'da ve üst üste duruyor; görünen bir tanesi.
          Sebebi ölçü ve süreklilik: sahne kutusu hiç boşalmıyor, geçişte kart
          zıplamıyor ve çizimler her turda yeniden kurulmuyor. Animasyon
          seçicileri [data-on="true"]'ya bağlı, yani GİZLİ OLANLARDA HAREKET
          SIFIR — DOM'da durmalarının bedeli yok. */}
      <div className="hkc-stage" aria-hidden="true">
        {scenes.map((s, i) => (
          <div key={s.key} className="hkc-scene" data-scene={s.key} data-on={i === active}>
            {s.art}
          </div>
        ))}
      </div>

      {/* ---- açık bölmenin adı ve karşılığı ---- */}
      {/* Metinlerin hepsi DOM'da, mutlak konumla üst üste: bölme değişince
          kartın altı zıplamıyor ve "Karar" ile "Kimlik" arasındaki genişlik
          farkı hizayı bozmuyor. */}
      <div className="hkc-say">
        {scenes.map((s, i) => (
          <div key={s.key} className="hkc-c" data-on={i === active} aria-hidden={i !== active}>
            <span className="hkc-head">
              <b className="hkc-word">{s.word}</b>
              {s.badge && (
                <em className="hkc-badge" data-tone={s.badge.tone}>
                  {s.badge.label}
                </em>
              )}
            </span>
            <span className="hkc-meta">{s.meta}</span>
          </div>
        ))}
      </div>

      {/* ---- şerit: hem gösterge hem kumanda ---- */}
      {/* SEGMENTLERDE GÖRÜNEN AD YOK. Müşteri kaldırttı: "zaten üst kısımda
          yazıyor ya seçince o yüzden bide şu attığım kısımda isimleri
          yazmasın." Açık bölmenin adı kartın üstünde 30 punto ile duruyor.
          Erişilebilir ad aria-label'da — gerekçesi ve ölçümü dosyanın
          başında. */}
      <div className="hkc-rail" role="group" aria-label={railLabel}>
        {scenes.map((s, i) => (
          <button
            key={s.key}
            type="button"
            className="hkc-step"
            data-state={ordered && i < active ? "done" : i === active ? "now" : "next"}
            aria-pressed={i === active}
            aria-label={stepLabel ? stepLabel(s) : s.word}
            onClick={() => pick(i)}
          >
            <i aria-hidden="true" />
          </button>
        ))}
      </div>

      {/* Kartın tek sabit cümlesi. Bir iddia kurmuyor: ne süre veriyor ne
          sonuç; yalnızca gördüğünüz şeyin ne olduğunu ve devamının nerede
          olduğunu söylüyor. */}
      <p className="hkc-foot">
        {foot.icon}
        <span>{foot.line}</span>
      </p>
    </div>
  );
}
