import { useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Container, Divider, List, Typography } from "@mui/material";
import data from "../data/data.json";
import { IProduct } from "../interfaces";
import {
  formatLabel,
  setLocalStorageItem,
  getLocalStorageItem,
} from "../plugins/helpers";
import ShoppingCartButton from "../components/ShoppingCartButton";
import { setCart } from "../states/Cart/CartSlice";
import { useAppDispatch } from "../hooks";
import ProductListItem from "../components/ProductListItem";

const ListContainer = styled(List)({
  display: "flex",
  flexWrap: "wrap",
});

export default function Menu() {
  const useDispatch = useAppDispatch();

  useEffect(() => {
    const cartItems = getLocalStorageItem("cart") || [];
    useDispatch(setCart(cartItems));
  }, []);

  const uniqueLabels = Array.from(
    new Set(data.flatMap((product) => product.labels))
  );

  const handleOnClick = (product: IProduct) => {
    const cartItems = getLocalStorageItem("cart") || [];
    let updatedCartItems = [];

    // Check if the product already exists in cartItems
    const existingProductIndex = cartItems.findIndex(
      (p: IProduct) => p.id === product.id
    );

    if (existingProductIndex !== -1) {
      // If the product already exists, increment the quantity
      updatedCartItems = cartItems.map(
        (p: IProduct & { quantity: number }, index: number) => {
          if (index === existingProductIndex) {
            return {
              ...p,
              quantity: p.quantity + 1, // Increment the quantity
            };
          } else {
            return p;
          }
        }
      );
    } else {
      // If the product doesn't exist, add it to the cartItems
      updatedCartItems = [...cartItems, { ...product, quantity: 1 }];
    }

    // Update the local storage and dispatch the updated cart items
    setLocalStorageItem({ key: "cart", value: updatedCartItems });
    useDispatch(setCart(updatedCartItems));
  };

  return (
    <Container>
      {uniqueLabels.map((label) => (
        <div key={label}>
          <Typography variant="h6" sx={{ color: "gray" }} gutterBottom>
            {formatLabel(label)}
          </Typography>
          <Divider />
          <ListContainer>
            {data
              .filter((product: IProduct) => product?.labels?.includes(label))
              .map((product: IProduct, index: number) => (
                <ProductListItem
                  product={product}
                  key={`${product.id}-${index}`}
                  onClick={() => handleOnClick(product)}
                />
              ))}
          </ListContainer>
        </div>
      ))}
      <ShoppingCartButton />
    </Container>
  );
}
