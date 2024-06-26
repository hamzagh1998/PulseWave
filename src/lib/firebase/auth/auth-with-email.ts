import {
  getAuth,
  createUserWithEmailAndPassword,
  AuthError,
  signInWithEmailAndPassword,
} from "firebase/auth";

type FirebaseAuthErrors = {
  [key: string]: string;
};

export const firebaseAuthenticationAPIErrors: FirebaseAuthErrors = {
  "Firebase: Error (auth/email-already-in-use).":
    "The provided email is already in use by an existing user!",
  "Firebase: Error (auth/email-already-exists).":
    "The provided email is already in use by an existing user!",
  "Firebase: Error (auth/id-token-expired).":
    "The provided ID token is expired!",
  "Firebase: Error (auth/invalid-email).": "Invalid email",
  "Firebase: Error (auth/invalid-password).": "Invalid password!",
  "Firebase: Error (auth/invalid-credential).": "Invalid credential!",
  "Firebase: Error (auth/internal-error).": "Unexpected error!",
};

export type UserData = {
  accessToken: string;
  email: string;
};

export async function firebaseEmailSignup(email: string, password: string) {
  const data: { error: boolean; detail: object | string | null } = {
    error: false,
    detail: null,
  };

  try {
    // Signed up
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    data.error = false;
    data.detail = userCredential.user;
  } catch (error) {
    const errorMessage = (error as AuthError).message;
    data.error = true;
    data.detail =
      firebaseAuthenticationAPIErrors[errorMessage] ||
      "Unexpected error occurred!";
  }

  return data;
}

export async function firebaseEmailSignin(email: string, password: string) {
  const data: { error: boolean; detail: object | string | null } = {
    error: false,
    detail: null,
  };

  try {
    // Signed in
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    data.error = false;
    data.detail = userCredential.user;
  } catch (error) {
    const errorMessage = (error as AuthError).message;
    data.error = true;
    data.detail =
      firebaseAuthenticationAPIErrors[errorMessage] ||
      "Unexpected error occurred!";
  }

  return data;
}
