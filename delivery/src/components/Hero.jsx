import React from "react";
import Button from "./Button";

export default function Hero() {
  return (
    <>
      <section id="home" className="py-5">
        <div className="container flex flex-wrap items-center justify-center mx-auto mt-10 md:px-10 md:flex-row">
          <div className="mb-14 lg:mb-0 lg:w-1/2">
            <h1 className="max-w-xl text-[2.9rem] leading-none text-gray-900 font-extrabold font-sans text-center lg:text-5xl lg:text-left lg:leading-tight mb-5">
              A Small Business is only as good as its tools
            </h1>
            <p className="max-w-xl text-center text-gray-500 lg:text-left lg:max-w-md">
              We're different, Growlight is the only business platform that lets
              you run your business on one platform
            </p>
            <div className="flex justify-center mt-14 lg:justify-start">
              <Button>Get Started</Button>
            </div>
          </div>
          <div className="lg:w-1/2">
            <img
              src="https://cdn.dribbble.com/users/1731254/screenshots/8346192/italian_food_illustration_tubikarts.png"
              alt=""
              className="ml-auto rounded-md"
            />
          </div>
        </div>
      </section>
    </>
  );
}
