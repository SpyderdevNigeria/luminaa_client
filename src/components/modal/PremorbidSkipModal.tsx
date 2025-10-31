import React from "react";
import Modal from "./modal";

interface PremorbidSkipModalProps {
  open: boolean;
  onClose: () => void;
  onSkip: () => void;
  loading?: boolean;
}

const PremorbidSkipModal: React.FC<PremorbidSkipModalProps> = ({
  open,
  onClose,
  onSkip,
  loading,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Incomplete Premorbid Condition"
      hideCancel={false}
      buttonText="Skip Anyway"
      handleSubmit={onSkip}
      loading={loading}
    >
      <div className="text-gray-700 text-center px-4 py-2 space-y-4">
        <p className="text-base">
          You haven’t completed your <strong>Premorbid Condition</strong> form.
          This information is essential for your doctor to understand your
          medical history before a consultation.
        </p>
        <p className="text-sm text-red-600 font-medium">
          If you skip now, you’ll continue to see this reminder each time you
          try to book a consultation until you fill the form.
        </p>
      </div>
    </Modal>
  );
};

export default PremorbidSkipModal;
