import React, { useEffect, useState } from "react";
import { IMedication, IInventoryItem } from "../../../types/Interfaces";
import CommonFormField from "../../../components/common/CommonFormField";
import AdminApi from "../../../api/adminApi";
import {
  inventoryLocationOptions,
  inventorySupplierOptions,
} from "../../../utils/dashboardUtils";
import FeedbackMessage from "../../../components/common/FeedbackMessage";
import { useToaster } from "../../../components/common/ToasterContext";

interface InventoryFormProps {
  medication: IMedication;
  inventory?: IInventoryItem;
  onSuccess: () => void;
  onCancel: () => void;
}

const InventoryForm: React.FC<InventoryFormProps> = ({
  medication,
  inventory,
  onSuccess,
  onCancel,
}) => {
  const isEditMode = !!inventory;
  const [message, setMessage] = useState({ message: "", type: "" });
  const {showToast} = useToaster()
  const [formData, setFormData] = useState({
    medicationId: medication.id,
    batchNumber: inventory?.batchNumber || "",
    quantity: inventory?.quantity || 0,
    expiryDate: inventory?.expiryDate?.split("T")[0] || "",
    barcode: inventory?.barcode || "",
    location: inventory?.location || "",
    reference: inventory?.reference || "",
    supplier: inventory?.supplier || "",
    notes: inventory?.notes || "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (isEditMode) {
        await AdminApi.updateInventory(inventory!.id, { ...formData, quantity: parseInt(formData.quantity.toString()) }); 
        showToast( "Inventory updated successfully", "success")
      } else {
        await AdminApi.createInventory({ ...formData, quantity: parseInt(formData.quantity.toString()) });
        showToast( "Inventory Created successfully", "success")
      }
      onSuccess();
    } catch (error: any) {
      const { response } = error;
      setMessage({
        message: response?.data?.message || "An error occurred",
        type: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    setMessage({
      message: "",
      type: "",
    });
  }, [formData]);

  return (
    <form
      onSubmit={handleSubmit}
      className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  mx-auto gap-4"
    >
      <h3 className="text-lg font-semibold mb-4 md:col-span-full">
        {isEditMode ? "Edit Inventory" : "Add Inventory"} for:{" "}
        <span className="text-primary">{medication.name}</span>
      </h3>

      <div className="md:col-span-full">
        {message.message && (
          <FeedbackMessage type={message.type} message={message.message} />
        )}
      </div>

      <CommonFormField
        type="text"
        name="batchNumber"
        label="Batch Number"
        value={formData.batchNumber}
        onChange={handleChange}
        required
      />
      <CommonFormField
        type="number"
        name="quantity"
        label="Quantity"
        value={formData.quantity}
        onChange={handleChange}
        required
      />
      <CommonFormField
        type="date"
        name="expiryDate"
        label="Expiry Date"
        value={formData.expiryDate}
        onChange={handleChange}
        required
      />
      <CommonFormField
        type="text"
        name="barcode"
        label="Barcode"
        value={formData.barcode}
        onChange={handleChange}
        required
      />
      <CommonFormField
        type="select"
        name="location"
        label="Location"
        value={formData.location}
        onChange={handleChange}
        required
        options={inventoryLocationOptions.map((option) => ({
          value: option,
          label: option,
        }))}
      />
      <CommonFormField
        type="text"
        name="reference"
        label="Reference"
        value={formData.reference}
        onChange={handleChange}
      />
      <div className="md:col-span-full">
        <CommonFormField
          type="select"
          name="supplier"
          label="Supplier"
          value={formData.supplier}
          onChange={handleChange}
          required
          options={inventorySupplierOptions.map((option) => ({
            value: option,
            label: option,
          }))}
        />
      </div>
      <div className="md:col-span-full">
        <CommonFormField
          type="textarea"
          name="notes"
          label="Notes"
          value={formData.notes}
          onChange={handleChange}
          // required
        />
      </div>
      <div className="flex justify-end gap-4 pt-4 md:col-span-full">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 bg-primary text-white rounded-md"
        >
          {submitting
            ? isEditMode
              ? "Updating..."
              : "Submitting..."
            : isEditMode
            ? "Update Inventory"
            : "Add Inventory"}
        </button>
      </div>
    </form>
  );
};

export default InventoryForm;
