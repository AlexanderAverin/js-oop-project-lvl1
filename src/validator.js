/* eslint-disable class-methods-use-this */
import StringTypeClass from './types/string.js';
import NumberTypeClass from './types/number.js';
import ArrayTypeClass from './types/array.js';
import ObjectTypeClass from './types/object.js';

import Interface from './adapter.js';

class Validator {
  string() {
    return new Interface(new StringTypeClass());
  }

  number() {
    return new Interface(new NumberTypeClass());
  }

  array() {
    return new Interface(new ArrayTypeClass());
  }

  object() {
    return new Interface(new ObjectTypeClass());
  }
}

export default Validator;
