import React, { useState } from "react";
import {
  PaperAirplaneIcon,
  Bars3Icon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function Navbar({ open, setOpen, data }) {
  const [toggleMenu, setToggleMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="app">
        <nav>
          <div className="max-w-7xl mx-auto shadow  ">
            <div className="flex mx-auto justify-between w-5/6 ">
              {/* Primary menu and logo */}
              <div className="flex items-center gap-16 my-12">
                {/* logo */}
                <div>
                  <div className="flex gap-1 font-bold text-gray-700 items-center ">
                    <PaperAirplaneIcon className="h-6 w-6 text-primary" />
                    <span>TAKEAWAY</span>
                  </div>
                </div>
                {/* primary */}
                <div className="hidden lg:flex gap-8 ">
                  <div className="">HOME</div>
                  <div>ABOUT</div>
                  <div>MENU</div>
                  <div>DISHES</div>
                </div>
              </div>
              {/* secondary */}
              <div className="flex gap-6">
                <div className="hidden xs:flex items-center gap-10">
                  <div className="hidden lg:flex items-center gap-2">
                    <ShoppingCartIcon
                      className="h-6 w-6"
                      onClick={() => {
                        setOpen(!open);
                      }}
                    />
                    {/*<SunIcon className="h-6 w-6" /> */}
                  </div>
                  {data?.email ? (
                    data?.email
                  ) : (
                    <div
                      onClick={() => {
                        navigate("/login");
                      }}
                    >
                      <Button>Sign In</Button>
                    </div>
                  )}
                </div>
                {/* Mobile navigation toggle */}
                <div className="lg:hidden flex items-center">
                  <button onClick={() => setToggleMenu(!toggleMenu)}>
                    <Bars3Icon className="h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* mobile navigation */}
          <div
            className={`fixed z-40 w-full  bg-gray-100 overflow-hidden flex flex-col lg:hidden gap-12  origin-top duration-700 ${
              !toggleMenu ? "h-0" : "h-full"
            }`}
          >
            <div className="px-8">
              <div className="flex flex-col gap-8 font-bold tracking-wider">
                <a href="#" className="border-l-4 border-gray-600">
                  HOME
                </a>
                <a href="#">ABOUT</a>
                <a href="#">MENU</a>
                <a href="#">DISHES</a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
