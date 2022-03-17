/* eslint-disable class-methods-use-this */
import StringClass from './types/string.js';
import NumberClass from './types/number.js';
import Interface from './adapter.js';

class Validator {
  string() {
    return new Interface(new StringClass());
  }

  number() {
    return new Interface(new NumberClass());
  }
}

export default Validator;
