"use client";

import { useEffect, useMemo, useRef } from "react";
import { DOT_DELTAS, OUTLINES, ZOOM } from "@/lib/globeGeo";
import type { Country } from "@/lib/store";

/* The globe, drawn as SVG.
 *
 * cobe drew this in a WebGL fragment shader, which meant the dots were only ever
 * as sharp as the backing buffer: at a 1450px sphere on a 2x screen that is a
 * 4096px texture and 67 MB, and it still stepped on the dot edges. Here the dots
 * are geometry, so they are exact at any size and there is no buffer at all -
 * 36957 land points and three country rings, 17 KB gzipped, generated offline by
 * scripts/gen-globe.mjs.
 *
 * The cost this trades into: the projection runs in JS. That is affordable
 * because the planet is still except while it turns to a new country, roughly
 * 700ms; when it settles the loop stops and nothing runs at all.
 *
 * Everything is one <path> per layer, not one node per dot. A dot is drawn as a
 * zero-length subpath with a round cap - "M x y h0" - which is the cheapest mark
 * SVG has, and lets 36957 of them share a single element.
 */

const VB = 1000; /* viewBox units; the box is square */
/* 0.40, not a taste number: cobe drew its sphere at 0.8 of the canvas box, and
   the stage CSS is built around that - the wrap is translated by -10% so the
   sphere's crown lands where --gs2-crown says. Matching the fraction exactly is
   what makes this globe sit in the same place, at the same size, with the same
   crop as the one it replaces. */
const R = 0.4 * VB;
const D2R = Math.PI / 180;

/** unit vector per dot, computed once: the per-frame work is only rotation */
type Vec = { x: number; y: number; z: number };
function toVec([lng, lat]: readonly [number, number]): Vec {
  const p = lat * D2R;
  const l = lng * D2R;
  const c = Math.cos(p);
  return { x: c * Math.sin(l), y: Math.sin(p), z: c * Math.cos(l) };
}

/* ---------------------------------------------------------------- the zoom */
/* Getting closer to a country without the planet getting any bigger.
 *
 * Scaling the drawing was the obvious move and it was the wrong one: it pushes
 * the limb out of the frame, and the limb is the only thing that says "sphere"
 * rather than "field of dots". So nothing about the sphere changes here. What
 * changes is the map painted on it - it is stretched over the chosen country and
 * squeezed on the far side, so that country arrives large while the silhouette
 * stays the same circle it always was.
 *
 * The stretch is a stereographic magnification: project the sphere from the
 * point opposite the country onto a plane, scale that plane by Z, project back.
 * It fixes the country, fixes its antipode, magnifies by exactly Z where it
 * matters, and - because every result is still a unit vector - cannot move the
 * silhouette by so much as a pixel. It also has a closed form with no
 * trigonometry in it at all, which is what makes it affordable 37000 times a
 * frame:
 *
 *   c = v·f,  A = 1 + c,  B = Z²(1 - c),  s = 1/(A + B)
 *   v' = f·((A - B)s - c·2Zs) + v·2Zs
 *
 * Applied in earth coordinates, before the rotation, because the two commute and
 * this way the focus vector is computed once instead of every frame. */

/* Istanbul, the far end of every route */
const HOME: readonly [number, number] = [28.9784, 41.0082];

/* the pin on each country: the territory shows the shape, this shows the point
   the route lands on, and which of the three is chosen */
const MARKS: Record<Country, readonly [number, number]> = {
  dubai: [55.2708, 25.2048],
  ingiltere: [-0.1278, 51.5074],
  kktc: [33.3823, 35.1856],
};

export default function SvgGlobe({
  lng,
  lat,
  active,
  target: place,
  onSettled,
  onPin,
}: {
  /** where the globe should face, in degrees */
  lng: number;
  lat: number;
  active: Country;
  /** the point the route ends on and the label points at, [lng, lat] */
  target: readonly [number, number];
  onSettled?: (settled: boolean) => void;
  /** projected position of that point, in viewBox units, whenever it moves */
  onPin?: (x: number, y: number, visible: boolean) => void;
}) {
  const dotsRef = useRef<SVGPathElement>(null);
  const areaRef = useRef<SVGPathElement>(null);
  const routeRef = useRef<SVGPathElement>(null);
  const routeTopRef = useRef<SVGPathElement>(null);
  const markOnRef = useRef<SVGPathElement>(null);
  const markOffRef = useRef<SVGPathElement>(null);
  const homeRef = useRef<SVGPathElement>(null);
  const target = useRef({ lng, lat });
  const settledRef = useRef(false);
  const onSettledRef = useRef(onSettled);

  useEffect(() => {
    onSettledRef.current = onSettled;
  }, [onSettled]);

  useEffect(() => {
    target.current = { lng, lat };
  }, [lng, lat]);

  /* Three typed arrays, not 37000 objects: the dot loop runs every frame while
     the planet turns, and reading three flat Float64Arrays is what keeps it off
     the allocator. The list arrives as running differences (see the generator),
     so the sum happens here, once. */
  const vecs = useMemo(() => {
    const n = DOT_DELTAS.length / 2;
    const X = new Float64Array(n);
    const Y = new Float64Array(n);
    const Z = new Float64Array(n);
    let lngT = 0;
    let latT = 0;
    for (let i = 0; i < n; i++) {
      lngT += DOT_DELTAS[i * 2];
      latT += DOT_DELTAS[i * 2 + 1];
      const p = (latT / 10) * D2R;
      const l = (lngT / 10) * D2R;
      const c = Math.cos(p);
      X[i] = c * Math.sin(l);
      Y[i] = Math.sin(p);
      Z[i] = c * Math.cos(l);
    }
    return { X, Y, Z, n };
  }, []);

  /* the chosen country as one shape. Dots made it a second, noisier map on top
     of the first; a single filled body reads as territory at any size. */
  const rings = useMemo(
    () =>
      Object.fromEntries(
        (Object.keys(OUTLINES) as Country[]).map((k) => [
          k,
          OUTLINES[k].map((ring) => ring.map(toVec)),
        ]),
      ) as Record<Country, Vec[][]>,
    [],
  );
  const activeRef = useRef(active);
  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  const homeVec = useMemo(() => toVec(HOME), []);
  const markVecs = useMemo(
    () =>
      (Object.keys(MARKS) as Country[]).map((k) => ({ key: k, v: toVec(MARKS[k]) })),
    [],
  );
  const placeRef = useRef(place);
  useEffect(() => {
    placeRef.current = place;
  }, [place]);
  const onPinRef = useRef(onPin);
  useEffect(() => {
    onPinRef.current = onPin;
  }, [onPin]);

  useEffect(() => {
    let raf = 0;
    /* current rotation, eased toward the target every frame */
    let curLng = target.current.lng;
    let curLat = target.current.lat;
    /* magnification about the chosen country; 1 is the untouched sphere */
    let curZoom = 1;
    /* how far this turn has to travel, so the zoom can follow its progress
       rather than run on a clock of its own */
    let span = 0;
    let seenLng = target.current.lng;
    let seenLat = target.current.lat;

    const { X, Y, Z, n } = vecs;

    const draw = () => {
      /* Bringing longitude L to the front means rotating by +L, not -L: with
         x = cos(lat)sin(L) and z = cos(lat)cos(L), the rotated x is
         cos(lat)·sin(L - a), which is zero at a = L. Negating it gave
         sin(2L) instead, so the map landed at twice its own longitude. */
      const rot = curLng * D2R;
      const tilt = curLat * D2R;
      const sinP = Math.sin(rot);
      const cosP = Math.cos(rot);
      const sinT = Math.sin(tilt);
      const cosT = Math.cos(tilt);

      const f = toVec(placeRef.current);
      const zm = curZoom;
      const z2 = zm * zm;
      const warping = zm > 1.001;

      /** warp about the country, then rotate, then drop z */
      const pv = (v: Vec) => {
        let ax = v.x;
        let ay = v.y;
        let az = v.z;
        if (warping) {
          const c = ax * f.x + ay * f.y + az * f.z;
          const s = 1 / (1 + c + z2 * (1 - c));
          const m = 2 * zm * s;
          const g = (1 + c - z2 * (1 - c)) * s - c * m;
          ax = f.x * g + v.x * m;
          ay = f.y * g + v.y * m;
          az = f.z * g + v.z * m;
        }
        const x = ax * cosP - az * sinP;
        const z0 = ax * sinP + az * cosP;
        const y = ay * cosT - z0 * sinT;
        const z = ay * sinT + z0 * cosT;
        return { sx: VB / 2 + x * R, sy: VB / 2 - y * R, front: z > 0 };
      };

      /* One weight for every dot. Splitting them into a bright band and a dim
         one made the sphere read as two rings of different material; the depth
         is put back by a vignette painted over the lot, which darkens towards
         the rim the way a horizon actually does. */
      /* Inlined rather than routed through pv(): at this count the object per
         dot is the expensive part, and half-unit rounding beats toFixed(1)
         because it is integer maths and a shorter string. Half a viewBox unit is
         0.7 device pixels at hero size - under a dot's own radius. */
      let dots = "";
      for (let i = 0; i < n; i++) {
        let ax = X[i];
        let ay = Y[i];
        let az = Z[i];
        if (warping) {
          const c = ax * f.x + ay * f.y + az * f.z;
          const s = 1 / (1 + c + z2 * (1 - c));
          const m = 2 * zm * s;
          const g = (1 + c - z2 * (1 - c)) * s - c * m;
          const bx = f.x * g + ax * m;
          const by = f.y * g + ay * m;
          const bz = f.z * g + az * m;
          ax = bx;
          ay = by;
          az = bz;
        }
        const x = ax * cosP - az * sinP;
        const z0 = ax * sinP + az * cosP;
        const y = ay * cosT - z0 * sinT;
        if (ay * sinT + z0 * cosT <= 0) continue;
        dots += `M${(((VB / 2 + x * R) * 2 + 0.5) | 0) / 2} ${(((VB / 2 - y * R) * 2 + 0.5) | 0) / 2}h0`;
      }
      dotsRef.current?.setAttribute("d", dots);

      /* the chosen country, one closed body per ring */
      let area = "";
      for (const ring of rings[activeRef.current] ?? []) {
        let started = false;
        let any = false;
        for (const v of ring) {
          const p = pv(v);
          if (!p.front) {
            started = false;
            continue;
          }
          any = true;
          area += `${started ? "L" : "M"}${p.sx.toFixed(1)} ${p.sy.toFixed(1)}`;
          started = true;
        }
        if (any) area += "Z";
      }
      areaRef.current?.setAttribute("d", area);

      /* The route and the label ride the same projection as the dots, so they
         cannot drift from the map the way they could when the positions came
         from another renderer's anchors. */
      /* the three pins plus Istanbul, each written to its own path so the
         chosen one can be a different colour and size without a second pass */
      let onMark = "";
      let offMark = "";
      for (const m of markVecs) {
        const p = pv(m.v);
        if (!p.front) continue;
        const s = `M${p.sx.toFixed(1)} ${p.sy.toFixed(1)}h0`;
        if (m.key === activeRef.current) onMark += s;
        else offMark += s;
      }
      markOnRef.current?.setAttribute("d", onMark);
      markOffRef.current?.setAttribute("d", offMark);

      const a = pv(homeVec);
      const b = pv(f);
      const both = a.front && b.front;
      if (both) {
        const mx = (a.sx + b.sx) / 2;
        const my = (a.sy + b.sy) / 2;
        const dx = mx - VB / 2;
        const dy = my - VB / 2;
        const len = Math.hypot(dx, dy) || 1;
        const lift = Math.hypot(b.sx - a.sx, b.sy - a.sy) * 0.34;
        const d = `M${a.sx.toFixed(1)} ${a.sy.toFixed(1)}Q${(mx + (dx / len) * lift).toFixed(1)} ${(my + (dy / len) * lift).toFixed(1)} ${b.sx.toFixed(1)} ${b.sy.toFixed(1)}`;
        routeRef.current?.setAttribute("d", d);
        routeTopRef.current?.setAttribute("d", d);
      }
      homeRef.current?.setAttribute(
        "d",
        a.front ? `M${a.sx.toFixed(1)} ${a.sy.toFixed(1)}h0` : "",
      );
      routeRef.current?.parentElement?.style.setProperty("--route-on", both ? "1" : "0");
      onPinRef.current?.(b.sx, b.sy, b.front);
    };

    const tick = () => {
      const t = target.current;
      /* a new country: remember how long this turn is, so the magnification can
         be spent across it instead of snapping */
      if (t.lng !== seenLng || t.lat !== seenLat) {
        seenLng = t.lng;
        seenLat = t.lat;
        span = Math.hypot(((t.lng - curLng + 540) % 360) - 180, t.lat - curLat);
      }

      const dLat = t.lat - curLat;
      /* take the short way round the meridian */
      const wrapped = ((t.lng - curLng + 540) % 360) - 180;

      /* The zoom rides the turn rather than a timer of its own. At the moment a
         country is picked the planet has the whole way to travel, progress is 0
         and the magnification is exactly 1 - so the focus can jump from the old
         country to the new one without anything visibly moving. It then blooms
         in as the country swings to the front, and lands with it. */
      const remain = Math.hypot(wrapped, dLat);
      const p = span > 1 ? Math.min(1, Math.max(0, 1 - remain / span)) : 1;
      const eased = p * p * (3 - 2 * p);
      const wantZoom = 1 + (ZOOM[activeRef.current] - 1) * eased;

      const dZoom = wantZoom - curZoom;
      const done =
        Math.abs(wrapped) < 0.15 && Math.abs(dLat) < 0.15 && Math.abs(dZoom) < 0.002;
      if (done) {
        curLng = t.lng;
        curLat = t.lat;
        curZoom = wantZoom;
      } else {
        curLng += wrapped * 0.09;
        curLat += dLat * 0.09;
        curZoom += dZoom * 0.12;
      }
      draw();
      if (done !== settledRef.current) {
        settledRef.current = done;
        onSettledRef.current?.(done);
      }
      /* the whole point of the trade: when it is settled, nothing runs */
      raf = done ? 0 : requestAnimationFrame(tick);
    };

    /* a settled globe still has to repaint when the target changes */
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    kick();
    const id = window.setInterval(kick, 120);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.clearInterval(id);
    };
  }, [vecs, rings, homeVec, markVecs]);

  return (
    <svg className="sgl" viewBox={`0 0 ${VB} ${VB}`} aria-hidden="true">
      <defs>
        {/* The planet's own disc. Everything painted on the sphere is clipped to
            it, and that one line is what removes the black ring that used to sit
            around the globe.

            The ring came from the vignette. A dot centred exactly on the limb
            paints half its stroke width past it, so those last dots came through
            white; the fix at the time was to widen the vignette to r = 1.02R,
            which darkened the dots but also laid a 10px band of near-solid black
            over the brightest part of the atmosphere - an outline drawn around
            the planet in the one place nothing should be drawn at all.

            Clipping solves the white dots at the source: no dot ink exists past
            398 units, so the vignette can stop exactly at the silhouette. */}
        <clipPath id="sgl-disc">
          <circle cx={VB / 2} cy={VB / 2} r={R * 0.995} />
        </clipPath>

        {/* Outside the limb. This went away once because it read as a ring stuck
            around the planet, and taking it out cost more than it saved: with
            nothing beyond the edge the sphere sat on the black like a sticker.

            Two things keep it from reading as a ring now. It starts at zero
            exactly on the silhouette and blooms outward, so there is no edge to
            see on the inside. And the tail is a five-stop approximation of an
            exponential rather than a straight line to zero: a linear ramp lands
            on its own outer circle with a constant slope, which the eye reads as
            a boundary even at 4% alpha. Halving the alpha at every step instead
            means the last stop arrives at zero already flat. */}
        <radialGradient id="sgl-air">
          <stop offset="55%" stopColor="#307fe2" stopOpacity="0" />
          <stop offset="58.5%" stopColor="#4a90ee" stopOpacity="0.30" />
          <stop offset="62%" stopColor="#3f86e4" stopOpacity="0.155" />
          <stop offset="67%" stopColor="#357fe0" stopOpacity="0.075" />
          <stop offset="74%" stopColor="#3079d8" stopOpacity="0.034" />
          <stop offset="84%" stopColor="#2c6fd0" stopOpacity="0.012" />
          <stop offset="100%" stopColor="#2c6fd0" stopOpacity="0" />
        </radialGradient>

        {/* Why the atmosphere fades out towards the crown.
            The stage clips, and it clips 7 units above the top of the sphere -
            there is no room up there at all, because the whole composition is a
            42% band of a planet far larger than its frame. So the glow above the
            crown was being sliced by a horizontal line, and a straight cut across
            a circular glow is exactly what reads as "the gradient just stops".
            Painting black over it, which is what .glb-stage::before was doing,
            only turns a cut into a smear.

            The honest fix is to have nothing up there to cut. The glow is masked
            by a vertical ramp that reaches zero at y = 100, the crown itself, and
            full strength by y = 215 - which is above the shoulders of the limb,
            so the sides keep every bit of their atmosphere. 115 units is 150 px
            of fade; nothing that gradual can be seen as an edge.

            One static circle with one static mask: it is rasterised once, not per
            frame, and never touches the dot layer. */}
        <linearGradient id="sgl-air-fade" gradientUnits="userSpaceOnUse" x1="0" y1="100" x2="0" y2="215">
          <stop offset="0%" stopColor="#000000" />
          <stop offset="55%" stopColor="#6b6b6b" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
        <mask
          id="sgl-air-mask"
          maskUnits="userSpaceOnUse"
          x={VB / 2 - R * 1.7}
          y={VB / 2 - R * 1.7}
          width={R * 3.4}
          height={R * 3.4}
        >
          <rect
            x={VB / 2 - R * 1.7}
            y={VB / 2 - R * 1.7}
            width={R * 3.4}
            height={R * 3.4}
            fill="url(#sgl-air-fade)"
          />
        </mask>

        {/* The depth: clear over the face, night at the edge. The face is left
            alone - pushed harder over the middle it swallowed the map and the
            globe went black - and all of the extra reach is spent past 90%,
            where the last ring of dots was still coming through white. */}
        <radialGradient id="sgl-vig">
          <stop offset="0%" stopColor="#080808" stopOpacity="0" />
          <stop offset="57%" stopColor="#080808" stopOpacity="0" />
          <stop offset="76.5%" stopColor="#080808" stopOpacity="0.42" />
          <stop offset="90%" stopColor="#080808" stopOpacity="0.84" />
          <stop offset="96%" stopColor="#080808" stopOpacity="0.97" />
          <stop offset="100%" stopColor="#080808" stopOpacity="0.99" />
        </radialGradient>
      </defs>
      {/* No transform on this group any more, and that is the point: the zoom
          lives in the projection now, so there is nothing here that could scale
          the sphere. */}
      <g>
        <circle
          cx={VB / 2}
          cy={VB / 2}
          r={R * 1.7}
          fill="url(#sgl-air)"
          mask="url(#sgl-air-mask)"
        />
        {/* everything that lives on the sphere, clipped to the sphere */}
        <g clipPath="url(#sgl-disc)">
          <path ref={dotsRef} className="sgl-dots" />
          <circle className="sgl-vig" cx={VB / 2} cy={VB / 2} r={R} fill="url(#sgl-vig)" />
          <path ref={areaRef} className="sgl-area" />
        </g>
        {/* the route arcs outside the silhouette by design, so it is not
            clipped - its lift pushes the midpoint away from the centre */}
        <g className="sgl-route">
          <path ref={routeRef} className="sgl-route-base" />
          <path ref={routeTopRef} className="sgl-route-top" />
        </g>
        <path ref={homeRef} className="sgl-mark sgl-mark-home" />
        <path ref={markOffRef} className="sgl-mark sgl-mark-off" />
        <path ref={markOnRef} className="sgl-mark sgl-mark-on" />
      </g>
    </svg>
  );
}
