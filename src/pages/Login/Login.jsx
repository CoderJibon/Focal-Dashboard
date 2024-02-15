import React, { useEffect } from "react";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "../../features/Auth/authApiSlice.js";
import { setMessageEmpty } from "../../features/Auth/authSlice.js";
import toastify from "../../utils/toastify.jsx";
const Login = () => {
  const dispatch = useDispatch();
  const { isError, message } = useSelector((state) => state.auth);

  let schema = Yup.object().shape({
    email: Yup.string()
      .email("Email Should be valid")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (value) => {
      dispatch(adminLogin(value));
    },
  });

  useEffect(() => {
    if (isError) {
      toastify("error", isError);
      dispatch(setMessageEmpty());
    }
    if (message) {
      toastify("success", message);
      dispatch(setMessageEmpty());
    }
  }, [isError, message]);

  return (
    <div className="login-warp py-5">
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4 ">
        <h3 className="text-center">Login</h3>
        <p className="text-center">Login To your Account to continue</p>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Email Address"
            id="email"
            name="email"
            onChange={formik.handleChange("email")}
            value={formik.values.email}
          />

          {formik.errors.email && formik.touched.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}

          <CustomInput
            type="password"
            label="Password"
            id="pass"
            name="password"
            onChange={formik.handleChange("password")}
            value={formik.values.password}
            autocomplete="current-password"
          />

          {formik.errors.password && formik.touched.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}

          <div className="my-1 text-end">
            <Link to="/forgot-password">Forgot Password</Link>
          </div>
          <button type="submit" className="button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
