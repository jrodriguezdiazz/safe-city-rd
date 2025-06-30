import { useState } from "react";
import { reportPostAction } from "../../redux/actions/communityActions";
import { useDispatch } from "react-redux";

import { Dialog } from "@headlessui/react";
import ButtonLoadingSpinner from "../loader/ButtonLoadingSpinner";

const ReportPostModal = ({
  isOpen,
  onClose,
  postId,
  communityId,
  setReportedPost,
}) => {
  const [reportReason, setReportReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleReportSubmit = async () => {
    setIsLoading(true);
    try {
      await dispatch(
        reportPostAction({
          postId,
          reportReason,
          communityId,
        })
      );
      setIsLoading(false);
      setReportedPost(true);
      onClose();
    } catch (error) {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="mx-4 inline-block w-full transform rounded-md bg-white text-left align-middle shadow-xl transition-all md:max-w-lg">
          <Dialog.Title
            as="h3"
            className="p-4 text-lg font-medium leading-6 text-gray-900"
          >
            Report Post
          </Dialog.Title>

          <div className="p-4">
            <label
              htmlFor="report-reason"
              className="block text-sm font-medium text-gray-700"
            >
              Reason for report
            </label>
            <div className="mt-1">
              <textarea
                name="report-reason"
                className="block h-24 w-full resize-none rounded-md p-3 shadow-sm focus:border focus:outline-none sm:text-sm"
                id="report-reason"
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end p-4">
            <button
              disabled={isLoading || !reportReason}
              type="button"
              className={`inline-flex justify-center rounded-md border px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                isLoading || !reportReason
                  ? "cursor-not-allowed bg-gray-400"
                  : "border-transparent bg-primary hover:bg-blue-600 focus-visible:ring-blue-500"
              }`}
              onClick={handleReportSubmit}
            >
              {isLoading ? (
                <ButtonLoadingSpinner loadingText={"Reporting..."} />
              ) : (
                "Report"
              )}
            </button>

            <button
              type="button"
              className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ReportPostModal;
