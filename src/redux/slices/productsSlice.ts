import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Sort } from "./filterSlice";
import { RootState } from "../store";

export type SearchProductParams = {
    currentPage: string,
    search: string,
    category: string,
    sortBy: string, 
    order: string
}

export const fetchProducts = createAsyncThunk('products/fetchProductsStatus', async (params: SearchProductParams) => {
    const {currentPage, search, category, sortBy, order} = params;
    const {data} = await axios.get<Product[]>(`https://6458ed6a8badff578efef80d.mockapi.io/items?page=${currentPage}&limit=4${search}${category}&sortBy=${sortBy}&order=${order}`);
    return data as Product[];
}); 

export type Product = {
    id: string;
    imageUrl: string;
    title: string;
    price: number;
    sizes: number;
    types: string;
    count: number;
}

export enum Status {
    LOADING = 'loading',
    SUCCEEDED = 'succeeded',
    FAILED = 'failed',
}
export interface ProductSliceState {
    items: Product[];
    status: Status;
}

export const initialState: ProductSliceState = {
  items: [],
  status: Status.LOADING,
};


export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Product[]>) => {
        state.items = action.payload;
        },
  },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.status = Status.LOADING;
            state.items = [];
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = Status.SUCCEEDED;
            state.items = action.payload;
        });
        builder.addCase(fetchProducts.rejected, (state) => {
            state.status = Status.FAILED;
            state.items = [];
        });
    },
});

export const selectProductData = (state: RootState) => state.products;
// Action creators are generated for each case reducer function
export const { setItems } = productsSlice.actions;

export default productsSlice.reducer;