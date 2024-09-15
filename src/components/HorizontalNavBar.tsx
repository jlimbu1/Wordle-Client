import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Home as HomeIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";

const mobileMaxWidth = "600px";

const pages = [{ name: "Home", icon: <HomeIcon />, path: "/" }];

const ResponsiveAppBar = styled(AppBar)({
  top: 0,
  width: "100%",
  [`@media (max-width: ${mobileMaxWidth})`]: {
    top: "auto",
    bottom: 0,
  },
});

const FlexBox = styled(Box)({
  display: "flex",
  gap: "24px",
  justifyContent: "center",
  width: "100%",
});

export default function HorizontalNavBar({ isMobile }: { isMobile: boolean }) {
  return (
    <ResponsiveAppBar position="fixed">
      <Toolbar>
        <FlexBox>
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
              {isMobile ? (
                // Mobile navigation display
                <Button sx={{ my: 1, color: "white", width: "100%" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    {page.icon}
                    <Typography variant="body1" align="center" gutterBottom>
                      {page.name}
                    </Typography>
                  </Box>
                </Button>
              ) : (
                // Desktop navigation display
                <Button
                  sx={{ my: 1, color: "white", width: "100%" }}
                  startIcon={page.icon}
                >
                  <Typography variant="body1" align="center">
                    {page.name}
                  </Typography>
                </Button>
              )}
            </Link>
          ))}
        </FlexBox>
      </Toolbar>
    </ResponsiveAppBar>
  );
}
