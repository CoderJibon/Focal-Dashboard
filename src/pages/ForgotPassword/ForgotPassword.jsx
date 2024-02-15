import React, { useEffect } from "react";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordMail } from "../../features/Auth/authApiSlice.js";
import { setMessageEmpty } from "../../features/Auth/authSlice.js";
import toastify from "../../utils/toastify.jsx";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { isError, message } = useSelector((state) => state.auth);

  let schema = Yup.object().shape({
    email: Yup.string()
      .email("Email Should be valid")
      .required("Email is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: schema,
    onSubmit: (email, actions) => {
      dispatch(forgotPasswordMail(email));
      actions.resetForm();
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
    <>
      <div className="login-warp py-5">
        <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4 ">
          <h3 className="text-center">Forgot Password</h3>
          <p className="text-center">
            please Enter your register email to get reset password from mail
          </p>
          <form onSubmit={formik.handleSubmit}>
            <CustomInput
              type="email"
              label="Email..."
              id="email"
              name="email"
              onChange={formik.handleChange("email")}
              value={formik.values.email}
            />
            {formik.errors.email && formik.touched.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
            <button type="submit" className="button">
              send link
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
