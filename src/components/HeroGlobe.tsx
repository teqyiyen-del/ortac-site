"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import SvgGlobe from "@/components/SvgGlobe";
import CountryPicker, { COUNTRY_NAMES } from "@/components/shared/CountryPicker";
import { useOrtacStore, type Country } from "@/lib/store";
import { FACTS } from "@/lib/brand";
import { gtm } from "@/lib/gtm";

/* The hero's world. cobe drew this in WebGL until the dots would not hold up:
   a shader can only be as sharp as its backing buffer, and at hero size that
   meant a 67 MB texture that still stepped on every dot edge. SvgGlobe draws
   the same picture as geometry, so it is exact at any size, weighs 24 KB
   gzipped and allocates no buffer at all.

   Two things came for free with the move. The country is filled rather than
   pinned, because the outlines are real polygons now instead of one baked
   texture. And the route and the label read the same projection as the dots,
   so they cannot drift from the map the way they could across two renderers. */

/* the point the label hangs on, per country */
const PLACES: Record<Country, readonly [number, number]> = {
  dubai: [55.2708, 25.2048],
  ingiltere: [-0.1278, 51.5074],
  kktc: [33.3823, 35.1856],
};

/* Facing a country square-on parks it dead centre of the sphere, which in a
   frame cropped to the top 42% means it sits low. Under-tilting rolls the
   planet so the country rides higher - this turns the globe, it does not move
   it, so the composition below is untouched. */
const TILT_LIFT = 34;

export default function HeroGlobe() {
  const country = useOrtacStore((s) => s.country);
  const setCountry = useOrtacStore((s) => s.setCountry);
  const place = PLACES[country];

  const [settled, setSettled] = useState(false);
  const pinRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  /* The stage is flex-sized, so its height is only knowable by measuring it,
     and every other number about the planet is derived from that one in CSS:
     the sphere box is --gs2-k times it, the crown is a fraction of it, the
     label scales with it. Without this the box falls back to the seed value in
     the stylesheet and the globe comes out at 60% of its intended size. */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let last = -1;
    const measure = () => {
      const h = Math.round(stage.getBoundingClientRect().height);
      /* the globe is absolutely positioned and the stage clips, so writing the
         height back cannot change it: no observer feedback loop */
      if (h < 1 || h === last) return;
      last = h;
      stage.style.setProperty("--gs2-h", `${h}px`);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stage);
    return () => ro.disconnect();
  }, []);

  /* position in viewBox units, written straight to the element: the label moves
     every frame while the planet turns, and that is not React's job */
  const pick = useCallback(
    (c: Country) => {
      setCountry(c);
      gtm("hero_globe_country", { country: c });
    },
    [setCountry],
  );

  const onPin = useCallback((x: number, y: number, visible: boolean) => {
    const el = pinRef.current;
    if (!el) return;
    el.style.left = `${x / 10}%`;
    el.style.top = `${y / 10}%`;
    el.style.opacity = visible ? "1" : "0";
  }, []);

  return (
    <div className="glb">
      {/* hovering a flag turns the planet; the click stays for touch, where
          there is no hover to work with */}
      <CountryPicker
        value={country}
        onSelect={pick}
        onHover={(c) => c && pick(c)}
        withLegend
      />

      <div ref={stageRef} className="glb-stage">
        <div className="glb-wrap">
          <SvgGlobe
            lng={place[0]}
            lat={place[1] - TILT_LIFT}
            active={country}
            target={place}
            onSettled={setSettled}
            onPin={onPin}
          />

          {/* the label is HTML, so it sits over the SVG rather than inside it */}
          <div ref={pinRef} className="glb-pin" aria-live="polite">
            <AnimatePresence mode="wait">
              {settled && (
                <motion.div
                  key={country}
                  initial={{ opacity: 0, y: 6, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.96 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="glb-pin-inner"
                >
                  <span className="glb-pin-label">
                    {COUNTRY_NAMES[country]}
                    <span>{FACTS[country].tag}</span>
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <span className="glb-fade" aria-hidden="true" />
      </div>
    </div>
  );
}
