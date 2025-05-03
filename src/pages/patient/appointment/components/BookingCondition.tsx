function BookingCondition({ handleStep }: { handleStep: () => void }) {
  return (
    <div className="w-full">
      <main className="max-w-2xl w-full mx-auto p-2 pt-0 md:p-4 ">
        <h5 className="text-xl md:text-2xl text-center  text-secondary-text">
          Premorbid Condition
        </h5>

        <form action="" className="space-y-4 mt-8 gap-4 w-full">
          <div className="">
            <label
              htmlFor="symptoms"
              className="block  text-xs md:text-lg  leading-6 mb-2 text-primary"
            >
              Symptoms
            </label>
            <textarea
              name="symptoms"
              id="symptoms"
              rows={6}
              placeholder="Please Specify"
              className=" form-input focus:outline-primary text-gray-light"
            ></textarea>
          </div>
          {/* Genotype */}
          <div>
            <label
              htmlFor="genotype"
              className="block  text-xs md:text-lg  leading-6 mb-2 text-primary"
            >
              Genotype
            </label>
            <select
              id="genotype"
              name="genotype"
              className=" form-input focus:outline-primary text-gray-light"
            >
              <option value="">Select Genotype</option>
              <option value="AA">AA</option>
              <option value="AS">AS</option>
              <option value="SS">SS</option>
              <option value="AC">AC</option>
            </select>
          </div>

          {/* Blood Group */}
          <div>
            <label
              htmlFor="bloodGroup"
              className="block text-xs md:text-lg  leading-6 mb-2 text-primary"
            >
              Blood Group
            </label>
            <select
              id="bloodGroup"
              name="bloodGroup"
              className=" form-input focus:outline-primary text-gray-light"
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          {/* Past Blood Transfusion */}
          <div>
            <label
              htmlFor="pastBloodTransfusion"
              className="block text-xs md:text-lg  leading-6 mb-2 text-primary"
            >
              Past Blood Transfusion
            </label>
            <input
              type="text"
              id="pastBloodTransfusion"
              name="pastBloodTransfusion"
              placeholder="Yes / No / Details"
              className=" form-input focus:outline-primary text-gray-light"
            />
          </div>

          {/* Past Delivery */}
          <div>
            <label
              htmlFor="pastDelivery"
              className="block text-xs md:text-lg  leading-6 mb-2 text-primary"
            >
              Past Delivery
            </label>
            <select
              id="pastDelivery"
              name="pastDelivery"
              className=" form-input focus:outline-primary text-gray-light"
            >
              <option value="">Select Status</option>
              <option value="None">None</option>
              <option value="1">1</option>
              <option value="2-3">2 - 3</option>
              <option value="4+">4+</option>
            </select>
          </div>

          {/* Past Hospital Admission */}
          <div>
            <label
              htmlFor="pastHospitalAdmission"
              className="block text-xs md:text-lg  leading-6 mb-2 text-primary"
            >
              Past Hospital Admission
            </label>
            <input
              type="text"
              id="pastHospitalAdmission"
              name="pastHospitalAdmission"
              placeholder="Yes / No / Details"
              className=" form-input focus:outline-primary text-gray-light"
            />
          </div>

          {/* HyperTension */}
          <div>
            <label
              htmlFor="hypertension"
              className="block text-xs md:text-lg  leading-6 mb-2 text-primary"
            >
              Hypertension
            </label>
            <input
              type="text"
              id="hypertension"
              name="hypertension"
              placeholder="Yes / No / Details"
              className=" form-input focus:outline-primary text-gray-light"
            />
          </div>

          {/* Diabetes */}
          <div>
            <label
              htmlFor="diabetes"
              className="block text-xs md:text-lg  leading-6 mb-2 text-primary"
            >
              Diabetes
            </label>
            <input
              type="text"
              id="diabetes"
              name="diabetes"
              placeholder="Yes / No / Details"
              className=" form-input focus:outline-primary text-gray-light"
            />
          </div>

          {/* Asthma */}
          <div>
            <label
              htmlFor="asthma"
              className="block text-xs md:text-lg  leading-6 mb-2 text-primary"
            >
              Asthma
            </label>
            <input
              type="text"
              id="asthma"
              name="asthma"
              placeholder="Yes / No / Details"
              className=" form-input focus:outline-primary text-gray-light"
            />
          </div>

          {/* Kidney Disease */}
          <div>
            <label
              htmlFor="kidneyDisease"
              className="block text-xs md:text-lg  leading-6 mb-2 text-primary"
            >
              Kidney Disease
            </label>
            <input
              type="text"
              id="kidneyDisease"
              name="kidneyDisease"
              placeholder="Yes / No / Details"
              className=" form-input focus:outline-primary text-gray-light"
            />
          </div>

          {/* Liver Disease */}
          <div>
            <label
              htmlFor="liverDisease"
              className="block text-xs md:text-lg  leading-6 mb-2 text-primary"
            >
              Liver Disease
            </label>
            <input
              type="text"
              id="liverDisease"
              name="liverDisease"
              placeholder="Yes / No / Details"
              className=" form-input focus:outline-primary text-gray-light"
            />
          </div>

          {/* Epilepsy */}
          <div>
            <label
              htmlFor="epilepsy"
              className="block text-xs md:text-lg  leading-6 mb-2 text-primary"
            >
              Epilepsy
            </label>
            <input
              type="text"
              id="epilepsy"
              name="epilepsy"
              placeholder="Yes / No / Details"
              className=" form-input focus:outline-primary text-gray-light"
            />
          </div>

          {/* Sickle Cell Disease */}
          <div>
            <label
              htmlFor="sickleCell"
              className="block text-xs md:text-lg  leading-6 mb-2 text-primary"
            >
              Sickle Cell Disease
            </label>
            <input
              type="text"
              id="sickleCell"
              name="sickleCell"
              placeholder="Yes / No / Details"
              className=" form-input focus:outline-primary text-gray-light"
            />
          </div>

          {/* Past Medical History */}
          <div className="md:col-span-2">
            <label
              htmlFor="pastMedicalHistory"
              className="block text-xs md:text-lg  leading-6 mb-2 text-primary"
            >
              Past Medical History
            </label>
            <textarea
              id="pastMedicalHistory"
              name="pastMedicalHistory"
              rows={6}
              placeholder="Type here..."
              className=" form-input focus:outline-primary text-gray-light"
            />
          </div>
          <button
            className="cursor-pointer form-primary-button bg-primary  mt-4 "
            onClick={() => {
              handleStep();
            }}
          >
            {"Submit"}
          </button>
        </form>
      </main>
    </div>
  );
}

export default BookingCondition;
