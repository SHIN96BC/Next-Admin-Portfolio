import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SnackbarProps } from '@Src/types/snackbar';

const initialState: SnackbarProps = {
  action: false,
  open: false,
  message: 'Note archived',
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'right'
  },
  variant: 'default',
  alert: {
    color: 'primary',
    variant: 'filled'
  },
  transition: 'Fade',
  close: false,
  actionButton: false,
  maxStack: 3,
  dense: false,
  iconVariant: 'usedefault'
};

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    openSnackbar(state, action: PayloadAction<SnackbarProps>) {
      const { action: act, open, message, anchorOrigin, variant, alert, transition, close, actionButton } = action.payload;
      state.action = act || initialState.action;
      state.open = open || initialState.open;
      state.message = message || initialState.message;
      state.anchorOrigin = anchorOrigin || initialState.anchorOrigin;
      state.variant = variant || initialState.variant;
      state.alert = {
        color: alert?.color || initialState.alert.color,
        variant: alert?.variant || initialState.alert.variant
      };
      state.transition = transition || initialState.transition;
      state.close = close || initialState.close;
      state.actionButton = actionButton || initialState.actionButton;
    },
    closeSnackbar(state) {
      state.open = false;
    },
    updateMaxStack(state, action: PayloadAction<number>) {
      state.maxStack = action.payload;
    },
    updateDense(state, action: PayloadAction<boolean>) {
      state.dense = action.payload;
    },
    updateIconVariant(state, action: PayloadAction<string>) {
      state.iconVariant = action.payload;
    }
  }
});

export const {
  openSnackbar,
  closeSnackbar,
  updateMaxStack,
  updateDense,
  updateIconVariant
} = snackbarSlice.actions;

export default snackbarSlice.reducer;
