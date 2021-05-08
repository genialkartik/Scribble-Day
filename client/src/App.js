import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/homepage/home";

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
          <Route exact component={Home} path="/" />
          <Route exact component={Home} path="/u/:userId" />
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
