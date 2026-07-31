"use client";

import SmartLink from "@/components/shared/SmartLink";

type Props = {
  size?: "lg" | "sm";
  /** sits on a night surface */
  deep?: boolean;
  href?: string;
  target?: string;
  onClick?: () => void;
  full?: boolean;
  children: React.ReactNode;
};

/** Secondary CTA — the same pill as the primary, hairline instead of fill. */
export default function GhostButton({
  size = "lg",
  deep = false,
  href,
  target,
  onClick,
  full = false,
  children,
}: Props) {
  const cls = [
    "btn",
    deep ? "btn-ghost" : "btn-line",
    size === "sm" ? "btn-sm" : "",
    full ? "btn-full" : "",
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <SmartLink href={href} target={target} onClick={onClick} className={cls}>
        {children}
      </SmartLink>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
