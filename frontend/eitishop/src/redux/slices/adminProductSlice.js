import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

// async thunk to fetch admin products
export const fetchAdminProducts = createAsyncThunk("adminProducts/fetchProducts", async () => {
  const response = await axiosInstance.get(API_PATHS.PRODUCT_ADMIN.GET_ALL);
  return response.data;
});

// async function to create a new product
export const createProduct = createAsyncThunk("adminProducts/createProduct", async (productData) => {
  const response = await axiosInstance.post(API_PATHS.PRODUCT.CREATE, productData);
  return response.data;
});

// async thunk to update an existing product
export const updateProduct = createAsyncThunk("adminProducts/updateProduct", async ({ id, productData }) => {
  const response = await axiosInstance.put(API_PATHS.PRODUCT.UPDATE(id), productData);
  return response.data;
});

// async thunk to delete a product
export const deleteProduct = createAsyncThunk("adminProducts/deleteProduct", async (id) => {
  await axiosInstance.delete(API_PATHS.PRODUCT.DELETE(id));
  return id;
});

const adminProductSlice = createSlice({
  name: "adminProducts",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Create Product
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      // Update Product
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex((product) => product._id === action.payload._id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })

      // Delete Product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((product) => product._id !== action.payload);
      });
  },
});

export default adminProductSlice.reducer;
