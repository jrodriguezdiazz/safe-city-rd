import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getModProfileAction } from "../../redux/actions/authActions";
import CommonLoading from "../loader/CommonLoading";

const ModeratorProfile = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getModProfileAction());
  }, [dispatch]);

  const moderator = useSelector((state) => state.moderation?.modProfile);
  if (!moderator)
    return (
      <div className="flex items-center justify-center">
        <CommonLoading />
      </div>
    );

  return (
    <div className="flex flex-col items-center gap-2 ">
      <img
        src={moderator.avatar}
        alt="user"
        className="h-20 w-20 rounded-full object-cover"
      />
      <p>
        <span className="font-bold">{moderator.name}</span>
      </p>

      <p>{moderator.email}</p>
      <p>Joined: {moderator.createdAt}</p>
    </div>
  );
};

export default ModeratorProfile;
