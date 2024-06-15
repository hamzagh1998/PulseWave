import {
  firebaseEmailSignin,
  firebaseEmailSignup,
} from "@/lib/firebase/auth/auth-with-email";
import { useState } from "react";

export function useFirebaseAuth() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onFirebaseEmailSignup = async (email: string, password: string) => {
    if (!email || !password) {
      return setError("Email and password are required!");
    }

    setIsPending(true);
    const data = await firebaseEmailSignup(email, password);
    if (data.error) {
      setError(data.detail as string);
    }
    setIsPending(false);
    return data;
  };

  const onFirebaseEmailSignin = async (email: string, password: string) => {
    if (!email || !password)
      return setError("Email and password are required!");

    setIsPending(true);
    const data = await firebaseEmailSignin(email, password);
    if (data.error) {
      setError(data.detail as string);
    }
    setIsPending(false);
    return data;
  };

  return {
    isPending,
    error,
    onFirebaseEmailSignup,
    onFirebaseEmailSignin,
  };
}
