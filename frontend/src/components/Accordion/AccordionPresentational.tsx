import React, { PropsWithChildren } from 'react';
import styles from './accordion.module.css';
import { AccordionContainerProps } from './Accordion';

interface AccordionPresentationalProps extends AccordionContainerProps {
  mode: string;
  handleSummaryClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  contentRef: React.RefObject<HTMLDivElement>;
}

const AccordionPresentational: React.FC<PropsWithChildren<AccordionPresentationalProps>> = ({
  label,
  mode,
  handleSummaryClick,
  contentRef,
  children,
}) => {
  return (
    <details className={[styles.m_accordion, mode].join(' ')}>
      <summary className={styles.m_accordion__summary} onClick={handleSummaryClick}>
        <span className={styles.m_accordion__summary_inner}>
          {label}
          <span className={styles.m_accordion__icon}></span>
        </span>
      </summary>
      <div className={styles.m_accordion__content} ref={contentRef}>
        <div className={styles.m_accordion__content_inner}>{children}</div>
      </div>
    </details>
  );
};

export default AccordionPresentational;
