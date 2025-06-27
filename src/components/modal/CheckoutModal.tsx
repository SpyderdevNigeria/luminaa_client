import React from "react";
import { Link } from "react-router-dom";
import Modal from "./modal";
import routeLinks from "../../utils/routes";
import Success from "../../assets/images/patient/success.webp"; 

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title=""
      hideCancel={true}
      style="!md:max-w-xl !md:mx-4 !md:mx-0"
      buttonText=""
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <img src={Success} alt="Success" className="w-[200px]" />
        <div className="text-center">
          <h2 className="text-2xl font-[600] leading-6 max-w-[300px] mx-auto">
            Your order has been placed successfully
          </h2>
          <p className="text-text-secondary text-xs md:text-sm font-[400] text-center mt-4 px-4 max-w-[360px] mx-auto">
            Thank you for choosing us! Feel free to continue shopping and
            explore our wide range of products. Happy Shopping!
          </p>
        </div>
        <div className="w-full flex flex-col text-center mt-6">
          <Link
            to={routeLinks?.patient?.dashboard}
            className="form-primary-button bg-primary text-white py-2 px-4 rounded"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default CheckoutModal;
