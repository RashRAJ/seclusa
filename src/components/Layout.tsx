import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AnimatedBlobs from "./AnimatedBlobs";

const Layout = () => (
  <div className="flex flex-col min-h-screen relative">
    <AnimatedBlobs />
    <Navbar />
    <main className="flex-1 pt-20">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default Layout;
