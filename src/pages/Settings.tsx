import React, { useState, useEffect } from "react";
import {
  Divider,
  Typography,
  TextField,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { getAllWords } from "../apis/Game";
import AddIcon from "@mui/icons-material/add";
import ClearIcon from "@mui/icons-material/clear";

const SettingsPage = () => {
  const initialGuesses = parseInt(
    localStorage.getItem("numberOfGuesses") ?? "5"
  );
  const [numberOfGuesses, setNumberOfGuesses] = useState(initialGuesses);
  const [wordList, setWordList] = useState<string[]>([]);
  const [newWord, setNewWord] = useState("");

  const handleNumberOfGuessesChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) setNumberOfGuesses(value);
  };

  const fetchWordList = async () => {
    try {
      const res = await getAllWords();
      if (res.length > 0) setWordList(res.sort());
    } catch (error) {
      console.error("Error fetching word list:", error);
    }
  };

  useEffect(() => {
    fetchWordList();
  }, []);

  const handleAddWord = () => {
    // Perform validation for new word on server before adding
    if (newWord.trim() !== "") {
      setWordList([...wordList, newWord.trim()].sort());
      setNewWord("");
    }
  };

  const handleRemoveWord = (index: number) => {
    const updatedWordList = wordList.filter((_, i) => i !== index).sort();
    setWordList(updatedWordList);
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
