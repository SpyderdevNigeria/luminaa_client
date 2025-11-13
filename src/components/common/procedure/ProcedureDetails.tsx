import React, { useEffect, useState } from "react";
import AdminApi from "../../../api/adminApi";
import { useToaster } from "../ToasterContext";
import ActionSchedule from "./form/ActionSchedule";
import ActionStatus from "./form/ActionStatus";
import ActionPayment from "./form/ActionPayment";
import ActionConsent from "./form/ActionConsent";
import Overview from "./tab/Overview";
import Patient from "./tab/Patient";
import Doctor from "./tab/Doctor";
import Appointment from "./tab/Appointment";
import ActionVitalsCreate from "./form/ActionVitalsCreate";
import { BiArrowBack } from "react-icons/bi";
import ProcedureReport from "./form/ProcedureReport";
import DrugChart from "../DrugChart";
// import MedicalHistorySection from "../MedicalHistorySection";
import ProcedureDocuments from "./form/ProcedureDocuments";
import ProcedureResults from "./form/ProcedureResults";
import InputOutput from "../input-output/InputOutput";
import PaymentDetails from "../PaymentDetails";


interface ProcedureDetailsProps {
  data: any;
  isLoading: boolean;
  error: string | null;
  onUpdated?: () => void;
  type?: string;
}

const ProcedureDetails: React.FC<ProcedureDetailsProps> = ({
  data,
  isLoading,
  error,
  onUpdated,
  type,
}) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [scheduledDate, setScheduledDate] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [status, setStatus] = useState("");
  const [note, setNote] = useState("");
  const [noteForConsent, setNoteForConsent] = useState("");
  const [consentFiles, setConsentFiles] = useState<FileList | null>(null);
  const { showToast } = useToaster();
  const [tab, setTab] = useState<"status" | "payment" | "schedule" | "consent" | "vitals" | "report" | "documents" | "results">("payment");
  const [editingVital, setEditingVital] = useState<any>(null);
  const [addNewVital, setAddNewVital] = useState(false);

  useEffect(() => {
    if (data?.data) {
      setScheduledDate(data?.data?.scheduledDate || "");
      setPaymentStatus(data?.data?.paymentStatus || "");
      setStatus(data?.data?.status || "");
      setNote(data?.data?.note || "");
      setNoteForConsent(data?.data?.note || "");
      setConsentFiles(null);
    }

  }, [data?.data]);

  if (isLoading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-red-500 text-center">{error}</div>;
  if (!data)
    return (
      <div className="p-6 text-gray-500 text-center">
        No details available.
      </div>
    );

  const procedure = data?.data || data;
  const procedureId = procedure?.id;



  /** ---- ACTION HANDLERS ---- **/
  const handleSchedule = async () => {
    if (!scheduledDate) return;
    try {
      setLoadingAction("schedule");
      await AdminApi.scheduleProcedure(
        procedureId,
        new Date(scheduledDate).toISOString()
      );
      showToast("Procedure scheduled successfully", "success");
      onUpdated?.();
    } catch (error: any) {
      showToast(error?.response?.message || error?.response?.data?.message || "Failed to schedule procedure", "error");
    } finally {
      setLoadingAction(null);
    }
  };

  const handlePaymentStatus = async () => {
    if (!paymentStatus) return;
    try {
      setLoadingAction("payment");
      await AdminApi.updateProcedurePayment(procedureId, paymentStatus);
      showToast("Payment status updated successfully", "success");
      onUpdated?.();
    } catch (error: any) {
      showToast(error?.response?.data?.message || error?.response?.message || "Failed to update payment status", "error");
    } finally {
      setLoadingAction(null);
    }
  };

  const handleStatusUpdate = async () => {
    if (!status) return;
    try {
      setLoadingAction("status");
      await AdminApi.updateProcedureStatus(procedureId, status, note);
      showToast("Status updated successfully", "success");
      onUpdated?.();
    } catch (error: any) {
      console.log(error?.response?.data)
      showToast(error?.response?.message || error?.response?.data?.message || "Failed to update status", "error");
    } finally {
      setLoadingAction(null);
    }
  };

  const handleConsentUpload = async () => {
    if (!consentFiles) return;
    try {
      setLoadingAction("consent");
      await AdminApi.uploadConsentForm(procedureId, consentFiles, noteForConsent);
      showToast("Consent form uploaded successfully", "success");
      onUpdated?.();
    } catch (error: any) {

      showToast(error?.response?.message || error?.response?.data?.message || "Failed to upload consent form", "error");
    } finally {
      setLoadingAction(null);
    }
  };

  return (
    <div className=" rounded-b-lg">
      <button className="mb-4 text-sm text-primary flex flex-row gap-2 items-center" onClick={() => window.history.back()}>
        <BiArrowBack /> back
      </button>
      {/* ---- TOP TAB NAVIGATION ---- */}
      <div className="flex flex-wrap border-b border-gray-200 mb-4 bg-white ">
        {["overview",  "appointment",]
          .concat(type === "nurse" ? [ "patient", "doctor", 'drugchart', "vitals", "intake-outtake" ,  "actions",] : [])
          .concat(type === "admin" ? [ "patient", "doctor", "payment details", "actions",] : [])
          .concat(type === "doctor" ? [ "patient", "intake-outtake" , 'vitals', 'drugchart',"procedure documents",'procedure results'] : [])
          .map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium capitalize border-b-2  transition-all duration-200 ${activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-primary"
                }`}
            >
              {tab}
            </button>
          ))}
      </div>

      {/* ---- TAB CONTENT ---- */}
      <div className="space-y-6">
        {/* --- OVERVIEW --- */}
        {activeTab === "overview" && procedure && (
          <Overview procedure={procedure} type={type} />
        )}
        {/* --- PATIENT INFO --- */}
        {activeTab === "patient" && (
          <Patient procedure={procedure} />

        )}
        {activeTab === "payment details" && (
          <div>
        <PaymentDetails entityType="procedure" entityId={procedure.id} patientId={procedure?.patient?.id} amount={procedure.amount} />
          </div>
        )}
        {/* --- DOCTOR INFO --- */}
        {activeTab === "doctor" && (

          <Doctor procedure={procedure} />

        )}

        {activeTab === "intake-outtake" && (
          <InputOutput procedure={procedure} type={type === "nurse" ? "admin" : "doctor"} />
        )}

       {activeTab === "vitals" && (
                <div className="p-4 bg-white">

                  {/* Vitals Section */}
                {procedure?.scheduledDate ?  
                 <div>
                    
                  {type === "nurse" && (
                    <div className="flex items-center justify-between flex-row">
                      <h3 className="text-2xl">Vitals</h3>
                              <button
                    onClick={() => setAddNewVital(!addNewVital)}
                    className="mt-3 px-4 py-2 bg-primary text-white rounded"
                  >
                    {!addNewVital ? "Add Vital" : "Cancel"} 
                  </button>
                    </div>
                  )}

                  {!editingVital && !addNewVital ? 
                    procedure?.vitals?.length > 0 ? (
                    <div className="mt-8">
                      <h3 className="text-base font-semibold text-gray-700 mb-3">
                        Vitals
                      </h3>
                      <div className="overflow-x-auto border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <table className="min-w-full text-sm text-gray-700">
                          <thead className="bg-gray-100 border-b border-gray-200">
                            <tr>
                              {/* <th className="px-3 py-2 text-left font-medium">Temperature</th> */}
                              <th className="px-3 py-2 text-left font-medium">Pulse</th>
                              <th className="px-3 py-2 text-left font-medium">BP (Sys/Dia)</th>
                              {/* <th className="px-3 py-2 text-left font-medium">Heart Rate</th> */}
                              <th className="px-3 py-2 text-left font-medium">Resp. Rate</th>
                              {/* <th className="px-3 py-2 text-left font-medium">O₂ Sat</th> */}
                              <th className="px-3 py-2 text-left font-medium">Weight</th>
                              <th className="px-3 py-2 text-left font-medium">Height</th>
                              <th className="px-3 py-2 text-left font-medium">Notes</th>
                              {/* <th className="px-3 py-2 text-left font-medium">Actions</th> */}
                            </tr>
                          </thead>
                          <tbody>
                            {procedure?.vitals.map((v: any) => (
                              <tr key={v?.id} className="border-b border-gray-200">
                                {/* <td className="px-3 py-2">{v?.temperature || "—"}</td> */}
                                <td className="px-3 py-2">{v?.pulse || "—"}</td>
                                <td className="px-3 py-2">{v?.systolicBP}/{v?.diastolicBP}</td>
                                {/* <td className="px-3 py-2">{v?.heartRate || "—"}</td> */}
                                <td className="px-3 py-2">{v?.respiratoryRate || "—"}</td>
                                {/* <td className="px-3 py-2">{v?.oxygenSaturation || "—"}</td> */}
                                <td className="px-3 py-2">{v?.weight || "—"}</td>
                                <td className="px-3 py-2">{v?.height || "—"}</td>
                                <td className="px-3 py-2">{v?.notes || "—"}</td>
                                {/* <td className="px-3 py-2">
                        <button
                          onClick={() => setEditingVital(v)}
                          className="text-blue-600 hover:underline text-sm"
                        >
                          Edit
                        </button>
                      </td> */}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : <div> 
                     <div className="mt-8">
                      <h3 className="text-base font-semibold text-gray-700 mb-3">
                        Vitals
                      </h3>

                      <p className="flex flex-col items-center justify-center h-[500px]">No Vitals Found</p>
                        </div>
                      </div> : null
                  }
                  {/* AdminVitalsCreate form for add/edit */}
                  {(editingVital || addNewVital) && (
                    <ActionVitalsCreate
                      vital={editingVital}
                      patientId={procedure?.patient?.id}
                      appointmentId={procedure?.appointment?.id}
                      procedureId={procedure.id}
                      onClose={() => {
                        setEditingVital(null);
                        setAddNewVital(false);
                        onUpdated?.();
                      }}
                      back={false}
                    />
                  )}
                  </div> : 
                  <div>
                    <h3 className="text-2xl">Vitals</h3>
                    <p className="text-gray-700">You need to schedule an appointment first.</p>
                  </div>
                  
                  }


                </div>
        )}


          {activeTab === "procedure documents" && (
           <div className="p-4 bg-white">
                 <ProcedureDocuments
                  procedure={procedure}
                  procedureId={procedure?.id}
                  fetchProcedure={onUpdated}
                />
           </div>
          )}

        {/* {activeTab === "medicalHistory" &&
          (
            <MedicalHistorySection procedure={procedure} type={'doctor'} fetchProcedure={onUpdated} />
          )} */}

        {/* --- APPOINTMENT --- */}
        {activeTab === "appointment" && (
          <Appointment procedure={procedure}  type={type }/>
        )}
        {activeTab === "drugchart" && (
          <DrugChart
            patientId={procedure?.patient?.id}
            procedureId={procedure?.id}
            type={type === "nurse" ? "admin" : "doctor" }
          />

        )}

         {activeTab === "procedure results" && (
                <ProcedureResults
                  procedure={procedure}
                  procedureId={procedure?.id}
                  fetchProcedure={onUpdated}
                />
              )}
        {/* --- ADMIN ACTIONS (Modal inside) --- */}
        {activeTab === "actions" && (
          <div className="flex flex-col md:flex-row gap-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            {/* Left Tabs Section */}
            <div className="w-full md:w-1/4 border-r border-gray-200">
              <h2 className="text-base font-semibold text-gray-700 mb-3 px-2">Actions</h2>
              <div className="flex md:flex-col overflow-x-auto md:overflow-visible">
                {["payment", "status", "schedule", ]
                  .concat(type === "nurse" ? ["consent", "report",  ] : [])
                  .map((t) => (
                    <button
                      key={t}
                      onClick={() => setTab(t as "status" | "payment" | "schedule" | "consent" | "vitals" | "report")}
                      className={`flex items-center justify-start gap-2 px-3 py-2 text-sm font-medium capitalize transition-all duration-150  mb-1
                        ${tab === t
                          ? "bg-primary/10 text-primary border-s-4 border-primary"
                          : "text-gray-600 hover:text-primary hover:bg-gray-50"
                        }`}
                    >
                      {t}
                    </button>
                  ))}
              </div>
            </div>

            {/* Right Content Section */}
            <div className="w-full md:w-3/4 p-2">
              {/* Schedule */}
              {tab === "schedule" && (
                <ActionSchedule
                  scheduledDate={scheduledDate}
                  setScheduledDate={setScheduledDate}
                  handleSchedule={handleSchedule}
                  loading={loadingAction === "schedule"}
                  procedure={procedure}
                  type={type}
                />
              )}

              {/* Payment */}
              {tab === "payment" && (
                <ActionPayment
                  paymentStatus={paymentStatus}
                  setPaymentStatus={setPaymentStatus}
                  handlePaymentStatus={handlePaymentStatus}
                  loading={loadingAction === "payment"}
                  procedure={procedure}
                  type={type}
                />
              )}

              {/* Status */}
              {tab === "status" && (
                <ActionStatus
                  status={status}
                  setStatus={setStatus}
                  note={note}
                  setNote={setNote}
                  handleStatusUpdate={handleStatusUpdate}
                  loading={loadingAction === "status"}
                  procedure={procedure}
                  type={type}
                />
              )}

              {/* Consent */}
              {tab === "consent" && (
                <ActionConsent
                  consentFiles={consentFiles}
                  setConsentFiles={setConsentFiles}
                  note={noteForConsent}
                  setNote={setNoteForConsent}
                  handleConsentUpload={handleConsentUpload}
                  loading={loadingAction === "consent"}
                  procedure={procedure}
                />
              )}



              {tab === "report" && (
                <ProcedureReport
                  procedure={procedure}
                  procedureId={procedure?.id}
                  fetchProcedure={onUpdated}
                />
              )}






            </div>
          </div>
        )}

      </div>
    </div>
  );
};


export default ProcedureDetails;
