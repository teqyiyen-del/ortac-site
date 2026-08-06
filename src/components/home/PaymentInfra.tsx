"use client";

import { useState } from "react";
import {
  BadgeCheck,
  Check,
  CreditCard,
  Landmark,
  Minus,
  X,
  type LucideIcon,
} from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";
import { Flag } from "@/components/shared/CountryPicker";
import {
  COUNTRY_NAME,
  COUNTRY_ORDER,
  PARTNERS,
  PAY_MATRIX,
  type Cell,
  type Partner,
} from "@/lib/brand";

/* §4 — the heaviest block on the page. Two groups are mandatory: a payment
   institution account is not a bank account, and being the firm that draws
   that line is itself the proof. KKTC's ✗ marks stay. */

function Mark({ v }: { v: Cell }) {
  if (v === "yes")
    return (
      <span className="mx-v" data-v="yes" title="Var">
        <Check size={14} strokeWidth={3} />
      </span>
    );
  if (v === "no")
    return (
      <span className="mx-v" data-v="no" title="Desteklenmiyor">
        <X size={14} strokeWidth={3} />
      </span>
    );
  return (
    <span className="mx-v" data-v="none" title="Bu ülkede sunulmuyor">
      <Minus size={14} strokeWidth={3} />
    </span>
  );
}

/* the role decides the glyph — one icon family across the whole site.

   ÖLÜ DOSYA: bu bileşeni hiçbir sayfa import etmiyor (yaşayan karşılıkları
   HeroPartners ve Countries). Tutarlılık için elden geçti: aşağıda müşteri
   panelinin marka adına bağlı bir satır vardı, müşteri kararıyla kalktı
   ("iş ortağımız vb değil, sadece panel olarak kullanıyoruz, ekstra adını
   geçirmemize gereken bir durum yok"). Kayıt brand.ts · PARTNERS'tan da
   çıktığı için satırın eşleşeceği bir ad zaten kalmamıştı. */
const ROLE_ICON: Record<string, LucideIcon> = {
  IFZA: BadgeCheck,
  "Wio Business": Landmark,
  "Mashreq NeoBiz": Landmark,
  PayPal: CreditCard,
  wamo: CreditCard,
  Stripe: CreditCard,
};

const OFFICIAL = PARTNERS.filter((p) => p.group === "resmi");
const STACK = PARTNERS.filter((p) => p.group === "altyapi");

/* One lane renders the same set twice, so translating the track by -50% lands
   exactly on a repeat and the loop never seams. `reps` pads a short list until
   a single set is wider than the panel, otherwise a gap rides through. */
function Item({ p }: { p: Partner }) {
  const Icon = ROLE_ICON[p.name] ?? BadgeCheck;
  return (
    <li className="pl-item">
      <Icon size={17} strokeWidth={1.9} />
      <b>{p.name}</b>
    </li>
  );
}

function Lane({
  tier,
  label,
  items,
  reps = 1,
  still = false,
}: {
  tier: "official" | "soft";
  label: React.ReactNode;
  items: Partner[];
  reps?: number;
  /** two names loop visibly and read as filler; they hold the row better spread
      across it and standing still, which is also the louder placement */
  still?: boolean;
}) {
  const set = Array.from({ length: reps }, () => items).flat();
  return (
    <div className="pl-lane" data-tier={tier}>
      <span className="pl-label">{label}</span>
      <div className="pl-vp" data-still={still || undefined}>
        {still ? (
          <ul className="pl-set pl-spread" aria-hidden="true">
            {items.map((p) => (
              <Item key={p.name} p={p} />
            ))}
          </ul>
        ) : (
          <div className="pl-track" aria-hidden="true">
            {[0, 1].map((half) => (
              <ul key={half} className="pl-set">
                {set.map((p, i) => (
                  <Item key={`${half}-${i}-${p.name}`} p={p} />
                ))}
              </ul>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function PaymentInfra() {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <section id="odeme-altyapisi" className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="sec-head">
          <SplitWords
            as="h2"
            text="Şirket amaç değil. Amaç hesabın açılması ve tahsilatın çalışması."
            accent="tahsilatın çalışması."
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.2}>
            <p className="sec-lead">
              Hangi kanalın hangi ülkede çalıştığı aşağıda. Çalışmayanı da yazıyoruz.
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.24}>
          <div className="mx-scroll">
            <table className="mx">
              <thead>
                <tr>
                  <th scope="col">Kanal</th>
                  {COUNTRY_ORDER.map((c) => (
                    <th key={c} scope="col">
                      <span className="mx-head">
                        <span className="mx-flag" aria-hidden="true">
                          <Flag country={c} />
                        </span>
                        {COUNTRY_NAME[c]}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              {PAY_MATRIX.map((g) => (
                <tbody key={g.title}>
                  <tr className="mx-group">
                    <th scope="colgroup" colSpan={4}>
                      {g.title}
                      <span>{g.hint}</span>
                    </th>
                  </tr>
                  {g.rows.map((r) => (
                    <tr
                      key={r.name}
                      onMouseEnter={() => setHover(r.name)}
                      onMouseLeave={() => setHover(null)}
                      data-on={hover === r.name || undefined}
                    >
                      <th scope="row">{r.name}</th>
                      {COUNTRY_ORDER.map((c) => (
                        <td key={c}>
                          <Mark v={r.cells[c]} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="mx-notes">
            <p>
              <b>Banka onayı garanti edilmiyor.</b> Hesabı banka açar; karar bankanındır.
              Biz dosyayı istenen formatta hazırlar ve süreci yürütürüz.
            </p>
            <p>
              <b>Ödeme kuruluşu hesabı her zaman banka hesabı değildir.</b> Farklı lisans ve
              koruma rejimine tabidir; ikisini aynı şey gibi anlatan yeri ciddiye almayın.
            </p>
          </div>
        </FadeUp>

        {/* partners carry the proof load: no customer references on this site */}
        <FadeUp delay={0.34}>
          <div className="pl">
            <Lane
              tier="official"
              label={
                <>
                  <BadgeCheck size={15} strokeWidth={2.2} aria-hidden="true" />
                  Resmî ortaklıklar
                </>
              }
              items={OFFICIAL}
              reps={3}
            />
            <Lane tier="soft" label="Kullandığımız altyapı" items={STACK} still />
            <p className="sr-only">
              Resmî ortaklıklar: {OFFICIAL.map((p) => p.name).join(", ")}. Kullandığımız
              altyapı: {STACK.map((p) => p.name).join(", ")}.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
