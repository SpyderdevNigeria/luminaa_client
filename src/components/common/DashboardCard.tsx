import {
  FaUserInjured,
  FaFlask,
  FaPills,
  FaCalendarCheck,
  FaCalendarPlus,
  FaCalendarTimes,
  FaListAlt,
  FaTasks,
} from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { IconType } from "react-icons";

type DashboardCardProps = {
  title: string;
  count: number;
};

function getIcon(title: string): IconType {
  switch (title.toLowerCase()) {
    case "patients":
      return FaUserInjured;
    case "doctors":
      return FaUserDoctor;
    case "laboratory":
      return FaFlask;
    case "pharmacy":
      return FaPills;
    case "total appointments":
      return FaCalendarCheck;
    case "upcoming":
      return FaCalendarPlus;
    case "cancelled":
      return FaCalendarTimes;
    case "total":
      return FaListAlt;
    case "ongoing requests":
      return FaTasks;
    default:
      return FaListAlt; // fallback icon
  }
}

function DashboardCard({ title, count }: DashboardCardProps) {
  const Icon = getIcon(title);

  return (
    <div>
      <main   className="bg-white  border border-gray-100 rounded-2xl p-10 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-row justify-between gap-6">
        {/* <img
                    src={CardImage}
                    alt=""
                    className="absolute left-2 top-bottom-moving"
                  /> */}
        <div className="flex flex-col gap-1">
          <h3 className="text-3xl 2xl:text-5xl font-semibold text-gray-900">{count}</h3>
          <p className="text-base 2xl:text-lg text-gray-600">{title}</p>
        </div>
      <div>
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary text-2xl">
          <Icon />
        </div>
      </div>
      </main>
    </div>
  );
}

export default DashboardCard;
