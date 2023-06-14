import { Box, Card, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../Components/FormElements/Button";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const BlogDetails = () => {
  const { topicList } = useSelector((state) => state.topics);
  const [blog, setBlog] = useState();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const selectedBlog = topicList.find((el) => el.id === params?.id);
    setBlog(selectedBlog);
  }, [params?.id]);

  return (
    <Box className="page-wrapper">
      <Button
        variant="outlined"
        type="button"
        className="btn-primary back-btn"
        label="Back to Home"
        icon={<KeyboardBackspaceIcon />}
        onClick={() => navigate("/")}
      />
      <Box className="blog-details">
        <Typography variant="h5" className="main-heading">
          Blog Details:
        </Typography>
        <Card className="topic-card-ui">
        <Typography variant="h5" className="blog-title">
          {blog?.name}
        </Typography>
        {blog?.details ? (
          <div dangerouslySetInnerHTML={{ __html: blog?.details }}></div>
        ) : (
          <Box className="no-details-text">
            <Typography>No details found, write blog to show...</Typography>
          </Box>
        )}
        </Card>
      </Box>
    </Box>
  );
};

export default BlogDetails;
