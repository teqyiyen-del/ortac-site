import AccountingHandover from "@/components/services/AccountingHandover";
import TakasMutabakat from "@/components/lab/TakasMutabakat";
import TakasCatal from "@/components/lab/TakasCatal";
import TakasTarama from "@/components/lab/TakasTarama";
import { ACCOUNTING_DUBAI as C } from "@/lib/accountingDubai";

/* ============================================================================
   LAB · /dubai/muhasebe · "Siz ne veriyorsunuz, biz ne veriyoruz?"

   BEŞİNCİ TUR VE BİR GERİ ALMA. Müşterinin cümlesi:

     "muhsaebe takas bölümü olmamış kral. ben sadece text yazmaktan uzak
      duralım derken sen konuyu texte boğmuşsun. odak svg görsel ve
      animasyonlarda olcak ama texti de koymalıyızki açıklayıcı olsun mantık o.
      aslında şu attığım görseldeki iyi ama işte ben dedim ki bunu nasıl biraz
      daha hareketlendiririz, yine dene bir kaç şey ama olmuyosa salalım bunu
      kullanırız çokta önemli bir kısım değil yani."

   İKİ İŞ VAR VE İLKİ BİR GERİ ALMA:

     1) Canlı bölüm eski hâline döndü: takas paneli + aradaki bağ. Dördüncü
        turun üç alternatifi de, beşinci turun "TEZGÂH" sahnesi de kapandı.
     2) Beğenilen çizime hareket denemesi. Üç deneme aşağıda; hepsi bağın
        üzerinde, hiçbiri metne dokunmuyor.

   NEDEN GERİ ALINDI. Müşteri bir önceki turda "sadece görsel yapmak yerine
   placeholder doldurursun" derken ÇİZİME METİN GİRSİN demişti; talimat
   "listeleri sahnenin içine göm" diye okundu. Sonuç: çizim küçüldü, dokuz kalem
   sahnenin içinde dokuz HTML satırına döndü ve bölüm bir çizim olmaktan çıkıp
   bir liste oldu. İstenen denge bu değildi: GÖRSEL ÖNDE, METİN AÇIKLAYICI OLARAK
   YANINDA.

   BU TURUN KURALI DÜŞÜK BAHİS. Müşterinin kendi cümlesi: "olmuyosa salalım bunu
   kullanırız çokta önemli bir kısım değil." Yani canlıya SADE hâl gitti, üç
   deneme burada duruyor ve hiçbiri seçilmezse bu bir başarısızlık değil.

   Bu sayfa canlı hiçbir şeye dokunmuyor. Üç hareket adayı canlı bileşeni olduğu
   gibi basıp yalnızca bir kapsam sınıfı ekliyor (.tkb1 .tkb2 .tkb3), yani
   kıyaslanan tek şey hareket. Kapanan turun üç adayı da sayfanın sonunda,
   kendi ad alanlarında (.mtb- .ctl- .trm-).
   ========================================================================= */

/* HAREKET TURU DA KAPANDI. Üç aday (Akış · Defter · Sevkiyat) burada yan yana
   duruyordu; müşteri üçüncüsünü seçti:

     "aynen sevkiyat olanı yapabilirsin en azından biraz hareket katmış olur.
      soldaki kutu önce line olarak yanar ordan bi enerji gelir ota kısma
      aktarılır içinden geçer ve size dönen kısmını aydınlatır."

   Adaylar EKRANDA BIRAKILMADI ve bu, kapanan diğer turdan farklı bir karar.
   Sebebi teknik: üçü de canlı bileşeni basıp üstüne kendi CSS'ini ekliyordu
   (.tkb1 .tkb2 .tkb3 → lab-tks4.css). Canlı bileşen artık kendisi dönüyor,
   yani o kapsamlar bugün iki animasyon setini üst üste bindirirdi ve
   kıyaslanan şey ne aday ne canlı olurdu. TakasBag.tsx ve lab-tks4.css
   silindi; kazananın bugünkü hâli aşağıdaki "Taban" bloğunda, canlıdaki
   çizimin ta kendisi olarak duruyor. */

/* Kapanan tur. Üç alternatif de bölümü YENİDEN TASARLIYORDU; müşteri panelin
   kendisini seçtiği için soru kapandı. Ekranda bırakıldılar çünkü karar geri
   alınabilir olsun; künyeleri tek satıra indi. */
const CLOSED = [
  {
    id: "Aday 1",
    name: "Mutabakat",
    Section: TakasMutabakat,
    idea: "Sahne kurmayı bırakıp bir mutabakat sayfası oluyordu: iki liste, aralarında tek bir çizgi. Üçünün en sakini.",
  },
  {
    id: "Aday 2",
    name: "Çatal",
    Section: TakasCatal,
    idea: "Üç ile altı arasındaki farkı konu yapıyordu: üç çizgi bir düğümde birleşiyor, düğümden altı çizgi ayrılıyordu.",
  },
  {
    id: "Aday 3",
    name: "Tarama",
    Section: TakasTarama,
    idea: "Hareketi nesneden alıp ışığa veriyordu: dokuz kalemin üzerinden soldan sağa yavaş bir huzme geçiyordu.",
  },
];

/* ---------------------------------------------------------------- ölçüm
   Sayılar elle yazılı çünkü ölçüm çalışma anında değil tarayıcıda tek
   seferlik alındı: her blok sabit genişlikli aynı köken iframe'inde
   (tarayıcı paneli dar viewport'u güvenilir ölçmüyor), yatay taşma da
   scrollWidth ile değil gerçekten scrollTo(9999,0) denenip scrollX'e
   bakılarak. Blok değişirse bu satırlar da yeniden ölçülmeli.

   YÜKSEKLİK HAREKETTEN ETKİLENMİYOR ve etkilenmemesi şart: hareketin tamamı
   renk, gölge ve 3 piksellik bir itki. Tek bir kural bile kutu ölçüsüne
   dokunmuyor, o yüzden hareketli satır ile hareketsiz satırın dört genişlikte
   de aynı sayıları vermesi bir tesadüf değil, kabul kriteri. */
const COLS = ["", "animasyon", "periyot", "320px", "375px", "768px", "1440px"];

const MEASURED: { k: string; v: (string | number)[] }[] = [
  { k: "Bugün canlıda (hareketli)", v: [26, "18.1 s", 512, 500, 500, 155.5] },
  { k: "Aynı blok, reduce altında", v: [0, "yok", 512, 500, 500, 155.5] },
  { k: "Kapanan aday · Sevkiyat (yalnız bağ)", v: [9, "71 s", 512, 500, 500, 156] },
  { k: "Kapanan tur · TEZGÂH", v: [23, "31 s", 629, 610, 287, 320] },
];

const KICKER: React.CSSProperties = {
  display: "inline-flex",
  padding: "5px 12px",
  borderRadius: 999,
  background: "var(--blue-100)",
  fontFamily: "var(--font-sans)",
  fontWeight: 700,
  fontSize: 11,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--blue-700)",
};

const KICKER_BASE: React.CSSProperties = {
  ...KICKER,
  background: "var(--paper)",
  color: "#8a8a8a",
};

const BOX: React.CSSProperties = {
  marginTop: 16,
  padding: "20px 22px",
  borderRadius: "var(--r-lg)",
  background: "var(--paper)",
  border: "1px solid var(--border)",
  maxWidth: "76ch",
};

const P: React.CSSProperties = {
  marginTop: 12,
  fontSize: 14.5,
  lineHeight: 1.65,
  color: "var(--text-600)",
};

const STRONG: React.CSSProperties = { fontWeight: 600, color: "var(--text-900)" };

/* SİLİNDİ · LABEL — hareket adaylarının künyesindeki alt başlık stili
   ("Fikir" / "Ne kadar hareket var" / "Neyi feda ediyor"). Tek okuyucusu
   Kunye bileşeniydi; hareket turu kapanınca o da gitti. */

const CELL: React.CSSProperties = {
  padding: "9px 10px",
  borderBottom: "1px solid var(--border)",
  textAlign: "right",
  fontVariantNumeric: "tabular-nums",
  color: "var(--text-600)",
};

const CELL_K: React.CSSProperties = {
  ...CELL,
  textAlign: "left",
  fontWeight: 600,
  color: "var(--text-900)",
};

/* Her blok canlıdaki bağlamının aynısında basılıyor: beyaz bölüm, container-o,
   ve üstünde bölümün kendi h3'ü. Genişlik karşılaştırması ancak böyle
   yapılabilir; blok çıplak gösterilseydi kabın kaç piksel olduğu görünmezdi. */
function Frame({ children }: { children: React.ReactNode }) {
  return (
    <section
      className="sec-pad svm-main"
      style={{ background: "var(--white)", paddingBlock: 44 }}
    >
      <div className="container-o">
        <h3 className="svm-sub">{C.exchange.title}</h3>
        <div className="svm-blockgap">{children}</div>
      </div>
    </section>
  );
}

export default function LabMuhasebeTakasPage() {
  return (
    <main style={{ background: "var(--white)" }}>
      <div className="container-o" style={{ paddingTop: 48 }}>
        <h1 className="h2" style={{ color: "var(--text-900)" }}>
          Muhasebe takası
        </h1>
        <p
          style={{
            marginTop: 12,
            maxWidth: "70ch",
            fontSize: 15,
            lineHeight: 1.65,
            color: "var(--text-600)",
          }}
        >
          <code>/dubai/muhasebe</code> · {C.exchange.title} bölümü{" "}
          <b style={STRONG}>eski hâline döndürüldü</b> ve canlıda o hâliyle duruyor:
          takas paneli, aralarında bağ. Sonraki tur o panele{" "}
          <b style={STRONG}>hareket</b> denedi ve o tur da kapandı - müşteri
          &quot;Sevkiyat&quot; adayını seçti, dizi müşterinin tarifine göre yeniden
          kuruldu ve <b style={STRONG}>canlıya alındı</b>. Bu sayfadaki &quot;Taban&quot;
          bloğu artık hareketsiz kopya değil, canlıdaki bölümün kendisi. Kapanan iki
          turun kayıtları aşağıda.
        </p>

        {/* ---------------------------------------------------- geri alma */}
        <div style={BOX}>
          <b style={KICKER}>Geri alma: ne döndü, ne dönmedi</b>
          <p style={P}>
            <b style={STRONG}>Döndü:</b> iki sütunlu panel (solda üç, sağda altı ikonlu
            kalem, sağ sütun mavi zeminde) ve aralarındaki{" "}
            <code>belge → defter → çıktı</code> bağı. İkisi de git geçmişinden geldi;
            bağ <code>.svs-conn</code>, panel <code>.svm-swap</code>.
          </p>
          <p style={P}>
            <b style={STRONG}>Dönmedi:</b> panelin altındaki &quot;Bu çıktılar ne işe
            yarıyor?&quot; açılırı. O blok bu turdan önce, ayrı bir kararla
            kaldırılmıştı ve altı çıktının açıklama cümleleri o turda veri dosyasından
            da silinmişti. Geri getirmek altı cümleyi{" "}
            <b style={STRONG}>yeniden yazmak</b> olurdu; bu sayfada uydurma metin
            yazılmıyor.
          </p>
          <p style={P}>
            <b style={STRONG}>Silindi:</b> &quot;TEZGÂH&quot; sahnesi (
            <code>.svsg-</code>, 897 satır CSS). Kaybolan içerik yok - dokuz kalem ve
            iki başlık birebir aynı kelimelerle panelde ve hepsi sunucuda basılan
            gerçek HTML metni.
          </p>
        </div>

        {/* ------------------------------------------------ genişlik kanıtı */}
        <div style={BOX}>
          <b style={KICKER}>Genişlik düzeltmesi korundu</b>
          <p style={P}>
            Bir önceki turdaki hata (&quot;neden genişlik olarak full değilde ortada
            kalmış gibi duruyor&quot;) silinen sahnenin kabındaydı:{" "}
            <code>.svsg-wrap {"{"} max-width: 896px {"}"}</code>. Panel o sınırı hiç
            taşımıyor - <code>.svm-swap</code> çıplak bir ızgara, daraltan tek bir
            kuralı yok. Düzeltme korunmakla kalmadı, <b style={STRONG}>yapısal</b> hâle
            geldi: geri gelebileceği bir kural kalmadı.
          </p>
          <p style={P}>
            1440 pikselde ölçüldü. Panel <b style={STRONG}>1136 px</b> ve sol kenarı{" "}
            <b style={STRONG}>x = 144.5</b>; başlık (<code>.svm-sub</code>) ve süreç
            rayı (<code>.svm-flow</code>) da 1136 px ve x = 144.5. Üçü aynı pikselde
            başlıyor. Panel ayrıca 156 piksel yüksek - silinen sahne aynı genişlikte
            320 piksel tutuyordu.
          </p>
        </div>

        {/* -------------------------------------------------------- teşhis */}
        <div style={BOX}>
          <b style={KICKER}>Teşhis: dört turun ortak hatası</b>
          <p style={P}>
            Bölüm dört tur gördü ve dördünde de eklenen şey bir{" "}
            <b style={STRONG}>nesne</b> oldu: sahne, kanal, uçan belge, klasör. Her
            eklemede bölüm ağırlaştı. Son turda sahne paneli tamamen yuttu ve bölümün
            görünür metni 7.210 karaktere çıktı - yani &quot;texte boğmuşsun&quot;.
          </p>
          <p style={P}>
            Müşterinin istediği denge tek cümlede:{" "}
            <b style={STRONG}>
              odak svg görsel ve animasyonlarda olacak ama texti de koymalıyız ki
              açıklayıcı olsun.
            </b>{" "}
            Panel bunu zaten yapıyordu. İkonlu satır bir liste değil bir künye, çizim
            de iki listenin arasında duran cümle: metin çizimin{" "}
            <b style={STRONG}>yanında</b>, içinde değil.
          </p>
          <p style={P}>
            Bu turun kuralı: <b style={STRONG}>hiçbir aday çizimi değiştirmiyor.</b>{" "}
            Beğenilen kare aynı kalıyor, üç aday yalnızca o karenin ne kadar
            kımıldadığını değiştiriyor. Üçünün arasındaki fark bir tasarım farkı değil
            bir <b style={STRONG}>ölçü</b> farkı: sürekli ve alçak, seyrek ve sakin,
            seyrek ve yüksek.
          </p>
        </div>

        {/* --------------------------------------------------------- ölçüm */}
        <div style={{ marginTop: 16, maxWidth: "76ch", overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontFamily: "var(--font-sans)",
              fontSize: 13,
            }}
          >
            <caption
              style={{
                textAlign: "left",
                paddingBottom: 10,
                fontSize: 12.5,
                lineHeight: 1.6,
                color: "var(--text-600)",
              }}
            >
              Ölçüm. Animasyon sayısı gerçekten çalışan animasyonlardan
              (getAnimations), kural taraması da ham cssText üzerinden yapıldı.
              Yükseklikler sabit genişlikli aynı köken iframe içinde, blok başlığı
              hariç; üç adayda aynı çünkü üçü de canlı bileşenin kendisi. Dört
              genişlikte de yatay taşma sıfır (scrollWidth ile değil, gerçekten
              kaydırılarak) ve punto dördünde de 13.5 px. Son satır kıyas için:
              kapanan turun sahnesi.
            </caption>
            <thead>
              <tr>
                {COLS.map((c, i) => (
                  <th
                    key={c || "k"}
                    scope="col"
                    style={{
                      padding: "0 10px 8px",
                      borderBottom: "1px solid var(--border)",
                      textAlign: i === 0 ? "left" : "right",
                      fontSize: 11.5,
                      fontWeight: 600,
                      color: "var(--blue-900)",
                    }}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MEASURED.map((r) => (
                <tr key={r.k}>
                  <th scope="row" style={CELL_K}>
                    {r.k}
                  </th>
                  {r.v.map((v, i) => (
                    <td key={i} style={CELL}>
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --------------------------------------------------------- taban */}
        <div style={BOX}>
          <b style={KICKER_BASE}>Taban · bugün canlıda olan hâli</b>
          <p style={P}>
            Geri alınan panel, artık hareketiyle birlikte. Müşterinin &quot;şu attığım
            görseldeki iyi&quot; dediği kare hâlâ burada: turun{" "}
            <b style={STRONG}>%73.5&apos;i</b> tam olarak o kare. 18.1 saniyede bir,
            4.79 saniye süren bir devir soldan sağa geçiyor.
          </p>
          <p style={P}>
            Blok aşağıda canlı basılıyor, yani bu bir kopya değil{" "}
            <b style={STRONG}>bileşenin kendisi</b>. Bekleyip izleyin ya da hareketi
            durdurmak için imleci panelin üstüne getirin.
          </p>
        </div>
      </div>

      <Frame>
        <AccountingHandover />
      </Frame>

      <div className="container-o">
        <div style={BOX}>
          <b style={KICKER}>Kazanan büyütüldü: dizi artık panelleri de kapsıyor</b>
          <p style={P}>
            Labdaki adayda parlayan tek şey <b style={STRONG}>bağdı</b> - 1136 piksellik
            bir bloğun içinde 96 piksel. Müşterinin tarifi bundan geniş:{" "}
            <b style={STRONG}>
              soldaki kutu önce line olarak yanar, ordan bi enerji gelir, ota kısma
              aktarılır, içinden geçer ve size dönen kısmını aydınlatır.
            </b>{" "}
            Yani dizi üç durakta bir zincir ve iki panel de zincirin parçası. Canlıya
            giden hâl beş durak: sol panelin konturu → besleme çizgileri → defter →
            çıkış oku → sağ panel.
          </p>
          <p style={P}>
            <b style={STRONG}>Periyot 71 saniyeden 18.1 saniyeye indi.</b> 71 o
            adayda doğruydu, burada değil: hareketin kapladığı alan 1.926 px²&apos;den
            13.699 px²&apos;ye çıktı (sağ panelin zemini de sayılırsa 103.619 px²),
            yani bloğun %1.1&apos;i yerine %7.8&apos;i. Müşterinin animasyon
            politikası da bunu söylüyor - &quot;tek ya da 2 tane gözüküyorsa
            olabildiğince fazla olabilir kendini belli edip sayfada dikkat çekmesi
            için&quot;. 18.1 saniyede görünür hareket 4.79 saniye sürüyor, kalan 13.31
            saniye duruş karesi: görev döngüsü %26.5. 18.1 → 181, asal.
          </p>
          <p style={P}>
            <b style={STRONG}>Hareket bir kalıba dönüştü.</b> Keyframe&apos;lerin
            tamamı <code>src/app/css/aktarim.css</code> içinde (ad alanı{" "}
            <code>.akt-</code>) ve bu bölüm yalnızca değer veriyor: kaç durak, hangi
            sırada, hangi renkten hangi renge. <code>reduce</code> kapısı da kalıbın
            içinde, yani bir sonraki kullanan yerin onu yeniden yazması gerekmiyor.
            Bu depoda unutulan kapı tekrar eden bir hataydı.
          </p>
          <p style={P}>
            <b style={STRONG}>Tutulan sözler:</b> bölüm hâlâ bir sunucu bileşeni,
            tarayıcıya tek satır JS inmiyor. useReducedMotion geçmiyor, SVG filtresi
            yok, Math.random() yok, DOM&apos;a tek bir yeni öğe girmedi.{" "}
            <code>reduce</code> altında getAnimations bu bloktan{" "}
            <b style={STRONG}>sıfır</b> döndürüyor ve duruş karesi statik hâlin birebir
            aynısı (ölçüldü: kontur #e6e6e6, sağ zemin #e8f1fd, gölge yok). Dokuz kalem
            iki listede düz metin, listelerin adı sütun başlığının aynısı, iki çizim de
            aria-hidden. Fare panelin üstündeyken tur duruyor.
          </p>
          <p style={P}>
            <b style={STRONG}>Metin hiçbir karede sönmüyor.</b> Hareket kenarlıkta,
            zeminde ve işarette. Sağ panelin zemini bilerek AÇILIYOR (#e8f1fd →
            #f0f6fe), koyulaşmıyor: sütun başlığı 11.5 px ve --blue-700, yani mavi
            zeminde zaten 3.5:1&apos;de. Koyulaşan zemin onu 3.23:1&apos;e
            indiriyordu; açılan zeminle 3.67:1&apos;e çıkıyor. Kalem metni 17.58:1 →
            18.42:1.
          </p>
        </div>

        {/* ------------------------------------------------- kapanan tur */}
        <div style={{ ...BOX, marginTop: 40 }}>
          <b style={KICKER_BASE}>Kapanan tur · bölümü yeniden tasarlayan üç aday</b>
          <p style={P}>
            Dördüncü turun üç alternatifi. Üçü de bölümü{" "}
            <b style={STRONG}>yeniden tasarlıyordu</b>; müşteri panelin kendisini
            seçtiği için soru kapandı. Ekranda bırakıldılar çünkü karar geri alınabilir
            olsun - künyeleri tek satıra indi.
          </p>
        </div>
      </div>

      {CLOSED.map((c) => (
        <div key={c.id}>
          <div className="container-o">
            <div style={BOX}>
              <b style={KICKER_BASE}>
                Kapandı · {c.id} · {c.name}
              </b>
              <p style={P}>{c.idea}</p>
            </div>
          </div>
          <Frame>
            <c.Section />
          </Frame>
        </div>
      ))}

      <div className="container-o" style={{ paddingBottom: 72 }} />
    </main>
  );
}
