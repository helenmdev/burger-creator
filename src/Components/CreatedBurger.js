import React from "react";
import styles from "./CreatedBurger.module.css";
import Burger from "./Burger";
import { useNavigate } from "react-router-dom";

const CreatedBurger = ({
  tomatoe,
  cheese,
  lettuce,
  meat,
  additions,
  id,
  showModal,
}) => {
  const navigate = useNavigate();

  const openBurger = () => {
    navigate(`/created/${id}`);
    showModal();
  };

  return (
    <div className={styles.createdBurgerBox} onClick={openBurger}>
      <div className={styles.burgerImgBox}>
        <Burger
          className={styles.burgerImg}
          tomatoe={tomatoe}
          cheese={cheese}
          lettuce={lettuce}
          meat={meat}
        />
      </div>
      <div className={styles.ingredients}>
        <h5>Ingredients</h5>
        <p>
          {tomatoe && <span>Tomatoe</span>}
          {cheese && <span>Cheese</span>}
          {lettuce && <span>Lettuce</span>}
          {meat && <span>Meat</span>}
        </p>
        {additions && (
          <div>
            <i>*{additions}</i>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatedBurger;
