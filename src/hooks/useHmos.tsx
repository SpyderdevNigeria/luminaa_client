import { useEffect, useState } from "react";
import AdminApi from "../api/adminApi";

export interface Hmo {
  id?: string;
  name: string;
  description?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  isActive?: boolean;
  patientCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface HmoPatientsResponse {
  data: any[];
  total: number;
  page: number;
  limit: number;
}

export function useHmo() {
  const [hmos, setHmos] = useState<Hmo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedHmo, setSelectedHmo] = useState<Hmo | null>(null);
  const [patients, setPatients] = useState<HmoPatientsResponse | null>(null);

 
  const getHmos = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await AdminApi.getAllHmos();
      if (res?.data) {
        setHmos(res.data);
      }
    } catch (err: any) {
      console.error("Failed to fetch HMOs", err);
      setError("Failed to fetch HMOs");
    } finally {
      setLoading(false);
    }
  };

  /**  Get a single HMO by ID */
  const getHmoById = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await AdminApi.getHmoById(id);
      if (res?.data) {
        setSelectedHmo(res.data);
        return res.data;
      }
    } catch (err: any) {
      setError("Failed to fetch HMO details");
    } finally {
      setLoading(false);
    }
  };

  /**  Create a new HMO */
  const createHmo = async (data: Hmo) => {
    setLoading(true);
    setError(null);
    try {
      const res = await AdminApi.createHmo(data);
      if (res?.data) {
        setHmos((prev) => [...prev, res.data]);
      }
      return res.data;
    } catch (err: any) {
      console.error("Failed to create HMO", err);
      setError("Failed to create HMO");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**  Update existing HMO */
  const updateHmo = async (id: string, data: Hmo) => {
    setLoading(true);
    setError(null);
    try {
      const res = await AdminApi.updateHmo(id, data);
      if (res?.data) {
        setHmos((prev) =>
          prev.map((h) => (h.id === id ? { ...h, ...res.data } : h))
        );
      }
      return res.data;
    } catch (err: any) {
      console.error("Failed to update HMO", err);
      setError("Failed to update HMO");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**  Delete an HMO */
  const deleteHmo = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await AdminApi.deleteHmo(id);
      setHmos((prev) => prev.filter((h) => h.id !== id));
    } catch (err: any) {
      console.error("Failed to delete HMO", err);
      setError("Failed to delete HMO");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**  Get patients under a specific HMO */
  const getHmoPatients = async (id: string, page = 1, limit = 10) => {
    setLoading(true);
    setError(null);
    try {
      const res = await AdminApi.getHmoPatients(id, page, limit);
      if (res?.data?.data.length > 0) {
        console.log(res?.data?.data);
        setPatients(res.data.data);
        return res.data.data;
      }
    } catch (err: any) {
      console.error("Failed to fetch HMO patients", err);
      setError("Failed to fetch HMO patients");
    } finally {
      setLoading(false);
    }
  };

  /** 🔁 Auto-fetch on mount */
  useEffect(() => {
    getHmos();
  }, []);

  return {
    hmos,
    selectedHmo,
    patients,
    loading,
    error,
    getHmos,
    getHmoById,
    createHmo,
    updateHmo,
    deleteHmo,
    getHmoPatients,
    refetch: getHmos,
  };
}
