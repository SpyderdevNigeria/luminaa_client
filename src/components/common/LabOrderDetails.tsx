import UserImage from "../../assets/images/patient/user.png";
import InfoLabel from "./InfoLabel";
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
import { FaTrashCan } from "react-icons/fa6";
import { BiArrowBack } from "react-icons/bi";
import DoctrImage from "../../assets/images/doctor/doctor.png";
import { useEffect, useState } from "react";
import routeLinks from "../../utils/routes";
import { TestDetailsSkeleton } from "../skeleton/SkeletonCards";
import LabOrderDocuments from "./LabOrderDocuments";
import LabRequestReportModal from "../modal/LabRequestReportModal";
import { MdAddBox } from "react-icons/md";
import { useToaster } from "./ToasterContext";
import ConfirmModal from "../modal/ConfirmModal";
import LabRequestResultReportModal from "../modal/LabRequestResultReportModal";
import UpdateSampleCollectionModal from "../modal/UpdateSampleCollectionModal";
interface LabOrderDetailsProps {
  data: {
    sampleDetails: any;
    data: ILabOrder & {
      patient: IPatient;
      doctor: IDoctor;
      appointment: IAppointment;
      sampleDetails: any;
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
  loadingStatus?: boolean;
  fetchOrder?: () => void;
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
  loadingStatus,
  fetchOrder,
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
  const [startLoading, setStartLoading] = useState(false);
  const { showToast } = useToaster();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [showModalSample, setShowModalSample] = useState(false);

  const [confirmMessage, setConfirmMessage] = useState("");
  const [confrimLoading, setConfrimLoading] = useState(false);
  useEffect(() => {
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
    if (newResult.testName && newResult.result) {
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
    const payload = {
      labTestOrderId: data.data.id,
      results: resultList,
      notes: note,
      documents: [],
    };
    if (payload?.results?.length === 0)
      return showToast("Please add the Result to submit result ", "error");
    if (payload?.notes === "")
      return showToast("YOu need to add an Interpretation", "error");

    handleSubmit?.(payload);
    console.log("Submitting payload:", payload);
  };

  const handleStatusChange = () => {
    setStartLoading(!startLoading);
    setConfirmMessage("Do you want to begin this Test?");
    setConfirmOpen(!confirmOpen);
  };

  const onConfirm = async () => {
    setConfrimLoading(loadingStatus ?? true);
    handleStatus?.();
    setConfirmOpen(loadingStatus ?? false);
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
        <div className="space-y-6">
          {/* Test Overview Section */}
          <section className="bg-white rounded-xl space-y-4">
            <h2 className="text-2xl font-semibold text-primary mb-2">
              Test Overview
            </h2>

            <div className="flex flex-wrap gap-4 justify-between">
              <InfoLabel label={testName} info="Test Name" />
              <InfoLabel
                label={status || "pending"}
                info="Test Status"
                style="bg-blue-100 text-blue-700 py-1 px-2 rounded-md"
              />
              <InfoLabel
                label={priority}
                info="Test Priority"
                style={`py-1 px-2 rounded-md ${
                  priority === "high"
                    ? "bg-red-100 text-red-600"
                    : priority === "medium"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-green-100 text-green-700"
                }`}
              />
              {appointment && (
                <InfoLabel
                  label={
                    appointment?.date
                      ? `${moment(appointment.date).format(
                          "MMM D, YYYY"
                        )} at ${moment(appointment.date).format("h:mm A")}`
                      : "N/A"
                  }
                  info="Appointment Date"
                />
              )}
              {appointment && (
                <InfoLabel
                  label={appointment?.status}
                  info="Appointment Status"
                />
              )}
              <InfoLabel
                label={moment(createdAt).format("MMM D, YYYY h:mm A")}
                info="Requested On"
              />
              <InfoLabel
                label={collectedSample ? "Yes" : "No"}
                info="Sample Collected"
              />
            </div>

            {/* Status History */}
            <div className="pt-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Status History
              </h3>
              <ol className="relative mx-4">
                {statusHistory?.map((entry, index) => (
                  <li
                    key={index}
                    className={`relative pb-10 ${
                      index !== statusHistory.length - 1
                        ? "before:absolute before:top-5 before:start-[2px] before:h-full before:w-[2px] before:bg-primary"
                        : ""
                    }`}
                  >
                    {/* Dot */}
                    <div className="absolute w-4 h-4 bg-primary rounded-full -start-[5px] top-1.5 border-2 border-white shadow-sm z-10 " />

                    {/* Status Content */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4">
                      <h3 className="text-sm md:text-base font-semibold text-gray-800">
                        {entry.status}
                      </h3>
                      <time className="text-xs md:text-sm text-gray-500">
                        {moment(entry.updatedAt).format("MMM D, YYYY • h:mm A")}{" "}
                        by{" "}
                        <span className="font-medium text-gray-700">
                          {entry.updatedBy}
                        </span>
                      </time>
                    </div>
                  </li>
                ))}
              </ol>
              {type == "lab" && data?.data?.status === "PENDING" ? (
                <div className="flex justify-end pt-4 ">
                  <button
                    onClick={() => {
                      setShowModalSample(true);
                    }}
                    className="bg-primary hover:bg-primary/90 text-white text-sm font-medium px-6 py-2 rounded-md transition"
                  >
                    upload collected sample
                  </button>
                </div>
              ) : (
                type === "lab" &&
                data?.data?.status === "SAMPLE_COLLECTED" && (
                  <div className="flex justify-end pt-4">
                    <button
                      className="bg-primary hover:bg-primary/90 text-white text-sm font-medium px-6 py-2 rounded-md transition"
                      onClick={handleStatusChange}
                      disabled={startLoading}
                    >
                      {startLoading ? "Starting..." : "Start Test"}
                    </button>
                  </div>
                )
              )}
            </div>
          </section>
          {data?.data?.sampleDetails  && (
            <section>
              <h2 className="text-xl font-semibold mb-2 text-primary">
                sampleDetails
              </h2>
              <div className="flex flex-col lg:flex-row gap-6">
                <InfoLabel
                  label={data?.data?.sampleDetails?.sample}
                  info="Sample"
                />
                <InfoLabel
                  label={data?.data?.sampleDetails?.volume}
                  info="Volume"
                />
                <InfoLabel
                  label={data?.data?.sampleDetails?.containerType}
                  info="Container Type"
                />
                <InfoLabel
                  label={moment(data?.data?.sampleDetails?.collectionDate).format("MMM D, YYYY h:mm A")}
                  info="Collection Date"
                />
              </div>
            </section>
          )}
          {/* Patient & Doctor Info */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Patient Info */}
            <div className="flex-1 bg-white rounded-xl">
              <h2 className="text-xl font-semibold mb-2 text-primary">
                Patient Info
              </h2>
              <div className="flex items-center gap-4 mb-2">
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
            {doctor && (
              <div className="flex-1 bg-white rounded-xl">
                <h2 className="text-xl font-semibold mb-2 text-primary">
                  Doctor Info
                </h2>
                <div className="flex items-center gap-4 mb-2">
                  <img
                    src={DoctrImage}
                    alt="avatar"
                    className="w-16 h-16 rounded-full border"
                  />
                  <p className="font-semibold text-base capitalize">
                    {fullDoctorName}
                  </p>
                </div>
                <InfoLabel
                  label={doctor?.specialty ?? "N/A"}
                  info="Specialty"
                />
              </div>
            )}
          </div>

          {/* Doctor's Note */}
          {type !== "patient" && (
            <div className="bg-white rounded-xl">
              <h3 className="text-xl font-semibold text-primary mb-2">
                Doctor's Note
              </h3>
              <article className="text-base text-gray-700 whitespace-pre-line bg-gray-50 p-4 rounded-md border border-gray-100">
                {notes || "No note provided."}
              </article>
            </div>
          )}

          <div className="flex justify-end">
            {type === "patient" && (
              <button
                className="bg-primary text-white text-sm font-medium py-3 px-4 rounded-lg hover:bg-primary/90 transition"
                onClick={() => setModalOpen(!isModalOpen)}
              >
                Download PDF
              </button>
            )}
          </div>
          {/* PDF Modal */}
          {type === "patient" && (
            <LabRequestReportModal
              results={{
                testName,
                notes: notes ?? "",
                priority: priority ?? "",
                status: status ?? "",
                collectedSample: collectedSample ?? false,
                resultList: results?.results,
                documents: results?.documents,
                patient,
                statusHistory: statusHistory,
                doctor,
                createdAt,
              }}
              isModalOpen={isModalOpen}
              setModalOpen={setModalOpen}
            />
          )}
        </div>
      )}

      {activeTab === "Results" && (
        <div>
          {collectedSample ? (
            <div>
              {/* Test Results Section */}
              <div className="mt-6 ">
                <h2 className="text-2xl font-semibold text-primary mb-2">
                  Results Overview
                </h2>

                {/* PDF Download Button */}
                <div className="flex justify-end">
                  {type === "patient" && (
                    <button
                      className="bg-primary text-white text-sm font-medium py-3 px-4 rounded-lg hover:bg-primary/90 transition mb-6"
                      onClick={() => setModalOpen(!isModalOpen)}
                    >
                      Download PDF
                    </button>
                  )}
                </div>

                {type === "patient" && (
                  <LabRequestResultReportModal
                    results={{
                      testName,
                      notes: notes ?? "",
                      resultList: results?.results,
                      documents: results?.documents,
                      statusHistory: statusHistory,
                      patient,
                      doctor,
                      createdAt,
                    }}
                    isModalOpen={isModalOpen}
                    setModalOpen={setModalOpen}
                  />
                )}
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
                          <FaTrashCan className="text-xl md:mt-8" />
                        </button>
                      )}
                    </div>
                  ))
                )}

                {/* Add New Result */}
                {type === "lab" && (
                  <section>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-4">
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

                      <button className="" onClick={addNewResult}>
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
                  <div className="w-full mt-8 space-y-4 rounded-lg">
                    <p className="text-base flex items-center gap-2">
                      Interpretation
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
                          disabled={isLoadingResults}
                        >
                          {isLoadingResults
                            ? "Save Results..."
                            : "Save Note & Results"}
                        </button>
                      </div>
                    )}
                  </div>
                </section>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 h-70 ">
              <h1>
                {" "}
                You dont have any Result here, if you want to upload result you
                need to start the test{" "}
              </h1>
              {type == "lab" && data?.data?.status === "PENDING" ? (
                <div className="flex justify-end pt-4 ">
                  <button
                    onClick={() => {
                      setShowModalSample(true);
                    }}
                    className="bg-primary hover:bg-primary/90 text-white text-sm font-medium px-6 py-2 rounded-md transition"
                  >
                    upload collected sample
                  </button>
                </div>
              ) : (
                type === "lab" &&
                data?.data?.status === "SAMPLE_COLLECTED" && (
                  <div className="flex justify-end pt-4">
                    <button
                      className="bg-primary hover:bg-primary/90 text-white text-sm font-medium px-6 py-2 rounded-md transition"
                      onClick={handleStatusChange}
                      disabled={startLoading}
                    >
                      {startLoading ? "Starting..." : "Start Test"}
                    </button>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      )}
      <UpdateSampleCollectionModal
        id={data?.data?.id}
        onClose={() => setShowModalSample(false)}
        onSuccess={() => {
          fetchOrder?.();
        }}
        open={showModalSample}
      />

      <ConfirmModal
        open={confirmOpen}
        description={confirmMessage}
        onConfirm={onConfirm}
        onClose={() => {
          setConfirmOpen(false);
          setStartLoading(false);
        }}
        loading={confrimLoading}
      />
    </div>
  );
};

export default LabOrderDetails;
