import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const AbsoluteBox = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

const HomePage = () => {
  return (
    <AbsoluteBox sx={{ textAlign: "center" }}>
      <Typography variant="h1" gutterBottom>
        Wordle
      </Typography>
      <Typography variant="h6" gutterBottom sx={{ color: "#666" }}>
        LIMBU Jimmy
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{
          margin: "10px",
          backgroundColor: "var(--green-color)",
          width: "80%",
        }}
      >
        <Typography variant="h5">1 Player</Typography>
      </Button>
      <Button
        variant="contained"
        color="secondary"
        sx={{
          margin: "10px",
          backgroundColor: "var(--red-color)",
          width: "80%",
        }}
      >
        <Typography variant="h5">2 Player</Typography>
      </Button>
    </AbsoluteBox>
  );
};

export default HomePage;
