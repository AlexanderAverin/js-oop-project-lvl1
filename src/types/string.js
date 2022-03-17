class StringClass {
  constructor() {
    this.validators = {
      required: (data) => typeof data === 'string' && data !== '',
      minLength: (minimalLength) => (data) => data.length >= minimalLength,
      contains: (substring) => (data) => data.includes(substring),
    };
  }
}

export default StringClass;
