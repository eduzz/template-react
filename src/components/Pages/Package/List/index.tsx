import { Button, Card, CardContent, Grid, Typography } from '@material-ui/core';
import FabButton from 'components/FabButton';
import { RouterContext } from 'components/Router';
import Toolbar from 'components/Toolbar';
import { WithStyles } from 'decorators/withStyles';
import PlusIcon from 'mdi-react/PlusIcon';
import React, { Fragment, PureComponent } from 'react';

import CourseCard from '../../../CourseCard';

interface IState {
  items: { id: number, image: string, title: string, category: string }[];
}

interface IProps {
  classes?: any;
}

@WithStyles(theme => ({
  package: {
    borderTop: '1px solid #cecece',
  },
  packageAction: {
    float: 'right',
  },
  packageTitle: {
    fontSize: theme.typography.fontSize * 1.5,
    fontWeight: 'bold',
  },
  cardWrapper: {
    paddingTop: theme.spacing.unit * 2,
  }
}))

export default class PackageListPage extends PureComponent<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      items: [
        {
          id: 0, image: '//app.nutror.com/file/Uploads/60610/aprenda_bolsa_identificacao.png',
          title: 'Bolsa de Valores', category: 'Contabilidade Economia'
        },
        {
          id: 1, image: '//app.nutror.com/file/Uploads/8460/estudos-de-caso/200x200_aprenda_piano.jpg',
          title: 'Estudo de Caso Aprenda Piano', category: 'Tecnologia e Inovação'
        },
        {
          id: 2, image: '//app.nutror.com/file/Uploads/8460/estudos-de-caso/200x200_ATOM_SA.jpg',
          title: 'Estudo de Caso Atom SA', category: 'Tecnologia e Inovação'
        },
        {
          id: 3, image: '//app.nutror.com/file/Uploads/8460/lancamento-descomplicado/200x200_identificacao_lancamento_descomlipcado.jpg',
          title: 'Lançamento Descomplicado', category: 'Tecnologia e Inovação'
        },
        {
          id: 4, image: '//app.nutror.com/file/Uploads/990/GuitarTracks/IdentificaoDoCurso.jpg',
          title: 'Guitar Tracks', category: 'Tecnologia e Inovação'
        },
        {
          id: 5, image: '//app.nutror.com/file/Uploads/8908/FNT/forronoteclado.png',
          title: 'Forró no Teclado', category: 'Tecnologia e Inovação'
        }
      ]
    };
  }

  componentDidMount() {

    this.setState({});
  }

  render() {
    const { items } = this.state;
    const { classes } = this.props;
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
        <Card className={classes.package}>
          <CardContent>
            <Grid container>
              <Grid item xs={10}>
                <Typography className={classes.packageTitle}>Pacote de Cursos de Tecnologia e Inovação</Typography>
              </Grid>
              <Grid item xs={2}>
                <Button color='secondary' className={classes.packageAction}>Editar Pacote</Button>

              </Grid>
            </Grid>
            <Grid container spacing={8} className={classes.cardWrapper}>
              {items.map(item =>
                <Grid item xs={4} md={4} lg={2} key={item.id}>
                  <CourseCard title={item.title} category={item.category} image={item.image} />
                </Grid>
              )}
            </Grid>

          </CardContent>
        </Card>

      </Fragment >
    );

  }
}