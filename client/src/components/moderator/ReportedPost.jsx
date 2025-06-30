import { useNavigate, useParams } from "react-router-dom";
import { IoTimerOutline } from "react-icons/io5";

const ReportedPost = ({ reportedPost }) => {
  const navigate = useNavigate();
  const { post, reportedBy, reportReason, reportDate } = reportedPost;
  const { communityName } = useParams();

  const postId = post?._id;

  const handleNavigateToPost = () => {
    navigate(`/community/${communityName}/reported-post`, {
      state: { postId },
    });
  };

  return (
    <div
      className="flex cursor-pointer items-center gap-4 p-3"
      onClick={handleNavigateToPost}
    >
      <div className="flex flex-col">
        <div className="flex">
          {reportedBy.slice(0, 3).map((user) => (
            <img
              key={user._id}
              className="w-8 flex-shrink-0 rounded-full border-2 border-white"
              src={user.avatar}
              alt="user avatar"
            />
          ))}
          {reportedBy.length > 3 && (
            <div className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-gray-300">
              <span className="text-xs font-bold text-gray-800">
                +{reportedBy.length - 3}
              </span>
            </div>
          )}
          <div className="ml-4">
            <span className="text-sm">{reportedBy[0].name} </span>
            {reportedBy.length > 1 && (
              <span className="text-xs text-gray-600">
                and {reportedBy.length - 1} others reported this
              </span>
            )}
            <span className="flex items-center gap-1 text-xs text-gray-600">
              <IoTimerOutline />
              {reportDate}
            </span>
          </div>
        </div>
        <div className="mt-2 text-sm font-semibold text-red-500">
          <span className="font-semibold">Reason:</span> {reportReason}
        </div>
      </div>
    </div>
  );
};

export default ReportedPost;
