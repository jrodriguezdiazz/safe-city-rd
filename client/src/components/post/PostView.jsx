import { useEffect, useState } from "react";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { getCommunityAction } from "../../redux/actions/communityActions";
import Save from "./Save";
import Like from "./Like";
import CommentForm from "../form/CommentForm";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";
import DeleteModal from "../modals/DeleteModal";
import { IoIosArrowBack } from "react-icons/io";
import CommonLoading from "../loader/CommonLoading";
import "react-photo-view/dist/react-photo-view.css";
import { PhotoProvider, PhotoView } from "react-photo-view";
import ReportPostModal from "../modals/ReportPostModal";
import { VscReport } from "react-icons/vsc";
import Tooltip from "../shared/Tooltip";

const PostView = ({ post, userData }) => {
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    content,
    fileUrl,
    fileType,
    user,
    community,
    dateTime,
    comments,
    savedByCount,
    isReported,
  } = post;

  useEffect(() => {
    dispatch(getCommunityAction(community.name)).then(() => setLoading(false));
  }, [dispatch, community.name, loading]);

  const [showModal, setShowModal] = useState(false);
  const toggleModal = (value) => {
    setShowModal(value);
  };

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isReportedPost, setIsReportedPost] = useState(isReported);

  const handleReportClick = () => {
    setIsReportModalOpen(true);
  };

  const handleReportClose = () => {
    setIsReportModalOpen(false);
  };

  if (loading) {
    return (
      <div className="main-section flex items-center justify-center">
        <CommonLoading />
      </div>
    );
  }

  return (
    <div className="main-section rounded-lg border bg-white p-5 shadow-md">
      <p className="mb-3 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-dashed border-primary px-2 py-2">
        <IoIosArrowBack
          className="text-lg font-semibold text-primary"
          onClick={() => navigate(location.state?.from || "/")}
        />
      </p>

      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            className="h-12 w-12 overflow-hidden rounded-full object-cover"
            src={user.avatar}
            alt="user avatar"
            loading="lazy"
          />
          <div className="flex flex-col">
            {userData._id === user._id ? (
              <Link to="/profile" className="text-lg font-semibold">
                {user.name}
              </Link>
            ) : (
              <Link to={`/user/${user._id}`} className="text-lg font-semibold">
                {user.name}
              </Link>
            )}
            <Link
              to={`/community/${community.name}`}
              className="text-xs text-gray-500"
            >
              {community.name}
            </Link>
          </div>
        </div>

        <span className="self-center text-sm text-gray-500">{dateTime}</span>
      </div>

      <div className="mb-4">
        <p className="my-2">{content}</p>
        <div className="flex justify-center">
          {fileUrl && fileType === "image" ? (
            <PhotoProvider
              overlayRender={() => (
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-10 px-3 py-2 text-white">
                  <p className="text-xs">{user.name}</p>
                  <p className="text-xs">{community.name}</p>
                  <p className="text-xs">{dateTime}</p>
                </div>
              )}
            >
              <PhotoView src={fileUrl}>
                <div className="aspect-w-1 aspect-h-1 w-full">
                  <img
                    src={fileUrl}
                    alt={content}
                    loading="lazy"
                    className="cursor-pointer rounded-md object-cover"
                  />
                </div>
              </PhotoView>
            </PhotoProvider>
          ) : (
            fileUrl && (
              <div className="aspect-w-16 aspect-h-9 w-full">
                <video
                  className="mx-auto block rounded-md focus:outline-none"
                  src={fileUrl}
                  controls
                />
              </div>
            )
          )}
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Like post={post} />
          <button className="flex items-center space-x-1">
            <HiOutlineChatBubbleOvalLeft className="text-2xl" />
            <span className="text-lg">{comments.length}</span>
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <Save postId={post._id} />
          <Tooltip text="Saved by" className="items-center">
            <div className="flex items-center">
              <HiOutlineArchiveBox className="text-2xl" />
              {savedByCount}
            </div>
          </Tooltip>
          {isReportedPost ? (
            <Tooltip text="Reported" className="items-center">
              <button disabled className="text-green-500">
                <VscReport className="text-2xl" />
              </button>
            </Tooltip>
          ) : (
            <Tooltip text="Report">
              <button onClick={handleReportClick}>
                <VscReport className="text-2xl" />
              </button>
            </Tooltip>
          )}
          {userData?._id === post.user._id && (
            <Tooltip text="Delete">
              <button
                onClick={() => toggleModal(true)}
                className="text-red-500"
              >
                <HiOutlineArchiveBox className="text-2xl" />
              </button>
            </Tooltip>
          )}
        </div>
      </div>

      {/* Delete Modal */}
      <DeleteModal
        showModal={showModal}
        postId={post._id}
        onClose={() => toggleModal(false)}
        prevPath={location.state.from || "/"}
      />

      <ReportPostModal
        isOpen={isReportModalOpen}
        onClose={handleReportClose}
        postId={post._id}
        communityId={community._id}
        setReportedPost={setIsReportedPost}
      />

      <div>
        <CommentForm communityId={community._id} postId={post._id} />
      </div>
    </div>
  );
};

export default PostView;
