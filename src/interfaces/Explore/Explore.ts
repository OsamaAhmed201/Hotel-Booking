export interface Facility {
  _id: string;
  name: string;
}

export interface Room {
  _id: string;
  roomNumber: string;
  images: string[];
  price: number;
  discount: number;
  capacity: number;
  description: string;
  facilities: Facility[];
  createdAt: string;
  createdBy: {
    _id: string;
    userName: string;
    email: string;
    role: string;
  };
  updatedAt: string;
  isBooked: boolean;
}