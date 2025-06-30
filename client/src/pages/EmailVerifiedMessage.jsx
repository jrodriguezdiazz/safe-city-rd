import { useNavigate } from "react-router";

const EmailVerifiedMessage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white px-4 py-8 shadow-lg">
        <div className="mb-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-green-600">
            Congratulations!
          </h2>
          <p className="text-gray-600">
            Your email has been verified and your account has been created
            successfully.
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

export default EmailVerifiedMessage;
