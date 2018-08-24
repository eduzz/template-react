import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from 'decorators/withStyles';
import { ICertificate } from 'interfaces/models/certificate';
import React, { PureComponent } from 'react';
import rxjsOperators from 'rxjs-operators';
import certificateService from 'services/certificate';

import CertificateItem from './CertificateItem';

interface IState {
  certificates: ICertificate[];
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

    this.state = {
      certificates: [],
    };
  }

  async componentDidMount() {
    certificateService.list(null).pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this),
    ).subscribe((result) => {
      this.setState({ certificates: result.results });
    }, (err) => {
      console.log(err);
    });
  }

  render() {
    const { classes } = this.props;
    const { certificates } = this.state;
    return (
      <Paper>
        <Typography className={classes.title} variant='title'>Cursos que foram atribuídos ao certificado</Typography>

        {!!certificates && certificates.map(certificate =>
          <CertificateItem key={certificate.id} certificate={certificate} />
        )}

      </Paper>
    );
  }
}