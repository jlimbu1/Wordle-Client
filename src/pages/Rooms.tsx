import ListView from "../components/ListView";
import { Button, Container, Typography } from "@mui/material";

const RoomsPage = () => {
  const handleJoinRoom = (index: number) => {};

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Typography variant="h3" align="center" gutterBottom>
        Rooms
      </Typography>
      <ListView
        items={["test"]}
        itemsPerPage={10}
        slot={(index: number) => (
          <Button variant="contained" onClick={() => handleJoinRoom(index)}>
            Join
          </Button>
        )}
        sx={{
          border: "1px solid black",
          borderRadius: "10px",
          maxWidth: 500,
        }}
      />
    </Container>
  );
};

export default RoomsPage;
