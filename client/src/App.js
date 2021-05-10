import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import Home from "./components/homepage/home";
import About from "./components/templates/about/about";
import Faq from "./components/templates/faq/faq";
import Resources from "./components/templates/resources/resources";

const Theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

function App() {
  return (
    <MuiThemeProvider theme={Theme}>
      <div className="App">
        <Router>
          <Route exact component={Home} path="/u/:userId" />
          <Route exact component={Home} path="/" />
          <Route exact component={About} path="/about" />
          <Route exact component={Faq} path="/faq" />
          <Route exact component={Resources} path="/resources" />
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
