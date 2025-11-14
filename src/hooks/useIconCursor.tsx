// src/hooks/useIconCursor.tsx
import { useEffect } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import type { IconType } from "react-icons";

type Options = {
  size?: number;
  color?: string;
  hotX?: number;
  hotY?: number;
  target?: "body" | string;
};

export function useIconCursor(Icon: IconType, opts: Options = {}) {
  const {
    size = 28,
    color = "#000",
    hotX = 6,
    hotY = 4,
    target = "body",
  } = opts;

  useEffect(() => {
    const svg = renderToStaticMarkup(<Icon size={size} color={color} />);
    const encoded = encodeURIComponent(svg);
    const url = `data:image/svg+xml;utf8,${encoded}`;

    const curBody = `url("${url}") ${hotX} ${hotY}, auto`;
    const curPointer = `url("${url}") ${hotX} ${hotY}, pointer`;

    const style = document.createElement("style");
    style.id = "icon-cursor-style";
    style.textContent = `
      ${target} { cursor: ${curBody} !important; }
      ${target} button,
      ${target} a,
      ${target} [role="button"],
      ${target} label,
      ${target} input[type="checkbox"],
      ${target} .clickable { cursor: ${curPointer} !important; }

      ${target} input[type="text"],
      ${target} input[type="email"],
      ${target} input[type="password"],
      ${target} textarea { cursor: text !important; }
    `;
    document.head.appendChild(style);

    return () => {
      const prev = document.getElementById("icon-cursor-style");
      if (prev && prev.parentNode) prev.parentNode.removeChild(prev);
    };
  }, [Icon, size, color, hotX, hotY, target]);
}
