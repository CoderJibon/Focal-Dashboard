import ForgotPassword from "../pages/ForgotPassword/ForgotPassword.jsx";
import Login from "../pages/Login/Login.jsx";
import ResetPassword from "../pages/ResetPassword/ResetPassword.jsx";
import PublicGard from "./PublicGard.jsx";

//public router
const publicRouter = [
  {
    element: <PublicGard />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forgot-Password",
        element: <ForgotPassword />,
      },
      {
        path: "/reset-password/:token",
        element: <ResetPassword />,
      },
    ],
  },
];

//export public router
export default publicRouter;
