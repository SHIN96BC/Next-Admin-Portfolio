import { configureStore } from '@reduxjs/toolkit';
import menuReducer from '@Src/lib/features/menus/menuSlice';
import userReducer from '@Src/lib/features/users/userSlice';
import snackbarReducer from '@Src/lib/features/common/snackbarSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      menus: menuReducer,
      users: userReducer,
      snackbar: snackbarReducer,
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];