import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Alert, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addDetails } from "../../Redux/Slice/TopicSlice";
import { useNavigate, useParams } from "react-router-dom";
import { TIMEOUT_TIME } from "../../Utilis/Utilis";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Button from "../../Components/FormElements/Button";

const BlogEditor = () => {
  const [content, setContent] = useState("");
  const [showMessage, setShowMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { message } = useSelector((state) => state?.topics);

  const handleEditorReady = (editor) => {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return {
        upload: async () => {
          const file = await loader.file;
          const dataUrl = await readFileAsDataUrl(file);
          return {
            default: dataUrl,
          };
        },
      };
    };
  };

  const readFileAsDataUrl = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleChange = (event, editor) => {
    const data = editor.getData();
    setContent(data);
  };

  const handleGenerate = () => {
    const data = {
      id: params?.id,
      content: content,
    };
    dispatch(addDetails(data));
  };

  useEffect(() => {
    if (message) {
      setShowMessage(message);
      setTimeout(() => {
        navigate("/");
      }, TIMEOUT_TIME);
    }
  }, [message]);

  return (
    <Box className="page-wrapper">
      {showMessage && (
        <Alert severity="success" variant="filled">
          {showMessage}
        </Alert>
      )}
      <Button
        variant="outlined"
        type="button"
        className="btn-primary back-btn"
        label="Back to Home"
        icon={<KeyboardBackspaceIcon />}
        onClick={() => navigate("/")}
      />
      <Typography variant="h5" className="main-heading">
        Write your blog:
      </Typography>
      <Box className="custom-editor">
        <CKEditor
          editor={ClassicEditor}
          data={content}
          onReady={handleEditorReady}
          onChange={handleChange}
          config={{
            toolbar: [
              "heading",
              "|",
              "bold",
              "italic",
              "link",
              "bulletedList",
              "numberedList",
              "|",
              "imageUpload",
            ],
          }}
        />
      </Box>
      <Button
        variant="contained"
        type="button"
        className="btn-primary"
        label="Generate"
        onClick={handleGenerate}
      />
    </Box>
  );
};

export default BlogEditor;
