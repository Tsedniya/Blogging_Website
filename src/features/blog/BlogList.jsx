import api from "../../common/api/connect";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../auth/userAuth";

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get("/index");
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("Failed to fetch blogs.");
      }
    };

    fetchBlogs();
  }, []);
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Helper function to truncate the description
  const truncateDescription = (description, wordLimit) => {
    const words = description.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return description;
  };

  return (
    <>
      {error && <p className="text</div>-red-500">{error}</p>}
      {blogs.map((blog) => (
        <div key={blog.id} className="flex flex-col items-center p-4 gap-1">
          <div className="max-w-[900px] w-full mx-auto">
            <div className="relative flex flex-col md:flex-row bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-full hover:shadow-lg transition-shadow duration-300">
              <div className="relative w-full md:w-2/5 m-0 overflow-hidden text-gray-700 bg-white rounded-t-xl md:rounded-r-none md:rounded-l-xl shrink-0">
                <img
                  src={
                    blog.image ||
                    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1471&amp;q=80"
                  }
                  alt="Blog Image"
                  className="object-cover w-full h-48 md:h-full transition-transform duration-500 hover:scale-105"
                />
              </div>

              <div className="p-6 flex flex-col justify-between">
                <div className="flex items-center justify-start gap-2 mb-4">
                  <h4 className="block mb-2 text-2xl font-bold leading-snug text-gray-900 hover:text-indigo-600 transition-colors">
                    {blog.title}
                  </h4>
                  {currentUser?.id === blog.user.id && (
                    <button
                      onClick={() => navigate(`blogs/edit/${blog.id}`)} // Redirect to EditBlog with blog ID
                      className="text-gray-500 hover:text-indigo-600 transition-colors"
                      type="button"
                    >
                      <i className="fi fi-rr-edit text-sm"></i>
                    </button>
                  )}
                </div>

                <p className="text-sm text-gray-500 mb-4">
                  By{" "}
                  <span className="font-medium text-gray-700 hover:text-indigo-600 transition-colors cursor-pointer">
                    {blog.user?.profile?.name} in {blog.category?.name}
                  </span>{" "}
                  | <span>{formatDate(blog.created_at)}</span>
                </p>

                <p className="block mb-6 text-base leading-relaxed text-gray-700">
                  {truncateDescription(blog.description?.description || "", 20)}
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 hover:text-indigo-700 transition-all duration-300 group"
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 group-hover:scale-110 transition-transform"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-2.429 0-4.817.178-7.152.521C2.87 3.061 1.5 4.795 1.5 6.741v6.018c0 1.946 1.37 3.68 3.348 3.97.877.129 1.761.234 2.652.316V21a.75.75 0 001.28.53l4.184-4.183a.39.39 0 01.266-.112c2.16-.169 4.26-.58 6.16-1.275 1.978-.29 3.348-2.023 3.348-3.97V6.741c0-1.947-1.37-3.68-3.348-3.97A49.145 49.145 0 0012 2.25zM8.25 8.625a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zm2.625 1.125a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{blog.comments.length} Comments</span>
                  </button>

                  <button
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full bg-pink-50 text-pink-600 hover:bg-pink-100 hover:text-pink-700 transition-all duration-300 group"
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 group-hover:scale-110 transition-transform"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
                    <span>{blog.likes.length} Likes</span>
                  </button>

                  <button
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full bg-teal-50 text-teal-600 hover:bg-teal-100 hover:text-teal-700 transition-all duration-300 group"
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 group-hover:scale-110 transition-transform"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                      <path
                        fillRule="evenodd"
                        d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>1.2K Views</span>
                  </button>
                  <button
                    onClick={() => navigate(`/blogs/${blog.id}`)} // Redirect to ViewBlog with blog ID
                    className="ml-auto flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border border-indigo-600 text-indigo-600 hover:bg-indigo-100 hover:border-indigo-700 hover:text-indigo-700 transition-all duration-300 group"
                    type="button"
                  >
                    <span>Read More</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 group-hover:translate-x-1 transition-transform"
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
            </div>
          </div>
          <div className="max-w-[800px] w-full mx-auto">
            <div className="relative flex flex-col md:flex-row bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-full hover:shadow-lg transition-shadow duration-300"></div>
          </div>
        </div>
      ))}
    </>
  );
}

export default BlogList;
