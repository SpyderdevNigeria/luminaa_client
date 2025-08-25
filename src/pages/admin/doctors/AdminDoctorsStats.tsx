import React, { useEffect, useState } from "react";
import AdminApi from "../../../api/adminApi";
import {
  FaUserMd,
  FaUserCheck,
  FaFileAlt,
  FaHospitalSymbol,
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

const AdminDoctorsStats = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await AdminApi.getDoctorsStats(); // 👈 call doctor stats
        if (res) {
          setStats(res);
        }
      } catch (error) {
        console.error("Failed to load doctor stats", error);
      }
    };
    fetchStats();
  }, []);

  if (!stats) return <p className="text-gray-500 text-sm">Loading stats...</p>;

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">Doctor Statistics</h2>

      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Doctors" value={stats.totalDoctors} icon={<FaUserMd />} />
        <StatCard title="Active Doctors" value={stats.activeDoctors} icon={<FaUserCheck />} />
        <StatCard title="Profile Completed" value={stats.profileCompleted} icon={<FaFileAlt />} />
        <StatCard title="Hospitals Affiliated" value={stats.hospitalAffiliations} icon={<FaHospitalSymbol />} />
      </div>

      {/* Gender Distribution */}
      {stats.genderDistribution && (
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
      )}

      {/* Specialization Distribution */}
      {stats.specializationDistribution && (
        <div className="bg-white  rounded-2xl shadow-md border border-gray-100 p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Specialization Distribution</h3>
          <ul className="space-y-3">
            {Object.entries(stats.specializationDistribution).map(([specialty, count]) => (
              <li
                key={specialty}
                className="flex items-center justify-between text-base text-gray-700"
              >
                <span>{specialty}</span>
                <span className="bg-gray-100 text-gray-900 px-3 py-1 rounded-md font-medium">
                  {count as number}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminDoctorsStats;
