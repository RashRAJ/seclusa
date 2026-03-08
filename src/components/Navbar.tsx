import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const navLinks = [
  { to: "#home", label: "Home", isAnchor: true },
  { to: "/services", label: "Services", isAnchor: false },
  { to: "#team", label: "Team", isAnchor: true },
  { to: "#community", label: "Join Us", isAnchor: true },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleClick = (hash: string) => {
    setOpen(false);
    const el = document.querySelector(hash);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-advocacy-red/10">
      <div className="absolute top-0 left-0 w-full h-[3px] bg-advocacy-red" />
      <div className="container mx-auto flex items-center justify-between h-20 px-4 pt-[3px]">
        <a href="#home" onClick={() => handleClick("#home")} className="flex items-center gap-3">
          <img src={logo} alt="SECLUSA Logo" className="h-14 w-auto" />
        </a>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.to}
              href={l.to}
              onClick={(e) => { e.preventDefault(); handleClick(l.to); }}
              className="text-sm tracking-wide uppercase transition-colors text-muted-foreground hover:text-advocacy-red font-sans"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a href="#community" onClick={(e) => { e.preventDefault(); handleClick("#community"); }} className="hidden lg:block">
          <Button className="bg-advocacy-red text-primary-foreground hover:bg-advocacy-red/90 rounded-none px-6 uppercase text-xs tracking-widest font-sans">
            Join Us
          </Button>
        </a>

        <button className="lg:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-background border-t border-border px-4 pb-6 pt-4 space-y-1">
          {navLinks.map((l) => (
            <a
              key={l.to}
              href={l.to}
              onClick={(e) => { e.preventDefault(); handleClick(l.to); }}
              className="block px-3 py-3 text-sm uppercase tracking-wide text-muted-foreground font-sans"
            >
              {l.label}
            </a>
          ))}
          <a href="#community" onClick={(e) => { e.preventDefault(); handleClick("#community"); }}>
            <Button className="w-full mt-3 bg-advocacy-red text-primary-foreground rounded-none uppercase text-xs tracking-widest font-sans">
              Join the Movement
            </Button>
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
