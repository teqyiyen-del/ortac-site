import { COUNTRY_SLUGS, servicesFor } from "@/lib/services";

/* Canlı rota kayıt defteri.
 *
 * Site menüsü ve footer dizini, henüz inşa edilmemiş sayfalara da bağlantı
 * veriyor; hepsi /[...yapim] catch-all'ına, yani "Bu sayfa sıradaki fazda
 * inşa edilecek" kartına düşüyor. Geliştirirken doğru davranış bu — müşteriye
 * gösterirken değil. Ziyaretçi menüden bir şey seçip boş bir kartla
 * karşılaşınca sitenin tamamı yarım görünüyor.
 *
 * Bu dosya tek karar noktası: bir adres gerçekten var mı? Ülke ve hizmet
 * adresleri elle yazılmıyor, servicesFor()'dan türüyor — bir hizmet bir
 * ülkede açıldığında menü kendiliğinden canlanıyor.
 *
 * Sayfa gerçekten yayına girdiğinde yapılacak tek şey: adresini STATIC_LIVE'a
 * eklemek.
 */

const STATIC_LIVE = [
  "/",
  "/basla",
  "/ulkeler",
  "/uygunluk-testi",
  "/araclar/uygunluk-testi",
  "/kaynaklar",
];

/** ana sayfada karşılığı gerçekten olan çapalar */
const HOME_ANCHORS = new Set([
  "surec",
  "ulkeler",
  "odeme-altyapisi",
  "neden-ortac",
  "hizmetler",
  "kaynaklar",
  "blog",
  "sss",
  "durus",
]);

const LIVE = new Set<string>(STATIC_LIVE);
for (const c of COUNTRY_SLUGS) {
  LIVE.add(`/${c}`);
  for (const s of servicesFor(c)) LIVE.add(`/${c}/${s.slug}`);
}

/** Adres yayında mı? Site dışı bağlantılar (http, mailto, tel) her zaman açık. */
export function isLive(href: string): boolean {
  if (!href || !href.startsWith("/")) return true;

  /* "/basla?ulke=dubai#form" — sorgu ve çapa ayrılıyor, karar yola göre */
  const [beforeHash, hash] = href.split("#");
  const rawPath = beforeHash.split("?")[0];
  const path = rawPath.length > 1 && rawPath.endsWith("/") ? rawPath.slice(0, -1) : rawPath;

  /* "/#surec" — ana sayfanın kendisi açık, çapanın karşılığı var mı ona bakılır */
  if (path === "" || path === "/") return !hash || HOME_ANCHORS.has(hash);

  return LIVE.has(path);
}

/** yalnızca teşhis için: menüdeki ölü adresleri saymak isteyene */
export const LIVE_ROUTES = LIVE;
