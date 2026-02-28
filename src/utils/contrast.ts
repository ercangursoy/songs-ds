export interface ContrastPair {
  label: string;
  fg: string;
  bg: string;
  largeText?: boolean;
}

export const CONTRAST_PAIRS: ContrastPair[] = [
  {
    label: "Primary / Surface",
    fg: "--color-text-primary",
    bg: "--color-bg-surface",
  },
  {
    label: "Secondary / Surface",
    fg: "--color-text-secondary",
    bg: "--color-bg-surface",
  },
  {
    label: "Placeholder / Surface",
    fg: "--color-text-placeholder",
    bg: "--color-bg-surface",
  },
  {
    label: "Primary / Page",
    fg: "--color-text-primary",
    bg: "--color-bg-page",
  },
  {
    label: "Interactive / Surface",
    fg: "--color-interactive",
    bg: "--color-bg-surface",
  },
  {
    label: "Label / Interactive",
    fg: "--color-interactive-text",
    bg: "--color-interactive",
  },
];

function linearize(channel: number): number {
  const c = channel / 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function luminance(r: number, g: number, b: number): number {
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

function parseRGB(color: string): [number, number, number] | null {
  const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) return null;
  return [
    parseInt(match[1], 10),
    parseInt(match[2], 10),
    parseInt(match[3], 10),
  ];
}

export type WCAGLevel = "AAA" | "AA" | "Fail";

export interface ContrastResult {
  label: string;
  ratio: number;
  level: WCAGLevel;
  fgResolved: string;
  bgResolved: string;
}

/**
 * Resolve a CSS variable to its computed RGB value using a transient probe element.
 */
function resolveColor(varName: string): string {
  const probe = document.createElement("div");
  probe.style.position = "absolute";
  probe.style.width = "0";
  probe.style.height = "0";
  probe.style.overflow = "hidden";
  probe.style.backgroundColor = `var(${varName})`;
  document.body.appendChild(probe);
  const resolved = getComputedStyle(probe).backgroundColor;
  probe.remove();
  return resolved;
}

function getLevel(ratio: number, largeText: boolean): WCAGLevel {
  if (largeText) {
    if (ratio >= 4.5) return "AAA";
    if (ratio >= 3) return "AA";
    return "Fail";
  }
  if (ratio >= 7) return "AAA";
  if (ratio >= 4.5) return "AA";
  return "Fail";
}

export function computeContrast(pairs: ContrastPair[]): ContrastResult[] {
  return pairs.map((pair) => {
    const fgResolved = resolveColor(pair.fg);
    const bgResolved = resolveColor(pair.bg);
    const fgRGB = parseRGB(fgResolved);
    const bgRGB = parseRGB(bgResolved);

    if (!fgRGB || !bgRGB) {
      return {
        label: pair.label,
        ratio: 0,
        level: "Fail" as const,
        fgResolved,
        bgResolved,
      };
    }

    const l1 = luminance(...fgRGB);
    const l2 = luminance(...bgRGB);
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    const level = getLevel(ratio, pair.largeText ?? false);

    return { label: pair.label, ratio, level, fgResolved, bgResolved };
  });
}
