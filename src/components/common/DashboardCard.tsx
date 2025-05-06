import { FaUserDoctor } from "react-icons/fa6";
type DashboardCardProps = {
  title: string;
  count: number;
};
function DashboardCard({ title, count }: DashboardCardProps) {
  return (
    <div>
      <main className="bg-white  border border-dashboard-gray rounded-lg p-4 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-lg border text-sm 2xl:text-base">
            <FaUserDoctor />
          </span>
          <h2 className="text-sm 2xl:text-lg font-semibold text-text-primary">{title}</h2>
        </div>
            <h6 className="text-2xl 2xl:text-4xl">{count}</h6>

            <p className="text-xs"> 124 Increased vs Last Month</p>
      </main>
    </div>
  );
}

export default DashboardCard;
