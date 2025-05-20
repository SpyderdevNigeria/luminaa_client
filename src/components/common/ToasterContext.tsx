import React, { createContext, useState, useContext } from 'react';
import Toaster from './Toaster';
// Create a context for the toaster
type ToastType = 'info' | 'success' | 'error' | 'warning';

interface Toast {
  message: string;
  type: ToastType;
}

interface ToasterContextType {
  showToast: (message: string, type?: ToastType) => void;
  hideToast: () => void;
  toast: Toast | null;
}

const ToasterContext = createContext<ToasterContextType | undefined>(undefined);

// Create a provider component
export const ToasterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = (message: string, type: ToastType = 'info') => {
    setToast({ message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  return (
    <ToasterContext.Provider value={{ showToast, hideToast, toast }}>
      {children}
      {toast && <Toaster {...toast} onClose={hideToast} />}
    </ToasterContext.Provider>
  );
};

// Custom hook to use the toaster context
export const useToaster = () => useContext(ToasterContext);
