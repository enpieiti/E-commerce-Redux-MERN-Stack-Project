import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
// Fetch all users (admin only)
export const fetchUsers = createAsyncThunk("admin/fetchUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(API_PATHS.USER_ADMIN.GET_ALL);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Add user
export const addUser = createAsyncThunk("admin/addUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(API_PATHS.USER_ADMIN.CREATE, userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Update user
export const updateUser = createAsyncThunk("admin/updateUser", async ({ id, name, email, role }) => {
  const response = await axiosInstance.put(API_PATHS.USER_ADMIN.UPDATE(id), { name, email, role });
  return response.data.user;
});

// Delete user
export const deleteUser = createAsyncThunk("admin/deleteUser", async (id, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.delete(API_PATHS.USER_ADMIN.DELETE(id));
    return response.data.user;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const adminUserSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // Update user
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload;
        const index = state.users.findIndex((user) => user._id === updatedUser._id);
        if (index !== -1) {
          state.users[index] = updatedUser;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // Delete user
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload._id);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // Add user
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload.user);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default adminUserSlice.reducer;
