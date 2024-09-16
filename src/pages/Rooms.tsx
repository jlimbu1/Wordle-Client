import { useState, useEffect } from "react";
import ListView from "../components/ListView";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { getAllAvailableRooms } from "../apis/Game";
import { Add as AddIcon } from "@mui/icons-material";

const RoomsPage = () => {
  const localName =
    localStorage.getItem("name") ??
    Math.random().toString(36).toUpperCase().slice(-8); // random 8 char

  const [rooms, setRooms] = useState([]);
  const [name, setName] = useState(localName);

  const fetchRooms = async () => {
    setRooms(await getAllAvailableRooms());
  };

  useEffect(() => {
    try {
      if (!localStorage.getItem("name")) localStorage.setItem("name", name);
      fetchRooms();
    } catch (error) {
      console.error("Error on fetching available rooms:", error);
    }
  }, []);

  const debouncedHandleNameChange = (value: string) => {
    localStorage.setItem("name", value);
    setName(value);
  };

  const handleCreateRoom = () => {};
  const handleJoinRoom = (index: number) => {};

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Typography variant="h3" align="center" gutterBottom>
        Rooms
      </Typography>
      <Box sx={{ marginBottom: 2, display: "flex", gap: "5px" }}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) =>
            debouncedHandleNameChange(e.target.value?.toUpperCase())
          }
        />
        <Button variant="contained" color="primary" onClick={handleCreateRoom}>
          <AddIcon />
          Room
        </Button>
      </Box>
      <ListView
        items={rooms}
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
