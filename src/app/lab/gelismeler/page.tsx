import GelismelerGL1 from "@/components/lab/GelismelerGL1";
import GelismelerGL2 from "@/components/lab/GelismelerGL2";
import GelismelerGL3 from "@/components/lab/GelismelerGL3";
import { DRAFT_UPDATE_COPY, timelineRows, updateFilterOptions } from "@/lib/resources";

/* /lab/gelismeler — gelişmeler kaydının ÜÇ ayrı cevabı.
 *
 * Müşterinin cümlesi: "bide kart tasarımları tam ikna etmedi beni buranın
 * tasarımına bi ısınamadım ya genel bu gelişmeler kısmını labda 3 örnekle
 * tasarlasana."
 *
 * "Isınamadım" bir ayrıntı şikâyeti değil, o yüzden üç aday aynı fikrin üç
 * tonu değil: biri kartı tamamen kaldırıyor, biri dikey ekseni bırakıp yatay
 * alanı kullanıyor, biri çerçeveyi bırakıp yükü tipografiye veriyor. Üçünün
 * de neyi feda ettiği kendi bileşeninin başında yazılı.
 *
 * ÜÇÜ DE GERÇEK VERİYLE basıyor (lib/resources.ts · timelineRows — yirmi iki
 * kayıt): boş bir listenin tasarımı değerlendirilemez. Kayıtların hepsi yer
 * tutucu ve hepsi "Örnek" rozetiyle işaretli; hiçbirinde oran, tutar, tarih
 * ya da resmî karar iddiası yok.
 *
 * Üç aday da AYNI veriyi ve AYNI süzgeç seçeneklerini alıyor — karşılaştırma
 * ancak öyle adil olur.
 */

export const metadata = {
  title: "Gelişmeler · üç kart tasarımı | Lab",
  robots: { index: false, follow: false },
};

const FILTERS = updateFilterOptions();

const CANDIDATES = [
  {
    id: "gl1",
    name: "GL1 · Sicil",
    idea: "Kart yok: yirmi iki kayıt tek panelde, saç teli çizgilerle ayrılmış satırlar; ay çubuğu yapışkan.",
    cost: "Kapalı satırda tek satırlık kapsam metni görünmüyor — tarih, ülke, başlık ve tür kalıyor, kapsam açılınca geliyor.",
  },
  {
    id: "gl2",
    name: "GL2 · Izgara",
    idea: "Ay bir blok: tam genişlikte ay bandı, altında kayıtlar ızgarada; tarih karonun içinde takvim yaprağı.",
    cost: "Kesintisiz dikey eksen ve tek sıra okuma gidiyor; bir karo açılınca o ızgara satırı uzuyor.",
  },
  {
    id: "gl3",
    name: "GL3 · Manşet",
    idea: "Çerçeve yok: kayıtları boşluk ayırıyor, rengi ve ritmi büyük gün rakamı taşıyor.",
    cost: "Kartın sınırı kayboluyor; yoğun aylarda kaydın nerede bitip nerede başladığı yalnızca boşlukla belli oluyor.",
  },
] as const;

const CANDIDATE_BY_ID = {
  gl1: GelismelerGL1,
  gl2: GelismelerGL2,
  gl3: GelismelerGL3,
} as const;

/* Künye kasten kısa: labda okunacak şey deneme değil, ekranın kendisi. */
function Kunye({ n, name, idea, cost }: { n: number; name: string; idea: string; cost: string }) {
  return (
    <div className="glx-k">
      <p className="glx-k-n">
        <span className="glx-k-i">{n}</span>
        {name}
      </p>
      <p className="glx-k-l">{idea}</p>
      <p className="glx-k-c">
        <b>Feda ettiği:</b> {cost}
      </p>
    </div>
  );
}

export default function LabGelismelerPage() {
  const rows = timelineRows();

  return (
    <main className="glx">
      <header className="glx-top">
        <div className="container-o">
          <p className="glx-crumb">Lab · /gelismeler</p>
          <h1 className="glx-h">Gelişmeler kaydı — üç ayrı cevap.</h1>
          <p className="glx-lead">
            Üçü de aynı yirmi iki kayıtla ve aynı ülke süzgeciyle basıyor. Korunan üç kazanım:
            kart kapalıyken kısa, tarih sırası, ülke süzgeci. Üçünün de neyi feda ettiği
            künyesinde yazıyor.
          </p>
        </div>
      </header>

      {CANDIDATES.map((c, i) => {
        const Cmp = CANDIDATE_BY_ID[c.id];
        return (
          <section key={c.id} className="glx-sec" id={c.id}>
            <div className="container-o">
              <Kunye n={i + 1} name={c.name} idea={c.idea} cost={c.cost} />
              <Cmp rows={rows} filters={FILTERS} draftBadge={DRAFT_UPDATE_COPY.badge} />
            </div>
          </section>
        );
      })}
    </main>
  );
}
