import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./router/router.jsx";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loggedInAdmin } from "./features/Auth/authApiSlice.js";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      dispatch(loggedInAdmin());
    }
  }, [dispatch]);

  return (
    <>
      {/* router init */}
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
