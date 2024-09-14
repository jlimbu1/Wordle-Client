import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { checkGuess } from "../apis/Game";
import { useParams } from "react-router-dom";

const GamePage = () => {
  const { id } = useParams();
  const [word, setWord] = useState("");
  const [results, setResults] = useState<[{ char: string; feedback: string }]>(
    [] as any
  );

  const checkWord = async () => {
    try {
      const res = await checkGuess(id, word);
      setResults(
        res?.map((x: string, i: number) => ({ char: word[i], feedback: x }))
      );
      setWord("");
    } catch (error) {
      console.error("Error creating game session:", error);
    }
  };

  const getColorForFeedback = (feedback: string) => {
    switch (feedback) {
      case "HIT":
        return "green";
      case "PRESENT":
        return "yellow";
      case "MISS":
        return "red";
      default:
        return "black";
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Typography variant="h3" align="center" gutterBottom>
        Wordle
      </Typography>
      <TextField
        label="Enter your guess"
        variant="outlined"
        fullWidth
        value={word}
        onChange={(e) => setWord(e.target.value)}
        style={{ marginBottom: "20px" }}
      />
      <Button variant="contained" color="primary" onClick={checkWord}>
        Check
      </Button>
      {results.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          {results.map((result, index) => (
            <Box
              key={result.char + index}
              sx={{
                backgroundColor: getColorForFeedback(result.feedback),
              }}
            >
              {result.char}
            </Box>
          ))}
        </div>
      )}
    </Container>
  );
};

export default GamePage;
