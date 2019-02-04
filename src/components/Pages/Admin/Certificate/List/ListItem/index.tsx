import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import { theme } from 'assets/theme';
import Confirm from 'components/Shared/Confirm';
import DropdownMenu from 'components/Shared/DropdownMenu';
import OptionItem from 'components/Shared/DropdownMenu/OptionItem';
import Toast from 'components/Shared/Toast';
import { IRouteProps, WithRouter } from 'decorators/withRouter';
import { WithStyles } from 'decorators/withStyles';
import { dateFormat } from 'formatters/date';
import { ICertificate } from 'interfaces/models/certificate';
import CertificateIcon from 'mdi-react/CertificateIcon';
import ChevronDownIcon from 'mdi-react/ChevronDownIcon';
import FormatListBulletedIcon from 'mdi-react/FormatListBulletedIcon';
import SquareEditOutlineIcon from 'mdi-react/SquareEditOutlineIcon';
import TrashCanIcon from 'mdi-react/TrashCanIcon';
import React, { PureComponent, SyntheticEvent } from 'react';
import RxOp from 'rxjs-operators';
import certificateService from 'services/certificate';

import Courses from './Courses';

interface IState {
  expanded: boolean;
  firstExpanded: boolean;
}

interface IProps extends IRouteProps {
  classes?: any;
  certificate: ICertificate;
}

@WithRouter()
@WithStyles({
  buttonHidden: {
    visibility: 'hidden'
  },
  defaultCertificate: {
    fill: '#f5d504',
  },
  dropMenu: {
    [theme.breakpoints.only('xs')]: {
      marginLeft: 42,
    },
  },
  chevron: {
    [theme.breakpoints.only('xs')]: {
      marginTop: 70,
    },
  }
})
export default class CertificateItem extends PureComponent<IProps, IState> {
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

  handleEdit = () => {
    this.props.history.push(`/certificados/${this.props.certificate.id}/editar`);
  }

  handleDelete = async () => {
    const { certificate } = this.props;

    const confirm = await Confirm.show(`Deseja excluir o certificado ${certificate.title}?`);
    if (!confirm) return;

    certificateService.delete(certificate.id).pipe(
      RxOp.loader(),
      RxOp.logError(),
      RxOp.bindComponent(this)
    ).subscribe(() => {
      Toast.show('Certificado excluído com sucesso');
    }, err => Toast.error(err));
  }

  setExpandedTrue = () => this.setExpanded(true);
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
      <ExpansionPanel elevation={0} expanded={expanded} onChange={this.handleChange}>
        <ExpansionPanelSummary expandIcon={<ChevronDownIcon />}>
          <Grid container spacing={16} alignItems='center'>
            <Grid item xs={window.innerWidth > theme.breakpoints.values.sm ? false : 2}>
              <CertificateIcon className={certificate.default && classes.defaultCertificate} />
            </Grid>

            <Grid item xs={window.innerWidth > theme.breakpoints.values.sm ? true : 7}>
              <Typography variant='subtitle1'>{certificate.title}</Typography>
            </Grid>

            <Hidden smUp>
              <Grid item xs={window.innerWidth > theme.breakpoints.values.sm ? false : 3}>
                <div className={classes.dropMenu}>
                  <DropdownMenu>
                    <OptionItem text='Vincular cursos' icon={FormatListBulletedIcon} handler={this.setExpandedTrue} />
                    <OptionItem text='Editar' icon={SquareEditOutlineIcon} handler={this.handleEdit} />
                    <OptionItem text='Excluir' icon={TrashCanIcon} handler={this.handleDelete} />
                  </DropdownMenu>
                </div>
              </Grid>
            </Hidden>

            <Grid item xs={window.innerWidth > theme.breakpoints.values.sm ? false : 6}>
              <Typography variant='caption'>Criado em</Typography>
              <Typography variant='caption'>{dateFormat(certificate.created_at, 'dd/MM/yyyy')}</Typography>
            </Grid>

            <Grid item xs={window.innerWidth > theme.breakpoints.values.sm ? false : 6}>
              <Button
                className={expanded ? null : classes.buttonHidden}
                onClick={this.handleAddCourse}
                size='small'
                color='default'
              >
                Vincular curso
              </Button>
            </Grid>

            <Hidden xsDown>
              <Grid item xs={window.innerWidth > theme.breakpoints.values.sm ? false : 4}>
                <DropdownMenu>
                  <OptionItem text='Vincular cursos' icon={FormatListBulletedIcon} handler={this.setExpandedTrue} />
                  <OptionItem text='Editar' icon={SquareEditOutlineIcon} handler={this.handleEdit} />
                  <OptionItem text='Excluir' icon={TrashCanIcon} handler={this.handleDelete} />
                </DropdownMenu>
              </Grid>
            </Hidden>
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