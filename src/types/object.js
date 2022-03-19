class ObjectTypeClass {
  constructor() {
    this.validators = {
      shape: (object) => (data) => {
        const dataKeys = Object.keys(data);

        return !dataKeys.map((key) => {
          const dataValueOnKey = data[key];
          const objectValidatorOnKey = object[key];

          if (!objectValidatorOnKey || objectValidatorOnKey.isValid(dataValueOnKey)) {
            return true;
          }
          return false;
        })
          .includes(false);
      },
    };
  }
}
export default ObjectTypeClass;
