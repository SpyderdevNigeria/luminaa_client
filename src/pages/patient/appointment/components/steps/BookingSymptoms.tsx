import React, { useState } from "react";
import BookingDetails from "../BookingDetails";
import PatientApi from "../../../../../api/patientApi";
import FeedbackMessage from "../../../../../components/common/FeedbackMessage";
interface BookingSymptomsProps {
  prevStep: () => void;
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
}

function BookingSymptoms({ prevStep, data, setData }: BookingSymptomsProps) {
  const [form, setForm] = useState({
    location: "",
    symptoms: "",
  });
  const [message, setMessage] = useState({ message: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Ensure both fields are filled
    if (!form.location || !form.symptoms) return;

    try {
      setIsSubmitting(true);

      const payload = {
        ...data,

        location: form.location,
        patientNote: form.symptoms,
      };
      console.log(payload);
      const response = await PatientApi.createAppointment(payload);

      if (response?.status) {
        setIsSuccess(true);
        setData((prevData: any) => ({
          ...prevData,
          ...payload,
        }));
      } else {
        alert("Appointment creation failed. Please try again.");
      }
    } catch (error) {
      let response: any;
      if (error && typeof error === "object" && "response" in error) {
        response = (error as any).response;
      }
      console.error("Error creating appointment:", error);
      setMessage({
        message: response?.data?.message || "An error occurred",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return <BookingDetails />;
  }

  return (
    <div>
      <form
        className="max-w-2xl w-full mx-auto p-2 md:py-4"
        onSubmit={handleSubmit}
      >
        {message.message && (
          <FeedbackMessage type={message.type} message={message.message} />
        )}
        <div>
          <h4 className="my-6 mx-4  text-base font-[300] text-center  ">
            Please select your preferred consultation location and provide a
            detailed description of your symptoms. This information helps our
            medical team prepare for your appointment and offer the best
            possible care.
          </h4>
          <label htmlFor="location" className="form-label text-primary mb-2">
            Consultation Location
          </label>
          <select
            name="location"
            id="location"
            value={form.location}
            onChange={handleChange}
            className="form-input focus:outline-primary text-gray-light"
            required
          >
            <option value="">Select Location</option>
            <option value="Online">Online</option>
            <option value="Hospital">Hospital</option>
          </select>
        </div>

        <div className="mt-4">
          <label
            htmlFor="symptoms"
            className="block text-xs md:text-lg leading-6 mb-2 text-primary"
          >
            Symptoms
          </label>
          <textarea
            name="symptoms"
            id="symptoms"
            rows={6}
            placeholder="Please specify"
            className="form-input focus:outline-primary text-gray-light"
            value={form.symptoms}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`form-primary-button bg-primary my-4 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Submitting..." : "Finish"}
        </button>

        <button
          type="button"
          onClick={prevStep}
          className="text-primary cursor-pointer w-full"
        >
          Back
        </button>
      </form>
    </div>
  );
}

export default BookingSymptoms;
