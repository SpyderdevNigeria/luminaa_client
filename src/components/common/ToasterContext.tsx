import React, { createContext, useState, useContext, ReactNode } from 'react';
import Toaster from './Toaster';

type ToastType = 'info' | 'success' | 'warning' | 'error';

type Toast = {
  message: string;
  type: ToastType;
};

type ToasterContextType = {
  showToast: (message: string, type?: ToastType) => void;
  hideToast: () => void;
  toast: Toast | null;
};

const ToasterContext = createContext<ToasterContextType | undefined>(undefined);

type ToasterProviderProps = {
  children: ReactNode;
};

export const ToasterProvider: React.FC<ToasterProviderProps> = ({ children }) => {
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
      {toast && <Toaster message={toast.message} type={toast.type} onClose={hideToast} />}
    </ToasterContext.Provider>
  );
};

// Custom hook to use the toaster context
export const useToaster = (): ToasterContextType => {
  const context = useContext(ToasterContext);
  if (!context) {
    throw new Error('useToaster must be used within a ToasterProvider');
  }
  return context;
};
