import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../types/Interfaces';

interface UserState {
  users: IUser[];
  error: string | null;
  total: number;
  limit: number;
  totalPages: number;
  page: number;
}

const initialState: UserState = {
  users: [],
  error: null,
  total: 0,
  limit: 10,
  totalPages: 0,
  page: 1,
};

// Payload type for full user response
interface UserResponsePayload {
  data: IUser[];
  total: number;
  limit: number;
  totalPages: number;
  page: number;
}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<IUser>) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action: PayloadAction<IUser>) => {
      const index = state.users.findIndex(u => u.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(u => u.id !== action.payload);
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setUsers: (state, action: PayloadAction<IUser[]>) => {
      state.users = action.payload;
    },
    setAllUsers: (state, action: PayloadAction<UserResponsePayload>) => {
      state.users = action.payload.data;
      state.total = action.payload.total;
      state.limit = action.payload.limit;
      state.totalPages = action.payload.totalPages;
      state.page = action.payload.page;
    },
    setUserPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  }
});

export const {
  addUser,
  updateUser,
  deleteUser,
  setError,
  clearError,
  setUsers,
  setAllUsers,
  setUserPage,
} = userSlice.actions;

export default userSlice.reducer;
