import {
  Button,
  Card,
  CardContent,
  Chip,
  Collapse,
  Grid,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from '@material-ui/core';
import DropdownMenu from 'components/DropdownMenu';
import Toolbar from 'components/Toolbar';
import { WithStyles } from 'decorators/withStyles';
import { FieldSelect } from 'material-ui-form-fields';
import { AccountAlertIcon, AccountCheckIcon, AccountMultipleIcon, AccountMultiplePlusIcon } from 'mdi-react';
import ExitToAppIcon from 'mdi-react/ExitToAppIcon';
import KeyVariantIcon from 'mdi-react/KeyVariantIcon';
import React, { Fragment, PureComponent } from 'react';

interface IState {
  currentTab: number;
  data: any[];
  chipContent: any[];
  event: any[];
  isFilterOpen: boolean;
}

interface IProps {
  classes?: any;
}

@WithStyles(theme => ({
  rightFloatButton: {
    float: 'right',
  },
  filter: {
    backgroundColor: '#fafafa',
    borderBottom: '1px solid #cecece',
  },
  filterContent: {
    padding: '8px 16px',
  },
  filterTags: {
    backgroundColor: '#fff',
    border: '1px dashed #cecece',
    marginTop: 24,
  },
  chip: {
    marginRight: theme.spacing.unit / 2,
  },
  cardTitle: {
    fontSize: '0.85rem',
    fontWeight: 'bold',
  },
  cardData: {
    fontSize: '2rem',
    textAlign: 'right',
    color: theme.palette.primary.dark,
  },
  cardDataNegative: {
    color: theme.variables.color.error,
  },
  cardDataPositive: {
    color: theme.variables.color.sucess,
  },
  cardIcon: {
    fill: theme.palette.primary.dark,
    marginRight: theme.spacing.unit,
    height: '2rem',
    width: '2rem',
  },
  cardIconNegative: {
    fill: theme.variables.color.error,
  },
  cardIconPositive: {
    fill: theme.variables.color.sucess,
  },
  studentsResume: {
    marginBottom: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 3,
  }
}))

export default class StudentListPage extends PureComponent<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = { currentTab: 0, data: [], chipContent: [], event: [], isFilterOpen: false };
  }

  componentDidMount() {
    let id = 0;

    function createData(registration: number, name: string, beginDate: string, progress: string, actions: number) {
      id += 1;
      return { id, registration, name, beginDate, progress, actions };
    }
    const data = [
      createData(1233, 'Will Bernardo', '12/12/23', '24%', 40),
      createData(1234, 'Daniel Prado', '12/12/23', '37%', 43),
      createData(54647, 'Carla Annunciato', '12/12/23', '24%', 60),
      createData(789789, 'Michel Makei', '12/12/23', '67%', 43),
      createData(98, 'Henrique Gomes', '12/12/23', '49%', 39),
    ];
    const chipContent = [
      { key: 0, label: 'Curso' },
      { key: 1, label: 'Data de Inicio' },
      { key: 2, label: 'Progresso' },
      { key: 3, label: 'Status:Inativo' },
      { key: 4, label: 'Matricula: 2344' }
    ];

    this.setState({ data, chipContent });
  }

  onTabChange(event: any, tab: number) {
    this.setState({ currentTab: tab });
  }

  handleDelete = (data: any) => () => {
    const chipContent = this.state.chipContent.filter(c => c != data);
    this.setState({ chipContent });
  }
  handleToggleFilter = (e: any) => {
    e.preventDefault();
    this.setState({
      isFilterOpen: !this.state.isFilterOpen,
    });
  }
  render() {
    const { currentTab, data } = this.state;
    const { classes } = this.props;

    return (
      <Fragment>
        <Toolbar title='Gerenciamento de Alunos' />
        <Grid container spacing={16} className={classes.studentsResume}>
          <Grid item xs={3}>
            <Card>
              <CardContent>
                <Typography className={`${classes.cardTitle} ${classes.cardDataPositive}`}>Novos Alunos nos ultimos 30d</Typography>
                <Typography className={`${classes.cardData} ${classes.cardDataPositive}`}>
                  <AccountMultiplePlusIcon className={`${classes.cardIcon} ${classes.cardIconPositive}`} />187</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card>
              <CardContent>
                <Typography className={classes.cardTitle}>Alunos Ativos</Typography>
                <Typography className={classes.cardData}> <AccountCheckIcon className={classes.cardIcon} />23554</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card>
              <CardContent>
                <Typography className={`${classes.cardTitle} ${classes.cardDataNegative}`}>Alunos Inativos</Typography>
                <Typography className={`${classes.cardData} ${classes.cardDataNegative}`}>
                  <AccountAlertIcon className={`${classes.cardIcon} ${classes.cardIconNegative}`} />
                  322
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card>
              <CardContent>
                <Typography className={classes.cardTitle}>Total de Alunos</Typography>
                <Typography className={classes.cardData}> <AccountMultipleIcon className={classes.cardIcon} />21345</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Card>
          <Grid container spacing={16}>
            <Grid item xs={6} sm={8} md={10}>
              <Tabs value={currentTab} onChange={this.onTabChange.bind(this)}>
                <Tab label='Todos' />
                <Tab label='Ativos' />
              </Tabs>
            </Grid>
            <Grid item xs={3} sm={2} md={1}>
              <Button
                color='primary'
                size='medium'
                onClick={this.handleToggleFilter}
                className={`${classes.rightFloatButton} ${this.state.isFilterOpen ? 'active' : ''}`}>Filtrar
                </Button>
            </Grid>
            <Grid item xs={3} sm={2} md={1}>
              <Button
                color='secondary'
                size='medium'
                className={classes.rightFloatButton}>Exportar
                </Button>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Collapse className={classes.filter} in={this.state.isFilterOpen}>
                <CardContent className={classes.filterContent}>
                  <Grid container spacing={16} alignItems='center'>
                    <Grid item xs={4}>
                      <FieldSelect
                        label='Filtrar por:'
                        options={[
                          { value: 1, label: 'Cursos' },
                          { value: 2, label: 'Nome' },
                          { value: 3, label: 'Matricula' }
                        ]}
                        value={1}
                        onChange={() => null}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <FieldSelect
                        label='Selecione o Curso'
                        options={[
                          { value: 1, label: 'Marketex - Como criar videos profissionais' },
                          { value: 2, label: 'Curso de Photoshop' },
                          { value: 3, label: 'React RxJS' }
                        ]}
                        value={1}
                        onChange={() => null}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Button
                        color='secondary'
                        variant='raised'
                        size='medium'>Adicionar Filtro
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid container spacing={16} >
                    <Grid item xs={12} className={classes.filterTags}>
                      {this.state.chipContent.map(data => {

                        return (
                          <Chip
                            key={data.key}
                            label={data.label}
                            onDelete={this.handleDelete(data)}
                            className={classes.chip}
                          />
                        );
                      })}
                      <Button
                        color='secondary'
                        className={classes.rightFloatButton}>
                        Limpar Filtros
                        </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Collapse>

            </Grid>
          </Grid>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Matricula</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Data Inicio</TableCell>
                <TableCell>Progresso</TableCell>
                <TableCell numeric>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(n => {
                return (
                  <TableRow key={n.id}>
                    <TableCell>
                      {n.registration}
                    </TableCell>
                    <TableCell>{n.name}</TableCell>
                    <TableCell>{n.beginDate}</TableCell>
                    <TableCell>{n.progress}</TableCell>
                    <TableCell numeric>
                      <DropdownMenu options={[{
                        text: 'Resetar a Senha',
                        icon: KeyVariantIcon,
                        handler: () => { }
                      }, {
                        text: 'Editar Aluno',
                        icon: ExitToAppIcon,
                        handler: () => { }
                      }]} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      </Fragment>
    );

  }
}