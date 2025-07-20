import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useCallback, memo } from "react";
import { styled } from "@mui/material/styles";
import type { Column, SharedTableProps } from "../../../interfaces/Shared/Shared";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontFamily: "Inter, sans-serif",
  padding: "16px 20px",
  borderBottom: `1px solid ${theme.palette.divider}`,
  [`&.head`]: {
    color: theme.palette.text.primary,
    fontWeight: 600,
    fontSize: "12px",
    backgroundColor: theme.palette.mode === "dark" ? "#1f2937" : "#E2E5EB",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  [`&.body`]: {
    fontWeight: 400,
    color: theme.palette.text.primary,
    fontSize: "14px",
  },
  [theme.breakpoints.down("md")]: {
    padding: "12px 8px",
    fontSize: "12px",
    [`&.head`]: {
      fontSize: "10px",
    },
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.mode === "dark" ? "#1e293b" : "#ffffff",
  },
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.mode === "dark" ? "#273549" : "#F9FAFB",
  },
  "&:hover": {
    backgroundColor: theme.palette.mode === "dark" ? "#334155" : "#F3F4F6",
  },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "8px",
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 2px 8px rgba(0,0,0,0.6)"
      : "0 1px 3px rgba(0,0,0,0.1)",
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.down("md")]: {
    border: "none",
    borderRadius: "0",
    boxShadow: "none",
    backgroundColor: "transparent",
  },
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
  padding: "4px",
  color: theme.palette.text.secondary,
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "dark" ? "#1e293b" : "#F3F4F6",
    color: theme.palette.text.primary,
  },
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: "8px",
    border: `1px solid ${theme.palette.divider}`,
    boxShadow:
      "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
    minWidth: "160px",
    padding: "8px 0",
    backgroundColor: theme.palette.background.paper,
  },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  fontFamily: "Inter, sans-serif",
  fontSize: "14px",
  color: theme.palette.text.primary,
  padding: "8px 16px",
  minHeight: "40px",
  display: "flex",
  alignItems: "center",
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "dark" ? "#374151" : "#F3F4F6",
  },
  "& .MuiSvgIcon-root": {
    fontSize: "16px",
    color: theme.palette.text.secondary,
    marginRight: "12px",
  },
}));

// Mobile Card Component
const MobileCard = styled(Card)(({ theme }) => ({
  marginBottom: "12px",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "8px",
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 2px 8px rgba(0,0,0,0.6)"
      : "0 1px 3px rgba(0,0,0,0.1)",
  backgroundColor: theme.palette.background.paper,
}));

const MobileCardContent = styled(CardContent)(() => ({
  padding: "16px",
  "&:last-child": {
    paddingBottom: "16px",
  },
}));

const MobileRow = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "8px",
  "&:last-child": {
    marginBottom: "0",
  },
}));

const MobileLabel = styled(Typography)(({ theme }) => ({
  fontFamily: "Inter, sans-serif",
  fontSize: "12px",
  fontWeight: 600,
  color: theme.palette.text.secondary,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
}));

const MobileValue = styled(Typography)(({ theme }) => ({
  fontFamily: "Inter, sans-serif",
  fontSize: "14px",
  fontWeight: 400,
  color: theme.palette.text.primary,
  textAlign: "right",
}));

const PaginationContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "12px 16px",
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.down("md")]: {
    padding: "12px 8px",
  },
  "@media (min-width: 768px)": {
    flexDirection: "row",
  },
}));

const PageInfo = styled("span")(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginRight: "12px",
  fontSize: "14px",
  [theme.breakpoints.down("md")]: {
    fontSize: "12px",
    marginRight: "8px",
  },
}));

const PaginationButtons = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
}));

const PageButton = styled("button")(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: "transparent",
  color: theme.palette.text.primary,
  padding: "4px 8px",
  margin: "0 4px",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "14px",
  [theme.breakpoints.down("md")]: {
    padding: "6px 10px",
    fontSize: "12px",
  },
  "&:disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },
  "&:hover:not(:disabled)": {
    backgroundColor:
      theme.palette.mode === "dark" ? "#374151" : "#F3F4F6",
  },
}));

const PageSizeSelect = styled("select")(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "4px",
  padding: "4px 8px",
  margin: "0 8px",
  backgroundColor: "transparent",
  color: theme.palette.text.primary,
  fontSize: "14px",
  [theme.breakpoints.down("md")]: {
    padding: "6px 8px",
    fontSize: "12px",
    margin: "0 4px",
  },
}));

// Get most important columns for mobile (first 3 columns)
const getMobileColumns = (columns: Column<any>[]) => {
  return columns.slice(0, 3);
};

const TableRowMemo = memo(
  ({
    row,
    columns,
    onOpenMenu,
  }: {
    row: any;
    columns: Column<any>[];
    onOpenMenu: (event: React.MouseEvent<HTMLButtonElement>, row: any) => void;
  }) => (
    <StyledTableRow>
      {columns.map((col) => (
        <StyledTableCell
          key={col.id}
          align={col.align || "left"}
          className="body"
        >
          {col.render ? col.render(row) : row[col.id]}
        </StyledTableCell>
      ))}
      <StyledTableCell
        align="right"
        className="body"
        style={{ width: "80px", paddingRight: "12px" }}
      >
        <ActionButton onClick={(e) => onOpenMenu(e, row)}>
          <MoreVertIcon />
        </ActionButton>
      </StyledTableCell>
    </StyledTableRow>
  )
);

// Mobile Card Component
const MobileCardRow = memo(
  ({
    row,
    columns,
    onOpenMenu,
  }: {
    row: any;
    columns: Column<any>[];
    onOpenMenu: (event: React.MouseEvent<HTMLButtonElement>, row: any) => void;
  }) => {
    const mobileColumns = getMobileColumns(columns);
    
    return (
      <MobileCard>
        <MobileCardContent>
          {mobileColumns.map((col, index) => (
            <div key={col.id}>
              <MobileRow>
                <MobileLabel>{col.label}</MobileLabel>
                <MobileValue>
                  {col.render ? col.render(row) : row[col.id]}
                </MobileValue>
              </MobileRow>
              {index < mobileColumns.length - 1 && <Divider sx={{ my: 1 }} />}
            </div>
          ))}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <ActionButton onClick={(e) => onOpenMenu(e, row)}>
              <MoreVertIcon />
            </ActionButton>
          </Box>
        </MobileCardContent>
      </MobileCard>
    );
  }
);

export default function SharedTable<
  RowType extends Record<string, any> = Record<string, any>
>({
  columns,
  rows,
  totalResults = 0,
  currentPage = 1,
  itemsPerPage = 5,
  onPageChange,
  onPageSizeChange,
  onView,
  onEdit,
  onDelete,
}: SharedTableProps<RowType>) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<RowType | null>(null);
  const open = Boolean(anchorEl);
  const totalPages = Math.ceil(totalResults / itemsPerPage);

  const handleOpenMenu = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, row: RowType) => {
      setAnchorEl(event.currentTarget);
      setSelectedRow(row);
    },
    []
  );

  const handleCloseMenu = useCallback(() => {
    setAnchorEl(null);
    setSelectedRow(null);
  }, []);

  const handleAction = useCallback(
    (action: "view" | "edit" | "delete") => {
      if (!selectedRow) return;
      if (action === "view" && onView) onView(selectedRow);
      if (action === "edit" && onEdit) onEdit(selectedRow);
      if (action === "delete" && onDelete) onDelete(selectedRow);
      handleCloseMenu();
    },
    [selectedRow, onView, onEdit, onDelete, handleCloseMenu]
  );

  // Mobile View
  if (isMobile) {
    return (
      <Box>
        {rows.map((row, rowIndex) => (
          <MobileCardRow
            key={rowIndex}
            row={row}
            columns={columns}
            onOpenMenu={handleOpenMenu}
          />
        ))}

        <PaginationContainer>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ color: "#6B7280", marginRight: "8px", fontSize: "12px" }}>
              Showing
            </span>
            <PageSizeSelect
              value={itemsPerPage}
              onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </PageSizeSelect>
            <span style={{ color: "#6B7280", fontSize: "12px" }}>
              of {totalResults} Results
            </span>
          </div>

          <PaginationButtons>
            <PageInfo>
              Page {currentPage} of {totalPages}
            </PageInfo>
            <PageButton
              onClick={() => onPageChange?.(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ‹
            </PageButton>
            <PageButton
              onClick={() => onPageChange?.(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              ›
            </PageButton>
          </PaginationButtons>
        </PaginationContainer>

        <StyledMenu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
          {onView && (
            <StyledMenuItem onClick={() => handleAction("view")}>
              <VisibilityIcon sx={{ color: "blue !important" }} />
              View
            </StyledMenuItem>
          )}
          {onEdit && (
            <StyledMenuItem onClick={() => handleAction("edit")}>
              <EditIcon sx={{ color: "blue !important" }} />
              Edit
            </StyledMenuItem>
          )}
          {onDelete && (
            <StyledMenuItem onClick={() => handleAction("delete")}>
              <DeleteIcon sx={{ color: "blue !important" }} />
              Delete
            </StyledMenuItem>
          )}
        </StyledMenu>
      </Box>
    );
  }

  // Desktop View
  return (
    <StyledTableContainer>
      <Table sx={{ minWidth: 700, tableLayout: "fixed" }}>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <StyledTableCell
                key={col.id}
                align={col.align || "center"}
                className="head"
              >
                {col.label}
              </StyledTableCell>
            ))}
            <StyledTableCell
              align="center"
              className="head"
              style={{ width: "80px", paddingRight: "12px" }}
            />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRowMemo
              key={rowIndex}
              row={row}
              columns={columns}
              onOpenMenu={handleOpenMenu}
            />
          ))}
        </TableBody>
      </Table>

      <PaginationContainer>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
          <span style={{ color: "#6B7280", marginRight: "8px" }}>Showing</span>
          <PageSizeSelect
            value={itemsPerPage}
            onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </PageSizeSelect>
          <span style={{ color: "#6B7280" }}>of {totalResults} Results</span>
        </div>

        <PaginationButtons>
          <PageInfo>
            Page {currentPage} of {totalPages}
          </PageInfo>
          <PageButton
            onClick={() => onPageChange?.(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ‹
          </PageButton>
          <PageButton
            onClick={() => onPageChange?.(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            ›
          </PageButton>
        </PaginationButtons>
      </PaginationContainer>

      <StyledMenu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
        {onView && (
          <StyledMenuItem onClick={() => handleAction("view")}>
            <VisibilityIcon sx={{ color: "blue !important" }} />
            View
          </StyledMenuItem>
        )}
        {onEdit && (
          <StyledMenuItem onClick={() => handleAction("edit")}>
            <EditIcon sx={{ color: "blue !important" }} />
            Edit
          </StyledMenuItem>
        )}
        {onDelete && (
          <StyledMenuItem onClick={() => handleAction("delete")}>
            <DeleteIcon sx={{ color: "blue !important" }} />
            Delete
          </StyledMenuItem>
        )}
      </StyledMenu>
    </StyledTableContainer>
  );
}