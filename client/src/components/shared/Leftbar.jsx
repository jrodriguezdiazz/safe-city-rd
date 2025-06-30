import { useMemo, useEffect, memo } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getJoinedCommunitiesAction } from "../../redux/actions/communityActions";
import {
  HiOutlineHome,
  HiOutlineUserCircle,
  HiOutlineRectangleStack,
  HiOutlineTag,
} from "react-icons/hi2";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { GiTeamIdea } from "react-icons/gi";

const Leftbar = ({ showLeftbar }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth?.userData);
  const joinedCommunities = useSelector(
    (state) => state.community?.joinedCommunities
  );

  useEffect(() => {
    dispatch(getJoinedCommunitiesAction());
  }, [dispatch]);

  const visibleCommunities = useMemo(() => {
    return joinedCommunities?.slice(0, 5);
  }, [joinedCommunities]);

  const communityLinks = useMemo(() => {
    return visibleCommunities?.map((community) => ({
      href: `/community/${community.name}`,
      label: community.name,
    }));
  }, [visibleCommunities]);

  return (
    <div className={`${showLeftbar ? "" : "hidden"} leftbar`}>
      <div className="flex flex-col items-center justify-start">
        <div className="flex w-full flex-col items-start gap-4 p-5">
          <Link
            className="flex items-center gap-2 text-lg font-medium hover:text-primary"
            to="/home"
          >
            <HiOutlineHome className="text-xl" />
            <p>Home</p>
          </Link>
          <Link
            className="flex items-center gap-2 text-lg font-medium hover:text-primary"
            to="/profile"
          >
            <HiOutlineUserCircle className="text-xl" />
            <p>Profile</p>
          </Link>
          <Link
            className="flex items-center gap-2 text-lg font-medium hover:text-primary"
            to="/saved"
          >
            <HiOutlineTag className="text-xl" />
            <p>Saved</p>
          </Link>

          {user && user.role === "general" && (
            <Link
              className="flex items-center gap-2 text-lg font-medium hover:text-primary"
              to="/following"
            >
              <HiOutlineRectangleStack className="text-xl" />
              <p>Following</p>
            </Link>
          )}

          <hr className="my-4 w-full border-gray-300" />

          {communityLinks && communityLinks.length > 0 ? (
            <div className="w-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 font-medium">
                  <HiOutlineUserGroup className="text-xl" />
                  Communities
                </div>

                <Link
                  className="relative mr-4 flex items-center text-sm font-medium text-primary"
                  to="/my-communities"
                >
                  See all
                  <p className="absolute -right-4 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-white">
                    {" "}
                    {joinedCommunities.length}
                  </p>
                </Link>
              </div>
              <ul className="mt-3 w-full">
                {communityLinks.map((communityLink) => (
                  <li key={communityLink.href}>
                    <Link
                      className="flex items-center gap-2 py-1 font-medium text-gray-600 hover:text-primary"
                      to={communityLink.href}
                    >
                      {communityLink.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div>No communities found.</div>
          )}
          {user && user.role === "general" && (
            <div className="md:hidden">
              <hr className="my-4 w-full border-gray-300" />
              <div className="flex items-center justify-center gap-1">
                <GiTeamIdea />
                <Link to="/communities" className="font-medium text-primary">
                  See all communities
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(Leftbar);
