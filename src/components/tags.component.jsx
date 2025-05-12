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
};

export default Tag;
