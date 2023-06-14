import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../Components/Layout";
import TopicListing from "../Pages/Topics/TopicListing";
import TopicForm from "../Pages/Topics/TopicForm";
import BlogEditor from "../Pages/Topics/BlogEditor";
import BlogDetails from "../Pages/Topics/BlogDetails";

const PublicRoutes = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<TopicListing />} />
        <Route path="/topics" element={<TopicListing />} />
        <Route path="/topics/:id" element={<BlogDetails />} />
        <Route path="/topics/form" element={<TopicForm />} />
        <Route path="/topics/editor/:id" element={<BlogEditor />} />
      </Routes>
    </Layout>
  );
};

export default PublicRoutes;
