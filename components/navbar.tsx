import React from "react";
import Link from "next/link";
import CompanyLogo from "@/assets/svgs/companyLogo";

const Navbar = () => {
  return (
    <nav
      className="fixed top-0 left-0 w-full bg-white py-4 px-6 shadow-lg"
      style={{ zIndex: 9999 }}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Company Name */}
        <div className="flex items-center space-x-4">
          <CompanyLogo className="w-10 h-10" /> {/* Adjust size as needed */}
          <Link href="/">
            <h2 className="text-black text-lg font-semibold">Enatage</h2>
          </Link>
        </div>

        {/* Login Button */}
        <div className="flex items-center border-x-2">
          <Link href="/login">
            <div className=" text-black px-10 py-2 rounded font-bold hover:bg-slate-200">
              Login
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;