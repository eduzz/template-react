import { TableCell, TableRow } from '@material-ui/core';
import ListItemComponent from 'components/Abstract/ListItem';
import Alert from 'components/Alert';
import AppRouter, { RouterContext } from 'components/Router';
import { ICourse } from 'interfaces/course';
import DeleteIcon from 'mdi-react/DeleteIcon';
import EditIcon from 'mdi-react/EditIcon';
import React, { Fragment } from 'react';
import rxjsOperators from 'rxjs-operators';
import courseService from 'services/course';

interface IProps {
  course: ICourse;
  onDelete: (course: ICourse) => void;
}

export default class ListItem extends ListItemComponent<IProps> {
  getRouter: () => AppRouter;

  handleEdit = () => {
    const { course } = this.props;
    this.getRouter().navigate(`/course/${course.id}/edit`);
  }

  async handleDelete() {
    const { course, onDelete } = this.props;

    const isOk = await Alert.confirm(`Deseja excluir o curso ${course.title}?`);
    if (!isOk) return;

    this.setState({ loading: true });

    courseService.delete(course).pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this)
    ).subscribe(() => {
      onDelete(course);
    }, error => {
      this.setState({ error, loading: false });
    });
  }

  render(): JSX.Element {
    const { course } = this.props;

    return (
      <Fragment>
        <RouterContext.Consumer>
          {getRouter => (this.getRouter = getRouter) && null}
        </RouterContext.Consumer>

        <TableRow>
          <TableCell>{course.title}</TableCell>
          <TableCell>{course.category.name}</TableCell>
          <TableCell>
            {this.renderSideMenu([{
              text: 'Editar',
              icon: EditIcon,
              handler: this.handleEdit
            }, {
              text: 'Excluir',
              icon: DeleteIcon,
              handler: this.handleDelete
            }])}
          </TableCell>
        </TableRow>
      </Fragment>
    );
  }
}