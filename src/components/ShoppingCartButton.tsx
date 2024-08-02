import { Badge, Box, Fab } from "@mui/material";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { useState, useEffect } from "react";

const AbsoluteBox = styled(Box)({
  position: "fixed",
  zIndex: "10",
  bottom: 100,
  right: 30,
});

const cart = {
  name: "Cart",
  icon: <ShoppingCartIcon />,
  path: "/cart",
};

export default function ShoppingCartButton() {
  const cartItems = useAppSelector((state) => state.cart.value);
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    const newTotalQuantity = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setTotalQuantity(newTotalQuantity);
  }, [cartItems, totalQuantity]);

  return (
    <AbsoluteBox>
      <Link
        to={cart.path}
        key={cart.name}
        style={{
          textDecoration: "none",
          color: "inherit",
          width: "100%",
        }}
      >
        <Fab aria-label={cart.name} color="primary">
          <Badge badgeContent={totalQuantity} color="error">
            {cart.icon}
          </Badge>
        </Fab>
      </Link>
    </AbsoluteBox>
  );
}
