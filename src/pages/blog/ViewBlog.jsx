import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../common/api/connect';
import StatusModal from '../../features/modals/status';
import ReportModal from '../../features/modals/report';

const ViewBlog = () => {
  const { id } = useParams();
  //const authUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState('');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('');
  const [isFollowing, setIsFollowing] = useState(false);
  const [newComment, setNewComment] = useState({ name: '', content: '' });
  const openReportModal = () => {
    setIsReportModalOpen(true);
  };
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

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      const comresponse = await api.post(`/blogs/${id}/comments`, {
        name: newComment.name,
        content: newComment.content,
      });
      setComments((prevComments) => [...prevComments, comresponse.data]); // Add new comment to the list
      setNewComment({ name: '', content: '' }); // Reset form

      // Show success modal
      setModalMessage('Your comment has been successfully added!');
      setModalType('success');
    } catch (err) {
      console.error('Error adding comment:', err.response?.data || err.message);

      // Show error modal
      setModalMessage('Failed to add your comment. Please try again.');
      setModalType('error');
    }
  };
  const handleFollow = async () => {
    try {
      await api.post(`/follow`, {
        follower_id: authUser.id, // Replace with the authenticated user's ID
        following_id: blog.user.id, // The profile being followed
      });
      setIsFollowing(true);
    } catch (err) {
      console.error('Error following user:', err.response?.data || err.message);
    }
  };

  const handleUnfollow = async () => {
    try {
      await api.delete(`/unfollow`, {
        data: {
          follower_id: authUser.id, // Replace with the authenticated user's ID
          following_id: blog.user.id, // The profile being unfollowed
        },
      });
      setIsFollowing(false);
    } catch (err) {
      console.error(
        'Error unfollowing user:',
        err.response?.data || err.message
      );
    }
  };
  // useEffect(() => {
  //   const checkFollowStatus = async () => {
  //     try {
  //       const response = await api.get(`/follow/status`, {
  //         params: {
  //           follower_id: authUser.id, // Replace with the authenticated user's ID
  //           following_id: blog.user.id, // The profile being checked
  //         },
  //       });
  //       setIsFollowing(response.data.isFollowing);
  //     } catch (err) {
  //       console.error(
  //         "Error checking follow status:",
  //         err.response?.data || err.message
  //       );
  //     }
  //   };

  //   if (blog?.user?.id) {
  //     checkFollowStatus();
  //   }
  // }, [blog?.user?.id]);
  return (
    <>
      <StatusModal
        message={modalMessage}
        type={modalType}
        onClose={() => setModalMessage('')}
      />
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        blogId={id}
        userId={blog.user.id}
      />
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
            {isFollowing ? (
              <button
                onClick={handleUnfollow}
                className="px-4 py-2 mt-2 text-white bg-red-500 rounded-full hover:bg-red-600"
              >
                Unfollow
              </button>
            ) : (
              <button
                onClick={handleFollow}
                className="px-4 py-2 mt-2 text-white bg-blue-500 rounded-full hover:bg-blue-600"
              >
                + Follow
              </button>
            )}
          </div>
        </div>

        <div className="p-6 mb-6 bg-white rounded-lg shadow-md">
          <h1 className="mb-4 text-xl font">{blog.content}</h1>
          <img
            src={
              blog.image ||
              'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1471&amp;q=80'
            }
            alt="Blog"
            className="object-cover w-full h-64 mb-4 rounded-lg"
          />
          <p className="mb-4 text-base leading-relaxed text-gray-700">
            {blog.description.description}
          </p>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <button className="flex items-center gap-2 px-4 py-2 text-indigo-600 bg-indigo-100 rounded-full hover:bg-indigo-200">
            <i className="text-lg fi fi-rr-heart"></i>
            <span>Like</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-pink-600 bg-pink-100 rounded-full hover:bg-pink-200">
            <i className="text-lg fi fi-rr-comment"></i>
            <span>Comment</span>
          </button>
          <button
            onClick={openReportModal}
            className="flex items-center gap-2 px-4 py-2 text-teal-600 bg-teal-100 rounded-full hover:bg-teal-200"
          >
            <i className="text-lg fi fi-rr-exclamation"></i>
            <span>Report</span>
          </button>
        </div>
      </div>
      <section class="flex flex-col justify-center max-w-6xl min-h-screen px-4 py-10 mx-auto sm:px-6">
        <div class="flex flex-wrap items-center justify-between mb-8">
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">
            Related Posts
          </h2>
        </div>

        <div class="flex flex-wrap -mx-4">
          <div class="w-full max-w-full mb-8 sm:w-1/2 px-4 lg:w-1/3 flex flex-col">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1471&amp;q=80"
              alt="Blog Image"
              className="object-cover w-full h-48 transition-transform duration-500 md:h-full hover:scale-105"
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
              className="object-cover w-full h-48 transition-transform duration-500 md:h-full hover:scale-105"
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
              className="object-cover w-full h-48 transition-transform duration-500 md:h-full hover:scale-105"
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
      <section className="py-8 bg-gray-100">
        <div className="container px-4 mx-auto">
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">
            Comments
          </h2>
          <div className="space-y-4">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div
                  key={comment.id}
                  className="p-4 bg-white rounded-lg shadow"
                >
                  <div className="flex items-center mb-2">
                    <img
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1471&amp;q=80"
                      alt="User Avatar"
                      className="w-10 h-10 mr-3 rounded-full"
                    />
                    <div>
                      <h3 className="text-sm font-semibold">
                        {comment.user?.profile?.name || 'Anonymous'}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Posted on{' '}
                        {new Date(comment.created_at).toLocaleDateString() ||
                          'N/A'}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                  <div className="flex items-center mt-2">
                    <button className="mr-2 text-blue-500 hover:text-blue-600">
                      Like
                    </button>
                    <button className="text-gray-500 hover:text-gray-600">
                      Reply
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No comments yet.</p>
            )}
          </div>

          {/* Add Comment Form */}
          <form
            className="p-4 mt-8 bg-white rounded-lg shadow"
            onSubmit={handleAddComment}
          >
            <h3 className="mb-2 text-lg font-semibold">Add a Comment</h3>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block mb-2 font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newComment.name}
                onChange={(e) =>
                  setNewComment({ ...newComment, name: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="comment"
                className="block mb-2 font-medium text-gray-700"
              >
                Comment
              </label>
              <textarea
                id="comment"
                name="comment"
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newComment.content}
                onChange={(e) =>
                  setNewComment({ ...newComment, content: e.target.value })
                }
                required
              ></textarea>
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: '#0ea5e9',
                color: 'white',
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
