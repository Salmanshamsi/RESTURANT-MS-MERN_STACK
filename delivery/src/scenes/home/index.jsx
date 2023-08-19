import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import Heading from "../../components/Heading";
import About from "../about";
import Card from "../../components/Card";
import MenuCard from "../../components/MenuCard";
import TestimonialsSlider from "../testimonals";
import Footer from "../footer";
import Offers from "../../components/Offers";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { getApiMethod } from "../../states/Api";
import { useLocation } from "react-router-dom";

const Home = () => {
  const states = useLocation();
  const userData = states?.state?.data;
  console.log("🚀 ~  userData:", userData);
  const [open, setOpen] = useState(false);
  const getUserData = async () => {
    try {
      const { status, data } = await getApiMethod("/user/currentUser");
    } catch (error) {
      toast.error(`${error?.message}`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        limit={1}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={true}
        theme="light"
      />
      <Navbar open={open} setOpen={setOpen} data={userData} />
      <Hero />
      <Heading>ABOUT US</Heading>
      <About />
      {/* <Heading>OUR TEAM</Heading>
      <Card /> */}
      <Heading>OUR MENU</Heading>
      <MenuCard open={open} setOpen={setOpen} />
      <Heading>OUR OFFERS</Heading>
      <Offers />
      {/* <Heading>TESTIMONALS</Heading>
      <TestimonialsSlider /> */}
      <Footer data={userData} />
    </div>
  );
};

export default Home;
