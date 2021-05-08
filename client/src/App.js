import React from "react";
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
        <Home />
      </div>
    </MuiThemeProvider>
  );
}

export default App;
