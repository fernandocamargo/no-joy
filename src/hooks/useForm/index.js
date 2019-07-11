import { createSWP } from 'factory';

import Text from 'components/Fields/Text';
import Select from 'components/Fields/Select';
import Radio from 'components/Fields/Radio';

const { enums, useSWP } = createSWP({
  fields: {
    TEXT: Text,
    SELECT: Select,
    RADIO: Radio,
  },
});

export const FIELDS = enums;

export default useSWP;
