import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import logo from "../imgs/logo.png";
const BlogEditor = ({ onSubmit, onCancle, defaultData, loding }) => {
  const [blog, setBlog] = useState({
    title: defaultData.title || "",
    banner: defaultData.banner || "",
    content: defaultData.content || "",
    tags: defaultData.tags || [],
    catagory: defaultData.category || "",
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
    setBlog((rest) => ({ ...rest, banner: imageUrl }));
  };
  const handleSubmit = (blog) => {
    onSubmit(blog, imageFile);
  };

  return (
    <>
      <div className="navbar">
        <Link to="/" className="flex-none w-14">
          <img src={logo} />
        </Link>
        <div className="flex gap-4 ml-auto">
          <button className="btn-dark py-2" onClick={handleSubmit}>
            Publish
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
            <img src={blog.banner} className="z-20" />
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
        <textarea
          value={blog.title}
          placeholder="write something..."
          className="text-xl w-full h-[300px] outline-none mt-10 leading-3 bg-grey p-5 rounded-md placeholder:opacity-40"
          onChange={(e) =>
            setBlog((rest) => ({ ...rest, title: e.target.value }))
          }
        ></textarea>
      </div>
    </>
  );
};

export default BlogEditor;
