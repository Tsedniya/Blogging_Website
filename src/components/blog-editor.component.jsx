<<<<<<< HEAD
import { Link } from "react-router-dom";
import logo from "../imgs/logo.png";
import AnimationWrapper from "../common/page-animation";
import defaultBanner from "../imgs/blog banner.png"; 
import EditorJS from "@editorjs/editorjs";
import { useEffect, useState, useContext } from "react";
import { Toaster, toast } from "react-hot-toast";
import { tools } from "./tools.component";
import { EditorContext } from "../context/editor-context"; 

const BlogEditor = () => {
    const { setBlog, setEditorState } = useContext(EditorContext);
    const [title, setTitle] = useState("");
    const [banner, setBanner] = useState(defaultBanner);
    const [textEditor, setTextEditor] = useState(null);
=======
import { Link } from 'react-router-dom';
import logo from '../imgs/logo.png';
import AnimationWrapper from '../common/page-animation';
import defaultBanner from '../imgs/blog banner.png';
import { useContext, useEffect, useState } from 'react';
//import { EditorContext } from "../pages/editor.pages";
import EditorJS from '@editorjs/editorjs';
import { tools } from './tools.component';
import Editor from '../pages/editor.pages';
import { Toaster, toast } from 'react-hot-toast';
import { EditorContext } from '../context/editor-context';

const BlogEditor = () => {
  let {
    blog,
    blog: { title, banner, content, tags, des },
    setBlog,
    textEditor,
    setTextEditor,
    setEditorState,
  } = useContext(EditorContext);
>>>>>>> ac540ad6845d669cc7a24cbd0f86129324d2f9b6

  /*let img = e.target.files[0];

<<<<<<< HEAD
    const handleBannerUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBanner(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveDraft = async () => {
        if (!title) {
            return toast.error("Write blog title before saving it as a draft.");
        }

        const content = await textEditor.save();
        const blogObj = {
            title,
            banner,
            content,
            draft: true,
        };
        setBlog(blogObj); // Update context with blog data
        toast.success("Draft saved successfully!");
    };

    const handlePublishEvent = async () => {
        if (!banner) return toast.error("Upload a blog banner to publish.");
        if (!title) return toast.error("Write blog title to publish.");

        const data = await textEditor.save();
        const blogObj = {
            title,
            banner,
            content: data,
            draft: false,
        };
        setBlog(blogObj); // Update context with blog data
        toast.success("Redirecting to publish form...");
        setEditorState("publisher"); // Switch to publisher view
       
    };

    return (
        <>
            <nav className="navbar">
                <Link to="/" className="flex-none w-14">
                    <img src={logo} alt="Logo" />
                </Link>
                <p className="max-md:hidden text-black line-clamp-1 w-full">
                    {title.length ? title : "New Blog"}
                </p>
                <div className="flex gap-4 ml-auto">
                    <button className="btn-dark py-2" onClick={handlePublishEvent}>
                        Publish
                    </button>
                    <button className="btn-light py-2" onClick={handleSaveDraft}>
                        Save Draft
                    </button>
                </div>
            </nav>
            <AnimationWrapper>
                <section>
                    <div className="mx-auto max-w-[900px] w-full">
                        <div className="relative aspect-video hover:opacity-80 bg-white border-4 border-grey">
                            <label htmlFor="uploadBanner">
                                <img src={banner} className="z-20" alt="Blog Banner" />
                                <input 
                                    id="uploadBanner"
                                    type="file"
                                    accept=".png, jpg, jpeg"
                                    hidden
                                    onChange={handleBannerUpload}
                                />
                            </label>
                        </div>
                        <textarea
                            value={title}
                            placeholder="Blog Title"
                            className="text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <hr className="w-full opacity-10 my-5" />
                        <div id="textEditor" className="font-inter"></div>
                    </div>
                </section>
            </AnimationWrapper>
            <Toaster /> 
        </>
    );
=======
    const handelBannerUpload = (e) => {

        let img = e.target.files[0];

        if(img){
          uploadImage(img).then((url)) => {

            if(url){

                toast.dismiss(loadingToast);
                toast.success("Uploading ");
          

                setBlog({...blog, banner: url})
           }
          })*/

  // useEffect(() => {
  //   if (!texteditor.isready) {
  //     setTextEditor(
  //       new EditorJS({
  //         holderId: "textEditor",
  //         data: content,
  //         tools: tools,
  //         placeholder: "let's write an awesome story",
  //       })
  //     );
  //   }
  // }, []);
  // let { userAuth : {access_token}} = useContext(UserContext)
  let navigate = useNavigate();

  const handleSaveDraft = (e) => {
    if (e.target.className.includes('disable')) {
      return;
    }
    if (!title.length) {
      return toast.error('Write blog title before saving it as a draft.');
    }

    let loadingToast = toast.loading('Saving Draft...');
    e.target.classList.add('disable'); // Added quotes around 'disable'

    if (textEditor.isReady) {
      textEditor.save().then((content) => {
        let blogObj = {
          title,
          banner,
          des,
          content,
          tags,
          draft: true,
        };

        /*axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}/create-blog`, blogObj, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`, // Fixed syntax
                    },
                })
                .then(() => {
                    e.target.classList.remove("disable");
                    toast.dismiss(loadingToast);
                    toast.success("Draft saved!");
                })
                .catch(({ response }) => {
                    e.target.classList.remove("disable");
                    toast.dismiss(loadingToast);
                    return toast.error(response.data.error);
                });*/
      });
    }
  };

  const handleTitleKeyDown = (e) => {
    if (e.keyCode == 13) {
      e.preventDefault();
    }
  };
  const handleTitleChange = (e) => {
    let input = e.target;

    input.style.height = 'auto';
    input.style.height = input.scrollHeight + 'px';

    setBlog({ ...blog, title: input.value });
  };
  const handleError = (e) => {
    let img = e.target;
    img.src = defaultBanner;
  };
  const handlePublishEvent = () => {
    if (!defaultBanner.length) {
      return toast.error('Upload a blog banner to publish');
    }
    if (!title.length) {
      return toast.error('write blog title to publish');
    }
    if (textEditor.isReady) {
      textEditor.save().then((data) => {
        if (data.blocks.length) {
          setBlog({ ...blog, content: data });
          setEditorState('publish');
        } else {
          return toast.error('write something in your blog to publish it');
        }
      });
    }
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="flex-none w-14">
          <img src={logo} />
        </Link>
        <p className="w-full text-black max-md:hidden line-clamp-1">
          {title.length ? title : '  New Blog'}
        </p>

        <div className="flex gap-4 ml-auto">
          <button className="py-2 btn-dark" onClick={handlePublishEvent}>
            Publish
          </button>
          <button className="py-2 btn-light" onClick={handleSaveDraft}>
            Save Draft
          </button>
        </div>
      </nav>
      <AnimationWrapper>
        <section>
          <div className="mx-auto max-w-[900px] w-full">
            <div className="relative bg-white border-4 aspect-video hover:opacity-80 border-grey">
              <label htmlFor="uploadBanner">
                <img
                  src={defaultBanner}
                  className="z-20"
                  onError={handleError}
                />
                <input
                  id="uploadBanner"
                  type="file"
                  accept=".png, jpg, jpeg"
                  hidden
                  //   onChange={handelBannerUpload}
                />
              </label>
            </div>
            <textarea
              //   defaultValue={title}
              placeholder="Blog Title"
              className="w-full h-20 mt-10 text-4xl font-medium leading-tight outline-none resize-none placeholder:opacity-40"
              onKeyDown={handleTitleKeyDown}
              onChange={handleTitleChange}
            ></textarea>

            <hr className="w-full my-5 opacity-10" />

            <div id="textEditor" className="font-inter"></div>
          </div>
        </section>
      </AnimationWrapper>
    </>
  );
>>>>>>> ac540ad6845d669cc7a24cbd0f86129324d2f9b6
};

export default BlogEditor;