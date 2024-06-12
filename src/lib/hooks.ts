import { useDispatch, useSelector, useStore } from 'react-redux'
import type { AppDispatch, AppStore, RootState } from './store'

// React-Redux v7.1.0 버전부터 useDispatch와 useSelector가 내장된 타입 지원을 제공하도록 변경되었기 때문에 withTypes 메서드를 사용하지 않고도 타입 안정성을 유지할 수 있습니다.
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();