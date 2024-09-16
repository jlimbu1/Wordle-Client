import React from "react";
import { Box, Typography } from "@mui/material";

type ListViewProps = {
  guesses: any[];
};

const ListGuesses: React.FC<ListViewProps> = ({ guesses }) => {
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
    <>
      {guesses.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          {guesses.map((results, guessIndex) => (
            <div key={guessIndex} style={{ marginBottom: "10px" }}>
              {results.map(
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
    </>
  );
};

export default ListGuesses;
