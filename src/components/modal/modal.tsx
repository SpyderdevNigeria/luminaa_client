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
  loading?:boolean
};

const Modal = ({
  open,
  onClose,
  title,
  children,
  hideCancel,
  style,
  loading,
  handleSubmit,
  buttonText,
}: ModalProps) => {
  return (
    <AlertDialog.Root open={open} onOpenChange={onClose}>
      <AlertDialog.Overlay className="modal_overlay z-70" />

      <AlertDialog.Content className={`modal_content z-80 ${style}`}>
        <div className="bg-white p-6 rounded-lg">
          {!hideCancel && (
            <div className="flex justify-between items-center">
              <AlertDialog.Title className="text-xl font-medium mb-2">
                {title}
              </AlertDialog.Title>
            </div>
          )}
          <div className="w-full py-2">{children}</div>
          <AlertDialog.Description></AlertDialog.Description>

          {!hideCancel && (
            <div className="w-full flex items-center justify-end">
              <div className=" flex items-center gap-2 ">
                <button
                  onClick={onClose}
                  className="w-full text-center text-sm p-3 px-6  whitespace-nowrap font-medium border-[1.5px] border-primary text-primary rounded-lg"
                >
                  Back
                </button>
                {buttonText && handleSubmit ? (
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className=" w-full text-center text-sm p-3  px-6 font-medium whitespace-nowrap  border-[1.5px] border-primary bg-primary text-white rounded-lg "
                  >
                    {buttonText}
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          )}
        </div>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default Modal;
