class ArrayTypeClass {
  constructor() {
    this.validators = {
      required: (data) => Array.isArray(data),
      sizeof: (arraylength) => (data) => data.length === arraylength,
    };
  }
}

export default ArrayTypeClass;
