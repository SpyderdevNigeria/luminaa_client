import { useState, useEffect } from "react";
import { Hmo, useHmo } from "../../hooks/useHmos";
import { useToaster } from "../common/ToasterContext";
import Modal from "./modal";

interface Props {
  hmo?: Hmo | null;
  onClose: () => void;
  onSuccess: () => void;
}

const HmoFormModal = ({ hmo, onClose, onSuccess }: Props) => {
  const { createHmo, updateHmo } = useHmo();
  const { showToast } = useToaster();

  const [name, setName] = useState(hmo?.name || "");
  const [description, setDescription] = useState(hmo?.description || "");
  const [email, setEmail] = useState(hmo?.contactEmail || "");
  const [phone, setPhone] = useState(hmo?.contactPhone || "");
  const [address, setAddress] = useState(hmo?.address || "");
  const [isActive, setIsActive] = useState(hmo?.isActive ?? true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {

    setLoading(true);

    try {
      if (hmo?.id) {
        await updateHmo(hmo.id, {
          name,
          description,
          contactEmail: email,
          contactPhone: phone,
          address,
          isActive,
        });
        showToast("HMO updated successfully", "success");
      } else {
        await createHmo({
          name,
          description,
          contactEmail: email,
          contactPhone: phone,
          address,
          isActive,
        });
        showToast("HMO created successfully", "success");
      }
      onSuccess();
    } catch (err) {
      showToast("Failed to save HMO", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hmo) {
      setName(hmo.name);
      setDescription(hmo.description || "");
      setEmail(hmo.contactEmail || "");
      setPhone(hmo.contactPhone || "");
      setAddress(hmo.address || "");
      setIsActive(hmo.isActive ?? true);
    }
  }, [hmo]);

  return (
    <Modal
      open={true}
      onClose={onClose}
      title={hmo ? "Edit HMO" : "Add HMO"}
      handleSubmit={handleSubmit}
      buttonText={loading ? "Saving..." : "Save"}
      loading={loading}
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isActive"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="h-4 w-4"
          />
          <label htmlFor="isActive" className="text-sm">
            Active
          </label>
        </div>
      </form>
    </Modal>
  );
};

export default HmoFormModal;
