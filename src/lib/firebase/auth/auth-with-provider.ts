import {
  AuthError,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
} from "firebase/auth";

import { firebaseAuthenticationAPIErrors } from "./auth-with-email";

export async function firebaseGoogleSignin() {
  const data: { error: boolean; detail: object | string } = {
    error: false,
    detail: {},
  };

  try {
    // Signed in
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);
    data.error = false;
    data.detail = res.user;
  } catch (error) {
    const errorMessage = (error as AuthError).message;
    data.error = true;
    data.detail =
      firebaseAuthenticationAPIErrors[errorMessage] ||
      "Unexpected error occurred!";
  }

  return data;
}
