import Alert from '../Alert';

const Confirm = {
  show: (message: string): Promise<boolean> => {
    return Alert.show({ message, confirmation: true });
  }
};

export default Confirm;