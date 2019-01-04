import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from 'decorators/withStyles';
import { ICategory } from 'interfaces/models/category';
import TagTextOutlineIcon from 'mdi-react/TagTextOutlineIcon';
import React, { PureComponent } from 'react';

interface IProps {
  classes?: any;
  category: ICategory;
}

@WithStyles({
  root: {
    borderTop: 'solid 1px #d5d5d5',
  },
})
export default class CategoryItem extends PureComponent<IProps> {
  render() {
    const { category, classes } = this.props;

    return (
      <ListItem className={classes.root}>
        <Grid container spacing={16} alignItems='center'>
          <Grid item xs={false}>
            <TagTextOutlineIcon />
          </Grid>

          <Grid item xs={true}>
            <Typography variant='subheading'>{category.name}</Typography>
          </Grid>

          {/* <Grid item xs={false}>
            <Typography variant='caption'>Criado em</Typography>
            <Typography variant='caption'>{dateFormat(category.created_at, 'dd/MM/yyyy')}</Typography>
          </Grid> */}
        </Grid>
      </ListItem>
    );
  }
}