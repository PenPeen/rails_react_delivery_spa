import React from 'react';
import styles from './badge.module.css';
import { Link } from 'react-router-dom';

type BadgeType = 'primary' | 'info' | 'success' | 'warning' | 'danger';

interface BadgeProps {
  label: string;
  type?: BadgeType;
  size?: 'small' | 'medium' | 'large';
  link?: string;
  handleClick?: () => void;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  type = 'primary',
  size = 'medium',
  link,
  handleClick,
}: BadgeProps) => {
  const mode = styles[`a_badge__${type}`];

  return (
    <span className={[styles.a_badge, styles[`a_badge__${size}`], mode].join(' ')} onClick={handleClick}>
      {link ? <Link to={link}>{label}</Link> : label}
    </span>
  );
};
