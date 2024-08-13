import React from "react";
import { Router } from "@reach/router";
import Index from "../pages/item/index";
import PresidentsList from "../pages/president/index";
import TouristicAttractions from "../pages/tourism/tourism";
const Routes = () => {
  return (
    <>
      <Router>
          <Index path="/vuelos" />
          <PresidentsList path="/presidentes" />
          <TouristicAttractions path="/tursimo" />
      </Router>
    </>
  );
};

export default Routes;
