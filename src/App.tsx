import { useState, useEffect } from "react";
import "./styles/global.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import HorizontalNavBar from "./components/HorizontalNavBar";
import Home from "./pages";
import Game from "./pages/Game";
import Room from "./pages/Rooms";
import Settings from "./pages/Settings";
import { words } from "./data/data";

// App component which sets up routes
function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Initialize numberOfGuesses to 5 in localStorage on app load
    if (!localStorage.getItem("numberOfGuesses"))
      localStorage.setItem("numberOfGuesses", "5");
    // Initialize wordList in localStorage on app load
    if (!localStorage.getItem("wordList"))
      localStorage.setItem("wordList", JSON.stringify(words));
  }, []);

  return (
    <BrowserRouter basename="/">
      <HorizontalNavBar isMobile={isMobile} />
      {/* set paddings to offset navigation bar */}
      <Box sx={isMobile ? { pb: "76px" } : { pt: "64px" }}>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/game/:id" Component={Game} />
          <Route path="/rooms" Component={Room} />
          <Route path="/rooms/:id" Component={Game} />
          <Route path="/settings" Component={Settings} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
