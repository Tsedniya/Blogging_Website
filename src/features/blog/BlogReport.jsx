import api from '../../common/api/connect';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function BlogReport() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState('');
  const [commentCounts, setCommentCounts] = useState({});
  const [likesCounts, setLikesCounts] = useState({});
  const [reportCounts, setReportCounts] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReportedBlogs = async () => {
      try {
        const response = await api.get('/reported-blogs'); // Fetch reported blogs

        const reportCounts = {};
        response.data.forEach((report) => {
          const blogId = report.blog.id;
          reportCounts[blogId] = (reportCounts[blogId] || 0) + 1; // Count reports for each blog
        });

        const uniqueBlogs = Array.from(
          new Map(
            response.data.map((report) => [report.blog.id, report.blog])
          ).values()
        ); // Filter unique blogs based on blog.id

        setBlogs(uniqueBlogs); // Set the unique blogs in state
        setReportCounts(reportCounts); // Set the report counts in state
      } catch (error) {
        console.error('Error fetching reported blogs:', error);
        setError('Failed to fetch reported blogs.');
      }
    };

    fetchReportedBlogs();
  }, []);

  useEffect(() => {
    const fetchCommentsCounts = async () => {
      try {
        const counts = {};
        for (const blog of blogs) {
          const res = await api.get(`/blogs/${blog.id}/comments`);
          counts[blog.id] = res.data.length;
        }
        setCommentCounts(counts);
      } catch (err) {
        console.error('Failed to fetch comment counts', err);
      }
    };

    if (blogs.length > 0) fetchCommentsCounts();
  }, [blogs]);

  useEffect(() => {
    const fetchLikesCounts = async () => {
      try {
        const counts = {};
        for (const blog of blogs) {
          const res = await api.get(`/blogs/${blog.id}/likes`);
          counts[blog.id] = res.data.length;
        }
        setLikesCounts(counts);
      } catch (err) {
        console.error('Failed to fetch likes counts', err);
      }
    };
    if (blogs.length > 0) fetchLikesCounts();
  }, [blogs]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const truncateDescription = (description, wordLimit) => {
    const words = description.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return description;
  };

  return (
    <>
      {error && <p className="text-red-500">{error}</p>}
      {blogs.map((blog) => (
        <div key={blog.id} className="flex flex-col items-center gap-1 p-4">
          <div className="max-w-[900px] w-full mx-auto">
            <div className="relative flex flex-col w-full text-gray-700 transition-shadow duration-300 bg-white shadow-md md:flex-row bg-clip-border rounded-xl hover:shadow-lg">
              <div className="relative w-full m-0 overflow-hidden text-gray-700 bg-white md:w-2/5 rounded-t-xl md:rounded-r-none md:rounded-l-xl shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1471&amp;q=80"
                  alt="Blog Image"
                  className="object-cover w-full h-48 transition-transform duration-500 md:h-full hover:scale-105"
                />
              </div>

              <div className="flex flex-col justify-between p-6">
                <h4 className="block mb-2 text-2xl font-bold leading-snug text-gray-900 transition-colors hover:text-indigo-600">
                  {blog.title || ' '}
                </h4>

                <p className="mb-4 text-sm text-gray-500">
                  By{' '}
                  <span className="font-medium text-gray-700 transition-colors cursor-pointer hover:text-indigo-600">
                    {blog.user?.profile?.name} in {blog.category?.name}
                  </span>{' '}
                  | <span>{formatDate(blog.created_at)}</span>
                </p>

                <p className="block mb-6 text-base leading-relaxed text-gray-700">
                  {truncateDescription(
                    blog.description?.description || ' ',
                    {}
                  )}{' '}
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 transition-all duration-300 rounded-full bg-indigo-50 hover:bg-indigo-100 hover:text-indigo-700 group"
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 transition-transform group-hover:scale-110"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-2.429 0-4.817.178-7.152.521C2.87 3.061 1.5 4.795 1.5 6.741v6.018c0 1.946 1.37 3.68 3.348 3.97.877.129 1.761.234 2.652.316V21a.75.75 0 001.28.53l4.184-4.183a.39.39 0 01.266-.112c2.16-.169 4.26-.58 6.16-1.275 1.978-.29 3.348-2.023 3.348-3.97V6.741c0-1.947-1.37-3.68-3.348-3.97A49.145 49.145 0 0012 2.25zM8.25 8.625a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zm2.625 1.125a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{commentCounts[blog.id] || 0} Comments</span>
                  </button>

                  <button
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-pink-600 transition-all duration-300 rounded-full bg-pink-50 hover:bg-pink-100 hover:text-pink-700 group"
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 transition-transform group-hover:scale-110"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
                    <span>{likesCounts[blog.id] || 0} Likes</span>
                  </button>

                  <button className="flex items-center gap-2 px-4 py-2 text-teal-600 bg-teal-100 rounded-full hover:bg-teal-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z" />
                    </svg>
                    <span>{reportCounts[blog.id] || 0} Reports</span>
                  </button>

                  <button
                    onClick={() => navigate(`/blogs/report/${blog.id}`)} // Redirect to ViewReport with blog ID
                    className="flex items-center gap-2 px-4 py-2 ml-auto text-sm font-medium text-indigo-600 transition-all duration-300 border border-indigo-600 rounded-full hover:bg-indigo-100 hover:border-indigo-700 hover:text-indigo-700 group"
                    type="button"
                  >
                    <span>Read More</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 transition-transform group-hover:translate-x-1"
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
            <div className="relative flex flex-col w-full text-gray-700 transition-shadow duration-300 bg-white shadow-md md:flex-row bg-clip-border rounded-xl hover:shadow-lg"></div>
          </div>
        </div>
      ))}
    </>
  );
}

export default BlogReport;
