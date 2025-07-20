
export interface RoomToEdit {
  _id: string;
  name: string;
  image: string;
  price: number;
  discount: number;
  capacity: number;
  category: string;
}

export interface RoomFormData {
  roomNumber: string;
  imgs: FileList | null;
  price: number | null;
  capacity: number | null;
  discount: number | null;
  facilities: string[];
}



export interface RoomDetails {
  _id: string;
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
  facilities: string[];
  createdBy: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}


export interface RoomOption {
  _id: string;
  roomNumber: string;
}