import Modal from "./modal";

type LogoutModalProps = {
  open: boolean;
  onClose: () => void;
  handleLogout: () => void;
};

const LogoutModal = ({ open, onClose, handleLogout }: LogoutModalProps) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        title="Confirm Logout"
        handleSubmit={handleLogout}
        buttonText="Logout"
      >
        <div className="text-base text-center p-8">
          Are you sure you want to logout? You will be required to log in again
          to access your account.
        </div>
      </Modal>
    </div>
  );
};

export default LogoutModal;
