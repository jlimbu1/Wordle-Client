import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { checkGuess } from "../apis/Game";
import { useParams } from "react-router-dom";
import { status as IStatus } from "../interfaces";

const GamePage = () => {
  const { id } = useParams();
  const [word, setWord] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState(IStatus.PENDING);
  const [answer, setAnswer] = useState("");

  const checkWord = async () => {
    try {
      const { result, status, score, answer } = await checkGuess(id, word);

      setStatus(status);
      setScore(score);
      if (answer) setAnswer(answer?.toUpperCase());

      const newResult = result.map((x: string, i: number) => ({
        char: word[i],
        feedback: x,
      }));
      setResults((prevResults) => [newResult, ...prevResults]);
      setWord("");
    } catch (error) {
      console.error("Error on checking guess:", error);
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
      <Typography variant="h5" align="center" gutterBottom>
        Score: {score}
      </Typography>
      <Box sx={{ marginBottom: 2, display: "flex", gap: "5px" }}>
        <TextField
          label="Enter your guess (5 letters)"
          variant="outlined"
          fullWidth
          value={word}
          // TODO: Only allow 5 alphabetic characters input
          onChange={(e) => setWord(e.target.value?.toUpperCase())}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={checkWord}
          disabled={status !== IStatus.PENDING}
        >
          Check
        </Button>
      </Box>
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
                      padding: "15px",
                      margin: "5px 15px",
                    }}
                  >
                    <Typography variant="h5">{result.char}</Typography>
                  </Box>
                )
              )}
            </div>
          ))}
        </div>
      )}
      {status === IStatus.LOSE && (
        <Typography
          variant="h3"
          align="center"
          color="error"
          gutterBottom
          style={{ animation: "blinking 1s infinite" }}
        >
          The word was: {answer}
        </Typography>
      )}
      {status === IStatus.WIN && (
        <Typography
          variant="h3"
          align="center"
          color="success"
          gutterBottom
          style={{ animation: "blinking 1s infinite" }}
        >
          Win!
        </Typography>
      )}
    </Container>
  );
};

export default GamePage;
