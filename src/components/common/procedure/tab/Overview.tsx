import React, { useState } from "react";
import Section from "../../Section";
import Info from "../../Info";
import ConsentFormSection from "./ConsentFormSection";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { usePaystackPayment } from "../../../../hooks/usePaystackPayment";
import { EntityType } from "../../../../types/Interfaces";



interface OverviewProps {
  procedure: any;
  type?: string;
}

const AccordionSection = ({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-200 rounded-md mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-4 py-3 bg-gray-100 hover:bg-gray-200"
      >
        <span className="text-sm font-semibold text-gray-700">{title}</span>
        <IoIosArrowDropdownCircle
          className={`w-4 h-4 transform transition-transform text-primary duration-200 ${open ? "rotate-180" : ""
            }`}
        />
      </button>
      {open && <div className="px-4 py-3">{children}</div>}
    </div>
  );
};

const Overview: React.FC<OverviewProps> = ({ procedure, type }) => {

    const { initializePayment, loading: paystackLoading } = usePaystackPayment();
    const [isProcessing, setIsProcessing] = useState(false);
    const handlePayment = async () => {
      setIsProcessing(true);
      try {
        await initializePayment(EntityType.PROCEDURE, procedure.id);
      } finally {
        setIsProcessing(false);
      }
    };
  return (
    <Section title="Overview">
      <AccordionSection title="Basic Details" defaultOpen>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
          <Info label="Procedure Type" value={procedure?.type} />
          <Info label="Status" value={procedure?.status} />
          <Info label="Payment Status" value={procedure?.paymentStatus} />
          <Info
            label="Scheduled Date"
            value={
              procedure?.scheduledDate
                ? new Date(procedure?.scheduledDate).toLocaleString()
                : "—"
            }
          />
          <Info label="Created At" value={new Date(procedure?.createdAt).toLocaleString()} />
          <Info label="Updated At" value={new Date(procedure?.updatedAt).toLocaleString()} />
          <Info label="Note" value={procedure?.note} full />
          <Info label="Nurse Message" value={procedure?.nurseMessage} full />
          <Info label="Patient Message" value={procedure?.patientMessage} full />

            {type == "patient" && procedure?.paymentStatus !== 'completed' && (
              <div className="flex flex-col md:flex-row items-center justify-between">
            <h2>Pay for Procedure {procedure?.type} </h2>
                        {procedure?.paymentStatus !== 'completed' &&         <div >
          <button
            type="submit"
            disabled={paystackLoading || isProcessing}
            className="mt-4 bg-primary px-4 text-white py-2 rounded-md hover:bg-primary/90 transition"
            onClick={handlePayment}
          >
            {paystackLoading || isProcessing ? "Processing..." : "Pay Now"}
          </button>
        </div>}
          </div>
            )}
        </div>
      </AccordionSection>

      {procedure?.vitals?.length > 0 && (
        <AccordionSection title="Vitals">
          <div className="overflow-x-auto border border-gray-200 rounded-lg bg-gray-50">
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
                  <th className="px-3 py-2 text-left font-medium">Date</th>
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
                    <td className="px-3 py-2">{new Date(v?.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AccordionSection>
      )}

      {procedure?.consentForm && (
        <AccordionSection title="Consent Form">
          <ConsentFormSection procedure={procedure} />
        </AccordionSection>
      )}

      {procedure?.statusHistory?.length > 0 && (
        <AccordionSection title="Status Timeline">
          <ol className="relative border-l border-gray-200">
            {procedure.statusHistory.map((item: any, index: number) => (
              <li key={index} className="mb-6 ml-4">
                <div className="absolute w-3 h-3 bg-primary rounded-full -left-1.5 border border-white"></div>
                <time className="block text-sm text-gray-500">
                  {new Date(item?.updatedAt).toLocaleString()}
                </time>
                <h4 className="text-sm font-medium text-gray-900 mt-1 capitalize">
                  {item?.status?.replaceAll("_", " ")}
                </h4>
                {item?.metadata?.note && (
                  <p className="text-sm text-gray-600 mt-1">{item?.metadata?.note}</p>
                )}
                {item?.metadata?.scheduledDate && (
                  <p className="text-sm text-gray-600 mt-1">
                    Scheduled for: {new Date(item?.metadata?.scheduledDate).toLocaleString()}
                  </p>
                )}
                {item?.metadata?.action === "consent_form_uploaded" && (
                  <p className="text-sm text-blue-600 mt-1">
                    Consent Form Uploaded: {item?.metadata?.fileName}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  By: {item?.performedBy?.role || "N/A"} ({item?.performedBy?.userId})
                </p>
              </li>
            ))}
          </ol>
        </AccordionSection>
      )}

      {procedure?.procedureReport && (
        <AccordionSection title="Procedure Report">
          <div className="p-4 bg-gray-100 rounded-md">
            <p className="text-gray-700">{procedure.procedureReport}</p>
          </div>
        </AccordionSection>
      )}

      {procedure?.procedureDocuments?.length > 0 && (
        <AccordionSection title="Documents">
          <ul className="space-y-2">
            {procedure.procedureDocuments.map((doc: any) => (
              <li key={doc.id} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                <div className="flex flex-col md:flex-row items-center gap-2">
                  <img src={doc.url} alt="" className="w-12 h-12 object-cover" />

                  <div>
                    <p className="font-medium text-sm">{doc.name}</p>
                    <p className="text-xs text-gray-500">{doc.type}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </AccordionSection>
      )}

      {procedure?.procedureResults && (
        <AccordionSection title="Procedure Results">
          <div className="text-sm text-gray-800 whitespace-pre-line bg-gray-50 p-3 rounded-md">
               <div className="text-sm text-gray-800 whitespace-pre-line bg-gray-50 p-3 rounded-md space-y-2">
            <p>
              <strong>Procedure Type:</strong> {procedure?.procedureResults.procedureType}
            </p>
            <p>
              <strong>Anaesthesia:</strong> {procedure?.procedureResults.anaesthesia || "N/A"}
            </p>

            <div>
              <strong>Findings:</strong>
              {procedure?.procedureResults?.additionalTakes?.length > 0 ? (
                <ul className="list-disc ml-5">
                  {procedure?.procedureResults?.additionalTakes?.map((f: any, idx: number) => (
                    <li key={idx}>
                      <strong>{f.type}:</strong> {f.description}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>N/A</p>
              )}
            </div>

            <p>
              <strong>Impression:</strong> {procedure?.procedureResults.impression || "N/A"}
            </p>
            <p>
              <strong>Comment:</strong> {procedure?.procedureResults.comment || "N/A"}
            </p>
          </div>
          

          </div>
        </AccordionSection>
      )}
    </Section>
  );
};

export default Overview;
