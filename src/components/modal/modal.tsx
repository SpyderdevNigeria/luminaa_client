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
      <AlertDialog.Overlay className="modal_overlay z-70 " />

      <AlertDialog.Content className={`modal_content z-80  ${style}`}>
        <div className="bg-white p-8 rounded-lg">
          {!hideCancel && (
            <div className="flex justify-center items-center">
              <AlertDialog.Title className="text-xl font-medium mb-2">
                {title}
              </AlertDialog.Title>
            </div>
          )}
          <div className="w-full  max-h-[400px] 2xl:max-h-[500px] overflow-y-scroll">{children}</div>


          {!hideCancel && (
            <div className="w-full flex items-center justify-center mt-2">
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
