import React from "react";
import styles from "./Layout.module.css";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <header className={styles.header}></header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
