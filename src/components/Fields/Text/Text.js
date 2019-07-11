import { oneOf, node } from 'prop-types';
import React, { memo, useCallback } from 'react';

const Text = ({ type, label, onChange, ...props }) => {
  const change = useCallback(({ target: { value } }) => onChange(value), [
    onChange,
  ]);

  return (
    <div>
      <label>{label}</label>
      <input type={type} onChange={change} {...props} />
    </div>
  );
};

Text.propTypes = {
  type: oneOf(['text', 'email', 'password']),
  label: node,
};

Text.defaultProps = {
  type: 'text',
  value: '',
};

export default memo(Text);
