"use client";

import Link from "next/link";

type Props = {
  size?: "lg" | "sm";
  variant?: "blue" | "inverse";
  href?: string;
  onClick?: () => void;
  full?: boolean;
  children: React.ReactNode;
};

/** Primary CTA. There is one button shape on the site — the pill introduced in
 *  the hero — so this component only picks the surface it sits on:
 *  `inverse` → white pill (dark backgrounds), `blue` → brand pill (light ones). */
export default function SweepButton({
  size = "lg",
  variant = "blue",
  href,
  onClick,
  full = false,
  children,
}: Props) {
  const cls = [
    "btn",
    variant === "inverse" ? "btn-primary" : "btn-solid",
    size === "sm" ? "btn-sm" : "",
    full ? "btn-full" : "",
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={cls}>
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
