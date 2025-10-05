// src/app/router.jsx
import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./Layout";

import Home from "@/pages/Home";
import Products from "@/pages/Products";
import IrisCore from "@/pages/products/IrisCore";
import IrisNetFlow from "@/pages/products/IrisNetflow";
import IrisMaps from "@/pages/products/IrisMaps";
import About from "@/pages/About";
import Training from "@/pages/Training";
import Contact from "@/pages/Contact";
import News from "@/pages/News";

export const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      errorElement: <div className="p-8">Something went wrong.</div>,
      children: [
        { path: "/", element: <Home /> },
        { path: "/products", element: <Products /> },
        { path: "/products/iriscore", element: <IrisCore /> },
        { path: "/products/irisnetflow", element: <IrisNetFlow /> },
        { path: "/products/irismaps", element: <IrisMaps /> },
        { path: "/about", element: <About /> },
        { path: "/training", element: <Training /> },
        { path: "/news", element: <News /> },
        { path: "/contact", element: <Contact /> },
        { path: "*", element: <Navigate to="/" replace /> },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
);
