import React, { useContext, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import AnimationWrapper from "../common/page-animation";
import { EditorContext } from "../context/editor-context"; 
import Tag from './tags.component'; // Ensure this import is correct

const PublishForm = () => {
  const { blog, setEditorState } = useContext(EditorContext);
  const { banner = "", title = "", tags = [], des = "" } = blog || {};
  const [description, setDescription] = useState(des);
  const [newTag, setNewTag] = useState("");

  const handleCloseEvent = () => {
    setEditorState("editor"); // Go back to the editor
  };

  const publishBlog = (e) => {
    if (e.target.className.includes('disable')) return;
    if (!title) return toast.error("Write blog title before publishing.");
    if (!description || description.length > 200) {
      return toast.error("Description must be under 200 characters.");
    }
    if (tags.length === 0) return toast.error("Enter at least 1 tag.");

    let loadingToast = toast.loading("Publishing...");
    e.target.classList.add('disable'); // Add disable class

    const blogObj = { title, banner, des: description, content: blog.content, tags, draft: false };

    // Implement publishing logic here (e.g., API call)
  };

  const handleTagAddition = (e) => {
    if (e.key === 'Enter' && newTag.trim()) {
      const trimmedTag = newTag.trim();
      if (!tags.includes(trimmedTag) && tags.length < 10) {
        setTags([...tags, trimmedTag]);
        setNewTag("");
      } else {
        toast.error("Tag already exists or limit reached.");
      }
    }
  };

  const handleTagRemoval = (tagToRemove) => {
    const updatedTags = tags.filter(tag => tag !== tagToRemove);
    setTags(updatedTags);
  };

  return (
    <AnimationWrapper>
      <section className="grid items-center w-screen min-h-screen py-16 lg:grid-cols-2 lg:gap-4">
        <Toaster />
        <button
          className="w-12 h-12 absolute right-[5vw] z-10 top-[5%] lg:top-[10%]"
          onClick={handleCloseEvent}
        >
          <i className="fi fi-rs-cross-small"></i>
        </button>
        <div className="max-w-[550px] center">
          <p className="mb-1 text-dark-grey">Preview</p>
          <div className="w-full mt-4 overflow-hidden rounded-lg aspect-video bg-grey">
            <img src={banner} alt="Blog Banner" />
          </div>
          <h1 className="text-4xl font-medium mt-2 leading-tight line-clamp-2">
            {title || "Untitled Post"}
          </h1>
          <p className="mt-4 text-xl leading-7 font-inter line-clamp-2">
            {description}
          </p>
        </div>
        <div className="border-grey lg:border-1 lg:pl-8">
          <p className="mb-2 text-dark-grey mt-9">Blog Title</p>
          <input
            type="text"
            placeholder="Blog Title"
            value={title}
            className="pl-4 input-box"
            readOnly
          />
          <p className="text-dark-grey mb-2 mt-9">Short description about your blog</p>
          <textarea
            maxLength={200}
            value={description}
            className="h-40 resize-none leading-7 input-box pl-4"
            onChange={(e) => setDescription(e.target.value)}
          />
          <p className="mt-1 text-dark-grey text-sm text-right">
            {200 - description.length} characters left
          </p>

          <p className="mb-2 text-dark-grey mt-9">
            Topics - (Helps in searching and ranking your blog post)
          </p>
          <div className="relative py-2 pb-4 pl-2 input-box">
            <input
              type="text"
              placeholder="Add Topics"
              className="input-box bg-white"
              value={newTag}
              onKeyDown={handleTagAddition}
              onChange={(e) => setNewTag(e.target.value)}
            />
            <div className="tags-container">
              {tags.map((tag, i) => (
                <span key={i} className="tag">
                  {tag} <span className="remove-tag" onClick={() => handleTagRemoval(tag)}>x</span>
                </span>
              ))}
            </div>
          </div>
          <p className="mt-1 mb-4 text-dark-grey text-right">{10 - tags.length} Tags Left</p>
          <button className="btn-dark px-8" onClick={publishBlog}>Publish</button>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default PublishForm;