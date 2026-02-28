import { useState, useEffect } from "react";
import { SEMANTIC_GROUPS } from "@/data/tokenDefs";
import {
  CONTRAST_PAIRS,
  computeContrast,
  type ContrastResult,
} from "@/utils/contrast";
import styles from "./InspectorPanel.module.css";

type ComplianceMode = "AA" | "AAA";

function ContrastChecker() {
  const [results, setResults] = useState<ContrastResult[]>([]);
  const [mode, setMode] = useState<ComplianceMode>("AA");

  useEffect(() => {
    function check() {
      setResults(computeContrast(CONTRAST_PAIRS));
    }

    check();
    const timer = setInterval(check, 300);
    return () => clearInterval(timer);
  }, []);

  const passing = results.filter((r) =>
    mode === "AAA" ? r.level === "AAA" : r.level !== "Fail",
  ).length;

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>Contrast Checker</h3>
        <div
          className={styles.modeToggle}
          role="radiogroup"
          aria-label="WCAG compliance level"
        >
          {(["AA", "AAA"] as const).map((level) => (
            <button
              key={level}
              type="button"
              role="radio"
              aria-checked={mode === level}
              className={styles.modeButton}
              data-active={mode === level || undefined}
              onClick={() => setMode(level)}
            >
              {level}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.summary}>
        <span className={styles.summaryCount}>
          {passing}/{results.length}
        </span>{" "}
        pairs pass WCAG {mode}
      </div>
      <div className={styles.rows}>
        {results.map((r) => {
          const passes =
            mode === "AAA" ? r.level === "AAA" : r.level !== "Fail";
          return (
            <div
              key={r.label}
              className={styles.contrastRow}
              data-failing={!passes || undefined}
            >
              <span
                className={styles.preview}
                style={{ background: r.bgResolved, color: r.fgResolved }}
              >
                Aa
              </span>
              <div className={styles.info}>
                <span className={styles.label}>{r.label}</span>
                <span className={styles.ratio}>{r.ratio.toFixed(1)}:1</span>
              </div>
              <span className={styles.badge} data-level={r.level}>
                {r.level}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function SemanticTokens() {
  return (
    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>Semantic Tokens</h3>
      <div className={styles.semanticGroups}>
        {SEMANTIC_GROUPS.map((group) => (
          <div key={group.label} className={styles.semanticGroup}>
            <div className={styles.semanticGroupTitle}>{group.label}</div>
            {group.tokens.map((token) => (
              <div key={token.name} className={styles.semanticRow}>
                <span className={styles.semanticName}>{token.label}</span>
                <span className={styles.semanticArrow}>&rarr;</span>
                <span
                  className={styles.semanticSwatch}
                  style={{ background: `var(${token.mapsTo})` }}
                />
                <span className={styles.semanticMaps}>{token.mapsTo}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export function InspectorPanel() {
  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h2 className={styles.title}>Inspector</h2>
      </div>
      <div className={styles.body}>
        <ContrastChecker />
        <SemanticTokens />
      </div>
    </div>
  );
}
