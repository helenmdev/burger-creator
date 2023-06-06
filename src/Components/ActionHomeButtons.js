import React from "react";
import styles from "./Layout.module.css";
import { Link } from "react-router-dom";

const ActionButtons = () => {
  return (
    <div className={styles.homeBtnsBox}>
      <Link to="/creation" className={styles.homebtn}>
        New Burger
      </Link>
      <Link to="/created" className={styles.homebtn}>
        Created Burgers
      </Link>
    </div>
  );
};

export default ActionButtons;
