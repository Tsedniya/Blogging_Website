/*import { Link } from "react-router-dom";
import logo from "../imgs/logo.png";
import AnimationWrapper from "../common/page-animation";
import  defaultBanner from "../imgs/blog banner.png"; 
import { useEffect } from "react";
//import { EditorContext } from "../pages/editor.pages";
import EditorJS from "@editorjs/editorjs";
import { tools } from "./tools.component";


const BlogEditor = () => {

    // let img = e.target.files[0];

    //const handelBannerUpload = (e) => {

        //let img = e.target.files[0];

        //if(img){
          //uploadImage(img).then((url)) => {

           // if(url){

                //blogBannerRef.current.src = url
          //  }
         // })
    //}
    }

    /*const handelTitleKeyDown = (e) => {


        console.log(e)
    }*/
    useEffect(() => {
            let editor = new EditorJS({
            holderId : "textEditor",
            data: '',
            tools : tools,
            placeholder:"let's write an awesome story"})
    }, [])
   /* const handleTitleKeyDown = (e) =>{
        if(e.KeyCode == 13){
            e.preventDefault();
        }
    }
      const handleTitleChange = (e) => {
        let input = e.target;

        input.style.height = "auto";
        input.style.height = input.scrollHeight + "px";
        
        }
        
    
    



        return (

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
                                onKeyDown={handleTitleKeyDown}
                                onChange= {handleTitleChange}
                            ></textarea>

                            <hr className="w-full opacity-10 my-5"/>

                            <div id= "textEditor" className="font-inter"></div>





                    </div>
                </section>
            </AnimationWrapper>
            </>
        )
    
export default BlogEditor;*/