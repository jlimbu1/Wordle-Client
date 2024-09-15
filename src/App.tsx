import { useState, useEffect } from "react";
import "./styles/global.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import HorizontalNavBar from "./components/HorizontalNavBar";
import Home from "./pages";
import Game from "./pages/Game";
import Settings from "./pages/Settings";

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

  // Initialize numberOfGuesses to 5 in localStorage on app load
  useEffect(() => {
    if (!localStorage.getItem("numberOfGuesses"))
      localStorage.setItem("numberOfGuesses", "5");
  }, []);

  return (
    <BrowserRouter basename="/">
      <HorizontalNavBar isMobile={isMobile} />
      {/* set paddings to offset navigation bar */}
      <Box sx={isMobile ? { pb: "76px" } : { pt: "64px" }}>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/game/:id" Component={Game} />
          <Route path="/settings" Component={Settings} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
