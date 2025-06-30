import { useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router";
import LoadingSpinner from "../components/loader/ButtonLoadingSpinner";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

const BlockDevice = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const idFromUrl = searchParams.get("id");
  const emailFromUrl = searchParams.get("email");

  const handleBlock = useCallback(() => {
    setLoading(true);
    const blockLink = `${BASE_URL}/auth/block-login?id=${idFromUrl}&email=${emailFromUrl}`;
    axios
      .get(blockLink)
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          navigate("/signin");
        }
      })
      .catch((err) => {
        console.error("Error blocking device:", err);
        setLoading(false);
      });
  }, [idFromUrl, emailFromUrl, setLoading, navigate]);

  return (
    <div className="relative flex justify-center">
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          ></span>
          <div className="relative inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle rtl:text-right">
            <div>
              <div className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-gray-700 "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
              </div>
              <div className="mt-2 text-center">
                <h3
                  className="text-lg font-medium capitalize leading-6 text-gray-800"
                  id="modal-title"
                >
                  Block Device
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Are you sure you want to block this device?
                </p>
              </div>
            </div>
            <div className="mt-5 sm:flex sm:items-center sm:justify-center">
              <div className="sm:flex sm:items-center sm:justify-center">
                <button className="mt-2 w-full transform rounded-md border border-gray-200 px-4 py-2 text-sm font-medium capitalize tracking-wide text-gray-700 transition-colors duration-300 hover:bg-gray-100 focus:outline-none focus:ring  focus:ring-gray-300 focus:ring-opacity-40 sm:mx-2 sm:mt-0 sm:w-auto">
                  Cancel
                </button>
                <button
                  disabled={loading}
                  onClick={handleBlock}
                  className="mt-2 w-full transform rounded-md bg-red-600 px-4 py-2 text-sm font-medium capitalize tracking-wide text-white transition-colors duration-300 hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-40 sm:mt-0 sm:w-auto"
                >
                  {loading ? (
                    <LoadingSpinner loadingText={"Blocking..."} />
                  ) : (
                    "Block"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockDevice;
