import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from 'decorators/withStyles';
// import { dateFormat } from 'formatters/date';
import TagTextOutlineIcon from 'mdi-react/TagTextOutlineIcon';
import React, { PureComponent } from 'react';
import ListItem from '@material-ui/core/ListItem';
import { RouterContext } from 'components/Router';

interface IProps {
  classes?: any;
  category: any;
}

@WithStyles({
  root: {
    borderTop: 'solid 1px #d5d5d5',
  },
})
class CategoryItem extends PureComponent<IProps> {
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

export default React.forwardRef((props: IProps, ref: any) => (
  <RouterContext.Consumer>
    {router => <CategoryItem {...props} {...ref} />}
  </RouterContext.Consumer>
));