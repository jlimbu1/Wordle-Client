import { useState, useEffect } from "react";
import ListView from "../components/ListView";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { createSession, getAllAvailableRooms } from "../apis/Game";
import { Add as AddIcon } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { words } from "../data/data";
import { socket } from "../hooks";

const RoomsPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

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

  const handleCreateRoom = async () => {
    try {
      const sessionId = await createSession(words, true, -1);
      navigate(`${pathname}/${sessionId}`);
      socket.emit("joinRoom", sessionId, name);
    } catch (error) {
      console.error("Error creating game session:", error);
    }
  };

  const handleJoinRoom = (index: number) => {
    const sessionId = rooms[index];
    navigate(`${pathname}/${sessionId}`);
    socket.emit("joinRoom", sessionId, name);
  };

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
