import "./App.css";
//React und Component importieren
import React, { Component } from "react";
//Login-Seite importieren
import loginPage from "./components/pages/loginPage.js";
import anbietenPage from "./components/pages/anbietenPage.js";
import { BrowserRouter as Router, Route } from "react-router-dom";
import suchenPage from "./components/pages/suchenPage";
import suchenPageDemo from "./components/pages/suchenPageDemo";
import profilPage from "./components/Cards Raw/ProfilCard";
import profilPageEdit from "./components/pages/profilPageEdit";
import FahrtCard from "./components/Cards Raw/FahrtCard.js";
import FahrtSuchenCards from "./components/Cards Raw/CardGenerator.js";
import DashboardDemo from "./components/pages/DashboardDemo.js";
import Chat from "./components/pages/Chat/Chat";
import Landing from "./components/pages/Landing";
import { ProtectedRoute } from "./authentication/protected.route.js";
import DatenschutzImpressum from "./components/pages/DatenschutzImpressum.js"
class App extends Component {
  render() {
    return (
      <Router>
        <div style={{ marginBottom: "60px" }}>
          <Route exact path="/" component={loginPage}></Route>
          <ProtectedRoute
            exact
            path="/Anbieten"
            component={anbietenPage}
          ></ProtectedRoute>
          <ProtectedRoute
            exact
            path="/Suchen"
            component={suchenPage}
          ></ProtectedRoute>
          <ProtectedRoute
            exact
            path="/profilPageEdit"
            component={profilPageEdit}
          ></ProtectedRoute>
          <ProtectedRoute
            exact
            path="/profilPage"
            component={profilPage}
          ></ProtectedRoute>
          <ProtectedRoute
            exact
            path="/FahrtCard"
            component={FahrtCard}
          ></ProtectedRoute>
          <ProtectedRoute
            exact
            path="/FahrtSuchenCards"
            component={FahrtSuchenCards}
          ></ProtectedRoute>
          <ProtectedRoute
            exact
            path="/DashBoardDemo"
            component={DashboardDemo}
          ></ProtectedRoute>
          <ProtectedRoute
            exact
            path="/SuchenPageDemo"
            component={suchenPageDemo}
          ></ProtectedRoute>
          <Route path="/Chat" component={Chat}></Route>
          <Route path="/DatenschutzImpressum" component={DatenschutzImpressum}></Route>
          <Route exact path="/Landing" component={Landing}></Route>
          <Route
            exact
            path="/auth/logοut/"
            component={() => {
              window.location.href = "http://localhost:8100/auth/logout";
              return null;
            }}
          />
          <Route
            exact
            path="/auth/login/"
            component={() => {
              window.location.href = "http://localhost:8100/auth/login";
              return null;
            }}
          />
        </div>
      </Router>
    );
  }
}
export default App;
