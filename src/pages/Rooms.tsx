import React from "react";
import ListView from "../components/ListView";
import { Button } from "@mui/material";

const RoomsPage = () => {
  const handleJoinRoom = (index: number) => {};

  return (
    <>
      <ListView
        items={["test"]}
        itemsPerPage={10}
        slot={(index: number) => (
          <Button variant="contained" onClick={() => handleJoinRoom(index)}>
            Join
          </Button>
        )}
        sx={{
          border: "1px solid black",
          borderRadius: "10px",
          maxWidth: 500,
        }}
      />
    </>
  );
};

export default RoomsPage;
