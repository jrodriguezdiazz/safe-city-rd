import { useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
const BASE_URL = process.env.REACT_APP_API_URL;

const LoginVerified = () => {
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const idFromUrl = searchParams.get("id");
  const emailFromUrl = searchParams.get("email");

  const handleVerify = useCallback(() => {
    const verifyUrl = `${BASE_URL}/auth/verify-login?id=${idFromUrl}&email=${emailFromUrl}`;
    axios
      .get(verifyUrl)
      .then((res) => {
        if (res.status === 200) {
          setIsVerified(true);
        }
      })
      .catch((err) => {
        console.error("Verification failed:", err);
        setIsVerified(false);
      });
  }, [idFromUrl, emailFromUrl, setIsVerified]);

  useEffect(() => {
    // Automatically trigger handleVerify if both id and email are present in the URL
    if (idFromUrl && emailFromUrl) {
      handleVerify();
    }
  }, [idFromUrl, emailFromUrl, handleVerify]);

  if (!isVerified) {
    return (
      <div className="flex items-center justify-center rounded-lg bg-yellow-200 p-4 text-black shadow-md">
        <p className="text-center">
          You may not have been verified yet. Please check your email for a link
          to verify your account. If you have already verified your account,
          please try
          <Link className="font-bold text-blue-500" to="/signin">
            {" "}
            logging in{" "}
          </Link>
          again.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white px-4 py-8 shadow-lg">
        <div className="mb-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-green-600">
            Congratulations!
          </h2>
          <p className="text-gray-600">
            You have been verified and can now login.
          </p>
        </div>
        <button
          onClick={() => navigate("/signin")}
          className="w-full rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
        >
          Login Now
        </button>
      </div>
    </div>
  );
};

export default LoginVerified;
