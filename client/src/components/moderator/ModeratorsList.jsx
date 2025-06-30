import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComModsAction } from "../../redux/actions/communityActions";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { IoTimerOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";

const ModeratorsList = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const communityName = location.pathname.split("/")[2];
  useEffect(() => {
    dispatch(getComModsAction(communityName));
  }, [dispatch, communityName]);
  const communityMods = useSelector((state) => state.moderation?.communityMods);

  return (
    <div className="flex flex-col">
      <h3 className="text-xl font-bold">Moderators</h3>
      <div className="flex flex-col">
        {communityMods &&
          communityMods.map((moderator) => (
            <div
              key={moderator._id}
              className="my-2 flex items-center rounded-md border border-slate-200 px-4 py-3"
            >
              <Link to={`/user/${moderator._id}`} className="flex">
                <img
                  src={moderator.avatar}
                  alt="profile"
                  className="h-16 w-16 rounded-full"
                />

                <div className="flex flex-col">
                  <p className="ml-2 line-clamp-1 font-bold">
                    {moderator.name}
                  </p>
                  <p className="ml-2 flex items-center gap-1 text-xs">
                    <CiLocationOn />
                    {moderator.location}
                  </p>
                  <p className="ml-2 flex items-center gap-1 text-xs">
                    <IoTimerOutline />
                    {new Date(moderator.createdAt).toDateString()}
                  </p>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ModeratorsList;
