import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Button,
  Alert,
  IconButton,
  Card,
  CardActions,
  Chip,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import NoRecordFound from "../../Components/Table/NoRecordFound";
import {
  deleteTopic,
  getTopicList,
  resetTopic,
} from "../../Redux/Slice/TopicSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CreateIcon from "@mui/icons-material/Create";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationModal from "../../Components/Modal/ConfirmationModal";
import { TIMEOUT_TIME, topicData } from "../../Utilis/Utilis";
import TopicTabs from "../../Components/Tabs/TopicTabs";

const TopicListing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [showMessage, setShowMessage] = useState(null);
  const [category, setCategory] = useState("All");
  const { message, topicList } = useSelector((state) => {
    return {
      topicList: state.topics.topicList,
      message: state?.topics?.message,
    };
  });

  const handleDelete = () => {
    dispatch(deleteTopic(openModal));
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, TIMEOUT_TIME);
  }, []);

  useEffect(() => {
    if (message) {
      dispatch(resetTopic());
      setOpenModal(null);
      setShowMessage(message);
      setTimeout(() => {
        setShowMessage(null);
      }, TIMEOUT_TIME);
    }
  }, [message]);

  useEffect(() => {
    if (topicList.length === 0) {
      dispatch(getTopicList(topicData));
    }
  }, [topicList.length]);

  const handleChange = (event, newValue) => {
    setCategory(newValue);
  };

  const filterTopicsByCategory = (category) => {
    if (category === "All") {
      return topicList;
    } else {
      return topicList?.filter((blog) => blog.category === category);
    }
  };

  return (
    <Box className="page-wrapper">
      {showMessage && (
        <Alert severity="success" variant="filled">
          {showMessage}
        </Alert>
      )}
      <Grid container spacing={2} sx={{ marginBottom: 3 }}>
        <Grid item xs={12} sm={6} textAlign="left">
          <Typography variant="h5" className="main-heading">
            <strong>Categories</strong>
          </Typography>
          <TopicTabs value={category} handleChange={handleChange} />
        </Grid>
        <Grid item xs={6} textAlign="right">
          <Button
            variant="contained"
            onClick={() => navigate("/topics/form")}
            className="btn-primary"
          >
            <AddCircleIcon />
            Add Topic
          </Button>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item sm={12}>
          <Typography className="sub-heading" variant="h6">
            Recommended Topics
          </Typography>
        </Grid>
      </Grid>
      {!isLoading &&
        filterTopicsByCategory(category).map((topic, index) => {
          return (
            <Card key={topic?.id} className="topic-card-ui">
              <Grid container justifyContent="space-between">
                <Grid item sm={4}>
                  <Typography className="topic-title">{topic?.name}</Typography>
                  <Box className="topic-tags">
                    {topic?.keywords.map((tag) => {
                      return <Chip label={tag} variant="outlined" />;
                    })}
                  </Box>
                </Grid>
                <Grid item sm={6}>
                  <CardActions className="topic-card-btns">
                    <IconButton
                      color="green"
                      aria-label="Delete"
                      component="label"
                      onClick={() => navigate(`/topics/${topic.id}`)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      aria-label="Delete"
                      component="label"
                      onClick={() => setOpenModal(index.toString())}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <Button
                      variant="contained"
                      className="btn-primary"
                      onClick={() => navigate(`/topics/editor/${topic.id}`)}
                    >
                      <CreateIcon />
                      Write
                    </Button>
                  </CardActions>
                </Grid>
              </Grid>
            </Card>
          );
        })}
      {(!topicList?.length || isLoading) && (
        <NoRecordFound colSpan="7" loading={isLoading} />
      )}
      <ConfirmationModal
        openModal={openModal}
        closeModal={(val) => (val ? handleDelete() : setOpenModal(false))}
      />
    </Box>
  );
};
export default TopicListing;
