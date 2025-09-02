import { createBrowserRouter, Navigate } from "react-router";

import { ShopLayout } from "../shop/layouts/ShopLayout";
import { HomePage } from "../shop/pages/home/HomePage";
import { ProductPage } from "../shop/pages/product/ProductPage";
import { GenderPage } from "../shop/pages/gender/GenderPage";

import { LoginPage } from "../auth/page/login/LoginPage";
import { RegisterPage } from "../auth/page/register/RegisterPage";

import { AdminDasboardPage } from "../admin/pages/dashboard/AdminDasboardPage";
import { AdminProductsPage } from "../admin/pages/products/AdminProductsPage";
import { AdminProductPage } from "../admin/pages/product/AdminProductPage";
import { lazy } from "react";
import {
  NoAuthenticatedRoute,
  AdminRoute,
} from "../components/routes/ProtectedRoutes";

const AuthLayout = lazy(() => import("../auth/layouts/AuthLayout"));
const AdminLayout = lazy(() => import("../admin/layouts/AdminLayout"));

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <ShopLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "product/:idSlug",
        element: <ProductPage />,
      },
      {
        path: "gender/:gender",
        element: <GenderPage />,
      },
    ],
  },
  {
    path: "/auth",
    element: (
      <NoAuthenticatedRoute>
        <AuthLayout />
      </NoAuthenticatedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/auth/login" />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminDasboardPage />,
      },
      {
        path: "products",
        element: <AdminProductsPage />,
      },
      {
        path: "product/:id",
        element: <AdminProductPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);
