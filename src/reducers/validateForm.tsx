const initialState = {
  isValid: false,
};

const validateForm = (state: any = initialState, action: any) => {
  switch (action.type) {
    case 'VALIDATE_FORM':
      let formRules = action.formRules;
      let currVal = action.currVal;
      let currField = action.currField;

      console.log(formRules);
      console.log(currVal);
      console.log(currField);
      return {
        ...state,
        isValid: false,
      };
    default:
      return state;
  }
};

export default validateForm;
