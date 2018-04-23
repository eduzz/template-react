const initialState = {
  isValid: false,
};

function validate(formRules: any, currVal: any, validField: any) {
  Object.getOwnPropertyNames(formRules).forEach(function (val, idx, array) {
    let key = val;
    let value = formRules[val];

    switch (key) {
      case 'required':
        currVal[formRules.ref] !== '' ? validField.push(true) : validField.push(false);
        break;

      case 'isSame':
        if (currVal[value] !== '') {
          currVal[formRules.ref] === currVal[value] ? validField.push(true) : validField.push(false);
        }
        break;
    }
  });
}

const validateForm = (state: any = initialState, action: any) => {
  switch (action.type) {
    case 'VALIDATE_FORM':
      let formRules = action.formRules;
      let currVal = action.currVal;
      let currField = action.currField.attributes;
      let validField: any = [];

      for (let i = 0; i < formRules.length; i++) {
        if (formRules[i].ref === currField.id.nodeValue) {
          validate(formRules[i], currVal, validField);
        }

        validate(formRules[i], currVal, validField);
      }

      console.log(!validField.includes(false));

      return {
        ...state,
        isValid: !validField.includes(false),
      };
    default:
      return state;
  }
};

export default validateForm;
