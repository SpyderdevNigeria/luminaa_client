import AppointmentTab from "../../../components/common/AppointmentTab";
import HeaderTab from "../../../components/common/HeaderTab";
function Consultaion() {
  return (
    <div>
    <HeaderTab title={'Appointment'}/>
      {/* Appointments List */}
      <section className="bg-white rounded-lg p-4">
        <AppointmentTab />
      </section>
    </div>
  );
}

export default Consultaion;
