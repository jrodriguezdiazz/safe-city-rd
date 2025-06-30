import { useMemo } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";
import Like from "./Like";
import { IoIosArrowBack } from "react-icons/io";
const SavedPost = ({ post }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { content, fileUrl, user, community, createdAt, comments } = post;

  const isImageFile = useMemo(() => {
    const validExtensions = [".jpg", ".png", ".jpeg", ".gif", ".webp", ".svg"];
    const fileExtension = fileUrl?.slice(fileUrl.lastIndexOf("."));
    return validExtensions.includes(fileExtension);
  }, [fileUrl]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="mb-6 w-full rounded-md border bg-white px-6 py-6">
      <p className="mb-3 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-dashed border-primary px-2 py-2">
        <IoIosArrowBack
          className="text-xl font-semibold text-primary"
          onClick={handleBack}
        />
      </p>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <img
            className="overflow-hidden rounded-full"
            src={user.avatar}
            alt="user avatar"
            style={{ width: "50px" }}
            loading="lazy"
          />
          <div className="">
            <p className="text-lg font-semibold">{user.name}</p>
            <p className="text-xs text-gray-500">{community.name}</p>
          </div>
        </div>
        <p>{createdAt}</p>
      </div>
      <div
        className="cursor-pointer"
        onClick={() => {
          navigate(`/post/${post._id}`, {
            state: { from: location.pathname },
          });
        }}
      >
        <p className="mt-3">{content}</p>
        <div className="flex justify-center">
          {fileUrl && isImageFile ? (
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
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Like post={post} />
          <Link to={`/post/${post._id}`}>
            <button className="flex items-center gap-1 text-xl">
              {" "}
              <HiOutlineChatBubbleOvalLeft />
              {comments.length}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SavedPost;
