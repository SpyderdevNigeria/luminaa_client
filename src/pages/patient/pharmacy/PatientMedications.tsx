import { useEffect, useState } from "react";
import PatientApi from "../../../api/PatientApi";
import PaginationComponent from "../../../components/common/PaginationComponent";
import useMedications from "../../../hooks/useMedications";
import { FiShoppingCart } from "react-icons/fi";
import useCart from "../../../hooks/useCart";
import {
  medicationCategoryOptions,
  medicationDosageFormOptions,
  medicationManufacturerOptions,
  medicationStatusOptions,
} from "../../../utils/dashboardUtils";
import ShoppingCartPanel from "../../../components/common/ShoppingCartPanel";
import { IMedication } from "../../../types/Interfaces";
import PatientMedicationCard from "../../../components/common/PatientMedicationCard";

const PatientMedications = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [priceModalOpen, setPriceModalOpen] = useState(false);

  const { items: cartItems, totalItems, add, cartItemLoading } = useCart();

  const {
    medications,
    medicationsTotalPages,
    medicationsPage,
    medicationsLimit,
    medicationsTotal,
    medicationsLoading,
    medicationSearch,
    medicationCategory,
    medicationDosageForm,
    medicationStatus,
    medicationRequiresPrescription,
    medicationManufacturer,
    medicationMinPrice,
    medicationMaxPrice,
    setMedicationsPage,
    setMedicationSearch,
    setMedicationCategory,
    setMedicationDosageForm,
    setMedicationStatus,
    setMedicationRequiresPrescription,
    setMedicationManufacturer,
    setMedicationMinPrice,
    setMedicationMaxPrice,
    getMedications,
  } = useMedications(PatientApi);

  const addtoCart = (med: any) => {
    add({ ...med, quantity: 1 });
  };

  useEffect(() => {
    getMedications();
  }, [
    medicationSearch,
    medicationCategory,
    medicationDosageForm,
    medicationStatus,
    medicationRequiresPrescription,
    medicationManufacturer,
    medicationsPage,
  ]);

  const applyPriceFilter = () => {
    getMedications();
    setPriceModalOpen(false);
  };

  return (
    <div className="bg-gray-50 p-4 md:p-6 min-h-screen">
   <div className="bg-white p-4 rounded-xl shadow mb-6">
  <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4">
    {/* Search Input */}
    <div className="flex flex-col md:col-span-3">
      <label className="text-sm font-medium text-gray-600 mb-1">Search</label>
      <input
        type="text"
        placeholder="Search medications..."
        value={medicationSearch}
        onChange={(e) => setMedicationSearch(e.target.value)}
        className="form-input w-full focus:outline-primary"
      />
    </div>


    {/* Category */}
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-600 mb-1">Category</label>
      <select
        value={medicationCategory}
        onChange={(e) => setMedicationCategory(e.target.value)}
        className="form-input focus:outline-primary"
      >
        <option value="">All</option>
        {medicationCategoryOptions.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>

    {/* Dosage Form */}
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-600 mb-1">Dosage Form</label>
      <select
        value={medicationDosageForm}
        onChange={(e) => setMedicationDosageForm(e.target.value)}
        className="form-input focus:outline-primary"
      >
        <option value="">All</option>
        {medicationDosageFormOptions.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>

    {/* Status */}
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-600 mb-1">Status</label>
      <select
        value={medicationStatus}
        onChange={(e) => setMedicationStatus(e.target.value)}
        className="form-input focus:outline-primary"
      >
        <option value="">All</option>
        {medicationStatusOptions.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>

    {/* Prescription */}
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-600 mb-1">Prescription</label>
      <select
        value={medicationRequiresPrescription}
        onChange={(e) => setMedicationRequiresPrescription(e.target.value)}
        className="form-input focus:outline-primary"
      >
        <option value="">All</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
    </div>

    {/* Manufacturer */}
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-600 mb-1">Manufacturer</label>
      <select
        value={medicationManufacturer}
        onChange={(e) => setMedicationManufacturer(e.target.value)}
        className="form-input focus:outline-primary"
      >
        <option value="">All</option>
        {medicationManufacturerOptions.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>

        {/* Price Range Button */}
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-600 mb-1">Price Range</label>
      <button
        onClick={() => setPriceModalOpen(true)}
        className="h-full p-3 bg-primary text-white rounded-md hover:bg-primary/90 transition"
      >
        Set Price Range
      </button>
    </div>
  </div>
</div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
        {medicationsLoading ? (
          <p className="col-span-full text-center text-gray-500 py-20">
            Loading medications...
          </p>
        ) : medications.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 py-20">
            No medications found.
          </p>
        ) : (
          medications.map((med: IMedication) => (
            <PatientMedicationCard
              key={med.id}
              medication={med}
              buttonText="Add To Cart"
              cartItems={cartItems}
              onAddPrescription={() => addtoCart(med)}
              loading={cartItemLoading}
            />
          ))
        )}
      </div>

      <PaginationComponent
        page={medicationsPage}
        total={medicationsTotal}
        limit={medicationsLimit}
        totalPages={medicationsTotalPages ?? 1}
        onPageChange={setMedicationsPage}
      />

      {totalItems > 0 && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-6 right-6 bg-primary text-white rounded-full p-4 shadow-xl flex items-center gap-2 z-20"
        >
          <FiShoppingCart className="text-2xl" />
        </button>
      )}

      <ShoppingCartPanel open={cartOpen} setOpen={setCartOpen} />

      {/* Price Modal */}
      {priceModalOpen && (
        <div className="fixed inset-0 bg-black/20  bg-opacity/10 z-50 flex items-center justify-center px-4">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full space-y-4">
            <h2 className="text-lg font-bold">Set Price Range</h2>
            <div className="space-y-2">
           <div>
            <h4>Min Price</h4>
               <input
                type="number"
                placeholder="Min Price"
                value={medicationMinPrice}
                onChange={(e) => setMedicationMinPrice(Number(e.target.value))}
                className="form-input w-full"
              />
           </div>
           <div>
             
           </div>
            <h4>Max Price</h4>
              <input
                type="number"
                placeholder="Max Price"
                value={medicationMaxPrice}
                onChange={(e) => setMedicationMaxPrice(Number(e.target.value))}
                className="form-input w-full"
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setPriceModalOpen(false)}
                className="px-4 py-2 text-gray-600\"
              >
                Cancel
              </button>
              <button
                onClick={applyPriceFilter}
                className="px-4 py-2 bg-primary text-white rounded-md"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientMedications;
