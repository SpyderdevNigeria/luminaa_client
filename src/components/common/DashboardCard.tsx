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
import CardImage from "../../assets/images/card/card-shape.svg";

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
      <main className="bg-primary text-white rounded-lg p-8 flex flex-row justify-between gap-4 items-center relative">
              <img
                    src={CardImage}
                    alt=""
                    className="absolute left-2 top-bottom-moving"
                  />
        <div className="flex flex-col gap-2">
          <h6 className="text-4xl 2xl:text-5xl  font-semibold">{count}</h6>
          <h2 className="text-sm 2xl:text-lg ">{title}</h2>
        </div>
        <span className="p-2">
          <Icon className="text-base lg:text-4xl 2xl:text-5xl text-white" />
        </span>
      </main>
    </div>
  );
}

export default DashboardCard;
