import React, { useEffect, useState } from "react";
import AdminApi from "../../../api/adminApi";
import {
  FaUserFriends,
  FaUserCheck,
  FaFileAlt,
  FaChartBar,
} from "react-icons/fa";

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white  w-full shadow-lg rounded-2xl border border-gray-100 p-5 flex items-center justify-between hover:shadow-xl transition">
      <div>
        <h4 className="text-sm text-gray-500">{title}</h4>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
      <div className="text-primary text-3xl">{icon}</div>
    </div>
  );
}

const AdminPatientStats = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await AdminApi.getPatientStats();
        if (res) {
          setStats(res);
        }
      } catch (error) {
        console.error("Failed to load patient stats", error);
      }
    };
    fetchStats();
  }, []);

  if (!stats) return <p className="text-gray-500 text-sm">Loading stats...</p>;

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">Patient Statistics</h2>

      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Patients" value={stats.totalPatients} icon={<FaUserFriends />} />
        <StatCard title="Active Patients" value={stats.activePatients} icon={<FaUserCheck />} />
        <StatCard title="Bio Data Completed" value={stats.bioDataCompleted} icon={<FaFileAlt />} />
        <StatCard title="Medical History Completed" value={stats.medicalHistoryCompleted} icon={<FaChartBar />} />
      </div>

      {/* Gender Distribution */}
      <div className="bg-white  rounded-2xl shadow-md border border-gray-100 p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Gender Distribution</h3>
        <ul className="space-y-3">
          {Object.entries(stats.genderDistribution).map(([gender, count]) => (
            <li
              key={gender}
              className="flex items-center justify-between text-base text-gray-700"
            >
              <span>{gender}</span>
              <span className="bg-gray-100 text-gray-900 px-3 py-1 rounded-md font-medium">
                {count as number}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* City Distribution */}
      <div className="bg-white  rounded-2xl shadow-md border border-gray-100 p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">City Distribution</h3>
        <ul className="space-y-3">
          {Object.entries(stats.cityDistribution).map(([city, count]) => (
            <li
              key={city}
              className="flex items-center justify-between text-base text-gray-700"
            >
              <span>{city}</span>
              <span className="bg-gray-100 text-gray-900 px-3 py-1 rounded-md font-medium">
                {count as number}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPatientStats;
