class StringClass {
  constructor() {
    this.validators = {
      required: (data) => typeof data === 'string' && data !== '',
      minLength: (minimalLength) => (data) => {
        if (typeof data !== 'string') {
          return false;
        }
        return data.length >= minimalLength;
      },
      contains: (substring) => (data) => data.includes(substring),
    };
  }
}

export default StringClass;
