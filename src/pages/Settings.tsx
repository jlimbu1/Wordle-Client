import React, { useState, useEffect } from "react";
import { Typography, TextField, Box, Button, IconButton } from "@mui/material";
import { Add as AddIcon, Clear as ClearIcon } from "@mui/icons-material";
import ListView from "../components/ListView";
import debounce from "lodash";

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

  const debouncedHandleNumberOfGuessesChange = debounce((value: number) => {
    localStorage.setItem("numberOfGuesses", value.toString());
  }, 1000);

  const handleNumberOfGuessesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(e.target.value);
    if (isNaN(value)) return;

    setNumberOfGuesses(value);
    debouncedHandleNumberOfGuessesChange(value);
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
    <Box
      sx={{ textAlign: "center", maxWidth: 400, margin: "auto", padding: 2 }}
    >
      <Typography variant="h3" gutterBottom>
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
          maxWidth: 500,
        }}
      />
    </Box>
  );
};

export default SettingsPage;
