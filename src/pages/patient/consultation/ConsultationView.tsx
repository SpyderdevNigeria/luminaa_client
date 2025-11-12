// additions: tab UI, upload modal, document list with delete

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { TbLocation } from "react-icons/tb";
import { SiGooglemeet } from "react-icons/si";
import PatientApi from "../../../api/PatientApi";
import DoctorImage from "../../../assets/images/doctor/doctor.png";
import DiagnosisCard from "../../../components/common/DiagnosisCard";
import MedicalReportModal from "../../../components/modal/DiagnosisReportModal";
import PrescriptionCard from "../../../components/common/PrescriptionCard";
import PrescriptionDetailsModal from "../../../components/modal/PrescriptionDetailsModal";
import PrescriptionDownloadModal from "../../../components/modal/PrescriptionDownloadModal";

import { getFormattedDateTime } from "../../../utils/dashboardUtils";
import { EntityType, IPrescription } from "../../../types/Interfaces";
import UploadDocumentsModal from "../../../components/modal/UploadDocumentsModal";
import { useToaster } from "../../../components/common/ToasterContext";
import ConfirmModal from "../../../components/modal/ConfirmModal";
import MedicalHistorySection from "../../../components/common/MedicalHistorySection";
import { usePaystackPayment } from "../../../hooks/usePaystackPayment";

interface Diagnosis {
  id?: string;
  primaryDiagnosis: string;
  symptoms: string;
  notes: string;
  severity: string;
  diagnosisCode: string;
  isConfirmed: boolean;
  additionalRecommendations: string;
  createdAt: string;
}

interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
}

const ConsultationView = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<"general" | "diagnosis" | "prescription" | "documents" | "medical history">("general");
  const [appointment, setAppointment] = useState<any>(null);
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);
  const [prescriptions, setPrescriptions] = useState<IPrescription[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<Diagnosis | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState<IPrescription | null>(null);
  const [isModalOpenPrescription, setModalOpenPrescription] = useState(false);
  const [isModalOpenPrescriptionDownload, setModalOpenPrescriptionDownload] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
      const [selectedKey, setSelectedKey] = useState<string | null>(null);
      const [loadingConfirm, setLoadingConfirm] = useState(false);
        const [isProcessing, setIsProcessing] = useState(false);
        const { initializePayment, loading: paymentLoading, message } = usePaystackPayment();
  const { showToast } = useToaster();
  const fetchDocuments = async () => {
    try {
      const res = await PatientApi.getAppointmentsById(id);
      setDocuments(res.data?.patientDocuments || []);
    } catch (error) {
      console.error("Error fetching documents", error);
    }
  };
    const handlePayment = async () => {
      setIsProcessing(true);
      try {
        await initializePayment(EntityType.APPOINTMENT, appointment.id);
      } finally {
        setIsProcessing(false);
      }
    };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appointmentRes, diagnosisRes, prescriptionRes] = await Promise.all([
          PatientApi.getAppointmentsById(id),
          PatientApi.getDiagnosesAppointmentbyId(id),
          PatientApi.getPrescriptionsAppointmentbyId(id),
        ]);

        if (appointmentRes?.data) setAppointment(appointmentRes.data);
        if (diagnosisRes?.data) setDiagnosis(diagnosisRes.data);
        if (prescriptionRes?.data) setPrescriptions(prescriptionRes.data);
        fetchDocuments();
        console.log(appointmentRes?.data?.patientDocuments)
        if (appointmentRes?.data?.patientDocuments) setDocuments(appointmentRes.data.patientDocuments);
      } catch (err) {
        console.error(err);
        setError("Failed to load appointment data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const [loadingUpload, setloadingUpload] = useState(false)
  const handleUploadDocuments = async (formData: FormData) => {
    setloadingUpload(true)
    try {
      await PatientApi.uploadAppointmentDocuments(id, formData);
      setUploadModalOpen(false);
      showToast("Documents uploaded successfully.", "success");
      fetchDocuments();
    } catch (err) {
      console.error("Upload failed", err);
      showToast("Upload failed", "error");
    } finally {
      setloadingUpload(false)
    }
  };

  const handleDeleteDocument = async () => {
    if (!selectedKey) return;
    setLoadingConfirm(true)
    try {
      await PatientApi.deleteUploadAppointmentDocumentById(id, selectedKey);
      fetchDocuments();
      showToast("Document deleted successfully.", "success");
    } catch (err) {
      console.error("Delete failed", err);
      showToast("Delete failed", "error");
    }finally{
      setLoadingConfirm(false)
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!appointment) return <p className="text-center mt-10">No appointment found.</p>;

  const { formattedDate, formattedTime } = getFormattedDateTime(appointment?.scheduledDate);
  const doctor = appointment.doctor;
  const doctorUser = doctor?.user;
    const triggerUploadConfirm = (key: string) => {
    setSelectedKey(key);
    setConfirmOpen(true);
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="md:col-span-1 bg-white  p-6 border border-gray-200 rounded-lg shadow">
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-primary">
            <img
              src={doctorUser?.profilePicture?.url || DoctorImage}
              alt="Doctor"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center mt-4">
            <p className="text-xl font-semibold text-gray-800">
              Dr. {doctorUser?.firstName} {doctorUser?.lastName}
            </p>
            <p className="text-sm text-gray-600">Specialty: {doctor?.specialty}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs">
              <span className="flex items-center gap-1 bg-[#00B2FF1A] text-primary px-3 py-1 rounded-full">
                Meeting Venue: <TbLocation /> {appointment.location}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="md:col-span-3 bg-white  p-6 border border-gray-200 rounded-lg shadow">
        <h1 className="text-xl font-semibold mb-6">Appointment Details</h1>

        {/* Tab Headers */}
        <div className="flex gap-4 mb-6 border-b border-gray-200 overflow-y-hidden overflow-x-scroll scrollbar-visible">
          {["general", "diagnosis", "prescription", "documents", "medical history"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`capitalize px-4 py-2 -mb-px ${activeTab === tab
                  ? "border-b-2 border-primary text-primary font-medium"
                  : "text-gray-500"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* GENERAL TAB */}
        {activeTab === "general" && (
          <div>
            <div className="flex items-center justify-between border-b border-gray-300 py-4">
              <h5 className="text-sm font-medium flex items-center gap-2 text-text-primary">
                <SiGooglemeet className="text-2xl" /> Meeting Details
              </h5>
              <a
                href={appointment?.onlineMeetingDetails?.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 rounded bg-primary text-white text-xs hover:bg-primary-dark"
              >
                Join Meeting
              </a>
            </div>
            <div className="pt-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Appointment Status</h3>
              <p className="text-sm capitalize">{appointment.status}</p>
              <h3 className="text-sm font-medium text-gray-500 mt-6 mb-2">Scheduled Date & Time</h3>
              <p className="text-sm">{formattedDate} at {formattedTime}</p>
              <h3 className="text-sm font-medium text-gray-500 mt-6 mb-2">Patient Note</h3>
              <p className="text-sm">{appointment.patientNote || "No note provided."}</p>
              <h3 className="text-sm font-medium text-gray-500 mt-6 mb-2">Doctor Note</h3>
              <p className="text-sm">{appointment.doctorNote || "No note provided."}</p>
            </div>
            <div>
                <div className="flex flex-col md:flex-row items-center justify-between ">
          <div>
                          <h3 className="text-sm font-medium text-gray-500 mt-6 mb-2">Payment Status</h3>
              <p className="text-sm capitalize">{appointment.paymentStatus}</p>
          </div>
              <div>
                {appointment.paymentStatus === "pending" && (
                          <button
                        className="cursor-pointer text-xs bg-primary mt-4 text-white rounded-lg px-6 py-3 hover:bg-primary/90 transition disabled:opacity-50"
                          disabled={paymentLoading || isProcessing}
                          onClick={handlePayment}
                        >
                          {paymentLoading || isProcessing ? "Processing..." : "Proceed to Pay"}
                        </button>
                )}
              </div>
            </div>
            <p>{message}</p>
            </div>
          </div>
        )}

        {/* DIAGNOSIS TAB */}
        {activeTab === "diagnosis" && (
          <>
            {diagnosis.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-4">
                {diagnosis.map((diag) => (
                  <DiagnosisCard
                    key={diag.id}
                    diagnosis={diag}
                    onView={() => {
                      setSelectedDiagnosis(diag);
                      setModalOpen(true);
                    }}
                  />
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-gray-500">No diagnosis found for this appointment.</p>
            )}
            <MedicalReportModal data={selectedDiagnosis} isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
          </>
        )}

        {/* PRESCRIPTION TAB */}
        {activeTab === "prescription" && (
          <>
            {prescriptions.length > 0 ? (
              <div>
                <div className="flex justify-end">
                  <button className="px-6 py-2 rounded bg-primary text-white text-xs hover:bg-primary-dark"
                    onClick={() => setModalOpenPrescriptionDownload(true)}>
                    Download Prescription
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-4">
                  {prescriptions.map((pres) => (
                    <PrescriptionCard
                      key={pres.id}
                      prescription={pres}
                      onView={() => {
                        setSelectedPrescription(pres);
                        setModalOpenPrescription(true);
                      }}
                    />
                  ))}
                </div>
                <PrescriptionDetailsModal
                  data={selectedPrescription}
                  isModalOpen={isModalOpenPrescription}
                  setModalOpen={setModalOpenPrescription}
                />
                <PrescriptionDownloadModal
                  isModalOpen={isModalOpenPrescriptionDownload}
                  setModalOpen={setModalOpenPrescriptionDownload}
                  prescriptions={prescriptions}
                />
              </div>
            ) : (
              <p className="mt-4 text-sm text-gray-500">No prescriptions found for this appointment.</p>
            )}
          </>
        )}

        {/* DOCUMENTS TAB */}
        {activeTab === "documents" && (
          <div className="space-y-4">
            <div className="flex justify-end">
              <button disabled={loadingUpload} onClick={() => setUploadModalOpen(true)} className="px-6 py-2 rounded bg-primary text-white text-xs hover:bg-primary-dark">
                {loadingUpload ? "Uploading..." : " Upload Documents"}
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {documents.map((doc) => (
                <div key={doc.id} className="p-4 bg-white  rounded shadow border border-gray-200">
                  <div className="mb-2 w-40 h-40 overflow-hidden mx-auto">
                    <img src={doc.url} alt="" className="w-full h-full object-contain" />
                  </div>
                  <div className=" mb-2">
                    <h4 className="text-sm font-medium">Document Name</h4>
                    <h4 className="text-xs text-gray-500">{doc.name}</h4>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Document Type</h4>
                    <p className="text-xs text-gray-500">{doc.type}</p>
                  </div>
                  <div className="flex flex-row items-center justify-between mt-2">
                    <a href={doc.url} target="_blank" rel="noreferrer" className="text-blue-600 text-xs">View Document</a>
                    <button onClick={() => triggerUploadConfirm(doc.id)} className="text-xs text-red-500 ">Delete</button>
                  </div>
                </div>
              ))}
            </div>

                <ConfirmModal
                    open={confirmOpen}
                    onClose={() => {
                      setConfirmOpen(false);
                      setSelectedKey(null);
                    }}
                    title="Confirm Delete"
                    description={`Are you sure you want to delete this document?`}
                    confirmText="Yes, Delete"
                    loading={loadingConfirm}
                    onConfirm={handleDeleteDocument}
                  />
            <UploadDocumentsModal
              isOpen={isUploadModalOpen}
              onClose={() => setUploadModalOpen(false)}
              onUpload={handleUploadDocuments}
              loadingUpload={loadingUpload}
            />
          </div>
        )}

         {activeTab === "medical history" &&
          (
            <MedicalHistorySection procedure={appointment} type={'patient'} fetchProcedure={()=> {}} />
          )} 
      </div>
    </div>
  );
};

export default ConsultationView;