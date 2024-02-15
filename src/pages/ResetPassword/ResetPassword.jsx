import React, { useEffect } from "react";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../features/Auth/authApiSlice.js";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { setMessageEmpty } from "../../features/Auth/authSlice.js";
import toastify from "../../utils/toastify.jsx";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { isError, message } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const { token } = useParams();

  // validate
  let schema = Yup.object().shape({
    newPassword: Yup.string().required("New Password is required"),
    password: Yup.string().required("Confirm Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      newPassword: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (data, actions) => {
      if (data.newPassword === data.password) {
        dispatch(resetPassword({ password: data.password, token: token }));
        actions.resetForm();
      } else {
        toastify("error", "Confirm password does not match");
      }
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
      navigate("/login");
    }
  }, [isError, message]);

  return (
    <>
      <div className="login-warp py-5">
        <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4 ">
          <h3 className="text-center">Reset Password</h3>
          <p className="text-center">please Enter your new password </p>
          <form onSubmit={formik.handleSubmit}>
            <CustomInput
              type="password"
              label="New Password"
              id="newPassword"
              name="newPassword"
              onChange={formik.handleChange("newPassword")}
              value={formik.values.newPassword}
            />
            {formik.errors.newPassword && formik.touched.newPassword ? (
              <div className="error">{formik.errors.newPassword}</div>
            ) : null}
            <CustomInput
              type="password"
              label="Confirm Password"
              id="confirmPass"
              name="password"
              onChange={formik.handleChange("password")}
              value={formik.values.password}
            />
            {formik.errors.password && formik.touched.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
            <button type="submit" className="button">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
