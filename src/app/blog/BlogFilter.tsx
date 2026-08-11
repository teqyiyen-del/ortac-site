"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import FadeUp from "@/components/shared/FadeUp";

/* ============================================================================
   KATEGORİ ŞERİDİ  ·  /blog'da SÜZGEÇ, kategori sayfasında GEZİNME
   ============================================================================

   MÜŞTERİNİN CÜMLESİ, BİREBİR
   "blogda katagori seçtiğimizde link değişip yeniden yüklenmesin sayfa ya.
    sadece dinamik bir katagorize olsun sayfaya f5 atmışız gibi olmasın linke
    de ona göre ekleme yapmana gerek yok yani #ülkerehberi şeklinde fln
    ekleniyor ya öyle olabilir gerekiyorsa."

   ÇÖZÜLEN GERİLİM
   Beş kategorinin GERÇEK adresi var (/blog/kategori/<slug>), /rehberler ve
   /blog/rehberler bu adreslere 308 veriyor ve arama motoru beşini de ayrı
   sayfa olarak görüyor. Adresleri kaldırmak kırık yönlendirme ve kaybolmuş
   indeks demekti. Ama /blog'da çipe basınca sayfanın yenilenmemesi gerekiyor.
   İkisi birlikte şöyle duruyor:

     · Çipler HER İKİ bağlamda da <a href="/blog/kategori/<slug>">. İşaretleme
       aynı, adres gerçek, tarayıcı ve arama motoru için hiçbir şey değişmedi.
     · /blog'da JS tıklamayı yakalıyor (preventDefault) ve sayfaya hiç
       dokunmadan listeyi süzüyor. Gezinme yok, istek yok, kaydırma sıfırlanmıyor.
     · Kategori sayfasında JS YOK: çipler olduğu gibi geziniyor, çünkü o sayfa
       sunucuda zaten süzülmüş geliyor (gerekçe aşağıda, "NEDEN KATEGORİ
       SAYFASI SÜZMÜYOR").
     · JS kapalıyken /blog'daki çip de gezinir — yani süzgeç bir İYİLEŞTİRME,
       bir bağımlılık değil. Kapalı JS'te ziyaretçi gerçek kategori sayfasına
       düşüyor ve doğru listeyi görüyor.

   NEDEN KATEGORİ SAYFASI SÜZMÜYOR (tutarsızlık nerede kesildi)
   Kategori sayfası da istemci tarafında süzseydi, o sayfanın sunucudan gelen
   HTML'inde ON BEŞ kaydın tamamı bulunmak zorundaydı. O zaman altı adres de
   aynı on beş satırı basardı: arama motoru için altı ayrı sayfa değil, altı
   kopya. Kategori adreslerinin var olma sebebi tam da bu değil. Dolayısıyla
   ayrım keyfi değil, zorunlu: /blog karışık liste olduğu için süzülebiliyor,
   kategori sayfası tek kategori olduğu için süzemiyor.

   Ziyaretçi tarafında fark KAPATILDI, gizlenmedi: çip her iki yerde de aynı
   şeyi vaat ediyor ("bana şu kategorinin listesini göster") ve aynı listeyi
   veriyor. Fark yalnızca anındalık, ve o da tek bir yolda kalıyor — arama
   sonucundan doğrudan bir kategori adresine düşen ziyaretçinin İLK çipinde.
   Site içindeki bütün yollar (navbar, footer, ana sayfa, KynSwitch, kaynaklar
   hub'ı) /blog'a işaret ediyor; oraya girenin bir daha sayfası yenilenmiyor.

   ADRES ÇUBUĞU · replaceState, pushState DEĞİL
   Müşteri hash'i uygun görmüş ama zorunlu tutmamış. Hash yazılıyor çünkü
   süzülmüş liste paylaşılabilir ve F5'e dayanıklı olmalı; adres /blog#<slug>
   oluyor. YAZMA BİÇİMİ pushState değil replaceState:
     · pushState her çip tıklamasını bir geçmiş adımı yapardı. Altı duraklı bir
       şeritte ziyaretçi dolaşırken beş adım biriktirir ve geri tuşu sayfadan
       çıkmak yerine süzgeçleri tek tek geri sarardı. Geri tuşunun işi sayfadan
       çıkmak.
     · Bedeli: geri tuşuyla "önceki süzgece" dönülemiyor. Karşılığı şeritteki
       "Tümü" durağı — süzgeci geri almanın görünür ve tek yolu o.
   Sayfa hash ile AÇILDIĞINDA doğru süzgeçle geliyor (aşağıdaki ilk useEffect).
   Hash Türkçe karakter taşımıyor: kategori slug'ları zaten ASCII ve adresle
   birebir aynı ("#ulke-rehberi"), yani hash ile kategori adresi aynı sözcüğü
   kullanıyor.

   BAĞLANTI BİLEŞENİ · SmartLink DEĞİL, kipe göre <Link> ya da çıplak <a>
   · SmartLink KULLANILAMIYOR: lib/routes'u, o da lib/blog'u içeri alıyor. Bu
     dosya bir istemci bileşeni; SmartLink'i buradan çağırmak yazıların TÜM
     GÖVDELERİNİ (75 KB kaynak) tarayıcıya indirirdi. Sönük dalına da gerek
     yok: kategori adresleri routes.ts'te CATEGORY_ORDER'dan TÜREYEREK
     açılıyor, yani kapalı bir kategori adresi oluşamıyor.
   · KATEGORİ SAYFASINDA <Link>: orada çip gerçekten geziniyor ve gezinmenin
     Next'in yumuşak geçişi olarak kalması gerekiyor. Bu turda önce çıplak <a>
     denendi ve ölçüldü — belge tamamen yeniden yükleniyordu (marker kayboldu),
     yani beş kategori sayfası bu turdan ÖNCEKİNDEN kötü hissettirecekti.
     Müşterinin şikâyeti tam olarak o his.
   · /blog'DA ÇIPLAK <a>: tıklama zaten yakalanıyor, gezinme hiç olmuyor.
     <Link> orada yalnızca altı kategori sayfasını boşuna önden çekerdi
     (prefetch). Çıplak <a> hem o israfı kesiyor hem de Next'in iç tıklama
     işleyicisiyle bizim preventDefault'umuzun sırasına bağımlı kalmıyor.
   İki dalda da DOM'a çıkan şey aynı: <a href="…"> — orta tuş ve cmd+tık her
   iki kipte de gerçek adresi yeni sekmede açıyor.

   ERİŞİLEBİLİRLİK · neden aria-current, neden tab/aria-pressed DEĞİL
   Bu depoda TUZAK G üç bileşende yaşandı: rolsüz bir <span aria-current="page">
   Chrome'da adsız `generic` düğüme düşüyor ve `current` HİÇ yayımlanmıyor.
   Önceki hâlde seçili çip tam olarak öyleydi ve durumu görünmez bir .sr-only
   metniyle telafi ediliyordu. Şimdi seçili çip de <a>: bağlantının rolü var,
   adı var ve `current` gerçekten yayımlanıyor — telafi metni kalktı.
     · role="tab" + aria-selected ELENDİ: tab bir tablist içinde, bir
       tabpanel'e bağlı ve dolaşan odaklı (roving tabindex) olmak zorunda.
       Üstelik JS kapalıyken bu çipler GERÇEKTEN bağlantı; ağaçta "sekme"
       demek doğrudan yalan olurdu.
     · <button aria-pressed> ELENDİ: aria-pressed role="button" ister, yani
       href'i düşürmek gerekirdi — kademeli iyileştirmenin dayandığı tek şey o.
     · aria-current ARIA'nın "bir küme içindeki güncel öğe" için ayırdığı
       nitelik; bağlantı kalıbıyla çakışmıyor.
   Değer bağlama göre: kategori sayfasında çip GERÇEKTEN bulunulan sayfa
   ("page"), /blog'da bulunulan SÜZGEÇ ("true"). İkincisine "page" demek
   yalan olurdu — sayfa /blog.

   SAYIM CÜMLESİ CANLI BÖLGE. Önceki hâlde şerit sayfa değiştirdiği için ekran
   okuyucu yeni başlığı okuyordu ve dosyada "bu yüzden aria-live YOK" yazıyordu.
   Süzgeç sayfa değiştirmiyor: o duyuru artık hiç olmuyor. Yerine sayım satırı
   aria-live="polite" oldu — kaç kaydın gösterildiği ağaca çıkan tek yer.
   ========================================================================= */

export type FilterTab = {
  /** görünüşün kimliği: kök için "tumu", kategoriler için slug (= hash) */
  id: string;
  label: string;
  count: number;
  /** gerçek adres — kademeli iyileştirmenin dayanağı ve tarama yolu */
  href: string;
  /** o görünüşün sayım cümlesi; süzgeç değişince canlı bölge bunu duyuruyor */
  note: string;
};

type Props = {
  tabs: FilterTab[];
  /** sunucunun bastığı görünüş; /blog'da kök, kategori sayfasında kategori */
  view: string;
  /** kökün kimliği — kategori rozeti yalnızca karışık listede basılıyor */
  rootView: string;
  /** yalnızca /blog: tıklama yakalanıyor, hash yazılıyor, liste süzülüyor */
  interactive: boolean;
  children: React.ReactNode;
};

export default function BlogFilter({ tabs, view: initial, rootView, interactive, children }: Props) {
  const [view, setView] = useState(initial);
  const scopeRef = useRef<HTMLDivElement>(null);
  /* İlk turda kaydırmaya dokunulmuyor: sayfa zaten yeni açılmış olabilir. */
  const settled = useRef(false);

  /* Dizi kimliği her render'da değişmesin diye bağımlılık dizeye çevriliyor;
     `tabs` sunucudan gelen bir prop ve içeriği sabit. */
  const ids = tabs.map((t) => t.id).join(" ");

  /* ---------------------------------------------------------- hash → görünüş
     Sayfa /blog#maliyet-ve-vergi ile AÇILDIĞINDA doğru süzgeçle gelsin.
     Okuma useEffect içinde: hash sunucuya hiç gitmiyor, yani ilk render'da
     okunsaydı sunucu çıktısıyla istemci çıktısı ayrışır ve hidratasyon
     patlardı (bu depoda beş ayrı kalıpta yaşandı, bkz. AGENTS · TUZAK A).
     BEDELİ: hash ile açılan sayfada tam liste bir an görünüp süzülüyor, çünkü
     sunucu HTML'i her zaman kökü basıyor ve süzgeç ancak hidratasyondan sonra
     uygulanıyor. Kaçınmanın tek yolu <head>'e senkron bir betik koymak olurdu
     ve o da React'in hidratasyonda gördüğü nitelikleri değiştirip aynı tuzağa
     düşerdi. Doğrulandı: /blog#maliyet-ve-vergi ile açılan sayfa yerleştiğinde
     tek satır, doğru koyu çip ve doğru sayım cümlesiyle geliyor.

     `hashchange` da dinleniyor — adres çubuğuna elle hash yazan ya da başka
     bir sayfadan /blog#<slug> bağlantısıyla gelen ziyaretçi için; ikisi de
     yeniden yükleme üretmiyor, dolayısıyla React'in kendiliğinden haberi
     olmazdı. */
  useEffect(() => {
    if (!interactive) return;
    const known = ids.split(" ");
    const read = () => {
      const raw = window.location.hash.slice(1);
      let wanted = raw;
      /* Bozuk yüzde dizisi decodeURIComponent'i fırlatıyor; ham hâli de
         listede yoksa zaten köke düşüyor. */
      try {
        wanted = decodeURIComponent(raw);
      } catch {
        wanted = raw;
      }
      setView(known.includes(wanted) ? wanted : initial);
    };
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, [interactive, ids, initial]);

  /* ---------------------------------------------------------- görünüş → DOM
     Süzgeç neden CSS değil de `hidden` niteliği:
     · CSS ile yapmak "hangi görünüşte hangi kayıt görünür" eşleşmesini CSS'e
       yazmayı gerektirirdi (görünüş başına bir kural, slug'lar elle). Altıncı
       kategori eklendiğinde CSS'i güncellemeyi unutan biri o kategoriyi BOŞ
       gösterirdi. `data-views` ile eşleşme veriden geliyor, sürüklenecek bir
       liste yok.
     · `hidden` görsel olarak gizlemekle kalmıyor, düğümü erişilebilirlik
       ağacından ve sekme sırasından da çıkarıyor. Süzülmüş bir listede
       gizlenen satırların klavyeyle gezilebilir kalması gerçek bir arıza olurdu.

     DOM'a doğrudan yazmak React'in dışına çıkmak: `children` sunucudan gelen
     sabit bir öğe ağacı, BlogFilter kendi durumu değiştiğinde React o alt
     ağacı aynı referansla görüp yeniden render etmiyor. Yani buradaki nitelik
     geri alınmıyor. Alternatifi — her görünüşün listesini ayrı ayrı bastırmak —
     on beş kaydı otuz düğüme çıkarırdı. */
  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    for (const el of Array.from(scope.querySelectorAll<HTMLElement>("[data-views]"))) {
      el.hidden = !(el.dataset.views ?? "").split(" ").includes(view);
    }

    if (!settled.current) {
      settled.current = true;
      return;
    }

    /* Liste kısalınca belge de kısalıyor ve tarayıcı kaydırmayı kırpıyor.
       Şerit ekrandan yukarı çıkmışsa geri getiriliyor: süzgeci kullanan kişi
       süzgeci görebilmeli. Anlık kaydırma — yumuşak kaydırma burada hareket
       tercihine takılırdı ve tercihi render sırasında okumak yasak (TUZAK A). */
    const top = scope.getBoundingClientRect().top;
    if (top < 0) window.scrollTo(0, window.scrollY + top - 16);
  }, [view]);

  /* ------------------------------------------------------------- tıklama */
  function pick(event: React.MouseEvent<HTMLAnchorElement>, id: string) {
    /* Değiştirici tuşlar ve orta tuş dokunulmadan geçiyor: ziyaretçi kategori
       adresini yeni sekmede açmak istiyorsa gerçek adres orada duruyor. */
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    event.preventDefault();
    setView(id);

    /* Kökte hash siliniyor, yoksa /blog#tumu diye anlamsız bir adres kalırdı.
       `pathname + search` — sorgu varsa korunuyor. */
    const next =
      id === rootView ? `${window.location.pathname}${window.location.search}` : `#${id}`;
    window.history.replaceState(null, "", next);
  }

  const current = tabs.find((t) => t.id === view) ?? tabs[0];

  return (
    /* `data-mixed` yalnızca kökte: kategori rozeti karışık listede satırın tek
       ayrımı, süzülmüş listede ise her satırda aynı rozet olurdu (kural CSS'te,
       .bh-scope:not([data-mixed]) .bh-kind). `data-view` şu an yalnızca hata
       ayıklama ve olası ileri kurallar için duruyor. */
    <div
      className="bh-scope"
      data-view={view}
      data-mixed={view === rootView ? "true" : undefined}
      ref={scopeRef}
    >
      <FadeUp>
        <nav className="bh-switch" aria-label="Kategoriler">
          <ul className="bh-tabs">
            {tabs.map((tab) => {
              const here = tab.id === view;
              /* Görünen metin "Ülke rehberi 6"; ad ise birimiyle
                 "Ülke rehberi, 6 kayıt". Rakam ağaçtan gizli (aria-hidden)
                 çünkü ayrı bir düğüm olarak okunduğunda neyi saydığı
                 duyulmuyor — bu depoda ölçüldü, sayı hiç yayımlanmamıştı.
                 Görünen metin adın içinde geçiyor (WCAG 2.5.3). */
              /* DEĞER BAĞLAMA GÖRE. Kategori sayfasında çip gerçekten
                 bulunulan sayfa ("page"); /blog'da bulunulan SÜZGEÇ ("true"),
                 çünkü sayfa /blog ve oraya "page" demek yalan olurdu. */
              const mark = interactive ? ("true" as const) : ("page" as const);
              const shared = {
                className: "bh-tab",
                "aria-label": `${tab.label}, ${tab.count} kayıt`,
                "aria-current": here ? mark : undefined,
              };
              const inner = (
                <>
                  {tab.label}
                  <span className="bh-tab-n" aria-hidden="true">
                    {tab.count}
                  </span>
                </>
              );

              return (
                <li key={tab.id}>
                  {interactive ? (
                    <a href={tab.href} {...shared} onClick={(event) => pick(event, tab.id)}>
                      {inner}
                    </a>
                  ) : (
                    <Link href={tab.href} {...shared}>
                      {inner}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          {/* SAYIM CÜMLESİ · canlı bölge + yer tutucu yığını
              ---------------------------------------------------------------
              Görünen cümle tek: `.bh-switch-n`. Kaç kaydın gösterildiği
              erişilebilirlik ağacına çıkan tek yer burası (aria-live="polite");
              aria-atomic ile cümle parça parça değil bütün okunuyor. İlk
              render'da duyuru olmuyor — canlı bölge yalnızca DEĞİŞİMİ bildirir.

              ALTINDAKİ ALTI KOPYA GÖRÜNMEZ ve YER AYIRIYOR. Ölçülen sorun:
              cümlenin uzunluğu görünüşe göre değişiyor ve dar ekranda sarma
              satır sayısı da değişiyor — kap genişliği 288px'te satırlar
              2/2/3/3/3/2, 528px'te 1/1/2/2/2/2. Yani süzgeç değiştikçe
              altındaki liste 18,9px zıplıyordu.

              Çözüm bir `min-height` DEĞİL: doğru değer ekran genişliğine göre
              1, 2 ya da 3 satır ve iki ayrı kırılım noktası uydurmak
              gerekirdi — üstelik altıncı kategori eklendiğinde ikisi de
              yanlış olurdu. Altı cümlenin hepsi aynı ızgara gözüne konuyor
              (grid-area 1/1); kap kendiliğinden EN UZUNU kadar oluyor, her
              genişlikte ve kategori listesi değişse bile.

              `visibility: hidden` — yer ayırır ama erişilebilirlik ağacından
              da çıkarır; üstüne aria-hidden, çünkü canlı bölgenin komşusunda
              okunabilir altı kopya olması duyuruyu çöpe çevirirdi. */}
          <div className="bh-switch-l">
            <span className="bh-switch-n" aria-live="polite" aria-atomic="true">
              {current.note}
            </span>
            {tabs.map((tab) => (
              <span key={tab.id} className="bh-switch-g" aria-hidden="true">
                {tab.note}
              </span>
            ))}
          </div>
        </nav>
      </FadeUp>

      {children}
    </div>
  );
}
