import React from 'react';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';

// https://material-ui.com/components/tabs/

// category selection to filter quiz list
export const Category = ({ setCategoryVal }) => {
  const [value, setValue] = React.useState(0);

  const selectCategory = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box m={2}>
        <Tabs value={value} indicatorColor="primary" textColor="primary" onChange={selectCategory} centered>
          <Tab
            label="All"
            onClick={() => {
              setCategoryVal('');
            }}
          />
          <Tab
            label="Math"
            onClick={() => {
              setCategoryVal('Math');
            }}
          />
          <Tab
            label="English"
            onClick={() => {
              setCategoryVal('English');
            }}
          />
          <Tab
            label="Science"
            onClick={() => {
              setCategoryVal('Science');
            }}
          />
          <Tab
            label="Computer"
            onClick={() => {
              setCategoryVal('Computer');
            }}
          />
        </Tabs>
      </Box>
    </div>
  );
};

Category.propTypes = {
  setCategoryVal: PropTypes.func.isRequired,
};
