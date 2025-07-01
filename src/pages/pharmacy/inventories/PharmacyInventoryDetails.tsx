import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PharmacyApi from "../../../api/pharmacistApi";
import { IInventoryItem } from "../../../types/Interfaces";
import { format } from "date-fns";
import {
  FiArrowLeft,
  FiCalendar,
  FiPackage,
  FiMapPin,
  FiHash,
  FiTag,
  FiAlertCircle,
  FiAlertTriangle,
  FiBarChart2,
} from "react-icons/fi";
import routeLinks from "../../../utils/routes";

const PharmacyInventoryDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [inventory, setInventory] = useState<IInventoryItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        setLoading(true);
        const res = await PharmacyApi.getInventoryById(id!);
        setInventory(res.data);
      } catch (err) {
        setError("Failed to fetch inventory item.");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchInventory();

  }, [id]);

  if (loading) return <p className="text-center mt-20 text-gray-600">Loading inventory details...</p>;
  if (error || !inventory) return <p className="text-center mt-20 text-red-600">{error || "Inventory not found."}</p>;

  const {
    medicationName,
    medicationGenericName,
    quantity,
    expiryDate,
    batchNumber,
    location,
    supplier,
    reference,
    barcode,
    isExpired,
    isLowStock,
    createdAt,
    updatedAt,
  } = inventory;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow">
      <Link to={routeLinks?.pharmacist?.pharmacistInventory} className="text-sm text-primary flex items-center mb-4 hover:underline">
        <FiArrowLeft className="mr-1" /> Back to Inventory List
      </Link>

      <h2 className="text-2xl font-bold text-gray-900 mb-1">{medicationName}</h2>
      <p className="text-sm italic text-gray-500 mb-4">{medicationGenericName}</p>

     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <FiBarChart2 className="text-gray-400" />
          Quantity: <span className="font-medium">{quantity}</span>
        </div>

        <div className="flex items-center gap-2">
          <FiCalendar className="text-gray-400" />
          Expiry Date:{" "}
          <span className="font-medium">
            {expiryDate ? format(new Date(expiryDate), "PPP") : "N/A"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <FiHash className="text-gray-400" />
          Batch Number: <span className="font-medium">{batchNumber}</span>
        </div>

        <div className="flex items-center gap-2">
          <FiMapPin className="text-gray-400" />
          Location: <span className="font-medium">{location}</span>
        </div>

        <div className="flex items-center gap-2">
          <FiPackage className="text-gray-400" />
          Supplier: <span className="font-medium">{supplier}</span>
        </div>

        <div className="flex items-center gap-2">
          <FiTag className="text-gray-400" />
          Barcode: <span className="font-medium">{barcode}</span>
        </div>

        <div className="flex items-center gap-2">
          <FiHash className="text-gray-400" />
          Reference: <span className="font-medium">{reference}</span>
        </div>

        <div className="flex items-center gap-2">
          <FiCalendar className="text-gray-400" />
          Created:{" "}
          <span className="font-medium">{format(new Date(createdAt), "PPP p")}</span>
        </div>

        <div className="flex items-center gap-2">
          <FiCalendar className="text-gray-400" />
          Updated:{" "}
          <span className="font-medium">{format(new Date(updatedAt), "PPP p")}</span>
        </div>
      </div>

      {/* Status Badges */}
      <div className="mt-5 flex flex-wrap gap-2">
        {isExpired && (
          <span className="flex items-center gap-1 px-2 py-1 text-xs bg-red-100 text-red-700 rounded">
            <FiAlertCircle size={12} /> Expired
          </span>
        )}
        {isLowStock && (
          <span className="flex items-center gap-1 px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded">
            <FiAlertTriangle size={12} /> Low Stock
          </span>
        )}
      </div>
    </div>
  );
};

export default PharmacyInventoryDetails;
