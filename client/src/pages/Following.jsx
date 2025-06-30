import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFollowingUsersAction } from "../redux/actions/userActions";
import PublicProfileCard from "../components/profile/PublicProfileCard";
import CommonLoading from "../components/loader/CommonLoading";
import noFollow from "../assets/nofollow.jpg";

const Following = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const followingUsers = useSelector((state) => state.user?.followingUsers);

  useEffect(() => {
    const fetchFollowingUsers = async () => {
      setLoading(true);
      await dispatch(getFollowingUsersAction());
      setLoading(false);
    };

    fetchFollowingUsers();
  }, [dispatch]);

  return (
    <div className="main-section border bg-white">
      {loading ? (
        <div className="flex h-screen items-center justify-center">
          <CommonLoading />
        </div>
      ) : (
        <div>
          <h2 className="mb-4 border-b py-3 text-center font-semibold text-gray-700">
            People you're following
          </h2>
          {followingUsers?.length > 0 ? (
            <div className="grid grid-cols-1 items-center gap-5 px-3 py-3 md:grid-cols-2">
              {followingUsers.map((user) => (
                <PublicProfileCard key={user._id} user={user} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center">
              <p className="py-5 text-gray-500">
                You are not following anyone yet.
              </p>
              <img src={noFollow} alt="no post" className="max-w-md" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Following;
