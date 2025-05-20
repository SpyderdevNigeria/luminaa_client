import { useEffect, useState } from "react";

const LoadingScreen = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const messages = [
    "Loading your dashboard...",
    "Fetching appointment data...",
    "Checking patient records...",
    "Almost there...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {/* Logo / Icon */}
      {/* <div className="mb-6">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-md">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div> */}

      {/* Message */}
      <p className="text-primary text-lg md:text-2xl font-medium tracking-wide animate-pulse">
        {messages[messageIndex]}
      </p>
    </div>
  );
};

export default LoadingScreen;
