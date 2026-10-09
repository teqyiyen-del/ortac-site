"use client";

import "@/app/css/araclar-alan.css";
import { useId, useRef, useState } from "react";
import { Check, Globe, Minus, Search, X } from "lucide-react";
import { Dip, GirdiSatiri, Tezgah, Yardim, Bant } from "@/components/tools/ToolShell";
import {
  KUTUK_ADLARI,
  TUM_UZANTILAR,
  alanAdiSorgula,
  alanAyristir,
  alanBenzerleri,
  type AlanDurum,
  type AlanSonuc,
  type AlanUzantisi,
} from "@/lib/tools/alanadi";

/* ============================================================================
   ALAN ADI SORGULAMA (09.10.2026)
   Halil: "godaddy gibi; adam ismini girecek, mesela halil.com; alındıysa alındı
   diyecek, altta da diğer mevcut olabilecekleri gösterecek. Satın alınabilir
   bir sistem değil, sadece bilgi amaçlı."

   ÜÇ PARÇA
     1. Hüküm: yazılan ad ve uzantı kayıtlı mı (uzantı yazılmadıysa .com).
     2. Aynı adın öteki sekiz uzantısı.
     3. Ad alınmışsa: benzer adların .com'u; yalnız boş görünenler basılıyor.
   Satın alma bağlantısı YOK ve bilerek: araç bir satıcıya yönlendirmiyor.

   SORGU YALNIZ DÜĞMEYLE GİDİYOR (lib/tools/alanadi.ts'teki üç ilke): yazarken
   arka planda sorulmuyor, sorgu tarayıcıdan doğrudan kayıt kütüklerine gidiyor,
   sunucumuza hiçbir şey gelmiyor. Kime gittiği ekranda yazılı.

   "BOŞ GÖRÜNÜYOR", "ALABİLİRSİNİZ" DEĞİL: kütükte kayıt olmaması adın rezerve,
   uyuşmazlıkta ya da bir marka hakkına takılı olmadığını göstermez.
   ========================================================================== */

const DURUM_YAZI: Record<AlanDurum, string> = { bos: "Boş görünüyor", kayitli: "Alınmış", sorulamadi: "Sorulamadı" };
const DurumIkon = ({ d }: { d: AlanDurum }) => (d === "bos" ? <Check size={13} strokeWidth={2.4} aria-hidden="true" /> : d === "kayitli" ? <X size={13} strokeWidth={2.4} aria-hidden="true" /> : <Minus size={13} strokeWidth={2.4} aria-hidden="true" />);

type Sonuc = { etiket: string; ana: AlanUzantisi; uzantilar: AlanSonuc[]; benzerler: { ad: string; durum: AlanDurum }[] | null };

function Satir({ etiket, uzanti, durum }: { etiket: string; uzanti: string; durum: AlanDurum }) {
  return (
    <li className="ta-alan-satir" data-durum={durum}>
      <span className="ta-alan-ad">
        {etiket}
        <b>.{uzanti}</b>
      </span>
      <span className="ta-alan-durum">
        <DurumIkon d={durum} />
        {DURUM_YAZI[durum]}
      </span>
    </li>
  );
}

export default function AlanAdi() {
  const uid = useId();
  const [girdi, setGirdi] = useState("");
  const [bekliyor, setBekliyor] = useState(false);
  const [hata, setHata] = useState<string | null>(null);
  const [sonuc, setSonuc] = useState<Sonuc | null>(null);
  /* art arda iki sorguda geç gelen ilk cevap ikincinin üstüne yazmasın */
  const sira = useRef(0);

  async function sorgula(e: React.FormEvent) {
    e.preventDefault();
    const { etiket, uzanti, bilinmeyen } = alanAyristir(girdi);
    if (etiket.length < 2) return setHata("En az iki harfli bir ad yazın; harf, rakam ve tire kullanılabilir.");
    if (bilinmeyen) return setHata(`.${bilinmeyen} uzantısını soramıyoruz. Sorabildiklerimiz: ${TUM_UZANTILAR.map((u) => "." + u).join(", ")}.`);
    setHata(null);
    setBekliyor(true);
    const benim = ++sira.current, ana = uzanti ?? "com";
    const uzantilar = await alanAdiSorgula(etiket, TUM_UZANTILAR);
    if (benim !== sira.current) return;
    const anaDurum = uzantilar.find((u) => u.uzanti === ana)?.durum;
    /* benzerler yalnız ad alınmışsa soruluyor: boş bir ad için sekiz istek daha atmanın gereği yok */
    let benzerler: Sonuc["benzerler"] = null;
    if (anaDurum === "kayitli") {
      setSonuc({ etiket, ana, uzantilar, benzerler: null });
      benzerler = await Promise.all(alanBenzerleri(etiket).map(async (ad) => ({ ad, durum: (await alanAdiSorgula(ad, ["com"]))[0].durum })));
      if (benim !== sira.current) return;
    }
    setSonuc({ etiket, ana, uzantilar, benzerler });
    setBekliyor(false);
  }

  const ana = sonuc?.uzantilar.find((u) => u.uzanti === sonuc.ana);
  const digerleri = sonuc?.uzantilar.filter((u) => u.uzanti !== sonuc.ana) ?? [];
  const bosBenzer = sonuc?.benzerler?.filter((b) => b.durum === "bos") ?? [];
  const sorulamayan = sonuc?.benzerler?.filter((b) => b.durum === "sorulamadi").length ?? 0;
  const tamAd = sonuc ? `${sonuc.etiket}.${sonuc.ana}` : "";

  return (
    <>
      <Tezgah
        kicker={
          <>
            <Globe size={15} strokeWidth={2.1} aria-hidden="true" />
            Alan adı sorgusu
          </>
        }
      >
        <form className="ta-isim-form" onSubmit={sorgula} noValidate>
          <GirdiSatiri>
            <label className="ta-etiket" htmlFor={`${uid}-ad`}>
              <span className="ta-no" aria-hidden="true">01</span>
              <span>Alan adı</span>
            </label>
            <div className="ta-kutu" data-hata={hata ? "" : undefined}>
              <span className="ta-kutu-i" aria-hidden="true">
                <Globe size={18} strokeWidth={1.9} />
              </span>
              <input
                id={`${uid}-ad`}
                className="ta-girdi-b"
                type="text"
                inputMode="url"
                autoComplete="off"
                autoCapitalize="none"
                spellCheck={false}
                placeholder="atlaslabs.com"
                maxLength={90}
                value={girdi}
                onChange={(e) => { setGirdi(e.target.value); if (hata) setHata(null); }}
                aria-describedby={`${uid}-yardim`}
                aria-invalid={hata ? true : undefined}
              />
            </div>
          </GirdiSatiri>
          <Yardim id={`${uid}-yardim`}>
            {hata ?? "Yalnız adı da yazabilirsiniz; uzantı yazmazsanız .com soruluyor. Sorgu siz düğmeye basınca gidiyor."}
          </Yardim>
          <div className="ta-isim-sor">
            <button type="submit" className="ta-isim-git" disabled={bekliyor}>
              <Search size={16} strokeWidth={2.1} aria-hidden="true" />
              {bekliyor ? "Sorgulanıyor…" : "Sorgula"}
            </button>
          </div>
        </form>

        {sonuc && ana && (
          <>
            <Bant
              ikon={<Globe size={14} strokeWidth={1.9} aria-hidden="true" />}
              kicker={`Kayıt kütüğü · ${tamAd}`}
              alt={
                ana.durum === "kayitli"
                  ? "Bu ad başkası adına kayıtlı. Aşağıda aynı adın öteki uzantıları ve boş görünen benzer adlar var."
                  : ana.durum === "bos"
                    ? "Kütükte bu ada ait kayıt yok. Bu, adın alınabileceğinin garantisi değil: ad rezerve ya da bir marka hakkına takılı olabilir."
                    : "Kütük şu an cevap vermedi; bu, adla ilgili bir sonuç değil. Biraz sonra yeniden deneyin."
              }
              duyuru={`${tamAd}: ${DURUM_YAZI[ana.durum]}`}
            >
              {ana.durum === "kayitli" ? `${tamAd} alınmış` : ana.durum === "bos" ? `${tamAd} boş görünüyor` : `${tamAd} sorulamadı`}
            </Bant>

            <section className="ta-alan-bolum" aria-label="Aynı adın diğer uzantıları">
              <h3 className="ta-alan-h">
                Diğer uzantılar
                <span>{digerleri.filter((u) => u.durum === "bos").length} tanesi boş görünüyor</span>
              </h3>
              <ul className="ta-alan-liste">
                {digerleri.map((u) => (<Satir key={u.uzanti} etiket={sonuc.etiket} uzanti={u.uzanti} durum={u.durum} />))}
              </ul>
            </section>

            {ana.durum === "kayitli" && (
              <section className="ta-alan-bolum" aria-label="Boş görünen benzer adlar">
                <h3 className="ta-alan-h">
                  Benzer adlar
                  {/* Sorulamayan benzer ad "boş değil" diye sayılmasın: sayısı ayrıca yazılıyor. */}
                  {sonuc.benzerler && <span>{sonuc.benzerler.length} ad soruldu, {bosBenzer.length} tanesi boş görünüyor{sorulamayan ? `, ${sorulamayan} tanesi sorulamadı` : ""}</span>}
                </h3>
                {!sonuc.benzerler ? (
                  <p className="ta-alan-not">Benzer adlar soruluyor…</p>
                ) : bosBenzer.length ? (
                  <ul className="ta-alan-liste">
                    {bosBenzer.map((b) => (<Satir key={b.ad} etiket={b.ad} uzanti="com" durum="bos" />))}
                  </ul>
                ) : (
                  <p className="ta-alan-not">{sorulamayan ? "Benzer adların bir kısmı sorulamadı, kalanlar boş görünmüyor. Biraz sonra yeniden deneyin." : "Sorduğumuz benzer adların hiçbiri boş görünmüyor. Adı biraz değiştirip yeniden deneyin."}</p>
                )}
              </section>
            )}
            {/* Denetim (scripts/alan-denetim.mjs): example.dev, www.app, test.xyz gibi kütüğün kendine
                ayırdığı adlar da "kayıt yok" dönüyor. Uyarı eskiden yalnız aranan ad boşsa çıkıyordu;
                listelerde "boş görünüyor" yazan her durumda görünmeli. */}
            <p className="ta-alan-not">Boş görünüyor: kütükte bu ada ait kayıt yok demek. Ad kütük tarafından ayrılmış, özel fiyatlı ya da bir marka hakkına takılı olabilir; kesin cevabı satın alma anında satıcı verir.</p>
          </>
        )}
      </Tezgah>

      <Dip not={`Bu araç bilgi amaçlı; alan adı satmıyor ve bir satıcıya yönlendirmiyor. Yazdığınız ad sunucumuza gelmiyor: tarayıcınızdan doğrudan kayıt kütüklerine (${KUTUK_ADLARI.join(", ")}) soruluyor.`} />
    </>
  );
}
