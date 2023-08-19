import React from "react";

const Heading = ({ children }) => {
  return (
    <div className="text-3xl font-black md:text-5xl font-serif text-center text-indigo-600 my-8 underline">
      {children || "TEXT"}
    </div>
  );
};

export default Heading;
