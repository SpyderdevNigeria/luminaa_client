// ErrorBoundary.tsx
import  { Component, ReactNode } from "react";
import { useToaster } from "../common/ToasterContext";

interface Props {
  children: ReactNode;
  showToast: (message: string, type?: "error" | "info" | "success") => void;
}

interface State {
  hasError: boolean;
}

class ErrorBoundaryInner extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    console.error("Caught by ErrorBoundary:", error, errorInfo);
    // this.props.showToast("An unexpected error occurred. Please try again.", "error");
  }

  render() {
    return this.props.children;
  }
}

export default function ErrorBoundary({ children }: { children: ReactNode }) {
  const { showToast } = useToaster();

  return <ErrorBoundaryInner showToast={showToast}>{children}</ErrorBoundaryInner>;
}
