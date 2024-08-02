import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { setCart } from "../states/Cart/CartSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getLocalStorageItem, formatCurrency } from "../plugins/helpers";
import ProductListItemQuantity from "../components/ProductListItemQuantity";
import { IProduct } from "../interfaces";
import CheckoutDialog from "../components/Dialogs/Checkout";

export default function Cart() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.value);

  const [subtotal, setSubtotal] = useState<number>(0);
  const [showCheckoutDialog, setShowCheckoutDialog] = useState(false);

  useEffect(() => {
    const storedCartItems = getLocalStorageItem("cart") || [];
    dispatch(setCart(storedCartItems));
  }, [dispatch]);

  useEffect(() => {
    let total = 0;
    cartItems.forEach((item: IProduct & { quantity: number }) => {
      total += item.price * item.quantity;
    });
    setSubtotal(total);
  }, [cartItems]);

  const onCheckout = () => {
    if (cartItems?.length <= 0) return;
    // TODO: Checkout validation here

    setShowCheckoutDialog(true);
  };

  const handleCloseDialog = () => {
    setShowCheckoutDialog(false);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        Checkout Summary
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h6" gutterBottom>
              Checkout Items
            </Typography>
            {cartItems.map((product) => (
              <ProductListItemQuantity key={product.id} product={product} />
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <TableContainer>
              <Table>
                <TableBody>
                  {cartItems.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell style={{ width: "60%" }}>
                        {product.name}
                      </TableCell>
                      <TableCell align="right">
                        {formatCurrency(
                          product.price * product.quantity,
                          product.currency
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell>
                      <strong>Total:</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>{formatCurrency(subtotal)}</strong>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={onCheckout}
            >
              Checkout
            </Button>
          </Paper>
        </Grid>
      </Grid>
      <CheckoutDialog open={showCheckoutDialog} onClose={handleCloseDialog} />
    </Container>
  );
}
