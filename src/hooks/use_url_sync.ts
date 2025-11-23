import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

export const useUrlSync = <T extends Record<string, string | undefined>>(
  defaultFilters: T
) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const extractFilters = () => {
    const obj: Record<string, string | undefined> = {};
    Object.keys(defaultFilters).forEach((key) => {
      obj[key] = searchParams.get(key) || defaultFilters[key];
    });
    return obj as T;
  };

  const [filters, setFilters] = useState<T>(() => extractFilters());
  const [modalUserId, setModalUserId] = useState(searchParams.get("user"));

  // If URL changes (back/forward navigation), update state
  useEffect(() => {
    const newFilters = extractFilters();
    setFilters(newFilters);
    setModalUserId(searchParams.get("user"));
  }, [searchParams.toString()]); // important

  // Push state → URL (only when filters actually change)
  useEffect(() => {
    const newParams = new URLSearchParams();

    if (modalUserId) newParams.set("user", modalUserId);

    Object.entries(filters).forEach(([key, value]) => {
      if (!value || (key === "team" && value === "all")) return;
      newParams.set(key, value);
    });

    // Only update URL if different
    if (newParams.toString() !== searchParams.toString()) {
      setSearchParams(newParams, { replace: false });
    }
  }, [modalUserId, filters]);

  return {
    modalUserId,
    setModalUserId,
    filters,
    setFilters,
  };
};
