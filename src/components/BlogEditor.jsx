import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import logo from "../imgs/logo.png";
const categories = [
  {
    id: 1,
    name: "Technology",
  },
  {
    id: 2,
    name: "Health",
  },
  {
    id: 3,
    name: "Lifestyle",
  },
  {
    id: 4,
    name: "Education",
  },
  {
    id: 5,
    name: "Business",
  },
  {
    id: 6,
    name: "Travel",
  },
];
const BlogEditor = ({
  onSubmit,
  onCancle,
  defaultData,
  loading,
  variant = "create",
}) => {
  const [blog, setBlog] = useState({
    title: defaultData.title || "",
    image: defaultData.image || "",
    content: defaultData.content || "",
    tags: defaultData.tags || [],
    category: defaultData.category || "",
    description: defaultData.description || "",
  });
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (e) => {
    console.log("changed", e);
    const file = e.target.files[0];
    setImageFile(file);
    if (!file) {
      toast.error("please select an image");
      return;
    }
    const imageUrl = URL.createObjectURL(file);
    setBlog((rest) => ({ ...rest, image: imageUrl }));
  };
  const handleSubmit = () => {
    if (!blog.title.trim()) {
      toast.error("Blog title is required");
      return;
    }
    if (!blog.description.trim()) {
      toast.error("Blog description is required");
      return;
    }
    if (!blog.content.trim()) {
      toast.error("Blog content is required");
      return;
    }
    if (!blog.category) {
      toast.error("Please select a category");
      return;
    }
    onSubmit(blog, imageFile);
  };

  return (
    <>
      <div className="navbar">
        <Link to="/" className="flex-none w-14">
          <img src={logo} />
        </Link>
        <div className="flex gap-4 ml-auto">
          <button
            className="btn-dark py-2"
            onClick={handleSubmit}
            disabled={loading}
          >
            {variant === "create" ? "Publish" : "Update"}
          </button>
          <button className="btn-light py-2" onClick={onCancle}>
            cancle
          </button>
        </div>
      </div>
      <div className="w-full max-w-[800px] m-auto p-3">
        <textarea
          value={blog.title}
          placeholder="Blog Title"
          className="text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40"
          onChange={(e) =>
            setBlog((rest) => ({ ...rest, title: e.target.value }))
          }
        ></textarea>
        <div
          className="relative aspect-video  hover:opacity-80 bg-white 
                        border-4 border-grey w-[90%] mx-auto"
        >
          <label htmlFor="uploadBanner" className="cursor-pointer">
            <img src={blog.image} className="z-20" />
            <input
              className="w-full object-cover"
              id="uploadBanner"
              type="file"
              accept=".png, jpg, jpeg"
              hidden
              onChange={handleImageChange}
            />
          </label>
        </div>
        <div className="mt-5 flex gap-4">
          <textarea
            value={blog.description}
            placeholder="Blog Description"
            className="block text-lg w-full h-20 outline-none mt-5 leading-5 bg-grey p-3 rounded-md placeholder:opacity-40"
            onChange={(e) =>
              setBlog((rest) => ({ ...rest, description: e.target.value }))
            }
          ></textarea>
          <select
            value={blog.category}
            className="text-lg w-full h-12 outline-none mt-5 bg-gray-200 p-3 border border-[#333]/60 rounded-md placeholder:opacity-40"
            onChange={(e) =>
              setBlog((rest) => ({ ...rest, category: e.target.value }))
            }
          >
            <option disabled value={""}>
              Select Category
            </option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <textarea
          value={blog.content}
          placeholder="write something..."
          className="text-xl w-full h-[300px] outline-none mt-10 leading-6 bg-grey p-5 rounded-md placeholder:opacity-40"
          onChange={(e) =>
            setBlog((rest) => ({ ...rest, content: e.target.value }))
          }
        ></textarea>
      </div>
    </>
  );
};

export default BlogEditor;
