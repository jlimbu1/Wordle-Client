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
import { Add as AddIcon, Clear as ClearIcon } from "@mui/icons-material";
import { words } from "../data/data";
import { debounce } from "lodash";

const SettingsPage = () => {
  const localGuesses = parseInt(localStorage.getItem("numberOfGuesses") ?? "5");
  const localWordList = JSON.parse(
    localStorage.getItem("wordList") ?? JSON.stringify(words)
  );

  const [numberOfGuesses, setNumberOfGuesses] = useState(localGuesses);
  const [wordList, setWordList] = useState<string[]>(localWordList);
  const [inputWord, setInputWord] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setWordList(localWordList);
  }, []);

  const debouncedHandleNumberOfGuessesChange = debounce((value: number) => {
    localStorage.setItem("numberOfGuesses", value.toString());
  }, 300);

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = wordList.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handlePageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pageNumber = parseInt(e.target.value);

    if (
      pageNumber > 0 &&
      pageNumber <= Math.ceil(wordList.length / itemsPerPage)
    ) {
      setCurrentPage(pageNumber);
    }
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
      <List
        sx={{
          border: "1px solid black",
          borderRadius: "10px",
          maxWidth: 500,
          maxHeight: 400,
          overflowY: "scroll",
        }}
      >
        {currentItems.map((word, index) => (
          <ListItem key={word} sx={{ justifyContent: "space-between" }}>
            <ListItemText primary={word} />
            <IconButton
              color="error"
              onClick={() => handleRemoveWord(indexOfFirstItem + index)}
              aria-label="remove word"
            >
              <ClearIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ margin: 2, display: "flex", gap: "5px" }}>
        <Button
          variant="outlined"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<"}
        </Button>
        <TextField
          label="Page"
          type="number"
          variant="outlined"
          size="small"
          value={currentPage}
          onChange={handlePageChange}
        />
        <Button
          variant="outlined"
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastItem >= wordList.length}
        >
          {">"}
        </Button>
      </Box>
    </Box>
  );
};

export default SettingsPage;
