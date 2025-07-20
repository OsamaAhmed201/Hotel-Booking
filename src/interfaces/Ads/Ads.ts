import type { RoomDetails } from "../Rooms/Rooms";

export interface AdCreatedBy {
  _id: string;
  userName: string;
}


export interface Ad {
  _id: string;
  isActive: boolean;
  room: RoomDetails | null; 
  createdBy: AdCreatedBy; 
  createdAt: string;
  updatedAt: string;
}
