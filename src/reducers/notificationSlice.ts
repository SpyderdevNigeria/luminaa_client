import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../api/apiConfig";


export interface Notification {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  selectedNotification: Notification | null;
  loading: boolean;
  detailLoading: boolean;
  page: number;
  limit: number;
  error: string | null;
}

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
  selectedNotification: null,
  loading: false,
  detailLoading: false,
  page: 1,
  limit: 10,
  error: null,
};


export const fetchNotifications = createAsyncThunk(
  "notifications/fetchAll",
  async ({ page, limit }: { page: number; limit: number }, { rejectWithValue }) => {
    try {
      const res = await api.get(`/notifications`, { params: { page, limit } });
      return res.data?.data?.data || [];
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to fetch notifications");
    }
  }
);


export const fetchUnreadCount = createAsyncThunk(
  "notifications/fetchUnreadCount",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(`/notifications/unread-count`);
      return res.data?.data?.count || 0;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to fetch unread count");
    }
  }
);


export const viewNotification = createAsyncThunk(
  "notifications/viewOne",
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.get(`/notifications/${id}`);
      const data = res.data?.data;

      // Mark as read if unread
      if (!data?.isRead) {
        await dispatch(markAsRead(id));
        await dispatch(fetchUnreadCount());
      }

      return data;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to get notification");
    }
  }
);


export const markAsRead = createAsyncThunk(
  "notifications/markAsRead",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.patch(`/notifications/${id}/read`);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to mark as read");
    }
  }
);


export const markAllAsRead = createAsyncThunk(
  "notifications/markAllAsRead",
  async (_, { rejectWithValue }) => {
    try {
      await api.patch(`/notifications/read-all`);
      return true;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to mark all as read");
    }
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    clearSelected(state) {
      state.selectedNotification = null;
    },
  },
  extraReducers: (builder) => {
    builder
  
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

     
      .addCase(fetchUnreadCount.fulfilled, (state, action) => {
        state.unreadCount = action.payload;
      })

   
      .addCase(viewNotification.pending, (state) => {
        state.detailLoading = true;
      })
      .addCase(viewNotification.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.selectedNotification = action.payload;
      })
      .addCase(viewNotification.rejected, (state, action) => {
        state.detailLoading = false;
        state.error = action.payload as string;
      })

     
      .addCase(markAsRead.fulfilled, (state, action) => {
        state.notifications = state.notifications.map((n) =>
          n.id === action.payload ? { ...n, isRead: true } : n
        );
      })

    
      .addCase(markAllAsRead.fulfilled, (state) => {
        state.notifications = state.notifications.map((n) => ({
          ...n,
          isRead: true,
        }));
        state.unreadCount = 0;
      });
  },
});

export const { setPage, clearSelected } = notificationSlice.actions;
export default notificationSlice.reducer;
