import UserImage from "../../assets/images/patient/user.png";
import InfoLabel from "../../components/common/InfoLabel";
import { IoChatbubbleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import {
  ILabOrder,
  IPatient,
  IDoctor,
  IAppointment,
   IResult, IResults
} from "../../types/Interfaces";
import { BiArrowBack } from "react-icons/bi";
import DoctrImage from "../../assets/images/doctor/doctor.png";
import { useEffect, useState } from "react";
import routeLinks from "../../utils/routes";

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
  handleSubmit?: (e:object | undefined) => void;
  type?: "lab" | string;
  handleStatus?: () => void;
  results?: IResults | null;
  resultError?: string | null;
  isLoadingResults?: boolean;
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
}: LabOrderDetailsProps) => {
  const [resultList, setResultList] = useState<IResult[]>([]);
  const [newResult, setNewResult] = useState<IResult>({
    testName: "",
    result: "",
    unit: "",
    referenceRange: "",
  });
  const [note, setNote] = useState<string>("");

  useEffect(() => {
    console.log(results);
    if (results?.results) {
      setResultList(results.results);
    }
    if (results?.notes) {
      setNote(results.notes);
    }
  }, [results]);

  const navigate = useNavigate();

  if (isLoading) return <p className="p-4">Loading...</p>;
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
      alert("Please fill out all fields.");
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
    if (handleSubmit) {
    handleSubmit(payload);
    console.log("Submitting payload:", payload);
    }
  };

  return (
    <div className="container-bd max-w-6xl mx-auto">
      <div className="w-full">
        <button
          onClick={handNavigate}
          className="text-xl text-primary gap-2 font-semibold my-4 flex items-center"
        >
          <BiArrowBack /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
          {/* Test Overview */}
          <section className="lg:col-span-4 lg:row-span-2">
            <main className="w-full space-y-4 rounded-lg p-4">
              <h2 className="text-xl font-semibold">Test Overview</h2>
              <main className="grid grid-cols-2 gap-4 pt-4">
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
                      ? `${moment(appointment.date).format(
                          "MMM D, YYYY"
                        )} at ${moment(appointment.date).format("h:mm A")}`
                      : "N/A"
                  }
                  info="Appointment Date"
                />
                <InfoLabel
                  label={appointment?.status}
                  info="Appointment Status"
                />
                <InfoLabel
                  label={moment(createdAt).format("MMM D, YYYY h:mm A")}
                  info="Requested On"
                />
                <InfoLabel
                  label={collectedSample ? "Yes" : "No"}
                  info="Test Sample Collected"
                />
                <div className="col-span-2">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4">
                    Status History
                  </h3>
                  <ol className="relative border-l-2 border-gray-300 ml-4">
                    {statusHistory?.map((entry, index) => (
                      <li key={index} className="mb-10 ml-6">
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
                    <div className="flex justify-end gap-3 pt-4">
                      <button
                        className="bg-primary hover:bg-primary/50 text-white text-sm px-4 py-3 rounded-md"
                        onClick={() => {
                          if (
                            confirm(
                              "Do you want to change the status to 'IN_PROGRESS'?"
                            )
                          ) {
                            handleStatus?.();
                          }
                        }}
                      >
                        Start Test
                      </button>
                    </div>
                  )}
                </div>
              </main>
            </main>
          </section>

          {/* Patient Info */}
          <section className="lg:col-span-3">
            <div className="w-full space-y-4 h-full bg-gray-50 rounded-lg p-4">
              <main className="flex items-center gap-4">
                <div className="w-20 h-20">
                  <img
                    src={UserImage}
                    alt="avatar"
                    className="w-full h-full rounded-full"
                  />
                </div>
                <p className="font-semibold text-base capitalize">
                  {fullPatientName}
                </p>
              </main>
              <h2 className="text-base font-semibold">Patient Information</h2>
              <InfoLabel label={patient?.id ?? "N/A"} info="Patient ID" />
              <InfoLabel label={patient?.email ?? "N/A"} info="Email" />
            </div>
          </section>

          {/* Doctor Info */}
          <section className="lg:col-span-3">
            <div className="h-full space-y-4 bg-gray-50 rounded-lg p-4">
              <main className="flex items-center gap-4">
                <div className="w-20 h-20">
                  <img
                    src={DoctrImage}
                    alt="avatar"
                    className="w-full h-full rounded-full"
                  />
                </div>
                <p className="font-semibold text-base capitalize">
                  {fullDoctorName}
                </p>
              </main>
              <h2 className="text-base font-semibold">Doctor Information</h2>
              <InfoLabel label={doctor?.id ?? "N/A"} info="Doctor ID" />
              <InfoLabel label={doctor?.specialty ?? "N/A"} info="Specialty" />
            </div>
          </section>

          {/* Doctor Note */}
          <section className="lg:col-span-7">
            <div className="w-full space-y-4 rounded-lg p-4">
              <p className="text-lg flex items-center gap-2">
                <IoChatbubbleOutline /> Doctor&apos;s Note
              </p>
              <article className="text-base text-gray-700">{notes}</article>
            </div>
          </section>
        </div>
      </div>

        <section>
          {/* Test Results Section */}
          <div className="mt-6 container-bd">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Test Results
            </h2>

            {isLoadingResults ? (
              <p>Loading results...</p>
            ) : resultError ? (
              <div>{resultError}</div>
            ) : (
              resultList.map((result, index) => (
                <div
                  key={index}
                  className="flex flex-row items-center justify-between gap-4 mt-2"
                >
                  <input
                    value={result.testName}
                    readOnly
                    className="w-full p-3 bg-text-gray-500  focus:outline-primary text-sm rounded-sm"
                  />
                  <input
                    value={result.result}
                    readOnly
                    className="w-full p-3 bg-text-gray-500  focus:outline-primary text-sm rounded-sm"
                  />
                  <input
                    value={result.unit}
                    readOnly
                    className="w-full p-3 bg-text-gray-500  focus:outline-primary text-sm rounded-sm"
                  />
                  <input
                    value={result.referenceRange}
                    readOnly
                    className="w-full p-3 bg-text-gray-500  focus:outline-primary text-sm rounded-sm"
                  />
                  {type === "lab" && (
                    <button
                      className="text-white bg-primary  p-2 px-4 rounded-lg"
                      onClick={() => removeResult(index)}
                    >
                      x
                    </button>
                  )}
                </div>
              ))
            )}

            {/* Add New Result */}
            {type === "lab" && (
              <section>
                <div className="flex flex-row items-center justify-between gap-4 mt-4">
                  <input
                    type="text"
                    name="testName"
                    placeholder="Test Name"
                    className="w-full p-3 bg-text-gray-500  focus:outline-primary text-sm rounded-sm"
                    value={newResult.testName}
                    onChange={handleNewResultChange}
                  />
                  <input
                    type="text"
                    name="result"
                    placeholder="Result"
                    className="w-full p-3 bg-text-gray-500  focus:outline-primary text-sm rounded-sm"
                    value={newResult.result}
                    onChange={handleNewResultChange}
                  />
                  <input
                    type="text"
                    name="unit"
                    placeholder="Unit"
                    className="w-full p-3 bg-text-gray-500  focus:outline-primary text-sm rounded-sm"
                    value={newResult.unit}
                    onChange={handleNewResultChange}
                  />
                  <input
                    type="text"
                    name="referenceRange"
                    placeholder="Reference Range"
                    className="w-full p-3 bg-text-gray-500  focus:outline-primary text-sm rounded-sm"
                    value={newResult.referenceRange}
                    onChange={handleNewResultChange}
                  />
                  <button
                    className="text-white bg-primary p-2 px-4 rounded-lg"
                    onClick={addNewResult}
                  >
                    +
                  </button>
                </div>
              </section>
            )}
          </div>

          {/* Result Note */}
          <section className="lg:col-span-7">
            <div className="w-full space-y-4 rounded-lg p-4">
              <p className="text-lg flex items-center gap-2">
                <IoChatbubbleOutline /> Result Note
              </p>
              <textarea
                  className="w-full p-3 bg-text-gray-500  focus:outline-primary text-sm rounded-sm"
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
                  >
                    Save Note & Results
                  </button>
                </div>
              )}
            </div>
          </section>
        </section>
    </div>
  );
};

export default LabOrderDetails;
