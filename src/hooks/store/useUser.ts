import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@Src/lib/store";
import {clearUserInfo, setUserInfo} from "@Src/lib/features/users/userSlice";

export default function useUser() {
  const dispatch = useDispatch<AppDispatch>();
  const userState = useSelector((state: RootState) => state.users);

  const updateUserInfo = (userInfo: UserInfo) => dispatch(setUserInfo(userInfo));
  const deleteUserInfo = () => dispatch(clearUserInfo());

  return {
    userInfo: userState.userInfo,
    updateUserInfo,
    deleteUserInfo,
  };
}