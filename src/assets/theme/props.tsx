import { ComponentsProps } from '@material-ui/core/styles/props';
import DefaultDialogTransition from 'components/Shared/DefaultDialogTransition';

const props: ComponentsProps = {
  MuiTextField: {
    variant: 'filled',
    margin: 'normal'
  },
  MuiDialog: {
    TransitionComponent: DefaultDialogTransition
  }
};

export default props;
