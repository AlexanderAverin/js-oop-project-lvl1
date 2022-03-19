/* eslint-disable func-names */
class Interface {
  constructor(dataTypeClass, extendsValidators) {
    this.checks = [];
    const validators = { ...dataTypeClass.validators, ...extendsValidators };
    this.validators = validators;

    Object.values(validators).forEach((validatorHandler) => {
      this.constructor.prototype[validatorHandler.name] = function (...args) {
        const validationFunction = typeof validatorHandler() === 'function' ? validatorHandler(...args) : validatorHandler;
        this.checks = [...this.checks, validationFunction];
        return this;
      };
    });
  }

  isValid(data) {
    const { checks } = this;
    for (let i = 0; i < checks.length; i += 1) {
      const handlerFunction = checks[i];
      if (typeof handlerFunction === 'object') {
        if (!handlerFunction.fn(...[...handlerFunction.args, data].reverse())) {
          return false;
        }
        return true;
      }
      if (!handlerFunction(data)) {
        return false;
      }
    }
    return true;
  }

  test(validatorName, arg) {
    const validatorFn = this.validators[validatorName];
    this.checks = [...this.checks, { fn: validatorFn, args: [arg] }];
    return this;
  }
}

export default Interface;
