import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import { WithStyles } from 'decorators/withStyles';
import React, { PureComponent } from 'react';

interface IState {
  refs: string[];
}

interface IProps {
  classes?: any;
  innerRef?: any;
}

@WithStyles(theme => ({
  loader: {
    width: 70,
    height: 70,
    color: theme.palette.secondary.light
  },
  paper: {
    boxShadow: 'none',
    outline: 'none',
    backgroundColor: 'transparent'
  }
}))
export default class Loader extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { refs: [] };
  }

  show = (ref: string): void => {
    if (typeof ref !== 'string') {
      throw new Error('Loader.show needs a ref string value');
    }

    const { refs } = this.state;
    if (refs.includes(ref)) return;

    this.setState({ refs: [...refs, ref] });
  };

  hide = (ref: string): void => {
    if (typeof ref !== 'string') {
      throw new Error('Loader.hide needs a ref string value');
    }

    const { refs } = this.state;
    const index = refs.indexOf(ref);
    if (index === -1) return;

    refs.splice(index, 1);
    this.setState({ refs: [...refs] });
  };

  handleRequestClose = () => {};

  render(): JSX.Element {
    const { refs } = this.state;
    const { classes } = this.props;

    return (
      <Dialog open={!!refs.length} TransitionComponent={Transition} PaperProps={{ className: classes.paper }}>
        <CircularProgress className={classes.loader} size='large' color='inherit' />
      </Dialog>
    );
  }
}

function Transition(props: any) {
  return <Slide direction='up' {...props} />;
}
