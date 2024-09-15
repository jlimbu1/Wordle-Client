import React, { useState, useEffect } from "react";
import { Typography, TextField, Box } from "@mui/material";

const SettingsPage = () => {
  // Load the number of guesses from localStorage, defaulting to 5
  const initialGuesses = parseInt(
    localStorage.getItem("numberOfGuesses") ?? "5"
  );
  const [numberOfGuesses, setNumberOfGuesses] = useState(initialGuesses);

  // Update localStorage whenever numberOfGuesses changes
  useEffect(() => {
    localStorage.setItem("numberOfGuesses", numberOfGuesses.toString());
  }, [numberOfGuesses]);

  const handleNumberOfGuessesChange = () => {
    if (!isNaN(numberOfGuesses)) setNumberOfGuesses(numberOfGuesses);
  };

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h3" gutterBottom>
        Settings
      </Typography>
      <TextField
        id="outlined-number"
        label="Number of guesses"
        type="number"
        value={numberOfGuesses}
        onChange={handleNumberOfGuessesChange}
      />
    </Box>
  );
};

export default SettingsPage;
