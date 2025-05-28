import React from 'react';
import blogBanner from '../../imgs/blog banner.png';
import BlogEditor from '../../components/BlogEditor';
import api from '../../common/api/connect';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../auth/userAuth';

const CreateBlog = () => {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const { isAtuthenticated } = useAuth();
  const handleSubmit = async (blog, imageFile) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('title', blog.title);
      formData.append('description', blog.description);
      formData.append('content', JSON.stringify(blog.content));
      formData.append('tags', JSON.stringify(blog.tags));
      formData.append('category', 1);
      formData.append('image', imageFile);
      await api.post('/blogs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      });
      toast.success('Blog created successfully!');
      setTimeout(() => {
        navigate('/');
      }, 500);
    } catch (err) {
      // console.error(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
    console.log(blog, imageFile);
  };
  return (
    <div className="flex flex-col justify-center w-full">
      <h1>{isAtuthenticated ? 'true' : 'false'}</h1>
      <Toaster />
      <BlogEditor
        onSubmit={handleSubmit}
        onCancel={() => {
          console.log('cancled!');
        }}
        loading={loading}
        defaultData={{
          title: '',
          image: blogBanner,
          content: '',
          tags: [],
          category: '',
          loading: false,
          description: '',
        }}
      />
    </div>
  );
};

export default CreateBlog;
