import SmartLink from "@/components/shared/SmartLink";
import {
  ArrowRight,
  Boxes,
  Building2,
  ChartCandlestick,
  Check,
  Code2,
  Landmark,
  Receipt,
  Repeat,
  Scale,
  ShoppingBag,
  Stethoscope,
  UserRound,
} from "lucide-react";
import CodeSim from "@/components/home/CodeSim";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { sectorHref } from "@/lib/sectors";

/* §9 · beyaz zeminde altı sektör. Bölüm "kimler için çalışıyoruz" sorusunu
   soruyordu; artık cevabı doğrudan veriyor ve başlık "Hizmet verdiğimiz
   sektörler". Fark yalnızca kelimede değil: soru sorulduğunda dördün eksik
   kalanı "başka kimler?" oluyordu, sektör listesi olarak okununca aynı liste
   kapalı bir küme gibi duruyor. Finans ve sağlık da bu yüzden eklendi.

   Kart sayısı dörtten altıya çıkınca ızgara dört sütunda 4+2 veriyordu, yani
   ikinci satır yarım kalıyordu. Üç sütuna inildi (bkz. qcta.css · .pf6-grid),
   altı kart 3+3 oturuyor ve kartlar da genişliyor.

   Her kart başlık + tek cümle, ve kartın tabanına iliştirilmiş küçük bir
   pencere. Pencere kartın kendisi değil, içindeki tek koyu yüzey; altı pencere
   satır boyunca aynı hizada bitiyor çünkü metin bloğu boşluğu üstleniyor.

   Bütün döngüler CSS (transform / opacity / clip-path): ana iş parçacığına
   dokunmuyorlar, sekme arkadayken tarayıcı hepsini durduruyor ve reduce bloğu
   her birini görünür bir karede donduruyor.

   Siyah taşıma bandı hâlâ ayrı bir kapı, yedinci kart değil. */

/* ---- e-commerce ticker: six sample rows, the first two repeated at the end.
   The track travels exactly six rows, so the wrap back to zero lands on the
   same pair that is already on screen and the jump is invisible. Two rows are
   visible at any moment; the rest of the set never exists on screen. */
const FEED = [
  { r: false, t: "Yeni sipariş", c: "Berlin", a: "€120" },
  { r: true, t: "Ödeme alındı", c: "Londra", a: "£64" },
  { r: false, t: "Yeni sipariş", c: "Amsterdam", a: "$180" },
  { r: true, t: "Ödeme alındı", c: "Dubai", a: "AED 350" },
  { r: false, t: "Yeni sipariş", c: "Toronto", a: "$240" },
  { r: true, t: "Ödeme alındı", c: "Paris", a: "€38" },
];
const FEED_TRACK = [...FEED, FEED[0], FEED[1]];

/* six bars is enough to read as "every month", twelve was a chart */
const MONTHS = Array.from({ length: 6 }, (_, i) => i);

function ShopSim() {
  return (
    <div className="pf2-sim pf2-shop pf2-sim-dark" aria-hidden="true">
      <div className="pf2-simhead">
        <span className="pf2-live" />
        <b>Bildirimler</b>
      </div>
      <div className="pf2-feed">
        <ul className="pf2-feedtrack">
          {FEED_TRACK.map((n, i) => (
            <li className="pf2-nrow" key={i}>
              <span className="pf2-nic">
                {n.r ? (
                  <Receipt size={11} strokeWidth={2} />
                ) : (
                  <ShoppingBag size={11} strokeWidth={2} />
                )}
              </span>
              <span className="pf2-ntxt">
                <b>{n.t}</b>
                <i>· {n.c}</i>
              </span>
              <span className="pf2-namt">{n.a}</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="pf2-note">Tutarlar temsilidir.</p>
    </div>
  );
}

function ChatSim() {
  return (
    <div className="pf2-sim pf2-chat" aria-hidden="true">
      <div className="pf2-simhead">
        <span className="pf2-av">
          <UserRound size={11} strokeWidth={2} />
        </span>
        <b>Müşteri</b>
        <i>çevrimiçi</i>
      </div>
      <div className="pf2-thread">
        <span className="pf2-bub pf2-bub-q">Fatura şirket adına olur mu?</span>
        <span className="pf2-slot">
          <span className="pf2-typing">
            <i />
            <i />
            <i />
          </span>
          <span className="pf2-bub pf2-bub-a">Evet, tahsilat da öyle.</span>
        </span>
      </div>
    </div>
  );
}

function EstateSim() {
  return (
    <div className="pf2-sim pf2-est" aria-hidden="true">
      <div className="pf2-flow">
        <span className="pf2-node">
          <span className="pf2-nodeic">
            <Building2 size={13} strokeWidth={1.9} />
          </span>
          <b>Mülk</b>
          <i>şirket adına</i>
        </span>
        {/* the wire carries no label any more: the two nodes already say what
            travels down it, and the pill sat in the middle of the card doing
            nothing but crowding it */}
        <span className="pf2-wire pf2-wire-bare">
          <span className="pf2-run">
            <i />
          </span>
        </span>
        <span className="pf2-node pf2-node-on">
          <span className="pf2-nodeic">
            <Landmark size={13} strokeWidth={1.9} />
          </span>
          <b>Şirketiniz</b>
          <i>tahsilat</i>
        </span>
      </div>
      <div className="pf2-months">
        {MONTHS.map((m) => (
          <span className="pf2-m" key={m}>
            <i style={{ "--d": `${m * 0.24}s` } as React.CSSProperties} />
          </span>
        ))}
      </div>
    </div>
  );
}

/* Finans dosyasının üç durağı. İlk ikisi bizim yaptığımız iş, üçüncüsü kurumun
   işi ve bilerek "bekliyor" durumunda kalıyor: dizide dördüncü bir "onaylandı"
   satırı yok, çünkü onu buraya yazmak sahnede verilemeyecek bir söz olurdu. */
const LICENSE_STAGES = [
  { t: "Kapsam", done: true },
  { t: "Dosya", done: true },
  { t: "İnceleme", done: false },
];

/* Sağlık dosyasında listelenenler bizim hazırladığımız evrak; ruhsatın kendisi
   listede yok, o pencerenin altındaki notta duruyor. */
const MED_DOCS = ["Tesis ve adres", "Personel belgeleri", "Faaliyet kapsamı"];

/* ---- 5 · finans ve yatırım: dosya hazırlanır, kararı kurum verir ----
   Sahne kasıtlı olarak tamamlanmıyor. İlk iki durak bitmiş görünüyor (kapsamın
   çıkarılması ve dosyanın hazırlanması bizim elimizde), üçüncü durakta amber
   bir nokta atıyor ve orada kalıyor. Alttaki tarama çizgisi de uçtan uca gidip
   başa dönüyor; doluluk göstermiyor. Bunun sebebi estetik değil: yüzdeyle
   dolan bir çubuk, süresini bilmediğimiz bir incelemeye örtük bir takvim
   biçer, ki kesin süre taahhüdü vermiyoruz. Onay hiçbir karede görünmüyor. */
function LicenseSim() {
  return (
    <div className="pf2-sim pf6-lic" aria-hidden="true">
      <div className="pf2-simhead">
        <span className="pf6-lic-ic">
          <Scale size={11} strokeWidth={2} />
        </span>
        <b>Lisans başvurusu</b>
        <i>incelemede</i>
      </div>
      <ol className="pf6-rail">
        {LICENSE_STAGES.map((s) => (
          <li className="pf6-stage" key={s.t} data-s={s.done ? "done" : "wait"}>
            <span className="pf6-mark">
              {s.done ? <Check size={11} strokeWidth={2.6} /> : <i className="pf6-wait" />}
            </span>
            <b>{s.t}</b>
          </li>
        ))}
      </ol>
      <span className="pf6-sweep">
        <i />
      </span>
      <p className="pf2-note">Onayı düzenleyici kurum verir.</p>
    </div>
  );
}

/* ---- 6 · sağlık ve medikal: evrak sırayla tamamlanır, ruhsat ayrı bir kapı ----
   Üç satır sırayla işaretleniyor ve başa dönüyor; işaretlenen her şey bizim
   hazırladığımız evrak. Başlıktaki nabız çizgisi sektörün imzası ve penceredeki
   tek süs: kalan her şey listenin kendisi. Dördüncü bir satır olarak "ruhsat
   onayı" eklemedik, çünkü o satırın işaretlenmesi bu sahnenin veremeyeceği bir
   söz olurdu; onun yerine pencerenin altındaki not izni kimin verdiğini
   düpedüz söylüyor. */
function MedicalSim() {
  return (
    <div className="pf2-sim pf6-med" aria-hidden="true">
      <div className="pf2-simhead">
        <b>Ruhsat evrakı</b>
        <svg className="pf6-pulse" viewBox="0 0 44 12">
          <polyline points="0,6 9,6 12,2.5 15,9.5 18,6 27,6 30,3.5 33,8.5 36,6 44,6" />
        </svg>
      </div>
      <ul className="pf6-docs">
        {MED_DOCS.map((d, i) => (
          <li
            className="pf6-doc"
            key={d}
            style={{ "--d": `${i * 0.55}s` } as React.CSSProperties}
          >
            <span className="pf6-tick">
              <Check size={10} strokeWidth={2.6} />
            </span>
            <b>{d}</b>
          </li>
        ))}
      </ul>
      <p className="pf2-note">İzni ilgili sağlık otoritesi verir.</p>
    </div>
  );
}

/* `s` kartın iç sayfa adresinin slug'ı. Sektörler artık ana sayfada bir
   cümleyle bitmiyor: her birinin /sektorler/<slug> adresinde kendi sayfası
   olacak, çünkü arama tarafında insanlar ülke ve sektörü birlikte arıyor
   ("dubaide yazılım şirketi kurmak") ve bir kart o sorguyu karşılayamıyor.

   Şu an yalnızca yazılım ve teknolojinin sayfası var. Kalan beş slug bilerek
   duruyor: SmartLink adresin yayında olup olmadığını lib/routes.ts'e soruyor,
   olmayan adresi bağlantı yapmıyor ve sönük bir "yakında" rozetiyle
   basıyor. Yani yol haritası görünür kalıyor, ölü tıklama olmuyor. Bir sektör
   lib/sectors.ts'e girdiği anda buradaki çıkış kendiliğinden canlanıyor —
   bu dosyaya dokunmak gerekmiyor. */
const PROFILES = [
  {
    Icon: Boxes,
    t: "E-ticaret",
    s: "e-ticaret",
    l: "Kartla tahsilat, çoklu pazar yeri ve lojistik tek yapıda toplanır.",
    Sim: ShopSim,
  },
  {
    Icon: Code2,
    t: "Yazılım ve teknoloji",
    s: "yazilim-ve-teknoloji",
    l: "Abonelik ve uygulama içi satış, ödeme altyapısıyla birlikte kurulur.",
    Sim: CodeSim,
  },
  {
    Icon: UserRound,
    t: "Danışmanlık",
    s: "danismanlik",
    l: "Yurt dışı müşteriye şirket adına sözleşme, fatura ve tahsilat.",
    Sim: ChatSim,
  },
  {
    Icon: Building2,
    t: "Gayrimenkul",
    s: "gayrimenkul",
    l: "Mülk şirket altında durur, kira şirket hesabına akar.",
    Sim: EstateSim,
  },
  /* Son iki sektör düzenlemeye tabi ve cümleleri de bunu saklamıyor. İkisinde
     de kurgunun kendisi değil, izin katmanı belirleyici: pricing.ts'teki
     ACTIVITY_FACTOR finansı 1.3, sağlığı 1.15 ile çarpıyor, yani süreç bizim
     tarafımızda da daha ağır. Cümleler bu yüzden "kurarız" değil "önden
     netleştiririz" diyor — lisansı veren biz değiliz, dosyayı hazırlayan biziz.
     Kartların altındaki notlar da aynı sınırı bir kez daha çiziyor. */
  {
    Icon: ChartCandlestick,
    t: "Finans ve yatırım",
    s: "finans-ve-yatirim",
    l: "Faaliyet lisansa tabi; kapsamı ve dosyayı önden netleştiriyoruz.",
    Sim: LicenseSim,
  },
  {
    Icon: Stethoscope,
    t: "Sağlık ve medikal hizmetler",
    s: "saglik-ve-medikal",
    l: "Ruhsat şartları şirket kurgusunu belirler; ikisi birlikte planlanır.",
    Sim: MedicalSim,
  },
];

export default function Profiles() {
  return (
    <section className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="sec-head">
          {/* Vurgu son kelimede kalıyor: cümlenin taşıdığı bilgi "sektörler",
              "hizmet verdiğimiz" ise sadece ona giden yol. Eskiden vurgulanan
              "çalışıyoruz?" fiiliydi ve başlıkta fiil kalmadı. */}
          <SplitWords
            as="h2"
            text="Hizmet verdiğimiz sektörler"
            accent="sektörler"
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.2}>
            <p className="sec-lead">Kurgu, sektöre göre değişiyor.</p>
          </FadeUp>
        </div>

        {/* Kademe altı karta göre kısaldı: 0.06'lık adım altıncı kartı girişten
            0.44s sonraya atıyordu ve o kart ekrana girdikten sonra bir süre boş
            duruyordu. 0.045 ile en geç kart 0.34s'de açılıyor, sıralama duygusu
            duruyor. */}
        <div className="pf2-grid pf6-grid">
          {PROFILES.map((p, i) => (
            <FadeUp key={p.t} className="pf2-cell" delay={0.12 + i * 0.045}>
              <article className="pf2-card">
                <div className="pf2-body">
                  <span className="pf2-ic" aria-hidden="true">
                    <p.Icon size={17} strokeWidth={1.9} />
                  </span>
                  <h3>{p.t}</h3>
                  <p>{p.l}</p>
                  {/* Kartın iç sayfaya çıkışı. Tek satır, metin bloğunun
                      sonunda: pencere zaten margin-top:auto ile kartın
                      tabanına yapışık olduğu için altı pencere hâlâ aynı
                      hizada bitiyor, düzen bozulmuyor.

                      aria-label kartın başlığını taşıyor — altı kartın altı
                      bağlantısı da "Detayları gör" dese, bağlantı listesini
                      tek başına gezen bir ekran okuyucu kullanıcısı hangisinin
                      hangi sektör olduğunu ayırt edemezdi. */}
                  <SmartLink
                    href={sectorHref(p.s)}
                    className="sx-out"
                    aria-label={`${p.t}, detayları gör`}
                  >
                    Detayları gör
                    <ArrowRight size={13} strokeWidth={2.2} aria-hidden="true" />
                  </SmartLink>
                </div>
                <p.Sim />
              </article>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.42}>
          <div className="pf2-move">
            <span className="pf2-move-ic" aria-hidden="true">
              <Repeat size={22} strokeWidth={1.9} />
            </span>
            <div>
              <h3>Şirketiniz zaten var mı? Ortac&apos;a taşıyın.</h3>
              <p>
                Mevcut kaydınızı, beyanlarınızı ve banka hareketlerinizi inceleyip geçiş planı
                çıkarıyoruz. Eksik varsa önce onu kapatıyoruz.
              </p>
            </div>
            <SmartLink href="/sirket-tasima" className="btn btn-primary">
              Şirketimi taşı
              <ArrowRight size={15} strokeWidth={2.1} />
            </SmartLink>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
