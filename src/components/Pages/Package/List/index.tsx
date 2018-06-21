import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import DropdownMenu from 'components/DropdownMenu';
import FabButton from 'components/FabButton';
import { RouterContext } from 'components/Router';
import Toolbar from 'components/Toolbar';
import { WithStyles } from 'decorators/withStyles';
import ExitToAppIcon from 'mdi-react/ExitToAppIcon';
import KeyVariantIcon from 'mdi-react/KeyVariantIcon';
import PlusIcon from 'mdi-react/PlusIcon';
import React, { Fragment, PureComponent } from 'react';

import CourseCard from '../../../CourseCard';

interface IState {

}

interface IProps {
  classes?: any;
}

@WithStyles(theme => ({

}))

export default class PackageListPage extends PureComponent<IProps, IState> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {

    this.setState({});
  }

  render() {

    return (
      <Fragment>
        <Toolbar title='Pacotes' />
        <RouterContext.Consumer>
          {getRouter =>
            <FabButton actions={[{
              icon: PlusIcon,
              tooltip: 'Novo Pacote',
              onClick: () => getRouter().navigate('/packages/new')
            }]} />
          }
        </RouterContext.Consumer>
        <Card>
          <CardContent>
            <Grid container>
              <Grid item xs={11}>
                <Typography>Pacote title</Typography>
              </Grid>
              <Grid item xs={1}>
                <DropdownMenu options={[{
                  text: 'Resetar a Senha',
                  icon: KeyVariantIcon,
                  handler: () => { }
                }, {
                  text: 'Editar Aluno',
                  icon: ExitToAppIcon,
                  handler: () => { }
                }]} />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={2}>
                <CourseCard />
              </Grid>
            </Grid>

          </CardContent>
        </Card>

      </Fragment >
    );

  }
}