import { useState } from "react";
import ReportedPosts from "../moderator/ReportedPosts";
import MembersList from "../moderator/MembersList";
import BannerMembersList from "../moderator/BannerMembersList";

const MainSection = () => {
  const [activeTab, setActiveTab] = useState("Reported Posts");

  return (
    <div className="flex flex-col p-3">
      <ul className="flex flex-col border-b md:flex-row">
        <li
          className={`${
            activeTab === "Reported Posts"
              ? "rounded border-blue-500 bg-primary text-white"
              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
          } flex-1 cursor-pointer border-b-2 p-1 text-center font-medium`}
          onClick={() => setActiveTab("Reported Posts")}
        >
          Reported Posts
        </li>
        <li
          className={`${
            activeTab === "Members"
              ? "rounded border-blue-500 bg-primary text-white"
              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
          } flex-1 cursor-pointer border-b-2 p-1 text-center font-medium`}
          onClick={() => setActiveTab("Members")}
        >
          Members
        </li>

        <li
          className={`${
            activeTab === "Banned Users"
              ? "rounded border-blue-500 bg-primary text-white"
              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
          } flex-1 cursor-pointer border-b-2 p-1 text-center font-medium`}
          onClick={() => setActiveTab("Banned Users")}
        >
          Banned Users
        </li>
      </ul>
      <div className="mt-4 flex flex-col gap-4">
        {activeTab === "Reported Posts" && <ReportedPosts />}
        {activeTab === "Members" && <MembersList />}
        {activeTab === "Banned Users" && <BannerMembersList />}
      </div>
    </div>
  );
};

export default MainSection;
