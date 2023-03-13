import { Toaster } from "react-hot-toast";

const ToastWrapper = () => {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        // Define default options
        className: "",
        duration: 3000,
        style: {
          background: "#64748b",
          color: "#ffffff",
        },
      }}
    />
  );
};

export default ToastWrapper;
