import { useState, useEffect } from "react";
import "./styles/global.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import HorizontalNavBar from "./components/HorizontalNavBar";
import Home from "./pages";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";

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
      <HorizontalNavBar isMobile={isMobile} />
      {/* set paddings to offset navigation bar */}
      <Box sx={isMobile ? { pb: "76px" } : { pt: "64px" }}>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/menu" Component={Menu} />
          <Route path="/cart" Component={Cart} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
