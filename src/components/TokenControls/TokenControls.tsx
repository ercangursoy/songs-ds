import { useState, useCallback } from "react";
import { TOKEN_GROUPS, THEME_PRESETS, type TokenDef } from "@/data/tokenDefs";
import styles from "./TokenControls.module.css";

function FigmaIcon({ size = 10 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 38 57"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z"
        fill="#1ABCFE"
      />
      <path
        d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z"
        fill="#0ACF83"
      />
      <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262" />
      <path
        d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z"
        fill="#F24E1E"
      />
      <path
        d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z"
        fill="#A259FF"
      />
    </svg>
  );
}

function FigmaBadge() {
  return (
    <span className={styles.figmaBadge} title="Extracted from Figma">
      <FigmaIcon />
    </span>
  );
}

function formatValue(token: TokenDef, raw: string): string {
  if (
    token.type === "color" ||
    token.type === "text" ||
    token.type === "shadow" ||
    token.type === "select"
  )
    return raw;
  return token.unit ? `${raw}${token.unit}` : raw;
}

function getInlineValue(token: TokenDef): string {
  const inline = document.documentElement.style
    .getPropertyValue(token.name)
    .trim();
  if (!inline) return token.defaultValue;
  if (token.type === "range" && token.unit) {
    return inline.replace(token.unit, "");
  }
  return inline;
}

function getInlineShadow(token: TokenDef) {
  const d = token.shadowDefaults!;
  const inline = document.documentElement.style
    .getPropertyValue(token.name)
    .trim();
  if (!inline) return d;
  const m = inline.match(
    /([-\d.]+)px\s+([-\d.]+)px\s+([-\d.]+)px\s+([-\d.]+)px\s+rgba\(\s*[\d]+,\s*[\d]+,\s*[\d]+,\s*([\d.]+)\)/,
  );
  if (!m) return d;
  return {
    x: parseFloat(m[1]),
    y: parseFloat(m[2]),
    blur: parseFloat(m[3]),
    spread: parseFloat(m[4]),
    opacity: parseFloat(m[5]),
  };
}

function ColorControl({ token }: { token: TokenDef }) {
  const [value, setValue] = useState(() => getInlineValue(token));
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      setValue(v);
      document.documentElement.style.setProperty(token.name, v);
    },
    [token.name],
  );
  return (
    <div className={styles.tokenRow}>
      <label className={styles.tokenLabel}>
        <span>{token.label}</span>
        {token.fromFigma && <FigmaBadge />}
      </label>
      <div className={styles.colorControl}>
        <input
          type="color"
          value={value}
          onChange={handleChange}
          className={styles.colorInput}
        />
        <span className={styles.tokenValue}>{value}</span>
      </div>
    </div>
  );
}

function RangeControl({ token }: { token: TokenDef }) {
  const [value, setValue] = useState(() => getInlineValue(token));
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      setValue(v);
      document.documentElement.style.setProperty(
        token.name,
        formatValue(token, v),
      );
    },
    [token],
  );
  return (
    <div className={styles.tokenRow}>
      <label className={styles.tokenLabel}>
        <span>{token.label}</span>
        {token.fromFigma && <FigmaBadge />}
      </label>
      <div className={styles.rangeControl}>
        <input
          type="range"
          min={token.min}
          max={token.max}
          step={token.step}
          value={value}
          onChange={handleChange}
          className={styles.rangeInput}
        />
        <span className={styles.tokenValue}>{formatValue(token, value)}</span>
      </div>
    </div>
  );
}

function SelectControl({ token }: { token: TokenDef }) {
  const [value, setValue] = useState(() => getInlineValue(token));
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const v = e.target.value;
      setValue(v);
      document.documentElement.style.setProperty(token.name, v);
    },
    [token.name],
  );
  return (
    <div className={styles.tokenRow}>
      <label className={styles.tokenLabel}>
        <span>{token.label}</span>
        {token.fromFigma && <FigmaBadge />}
      </label>
      <select
        value={value}
        onChange={handleChange}
        className={styles.selectInput}
      >
        {token.options!.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function ShadowControl({ token }: { token: TokenDef }) {
  const d = getInlineShadow(token);
  const [x, setX] = useState(d.x);
  const [y, setY] = useState(d.y);
  const [blur, setBlur] = useState(d.blur);
  const [spread, setSpread] = useState(d.spread);
  const [opacity, setOpacity] = useState(d.opacity);

  const apply = useCallback(
    (nx: number, ny: number, nb: number, ns: number, no: number) => {
      document.documentElement.style.setProperty(
        token.name,
        `${nx}px ${ny}px ${nb}px ${ns}px rgba(0, 0, 0, ${no})`,
      );
    },
    [token.name],
  );

  const makeHandler = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    field: "x" | "y" | "blur" | "spread" | "opacity",
  ) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = parseFloat(e.target.value);
      setter(v);
      const vals = { x, y, blur, spread, opacity, [field]: v };
      apply(vals.x, vals.y, vals.blur, vals.spread, vals.opacity);
    };
  };

  return (
    <div className={styles.shadowGroup}>
      <div className={styles.shadowTitle}>
        {token.label}
        {token.fromFigma && <FigmaBadge />}
      </div>
      <div className={styles.shadowPreview}>
        <div
          className={styles.shadowBox}
          style={{
            boxShadow: `${x}px ${y}px ${blur}px ${spread}px rgba(0,0,0,${opacity})`,
          }}
        />
      </div>
      {[
        ["X", -20, 20, 1, x, setX, "x"] as const,
        ["Y", -20, 20, 1, y, setY, "y"] as const,
        ["Blur", 0, 40, 1, blur, setBlur, "blur"] as const,
        ["Spread", -10, 20, 1, spread, setSpread, "spread"] as const,
        ["Opacity", 0, 1, 0.05, opacity, setOpacity, "opacity"] as const,
      ].map(([label, min, max, step, val, setter, field]) => (
        <div key={field} className={styles.shadowSlider}>
          <span className={styles.shadowLabel}>{label}</span>
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={val}
            onChange={makeHandler(setter, field)}
            className={styles.rangeInput}
          />
          <span className={styles.tokenValue}>
            {field === "opacity" ? val.toFixed(2) : `${val}px`}
          </span>
        </div>
      ))}
    </div>
  );
}

function TextControl({ token }: { token: TokenDef }) {
  const [value, setValue] = useState(() => getInlineValue(token));
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      setValue(v);
      document.documentElement.style.setProperty(token.name, v);
    },
    [token.name],
  );
  return (
    <div className={styles.tokenRow}>
      <label className={styles.tokenLabel}>
        <span>{token.label}</span>
        {token.fromFigma && <FigmaBadge />}
      </label>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className={styles.textInput}
      />
    </div>
  );
}

export interface TokenControlsProps {
  activePreset: string;
  onActivePresetChange: (name: string) => void;
  onReset?: () => void;
}

export function TokenControls({
  activePreset,
  onActivePresetChange,
  onReset,
}: TokenControlsProps) {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    TOKEN_GROUPS.forEach((g) => {
      initial[g.label] = g.defaultOpen ?? false;
    });
    return initial;
  });

  const toggleGroup = useCallback((label: string) => {
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));
  }, []);

  const handleResetAll = useCallback(() => {
    TOKEN_GROUPS.forEach((group) =>
      group.tokens.forEach((token) =>
        document.documentElement.style.removeProperty(token.name),
      ),
    );
    onActivePresetChange("Default");
    onReset?.();
  }, [onReset, onActivePresetChange]);

  const applyPreset = useCallback(
    (name: string, overrides: Record<string, string>) => {
      TOKEN_GROUPS.forEach((group) =>
        group.tokens.forEach((token) =>
          document.documentElement.style.removeProperty(token.name),
        ),
      );
      Object.entries(overrides).forEach(([prop, value]) => {
        document.documentElement.style.setProperty(prop, value);
      });
      onActivePresetChange(name);
      onReset?.();
    },
    [onReset, onActivePresetChange],
  );

  return (
    <div className={styles.controls}>
      <div className={styles.header}>
        <h2 className={styles.title}>Token Playground</h2>
        <button
          type="button"
          className={styles.resetButton}
          onClick={handleResetAll}
        >
          Reset All
        </button>
      </div>

      <div className={styles.legend}>
        <FigmaIcon /> From Figma
      </div>

      <div className={styles.groups}>
        <div className={styles.presetsSection}>
          <div className={styles.presetsTitle}>Theme Presets</div>
          <div className={styles.presetButtons}>
            {THEME_PRESETS.map((preset) => (
              <button
                key={preset.name}
                type="button"
                className={styles.presetButton}
                data-active={activePreset === preset.name || undefined}
                onClick={() => applyPreset(preset.name, preset.overrides)}
                title={preset.description}
              >
                {preset.name === "Default" ? (
                  <span className={styles.presetSwatchDefault} />
                ) : (
                  <span
                    className={styles.presetSwatch}
                    style={{ background: preset.overrides["--color-blue-900"] }}
                  />
                )}
                <span className={styles.presetName}>{preset.name}</span>
              </button>
            ))}
          </div>
        </div>

        {TOKEN_GROUPS.map((group) => (
          <div key={group.label} className={styles.group}>
            <button
              type="button"
              className={styles.groupHeader}
              onClick={() => toggleGroup(group.label)}
              aria-expanded={openGroups[group.label]}
            >
              <span
                className={styles.chevron}
                data-open={openGroups[group.label] || undefined}
              />
              <span className={styles.groupLabel}>{group.label}</span>
              {group.tokens.some((t) => t.fromFigma) && (
                <span className={styles.figmaCount}>
                  <FigmaIcon size={8} />
                  {group.tokens.filter((t) => t.fromFigma).length}
                </span>
              )}
              <span className={styles.groupCount}>{group.tokens.length}</span>
            </button>
            {openGroups[group.label] && (
              <div className={styles.groupBody}>
                {group.tokens.map((token) => {
                  switch (token.type) {
                    case "color":
                      return <ColorControl key={token.name} token={token} />;
                    case "range":
                      return <RangeControl key={token.name} token={token} />;
                    case "shadow":
                      return <ShadowControl key={token.name} token={token} />;
                    case "select":
                      return <SelectControl key={token.name} token={token} />;
                    case "text":
                      return <TextControl key={token.name} token={token} />;
                  }
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
