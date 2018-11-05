import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ErrorMessage from 'components/Shared/ErrorMessage';
import List from '@material-ui/core/List';
import ModuleItem from './ModuleItem';
// import categoryService from 'services/category';
// import rxjsOperators from 'rxjs-operators';
import { WithStyles } from 'decorators/withStyles';

interface IState {
  error?: any;
  modules?: any;
}

interface IProps {
  classes?: any;
}

@WithStyles({
  loader: {
    textAlign: 'center',
  },
})
export default class ModuleList extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      modules: null,
      error: null,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    // this.setState({ error: null, categories: null });

    // categoryService.getCategories().pipe(
    //   rxjsOperators.delay(1000),
    //   rxjsOperators.logError(),
    //   rxjsOperators.bindComponent(this),
    // ).subscribe((categories: any) => {
    //   this.setState({ categories });
    // }, (error: any) => this.setState({ error }));
  }

  render() {
    const { classes } = this.props;
    const { modules, error } = this.state;

    return (
      <Card>
        <CardContent>
          <Grid container spacing={16} alignItems='center'>
            <Grid item xs={true}>
              <Typography variant='subheading'>
                Listagem de Módulos e Aulas
              </Typography>
            </Grid>

          </Grid>
        </CardContent>

        {!error && !modules &&
          <CardContent className={classes.loader}>
            <CircularProgress color='secondary' />
          </CardContent>
        }

        {!!error &&
          <CardContent>
            <ErrorMessage error={error} tryAgain={this.loadData} />
          </CardContent>
        }

        {!!modules &&
          <List disablePadding>
            {modules.map((module: any) => (
              <ModuleItem
                key={module.id}
                module={module}
              />
            ))}
          </List>
        }
      </Card>
    );
  }
}