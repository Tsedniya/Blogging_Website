import React from "react";
import blogBanner from "../../imgs/blog banner.png";
import BlogEditor from "../../components/BlogEditor";

const CreateBlog = () => {
  const handleSubmit = (blog, imageFile) => {
    console.log(blog, imageFile);
  };
  return (
    <div className="w-full flex flex-col justify-center">
      <BlogEditor
        onSubmit={handleSubmit}
        onCancle={() => {
          console.log("cancled!");
        }}
        defaultData={{
          title: "Title",
          banner: blogBanner,
          content: [],
          tags: [],
          category: "",
          loding: false,
          description: "",
        }}
      />
    </div>
  );
};

export default CreateBlog;
