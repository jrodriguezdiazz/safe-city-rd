const InappropriatePost = ({
  showInappropriateContentModal,
  closeInappropriateContentModal,
  contentType,
}) => {
  const modalClass = showInappropriateContentModal
    ? "fixed inset-0 overflow-y-auto"
    : "hidden";

  const handleClose = () => {
    if (showInappropriateContentModal) {
      closeInappropriateContentModal();
    }
  };

  return (
    <div className={`${modalClass} z-50`}>
      <div className="flex min-h-screen items-center justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:h-screen sm:align-middle"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block transform overflow-hidden rounded-md bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <h2 className="mb-4 text-lg font-bold text-red-600">
              Warning: Inappropriate Content
            </h2>
            <p className="mb-6 text-gray-700">
              Your {contentType} contains content that violates our community
              guidelines. To maintain a positive and respectful environment for
              all users, please remove the inappropriate content and ensure
              compliance with our guidelines.
            </p>
            <button
              className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InappropriatePost;
