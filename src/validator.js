import StringTypeClass from './types/string.js';
import NumberTypeClass from './types/number.js';
import ArrayTypeClass from './types/array.js';
import ObjectTypeClass from './types/object.js';

import Interface from './adapter.js';

const getValidatorsOnType = (type, validators) => validators
  .filter((validator) => validator.type === type)
  .reduce((acc, validatorOnType) => ({ ...acc, [validatorOnType.name]: validatorOnType.fn }), {});

class Validator {
  constructor() {
    this.extendsValidators = [];
  }

  string() {
    return new Interface(new StringTypeClass(), getValidatorsOnType('string', this.extendsValidators));
  }

  number() {
    return new Interface(new NumberTypeClass(), getValidatorsOnType('number', this.extendsValidators));
  }

  array() {
    return new Interface(new ArrayTypeClass(), getValidatorsOnType('array', this.extendsValidators));
  }

  object() {
    return new Interface(new ObjectTypeClass(), getValidatorsOnType('object', this.extendsValidators));
  }

  addValidator(type, name, fn) {
    this.extendsValidators = [...this.extendsValidators, {
      name, fn, type,
    }];
  }
}

export default Validator;
