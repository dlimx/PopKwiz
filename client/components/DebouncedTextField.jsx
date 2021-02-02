import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { TextField } from '@material-ui/core';
import { useDebouncedCallback } from 'use-debounce';

const INPUT_DELAY = 200;

export const DebouncedTextField = (props) => {
  const [innerValue, setInnerValue] = useState('');

  useEffect(() => {
    if (props.value) {
      setInnerValue(props.value);
    } else {
      setInnerValue('');
    }
  }, [props.value]);

  const { callback: debouncedHandleOnChange } = useDebouncedCallback((event) => {
    if (props.onChange) {
      props.onChange(event);
    }
  }, INPUT_DELAY);

  const handleOnChange = useCallback((event) => {
    event.persist();

    const newValue = event.currentTarget.value;
    setInnerValue(newValue);
    debouncedHandleOnChange(event);
  }, []);

  return <TextField {...props} value={innerValue} onChange={handleOnChange} />;
};

DebouncedTextField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

DebouncedTextField.defaultProps = {
  value: '',
};
