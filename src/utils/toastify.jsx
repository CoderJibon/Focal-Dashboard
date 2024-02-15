import { toast } from "react-toastify";

const success = "success";
const error = "error";
const warn = "warn";
const info = "info";

const toastify = (type = success, msg) => {
  switch (type) {
    case success:
      return toast.success(msg, {
        position: "top-right",
      });
    case error:
      return toast.error(msg, {
        position: "top-right",
      });
    case warn:
      return toast.warn(msg, {
        position: "top-right",
      });

    case info:
      return toast.info(msg, {
        position: "top-right",
      });
    default:
      return toast.success(msg, {
        position: "top-right",
      });
  }
};

export default toastify;
