import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ErrorMessage from 'components/Shared/ErrorMessage';
import { WithStyles } from 'decorators/withStyles';
import { arrayMove } from 'react-sortable-hoc';
import { IModule } from 'interfaces/models/module';
import { SortEnd } from 'react-sortable-hoc';
import ListContainer from './ListContainer';
import { ILesson } from 'interfaces/models/lesson';

interface IState {
  error?: any;
  modules?: IModule[];
}

interface IProps {
  classes?: any;
}

@WithStyles({
  loader: {
    textAlign: 'center',
  },
})
export default class ModuleList extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      modules: null,
      error: null,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    this.setState({
      modules: [
        {
          id: 0,
          name: 'Módulo 1',
          lessons: [
            {
              id: 0,
              name: 'Aula 1',
            },
            {
              id: 1,
              name: 'Aula 2',
            },
            {
              id: 2,
              name: 'Aula 3',
            },
          ],
        },
        {
          id: 1,
          name: 'Módulo 2',
          lessons: [],
        },
        {
          id: 2,
          name: 'Módulo 3',
          lessons: [],
        },
        {
          id: 3,
          name: 'Módulo 4',
          lessons: [],
        },
        {
          id: 4,
          name: 'Módulo 5',
          lessons: [],
        },
        {
          id: 5,
          name: 'Módulo 6',
          lessons: [],
        },
      ]
    });
  }

  onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
    this.setState({
      modules: arrayMove(this.state.modules, oldIndex, newIndex),
    });
  }

  handleLessonSort = (moduleId: number, lessons: ILesson[]) => {
    const { modules } = this.state;

    this.setState({
      modules: modules.map(module => {
        if (module.id === moduleId)
          return {
            ...module,
            lessons,
          };
        return module;
      }),
    });
  }

  handleAddModule = (name: string) => {
    // API Fetch...

    // Mock
    const { modules } = this.state;

    const newModule = {
      id: modules.length,
      name,
    } as IModule;

    this.setState({
      modules: [
        ...modules,
        newModule,
      ]
    });
  }

  render() {
    const { classes } = this.props;
    const { modules, error } = this.state;

    return (
      <Card>
        <CardContent>
          <Grid container spacing={16} alignItems='center'>
            <Grid item xs={true}>
              <Typography variant='subheading'>
                Listagem de Módulos e Aulas
              </Typography>
            </Grid>

          </Grid>
        </CardContent>

        {!error && !modules &&
          <CardContent className={classes.loader}>
            <CircularProgress color='secondary' />
          </CardContent>
        }

        {!!error &&
          <CardContent>
            <ErrorMessage
              error={error}
              tryAgain={this.loadData}
            />
          </CardContent>
        }

        {!!modules &&
          <ListContainer
            modules={modules}
            onSortEnd={this.onSortEnd}
            onLessonSort={this.handleLessonSort}
            onAddModule={this.handleAddModule}
            useDragHandle
          />
        }
      </Card>
    );
  }
}