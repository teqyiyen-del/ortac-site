"use client";

import { useId, useState } from "react";
import { ArrowUpRight, ChevronDown, Globe2 } from "lucide-react";
import { Flag } from "@/components/shared/CountryPicker";
import FadeUp from "@/components/shared/FadeUp";
import SmartLink from "@/components/shared/SmartLink";
import type { TimelineRow, UpdateFilter, UpdateFilterOption } from "@/lib/resources";

/* ============================================================================
   ZAMAN ÇİZELGESİ — /gelismeler'in gövdesi
   ============================================================================

   MÜŞTERİNİN İLK İSTEĞİ (fikir korundu)
   "gelişmeler sayfasını ise timeline gibi bir şey yapmalısın ve ülke seçme
   olmalı ülkeye geldiğinde o ülkedeki gelişmeleri görücez gibi düşün."

   MÜŞTERİNİN İKİNCİ İTİRAZI (kart küçüldü, akordiyon geldi)
   "şuan her kartın yüksekliği baya fazla amk daha küçük duyuru gibi yapabiliriz
   onları hatta akordiyon şekilde de verebilir."

   MÜŞTERİNİN ÜÇÜNCÜ İTİRAZI VE BU DOSYANIN BUGÜNKÜ HÂLİ
   "kart tasarımları tam ikna etmedi beni buranın tasarımına bi ısınamadım ya" —
   üzerine labda üç aday çizildi (/lab/gelismeler · GL1 Sicil, GL2 Izgara,
   GL3 Manşet) ve müşteri GL3'ü seçti: "gl3 ü de siteye alabilirsin iyi
   duruyor."

   BURADAKİ EKRAN GL3'ÜN CANLI SÜRÜMÜ. Lab dosyaları (components/lab/
   GelismelerGL3.tsx, css/lab-gl3.css) olduğu gibi duruyor — müşteri üçünü
   karşılaştırmaya devam ediyor — ama AD ALANI ayrı: lab `.gl3-`, canlı `.kyn-`.
   Aynı öneki paylaşsalardı biri diğerini ezerdi; bu depoda tam o hata yaşandı.

   ---------------------------------------------------------------------------
   GL3'ÜN FİKRİ · MANŞET

   Kartın çerçevesi, zemini ve gölgesi yok. Kayıtları ayıran şey boşluk ve
   tipografik ölçek. Yükü tarih taşıyor: solda 30px'lik, tabular rakamlı bir gün
   numarası ve altında ay kısaltması. O rakam ÜLKENİN RENGİNDE — rozet boyunda
   bir lekeden çok daha uzaktan okunuyor.

   NEYİ FEDA EDİYOR (müşteriye bilerek söylenmiş bedel): kartın sınırını.
   Çerçeve olmayınca kaydın nerede başlayıp bittiği yalnızca boşlukla belli
   oluyor; yoğun aylarda (bir ayda sekiz kayıt) bu, kartlı düzenden zayıf bir
   sınır. Tıklanabilir alanın sınırı da yalnızca üstüne gelince beliriyor.

   ---------------------------------------------------------------------------
   ESKİ DÜZENDEN TAŞINAN KAZANIMLAR — hepsi müşterinin kendi istekleri

   1 · KART KAPALIYKEN KISA. Akordiyon çizgisi aynı yerde duruyor:

        AÇILMADAN · tarih · ülke · tür · başlık · tek satır kapsam
        AÇILINCA  · kimi ilgilendiriyor · yürürlük · kayıttaki başlıklar ·
                    ilgili sayfa · resmî kaynak

      Gerekçe: bir zaman çizelgesinin işi TARAMA. Başlığı tıklamanın arkasına
      koymak kartı küçültmez, listeyi kullanılmaz yapar. "Kimi ilgilendiriyor"
      ve alt başlıklar ise yalnızca DOĞRU kaydı bulmuş kişinin işine yarıyor.

   2 · ÜLKEYE GÖRE RENK. Müşteri: "kartın solundaki yuvarlakların rengi … ülkeye
      göre renk verebilirsin … direkt o haberin ne olduğu anlaşılır." Renkler
      yeni bir palet değil, sitenin bastığı bayrak SVG'lerinin kendi değerleri.

      GL3'te renk üç yerde: 30px'lik gün rakamı, künyedeki ülke adı ve bayrak
      diskinin halkası. EKSENDEKİ YUVARLAK YOK — çünkü GL3'te eksen de yok; bu
      adayın fikri tam olarak o çizgiyi kaldırmak. Renk kaybolmadı, taşıyıcısı
      11px'lik bir daireden 30px'lik bir rakama BÜYÜDÜ ve her kırılımda duruyor.

   3 · RENK TEK BAŞINA TAŞIYICI DEĞİL. Künyede bayrağın kendisi ve ülkenin ADI
      yazılı ("Dubai", "İngiltere", "KKTC", "Üç ülke"). Üç ülkeyi birden
      ilgilendiren kayıtta bayrak yerine KÜRE simgesi basılıyor — biçim farkı,
      yani renk körlüğünde de ayrım duruyor.

   4 · "ÖRNEK" ROZETİ yer tutucu kayıtları işaretliyor ve sitedeki tek boyuyla
      (.kyn-seed-tag) burada da aynı: e-kitap rafı ve ana sayfa dizini ile tek
      tanımı paylaşıyor, yani kontrastı bir yerde düzelince üçünde birden
      düzeliyor.

   5 · ÜLKE SÜZGECİ hâlâ görünen kutucuk + görsel olarak gizli YERLİ radyo. Ok
      tuşlarıyla dolaşma, seçili durumun duyurulması ve <legend>in grubu
      adlandırması tarayıcıdan geliyor; aynı kalıp iletişim formunda da var
      (app/iletisim/ContactSections.tsx). Açılır menüye ÇEVİRMEYİN — müşterinin
      açık isteğiydi. GL3'te kutucuğun çerçevesi kalktı (sayfada kutu yoksa
      süzgecin kutusu da olmamalı), ALTINDAKİ KONTROL DEĞİŞMEDİ.

   6 · AKORDİYON NATIVE <details>/<summary>. Klavye ve ekran okuyucu bedava
      geliyor. Başlık <summary>'nin içinde bir <h3>: HTML bunu açıkça serbest
      bırakıyor ve başlık okunmayan yardımcı teknolojide davranış başlıksız
      hâle düşüyor — kayıp değil, kazanç eksilmesi.

   ---------------------------------------------------------------------------
   DİKKAT · Flag bileşeni width/height TAŞIMAYAN bir <svg viewBox="0 0 60 40">
   basıyor. Ölçüsü CSS'te açıkça sınırlanmazsa 300×150'ye açılıyor — bu depoda
   tam bu yüzden iki sayfa bozuldu. Sınır .kyn-pick-ic ve .kyn-cflag
   kurallarında (css/kaynaklar.css) ve ikisi de `overflow: hidden` taşıyor.

   NEDEN İSTEMCİ BİLEŞENİ
   Ülke seçimi durum tutuyor. Ama `@/lib/resources`tan yalnızca TİP alınıyor
   (`import type`, derlemede siliniyor): o modülü değer olarak import etmek
   GUIDES üzerinden countryContent, afterSetup ve blog dosyalarını istemci
   paketine sokardı. Satırın ekranda görünen her parçası sunucuda hazırlanıp
   prop olarak geliyor (bkz. lib/resources.ts · timelineRows).

   SÜZME KURALI DA BURADA YAZILMIYOR
   Her satır hangi seçimlerde görüneceğini kendisi taşıyor (`shownIn`), yani
   "üç ülkeyi ilgilendiren kayıt her ülkede görünür" kuralı tek yerde:
   lib/resources.ts · matchesFilter.
   ========================================================================= */

type Props = {
  rows: TimelineRow[];
  /** seçenekler sunucudan: etiketler ve bayrak slug'ları resources.ts'ten */
  filters: UpdateFilterOption[];
  /** yer tutucu rozetinde yazan tek kelime — resources.ts'te tek yerde */
  draftBadge: string;
};

/**
 * "12 Tem" → ["12", "Tem"].
 *
 * Gün rakamı ile ay kısaltması ayrı satırlarda ve ayrı puntoda basılıyor; tek
 * bir string olarak gelen etiketi burada bölmek, lib/resources.ts'e yalnızca bu
 * ekran için ikinci bir alan eklemekten ucuz. Beklenmedik bir biçim gelirse
 * etiketin tamamı rakam yerine geçiyor, yani tarih hiçbir hâlde kaybolmuyor.
 */
function splitDay(dayLabel: string): [string, string] {
  const parts = dayLabel.split(" ");
  return [parts[0] ?? dayLabel, parts.slice(1).join(" ")];
}

export default function KynTimeline({ rows, filters, draftBadge }: Props) {
  const [sel, setSel] = useState<UpdateFilter>("hepsi");
  /* Radyo grubunun adı sayfada benzersiz olmalı; bileşen ikinci kez basılırsa
     iki grup birbirinin seçimini bozardı. */
  const groupName = useId();

  const visible = rows.filter((r) => r.shownIn.includes(sel));

  /* Aya göre grupla. Satırlar zaten tarihe göre sıralı geldiği için tek geçiş
     yetiyor: ay değiştiğinde yeni grup açılıyor. */
  const months: { key: string; label: string; items: TimelineRow[] }[] = [];
  for (const r of visible) {
    const last = months[months.length - 1];
    if (last?.key === r.monthKey) last.items.push(r);
    else months.push({ key: r.monthKey, label: r.monthLabel, items: [r] });
  }

  /* Seçenek sayaçları da satırların kendi `shownIn`inden: "Dubai" düğmesinde
     yazan sayı ile tıklayınca çıkan liste hiçbir zaman ayrışmıyor. */
  const countOfFilter = (f: UpdateFilter) => rows.filter((r) => r.shownIn.includes(f)).length;

  const selLabel = filters.find((f) => f.id === sel)?.label ?? "";
  const shared = visible.filter((r) => r.country === "genel").length;

  return (
    <div className="kyn-tlw">
      <fieldset className="kyn-pick">
        {/* Etiket GÖRSEL OLARAK gizli: GL3'te sayfada tek bir kutu, çerçeve ya
            da bölüm başlığı yok ve süzgecin üstüne konan versal bir başlık o
            sessizliği ilk satırda bozuyordu. Grubu ekran okuyucuya adlandıran
            <legend> yerinde duruyor; sayfanın hero metni de "ülke seçerek
            daraltabilirsiniz" diyor, yani gören ziyaretçi de yönlendiriliyor. */}
        <legend className="kyn-pick-h">Ülke seçin</legend>

        <div className="kyn-pick-g">
          {filters.map((f) => (
            <label key={f.id} className="kyn-pick-o">
              <input
                type="radio"
                className="kyn-pick-r"
                name={groupName}
                value={f.id}
                checked={sel === f.id}
                onChange={() => setSel(f.id)}
              />
              <span className="kyn-pick-b">
                {/* Bayrak/simge süs değil: seçeneği okumadan ayırt ettiriyor.
                    aria-hidden çünkü ülkenin adı hemen yanında yazıyor —
                    ekran okuyucuya aynı şeyi iki kez söylemenin anlamı yok. */}
                <span className="kyn-pick-ic" aria-hidden="true">
                  {f.flag ? <Flag country={f.flag} /> : <Globe2 size={14} strokeWidth={1.9} />}
                </span>
                {f.label}
                <i>{countOfFilter(f.id)}</i>
              </span>
            </label>
          ))}
        </div>

        {/* Seçim değişince ekranda değişen tek şey liste; görmeyen kullanıcı
            bunu duymalı. Sayının yanında "kayıt" yazıyor, "yayın" değil —
            listenin bir kısmı örnek ve rozetiyle öyle işaretli. */}
        <p className="kyn-pick-n" aria-live="polite">
          {visible.length === 0
            ? `${selLabel} için gösterilecek kayıt yok.`
            : `${selLabel}: ${visible.length} kayıt` +
              (sel !== "hepsi" && shared > 0
                ? ` (üç ülkeyi birden ilgilendiren ${shared} kayıt dahil).`
                : ".")}
        </p>
      </fieldset>

      {months.length === 0 ? (
        <p className="kyn-tl-none">
          Seçilen ülkede henüz kayıt yok. Üstteki seçiciden başka bir ülkeye geçebilirsiniz.
        </p>
      ) : (
        months.map((m) => (
          /* Ay başlığı h2: sayfadaki tek h1 PageHero'da, kayıt başlıkları da
             bunun altında h3. Başlığın yanından sağa uzanan çizgi sayfadaki tek
             ayraç — nötr gri ve YATAY, yani kartın sol/üst kenarındaki renkli
             şerit yasağıyla ilgisi yok. */
          <section key={m.key} className="kyn-tl-m">
            <h2 className="kyn-tl-mh">
              <span className="kyn-tl-mt">{m.label}</span>
              <span className="kyn-tl-mr" aria-hidden="true" />
              <span className="kyn-tl-mn">{m.items.length}</span>
            </h2>

            {/* FadeUp kayıt başına DEĞİL, ay başına. Yirmi iki kaydın yirmi
                ikisi ayrı ayrı süzülünce hareket bilgi olmaktan çıkıp gürültü
                oluyordu — ve kayıtlar kısa olduğu için aynı anda beş altısı
                birden ekranda. */}
            <FadeUp>
              <ol className="kyn-tl-l">
                {m.items.map((r) => {
                  const [dd, mmm] = splitDay(r.dayLabel);
                  return (
                    <li key={r.id} className="kyn-tl-i">
                      {/* Ülke rengi <details>'in kendisinde (`data-c`) duruyor
                          ki hem gün rakamı hem künye aynı değişkeni okusun. */}
                      <details className="kyn-up" data-c={r.country}>
                        <summary className="kyn-up-sum">
                          {/* RENK TAŞIYICISI: büyük gün rakamı. Rozet boyunda
                              bir lekeden çok daha uzaktan okunuyor ve kontrastı
                              metin eşiğiyle ölçülebiliyor (6.0–14.8:1). */}
                          <time className="kyn-up-when" dateTime={r.date}>
                            <b className="kyn-up-dd">{dd}</b>
                            <i className="kyn-up-mm">{mmm}</i>
                          </time>

                          <span className="kyn-up-body">
                            <span className="kyn-up-meta">
                              <span className="kyn-cflag" aria-hidden="true">
                                {r.flag ? (
                                  <Flag country={r.flag} />
                                ) : (
                                  <Globe2 size={11} strokeWidth={2} />
                                )}
                              </span>
                              {/* Ülkenin ADI renkte (versal bu turda kalktı).
                                  Renk körlüğünde ayrımı ad ve bayrak
                                  sürdürüyor; renk yalnızca ilk bakışta
                                  erişim veriyor. */}
                              <span className="kyn-up-ctry">{r.countryLabel}</span>
                              <span className="kyn-up-sep" aria-hidden="true" />
                              <span className="kyn-up-ch">{r.channelLabel}</span>
                              {/* YER TUTUCU İŞARETİ — tek kelime, künyenin
                                  içinde. Önceki turlarda kartın üstünde şerit,
                                  sayfanın başında da panel vardı; müşteri
                                  ikisini de kaldırttı. Kalan bu. */}
                              {r.draft && <span className="kyn-seed-tag">{draftBadge}</span>}
                            </span>

                            <h3 className="kyn-up-t">{r.title}</h3>
                            <p className="kyn-up-line">{r.line}</p>
                          </span>

                          <span className="kyn-up-x" aria-hidden="true">
                            <ChevronDown size={16} strokeWidth={2.2} />
                          </span>
                        </summary>

                        <div className="kyn-up-more">
                          <dl className="kyn-up-kv">
                            <div>
                              <dt>Tarih</dt>
                              <dd>
                                <time dateTime={r.date}>{r.dateLabel}</time>
                              </dd>
                            </div>
                            <div>
                              <dt>Kimi ilgilendiriyor</dt>
                              <dd>{r.who}</dd>
                            </div>
                            {r.effectiveFrom && r.effectiveLabel && (
                              <div>
                                <dt>Yürürlük</dt>
                                <dd>
                                  <time dateTime={r.effectiveFrom}>{r.effectiveLabel}</time>
                                </dd>
                              </div>
                            )}
                            {r.action && (
                              <div>
                                <dt>Yapılması gereken</dt>
                                <dd>{r.action}</dd>
                              </div>
                            )}
                          </dl>

                          {/* Kayıtta cevaplanacak başlıklar. Yer tutucuda hepsi
                              SORU cümlesi — soru bir olgu iddiası taşımaz
                              (bkz. lib/resources.ts · DRAFT_UPDATES). */}
                          {r.covers && r.covers.length > 0 && (
                            <ul className="kyn-up-q">
                              {r.covers.map((q) => (
                                <li key={q}>{q}</li>
                              ))}
                            </ul>
                          )}

                          {(r.source || r.related) && (
                            <div className="kyn-up-foot">
                              {r.source && (
                                /* Resmî kaynak site dışı: SmartLink dolaşım
                                   kararı veren bir bileşen ve dış adreste işi
                                   yok. Yeni sekme, çünkü ziyaretçi otoritenin
                                   sayfasına gidip akışa dönüyor. */
                                <a
                                  href={r.source.url}
                                  className="kyn-src"
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  Kaynak: {r.source.name}
                                  <ArrowUpRight size={14} strokeWidth={2.2} aria-hidden="true" />
                                </a>
                              )}
                              {r.related && (
                                <SmartLink href={r.related.href} className="kyn-rel">
                                  {r.related.label}
                                </SmartLink>
                              )}
                            </div>
                          )}
                        </div>
                      </details>
                    </li>
                  );
                })}
              </ol>
            </FadeUp>
          </section>
        ))
      )}
    </div>
  );
}
