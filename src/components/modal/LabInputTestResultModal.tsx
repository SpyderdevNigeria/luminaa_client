import Modal from "./modal";
import { useEffect, useState } from "react";
import CommonFormField from "../common/CommonFormField";

type LabInputTestResultModalProps = {
  isModalOpen: boolean;
  setModalOpen: (e: boolean) => void;
  labTestOrderId: string;
  initialData?: {
    testName: string;
    result: string;
    unit: string;
    referenceRange: string;
    notes: string;
  };
  onSubmit: (payload: any) => void;
};

const LabInputTestResultModal = ({
  isModalOpen,
  setModalOpen,
  labTestOrderId,
  initialData,
  onSubmit,
}: LabInputTestResultModalProps) => {
  const [formData, setFormData] = useState({
    testName: "",
    result: "",
    unit: "",
    referenceRange: "",
    notes: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const formFields = [
    {
      type: "text",
      name: "testName",
      label: "Test Name",
      required: true,
    },
    {
      type: "text",
      name: "result",
      label: "Result",
      required: true,
    },
    {
      type: "text",
      name: "unit",
      label: "Unit",
      required: true,
    },
    {
      type: "text",
      name: "referenceRange",
      label: "Reference Range",
      required: true,
    },
    {
      type: "textarea",
      name: "notes",
      label: "Notes",
      required: true,
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSumbit = () => {
    const payload = {
      labTestOrderId,
      results: [
        {
          testName: formData.testName,
          result: formData.result,
          unit: formData.unit,
          referenceRange: formData.referenceRange,
        },
      ],
      documents: [],
      notes: formData.notes,
    };

    onSubmit(payload); 
    setModalOpen(false);
  };

  return (
    <div>
      <Modal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        title={initialData ? "Edit Test Result" : "Input Test Result"}
        hideCancel={false}
        style="lg:min-w-4xl !mx-4 !md:mx-0"
        buttonText="Save & Continue"
        handleSubmit={handleSumbit}
      >
        <div className="w-full">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {formFields.map((field) => (
              <div
                key={field.name}
                className={field.name === "notes" ? "col-span-2" : ""}
              >
                <CommonFormField
                  {...field}
                  value={(formData as any)[field.name]}
                  onChange={handleChange}
                />
              </div>
            ))}
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default LabInputTestResultModal;
