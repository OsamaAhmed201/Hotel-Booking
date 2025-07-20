export interface Booking {
  _id: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  user: {
    _id: string;
    userName: string;
  } | null;
  room: {
    _id: string;
    roomNumber: string;
  } | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserBookings {
  _id: string;
  startDate: string; 
  endDate: string;
  totalPrice: number;
  user: {
    _id: string;
  };
  room: string;
  status: "Pending" | "Completed" ; 
  createdAt: string;
  updatedAt: string;

}