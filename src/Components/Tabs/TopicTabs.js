import React from "react";
import { Tab, Tabs } from "@mui/material";

const TopicTabs = ({ value, handleChange }) => {
  return (
    <Tabs
      value={value}
      onChange={handleChange}
      aria-label="basic tabs"
      className="filter-tabs"
    >
      <Tab label="All" value="All" />
      <Tab label="Custom" value="Custom" />
      <Tab label="ICP" value="ICP" />
      <Tab label="Mission" value="Mission" />
      <Tab label="Product" value="Product" />
    </Tabs>
  );
};

export default TopicTabs;
