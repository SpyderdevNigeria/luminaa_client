import { useMemo } from "react";
import { Link } from "react-router-dom";
import routeLinks from "../../../utils/routes";
import { navItemsPatient } from "../../../utils/dashboardUtils";
import AppointmentTab from "../../../components/common/AppointmentTab";
function DashboardHome() {
  const links = useMemo(
    () => [
      {
        icon: navItemsPatient.find(
          (item) => item.label.toLowerCase() === "consultations"
        )?.icon,
        name: "Book a Consultation",
        description:
          "Find a Doctor to give you a diagnosis and set you up for treatment",
        link: routeLinks?.patient?.consultations,
      },
      {
        icon: navItemsPatient.find(
          (item) => item.label.toLowerCase() === "orders"
        )?.icon,
        name: "Buy Drugs",
        description:
          "Find a Doctor to give you a diagnosis and set you up for treatment",
        link: routeLinks?.patient?.orders,
      },
      {
        icon: navItemsPatient.find(
          (item) => item.label.toLowerCase() === "lab/radiology"
        )?.icon,
        name: "Visit a Lab",
        description:
          "Find a Doctor to give you a diagnosis and set you up for treatment",
        link: routeLinks?.patient?.lab,
      },
    ],
    [navItemsPatient, routeLinks?.patient]
  );
  return (
    <div>
      <h2 className="text-sm italic text-gray-500 mb-1">Welcome</h2>
      <h1 className="text-2xl md:text-4xl font-medium text-black mb-4">
        Sarah Adeniji
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {links?.map((i) => (
          <Link
            to={i?.link}
            className="bg-white rounded-lg p-4 shadow-sm "
            key={i?.name}
          >
            {i.icon && <i.icon className="text-3xl text-secondary" />}
            <div className="md:max-w-[230px] mt-8">
              <h3 className="text-base md:text-lg font-medium mb-1 text-dashboard-gray">
                {i?.name}
              </h3>
              <p className="text-sm md:text-base  text-dashboard-gray">
                {i?.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Appointment Tabs */}
      <div>
        {/* Appointments List */}
        <section className="bg-white rounded-lg p-4">
          <AppointmentTab />
        </section>
      </div>
    </div>
  );
}

export default DashboardHome;
