import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum SortTypeEnum {
  RATING_DESC = "rating",
  RATING_ASC = "-rating",
  PRICE_DESC = "price",
  PRICE_ASC = "-price",
  TITLE_DESC = "title",
  TITLE_ASC = "-title",
}

export type Sort = {
  name: string,
  type: SortTypeEnum;
}

export interface FilterSlaceState {
  searchValue: string,
  categoryId: number,
  sortId: Sort,
  currentPage: number,
};


export const initialState: FilterSlaceState = {
  searchValue: '',
  categoryId: 0,
  sortId: {name: "популярности", type: SortTypeEnum.RATING_DESC},
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
    setSortId: (state, action: PayloadAction<Sort>) => {
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
        state.sortId = {name: "популярности", type: SortTypeEnum.RATING_DESC};
        state.currentPage = 1;
      }

    }
  },
})

export const selectFilters = (state: RootState) => state.filter;
export const SelectSort = (state: RootState) => state.filter.sortId;

export const { setCategoryId, setSortId,  setCurrentPage, setFilters, setSearchValue } = filterSlice.actions

export default filterSlice.reducer