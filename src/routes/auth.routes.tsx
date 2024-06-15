import { RouteObject } from "react-router-dom";

import { SigninPage } from "@/pages/auth/signin";
import { SignupPage } from "@/pages/auth/signup";
import { RootLayout } from "@/pages/auth/_root-layout";

export const AUTH_PATHES = {
  SIGNUP: "signup",
  SIGNIN: "signin",
};

export const authRoutes: RouteObject[] = [
  {
    path: AUTH_PATHES.SIGNUP,
    element: (
      <RootLayout>
        <SignupPage />
      </RootLayout>
    ),
  },
  {
    path: AUTH_PATHES.SIGNIN,
    element: (
      <RootLayout>
        <SigninPage />
      </RootLayout>
    ),
  },
];
