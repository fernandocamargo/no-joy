import React, { useCallback, memo } from 'react';

import useForm, { FIELDS } from 'hooks/useForm';

const App = () => {
  const onChange = useCallback(
    ({ data }) => console.log(JSON.stringify(data, null, 2)),
    []
  );
  const [
    state,
    {
      fields: {
        unordered: { gender, email },
        ordered: [forename],
      },
      form,
    },
  ] = useForm({
    fields: [
      {
        type: FIELDS.TEXT,
        name: 'forename',
        label: 'Forename',
        value: 'Fernando',
        validation: value => {
          const sanitized = String(value).trim();
          const { length } = sanitized;

          return {
            length: {
              min: length >= 3,
              max: length <= 20,
            },
          };
        },
      },
      {
        type: FIELDS.TEXT,
        name: 'surname',
        label: 'Surname',
        value: 'Camargo',
      },
      { type: FIELDS.TEXT, name: 'nickname', label: 'Nickname', value: '' },
      {
        type: FIELDS.TEXT,
        name: 'email',
        label: 'E-mail',
        value: 'camargodelbuono@gmail.com',
        settings: { type: 'email' },
      },
      {
        type: FIELDS.SELECT,
        name: 'gender',
        label: 'Gender',
        value: 'male',
        settings: {
          options: [
            { label: 'Female', value: 'female' },
            { label: 'Male', value: 'male' },
          ],
        },
      },
    ],
    onChange,
  });

  return (
    <div>
      {gender}
      <hr />
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <hr />
      {form}
      <hr />
      {forename}
      <hr />
      {email}
    </div>
  );
};

export default memo(App);
