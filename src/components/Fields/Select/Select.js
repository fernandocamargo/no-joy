import { node, arrayOf, shape, any } from 'prop-types';
import React, { memo, useCallback } from 'react';

const Option = ({ label, ...props }) => <option {...props}>{label}</option>;

const Select = ({ label, onChange, options, ...props }) => {
  const change = useCallback(({ target: { value } }) => onChange(value), [
    onChange,
  ]);
  const renderOption = useCallback(
    option => <Option key={JSON.stringify(option.value)} {...option} />,
    []
  );

  return (
    <div>
      <label>{label}</label>
      <select onChange={change} {...props}>
        {options.map(renderOption)}
      </select>
    </div>
  );
};

Select.propTypes = {
  label: node,
  options: arrayOf(
    shape({
      label: node,
      value: any,
    })
  ),
};

Select.defaultProps = {
  options: [],
};

export default memo(Select);
