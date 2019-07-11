import React, { useRef, useState, useCallback, useEffect, memo } from 'react';

const Field = ({
  component: Component,
  name,
  initialValue,
  onSync,
  ...props
}) => {
  const mounted = useRef(false);
  const [value, onChange] = useState(initialValue);
  const sync = useCallback(next => onSync(name, next), [onSync, name]);

  useEffect(() => {
    mounted.current && sync(value);
    mounted.current = true;
  }, [sync, value]);

  return <Component {...props} value={value} onChange={onChange} />;
};

export default memo(Field);
