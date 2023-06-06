/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { ContextBurgers } from "../Services/BurgerContext";
import CreatedBurger from "./CreatedBurger";
import styles from "./CreatedBurgersList.module.css";
import { Link, Outlet } from "react-router-dom";

const CreatedBurgersList = ({ showModal }) => {
  const [state] = useContext(ContextBurgers);

  return (
    <div className={styles.createdBox}>
      <Outlet />

      <h1>Created Burgers</h1>
      <div className={styles.createdBoxContent}>
        <div className={styles.ingredients}>
          {state.order.map((orderId) => {
            return (
              <CreatedBurger
                showModal={showModal}
                key={orderId}
                id={orderId}
                tomatoe={state.objects[orderId].tomatoe}
                lettuce={state.objects[orderId].lettuce}
                meat={state.objects[orderId].meat}
                cheese={state.objects[orderId].cheese}
                additions={state.objects[orderId].additions}
              />
            );
          })}
        </div>
      </div>
      <Link to="/creation" className={styles.backBtn}>
        New Burger
      </Link>
    </div>
  );
};

export default CreatedBurgersList;
