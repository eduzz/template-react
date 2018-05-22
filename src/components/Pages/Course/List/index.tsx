import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@material-ui/core';
import FabButton from 'components/FabButton';
import Toolbar from 'components/Toolbar';
import { WithStyles } from 'decorators/withStyles';
import { IAppRoute } from 'interfaces/route';
import { PlusIcon } from 'mdi-react';
import React, { Fragment, PureComponent } from 'react';

import { RouterContext } from '../../../Router';

@WithStyles({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
})
export default class CourseListPage extends PureComponent<{ classes?: any }> {
  public static routes: IAppRoute[] = [];

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <Toolbar title='Cursos' />

        <RouterContext.Consumer>
          {getRouter =>
            <FabButton actions={[{
              icon: PlusIcon,
              tooltip: 'Novo curso',
              onClick: () => getRouter().navigate('/course/new')
            }]} />
          }
        </RouterContext.Consumer>

        <Grid container>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardMedia
                className={classes.media}
                image='http://visitebalneariocamboriu.com.br/wp-content/uploads/2017/08/Cursos.jpg'
              />
              <CardContent>
                <Typography gutterBottom variant='headline' component='h2'>
                  Lizard
                </Typography>
                <Typography component='p'>
                  Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                  across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions>
                <Button size='small'>Share </Button>
                <Button size='small'> Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}