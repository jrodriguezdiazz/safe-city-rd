import { useNavigate, useLocation } from "react-router";
import { useMemo } from "react";

const PostOnProfile = ({ post }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { content, fileUrl, community, createdAt, comments, likes, isMember } =
    post;

  const isImageFile = useMemo(() => {
    const validExtensions = [".jpg", ".png", ".jpeg", ".gif", ".webp", ".svg"];
    const fileExtension = fileUrl?.slice(fileUrl.lastIndexOf("."));
    return validExtensions.includes(fileExtension);
  }, [fileUrl]);

  return (
    <div
      className={`my-2 cursor-pointer rounded-md border bg-white p-3 transition-all duration-300 ${
        isMember ? "hover:shadow-md" : "pointer-events-none opacity-50"
      }`}
      onClick={() => {
        if (isMember) {
          navigate(`/my/post/${post._id}`, {
            state: { from: location.pathname },
          });
        }
      }}
    >
      <div className="flex items-center">
        <p className="text-sm text-gray-500">
          Posted in {community.name} on {createdAt}
        </p>
      </div>
      <div className="my-3">
        {content && <p className="mb-4">{content}</p>}
        {fileUrl && isImageFile ? (
          <div className="aspect-w-1 aspect-h-1 w-full">
            <img
              className="h-full w-full cursor-pointer rounded-md object-cover"
              src={fileUrl}
              alt={content}
              loading="lazy"
            />
          </div>
        ) : (
          fileUrl && (
            <div className="aspect-w-16 aspect-h-9 w-full">
              <video
                className="h-full w-full cursor-pointer rounded-md object-cover"
                src={fileUrl}
                controls
              />
            </div>
          )
        )}
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">
              {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
            </span>
            <span className="text-sm text-gray-500">
              {likes.length} {likes.length === 1 ? "Like" : "Likes"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostOnProfile;
