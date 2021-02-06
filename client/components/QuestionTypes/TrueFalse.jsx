/* eslint react/prop-types: 0 */

import React from 'react';
import { RadioGroup, FormControl, FormControlLabel, Radio } from '@material-ui/core';

export const TrueFalse = (props) => {
  return (
    <FormControl component="fieldset">
      <RadioGroup>
        <FormControlLabel value="True" control={<Radio />} label="True" />
        <FormControlLabel value="False" control={<Radio />} label="False" />
      </RadioGroup>
    </FormControl>
  );
};
