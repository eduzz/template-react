import List from '@material-ui/core/List';
import { WithStyles } from 'decorators/withStyles';
import { IBanner } from 'interfaces/models/banner';
import React, { PureComponent } from 'react';
import { SortableContainer } from 'react-sortable-hoc';

import BannerItem from './BannerItem';

interface IProps {
  banners: IBanner[];
  classes?: any;
}

@WithStyles({
  root: {
    padding: 8,
    backgroundColor: '#fff',
  },
  addForm: {
    paddingTop: 8,
  },
})
class ListContainer extends PureComponent<IProps> {
  render() {
    const { banners, classes } = this.props;

    return (
      <List className={classes.root}>
        {banners.map((banner: IBanner, index: number) => (
          <BannerItem
            banner={banner}
            key={`item-${banner.id}`}
            index={index}
          />
        ))}
      </List>
    );
  }
}

export default SortableContainer(ListContainer);