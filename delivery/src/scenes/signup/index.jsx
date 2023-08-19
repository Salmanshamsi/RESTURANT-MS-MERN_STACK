import React from "react";
import { useFormik } from "formik";
import { SignupInitialValues, SignupSchema } from "../../schema";
import { useState } from "react";
import FormikCommonError from "../../components/FormikCommonError";
import { postApiMethod } from "../../states/Api";
import { HashLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [imageSrc, setImageSrc] = useState(
    "https://cdn3d.iconscout.com/3d/premium/thumb/upload-cloud-6219414-5102412.png?f=webp"
  );
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: SignupInitialValues,
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      const { name, email, role, image, cart, password } = values;
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", role);
      formData.append("image", image);
      formData.append("cart", cart);
      try {
        setIsClicked(true);
        const Signupuser = await postApiMethod(`user/signup`, formData);
        setIsClicked(false);
        if (Signupuser?.status === 200) {
          setIsClicked(false);
          navigate("/home");
        } else {
          setIsClicked(false);
          alert("Invalid email or password");
        }
      } catch (error) {
        setIsClicked(false);
        alert(error?.message);
      }
    },
  });

  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];
    convertImageIntoBase64(file);
    formik.setFieldValue("image", file);
  };
  const convertImageIntoBase64 = (file) => {
    const imageReader = new FileReader();
    if (file) {
      imageReader.readAsDataURL(file);
      setImageSrc(
        "https://cdn3d.iconscout.com/3d/premium/thumb/upload-cloud-6219414-5102412.png?f=webp"
      );
      imageReader.onloadend = () => {
        setImageSrc(imageReader.result);
        // formik.setFieldValue("image", imageReader.result);
      };
    }
  };
  return (
    <div className="flex justify-center items-center py-3 bg-image">
      <form
        className="max-w-[400px] w-full mx-auto bg-white p-8 rounded"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col mb-4">
          <label>User Name</label>
          <input
            className="border relative bg-gray-100 p-2"
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <FormikCommonError
            touched={formik.touched.name}
            error={formik.errors.name}
          />
        </div>
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
            touched={formik.touched.password}
            error={formik.errors.password}
          />
        </div>
        <div>
          <div className="p-4 bg-white w-max bg-whtie m-auto rounded-lg">
            <div
              className="file_upload p-3 relative border-4 border-dotted border-gray-300 rounded-lg"
              style={{ width: "300px" }}
            >
              <img
                src={imageSrc}
                alt="dish"
                style={{ width: "100%", height: 150 }}
              />
              <div className="input_field flex flex-col w-max mx-auto text-center">
                <label>
                  <input
                    className="text-sm cursor-pointer w-36 hidden"
                    type="file"
                    accept="image/"
                    onChange={handleProductImageUpload}
                    name="image"
                  />
                  <div className="text bg-indigo-600 text-white border border-gray-300 rounded cursor-pointer p-1 px-3 hover:bg-indigo-500 mt-1">
                    Upload Image
                  </div>
                </label>
              </div>
            </div>
          </div>
          <FormikCommonError
            touched={formik.touched.image}
            error={formik.errors.image}
          />
        </div>
        <button
          className="w-full py-3 mt-8 bg-indigo-600 hover:bg-indigo-500 relative text-white"
          type="submit"
        >
          {isClicked ? <HashLoader color="#fff" size={20} /> : "Sign Up"}
        </button>
        <p
          className="text-center mt-8"
          onClick={() => {
            navigate("/login");
          }}
        >
          Already have an account Sign In
        </p>
      </form>
    </div>
  );
}
