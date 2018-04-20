export const validateForm = (formRules: any, currVal: any, currField: any) => ({
  type: 'VALIDATE_FORM',
  formRules,
  currVal,
  currField
});