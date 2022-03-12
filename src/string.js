const rulesHandlers = {
  required: (data) => typeof data === 'string' && data !== '',
  minLength: (minimalLength) => (data) => data.length >= minimalLength,
  contains: (substring) => (data) => data.includes(substring),
};

class StringClass {
  constructor() {
    this.rules = {};
  }

  required() {
    this.rules.required = rulesHandlers.required;
    return this;
  }

  minLength(length) {
    this.rules.minLength = rulesHandlers.minLength(length);
    return this;
  }

  contains(substring) {
    this.rules.contains = rulesHandlers.contains(substring);
    return this;
  }

  isValid(data) {
    const parsedRulesList = Object.values(this.rules);
    for (let i = 0; i < parsedRulesList.length; i += 1) {
      const handlerFunction = parsedRulesList[i];
      const checkResult = parsedRulesList.length === 0 ? true : handlerFunction(data);
      if (!checkResult) {
        return false;
      }
    }
    return true;
  }
}

export default StringClass;
