import React from "react";
import styles from "./not_found.module.css";
import { Link } from "react-router-dom";

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
        <Link to={link} className={styles.link}>
          {linkText}
        </Link>
      }
    </div>
  );
};

export default NotFound;
