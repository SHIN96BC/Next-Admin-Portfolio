import "@firebase/auth";

declare global {
  // firebase의 UserInfo 객체를 필요에 의해 확장
  export interface UserInfo {
    aud: string;
    user_id: string;
    name: string;
    email: string;
    scope: string;
    firebase: {
      sign_in_provider: string;
    };
  }
}