import { useState, useEffect } from "react";
import {
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
} from "@mui/material";
import { useAppDispatch } from "../../hooks";
import { setLocalStorageItem } from "../../plugins/helpers";
import { setCart } from "../../states/Cart/CartSlice";
import { styled } from "@mui/material/styles";

const FlexDialogContent = styled(DialogContent)({
  display: "flex",
  justifyContent: "center",
});

export default function CheckoutDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: any;
}) {
  const dispatch = useAppDispatch();
  const [showSuccess, setShowSuccess] = useState(false);

  const emptyCart = () => {
    dispatch(setCart([]));
    setLocalStorageItem({ key: "cart", value: [] });
  };

  useEffect(() => {
    let timer = null;

    // TODO: checkout process here
    if (open)
      timer = setTimeout(() => {
        setShowSuccess(true);
        emptyCart();
      }, 3000);

    return () => clearTimeout(timer as NodeJS.Timeout);
  }, [open]);

  // Clear the previous timer whenever the dialog is opened again
  useEffect(() => {
    if (!open) setShowSuccess(false);
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Checkout</DialogTitle>
      <FlexDialogContent>
        {showSuccess ? <Typography>Success!</Typography> : <CircularProgress />}
      </FlexDialogContent>
    </Dialog>
  );
}
