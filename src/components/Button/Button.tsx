import type { ReactNode, ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary";
  children: ReactNode;
}

export function Button({ variant, children, className, ...rest }: ButtonProps) {
  const classes = [styles.button, styles[variant], className]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} type="button" {...rest}>
      {children}
    </button>
  );
}
