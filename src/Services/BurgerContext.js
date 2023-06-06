import React from "react";
import { createContext, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

const memory = localStorage.getItem("burgers");

const initialState = memory
  ? JSON.parse(memory)
  : {
      order: [],
      objects: {},
    };

const reducer = (state, action) => {
  switch (action.type) {
    case "get": {
      const burgers = action.burgers;
      const newState = {
        order: burgers.map((burger) => burger.id),
        objects: burgers.reduce(
          (object, burger) => ({ ...object, [burger.id]: burger }),
          {}
        ),
      };
      localStorage.setItem("burgers", JSON.stringify(newState));
      return newState;
    }
    case "create": {
      const id = uuidv4();
      const newState = {
        order: [...state.order, id],
        objects: {
          ...state.objects,
          [id]: action.burger,
        },
      };
      localStorage.setItem("burgers", JSON.stringify(newState));
      return newState;
    }
    case "update": {
      const id = action.id;
      const updatedObject = {
        ...state.objects[id],
        ...action.burger,
      };

      const newState = {
        ...state,
        objects: {
          ...state.objects,
          [id]: updatedObject,
        },
      };
      localStorage.setItem("burgers", JSON.stringify(newState));
      return newState;
    }
    case "delete": {
      const id = action.id;
      const newOrder = state.order.filter((elm) => elm !== id);
      const newObjects = { ...state.objects };
      delete newObjects[id];
      const newState = {
        order: newOrder,
        objects: newObjects,
      };
      localStorage.setItem("burgers", JSON.stringify(newState));
      return newState;
    }
    default:
      throw new Error();
  }
};

export const ContextBurgers = createContext(null);

const MemoryBurgers = ({ children }) => {
  const value = useReducer(reducer, initialState);

  return (
    <ContextBurgers.Provider value={value}>{children}</ContextBurgers.Provider>
  );
};

export default MemoryBurgers;
