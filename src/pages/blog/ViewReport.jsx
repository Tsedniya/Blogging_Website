import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../common/api/connect';

const ViewReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [reports, setReports] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const authResponse = await api.get('/auth/check');
        if (!authResponse.data.authenticated) {
          setError('Please sign in to view this blog.');
          return;
        }

        const blogResponse = await api.get(`/blogs/${id}`);
        setBlog(blogResponse.data);

        const commentsResponse = await api.get(`/blogs/${id}/comments`);
        setComments(commentsResponse.data);

        const reportsResponse = await api.get(`/blogs/${id}/reports`);
        setReports(reportsResponse.data);
      } catch (err) {
        if (err.response) {
          if (err.response.status === 401) {
            setError('Please sign in to view this blog.');
          } else if (err.response.status === 404) {
            setError('Blog not found.');
          } else if (err.response.status === 500) {
            setError(
              'An error occurred on the server. Please try again later.'
            );
          } else {
            setError('An unexpected error occurred. Please try again later.');
          }
        } else {
          console.error('Error fetching blog data:', err);
          setError(
            'Failed to connect to the server. Please check your network.'
          );
        }
      }
    };

    fetchBlogData();
  }, [id]);
  if (error) {
    return (
      <div className="mt-10 text-center">
        {error && (
          <div className="flex items-center justify-center gap-2 p-3 mb-4 border border-red-200 rounded-lg bg-red-50 animate-fade-in">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-red-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <p className="font-medium text-red-600">{error}</p>
          </div>
        )}

        <button
          onClick={() => navigate('/signin')}
          style={{
            backgroundColor: '#0ea5e9',
            color: 'white',
          }}
          className="py-4 rounded-md px-7 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
        >
          <span className="relative z-10 transition-all duration-300 group-hover:translate-x-1">
            Sign In
          </span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 ml-2 transition-all duration-300 transform group-hover:translate-x-1"
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
    return <p className="mt-10 text-center">Loading...</p>;
  }

  return (
    <>
      <div className="max-w-4xl p-6 mx-auto">
        <div className="relative mb-6">
          <div className="absolute top-0 left-0">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1471&amp;q=80"
              alt="Profile"
              className="w-20 h-20 border-4 border-indigo-500 rounded-full shadow-lg"
            />
          </div>
          <div className="ml-24">
            <h2 className="text-sm font-semibold">{blog.user.profile.name}</h2>
            <p className="text-sm text-gray-500">October 29, 2023</p>
          </div>
        </div>

        <div className="p-6 mb-6 bg-white rounded-lg shadow-md">
          <h1 className="mb-4 text-3xl font-bold">{blog.content}</h1>
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1471&amp;q=80"
            alt="Blog"
            className="object-cover w-full h-64 mb-4 rounded-lg"
          />
          <p className="mb-4 text-base leading-relaxed text-gray-700">
            {blog.description.description}
          </p>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <button className="flex items-center gap-2 px-4 py-2 text-indigo-600 bg-indigo-100 rounded-full hover:bg-indigo-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 16.343l-6.828-6.829a4 4 0 010-5.656z" />
            </svg>
            <span>Like</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-pink-600 bg-pink-100 rounded-full hover:bg-pink-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M18 10c0 3.866-3.582 7-8 7s-8-3.134-8-7 3.582-7 8-7 8 3.134 8 7zM8 9a1 1 0 112 0v2a1 1 0 11-2 0V9z" />
            </svg>
            <span>Comment</span>
          </button>
        </div>
      </div>

      <section class="bg-gray-100 py-8">
        <div class="container mx-auto px-4">
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">Reports</h2>
          <div class="space-y-4">
            {reports.length > 0 ? (
              reports.map((report) => (
                <div key={report.id} className="p-4 bg-white rounded-lg shadow">
                  <div className="flex items-center mb-2">
                    <img
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1471&amp;q=80"
                      alt="User Avatar"
                      className="w-10 h-10 mr-3 rounded-full"
                    />
                    <div>
                      <h3 className="text-sm font-semibold">
                        {report.user?.profile?.name || 'Anonymous'}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Posted on{' '}
                        {new Date(report.created_at).toLocaleDateString() ||
                          'N/A'}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700">{report.reason}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No reports yet.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ViewReport;
