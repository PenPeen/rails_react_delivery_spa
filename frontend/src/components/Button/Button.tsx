import React from "react";
import styles from "./button.module.css";

interface ButtonProps {
  primary?: boolean;
  backgroundColor?: string;
  size?: "small" | "medium" | "large";
  label: string;
  isRadius?: boolean;
  handleClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  primary = false,
  size = "medium",
  backgroundColor,
  label,
  isRadius,
  handleClick,
  ...props
}: ButtonProps) => {
  const mode = primary ? styles.a_button__primary : styles.a_button__secondary;
  const radius = isRadius && styles.a_button__radius;

  return (
    <button
      type='button'
      className={[
        styles.a_button,
        styles[`a_button__${size}`],
        mode,
        radius,
      ].join(" ")}
      style={{ backgroundColor }}
      {...props}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};
