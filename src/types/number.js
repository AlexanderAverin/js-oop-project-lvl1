class NumberClass {
  constructor() {
    this.validators = {
      required: (data) => typeof data === 'number' && data !== 0,
      positive: (data) => data >= 0,
      range: (from, to) => (data) => data >= from && data <= to,
    };
  }
}

export default NumberClass;
