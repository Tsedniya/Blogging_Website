<<<<<<< HEAD
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
=======
import { useContext } from 'react';
import { EditorContext } from '../context/editor-context';

const Tag = ({ tag, tagIndex }) => {
  let { blog, setBlog } = useContext(EditorContext);
  let tags = blog.tags;

  const handleTagDelete = () => {
    tags = tags.filter((t) => t != tag);
    setBlog({ ...blog, tags });
  };
  const handleTagEdit = (e) => {
    if (e.keyCode == 13 || e.keyCode == 188) {
      e.preventDefault();
      let currentTag = e.target.innerText;
      tags[tagIndex] = currentTag;

      setBlog({ ...blog, tags });
      e.target.setAttribute('contentEditable', false);
    }
  };
  const addEditable = (e) => {
    e.target.setAttribute('contentEditable', true);
    e.target.focus();
  };

  return (
    <div className="relative inline-block p-2 px-5 pr-10 mt-2 bg-white rounded-full hover:bg-opacity-50">
      <p
        className="outline-none"
        onKeyDown={handleTagEdit}
        onClick={addEditable}
      >
        {tag}
      </p>
      <button
        className="mt-[2px] rounded-full absolute right-3 top-1/2 transform -translate-y-1/2"
        onClick={handleTagDelete}
      >
        {' '}
        <i className="text-sm pointer-events-none fi fi-rs-cross-small"></i>
      </button>
    </div>
  );
>>>>>>> ac540ad6845d669cc7a24cbd0f86129324d2f9b6
};

export default Tag;