import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Assuming you have defined or imported the 'dark' theme

function ToastComponent({ content }) {
  useEffect(() => {
    // Trigger the toast notification when the component mounts
    toast(content);
  }, [content]);

  return <ToastContainer />;
}

export default ToastComponent;
