import * as AlertDialog from "@radix-ui/react-alert-dialog";
type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  hideCancel?: boolean;
  style?: string;
  handleSubmit?: () => void;
  buttonText?: string;
};

const Modal = ({
  open,
  onClose,
  title,
  children,
  hideCancel,
  style,
  handleSubmit,
  buttonText,
}: ModalProps) => {
  return (
    <AlertDialog.Root open={open} onOpenChange={onClose}>
      <AlertDialog.Overlay className="modal_overlay z-60" />

      <AlertDialog.Content className={`modal_content z-70 ${style}`}>
        <div className="bg-white p-6 rounded-lg">
          {!hideCancel && (
            <div className="flex justify-between items-center">
              <AlertDialog.Title className="text-xl font-medium mb-2">
                {title}
              </AlertDialog.Title>
            </div>
          )}

          <AlertDialog.Description className="w-full py-2">
            {children}
          </AlertDialog.Description>

          {!hideCancel && (
            <div className="flex flex-row items-center justify-center gap-2 px-8">
              <button
                onClick={onClose}
                className="w-full text-center text-sm py-3 font-medium border-[1.5px] border-primary text-primary rounded-lg"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className=" w-full text-center text-sm py-3 font-medium  border-[1.5px] border-primary bg-primary text-white rounded-lg "
              >
                {buttonText}
              </button>
            </div>
          )}
        </div>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default Modal;
