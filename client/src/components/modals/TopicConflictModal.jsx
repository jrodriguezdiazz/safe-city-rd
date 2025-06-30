const TopicConflictModal = ({
  communityName,
  closeTopicConflictModal,
  showTopicConflictModal,
  recommendedCommunity,
}) => {
  const handleClose = () => {
    if (showTopicConflictModal) {
      closeTopicConflictModal();
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center overflow-y-auto transition-opacity duration-300 ${
        showTopicConflictModal ? "z-50 opacity-100" : "hidden opacity-0"
      }`}
    >
      <div className="fixed inset-0 z-0 bg-gray-900 bg-opacity-50"></div>
      <div className="relative z-10 w-full rounded-lg bg-white p-8 shadow-lg md:w-96">
        <div className="text-center">
          <h2 className="mb-4 text-lg font-bold">Important Message</h2>
          <hr className="mb-6 border-t-2 border-gray-300" />
          <p className="mb-6 text-gray-700">
            Hello! We've noticed that your post in the{" "}
            <strong className="text-primary">{communityName}</strong> community
            may not be the best fit for that audience. However, we believe it
            would be a great fit for the{" "}
            <strong className="text-primary">{recommendedCommunity}</strong>{" "}
            community!
          </p>

          <button
            className="focus:shadow-outline rounded bg-primary px-6 py-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-blue-700 focus:outline-none"
            onClick={handleClose}
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopicConflictModal;
