/* Build-time generator for the SVG globe.
 *
 * Runs once, offline, and writes src/lib/globeGeo.ts. Nothing here ships to the
 * browser: world-atlas, topojson-client and d3-geo are devDependencies, and the
 * runtime only ever sees the plain numbers this script prints.
 *
 * Two outputs:
 *   DOTS      a golden-spiral point set over the sphere, filtered to land.
 *             Equal-area by construction, so the dots do not bunch at the poles
 *             the way a lat/long grid does.
 *   OUTLINES  the three countries we highlight, as lat/long rings, so the
 *             landmass itself can be filled instead of marked with a pin.
 *
 * Usage: node scripts/gen-globe.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { feature } from "topojson-client";
import { geoArea, geoContains } from "d3-geo";

/* Points over the whole sphere; land keeps roughly 29%. This is the dial that
   controls how tight the dot field reads.

   It can be spent freely because of how the list is written (see `deltas` at the
   bottom): 96000 samples cost 83 KB gzipped as plain coordinates and 13 KB as
   deltas, so the budget buys roughly six times the dots it used to.

   Which is why the number is now set by the eye rather than by the budget.
   165000 was as tight as the field could go and it was past the point of
   comfort: dots that small at that spacing shimmer, and a surface that reads as
   grain rather than as dots is tiring to look at. Backed off about 13% in
   spacing, with the dot itself a touch larger (stroke-width 2.2 in globals.css),
   which is the pair that matters - what the eye judges is the ratio of dot to
   gap, not either one alone. */
const SAMPLES = 158000;
const OUT = "src/lib/globeGeo.ts";

/* Natural Earth kimlikleri — ama yalnız ikisi için.

   BURADAKİ ESKİ NOT YANLIŞTI ve bedeli iletişim haritasında görüldü: 110m
   verisinde "N. Cyprus" AYRI BİR ÖĞE olarak var, yalnızca sayısal `id` alanı
   yok. Kimlikle arayan bu harita ona ulaşamıyor ve kktc: "196" Kıbrıs
   Cumhuriyeti'ne, yani adanın GÜNEYİNE çözülüyor. Doğru seçici ad:
   properties.name === "N. Cyprus". Aynı hata
   src/app/iletisim/ContactSections.tsx · SHAPE_D içinde de vardı, orada
   düzeltildi (müşteri fark etti: "kktc olarak mavi işaretlediğin yer rum
   kesimi").

   BURADA DÜZELTİLMEDİ, BİLEREK: bu betiğin çıktısı src/lib/globeGeo.ts ve o
   dosya hiçbir rotadan ulaşılamıyor (node scripts/olu-kod.mjs — HeroGlobe.tsx,
   SvgGlobe.tsx, globeGeo.ts). OUTLINES.kktc ölçüldü, enlem 34,570…35,170,
   yani güney çokgeni; bugün hiçbir ekranda çizilmiyor. Küre geri gelirse
   KKTC'yi burada ADLA seç ve yayına almadan önce yeniden üret. */
const COUNTRIES = { dubai: "784", ingiltere: "826", kktc: "196" };

const land = feature(
  JSON.parse(readFileSync("node_modules/world-atlas/land-110m.json", "utf8")),
  "land",
);
const countries = feature(
  JSON.parse(readFileSync("node_modules/world-atlas/countries-110m.json", "utf8")),
  "countries",
);

/* Golden-spiral distribution: z steps linearly through the sphere, which makes
   every point carry the same area, and the angle turns by the golden angle so
   consecutive points never line up into visible rows. */
const GOLDEN = Math.PI * (3 - Math.sqrt(5));
const dots = [];
for (let i = 0; i < SAMPLES; i++) {
  const z = 1 - (2 * i + 1) / SAMPLES;
  const lat = (Math.asin(z) * 180) / Math.PI;
  const lng = (((GOLDEN * i) % (2 * Math.PI)) * 180) / Math.PI - 180;
  if (geoContains(land, [lng, lat])) dots.push([lng, lat]);
}

const shapeOf = (id) => {
  const f = countries.features.find((x) => String(x.id) === id);
  if (!f) throw new Error(`country ${id} not found`);
  const polys = f.geometry.type === "Polygon" ? [f.geometry.coordinates] : f.geometry.coordinates;
  /* outer rings only: holes are invisible at this size and double the payload */
  return polys.map((p) => p[0].map(([lng, lat]) => [round(lng), round(lat)]));
};

const round = (n) => Math.round(n * 100) / 100;
/* one decimal is 11 km - far finer than a dot map can show, and a quarter
   smaller than two */
const round1 = (n) => Math.round(n * 10) / 10;

const outlines = Object.fromEntries(
  Object.entries(COUNTRIES).map(([key, id]) => [key, shapeOf(id)]),
);

/* The chosen country is shown in dots, not as a filled shape - the map is made
   of dots, so a solid polygon dropped on it reads as a sticker. The world grid
   is far too coarse to do this: at 22000 samples the UK catches about ten
   points and Cyprus less than one. So each country gets its own dense pass,
   sampled over its own bounding box until it holds enough points to read as a
   territory. */
/* Not a fixed count: a fixed count means a fixed number of dots spread over
   whatever area the country happens to have, so the UAE came out solid and the
   United Kingdom, three times larger, came out sparse. What has to be constant
   is density - dots per unit of sphere - and the count follows from it. Tuned
   so the UAE keeps the ~300 dots that read as filled. */
const DOTS_PER_STERADIAN = 145600;

/* A lat/long grid was the wrong sampler: rows of constant latitude survive the
   projection, so the United Kingdom came out striped. This is the R2 sequence -
   a low-discrepancy pair built from the plastic number - drawn in (lng, sin lat)
   space, which is equal-area on a sphere. No rows, no clumps, and the same
   density from the Channel to Shetland. */
const PLASTIC = 1.32471795724474602596;
const A1 = 1 / PLASTIC;
const A2 = 1 / (PLASTIC * PLASTIC);

function denseDots(id) {
  const f = countries.features.find((x) => String(x.id) === id);
  const rings =
    f.geometry.type === "Polygon" ? [f.geometry.coordinates] : f.geometry.coordinates;
  let w = 180, s2 = 90, e = -180, n = -90;
  for (const poly of rings)
    for (const [lng, lat] of poly[0]) {
      if (lng < w) w = lng;
      if (lng > e) e = lng;
      if (lat < s2) s2 = lat;
      if (lat > n) n = lat;
    }
  const target = Math.max(24, Math.round(geoArea(f) * DOTS_PER_STERADIAN));
  const sinLo = Math.sin(s2 * Math.PI / 180);
  const sinHi = Math.sin(n * Math.PI / 180);
  const pts = [];
  /* the bounding box is mostly sea for an island, so the budget is generous;
     it stops the moment the country is full */
  for (let i = 1; i <= 900000 && pts.length < target; i++) {
    const lng = w + ((0.5 + A1 * i) % 1) * (e - w);
    const lat = (Math.asin(sinLo + ((0.5 + A2 * i) % 1) * (sinHi - sinLo)) * 180) / Math.PI;
    if (geoContains(f, [lng, lat])) pts.push([round1(lng), round1(lat)]);
  }
  return pts;
}

/* Off by default. The chosen country is drawn as one filled body now - dots on
   top of a dot map read as a second, noisier map - so this pass is neither
   emitted nor worth the 900k point-in-polygon tests it costs. Kept, and
   runnable with DENSE=1, because the decision between dots and fill has been
   made more than once. */
const countryDots = process.env.DENSE
  ? Object.fromEntries(Object.entries(COUNTRIES).map(([key, id]) => [key, denseDots(id)]))
  : {};

/* How far to zoom when a country is chosen. A country has to arrive at roughly
   the same size on screen whichever one it is, so the zoom is inverse to its
   linear extent - the square root of its area, not the area itself, because
   what the eye reads is width, not surface.

     z = A + B / sqrt(km²)

   solved through the two the brief pins down: Cyprus doubles (z = 2.00) and the
   UAE grows about a third (z = 1.35). The United Kingdom falls out of the same
   line at 1.22, which is right - it is the largest of the three. */
const EARTH_KM2 = 510072000;
const zoomFor = (id) => {
  const f = countries.features.find((x) => String(x.id) === id);
  const km2 = (geoArea(f) / (4 * Math.PI)) * EARTH_KM2;
  return Math.round((1.027 + 93.4 / Math.sqrt(km2)) * 1000) / 1000;
};
const zooms = Object.fromEntries(
  Object.entries(COUNTRIES).map(([key, id]) => [key, zoomFor(id)]),
);

/* The list is written as differences, not positions, and that one change is
   what makes a dense globe affordable: 83 KB gzipped becomes 13 KB.

   It works because of the order the sampler produces. Latitude steps down the
   sphere monotonically, so consecutive latitudes differ by a handful of tenths
   of a degree. Longitude turns by the golden angle every sample, so once the sea
   is dropped the surviving longitude steps take only a few distinct values.
   Both columns collapse into long runs of small repeated integers, which is
   exactly the shape gzip is good at - where absolute coordinates are effectively
   random five-digit numbers and compress hardly at all.

   Tenths of a degree throughout; the runtime runs the sum once, at mount. */
const deltas = [];
let pl = 0;
let pa = 0;
for (const [lng, lat] of dots) {
  const l = Math.round(lng * 10);
  const a = Math.round(lat * 10);
  deltas.push(l - pl, a - pa);
  pl = l;
  pa = a;
}

const body = `/* GENERATED by scripts/gen-globe.mjs — do not edit by hand.
   ${dots.length} land points out of ${SAMPLES} samples over the sphere, plus the
   outer rings of the three countries. Longitude first, matching GeoJSON. */

/** every land dot as a running difference, in tenths of a degree: dLng, dLat, … */
export const DOT_DELTAS: readonly number[] = ${JSON.stringify(deltas)};

/** how far the planet zooms in for each country: smaller land, closer look */
export const ZOOM: Record<"dubai" | "ingiltere" | "kktc", number> = ${JSON.stringify(
  zooms,
)};

/** outer rings per country, each ring a list of [lng, lat] */
export const OUTLINES: Record<"dubai" | "ingiltere" | "kktc", readonly (readonly (readonly [number, number])[])[]> = ${JSON.stringify(
  outlines,
)};
`;

mkdirSync("src/lib", { recursive: true });
writeFileSync(OUT, body);
console.log(
  `${OUT}: ${dots.length} dünya noktası, ` +
    Object.entries(zooms).map(([k, z]) => `${k}=z${z}`).join(" ") +
    (process.env.DENSE
      ? `, dots ${Object.entries(countryDots).map(([k, v]) => `${k}=${v.length}`).join(" ")}`
      : "") +
    `, ${(body.length / 1024).toFixed(0)} KB`,
);
