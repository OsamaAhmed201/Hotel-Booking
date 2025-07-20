
 export interface User {
  _id: string;
  userName: string;
  role: string;
}

export interface AuthContextProps {
  user: User | null;             
  currentUser: User | null;   
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  getCurrentUser: () => Promise<void>; 
    userLoading: boolean;
}
export interface User {
  _id: string;
  userName: string;
  email: string;
  country?: string;
  createdAt: string;
  updatedAt: string;
  profileImage?: string; // ✅ Add this line
  // ... any other fields
}