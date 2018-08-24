import {
  Button,
  CircularProgress,
  Divider,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
} from '@material-ui/core';
import DropdownMenu from 'components/Shared/DropdownMenu';
import ErrorMessage from 'components/Shared/ErrorMessage';
import IconMessage from 'components/Shared/IconMessage';
import { WithStyles } from 'decorators/withStyles';
import { dateFormat } from 'formatters/date';
import { ICertificate, ICertificateCourse } from 'interfaces/models/certificate';
import CertificateIcon from 'mdi-react/CertificateIcon';
import ChevronDownIcon from 'mdi-react/ChevronDownIcon';
import FormatListBulletedIcon from 'mdi-react/FormatListBulletedIcon';
import NewBoxIcon from 'mdi-react/NewBoxIcon';
import SquareEditOutlineIcon from 'mdi-react/SquareEditOutlineIcon';
import TrashCanIcon from 'mdi-react/TrashCanIcon';
import React, { Fragment, PureComponent, SyntheticEvent } from 'react';
import rxjsOperators from 'rxjs-operators';
import certificateService from 'services/certificate';

import CourseItem from './CourseItem';
import styles from './styles';

//import Alert from 'components/Shared/Alert';
interface IState {
  expanded: boolean;
  loadingError?: any;
  courses?: ICertificateCourse[];
}

interface IProps {
  classes?: any;
  certificate: ICertificate;
}

@WithStyles(styles)
export default class CertificateItem extends PureComponent<IProps, IState> {
  actions = [{
    text: 'Alterar cursos',
    icon: FormatListBulletedIcon,
    handler: () => this.expand(true),
  }, {
    text: 'Editar',
    icon: SquareEditOutlineIcon,
    handler: () => console.log('Editar'),
  }, {
    text: 'Excluir',
    icon: TrashCanIcon,
    handler: () => console.log('Excluir'),
  }];

  constructor(props: IProps) {
    super(props);
    this.state = { expanded: false };
  }

  handleClick = (e: SyntheticEvent) => {
    e.stopPropagation();
  }

  handleChange = (event: SyntheticEvent, expanded: boolean) => {
    this.expand(expanded);
  }

  expand = (expanded: boolean) => {
    this.setState({ expanded });

    if (this.state.courses) return;
    this.loadCourses();
  }

  loadCourses = () => {
    this.setState({ courses: null, loadingError: null });

    certificateService.getCourses(this.props.certificate.id).pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this)
    ).subscribe(data => {
      this.setState({ courses: data.results });
    }, loadingError => this.setState({ loadingError }));
  }

  onDeleteCourse = (course: ICertificateCourse) => {
    //const confirmation = Alert.show({ message: `Deseja excluir o curso ${course.title}?`, confirmation: true });
  }

  render() {
    const { classes, certificate } = this.props;
    const { expanded, courses, loadingError } = this.state;

    return (
      <ExpansionPanel expanded={expanded} onChange={this.handleChange}>
        <ExpansionPanelSummary expandIcon={<ChevronDownIcon />}>
          <div className={classes.crtIcon}><CertificateIcon /></div>

          <div className={classes.crtTitle}>
            <Typography className={classes.heading}>{certificate.title}</Typography>
            <Typography className={classes.created} component='paragraph'>
              <span>Criado em</span> <span className={classes.smallText}>{dateFormat(certificate.created_at, 'dd/MM/yyyy')}</span>
            </Typography>
          </div>

          <div className={classes.crtActions}>
            {
              expanded &&
              <Fragment>
                <Button onClick={this.handleClick} size='small' color='default'>Adicionar curso</Button>
              </Fragment>
            }
          </div>

          <div className={classes.crtDropdown}>
            <DropdownMenu options={this.actions} />
          </div>
        </ExpansionPanelSummary>

        <Divider />

        <ExpansionPanelDetails className={classes.details}>
          {!!loadingError &&
            <ErrorMessage error={loadingError} tryAgain={this.loadCourses} />
          }

          {!courses && !loadingError &&
            <div className={classes.loader}>
              <CircularProgress />
            </div>
          }

          {!!courses && courses.map(course =>
            <CourseItem key={course.id} course={course} onDelete={this.onDeleteCourse} />
          )}

          {!!courses && !courses.length &&
            <IconMessage icon={NewBoxIcon} message='Nenhum curso adicionado' />
          }
        </ExpansionPanelDetails>

      </ExpansionPanel>
    );
  }
}