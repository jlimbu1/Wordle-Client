import { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { checkGuess } from "../../apis/Game";
import { useParams } from "react-router-dom";
import { status as IStatus } from "../../interfaces";
import ListGuesses from "../../components/ListGuesses";

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

      const newResult = {
        user: "You",
        result: result.map((feedback: string, i: number) => ({
          char: word[i],
          feedback,
        })),
      };
      setResults((prevResults) => [newResult, ...prevResults]);
      setWord("");
    } catch (error) {
      console.error("Error on checking guess:", error);
    }
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
      <Typography variant="h5" align="center" gutterBottom>
        Score: {score}
      </Typography>
      <ListGuesses guesses={results} />
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
