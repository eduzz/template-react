import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AppRouter, { RouterContext } from 'components/Router';
import Confirm from 'components/Shared/Confirm';
import DropdownMenu from 'components/Shared/DropdownMenu';
import Snackbar from 'components/Shared/Snackbar';
import { WithStyles } from 'decorators/withStyles';
import { dateFormat } from 'formatters/date';
import { ICertificate } from 'interfaces/models/certificate';
import CertificateIcon from 'mdi-react/CertificateIcon';
import ChevronDownIcon from 'mdi-react/ChevronDownIcon';
import FormatListBulletedIcon from 'mdi-react/FormatListBulletedIcon';
import SquareEditOutlineIcon from 'mdi-react/SquareEditOutlineIcon';
import TrashCanIcon from 'mdi-react/TrashCanIcon';
import React, { PureComponent, SyntheticEvent } from 'react';
import rxjsOperators from 'rxjs-operators';
import certificateService from 'services/certificate';

import Courses from './Courses';

interface IState {
  expanded: boolean;
  firstExpanded: boolean;
}

interface IProps {
  classes?: any;
  certificate: ICertificate;
  router?: AppRouter;
}

@WithStyles({
  buttonHidden: {
    visibility: 'hidden'
  }
})
class CertificateItem extends PureComponent<IProps, IState> {
  actions = [{
    text: 'Alterar cursos',
    icon: FormatListBulletedIcon,
    handler: () => this.setExpanded(true),
  }, {
    text: 'Editar',
    icon: SquareEditOutlineIcon,
    handler: () => this.props.router.navigate(`/certificados/${this.props.certificate.id}/editar`),
  }, {
    text: 'Excluir',
    icon: TrashCanIcon,
    handler: () => this.handleDelete(),
  }];

  constructor(props: IProps) {
    super(props);
    this.state = { expanded: false, firstExpanded: false };
  }

  handleAddCourse = (e: SyntheticEvent) => {
    e.stopPropagation();
    certificateService.openAddCourse(this.props.certificate.id);
  }

  handleChange = (event: SyntheticEvent, expanded: boolean) => {
    this.setExpanded(expanded);
  }

  handleDelete = async () => {
    const { certificate } = this.props;

    const confirm = await Confirm.show(`Deseja excluir o certificado ${certificate.title}?`);
    if (!confirm) return;

    certificateService.delete(certificate.id).pipe(
      rxjsOperators.loader(),
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this)
    ).subscribe(() => {
      Snackbar.show('Certificado excluído com sucesso');
    }, err => Snackbar.error(err));
  }

  setExpanded = (expanded: boolean) => {
    this.setState({
      expanded,
      firstExpanded: expanded || this.state.firstExpanded
    });
  }

  render() {
    const { certificate, classes } = this.props;
    const { expanded, firstExpanded } = this.state;

    return (
      <ExpansionPanel expanded={expanded} onChange={this.handleChange}>
        <ExpansionPanelSummary expandIcon={<ChevronDownIcon />}>
          <Grid container spacing={16} alignItems='center'>
            <Grid item xs={false}>
              <CertificateIcon />
            </Grid>

            <Grid item xs={true}>
              <Typography variant='subheading'>{certificate.title}</Typography>
            </Grid>

            <Grid item xs={false}>
              <Typography variant='caption'>Criado em</Typography>
              <Typography variant='caption'>{dateFormat(certificate.created_at, 'dd/MM/yyyy')}</Typography>
            </Grid>

            <Grid item xs={false}>
              <Button
                className={expanded ? null : classes.buttonHidden}
                onClick={this.handleAddCourse}
                size='small'
                color='default'
              >
                Vincular curso
              </Button>
            </Grid>

            <Grid item xs={false}>
              <DropdownMenu options={this.actions} />
            </Grid>
          </Grid>

        </ExpansionPanelSummary>

        <Divider />

        <ExpansionPanelDetails>
          {firstExpanded &&
            <Courses certificate={certificate} />
          }
        </ExpansionPanelDetails>

      </ExpansionPanel>
    );
  }
}

export default React.forwardRef((props: IProps, ref: any) => (
  <RouterContext.Consumer>
    {router => <CertificateItem {...props} {...ref} router={router} />}
  </RouterContext.Consumer>
));