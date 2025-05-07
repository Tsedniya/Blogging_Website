import { comment } from "postcss";
import React from "react";
import BlogList from "../../features/blog/BlogList";

const blogs = [
  {
    id: 1,
    title: "sdf",
    image: "image url",
    desc: "",
    catagory: "Tech",
    body: "",
    author: {
      id: 1,
      full_name: "Alex /greek",
    },
    likes: 0,

    created_at: "2023-10-01T00:00:00Z",
  },
];
function Home() {
  return (
    <div>
      <div className="flex justify-center items-center p-4">
        <div className="relative max-w-[900px] mx-auto">
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            onClick={() => {
              document
                .getElementById("tags-nav")
                .scrollBy({ left: -100, behavior: "smooth" });
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div
            id="tags-nav"
            className="flex overflow-x-auto no-scrollbar gap-6 px-8 py-2"
            style={{ scrollBehavior: "smooth" }}
          >
            <a
              href="#"
              className="text-gray-700 text-lg cursor-pointer hover:text-blue-500 transition-all"
            >
              Following
            </a>
            <a
              href="#"
              className="text-gray-700 text-lg cursor-pointer hover:text-blue-500 transition-all"
            >
              For You
            </a>
            <a
              href="#"
              className="text-gray-700 text-lg cursor-pointer hover:text-blue-500 transition-all"
            >
              Education
            </a>
            <a
              href="#"
              className="text-gray-700 text-lg cursor-pointer hover:text-blue-500 transition-all"
            >
              Software Topics
            </a>
            <a
              href="#"
              className="text-gray-700 text-lg cursor-pointer hover:text-blue-500 transition-all"
            >
              Technology
            </a>
            <a
              href="#"
              className="text-gray-700 text-lg cursor-pointer hover:text-blue-500 transition-all"
            >
              Programming
            </a>
            <a
              href="#"
              className="text-gray-700 text-lg cursor-pointer hover:text-blue-500 transition-all"
            >
              Science
            </a>
            <a
              href="#"
              className="text-gray-700 text-lg cursor-pointer hover:text-blue-500 transition-all"
            >
              Health
            </a>
            <a
              href="#"
              className="text-gray-700 text-lg cursor-pointer hover:text-blue-500 transition-all"
            >
              Fitness
            </a>
          </div>

          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            onClick={() => {
              document
                .getElementById("tags-nav")
                .scrollBy({ left: 100, behavior: "smooth" });
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
      <BlogList />
    </div>
  );
}

export default Home;
