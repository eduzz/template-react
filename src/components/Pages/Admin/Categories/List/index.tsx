import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FieldSelect from '@react-form-fields/material-ui/components/Select';
import ErrorMessage from 'components/Shared/ErrorMessage';
import ArrowDownIcon from 'mdi-react/ArrowDownIcon';
import ArrowUpIcon from 'mdi-react/ArrowUpIcon';
import SortVariantIcon from 'mdi-react/SortVariantIcon';
import List from '@material-ui/core/List';
import CategoryItem from './ListItem';
import categoryService from 'services/category';
import rxjsOperators from 'rxjs-operators';
import { WithStyles } from 'decorators/withStyles';

interface IState {
  error?: any;
  categories?: any;
  orderBy: string;
  orderDirection: 'asc' | 'desc';
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
      orderBy: 'title',
      orderDirection: 'asc'
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    this.setState({ error: null, categories: null });
    const { orderBy, orderDirection } = this.state;

    categoryService.getCategories(orderBy, orderDirection).pipe(
      rxjsOperators.delay(1000),
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this),
    ).subscribe((categories: any) => {
      this.setState({ categories });
    }, (error: any) => this.setState({ error }));
  }

  handleChangeOrderBy = (orderBy: string) => {
    this.setState({ orderBy }, () => this.loadData());
  }

  toggleOrderDirection = () => {
    this.setState({ orderDirection: this.state.orderDirection === 'asc' ? 'desc' : 'asc' }, () => this.loadData());
  }

  render() {
    const { classes } = this.props;
    const { categories, error, orderBy, orderDirection } = this.state;

    return (
      <Card>
        <CardContent>
          <Grid container spacing={16} alignItems='center'>
            <Grid item xs={true}>
              <Typography variant='subheading'>
                Listagem de Categorias
                </Typography>
            </Grid>

            <Grid item xs={false}>
              <FieldSelect
                value={orderBy}
                options={[{ value: 'title', label: 'Título' }, { value: 'created_at', label: 'Data de criação' }]}
                onChange={this.handleChangeOrderBy}
                fullWidth={false}
                disabled={!error && !categories}
                margin='none'
              />
            </Grid>

            <Grid item xs={false}>
              <IconButton
                disabled={!error && !categories}
                onClick={this.toggleOrderDirection}
              >
                {orderDirection === 'asc' ? <ArrowDownIcon /> : <ArrowUpIcon />}
                <SortVariantIcon />
              </IconButton>
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
            {categories.map((category: any) => (
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