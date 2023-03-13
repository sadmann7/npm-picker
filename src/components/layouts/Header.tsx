import { Icons } from "@/components/Icons";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // handle scroll
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      aria-label="header"
      className={`fixed top-0 left-0 z-20 flex w-full items-center gap-4 transition ${
        isScrolled
          ? "bg-slate-800/80 shadow-md backdrop-blur-md backdrop-saturate-150 backdrop-filter duration-300 ease-in-out"
          : "bg-transparent"
      }`}
      onScroll={handleScroll}
    >
      <nav className="container mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link
          aria-label="navigate to home page"
          href="/"
          className="flex items-center gap-2 text-slate-100 transition-colors hover:text-white active:text-slate-100"
        >
          <Icons.logo aria-hidden="true" className="h-6 w-6" />
          <span className="text-xl font-medium">MetaTagz</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            aria-label="navigate to github repo"
            href="https://github.com/sadmann7/meta-tagz"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="rounded-md p-2 text-base text-slate-100 transition hover:bg-slate-700 active:scale-95">
              <Icons.gitHub aria-hidden="true" className="h-6 w-6" />
            </div>
            <span className="sr-only">Github</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
