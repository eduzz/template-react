import React, { PureComponent } from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import List from '@material-ui/core/List';
import { WithStyles } from 'decorators/withStyles';
import LessonItem from './LessonItem';
import { ILesson } from 'interfaces/models/lesson';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import AddIcon from 'mdi-react/AddIcon';
import { IModule } from 'interfaces/models/module';
import { WithRouter } from 'decorators/withRouter';

interface IProps {
  lessons: ILesson[];
  module: IModule;
  classes?: any;
  history?: any;
}

@WithRouter()
@WithStyles(theme => ({
  addItem: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
}))
class LessonList extends PureComponent<IProps> {
  handleAddLesson = () => {
    this.props.history.push('/aula/novo');
  }

  render() {
    const { lessons, module, classes } = this.props;

    return (
      <List disablePadding>
        {lessons && lessons.map((lesson, index: number) =>
          <LessonItem
            key={index}
            index={index}
            lesson={lesson}
            moduleId={module.id}
          />
        )}
        <ListItem className={classes.addItem}>
          <Button
            className={classes.button}
            color='secondary'
            variant='extendedFab'
            aria-label='Nova Aula'
            onClick={this.handleAddLesson}
          >
            <AddIcon className={classes.extendedIcon} />
            Criar Nova Aula
          </Button>
        </ListItem>
      </List>
    );
  }
}

export default SortableContainer(LessonList);