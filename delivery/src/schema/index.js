import * as Yup from "yup";

// ALL INITIAL VALUES
const LoginInitialValues = {
  email: "",
  password: "",
};
const SignupInitialValues = {
  email: "",
  password: "",
  role: "user",
  image: null,
  cart: [],
  name: "",
};

// ALL SCHEMAS
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("email is required"),
  password: Yup.string()
    .required("password is required")
    .min(6, "Password must be at least 6 characters"),
});

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("email is required"),
  password: Yup.string()
    .required("password is required")
    .min(6, "Password must be at least 6 characters"),
  name: Yup.string().required("name is required"),
  image: Yup.mixed().required("Please upload an image"),
});

export { LoginInitialValues, LoginSchema, SignupInitialValues, SignupSchema };
