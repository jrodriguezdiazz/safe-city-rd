const ContextAuthModal = ({
  isModalOpen,
  setIsModalOpen,
  setIsConsentGiven,
  isModerator,
}) => {
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="w-full max-w-lg rounded-md bg-white p-8">
            <h2 className="mb-4 text-xl font-bold text-gray-800">
              Context-Based Authentication
            </h2>
            {isModerator ? (
              <p className="mb-6 text-gray-600">
                This feature is not available for moderators.
              </p>
            ) : (
              <p className="mb-6 text-gray-600">
                To enhance the security of your account, we offer context-based
                authentication. By enabling this feature, we will process
                certain information about your device and location, including
                your current location, device, browser info, and IP address.
                This information will be used to verify your identity when you
                sign in from a new location or device, and will be encrypted and
                kept confidential. Please note that email verification is
                required to enable this feature. Would you like to enable
                context-based authentication and enhance the security of your
                account?
              </p>
            )}
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setIsConsentGiven(false);
                  handleCloseModal();
                }}
                className="mr-4 text-gray-500 hover:text-gray-900 hover:underline focus:outline-none"
              >
                {isModerator ? "Close" : "No, thanks"}
              </button>
              <button
                onClick={() => {
                  setIsConsentGiven(true);
                  handleCloseModal();
                }}
                className={`${
                  isModerator
                    ? "hidden"
                    : "bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
                } rounded-md px-4 py-2 text-white`}
              >
                Yes, enable
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContextAuthModal;
