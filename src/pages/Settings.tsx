import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Box,
  Button,
  IconButton,
  Container,
} from "@mui/material";
import { Add as AddIcon, Clear as ClearIcon } from "@mui/icons-material";
import ListView from "../components/ListView";
import { words } from "../data/data";

const SettingsPage = () => {
  const localMaxGuesses = parseInt(
    localStorage.getItem("numberOfGuesses") ?? "5"
  );
  const localWordList = JSON.parse(
    localStorage.getItem("wordList") ?? JSON.stringify(words)
  );

  const [numberOfGuesses, setNumberOfGuesses] = useState(localMaxGuesses);
  const [wordList, setWordList] = useState<string[]>(localWordList);
  const [inputWord, setInputWord] = useState("");

  useEffect(() => {
    setWordList(localWordList);
  }, []);

  const handleNumberOfGuessesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(e.target.value);
    if (isNaN(value)) return;

    setNumberOfGuesses(value);
    localStorage.setItem("numberOfGuesses", value.toString());
  };

  const handleAddWord = () => {
    const isExist = wordList.some((x) => x === inputWord.trim().toLowerCase());
    if (inputWord.trim() === "" || isExist) return;

    const updatedWordList = [
      ...wordList,
      inputWord.trim().toLowerCase(),
    ].sort();
    setWordList(updatedWordList);
    setInputWord("");
    localStorage.setItem("wordList", JSON.stringify(updatedWordList));
  };

  const handleRemoveWord = (index: number) => {
    const updatedWordList = wordList.filter((_, i) => i !== index).sort();
    setWordList(updatedWordList);
    localStorage.setItem("wordList", JSON.stringify(updatedWordList));
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Typography variant="h3" align="center" gutterBottom>
        Settings
      </Typography>
      <TextField
        id="outlined-number"
        label="Number of guesses"
        variant="outlined"
        fullWidth
        type="number"
        value={numberOfGuesses}
        onChange={handleNumberOfGuessesChange}
        sx={{ marginBottom: 2 }}
      />
      <Box sx={{ marginBottom: 2, display: "flex", gap: "5px" }}>
        <TextField
          label="Add New Word"
          variant="outlined"
          fullWidth
          value={inputWord}
          onChange={(e) => setInputWord(e.target.value)}
        />
        <Button variant="contained" onClick={handleAddWord}>
          <AddIcon />
        </Button>
      </Box>
      <ListView
        items={wordList}
        itemsPerPage={10}
        slot={(index: number) => (
          <IconButton
            color="error"
            onClick={() => handleRemoveWord(index)}
            aria-label="remove word"
          >
            <ClearIcon />
          </IconButton>
        )}
        sx={{
          border: "1px solid black",
          borderRadius: "10px",
          maxWidth: 550,
        }}
      />
    </Container>
  );
};

export default SettingsPage;
