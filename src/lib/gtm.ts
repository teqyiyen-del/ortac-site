type GtmPayload = Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/** All dataLayer pushes go through here — never inline (spec, GTM contracts). */
export function gtm(event: string, payload: GtmPayload = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer?.push({ event, ...payload });
}
