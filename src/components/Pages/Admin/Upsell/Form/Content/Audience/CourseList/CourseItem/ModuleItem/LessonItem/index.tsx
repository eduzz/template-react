import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { IUpsellFormContext, UpsellFormContext } from 'components/Pages/Admin/Upsell/Form/Context';
import { WithStyles } from 'decorators/withStyles';
import { ILesson } from 'interfaces/models/lesson';
import React, { PureComponent, SyntheticEvent } from 'react';

interface IProps {
  lesson: ILesson;
  classes?: any;
}

@WithStyles(theme => ({
  root: {
    padding: 0,
    paddingLeft: theme.spacing.unit * 4,
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
export default class LessonItem extends PureComponent<IProps> {
  static contextType = UpsellFormContext;
  context: IUpsellFormContext;

  handleClick = (e: SyntheticEvent) => {
    e.stopPropagation();

    this.context.updateModel(model => {
      model.courses = [
        ...model.courses.map(course => ({
          ...course,
          modules: course.modules.map(module => {
            if (module.id !== this.props.lesson.module_id)
              return module;

            const lessons = module.lessons.map(lesson => {
              if (lesson.id === this.props.lesson.id)
                return {
                  ...lesson,
                  checked: !lesson.checked,
                };
              return lesson;
            });

            return {
              ...module,
              checked: lessons.every(lesson => lesson.checked),
              lessons,
            };
          }),
        })),
      ];
    })();
  }

  render() {
    const { lesson, classes } = this.props;

    return (
      <ListItem className={classes.root} onClick={this.handleClick}>
        <Grid container alignContent='center'>
          <Grid item>
            <Checkbox id={`selecionaAula${(lesson.title).replace(/ /g, '')}`} className={classes.checkbox} checked={lesson.checked} />
          </Grid>
          <Grid item className={classes.title}>
            <Typography variant='body2'>{lesson.title}</Typography>
          </Grid>
        </Grid>
      </ListItem>
    );
  }
}