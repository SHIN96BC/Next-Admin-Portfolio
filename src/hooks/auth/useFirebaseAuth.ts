import {signInWithEmailAndPassword, signOut, onAuthStateChanged} from "firebase/auth";
import {firebaseAuth} from "@Src/utils/firebase";
import {jwtDecode} from "jwt-decode";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import FilesService from "@Src/services/files/FilesService";
import useUser from "@Src/hooks/store/useUser";
// import LoadingAuth from "@Src/utils/Loading/LoadingAuth";

interface UseFirebaseAuth {
  isFirebaseLogin: boolean;
  isFirebaseLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

export default function useFirebaseAuth(): UseFirebaseAuth {
  const [isFirebaseLogin, setIsFirebaseLogin] = useState(false);
  const [isFirebaseLoading, setIsFirebaseLoading] = useState(true);
  const { updateUserInfo, deleteUserInfo } = useUser();
  const router = useRouter();

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(firebaseAuth, async (newUser) => {
      // setIsLoading(true);
      if (newUser) {
        // customLocalStorage.set(loginStateKey, {isLogin: true});

        const token = await newUser.getIdToken(true);

        FilesService.setToken(token);

        const userInfo: UserInfo = jwtDecode(token);

        console.log('newUser = ', newUser);
        console.log('userInfo = ', userInfo);

        updateUserInfo(userInfo);
        setIsFirebaseLogin(true);
        setIsFirebaseLoading(false);
      } else {
        setIsFirebaseLogin(false);
        setIsFirebaseLoading(false);
        // router.push('/login');

        // 로그아웃을 진행할 때는 로그인하라는 팝업을 막기 위해 time out 사용
        // setTimeout(() => {
        //   customLocalStorage.remove(loginStateKey);
        // }, 2000);
        // const loginToken = customLocalStorage.get(loginTokenKey);

      }
    });

    return () => unsubscribe();
  }, [updateUserInfo]);

  const login = async (email: string, password: string):Promise<boolean> => {
    // await signOut(firebaseAuth);

    let isSuccess: boolean = false;

    await signInWithEmailAndPassword(firebaseAuth, email, password)
      .then(() => {
        // customLocalStorage.set(loginStateKey, {isLogin: true});
        isSuccess = true;
      })
      .catch((error) => {
        throw error;
      });

    return isSuccess;
  };

  const logout = async (): Promise<void> => {
    // 자동로그인 토큰 삭제
    // customLocalStorage.remove(loginTokenKey);

    await signOut(firebaseAuth)
      .then(() => {
        console.log('logout');
        // customLocalStorage.set(loginStateKey, {isLogin: false});

        // 유저 정보 삭제
        deleteUserInfo();

        // router.replace('/');
      })
      .catch((error) => {
        throw error;
      });
  };

  return {
    isFirebaseLogin,
    isFirebaseLoading,
    login,
    logout,
  }
}