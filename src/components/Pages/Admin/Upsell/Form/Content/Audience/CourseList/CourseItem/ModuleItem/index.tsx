import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { IUpsellFormContext, UpsellFormContext } from 'components/Pages/Admin/Upsell/Form/Context';
import { WithStyles } from 'decorators/withStyles';
import { IModule } from 'interfaces/models/module';
import React, { PureComponent, SyntheticEvent } from 'react';

import LessonItem from './LessonItem';

interface IProps {
  module: IModule;
  classes?: any;
}

@WithStyles(theme => ({
  root: {
    padding: 0,
    paddingLeft: theme.spacing.unit * 3,
  },
  title: {
    display: 'flex',
    alignItems: 'center',
  },
  checkbox: {
    marginTop: -theme.spacing.unit,
    marginBottom: -theme.spacing.unit,
  },
}))
export default class ModuleItem extends PureComponent<IProps> {
  static contextType = UpsellFormContext;
  context: IUpsellFormContext;

  handleClick = (e: SyntheticEvent) => {
    e.stopPropagation();

    this.context.updateModel(model => {
      model.courses = [
        ...model.courses.map(course => ({
          ...course,
          modules: course.modules.map(module => {
            if (module.id === this.props.module.id)
              return {
                ...module,
                checked: !module.checked,
                lessons: module.lessons.map(lesson => ({
                  ...lesson,
                  checked: !module.checked,
                })),
              };
            return module;
          }),
        })),
      ];
    })();
  }

  getIndeterminatedStatus = () => {
    const { lessons } = this.props.module;

    return lessons.some(lesson => lesson.checked) && lessons.some(lesson => !lesson.checked);
  }

  render() {
    const { module, classes } = this.props;

    return (
      <ListItem className={classes.root} onClick={this.handleClick}>
        <Grid container direction='column'>
          <Grid item>
            <Grid container alignContent='center'>
              <Grid item>
                <Checkbox
                  id={`selecionaModulo${(module.title).replace(/ /g, '')}`}
                  className={classes.checkbox}
                  checked={module.checked}
                  indeterminate={this.getIndeterminatedStatus()}
                />
              </Grid>
              <Grid item className={classes.title}>
                <Typography variant='body2'>{module.title}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <List disablePadding>
              {(module.lessons || []).map((lesson, index) =>
                <LessonItem key={index} lesson={lesson} />
              )}
            </List>
          </Grid>
        </Grid>
      </ListItem>
    );
  }
}