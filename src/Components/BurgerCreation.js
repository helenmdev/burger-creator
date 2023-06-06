import React, { useState, useContext, useEffect } from "react";
import styles from "../Components/BurgerCreation.module.css";
import { ContextBurgers } from "../Services/BurgerContext";
import { useNavigate, Link, useParams } from "react-router-dom";
import ModalCreate from "./ModalCreate";
import Burger from "./Burger";
import { useNotifications } from "reapop";
import { setUpNotifications } from "reapop";

const Creation = () => {
  const [lettuce, setLettuce] = useState(false);
  const [meat, setMeat] = useState(false);
  const [tomatoe, setTomatoe] = useState(false);
  const [cheese, setCheese] = useState(false);
  const [burger, setBurger] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [savedAdditions, setSavedAdditions] = useState("");

  const [state, dispatch] = useContext(ContextBurgers);

  const { notify } = useNotifications();
  const { id } = useParams();

  useEffect(() => {
    if (!id || !state.objects[id]) return;
    //if there is an existed burger (id), charge the ingredients according it
    const loadedBurger = state.objects[id];

    setLettuce(loadedBurger.lettuce);
    setTomatoe(loadedBurger.tomatoe);
    setMeat(loadedBurger.meat);
    setCheese(loadedBurger.cheese);
    setSavedAdditions(loadedBurger.additions);
  }, [id, state.objects]);

  setUpNotifications({
    defaultProps: {
      position: "top-right",
      dismissible: true,
      dismissAfter: 5000,
    },
  });

  const navigate = useNavigate();

  //Show and hide ingredients functions

  const ShowLettuce = () => {
    setLettuce(!lettuce);
  };

  const ShowMeat = () => {
    setMeat(!meat);
  };

  const ShowTomatoe = () => {
    setTomatoe(!tomatoe);
  };

  const ShowCheese = () => {
    setCheese(!cheese);
  };

  const update = () => {
    const updatedBurger = {
      ...burger,
      lettuce: lettuce,
      meat: meat,
      tomatoe: tomatoe,
      cheese: cheese,
      additions: savedAdditions,
    };

    dispatch({ type: "update", id: id, burger: updatedBurger });
    navigate("/created");
  };

  const SaveBurger = () => {
    const newBurger = {
      lettuce: lettuce,
      meat: meat,
      tomatoe: tomatoe,
      cheese: cheese,
      additions: savedAdditions,
    };

    // verify that there is at least one ingredient selected

    const someIngredientSelected = Object.values(newBurger).some(
      (value) => value === true
    );

    if (someIngredientSelected) {
      if (!id) {
        dispatch({ type: "create", burger: newBurger });
        notify("Burger created successfully", "success");
        navigate("/created");
      } else {
        setBurger(newBurger);
        update();
      }
    } else {
      notify("Please select at least one ingredient", "error");
    }

    //if there is not a created burger (id), dispatch create action, otherwise, call update func.
  };

  const handleSaveAdditions = (additions) => {
    setSavedAdditions(additions);
    setModalShow(false);
  };

  const deleteBurger = () => {
    dispatch({ type: "delete", id: id });
    notify("Burger deleted!", "success");
    navigate("/created");
  };

  return (
    <div className={`${styles.creationBox} burger-modal`}>
      <div className={styles.firstBlock}>
        {!id ? <h1>Create a new burger</h1> : <h1>Edit your burger</h1>}
        <div className={styles.ingredientsBtnsBox}>
          <button
            className={`${styles.ingredientBtn} ${
              meat ? styles.ingredientBtnSelected : ""
            }`}
            onClick={ShowMeat}
          >
            Meat
          </button>
          <button
            className={`${styles.ingredientBtn} ${
              lettuce ? styles.ingredientBtnSelected : ""
            }`}
            onClick={ShowLettuce}
          >
            Lettuce
          </button>
          <button
            className={`${styles.ingredientBtn} ${
              tomatoe ? styles.ingredientBtnSelected : ""
            }`}
            onClick={ShowTomatoe}
          >
            Tomatoe
          </button>
          <button
            className={`${styles.ingredientBtn} ${
              cheese ? styles.ingredientBtnSelected : ""
            }`}
            onClick={ShowCheese}
          >
            Cheese
          </button>
          <button
            className={styles.ingredientBtn}
            onClick={() => setModalShow(true)}
          >
            Other
          </button>
        </div>
      </div>
      <ModalCreate
        show={modalShow}
        onHide={() => setModalShow(false)}
        additions
        onSave={handleSaveAdditions}
      />
      <div className={styles.secondBlock}>
        <Burger
          cheese={cheese}
          tomatoe={tomatoe}
          lettuce={lettuce}
          meat={meat}
          additions={savedAdditions}
        />

        {savedAdditions && (
          <div className={styles.additions}>
            <b>Additions:</b> {savedAdditions}
          </div>
        )}
      </div>
      <div className={styles.bottomBtns}>
        <button
          className={`${styles.ingredientBtn} ${styles.doneBtn}`}
          onClick={SaveBurger}
        >
          Save burger
        </button>
        {id && (
          <button
            className={`${styles.ingredientBtn} ${styles.doneBtn}`}
            onClick={deleteBurger}
          >
            Delete{" "}
          </button>
        )}
        <Link
          to="/created"
          className={`${styles.ingredientBtn} ${styles.doneBtn}`}
        >
          Created burgers
        </Link>
      </div>
    </div>
  );
};

export default Creation;
