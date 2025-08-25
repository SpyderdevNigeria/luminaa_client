import { useEffect, ReactNode } from "react";

interface ResetThemeProps {
  children: ReactNode;
}

const ResetTheme = ({ children }: ResetThemeProps) => {
  useEffect(() => {
    document.documentElement.removeAttribute("data-theme");
  }, []);

  return <>{children}</>;
};

export default ResetTheme;
