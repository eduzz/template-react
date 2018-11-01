import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ErrorMessage from 'components/Shared/ErrorMessage';
import List from '@material-ui/core/List';
import CategoryItem from './ListItem';
import categoryService from 'services/category';
import rxjsOperators from 'rxjs-operators';
import { WithStyles } from 'decorators/withStyles';
import { ICategory } from 'interfaces/models/category';

interface IState {
  error?: any;
  categories?: ICategory[];
}

interface IProps {
  classes?: any;
}

@WithStyles({
  loader: {
    textAlign: 'center',
  },
})
export default class CategoriesList extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      categories: [],
      error: null,
    };
  }

  componentDidMount() {
    this.loadData();
    categoryService.loadCategories();
  }

  loadData = () => {
    this.setState({ error: null, categories: null });

    categoryService.getCategories().pipe(
      rxjsOperators.delay(1000),
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this),
    ).subscribe((categories: any) => {
      this.setState({ categories });
    }, (error: any) => this.setState({ error }));
  }

  render() {
    const { classes } = this.props;
    const { categories, error } = this.state;

    return (
      <Card>
        <CardContent>
          <Grid container spacing={16} alignItems='center'>
            <Grid item xs={true}>
              <Typography variant='subheading'>
                Listagem de Categorias
                </Typography>
            </Grid>

          </Grid>
        </CardContent>

        {!error && !categories &&
          <CardContent className={classes.loader}>
            <CircularProgress color='secondary' />
          </CardContent>
        }

        {!!error &&
          <CardContent>
            <ErrorMessage error={error} tryAgain={this.loadData} />
          </CardContent>
        }

        {!!categories &&
          <List disablePadding>
            {categories.map(category => (
              <CategoryItem
                key={category.id}
                category={category}
              />
            ))}
          </List>
        }
      </Card>
    );
  }
}