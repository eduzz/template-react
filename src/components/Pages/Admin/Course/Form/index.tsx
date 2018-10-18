import React from 'react';
import Toolbar from 'components/Layout/Toolbar';
import Grid from '@material-ui/core/Grid';
import { WithStyles } from 'decorators/withStyles';
import Info from './Info';
import Content from './Content';

export const CourseFormContext = React.createContext({});

interface IProps {
  classes?: any;
}
@WithStyles(theme => ({
  container: {
    padding: 16,
  },
}))
export default class Form extends React.PureComponent<IProps> {
  constructor(props: IProps) {
    super(props);

    this.state = {};
  }

  render() {
    // const { classes } = this.props;

    return (
      <CourseFormContext.Provider value={this.state}>
        <Toolbar title='Curso' />

        <Grid container>
          <Grid item xs={12}>
            <Info />
          </Grid>
          <Grid item xs={12}>
            <Content />
          </Grid>
        </Grid>
      </CourseFormContext.Provider>
    );
  }
}