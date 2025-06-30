import { memo } from "react";
import { Link } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
const PublicProfileCard = ({ user }) => {
  const followingSince = new Date(user.followingSince).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link
      to={`/user/${user._id}`}
      className="w-full cursor-pointer rounded-md border bg-white px-4 py-4 shadow-2xl shadow-[#f2f5fc]"
    >
      <div className="flex gap-3">
        <img
          src={user.avatar}
          alt="Avatar"
          className="h-12 w-12 rounded-full object-cover"
          loading="lazy"
        />
        <div>
          <h2 className="text-base font-bold">{user.name}</h2>
          <p className="flex items-center gap-2">
            <CiLocationOn className="text-lg" />
            {user.location || "N/A"}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <p className="font-semibold text-gray-500">Following Since</p>
        <p>{followingSince}</p>
      </div>
    </Link>
  );
};

export default memo(PublicProfileCard);
