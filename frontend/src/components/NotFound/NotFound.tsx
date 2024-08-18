import React from "react";
import styles from "./not_found.module.css";

type NotFoundProps = {
  title?: string;
  message?: string;
  link?: string;
  linkText?: string;
};

const NotFound: React.FC<NotFoundProps> = ({
  title = "404 Not Found",
  message = "The page you are looking for does not exist.",
  link = "/",
  linkText = "Back to Home",
}) => {
  return (
    <div className={styles.notFound}>
      <h1>{title}</h1>
      <p>{message}</p>
      {
        <a href={link} className={styles.link}>
          {linkText}
        </a>
      }
    </div>
  );
};

export default NotFound;
