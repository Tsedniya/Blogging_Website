import React, { useEffect } from "react";
import blogBanner from "../../imgs/blog banner.png";
import BlogEditor from "../../components/BlogEditor";
import api from "../../common/api/connect";
import { toast, Toaster } from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditBlog = () => {
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();
  const [blog, setBlog] = React.useState({
    title: "",
    image: blogBanner,
    content: "",
    tags: [],
    category: "",
    description: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [fetching, setFetching] = React.useState(false);
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setFetching(true);
        const response = await api.get(`/blogs/${id}`);
        const blogData = response.data;
        setBlog({
          title: blogData.title,
          image: blogData.image,
          content: blogData.content,
          tags: blogData.tags,
          category: blogData.category_id,
          description: blogData.description.description,
        });
      } catch (error) {
        console.error("Error fetching blog data:", error.message);
        toast.error("Failed to fetch blog data");
      } finally {
        setFetching(false);
      }
    };
    fetchBlog();
  }, [id]);
  const handleSubmit = async (blog, imageFile) => {
    try {
      const formData = new FormData();
      formData.append("title", blog.title);
      formData.append("description", blog.description);
      formData.append("content", JSON.stringify(blog.content));
      formData.append("tags", JSON.stringify(blog.tags));
      formData.append("category", 1);
      formData.append("image", imageFile);
      setLoading(true);
      console.log(blog);

      await api.post(`/blogs/${id}?_method=PUT`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      });
      toast.success("Blog updated successfully!");
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (err) {
      // console.error(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
    console.log(blog, imageFile);
  };
  if (fetching) {
    return (
      <div className="w-full flex flex-col h-screen justify-center items-center">
        <Toaster />
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col justify-center">
      <Toaster />
      <BlogEditor
        variant={"edit"}
        onSubmit={handleSubmit}
        onCancel={() => {
          console.log("cancled!");
        }}
        loading={loading}
        defaultData={blog}
      />
    </div>
  );
};

export default EditBlog;
