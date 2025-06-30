import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import debounce from "lodash/debounce";
import JoinModal from "../modals/JoinModal";
import { MoonLoader } from "react-spinners";
import { MdClear } from "react-icons/md";

const BASE_URL = process.env.REACT_APP_API_URL;

const Search = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [community, setCommunity] = useState(null);
  const [joinedCommunity, setJoinedCommunity] = useState(null);
  const [loading, setLoading] = useState(false);
  const accessToken = JSON.parse(localStorage.getItem("profile"))?.accessToken;
  const setInitialValue = () => {
    setUsers([]);
    setPosts([]);
    setCommunity(null);
    setJoinedCommunity(null);
    setLoading(false);
  };

  const debouncedHandleSearch = useMemo(
    () =>
      debounce((q) => {
        setLoading(true);
        const encodedQuery = encodeURIComponent(q);
        axios
          .get(`${BASE_URL}/search?q=${encodedQuery}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            const { posts, users, community, joinedCommunity } = res.data;
            setPosts(posts);
            setUsers(users);
            setCommunity(community);
            setJoinedCommunity(joinedCommunity);
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
          });
      }, 800),
    [accessToken]
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value === "") {
      setInitialValue();
      return;
    }

    debouncedHandleSearch(value);
  };

  const clearValues = () => {
    setInitialValue();
    setInputValue("");
  };

  useEffect(() => {
    return () => {
      setInitialValue();
    };
  }, []);

  const [joinModalVisibility, setJoinModalVisibility] = useState(false);
  const toggleModal = () => {
    setJoinModalVisibility((prev) => !prev);
  };

  return (
    <div>
      <div className="relative">
        <input
          type="text"
          id="search"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search for people, posts or communities"
          className="focus:shadow-outline-blue h-10 w-full rounded-full border bg-white py-1 pl-3 pr-10 text-sm shadow-sm transition duration-300 focus:border-blue-500 focus:outline-none md:w-[660px]"
          aria-label="Search"
          autoComplete="off"
        />
        {inputValue !== "" && (
          <button
            className="absolute right-0 top-0 flex h-full w-10 items-center justify-center text-gray-400 hover:text-gray-600"
            onClick={clearValues}
          >
            <MdClear />
          </button>
        )}
      </div>

      {inputValue !== "" && (
        <div
          onBlur={() => !community && clearValues()}
          className="absolute start-0 top-12 w-screen rounded-md border bg-white shadow-md md:start-auto md:w-[660px]"
        >
          {loading && (
            <div className="flex items-center justify-center px-2 py-2">
              <MoonLoader size={20} color={"#008cff"} />
              <span className="ml-2">Searching...</span>
            </div>
          )}
          {posts.length > 0 && (
            <ul className="z-30">
              {posts.map((post) => (
                <li key={post._id} className="border-b px-4 py-2">
                  <div
                    onClick={() => {
                      navigate(`/post/${post._id}`);
                      clearValues();
                    }}
                    className="block cursor-pointer text-sm text-gray-700 hover:text-blue-500"
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <img
                          src={post.user.avatar}
                          alt={post.user.name}
                          className="h-8 w-8 rounded-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="ml-3">
                        <div className="font-medium text-gray-900">
                          {post.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {post.content}
                        </div>
                        <div className="text-sm text-gray-500">
                          Posted by {post.user.name} in {post.community.name}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {users.length > 0 && (
            <ul className="z-30">
              {users.map((user) => (
                <li key={user._id} className="border-b px-4 py-2">
                  <div
                    onClick={() => {
                      navigate(`/user/${user._id}`);
                      clearValues();
                    }}
                    className="block cursor-pointer text-sm text-gray-700 hover:text-indigo-500"
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="h-8 w-8 rounded-full"
                        />
                      </div>
                      <div className="ml-3">
                        <div className="font-medium text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {community && (
            <div className="border-b px-4 py-2">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    src={community.banner}
                    alt={community.name}
                    className="h-8 w-8 rounded-full"
                  />
                </div>
                <div className=" flex items-center justify-between gap-2 px-2">
                  <div className="">
                    <p className="font-medium">{community.name}</p>

                    <p className="line-clamp-2 text-sm">
                      {community.description}
                    </p>
                  </div>

                  {!community.isMember && (
                    <>
                      <JoinModal
                        show={joinModalVisibility}
                        onClose={() => {
                          toggleModal(false);
                          setCommunity(null);
                        }}
                        community={community}
                      />
                      <button
                        className="rounded-md bg-primary px-2 py-1 text-sm text-white"
                        onClick={() => toggleModal(true)}
                      >
                        Join
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {joinedCommunity && (
            <div
              key={joinedCommunity._id}
              onClick={() => {
                navigate(`/community/${joinedCommunity.name}`);
                clearValues();
              }}
              className="block cursor-pointer border-b px-4 py-2 text-sm text-gray-700 hover:text-indigo-500"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    src={joinedCommunity.banner}
                    alt={joinedCommunity.name}
                    className="h-8 w-8 rounded-full"
                  />
                </div>
                <div className="ml-3">
                  <p className="text-md font-semibold text-primary">
                    {joinedCommunity.name}
                  </p>
                  <p className="line-clamp-2 text-sm text-gray-600">
                    {joinedCommunity.description}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
