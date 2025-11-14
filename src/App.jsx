import React from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import Routes from "./Routes";
import ChatWidget from './components/ui/ChatWidget';
import SOSButton from './components/ui/SOSButton';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="theme-transition">
          <Routes />
          <ChatWidget />
          <SOSButton />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;