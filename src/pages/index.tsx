import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const mobileMaxWidth = "600px";

const AbsoluteTypography = styled(Typography)({
  margin: "0",
  position: "absolute",
  top: "70%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  fontSize: "min(8vw, 100px)",
  fontFamily: "cursive",
  color: "black",
  textShadow: "0 0 10px black",
  display: "inline-block",
  marginBottom: "20px",
  [`@media (max-width: ${mobileMaxWidth})`]: {
    top: "65%",
  },
});

const HomePage = () => {
  return (
    <Box
      sx={{
        position: "relative",
        textAlign: "center",
        marginTop: "100px",
        backgroundColor: "#f9f9f9",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <AbsoluteTypography variant="h1" gutterBottom>
        <span style={{ animation: "colorChange 3s infinite" }}>Bubble Tea</span>
      </AbsoluteTypography>
      <img
        src={`/images/homepage_img.jpg`}
        alt="homepage_img"
        style={{
          width: "100%",
          maxWidth: "800px",
          objectFit: "cover",
        }}
      ></img>
      <Typography variant="h6" gutterBottom sx={{ color: "#666" }}>
        LIMBU Jimmy
      </Typography>
    </Box>
  );
};

export default HomePage;
