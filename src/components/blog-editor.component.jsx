import logo from "../imgs/logo.png";
import { Link } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import  defaultBanner from "../imgs/blog banner.png"; 
const BlogEditor = () => {

    return(
        <>

        <nav className="navbar">
            <Link to= "/" className="flex-none w-14">
            <img src={logo}/>
            
            </Link>
            <p className="max-md:hidden text-black line-clamp-1 w-full">
                New Blog
            </p>

            <div className="flex gap-4 ml-auto">
                <button className="btn-dark py-2">
                    Publish
                </button>
                <button className="btn-light py-2">
                    Save Draft
                </button>
            </div>
        </nav>
        <AnimationWrapper>
                <section>
                    <div className="mx-auto max-w-[900px] w-full">


                        <div className="relative aspect-video hover:opacity-80 bg-white 
                        border-4 border-grey">
                            <label htmlFor="uploadBanner">

                                <img 
                                
                                src={defaultBanner}
                                className="z-20"
                                />
                                <input 
                                id="uploadBanner"
                                type="file"
                                accept=".png, jpg, jpeg"
                                hidden
                                //onChange={handelBannerUpload}

                                />
                            </label>

                        </div>
                            <textarea
                                placeholder="Blog Title"
                                className="text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40"
                                //onKeyDown={handleTitleKeyDown}
                                //onChange= {handleTitleChange}
                            ></textarea>

                            <hr className="w-full opacity-10 my-5"/>

                            <div id= "textEditor" className="font-inter"></div>
                    </div>
                </section>
            </AnimationWrapper>
      </>
    )
}
export default  BlogEditor;