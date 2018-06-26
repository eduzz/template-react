import { Typography } from '@material-ui/core';
import Truncate from 'components/Truncate';
import { WithStyles } from 'decorators/withStyles';
import React, { PureComponent } from 'react';

const defaultImage = require('assets/images/default-course-img.png');
interface IProps {
  classes?: any;
  title: string;
  image?: string;
  category: string;
}
@WithStyles(theme => ({
  courseCard: {
    border: '1px solid #cecece',
  },
  cardImageWrapper: {
    minHeight: 185,
    width: '100%',
  },
  cardImage: {
    width: '100%',
    objectFit: 'cover',
    height: 185,
  },
  cardDescription: {
    padding: 8,
    textAlign: 'center',
  },
  cardTitle: {
    fontSize: theme.typography.fontSize,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardCategory: {
    fontSize: 12,
  }
}))

export default class CourseCard extends PureComponent<IProps, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.courseCard}>
        <div className={classes.cardImageWrapper}>
          <img
            className={classes.cardImage}
            src={this.props.image || defaultImage}
          />
        </div>
        <div className={classes.cardDescription}>
          <Typography className={classes.cardTitle}>
            <Truncate count={20} final='...'>{this.props.title}</Truncate>
          </Typography>
          <Typography className={classes.cardCategory}>{this.props.category}</Typography>
        </div>
      </div>
    );
  }
}
