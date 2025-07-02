import  { useEffect, useState } from "react";
import AdminApi from "../../../api/adminApi";

interface ISpecialtyData {
  specialty: string;
  doctorCount: number;
}

function AdminDoctorsSpecialties() {
  const [specialties, setSpecialties] = useState<ISpecialtyData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const res = await AdminApi.getDoctorsSpecialties();
        if (res) {
          setSpecialties(res);
        }
      } catch (error) {
        console.error("Failed to load doctor specialties", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialties();
  }, []);

  if (loading) return <p className="text-gray-500 text-sm">Loading specialties...</p>;
  if (specialties?.length === 0) return <p className="text-gray-500 text-sm">No specialties found.</p>;
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Doctor Specialties</h2>
      <ul className="space-y-3">
        {specialties.map(({ specialty, doctorCount }) => (
          <li
            key={specialty}
            className="flex items-center justify-between text-base text-gray-700"
          >
            <span>{specialty}</span>
            <span className="bg-gray-100 text-gray-900 px-3 py-1 rounded-md font-medium">
              {doctorCount}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDoctorsSpecialties;
