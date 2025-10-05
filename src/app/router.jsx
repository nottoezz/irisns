import { Suspense, lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./Layout";

const Home = lazy(() => import("@/pages/Home"));
const Products = lazy(() => import("@/pages/Products"));
const IrisCore = lazy(() => import("@/pages/products/IrisCore"));
const IrisNetFlow = lazy(() => import("@/pages/products/IrisNetflow"));
const IrisMaps = lazy(() => import("@/pages/products/IrisMaps"));
const About = lazy(() => import("@/pages/About"));
const Training = lazy(() => import("@/pages/Training"));
const Contact = lazy(() => import("@/pages/Contact"));
const News = lazy(() => import("@/pages/News"));

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
        path: "/products/iriscore",
        element: (
          <Suspense fallback={loadingEl}>
            <IrisCore />
          </Suspense>
        ),
      },
      {
        path: "/products/irisnetflow",
        element: (
          <Suspense fallback={loadingEl}>
            <IrisNetFlow />
          </Suspense>
        ),
      },
      {
        path: "/products/irismaps",
        element: (
          <Suspense fallback={loadingEl}>
            <IrisMaps />
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
    basename: import.meta.env.BASE_URL || "/irisns/",
  },
]);
