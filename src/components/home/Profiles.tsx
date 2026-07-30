import SmartLink from "@/components/shared/SmartLink";
import {
  ArrowRight,
  Boxes,
  Building2,
  Code2,
  Landmark,
  Receipt,
  Repeat,
  ShoppingBag,
  UserRound,
} from "lucide-react";
import CodeSim from "@/components/home/CodeSim";
import FadeUp from "@/components/shared/FadeUp";
import SplitWords from "@/components/shared/SplitWords";

/* §9 · four profiles on white. Same four cards, same width, side by side: one
   compact grid, 4 / 2 / 1 columns. Each card is title + one sentence, and the
   schema is a small window pinned to the bottom of the card, never the card
   itself. The chip row is gone: it repeated the sentence above it in shorter
   words and cost every card a line of height for nothing.

   The e-commerce window is the one black surface in the row. It is the piece
   the eye lands on first, and the other three stay quiet paper around it.

   Every loop is CSS only (transform / opacity / clip-path), so nothing runs on
   the main thread, the browser parks them while the tab is hidden, and the
   reduce block at the end of the .pf2- CSS freezes each one on a visible state.

   The black migration band stays a separate door, not a fifth card. */

/* ---- e-commerce ticker: six sample rows, the first two repeated at the end.
   The track travels exactly six rows, so the wrap back to zero lands on the
   same pair that is already on screen and the jump is invisible. Two rows are
   visible at any moment; the rest of the set never exists on screen. */
const FEED = [
  { r: false, t: "Yeni sipariş", c: "Berlin", a: "€120" },
  { r: true, t: "Ödeme alındı", c: "Londra", a: "£64" },
  { r: false, t: "Yeni sipariş", c: "Amsterdam", a: "$180" },
  { r: true, t: "Ödeme alındı", c: "Dubai", a: "AED 350" },
  { r: false, t: "Yeni sipariş", c: "Toronto", a: "$240" },
  { r: true, t: "Ödeme alındı", c: "Paris", a: "€38" },
];
const FEED_TRACK = [...FEED, FEED[0], FEED[1]];

/* six bars is enough to read as "every month", twelve was a chart */
const MONTHS = Array.from({ length: 6 }, (_, i) => i);

function ShopSim() {
  return (
    <div className="pf2-sim pf2-shop pf2-sim-dark" aria-hidden="true">
      <div className="pf2-simhead">
        <span className="pf2-live" />
        <b>Bildirimler</b>
      </div>
      <div className="pf2-feed">
        <ul className="pf2-feedtrack">
          {FEED_TRACK.map((n, i) => (
            <li className="pf2-nrow" key={i}>
              <span className="pf2-nic">
                {n.r ? (
                  <Receipt size={11} strokeWidth={2} />
                ) : (
                  <ShoppingBag size={11} strokeWidth={2} />
                )}
              </span>
              <span className="pf2-ntxt">
                <b>{n.t}</b>
                <i>· {n.c}</i>
              </span>
              <span className="pf2-namt">{n.a}</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="pf2-note">Tutarlar temsilidir.</p>
    </div>
  );
}

function ChatSim() {
  return (
    <div className="pf2-sim pf2-chat" aria-hidden="true">
      <div className="pf2-simhead">
        <span className="pf2-av">
          <UserRound size={11} strokeWidth={2} />
        </span>
        <b>Müşteri</b>
        <i>çevrimiçi</i>
      </div>
      <div className="pf2-thread">
        <span className="pf2-bub pf2-bub-q">Fatura şirket adına olur mu?</span>
        <span className="pf2-slot">
          <span className="pf2-typing">
            <i />
            <i />
            <i />
          </span>
          <span className="pf2-bub pf2-bub-a">Evet, tahsilat da öyle.</span>
        </span>
      </div>
    </div>
  );
}

function EstateSim() {
  return (
    <div className="pf2-sim pf2-est" aria-hidden="true">
      <div className="pf2-flow">
        <span className="pf2-node">
          <span className="pf2-nodeic">
            <Building2 size={13} strokeWidth={1.9} />
          </span>
          <b>Mülk</b>
          <i>şirket adına</i>
        </span>
        {/* the wire carries no label any more: the two nodes already say what
            travels down it, and the pill sat in the middle of the card doing
            nothing but crowding it */}
        <span className="pf2-wire pf2-wire-bare">
          <span className="pf2-run">
            <i />
          </span>
        </span>
        <span className="pf2-node pf2-node-on">
          <span className="pf2-nodeic">
            <Landmark size={13} strokeWidth={1.9} />
          </span>
          <b>Şirketiniz</b>
          <i>tahsilat</i>
        </span>
      </div>
      <div className="pf2-months">
        {MONTHS.map((m) => (
          <span className="pf2-m" key={m}>
            <i style={{ "--d": `${m * 0.24}s` } as React.CSSProperties} />
          </span>
        ))}
      </div>
    </div>
  );
}

const PROFILES = [
  {
    Icon: Boxes,
    t: "E-ticaret",
    l: "Kartla tahsilat, çoklu pazar yeri ve lojistik tek yapıda toplanır.",
    Sim: ShopSim,
  },
  {
    Icon: Code2,
    t: "Yazılım ve teknoloji",
    l: "Abonelik ve uygulama içi satış, ödeme altyapısıyla birlikte kurulur.",
    Sim: CodeSim,
  },
  {
    Icon: UserRound,
    t: "Danışmanlık",
    l: "Yurt dışı müşteriye şirket adına sözleşme, fatura ve tahsilat.",
    Sim: ChatSim,
  },
  {
    Icon: Building2,
    t: "Gayrimenkul",
    l: "Mülk şirket altında durur, kira şirket hesabına akar.",
    Sim: EstateSim,
  },
];

export default function Profiles() {
  return (
    <section className="sec-pad" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <div className="sec-head">
          <SplitWords
            as="h2"
            text="Kimler için çalışıyoruz?"
            accent="çalışıyoruz?"
            className="h2"
            style={{ color: "var(--text-900)" }}
          />
          <FadeUp delay={0.2}>
            <p className="sec-lead">Kurgu, işin tipine göre değişiyor.</p>
          </FadeUp>
        </div>

        <div className="pf2-grid">
          {PROFILES.map((p, i) => (
            <FadeUp key={p.t} className="pf2-cell" delay={0.14 + i * 0.06}>
              <article className="pf2-card">
                <div className="pf2-body">
                  <span className="pf2-ic" aria-hidden="true">
                    <p.Icon size={17} strokeWidth={1.9} />
                  </span>
                  <h3>{p.t}</h3>
                  <p>{p.l}</p>
                </div>
                <p.Sim />
              </article>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.42}>
          <div className="pf2-move">
            <span className="pf2-move-ic" aria-hidden="true">
              <Repeat size={22} strokeWidth={1.9} />
            </span>
            <div>
              <h3>Şirketiniz zaten var mı? Ortac&apos;a taşıyın.</h3>
              <p>
                Mevcut kaydınızı, beyanlarınızı ve banka hareketlerinizi inceleyip geçiş planı
                çıkarıyoruz. Eksik varsa önce onu kapatıyoruz.
              </p>
            </div>
            <SmartLink href="/sirket-tasima" className="btn btn-primary">
              Şirketimi taşı
              <ArrowRight size={15} strokeWidth={2.1} />
            </SmartLink>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
