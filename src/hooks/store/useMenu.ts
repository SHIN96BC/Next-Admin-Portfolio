import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@Src/lib/store';
import {
  setOpenedItem,
  setOpenedComponent,
  setOpenedHorizontalItem,
  setMainDrawerOpened,
  setComponentDrawerOpened,
} from '@Src/lib/features/menus/menuSlice';

export default function useMenu() {
  const dispatch = useDispatch<AppDispatch>();
  const menuState = useSelector((state: RootState) => state.menus);

  const updateOpenedItem = (item: string) => dispatch(setOpenedItem(item));
  const updateOpenedComponent = (component: string) => dispatch(setOpenedComponent(component));
  const updateOpenedHorizontalItem = (item: string | null) => dispatch(setOpenedHorizontalItem(item));
  const updateMainDrawerOpened = (isOpen: boolean) => dispatch(setMainDrawerOpened(isOpen));
  const updateComponentDrawerOpened = (isOpen: boolean) => dispatch(setComponentDrawerOpened(isOpen));

  return {
    ...menuState,
    updateOpenedItem,
    updateOpenedComponent,
    updateOpenedHorizontalItem,
    updateMainDrawerOpened,
    updateComponentDrawerOpened,
  };
}
