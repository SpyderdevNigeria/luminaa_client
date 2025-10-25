import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PatientApi from "../../../api/PatientApi";
import Section from "../../../components/common/Section";
import Info from "../../../components/common/Info";


const PatientVitalsDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [vital, setVital] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVital = async () => {
      try {
        setLoading(true);
        const response = await PatientApi.getVitalById(id!);
        setVital(response?.data);
      } catch (err: any) {
        setError(err.message || "Failed to load vital details");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchVital();
  }, [id]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <span className="ml-3 text-gray-600 font-medium">
          Loading vital details...
        </span>
      </div>
    );

  if (error)
    return <p className="text-red-500 text-center mt-6">{error}</p>;

  if (!vital)
    return <p className="text-gray-600 text-center mt-6">No vital details found.</p>;

  // const patient = vital.patient;
  // const appointment = vital.appointment;
  // const procedure = vital.procedure;

  return (
    <div className="max-w-6xl mx-auto  space-y-6">
      {/* Header */}
      <div className="bg-primary/5 border border-primary/80 rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-primary">
          Vital Record Details
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Recorded on {new Date(vital.createdAt).toLocaleString()}
        </p>
      </div>

      {/* Vital Info */}
      <Section title="Vital Measurements">
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
          <Info label="Temperature" value={vital.temperature ? `${vital.temperature} °C` : "—"} />
          <Info label="Pulse" value={vital.pulse ? `${vital.pulse} bpm` : "—"} />
          <Info label="Systolic BP" value={vital.systolicBP ?? "—"} />
          <Info label="Diastolic BP" value={vital.diastolicBP ?? "—"} />
          <Info label="Respiratory Rate" value={vital.respiratoryRate ? `${vital.respiratoryRate} /min` : "—"} />
          <Info label="Oxygen Saturation" value={vital.oxygenSaturation ?? "—"} />
          <Info label="Weight" value={vital.weight ? `${vital.weight} kg` : "—"} />
          <Info label="Height" value={vital.height ? `${vital.height} cm` : "—"} />
        </div>

        {vital.notes && (
          <div className="mt-4">
            <p className="text-sm text-gray-500 font-medium mb-1">Notes</p>
            <p className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-gray-700 whitespace-pre-wrap">
              {vital.notes}
            </p>
          </div>
        )}
      </Section>

      {/* Patient Info */}
      {/* {patient && (
        <Section title="Patient Information">
          <div className="grid md:grid-cols-2 gap-4">
            <Info label="Full Name" value={`${patient.user.firstName} ${patient.user.lastName}`} />
            <Info label="Gender" value={patient.gender} />
            <Info label="Date of Birth" value={new Date(patient.dateOfBirth).toLocaleDateString()} />
            <Info label="Marital Status" value={patient.maritalStatus} />
            <Info label="Religion" value={patient.religion} />
            <Info label="HMO Provider" value={patient.hmoProvider} />
            <Info label="HMO Number" value={patient.hmoNumber} />
            <Info label="HMO Status" value={patient.hmoStatus} />
          </div>
          <div className="mt-4">
            <Info
              label="Address"
              value={`${patient.address}, ${patient.city}, ${patient.state}, ${patient.country}`}
            />
          </div>
        </Section>
      )} */}

      {/* Appointment Info */}
      {/* {appointment && (
        <Section title="Appointment Details">
          <div className="grid md:grid-cols-2 gap-4">
            <Info label="Location" value={appointment.location} />
            <Info label="Status" value={appointment.status} />
            <Info
              label="Scheduled Date"
              value={new Date(appointment.scheduledDate).toLocaleString()}
            />
          </div>

          {appointment.onlineMeetingDetails && (
            <div className="mt-4">
              <Info
                label="Meeting Link"
                value={
                  <a
                    href={appointment.onlineMeetingDetails.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline break-all"
                  >
                    {appointment.onlineMeetingDetails.link}
                  </a>
                }
              />
            </div>
          )}
        </Section>
      )} */}

      {/* Procedure Info */}
      {/* {procedure && (
        <Section title="Procedure Details">
          <div className="grid md:grid-cols-2 gap-4">
            <Info label="Procedure Type" value={procedure.type} />
            <Info label="Status" value={procedure.status} />
            <Info
              label="Scheduled Date"
              value={new Date(procedure.scheduledDate).toLocaleString()}
            />
            <Info label="Payment Status" value={procedure.paymentStatus} />
          </div>

          {procedure.note && (
            <div className="mt-4">
              <Info
                label="Procedure Note"
                value={
                  <p className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-gray-700 whitespace-pre-wrap">
                    {procedure.note}
                  </p>
                }
              />
            </div>
          )}

          {procedure.doctor && (
            <Section title="Doctor Information">
              <div className="grid md:grid-cols-2 gap-4">
                <Info
                  label="Name"
                  value={`${procedure.doctor?.user?.firstName} ${procedure.doctor?.user?.lastName}`}
                />
                <Info
                  label="Email"
                  value={procedure.doctor?.user?.email || "—"}
                />
              </div>
            </Section>
          )}

          {procedure.consentForm && (
            <div className="mt-4">
              <Info
                label="Consent Form"
                value={
                  <a
                    href={procedure.consentForm.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={procedure.consentForm.url}
                      alt="Consent Form"
                      className="rounded-xl shadow-md max-w-xs mt-2"
                    />
                  </a>
                }
              />
            </div>
          )}
        </Section>
      )} */}
    </div>
  );
};

export default PatientVitalsDetails;
