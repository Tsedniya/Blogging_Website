import { useContext } from "react";
import { EditorContext } from "../context/editor-context"; 

const Tag = ({ tag, tagIndex }) => {
    const { blog, setBlog } = useContext(EditorContext);
    const { tags } = blog; // Destructure tags from the blog object

    const handleTagDelete = () => {
        const updatedTags = tags.filter(t => t !== tag); // Use strict equality
        setBlog({ ...blog, tags: updatedTags }); // Update the blog context
    };

    const handleTagEdit = (e) => {
        if (e.keyCode === 13 || e.keyCode === 188) { // Enter or comma
            e.preventDefault();
            const currentTag = e.target.innerText.trim();
            if (!currentTag) return; // Prevent saving empty tags

            const updatedTags = [...tags]; // Create a new array
            updatedTags[tagIndex] = currentTag; // Update the tag at the specified index
            setBlog({ ...blog, tags: updatedTags }); // Update blog context
            e.target.setAttribute("contentEditable", false); // Disable editing
        }
    };

    const addEditable = (e) => {
        e.target.setAttribute("contentEditable", true);
        e.target.focus(); // Focus on the tag for editing
    };

    return (
        <div className="relative p-2 mt-2 px-5 bg-white rounded-full inline-block hover:bg-opacity-50 pr-10">
            <p 
                className="outline-none"
                onKeyDown={handleTagEdit}
                onClick={addEditable}
                suppressContentEditableWarning={true} // Suppress warnings for contentEditable
            >
                {tag}
            </p>
            <button 
                className="mt-[2px] rounded-full absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={handleTagDelete}
            >
                <i className="fi fi-rs-cross-small text-sm pointer-events-none"></i>
            </button>
        </div>
    );
};

export default Tag;