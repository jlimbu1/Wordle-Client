import { useState, useEffect } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { checkGuess } from "../../apis/Game";
import { useParams } from "react-router-dom";
import { status as IStatus } from "../../interfaces";
import ListGuesses from "../../components/ListGuesses";
import { socket } from "../../hooks";

const GamePage = () => {
  const { id } = useParams();
  const [word, setWord] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [status, setStatus] = useState(IStatus.PENDING);
  const localName = localStorage.getItem("name");

  useEffect(() => {
    const handleGuess = (data: { user: string; guess: string }) => {
      const { user, guess } = data;
      checkWord(user, guess);
    };

    socket.on("guess", handleGuess);

    return () => {
      socket.off("guess", handleGuess);
    };
  }, []);

  const checkWord = async (user: string, guess: string) => {
    try {
      const { result, status } = await checkGuess(id, guess);

      setStatus(status);
      const newResult = {
        user,
        result: result.map((feedback: string, i: number) => ({
          char: guess[i],
          feedback,
        })),
      };
      setResults((prevResults) => [newResult, ...prevResults]);
    } catch (error) {
      console.error("Error on checking guess:", error);
    }
  };

  const handleCheckWord = () => {
    socket.emit("guess", id, word, localName);
    setWord("");
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Typography variant="h3" align="center" gutterBottom>
        Wordle
      </Typography>
      <Box sx={{ marginBottom: 2, display: "flex", gap: "5px" }}>
        <TextField
          label="Enter your guess (5 letters)"
          variant="outlined"
          fullWidth
          value={word}
          onChange={(e) => setWord(e.target.value?.toUpperCase())}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCheckWord}
          disabled={status !== IStatus.PENDING}
        >
          Check
        </Button>
      </Box>
      <ListGuesses guesses={results} />
    </Container>
  );
};

export default GamePage;
