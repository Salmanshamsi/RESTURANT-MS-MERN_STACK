import React, { useState } from "react";
import loginImg from "../../assets/login-image.jpg";
import { useFormik } from "formik";
import { LoginInitialValues, LoginSchema } from "../../schema";
import { HashLoader } from "react-spinners";
import FormikCommonError from "../../components/FormikCommonError";
import { postApiMethod } from "../../states/Api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: LoginInitialValues,
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      const { email, password } = values;
      const loginUserObj = { email, password };
      try {
        setIsClicked(true);
        const LoginUser = await postApiMethod(`user/login`, loginUserObj);
        if (LoginUser?.status === 200) {
          setIsClicked(false);
          navigate("/home", { state: { data: LoginUser?.data } });
        } else {
          alert("Invalid email or password");
          setIsClicked(false);
        }
      } catch (error) {
        setIsClicked(false);
        alert(error?.message);
      }
    },
  });
  return (
    <div className="relative w-full h-screen bg-zinc-900/90">
      <img
        className="absolute w-full h-full object-cover mix-blend-overlay"
        src={loginImg}
        alt="/"
      />

      <div className="flex justify-center items-center h-full ">
        <div className="max-w-[400px] w-full mx-auto bg-white p-8 rounded">
          <form
            onSubmit={formik.handleSubmit}
          >
            <h2 className="text-4xl font-bold text-center py-4">TAKEAWAY</h2>
            <div className="flex flex-col mb-4">
              <label>Email</label>
              <input
                className="border relative bg-gray-100 p-2"
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <FormikCommonError
                name={formik.values.email}
                touched={formik.touched.email}
                error={formik.errors.email}
              />
            </div>
            <div className="flex flex-col ">
              <label>Password</label>
              <input
                className="border relative bg-gray-100 p-2"
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <FormikCommonError
                name={formik.values.password}
                touched={formik.touched.password}
                error={formik.errors.password}
              />
            </div>
            <button
              className="w-full py-3 mt-8 bg-indigo-600 hover:bg-indigo-500 relative text-white"
              type="button"
              onClick={formik.submitForm}
            >
              {isClicked ? <HashLoader color="#fff" size={20} /> : "Sign In"}
            </button>
          </form>
          <p
            className="text-center mt-8"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Not a member? Sign up now
          </p>
        </div>
      </div>
    </div>
  );
}
