import React, { useState, useEffect } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Pagination,
  TextField,
} from "@mui/material";

type ListViewProps = {
  items: string[];
  itemsPerPage: number;
  slot: (index: number) => React.ReactNode;
  sx: object;
};

const ListView: React.FC<ListViewProps> = ({
  items,
  itemsPerPage,
  slot,
  sx,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState<string[]>(items);

  // TODO: add debounce
  const handleSearchChange = (search: string) => {
    setSearchTerm(search);
  };

  useEffect(() => {
    const filtered = items.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
    setCurrentPage(1); // Reset to the first page when search term changes
  }, [searchTerm, items]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePagination = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <List sx={sx}>
      <Box sx={{ paddingX: 2 }}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          fullWidth
        />
      </Box>
      {currentItems.map((content: string, index: number) => (
        <ListItem key={content} sx={{ justifyContent: "space-between" }}>
          <ListItemText primary={content} />
          {slot(indexOfFirstItem + index)}
        </ListItem>
      ))}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, page) => handlePagination(page)}
        />
      </div>
    </List>
  );
};

export default ListView;
