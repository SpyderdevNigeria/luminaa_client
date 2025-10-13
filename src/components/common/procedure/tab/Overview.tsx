import React from "react";
import Section from "../../Section";
import Info from "../../Info";
import ConsentFormSection from "./ConsentFormSection";

interface OverviewProps {
  procedure: any;
}

const Overview: React.FC<OverviewProps> = ({ procedure }) => {
  return (
    <Section title="Overview">
      {/* Basic Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
        <Info
          label="Created At"
          value={new Date(procedure?.createdAt).toLocaleString()}
        />
        <Info
          label="Updated At"
          value={new Date(procedure?.updatedAt).toLocaleString()}
        />
        <Info label="Note" value={procedure?.note} full />
        <Info label="Nurse Message" value={procedure?.nurseMessage} full />
        <Info label="Patient Message" value={procedure?.patientMessage} full />
      </div>

      {/* Vitals Section */}
      {procedure?.vitals?.length > 0 && (
        <div className="mt-8">
          <h3 className="text-base font-semibold text-gray-700 mb-3">
            Vitals
          </h3>
          <div className="overflow-x-auto border border-gray-200 rounded-lg p-4 bg-gray-50">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-3 py-2 text-left font-medium">Temperature</th>
                  <th className="px-3 py-2 text-left font-medium">Pulse</th>
                  <th className="px-3 py-2 text-left font-medium">BP (Sys/Dia)</th>
                  <th className="px-3 py-2 text-left font-medium">Heart Rate</th>
                  <th className="px-3 py-2 text-left font-medium">Resp. Rate</th>
                  <th className="px-3 py-2 text-left font-medium">O₂ Sat</th>
                  <th className="px-3 py-2 text-left font-medium">Weight</th>
                  <th className="px-3 py-2 text-left font-medium">Height</th>
                  <th className="px-3 py-2 text-left font-medium">Notes</th>
                  <th className="px-3 py-2 text-left font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {procedure?.vitals.map((v: any) => (
                  <tr key={v?.id} className="border-b border-gray-200">
                    <td className="px-3 py-2">{v?.temperature || "—"}</td>
                    <td className="px-3 py-2">{v?.pulse || "—"}</td>
                    <td className="px-3 py-2">
                      {v?.systolicBP}/{v?.diastolicBP}
                    </td>
                    <td className="px-3 py-2">{v?.heartRate || "—"}</td>
                    <td className="px-3 py-2">{v?.respiratoryRate || "—"}</td>
                    <td className="px-3 py-2">{v?.oxygenSaturation || "—"}</td>
                    <td className="px-3 py-2">{v?.weight || "—"}</td>
                    <td className="px-3 py-2">{v?.height || "—"}</td>
                    <td className="px-3 py-2">{v?.notes || "—"}</td>
                    <td className="px-3 py-2">
                      {new Date(v?.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Consent Form */}
      {procedure?.consentForm && (
        <div className="mt-8">
          <h3 className="text-base font-semibold text-gray-700 mb-3">
            Consent Form
          </h3>
          <ConsentFormSection procedure={procedure} />
        </div>
      )}

      {/* Timeline */}
      <div className="mt-8">
        <h3 className="text-base font-semibold text-gray-700 mb-3">
          Status Timeline
        </h3>
        <ol className="relative border-l border-gray-200">
          {procedure?.statusHistory?.map((item: any, index: number) => (
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
                  Scheduled for:{" "}
                  {new Date(item?.metadata?.scheduledDate).toLocaleString()}
                </p>
              )}
              {item?.metadata?.action === "consent_form_uploaded" && (
                <p className="text-sm text-blue-600 mt-1">
                  Consent Form Uploaded: {item?.metadata?.fileName}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                By: {item?.performedBy?.role || "N/A"} (
                {item?.performedBy?.userId})
              </p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
};

export default Overview;
