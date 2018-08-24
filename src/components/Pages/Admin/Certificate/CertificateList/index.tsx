import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from 'decorators/withStyles';
import React, { PureComponent } from 'react';

import CertificateItem from './CertificateItem';

interface IState {
  open: boolean;
}

interface IProps {
  classes?: any;
}

@WithStyles(theme => ({
  title: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
}))

export default class CertificateList extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper>
        <Typography className={classes.title} variant='title'>Cursos que foram atribuídos ao certificado</Typography>

        <CertificateItem />
      </Paper>
    );
  }
}