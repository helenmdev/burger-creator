import React, { useState } from "react";
import "./App.css";
import Layout from "./Components/Layout";
import { Routes, Route, Navigate } from "react-router-dom";
import ActionButtons from "./Components/ActionHomeButtons";
import BurgerCreation from "./Components/BurgerCreation";
import { Modal } from "react-bootstrap";

import NotificationsSystem, { atalhoTheme, useNotifications } from "reapop";
import { setUpNotifications } from "reapop";
import CreatedBurgersList from "./Components/CreatedBurgersList";

setUpNotifications({
  defaultProps: {
    position: "top-right",
    dismissible: true,
  },
});

function App() {
  const { notifications, dismissNotification } = useNotifications();
  const [modalShow, setModalShow] = useState(false);

  const showModal = () => {
    setModalShow(true);
  };
  return (
    <>
      <div>
        <NotificationsSystem
          // 2. Pass the notifications you want Reapop to display.
          notifications={notifications}
          // 3. Pass the function used to dismiss a notification.
          dismissNotification={(id) => dismissNotification(id)}
          // 4. Pass a builtIn theme or a custom theme.
          theme={atalhoTheme}
        />
      </div>

      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />}></Route>
          <Route element={<Layout />}>
            <Route path="/home" element={<ActionButtons />}></Route>
            <Route path="/creation" element={<BurgerCreation />}></Route>
            <Route
              path="/created"
              element={<CreatedBurgersList showModal={showModal} />}
            >
              <Route
                path="/created/:id"
                element={
                  <Modal show={modalShow} onHide={() => setModalShow(false)}>
                    <BurgerCreation />
                  </Modal>
                }
              ></Route>
            </Route>
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
