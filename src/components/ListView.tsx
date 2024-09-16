import { List, ListItem, ListItemText, Pagination } from "@mui/material";

type ListViewProps = {
  currentItems: string[];
  slot: (index: number) => React.ReactNode;
  sx: object;
  totalPages: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
};

const ListView: React.FC<ListViewProps> = ({
  currentItems,
  slot,
  sx,
  totalPages,
  currentPage,
  paginate,
}) => {
  return (
    <>
      <List sx={sx}>
        {currentItems.map((content: string, index: number) => (
          <ListItem key={content} sx={{ justifyContent: "space-between" }}>
            <ListItemText primary={content} />
            {slot(index)}
          </ListItem>
        ))}
      </List>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(event, page) => paginate(page)}
        sx={{ marginTop: 2, justifyContent: "center" }}
      />
    </>
  );
};

export default ListView;
