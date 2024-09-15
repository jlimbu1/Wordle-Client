import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { checkGuess } from "../apis/Game";
import { useParams } from "react-router-dom";

const GamePage = () => {
  const { id } = useParams();
  const [word, setWord] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const checkWord = async () => {
    try {
      const res = await checkGuess(id, word);
      const newResult = res.map((x: string, i: number) => ({
        char: word[i],
        feedback: x,
      }));
      setResults((prevResults) => [...prevResults, newResult]);
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
        label="Enter your guess (5 letters)"
        variant="outlined"
        fullWidth
        value={word}
        // TODO: Only allow 5 alphabetic characters input
        // onChange={(e) => {
        //   const input = e.target.value.slice(0, NUM_LETTERS);
        //   setWord(input.toUpperCase());
        // }}
        style={{ marginBottom: "20px" }}
      />
      <Button variant="contained" color="primary" onClick={checkWord}>
        Check
      </Button>
      {results.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          {results.map((guesses, guessIndex) => (
            <div key={guessIndex} style={{ marginBottom: "10px" }}>
              {guesses.map(
                (result: { char: string; feedback: string }, index: number) => (
                  <Box
                    key={result.char + index}
                    sx={{
                      backgroundColor: getColorForFeedback(result.feedback),
                      display: "inline-block",
                      padding: "5px",
                      margin: "2px",
                    }}
                  >
                    {result.char}
                  </Box>
                )
              )}
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};

export default GamePage;
