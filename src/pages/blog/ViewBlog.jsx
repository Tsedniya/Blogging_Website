import React from "react";
import { useParams } from "react-router-dom";

const ViewBlog = () => {
  const { id } = useParams();
  return <div>ViewBlog {id}</div>;
};

export default ViewBlog;
