import {
  Avatar,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { IProduct } from "../interfaces";
import { handleNull, formatCurrency } from "../plugins/helpers";
import { MouseEventHandler } from "react";

const LargeAvatar = styled(Avatar)({
  height: "100px",
  width: "100px",
});

const ResponsiveListItem = styled(ListItem)({
  width: "420px",
  borderBottom: "1px solid var(--grey-color)",
});

export default function ProductListItem({
  product,
  onClick,
}: {
  product: IProduct;
  onClick: MouseEventHandler;
}) {
  return (
    <ResponsiveListItem className="hover-effect" onClick={onClick}>
      <ListItemText
        primary={
          <Typography variant="h6" gutterBottom>
            {handleNull(product.name)}
          </Typography>
        }
        secondary={
          <Typography
            component="span"
            variant="body1"
            sx={{ color: "gray" }}
            gutterBottom
          >
            {formatCurrency(product.price, product.currency)}
            <Typography variant="body2" sx={{ color: "gray" }} gutterBottom>
              {handleNull(product.description)}
            </Typography>
          </Typography>
        }
      />
      <ListItemAvatar>
        <LargeAvatar
          alt={handleNull(product.name)}
          src={`public/images/${product.assetPath}`}
          sizes="100%"
        />
      </ListItemAvatar>
    </ResponsiveListItem>
  );
}
