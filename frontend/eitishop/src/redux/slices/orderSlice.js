import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

// Async Thunk to fetch user orders
export const fetchUserOrders = createAsyncThunk("orders/fetchUserOrders", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(API_PATHS.ORDER.GET_MY_ORDERS);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Async Thunk to fetch orders details by ID
export const fetchOrderDetails = createAsyncThunk("orders/fetchOrderDetails", async (orderId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(API_PATHS.ORDER.GET_BY_ID(orderId));
    return response.data;
  } catch (error) {
    rejectWithValue(error.response.data);
  }
});

// slice
const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    totalOrders: 0,
    orderDetails: null,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      // Fetch user orders
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      // Fetch order details
      .addCase(fetchOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default orderSlice.reducer;
