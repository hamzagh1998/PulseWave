import { RouteObject } from "react-router-dom";

import { SettingsPage } from "@/pages/settings/settings";

export const MAIN_PATHES = {
  HOME: "settings",
};

export const mainRoutes: RouteObject[] = [
  {
    path: MAIN_PATHES.HOME,
    element: <SettingsPage />,
  },
];
