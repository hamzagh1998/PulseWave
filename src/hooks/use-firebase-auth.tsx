import { useState } from "react";
import {
  firebaseEmailSignin,
  firebaseEmailSignup,
} from "@/lib/firebase/auth/auth-with-email";
import { firebaseGoogleSignin } from "@/lib/firebase/auth/auth-with-provider";

type AuthFunction = (
  email: string,
  password: string
) => Promise<{ error: boolean; detail: object | string | null }>;

type ProviderAuthFunction = () => Promise<{
  error?: boolean;
  detail?: string | object;
}>;

export function useFirebaseAuth() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async (
    authFunction: AuthFunction,
    email: string,
    password: string
  ) => {
    setIsPending(true);
    const data = await authFunction(email, password);
    if (data.error) {
      setError(data.detail as string);
    }
    setIsPending(false);
    return data;
  };

  const handleGoogleAuth = async (authFunction: ProviderAuthFunction) => {
    setIsPending(true);
    const data = await authFunction();
    if (data.error) {
      setError(data.detail as string);
    }
    setIsPending(false);
    return data;
  };

  const onFirebaseEmailSignup = (email: string, password: string) => {
    if (!email || !password) {
      return setError("Email and password are required!");
    }
    return handleAuth(firebaseEmailSignup, email, password);
  };

  const onFirebaseEmailSignin = (email: string, password: string) => {
    if (!email || !password) {
      return setError("Email and password are required!");
    }
    return handleAuth(firebaseEmailSignin, email, password);
  };

  const onFirebaseGoogleSignin = () => {
    return handleGoogleAuth(firebaseGoogleSignin);
  };

  return {
    isPending,
    error,
    onFirebaseEmailSignup,
    onFirebaseEmailSignin,
    onFirebaseGoogleSignin,
  };
}
