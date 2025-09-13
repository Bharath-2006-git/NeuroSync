import React from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import Routes from "./Routes";

function App() {
  return (
    <ThemeProvider>
      <div className="theme-transition">
        <Routes />
      </div>
    </ThemeProvider>
  );
}

export default App;