import UserImage from "../../assets/images/patient/user.png";
import InfoLabel from "../../components/common/InfoLabel";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import {
  ILabOrder,
  IPatient,
  IDoctor,
  IAppointment,
  IResult,
  IResults,
} from "../../types/Interfaces";
import { BiArrowBack } from "react-icons/bi";
import DoctrImage from "../../assets/images/doctor/doctor.png";
import { useEffect, useState } from "react";
import routeLinks from "../../utils/routes";
import { TestDetailsSkeleton } from "../skeleton/SkeletonCards";
import LabOrderDocuments from "./LabOrderDocuments";
import LabRequestReportModal from "../modal/LabRequestReportModal";
import { IoMdCloseCircle } from "react-icons/io";
import { MdAddBox } from "react-icons/md";
import { useToaster } from "./ToasterContext";
interface LabOrderDetailsProps {
  data: {
    data: ILabOrder & {
      patient: IPatient;
      doctor: IDoctor;
      appointment: IAppointment;
    };
  } | null;
  isLoading: boolean;
  error: string | null;
  handleSubmit?: (e: object | undefined) => void;
  type?: "lab" | string;
  handleStatus?: () => void;
  results?: IResults | null;
  resultError?: string | null;
  isLoadingResults?: boolean;
  updateDocuments?: () => void;
}

const LabOrderDetails = ({
  data,
  isLoading,
  error,
  handleSubmit,
  type,
  handleStatus,
  results,
  resultError,
  isLoadingResults,
  updateDocuments,
}: LabOrderDetailsProps) => {
  const [resultList, setResultList] = useState<IResult[]>([]);
  const [newResult, setNewResult] = useState<IResult>({
    testName: "",
    result: "",
    unit: "",
    referenceRange: "",
  });
  const [isModalOpen, setModalOpen] = useState(false);
  const [note, setNote] = useState<string>("");
  const [activeTab, setActiveTab] = useState("Test");
 const [startLoading, setStartLoading] = useState(false)
  const [submitResultLoading, setSubmitResultLoading] = useState(false)
   const { showToast } = useToaster();
  useEffect(() => {
    console.log(results?.id);
    if (results?.results) {
      setResultList(results.results);
    }
    if (results?.notes) {
      setNote(results.notes);
    }
  }, [results]);

  const navigate = useNavigate();

  if (isLoading) return <TestDetailsSkeleton />;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!data) return null;

  const {
    testName,
    notes,
    priority,
    status,
    collectedSample,
    statusHistory,
    patient,
    doctor,
    appointment,
    createdAt,
  } = data.data;

  const fullPatientName = `${patient?.firstName ?? ""} ${
    patient?.lastName ?? ""
  }`;
  const fullDoctorName = `${doctor?.firstName ?? ""} ${doctor?.lastName ?? ""}`;
 
  const handNavigate = () => {
    if (type === "lab") {
      navigate(routeLinks?.lab?.labRequests);
    } else if (type === "doctor") {
      navigate(routeLinks?.doctor?.labOrders);
    } else if (type === "patient") {
      navigate(routeLinks?.patient?.lab);
    }
  };

  const handleNewResultChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewResult({ ...newResult, [e.target.name]: e.target.value });
  };

  const addNewResult = () => {
    if (
      newResult.testName &&
      newResult.result &&
      newResult.unit &&
      newResult.referenceRange
    ) {
      setResultList([...resultList, newResult]);
      setNewResult({
        testName: "",
        result: "",
        unit: "",
        referenceRange: "",
      });
    } else {
      showToast("Please fill out all fields.", "error");
    }
  };

  const removeResult = (index: number) => {
    const updated = [...resultList];
    updated.splice(index, 1);
    setResultList(updated);
  };

  const handleSubmitResults = () => {
    setSubmitResultLoading(true)
    const payload = {
      labTestOrderId: data.data.id,
      results: resultList,
      notes: note,
      documents: [],
    };
    if (handleSubmit) {
      handleSubmit(payload);
      console.log("Submitting payload:", payload);
    }
      setSubmitResultLoading(false)
  };

  const handleStatusChange = () => {
    setStartLoading(true)
    if (confirm("Do you want to change the status to 'IN_PROGRESS'?")) {
      handleStatus?.();
    }
    setStartLoading(false)
  };

  return (
    <div className="container-bd max-w-6xl mx-auto">
      <button
        onClick={handNavigate}
        className="text-xl  gap-2 font-semibold mb-4 flex items-center"
      >
        <BiArrowBack /> Back
      </button>

      {/* Tabs Header */}
      <div className="flex  mb-4">
        <button
          className={`px-4 py-2 ${
            activeTab === "Test"
              ? "border-b-2 border-primary font-semibold"
              : ""
          }`}
          onClick={() => setActiveTab("Test")}
        >
          Test
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "Results"
              ? "border-b-2 border-primary font-semibold"
              : ""
          }`}
          onClick={() => setActiveTab("Results")}
        >
        Results
        </button>
      </div>

      {/* Tab Content */}
   {activeTab === "Test" && (
  <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
    {/* Test Overview Section */}
    <section className="lg:col-span-4">
      <div className="bg-white rounded-lg  p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-primary">Test Overview</h2>
        <div className="grid grid-cols-2 gap-4">
          <InfoLabel label={testName} info="Test Name" />
          <InfoLabel
            label={status || "pending"}
            info="Test Status"
            style="bg-blue-100 text-blue-700 py-1 px-2 rounded-sm"
          />
          <InfoLabel
            label={priority}
            info="Test Priority"
            style={`py-1 px-2 rounded-sm ${
              priority === "high"
                ? "bg-red-100 text-red-600"
                : priority === "medium"
                ? "bg-yellow-100 text-yellow-600"
                : "bg-green-100 text-green-700"
            }`}
          />
          <InfoLabel
            label={
              appointment?.date
                ? `${moment(appointment.date).format("MMM D, YYYY")} at ${moment(
                    appointment.date
                  ).format("h:mm A")}`
                : "N/A"
            }
            info="Appointment Date"
          />
          <InfoLabel label={appointment?.status} info="Appointment Status" />
          <InfoLabel
            label={moment(createdAt).format("MMM D, YYYY h:mm A")}
            info="Requested On"
          />
          <InfoLabel
            label={collectedSample ? "Yes" : "No"}
            info="Sample Collected"
          />
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Status History
          </h3>
          <ol className="relative border-l-2 border-gray-300 ml-4">
            {statusHistory?.map((entry, index) => (
              <li key={index} className="mb-8 ml-6">
                <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-8 ring-white">
                  <span className="w-2.5 h-2.5 bg-primary rounded-full" />
                </span>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-gray-800">
                    {entry.status}
                  </span>
                  <span className="px-2 py-0.5 text-xs rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    {moment(entry.updatedAt).format("MMM D, YYYY")}
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  {moment(entry.updatedAt).format("h:mm A")} by{" "}
                  <span className="font-medium text-gray-700">
                    {entry.updatedBy}
                  </span>
                </p>
              </li>
            ))}
          </ol>

          {type === "lab" && !collectedSample && (
            <div className="flex justify-end pt-4">
              <button
                className="bg-primary hover:bg-primary/90 text-white text-sm px-6 py-2 rounded-lg transition duration-200"
                onClick={handleStatusChange}
                disabled={startLoading}
              >
                Start Test
              </button>
            </div>
          )}
        </div>
      </div>
    </section>

    {/* Patient Info */}
    <section className="lg:col-span-3 space-y-6">
      <div className="bg-white rounded-lg  p-6">
        <h2 className="text-xl font-semibold mb-4 text-primary">Patient Info</h2>
        <div className="flex items-center gap-4 mb-4">
          <img
            src={UserImage}
            alt="avatar"
            className="w-16 h-16 rounded-full border"
          />
          <p className="font-semibold text-base capitalize">
            {fullPatientName}
          </p>
        </div>
        <InfoLabel label={patient?.email ?? "N/A"} info="Email" />
      </div>

      {/* Doctor Info */}
      <div className="bg-white rounded-lg  p-6">
        <h2 className="text-xl font-semibold mb-4 text-primary">Doctor Info</h2>
        <div className="flex items-center gap-4 mb-4">
          <img
            src={DoctrImage}
            alt="avatar"
            className="w-16 h-16 rounded-full border"
          />
          <p className="font-semibold text-base capitalize">
            {fullDoctorName}
          </p>
        </div>
        <InfoLabel label={doctor?.specialty ?? "N/A"} info="Specialty" />
      </div>
    </section>

    {/* Doctor Note */}
    <section className="lg:col-span-7">
      <div className="bg-white rounded-lg  p-6">
        <h3 className="text-xl font-semibold text-primary mb-2">Doctor's Note</h3>
        <article className="text-base text-gray-700 whitespace-pre-line bg-gray-50 p-4 rounded-md border border-gray-100">
          {notes || "No note provided."}
        </article>
      </div>
    </section>

    {/* PDF Button */}
    <section className="lg:col-span-2">
      <button
        className=" bg-primary text-white text-sm py-3 px-4 rounded-lg shadow hover:bg-primary/90 transition"
        onClick={() => setModalOpen(!isModalOpen)}
      >
        View & Download PDF
      </button>
    </section>

    {/* Modal */}
    <LabRequestReportModal
      results={{
        testName,
        notes: notes ?? "",
        priority: priority ?? "",
        status: status ?? "",
        collectedSample: collectedSample ?? false,
        patient,
        doctor,
        createdAt,
      }}
      isModalOpen={isModalOpen}
      setModalOpen={setModalOpen}
    />
  </div>
)}


      {activeTab === "Results" && (
        <div>
          {/* Test Results Section */}
          <div className="mt-6 ">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
             Results
            </h2>

            {isLoadingResults ? (
              <p>Loading results...</p>
            ) : resultError ? (
              <div>{resultError}</div>
            ) : (
              resultList.map((result, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row items-center justify-between gap-4 mt-2"
                >
                  <div className="w-full">
                    <label htmlFor="testName"> Test Name</label>
                    <input
                      value={result.testName}
                      readOnly
                      className="w-full p-3 form-input mt-2 focus:outline-primary text-sm rounded-sm"
                    />
                  </div>
                  <div className="w-full">
                    <label htmlFor="result"> Result</label>
                    <input
                      value={result.result}
                      readOnly
                      className="w-full p-3 form-input mt-2 focus:outline-primary text-sm rounded-sm"
                    />
                  </div>
               <div className="w-full">
                    <label htmlFor="unit"> Unit</label>
                    <input
                      value={result.unit}
                      readOnly
                      className="w-full p-3 form-input mt-2 focus:outline-primary text-sm rounded-sm"
                    />
                  </div>
              <div className="w-full">
                    <label htmlFor="referenceRange"> Reference Range</label>
                    <input
                      value={result.referenceRange}
                      readOnly
                      className="w-full p-3 form-input mt-2 focus:outline-primary text-sm rounded-sm"
                    />
                  </div>
                  {type === "lab" && (
                      <button
                        className="text-red-500 "
                        onClick={() => removeResult(index)}
                      >
                       <IoMdCloseCircle className="text-3xl md:mt-8" />
                      </button>
                  )}
                </div>
              ))
            )}

            {/* Add New Result */}
            {type === "lab" && (
              <section>
                <div  className="flex flex-col md:flex-row items-center justify-between gap-4 mt-4">

             
                    <input
                      type="text"
                      name="testName"
                      placeholder="Test Name"
                    className="w-full p-3 form-input  focus:outline-primary text-sm rounded-sm"
                      value={newResult.testName}
                      onChange={handleNewResultChange}
                    />

           
                    <input
                      type="text"
                      name="result"
                      placeholder="Result"
                      className="w-full p-3 form-input  focus:outline-primary text-sm rounded-sm"
                      value={newResult.result}
                      onChange={handleNewResultChange}
                    />

        
                    <input
                      type="text"
                      name="unit"
                      placeholder="Unit"
                      className="w-full p-3 form-input  focus:outline-primary text-sm rounded-sm"
                      value={newResult.unit}
                      onChange={handleNewResultChange}
                    />

        
                    <input
                      type="text"
                      name="referenceRange"
                      placeholder="Reference Range"
                      className="w-full p-3 form-input   focus:outline-primary text-sm rounded-sm"
                      value={newResult.referenceRange}
                      onChange={handleNewResultChange}
                    />

         
                    <button
                      className=""
                      onClick={addNewResult}
                    >
                    <MdAddBox className="text-3xl text-primary" />
                    </button>
                </div>
              </section>
            )}
          </div>
          {results?.id && !isLoadingResults && (
            <section className="mt-12">
              <LabOrderDocuments
                resultId={results?.id}
                documents={results?.documents}
                refreshDocuments={updateDocuments}
                type={type}
              />
            </section>
          )}

                  <div>
          {/* Result Note */}
          <section className="lg:col-span-7">
            <div className="w-full mt-8 space-y-4 rounded-lg p-4">
              <p className="text-base flex items-center gap-2">
               Result Note
              </p>
              <textarea
                className="w-full p-3 form-input form-input focus:outline-primary text-sm rounded-sm"
                rows={7}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                disabled={type !== "lab"}
              />
              {type === "lab" && (
                <div className="flex justify-end">
                  <button
                    onClick={handleSubmitResults}
                    className="bg-primary text-white py-2 px-4 rounded-lg"
                    disabled={submitResultLoading}
                  >
                   {submitResultLoading ? "Save Results..." : "Save Note & Results" } 
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>
        </div>
      )}

    </div>
  );
};

export default LabOrderDetails;
