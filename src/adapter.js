/* eslint-disable func-names */

class Interface {
  constructor(dataTypeClass) {
    this.checks = [];
    const { validators } = dataTypeClass;
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
      if (!handlerFunction(data)) {
        return false;
      }
    }
    return true;
  }
}

export default Interface;
