import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

// Async thunk to create a checkout session
export const createCheckout = createAsyncThunk("checkout/createCheckout", async (checkoutdata, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(API_PATHS.CHECKOUT.CREATE, checkoutdata);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Thanh toán thành công
export const payCheckout = createAsyncThunk(
  "checkout/payCheckout",
  async ({ checkoutId, paymentDetails }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(API_PATHS.CHECKOUT.MARK_AS_PAID(checkoutId), {
        paymentStatus: "paid",
        paymentDetails,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Hoàn tất thanh toán
export const finalizeCheckout = createAsyncThunk(
  "checkout/finalizeCheckout",
  async (checkoutId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(API_PATHS.CHECKOUT.FINALIZE(checkoutId));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const checkoutSlice = createSlice({
  name: "Checkout",
  initialState: {
    checkout: null,
    order: null,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    // Handle createCheckout
    builder.addCase(createCheckout.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createCheckout.fulfilled, (state, action) => {
      state.loading = false;
      state.checkout = action.payload;
    });
    builder.addCase(createCheckout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "An error occurred while creating the checkout.";
    });

    // Handle payCheckout
    builder.addCase(payCheckout.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(payCheckout.fulfilled, (state, action) => {
      state.loading = false;
      state.checkout = action.payload;
      console.log(action.payload);
    });
    builder.addCase(payCheckout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "Payment failed.";
    });

    // Handle finalizeCheckout
    builder.addCase(finalizeCheckout.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(finalizeCheckout.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload;
    });
    builder.addCase(finalizeCheckout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "Failed to finalize checkout.";
    });
  },
});

export default checkoutSlice.reducer;
