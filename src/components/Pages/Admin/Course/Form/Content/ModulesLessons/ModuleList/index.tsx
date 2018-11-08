import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ErrorMessage from 'components/Shared/ErrorMessage';
import { WithStyles } from 'decorators/withStyles';
import { ILesson } from 'interfaces/models/lesson';
import { IModule } from 'interfaces/models/module';
import AddIcon from 'mdi-react/AddIcon';
import React from 'react';
import { arrayMove, SortEnd } from 'react-sortable-hoc';
import rxjsOperators from 'rxjs-operators';
import moduleService from 'services/module';

import ListContainer from './ListContainer';
import ModuleDialog from './ModuleDialog';

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
    moduleService.list().pipe(
      rxjsOperators.bindComponent(this),
    ).subscribe(modules => {
      this.setState({
        modules,
      });
    });
  }

  onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
    moduleService.setModules(arrayMove(this.state.modules, oldIndex, newIndex));
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

  handleNewModule = () => {
    moduleService.newModule();
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
            <Grid item xs={false}>
              <Button
                className={classes.button}
                color='secondary'
                variant='extendedFab'
                aria-label='Adicionar Módulo'
                onClick={this.handleNewModule}
              >
                <AddIcon className={classes.extendedIcon} />
                Adicionar Módulo
              </Button>
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
            useDragHandle
          />
        }

        <ModuleDialog />
      </Card>
    );
  }
}