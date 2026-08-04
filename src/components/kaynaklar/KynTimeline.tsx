"use client";

import { useId, useState } from "react";
import { ArrowUpRight, FlaskConical } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SmartLink from "@/components/shared/SmartLink";
import type { TimelineRow, UpdateFilter } from "@/lib/resources";

/* ============================================================================
   ZAMAN ÇİZELGESİ — /gelismeler'in gövdesi
   ============================================================================

   MÜŞTERİNİN İSTEĞİ
   "gelişmeler sayfasını ise timeline gibi bir şey yapmalısın ve ülke seçme
   olmalı ülkeye geldiğinde o ülkedeki gelişmeleri görücez gibi düşün."

   YAPISI
   Gerçek bir eksen: solda sabit genişlikte tarih sütunu, sütunun sağ kenarında
   yukarıdan aşağı inen tek bir çizgi, her kaydın hizasında o çizginin üstünde
   bir düğüm. Kayıtlar aya göre gruplanıyor; grup başlığı olmadan tarihli bir
   liste oluyor, eksen olmuyor.

   Kart ızgarası bilerek kullanılmadı: bir akışta önemli olan SIRA ve TARİH,
   kartın kapladığı alan değil.

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

   ERİŞİLEBİLİRLİK — NEDEN NATIVE RADIO
   Seçici bir açılır menü değil, görünen bir kontrol (müşterinin şartı). Dört
   seçenek `<fieldset>` içinde gerçek `<input type="radio">`: ok tuşlarıyla
   dolaşma, seçili durumun duyurulması ve `<legend>`in grubu adlandırması
   tarayıcıdan geliyor — elle yazılmış roving-tabindex'in yapabileceğinden
   fazlasını, hata payı olmadan. Görsel düğme `<span>`, `input` görsel olarak
   gizli ama ODAKLANABİLİR (display:none olsaydı klavyeye kapanırdı).

   Seçim değişince kaç kayıt kaldığı `aria-live="polite"` bir satırda
   duyuruluyor: ekran okuyucu kullanan kişi listenin değiştiğini görmüyor.
   ========================================================================= */

type Props = {
  rows: TimelineRow[];
  /** seçenekler sunucudan: etiketler brand.ts'teki ülke adlarından geliyor */
  filters: { id: UpdateFilter; label: string }[];
  /** yer tutucu şeridinde yazan metin — resources.ts'te tek yerde duruyor */
  draftBadge: string;
  /** yer tutucu kartın tarih satırına düşen şerh */
  draftDateNote: string;
};

export default function KynTimeline({ rows, filters, draftBadge, draftDateNote }: Props) {
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
          {filters.map((f) => {
            const n = countOfFilter(f.id);
            return (
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
                  {f.label}
                  <i>{n}</i>
                </span>
              </label>
            );
          })}
        </div>

        {/* Sayıların ne olduğunu söyleyen satır. Bugün listedeki kayıtların
            hepsi yer tutucu; "kayıt" demek onları yayınlanmış göstermek
            olurdu, o yüzden sayının yanında ne oldukları yazıyor. */}
        <p className="kyn-pick-n" aria-live="polite">
          {visible.length === 0
            ? `${selLabel} için gösterilecek kayıt yok.`
            : `${selLabel}: ${visible.length} kayıt gösteriliyor` +
              (sel !== "hepsi" && shared > 0
                ? ` — üç ülkeyi birden ilgilendiren ${shared} kayıt dahil.`
                : ".")}
        </p>
      </fieldset>

      {months.length === 0 ? (
        <p className="kyn-tl-none">
          Seçilen ülkede henüz kayıt yok. Üstteki seçiciden başka bir ülkeye
          geçebilirsiniz.
        </p>
      ) : (
        <ol className="kyn-tl">
          {months.map((m) => (
            <li key={m.key} className="kyn-tl-m">
              {/* Ay başlığı h2: sayfadaki tek h1 PageHero'da, kayıt başlıkları
                  da bunun altında h3. */}
              <h2 className="kyn-tl-mh">{m.label}</h2>

              <ol className="kyn-tl-l">
                {m.items.map((r) => (
                  <li key={r.id} className="kyn-tl-i">
                    <span className="kyn-tl-ax">
                      <time className="kyn-tl-d" dateTime={r.date}>
                        {r.dayLabel}
                      </time>
                      <span className="kyn-tl-node" data-draft={r.draft ? "true" : undefined} />
                    </span>

                    <FadeUp className="kyn-tl-c">
                      <article className="kyn-up" data-draft={r.draft ? "true" : undefined}>
                        {/* YER TUTUCU İŞARETİ — kartın ilk satırı.
                            Başlığın ÜSTÜNDE duruyor: aşağıda olsaydı başlığı
                            okuyup geçen kişi işareti hiç görmezdi ve uydurma
                            bir mevzuat değişikliğini gerçek sanırdı. */}
                        {r.draft && (
                          <p className="kyn-seed">
                            <FlaskConical size={13} strokeWidth={2.1} aria-hidden="true" />
                            {draftBadge}
                          </p>
                        )}

                        <div className="kyn-up-meta">
                          <time dateTime={r.date}>{r.dateLabel}</time>
                          <span className="kyn-chip">{r.countryLabel}</span>
                          <span className="kyn-chip" data-tone={r.channel}>
                            {r.channelLabel}
                          </span>
                        </div>

                        <h3 className="kyn-up-t">{r.title}</h3>
                        <p className="kyn-up-s">{r.summary}</p>

                        <dl className="kyn-up-kv">
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
                          {/* Yer tutucuda "kaynak" yerine EKSİĞİN KENDİSİ
                              yazıyor: kaydın neden yayında olmadığını
                              ziyaretçi de içeriği hazırlayacak kişi de aynı
                              satırdan okuyor. */}
                          {r.missing && (
                            <div>
                              <dt>Neden yayında değil</dt>
                              <dd>{r.missing}</dd>
                            </div>
                          )}
                        </dl>

                        <div className="kyn-up-foot">
                          {r.source ? (
                            /* Resmî kaynak site dışı: SmartLink dolaşım kararı
                               veren bir bileşen ve dış adreste işi yok. Yeni
                               sekme, çünkü ziyaretçi otoritenin sayfasına
                               gidip akışa dönüyor. */
                            <a
                              href={r.source.url}
                              className="kyn-src"
                              target="_blank"
                              rel="noreferrer"
                            >
                              Kaynak: {r.source.name}
                              <ArrowUpRight size={14} strokeWidth={2.2} aria-hidden="true" />
                            </a>
                          ) : (
                            <span className="kyn-nosrc">{draftDateNote}</span>
                          )}

                          {r.related && (
                            <SmartLink href={r.related.href} className="kyn-rel">
                              {r.related.label}
                            </SmartLink>
                          )}
                        </div>
                      </article>
                    </FadeUp>
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
