import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type SortId = {
  name: string,
  type: "rating" | "price" | "title"| "-rating" | "-price" | "-title";
}

export interface FilterSlaceState {
  searchValue: string,
  categoryId: number,
  sortId: SortId,
  currentPage: number,
};


export const initialState: FilterSlaceState = {
  searchValue: '',
  categoryId: 0,
  sortId: {name: "популярности", type: "rating"},
  currentPage: 1,
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<number>) => {
        state.categoryId = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setSortId: (state, action: PayloadAction<SortId>) => {
        state.sortId = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
        state.currentPage = action.payload;
    },
    setFilters: (state, action: PayloadAction<FilterSlaceState>) => {
      if (Object.keys(action.payload).length) {
        state.categoryId = Number(action.payload.categoryId);
        state.sortId = action.payload.sortId;
        state.currentPage = Number(action.payload.currentPage);
      } else {
        state.categoryId = 0;
        state.sortId = {name: "популярности", type: "rating"};
        state.currentPage = 1;
      }

    }
  },
})

// Action creators are generated for each case reducer function
export const { setCategoryId, setSortId,  setCurrentPage, setFilters, setSearchValue } = filterSlice.actions

export default filterSlice.reducer