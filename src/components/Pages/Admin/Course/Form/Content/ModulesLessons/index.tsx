import React, { Fragment } from 'react';
import { WithStyles } from 'decorators/withStyles';

interface IProps {
  classes?: any;
}

@WithStyles({

})
export default class ModulesLessons extends React.PureComponent<IProps> {
  render() {
    // const { classes } = this.props;

    return (
      <Fragment>
        Modulos e Aulas
      </Fragment>
    );
  }
}