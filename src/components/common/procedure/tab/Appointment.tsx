import Section from '../../Section'
import Info from '../../Info'

function Appointment({procedure}: any) {
  return (
      <Section title="Appointment Information">
            <div className="grid grid-cols-2 gap-4">
              <Info label="Status" value={procedure.appointment?.status} />
              <Info
                label="Date"
                value={
                  procedure.appointment?.scheduledDate
                    ? new Date(
                        procedure.appointment?.scheduledDate
                      ).toLocaleString()
                    : "N/A"
                }
              />
              <Info label="Location" value={procedure.appointment?.location} />
              <Info
                label="Meeting Link"
                value={procedure.appointment?.onlineMeetingDetails?.link}
                full
              />
            </div>
          </Section>
  )
}

export default Appointment