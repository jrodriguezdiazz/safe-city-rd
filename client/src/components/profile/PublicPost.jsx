import { useEffect, useState } from "react";
import Post from "../post/Post";
import { useSelector, useDispatch } from "react-redux";
import { getPublicPostsAction } from "../../redux/actions/postActions";
import CommonLoading from "../loader/CommonLoading";

const PublicPost = ({ publicUserId }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const publicPosts = useSelector((state) => state.posts?.publicPosts);

  useEffect(() => {
    const getPublicPosts = async () => {
      setLoading(true);
      await dispatch(getPublicPostsAction(publicUserId));
      setLoading(false);
    };
    getPublicPosts();
  }, [dispatch, publicUserId]);

  if (loading) {
    return (
      <div className="mt-5 flex items-center justify-center">
        <CommonLoading />
      </div>
    );
  }

  return (
    <div className="my-4">
      <h2 className="my-3 border-b pb-2 text-lg font-bold">Posts</h2>
      {publicPosts?.length === 0 ? (
        <p className="text-center">
          User has not posted anything yet. Check back later!
        </p>
      ) : (
        <div className="">
          {publicPosts?.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PublicPost;
