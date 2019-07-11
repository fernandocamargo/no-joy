import { arrayOf, shape, node, any } from 'prop-types';
import React, { memo } from 'react';

const Radio = ({ options, children }) => (
  <pre>{JSON.stringify(children || options, null, 2)}</pre>
);

Radio.propTypes = {
  options: arrayOf(
    shape({
      label: node,
      value: any,
    })
  ),
  children: node,
};

export default memo(Radio);
