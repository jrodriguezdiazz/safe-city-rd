import { useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComMembersAction } from "../../redux/actions/communityActions";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import BanUserModal from "../modals/BanUserModal";
import { CiLocationOn } from "react-icons/ci";
import { IoTimerOutline } from "react-icons/io5";

const MembersList = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const communityName = location.pathname.split("/")[2] || "";

  const [banUserModalVisibility, setBanUserModalVisibility] = useState({});
  const toggleBanUserModal = (userId, visible) => {
    setBanUserModalVisibility((prevVisibility) => ({
      ...prevVisibility,
      [userId]: visible,
    }));
  };

  useEffect(() => {
    dispatch(getComMembersAction(communityName));
  }, [dispatch, communityName]);

  const communityMembers = useSelector(
    (state) => state.moderation?.communityMembers
  );

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        {communityMembers && communityMembers.length === 0 && (
          <p className="text-center font-semibold text-gray-500">
            No members to show
          </p>
        )}
        {communityMembers &&
          communityMembers.map((member) => {
            const modalVisible = banUserModalVisibility[member._id] || false;
            return (
              <div
                key={member._id}
                className="my-3 flex flex-col rounded-lg  border border-gray-200 px-6 py-3 "
              >
                <div className="flex items-center justify-between">
                  <div className="flex">
                    <img
                      src={member.avatar}
                      alt="profile"
                      className="h-16 w-16 rounded-full"
                    />
                    <div className="flex flex-col">
                      <Link
                        to={`/user/${member._id}`}
                        className="ml-2 font-bold"
                      >
                        {member.name}
                      </Link>
                      <p className="ml-2 flex items-center gap-1 text-xs">
                        <CiLocationOn />
                        {member.location}
                      </p>
                      <p className="ml-2 flex items-center gap-1 text-xs">
                        <IoTimerOutline />
                        {new Date(member.createdAt).toDateString()}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      toggleBanUserModal(member._id, true);
                    }}
                    className=" flex h-9 items-center justify-center rounded-lg bg-red-500 px-4 py-2 text-sm font-bold text-white hover:bg-red-700"
                  >
                    Ban user
                  </button>
                </div>

                {modalVisible && (
                  <BanUserModal
                    key={member._id}
                    show={modalVisible}
                    onClose={() => {
                      toggleBanUserModal(member._id, false);
                    }}
                    userId={member._id}
                    communityName={communityName}
                  />
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default memo(MembersList);
