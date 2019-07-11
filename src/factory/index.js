import update from 'immutability-helper';
import { useState, useRef, useCallback, createElement } from 'react';

import Form from 'components/Form';
import Field from 'components/Field';

const extractModulesFrom = ({ fields }) =>
  Object.entries(fields).reduce(
    ({ enums, modules }, [type, module]) => ({
      enums: Object.assign(enums, { [type]: type }),
      modules: Object.assign(modules, { [type]: module }),
    }),
    { enums: {}, modules: {} }
  );

const extractFieldsFrom = ({ fields }) =>
  fields.reduce(
    ({ types, data, indexes }, { type, name, value }, index) => ({
      types: types.add(type),
      data: Object.assign(data, { [name]: value }),
      indexes: Object.assign(indexes, { [name]: index }),
    }),
    { types: new Set(), data: {}, indexes: {} }
  );

export const createSWP = settings => {
  const { modules: components, enums } = extractModulesFrom(settings);
  const useSWP = ({ original = true, debugging = false, ...options }) => {
    const { data } = extractFieldsFrom(options);
    const [state, setState] = useState({ original, data, debugging });
    const onSync = useCallback(
      (name, next) =>
        setState(current =>
          update(current, {
            data: { [name]: { $set: next } },
            original: { $set: false },
          })
        ),
      [setState]
    );
    const fields = useRef(
      options.fields.reduce(
        (stack, { type, name, settings, validation, ...field }) => {
          const component = components[type];
          const initialValue = data[name];
          const rendered = createElement(Field, {
            ...field,
            ...settings,
            key: name,
            component,
            name,
            initialValue,
            onSync,
          });

          return update(stack, {
            unordered: { [name]: { $set: rendered } },
            ordered: { $push: [rendered] },
          });
        },
        { unordered: {}, ordered: [] }
      )
    );
    const form = useRef(
      createElement(Form, { children: fields.current.ordered })
    );

    return [state, { form: form.current, fields: fields.current }];
  };

  return { enums, useSWP };
};
