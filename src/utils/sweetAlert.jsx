import swal from "sweetalert";

const success = "success";
const error = "error";
const warn = "warn";
const info = "info";

const sweetAlert = (type = "warn", title = "Are you sure?", desc = "") => {
  switch (type) {
    case success:
      return swal(title, desc, "success");
    case error:
      return swal(title, desc, "error");
    case warn:
      return swal(title, desc, "warning");
    case info:
      return swal(title, desc, "info");

    default:
      return swal({
        title: title,
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your imaginary file is safe!");
        }
      });
  }
};

export default sweetAlert;
