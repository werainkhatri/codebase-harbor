
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { HomeIcon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-white border-b shadow-sm dark:bg-gray-900">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2 text-xl font-semibold">
            <HomeIcon className="h-5 w-5" />
            <span>Code Alarm</span>
          </Link>
        </div>
        <nav className="flex items-center gap-4">
          <Link to="/dashboard" className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400">
            Dashboard
          </Link>
          <Button asChild size="sm">
            <Link to="/">Start Audit</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
