import { CheckIcon } from "@/icons";
import styles from "./Checkbox.module.css";

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  ariaLabel?: string;
}

export function Checkbox({ checked, onChange, ariaLabel }: CheckboxProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={ariaLabel}
      className={styles.checkbox}
      data-checked={checked || undefined}
      onClick={() => onChange(!checked)}
    >
      {checked && (
        <span className={styles.checkmark}>
          <CheckIcon size={10} />
        </span>
      )}
    </button>
  );
}
