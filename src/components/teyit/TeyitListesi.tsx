"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  BadgeCheck,
  Building2,
  Check,
  CircleDot,
  Clock,
  Coins,
  Copy,
  CreditCard,
  Download,
  FileText,
  MessageCircleQuestion,
  Percent,
  Phone,
  Plane,
  Tag,
  Users,
  X,
} from "lucide-react";

import Logo from "@/components/shared/Logo";
import VERI from "@/lib/teyit/veri.json";

/* ============================================================================
   TEYİT LİSTESİ · /teyit — .tyt- · css/teyit.css
   Veri: lib/teyit/veri.json (kaydı docs/murat-teyit-listesi.md).

   23.09.2026 · Burak: "emin olmadığımız her şeyi koyalım … biz böyle bir şey
   yaptık bu bilgi doğru mu … en sonunda bu sayfaya eklemek istediğin bir şey
   var mı." İlk hâli claude.ai'de bir artifact'tı; Burak: "karşı tarafa
   attığımda o buradan giremez." Murat Bey'in hesabı yok, o yüzden liste
   sitenin kendi adresinde, menüye bağlı değil ve noindex (page.tsx).

   Kalıcı sunucu kaydı YOK (sitenin veritabanı yok): cevaplar Murat Bey'in
   tarayıcısında (localStorage) duruyor, yarıda bırakıp dönebiliyor. Bitince
   üç yoldan biriyle bize ulaşıyor: kopyala (WhatsApp'a yapıştır), WhatsApp'ta
   aç (metin kısaysa) ya da .txt indir. Metin numaralı: "KKTC 12 · YANLIŞ: …";
   numara docs/murat-teyit-listesi.md'deki numara.

   OKUMAYI KOLAYLAŞTIRAN ÜÇ ŞEY (Burak: "okunmasını birazcık daha
   kolaylaştıracak ikondur mikondur … pratikleştirebileceğimiz bir şey"):
     · soru metnindeki alıntı ("Sitede şunu yazdık: …") ayrı bir kutuda,
       sitedeki cümle gibi; asıl soru altında. 391 kez tekrar eden "Sitede
       şunu yazdık" kalıbı etikete indi.
     · her sayfanın başında "Sayfayı aç" bağlantısı: bu nerede yazıyor
       sorusunun cevabı; grup başlıklarında konu ikonu (vergi, banka …).
     · süzgeç: önce hassaslar, sonra cevaplanmamışlar. */

type Soru = { id: string; soru: string; hassas: boolean };
type Sayfa = { sayfa: string; baslik: string; kisa: string; not?: string; gruplar: { grup: string; sorular: Soru[] }[] };
type Cevap = { v?: "dogru" | "yanlis" | "emin"; n?: string; acik?: boolean };

const SAYFALAR = (VERI as { sayfalar: Sayfa[] }).sayfalar;
const ANAHTAR = "ortac-teyit-v1";
const ETIKET = { dogru: "Doğru", yanlis: "Yanlış", emin: "Emin değilim" } as const;

/* Grup başlığından konu ikonu. Sıra önemli: ilk eşleşen kazanıyor. */
const KONU: [RegExp, LucideIcon][] = [
  [/vergi|kdv|%0/i, Percent],
  [/sermaye|bloke/i, Coins],
  [/banka|ödeme|tahsilat|para/i, CreditCard],
  [/fiyat|harç|ücret|maliyet|ticari/i, Tag],
  [/vize|oturum/i, Plane],
  [/süre|süreç|takvim|ceza/i, Clock],
  [/belge|başvuru/i, FileText],
  [/lisans|serbest bölge|denetim|kimlik/i, BadgeCheck],
  [/ofis|iletişim|harita/i, Phone],
  [/sık|sss|sorular/i, MessageCircleQuestion],
  [/profil|kimin|kimler|ortak/i, Users],
  [/firma|künye|kurum|ekip|neden|kim yürütüyor|tanıtım/i, Building2],
];
function konuIkon(grup: string): LucideIcon {
  return KONU.find(([r]) => r.test(grup))?.[1] ?? CircleDot;
}

/* "Sitede şunu yazdık: "X" Doğru mu? …" → etiket · alıntı · soru. Yalnız
   alıntıdan önce iki nokta varsa ayrılıyor ("… yazdık: "X""); cümlenin
   ortasındaki alıntı ("Muafiyeti "X" şartına bağladık") ayrılınca cümle
   ikiye bölünüp okunmuyordu, o zaman cümle bütün kalıp alıntı içinde
   vurgulanıyor (Parca). */
function ayir(s: string) {
  const m = s.match(/^([^"]*?):\s*"([^"]+)"([\s\S]*)$/);
  if (!m) return { on: "", alinti: "", soru: s };
  return { on: m[1].trim(), alinti: m[2], soru: m[3].replace(/^[\s.,]+/, "").trim() };
}
function Parca({ t }: { t: string }) {
  return (
    <>
      {t.split(/("[^"]+")/).map((x, i) =>
        /^"[^"]+"$/.test(x) ? <mark key={i}>{x.slice(1, -1)}</mark> : x,
      )}
    </>
  );
}

function oku(): Record<string, Cevap> {
  try {
    return JSON.parse(localStorage.getItem(ANAHTAR) || "{}") || {};
  } catch {
    return {};
  }
}

export default function TeyitListesi() {
  const [cevap, setCevap] = useState<Record<string, Cevap>>({});
  const [aktif, setAktif] = useState(0);
  const [suzgec, setSuzgec] = useState<"hepsi" | "hassas" | "bos">("hepsi");
  const [bildirim, setBildirim] = useState("");
  const [yedek, setYedek] = useState<string | null>(null);
  const hazir = useRef(false);

  useEffect(() => {
    // localStorage yalnız istemcide: ilk boyamadan sonra yükleniyor (hidratasyon eşleşsin)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCevap(oku());
    hazir.current = true;
  }, []);
  useEffect(() => {
    if (!hazir.current) return;
    try {
      localStorage.setItem(ANAHTAR, JSON.stringify(cevap));
    } catch {
      /* gizli pencere: cevaplar yalnız bu oturumda */
    }
  }, [cevap]);

  const yaz = (id: string, d: Partial<Cevap>) =>
    setCevap((c) => ({ ...c, [id]: { ...c[id], ...d } }));

  const say = useMemo(() => {
    let c = 0,
      h = 0,
      ht = 0,
      t = 0;
    const sayfa = SAYFALAR.map((sf) => {
      let sc = 0,
        sn = 0;
      sf.gruplar.forEach((g) =>
        g.sorular.forEach((q) => {
          sn++;
          t++;
          if (q.hassas) ht++;
          if (cevap[q.id]?.v) {
            sc++;
            c++;
            if (q.hassas) h++;
          }
        }),
      );
      return { sc, sn };
    });
    return { c, h, ht, t, sayfa };
  }, [cevap]);

  const metin = () => {
    const L = ["ORTAC GLOBAL · SİTE TEYİT LİSTESİ · CEVAPLAR", ""];
    SAYFALAR.forEach((sf) => {
      const s: string[] = [];
      let n = 0;
      sf.gruplar.forEach((g) =>
        g.sorular.forEach((q) => {
          n++;
          const c = cevap[q.id];
          if (!c || (!c.v && !c.n?.trim())) return;
          const d = c.v ? ETIKET[c.v].toLocaleUpperCase("tr") : "NOT";
          /* hangi soru olduğu numarasız da anlaşılsın: alıntının başı */
          const p = ayir(q.soru);
          const oz = (p.alinti || p.soru).replace(/"/g, "");
          s.push(`${sf.kisa} ${n} · ${d}${c.n?.trim() ? ": " + c.n.trim() : ""}`);
          s.push(`   (${oz.length > 70 ? oz.slice(0, 68) + "…" : oz})`);
        }),
      );
      const ek = cevap["ek:" + sf.sayfa]?.n?.trim();
      if (ek) s.push(`${sf.kisa} · EKLENSİN: ${ek}`);
      if (s.length) L.push(`■ ${sf.baslik}`, ...s, "");
    });
    return L.join("\n");
  };

  const goster = (t: string) => {
    setBildirim(t);
    window.setTimeout(() => setBildirim(""), 2400);
  };
  const kopyala = async () => {
    const t = metin();
    try {
      await navigator.clipboard.writeText(t);
      goster("Kopyalandı. WhatsApp'ta Burak'a yapıştırabilirsiniz.");
    } catch {
      setYedek(t);
    }
  };
  const whatsapp = () => {
    const t = metin();
    /* wa.me bağlantısı uzun metinde kesiliyor; ~3.500 karakter üstünde
       kopyalamaya yönlendiriyoruz. */
    if (t.length > 3500) {
      kopyala();
      goster("Metin uzun, kopyalandı. WhatsApp'ta yapıştırın.");
      return;
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(t)}`, "_blank", "noopener");
  };
  const indir = () => {
    const b = new Blob([metin()], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(b);
    a.download = "ortac-teyit-cevaplar.txt";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const sayfaSec = (i: number) => {
    setAktif(i);
    document.getElementById("tyt-sekmeler")?.scrollIntoView({ block: "start" });
  };

  const sf = SAYFALAR[aktif];
  let no = 0;
  const genel = sf.gruplar.length === 0;

  return (
    <div className="tyt">
      <div className="tyt-wrap">
        <header className="tyt-bas">
          <Logo height={22} />
          <h1>Sitede yazdıklarımız doğru mu?</h1>
          <p>
            Yayındaki her sayfa için emin olmadığımız bilgileri listeledik. Her kutuda sitede
            yazdığımız cümle var: doğruysa işaretleyin, yanlışsa doğrusunu kısaca yazın. Her
            sayfanın sonunda eklemek istediğiniz bir şey olursa onu da yazabilirsiniz.
          </p>
          <ul className="tyt-nasil">
            <li>
              <i data-v="dogru">
                <Check size={12} strokeWidth={3} />
              </i>
              Doğru
            </li>
            <li>
              <i data-v="yanlis">
                <X size={12} strokeWidth={3} />
              </i>
              Yanlış, doğrusunu yazın
            </li>
            <li>
              <i data-v="emin">?</i>
              Emin değilim
            </li>
            <li>Cevaplar bu cihazda kalıyor; yarıda bırakıp dönebilirsiniz.</li>
          </ul>
        </header>

        <nav className="tyt-sekmeler" id="tyt-sekmeler" aria-label="Sayfalar">
          {SAYFALAR.map((s, i) => {
            const k = say.sayfa[i];
            return (
              <button
                key={s.sayfa}
                type="button"
                className="tyt-sekme"
                aria-current={i === aktif ? "true" : undefined}
                data-tamam={k.sn > 0 && k.sc === k.sn ? "" : undefined}
                onClick={() => sayfaSec(i)}
              >
                {s.kisa}
                {k.sn > 0 && (
                  <small>
                    {k.sc}/{k.sn}
                  </small>
                )}
              </button>
            );
          })}
        </nav>

        <section className="tyt-sayfa">
          <div className="tyt-sayfa-bas">
            <div>
              <h2>{sf.baslik}</h2>
              {sf.not && <p>{sf.not}</p>}
            </div>
            {sf.sayfa.startsWith("/") && (
              <a className="tyt-ac" href={sf.sayfa} target="_blank" rel="noopener noreferrer">
                Sayfayı aç
                <ArrowUpRight size={15} strokeWidth={2.2} aria-hidden="true" />
              </a>
            )}
          </div>

          {!genel && (
            <div className="tyt-suzgec" role="group" aria-label="Göster">
              {(
                [
                  ["hepsi", "Hepsi"],
                  ["hassas", "Yalnız hassaslar"],
                  ["bos", "Cevaplanmamışlar"],
                ] as const
              ).map(([k, l]) => (
                <button key={k} type="button" aria-pressed={suzgec === k} onClick={() => setSuzgec(k)}>
                  {l}
                </button>
              ))}
            </div>
          )}

          {sf.gruplar.map((g) => {
            const I = konuIkon(g.grup);
            const liste = g.sorular.map((q) => ({ q, n: ++no }));
            const gorunen = liste.filter(
              ({ q }) =>
                suzgec === "hepsi" || (suzgec === "hassas" ? q.hassas : !cevap[q.id]?.v),
            );
            if (!gorunen.length) return null;
            return (
              <div key={g.grup} className="tyt-grup">
                <h3>
                  <span className="tyt-grup-ic" aria-hidden="true">
                    <I size={15} strokeWidth={2.1} />
                  </span>
                  {g.grup}
                </h3>
                <ol className="tyt-liste">
                  {gorunen.map(({ q, n }) => {
                    const c = cevap[q.id] ?? {};
                    const p = ayir(q.soru);
                    const notAcik = c.v === "yanlis" || c.v === "emin" || c.acik || !!c.n;
                    return (
                      <li key={q.id} className="tyt-soru" data-c={c.v}>
                        <div className="tyt-soru-ust">
                          <span className="tyt-no">{n}</span>
                          <div>
                            {p.alinti ? (
                              <>
                                <span className="tyt-on">
                                  {/^sitede şunu yazdık$/i.test(p.on) ? "Sitede yazan" : p.on}
                                </span>
                                <blockquote className="tyt-alinti">{p.alinti}</blockquote>
                                {p.soru && (
                                  <p className="tyt-q">
                                    <Parca t={p.soru} />
                                  </p>
                                )}
                              </>
                            ) : (
                              <p className="tyt-q tyt-q-tek">
                                <Parca t={p.soru} />
                              </p>
                            )}
                            {q.hassas && <span className="tyt-hassas">Hassas</span>}
                          </div>
                        </div>
                        <div className="tyt-sec" role="group" aria-label={`Soru ${n} cevabı`}>
                          {(["dogru", "yanlis", "emin"] as const).map((v) => (
                            <button
                              key={v}
                              type="button"
                              data-v={v}
                              aria-pressed={c.v === v}
                              onClick={() => yaz(q.id, { v: c.v === v ? undefined : v })}
                            >
                              {v === "dogru" && <Check size={15} strokeWidth={2.6} aria-hidden="true" />}
                              {v === "yanlis" && <X size={15} strokeWidth={2.6} aria-hidden="true" />}
                              {v === "emin" && <span aria-hidden="true">?</span>}
                              {ETIKET[v]}
                            </button>
                          ))}
                          {!notAcik && (
                            <button type="button" className="tyt-not-ac" onClick={() => yaz(q.id, { acik: true })}>
                              Not ekle
                            </button>
                          )}
                        </div>
                        {notAcik && (
                          <div className="tyt-not">
                            <label htmlFor={`n-${q.id}`}>{c.v === "yanlis" ? "Doğrusu nedir?" : "Notunuz"}</label>
                            <textarea
                              id={`n-${q.id}`}
                              value={c.n ?? ""}
                              placeholder="Kısaca yazın"
                              onChange={(e) => yaz(q.id, { n: e.target.value })}
                            />
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </div>
            );
          })}

          <div className="tyt-ek">
            <label htmlFor={`ek-${aktif}`}>
              {genel
                ? "Sitenin geneli için eklemek ya da değiştirmek istediğiniz bir şey var mı?"
                : "Bu sayfaya eklemek istediğiniz bir şey var mı?"}
            </label>
            <textarea
              id={`ek-${aktif}`}
              value={cevap["ek:" + sf.sayfa]?.n ?? ""}
              placeholder={
                genel
                  ? "Eksik hizmet, yanlış anlatılan bir konu, eklenmesini istediğiniz sayfa"
                  : "Eksik gördüğünüz bilgi, eklenmesini istediğiniz bölüm ya da soru"
              }
              onChange={(e) => yaz("ek:" + sf.sayfa, { n: e.target.value })}
            />
          </div>

          {aktif < SAYFALAR.length - 1 && (
            <button type="button" className="tyt-sonraki" onClick={() => sayfaSec(aktif + 1)}>
              Sonraki sayfa: {SAYFALAR[aktif + 1].kisa}
              <ArrowUpRight size={15} strokeWidth={2.2} aria-hidden="true" style={{ transform: "rotate(45deg)" }} />
            </button>
          )}
        </section>
      </div>

      <div className="tyt-alt">
        <div className="tyt-alt-ic">
          <div className="tyt-ilerleme">
            <b>
              {say.c} / {say.t} cevaplandı
            </b>
            <span>
              Hassas olanlar: {say.h} / {say.ht}
            </span>
            <div className="tyt-cubuk">
              <i style={{ width: `${say.t ? (say.c / say.t) * 100 : 0}%` }} />
            </div>
          </div>
          <div className="tyt-gonder">
            <button type="button" onClick={kopyala} data-ana="">
              <Copy size={15} strokeWidth={2.2} aria-hidden="true" />
              Cevapları kopyala
            </button>
            <button type="button" onClick={whatsapp}>
              WhatsApp
            </button>
            <button type="button" onClick={indir} aria-label="Cevapları dosya olarak indir">
              <Download size={15} strokeWidth={2.2} aria-hidden="true" />
            </button>
          </div>
        </div>
        {bildirim && (
          <p className="tyt-bildirim" role="status">
            {bildirim}
          </p>
        )}
      </div>

      {yedek !== null && (
        <div className="tyt-yedek">
          <p>Otomatik kopyalanamadı. Metni seçip kopyalayın:</p>
          <textarea readOnly value={yedek} onFocus={(e) => e.currentTarget.select()} autoFocus />
          <button type="button" onClick={() => setYedek(null)}>
            Kapat
          </button>
        </div>
      )}
    </div>
  );
}
