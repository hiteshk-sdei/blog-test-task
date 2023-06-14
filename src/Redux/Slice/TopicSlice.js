import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  topicList: [],
  message: null,
  blogDetails: null,
};

export const topicSlice = createSlice({
  name: "topics",
  initialState,
  reducers: {
    getTopicList: (state, action) => ({
      ...state,
      topicList: action.payload,
    }),
    addTopic: (state, action) => {
      const newTopicList = [action.payload, ...state.topicList];
      return {
        ...state,
        topicList: newTopicList,
        message: "Topic has been created successfully.",
      };
    },
    deleteTopic: (state, action) => {
      state.topicList.splice(action.payload, 1);
      state.message = "Topic has been deleted successfully.";
    },
    addDetails: (state, action) => {
      state.topicList?.forEach((topic) => {
        if (topic.id === action.payload.id) {
          topic.details = action.payload.content;
          state.message = "Details has been added successfully.";
        }
      });
    },
    resetTopic: (state, action) => {
      state.message = null;
    },
  },
});

export const { getTopicList, addTopic, deleteTopic, addDetails, resetTopic } =
  topicSlice.actions;

export default topicSlice.reducer;
