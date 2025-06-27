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
import { MdKeyboardArrowRight } from "react-icons/md";
import PatientMedicationCard from "../../../components/common/PatientMedicationCard";

const PatientMedications = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [filterVisible, setFilterVisible] = useState(true);

  const { items: cartItems, totalItems, add } = useCart();

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

  return (
    <div className={`bg-white p-6 min-h-screen flex flex-col ${filterVisible ? 'md:flex-row' : '' }  gap-6`}>
      {/* Filter Sidebar */}
      <aside className="w-full md:w-1/4">
        <div className="sidebar mb-4 mb-lg-0 sticky top-0">
          <button
            onClick={() => setFilterVisible(!filterVisible)}
            className="text-sm text-primary underline mb-2"
          >
            {filterVisible ? "Hide Filters" : "Show Filters"}
          </button>
          {filterVisible && (
            <div className="space-y-6 hidden md:block">
              <div className="sidebar-widget border-b border-gray-300 pb-4">
                <div className="form-group relative mb-4">
                 <input
                  type="text"
                  placeholder="Search..."
                  value={medicationSearch}
                  onChange={(e) => setMedicationSearch(e.target.value)}
                  className="form-input focus:outline-primary"
                />
                </div>
                <h5 className="mb-3 font-semibold">Category</h5>
                <ul className="list-group space-y-2">
                      <li
                      className={`list-group-item text-sm flex  ${medicationCategory === '' ? 'text-primary' : ''} justify-between items-center cursor-pointer`}
                      onClick={() => setMedicationCategory("")}
                    >
                      <span>{'All'}</span>
                    </li>
                  {medicationCategoryOptions.map((opt) => (
                    <li
                      key={opt}
                      className={`list-group-item text-sm flex capitalize ${medicationCategory === opt ? 'text-primary' : ''} justify-between items-center cursor-pointer`}
                      onClick={() => setMedicationCategory(opt)}
                    >
                      <span>{opt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sidebar-widget  border-b border-gray-300 pb-4">
                <h5 className="mb-3 font-semibold">Price</h5>
                <div className="flex items-center gap-2">
                  <input
                    className="form-input focus:outline-primary"
                    type="number"
                    placeholder="Min"
                    value={medicationMinPrice}
                    onChange={(e) => setMedicationMinPrice(Number(e.target.value))}
                  />
                  <span>-</span>
                  <input
                    className="form-input focus:outline-primary"
                    type="number"
                    placeholder="Max"
                    value={medicationMaxPrice}
                    onChange={(e) => setMedicationMaxPrice(Number(e.target.value))}
                  />
                  <button className="p-2 rounded-md bg-primary text-white"
                  onClick={getMedications}>
                    <MdKeyboardArrowRight />
                  </button>
                </div>
              </div>

              <div className="sidebar-widget pb-4">
                <h5 className="mb-3 font-semibold">Dosage Form</h5>
                <ul className="list-group space-y-1">
                    <li
                      className={`list-group-item text-sm flex  ${medicationCategory === '' ? 'text-primary' : ''} justify-between items-center cursor-pointer`}
                      onClick={() => setMedicationDosageForm("")}
                    >
                      <span>{'All'}</span>
                    </li>
                  {medicationDosageFormOptions.map((opt) => (
                    <li
                      key={opt}
                       className={`list-group-item text-sm flex capitalize ${medicationCategory === opt ? 'text-primary' : ''} justify-between items-center cursor-pointer`}
                      onClick={() => setMedicationDosageForm(opt)}
                    >
                      {opt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Medications Grid */}
      <div className="flex-1">
        <div className="flex flex-col md:flex-row items-center justify-between">
           <h2 className="text-xl font-semibold mb-4">All Medications</h2>
        <aside className="w-full flex flex-col md:flex-row md:w-md items-center justify-end gap-4 mb-4">
          <input
            type="text"
            placeholder="Search... "
            value={medicationSearch}
            onChange={(e) => setMedicationSearch(e.target.value)}
            className="form-input focus:outline-primary block md:hidden"
          />

          <input
            type="number"
            placeholder="Min Price"
            value={medicationMinPrice}
            onChange={(e) => setMedicationMinPrice(Number(e.target.value))}
            className="form-input focus:outline-primary block md:hidden"
          />

          <input
            type="number"
            placeholder="Max Price"
            value={medicationMaxPrice}
            onChange={(e) => setMedicationMaxPrice(Number(e.target.value))}
            className="form-input focus:outline-primary block md:hidden"
          />

          <select
            value={medicationStatus}
            onChange={(e) => setMedicationStatus(e.target.value)}
            className="form-input focus:outline-primary"
          >
            <option value="">Status</option>
            {medicationStatusOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>

          <select
            value={medicationCategory}
            onChange={(e) => setMedicationCategory(e.target.value)}
            className="form-input focus:outline-primary block md:hidden"
          >
            <option value="">Category</option>
            {medicationCategoryOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>

          <select
            value={medicationDosageForm}
            onChange={(e) => setMedicationDosageForm(e.target.value)}
            className="form-input focus:outline-primary block md:hidden"
          >
            <option value="">Dosage Form</option>
            {medicationDosageFormOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>

          <select
            value={medicationRequiresPrescription}
            onChange={(e) => setMedicationRequiresPrescription(e.target.value)}
            className="form-input focus:outline-primary"
            aria-placeholder="requires prescription"
          >
            <option value="">Requires prescription</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>

          <select
            value={medicationManufacturer}
            onChange={(e) => setMedicationManufacturer(e.target.value)}
            className="form-input focus:outline-primary"
          >
            <option value="">Manufacturer</option>
            {medicationManufacturerOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </aside>
        </div>

       
        {medicationsLoading ? (
          <p className="flex flex-col justify-center text-center mt-10 text-gray-500 min-h-[500px]">
            Loading medications...
          </p>
        ) : medications.length === 0 ? (
          <p className="text-center mt-10 text-gray-500">
            No medications found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-6">
            {medications.map((med: IMedication) => (
              <PatientMedicationCard
                key={med.id}
                medication={med}
                buttonText="Add To Cart"
                cartItems={cartItems}
                onAddPrescription={() => addtoCart(med)}
              />
            ))}
          </div>
        )}

        <PaginationComponent
          page={medicationsPage}
          total={medicationsTotal}
          limit={medicationsLimit}
          totalPages={medicationsTotalPages ?? 1}
          onPageChange={setMedicationsPage}
        />
      </div>

      {/* Floating Cart Icon */}
      {totalItems > 0 && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-6 right-6 bg-primary text-white rounded-full p-4 shadow-xl flex items-center gap-2 z-20"
        >
          <FiShoppingCart className="text-2xl" />
        </button>
      )}

      {/* Shopping Cart Panel */}
      <ShoppingCartPanel open={cartOpen} setOpen={setCartOpen} />
    </div>
  );
};

export default PatientMedications;
