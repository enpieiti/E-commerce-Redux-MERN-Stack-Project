import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
export const subscribeNewsletter = createAsyncThunk("newsletter/subscribe", async (email, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(API_PATHS.SUBSCRIBE.SUBSCRIBE, { email });
    // const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/subscribe`, { email });
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message || "Subscription failed");
  }
});

const newsletterSlice = createSlice({
  name: "newsletter",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetNewsletterState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(subscribeNewsletter.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(subscribeNewsletter.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(subscribeNewsletter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetNewsletterState } = newsletterSlice.actions;

export default newsletterSlice.reducer;
