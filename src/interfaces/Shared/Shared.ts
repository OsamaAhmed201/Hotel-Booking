export type HeaderProps = {
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
};

export type Column<RowType = Record<string, unknown>> = {
  id: string;
  label: string;
  align?: "left" | "right" | "center";
  render?: (row: RowType) => React.ReactNode;
  width?: string;
};

export type SharedTableProps<RowType extends Record<string, any>> = {
  columns: Column<RowType>[];
  rows: RowType[];
  totalResults?: number;
  currentPage?: number;
  itemsPerPage?: number;
  onPageChange?: (newPage: number) => void;
  onPageSizeChange?: (newSize: number) => void;
  onView?: (row: RowType) => void;
  onEdit?: (row: RowType) => void;
  onDelete?: (row: RowType) => void;
};

export interface Room {
  _id: string;
  roomNumber: string;
  capacity: number;
  discount: number;
  price: number;
  images: string[];
  facilities: {
    _id: string;
    name: string;
  }[];
}