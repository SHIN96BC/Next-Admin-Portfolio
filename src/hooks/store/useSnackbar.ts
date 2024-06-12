import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@Src/lib/store';
import { SnackbarProps } from '@Src/types/snackbar';
import {
  openSnackbar as openSnackbarAction,
  closeSnackbar as closeSnackbarAction,
  updateMaxStack,
  updateDense,
  updateIconVariant
} from '@Src/lib/features/common/snackbarSlice';

export default function useSnackbar() {
  const dispatch = useDispatch<AppDispatch>();
  const snackbar = useSelector((state: RootState) => state.snackbar);

  const openSnackbar = (snackbar: SnackbarProps) => {
    dispatch(openSnackbarAction(snackbar));
  };

  const closeSnackbar = () => {
    dispatch(closeSnackbarAction());
  };

  const handlerIncrease = (maxStack: number) => {
    dispatch(updateMaxStack(maxStack));
  };

  const handlerDense = (dense: boolean) => {
    dispatch(updateDense(dense));
  };

  const handlerIconVariants = (iconVariant: string) => {
    dispatch(updateIconVariant(iconVariant));
  };

  return {
    snackbar,
    openSnackbar,
    closeSnackbar,
    handlerIncrease,
    handlerDense,
    handlerIconVariants
  };
}
