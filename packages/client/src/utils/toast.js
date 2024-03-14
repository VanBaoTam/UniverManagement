import { toast } from "react-toastify";

export const displayToast = (message, type) => {
  toast[type](message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
}; // type: "success" | "info" | "warning" | "error"

export const displayToastTop = (message, type) => {
  toast[type](message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
}; // type: "success" | "info" | "warning" | "error"
export const displayToastPermanent = (message, type) => {
  toast[type](message, {
    position: "bottom-right",
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
