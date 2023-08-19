import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./scenes/layout";
import Dashboard from "./scenes/dashboard";
import Dish from "./scenes/product";
import Login from "./scenes/login";
import Offers from "./scenes/offers";
import Feedback from "./scenes/feedback";
import User from "./scenes/user";
import Admin from "./scenes/admin";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import ProtectedRoutes from "./protectedRoutes";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css

const App = () => {
  const isSignedIn = useSelector((state) => state?.global?.isLogin);
  console.log("🚀 isSignedIn:", isSignedIn)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Layout />}>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoutes isSignedIn={isSignedIn}>
               <Dashboard />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/dish"
            element={
              <Dish />
            }
          />
          <Route
            path="/offers"
            element={
              <ProtectedRoutes isSignedIn={isSignedIn}>
                <Offers />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/feedback"
            element={
              <ProtectedRoutes isSignedIn={isSignedIn}>
                <Feedback />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/user"
            element={
              <ProtectedRoutes isSignedIn={isSignedIn}>
                <User />
              </ProtectedRoutes> 
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoutes isSignedIn={isSignedIn}>
                <Admin />
              </ProtectedRoutes>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
