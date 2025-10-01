// src/app/router.tsx (or .jsx)
import { Suspense, lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./Layout";

const Home = lazy(() => import("@/pages/Home"));
const Products = lazy(() => import("@/pages/Products"));
const About = lazy(() => import("@/pages/About"));
const Training = lazy(() => import("@/pages/Training"));
const Contact = lazy(() => import("@/pages/Contact"));
const News = lazy(() => import("@/pages/news"));

// plain element, not a component
const loadingEl = <div className="p-8 opacity-70">Loading…</div>;

export const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <div className="p-8">Something went wrong.</div>,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={loadingEl}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/products",
        element: (
          <Suspense fallback={loadingEl}>
            <Products />
          </Suspense>
        ),
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={loadingEl}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/training",
        element: (
          <Suspense fallback={loadingEl}>
            <Training />
          </Suspense>
        ),
      },
            {
        path: "/news",
        element: (
          <Suspense fallback={loadingEl}>
            <News />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: (
          <Suspense fallback={loadingEl}>
            <Contact />
          </Suspense>
        ),
      },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);
