import type { Metadata } from "next";
import { CalendarDays, FileCheck2, Landmark, Users } from "lucide-react";
import Nav from "@/components/Nav";
import PageHero from "@/components/shared/PageHero";
import FadeUp from "@/components/shared/FadeUp";
import FinalCta from "@/components/FinalCta";
import KynDraftNote from "@/components/kaynaklar/KynDraftNote";
import KynEmpty from "@/components/kaynaklar/KynEmpty";
import KynSwitch from "@/components/kaynaklar/KynSwitch";
import KynTimeline from "@/components/kaynaklar/KynTimeline";
import {
  DRAFT_UPDATES,
  DRAFT_UPDATE_COPY,
  RESOURCE_KINDS,
  UPDATES,
  UPDATE_FILTERS,
  UPDATE_FILTER_LABEL,
  timelineRows,
} from "@/lib/resources";

/* ============================================================================
   /gelismeler — zaman çizelgesi
   ============================================================================

   BÖLÜMÜN İŞİ VE RİSKİ AYNI YERDE
   Müşterinin isteği açık: "tarih bazlı yaşayan bir site algısı vermek" ve
   "gelişmeler sayfasını ise timeline gibi bir şey yapmalısın ve ülke seçme
   olmalı ülkeye geldiğinde o ülkedeki gelişmeleri görücez gibi düşün."
   Bölümün işi güncellik. Ama bu firmada güncellik uydurulamaz: teyit
   edilmemiş bir mevzuat değişikliği yayınlamak yanlış bilgi vermek olur ve
   bedeli bir tasarım kusurunun kat kat üstünde.

   ÇÖZÜM: ŞEMA KORUNDU, YER TUTUCU İŞARETLENDİ
   `Update.source` hâlâ ZORUNLU (resmî otoritenin kendi duyurusunun adı +
   adresi), yani kaynağı olmayan bir satır tip denetiminden geçmiyor. Yayına
   girmiş kayıt bugün YOK.

   Çizelgede görünen kayıtlar ayrı bir tipte (`DraftUpdate`) ve `source`
   alanları hiç yok. Ekranda üç kere işaretleniyorlar:
     1. sayfanın başındaki uyarı paneli (KynDraftNote),
     2. her kartın en üstünde "örnek kayıt · içerik onay bekliyor" şeridi,
     3. kaynak satırının yerinde "tarih yerleşim içindir" şerhi ve kartın
        içinde "neden yayında değil" alanı.
   İçlerinde uydurma oran, tutar, eşik, madde numarası ya da kurum kararı yok;
   yalnızca hangi konuda kayıt beklendiği yazıyor (bkz. lib/resources.ts).

   RİTİM — TARİH EKSENİ
   Solda sabit genişlikte tarih sütunu, sağ kenarında yukarıdan aşağı inen tek
   çizgi, her kaydın hizasında bir düğüm; kayıtlar aya göre gruplu. Kart
   ızgarası değil: bir akışta önemli olan sıra ve tarih.

   ÜLKE SEÇİCİ — KynTimeline içinde, native radyo grubuyla. Açılır menü değil
   görünen kontrol (müşterinin şartı) ve klavye/ekran okuyucu davranışı
   tarayıcıdan geliyor.
   ========================================================================= */

const SITE = "https://ortacglobal.com";
const META = RESOURCE_KINDS.gelisme;

export const metadata: Metadata = {
  title: "Gelişmeler ve mevzuat — tarih sırasıyla | Ortac Global",
  description:
    "Dubai, İngiltere ve KKTC tarafında neyin ne zaman değiştiği; ülkeye göre süzülebilen zaman çizelgesi. Yayınlanan her kayıt resmî kaynağına bağlanır.",
  alternates: { canonical: `${SITE}/gelismeler` },
};

/* Bir kaydın taşımak ZORUNDA olduğu dört şey. Yer tutucularla dolu bir
   çizelgede daha da gerekli: standardı önce yazmak, aşağıdaki kartların neyi
   beklediğini açıklıyor. */
const RULES = [
  {
    Icon: CalendarDays,
    t: "Tarih",
    l: "Duyurunun tarihi; yürürlük tarihi farklıysa o da ayrıca yazılır.",
  },
  { Icon: Landmark, t: "Ülke", l: "Kayıt hangi ülkeyi ilgilendiriyor — ya da üçünü birden." },
  {
    Icon: FileCheck2,
    t: "Resmî kaynak",
    l: "Otoritenin kendi duyurusuna bağlantı. Kaynağı olmayan kayıt yayınlanmıyor.",
  },
  { Icon: Users, t: "Kimi ilgilendiriyor", l: "Ve varsa yapılması gereken tek şey." },
];

/* Seçenekler sunucuda hazırlanıp prop olarak geçiyor: istemci bileşeni
   resources.ts'i değer olarak import etmiyor (bkz. KynTimeline başlığı). */
const FILTERS = UPDATE_FILTERS.map((id) => ({ id, label: UPDATE_FILTER_LABEL[id] }));

export default function GelismelerPage() {
  const rows = timelineRows();
  const hasDrafts = DRAFT_UPDATES.length > 0;

  /* JSON-LD'ye YALNIZCA `UPDATES` giriyor. Yer tutucular yapılandırılmış
     veride en pahalı yerde durur: arama motoruna var olmayan bir mevzuat
     kaydı bildirmek, ekranda işaretlenmiş bir kartın yapamayacağı kadar
     kalıcı bir yanlış. Bugün dizi boş, o yüzden ItemList hiç yazılmıyor. */
  const empty = UPDATES.length === 0;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana sayfa", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "Gelişmeler", item: `${SITE}/gelismeler` },
        ],
      },
      {
        "@type": "CollectionPage",
        name: "Gelişmeler ve mevzuat",
        url: `${SITE}/gelismeler`,
        inLanguage: "tr-TR",
        ...(empty
          ? {}
          : {
              mainEntity: {
                "@type": "ItemList",
                itemListElement: UPDATES.map((u, i) => ({
                  "@type": "ListItem",
                  position: i + 1,
                  name: u.title,
                  url: u.source.url,
                })),
              },
            }),
      },
    ],
  };

  return (
    <>
      <Nav />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <PageHero
          crumb="Gelişmeler"
          title="Neyin ne zaman değiştiği."
          accent="ne zaman değiştiği."
          lead="Kuruluş, vergi ve beyan tarafındaki değişiklikler tarih sırasıyla burada; ülke seçerek daraltabilirsiniz. Her kayıt resmî kaynağına bağlanır; bağlanamıyorsa yayınlanmaz."
        />

        <section className="sec-pad" style={{ background: "var(--white)" }}>
          <div className="container-o">
            <FadeUp>
              <div className="kyn-rules">
                <p className="kyn-rules-h">Bir kayıt dört şeyi taşımadan yayınlanmıyor</p>
                <ul>
                  {RULES.map((r) => (
                    <li key={r.t}>
                      <span className="kyn-rules-ic" aria-hidden="true">
                        <r.Icon size={16} strokeWidth={1.9} />
                      </span>
                      <b>{r.t}</b>
                      <em>{r.l}</em>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>

            {/* Uyarı kuralın hemen ardında: önce standart, sonra "aşağıdakiler
                o standardı henüz karşılamıyor". */}
            {hasDrafts && (
              <FadeUp delay={0.08}>
                <KynDraftNote
                  title="Aşağıdaki kayıtlar örnektir"
                  lines={[
                    "Bu sayfada yayınlanmış kayıt yok. Çizelgede görünen kartlar tasarımı ve akışın nasıl işleyeceğini göstermek için duruyor; hiçbiri teyit edilmiş bir mevzuat değişikliği değil.",
                    "İçlerinde oran, tutar, eşik ya da kurum kararı yazmıyor — yalnızca hangi konuda kayıt beklendiği ve neyin teyit edilmediği yazıyor. Her kartın üstünde ayrıca işaret var.",
                  ]}
                />
              </FadeUp>
            )}

            {rows.length === 0 ? (
              /* Yer tutucular da temizlendiğinde geriye dürüst boş durum
                 kalıyor: sayfa kendini gizlemiyor, ne zaman kayıt gireceğini
                 ve bu arada nereye gidileceğini yazıyor. */
              <KynEmpty
                meta={META}
                exits={[
                  {
                    label: "İlk 12 ay yükümlülük takvimi",
                    href: "/araclar#yukumluluk-takvimi",
                    line: "Kuruluş tarihinizi yazın, hangi ay ne çıktığını görün.",
                  },
                  {
                    label: "Dubai · vergi çerçevesi",
                    href: "/dubai#vergi",
                    line: "Yayınlanan oranlar ve kayıt yükümlülüğü.",
                  },
                  {
                    label: "Blog",
                    href: "/blog",
                    line: "Konuyu açan yazılar, kaynağıyla birlikte.",
                  },
                ]}
              />
            ) : (
              <KynTimeline
                rows={rows}
                filters={FILTERS}
                draftBadge={DRAFT_UPDATE_COPY.badge}
                draftDateNote={DRAFT_UPDATE_COPY.dateNote}
              />
            )}
          </div>
        </section>

        <KynSwitch current="gelisme" />
        <FinalCta />
      </main>
    </>
  );
}
