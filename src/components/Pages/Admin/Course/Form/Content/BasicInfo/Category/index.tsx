import React from 'react';
import { WithStyles } from 'decorators/withStyles';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import Select from '@react-form-fields/material-ui/components/Select';
import { IForm } from '../../..';

interface IProps {
  classes?: any;
  form: IForm;
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
export default class Category extends React.PureComponent<IProps> {
  render() {
    const { classes, form } = this.props;
    const categories = [
      {
        id: 1,
        title: 'Categoria 1',
      },
      {
        id: 2,
        title: 'Categoria 2',
      },
      {
        id: 3,
        title: 'Categoria 3',
      },
    ];

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
                value={categories.length ? form.model.category : ''}
                onChange={form.updateModel((model, v) => model.category = v)}
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
                    {category.title}
                  </MenuItem>
                )}
              </Select>
              {!categories.length &&
                <div className={classes.progressContainer}>
                  <CircularProgress
                    size={25}
                    color='secondary'
                    className={classes.progress}
                  />
                </div>
              }
            </div>
          </Grid>
        </Grid>
      </FormControl>
    );
  }
}