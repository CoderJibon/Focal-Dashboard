import { Badge } from "antd";
import React, { useState, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useFormik } from "formik";
import toastify from "../../utils/toastify.jsx";
import { useDispatch, useSelector } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import { ProfileUpdate } from "../../features/Auth/authApiSlice.js";
import { setMessageEmpty } from "../../features/Auth/authSlice.js";
const Profile = () => {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  //user
  const { isError, message, user } = useSelector((state) => state.auth);
  //file manager multiple image
  const [singleImage, setSingleImage] = useState(null);
  const handleChangeSingleImage = (file) => {
    setSingleImage(file);
  };

  // from control
  const formik = useFormik({
    initialValues: {
      firstName: null,
      lastName: null,
      email: null,
      mobile: null,
      gender: null,
      address: null,
      photo: null,
    },
    onSubmit: (values) => {
      // Create a new FormData instance
      let formData = new FormData();
      // Append individual form fields
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("email", values.email);
      formData.append("mobile", values.mobile);
      formData.append("gender", values.gender);
      formData.append("address", values.address);
      formData.append("photo", values.photo);
      setLoad(true);
      dispatch(ProfileUpdate({ id: user?._id, formData }));
    },
  });

  // update image on formik
  useEffect(() => {
    formik.values.photo = singleImage ? singleImage : null;
  }, [singleImage]);

  //message handling
  useEffect(() => {
    if (isError) {
      //toastify("error", isError);
      dispatch(setMessageEmpty());
      setLoad(false);
    }
    if (message) {
      //toastify("success", message);
      dispatch(setMessageEmpty());
      setSingleImage(null);
      setLoad(false);
    }
  }, [isError, message]);
  useEffect(() => {
    if (user) {
      formik.setValues({
        ...formik.values,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        mobile: user.mobile || "",
        gender: user.gender || "",
        address: user.address || "",
      });
    }
  }, [user]);
  return (
    <>
      <div className="lodingbar">
        <RotatingLines
          visible={load}
          height="80"
          width="80"
          radius="48"
          color="#FF0000"
          ariaLabel="watch-loading"
          wrapperStyle={{}}
          wrapperclassName=""
        />
      </div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            <div className="text-center mb-4">
              <img
                src={
                  singleImage
                    ? URL.createObjectURL(singleImage)
                    : user?.photo
                    ? user?.photo?.url
                    : "https://i.ibb.co/DDbjkbw/profile.png"
                }
                //src="https://i.ibb.co/DDbjkbw/profile.png"
                alt="Profile Picture"
                className="img-fluid rounded-circle"
                style={{ width: "200px" }}
              />
            </div>

            <div className="card">
              <div className="card-body">
                <h5 className="card-title">User Information</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <strong>Name:</strong> {user?.firstName?.toUpperCase()}{" "}
                    {user.lastName?.toUpperCase()}
                  </li>
                  <li className="list-group-item">
                    <strong>Email:</strong> {user?.email}
                  </li>
                  <li className="list-group-item">
                    <strong>Mobile:</strong> {user?.mobile}
                  </li>
                  <li className="list-group-item">
                    <strong>Gender:</strong> {user?.gender}
                  </li>
                  <li className="list-group-item">
                    <strong>Role:</strong>{" "}
                    <Badge
                      className="site-badge-count-109"
                      count={user?.role?.toUpperCase()}
                      style={{ backgroundColor: "#52c41a" }}
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <form onSubmit={formik.handleSubmit}>
              <div className="card mt-3">
                <div className="card-body">
                  <h5 className="card-title">Additional Information</h5>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <div>
                        <label htmlFor="inputFirstName" className="form-label">
                          First Name:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputFirstName"
                          placeholder="John"
                          name="firstName"
                          onChange={formik.handleChange("firstName")}
                          value={formik.values.firstName}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div>
                        <label htmlFor="inputLastName" className="form-label">
                          Last Name:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputLastName"
                          placeholder="Doe"
                          name="lastName"
                          onChange={formik.handleChange("lastName")}
                          value={formik.values.lastName}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <div>
                        <label htmlFor="inputEmail" className="form-label">
                          Email:
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="inputEmail"
                          placeholder="john@example.com"
                          name="email"
                          value={user?.email}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div>
                        <label htmlFor="inputMobile" className="form-label">
                          Mobile:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputMobile"
                          placeholder="+1234567890"
                          name="mobile"
                          onChange={formik.handleChange("mobile")}
                          value={formik.values.mobile}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <div>
                        <label htmlFor="inputGender" className="form-label">
                          Gender:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputGender"
                          placeholder="Male"
                          name="gender"
                          onChange={formik.handleChange("gender")}
                          value={formik.values.gender}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div>
                        <label htmlFor="inputAddress" className="form-label">
                          Address:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputAddress"
                          placeholder="New York, USA"
                          name="address"
                          onChange={formik.handleChange("address")}
                          value={formik.values.address}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-12">
                      <FileUploader
                        classes="customizeImage"
                        multiple={false}
                        handleChange={handleChangeSingleImage}
                        name="images"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <button type="submit" className="btn btn-primary w-100">
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
