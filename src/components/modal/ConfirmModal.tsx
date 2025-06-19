import Modal from "./modal";

type ConfirmModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  loading?: boolean;
  onConfirm: () => void;
};

const ConfirmModal = ({
  open,
  onClose,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  loading = false,
  onConfirm,
}: ConfirmModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      buttonText={loading ? "Processing..." : confirmText}
      handleSubmit={onConfirm}
      loading={loading}
    >
      <div className="text-base text-center p-8">
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
