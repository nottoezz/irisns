import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import About from "./pages/About.jsx";
import Training from "./pages/Training.jsx";
import News from "./pages/News.jsx";
import Contact from "./pages/Contact.jsx";

function AppInner() {
  return (
    <div className="background-generator">
      <div className="scroller">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/training" element={<Training />} />
            <Route path="/news" element={<News />}/>
            <Route path="/contact" element={<Contact />}/>
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return <AppInner />;
}
