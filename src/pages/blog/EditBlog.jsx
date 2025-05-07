import React from "react";
import { useParams } from "react-router-dom";

const EditBlog = () => {
  const { id } = useParams();
  return <div>EditBlog {id}</div>;
};

export default EditBlog;
