import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Toolbar from 'components/Layout/Toolbar';
import AppRouter, { RouterContext } from 'components/Router';
import ErrorMessage from 'components/Shared/ErrorMessage';
import { WithStyles } from 'decorators/withStyles';
import { IAuthor } from 'interfaces/models/author';
import PlusIcon from 'mdi-react/PlusIcon';
import React, { Fragment, PureComponent } from 'react';

import AuthorItem from './ListItem';

interface IState {
  authors?: IAuthor[];
  error?: any;
}

interface IProps {
  classes?: any;
  router?: AppRouter;
}

@WithStyles(theme => ({
  title: {
  },
  loader: {
    textAlign: 'center'
  }
}))
class AuthorIndexPage extends PureComponent<IProps, IState> {

  render() {
    const { classes } = this.props;
    const { authors, error } = this.state;

    return (
      <Fragment>
        <Toolbar>
          <Grid container spacing={16} alignItems='center'>
            <Grid item xs={true}>
              <Typography variant='h6' color='inherit' noWrap>Autores</Typography>
            </Grid>

            <Grid item xs={false}>
              <Button variant='contained' color='secondary'><PlusIcon /> Criar novo autor</Button>
            </Grid>
          </Grid>
        </Toolbar>

        <Card>
          {!error && !authors &&
            <CardContent className={classes.loader}>
              <CircularProgress color='secondary' />
            </CardContent>
          }

          {!!error &&
            <CardContent>
              <ErrorMessage error={error}/*  tryAgain={this.loadData} */ />
            </CardContent>
          }

          {!!authors && authors.map(author => (
            <AuthorItem key={author.id} author={author} />
          ))}
        </Card>
      </Fragment>
    );
  }
}

export default React.forwardRef((props: IProps, ref: any) => (
  <RouterContext.Consumer>
    {router => <AuthorIndexPage {...props} {...ref} router={router} />}
  </RouterContext.Consumer>
));