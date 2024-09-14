import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import { createSession } from "../apis/Game";

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
  const navigate = useNavigate();

  const handleButtonClick = async (path: string) => {
    try {
      const response = await createSession();
      const sessionId = response.data;
      navigate(`${path}/${sessionId}`);
    } catch (error) {
      console.error("Error creating game session:", error);
    }
  };

  return (
    <AbsoluteBox sx={{ textAlign: "center" }}>
      <Typography variant="h1">Wordle</Typography>
      <Typography variant="h6" gutterBottom sx={{ color: "var(--gray-color)" }}>
        LIMBU Jimmy
      </Typography>
      {pages.map((page, index) => (
        <Button
          key={index}
          variant="contained"
          color={page.color}
          sx={{
            margin: "10px",
            backgroundColor: page.backgroundColor,
            width: "80%",
          }}
          onClick={() => handleButtonClick(page.path)}
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
      ))}
    </AbsoluteBox>
  );
};

export default HomePage;
