import React, { useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import { FaArrowAltCircleRight } from "react-icons/fa";

const SuccessModal = ({ message, title, link }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <dialog
      id="success_modal"
      className={`modal ${isOpen ? "modal-open" : ""}  modal-bottom sm:modal-middle`}
    >
      <div className="modal-box max-w-sm relative">
        <button
          className="text-2xl opacity-50 cursor-pointer absolute right-5"
          onClick={() => setIsOpen(false)}
        >
          <IoClose />
        </button>
        <h3 className="font-bold text-xl text-center">{title || "Success"}</h3>
        <DotLottieReact
          src="https://lottie.host/e5ab36f5-e36d-4b50-b8da-ce09c0f6f546/BRWc9xlqCD.lottie"
          className="-mt-6 -mb-12"
          autoplay
        />
        {message && <p className="text-center mt-4 text-success">{message}</p>}
        <div className="modal-action justify-center gap-2">
          <form method="dialog">
            {link && (
              <Link href={link[1]} className="btn btn-success btn-sm mr-2">
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

export default SuccessModal;
