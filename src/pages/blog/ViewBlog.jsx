import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../common/api/connect";

const ViewBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const authResponse = await api.get("/auth/check");
        if (!authResponse.data.authenticated) {
          setError("Please sign in to view this blog.");
          return;
        }

        const blogResponse = await api.get(`/blogs/${id}`);
        setBlog(blogResponse.data);

        const commentsResponse = await api.get(`/blogs/${id}/comments`);
        setComments(commentsResponse.data);
      } catch (err) {
        if (err.response) {
          if (err.response.status === 401) {
            setError("Please sign in to view this blog.");
          } else if (err.response.status === 404) {
            setError("Blog not found.");
          } else if (err.response.status === 500) {
            setError(
              "An error occurred on the server. Please try again later."
            );
          } else {
            setError("An unexpected error occurred. Please try again later.");
          }
        } else {
          console.error("Error fetching blog data:", err.message);
          setError(
            "Failed to connect to the server. Please check your network."
          );
        }
      }
    };

    fetchBlogData();
  }, [id]);
  if (error) {
    return (
      <div className="text-center mt-10">
        {error && (
          <div className="flex items-center justify-center gap-2 mb-4 p-3 bg-red-50 border border-red-200 rounded-lg animate-fade-in">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-red-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        )}

        <button
          onClick={() => navigate("/signin")}
          style={{
            backgroundColor: "#0ea5e9",
            color: "white",
          }}
          className="px-7 py-4 rounded-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
        >
          <span className="relative z-10 transition-all duration-300 group-hover:translate-x-1">
            Sign In
          </span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2 transition-all duration-300 transform group-hover:translate-x-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    );
  }

  if (!blog) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <>
      <div className="max-w-4xl mx-auto p-6">
        <div className="relative mb-6">
          <div className="absolute top-0 left-0">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1471&amp;q=80"
              alt="Profile"
              className="w-20 h-20 rounded-full border-4 border-indigo-500 shadow-lg"
            />
          </div>
          <div className="ml-24">
            <h2 className="text-sm font-semibold">John Doe</h2>
            <p className="text-sm text-gray-500">October 29, 2023</p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h1 className="text-3xl font-bold mb-4">
            The Beauty of Modern Web Design
          </h1>
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1471&amp;q=80"
            alt="Blog"
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <p className="text-gray-700 leading-relaxed text-base mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-600 rounded-full hover:bg-indigo-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 16.343l-6.828-6.829a4 4 0 010-5.656z" />
            </svg>
            <span>Like</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-pink-100 text-pink-600 rounded-full hover:bg-pink-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M18 10c0 3.866-3.582 7-8 7s-8-3.134-8-7 3.582-7 8-7 8 3.134 8 7zM8 9a1 1 0 112 0v2a1 1 0 11-2 0V9z" />
            </svg>
            <span>Comment</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-teal-100 text-teal-600 rounded-full hover:bg-teal-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z" />
            </svg>
            <span>Report</span>
          </button>
        </div>
      </div>
      <section class="flex flex-col justify-center max-w-6xl min-h-screen px-4 py-10 mx-auto sm:px-6">
        <div class="flex flex-wrap items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Related Posts
          </h2>
        </div>

        <div class="flex flex-wrap -mx-4">
          <div class="w-full max-w-full mb-8 sm:w-1/2 px-4 lg:w-1/3 flex flex-col">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1471&amp;q=80"
              alt="Blog Image"
              className="object-cover w-full h-48 md:h-full transition-transform duration-500 hover:scale-105"
            />
            <div class="flex flex-grow">
              <div class="triangle"></div>
              <div class="flex flex-col justify-between px-4 py-6 bg-white border border-gray-400 text">
                <div>
                  <a
                    href="#"
                    class="inline-block mb-4 text-xs font-bold capitalize border-b-2 border-blue-600 hover:text-blue-600"
                  >
                    Reliable Schemas
                  </a>
                  <a
                    href="#"
                    class="block mb-4 text-2xl font-black leading-tight hover:underline hover:text-blue-600"
                  >
                    What Zombies Can Teach You About Food
                  </a>
                  <p class="mb-4">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Nulla delectus corporis commodi aperiam, amet cupiditate?
                  </p>
                </div>
                <div>
                  <a
                    href="#"
                    class="inline-block pb-1 mt-2 text-base font-black text-blue-600 uppercase border-b border-transparent hover:border-blue-600"
                  >
                    Read More -
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="w-full max-w-full mb-8 sm:w-1/2 px-4 lg:w-1/3 flex flex-col">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1471&amp;q=80"
              alt="Blog Image"
              className="object-cover w-full h-48 md:h-full transition-transform duration-500 hover:scale-105"
            />
            <div class="flex flex-grow">
              <div class="triangle"></div>
              <div class="flex flex-col justify-between px-4 py-6 bg-white border border-gray-400">
                <div>
                  <a
                    href="#"
                    class="inline-block mb-4 text-xs font-bold capitalize border-b-2 border-blue-600 hover:text-blue-600"
                  >
                    Client-based Adoption
                  </a>
                  <a
                    href="#"
                    class="block mb-4 text-2xl font-black leading-tight hover:underline hover:text-blue-600"
                  >
                    Old School Art
                  </a>
                  <p class="mb-4">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Nulla delectus.
                  </p>
                </div>
                <div>
                  <a
                    href="#"
                    class="inline-block pb-1 mt-2 text-base font-black text-blue-600 uppercase border-b border-transparent hover:border-blue-600"
                  >
                    Read More -
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="w-full max-w-full mb-8 sm:w-1/2 px-4 lg:w-1/3 flex flex-col">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1471&amp;q=80"
              alt="Blog Image"
              className="object-cover w-full h-48 md:h-full transition-transform duration-500 hover:scale-105"
            />
            <div class="flex flex-grow">
              <div class="triangle"></div>
              <div class="flex flex-col justify-between px-4 py-6 bg-white border border-gray-400">
                <div>
                  <a
                    href="#"
                    class="inline-block mb-4 text-xs font-bold capitalize border-b-2 border-blue-600 hover:text-blue-600"
                  >
                    Intellectual Capital
                  </a>
                  <a
                    href="#"
                    class="block mb-4 text-2xl font-black leading-tight hover:underline hover:text-blue-600"
                  >
                    5 Things To Do About Rain
                  </a>
                  <p class="mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Ratione, neque. Eius, ea possimus.
                  </p>
                </div>
                <div>
                  <a
                    href="#"
                    class="inline-block pb-1 mt-2 text-base font-black text-blue-600 uppercase border-b border-transparent hover:border-blue-600"
                  >
                    Read More -
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="bg-gray-100 py-8">
        <div class="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            comments
          </h2>
          <div class="space-y-4">
            <div class="bg-white p-4 rounded-lg shadow">
              <div class="flex items-center mb-2">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1471&amp;q=80"
                  alt="User Avatar"
                  class="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h3 class="text-sm font-semibold">John Doe</h3>
                  <p class="text-sm text-gray-500">Posted on March 15, 2024</p>
                </div>
              </div>
              <p class="text-gray-700">
                Great product! I've been using it for a week now and I'm very
                satisfied with its performance.
              </p>
              <div class="flex items-center mt-2">
                <button class="text-blue-500 hover:text-blue-600 mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 inline"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </svg>
                  Like
                </button>
                <button class="text-gray-500 hover:text-gray-600">Reply</button>
              </div>
            </div>

            <div class="bg-white p-4 rounded-lg shadow">
              <div class="flex items-center mb-2">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1471&amp;q=80"
                  alt="User Avatar"
                  class="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h3 class="font-semibold">Jane Smith</h3>
                  <p class="text-sm text-gray-500">Posted on March 10, 2024</p>
                </div>
              </div>
              <p class="text-gray-700">
                The shipping was fast and the product arrived in perfect
                condition. Highly recommended!
              </p>
              <div class="flex items-center mt-2">
                <button class="text-blue-500 hover:text-blue-600 mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 inline"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </svg>
                  Like
                </button>
                <button class="text-gray-500 hover:text-gray-600">Reply</button>
              </div>
            </div>
          </div>

          <form class="mt-8 bg-white p-4 rounded-lg shadow">
            <h3 class="text-lg font-semibold mb-2">Add a Comment</h3>
            <div class="mb-4">
              <label for="name" class="block text-gray-700 font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div class="mb-4">
              <label for="comment" class="block text-gray-700 font-medium mb-2">
                Comment
              </label>
              <textarea
                id="comment"
                name="comment"
                rows="4"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: "#0ea5e9",
                color: "white",
              }}
              className="px-4 py-2 rounded-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
            >
              Post Comment
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default ViewBlog;
