import React, { PureComponent, Fragment } from 'react';
import Toolbar from 'components/Toolbar';
import { Grid, Tab, Tabs, Card, Table, TableBody, TableCell, TableHead, TableRow, Button, CardContent } from '@material-ui/core';
import { WithStyles } from 'decorators/withStyles';
interface IState {
  currentTab: number;
  data: any[];
}

interface IProps {
  classes?: any;
}

@WithStyles({
  tableFloatButton: {
    float: 'right'
  }
})
export default class StudentListPage extends PureComponent<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = { currentTab: 0, data: [] };
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

    this.setState({ data });
  }

  onTabChange(event: any, tab: number) {
    this.setState({ currentTab: tab });
  }

  render() {
    const { currentTab, data } = this.state;
    const { classes } = this.props;

    return (
      <Fragment>
        <Toolbar title='Gerenciamento de Alunos' />
        <Card>
          <CardContent>
            <p>Filtro Esperto tchananam</p>

          </CardContent>
        </Card>
        <Card>
          <Grid container spacing={16}>
            <Grid item xs={10}>
              <Tabs value={currentTab} onChange={this.onTabChange.bind(this)}>
                <Tab label='Todos' />
                <Tab label='Ativos' />
              </Tabs>
            </Grid>
            <Grid item xs={2}>
              <Button
                color='secondary'
                size='medium'
                className={classes.tableFloatButton}>Exportar
                </Button>
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
                    <TableCell numeric>{n.actions}</TableCell>
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