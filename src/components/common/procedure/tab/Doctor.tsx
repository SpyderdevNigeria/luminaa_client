import Info from "../../Info"
import Section from "../../Section"

function Doctor({procedure}: any) {
  return (
              <Section title="Doctor Information">
            <div className="grid grid-cols-2 gap-4">
              <Info
                label="Name"
                value={`${procedure.doctor?.user?.firstName} ${procedure.doctor?.user?.lastName}`}
              />
              <Info label="Specialty" value={procedure.doctor?.specialty} />
              <Info label="License Number" value={procedure.doctor?.licenseNumber} />
              <Info label="Contact" value={procedure.doctor?.contactNumber} />
              <Info
                label="Active"
                value={procedure.doctor?.isActive ? "Yes" : "No"}
              />
            </div>
          </Section>
  )
}

export default Doctor