import React from "react";
import styles from "./button.module.css";

type ButtonType = "primary" | "success" | "warning" | "danger" | "neutral";

interface ButtonProps {
  type?: ButtonType;
  size?: "small" | "medium" | "large";
  label: string;
  isRadius?: boolean;
  isSolid?: boolean;
  isDisabled?: boolean;
  handleClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  type = "primary",
  size = "medium",
  label,
  isRadius = false,
  isSolid = false,
  isDisabled = false,
  handleClick,
}: ButtonProps) => {
  const mode = styles[`a_button__${type}`];
  const solid = isSolid && styles[`a_button__${type}_solid`];
  const radius = isRadius && styles.a_button__radius;

  return (
    <button
      type='button'
      disabled={isDisabled}
      className={[
        styles.a_button,
        styles[`a_button__${size}`],
        mode,
        solid,
        radius,
      ].join(" ")}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};
