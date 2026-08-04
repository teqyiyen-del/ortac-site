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

   MÜŞTERİNİN İKİNCİ TURDAKİ İTİRAZI (bu dosya buna göre yeniden yazıldı)
   "ülke seçtirme yerini daha dinamik yapabilirsin bayraklı iconlu vb …
   çok pasif duruyor. … şuan her kartın yüksekliği baya fazla amk daha küçük
   duyuru gibi yapabiliriz onları hatta her şeyi ilk bakışta göstermek yerine
   tıklandığında akordiyon şekilde de verebilir."

   Fikir (tarih ekseni, aya göre gruplama) DEĞİŞMEDİ; değişen iki şey var.

   ---------------------------------------------------------------------------
   1 · KART ARTIK BİR DUYURU

   Kapalı hâlde yalnızca beş şey var: tarih, ülke, tür, başlık ve tek satır
   kapsam. Kartı eskiden 348px yapan üç sütunluk künye tablosu ve altındaki
   bağlantı şeridi akordiyonun içine girdi.

   AKORDİYON KARARI VE GEREKÇESİ — müşteri öneriyor ama emin değil ("fazla
   detayı bilmiyorumda"), o yüzden karar burada gerekçesiyle duruyor:

     AÇILMADAN görünen · tarih · ülke · tür · başlık · tek satır kapsam
     AÇILINCA görünen  · kimi ilgilendiriyor · kayıttaki başlıklar ·
                         ilgili sayfa · resmî kaynak

   Neden bu çizgi: bir zaman çizelgesinin işi TARAMA. Başlığı tıklamanın
   arkasına koymak kartı küçültmez, listeyi kullanılmaz yapar — ziyaretçi
   aradığını bulmak için yirmi kartı tek tek açmak zorunda kalır. Öte yandan
   "kimi ilgilendiriyor" ve alt başlıklar yalnızca DOĞRU kaydı bulmuş kişinin
   işine yarıyor; hepsini birden basmak yirmi kartın yirmisinde de sayfayı
   uzatıyordu. Ayrım tam bu ikisinin arasından geçiyor.

   NEDEN NATIVE <details>
   Klavyeyle açılıp kapanıyor, açık/kapalı durumu (aria-expanded karşılığı)
   tarayıcı tarafından duyuruluyor ve JavaScript gerekmiyor. Elle yazılmış bir
   düğme burada yalnızca fazladan hata yüzeyi olurdu. Başlık <summary>'nin
   İÇİNDE bir <h3>: HTML bunu açıkça serbest bırakıyor (summary'nin içerik
   modeli "phrasing content, opsiyonel olarak heading content ile birlikte") ve
   başlık okunmayan yardımcı teknolojide davranış, başlıksız hâle düşüyor —
   yani kayıp değil, kazanç eksilmesi.

   ---------------------------------------------------------------------------
   2 · ÜLKE SEÇİCİ ARTIK BAYRAKLI

   Kalıp ise değişmedi ve değişmemeliydi: görünen kutucuk + görsel olarak gizli
   YERLİ radyo. Ok tuşlarıyla dolaşma, seçili durumun duyurulması ve <legend>in
   grubu adlandırması tarayıcıdan geliyor; aynı kalıp iletişim formunda da var
   (app/iletisim/ContactSections.tsx). Elle yazılmış bir sekme listesi bunların
   hepsini taklit etmek olurdu.

   DİKKAT · Flag bileşeni width/height TAŞIMAYAN bir <svg viewBox="0 0 60 40">
   basıyor. Ölçüsü CSS'te açıkça sınırlanmazsa 300×150'ye açılıyor — bu depoda
   tam bu yüzden iki sayfa bozuldu. Sınır .kyn-pick-ic ve .kyn-cflag
   kurallarında (css/kaynaklar.css) ve ikisi de `overflow: hidden` taşıyor.

   ---------------------------------------------------------------------------
   NEDEN İSTEMCİ BİLEŞENİ
   Ülke seçimi durum tutuyor. Ama `@/lib/resources`tan yalnızca TİP alınıyor
   (`import type`, derlemede siliniyor): o modülü değer olarak import etmek
   GUIDES üzerinden countryContent, afterSetup ve blog dosyalarını istemci
   paketine sokardı. Satırın ekranda görünen her parçası sunucuda hazırlanıp
   prop olarak geliyor (bkz. lib/resources.ts · timelineRows).

   SÜZME KURALI DA BURADA YAZILMIYOR
   Her satır hangi seçimlerde görüneceğini kendisi taşıyor (`shownIn`), yani
   "üç ülkeyi ilgilendiren kayıt her ülkede görünür" kuralı tek yerde:
   lib/resources.ts · matchesFilter. Burada tekrarlansaydı iki kural bir gün
   ayrışırdı.
   ========================================================================= */

type Props = {
  rows: TimelineRow[];
  /** seçenekler sunucudan: etiketler ve bayrak slug'ları resources.ts'ten */
  filters: UpdateFilterOption[];
  /** yer tutucu rozetinde yazan tek kelime — resources.ts'te tek yerde */
  draftBadge: string;
};

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
                  {f.flag ? <Flag country={f.flag} /> : <Globe2 size={16} strokeWidth={1.9} />}
                </span>
                <span className="kyn-pick-t">{f.label}</span>
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
                ? ` — üç ülkeyi birden ilgilendiren ${shared} kayıt dahil.`
                : ".")}
        </p>
      </fieldset>

      {months.length === 0 ? (
        <p className="kyn-tl-none">
          Seçilen ülkede henüz kayıt yok. Üstteki seçiciden başka bir ülkeye geçebilirsiniz.
        </p>
      ) : (
        <ol className="kyn-tl">
          {months.map((m) => (
            <li key={m.key} className="kyn-tl-m">
              {/* Ay başlığı h2: sayfadaki tek h1 PageHero'da, kayıt başlıkları
                  da bunun altında h3. */}
              <h2 className="kyn-tl-mh">{m.label}</h2>

              {/* FadeUp kart başına DEĞİL, ay başına. Yirmi iki kartın yirmi
                  ikisi ayrı ayrı süzülünce hareket bilgi olmaktan çıkıp
                  gürültü oluyordu — ve kartlar küçüldüğü için artık aynı anda
                  beş altısı birden ekranda. */}
              <FadeUp>
                <ol className="kyn-tl-l">
                  {m.items.map((r) => (
                    <li key={r.id} className="kyn-tl-i">
                      <span className="kyn-tl-ax">
                        <time className="kyn-tl-d" dateTime={r.date}>
                          {r.dayLabel}
                        </time>
                        <span className="kyn-tl-node" data-draft={r.draft ? "true" : undefined} />
                      </span>

                      <article className="kyn-tl-c">
                        <details className="kyn-up" data-draft={r.draft ? "true" : undefined}>
                          <summary className="kyn-up-sum">
                            <span className="kyn-up-meta">
                              <span className="kyn-chip">
                                <span className="kyn-cflag" aria-hidden="true">
                                  {r.flag ? (
                                    <Flag country={r.flag} />
                                  ) : (
                                    <Globe2 size={12} strokeWidth={2} />
                                  )}
                                </span>
                                {r.countryLabel}
                              </span>
                              <span className="kyn-chip" data-tone={r.channel}>
                                {r.channelLabel}
                              </span>
                              {/* YER TUTUCU İŞARETİ — tek kelime, künyenin
                                  içinde. Önceki turda kartın üstünde şerit,
                                  sayfanın başında da panel vardı; müşteri
                                  ikisini de kaldırttı. Kalan bu: kaydın örnek
                                  olduğunu söylemeye yetiyor, tasarımı
                                  bozmuyor. */}
                              {r.draft && <span className="kyn-seed-tag">{draftBadge}</span>}
                            </span>

                            <h3 className="kyn-up-t">{r.title}</h3>
                            <p className="kyn-up-line">{r.line}</p>

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

                            {/* Kayıtta cevaplanacak başlıklar. Yer tutucuda
                                hepsi SORU cümlesi — soru bir olgu iddiası
                                taşımaz (bkz. lib/resources.ts · DRAFT_UPDATES). */}
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
                      </article>
                    </li>
                  ))}
                </ol>
              </FadeUp>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
