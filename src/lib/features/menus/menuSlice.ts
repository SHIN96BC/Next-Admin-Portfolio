import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MenuState {
  openedItem: string;
  openedComponent: string;
  openedHorizontalItem: string | null;
  isMainDrawerOpened: boolean;
  isComponentDrawerOpened: boolean;
}

const initialState: MenuState = {
  openedItem: 'dashboard',
  openedComponent: 'buttons',
  openedHorizontalItem: null,
  isMainDrawerOpened: false,
  isComponentDrawerOpened: true,
};

const menuSlice = createSlice({
  name: 'menus',
  initialState,
  reducers: {
    setOpenedItem(state, action: PayloadAction<string>) {
      state.openedItem = action.payload;
    },
    setOpenedComponent(state, action: PayloadAction<string>) {
      state.openedComponent = action.payload;
    },
    setOpenedHorizontalItem(state, action: PayloadAction<string | null>) {
      state.openedHorizontalItem = action.payload;
    },
    setMainDrawerOpened(state, action: PayloadAction<boolean>) {
      state.isMainDrawerOpened = action.payload;
    },
    setComponentDrawerOpened(state, action: PayloadAction<boolean>) {
      state.isComponentDrawerOpened = action.payload;
    },
  },
});

export const {
  setOpenedItem,
  setOpenedComponent,
  setOpenedHorizontalItem,
  setMainDrawerOpened,
  setComponentDrawerOpened,
} = menuSlice.actions;

export default menuSlice.reducer;
