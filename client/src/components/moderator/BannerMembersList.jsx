import { useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { getComMembersAction } from "../../redux/actions/communityActions";
import UnbanUserModal from "../modals/UnbanUserModal";
import { IoTimerOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";

const BannerMembersList = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const communityName = location.pathname.split("/")[2] || "";

  const [unbanUserModalVisibility, setBanUserModalVisibility] = useState({});
  const toggleUnbanUserModal = (userId, visible) => {
    setBanUserModalVisibility((prevVisibility) => ({
      ...prevVisibility,
      [userId]: visible,
    }));
  };

  useEffect(() => {
    dispatch(getComMembersAction(communityName));
  }, [dispatch, communityName]);

  const bannedUsers =
    useSelector((state) => state.moderation.bannedUsers) || [];

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        {bannedUsers && bannedUsers.length === 0 && (
          <p className="text-center font-semibold text-gray-500">
            No banned users to show
          </p>
        )}
        {bannedUsers &&
          bannedUsers.map((bannedMember) => (
            <div
              key={bannedMember._id}
              className="my-3 flex flex-col rounded-lg  border border-gray-200 px-6 py-3 "
            >
              <div className="flex items-center justify-between">
                <div className="flex">
                  <img
                    src={bannedMember.avatar}
                    alt="profile"
                    className="h-16 w-16 rounded-full"
                  />

                  <div className="flex flex-col">
                    <Link
                      to={`/user/${bannedMember._id}`}
                      className="ml-2 font-bold"
                    >
                      {bannedMember.name}
                    </Link>
                    <p className="ml-2 flex items-center gap-1 text-xs">
                      <CiLocationOn />
                      {bannedMember.location}
                    </p>
                    <p className="ml-2 flex items-center gap-1 text-xs">
                      <IoTimerOutline />
                      {new Date(bannedMember.createdAt).toDateString()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    toggleUnbanUserModal(bannedMember._id, true);
                  }}
                  className="ml-2 flex h-9 items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-sky-700"
                >
                  Unban user
                </button>
              </div>

              <UnbanUserModal
                key={bannedMember._id}
                show={unbanUserModalVisibility[bannedMember._id] || false}
                onClose={() => {
                  toggleUnbanUserModal(bannedMember._id, false);
                }}
                userId={bannedMember._id}
                communityName={communityName}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default memo(BannerMembersList);
