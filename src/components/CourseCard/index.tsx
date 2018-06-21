import { WithStyles } from 'decorators/withStyles';
import React, { PureComponent } from 'react';

const defaultImage = require('assets/images/default-course-img.png');
interface Iprops {
  classes?: any;
}
@WithStyles(theme => ({
  courseCard: {
    border: '1px solid red',
  }
}))

export default class CourseCard extends PureComponent<Iprops, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.courseCard}>
        <div className={classes.cardImage}>
          <img
            src={defaultImage}
          />
        </div>
        <div className='card-description'>
          <p className='card-title'>Titulo do curso</p>
          <p className='card-category'>Tecnologia e Inovação</p>
        </div>
      </div>
    );
  }
}
