import { useRouteError, Link } from "react-router-dom";
import { FaExclamationTriangle, FaHome, FaArrowLeft } from "react-icons/fa";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Error Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500/20 rounded-full mb-4">
            <FaExclamationTriangle className="text-red-400 text-3xl" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Oops!</h1>
          <p className="text-gray-300 text-lg">Something went wrong</p>
        </div>

        {/* Error Details */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Error Details</h2>
          <div className="space-y-2">
            <p className="text-gray-300">
              <span className="font-medium">Status:</span> {error.status || 'Unknown'}
            </p>
            <p className="text-gray-300">
              <span className="font-medium">Message:</span> {error.statusText || error.message || 'An unexpected error occurred'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/"
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 transform hover:scale-105"
          >
            <FaHome />
            <span>Go Home</span>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 transform hover:scale-105"
          >
            <FaArrowLeft />
            <span>Go Back</span>
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}