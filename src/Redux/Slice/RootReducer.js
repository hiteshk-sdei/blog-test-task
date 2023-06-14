import { combineReducers } from "@reduxjs/toolkit";
import TopicSlice from './TopicSlice';

const RootReducer = combineReducers({
    topics: TopicSlice,
})
export default RootReducer;