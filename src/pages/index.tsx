import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";

const pages = [
  {
    name: "1 Player",
    icon: <PersonIcon />,
    color: "primary",
    backgroundColor: "var(--green-color)",
    path: "/game",
  },
  {
    name: "2 Player",
    icon: <GroupIcon />,
    color: "secondary",
    backgroundColor: "var(--red-color)",
    path: "/waitingRoom",
  },
];

const AbsoluteBox = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

const HomePage = () => {
  return (
    <AbsoluteBox sx={{ textAlign: "center" }}>
      <Typography variant="h1">Wordle</Typography>
      <Typography variant="h6" gutterBottom sx={{ color: "var(--gray-color)" }}>
        LIMBU Jimmy
      </Typography>
      {pages.map((page) => (
        <Link
          to={page.path}
          key={page.name}
          style={{
            textDecoration: "none",
            color: "inherit",
            width: "100%",
          }}
        >
          <Button
            variant="contained"
            color={page.color}
            sx={{
              margin: "10px",
              backgroundColor: page.backgroundColor,
              width: "80%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              {page.icon}
              <Typography variant="h5">{page.name}</Typography>
            </Box>
          </Button>
        </Link>
      ))}
    </AbsoluteBox>
  );
};

export default HomePage;
