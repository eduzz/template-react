import React from 'react';
import { WithStyles } from 'decorators/withStyles';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@react-form-fields/material-ui/components/Select';
import { IForm } from '../../..';
import categoryService from 'services/category';
import rxjsOperators from 'rxjs-operators';

interface IProps {
  classes?: any;
  form: IForm;
}

interface IState {
  categories: any;
  error: any;
  orderBy: string;
  orderDirection: string;
}

@WithStyles(theme => ({
  title: {
    fontSize: 18,
    fontWeight: 500,
  },
  content: {
    marginTop: 8,
    display: 'flex',
  },
  select: {
    width: 300,
  },
  selectContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
}))
export default class Category extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      categories: [],
      error: null,
      orderBy: 'title',
      orderDirection: 'asc'
    };
  }

  componentDidMount() {
    const { orderBy, orderDirection } = this.state;

    this.setState({
      error: null,
    });

    categoryService.getCategories(orderBy, orderDirection).pipe(
      rxjsOperators.logError(),
      rxjsOperators.loader(),
      rxjsOperators.bindComponent(this),
    ).subscribe((categories: any) => {
      this.setState({ categories });
    }, (error: any) => this.setState({ error }));
  }

  render() {
    const { classes, form } = this.props;
    const { categories, error } = this.state;

    return (
      <FormControl fullWidth>
        <label className={classes.title}>
          Categoria
        </label>
        <Grid container className={classes.content}>
          <Grid xs={12} item>
            <div className={classes.selectContainer}>
              <Select
                className={classes.select}
                value={categories.length ? form.model.category.id : ''}
                onChange={form.updateModel((model, v) => model.category = { ...model.category, id: v })}
                disabled={!categories.length}
                validation='required'
              >
                <MenuItem value=''>
                  Selecione uma categoria
                </MenuItem>
                {categories.map((category: any, index: number) =>
                  <MenuItem
                    key={index}
                    value={category.id}
                  >
                    {category.name}
                  </MenuItem>
                )}
              </Select>
              {error &&
                <MenuItem className={classes.errorContainer}>
                  <label className={classes.errorLabel}>
                    Ops... Algo errado não está certo ;(
                    </label>
                </MenuItem>
              }
            </div>
          </Grid>
        </Grid>
      </FormControl>
    );
  }
}