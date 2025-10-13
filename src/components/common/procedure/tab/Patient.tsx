import Section from '../../Section'
import Info from '../../Info'

function Patient({procedure}: any) {
  return (
             <Section title="Patient Information">
            <div className="grid grid-cols-2 gap-4">
              <Info
                label="Name"
                value={`${procedure.patient?.user?.firstName} ${procedure.patient?.user?.lastName}`}
              />
              <Info label="Gender" value={procedure.patient?.gender} />
              <Info
                label="Date of Birth"
                value={
                  procedure.patient?.dateOfBirth
                    ? new Date(procedure.patient?.dateOfBirth).toLocaleDateString()
                    : "N/A"
                }
              />
              <Info label="Phone" value={procedure.patient?.phoneNumber || "N/A"} />
              <Info label="Address" value={procedure.patient?.address} full />
              <Info label="HMO Provider" value={procedure.patient?.hmoProvider} />
              <Info label="HMO Status" value={procedure.patient?.hmoStatus} />
            </div>
          </Section>
  )
}

export default Patient