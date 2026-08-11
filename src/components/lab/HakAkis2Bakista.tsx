import Image from "next/image";
import {
  Boxes,
  Building2,
  ChartCandlestick,
  Code2,
  Compass,
  Handshake,
  History,
  Stamp,
  Stethoscope,
  Target,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { Flag } from "@/components/shared/CountryPicker";
import CountUp from "@/app/hakkimizda/CountUp";
import { CHAIN, COUNTRY_NAME } from "@/lib/brand";
import { TEAM_PHOTO } from "@/lib/media";
import { BASIS, FOR_WHOM, HOW, OPENING, WHERE } from "@/lib/about";

/* ============================================================================
   ADAY 2 · BİR BAKIŞTA — müşterinin cümlesinin birebir uygulanmışı
   İKİ bölüm · ad alanı .hk2-

   -------------------------------------------------------------- CEVABI NE
   Müşterinin cümlesi: "o kısmı kimiz diye paragraf ve vizyon misyon kısmıyla
   tutup bento kısmını ayrı başlıkla bi section daha ekleyip ana sayfadaki
   gibi bir şeylerle mi yapsak?"

   Bu aday o cümleyi harfiyen uyguluyor:
     A bölümü   "Kim olduğumuz"  fotoğraf + iki paragraf + vizyon/misyon
     B bölümü   kendi başlığı    bento, ana sayfa kalıbıyla yeniden kurulmuş

   ------------------------------------------- HANGİ ANA SAYFA KALIBI VE NEDEN
   Seçilen kalıp: TrustLayer (ana sayfa · "Neden Ortac Global?" · .bn- ad
   alanı). Beş aday kalıp arasından bu seçildi çünkü işi birebir aynı: EŞİT
   OLMAYAN dört karoda dört ayrı iddiayı yan yana koymak. ThreeCountries tek
   bir eksende üç ülkeyi anlatıyor (bu bölümün dört konusu var ve üçü ülke
   değil), HomeServices bir hizmet listesi, Chain bir zaman ekseni,
   Profiles altı sektör kartı.

   AMA KALIBIN GEOMETRİSİ DEĞİL YASASI ALINDI. Bugünkü canlı bento zaten
   TrustLayer'ın ızgarasını kopyalıyor (altı sütun, iki koyu, köşegen) ve
   lab kaydında bunun eksiği de yazılı: "karo bir sayı saymıyor, bir cümle
   söyleyip onu gösteriyor" maddesi hiç tutulmadı. Bu adayın tek yeni işi o
   maddeyi tutmak:

     · her karo bir CÜMLE taşıyor ve o cümle UYDURULMADI, ilgili bölümün
       kendi başlığı (WHERE.heading, HOW.heading, BASIS.heading,
       FOR_WHOM.heading). Yani sayfada zaten yazan, onaylanmış metin.
     · her karo o cümlenin nesnelerini GÖSTERİYOR (bayrak diski, halka rayı,
       dayanak mührü, sektör çipi).
     · her karonun KENDİ MEKANİĞİ var: dört karo, dört ayrı periyot.

   Rakam manşetlikten iniyor: karonun köşesinde küçük bir sayaç rozeti.
   Bugünkü blokta rakam karonun en büyük nesnesi ve cümle hiç yok; burada
   tam tersi.

   ------------------------------------------------------------ IZGARA
   On iki sütun, TrustLayer'ın kendi bölüşümü: 7 + 5 üstte, 5 + 7 altta.
   Koyu karolar köşegende (sol üst · sağ alt). Delik yok.

   ------------------------------------------------- YENİ YAZILAN TEK METİN
   B bölümünün başlığı ("Ortac bir bakışta") ve giriş cümlesi. İkisi de SAYFA
   hakkında konuşuyor, FİRMA hakkında değil: yeni bir olgu, yıl, sayı ya da
   sıfat girmiyor. Kartların içindeki her kelime about.ts ve brand.ts'ten
   geliyor.

   ------------------------------------------------------------------ HAREKET
   Dört mekanik, dört periyot: 11,03 · 13,03 · 17,09 · 22,90 saniye. Yüzde
   birlikleri (1103 · 1303 · 1709 · 2290) birbirinin ve listedeki hiçbir
   periyodun katı ya da böleni değil (liste seçim anında 86, tur sonunda 101
   idi; ikisinde de çakışma yok), yani dört karo hiçbir zaman tek bir nabza
   kilitlenmiyor. Hepsi saf CSS, hepsi no-preference kapısının içinde;
   hiçbiri okunan bir metnin rengine yazmıyor.

   İmleç bir karoya gelince o karonun hareketi DURUYOR ve nesneleri birden
   yanıyor. Hover kuralları bilerek animasyonun dokunmadığı özelliklerde:
   duraklatılmış bir animasyon değer yazmaya devam ediyor.
   ========================================================================= */

const ICONS: Record<string, LucideIcon> = {
  stamp: Stamp,
  handshake: Handshake,
  office: Building2,
  history: History,
};

const SECTOR_ICONS: Record<string, LucideIcon> = {
  "e-ticaret": Boxes,
  "yazilim-ve-teknoloji": Code2,
  danismanlik: UserRound,
  gayrimenkul: Building2,
  "finans-ve-yatirim": ChartCandlestick,
  "saglik-ve-medikal": Stethoscope,
};

/* Karo başlığı bir sayaç rozeti taşıyor. Rozet karonun SAYDIĞI şeyin
   uzunluğundan geliyor; hiçbir yerde elle yazılmıyor. */
function KaroBas({ n, cumle }: { n: number; cumle: string }) {
  return (
    <div className="hk2-bas">
      <span className="hk2-rozet">
        <CountUp className="hk2-n" to={n} />
      </span>
      <p className="hk2-cumle">{cumle}</p>
    </div>
  );
}

export default function HakAkis2Bakista() {
  return (
    <>
      {/* ================= A · KİM OLDUĞUMUZ =================
          Müşterinin "o kısmı kimiz diye paragraf ve vizyon misyon kısmıyla
          tutup" dediği parça. İçeriği bugünküyle aynı; tek fark bentonun
          buradan çıkmış olması, yani bölüm üç okuma modundan ikiye iniyor. */}
      <div className="hk2a sec-pad">
        <div className="container-o">
          <div className="hk2a-ust">
            <FadeUp className="hk2a-figw" y={20}>
              <figure className="hk2a-fig">
                <span className="hk2a-ph">
                  <Image
                    src={TEAM_PHOTO}
                    alt=""
                    fill
                    sizes="(min-width: 980px) 46vw, 100vw"
                    className="hk2a-img"
                    unoptimized
                  />
                </span>
                <figcaption className="hk2a-note">{OPENING.photoNote}</figcaption>
              </figure>
            </FadeUp>

            <div className="hk2a-body">
              <SplitWords
                as="h2"
                text={OPENING.heading}
                accent={OPENING.accent}
                className="h2"
                style={{ color: "var(--text-900)" }}
              />
              <FadeUp delay={0.18}>
                <p className="hk2a-lead">{OPENING.lead}</p>
              </FadeUp>
              {OPENING.body.map((p, i) => (
                <FadeUp key={p.slice(0, 24)} delay={0.26 + i * 0.08}>
                  <p className="hk2a-p">{p}</p>
                </FadeUp>
              ))}
            </div>
          </div>

          <div className="hk2a-vm">
            {[
              { s: OPENING.vision, Icon: Compass },
              { s: OPENING.mission, Icon: Target },
            ].map(({ s, Icon }, i) => (
              <FadeUp key={s.t} delay={0.12 + i * 0.08}>
                <article className="hk2a-vmc">
                  <span className="hk2a-vmi" aria-hidden="true">
                    <Icon size={18} strokeWidth={1.9} />
                  </span>
                  <h3>{s.t}</h3>
                  <p>{s.s}</p>
                </article>
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={0.3}>
            <p className="hk2a-vmn">{OPENING.statementNote}</p>
          </FadeUp>
        </div>
      </div>

      {/* ================= B · BİR BAKIŞTA =================
          Zemin gri (--paper), A bölümü beyaz. Ayrımı yapan şey bir çizgi
          değil zemin: sayfanın kendi zemin ritmi zaten böyle çalışıyor
          (beyaz → gece → mavi → beyaz → gece → beyaz → gri). */}
      <div className="hk2b sec-pad">
        <div className="container-o">
          <div className="sec-head">
            <SplitWords
              as="h2"
              text="Ortac bir bakışta"
              accent="bir bakışta"
              className="h2"
              style={{ color: "var(--text-900)" }}
            />
            <FadeUp delay={0.2}>
              <p className="sec-lead">
                Dört başlık, dört rakam. Dördü de sayfanın devamında tek tek yazıyor.
              </p>
            </FadeUp>
          </div>

          <div className="hk2-bn">
            {/* 1 · ÜLKE — geniş, koyu.
                Diskler ana sayfanın ülke kartındaki dille (.uk3-disc):
                daireye kırpılmış bayrak, çevresinde kalın halka.
                BAYRAK TUZAĞI: Flag width/height taşımayan çıplak bir
                <svg viewBox="0 0 60 40"> döndürüyor; kabı ölçülmezse
                300 x 150'ye açılıyor ve bu depoda iki sayfa tam bu yüzden
                bozuldu. .hk2-disk sabit piksel + overflow:hidden. */}
            <FadeUp className="hk2-w hk2-w7" delay={0.1} y={18}>
              <article className="hk2-karo hk2-koyu hk2-m1">
                <KaroBas n={WHERE.countries.length} cumle={WHERE.heading} />
                <ul className="hk2-geo">
                  {WHERE.countries.map((c, i) => (
                    <li key={c.slug} style={{ "--i": i } as React.CSSProperties}>
                      <span className="hk2-disk" aria-hidden="true">
                        <Flag country={c.slug} />
                      </span>
                      <b>{COUNTRY_NAME[c.slug]}</b>
                    </li>
                  ))}
                </ul>
              </article>
            </FadeUp>

            {/* 2 · ZİNCİR — dar, açık.
                Ray DİKEY çünkü karo dar; yatay bir rayda beş ad yan yana
                okunmuyor. <ol> korunuyor: sıra gerçek ve ekran okuyucunun
                duyduğu "5 öğeli liste" rozetteki rakamla aynı şeyi söylüyor.
                Ray ve ışık listenin KARDEŞİ, çocuğu değil: <ol> içine
                <span> koymak geçersiz işaretleme olurdu. */}
            <FadeUp className="hk2-w hk2-w5" delay={0.18} y={18}>
              <article className="hk2-karo hk2-m2">
                <KaroBas n={CHAIN.length} cumle={HOW.heading} />
                <div className="hk2-zin">
                  <span className="hk2-iz" aria-hidden="true">
                    <span className="hk2-glint" />
                  </span>
                  <ol className="hk2-halkalar">
                    {CHAIN.map((s, i) => (
                      <li key={s.key} style={{ "--i": i } as React.CSSProperties}>
                        <span className="hk2-dugum" aria-hidden="true" />
                        <b>{s.label}</b>
                      </li>
                    ))}
                  </ol>
                </div>
              </article>
            </FadeUp>

            {/* 3 · DAYANAK — dar, açık.
                Dört dayanağın BAŞLIĞI basılıyor, açıklama satırı değil:
                açıklamalar 74 ile 127 karakter arasında ve dördü birden
                karoyu bir paragraf bloğuna çevirirdi. Başlıklar canlı
                bentoda da bu şekilde duruyor (müşterinin "4 dayanak kısmı
                bir şey anlatmıyor" itirazının karşılığı). */}
            <FadeUp className="hk2-w hk2-w5" delay={0.26} y={18}>
              <article className="hk2-karo hk2-m3">
                <KaroBas n={BASIS.cards.length} cumle={BASIS.heading} />
                <ul className="hk2-day">
                  {BASIS.cards.map((c, i) => {
                    const Icon = ICONS[c.icon];
                    return (
                      <li key={c.t} style={{ "--i": i } as React.CSSProperties}>
                        <span className="hk2-mim" aria-hidden="true">
                          {Icon && <Icon size={15} strokeWidth={1.8} />}
                        </span>
                        <b>{c.t}</b>
                      </li>
                    );
                  })}
                </ul>
              </article>
            </FadeUp>

            {/* 4 · SEKTÖR — geniş, koyu.
                İkonlar sayfanın 6. bölümündekilerle AYNI glif: aynı sektörün
                iki blokta iki farklı işaretle çıkması, ziyaretçinin kurduğu
                görsel eşlemeyi bozar. */}
            <FadeUp className="hk2-w hk2-w7" delay={0.34} y={18}>
              <article className="hk2-karo hk2-koyu hk2-m4">
                <KaroBas n={FOR_WHOM.sectors.length} cumle={FOR_WHOM.heading} />
                <ul className="hk2-sekt">
                  {FOR_WHOM.sectors.map((s, i) => {
                    const Icon = SECTOR_ICONS[s.slug];
                    return (
                      <li key={s.slug} style={{ "--i": i } as React.CSSProperties}>
                        <span aria-hidden="true">
                          {Icon && <Icon size={15} strokeWidth={1.8} />}
                        </span>
                        <b>{s.label}</b>
                      </li>
                    );
                  })}
                </ul>
              </article>
            </FadeUp>
          </div>
        </div>
      </div>
    </>
  );
}
