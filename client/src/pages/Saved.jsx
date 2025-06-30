import { getSavedPostsAction } from "../redux/actions/postActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import SavedPost from "../components/post/SavedPost";
import NoSavedPost from "../assets/nopost.jpg";

const Saved = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSavedPostsAction());
  }, [dispatch]);

  const savedPosts = useSelector((state) => state.posts?.savedPosts);

  return (
    <div className="main-section border bg-white">
      <div className="mb-3 flex flex-col">
        <h2 className="mb-4 border-b py-3 text-center text-lg font-semibold text-gray-700">
          Your saved posts
        </h2>

        {savedPosts && savedPosts.length > 0 ? (
          <div className="flex flex-col items-center px-5 py-5 ">
            {savedPosts.reverse().map((post) => (
              <SavedPost key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center">
            <p className="py-5 text-gray-500">
              You haven't saved any post yet.
            </p>
            <img loading="lazy" src={NoSavedPost} alt="no post" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Saved;
