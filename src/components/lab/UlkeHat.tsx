import {
  SAX_ORDER,
  SaxBody,
  SaxDisc,
  SaxHat,
  SaxHead,
} from "@/components/lab/UlkeSax";

/* ============================================================================
   LAB · ADAY 3 · "HAT" — halkasız cevap · ad alanı .sa3-

   NEDEN VAR. Müşteri Saturn fikrinden emin olmadığını kendi yazdı: "satürn
   halkası işinden emin değilim buranın mantığı genel olarak doğruda gibi ama
   dene bakalım bi." Üç adayın üçü de halkalı olsaydı ekrandaki soru "hangi
   halka" olurdu; oysa asıl soru "halka mı". Bu aday o soruyu sorulabilir
   kılıyor.

   FİKİR. Halka yok, yay yok. Müşterinin diğer iki isteği aynen yerinde: tek
   düz mavi çizgi ve o çizgide sürekli git gel. Çizgi bir süs değil satırın
   kendi çizgisi — üç diski diziyor ve isimlerin üstünde bir raf gibi duruyor.

   .sa2 ile İLİŞKİSİ. Aynı hat, aynı ışık, aynı gövde; tek fark halkalar ve
   disk boyu (56 → 44). Yani ikisi yan yana konduğunda ölçülen tek şey
   halkanın katkısı. Ayrı bir tasarım değil, kontrollü bir eksiltme.

   NEYİ FEDA EDİYOR. Sahne. Canlı bölümdeki üç katlı yay bir "kemer" hissi
   veriyordu ve bu aday onu da bırakıyor: geriye tek bir yatay hat kalıyor.
   Bölüm sakinleşiyor ama bir açılış jesti kaybediyor — ana sayfada arka
   arkaya gelen bölümler birbirinden yalnızca içerikle ayrılır hâle geliyor.
   Buna karşılık band 124 pikselden 60'a iniyor, yani üç ülke ekranda daha
   yukarıda başlıyor.
   ========================================================================= */

export default function UlkeHat() {
  return (
    <section className="sec-pad sa3" style={{ background: "var(--white)" }}>
      <div className="container-o">
        <SaxHead />

        <div className="sax-grid sa3-grid">
          <SaxHat />

          {SAX_ORDER.map((c) => (
            <div key={c} className="sax-col">
              <span className="sax-discwrap">
                <SaxDisc c={c} />
              </span>
              <SaxBody c={c} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
