import { deletePostAction } from "../../redux/actions/postActions";
import { removeReportedPostAction } from "../../redux/actions/communityActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import CommonLoading from "../loader/CommonLoading";

const ViewReportedPost = ({ post }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRemove = async () => {
    await dispatch(deletePostAction(post._id));
    navigate(-1);
  };

  const onNoAction = async () => {
    await dispatch(removeReportedPostAction(post._id));
    navigate(-1);
  };

  const fileUrl = post?.fileUrl;
  const fileType = post?.fileType;

  if (!post) return <CommonLoading />;

  const { content, user, dateTime, comments, savedByCount } = post;

  return (
    <div className="mx-auto mb-2 rounded-md border bg-white p-3">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center">
          <img
            className="mr-2 h-8 w-8 rounded-full"
            src={user.avatar}
            alt="user"
          />
          <div className="text-sm font-medium text-gray-700">{user.name}</div>
        </div>
        <div className="text-sm text-gray-500">{dateTime}</div>
      </div>
      <div className="mb-4 text-lg">{content}</div>
      {fileUrl && fileType === "image" ? (
        <img
          className="mt-3 h-auto w-[800px] rounded-md"
          src={fileUrl}
          alt={content}
          loading="lazy"
        />
      ) : (
        fileUrl && (
          <video
            className="mt-3 h-auto w-[800px] rounded-md"
            src={fileUrl}
            controls
          />
        )
      )}

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="text-sm text-gray-500">
              {comments.length} Comments
            </div>
            <div className="text-sm text-gray-500">{savedByCount} Saves</div>
          </div>
        </div>
      </div>

      <div className="mt-3 flex justify-end text-sm">
        <button
          className="py- mr-2 rounded-md bg-red-500 px-2 text-white"
          onClick={onRemove}
        >
          Remove
        </button>
        <button
          className="rounded-md bg-gray-500 px-3 py-1 text-white"
          onClick={onNoAction}
        >
          No Action
        </button>
      </div>
    </div>
  );
};

export default ViewReportedPost;
