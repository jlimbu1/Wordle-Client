import React, { useState, useEffect } from "react";
import { Box, TextField, Typography, IconButton, Divider } from "@mui/material";
import { IProduct } from "../interfaces";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  removeFromCart,
  setCartItemQuantity,
  incrementCartItem,
  decrementCartItem,
  selectCart,
} from "../states/Cart/CartSlice";
import { formatCurrency, setLocalStorageItem } from "../plugins/helpers";

const FlexBox = styled(Box)({
  position: "relative",
  display: "flex",
});

const StyledTextField = styled(TextField)({
  width: "60px",
  marginLeft: "10px",
  marginRight: "10px",
  textAlign: "center",
  "& input": {
    padding: "8px 12px",
  },
});

const CloseButton = styled(IconButton)({
  position: "absolute",
  top: "-24px",
  right: "-24px",
  color: "red",
});

export default function ProductItem({
  product,
}: {
  product: IProduct & { quantity: number };
}) {
  const [quantity, setQuantity] = useState(product.quantity || 1);
  const dispatch = useAppDispatch();
  const storeCart = useAppSelector(selectCart);

  useEffect(() => {
    setCartLocalStorage();
  }, [storeCart]);

  const setCartLocalStorage = () => {
    setLocalStorageItem({ key: "cart", value: storeCart });
  };

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    dispatch(incrementCartItem(product.id));
  };

  const handleDecrement = () => {
    if (quantity <= 1) return;
    setQuantity((prevQuantity) => prevQuantity - 1);
    dispatch(decrementCartItem(product.id));
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (isNaN(newQuantity)) return;

    setQuantity(newQuantity);
    dispatch(setCartItemQuantity({ id: product.id, quantity: newQuantity }));
  };

  const handleRemoveProduct = () => {
    dispatch(removeFromCart(product.id));
  };

  return (
    <Box style={{ marginBottom: "20px" }}>
      <FlexBox>
        <CloseButton onClick={handleRemoveProduct}>
          <CloseIcon />
        </CloseButton>
        <img
          src={`/images/${product.assetPath}`}
          alt={product.name}
          style={{
            width: "100px",
            height: "100px",
            objectFit: "cover",
            marginRight: "8px",
          }}
        />
        <Box>
          <Typography variant="h6">{product.name}</Typography>
          <Typography variant="body1">
            {formatCurrency(product.price, product.currency)}
          </Typography>
          <FlexBox>
            <IconButton color="secondary" onClick={handleDecrement}>
              <RemoveIcon />
            </IconButton>
            <StyledTextField value={quantity} onChange={handleQuantityChange} />
            <IconButton color="primary" onClick={handleIncrement}>
              <AddIcon />
            </IconButton>
          </FlexBox>
        </Box>
      </FlexBox>
      <Divider />
    </Box>
  );
}
