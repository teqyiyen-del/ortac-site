import FadeUp from "@/components/shared/FadeUp";
import { Flag } from "@/components/shared/CountryPicker";
import { CHAIN, COUNTRY_NAME } from "@/lib/brand";
import { BASIS, FOR_WHOM, WHERE } from "@/lib/about";
import { ABOUT_ICON, SECTOR_ICON } from "@/components/lab/aboutBentoIcons";

/* ============================================================================
   LAB · ADAY 8 · "SÜTUN"
   Biçim: src/app/css/lab-hb8.css (ad alanı .hb8-)

   ------------------------------------------------------------------- FİKİR
   Izgara yatay değil DİKEY kuruluyor. Solda iki satır boyu uzanan tek bir koyu
   karo var ve içinde üç ülke, sayfadaki hiçbir yerde olmadığı kadar büyük
   yazılmış duruyor: bento bir liste değil, bir sütun. Sağda üç kısa karo alt
   alta: zincir, sektörler, dayanaklar.

   Bu adayın tezi şu: bir bento "az yazı" derken kelimeyi küçültmek zorunda
   değil, SAYISINI azaltabilir. Ekranda toplam yirmi kelime var ama üçü
   manşet boyunda. Boşluk hissi buradan kalkıyor, paragraf eklemeden.

   ---------------------------------------------------- SAYI BASILMIYOR
   Üç adayın tek "sayısız" olanı. Rakam yok çünkü nesneler zaten sayılabiliyor:
   üç bayrak, beş halka, altı çip, dört mühür. Bugünkü canlı bloğun kusuru
   rakamı manşet yapmasıydı; bu aday rakamı tamamen bırakıp yerine ADI koyuyor.
   Sayı gerektiğinde ızgara kendi kendini düzeltiyor: bir ülke eklendiğinde
   sütuna bir satır daha giriyor, elle güncellenecek bir yer yok.

   -------------------------------------------------- HER KARONUN KENDİ MEKANİĞİ
   Ana sayfa bentosunun dört ölçütünden biri "her karonun kendi mekaniği var" ve
   bu aday onu HARFİYEN uyguluyor: dört karoda dört ayrı hareket, ortak bir
   dalga YOK. aktarim.css kalıbı bu yüzden bilerek kullanılmadı — kalıp tek bir
   cümle söylüyor ("A'daki şey B'ye geçti") ve o cümle karoları birbirine
   bağlıyor. Burada karolar bağlanmıyor, dördü de kendi işini yapıyor.

   Karar veren kişi kalıbın kullanıldığı hâli (aday 7 · aday 9) ile
   kullanılmadığı hâli yan yana görsün diye üçlü böyle dizildi.

   -------------------------------------------------------------- İÇERİK SINIRI
   Ekrandaki her kelime veriden: ülke adları COUNTRY_NAME, halka adları
   brand.ts · CHAIN, sektör adları about.ts · FOR_WHOM. Elle yazılan tek kelime
   mühür karosunun "dayanak" etiketi; dört dayanağın kendi başlıkları buraya
   kopyalanmadı çünkü sayfanın 4. bölümü onları açıklamasıyla basıyor.
   ========================================================================= */

const AD_DAYANAK = "dayanak";

export default function AboutBentoSutun() {
  return (
    <section className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="hb8">
          {/* ============================= 1 · ÜLKE (koyu, iki satır boyu)
              Bloğun manşeti. Üç ad büyük punto, yanlarında bayrak diski. */}
          <FadeUp className="hb8-w hb8-w-uzun" y={18} delay={0.06}>
            <article className="hb8-t hb8-t-dark hb8-ulke">
              {/* Tarama bandı: karonun içinde yukarıdan aşağı geçen tek bir
                  ışık. Karonun kendi mekaniği bu. */}
              <span className="hb8-tarama" aria-hidden="true" />
              <ul>
                {WHERE.countries.map((c) => (
                  <li key={c.slug}>
                    {/* BAYRAK TUZAĞI: `Flag` çıplak bir
                        <svg viewBox="0 0 60 40"> döndürüyor; kabı ölçülmezse
                        300 × 150'ye açılıyor ve hakkımızda sayfası bir kez tam
                        bu yüzden çöktü. .hb8-disk sabit piksel. */}
                    <span className="hb8-disk" aria-hidden="true">
                      <Flag country={c.slug} />
                    </span>
                    <b>{COUNTRY_NAME[c.slug]}</b>
                  </li>
                ))}
              </ul>
            </article>
          </FadeUp>

          {/* ==================================== 2 · ZİNCİR (açık, sağ üst) */}
          <FadeUp className="hb8-w" y={18} delay={0.12}>
            <article className="hb8-t hb8-zincir">
              <span className="hb8-iz" aria-hidden="true">
                <span className="hb8-hat" />
                <span className="hb8-glint" />
              </span>
              {CHAIN.map((s) => (
                <span key={s.key} className="hb8-halka">
                  <span className="hb8-dugum" aria-hidden="true" />
                  <b>{s.label}</b>
                </span>
              ))}
            </article>
          </FadeUp>

          {/* =================================== 3 · SEKTÖR (açık, sağ orta)
              Sarmalayıcı (.hb8-cipw) ile çipin kendisi (.hb8-cip) AYRI: hareket
              sarmalayıcıda, hover çipte. İkisi aynı ögede olsaydı hover'da
              yazılan bildirim, çalışan animasyonun değerinin altında kalır ve
              hiç görünmezdi. */}
          <FadeUp className="hb8-w" y={18} delay={0.18}>
            <article className="hb8-t hb8-sekt">
              {FOR_WHOM.sectors.map((s, i) => {
                const Icon = SECTOR_ICON[s.slug];
                return (
                  <span
                    key={s.slug}
                    className="hb8-cipw"
                    style={{ "--hb8-k": i } as React.CSSProperties}
                  >
                    <span className="hb8-cip">
                      <span aria-hidden="true">
                        {Icon ? <Icon size={16} strokeWidth={1.8} /> : null}
                      </span>
                      <b>{s.label}</b>
                    </span>
                  </span>
                );
              })}
            </article>
          </FadeUp>

          {/* ================================== 4 · DAYANAK (koyu, sağ alt) */}
          <FadeUp className="hb8-w" y={18} delay={0.24}>
            <article className="hb8-t hb8-t-dark hb8-dayanak">
              {/* İbre: karoyu soldan sağa kat eden ince bir çizgi. */}
              <span className="hb8-ibre" aria-hidden="true" />
              <span className="hb8-k">{AD_DAYANAK}</span>
              <div className="hb8-muhur" aria-hidden="true">
                {BASIS.cards.map((c) => {
                  const Icon = ABOUT_ICON[c.icon];
                  return (
                    <span key={c.t} className="hb8-mim">
                      {Icon ? <Icon size={17} strokeWidth={1.7} /> : null}
                    </span>
                  );
                })}
              </div>
            </article>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
