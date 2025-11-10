// src/hooks/useSpecialisations.ts
import { useEffect, useState } from "react";
import AdminApi from "../api/adminApi";

export interface Specialisation {
  id?: string;
  name: string;
  description?: string;
  additionalInfo?: string;
  consultationPrice?: number;
}

export function useSpecialisations() {
  const [specialisations, setSpecialisations] = useState<Specialisation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSpecialisations = async () => {
    try {
      setLoading(true);
      const res = await AdminApi.getSpecialisationsList();
      setSpecialisations(res?.data || []);
    } catch (err: any) {
      setError(err?.message || "Failed to load specialisations");
    } finally {
      setLoading(false);
    }
  };


  const createSpecialisation = async (data: Specialisation) => {
    await AdminApi.createSpecialisation(data);
    await fetchSpecialisations();
  };

  const updateSpecialisation = async (id: string, data: Specialisation) => {
    await AdminApi.updateSpecialisation(id, data);
    await fetchSpecialisations();
  };

  const deleteSpecialisation = async (id: string) => {
    await AdminApi.deleteSpecialisation(id);
    await fetchSpecialisations();
  };

  useEffect(() => {
    fetchSpecialisations();
  }, []);

  return {
    specialisations,
    loading,
    error,
    createSpecialisation,
    updateSpecialisation,
    deleteSpecialisation,
    refetch: fetchSpecialisations,
  };
}
