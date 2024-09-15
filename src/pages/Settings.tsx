import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/add";
import ClearIcon from "@mui/icons-material/clear";
import { words } from "../data/data";

const SettingsPage = () => {
  const localGuesses = parseInt(localStorage.getItem("numberOfGuesses") ?? "5");
  const localWordList = JSON.parse(
    localStorage.getItem("wordList") ?? JSON.stringify(words)
  );

  const [numberOfGuesses, setNumberOfGuesses] = useState(localGuesses);
  const [wordList, setWordList] = useState<string[]>([]);
  const [newWord, setNewWord] = useState("");

  useEffect(() => {
    setWordList(localWordList);
  }, []);

  // TODO: add debounce
  const handleNumberOfGuessesChange = (e: any) => {
    const value = parseInt(e.target.value);
    if (isNaN(value)) return;

    setNumberOfGuesses(value);
    localStorage.setItem("numberOfGuesses", value.toString());
  };

  const handleAddWord = () => {
    // TODO: Perform validation for new word on server before adding (eg. check if new word is 5 letter)
    const isExist = wordList.some((x) => x === newWord.toLowerCase());
    if (newWord.trim() === "" && isExist) return;

    const updatedWordList = [...wordList, newWord.trim().toLowerCase()].sort();
    setWordList(updatedWordList);
    setNewWord("");
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
        type="number"
        value={numberOfGuesses}
        onChange={handleNumberOfGuessesChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <Box sx={{ marginBottom: 2, display: "flex", gap: "5px" }}>
        <TextField
          label="Add New Word"
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={handleAddWord}>
          <AddIcon />
        </Button>
      </Box>
      <List
        sx={{
          border: "1px solid black",
          borderRadius: "10px",
          maxWidth: 500,
          margin: "auto",
          maxHeight: 200,
          overflowY: "auto",
        }}
      >
        {wordList.map((word, index) => (
          <ListItem key={index} sx={{ justifyContent: "space-between" }}>
            <ListItemText primary={word} />
            <IconButton
              color="error"
              onClick={() => handleRemoveWord(index)}
              aria-label="remove word"
            >
              <ClearIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SettingsPage;
