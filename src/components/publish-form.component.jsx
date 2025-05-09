import Tag from './tags.component';
import { useContext } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import AnimationWrapper from '../common/page-animation';
import { useNavigate } from 'react-router-dom'; // Ensure this import is correct
import { EditorContext } from '../context/editor-context'; // Ensure this import is correct

const PublishForm = () => {
  const characterLimit = 200;
  const tagLimit = 10;
  const { blog, setEditorState, setBlog } = useContext(EditorContext);
  const { banner, title, tags, des, content } = blog;
  const navigate = useNavigate();

  const handleTitleKeyDown = (e) => {
    if (e.keyCode === 13) {
      // Prevent default action on Enter key
      e.preventDefault();
    }
  };

  const handleCloseEvent = () => {
    setEditorState('editor');
  };

  const handleBlogTitleChange = (e) => {
    let input = e.target;
    setBlog({ ...blog, title: input.value });
  };

  const handleBlogDesChange = (e) => {
    let input = e.target;
    setBlog({ ...blog, des: input.value });
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 || e.keyCode === 188) {
      e.preventDefault();
      let tag = e.target.value();

      if (tags.length < tagLimit) {
        if (!tags.includes(tag) && tag.length) {
          setBlog({ ...blog, tags: [...tags, tag] });
        } else {
          toast.error(`You can add a maximum of ${tagLimit} tags.`);
        }
        e.target.value = ''; // Clear input after adding tag
      }
    }
  };

  const publishBlog = (e) => {
    if (e.target.className.includes('disable')) {
      return;
    }
    if (!title.length) {
      return toast.error('Write blog title before publishing.');
    }
    if (!des.length || des.length > characterLimit) {
      return toast.error(
        `Write a description about the blog (max ${characterLimit} characters) to publish.`
      );
    }
    if (!tags.length) {
      return toast.error('Enter at least 1 tag to help us rank your blog.');
    }

    let loadingToast = toast.loading('Publishing...');
    e.target.classList.add('disable'); // Add disable class

    let blogObj = {
      title,
      banner,
      des,
      content,
      tags,
      draft: false,
    };

    /*
        axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}/create-blog`, blogObj, {
            headers: {
                'Authorization': `Bearer ${access_token}`, // Ensure access_token is defined
            },
        })
        .then(() => {
            e.target.classList.remove("disable");
            toast.dismiss(loadingToast);
            toast.success("Published successfully!");

            setTimeout(() => {
                navigate("/");
            }, 500);
        })
        .catch(({ response }) => {
            e.target.classList.remove("disable");
            toast.dismiss(loadingToast);
            return toast.error(response.data.error);
        });
        */
  };

  return (
    <AnimationWrapper>
      <section className="w-screen min-h-screen grid items-center lg:grid-cols-2 py-16 lg:gap-4">
        <Toaster />
        <button
          className="w-12 h-12 absolute right-[5vw] z-10 top-[5%] lg:top-[10%]"
          onClick={handleCloseEvent}
        >
          <i className="fi fi-rs-cross-small"></i>
        </button>
        <div className="max-w-[550px] center">
          <p className="text-dark-grey mb-1">Preview</p>
          <div className="w-full aspect-video rounded-lg overflow-hidden bg-grey mt-4">
            <img src={banner} alt="Blog Banner" />
          </div>

          <h1 className="text-4xl font-medium mt-2 leading-tight line-clamp-2">
            {title}
          </h1>
          <p className="font-inter line-clamp-2 text-xl leading-7 mt-4">
            {des}
          </p>
        </div>
        <div className="border-grey lg:border-1 lg:pl-8">
          <p className="text-dark-grey mb-2 mt-9">Blog Title</p>
          <input
            type="text"
            placeholder="Blog Title"
            value={title}
            className="input-box pl-4"
            onChange={handleBlogTitleChange}
          />

          <p className="text-dark-grey mb-2 mt-9">
            Short description about your blog
          </p>
          <input
            type="text"
            placeholder="Short Description"
            value={des}
            className="input-box pl-4"
            onChange={handleBlogDesChange}
          />
        </div>
        <textarea
          maxLength={characterLimit}
          value={des}
          className="h-40 resize-none leading-7 input-box pl-4"
          onChange={handleBlogDesChange}
          onKeyDown={handleTitleKeyDown}
        />
        <p className="mt-1 text-dark-grey text-sm text-right">
          {characterLimit - des.length} characters left
        </p>

        <p className="text-dark-grey mb-2 mt-9">
          Topics - (Helps in searching and ranking your blog post)
        </p>
        <div className="relative input-box pl-2 py-2 pb-4">
          <input
            type="text"
            placeholder="Topics"
            className="sticky input-box bg-white top-0 left-0 pl-4 mb-3 focus:bg-white"
            onKeyDown={handleKeyDown}
          />
          {tags.map((tag, i) => {
            return <Tag tag={tag} tagIndex={i} key={i} />;
          })}
        </div>
        <p className="mt-1 mb-4 text-dark-grey text-right">
          {tagLimit - tags.length} Tags Left
        </p>
        <button className="btn-dark px-8">Publish</button>
      </section>
    </AnimationWrapper>
  );
};

export default PublishForm;
