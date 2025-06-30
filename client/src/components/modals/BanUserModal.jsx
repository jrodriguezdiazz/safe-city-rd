import { useState } from "react";
import { useDispatch } from "react-redux";
import LoadingSpinner from "../loader/ButtonLoadingSpinner";
import {
  getComMembersAction,
  banUserAction,
} from "../../redux/actions/communityActions";

const BanUserModal = ({ show, onClose, userId, communityName }) => {
  const [banning, setBanning] = useState(false);
  const dispatch = useDispatch();

  const banHandler = async () => {
    setBanning(true);
    await dispatch(banUserAction(communityName, userId));
    await dispatch(getComMembersAction(communityName));
    setBanning(false);
    onClose();
  };
  return (
    <div
      className={`fixed inset-0 z-10 overflow-y-auto ${show ? "" : "hidden"}`}
    >
      <div className="flex min-h-screen items-center justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <div
          className={`fixed inset-0 transition-opacity ${show ? "" : "hidden"}`}
          aria-hidden="true"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:h-screen sm:align-middle"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          className="inline-block transform overflow-hidden rounded-md bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:align-middle"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div>
            <div className="mt-3 text-center sm:mt-5">
              <h3
                className="text-lg font-medium leading-6 text-gray-900"
                id="modal-headline"
              >
                Ban User
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  The user will be banned from this community and will be listed
                  in the banned users list. The user will not be able to join
                  the community again unless the ban is lifted. Are you sure you
                  want to ban this user?
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 flex justify-center space-x-2 sm:mt-6">
            <button
              disabled={banning}
              onClick={onClose}
              className="w-1/2 rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
            >
              Cancel
            </button>
            <button
              disabled={banning}
              onClick={banHandler}
              className="w-1/2 rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-sm"
            >
              {banning ? (
                <LoadingSpinner loadingText={"banning..."} />
              ) : (
                <span>Ban User</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BanUserModal;
