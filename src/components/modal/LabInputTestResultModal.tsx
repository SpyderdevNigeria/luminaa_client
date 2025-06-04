import Modal from "./modal";
import { useState } from "react";
type LabInputTestResultModalProps = {
  isModalOpen: boolean;
  setModalOpen: (e: any) => void;
};
function LabInputTestResultModal({
  isModalOpen,
  setModalOpen,
}: LabInputTestResultModalProps) {

   const [data, setData] = useState({
      connectToLab: "",
      testType: "",
      status: "",
      lab: "",
      notes: "",
    });

      const handleChange = (e:any) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  return (
    <div>
      <Modal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Input test results"
        hideCancel={false}
        style="lg:min-w-4xl !mx-4 !md:mx-0 "
        buttonText="Save & Continue"
      >
        <div className="w-full ">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {/* Need to connect to a Lab? */}
            <div className="col-span-2">
              <label
                htmlFor="connectToLab"
                className="form-label !text-base !font-light"
              >
                Test Name
              </label>
              <input
                type="text"
                name="connectToLab"
                id="connectToLab"
                placeholder="Yes / No / Notes"
                onChange={handleChange}
                value={data.connectToLab}
                className="form-input focus:outline-primary text-gray-light"
              />
            </div>

            {/* Test Type */}
            <div className="col-span-2">
              <label
                htmlFor="testType"
                className="form-label !text-base !font-light"
              >
                Test Type
              </label>
              <input
                type="text"
                name="testType"
                id="testType"
                placeholder="e.g. Blood, X-Ray"
                onChange={handleChange}
                value={data.testType}
                className="form-input focus:outline-primary text-gray-light"
              />
            </div>

            {/* Symptoms / Notes */}
            <div className="col-span-2">
              <label
                htmlFor="notes"
                className="form-label !text-base !font-light"
              >
                Symptoms / Notes
              </label>
              <textarea
                name="notes"
                id="notes"
                rows={4}
                placeholder="Enter symptoms or notes"
                onChange={handleChange}
                value={data.notes}
                className="form-input focus:outline-primary text-gray-light resize-none"
              ></textarea>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default LabInputTestResultModal;
