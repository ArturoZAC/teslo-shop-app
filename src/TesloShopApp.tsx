import { RouterProvider } from "react-router";
import { appRouter } from "./router/AppRoute";

export const TesloShopApp = () => {
  return (
    <RouterProvider router={appRouter} />
  );
};
