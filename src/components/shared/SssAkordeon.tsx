"use client";

/* SSS · açılır kutular, tam genişlik (25.09.2026 · /lab/sss S1).

   Burak S1 için: "hepsinin kendi ikonu rengi falan var, güzel duruyor … bunu
   full genişlikte yapabilirsin. 'Sorunuz listede yok' kartını sola koyup şey
   yapmaya gerek yok … kendi aşağılarında açılırlar. Olur biter." Eski blok
   (solda soru listesi, sağda siyah cevap paneli) için: "cevap kısmı siyah
   üzerinde … sitenin geri kalanıyla uymuyor."

   Ana sayfa (HomeFaq) ve bütün ülke, hizmet, sektör sayfaları (CountryFaq)
   bunu basıyor; iki bileşen yalnız veri ve çıkış etiketi veriyor.

   CEVAPLAR DOM'DA KALIYOR. Kapalı kutu yüksekliği 0fr'lık bir ızgara
   satırında saklanıyor, sökülmüyor: arama motoru altı cevabın altısını da
   okuyor (sayfaların FAQPage verisiyle aynı metin) ve açılış yükseklik
   ölçmeden akıyor. Kapalı cevap `inert`: sekme sırasına ve ekran okuyucuya
   girmiyor.

   KONU İŞARETİ. Ana sayfanın verisinde konu yazılı. Ülke ve hizmet
   verisinde yalnız soru ve cevap var; konu sorunun kelimelerinden
   çıkarılıyor (konuBul). Renk sitenin renk kuralından: para yeşil, vergi ve
   yükümlülük amber, geri kalan mavi. Yanlış eşleşme yalnız ikonun rengini
   değiştirir, metni değil; yine de bir soru yanlış düşerse veriye `topic`
   yazmak yeter. */

import { useId, useState } from "react";
import {
  ArrowRight,
  Building2,
  CircleHelp,
  CreditCard,
  IdCard,
  Landmark,
  Plus,
  ReceiptText,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import SmartLink from "@/components/shared/SmartLink";
import FadeUp from "@/components/shared/FadeUp";
import { gtm } from "@/lib/gtm";

export type SssKonu = "vergi" | "banka" | "odeme" | "maliyet" | "oturum" | "kurulus";
export type SssItem = { q: string; a: string; topic?: SssKonu; to?: string; toLabel?: string };

const KONU: Record<SssKonu, { icon: LucideIcon; ton: "amber" | "yesil" | "mavi" }> = {
  vergi: { icon: ReceiptText, ton: "amber" },
  banka: { icon: Landmark, ton: "yesil" },
  odeme: { icon: CreditCard, ton: "yesil" },
  maliyet: { icon: Wallet, ton: "yesil" },
  oturum: { icon: IdCard, ton: "mavi" },
  kurulus: { icon: Building2, ton: "mavi" },
};

/* Sıra önemli: ilk eşleşen kazanıyor. Oturum en önde, çünkü "vize ücreti"
   gibi bir soru önce vize sorusudur; vergi para kelimelerinden önce, çünkü
   "vergi ödeyecek miyim" bir vergi sorusudur. Yalnız SORUYA bakılıyor:
   cevaplar birden çok konuya değiniyor ve yanıltıyor. */
const KURAL: [SssKonu, RegExp][] = [
  ["oturum", /vize|oturum|emirates id|biyometri|sağlık kontrol|medical|ikamet|sponsor/],
  ["vergi", /vergi|kdv|vat|beyan|muhasebe|defter|mukim|ceza|denetim|audit|aml|goaml|uyum|esr|ubo|stopaj|hmrc|confirmation/],
  ["banka", /banka|hesap|hesab|iban/],
  ["odeme", /stripe|paypal|wise|payoneer|tahsilat|ödeme al|kart|\bpos\b|pazar ?yeri|amazon|shopify/],
  ["maliyet", /ücret|maliyet|fiyat|masraf|öde|kaç para|bütçe|yenileme/],
];
export function konuBul(q: string): SssKonu {
  const s = q.toLocaleLowerCase("tr");
  for (const [k, re] of KURAL) if (re.test(s)) return k;
  return "kurulus";
}

function Isaret({ konu }: { konu: SssKonu }) {
  const k = KONU[konu];
  const Icon = k.icon;
  return (
    <span className="sssa-mark" data-ton={k.ton} aria-hidden="true">
      <Icon size={17} strokeWidth={2} />
    </span>
  );
}

export default function SssAkordeon({
  items,
  placement,
  cta,
}: {
  items: SssItem[];
  /** gtm olayının yeri: ana sayfa "sss", diğerleri "sss_ulke" */
  placement: string;
  /** çıkış düğmesinin yazısı */
  cta: string;
}) {
  const [open, setOpen] = useState(0);
  const base = useId();
  if (items.length === 0) return null;

  return (
    <div className="sssa">
      <FadeUp delay={0.2}>
        <ul className="sssa-list">
          {items.map((it, i) => {
            const on = open === i;
            const qId = `${base}-q${i}`;
            const aId = `${base}-a${i}`;
            return (
              <li key={it.q} className="sssa-item" data-open={on || undefined}>
                <h3 className="sssa-h">
                  <button
                    type="button"
                    id={qId}
                    className="sssa-q"
                    aria-expanded={on}
                    aria-controls={aId}
                    onClick={() => setOpen(on ? -1 : i)}
                  >
                    <Isaret konu={it.topic ?? konuBul(it.q)} />
                    <span className="sssa-qt">{it.q}</span>
                    <Plus className="sssa-x" size={20} strokeWidth={2} aria-hidden="true" />
                  </button>
                </h3>
                <div id={aId} role="region" aria-labelledby={qId} className="sssa-a" inert={!on}>
                  <div className="sssa-ain">
                    <p>{it.a}</p>
                    {it.to && it.toLabel && (
                      <SmartLink href={it.to} className="link-arrow sssa-go">
                        {it.toLabel}
                        <ArrowRight size={14} strokeWidth={2.1} aria-hidden="true" />
                      </SmartLink>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </FadeUp>

      {/* blok için tek çıkış; listenin altında, tam genişlikte */}
      <FadeUp delay={0.24}>
        <div className="sssa-ask">
          <span className="sssa-ask-ic" aria-hidden="true">
            <CircleHelp size={20} strokeWidth={2} />
          </span>
          <div className="sssa-ask-t">
            <b>Sorunuz listede yok mu?</b>
            <span>Kendi durumunuzu görüşmede sorabilirsiniz.</span>
          </div>
          <SmartLink
            href="/basla"
            className="btn btn-solid sssa-ask-btn"
            onClick={() => gtm("cta_meeting_click", { placement })}
          >
            {cta}
            <ArrowRight size={16} strokeWidth={2.1} aria-hidden="true" />
          </SmartLink>
        </div>
      </FadeUp>
    </div>
  );
}
