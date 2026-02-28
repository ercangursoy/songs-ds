export interface ShadowDefaults {
  x: number;
  y: number;
  blur: number;
  spread: number;
  opacity: number;
}

export interface SelectOption {
  label: string;
  value: string;
}

export interface TokenDef {
  name: string;
  label: string;
  defaultValue: string;
  type: "color" | "range" | "text" | "shadow" | "select";
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  shadowDefaults?: ShadowDefaults;
  options?: SelectOption[];
  fromFigma?: boolean;
}

export interface TokenGroup {
  label: string;
  defaultOpen?: boolean;
  tokens: TokenDef[];
}

export interface SemanticTokenDef {
  name: string;
  label: string;
  mapsTo: string;
}

export interface SemanticGroup {
  label: string;
  tokens: SemanticTokenDef[];
}

export interface ThemePreset {
  name: string;
  description: string;
  overrides: Record<string, string>;
}

const FONT_OPTIONS: SelectOption[] = [
  { label: "Roboto", value: '"Roboto", sans-serif' },
  { label: "System UI", value: "system-ui, sans-serif" },
  { label: "Arial", value: "Arial, Helvetica, sans-serif" },
  { label: "Georgia", value: "Georgia, serif" },
  { label: "Verdana", value: "Verdana, sans-serif" },
  { label: "Tahoma", value: "Tahoma, sans-serif" },
  { label: "Trebuchet MS", value: '"Trebuchet MS", sans-serif' },
  { label: "Times New Roman", value: '"Times New Roman", serif' },
  { label: "Courier New", value: '"Courier New", monospace' },
];

const EASING_OPTIONS: SelectOption[] = [
  { label: "Decelerate", value: "cubic-bezier(0.16, 1, 0.3, 1)" },
  { label: "Ease In-Out", value: "cubic-bezier(0.45, 0, 0.55, 1)" },
  { label: "Linear", value: "linear" },
  { label: "Ease", value: "ease" },
  { label: "Ease In", value: "ease-in" },
  { label: "Ease Out", value: "ease-out" },
  { label: "Bounce", value: "cubic-bezier(0.34, 1.56, 0.64, 1)" },
  { label: "Snap", value: "cubic-bezier(0, 1, 0, 1)" },
];

export const TOKEN_GROUPS: TokenGroup[] = [
  {
    label: "Colors",
    defaultOpen: true,
    tokens: [
      {
        name: "--color-white",
        label: "White",
        defaultValue: "#ffffff",
        type: "color",
        fromFigma: true,
      },
      {
        name: "--color-gray-100",
        label: "Gray 100",
        defaultValue: "#f5f5f5",
        type: "color",
        fromFigma: true,
      },
      {
        name: "--color-gray-300",
        label: "Gray 300",
        defaultValue: "#e0e0e0",
        type: "color",
        fromFigma: true,
      },
      {
        name: "--color-gray-400",
        label: "Gray 400",
        defaultValue: "#bdbdbd",
        type: "color",
        fromFigma: true,
      },
      {
        name: "--color-gray-600",
        label: "Gray 600",
        defaultValue: "#757575",
        type: "color",
        fromFigma: true,
      },
      {
        name: "--color-gray-700",
        label: "Gray 700",
        defaultValue: "#616161",
        type: "color",
        fromFigma: true,
      },
      {
        name: "--color-gray-900",
        label: "Gray 900",
        defaultValue: "#212121",
        type: "color",
        fromFigma: true,
      },
      {
        name: "--color-blue-900",
        label: "Blue 900",
        defaultValue: "#006088",
        type: "color",
        fromFigma: true,
      },
      {
        name: "--color-red-500",
        label: "Red 500",
        defaultValue: "#db374c",
        type: "color",
        fromFigma: true,
      },
    ],
  },
  {
    label: "Typography",
    tokens: [
      {
        name: "--font-family",
        label: "Primary Font",
        defaultValue: '"Roboto", sans-serif',
        type: "select",
        options: FONT_OPTIONS,
        fromFigma: true,
      },
      {
        name: "--font-family-condensed",
        label: "Condensed Font",
        defaultValue: '"Roboto Condensed", "Roboto", sans-serif',
        type: "select",
        options: FONT_OPTIONS,
        fromFigma: true,
      },
      {
        name: "--font-size-xs",
        label: "Font XS",
        defaultValue: "0.75",
        type: "range",
        min: 0.5,
        max: 2,
        step: 0.0625,
        unit: "rem",
        fromFigma: true,
      },
      {
        name: "--font-size-sm",
        label: "Font SM",
        defaultValue: "0.875",
        type: "range",
        min: 0.5,
        max: 2,
        step: 0.0625,
        unit: "rem",
        fromFigma: true,
      },
      {
        name: "--font-size-base",
        label: "Font Base",
        defaultValue: "1",
        type: "range",
        min: 0.5,
        max: 2,
        step: 0.0625,
        unit: "rem",
        fromFigma: true,
      },
      {
        name: "--font-size-lg",
        label: "Font LG",
        defaultValue: "1.5",
        type: "range",
        min: 0.5,
        max: 3,
        step: 0.0625,
        unit: "rem",
        fromFigma: true,
      },
      {
        name: "--font-weight-regular",
        label: "Weight Regular",
        defaultValue: "400",
        type: "range",
        min: 100,
        max: 900,
        step: 100,
        unit: "",
        fromFigma: true,
      },
      {
        name: "--font-weight-medium",
        label: "Weight Medium",
        defaultValue: "500",
        type: "range",
        min: 100,
        max: 900,
        step: 100,
        unit: "",
        fromFigma: true,
      },
      {
        name: "--font-weight-semibold",
        label: "Weight Semibold",
        defaultValue: "600",
        type: "range",
        min: 100,
        max: 900,
        step: 100,
        unit: "",
        fromFigma: true,
      },
      {
        name: "--line-height-xs",
        label: "LH XS",
        defaultValue: "1",
        type: "range",
        min: 0.75,
        max: 3,
        step: 0.125,
        unit: "rem",
        fromFigma: true,
      },
      {
        name: "--line-height-sm",
        label: "LH SM",
        defaultValue: "1.25",
        type: "range",
        min: 0.75,
        max: 3,
        step: 0.125,
        unit: "rem",
        fromFigma: true,
      },
      {
        name: "--line-height-base",
        label: "LH Base",
        defaultValue: "1.25",
        type: "range",
        min: 0.75,
        max: 3,
        step: 0.125,
        unit: "rem",
        fromFigma: true,
      },
      {
        name: "--line-height-lg",
        label: "LH LG",
        defaultValue: "2",
        type: "range",
        min: 0.75,
        max: 3,
        step: 0.125,
        unit: "rem",
        fromFigma: true,
      },
      {
        name: "--line-height-row",
        label: "LH Row",
        defaultValue: "2.5",
        type: "range",
        min: 0.75,
        max: 4,
        step: 0.125,
        unit: "rem",
        fromFigma: true,
      },
    ],
  },
  {
    label: "Spacing",
    tokens: [
      {
        name: "--space-0",
        label: "0",
        defaultValue: "0",
        type: "range",
        min: 0,
        max: 4,
        step: 0.125,
        unit: "rem",
        fromFigma: true,
      },
      {
        name: "--space-1",
        label: "1",
        defaultValue: "0.25",
        type: "range",
        min: 0,
        max: 4,
        step: 0.125,
        unit: "rem",
        fromFigma: true,
      },
      {
        name: "--space-2",
        label: "2",
        defaultValue: "0.5",
        type: "range",
        min: 0,
        max: 4,
        step: 0.125,
        unit: "rem",
        fromFigma: true,
      },
      {
        name: "--space-3",
        label: "3",
        defaultValue: "0.75",
        type: "range",
        min: 0,
        max: 4,
        step: 0.125,
        unit: "rem",
        fromFigma: true,
      },
      {
        name: "--space-4",
        label: "4",
        defaultValue: "1",
        type: "range",
        min: 0,
        max: 4,
        step: 0.125,
        unit: "rem",
        fromFigma: true,
      },
      {
        name: "--space-5",
        label: "5",
        defaultValue: "1.25",
        type: "range",
        min: 0,
        max: 4,
        step: 0.125,
        unit: "rem",
        fromFigma: true,
      },
      {
        name: "--space-6",
        label: "6",
        defaultValue: "1.5",
        type: "range",
        min: 0,
        max: 4,
        step: 0.125,
        unit: "rem",
        fromFigma: true,
      },
      {
        name: "--space-8",
        label: "8",
        defaultValue: "2",
        type: "range",
        min: 0,
        max: 4,
        step: 0.125,
        unit: "rem",
        fromFigma: true,
      },
      {
        name: "--space-10",
        label: "10",
        defaultValue: "2.5",
        type: "range",
        min: 0,
        max: 4,
        step: 0.125,
        unit: "rem",
        fromFigma: true,
      },
    ],
  },
  {
    label: "Radii",
    tokens: [
      {
        name: "--radius-sm",
        label: "Small",
        defaultValue: "0.25",
        type: "range",
        min: 0,
        max: 2,
        step: 0.125,
        unit: "rem",
        fromFigma: true,
      },
      {
        name: "--radius-md",
        label: "Medium",
        defaultValue: "0.75",
        type: "range",
        min: 0,
        max: 2,
        step: 0.125,
        unit: "rem",
        fromFigma: true,
      },
      {
        name: "--radius-full",
        label: "Full",
        defaultValue: "1.25",
        type: "range",
        min: 0,
        max: 2,
        step: 0.125,
        unit: "rem",
        fromFigma: true,
      },
    ],
  },
  {
    label: "Component Sizes",
    tokens: [
      {
        name: "--input-height",
        label: "Input Height",
        defaultValue: "2.5",
        type: "range",
        min: 1.5,
        max: 4,
        step: 0.125,
        unit: "rem",
        fromFigma: true,
      },
      {
        name: "--row-height",
        label: "Row Height",
        defaultValue: "2.5",
        type: "range",
        min: 1.5,
        max: 4,
        step: 0.125,
        unit: "rem",
        fromFigma: true,
      },
      {
        name: "--checkbox-size",
        label: "Checkbox",
        defaultValue: "1",
        type: "range",
        min: 0.5,
        max: 2,
        step: 0.125,
        unit: "rem",
        fromFigma: true,
      },
      {
        name: "--icon-size-sm",
        label: "Icon SM",
        defaultValue: "1",
        type: "range",
        min: 0.5,
        max: 2,
        step: 0.125,
        unit: "rem",
        fromFigma: true,
      },
      {
        name: "--icon-size-md",
        label: "Icon MD",
        defaultValue: "1.25",
        type: "range",
        min: 0.5,
        max: 2.5,
        step: 0.125,
        unit: "rem",
        fromFigma: true,
      },
      {
        name: "--icon-size-lg",
        label: "Icon LG",
        defaultValue: "1.5",
        type: "range",
        min: 0.5,
        max: 3,
        step: 0.125,
        unit: "rem",
        fromFigma: true,
      },
    ],
  },
  {
    label: "Motion",
    tokens: [
      {
        name: "--duration-fast",
        label: "Fast",
        defaultValue: "0.1",
        type: "range",
        min: 0,
        max: 1,
        step: 0.05,
        unit: "s",
      },
      {
        name: "--duration-base",
        label: "Base",
        defaultValue: "0.15",
        type: "range",
        min: 0,
        max: 1,
        step: 0.05,
        unit: "s",
      },
      {
        name: "--duration-slow",
        label: "Slow",
        defaultValue: "0.2",
        type: "range",
        min: 0,
        max: 1,
        step: 0.05,
        unit: "s",
      },
      {
        name: "--ease-out",
        label: "Ease Out",
        defaultValue: "cubic-bezier(0.16, 1, 0.3, 1)",
        type: "select",
        options: EASING_OPTIONS,
      },
      {
        name: "--ease-in-out",
        label: "Ease In-Out",
        defaultValue: "cubic-bezier(0.45, 0, 0.55, 1)",
        type: "select",
        options: EASING_OPTIONS,
      },
    ],
  },
  {
    label: "Shadows",
    tokens: [
      {
        name: "--shadow-dropdown",
        label: "Dropdown",
        defaultValue: "0px 0px 16px 0px rgba(0, 0, 0, 0.2)",
        type: "shadow",
        shadowDefaults: { x: 0, y: 0, blur: 16, spread: 0, opacity: 0.2 },
        fromFigma: true,
      },
      {
        name: "--shadow-floating",
        label: "Floating",
        defaultValue: "0px 2px 8px 0px rgba(0, 0, 0, 0.2)",
        type: "shadow",
        shadowDefaults: { x: 0, y: 2, blur: 8, spread: 0, opacity: 0.2 },
        fromFigma: true,
      },
    ],
  },
  {
    label: "Z-Index",
    tokens: [
      {
        name: "--z-dropdown",
        label: "Dropdown",
        defaultValue: "10",
        type: "range",
        min: 0,
        max: 1000,
        step: 10,
        unit: "",
      },
      {
        name: "--z-floating",
        label: "Floating",
        defaultValue: "100",
        type: "range",
        min: 0,
        max: 1000,
        step: 10,
        unit: "",
      },
      {
        name: "--z-modal",
        label: "Modal",
        defaultValue: "200",
        type: "range",
        min: 0,
        max: 1000,
        step: 10,
        unit: "",
      },
    ],
  },
  {
    label: "Other",
    tokens: [
      {
        name: "--opacity-hover",
        label: "Hover Opacity",
        defaultValue: "0.9",
        type: "range",
        min: 0,
        max: 1,
        step: 0.05,
        unit: "",
      },
      {
        name: "--border-width",
        label: "Border Width",
        defaultValue: "1",
        type: "range",
        min: 0,
        max: 4,
        step: 0.5,
        unit: "px",
        fromFigma: true,
      },
    ],
  },
];

export const SEMANTIC_GROUPS: SemanticGroup[] = [
  {
    label: "Backgrounds",
    tokens: [
      { name: "--color-bg-page", label: "Page", mapsTo: "--color-gray-100" },
      { name: "--color-bg-surface", label: "Surface", mapsTo: "--color-white" },
      { name: "--color-bg-hover", label: "Hover", mapsTo: "--color-gray-100" },
    ],
  },
  {
    label: "Text",
    tokens: [
      {
        name: "--color-text-primary",
        label: "Primary",
        mapsTo: "--color-gray-900",
      },
      {
        name: "--color-text-secondary",
        label: "Secondary",
        mapsTo: "--color-gray-600",
      },
      {
        name: "--color-text-placeholder",
        label: "Placeholder",
        mapsTo: "--color-gray-600",
      },
      {
        name: "--color-text-disabled",
        label: "Disabled",
        mapsTo: "--color-gray-400",
      },
    ],
  },
  {
    label: "Borders",
    tokens: [
      {
        name: "--color-border-default",
        label: "Default",
        mapsTo: "--color-gray-300",
      },
      {
        name: "--color-border-strong",
        label: "Strong",
        mapsTo: "--color-gray-900",
      },
      {
        name: "--color-border-input",
        label: "Input",
        mapsTo: "--color-gray-600",
      },
    ],
  },
  {
    label: "Interactive",
    tokens: [
      {
        name: "--color-interactive",
        label: "Interactive",
        mapsTo: "--color-blue-900",
      },
      {
        name: "--color-interactive-text",
        label: "Interactive Text",
        mapsTo: "--color-white",
      },
    ],
  },
];

export const THEME_PRESETS: ThemePreset[] = [
  {
    name: "Default",
    description: "Figma spec",
    overrides: {},
  },
  {
    name: "Ocean",
    description: "Deep blue palette",
    overrides: {
      "--color-white": "#f0f4f8",
      "--color-gray-100": "#e2e8f0",
      "--color-gray-300": "#cbd5e1",
      "--color-gray-400": "#94a3b8",
      "--color-gray-600": "#475569",
      "--color-gray-700": "#334155",
      "--color-gray-900": "#0f172a",
      "--color-blue-900": "#1e40af",
      "--color-red-500": "#ef4444",
    },
  },
  {
    name: "Warm",
    description: "Earthy tones",
    overrides: {
      "--color-white": "#faf8f5",
      "--color-gray-100": "#f5f0eb",
      "--color-gray-300": "#e0d5c7",
      "--color-gray-400": "#b8a896",
      "--color-gray-600": "#78716c",
      "--color-gray-700": "#57534e",
      "--color-gray-900": "#292524",
      "--color-blue-900": "#b45309",
      "--color-red-500": "#dc2626",
    },
  },
  {
    name: "Forest",
    description: "Natural greens",
    overrides: {
      "--color-white": "#f0fdf4",
      "--color-gray-100": "#ecfccb",
      "--color-gray-300": "#bef264",
      "--color-gray-400": "#84cc16",
      "--color-gray-600": "#4d7c0f",
      "--color-gray-700": "#3f6212",
      "--color-gray-900": "#1a2e05",
      "--color-blue-900": "#15803d",
      "--color-red-500": "#ea580c",
    },
  },
  {
    name: "Mono",
    description: "Pure grayscale",
    overrides: {
      "--color-white": "#ffffff",
      "--color-gray-100": "#f5f5f5",
      "--color-gray-300": "#d4d4d4",
      "--color-gray-400": "#a3a3a3",
      "--color-gray-600": "#525252",
      "--color-gray-700": "#404040",
      "--color-gray-900": "#171717",
      "--color-blue-900": "#404040",
      "--color-red-500": "#737373",
    },
  },
];
