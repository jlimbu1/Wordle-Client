import { useState, useEffect } from "react";
import "./styles/global.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Home from "./pages";
import Game from "./pages/Game";

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

  return (
    <BrowserRouter basename="/">
      <Box>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/game/:id" Component={Game} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
