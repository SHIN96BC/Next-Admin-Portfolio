import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface UserState {
  userInfo: UserInfo | undefined;
}

const initialState: UserState = {
  userInfo: undefined,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<UserInfo>) {
      state.userInfo = action.payload;
    },
    clearUserInfo(state) {
      state.userInfo = undefined;
    }
  }
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;

export default userSlice.reducer;