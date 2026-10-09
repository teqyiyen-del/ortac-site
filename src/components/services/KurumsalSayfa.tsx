import type { LucideIcon } from "lucide-react";
import { sssDugumu } from "@/lib/seo";
import {
  ArrowLeftRight,
  ArrowRight,
  BookOpenCheck,
  Briefcase,
  Building2,
  Calculator,
  CalendarClock,
  Check,
  ChevronRight,
  Coins,
  DoorClosed,
  FileText,
  Fingerprint,
  Gavel,
  Globe,
  BadgeCheck,
  Armchair,
  MapPin,
  Minus,
  Network,
  PenLine,
  PieChart,
  Receipt,
  Search,
  Send,
  ShieldCheck,
  Stamp,
  TriangleAlert,
  UserCog,
  Users,
} from "lucide-react";

import Nav from "@/components/Nav";
import PageHero from "@/components/shared/PageHero";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import SmartLink from "@/components/shared/SmartLink";
import { Flag } from "@/components/shared/CountryPicker";
import CountryFaq from "@/components/CountryFaq";
import FinalCta from "@/components/FinalCta";
import type { KurumsalIkon, KurumsalVeri } from "@/lib/kurumsalDubai";

/* Stil dosyası globals.css'in @import listesine değil BURAYA bağlı
   (shared/FotoGiris.tsx'in css/dubai-hero.css'i bağladığı gibi): aynı turda
   vergi ve AML sayfaları da yazılıyordu ve üç ajanın aynı @import bloğuna
   satır eklemesi çakışma demekti (tuzak P). */
import "@/app/css/svc-kurumsal.css";

/* ============================================================================
   KURUMSAL DANIŞMANLIK SAYFASI · üç ülkenin ortak gövdesi (09.10.2026)
   /dubai/kurumsal-danismanlik · /ingiltere/kurumsal-danismanlik ·
   /kktc/kurumsal-danismanlik aynı bölümleri kendi verisiyle basıyor.
   Metin: lib/kurumsalDubai.ts (biçim de orada) · kurumsalIngiltere.ts ·
   kurumsalKktc.ts. Biçim: css/svc-kurumsal.css (.skr-).

   Burak: "Kurumsal danışmanlığa geliyorum, bir şey yok. Üç dört kart
   koymuşsun, bitmiş. Banka, şirket kuruluşu, muhasebe çok güzel oldu: SVG
   görseller var, animasyonlar var. Bunları da öyle doldur, üşenme."
   Örnek alınan kalıp BankaSayfa (ortak gövde + ülke verisi, sahne panosu +
   satırlar, adım kartları, CountryFaq, FinalCta).

   DOKUZ DURAK, zemin beyaz ve kırık beyaz sırayla (hafıza: tam siyah bölüm
   yok; siyah yalnız bölümün içindeki büyük gece kartta):
     giriş       foto giriş (PageHero · art dalı)
     ne zaman    altı durum kartı                              beyaz
     yapı        ÇİZİM 1 yapı ağacı (GECE pano) + üç satır     kırık beyaz
     kapsam      üç kapsam grubu + kapsam dışı (amber not)     beyaz
     değişiklik  ÇİZİM 2 değişiklik akışı + altı tür           kırık beyaz
     takvim      ÇİZİM 3 yıl halkası, GECE kartında            beyaz
     adımlar     beş adım                                      kırık beyaz
     ilgili      dört hizmet bağlantısı, GECE panoda           beyaz

   09.10.2026 · ÜÇ GECE KART. İlk yazımda yalnız takvim koyuydu. Burak: "Şu
   an çok beyaz akıyor sayfa ... 'Şirketin bir yılı' kısmını siyah yapmışsın,
   o güzel, dinamizm katıyor. Daha fazla yerde kullan. İki beyaz bir siyah
   gibi düşün." Yapı panosu ve ilgili hizmetler listesi geceye döndü; zeminler
   aynı, art arda iki koyu kart yok. İşin tamamı svc-kurumsal.css'te.
     SSS         CountryFaq                                    beyaz
     kapanış     FinalCta ("İletişime geçin")

   ÜÇ ÇİZİM DE aria-hidden: iddia başlıkta, satırlarda ve listede; çizim
   aynı şeyi gösteriyor. Hareketin tamamı CSS'te ve
   prefers-reduced-motion: no-preference kapısında (tuzak A: JS'te reduce
   okunmuyor). Ekran dışında durdurma layout'taki EkranDisiDurdur'dan
   geliyor (bölüm ekrandan çıkınca içindeki CSS animasyonları duraklıyor).

   RENK KURALI: ağırlık mavide; yeşil yalnız para (sermaye, bloke), amber
   şart, risk ve not (vergi uyarısı, kapsam dışı, "kendiliğinden olmaz"). */

const IKON: Record<KurumsalIkon, LucideIcon> = {
  yapi: Network,
  ortak: Users,
  yonetici: UserCog,
  faaliyet: Briefcase,
  lisans: BadgeCheck,
  masa: Armchair,
  dunya: Globe,
  kapat: DoorClosed,
  takvim: CalendarClock,
  kayit: BookOpenCheck,
  karar: Gavel,
  dosya: FileText,
  ara: Search,
  onay: Stamp,
  adres: MapPin,
  kimlik: Fingerprint,
  sermaye: Coins,
  uyari: TriangleAlert,
  muhasebe: Calculator,
  vergi: Receipt,
  uyum: ShieldCheck,
  kurulus: Building2,
  isim: PenLine,
  devir: ArrowLeftRight,
  pay: PieChart,
};

/* İkonun anlamından gelen ton (satır kendi tonunu verirse o geçerli). */
const TON: Partial<Record<KurumsalIkon, "yesil" | "amber">> = {
  sermaye: "yesil",
  uyari: "amber",
  kapat: "amber",
};

function Kuyu({ icon, ton, boy = 18 }: { icon: KurumsalIkon; ton?: "yesil" | "amber"; boy?: number }) {
  const I = IKON[icon];
  return (
    <span className="skr-ic" data-ton={ton ?? TON[icon]} aria-hidden="true">
      <I size={boy} strokeWidth={1.9} />
    </span>
  );
}

function Bas({ b }: { b: { heading: string; accent: string; lead?: string } }) {
  return (
    <div className="sec-head">
      <SplitWords as="h2" text={b.heading} accent={b.accent} className="h2" />
      {b.lead ? (
        <FadeUp delay={0.2}>
          <p className="sec-lead">{b.lead}</p>
        </FadeUp>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ ÇİZİM 1
   YAPI AĞACI. Üstte ortaklar, altta üç ülkenin şirketi. Sayfanın ülkesi dolu
   çizgiyle bağlı ve mavi; öteki ikisi kesik çizgi ("ihtiyaç olursa").
   Şirketler arasında sahiplik çizgisi yok (kurumsalDubai.ts · KURUMSAL_DALLAR).
   Bağlar tek SVG: 300 x 56, gövde 150'den iniyor, 28'de üç kola ayrılıyor;
   kolların x'i üç eşit sütunun merkezi (50 · 150 · 250). Kutu genişliğine
   gerilen SVG'de çizgi kalınlığı vector-effect ile sabit.
   Hareket: dolu kolda aşağı akan kesikler (svc-kurumsal.css · skrAkan). */
const DAL_X = [50, 150, 250];
function SahneAgac({ agac, slug }: { agac: KurumsalVeri["yapi"]["agac"]; slug: KurumsalVeri["slug"] }) {
  return (
    <div className="skr-agac" data-yaricap="serbest">
      <div className="skr-agac-ust">
        <span className="skr-agac-ui">
          <Users size={18} strokeWidth={1.9} />
        </span>
        <b>{agac.ust}</b>
      </div>
      <svg className="skr-agac-bag" viewBox="0 0 300 56" preserveAspectRatio="none" focusable="false">
        {agac.dallar.map((d, k) => {
          const yol = `M150 0 V28 H${DAL_X[k]} V56`;
          const aktif = d.ulke === slug;
          return (
            <g key={d.ulke}>
              <path className="skr-agac-yol" data-aktif={aktif ? "" : undefined} d={yol} />
              {aktif ? <path className="skr-agac-akan" d={yol} /> : null}
            </g>
          );
        })}
      </svg>
      <ul className="skr-agac-dal">
        {agac.dallar.map((d) => (
          <li key={d.ulke} className="skr-agac-k" data-aktif={d.ulke === slug ? "" : undefined}>
            {/* Flag çıplak svg basıyor (tuzak H): kap sabit px + overflow hidden */}
            <span className="skr-agac-bayrak">
              <Flag country={d.ulke} />
            </span>
            <b>{d.ad}</b>
            <small>{d.alt}</small>
          </li>
        ))}
      </ul>
      <p className="skr-agac-not">
        <span>
          <i data-cizgi="dolu" />
          Şirketiniz
        </span>
        <span>
          <i data-cizgi="kesik" />
          İhtiyaç olursa
        </span>
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ ÇİZİM 2
   DEĞİŞİKLİK AKIŞI. Üç durak yan yana (karar, başvuru, kayıt); aralarında
   ok. Bir belge birinci duraktan üçüncüye yürüyor, geçtiği durak maviye
   dönüyor. Belgenin yolu kabın genişliğinin üçte biri (cqw): üç sütun eşit,
   merkezleri 1/6 · 3/6 · 5/6. Telefonda da yan yana (üç dar sütun); alt
   yazı orada gizli, ad kalıyor. */
const DURAK_IKON = [Gavel, Send, BookOpenCheck];
function SahneAkis({ akis }: { akis: KurumsalVeri["degisiklik"]["akis"] }) {
  return (
    <div className="skr-akis" data-yaricap="serbest">
      <ol className="skr-akis-l">
        {akis.slice(0, 3).map((d, k) => {
          const I = DURAK_IKON[k];
          return (
            <li key={d.ad} className="skr-akis-d" data-k={k}>
              <span className="skr-akis-ic">
                <I size={22} strokeWidth={1.9} />
              </span>
              <b>{d.ad}</b>
              <small>{d.alt}</small>
              {k < 2 ? <ChevronRight className="skr-akis-ok" size={18} strokeWidth={2.2} /> : null}
            </li>
          );
        })}
      </ol>
      <span className="skr-akis-belge">
        <FileText size={15} strokeWidth={2} />
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ ÇİZİM 3
   YIL HALKASI. 320 x 320; halka r 118, on iki dilim. `ay` taşıyan kalem
   halkada numaralı bir işaret (numara listedekiyle aynı); `ay` taşımayan
   ("değişiklik olunca") yalnız listede. Açı: 12. ay tepede, saat yönünde.
   Hareket: halkanın üstünde dönen bir nokta ve kuyruğu (skrDon). Halkadaki
   konumlar TEMSİLÎ (şirketin yılı kuruluş tarihine göre başlıyor); gerçek
   bilgi listedeki "zaman" çipinde. */
const R = 118;
const nokta = (ay: number, r = R) => {
  const a = ((ay % 12) / 12) * Math.PI * 2 - Math.PI / 2;
  /* iki ondalık: sunucu ve istemci aynı metni bassın (hidratasyon) */
  return { x: +(160 + r * Math.cos(a)).toFixed(2), y: +(160 + r * Math.sin(a)).toFixed(2) };
};
function SahneYil({ kalemler, orta }: { kalemler: KurumsalVeri["takvim"]["kalemler"]; orta: string }) {
  return (
    <svg className="skr-yil-svg" viewBox="0 0 320 320" focusable="false" data-yaricap="serbest">
      <circle className="skr-yil-halka" cx="160" cy="160" r={R} />
      {Array.from({ length: 12 }, (_, i) => {
        const a = nokta(i + 0.5, R - 9);
        const b = nokta(i + 0.5, R + 9);
        return <line key={i} className="skr-yil-dilim" x1={a.x} y1={a.y} x2={b.x} y2={b.y} />;
      })}
      <g className="skr-yil-don">
        <circle className="skr-yil-kuyruk" cx="160" cy="160" r={R} pathLength={100} />
        <circle className="skr-yil-nokta" cx="160" cy={160 - R} r="5" />
      </g>
      {kalemler.map((k, i) => {
        if (!k.ay) return null;
        const p = nokta(k.ay);
        return (
          <g key={k.ad} className="skr-yil-isaret" data-ton={k.ton}>
            <circle cx={p.x} cy={p.y} r="15" />
            <text x={p.x} y={p.y + 4.6} textAnchor="middle">
              {i + 1}
            </text>
          </g>
        );
      })}
      <text className="skr-yil-orta" x="160" y="158" textAnchor="middle">
        {orta}
      </text>
      <text className="skr-yil-alt" x="160" y="180" textAnchor="middle">
        şirketin yılı
      </text>
    </svg>
  );
}

export default function KurumsalSayfa({ veri: V }: { veri: KurumsalVeri }) {
  const H = V.hero;
  return (
    <>
      <Nav />
      <main id="icerik" className="skr">
        <PageHero
          crumb={H.crumb}
          title={H.title}
          accent={H.accent}
          lead={H.lead}
          /* `art` yalnız "foto giriş dalı" demek (BankaSayfa'daki notla aynı):
             boş fragment sınırı boş geçiyor, o yüzden gerçek bir düğüm. */
          art={<i hidden />}
          cta={H.cta}
          trust={H.trust.map((t) => {
            const I = IKON[t.icon];
            return { icon: <I size={15} strokeWidth={2} aria-hidden="true" />, line: t.line };
          })}
        />

        {/* ---------------------------------------------------- NE ZAMAN GEREKİR
            Altı durum kartı: 1 → 2 (720) → 3 (1024). */}
        <section id={V.durum.id} className="sec-pad">
          <div className="container-o">
            <Bas b={V.durum} />
            <ul className="skr-durum">
              {V.durum.items.map((d, i) => (
                <li key={d.title}>
                  <FadeUp className="skr-kart" delay={0.06 + i * 0.04}>
                    <Kuyu icon={d.icon} boy={20} />
                    <h3 className="skr-kart-t">{d.title}</h3>
                    <p className="skr-kart-p">{d.line}</p>
                  </FadeUp>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------------- YAPI
            Ağaç solda, üç satır sağda. Üçüncü satır sitenin duruşu (amber):
            şirket kurmak otomatik vergi avantajı vermez. */}
        <section id={V.yapi.id} className="sec-pad skr-kirik">
          <div className="container-o">
            <Bas b={V.yapi} />
            <div className="skr-bol">
              <FadeUp className="skr-sahne" delay={0.1}>
                <div aria-hidden="true">
                  <SahneAgac agac={V.yapi.agac} slug={V.slug} />
                </div>
              </FadeUp>
              <ul className="skr-sat">
                {V.yapi.items.map((s, i) => (
                  <li key={s.title}>
                    <FadeUp className="skr-s" delay={0.12 + i * 0.05}>
                      <Kuyu icon={s.icon} ton={s.ton} boy={20} />
                      <div>
                        <h3 className="skr-s-t">{s.title}</h3>
                        <p className="skr-s-p">{s.line}</p>
                      </div>
                    </FadeUp>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- KAPSAM
            Üç grup kartı (dörder madde) ve altında kapsam dışı. Kapsam dışı
            bir NOT, o yüzden amber zeminli tek kutu (dört kenar eşit, şerit
            yok); maddeleri eksi işaretli. */}
        <section id={V.kapsam.id} className="sec-pad">
          <div className="container-o">
            <Bas b={V.kapsam} />
            <ul className="skr-grup">
              {V.kapsam.gruplar.map((g, i) => (
                <li key={g.title}>
                  <FadeUp className="skr-grup-k" delay={0.08 + i * 0.05}>
                    <div className="skr-grup-bas">
                      <Kuyu icon={g.icon} boy={20} />
                      <h3 className="skr-grup-t">{g.title}</h3>
                    </div>
                    <ul className="skr-grup-l">
                      {g.maddeler.map((m) => (
                        <li key={m}>
                          <Check size={16} strokeWidth={2.4} aria-hidden="true" />
                          {m}
                        </li>
                      ))}
                    </ul>
                  </FadeUp>
                </li>
              ))}
            </ul>
            <FadeUp className="skr-haric" delay={0.2}>
              <h3 className="skr-haric-t">{V.kapsam.haric.title}</h3>
              <ul className="skr-haric-l">
                {V.kapsam.haric.maddeler.map((m) => (
                  <li key={m}>
                    <Minus size={16} strokeWidth={2.4} aria-hidden="true" />
                    {m}
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>
        </section>

        {/* ------------------------------------------------------- DEĞİŞİKLİK
            Üstte akış sahnesi (kabın genişliğinde tek pano), altında altı
            değişiklik türü; her satırın etiketi "süre ya da şart". */}
        <section id={V.degisiklik.id} className="sec-pad skr-kirik">
          <div className="container-o">
            <Bas b={V.degisiklik} />
            <FadeUp className="skr-akis-pano" delay={0.1}>
              <div aria-hidden="true">
                <SahneAkis akis={V.degisiklik.akis} />
              </div>
            </FadeUp>
            <ul className="skr-tur">
              {V.degisiklik.items.map((t, i) => (
                <li key={t.title}>
                  <FadeUp className="skr-tur-k" delay={0.08 + i * 0.04}>
                    <Kuyu icon={t.icon} ton={t.ton} />
                    <div className="skr-tur-m">
                      <h3 className="skr-s-t">{t.title}</h3>
                      <p className="skr-s-p">{t.line}</p>
                    </div>
                    <span className="skr-etiket" data-ton={t.ton}>
                      {t.tag}
                    </span>
                  </FadeUp>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ----------------------------------------------------------- TAKVİM
            Gece kart: solda yıl halkası, sağda kalem listesi.
            Listedeki numara halkadaki işaretin numarası. */}
        <section id={V.takvim.id} className="sec-pad">
          <div className="container-o">
            <Bas b={V.takvim} />
            <FadeUp className="skr-yil" delay={0.1}>
              <div className="skr-yil-sahne" aria-hidden="true">
                <SahneYil kalemler={V.takvim.kalemler} orta={V.takvim.orta} />
              </div>
              <ol className="skr-yil-l">
                {V.takvim.kalemler.map((k, i) => (
                  <li key={k.ad} className="skr-yil-k">
                    <span className="skr-yil-no" data-ton={k.ton} aria-hidden="true">
                      {i + 1}
                    </span>
                    <div className="skr-yil-m">
                      <h3 className="skr-yil-t">{k.ad}</h3>
                      <p className="skr-yil-p">{k.line}</p>
                    </div>
                    <span className="skr-yil-z" data-ton={k.ton}>
                      {k.zaman}
                    </span>
                  </li>
                ))}
              </ol>
            </FadeUp>
          </div>
        </section>

        {/* ---------------------------------------------------------- ADIMLAR
            Beş adım alt alta satır: numara, kuyu, başlık, cümle. */}
        <section id={V.adimlar.id} className="sec-pad skr-kirik">
          <div className="container-o">
            <Bas b={V.adimlar} />
            <ol className="skr-adim">
              {V.adimlar.items.map((a, i) => (
                <li key={a.title}>
                  <FadeUp className="skr-adim-k" delay={0.08 + i * 0.05}>
                    <span className="skr-adim-n" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Kuyu icon={a.icon} />
                    <div className="skr-adim-m">
                      <h3 className="skr-kart-t">{a.title}</h3>
                      <p className="skr-kart-p">{a.line}</p>
                    </div>
                  </FadeUp>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ----------------------------------------------------------- İLGİLİ
            Dört hizmet bağlantısı. SmartLink: adres yayında değilse kart
            sönük ve tıklanamaz basılıyor (lib/routes.ts · isLive). */}
        <section id={V.ilgili.id} className="sec-pad">
          <div className="container-o">
            <Bas b={V.ilgili} />
            <ul className="skr-ilgili">
              {V.ilgili.items.map((h, i) => (
                <li key={h.href}>
                  <FadeUp className="skr-ilgili-f" delay={0.08 + i * 0.04}>
                    <SmartLink href={h.href} className="skr-ilgili-k">
                      <Kuyu icon={h.icon} boy={20} />
                      <span className="skr-ilgili-m">
                        <b>{h.title}</b>
                        <small>{h.line}</small>
                      </span>
                      <ArrowRight className="skr-ilgili-ok" size={18} strokeWidth={2} aria-hidden="true" />
                    </SmartLink>
                  </FadeUp>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id={V.faq.id} className="sec-pad">
          <div className="container-o">
            <Bas b={V.faq} />
            {/* SSS veri olarak da basılıyor (09.10.2026 · SEO rehberi denetimi) */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", ...sssDugumu(V.faq.items) }) }} />
            <CountryFaq items={V.faq.items} />
          </div>
        </section>

        <FinalCta kapanis={V.closing} />
      </main>
    </>
  );
}
