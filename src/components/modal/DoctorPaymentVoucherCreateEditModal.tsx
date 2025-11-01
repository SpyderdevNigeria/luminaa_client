import { useState, useEffect } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import DoctorApi from "../../api/doctorApi";
import useUsers from "../../hooks/useUsers";
import { useToaster } from "../common/ToasterContext";
import Modal from "./modal";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  editVoucher?: any;
  patient?: any;
}

export default function DoctorPaymentVoucherCreateEdit({
  open,
  onClose,
  onSuccess,
  editVoucher,
  patient,
}: Props) {
  const isEdit = !!editVoucher;
  const { showToast } = useToaster();
  const [selectedPatient, setSelectedPatient] = useState<any>(patient || null);  const [description, setDescription] = useState(editVoucher?.description || "");
  const [date, setDate] = useState(editVoucher?.date || "");
  const [amount, setAmount] = useState(editVoucher?.amount || "");
  const [loading, setLoading] = useState(false);


  useEffect(()=> {
    if (editVoucher) {
      setSelectedPatient(editVoucher.patient);
      setDescription(editVoucher.description);
      setDate(editVoucher.date);
      setAmount(editVoucher.amount);
    }
  }, [editVoucher])
  // Fetch users if patient not passed
  const {
    users,
    search,
    setSearch,
    getUsers,
    loadingUsers,
  } = useUsers(DoctorApi);

  useEffect(() => {
    if (open && !patient) getUsers();
  }, [open, search]);

  const handleSubmit = async () => {
    if (!selectedPatient) return showToast("Select a patient first", "error");
    if (!description || !date || !amount) return showToast("Fill all fields", "error");

    const payload = {
      patientId: selectedPatient.id,
      description,
      date,
      amount: Number(amount),
    };

    try {
      setLoading(true);
      if (isEdit) {
        await DoctorApi.updatePaymentVoucher(editVoucher.id, payload);
        showToast("Payment voucher updated successfully", "success");
      } else {
        await DoctorApi.createPaymentVoucher(payload);
        showToast("Payment voucher created successfully", "success");
      }
      onSuccess?.();
    } catch (error) {
      console.error("Error submitting voucher:", error);
      showToast("Failed to save voucher", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit Payment Voucher" : "Create Payment Voucher"}
      handleSubmit={handleSubmit}
      buttonText={loading ? "Saving..." : isEdit ? "Update Voucher" : "Create Voucher"}
      loading={loading}
    >
      <div className="space-y-4">
        {/* Patient Selection */}
        {!patient && !isEdit ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search Patient
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search patients..."
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
            <div className="border border-gray-200 mt-2 max-h-[200px] overflow-y-auto rounded">
              {loadingUsers ? (
                <p className="p-2 text-gray-500 text-sm">Loading patients...</p>
              ) : users.length === 0 ? (
                <p className="p-2 text-gray-500 text-sm">No patients found</p>
              ) : (
                users.map((u: any) => (
                  <div
                    key={u.id}
                    onClick={() => setSelectedPatient(u)}
                    className={`p-2 flex text-xs justify-between items-center cursor-pointer hover:bg-primary/10 ${
                      selectedPatient?.id === u.id
                        ? "bg-primary/10 border-l-4 border-primary"
                        : ""
                    }`}
                  >
                    <span>{`${u.firstName} ${u.lastName}`} ({u.email})</span>
                    {selectedPatient?.id === u.id && (
                      <FaCircleCheck className="text-primary text-lg" />
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        ) : ""}

        {selectedPatient && (
            <div className="flex flex-row items-center justify-between">
                          <div className="bg-gray-50 p-2 rounded text-sm">
            <strong>Patient:</strong> {`${selectedPatient.firstName} ${selectedPatient.lastName}`}
          </div>

        {!isEdit && (
            <button className="bg-red-500 text-white p-2 rounded-md text-xs ">
            Remove
          </button>
        )}
            </div>
        )}

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          />
        </div>
      </div>
    </Modal>
  );
}
