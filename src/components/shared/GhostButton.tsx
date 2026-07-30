"use client";

import Link from "next/link";

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
      <Link href={href} target={target} onClick={onClick} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
