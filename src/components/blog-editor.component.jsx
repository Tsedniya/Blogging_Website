import { Link } from "react-router-dom";
import logo from "../imgs/logo.png";
import AnimationWrapper from "../common/page-animation";
import defaultBanner from "../imgs/blog banner.png"; 
import EditorJS from "@editorjs/editorjs";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { tools } from "./tools.component";

const BlogEditor = () => {
    const [title, setTitle] = useState("");
    const [banner, setBanner] = useState(defaultBanner);
    const [textEditor, setTextEditor] = useState(null);

    useEffect(() => {
        if (!textEditor) {
            const editor = new EditorJS({
                holderId: "textEditor",
                tools: tools,
                placeholder: "Let's write an awesome story",
            });
            setTextEditor(editor);
        }
    }, [textEditor]);

    const handleBannerUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBanner(reader.result); // Set the uploaded banner
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveDraft = (e) => {
        if (e.target.className.includes("disable")) return;

        if (!title) {
            return toast.error("Write blog title before saving it as a draft.");
        }

        let loadingToast = toast.loading("Saving Draft...");
        e.target.classList.add("disable");

        if (textEditor && textEditor.isReady) {
            textEditor.save().then(content => {
                const blogObj = {
                    title,
                    banner,
                    content,
                    draft: true,
                };

                // Uncomment and implement the API call
                /*
                axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}/create-blog`, blogObj)
                .then(() => {
                    e.target.classList.remove("disable");
                    toast.dismiss(loadingToast);
                    toast.success("Draft saved!");
                })
                .catch(({ response }) => {
                    e.target.classList.remove("disable");
                    toast.dismiss(loadingToast);
                    return toast.error(response.data.error);
                });
                */
            });
        }
    };

    const handlePublishEvent = () => {
        if (!banner) return toast.error("Upload a blog banner to publish.");
        if (!title) return toast.error("Write blog title to publish.");

        if (textEditor && textEditor.isReady) {
            textEditor.save().then(data => {
                if (data.blocks.length) {
                    const blogObj = {
                        title,
                        banner,
                        content: data,
                        draft: false,
                    };

                    // Uncomment and implement the API call
                    /*
                    axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}/create-blog`, blogObj)
                    .then(() => {
                        toast.success("Blog published successfully!");
                    })
                    .catch(({ response }) => {
                        toast.error(response.data.error);
                    });
                    */
                } else {
                    return toast.error('Write something in your blog to publish it.');
                }
            });
        }
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
                                <img 
                                    src={banner}
                                    className="z-20"
                                    alt="Blog Banner"
                                />
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
            <Toaster /> {/* Toast notifications */}
        </>
    );
};

export default BlogEditor;