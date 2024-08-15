import React from "react";
import styles from "./count_down_button.module.css";

interface ButtonProps {
  size?: "small" | "medium" | "large";
  isRadius?: boolean;
  isDisabled?: boolean;
  handleClick?: () => void;
}

export const CountDownButton: React.FC<ButtonProps> = ({
  size = "medium",
  isRadius = true,
  isDisabled = false,
  handleClick,
}: ButtonProps) => {
  const radius = isRadius && styles.a_count_down_button__radius;
  const disabled = isDisabled && styles.a_count_down_button__disabled;

  return (
    <button
      type='button'
      className={[
        styles.a_count_down_button,
        styles[`a_count_down_button__${size}`],
        radius,
        disabled,
      ].join(" ")}
      onClick={handleClick}
      disabled={isDisabled}
    >
      -
    </button>
  );
};
