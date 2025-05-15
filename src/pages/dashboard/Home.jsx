import api from "../../common/api/connect";
import React, { useState, useEffect } from "react";
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
    <section className="py-4 ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center p-4">
          <div className="relative max-w-[800px] mx-auto">
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-all duration-300 hover:scale-110 z-10 bg-white/80 backdrop-blur-sm p-1 rounded-full"
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
              className="flex overflow-x-auto gap-6 px-10 py-2 scrollbar-hide"
              style={{
                scrollBehavior: "smooth",
                maskImage:
                  "linear-gradient(to right, transparent, black 20px, black calc(100% - 20px), transparent)" /* Gradient mask */,
              }}
            >
              <a
                href="#"
                className="text-gray-700 text-lg cursor-pointer hover:text-blue-500 transition-all duration-300 hover:scale-105 hover:font-medium whitespace-nowrap px-3 py-1 rounded-lg hover:bg-blue-50"
              >
                Following
              </a>
              <a
                href="#"
                className="text-gray-700 text-lg cursor-pointer hover:text-blue-500 transition-all duration-300 hover:scale-105 hover:font-medium whitespace-nowrap px-3 py-1 rounded-lg hover:bg-blue-50"
              >
                For You
              </a>
              <a
                href="#"
                className="text-gray-700 text-lg cursor-pointer hover:text-blue-500 transition-all duration-300 hover:scale-105 hover:font-medium whitespace-nowrap px-3 py-1 rounded-lg hover:bg-blue-50"
              >
                Education
              </a>
              <a
                href="#"
                className="text-gray-700 text-lg cursor-pointer hover:text-blue-500 transition-all duration-300 hover:scale-105 hover:font-medium whitespace-nowrap px-3 py-1 rounded-lg hover:bg-blue-50"
              >
                Software Topics
              </a>
              <a
                href="#"
                className="text-gray-700 text-lg cursor-pointer hover:text-blue-500 transition-all duration-300 hover:scale-105 hover:font-medium whitespace-nowrap px-3 py-1 rounded-lg hover:bg-blue-50"
              >
                Technology
              </a>
              <a
                href="#"
                className="text-gray-700 text-lg cursor-pointer hover:text-blue-500 transition-all duration-300 hover:scale-105 hover:font-medium whitespace-nowrap px-3 py-1 rounded-lg hover:bg-blue-50"
              >
                Programming
              </a>
              <a
                href="#"
                className="text-gray-700 text-lg cursor-pointer hover:text-blue-500 transition-all duration-300 hover:scale-105 hover:font-medium whitespace-nowrap px-3 py-1 rounded-lg hover:bg-blue-50"
              >
                Science
              </a>
              <a
                href="#"
                className="text-gray-700 text-lg cursor-pointer hover:text-blue-500 transition-all duration-300 hover:scale-105 hover:font-medium whitespace-nowrap px-3 py-1 rounded-lg hover:bg-blue-50"
              >
                Health
              </a>
              <a
                href="#"
                className="text-gray-700 text-lg cursor-pointer hover:text-blue-500 transition-all duration-300 hover:scale-105 hover:font-medium whitespace-nowrap px-3 py-1 rounded-lg hover:bg-blue-50"
              >
                Fitness
              </a>
            </div>
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-all duration-300 hover:scale-110 z-10 bg-white/80 backdrop-blur-sm p-1 rounded-full"
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
        <h2 className="font-manrope text-4xl font-bold text-gray-900 text-center mb-16">
          Our latest blog
        </h2>
        <BlogList />
      </div>
    </section>
  );
}

export default Home;
