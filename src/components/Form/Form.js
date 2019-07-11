import React, { useCallback, memo } from 'react';

const Form = ({ children }) => {
  const submit = useCallback(event => {
    event.preventDefault();
    console.log('submit();');
  }, []);

  return (
    <form onSubmit={submit}>
      <fieldset>
        <legend>This is a form</legend>
        {children}
        <div>
          <button type="submit">Submit</button>
        </div>
      </fieldset>
    </form>
  );
};

export default memo(Form);
