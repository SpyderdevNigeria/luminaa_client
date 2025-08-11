import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[100vh] flex flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="text-9xl font-extrabold text-gray-300 select-none">404</h1>
      <h2 className="text-3xl font-bold text-gray-700 mb-4">Page Not Found</h2>
      <p className="text-gray-500 mb-8 text-center max-w-md">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <button
        onClick={() => navigate('/')}
        className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition"
      >
        Go Home
      </button>
    </div>
  );
}
