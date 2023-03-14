import { Icons } from "@/components/Icons";
import Link from "next/link";

const Header = () => {
  return (
    <header
      aria-label="header"
      className="fixed top-0 left-0 z-20 flex w-full items-center gap-4"
    >
      <nav className="container mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link
          aria-label="navigate to home page"
          href="/"
          className="flex items-center gap-2 text-white transition-colors hover:text-gray-100"
        >
          <Icons.logo aria-hidden="true" className="h-6 w-6" />
          <span className="text-xl font-medium">npm Picker</span>
        </Link>
        <a
          aria-label="navigate to github repo"
          href="https://github.com/sadmann7/npm-picker"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-base transition hover:bg-blue-700 active:scale-95">
            <Icons.gitHub aria-hidden="true" className="h-5 w-5" />
            <span className="text-xs text-gray-100 sm:text-sm">
              Star on Github
            </span>
          </div>
        </a>
      </nav>
    </header>
  );
};

export default Header;
