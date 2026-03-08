import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/community", label: "Community" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-advocacy-red/10">
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-advocacy-red via-primary to-advocacy-red" />
      <div className="container mx-auto flex items-center justify-between h-20 px-4 pt-[3px]">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="SECLUSA Logo" className="h-14 w-auto" />
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm tracking-wide uppercase transition-colors ${
                location.pathname === l.to
                  ? "text-advocacy-red font-semibold"
                  : "text-muted-foreground hover:text-advocacy-red"
              }`}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <Link to="/community" className="hidden lg:block">
          <Button className="bg-advocacy-red text-primary-foreground hover:bg-advocacy-red/90 rounded-none px-6 uppercase text-xs tracking-widest"
            style={{ fontFamily: "'Poppins', sans-serif" }}>
            Join Us
          </Button>
        </Link>

        {/* Mobile toggle */}
        <button className="lg:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-background border-t border-border px-4 pb-6 pt-4 space-y-1">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={`block px-3 py-3 text-sm uppercase tracking-wide ${
                location.pathname === l.to
                  ? "text-advocacy-red font-semibold"
                  : "text-muted-foreground"
              }`}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {l.label}
            </Link>
          ))}
          <Link to="/community" onClick={() => setOpen(false)}>
            <Button className="w-full mt-3 bg-advocacy-red text-primary-foreground rounded-none uppercase text-xs tracking-widest"
              style={{ fontFamily: "'Poppins', sans-serif" }}>
              Join the Movement
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
