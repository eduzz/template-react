import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import DropdownMenu from 'components/Shared/DropdownMenu';
import { WithStyles } from 'decorators/withStyles';
import CertificateIcon from 'mdi-react/CertificateIcon';
import ChevronDownIcon from 'mdi-react/ChevronDownIcon';
import FormatListBulletedIcon from 'mdi-react/FormatListBulletedIcon';
import SquareEditOutlineIcon from 'mdi-react/SquareEditOutlineIcon';
import TrashCanIcon from 'mdi-react/TrashCanIcon';
import React, { PureComponent } from 'react';

import CourseItem from './CourseItem';

interface IState {
}

interface IProps {
  classes?: any;
}

@WithStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  created: {
    display: 'flex',
    flexDirection: 'column',
    justifyContentc: 'center',
    paddingLeft: '40px',
    color: '#7A8999',
    lineHeight: '120%',
  },
  smallText: {
    fontSize: '80%',
  },
  details: {
    display: 'block',
    padding: 0,
  },
  crtItem: {
    flexBasis: '100%',
    display: 'flex',
    alignItems: 'center',
    '&:hover': { backgroundColor: 'rgba(0,0,0,.02)', },
  },
  crtIcon: {
    flexBasis: '40px',
    display: 'flex',
    alignItems: 'center',
  },
  crtTitle: {
    flexBasis: 'calc(70% - 40px)',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '10px',
  },
  crtActions: {
    flexBasis: 'calc(30% - 100px)',
    textAlign: 'right',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  crtDropdown: {
    flexBasis: '100px',
    textAlign: 'right',
  },
}))

export default class CertificateItem extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  actions = [{
    text: 'Alterar cursos',
    icon: FormatListBulletedIcon,
    handler: () => console.log('Alterar cursos'),
  }, {
    text: 'Editar',
    icon: SquareEditOutlineIcon,
    handler: () => console.log('Editar'),
  }, {
    text: 'Excluir',
    icon: TrashCanIcon,
    handler: () => console.log('Excluir'),
  }];

  handleClick = (e: any) => {
    e.stopPropagation();
  }

  render() {
    const { classes } = this.props;

    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ChevronDownIcon />}>
          <div className={classes.crtIcon}><CertificateIcon /></div>
          <div className={classes.crtTitle}>
            <Typography className={classes.heading}>Nome do certificado</Typography>
            <Typography className={classes.created} component='paragraph'>
              <span>Criado em</span> <span className={classes.smallText}>01/01/2018</span>
            </Typography>
          </div>
          <div className={classes.crtActions}>
            <Button onClick={this.handleClick} size='small' color='default'>Adicionar</Button>
            <Button onClick={this.handleClick} size='small' color='secondary'>Remover</Button>
          </div>
          <div className={classes.crtDropdown}>
            <DropdownMenu options={this.actions} />
          </div>
        </ExpansionPanelSummary>
        <Divider />
        <ExpansionPanelDetails className={classes.details}>
          <CourseItem />
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button size='small'>Cancelar</Button>
          <Button size='small' color='primary'>Salvar</Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    );
  }
}