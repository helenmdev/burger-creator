import React, { useState, useEffect } from "react";
import styles from "./BurgerCreation.module.css";
import BreadTop from "../Images/TopBread.png";
import BreadBottom from "../Images/BottomBread.png";
import Cheese from "../Images/Cheese.png";
import Meat from "../Images/meat.png";
import Lettuce from "../Images/Lettuce.png";
import Tomatoe from "../Images/tomatoe.png";

const Burger = ({ cheese, tomatoe, lettuce, meat, className }) => {
  const [ingredientMeatFade, setIngredientMeatFade] = useState(
    styles.ingredientHide
  );
  const [ingredientCheeseFade, setIngredientCheeseFade] = useState(
    styles.ingredientHide
  );
  const [ingredientTomatoeFade, setIngredientTomatoeFade] = useState(
    styles.ingredientHide
  );
  const [ingredientLettuceFade, setIngredientLettuceFade] = useState(
    styles.ingredientHide
  );

  useEffect(() => {
    setIngredientTomatoeFade(styles.ingredientHideA);
  }, [tomatoe]);

  useEffect(() => {
    setIngredientMeatFade(styles.ingredientHideA);
  }, [meat]);

  useEffect(() => {
    setIngredientLettuceFade(styles.ingredientHideA);
  }, [lettuce]);

  useEffect(() => {
    setIngredientCheeseFade(styles.ingredientHideA);
  }, [cheese]);

  useEffect(() => {
    setIngredientCheeseFade(styles.ingredientHide);
    setIngredientMeatFade(styles.ingredientHide);
    setIngredientLettuceFade(styles.ingredientHide);
    setIngredientTomatoeFade(styles.ingredientHide);
  }, []);

  //show the ingredients images according the state of each ingredient as prop
  return (
    <div className={styles.burgerBox}>
      <div className={styles.ingredients}>
        <div className={styles.breadTop}>
          <img src={BreadTop} alt="top bread" className={className}></img>
        </div>
        <div
          id="cheese"
          className={cheese ? styles.cheese : ingredientCheeseFade}
        >
          <img src={Cheese} alt="cheese" className={className}></img>
        </div>
        <div
          id="tomatoe"
          className={tomatoe ? styles.tomatoe : ingredientTomatoeFade}
        >
          <img src={Tomatoe} alt="tomatoe" className={className}></img>
        </div>
        <div
          id="lettuce"
          className={lettuce ? styles.lettuce : ingredientLettuceFade}
        >
          <img src={Lettuce} alt="lettuce" className={className}></img>
        </div>

        <div id="meat" className={meat ? styles.meat : ingredientMeatFade}>
          <img src={Meat} alt="meat" className={className}></img>
        </div>
        <div className={styles.breadBottom}>
          <img src={BreadBottom} alt="bottom bread" className={className}></img>
        </div>
      </div>
    </div>
  );
};

export default Burger;
