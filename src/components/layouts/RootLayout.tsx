import { ReactNode } from "react";
// import { useGoogleTranslateCleanup } from "../common/useGoogleTranslateCleanup";

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
//   useGoogleTranslateCleanup();
  return <>{children}</>;
}
