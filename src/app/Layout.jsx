import { Outlet } from "react-router-dom";
import Header from "@layout/Header";
import Footer from "@layout/Footer";
import ScrollToTop from "@app/ScrollToTop";

export default function Layout() {
  return (
    <div className="background-generator">
      <div className="scroller flex min-h-screen flex-col">
        <ScrollToTop />
        <Header />
        <main className="relative flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
