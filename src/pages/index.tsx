import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Group as GroupIcon,
  People as PersonIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { createSession } from "../apis/Game";
import { words } from "../data/data";

const pages = [
  {
    name: "1 Player",
    icon: <PersonIcon />,
    color: "primary",
    backgroundColor: "var(--green-color)",
    path: "/game",
    enabled: true,
  },
  {
    name: "2 Player",
    icon: <GroupIcon />,
    color: "primary",
    backgroundColor: "var(--red-color)",
    path: "/rooms",
    enabled: true,
  },
  {
    name: "Settings",
    icon: <SettingsIcon />,
    color: "primary",
    backgroundColor: "var(--gray-color)",
    path: "/settings",
    enabled: true,
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
  const localMaxGuesses = parseInt(
    localStorage.getItem("numberOfGuesses") ?? "5"
  );
  const localWordList = JSON.parse(
    localStorage.getItem("wordList") ?? JSON.stringify(words)
  );

  const handleButtonClick = async (path: string) => {
    if (path.includes("game"))
      try {
        const sessionId = await createSession(localWordList, localMaxGuesses);
        navigate(`${path}/${sessionId}`);
      } catch (error) {
        console.error("Error creating game session:", error);
      }
    else navigate(`${path}`);
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
          disabled={!page.enabled}
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
