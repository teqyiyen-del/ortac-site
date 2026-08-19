import {
  ArrowRight,
  ChevronRight,
  Languages,
  LayoutDashboard,
  Mail,
  MapPin,
  Phone,
  Quote as QuoteMark,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import SmartLink from "@/components/shared/SmartLink";
import AskCta from "@/components/shared/AskCta";
import { BrandChip } from "@/components/shared/BrandMark";
import { Flag } from "@/components/shared/CountryPicker";
import { brandKeyForName } from "@/lib/brands";
import { CHAIN, COUNTRY_NAME, PARTNERS, STANCE_LIMITS } from "@/lib/brand";
import { linksOf, officeFor } from "@/lib/offices";
import { sectorHref } from "@/lib/sectors";
import {
  BASIS,
  CONTACT,
  FOR_WHOM,
  HERO,
  HOW,
  IDENTITY,
  OPENING,
  QUOTE,
  WHERE,
  partnerTypes,
  structureOf,
  type AboutIcon,
} from "@/lib/about";

/* ADAY A · DEFTER — /hakkimizda'nın tamamı, "kanıt önce" kurgusuyla.
   Biçim: src/app/css/lab-hsayfa-a.css · ad alanı .haa-

   Sayfanın tek nesnesi bir DEFTER SATIRI: solda iddia, sağda dayanağı, ikisinin
   arasında bir çizgi. Kart ızgarası yok — canlı sayfanın dokuz kartı birebir
   aynı kompozisyondaydı ve sayfa bu yüzden tek kalıbın tekrarı gibi okunuyordu.

   Sıra da tersine döndü: sayfa övgüyle değil DAYANAKLA açılıyor (BASIS kapakta),
   iddialar arkasından geliyor. Üç ofisin gerçek adresi ve telefonu ilk kez
   ekranda (lib/offices.ts) — "kendi ofisimiz var" cümlesinin dayanağı stok
   şehir fotoğrafı değil, aranabilir bir numara.

   Metnin tamamı lib/about.ts + lib/brand.ts + lib/offices.ts'ten okunuyor.
   Bu dosyada dört kısa etiket dışında cümle yok; dördünün de gerekçesi
   kullanıldıkları yerde yazılı. */

/* HOW.principles'ın ikon adları about.ts'te STRING (dosya React'ten bağımsız
   tutuluyor); eşleme burada. Canlı sayfadaki ICONS tablosunun bu sayfada
   gerçekten kullanılan üç satırı — dördüncüsünü kopyalamak ölü kod olurdu. */
const ILKE_IKON: Partial<Record<AboutIcon, LucideIcon>> = {
  team: UsersRound,
  language: Languages,
  panel: LayoutDashboard,
};

/* İki basamaklı kayıt numarası. Defterin satır numarası, bir sıralama değil. */
const kayitNo = (i: number) => String(i + 1).padStart(2, "0");

export default function AboutSayfaA() {
  /* Künyeden YÖNETİCİ ORTAK SATIRI DÜŞÜYOR — silinmiyor, tekrarı kesiliyor.
     Aynı bölümde alıntının künyesi zaten "Murat Ortaç · Managing Partner"
     yazıyor; kayıt listesinde ikinci kez yazması canlı sayfanın en somut
     kusurunu (aynı iddia üç kez) burada da tekrarlardı. Etikete değil DEĞERE
     bakılıyor: about.ts'te etiket bir gün değişirse eşleşme yine tutuyor. */
  const sicil = IDENTITY.rows.filter(
    (r) => r.value !== "" && !r.value.includes(QUOTE.who),
  );

  return (
    <>
      {/* ================= 1 · KAPAK · defterin ilk sayfası =================
          Canlı hero sitenin en kısası (416 px) ve içinde bir tek h1 ile bir
          satır lead var. Burada hero ile "neye dayanarak" bölümü BİRLEŞTİ:
          ziyaretçi ilk ekranda sorunun cevabını değil, cevabın dayanağını
          görüyor. Bölüm sayısı da bir azalıyor.

          Fotoğraf YOK. Müşteri hero'da görsel istemedi ("hakkımızdada heroda
          görsel kullanmayı beğenemedim ya"); tek ülkenin sahnesini üç ülkeyi
          eşit anlatan sayfaya koymak da olmuyor. Boşluğu dolduran şey görsel
          değil, dört kayıt. */}
      <section className="haa-kapak">
        {/* Çizgili defter kâğıdı. Tek görevi gece yüzeyin ölü durmaması:
            34 px'lik satır aralığı 37,3 s'de tam bir satır kayıyor, yani
            döngü dikişsiz. Dekoratif, erişilebilirlik ağacında yok. */}
        <div className="haa-ink" aria-hidden="true" />

        <div className="container-o haa-kapak-in">
          {/* PageHero'nun kırıntı yolu birebir: bu sayfa hero bileşenini
              kullanmıyor ama sitedeki konum çizgisi her iç sayfada aynı
              görünmeli. Sınıf da aynı (.ph-crumb), yeni bir ad açılmadı. */}
          <nav className="ph-crumb" aria-label="Konum">
            <SmartLink href="/">Ana sayfa</SmartLink>
            <ChevronRight size={14} strokeWidth={2} aria-hidden="true" />
            <span>{HERO.crumb}</span>
          </nav>

          <SplitWords
            as="h1"
            text={HERO.title}
            accent={HERO.accent}
            accentColor="var(--blue-500)"
            base={0.08}
            className="haa-h1"
          />
          <FadeUp delay={0.24}>
            <p className="haa-kapak-lead">{HERO.lead}</p>
          </FadeUp>

          <FadeUp delay={0.32}>
            {/* BASIS'in başlığı burada bölüm başlığı değil, defterin adı.
                h2 olarak basılıyor çünkü altındaki dört kayıt gerçekten onun
                içeriği; SplitWords kullanılmadı, bu bir bölüm açılışı değil. */}
            <h2 className="haa-kapak-k">{BASIS.heading}</h2>
            <p className="haa-kapak-s">{BASIS.lead}</p>
          </FadeUp>

          {/* SÜTUN ADLARI. Bu sayfada YAZILAN dört etiketten ikisi burada:
              "İddia" ve "Dayanak". Sayfanın kendini anlatan bir cümlesi değil
              (o tür cümleler bir tur önce silindi) — bir tablo başlığı, ve
              defter kurgusunu tek bakışta öğreten şey bu iki kelime.
              981 px altında gizleniyor: orada sütunlar üst üste diziliyor ve
              başlık bir sütunu değil, tek bir satırı işaret eder olurdu. */}
          <FadeUp delay={0.38}>
            <div className="haa-cols" aria-hidden="true">
              <span>İddia</span>
              <span>Dayanak</span>
            </div>
          </FadeUp>

          <ol className="haa-recs">
            {BASIS.cards.map((c, i) => (
              <li className="haa-rec" key={c.t}>
                <FadeUp className="haa-rec-in" delay={0.44 + i * 0.07}>
                  <span className="haa-no" aria-hidden="true">
                    {kayitNo(i)}
                  </span>
                  <b className="haa-claim">{c.t}</b>
                  <span className="haa-proof">{c.s}</span>
                </FadeUp>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= 2 · BEYAN · ne yapıyoruz, neyi hedefliyoruz =======
          Vizyon ve misyon için müşterinin şikâyeti netti: "çok sönük kalmış."
          Sebebi ölçülebilir bir şeydi — ikisi de sayfanın en küçük iki
          kartının içinde, gövde puntosunda duruyordu. Burada kart tamamen
          kalktı: iki metin SAYFANIN EN BÜYÜK CÜMLELERİ oldu. Tek harfleri
          değişmedi, değişmemeli de; firmanın kendi resmî ifadesi. */}
      <section className="sec-pad haa-beyan">
        <div className="container-o">
          <div className="haa-sec-h">
            <SplitWords
              as="h2"
              text={OPENING.heading}
              accent={OPENING.accent}
              className="h2"
              style={{ color: "var(--text-900)" }}
            />
            <FadeUp delay={0.18}>
              <p className="haa-sec-lead">{OPENING.lead}</p>
            </FadeUp>
          </div>

          <div className="haa-bg">
            {OPENING.body.map((p, i) => (
              <FadeUp key={p.slice(0, 24)} delay={0.1 + i * 0.08}>
                <p className="haa-p">{p}</p>
              </FadeUp>
            ))}
          </div>

          <div className="haa-say">
            {[OPENING.vision, OPENING.mission].map((s, i) => (
              <FadeUp className="haa-say-x" key={s.t} delay={0.16 + i * 0.1}>
                <span className="haa-say-k">{s.t}</span>
                <p className="haa-say-s">{s.s}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 3 · ÜÇ OFİS · adresiyle =========================
          BU BÖLÜM SAYFANIN ASIL YENİLİĞİ. Canlı sayfa üç ülkeyi üç stok şehir
          fotoğrafıyla anlatıyor ve altına "görseller ülkeleri temsil ediyor,
          firmanın kendi çekimleri değil" diye şerh düşüyor — yani bölümün en
          büyük görsel öğesi, bir iddianın reddi.

          Fotoğraflar tamamen çıktı. Yerine lib/offices.ts geldi: üç ofisin
          adresi, telefonu ve e-postası doğrulanmış hâlde o dosyada duruyordu
          ve /hakkimizda hiçbirini basmıyordu. "Üç ülkede de kendi ofisimiz
          var" cümlesinin dayanağı artık aranabilir bir numara.

          Boş alan basılmıyor: linksOf() metin ve bağlantı BİRLİKTE dolu
          olmayan kanalı hiç döndürmüyor, adres boşsa satır kurulmuyor. */}
      <section className="sec-pad haa-ofis">
        <div className="container-o">
          <div className="haa-sec-h">
            <SplitWords
              as="h2"
              text={WHERE.heading}
              accent={WHERE.accent}
              className="h2"
              style={{ color: "var(--text-900)" }}
            />
            <FadeUp delay={0.18}>
              <p className="haa-sec-lead">{WHERE.lead}</p>
            </FadeUp>
          </div>

          <ul className="haa-ofl">
            {WHERE.countries.map((c, i) => {
              const o = officeFor(c.slug);
              const tel = linksOf(o.contact.phone);
              const posta = linksOf(o.contact.email);

              return (
                <li className="haa-of" key={c.slug}>
                  <FadeUp className="haa-of-in" delay={0.1 + i * 0.08}>
                    <div className="haa-of-id">
                      <span className="haa-of-head">
                        {/* Flag kabı SABİT px + overflow:hidden. Bileşen
                            çıplak bir <svg viewBox> basıyor, width/height
                            taşımıyor; kap ölçüsüz kalırsa 300x150'ye şişip
                            bu sayfayı bir kez çökertti (tuzaklar.md · H). */}
                        <span className="haa-of-flag" aria-hidden="true">
                          <Flag country={c.slug} />
                        </span>
                        <b className="haa-of-name">{COUNTRY_NAME[c.slug]}</b>
                      </span>
                      {/* Yapı künyesi tek kaynaktan (brand.ts · FACTS). */}
                      <span className="haa-of-st">{structureOf(c.slug)}</span>
                      <SmartLink href={c.href} className="haa-of-go">
                        Ülke sayfası
                        <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                      </SmartLink>
                    </div>

                    <p className="haa-of-line">{c.line}</p>

                    <dl className="haa-of-data">
                      {o.address !== "" && (
                        <div className="haa-of-row">
                          {/* "Adres" bu dosyada yazılan dört etiketin üçüncüsü.
                              offices.ts adresi bilerek KANAL saymıyor ("adres
                              bir kanal değil, ofisin kendisi"), o yüzden
                              CHANNELS listesinde karşılığı yok. */}
                          <dt className="haa-of-lab">
                            <MapPin size={14} strokeWidth={1.9} aria-hidden="true" />
                            Adres
                          </dt>
                          <dd className="haa-of-val">{o.address}</dd>
                        </div>
                      )}

                      {tel.length > 0 && (
                        <div className="haa-of-row">
                          <dt className="haa-of-lab">
                            <Phone size={14} strokeWidth={1.9} aria-hidden="true" />
                            Telefon
                          </dt>
                          {/* KKTC'de iki hat var ve ikisi de gerçek; birini
                              seçip ötekini atmak ulaşılabilir bir hattı
                              gizlemek olurdu (offices.ts · alt). */}
                          <dd className="haa-of-val">
                            {tel.map((l) => (
                              <a className="haa-of-a" href={l.href} key={l.href}>
                                {l.value}
                              </a>
                            ))}
                          </dd>
                        </div>
                      )}

                      {posta.length > 0 && (
                        <div className="haa-of-row">
                          <dt className="haa-of-lab">
                            <Mail size={14} strokeWidth={1.9} aria-hidden="true" />
                            E-posta
                          </dt>
                          <dd className="haa-of-val">
                            {posta.map((l) => (
                              <a className="haa-of-a" href={l.href} key={l.href}>
                                {l.value}
                              </a>
                            ))}
                          </dd>
                        </div>
                      )}
                    </dl>
                  </FadeUp>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ================= 4 · ZİNCİR VE SINIR ============================
          Muhasebe defterinin kendi mantığı: her kaydın bir karşı tarafı var.
          Solda ne yaptığımız (CHAIN + ilkeler), sağda NE YAPMADIĞIMIZ
          (STANCE_LIMITS). Canlı sayfada bu ikisi alt alta iki ayrı bloktu ve
          taahhüt sınırları en aşağıda, en sönük yerde duruyordu; yan yana
          gelince sınırlar zincirle aynı ağırlığa çıkıyor.

          Zincirin rayı bu bölümün sürekli hareketi (43,1 s). */}
      <section className="sec-pad haa-nasil">
        <div className="container-o">
          <div className="haa-sec-h haa-gece">
            <SplitWords
              as="h2"
              text={HOW.heading}
              accent={HOW.accent}
              accentColor="var(--blue-500)"
              className="h2"
              style={{ color: "#ffffff" }}
            />
            <FadeUp delay={0.18}>
              <p className="haa-sec-lead haa-sec-lead-g">{HOW.lead}</p>
            </FadeUp>
          </div>

          <div className="haa-ng">
            <ol className="haa-zincir">
              {CHAIN.map((k, i) => (
                <li className="haa-z" key={k.key}>
                  <FadeUp className="haa-z-in" delay={0.1 + i * 0.06}>
                    <span className="haa-z-no" aria-hidden="true">
                      {i + 1}
                    </span>
                    <b className="haa-z-t">{k.label}</b>
                    <span className="haa-z-s">{k.line}</span>
                  </FadeUp>
                </li>
              ))}
            </ol>

            <div className="haa-sinir">
              <FadeUp delay={0.16}>
                <h3 className="haa-sinir-h">{HOW.limits.t}</h3>
                <p className="haa-sinir-s">{HOW.limits.s}</p>
              </FadeUp>
              <ul className="haa-sinir-l">
                {STANCE_LIMITS.map((l, i) => (
                  <li className="haa-sinir-x" key={l.title}>
                    <FadeUp delay={0.22 + i * 0.06}>
                      <b>{l.title}</b>
                      <span>{l.line}</span>
                    </FadeUp>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Üç ilke zincirin altında ince bir şerit: zincir NE yapıldığını,
              ilkeler KİMİN yaptığını söylüyor. İkon TEK BAŞINA bırakılmadı —
              müşteri adsız ikonu bir kez reddetti ("ne oldukları
              anlaşılmıyor"), başlık her zaman ikonun yanında. */}
          <ul className="haa-ilke">
            {HOW.principles.map((p, i) => {
              const Icon = ILKE_IKON[p.icon] ?? UsersRound;
              return (
                <li className="haa-ilke-x" key={p.t}>
                  <FadeUp delay={0.12 + i * 0.06}>
                    <b>
                      <Icon size={17} strokeWidth={1.9} aria-hidden="true" />
                      {p.t}
                    </b>
                    <span>{p.s}</span>
                  </FadeUp>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ================= 5 · KURUMLAR ===================================
          "Adımızın karşı tarafta yazdığı" kurumlar. Kanıt önce kurgusunda bu
          bir vitrin değil dayanak, o yüzden kendi bölümü var.

          Rol EKRANDA YAZMIYOR, tür yazıyor: partnerTypes() ayraçtan öncesini
          alıyor, yani IFZA'nın "· resmî iş ortağı" yarısı burada basılmıyor.
          Müşterinin kaldırdığı ayrım (ilişkinin derecesi) ekrana geri
          gelmiyor; listeyi okunur kılan ayrım (kurum ne iş yapıyor) duruyor. */}
      <section className="sec-pad haa-kurum">
        <div className="container-o">
          <div className="haa-sec-h">
            <h2 className="h2 haa-kurum-h">{BASIS.partners.t}</h2>
            <FadeUp delay={0.18}>
              <p className="haa-sec-lead">{BASIS.partners.s}</p>
            </FadeUp>
          </div>

          <dl className="haa-kl">
            {partnerTypes(PARTNERS).map((g, i) => (
              <FadeUp className="haa-kg" key={g.type} delay={0.08 + i * 0.05}>
                <dt className="haa-kt">{g.type}</dt>
                <dd className="haa-kd">
                  {g.names.map((n) => {
                    const key = brandKeyForName(n);
                    /* Eşleşmeyen ad düz yazıyla basılıyor: brands.ts'e
                       girmemiş bir marka uydurma bir işaretle değil, kendi
                       adıyla görünüyor. */
                    return (
                      <span className="haa-kb" key={n}>
                        {key ? <BrandChip brand={key} optical={15} /> : <b className="haa-kn">{n}</b>}
                      </span>
                    );
                  })}
                </dd>
              </FadeUp>
            ))}
          </dl>
        </div>
      </section>

      {/* ================= 6 · SEKTÖRLER ==================================
          Altı satır, iki sütun. Canlı sayfada altı tam genişlik kartı vardı ve
          müşteri kutuyu bir kez küçülttürdü; burada kutu hiç yok, satırın
          kendisi var. "Düğüm" cümlesi HER ZAMAN GÖRÜNÜR — bu sayfada hiçbir
          şey tıklamanın ya da üstüne gelmenin arkasına saklanmıyor. */}
      <section className="sec-pad haa-sektor">
        <div className="container-o">
          <div className="haa-sec-h">
            <SplitWords
              as="h2"
              text={FOR_WHOM.heading}
              accent={FOR_WHOM.accent}
              className="h2"
              style={{ color: "var(--text-900)" }}
            />
            <FadeUp delay={0.18}>
              <p className="haa-sec-lead">{FOR_WHOM.lead}</p>
            </FadeUp>
          </div>

          <ul className="haa-sk">
            {FOR_WHOM.sectors.map((s, i) => (
              <li className="haa-sk-x" key={s.slug}>
                <FadeUp delay={0.08 + i * 0.05}>
                  {/* Yayında olmayan sektör sayfası SmartLink tarafından sönük
                      ve tıklanamaz <span>'e düşüyor; ölü tıklama olmuyor. */}
                  <SmartLink href={sectorHref(s.slug)} className="haa-sk-a">
                    <b className="haa-sk-t">{s.label}</b>
                    <span className="haa-sk-s">{s.line}</span>
                    <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
                  </SmartLink>
                </FadeUp>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================= 7 · İMZA · kim söylüyor, kim kaydediyor =========
          Canlı sayfada alıntı, künye ve temas ÜÇ AYRI bölümdü ve sayfa arka
          arkaya iki kapanış çağrısıyla bitiyordu. Üçü burada tek bölüm:
          sözü söyleyen kişi, firmanın kaydı ve tek çıkış.

          Künyenin üçüncü kez yeniden çizilmesi de burada oluyor: kutu ya da
          gazete künyesi değil, alıntının yanında duran bir kayıt listesi.
          Müşterinin itirazı künyenin VARLIĞINA değil sayfayı onunla AÇMAMIZA
          ve GÖRÜNTÜSÜNE idi; ikisi de karşılanıyor. */}
      <section className="sec-pad haa-imza">
        <div className="container-o">
          <div className="haa-ig">
            <FadeUp className="haa-qw">
              <figure className="haa-quote">
                <QuoteMark className="haa-qm" size={38} strokeWidth={1.6} aria-hidden="true" />
                <blockquote>{QUOTE.text}</blockquote>
                <figcaption>
                  <b>{QUOTE.who}</b>
                  <span>{QUOTE.role}</span>
                  {/* Yayın adı ve tarih elimizde yok (SWAP:QUOTE_SOURCE);
                      boşken hiç basılmıyor, uydurulmuş bir kaynak alıntının
                      kendisini de şüpheli hâle getirirdi. */}
                  {QUOTE.source && <span>{QUOTE.source}</span>}
                </figcaption>
              </figure>
            </FadeUp>

            <FadeUp className="haa-sw" delay={0.12}>
              <h2 className="haa-sicil-h">{IDENTITY.heading}</h2>
              <p className="haa-sicil-s">{IDENTITY.lead}</p>
              <dl className="haa-sr">
                {sicil.map((r) => (
                  <div className="haa-sr-x" key={r.label}>
                    <dt className="haa-sr-k">{r.label}</dt>
                    <dd className="haa-sr-v">{r.value}</dd>
                  </div>
                ))}
              </dl>
            </FadeUp>
          </div>

          {/* TEK KAPANIŞ. Canlı sayfa burada bir kez, hemen ardından
              FinalCta ile bir kez daha kapanıyor; bu aday ikincisini
              basmıyor ve bölüm sayısı bir daha azalıyor. */}
          <div className="haa-cikis">
            <SplitWords
              as="h2"
              text={CONTACT.heading}
              accent={CONTACT.accent}
              className="h2"
              style={{ color: "var(--text-900)" }}
            />
            <FadeUp delay={0.16}>
              <p className="haa-cikis-l">{CONTACT.lead}</p>
            </FadeUp>
            <FadeUp delay={0.24}>
              <AskCta label={CONTACT.ctaLabel} />
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
}
