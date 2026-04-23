import React, { useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import { FaArrowAltCircleRight } from "react-icons/fa";

const ErrorModal = ({ message, title, link }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <dialog
      id="error_modal"
      className={`modal ${isOpen ? "modal-open" : ""}  modal-bottom sm:modal-middle`}
    >
      <div className="modal-box max-w-sm relative">
        <button
          className="text-2xl opacity-50 cursor-pointer absolute right-5"
          onClick={() => setIsOpen(false)}
        >
          <IoClose />
        </button>
        <h3 className="font-bold text-xl text-center">{title || "Error"}</h3>
        <DotLottieReact
          src="https://lottie.host/a6fd168c-02ee-4699-83fa-4903b99484c3/tHxa5M0Xi4.lottie"
          className="-mt-6 -mb-12"
          autoplay
        />
        {message && <p className="text-center mt-4 text-error">{message}</p>}
        <div className="modal-action justify-center">
          <form method="dialog">
            {link && (
              <Link href={link[1]} className="btn btn-primary btn-sm mr-2">
                <FaArrowAltCircleRight />
                {link[0]}
              </Link>
            )}
            <button
              className="btn btn-primary btn-sm btn-soft"
              onClick={() => setIsOpen(false)}
            >
              <IoClose />
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ErrorModal;
